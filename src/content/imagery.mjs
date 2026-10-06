/* =========================================================================
   Référentiel d'images éditoriales
   -------------------------------------------------------------------------
   Centralise les visuels d'ambiance (hero, vignettes de collection,
   projets, atelier) afin qu'ils soient cohérents d'une page à l'autre et
   qu'un remplacement se fasse en un seul endroit.

   ⚠️ Les visuels proviennent d'Unsplash pour la démonstration. En production,
      les auto-héberger (WebP/AVIF) sur le domaine : il suffira de remplacer
      les URL de base ici et dans src/content/products.mjs.
   ========================================================================= */

const u = (id) => `https://images.unsplash.com/${id}`;

/** Image du hero (élément LCP de la page d'accueil). */
export const heroImage = {
    src: u('photo-1618221195710-dd6b41faaea6'),
    alt: "Salon contemporain habillé par Maison Tripoli : canapé en noyer massif et lin écru, ébénisterie d'art à Tripoli",
    widths: [800, 1200, 1600, 2000],
    width: 2000,
    height: 1125,
};

/** Vignette de tête de chaque collection (accueil, hub, maillage interne). */
export const collectionImages = {
    salons: {
        src: u('photo-1600210492486-724fe5c67fb0'),
        alt: 'Salon de réception meublé par Maison Tripoli : assises en noyer massif et velours grège',
        widths: [400, 600, 800],
        width: 800,
        height: 1000,
    },
    'salles-a-manger': {
        src: u('photo-1616486338812-3dadae4b4ace'),
        alt: 'Salle à manger équipée par Maison Tripoli : table de réception en chêne blanchi et chaises de cuir',
        widths: [400, 600, 800],
        width: 800,
        height: 1000,
    },
    chambres: {
        src: u('photo-1598928506311-c55ded91a20c'),
        alt: 'Chambre sur mesure Maison Tripoli : boiseries en chêne fumé et tête de lit capitonnée en lin',
        widths: [400, 600, 800],
        width: 800,
        height: 1000,
    },
    rangements: {
        src: u('photo-1533090161767-e6ffed986c88'),
        alt: "Enfilade cannelée en noyer massif et marbre noir, menuiserie d'art de l'atelier Maison Tripoli",
        widths: [400, 600, 800],
        width: 800,
        height: 1000,
    },
    'eclairage-objets': {
        src: u('photo-1513519245088-0e12902e5a38'),
        alt: "Lustre en laiton massif martelé et objets en travertin, éclairage d'art Maison Tripoli",
        widths: [400, 600, 800],
        width: 800,
        height: 1000,
    },
};

/** Visuels des sections éditoriales (atelier, sur-mesure, projets). */
export const editorialImages = {
    atelierArtisan: {
        src: u('photo-1540518614846-7ede433c4ef5'),
        alt: "Maître ébéniste travaillant le noyer à l'établi dans l'atelier de menuiserie d'art de Maison Tripoli au Liban",
        widths: [600, 800, 1000],
        width: 1000,
        height: 1250,
    },
    surMesureInterieur: {
        src: u('photo-1600607687939-ce8a6c25118c'),
        alt: 'Intérieur sur-mesure Maison Tripoli : boiseries intégrées, mobilier en noyer et travertin pour une résidence',
        widths: [800, 1200, 1600],
        width: 1600,
        height: 1200,
    },
};

/** Résidences livrées (page Projets). */
export const projectImages = [
    {
        name: 'Penthouse Sursock',
        location: 'Beyrouth / Achrafieh',
        caption: 'Salon sur-mesure noyer et velours grège',
        src: u('photo-1600210492486-724fe5c67fb0'),
        alt: 'Salon du Penthouse Sursock à Beyrouth : canapé sur-mesure en noyer et velours grège signé Maison Tripoli',
    },
    {
        name: 'Villa Al-Bahr',
        location: 'Tripoli littoral',
        caption: 'Table en chêne blanchi et chaises cuir sellier',
        src: u('photo-1616486338812-3dadae4b4ace'),
        alt: 'Salle à manger de la Villa Al-Bahr à Tripoli : table en chêne blanchi et chaises en cuir sellier cousues main',
    },
    {
        name: 'Private Estate',
        location: 'Dubaï Hills',
        caption: 'Boiseries intégrées et suite présidentielle',
        src: u('photo-1598928506311-c55ded91a20c'),
        alt: "Chambre principale d'une résidence privée à Dubaï : boiseries intégrées et suite présidentielle en chêne fumé",
    },
];
