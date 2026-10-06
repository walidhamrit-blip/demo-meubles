/* =========================================================================
   Page — Projets &amp; réalisations  « /projets/ »
   -------------------------------------------------------------------------
   Vitrine de références : chaque résidence devient un cas d'usage indexable
   (lieu + type de mobilier), avec lien vers la collection concernée.
   ========================================================================= */

import {
    currentDepth as DEPTH,
    href,
} from '../lib/paths.mjs';
import { site } from '../site.config.mjs';
import { collectionBySlug } from '../content/collections.mjs';
import { tr } from '../content/i18n.mjs';
import {
    icon,
    responsiveImage,
    sectionHeading,
    breadcrumbs,
    breadcrumbSchema,
    storeSchema,
    STORE_ID,
} from '../templates/components.mjs';
import { ctaBand } from '../templates/sections.mjs';

const PATH = '/projets/';
const projects = [
    {
        name: 'Penthouse Sursock',
        location: 'Beyrouth / Achrafieh — Liban',
        year: '2023',
        collection: 'salons',
        scope: 'Salon de réception complet',
        description:
            "Un appartement de réception en hauteur : canapé modulaire composé en noyer foncé, banquette filante sous les fenêtres et suspension en laiton martelé. Le mobilier reprend la teinte des menuiseries existantes pour ne pas rompre l'unité du volume.",
        src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
        alt: 'Salon du Penthouse Sursock à Beyrouth équipé par Maison Tripoli : canapé en noyer massif et velours grège',
    },
    {
        name: 'Villa Al-Bahr',
        location: 'Tripoli littoral — Liban',
        year: '2024',
        collection: 'salles-a-manger',
        scope: 'Salle à manger &amp; terrasse',
        description:
            "Résidence balnéaire pensée pour les repas d'été : table de réception en chêne blanchi traitée contre les embruns, chaises en cuir sellier et banc filant. Les plateaux ont été dimensionnés pour quatorze convives, en vérifiant les passages de service.",
        src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
        alt: 'Salle à manger de la Villa Al-Bahr à Tripoli : table en chêne blanchi et chaises en cuir sellier cousues main',
    },
    {
        name: 'Private Estate',
        location: 'Dubaï Hills — Émirats arabes unis',
        year: '2024',
        collection: 'chambres',
        scope: 'Suite présidentielle &amp; boiseries',
        description:
            "Suite principale livrée clé en main : boiseries murales toute hauteur en chêne fumé, tête de lit capitonnée aux cotes de la pièce et chevets suspendus en laiton brossé. Fabrication à Tripoli, pose sous gants blancs par nos équipes.",
        src: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c',
        alt: 'Chambre principale d’une résidence privée à Dubaï : boiseries intégrées et suite présidentielle en chêne fumé',
    },
    {
        name: 'Appartement Monnot',
        location: 'Beyrouth — Liban',
        year: '2022',
        collection: 'rangements',
        scope: 'Enfilade &amp; bibliothèque',
        description:
            "Décloisonnement d'une entrée étroite par une enfilade cannelée en noyer, dont le plateau en marbre noir Marquina prolonge la table de réception. Une bibliothèque toute hauteur a été ajoutée pour masquer une gaine technique.",
        src: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88',
        alt: 'Enfilade cannelée en noyer et bibliothèque toute hauteur installées dans un appartement de Beyrouth',
    },
    {
        name: 'Restaurant Beit El-Mina',
        location: 'Tripoli — Liban',
        year: '2023',
        collection: 'eclairage-objets',
        scope: 'Éclairage &amp; mobilier de salle',
        description:
            "Quarante-deux suspensions en laiton massif martelé, patinées pour résister à l'air marin, et tables en chêne massif protégées par une finition déperlante. Un chantier livré par lots numérotés, posé en deux nuits sans fermeture de l'établissement.",
        src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38',
        alt: 'Suspensions en laiton massif martelé et tables en chêne réalisées pour la salle du restaurant Beit El-Mina à Tripoli',
    },
    {
        name: 'Chalet Faraya',
        location: 'Mont-Liban — Liban',
        year: '2025',
        collection: 'chambres',
        scope: 'Chambres &amp; boiseries de sous-comble',
        description:
            "Un chalet d'altitude aux plafonds en pente, aménagé avec des boiseries ajustées aux rampants et deux lits dont les têtes ont été dessinées à la cote. Le chêne fumé a été choisi pour sa tenue face aux variations d'humidité.",
        src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
        alt: 'Chambre de chalet aménagée par Maison Tripoli avec boiseries de sous-comble et tête de lit en chêne fumé',
    },
];

