#!/usr/bin/env node
/**
 * tools/smoke-test.mjs
 * ---------------------------------------------------------------------------
 * Tests fonctionnels du DOM sur les pages clés du site multi-pages :
 *   1. Page d'accueil        — nuancier des matières, recherche, panier
 *   2. Page de collection    — fiche produit, filtres de page, formulaire
 *   3. Page de contact       — formulaire, cohérence NAP
 *   4. Menu de navigation    — liens des collections, accessibilité clavier
 *
 * Chaque page est chargée dans jsdom avec son catalogue (catalog.js) puis sa
 * logique applicative (main.js) ; toute erreur JavaScript fait échouer le test.
 *
 * Usage : node tools/smoke-test.mjs
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const ROOT = path.resolve(import.meta.dirname, '..');

let failures = 0;
let jsErrors = 0;

const OK = '\x1b[32m✓\x1b[0m';
const KO = '\x1b[31m✗\x1b[0m';

const check = (label, condition, detail = '') => {
    if (condition) {
        console.log(`  ${OK} ${label}`);
    } else {
        failures += 1;
        console.log(`  ${KO} ${label}${detail ? ` — ${detail}` : ''}`);
    }
};

/**
 * Charge une page dans un DOM simulé puis exécute le JavaScript applicatif
 * exactement dans l'ordre du navigateur : catalog.js puis main.js.
 */
async function loadPage(pagePath) {
    const html = (await readFile(path.join(ROOT, pagePath), 'utf8'))
        .replace(/<script src="[^"]*catalog\.js" defer><\/script>/, '')
        .replace(/<script src="[^"]*main\.js" defer><\/script>/, '');

    const dom = new JSDOM(html, {
        runScripts: 'dangerously',
        pretendToBeVisual: true,
        url: `https://www.maisontripoli.com/${pagePath.replace(/index\.html$/, '')}`,
    });

    const { window } = dom;
    const { document } = window;

    const errors = [];
    window.addEventListener('error', (event) => errors.push(event.message));
    window.addEventListener('unhandledrejection', (event) => errors.push(String(event.reason)));

    window.matchMedia =
        window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {} }));

    const catalog = await readFile(path.join(ROOT, 'assets', 'js', 'catalog.js'), 'utf8');
    const script = await readFile(path.join(ROOT, 'assets', 'js', 'main.js'), 'utf8');

    for (const source of [catalog, script]) {
        const element = document.createElement('script');
        element.textContent = source;
        document.body.appendChild(element);
    }

    await new Promise((resolve) => {
        if (document.readyState === 'complete') resolve();
        else window.addEventListener('load', resolve, { once: true });
    });

    const click = (selector) => {
        const target = document.querySelector(selector);
        if (!target) throw new Error(`Élément introuvable : ${selector}`);
        target.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
        return target;
    };

    return { window, document, errors, click };
}

/* ========================================================================
   1. Page d'accueil
   ======================================================================== */
console.log("\n1. Page d'accueil (index.html)");
{
    const { document, errors, click, window } = await loadPage('index.html');

    // Maillage vers les collections
    const collectionLinks = [...document.querySelectorAll('a[href*="collections/"]')];
    check(
        'la page d’accueil renvoie vers les pages de collection',
        collectionLinks.length >= 5,
        `${collectionLinks.length} lien(s)`,
    );

    // Nuancier des matières
    click('.finish-btn[data-material="ebony"]');
    check(
        'nuancier des matières : titre mis à jour',
        document.getElementById('materialTitle').textContent.includes('Ébène'),
        document.getElementById('materialTitle').textContent,
    );
    check(
        'nuancier : état sélectionné annoncé',
        document.querySelector('.finish-btn[data-material="ebony"]').getAttribute('aria-pressed') === 'true',
    );

    // Recherche instantanée interrogeant tout le catalogue
    click('[data-open-dialog="searchModal"]');
    const input = document.getElementById('searchInput');
    input.value = 'travertin';
    input.dispatchEvent(new window.Event('input', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 250));
    check(
        'recherche globale : plusieurs collections atteintes',
        document.getElementById('searchResults').querySelectorAll('button').length >= 2,
        `${document.getElementById('searchResults').querySelectorAll('button').length} résultat(s)`,
    );

    window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    check('touche Échap : couche refermée', document.getElementById('searchModal').hidden === true);

    check('aucune erreur JavaScript', errors.length === 0, errors.join(' | '));
    jsErrors += errors.length;
}

/* ========================================================================
   2. Page de collection
   ======================================================================== */
