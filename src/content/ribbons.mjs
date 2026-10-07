/* =========================================================================
   Contenu des rubans défilants
   -------------------------------------------------------------------------
   Ruban 1 — les maisons et fournisseurs avec lesquels l'atelier travaille :
             leur signature graphique est définie dans brand-marks.mjs (les
             noms sont ceux DÉJÀ cités dans le contenu éditorial du site —
             FAQ des collections, fiches produits — aucune affirmation
             nouvelle n'est introduite ici).
   Ruban 2 — les savoir-faire et services de la Maison, repris du contenu des
             pages /atelier/ et /sur-mesure/.
   ========================================================================= */

import { tr } from './i18n.mjs';

const HOUSE_SERVICES = [
    'Ébénisterie sur-mesure',
    'Menuiserie d’art',
    'Agencement &amp; boiseries',
    'Marbrerie levantine',
    'Éclairage sur-mesure',
    'Restauration de mobilier',
    'Relevé sur site &amp; dessins d’exécution',
    'Prototypes de teinte &amp; nomenclatures matières',
    'Livraison, pose &amp; installation internationale',
];

/* Les libellés sont traduits au moment du rendu : les rubans sont construits
   page par page, donc dans la langue de la page en cours. */
export function houseServices() {
    return HOUSE_SERVICES.map((entry) => tr(entry));
}
