/* =========================================================================
   Catalogue produits — source unique de vérité
   -------------------------------------------------------------------------
   Ces données alimentent :
     • les cartes produit des pages de collection et de l'accueil ;
     • la fenêtre de fiche produit (quick view) ;
     • la recherche instantanée et le tiroir de sélection ;
     • les données structurées Schema.org `Product` / `ItemList`.
   Chaque produit appartient à une collection (clé `collection`).
   ========================================================================= */
import { tr } from './i18n.mjs';

/** Base d'URL d'image (les paramètres de largeur/qualité sont ajoutés par le composant). */
const u = (id) => `https://images.unsplash.com/${id}`;

export const products = [
    /* ---------------------------------------------------------------- Salons */
    {
        slug: 'canape-modulaire-al-mina',
        collection: 'salons',
        get name() {
            return tr(
                'Canapé Modulaire « Al-Mina »',
            );
        },
        badge: 'Noyer massif &amp; bouclé',
        price: 3800,
        dimensions: 'L 280 × P 110 × H 72 cm',
        get materials() {
            return tr(
                'Noyer massif huilé, lin bouclé écru, garnissage plumes',
            );
        },
        lead: 'Fabrication 4 à 6 semaines',
        get description() {
            return tr(
                "Chef-d'œuvre des ateliers du port d'Al-Mina : structure apparente en noyer foncé de la vallée, coussins d'assise garnis de plumes et lin bouclé de première sélection. Chaque module est ajustable pour composer un salon sur-mesure, du trois places à la composition d'angle.",
            );
        },
        image: u('photo-1555041469-a586c61ea9bc'),
        get alt() {
            return tr(
                'Canapé modulaire Al-Mina en noyer massif huilé et lin bouclé écru, ébénisterie Maison Tripoli à Tripoli',
            );
        },
    },
    {
        slug: 'fauteuil-club-miramar',
        collection: 'salons',
        get name() {
            return tr(
                'Fauteuil Club « Miramar »',
            );
        },
        badge: 'Édition numérotée',
        price: 1950,
        dimensions: 'L 84 × P 88 × H 78 cm',
        get materials() {
            return tr(
                'Cuir pleine fleur tanné végétal, laiton bronze antique',
            );
        },
        lead: 'Fabrication 4 à 6 semaines',
        get description() {
            return tr(
                "Élégance méditerranéenne intemporelle. Cuir pleine fleur patiné artisanalement dans les cours intérieures de Tripoli, coutures sellier et piètement en laiton brossé. Une édition numérotée de trente pièces par an, fabriquée dans notre atelier du Nord-Liban.",
            );
        },
        image: u('photo-1567016432779-094069958ea5'),
        get alt() {
            return tr(
                'Fauteuil club Miramar en cuir pleine fleur tanné végétal et piètement en laiton bronze',
            );
        },
    },
    {
        slug: 'banquette-sursock',
        collection: 'salons',
        get name() {
            return tr(
                'Banquette « Sursock »',
            );
        },
        badge: 'Velours grège',
        price: 2750,
        dimensions: 'L 220 × P 75 × H 82 cm',
        get materials() {
            return tr(
                'Noyer massif, velours grège, piètement fuselé',
            );
        },
        lead: 'Fabrication 4 à 6 semaines',
        get description() {
            return tr(
                "Banquette de réception inspirée des salons beyrouthins du début du siècle : assise galbée, dossier bas et piètement fuselé tourné à la main. Le velours grège est sélectionné chez nos tisserands partenaires, le bois issu du séchage lent de nos propres granges.",
            );
        },
        image: u('photo-1600210492486-724fe5c67fb0'),
        get alt() {
            return tr(
                "Banquette Sursock en noyer massif et velours grège, assise sur-mesure de salon de réception",
            );
        },
    },

    /* -------------------------------------------------------- Salles à manger */
    {
        slug: 'table-monolithe-citadelle',
        collection: 'salles-a-manger',
        get name() {
            return tr(
                'Table Monolithe « Citadelle »',
            );
        },
        badge: 'Pièce maîtresse',
        price: 4650,
        dimensions: 'L 300 × P 115 × H 76 cm',
        get materials() {
            return tr(
                'Chêne massif sculpté, travertin adouci',
            );
        },
        lead: 'Fabrication 6 à 8 semaines',
        get description() {
            return tr(
                "Inspirée par la pierre historique de la forteresse Raymond de Saint-Gilles à Tripoli. Piétement sculpté à la gouge dans une seule pièce de chêne et plateau de travertin adouci, chanfreiné par nos marbriers du Nord-Liban. Une table de réception dimensionnée pour douze convives.",
            );
        },
        image: u('photo-1617806118233-18e1de247200'),
        get alt() {
            return tr(
                'Table monolithe Citadelle en chêne massif sculpté et travertin veiné, table de réception Maison Tripoli',
            );
        },
    },
    {
        slug: 'table-appoint-tripoli',
        collection: 'salles-a-manger',
        get name() {
            return tr(
                "Table d'Appoint « Tripoli »",
            );
        },
        badge: 'Chêne cérusé',
        price: 1180,
        dimensions: 'L 60 × P 60 × H 52 cm',
        get materials() {
            return tr(
                'Chêne cérusé, finition huilée mate',
            );
        },
        lead: 'Fabrication 3 à 5 semaines',
        get description() {
            return tr(
                "Petite table d'usage, dite « de portage », dont le veinage linéaire est sélectionné à la gouge puis cérusé à la main. Finition sablée et huilée mat pour préserver la clarté méditerranéenne du bois. Idéale en accoudoir de canapé ou en chevet de grande suite.",
            );
        },
        image: u('photo-1538688525198-9b88f6f53126'),
        get alt() {
            return tr(
                "Table d'appoint Tripoli en chêne clair cérusé, finition huilée mate, mobilier sur-mesure libanais",
            );
        },
    },
    {
        slug: 'table-reception-al-bahr',
        collection: 'salles-a-manger',
        get name() {
            return tr(
                'Table de Réception « Al-Bahr »',
            );
        },
        badge: 'Chêne blanchi',
        price: 3900,
        dimensions: 'L 260 × P 110 × H 76 cm',
        get materials() {
            return tr(
                'Chêne blanchi, piètement arqué, vernis déperlant',
            );
        },
        lead: 'Fabrication 6 à 8 semaines',
        get description() {
            return tr(
                "Dessinée pour une résidence balnéaire du littoral de Tripoli : chêne blanchi à la main, piètement arqué qui libère l'assise des convives et plateau traité pour résister aux embruns. Une pièce pensée pour les repas d'été en bord de mer.",
            );
        },
        image: u('photo-1616486338812-3dadae4b4ace'),
        get alt() {
            return tr(
                'Table de réception Al-Bahr en chêne blanchi pour salle à manger de résidence balnéaire à Tripoli',
            );
        },
    },

    /* --------------------------------------------------------------- Chambres */
    {
        slug: 'ensemble-lit-qadisha',
        collection: 'chambres',
        get name() {
            return tr(
                'Ensemble Lit « Qadisha »',
            );
        },
        badge: 'Tête de lit sur-mesure',
        price: 4100,
        dimensions: 'Pour matelas 180 × 200 cm (King Size)',
        get materials() {
            return tr(
                'Chêne fumé libanais, lin capitonné écru',
            );
        },
        lead: 'Fabrication 5 à 7 semaines',
        get description() {
            return tr(
                "Hommage aux forêts séculaires de la Qadisha. Tête de lit sculptée dans un chêne fumé libanais et alcôve capitonnée en lin écru déperlant. L'ensemble est réalisé aux dimensions exactes de votre chambre, avec chevets et banc de pied assortis sur demande.",
            );
        },
        image: u('photo-1505693416388-ac5ce068fe85'),
        get alt() {
            return tr(
                'Ensemble lit Qadisha à tête de lit capitonnée en lin écru et structure en chêne fumé libanais',
            );
        },
    },
    {
        slug: 'suite-achrafieh',
        collection: 'chambres',
        get name() {
            return tr(
                'Suite de Nuit « Achrafieh »',
            );
        },
        badge: 'Suite complète',
        price: 5200,
        dimensions: 'Sur mesure — chambre de 20 à 40 m²',
        get materials() {
            return tr(
                'Chêne fumé, boiseries intégrées, laiton brossé',
            );
        },
        lead: 'Fabrication 8 à 12 semaines',
        get description() {
            return tr(
                "Suite de nuit complète : tête de lit, boiseries murales, chevets suspendus et banc capitonné dessinés pour un même volume. Le projet démarre par un relevé de cotes sur place ou sur plan, puis un prototype de teinte validé en atelier avant lancement de la fabrication.",
            );
        },
        image: u('photo-1598928506311-c55ded91a20c'),
        get alt() {
            return tr(
                "Suite de nuit Achrafieh avec boiseries intégrées en chêne fumé et chevets suspendus en laiton",
            );
        },
    },
    {
        slug: 'boiseries-tete-de-lit',
        collection: 'chambres',
        get name() {
            return tr(
                "Boiseries &amp; Tête de Lit sur-Mesure « Al-Fayha'a »",
            );
        },
        badge: 'Projet sur devis',
        price: 2900,
        priceFrom: true,
        dimensions: 'Étude sur plan ou relevé sur site',
        get materials() {
            return tr(
                'Chêne, noyer ou ébène — teintes personnalisées',
            );
        },
        lead: 'Étude 2 semaines, fabrication 8 à 14 semaines',
        get description() {
            return tr(
                "Boiseries murales et têtes de lit dessinées à la demande pour les chambres aux géométries complexes : pans coupés, soupentes, sous-combles. Nous fournissons les plans d'exécution, le calepinage et les prototypes de teinte avant toute mise en fabrication dans notre atelier de Tripoli.",
            );
        },
        image: u('photo-1600607687939-ce8a6c25118c'),
        get alt() {
            return tr(
                "Boiseries murales et tête de lit sur-mesure en chêne pour chambre d'une résidence Maison Tripoli",
            );
        },
    },

    /* ------------------------------------------------------------ Rangements */
    {
        slug: 'enfilade-tell-raymond',
        collection: 'rangements',
        get name() {
            return tr(
                'Enfilade « Tell Raymond »',
            );
        },
        badge: "Menuiserie d'art",
        price: 3400,
        dimensions: 'L 220 × P 50 × H 82 cm',
        get materials() {
            return tr(
                'Noyer massif, marbre noir Marquina',
            );
        },
        lead: 'Fabrication 6 à 8 semaines',
        get description() {
            return tr(
                "Façades composées de 120 cannelures fraisées individuellement par nos maîtres menuisiers tripolitains, plateau en marbre noir Marquina et charnières amorties. Un rangement de réception qui dialogue avec les pierres sombres de la citadelle.",
            );
        },
        image: u('photo-1533090161767-e6ffed986c88'),
        get alt() {
            return tr(
                'Enfilade Tell Raymond aux façades cannelées faites main et plateau en marbre noir Marquina',
            );
        },
    },
    {
        slug: 'console-bahia',
        collection: 'rangements',
        get name() {
            return tr(
                'Console Basse « Bahia »',
            );
        },
        badge: 'Noyer sculpté',
        price: 2250,
        dimensions: 'L 180 × P 42 × H 78 cm',
        get materials() {
            return tr(
                'Noyer royal ciré à la cire d’abeille',
            );
        },
        lead: 'Fabrication 4 à 6 semaines',
        get description() {
            return tr(
                "Console d'entrée ou de salon taillée dans un noyer royal séché 18 mois en grange, puis polie et cirée à la main à la cire d'abeille biologique libanaise. Deux tiroirs à fond de velours et une niche ouverte pour les objets du quotidien.",
            );
        },
        image: u('photo-1600585154340-be6161a56a0c'),
        get alt() {
            return tr(
                'Console basse Bahia en noyer royal sculpté et ciré à la main, mobilier d’entrée Maison Tripoli',
            );
        },
    },
    {
        slug: 'bureau-ministre',
        collection: 'rangements',
        get name() {
            return tr(
                'Bureau Ministre « Citadelle »',
            );
        },
        badge: 'Ébène &amp; bronze',
        price: 3150,
        dimensions: 'L 160 × P 80 × H 76 cm',
        get materials() {
            return tr(
                'Ébène teinté, laque satinée 7 couches, bronze',
            );
        },
        lead: 'Fabrication 6 à 8 semaines',
        get description() {
            return tr(
                "Bureau d'apparat à caissons, laqué satiné à l'ancienne en sept couches successives dans nos ateliers de Tripoli. Le plateau est protégé par un cuir patiné, les poignées fondues en bronze massif et ajustées à la main sur chaque tiroir.",
            );
        },
        image: u('photo-1524758631624-e2822e304c36'),
        get alt() {
            return tr(
                "Bureau ministre Citadelle en ébène teinté et laque satinée avec poignées en bronze massif",
            );
        },
    },

    /* -------------------------------------------------- Éclairage &amp; objets */
    {
        slug: 'lustre-khan',
        collection: 'eclairage-objets',
        get name() {
            return tr(
                'Lustre Géométrique « Khan »',
            );
        },
        badge: 'Laiton massif',
        price: 1420,
        dimensions: 'Diamètre 90 cm × H 110 cm réglable',
        get materials() {
            return tr(
                'Laiton massif martelé à la main',
            );
        },
        lead: 'Fabrication 4 à 6 semaines',
        get description() {
            return tr(
                "Laiton lourd façonné au marteau dans les ruelles du Souk des Cuivres de Tripoli, suspension réglable et diffusion lumineuse chaude. Chaque facette est débitée, ciselée puis patinée à la main : aucune pièce n'est identique à une autre.",
            );
        },
        image: u('photo-1513519245088-0e12902e5a38'),
        get alt() {
            return tr(
                'Lustre géométrique Khan en laiton massif martelé à la main, éclairage d’art de Tripoli',
            );
        },
    },
    {
        slug: 'sellette-travertin',
        collection: 'eclairage-objets',
        get name() {
            return tr(
                'Sellette Monolithe en Travertin',
            );
        },
        badge: 'Marbrerie levantine',
        price: 890,
        dimensions: 'L 40 × P 40 × H 90 cm',
        get materials() {
            return tr(
                'Travertin romain adouci et chanfreiné',
            );
        },
        lead: 'Fabrication 3 à 5 semaines',
        get description() {
            return tr(
                "Colonne d'exposition taillée dans un bloc unique de travertin, adoucie et chanfreinée par nos marbriers partenaires du Nord-Liban. Pensée pour mettre en valeur une céramique, une sculpture ou une lampe, elle porte le veinage naturel de la pierre d'un seul tenant.",
            );
        },
        image: u('photo-1618219908412-a29a1bb7b86e'),
        get alt() {
            return tr(
                'Sellette monolithe en travertin romain adouci, socle d’exposition en pierre naturelle levantine',
            );
        },
    },
];

/** Retourne les produits d'une collection, dans l'ordre du catalogue. */
export function productsByCollection(slug) {
    return products.filter((product) => product.collection === slug);
}

/** Retrouve un produit par son slug. */
export function productBySlug(slug) {
    return products.find((product) => product.slug === slug);
}

/** Fourchette de prix d'une collection (pour le balisage AggregateOffer). */
export function priceRange(slug) {
    const prices = productsByCollection(slug).map((product) => product.price);
    return { low: Math.min(...prices), high: Math.max(...prices) };
}
