/* =========================================================================
   Configuration globale du site — Maison Tripoli
   -------------------------------------------------------------------------
   Source unique de vérité pour l'identité, l'URL publique, la navigation
   et les coordonnées (NAP : Name / Address / Phone). Ces valeurs alimentent
   les balises canoniques, les données structurées Schema.org et le plan de
   site : les modifier ici suffit à mettre tout le site à jour.
   ========================================================================= */

export const site = {
    name: 'Maison Tripoli',
    legalName: 'Maison Tripoli — Atelier &amp; Manufacture de Mobilier',
    tagline: "Mobilier d'art & haute ébénisterie",
    foundingYear: 1948,

    /* ⚠️ Domaine de production : à remplacer par le domaine réel.
       Utilisé pour <link rel="canonical">, Open Graph, JSON-LD et sitemap. */
    url: 'https://www.maisontripoli.com',

    /* Chemin de base si le site est servi dans un sous-répertoire.
       Exemple GitHub Pages de projet : '/demo-meubles'. Laisser vide pour
       un déploiement à la racine du domaine. */
    basePath: '',

    locale: 'fr_FR',
    lang: 'fr',
    currency: 'USD',
    themeColor: '#231F1D',

    contact: {
        phone: '+961&nbsp;6&nbsp;442&nbsp;890',
        phoneHref: '+9616442890',
        mobile: '+961&nbsp;70&nbsp;123&nbsp;456',
        mobileHref: '+96170123456',
        email: 'contact@maisontripoli.com',
        street: "Boulevard Fouad Chehab, Quartier des Ateliers d'Art",
        locality: 'Tripoli',
        region: 'Liban-Nord',
        postalCode: '1300',
        country: 'LB',
        countryName: 'Liban',
        geo: { latitude: 34.4367, longitude: 35.8497 },
        hours: [
            {
                days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '09:30',
                closes: '18:30',
            },
        ],
        displayHours: 'Lundi – Samedi : 09h30 à 18h30 • Dimanche : sur rendez-vous exclusif',
        mapsUrl:
            'https://www.google.com/maps/search/?api=1&query=Tripoli+Liban+Rue+des+Eb%C3%A9nistes',
    },

    social: {
        instagram: 'https://www.instagram.com/maisontripoli',
        facebook: 'https://www.facebook.com/maisontripoli',
    },

    /* Navigation principale (desktop). `collections` est déroulé
       automatiquement dans un sous-menu alimenté par src/content/collections.mjs */
    nav: [
        { label: 'Collections', path: '/collections/', hasCollectionsMenu: true },
        { label: "L'Atelier", path: '/atelier/' },
        { label: 'Sur-Mesure', path: '/sur-mesure/' },
        { label: 'Projets', path: '/projets/' },
        { label: 'Showroom', path: '/contact/' },
    ],

    /* Colonnes du pied de page */
    footerNav: [
        {
            title: 'La Maison',
            links: [
                { label: "L'histoire de Tripoli", path: '/atelier/' },
                { label: 'Nos maîtres ébénistes', path: '/atelier/#savoir-faire' },
                { label: 'Service sur-mesure', path: '/sur-mesure/' },
                { label: 'Espace professionnels', path: '/sur-mesure/#architectes' },
                { label: 'Demeures réalisées', path: '/projets/' },
            ],
        },
    ],

    legalLinks: [
        { label: 'Mentions légales', path: '/mentions-legales/' },
        { label: 'Conditions de vente', path: '/mentions-legales/#conditions-de-vente' },
        { label: 'Expéditions', path: '/mentions-legales/#expeditions' },
    ],

    /** Zones desservies (référencement local + export). Noms localisés au
        rendu par `localized()` : les données structurées décrivent le marché
        de la page, pas celui de la rédaction. */
    areaServed: [
        { type: 'Country', name: { fr: 'Liban', en: 'Lebanon', ar: 'لبنان' } },
        { type: 'Country', name: { fr: 'France', en: 'France', ar: 'فرنسا' } },
        {
            type: 'Country',
            name: { fr: 'Émirats arabes unis', en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
        },
        { type: 'Country', name: { fr: 'Arabie saoudite', en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' } },
    ],
};

/** Construit une URL absolue à partir d'un chemin interne. */
export function absoluteUrl(pathname) {
    const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return `${site.url}${clean === '/' ? '/' : clean}`;
}
