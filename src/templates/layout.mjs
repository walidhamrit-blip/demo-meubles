/* =========================================================================
   Gabarit de page (layout partagé)
   -------------------------------------------------------------------------
   Enveloppe commune à toutes les pages : <head> complet (SEO, Open Graph,
   données structurées), en-tête de navigation, contenu, pied de page et
   couches applicatives (recherche, devis, rendez-vous, fiche produit).

   Le menu « Collections » se déroule en CSS uniquement (`group-hover` et
   `group-focus-within`) : aucun JavaScript n'est nécessaire pour la
   navigation, et tous les liens restent présents dans le DOM — donc
   explorables par les moteurs de recherche.
   ========================================================================= */

import { decodeDeep } from '../lib/html.mjs';
import { site, href, asset, canonical } from '../lib/paths.mjs';
import { collections } from '../content/collections.mjs';
import { icon } from './components.mjs';
import { partnerRibbon, serviceRibbon } from './ribbons.mjs';

const FONT_HREF =
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap';

/* ------------------------------------------------------------------- <head> */

function renderHead({ title, description, path, depth, robots, ogType = 'website', preload, jsonLd }) {
    const url = canonical(path);
    const ogImage = `${site.url}/assets/img/og-image.jpg`;

    return `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${url}">
    <meta name="robots" content="${robots}">
    <meta name="author" content="${site.name}">
    <meta name="theme-color" content="${site.themeColor}">
    <script>
        /* Applique le thème choisi AVANT le premier rendu : évite tout
           clignotement. Choix mémorisé dans localStorage ; à défaut, la
           préférence du système est respectée. */
        (function () {
            var themes = ['clair', 'ebene', 'noyer'];
            var choice = null;
            try { choice = window.localStorage.getItem('mt-theme'); } catch (error) { choice = null; }
            if (themes.indexOf(choice) === -1) {
                choice = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'ebene' : 'clair';
            }
            document.documentElement.setAttribute('data-theme', choice);
        })();
    </script>
    <meta name="format-detection" content="telephone=yes">
    <meta name="geo.region" content="LB-AS">
    <meta name="geo.placename" content="Tripoli, Liban">

    <!-- Open Graph / Twitter -->
    <meta property="og:type" content="${ogType}">
    <meta property="og:site_name" content="${site.name}">
    <meta property="og:locale" content="${site.locale}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Salon habillé par Maison Tripoli : mobilier d'art en noyer massif et lin écru">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${ogImage}">

    <!-- Icônes & PWA -->
    <link rel="icon" href="${asset('/assets/img/favicon.svg', depth)}" type="image/svg+xml">
    <link rel="apple-touch-icon" href="${asset('/assets/img/apple-touch-icon.png', depth)}">
    <link rel="manifest" href="${asset('/site.webmanifest', depth)}">

    <!-- Chaînes critiques -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
    <link rel="preload" as="style" href="${FONT_HREF}">
    <link rel="stylesheet" href="${FONT_HREF}" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="${FONT_HREF}"></noscript>
${preload ? `    ${preload}\n` : ''}    <link rel="stylesheet" href="${asset('/assets/css/main.css', depth)}">

    <!-- Données structurées Schema.org -->
    <script type="application/ld+json">
${JSON.stringify(decodeDeep({ '@context': 'https://schema.org', '@graph': jsonLd }), null, 2).replace(
        /\n/g,
        '\n    ',
    )}
    </script>`;
}

/* ------------------------------------------------------------------ En-tête */

