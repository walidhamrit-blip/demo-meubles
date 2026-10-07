/* =========================================================================
   Signature graphique des maisons et fournisseurs partenaires
   -------------------------------------------------------------------------
   Le premier ruban défilant n'affiche plus de texte : chaque partenaire est
   représenté par une MARQUE GRAPHIQUE — un monogramme dans un cadre fin suivi
   d'un mot-symbole — dessinée ici en SVG vectoriel.

   Pourquoi des SVG écrits à la main plutôt que des fichiers de logo :

   • les logos officiels des maisons citées sont protégés et ne peuvent pas
     être embarqués sans autorisation écrite ; le site affiche donc SA propre
     signature typographique des partenaires, dans le style de la Maison ;
   • le tracé est vectoriel et monochrome (`currentColor`) : il suit la couleur
     du thème actif (clair, Ébène, Noyer) sans le moindre fichier
     supplémentaire, reste net sur tout écran et pèse quelques centaines
     d'octets ;
   • le nom de chaque partenaire reste dans le DOM, dans l'élément `<title>`
     du SVG : les lecteurs d'écran l'annoncent et les moteurs le lisent, même
     si le mot-symbole est décoratif.

   Pour utiliser un vrai fichier de logo : le déposer dans
   `assets/img/brands/<slug>.svg` puis remplacer `mark()` par les balises
   `<img>` correspondantes dans src/templates/ribbons.mjs.
   ========================================================================= */

import { tr } from './i18n.mjs';

/**
 * Maisons, fournisseurs et corps de métier partenaires.
 * `name` est la clé de traduction (nom lu par les technologies d'assistance),
 * `monogram` et `wordmark` composent la marque visible.
 */
const MARKS = [
    { slug: 'rubelli', name: 'Rubelli', monogram: 'R', wordmark: 'RUBELLI' },
    { slug: 'pierre-frey', name: 'Pierre Frey', monogram: 'PF', wordmark: 'PIERRE FREY' },
    { slug: 'loro-piana', name: 'Loro Piana', monogram: 'LP', wordmark: 'LORO PIANA' },
    { slug: 'marquina', name: 'Marbre noir Marquina', monogram: 'M', wordmark: 'MARQUINA' },
    { slug: 'marbriers', name: 'Marbriers du Nord-Liban', monogram: 'MN', wordmark: 'MARBRIERS' },
    { slug: 'tanneries', name: 'Tanneries partenaires', monogram: 'TP', wordmark: 'TANNERIES' },
    { slug: 'tisserands', name: 'Tisserands partenaires', monogram: 'TI', wordmark: 'TISSERANDS' },
    { slug: 'travertin', name: 'Travertin du bassin levantin', monogram: 'TR', wordmark: 'TRAVERTIN' },
    { slug: 'laiton', name: 'Laiton patiné &amp; bronze', monogram: 'LB', wordmark: 'LAITON & BRONZE' },
];

/** Hauteur du dessin (l'échelle est donnée par la CSS, en `height`). */
const HEIGHT = 44;
/** Largeur réservée au cadre du monogramme et à l'espace qui le suit. */
const BADGE = 36;
const GAP = 16;
/** Largeur moyenne d'un caractère du mot-symbole, à la taille du dessin. */
const CHAR = 9.4;

/** Marques du ruban, avec le libellé traduit dans la langue de la page. */
export function brandMarks() {
    return MARKS.map((mark) => ({ ...mark, label: tr(mark.name) }));
}

/**
 * Marque graphique complète : monogramme encadré + mot-symbole.
 *
 * `textLength` fixe la longueur du mot-symbole : quelle que soit la police
 * disponible sur la machine du visiteur, le dessin garde ses proportions et
 * ne débordé pas de son cadre.
 */
export function mark(entry) {
    const length = Math.round(entry.wordmark.length * CHAR);
    const width = BADGE + GAP + length + 4;
    const badge = `<rect x="0.6" y="4" width="${BADGE - 1.2}" height="${BADGE - 1.2}" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.1"></rect>`;
    const monogram = `<text x="${BADGE / 2}" y="27.5" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="15" fill="currentColor">${entry.monogram}</text>`;
    const wordmark = `<text x="${BADGE + GAP}" y="27.5" font-family="Georgia, 'Times New Roman', serif" font-size="16" letter-spacing="2.2" textLength="${length}" lengthAdjust="spacing" fill="currentColor">${entry.wordmark}</text>`;

    // Une seule ligne : le balisage est répété deux fois par page (contenu et
    // copie de bouclage), l'indentation coûterait plusieurs kilo-octets.
    return `<svg class="marquee-logo" viewBox="0 0 ${width} ${HEIGHT}" role="img" xmlns="http://www.w3.org/2000/svg"><title>${entry.label}</title>${badge}${monogram}${wordmark}</svg>`;
}

/** Version autonome (fichier .svg) de la même marque. */
export function markFile(entry) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Signature graphique Maison Tripoli — partenaire : ${entry.name.replace('&amp;', '&')}
     Fichier généré par tools/build-brand-marks.mjs : ne pas éditer à la main. -->
${mark({ ...entry, label: entry.name.replace('&amp;', '&') }).replace('class="marquee-logo" ', '')}
`;
}
