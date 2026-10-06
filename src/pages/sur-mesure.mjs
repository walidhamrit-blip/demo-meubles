/* =========================================================================
   Page — Service sur-mesure  « /sur-mesure/ »
   -------------------------------------------------------------------------
   Cible les requêtes professionnelles : « mobilier sur mesure architecte »,
   « agencement sur mesure Liban », « boiseries sur mesure ». Structure :
   méthode en cinq étapes, espace professionnels, typologies, garanties.
   ========================================================================= */

import {
    currentDepth as DEPTH,
    href,
} from '../lib/paths.mjs';
import { site } from '../site.config.mjs';
import { editorialImages } from '../content/imagery.mjs';
import { collections } from '../content/collections.mjs';
import { tr } from '../content/i18n.mjs';
import {
    icon,
    responsiveImage,
    sectionHeading,
    breadcrumbs,
    breadcrumbSchema,
    storeSchema,
    STORE_ID,
    faqBlock,
    faqSchema,
} from '../templates/components.mjs';
import { editorialSection, ctaBand } from '../templates/sections.mjs';

const PATH = '/sur-mesure/';
const methodology = [
    {
        title: 'Cadrage &amp; relevé',
        text: "Nous partons de votre plan, de vos inspirations et de vos contraintes d'usage. Au Liban, un relevé de cotes est réalisé sur place ; à l'étranger, nous travaillons sur plans vérifiés avec votre architecte.",
        duration: '3 à 5 jours',
    },
    {
        title: 'Dessins &amp; calepinage',
        text: "Élévations cotées, plans d'implantation, calepinage des pierres et des bois. Chaque détail d'exécution est arrêté avant le lancement en atelier : c'est la garantie d'un chantier sans improvisation.",
        duration: '1 à 2 semaines',
    },
    {
        title: 'Prototypes de teinte',
        text: "Un panneau témoin de 30 cm est réalisé dans l'essence et la finition retenues, puis validé par vous ou votre client. Pour les pièces d'apparat, un prototype à échelle 1 est possible.",
        duration: '1 semaine',
    },
    {
        title: 'Fabrication en atelier',
        text: "Débit, assemblage, garnissage, finition : chaque corps de métier intervient dans l'atelier de Tripoli. Un point d'avancement photographique vous est transmis à mi-parcours.",
        duration: '4 à 14 semaines',
    },
    {
        title: 'Livraison &amp; pose',
        text: "Emballage en caisse bois, livraison sous gants blancs et installation par nos artisans. Les réglages de portes, tiroirs et niveaux sont finalisés sur place, une semaine après la mise en place.",
        duration: '1 à 3 jours',
    },
];

const faq = [
    {
        q: 'Travaillez-vous avec les architectes d’intérieur et les décorateurs ?',
        a: "Oui, c'est une part importante de notre activité. Nous fournissons les fichiers techniques, les nomenclatures matières, les échantillons et les fiches de conformité nécessaires à la présentation au maître d'ouvrage, et nous nous coordonnons directement avec les autres corps d'état.",
    },
    {
        q: 'Quel est le budget d’un projet sur-mesure complet ?',
        a: "Un projet intégral — boiseries, mobilier, pierre et éclairage — se situe généralement entre 45 000 et 250 000 dollars selon la surface et les matières. Une pièce isolée sur-mesure (table, enfilade, tête de lit) démarre autour de 1 500 dollars. Nous fournissons une estimation de cadrage dès le premier échange.",
    },
    {
        q: 'Intervenez-vous en dehors du Liban ?',
        a: "Oui. Nous livrons et posons en Europe, dans le Golfe et en Afrique du Nord. Les projets lointains sont encadrés par un chef de projet dédié, des points hebdomadaires en visioconférence et une supervision de pose sur site pour les chantiers les plus importants.",
    },
    {
        q: 'Comment se passe le règlement d’un projet sur-mesure ?',
        a: "Un acompte de 40 % valide le lancement de la fabrication après acceptation des plans, 40 % sont versés à mi-parcours et le solde à la livraison, avant pose finale. Les paiements s'effectuent par virement bancaire, en dollars, euros ou livres libanaises.",
    },
];

