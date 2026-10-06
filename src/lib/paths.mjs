/* =========================================================================
   Gestion des chemins et des langues
   -------------------------------------------------------------------------
   Toutes les URL internes sont générées en RELATIF par rapport à la page
   courante (« ../ » répété selon la profondeur). Conséquence : le site
   fonctionne aussi bien à la racine d'un domaine que dans un
   sous-répertoire (GitHub Pages de projet, préproduction…), sans
   configuration supplémentaire.

   Le français est servi à la racine ; les autres langues sont préfixées
   (`/en/…`, `/ar/…`). Un lien n'est localisé que si la page cible existe
   réellement dans la langue courante (voir content/i18n.mjs) : sinon il
   pointe vers la version française, ce qui évite toute page morte.
   ========================================================================= */

import { site, absoluteUrl } from '../site.config.mjs';
import { defaultLocale, getLocale, hasLocale } from '../content/i18n.mjs';

/** Chemin d'une page dans une langue donnée. */
export function localizedPath(pathname, locale = getLocale()) {
    if (locale === defaultLocale || !hasLocale(pathname, locale)) return pathname;
    return pathname === '/' ? `/${locale}/` : `/${locale}${pathname}`;
}

/* Profondeur de la page en cours de génération. Les modules de page s'y
   rattachent (`currentDepth as DEPTH`) : une page traduite gagne un niveau
   (ex. `/collections/salons/` → `/en/collections/salons/`) sans que le
   gabarit ait à le savoir. */
let currentDepth = 0;

/** Fixée par tools/build-site.mjs avant chaque rendu. */
export function setDepth(value) {
    currentDepth = value;
}

export { currentDepth };

/** Préfixe relatif correspondant à la profondeur d'une page. */
export function prefix(depth = 0) {
    return '../'.repeat(depth);
}

/**
 * Lien interne relatif, localisé si la traduction existe.
 * @param {string} target chemin absolu interne, ex. « /collections/salons/ »
 * @param {object} options { depth, absolute }
 */
export function href(target, { depth = currentDepth, absolute = false, locale } = {}) {
    if (!target) return '#';
    // Liens externes, protocoles et ancres pures : inchangés
    if (/^(https?:|mailto:|tel:|#)/.test(target)) return target;

    // `locale` permet de pointer vers une AUTRE langue que la langue courante
    // (sélecteur de langue, balises hreflang).
    const path = localizedPath(target, locale);
    const clean = path.startsWith('/') ? path.slice(1) : path;
    return `${absolute ? `${site.basePath}/` : prefix(depth)}${clean}`;
}

/** Chemin relatif d'une ressource statique (jamais localisée). */
export function asset(target, depth = currentDepth) {
    return `${prefix(depth)}${target.replace(/^\//, '')}`;
}

/** URL absolue (canonical, Open Graph, sitemap, données structurées). */
export function canonical(pathname, locale = getLocale()) {
    return absoluteUrl(localizedPath(pathname, locale));
}

/**
 * Profondeur d'un chemin, c'est-à-dire le nombre de « ../ » à remonter.
 * « /collections/salons/ » → 2 · « /404.html » → 0 (un fichier à la racine
 * n'ajoute aucun niveau).
 */
export function depthOf(pathname) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length && segments[segments.length - 1].includes('.')) segments.pop();
    return segments.length;
}

/** Profondeur utilisée pour le rendu en cours (utile au générateur). */
export function getDepth() {
    return currentDepth;
}

export { site };
