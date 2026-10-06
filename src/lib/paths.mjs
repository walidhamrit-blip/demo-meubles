/* =========================================================================
   Gestion des chemins
   -------------------------------------------------------------------------
   Toutes les URL internes sont générées en RELATIF par rapport à la page
   courante (« ../ » répété selon la profondeur). Conséquence : le site
   fonctionne aussi bien à la racine d'un domaine que dans un
   sous-répertoire (GitHub Pages de projet, préproduction…), sans
   configuration supplémentaire.
   ========================================================================= */

import { site, absoluteUrl } from '../site.config.mjs';

/** Préfixe relatif correspondant à la profondeur d'une page. */
export function prefix(depth = 0) {
    return '../'.repeat(depth);
}

/**
 * Lien interne relatif.
 * @param {string} target  chemin absolu interne, ex. « /collections/salons/ »
 * @param {object} options { depth, rootAbsolute }
 */
export function href(target, { depth = 0, rootAbsolute = false } = {}) {
    if (!target) return '#';
    // Liens externes, protocoles et ancres pures : inchangés
    if (/^(https?:|mailto:|tel:|#)/.test(target)) return target;

    const clean = target.startsWith('/') ? target.slice(1) : target;
    const base = rootAbsolute ? `${site.basePath}/` : prefix(depth);
    return `${base}${clean}`;
}

/** Chemin relatif d'une ressource statique. */
export function asset(target, depth = 0) {
    return `${prefix(depth)}${target.replace(/^\//, '')}`;
}

/** URL absolue (canonical, Open Graph, sitemap). */
export function canonical(pathname) {
    return absoluteUrl(pathname);
}

export { site };