function renderNav(activePath, depth) {
    const items = site.nav
        .map((item) => {
            if (!item.hasCollectionsMenu) {
                const isActive = activePath === item.path;
                return `<li>
                        <a href="${href(item.path, { depth })}"${isActive ? ' aria-current="page"' : ''} class="hover:text-accent-ink transition-colors py-2 relative group">
                            ${item.label}
                            <span class="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                        </a>
                    </li>`;
            }

            const isActive = activePath.startsWith('/collections');
            const submenu = collections
                .map(
                    (collection) => `<li>
                            <a href="${href(collection.path, { depth })}" class="flex flex-col gap-1 px-5 py-3 hover:bg-surface-2 transition">
                                <span class="font-serif text-base normal-case tracking-normal text-ink">${collection.navLabel}</span>
                                <span class="text-[10px] tracking-[0.15em] text-muted normal-case">${collection.eyebrow}</span>
                            </a>
                        </li>`,
                )
                .join('\n                        ');

            return `<li class="relative group">
                        <a href="${href(item.path, { depth })}"${isActive ? ' aria-current="page"' : ''} aria-haspopup="true" class="inline-flex items-center gap-1.5 hover:text-accent-ink transition-colors py-2">
                            ${item.label}
                            ${icon('chevron-down', 'icon w-3.5 h-3.5 stroke-[2] transition-transform duration-300 group-hover:rotate-180')}
                        </a>
                        <ul class="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition duration-200 absolute left-0 top-full z-50 w-72 bg-surface border border-line shadow-xl py-2 divide-y divide-line">
                        ${submenu}
                        </ul>
                    </li>`;
        })
        .join('\n                    ');

    return `<ul class="hidden lg:flex items-center gap-x-8 text-xs uppercase tracking-[0.2em] font-medium text-ink-strong/80">
                    ${items}
                </ul>`;
}

function renderMobileDrawer(activePath, depth) {
    const collectionsList = collections
        .map(
            (collection) => `<li>
                        <a href="${href(collection.path, { depth })}" data-close-menu class="flex items-center justify-between gap-4 py-2 text-ink-strong hover:text-accent-ink transition">
                            <span>${collection.navLabel}</span>
                            ${icon('arrow-right', 'icon w-4 h-4 stroke-[2] text-accent-ink')}
                        </a>
                    </li>`,
        )
        .join('\n                    ');

    const pagesList = site.nav
        .filter((item) => !item.hasCollectionsMenu)
        .map(
            (item) => `<li><a href="${href(item.path, { depth })}" data-close-menu class="text-ink-strong hover:text-accent-ink transition">${item.label}</a></li>`,
        )
        .join('\n                    ');

    return `<div id="mobileDrawer" class="lg:hidden bg-surface-2 border-b border-line-strong px-6 py-8 max-h-[85vh] overflow-y-auto" hidden>
            <nav aria-label="Navigation mobile" class="flex flex-col gap-6">
                <div>
                    <p class="text-[10px] uppercase tracking-[0.3em] text-accent-ink font-semibold mb-3">Collections</p>
                    <ul class="flex flex-col gap-1 text-sm">
                    ${collectionsList}
                    </ul>
                </div>
                <div class="pt-5 border-t border-line-strong">
                    <p class="text-[10px] uppercase tracking-[0.3em] text-accent-ink font-semibold mb-3">La Maison</p>
                    <ul class="flex flex-col gap-4 text-sm uppercase tracking-[0.2em]">
                    ${pagesList}
                    </ul>
                </div>
                <div class="pt-5 flex flex-col gap-3 border-t border-line-strong">
                    <button type="button" data-open-dialog="searchModal" data-close-menu class="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest border border-ink py-3 px-6">
                        ${icon('search', 'icon w-4 h-4 stroke-[1.5]')}
                        Rechercher une pièce
                    </button>
                    <button type="button" data-open-dialog="consultationModal" data-close-menu class="text-xs uppercase tracking-widest bg-inverse text-on-inverse py-3 px-6 w-full text-center">
                        Visite privée au showroom
                    </button>
                </div>

                <div class="pt-5 border-t border-line-strong/40 flex items-center justify-between gap-4">
                    <span class="text-[10px] uppercase tracking-[0.3em] text-accent-ink font-semibold">Thème</span>
                    ${renderThemeControl()}
                </div>
            </nav>
        </div>`;
}

/**
 * Sélecteur de thème : trois pastilles de couleur. Sans JavaScript, le thème
 * clair reste appliqué (choix par défaut) et les boutons sont inertes.
 */
