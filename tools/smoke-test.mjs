#!/usr/bin/env node
/**
 * tools/smoke-test.mjs
 * ---------------------------------------------------------------------------
 * Test de bon fonctionnement du DOM : charge index.html dans jsdom, exécute
 * assets/js/main.js puis rejoue les parcours utilisateurs critiques
 * (fiche produit, panier, filtres, recherche, modales, formulaires) et
 * vérifie qu'aucune erreur JavaScript n'est levée.
 *
 * Usage : node tools/smoke-test.mjs
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const ROOT = path.resolve(import.meta.dirname, '..');

const html = (await readFile(path.join(ROOT, 'index.html'), 'utf8')).replace(
    /<script src="assets\/js\/main\.js" defer><\/script>/,
    '',
);
const script = await readFile(path.join(ROOT, 'assets', 'js', 'main.js'), 'utf8');

const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    url: 'https://www.maisontripoli.com/',
});

const { window } = dom;
const { document } = window;

const errors = [];
window.addEventListener('error', (event) => errors.push(event.message));
window.addEventListener('unhandledrejection', (event) => errors.push(String(event.reason)));

// jsdom n'implémente pas matchMedia ni requestAnimationFrame de façon complète
window.matchMedia =
    window.matchMedia ||
    (() => ({ matches: false, addEventListener() {}, removeEventListener() {} }));

// Exécution du script applicatif (équivalent du chargement différé)
const element = document.createElement('script');
element.textContent = script;
document.body.appendChild(element);

// Le script s'initialise sur DOMContentLoaded : on attend la fin du chargement
// de la page avant de simuler les interactions.
await new Promise((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve, { once: true });
});

let failures = 0;
const check = (label, condition, detail = '') => {
    if (condition) {
        console.log(`  ✓ ${label}`);
    } else {
        failures += 1;
        console.log(`  ✗ ${label}${detail ? ` — ${detail}` : ''}`);
    }
};

const click = (selector) => {
    const target = document.querySelector(selector);
    if (!target) throw new Error(`Élément introuvable : ${selector}`);
    target.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
    return target;
};

console.log('\nParcours utilisateurs (index.html)');

// --- Fiche produit --------------------------------------------------------
click('[data-quickview="3"]');
const modal = document.getElementById('quickViewModal');
check('fiche produit ouverte au clic sur une pièce', modal.hidden === false && modal.classList.contains('is-open'));
check(
    'contenu de la fiche mis à jour',
    document.getElementById('modalProductTitle').textContent.includes('Miramar'),
    document.getElementById('modalProductTitle').textContent,
);
check(
    'attribut alt de l’image de fiche renseigné',
    (document.getElementById('modalProductImg').getAttribute('alt') || '').length > 10,
);
check('aria-hidden synchronisé (ouvert)', modal.getAttribute('aria-hidden') === 'false');

// --- Ajout au panier ------------------------------------------------------
click('#addToCartBtn');
check('compteur du panier mis à jour', document.getElementById('cartCountBadge').textContent === '(1)');
check('tiroir de sélection ouvert', document.getElementById('cartDrawer').classList.contains('is-open'));
check('fiche produit refermée après ajout', modal.hidden === true);
check(
    'ligne de sélection rendue avec image et alt',
    document.querySelectorAll('#cartItemsList img[alt]').length === 1,
);

const total = document.getElementById('cartSubtotal').textContent;
check('total calculé', /1[\s\u202f]?950\s\$/.test(total), total);

// --- Suppression ----------------------------------------------------------
click('#cartItemsList button[aria-label^="Retirer"]');
check('compteur remis à zéro', document.getElementById('cartCountBadge').textContent === '(0)');
check('état vide restauré', /Votre sélection est vide/.test(document.getElementById('cartItemsList').textContent));

// --- Filtres du catalogue -------------------------------------------------
click('.cat-filter[data-filter="salon"]');
const visible = [...document.querySelectorAll('.product-item')].filter((item) => !item.classList.contains('hidden'));
check('filtre « Salons » : 2 pièces affichées', visible.length === 2, `${visible.length} affichée(s)`);
check('état aria-pressed transmis au filtre', document.querySelector('.cat-filter[data-filter="salon"]').getAttribute('aria-pressed') === 'true');
check('message de statut annoncé aux lecteurs d’écran', /2 pièces affichées/.test(document.getElementById('filterStatus').textContent));

click('.cat-filter[data-filter="all"]');
check(
    'retour à « Tous » : 6 pièces affichées',
    [...document.querySelectorAll('.product-item')].filter((item) => !item.classList.contains('hidden')).length === 6,
);

// --- Nuancier des matières ------------------------------------------------
click('.finish-btn[data-material="ebony"]');
check(
    'finitions : titre mis à jour',
    document.getElementById('materialTitle').textContent.includes('Ébène'),
    document.getElementById('materialTitle').textContent,
);
check(
    'finitions : état sélectionné',
    document.querySelector('.finish-btn[data-material="ebony"]').getAttribute('aria-pressed') === 'true',
);

// --- Recherche ------------------------------------------------------------
click('[data-open-dialog="searchModal"]');
const searchModal = document.getElementById('searchModal');
check('couche de recherche ouverte', searchModal.hidden === false);

const input = document.getElementById('searchInput');
input.value = 'noyer';
input.dispatchEvent(new window.Event('input', { bubbles: true }));

await new Promise((resolve) => setTimeout(resolve, 250));
const results = document.getElementById('searchResults').querySelectorAll('button');
const resultText = document.getElementById('searchResults').textContent;
check('recherche « noyer » : résultat pertinent', /Al-Mina/.test(resultText), resultText.slice(0, 80));
check('recherche : images pourvues d’un alt', document.querySelectorAll('#searchResults img[alt]').length === results.length);

// Recherche insensible à la casse et aux accents (« TABLE » doit matcher « Table »)
input.value = 'salon';
input.dispatchEvent(new window.Event('input', { bubbles: true }));
await new Promise((resolve) => setTimeout(resolve, 250));
check(
    'recherche par catégorie normalisée (« salon »)',
    document.getElementById('searchResults').querySelectorAll('button').length >= 2,
);

input.value = 'zzzz';
input.dispatchEvent(new window.Event('input', { bubbles: true }));
await new Promise((resolve) => setTimeout(resolve, 250));
check(
    'recherche sans résultat : message explicite',
    /Aucun modèle/.test(document.getElementById('searchResults').textContent),
);

// --- Modales : fermeture ----------------------------------------------
window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
check('touche Échap : couches refermées', searchModal.hidden === true);

click('[data-open-dialog="consultationModal"]');
const consultation = document.getElementById('consultationModal');
check('couche de rendez-vous ouverte', consultation.classList.contains('is-open'));
check('défilement verrouillé pendant l’ouverture', document.body.classList.contains('has-dialog-open'));

click('#consultationModal [data-close-dialog]');
check('fermeture par le bouton', consultation.hidden === true);
check('défilement rétabli', !document.body.classList.contains('has-dialog-open'));

// --- Formulaires ----------------------------------------------------------
const contactForm = document.getElementById('contactForm');
contactForm.elements.name.value = 'Karim El-Mir';
contactForm.elements.phone.value = '+961 70 123 456';
contactForm.elements.email.value = 'karim@example.com';
contactForm.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
check(
    'formulaire de contact : accusé de réception affiché',
    document.getElementById('formSuccessMessage').textContent.length > 20,
);

// --- Erreurs JavaScript ---------------------------------------------------
check('aucune erreur JavaScript pendant les parcours', errors.length === 0, errors.join(' | '));

console.log(`\n${failures === 0 ? 'Succès' : `${failures} échec(s)`} — ${errors.length} erreur(s) JS.\n`);
process.exit(failures === 0 ? 0 : 1);