export default function surMesure() {
    const body = [
        /* ---------------------------------------------------------- En-tête */
        `<section class="pt-16 pb-14 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="surmesure-title">
            ${breadcrumbs([{ label: 'Accueil', path: '/' }, { label: 'Sur-mesure' }], DEPTH)}

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div class="lg:col-span-7">
                    <p class="text-xs uppercase tracking-[0.25em] text-accent-ink font-semibold">${tr('Service architectes &amp; projets privés')}</p>
                    <h1 id="surmesure-title" class="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink font-light mt-3 leading-[1.1]">${tr('Mobilier &amp; Agencement Sur-Mesure, du Plan à la Pose')}</h1>
                </div>
                <div class="lg:col-span-5">
                    <p class="text-muted text-sm sm:text-base leading-relaxed font-light">${tr("Villa, appartement, suite hôtelière ou résidence secondaire : nous prenons en charge l'aménagement complet — mobilier, boiseries, pierre et éclairage — dans un même langage de matières.")}</p>
                </div>
            </div>

            <ul class="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-14 pt-10 border-t border-line-strong">
                <li>
                    <span class="block font-serif text-3xl text-ink">10+</span>
                    <span class="block text-[11px] uppercase tracking-[0.2em] text-muted mt-1">${tr('Pays livrés')}</span>
                </li>
                <li>
                    <span class="block font-serif text-3xl text-ink">2 sem.</span>
                    <span class="block text-[11px] uppercase tracking-[0.2em] text-muted mt-1">${tr("D'étude technique")}</span>
                </li>
                <li>
                    <span class="block font-serif text-3xl text-ink">1:1</span>
                    <span class="block text-[11px] uppercase tracking-[0.2em] text-muted mt-1">${tr('Prototypes possibles')}</span>
                </li>
                <li>
                    <span class="block font-serif text-3xl text-ink">30 ans</span>
                    <span class="block text-[11px] uppercase tracking-[0.2em] text-muted mt-1">${tr('Garantie structure')}</span>
                </li>
            </ul>
        </section>`,

        /* --------------------------------------------------------- Visuel large */
        `<section class="pb-24 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="realisation-title">
            <h2 id="realisation-title" class="sr-only">${tr('Exemple de réalisation sur-mesure')}</h2>
            <figure>
                <div class="aspect-[16/9] bg-surface-3 overflow-hidden">
                    ${responsiveImage({
                        src: editorialImages.surMesureInterieur.src,
                        alt: editorialImages.surMesureInterieur.alt,
                        widths: [800, 1200, 1600],
                        sizes: '(min-width: 1280px) 1200px, 92vw',
                        width: 1600,
                        height: 900,
                    })}
                </div>
                <figcaption class="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2 text-[11px] uppercase tracking-widest text-muted">
                    <span>${tr('Résidence Villa El-Mina — mobilier et boiseries intégrés')}</span>
                    <span>${tr("Architecture d'intérieur 2024")}</span>
                </figcaption>
            </figure>
        </section>`,

        /* ------------------------------------------------------ Méthode en 5 étapes */
        `<section id="methode" class="py-24 bg-surface-2 border-y border-line px-6 lg:px-12" aria-labelledby="methode-title">
            <div class="max-w-7xl mx-auto">
                ${sectionHeading({
                    eyebrow: 'Méthode',
                    title: 'Un projet sur-mesure en cinq étapes',
                    id: 'methode-title',
                    align: 'center',
                })}
                <ol class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mt-16">
                    ${methodology
                        .map(
                            (step, index) => `<li class="flex flex-col gap-4">
                        <span class="inline-flex w-11 h-11 items-center justify-center border border-accent font-serif text-accent-ink" aria-hidden="true">${index + 1}</span>
                        <h3 class="font-serif text-xl text-ink font-normal">${step.title}</h3>
                        <p class="text-sm text-muted leading-relaxed font-light flex-1">${step.text}</p>
                        <p class="text-[11px] uppercase tracking-[0.2em] text-accent-ink">${step.duration}</p>
                    </li>`,
                        )
                        .join('\n                    ')}
                </ol>
            </div>
        </section>`,

        /* -------------------------------------------------- Espace professionnels */
        editorialSection(
            {
                id: 'architectes',
                eyebrow: 'Espace professionnels',
                heading: "Un partenaire de fabrication pour les architectes",
                paragraphs: [
                    "Nous intervenons en tant que fabricant pour les agences d'architecture d'intérieur, les décorateurs et les promoteurs : nous ne concurrentons pas la conception, nous l'exécutons avec la précision d'un atelier.",
                    "Vous recevez les fichiers DWG et PDF cotés, les nomenclatures matière, les échantillons physiques pour vos présentations et les fiches techniques nécessaires aux appels d'offres. Un chef de projet unique suit votre dossier du premier plan à la réception du chantier.",
                ],
                specs: [
                    { label: 'Livrables', value: 'Plans DWG / PDF, nomenclatures, échantillons' },
                    { label: 'Séries', value: 'Pièces uniques ou séries numérotées' },
                    { label: 'Chantiers', value: 'Résidentiel, hôtellerie, bureaux, retail' },
                    { label: 'Coordination', value: 'Chef de projet dédié, points hebdomadaires' },
                ],
            },
            { depth: DEPTH, tone: 'dark' },
        ),

        /* ------------------------------------------------------ Typologies projets */
        `<section class="py-24 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="typologies-title">
            ${sectionHeading({
                eyebrow: 'Typologies',
                title: 'Les projets que nous équipons',
                id: 'typologies-title',
                align: 'center',
            })}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
                <article class="bg-surface-2 border border-line p-8 space-y-4">
                    <h3 class="font-serif text-xl text-ink font-normal">${tr('Villas &amp; résidences')}</h3>
                    <p class="text-sm text-muted font-light leading-relaxed">${tr("Salons de réception, salles à manger, suites parentales et boiseries d'entrée. Projets de 80 à 600 m², du Liban au Golfe.")}</p>
                </article>
                <article class="bg-surface-2 border border-line p-8 space-y-4">
                    <h3 class="font-serif text-xl text-ink font-normal">${tr('Hôtellerie &amp; resorts')}</h3>
                    <p class="text-sm text-muted font-light leading-relaxed">${tr('Mobilier de chambres en série numérotée, têtes de lit à la cote, mobilier de lobby et de restaurant, avec plan de pose par chambre.')}</p>
                </article>
                <article class="bg-surface-2 border border-line p-8 space-y-4">
                    <h3 class="font-serif text-xl text-ink font-normal">${tr('Bureaux &amp; direction')}</h3>
                    <p class="text-sm text-muted font-light leading-relaxed">${tr("Bureaux d'apparat, murs de rangement, bibliothèques toute hauteur et salles de réunion habillées de bois et de cuir.")}</p>
                </article>
                <article class="bg-surface-2 border border-line p-8 space-y-4">
                    <h3 class="font-serif text-xl text-ink font-normal">${tr("Pièces d'exception")}</h3>
                    <p class="text-sm text-muted font-light leading-relaxed">${tr('Escaliers, portes intérieures, dressings et pièces uniques dessinées en collaboration avec nos maîtres artisans.')}</p>
                </article>
            </div>
        </section>`,

        /* ------------------------------------------------------------------- FAQ */
        `<section class="py-24 bg-surface-2 border-y border-line px-6 lg:px-12" aria-labelledby="faq-surmesure-title">
            <div class="max-w-4xl mx-auto">
                ${sectionHeading({
                    eyebrow: 'Questions fréquentes',
                    title: 'Projets, délais et conditions',
                    id: 'faq-surmesure-title',
                    align: 'center',
                })}
                <div class="mt-14">
                    ${faqBlock(faq)}
                </div>
            </div>
        </section>`,

        /* ----------------------------------------------------- Renvoi collections */
        `<section class="py-20 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="surmesure-collections">
            ${sectionHeading({
                eyebrow: 'Compléter un projet',
                title: 'Parcourir le catalogue',
                id: 'surmesure-collections',
                align: 'center',
            })}
            <ul class="mt-12 flex flex-wrap justify-center gap-3">
                ${collections
                    .map(
                        (collection) => `<li>
                    <a href="${href(collection.path, { depth: DEPTH })}" class="inline-flex items-center gap-2 px-5 py-3 border border-line-strong text-xs uppercase tracking-[0.18em] text-ink-strong hover:border-accent hover:text-accent-ink transition">
                        ${collection.navLabel}
                    </a>
                </li>`,
                    )
                    .join('\n                ')}
            </ul>
        </section>`,

        ctaBand({
            depth: DEPTH,
            eyebrow: 'Lancer un projet',
            title: 'Exposez-nous votre projet, nous chiffrons sous 48 heures',
            text: "Plans, inspirations, photomontages ou simple description : notre bureau d'études vous répond avec une première estimation et un calendrier de fabrication réaliste.",
            primary: { label: 'Prendre rendez-vous', dialogId: 'consultationModal' },
            secondary: { label: 'Nous écrire', path: '/contact/' },
        }),
    ].join('\n\n        ');

    return {
        path: PATH,
        depth: DEPTH,
        title: 'Mobilier Sur-Mesure pour Architectes | Maison Tripoli',
        description:
            "Mobilier, boiseries et agencement sur mesure à Tripoli : plans cotés, prototypes de teinte, fabrication en atelier et pose sous gants blancs. Devis sous 48 heures.",
        includeQuickView: false,
        body,
        jsonLd: [
            {
                '@type': 'Service',
                '@id': `${site.url}/sur-mesure/#service`,
                name: "Mobilier et agencement sur-mesure",
                serviceType: "Fabrication de mobilier d'art sur mesure",
                description:
                    "Conception, fabrication et pose de mobilier et boiseries sur mesure : plans d'exécution, prototypes de teinte, fabrication en atelier de Tripoli et installation sur chantier.",
                provider: { '@id': STORE_ID },
                areaServed: site.areaServed.map((area) => ({ '@type': area.type, name: area.name })),
                availableChannel: {
                    '@type': 'ServiceChannel',
                    serviceUrl: `${site.url}/sur-mesure/`,
                    servicePhone: site.contact.phoneHref,
                },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Prestations sur-mesure',
                    itemListElement: [
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Mobilier sur mesure (salons, tables, chambres, rangements)" } },
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Boiseries murales et agencement intégré" } },
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Livraison internationale et pose sous gants blancs" } },
                    ],
                },
            },
            {
                '@type': 'WebPage',
                '@id': `${site.url}/sur-mesure/#page`,
                url: `${site.url}/sur-mesure/`,
                name: 'Mobilier sur-mesure pour architectes et projets privés',
                inLanguage: 'fr-FR',
                isPartOf: { '@id': `${site.url}/#site` },
                breadcrumb: { '@id': `${site.url}/sur-mesure/#fil` },
                mainEntity: { '@id': `${site.url}/sur-mesure/#service` },
            },
            {
                ...breadcrumbSchema([{ label: 'Accueil', path: '/' }, { label: 'Sur-mesure', path: PATH }]),
                '@id': `${site.url}/sur-mesure/#fil`,
            },
            { ...faqSchema(faq), '@id': `${site.url}/sur-mesure/#faq` },
            storeSchema(),
        ],
    };
}