function renderThemeControl() {
    const options = [
        { id: 'clair', label: 'Thème clair — sable', swatch: 'bg-[#FAF8F5]' },
        { id: 'ebene', label: 'Thème sombre — Ébène', swatch: 'bg-[#121110]' },
        { id: 'noyer', label: 'Thème sombre — Noyer', swatch: 'bg-[#191310]' },
    ];

    return `<div class="flex items-center gap-1" role="group" aria-label="Thème d’affichage">
        ${options
            .map(
                (option) => `<button type="button" class="theme-btn" data-theme-set="${option.id}" aria-pressed="false" title="${option.label}">
            <span class="sr-only">${option.label}</span>
            <span class="block w-4 h-4 rounded-full border border-line-strong ${option.swatch}" aria-hidden="true"></span>
        </button>`,
            )
            .join('\n        ')}
    </div>`;
}

function renderHeader(activePath, depth) {
    return `<!-- =====================================================================
         En-tête : navigation principale
         ===================================================================== -->
    <div class="bg-inverse text-on-inverse-muted text-xs py-2.5 px-4 tracking-[0.2em] uppercase text-center">
        <p>
            <span>Atelier &amp; Showroom Tripoli • Rue des Ébénistes</span>
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-accent mx-2 align-middle" aria-hidden="true"></span>
            <span class="hidden md:inline">Fabrication artisanale &amp; sur-mesure • Expédition internationale</span>
        </p>
    </div>

    <header id="navbar" class="sticky top-0 z-40 transition-shadow duration-500 bg-surface/95 backdrop-blur-md border-b border-line">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between gap-3">

            <div class="flex items-center gap-6 lg:gap-8">
                <button type="button"
                        id="mobileMenuBtn"
                        class="lg:hidden text-ink-strong hover:text-accent-ink transition"
                        aria-label="Ouvrir le menu de navigation"
                        aria-expanded="false"
                        aria-controls="mobileDrawer">
                    ${icon('menu', 'icon w-6 h-6 stroke-[2]')}
                </button>

                <nav aria-label="Navigation principale">
                    ${renderNav(activePath, depth)}
                </nav>
            </div>

            <div class="text-center">
                <a href="${href('/', { depth })}" class="group block" aria-label="Maison Tripoli — retour à l'accueil">
                    <span class="block font-serif text-xl sm:text-2xl lg:text-3xl tracking-[0.14em] sm:tracking-[0.18em] uppercase font-light text-ink">
                        Maison Tripoli
                    </span>
                    <span class="block text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-accent-ink -mt-1">
                        Atelier Mobilier • 1948
                    </span>
                </a>
            </div>

            <div class="flex items-center space-x-4 sm:space-x-6">
                <button type="button"
                        data-open-dialog="searchModal"
                        class="text-ink-strong/80 hover:text-accent-ink transition hidden sm:block p-2 -m-2"
                        aria-label="Rechercher une pièce au catalogue">
                    ${icon('search', 'icon w-5 h-5 stroke-[1.5]')}
                </button>

                <a href="${href('/contact/', { depth })}"
                   class="hidden md:inline-flex items-center text-xs tracking-[0.18em] uppercase border border-ink px-4 py-2 hover:bg-inverse hover:text-white transition duration-300">
                    Prendre rendez-vous
                </a>

                <button type="button"
                        id="cartToggleBtn"
                        class="relative text-ink-strong/90 hover:text-accent-ink transition flex items-center gap-1.5 p-2 -m-2"
                        aria-label="Ouvrir ma sélection et mon devis"
                        aria-expanded="false"
                        aria-controls="cartDrawer">
                    ${icon('baggage-claim', 'icon w-5 h-5 stroke-[1.5]')}
                    <span id="cartCountBadge" class="text-xs font-serif italic text-accent-ink" aria-hidden="true">(0)</span>
                </button>

                <div class="hidden sm:block">${renderThemeControl()}</div>
            </div>
        </div>

        ${renderMobileDrawer(activePath, depth)}
    </header>`;
}

/* --------------------------------------------------------------- Pied de page */

