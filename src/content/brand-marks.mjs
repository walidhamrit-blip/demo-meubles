/* =========================================================================
   Marques des maisons et fournisseurs partenaires
   -------------------------------------------------------------------------
   Le premier ruban défilant n'affiche plus aucun libellé texte : chaque
   partenaire y est représenté par une IMAGE — son sigle, c'est-à-dire son
   monogramme dans un cadre fin suivi de son nom en lettres capitales.

   Ce module est la source unique de vérité : tools/build-logos.mjs en déduit
   les fichiers `assets/img/marques/<slug>.svg`, puis les pages les affichent
   avec une balise <img>.

   Pourquoi des sigles dessinés par la Maison plutôt que les logos officiels :

   • les logos officiels des maisons citées sont des marques protégées : les
     reproduire sans autorisation écrite serait irrégulier. Le site affiche
     donc SA propre signature typographique de ses partenaires, dans le style
     de la Maison — sobre, monochrome, vectoriel ;
   • pour passer à un logo officiel : déposer le fichier autorisé sous
     `assets/img/marques/<slug>.svg` (mêmes dimensions proportionnelles) ; le
     balisage, les attributs `alt`, `width` et `height` ne changent pas.

   Référencement et accessibilité : le nom du partenaire est porté par le
   texte alternatif de l'image (et par l'élément <title> du fichier SVG), il
   reste donc lisible par les moteurs de recherche comme par les lecteurs
   d'écran ; `width` et `height` sont fixes pour éviter tout décalage de mise
   en page (CLS) ; les images du ruban sont chargées en différé.
   ========================================================================= */

import { tr } from './i18n.mjs';

/** Hauteur du dessin, en unités du viewBox. */
const HEIGHT = 44;
/** Côté du cadre du monogramme et espace qui le sépare du nom. */
const BADGE = 36;
const GAP = 16;
/** Largeur moyenne d'un caractère du nom, à la taille du dessin. */
const CHAR = 9.4;
/** Encre du thème clair ; les thèmes sombres l'inversent en CSS. */
const INK = '#231f1d';

/**
 * Maisons, fournisseurs et corps de métier partenaires.
 * `name` est la clé de traduction (texte alternatif de l'image) ;
 * `monogram` et `wordmark` composent le sigle visible.
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
    { slug: 'laiton', name: 'Laiton patiné &amp; bronze', monogram: 'LB', wordmark: 'LAITON &amp; BRONZE' },
];

/** Dimensions du fichier image, déduites du nom affiché. */
function sizeOf(entry) {
    const length = Math.round(entry.wordmark.length * CHAR);
    return { width: BADGE + GAP + length + 4, height: HEIGHT };
}

/**
 * Marques prêtes à afficher : chemin du fichier image, dimensions et nom
 * traduit dans la langue de la page en cours.
 */
export function brandMarks() {
    return MARKS.map((entry) => ({ ...entry, ...sizeOf(entry), label: tr(entry.name) }));
}

/**
 * Contenu du fichier image d'une marque (SVG autonome).
 *
 * `textLength` fixe la longueur du nom : quelle que soit la police dont
 * dispose le visiteur, le dessin garde ses proportions.
 */
export function markFile(entry) {
    const { width, height } = sizeOf(entry);
    const length = Math.round(entry.wordmark.length * CHAR);

    const badge = `<rect x="0.6" y="4" width="${BADGE - 1.2}" height="${BADGE - 1.2}" rx="1.5" fill="none" stroke="${INK}" stroke-width="1.1"/>`;
    const monogram = `<text x="${BADGE / 2}" y="27.5" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="15" fill="${INK}">${entry.monogram}</text>`;
    const wordmark = `<text x="${BADGE + GAP}" y="27.5" font-family="Georgia,'Times New Roman',serif" font-size="16" letter-spacing="2.2" textLength="${length}" lengthAdjust="spacing" fill="${INK}">${entry.wordmark}</text>`;

    return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Sigle du partenaire « ${entry.name.replace('&amp;', '&')} » — Maison Tripoli.
     Fichier engendré par tools/build-logos.mjs : ne pas modifier à la main,
     éditer src/content/brand-marks.mjs puis relancer « npm run build:logos ». -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img">
    <title>${entry.name}</title>
    ${badge}
    ${monogram}
    ${wordmark}
</svg>
`;
}
