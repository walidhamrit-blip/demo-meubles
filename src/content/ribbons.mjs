/* =========================================================================
   Contenu des rubans défilants
   -------------------------------------------------------------------------
   Ruban 1 — les maisons et fournisseurs avec lesquels l'atelier travaille.
             Les noms sont ceux DÉJÀ cités dans le contenu éditorial du site
             (FAQ des collections, fiches produits) : aucune affirmation
             nouvelle n'est introduite ici.
   Ruban 2 — les savoir-faire et services de la Maison, repris du contenu des
             pages /atelier/ et /sur-mesure/.
   ========================================================================= */

/** Maisons, fournisseurs et corps de métier partenaires. */
import { tr } from './i18n.mjs';

const PARTNER_HOUSES = [
    'Rubelli',
    'Pierre Frey',
    'Loro Piana',
    'Marbre noir Marquina',
    'Marbriers du Nord-Liban',
    'Tanneries partenaires',
    'Tisserands partenaires',
    'Travertin du bassin levantin',
    'Laiton patiné &amp; bronze',
];

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
export function partnerHouses() {
    return PARTNER_HOUSES.map((entry) => tr(entry));
}

export function houseServices() {
    return HOUSE_SERVICES.map((entry) => tr(entry));
}