function renderFooter(depth) {
    const collectionsList = collections
        .map(
            (collection) => `<li><a href="${href(collection.path, { depth })}" class="hover:text-on-inverse-soft transition">${collection.navLabel}</a></li>`,
        )
        .join('\n                    ');

    const maisonList = site.footerNav[0].links
        .map((link) => `<li><a href="${href(link.path, { depth })}" class="hover:text-on-inverse-soft transition">${link.label}</a></li>`)
        .join('\n                    ');

    const legalList = site.legalLinks
        .map((link) => `<li><a href="${href(link.path, { depth })}" class="hover:text-white transition">${link.label}</a></li>`)
        .join('\n                    ');

    const { contact } = site;

    return `<!-- =====================================================================
         Pied de page
         ===================================================================== -->
    <footer class="bg-inverse text-on-inverse-muted py-16 px-6 lg:px-12 text-xs border-t border-line-strong/20">
        <h2 class="sr-only">Informations complémentaires et liens utiles</h2>
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-line-faint/20">

            <div class="lg:col-span-2 space-y-4">
                <p class="font-serif text-2xl tracking-[0.2em] uppercase font-light text-white">${site.name}</p>
                <p class="text-on-inverse-faint text-xs leading-relaxed max-w-sm">
                    Maison d'édition et manufacture de mobilier de prestige à Tripoli, Liban. Chaque création incarne un dialogue entre rigueur architecturale contemporaine et maîtrise artisanale méditerranéenne.
                </p>
                <ul class="flex gap-2 pt-2 text-on-inverse-muted">
                    <li>
                        <a href="${site.social.instagram}" target="_blank" rel="noopener noreferrer me" class="inline-flex p-2 hover:text-white transition" aria-label="Suivre Maison Tripoli sur Instagram (nouvelle fenêtre)">
                            ${icon('instagram', 'icon w-4 h-4 stroke-[2]')}
                        </a>
                    </li>
                    <li>
                        <a href="${site.social.facebook}" target="_blank" rel="noopener noreferrer me" class="inline-flex p-2 hover:text-white transition" aria-label="Suivre Maison Tripoli sur Facebook (nouvelle fenêtre)">
                            ${icon('facebook', 'icon w-4 h-4 stroke-[2]')}
                        </a>
                    </li>
                    <li>
                        <a href="${contact.mapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex p-2 hover:text-white transition" aria-label="Localiser le showroom Maison Tripoli sur Google Maps (nouvelle fenêtre)">
                            ${icon('compass', 'icon w-4 h-4 stroke-[2]')}
                        </a>
                    </li>
                </ul>
            </div>

            <nav aria-labelledby="footer-collections">
                <h3 id="footer-collections" class="uppercase tracking-[0.2em] font-medium text-white mb-4">Collections</h3>
                <ul class="space-y-2.5 text-on-inverse-faint">
                    ${collectionsList}
                </ul>
            </nav>

            <nav aria-labelledby="footer-maison">
                <h3 id="footer-maison" class="uppercase tracking-[0.2em] font-medium text-white mb-4">La Maison</h3>
                <ul class="space-y-2.5 text-on-inverse-faint">
                    ${maisonList}
                </ul>
            </nav>

            <div>
                <h3 class="uppercase tracking-[0.2em] font-medium text-white mb-4">Tripoli Atelier</h3>
                <address class="not-italic text-on-inverse-faint space-y-2 leading-relaxed">
                    <span class="block">${contact.street}</span>
                    <span class="block">${contact.locality}, République libanaise</span>
                    <a href="mailto:${contact.email}" class="block pt-2 text-on-inverse-muted hover:text-white transition">${contact.email}</a>
                    <a href="tel:${contact.phoneHref}" class="block hover:text-white transition">${contact.phone}</a>
                </address>
            </div>

        </div>

        <div class="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-on-inverse-faint gap-4">
            <p>© 2025 ${site.name} — Mobilier &amp; art de vivre, Tripoli, Liban.</p>
            <ul class="flex flex-wrap justify-center gap-6">
                ${legalList}
            </ul>
        </div>
    </footer>`;
}

/* ------------------------------------------------------- Couches applicatives */