console.log('\n2. Page de collection (collections/salons/index.html)');
{
    const { document, errors, click, window } = await loadPage('collections/salons/index.html');

    const cards = document.querySelectorAll('[data-quickview]');
    check('les pièces de la collection sont listées', cards.length === 3, `${cards.length} carte(s)`);

    click('[data-quickview="fauteuil-club-miramar"]');
    const modal = document.getElementById('quickViewModal');
    check('fiche produit ouverte', modal.hidden === false && modal.classList.contains('is-open'));
    check(
        'fiche produit : contenu exact',
        document.getElementById('modalProductTitle').textContent.includes('Miramar'),
        document.getElementById('modalProductTitle').textContent,
    );
    check(
        'fiche produit : lien vers la collection',
        document.getElementById('modalProductCollection').querySelector('a') !== null,
    );
    check(
        'fiche produit : image avec alt descriptif',
        (document.getElementById('modalProductImg').getAttribute('alt') || '').length > 20,
    );

    click('#addToCartBtn');
    check('panier : compteur mis à jour', document.getElementById('cartCountBadge').textContent === '(1)');
    check('panier : tiroir ouvert', document.getElementById('cartDrawer').classList.contains('is-open'));
    check(
        'panier : total calculé',
        /1[\s\u202f]?950\s\$/.test(document.getElementById('cartSubtotal').textContent),
        document.getElementById('cartSubtotal').textContent,
    );

    click('#cartItemsList button[aria-label^="Retirer"]');
    check('panier : suppression', document.getElementById('cartCountBadge').textContent === '(0)');

    // FAQ sans JavaScript
    const faqItems = document.querySelectorAll('details');
    check('FAQ dépliable sans JavaScript', faqItems.length === 4, `${faqItems.length} question(s)`);

    // Fil d'Ariane
    check('fil d’Ariane présent', document.querySelector('nav[aria-label*="Ariane"]') !== null);

    window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    check('aucune erreur JavaScript', errors.length === 0, errors.join(' | '));
    jsErrors += errors.length;
}

/* ========================================================================
   3. Page de contact
   ======================================================================== */
console.log('\n3. Page de contact (contact/index.html)');
{
    const { document, errors, window } = await loadPage('contact/index.html');

    const form = document.getElementById('contactForm');
    check('formulaire de contact présent', form !== null);

    const labels = [...document.querySelectorAll('#contactForm label')];
    check(
        'tous les champs du formulaire sont étiquetés',
        labels.length >= 5 && labels.every((label) => label.getAttribute('for')),
        `${labels.length} étiquette(s)`,
    );

    form.elements.name.value = 'Karim El-Mir';
    form.elements.phone.value = '+961 70 123 456';
    form.elements.email.value = 'karim@example.com';
    form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    check(
        'envoi simulé : accusé de réception affiché',
        document.getElementById('formSuccessMessage').textContent.length > 20,
    );

    // Cohérence NAP entre l'affichage et les données structurées
    const jsonLd = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
    const store = jsonLd['@graph'].find((node) => node['@type'] === 'FurnitureStore');
    // Le numéro affiché utilise des espaces insécables (typographie) : on compare
    // les chiffres, seul moyen robuste de vérifier la cohérence affichage / JSON-LD.
    const digits = (value) => (value || '').replace(/\D/g, '');
    check(
        'NAP : téléphone identique entre la page et le JSON-LD',
        digits(document.body.textContent).includes(digits(store.telephone)) && store.telephone === '+9616442890',
        store.telephone,
    );

    check('aucune erreur JavaScript', errors.length === 0, errors.join(' | '));
    jsErrors += errors.length;
}

/* ========================================================================
   4. Navigation partagée
   ======================================================================== */
console.log('\n4. Navigation partagée par toutes les pages');
{
    const { document, errors, click } = await loadPage('collections/index.html');

    // Menu déroulant Collections : les 5 sous-liens doivent être dans le DOM
    const dropdownLinks = [...document.querySelectorAll('header nav ul ul a')];
    check(
        'menu déroulant « Collections » : 5 pages filles liées',
        dropdownLinks.length === 5,
        `${dropdownLinks.length} lien(s)`,
    );
    check(
        'les liens du menu pointent vers les URL de collection',
        dropdownLinks.every((link) => /collections\/[a-z-]+\/$/.test(link.getAttribute('href'))),
    );

    // Tiroir mobile
    const menuBtn = document.getElementById('mobileMenuBtn');
    const drawer = document.getElementById('mobileDrawer');
    check('tiroir mobile masqué au chargement', drawer.hidden === true);
    click('#mobileMenuBtn');
    check('ouverture du tiroir mobile', drawer.hidden === false);
    check('état annoncé (aria-expanded)', menuBtn.getAttribute('aria-expanded') === 'true');
    click('#mobileMenuBtn');
    check('fermeture du tiroir mobile', drawer.hidden === true);

    // La page courante est indiquée aux technologies d'assistance
    check(
        'page courante annoncée (aria-current)',
        document.querySelector('header a[aria-current="page"]') !== null,
    );

    check('aucune erreur JavaScript', errors.length === 0, errors.join(' | '));
    jsErrors += errors.length;
}

/* ========================================================================
   Synthèse
   ======================================================================== */
console.log(`\n${'─'.repeat(64)}`);
if (failures === 0 && jsErrors === 0) {
    console.log(`${OK} Tous les parcours passent — 0 échec, 0 erreur JavaScript.\n`);
} else {
    console.log(`${KO} ${failures} échec(s) fonctionnel(s), ${jsErrors} erreur(s) JavaScript.\n`);
}
process.exit(failures === 0 && jsErrors === 0 ? 0 : 1);
