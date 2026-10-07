/* =========================================================================
   Rubans défilants (marquee)
   -------------------------------------------------------------------------
   Deux bandeaux de sens opposés, affichés avant le pied de page :

     1. les maisons et fournisseurs partenaires  → défilement vers la gauche
     2. les savoir-faire et services de la Maison → défilement vers la droite

   Choix techniques, guidés par le référencement et l'accessibilité :

   • Ruban 1 : chaque partenaire est une MARQUE GRAPHIQUE (signature
     typographique de la Maison, tracée en SVG vectoriel — voir
     src/content/brand-marks.mjs). Le nom est porté par le `<title>` du SVG,
     jamais par une image bitmap : le contenu reste lisible par les moteurs
     et annoncé par les lecteurs d'écran.
   • Ruban 2 : le contenu est du TEXTE réel dans le DOM, indexable et lisible
     sans CSS.
   • La copie de bouclage porte `aria-hidden="true"` et `data-marquee-clone` :
     les lecteurs d'écran ne lisent pas deux fois la liste, et la version
     « mouvement réduit » masque ce doublon.
   • L'animation est en CSS pur (transform) : aucune requête, aucun
     JavaScript, aucun décalage de mise en page (CLS).
   • Aucun lien dans les rubans : les cibles cliquables en mouvement sont
     pénibles au clavier. Le maillage interne reste assuré par le menu, le
     fil d'Ariane et le pied de page.
   ========================================================================= */

import { brandMarks, mark } from '../content/brand-marks.mjs';
import { houseServices } from '../content/ribbons.mjs';
import { tr } from '../content/i18n.mjs';

const MODIFIER = {
    brands: 'marquee-track--brands',
    services: 'marquee-track--services',
};

/** Un élément de ruban : texte (services) ou marque graphique (partenaires). */
function item(content, clone, modifier = '') {
    return `<li class="marquee-item${modifier}"${clone ? ' aria-hidden="true" data-marquee-clone' : ''}>${content}</li>`;
}

/**
 * Ruban complet : titre accessible + piste dupliquée pour un bouclage continu.
 * @param {object} options
 * @param {string[]} options.items    contenus affichés (texte ou SVG)
 * @param {'brands'|'services'} options.kind
 * @param {string} options.label      intitulé lu par les technologies d'assistance
 * @param {string} [options.modifier] classe ajoutée aux éléments
 */
function ribbon({ items, kind, label, modifier = '' }) {
    const list = items.map((entry) => item(entry, false, modifier)).join('\n                    ');
    const clone = items.map((entry) => item(entry, true, modifier)).join('\n                    ');

    return `<!-- =====================================================================
         Ruban défilant — ${label}
         ===================================================================== -->
    <section class="no-print border-y border-line bg-surface-2 py-6 overflow-hidden" aria-label="${label}">
        <div class="marquee">
            <ul class="marquee-track ${MODIFIER[kind]} list-none m-0 p-0">
                    ${list}
                    ${clone}
            </ul>
        </div>
    </section>`;
}

/** Ruban 1 — maisons et fournisseurs partenaires (défilement vers la gauche). */
export function partnerRibbon() {
    return ribbon({
        items: brandMarks().map(mark),
        kind: 'brands',
        label: tr('Maisons et fournisseurs avec lesquels travaille l’atelier'),
        modifier: ' marquee-item--brand',
    });
}

/** Ruban 2 — savoir-faire et services de la Maison (défilement vers la droite). */
export function serviceRibbon() {
    return ribbon({
        items: houseServices(),
        kind: 'services',
        label: tr('Savoir-faire et services de la Maison Tripoli'),
    });
}