function renderDialogs(depth, includeQuickView) {
    const quickView = !includeQuickView
        ? ''
        : `
    <!-- COUCHE — Fiche produit -->
    <div id="quickViewModal" data-dialog role="dialog" aria-modal="true" aria-labelledby="modalProductTitle" aria-hidden="true" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm items-center justify-center p-4" hidden>
        <div class="bg-surface max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-line-strong">
            <button type="button" data-close-dialog class="absolute top-5 right-5 text-ink-strong hover:text-accent-ink z-10 p-2" aria-label="Fermer la fiche produit">
                ${icon('x', 'icon w-6 h-6 stroke-[1.5]')}
            </button>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
                <div class="bg-surface-3 aspect-[4/5] overflow-hidden">
                    <img id="modalProductImg" src="${asset('/assets/img/placeholder-fiche-produit.svg', depth)}" width="1000" height="1250" decoding="async"
                         alt="Aperçu de la pièce sélectionnée dans les collections Maison Tripoli" class="w-full h-full object-cover">
                </div>

                <div class="flex flex-col justify-between space-y-6">
                    <div>
                        <p id="modalProductBadge" class="text-[10px] uppercase tracking-[0.25em] text-accent-ink font-semibold">Atelier Tripoli</p>
                        <h2 id="modalProductTitle" class="font-serif text-3xl text-ink font-normal mt-1">Canapé modulaire</h2>
                        <p id="modalProductPrice" class="font-serif text-2xl text-ink-strong mt-2">3 800 $</p>

                        <div class="w-12 h-px bg-surface-4 my-4" aria-hidden="true"></div>

                        <p id="modalProductDesc" class="text-xs text-muted leading-relaxed font-light">
                            Façonné à Tripoli selon les traditions de l'ébénisterie fine. Structure équilibrée en noyer massif, mousse haute résilience et revêtement sur-mesure.
                        </p>

                        <dl class="mt-6 space-y-3">
                            <div class="text-[11px] uppercase tracking-wider text-ink-strong flex justify-between gap-4">
                                <dt class="text-muted">Dimensions :</dt>
                                <dd id="modalProductDim" class="font-medium text-right">L 260 × P 105 × H 76 cm</dd>
                            </div>
                            <div class="text-[11px] uppercase tracking-wider text-ink-strong flex justify-between gap-4">
                                <dt class="text-muted">Délai atelier :</dt>
                                <dd id="modalProductLead" class="font-medium text-right">Fabriqué sur commande (4 à 6 semaines)</dd>
                            </div>
                            <div class="text-[11px] uppercase tracking-wider text-ink-strong flex justify-between gap-4">
                                <dt class="text-muted">Origine :</dt>
                                <dd class="font-medium text-right">Tripoli, Liban (livraison internationale)</dd>
                            </div>
                        </dl>

                        <p id="modalProductCollection" class="mt-6 text-[11px] uppercase tracking-wider text-muted"></p>
                    </div>

                    <div class="space-y-3 pt-4 border-t border-line">
                        <button type="button" id="addToCartBtn" class="w-full py-3.5 bg-inverse text-on-inverse text-xs uppercase tracking-[0.2em] font-medium hover:bg-accent hover:text-on-accent transition">
                            Ajouter au devis &amp; panier
                        </button>
                        <button type="button" data-open-dialog="consultationModal" class="w-full py-3 border border-ink text-ink text-xs uppercase tracking-[0.2em] hover:bg-surface-3 transition">
                            Personnaliser les dimensions / finitions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

    return `${quickView}
    <!-- COUCHE — Recherche au catalogue -->
    <div id="searchModal" data-dialog role="dialog" aria-modal="true" aria-labelledby="searchTitle" aria-hidden="true" class="fixed inset-0 z-50 bg-surface/[0.98] backdrop-blur-md flex-col justify-center items-center px-6 py-16" hidden>
        <button type="button" data-close-dialog class="absolute top-8 right-8 text-ink-strong hover:text-accent-ink p-2" aria-label="Fermer la recherche">
            ${icon('x', 'icon w-7 h-7 stroke-[2]')}
        </button>
        <div class="max-w-2xl w-full text-center">
            <h2 id="searchTitle" class="text-xs uppercase tracking-[0.3em] text-accent-ink block mb-4 font-normal">Recherche au catalogue</h2>
            <label for="searchInput" class="sr-only">Rechercher une pièce, une matière ou une collection</label>
            <input type="search" id="searchInput" name="q" autocomplete="off" placeholder="Tapez « Noyer », « Canapé », « Table »…"
                   class="w-full text-2xl sm:text-4xl font-serif border-b border-ink-strong bg-transparent pb-4 text-center focus:outline-none text-ink placeholder:text-muted/60">
            <div id="searchResults" class="mt-8 text-xs text-left max-h-60 overflow-y-auto space-y-3" role="status" aria-live="polite"></div>
        </div>
    </div>

    <!-- COUCHE — Prise de rendez-vous au showroom -->
    <div id="consultationModal" data-dialog role="dialog" aria-modal="true" aria-labelledby="consultationTitle" aria-hidden="true" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm items-center justify-center p-4" hidden>
        <div class="bg-surface max-w-lg w-full p-6 sm:p-8 border border-line-strong shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button type="button" data-close-dialog class="absolute top-5 right-5 text-ink-strong hover:text-accent-ink p-2" aria-label="Fermer la fenêtre de rendez-vous">
                ${icon('x', 'icon w-5 h-5 stroke-[2]')}
            </button>
            <p class="text-xs uppercase tracking-[0.25em] text-accent-ink font-semibold">Service personnalisé</p>
            <h2 id="consultationTitle" class="font-serif text-2xl text-ink font-normal mt-1 mb-2">Visite privée au showroom</h2>
            <p class="text-xs text-muted mb-6">
                Réservez un créneau d'accueil exclusif avec notre bureau d'architecture d'intérieur à Tripoli.
            </p>

            <form id="consultationForm" class="space-y-4 text-xs">
                <div>
                    <label for="visitName" class="block uppercase tracking-wider text-[10px] text-muted mb-1">Votre nom &amp; prénom</label>
                    <input type="text" id="visitName" name="name" required autocomplete="name" class="w-full bg-surface-2 border border-line-strong px-4 py-2.5 text-xs focus:outline-none focus:border-ink">
                </div>
                <div>
                    <label for="visitPhone" class="block uppercase tracking-wider text-[10px] text-muted mb-1">Numéro mobile (WhatsApp)</label>
                    <input type="tel" id="visitPhone" name="phone" required autocomplete="tel" inputmode="tel" placeholder="+961…" class="w-full bg-surface-2 border border-line-strong px-4 py-2.5 text-xs focus:outline-none focus:border-ink">
                </div>
                <div>
                    <label for="visitDate" class="block uppercase tracking-wider text-[10px] text-muted mb-1">Date souhaitée</label>
                    <input type="date" id="visitDate" name="date" required class="w-full bg-surface-2 border border-line-strong px-4 py-2.5 text-xs focus:outline-none focus:border-ink">
                </div>
                <div>
                    <label for="visitSubject" class="block uppercase tracking-wider text-[10px] text-muted mb-1">Objet de la visite</label>
                    <select id="visitSubject" name="subject" class="w-full bg-surface-2 border border-line-strong px-4 py-2.5 text-xs focus:outline-none focus:border-ink">
                        <option>Achat de mobilier pour particulier</option>
                        <option>Projet villa / appartement complet</option>
                        <option>Collaboration professionnelle (architecte)</option>
                    </select>
                </div>
                <button type="submit" class="w-full py-3.5 bg-inverse text-on-inverse uppercase tracking-[0.2em] text-xs font-medium hover:bg-accent hover:text-on-accent transition mt-4">
                    Confirmer la demande
                </button>
                <p id="consultationStatus" class="text-xs text-emerald-800 text-center" role="status" aria-live="polite"></p>
            </form>
        </div>
    </div>

    <!-- TIROIR — Sélection et demande de devis -->
    <div id="cartDrawer" data-dialog role="dialog" aria-modal="true" aria-labelledby="cartTitle" aria-hidden="true" class="fixed inset-y-0 right-0 max-w-md w-full bg-surface shadow-2xl z-50 transform translate-x-full transition-transform duration-500 ease-in-out border-l border-line-strong flex-col" hidden>
        <div class="p-6 border-b border-line-strong flex items-center justify-between">
            <div>
                <h2 id="cartTitle" class="font-serif text-xl text-ink font-normal">Mon devis &amp; sélection</h2>
                <p class="text-[10px] uppercase tracking-widest text-accent-ink">Maison Tripoli Concierge</p>
            </div>
            <button type="button" data-close-dialog class="text-ink-strong hover:text-accent-ink p-2" aria-label="Fermer ma sélection">
                ${icon('x', 'icon w-5 h-5 stroke-[2]')}
            </button>
        </div>

        <div id="cartItemsList" class="flex-1 overflow-y-auto p-6 space-y-4">
            <div class="text-center py-16 text-muted">
                ${icon('inbox', 'icon w-10 h-10 mx-auto stroke-[1] mb-3 text-on-inverse-faint')}
                <p class="text-xs uppercase tracking-widest">Votre sélection est vide</p>
                <p class="text-[11px] text-muted/80 mt-1">Parcourez nos collections signatures pour ajouter vos pièces.</p>
            </div>
        </div>

        <div class="p-6 border-t border-line-strong bg-surface-2 space-y-4">
            <p class="flex justify-between text-xs uppercase tracking-wider text-ink-strong">
                <span>Total estimatif :</span>
                <span id="cartSubtotal" class="font-serif text-lg font-medium">0 $</span>
            </p>
            <p class="text-[10px] text-muted leading-tight">
                * Tarifs hors droits de douane selon la destination. Frais de fret calculés sur étude technique.
            </p>
            <button type="button" id="quoteRequestBtn" class="w-full py-4 bg-inverse text-on-inverse text-xs uppercase tracking-[0.2em] font-medium hover:bg-accent hover:text-on-accent transition">
                Finaliser la demande de devis
            </button>
            <p id="cartStatus" class="text-xs text-emerald-800 text-center" role="status" aria-live="polite"></p>
        </div>
    </div>`;
}

/* -------------------------------------------------------------- Assemblage */

/**
 * Génère une page complète.
 * @param {object} options
 * @param {string} options.path        chemin canonique, ex. « /collections/salons/ »
 * @param {number} options.depth       profondeur de répertoire (0 pour « / »)
 * @param {string} options.title       balise <title> (50–60 caractères)
 * @param {string} options.description meta description (120–160 caractères)
 * @param {string} options.body        contenu de <main>
 * @param {Array}  options.jsonLd      nœuds Schema.org du graphe
 * @param {boolean} options.includeQuickView présence de produits sur la page
 * @param {string} [options.robots]
 * @param {string} [options.ogType]
 * @param {string} [options.preload]   balise de préchargement LCP
 */
export function renderPage({
    path,
    depth,
    title,
    description,
    body,
    jsonLd = [],
    includeQuickView = false,
    robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogType = 'website',
    preload,
}) {
    return `<!DOCTYPE html>
<html lang="${site.lang}" data-theme="clair" class="scroll-smooth">
<head>
${renderHead({ title, description, path, depth, robots, ogType, preload, jsonLd })}
</head>
<body class="bg-surface text-ink-strong font-sans antialiased flex flex-col min-h-screen">

    <!-- Sprite d'icônes SVG inline (généré par tools/build-icons.mjs) -->
    <!-- ICONS:START --><!-- ICONS:END -->

    <a class="skip-link" href="#main">Aller au contenu principal</a>

    <!-- Contact direct — lien sortant balisé, sans impact sur la mise en page
         (position fixe) ni sur le référencement (texte réel, rel="noopener") -->
    <a href="https://wa.me/${site.contact.mobileHref.replace('+', '')}?text=${encodeURIComponent('Bonjour Maison Tripoli, je souhaite un renseignement sur vos pièces.')}"
       class="whatsapp-fab no-print"
       target="_blank"
       rel="noopener noreferrer"
       title="Écrire à l’atelier sur WhatsApp"
       aria-label="Écrire à l’atelier sur WhatsApp — ${site.contact.mobile}">
        ${icon('whatsapp', 'icon w-6 h-6')}
        <span class="hidden sm:inline text-[11px] uppercase tracking-[0.18em] font-semibold">WhatsApp</span>
    </a>

${renderHeader(path, depth)}

    <main id="main" class="flex-1">
${body}
    </main>

${partnerRibbon()}

${serviceRibbon()}

${renderFooter(depth)}
${renderDialogs(depth, includeQuickView)}

    <!-- Données catalogue (générées depuis src/content/products.mjs) puis
         logique applicative : les deux sont différés, sans dépendance externe -->
    <script src="${asset('/assets/js/catalog.js', depth)}" defer></script>
    <script src="${asset('/assets/js/main.js', depth)}" defer></script>
</body>
</html>
`;
}
