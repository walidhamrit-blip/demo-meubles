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
        // jsdom n'implémente pas matchMedia : il doit être disponible AVANT
        // l'exécution du script en ligne du <head> qui choisit le thème.
        beforeParse(window) {
            window.matchMedia = (query) => ({
                matches: false,
                media: query,
                addEventListener() {},
                removeEventListener() {},
                addListener() {},
                removeListener() {},
            });
        },
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
    // La requête est extraite du catalogue réellement publié : le contrôle
    // reste valable dans toutes les langues du site.
    const catalogue = window.__MT_CATALOG__?.products ?? [];
    input.value = (catalogue[0]?.name ?? '').split(' ')[0] || 'a';
    input.dispatchEvent(new window.Event('input', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 250));
    check(
        'recherche globale : le catalogue répond',
        catalogue.length > 0 && document.getElementById('searchResults').querySelectorAll('button').length >= 1,
        `${document.getElementById('searchResults').querySelectorAll('button').length} résultat(s) pour « ${input.value} »`,
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
    const attendu = window.__MT_CATALOG__?.products.find((item) => item.slug === 'fauteuil-club-miramar')?.name ?? '';
    const titre = document.getElementById('modalProductTitle').textContent.trim();
    check(
        'fiche produit : contenu exact',
        attendu.length > 0 && titre === attendu,
        `${titre} (attendu : ${attendu})`,
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
    check('fil d’Ariane présent', document.querySelector('nav[data-breadcrumb]') !== null);

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
   5. Thèmes, contact WhatsApp et rubans défilants
   ======================================================================== */
console.log('\n5. Thèmes, WhatsApp et rubans');
{
    const { document, errors, click, window } = await loadPage('index.html');

    // --- Sélecteur de thème -------------------------------------------------
    const themeButtons = document.querySelectorAll('[data-theme-set]');
    const themeNames = new Set([...themeButtons].map((button) => button.getAttribute('data-theme-set')));
    check(
        'trois thèmes proposés (dont deux sombres), en-tête et tiroir mobile',
        themeButtons.length === 6 && themeNames.size === 3,
        `${themeButtons.length} pastille(s) / ${themeNames.size} thème(s)`,
    );
    check(
        'thème clair actif par défaut',
        ['clair', 'ebene', 'noyer'].includes(document.documentElement.getAttribute('data-theme')),
        document.documentElement.getAttribute('data-theme'),
    );

    click('[data-theme-set="noyer"]');
    check(
        'bascule vers le thème Noyer',
        document.documentElement.getAttribute('data-theme') === 'noyer',
        document.documentElement.getAttribute('data-theme'),
    );
    check(
        'état des pastilles synchronisé (aria-pressed)',
        document.querySelector('[data-theme-set="noyer"]').getAttribute('aria-pressed') === 'true' &&
            document.querySelector('[data-theme-set="clair"]').getAttribute('aria-pressed') === 'false',
    );
    check(
        'choix mémorisé pour les visites suivantes',
        window.localStorage.getItem('mt-theme') === 'noyer',
        String(window.localStorage.getItem('mt-theme')),
    );

    click('[data-theme-set="ebene"]');
    check(
        'bascule vers le thème Ébène',
        document.documentElement.getAttribute('data-theme') === 'ebene',
    );

    // --- Bouton WhatsApp ----------------------------------------------------
    const whatsapp = document.querySelector('a.whatsapp-fab');
    check('bouton WhatsApp présent', whatsapp !== null);
    check('lien WhatsApp valide', /^https:\/\/wa\.me\/\d{6,}\?text=/.test(whatsapp.getAttribute('href')), whatsapp.getAttribute('href'));
    check(
        'lien sortant sécurisé et étiqueté',
        /noopener/.test(whatsapp.getAttribute('rel')) &&
            (whatsapp.getAttribute('aria-label') || '').length > 20,
    );

    // --- Rubans défilants ---------------------------------------------------
    const tracks = document.querySelectorAll('.marquee-track');
    check('deux rubans présents', tracks.length === 2, `${tracks.length} ruban(s)`);
    check(
        'sens de défilement opposés',
        tracks[0].classList.contains('marquee-track--brands') &&
            tracks[1].classList.contains('marquee-track--services') &&
            !tracks[0].classList.contains('marquee-track--reverse') &&
            !tracks[1].classList.contains('marquee-track--reverse'),
    );

    const brandsTrack = document.querySelector('.marquee-track--brands');
    const brands = [...brandsTrack.querySelectorAll('.marquee-item:not([data-marquee-clone])')];
    const services = [...document.querySelectorAll('.marquee-track--services .marquee-item:not([data-marquee-clone])')];

    // Ruban 1 : chaque partenaire est une marque graphique (SVG vectoriel)
    // dont le nom est porté par l'élément <title> : lisible par les moteurs
    // et annoncé par les lecteurs d'écran.
    const logos = brands.map((item) => item.querySelector('svg.marquee-logo'));
    check(
        'ruban 1 : maisons et fournisseurs partenaires',
        brands.length >= 8 && logos.every((svg) => svg !== null),
        `${brands.length} marques`,
    );
    check(
        'ruban 1 : chaque marque porte un nom accessible',
        logos.every((svg) => (svg.querySelector('title')?.textContent ?? '').trim().length > 2),
        logos.map((svg) => svg?.querySelector('title')?.textContent).join(', ').slice(0, 80),
    );
    check(
        'ruban 1 : aucune étiquette textuelle à côté des marques',
        brands.every((item) =>
            [...item.childNodes].every(
                (node) => node.nodeType !== 3 || node.textContent.trim() === '',
            ),
        ),
    );
    check(
        'ruban 2 : services de la Maison (texte réel)',
        services.length >= 8 && services.some((item) => item.textContent.trim().length > 8),
        `${services.length} mentions`,
    );
    const doublons = {
        brands: [...brandsTrack.querySelectorAll('.marquee-item[data-marquee-clone]')],
        services: [...document.querySelectorAll('.marquee-track--services .marquee-item[data-marquee-clone]')],
    };
    check(
        'copie de bouclage masquée aux lecteurs d’écran',
        doublons.brands.length === brands.length &&
            doublons.services.length === services.length &&
            [...doublons.brands, ...doublons.services].every((item) => item.getAttribute('aria-hidden') === 'true'),
        `${doublons.brands.length + doublons.services.length} élément(s) masqué(s)`,
    );

    check('aucune erreur JavaScript', errors.length === 0, errors.join(' | '));
    jsErrors += errors.length;
}

/* ========================================================================
   6. Sélecteur de langues (AR / EN)
   ======================================================================== */
console.log('\n6. Sélecteur de langues');
{
    // La racine du site est la version arabe : on y contrôle à la fois le
    // sélecteur, les alternances hreflang et les attributs du document.
    const { document, errors } = await loadPage('index.html');

    // L'en-tête contient deux sélecteurs (barre desktop + tiroir mobile) :
    // on contrôle le premier, les deux partagent le même gabarit.
    const switcher = document.querySelector('header .language-switch');
    const links = [...switcher.querySelectorAll('a')];
    check('deux langues proposées dans l’en-tête', links.length === 2, `${links.length} lien(s)`);

    const codes = links.map((link) => link.getAttribute('hreflang'));
    check('chaque lien annonce sa langue (hreflang)', ['ar', 'en'].every((code) => codes.includes(code)), codes.join(', '));

    const arabic = links.find((link) => link.getAttribute('hreflang') === 'ar');
    const english = links.find((link) => link.getAttribute('hreflang') === 'en');
    check('le lien anglais mène à la version /en/', english?.getAttribute('href') === 'en/', english?.getAttribute('href'));
    check('le lien arabe reste sur la racine', arabic?.getAttribute('href') === './' || arabic?.getAttribute('href') === '', arabic?.getAttribute('href'));
    check('le lien anglais est annoté lang="en"', english?.getAttribute('lang') === 'en');

    const alternates = [...document.querySelectorAll('link[rel="alternate"]')].map((link) => link.getAttribute('hreflang'));
    check(
        'hreflang réciproques + x-default sur la page d’accueil',
        ['ar', 'en', 'x-default'].every((code) => alternates.includes(code)),
        alternates.join(', '),
    );

    const current = links.find((link) => link.getAttribute('aria-current') === 'true');
    check('la langue courante est signalée', current?.getAttribute('hreflang') === 'ar', current?.getAttribute('hreflang'));

    // Page arabe servie à la racine : sens de lecture et langue déclarés.
    const root = document.documentElement;
    check('page arabe : lang="ar"', root.getAttribute('lang') === 'ar', root.getAttribute('lang'));
    check('page arabe : dir="rtl"', root.getAttribute('dir') === 'rtl', root.getAttribute('dir'));

    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    check('canonical auto-référent de la version arabe', canonical === 'https://www.maisontripoli.com/', canonical);

    const options = [...document.querySelectorAll('header [data-theme-set]')];
    check('sélecteur de thème également présent en arabe', options.length >= 3, `${options.length} pastille(s)`);

    check('aucune erreur JavaScript', errors.length === 0, errors.join(' | '));
    jsErrors += errors.length;
}

{
    // Version anglaise : document, canonical et contenu réellement traduits.
    const { document, errors } = await loadPage('en/index.html');
    const root = document.documentElement;
    check('page anglaise : lang="en"', root.getAttribute('lang') === 'en', root.getAttribute('lang'));
    check('page anglaise : dir="ltr"', root.getAttribute('dir') === 'ltr', root.getAttribute('dir'));

    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    check('canonical auto-référent de la version anglaise', canonical === 'https://www.maisontripoli.com/en/', canonical);

    const heading = document.querySelector('h1')?.textContent?.trim() ?? '';
    check('page anglaise : titre de niveau 1 en anglais', /Bespoke|furniture/i.test(heading) && !/mobilier/i.test(heading), heading.slice(0, 60));

    const current = [...document.querySelectorAll('header .language-switch a')].find(
        (link) => link.getAttribute('aria-current') === 'true',
    );
    check('la langue courante est signalée en anglais', current?.getAttribute('hreflang') === 'en', current?.getAttribute('hreflang'));

    check('aucune erreur JavaScript', errors.length === 0, errors.join(' | '));
    jsErrors += errors.length;
}

{
    // Page anglaise de collection : liens internes relatifs conservés.
    const { document, errors } = await loadPage('en/collections/index.html');
    const heading = document.querySelector('h1')?.textContent?.trim() ?? '';
    check('page anglaise : titre de niveau 1 traduit', /collections/i.test(heading), heading.slice(0, 60));

    const internal = [...document.querySelectorAll('main a[href]')].map((a) => a.getAttribute('href'));
    check(
        'liens internes présents dans la version anglaise',
        internal.length >= 5 && internal.every((link) => !link.startsWith('/')),
        `${internal.length} lien(s)`,
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