export default function projets() {
    const body = [
        `<section class="pt-16 pb-14 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="projets-title">
            ${breadcrumbs([{ label: 'Accueil', path: '/' }, { label: 'Projets' }], DEPTH)}

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div class="lg:col-span-7">
                    <p class="text-xs uppercase tracking-[0.25em] text-accent-ink font-semibold">${tr('In situ')}</p>
                    <h1 id="projets-title" class="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink font-light mt-3 leading-[1.1]">${tr('Demeures Réalisées : Projets de Mobilier In Situ')}</h1>
                </div>
                <div class="lg:col-span-5">
                    <p class="text-muted text-sm sm:text-base leading-relaxed font-light">${tr("Du penthouse beyrouthin au chalet d'altitude, du restaurant du vieux port à la villa de Dubaï : six chantiers livrés par nos ateliers, avec le détail de ce que nous y avons fabriqué.")}</p>
                </div>
            </div>
        </section>

        <section class="pb-24 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="residences-title">
            <h2 id="residences-title" class="sr-only">${tr('Liste des résidences et chantiers livrés')}</h2>
            <div class="space-y-16">
                ${projects
                    .map(
                        (project, index) => {
                            const collection = collectionBySlug(project.collection);
                            const reversed = index % 2 === 1;

                            return `<article class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <figure class="lg:col-span-7 ${reversed ? 'lg:order-2' : ''}">
                        <div class="aspect-[4/3] bg-surface-3 overflow-hidden group">
                            ${responsiveImage({
                                src: project.src,
                                alt: project.alt,
                                widths: [600, 800, 1200],
                                sizes: '(min-width: 1024px) 55vw, 92vw',
                                width: 1200,
                                height: 900,
                                className:
                                    'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105',
                            })}
                        </div>
                    </figure>
                    <div class="lg:col-span-5 ${reversed ? 'lg:order-1' : ''} space-y-5">
                        <p class="text-[10px] uppercase tracking-[0.3em] text-accent-ink font-semibold">${project.location} — ${project.year}</p>
                        <h3 class="font-serif text-2xl sm:text-3xl text-ink font-light">${project.name}</h3>
                        <p class="text-xs uppercase tracking-[0.2em] text-muted">${project.scope}</p>
                        <p class="text-sm text-muted leading-relaxed font-light">${project.description}</p>
                        <p class="pt-2">
                            <a href="${href(collection.path, { depth: DEPTH })}" class="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-ink border-b border-ink pb-2 hover:text-accent-ink hover:border-accent transition">
                                <span>Collection ${collection.navLabel}</span>
                                ${icon('arrow-right', 'icon w-4 h-4 stroke-[2]')}
                            </a>
                        </p>
                    </div>
                </article>`;
                        },
                    )
                    .join('\n                ')}
            </div>
        </section>

        <section class="py-24 bg-surface-2 border-y border-line px-6 lg:px-12" aria-labelledby="chantier-title">
            <div class="max-w-7xl mx-auto">
                ${sectionHeading({
                    eyebrow: 'Chantier',
                    title: 'Ce que nous prenons en charge',
                    id: 'chantier-title',
                    align: 'center',
                })}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
                    <article class="space-y-4">
                        <h3 class="font-serif text-xl text-ink font-normal">${tr('Étude &amp; plans')}</h3>
                        <p class="text-sm text-muted font-light leading-relaxed">${tr("Relevé de cotes, plans d'exécution cotés et calepinage des matières. Nous vérifions la faisabilité technique avant tout engagement de délai.")}</p>
                    </article>
                    <article class="space-y-4">
                        <h3 class="font-serif text-xl text-ink font-normal">${tr('Fabrication par lots')}</h3>
                        <p class="text-sm text-muted font-light leading-relaxed">${tr('Les commandes multi-pièces sont produites par lots numérotés, avec un plan de pose par pièce : les équipes de chantier installent sans erreur et sans retouche.')}</p>
                    </article>
                    <article class="space-y-4">
                        <h3 class="font-serif text-xl text-ink font-normal">${tr('Livraison &amp; pose')}</h3>
                        <p class="text-sm text-muted font-light leading-relaxed">${tr('Caisses bois sur mesure, transport sous gants blancs, montage et réglages sur place. Nous repartons avec les chutes et les emballages, et vous avec la garantie signée.')}</p>
                    </article>
                </div>
            </div>
        </section>`,

        ctaBand({
            depth: DEPTH,
            eyebrow: 'Votre projet',
            title: 'Parlons de la résidence que vous aménagez',
            text: "Partagez-nous vos plans ou vos inspirations : nous vous indiquons ce que nous pouvons fabriquer, dans quels délais et à quel ordre de budget.",
            primary: { label: tr('Réserver une visite privée'), dialogId: 'consultationModal' },
            secondary: { label: 'Écrire à la Maison', path: '/contact/' },
        }),
    ].join('\n\n        ');

    return {
        path: PATH,
        depth: DEPTH,
        title: 'Demeures Réalisées &amp; Projets In Situ | Maison Tripoli',
        description:
            "Six chantiers livrés par nos ateliers : penthouse à Beyrouth, villa à Tripoli, suite à Dubaï, restaurant du vieux port. Pièces fabriquées et matières.",
        includeQuickView: false,
        body,
        jsonLd: [
            {
                '@type': 'CollectionPage',
                '@id': `${site.url}/projets/#page`,
                url: `${site.url}/projets/`,
                name: 'Demeures réalisées — projets de mobilier in situ',
                description:
                    "Sélection de résidences et chantiers équipés par Maison Tripoli au Liban et au Moyen-Orient, avec le détail des pièces fabriquées par collection.",
                inLanguage: 'fr-FR',
                isPartOf: { '@id': `${site.url}/#site` },
                about: { '@id': STORE_ID },
                breadcrumb: { '@id': `${site.url}/projets/#fil` },
                mainEntity: {
                    '@type': 'ItemList',
                    numberOfItems: projects.length,
                    itemListElement: projects.map((project, index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        item: {
                            '@type': 'CreativeWork',
                            name: project.name,
                            about: project.scope,
                            description: project.description,
                            locationCreated: { '@type': 'Place', name: project.location },
                            dateCreated: project.year,
                            image: `${project.src}?auto=format&amp;fit=crop&amp;w=1200&amp;q=75`,
                            creator: { '@id': STORE_ID },
                        },
                    })),
                },
            },
            {
                ...breadcrumbSchema([{ label: 'Accueil', path: '/' }, { label: 'Projets', path: PATH }]),
                '@id': `${site.url}/projets/#fil`,
            },
            storeSchema(),
        ],
    };
}
