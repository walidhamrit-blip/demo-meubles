/* =========================================================================
   Page — L'Atelier  « /atelier/ »
   -------------------------------------------------------------------------
   Contenu de marque : histoire, savoir-faire, engagements. Sert de cible
   aux requêtes informationnelles (« ébéniste Tripoli », « atelier de
   menuiserie d'art Liban ») et alimente le maillage interne vers les
   collections et le service sur-mesure.
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
} from '../templates/components.mjs';
import { editorialSection, ctaBand, newsletterSection } from '../templates/sections.mjs';

const PATH = '/atelier/';
const steps = [
    {
        title: 'Le choix de la grume',
        text: "Nos bois sont sélectionnés en forêt puis débités en plots larges. Le noyer, le chêne et le cèdre sont empilés en grange et séchés lentement pendant dix-huit mois, jusqu'à un taux d'humidité stable qui garantit qu'un plateau ne bougera plus.",
    },
    {
        title: 'Le dessin d’exécution',
        text: "Chaque commande passe par le bureau d'études : élévations cotées, plan de calepinage, nomenclature des matières. C'est cette étape, invisible pour le client, qui sépare un meuble d'atelier d'une pièce de série.",
    },
    {
        title: "L'assemblage traditionnel",
        text: "Tenons, mortaises, queues d'aronde et panneautage à plate-bande : nos cadres sont assemblés sans vis apparente. Ce sont ces liaisons qui autorisent une garantie de trente ans sur la structure d'ébénisterie.",
    },
    {
        title: 'La finition à la main',
        text: "Cire d'abeille, huile dure, laque au tampon ou vernis satiné : les finitions sont appliquées en couches fines, poncées entre chaque passe. La teinte est validée sur panneau témoin avant d'être appliquée à la pièce.",
    },
];

export default function atelier() {
    const body = [
        /* ---------------------------------------------------------- En-tête */
        `<section class="pt-16 pb-14 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="atelier-title">
            ${breadcrumbs([{ label: 'Accueil', path: '/' }, { label: "L'Atelier" }], DEPTH)}

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div class="lg:col-span-7">
                    <p class="text-xs uppercase tracking-[0.25em] text-accent-ink font-semibold">${tr('Tripoli, Liban — depuis 1948')}</p>
                    <h1 id="atelier-title" class="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink font-light mt-3 leading-[1.1]">${tr("L'Atelier d'Ébénisterie de Tripoli, Trois Générations de Menuisiers")}</h1>
                </div>
                <div class="lg:col-span-5">
                    <p class="text-muted text-sm sm:text-base leading-relaxed font-light">${tr('Nous fabriquons encore nos meubles là où la Maison a été fondée : au cœur du quartier des artisans de Tripoli, à quelques rues du souk où nos grands-pères achetaient leur laiton.')}</p>
                </div>
            </div>
        </section>

        <!-- Portrait de l'atelier -->
        <section class="pb-24 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="portrait-title">
            <h2 id="portrait-title" class="sr-only">${tr("L'atelier en images")}</h2>
            <figure class="relative">
                <div class="aspect-[16/9] bg-surface-3 overflow-hidden">
                    ${responsiveImage({
                        src: editorialImages.atelierArtisan.src,
                        alt: editorialImages.atelierArtisan.alt,
                        widths: [800, 1200, 1600],
                        sizes: '(min-width: 1280px) 1200px, 92vw',
                        width: 1600,
                        height: 900,
                        priority: true,
                    })}
                </div>
                <figcaption class="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2 text-[11px] uppercase tracking-widest text-muted">
                    <span>${tr('Établi de façonnage — atelier de Tripoli')}</span>
                    <span>${tr("Finition à la cire d'abeille, 18 mois de séchage")}</span>
                </figcaption>
            </figure>
        </section>`,

        /* ---------------------------------------------------- Les quatre étapes */
        `<section id="savoir-faire" class="py-24 bg-surface-2 border-y border-line px-6 lg:px-12" aria-labelledby="savoir-faire-title">
            <div class="max-w-7xl mx-auto">
                ${sectionHeading({
                    eyebrow: 'Savoir-faire',
                    title: 'De la grume à la pièce finie',
                    id: 'savoir-faire-title',
                    align: 'center',
                })}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mt-16">
                    ${steps
                        .map(
                            (step, index) => `<article class="flex gap-6">
                        <span class="font-serif text-3xl text-accent-ink/60 leading-none shrink-0 w-12" aria-hidden="true">0${index + 1}</span>
                        <div class="space-y-3">
                            <h3 class="font-serif text-xl sm:text-2xl text-ink font-normal">${step.title}</h3>
                            <p class="text-sm text-muted leading-relaxed font-light">${step.text}</p>
                        </div>
                    </article>`,
                        )
                        .join('\n                    ')}
                </div>
            </div>
        </section>`,

        /* ------------------------------------------------------------- Chiffres */
        `<section class="py-20 px-6 lg:px-12 bg-inverse text-on-inverse" aria-labelledby="chiffres-title">
            <div class="max-w-7xl mx-auto">
                <h2 id="chiffres-title" class="sr-only">${tr('La Maison en chiffres')}</h2>
                <dl class="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                    <div>
                        <dt class="sr-only">${tr('Année de fondation')}</dt>
                        <dd>
                            <span class="block font-serif text-4xl sm:text-5xl font-light text-on-inverse-soft">1948</span>
                            <span class="block mt-2 text-[11px] uppercase tracking-[0.2em] text-accent-ink">${tr('Fondation de la Maison')}</span>
                        </dd>
                    </div>
                    <div>
                        <dt class="sr-only">${tr('Générations de menuisiers')}</dt>
                        <dd>
                            <span class="block font-serif text-4xl sm:text-5xl font-light text-on-inverse-soft">3</span>
                            <span class="block mt-2 text-[11px] uppercase tracking-[0.2em] text-accent-ink">${tr("Générations d'ébénistes")}</span>
                        </dd>
                    </div>
                    <div>
                        <dt class="sr-only">${tr("Maîtres artisans à l'atelier")}</dt>
                        <dd>
                            <span class="block font-serif text-4xl sm:text-5xl font-light text-on-inverse-soft">18</span>
                            <span class="block mt-2 text-[11px] uppercase tracking-[0.2em] text-accent-ink">${tr('Maîtres artisans')}</span>
                        </dd>
                    </div>
                    <div>
                        <dt class="sr-only">${tr("Durée de garantie sur l'ébénisterie")}</dt>
                        <dd>
                            <span class="block font-serif text-4xl sm:text-5xl font-light text-on-inverse-soft">30 ans</span>
                            <span class="block mt-2 text-[11px] uppercase tracking-[0.2em] text-accent-ink">${tr("Garantie sur l'ébénisterie")}</span>
                        </dd>
                    </div>
                </dl>
            </div>
        </section>`,

        /* ---------------------------------------------------- Matières &amp; RSE */
        editorialSection(
            {
                id: 'matieres',
                eyebrow: 'Matières',
                heading: 'Des matières traçables, du Levant à vos pièces',
                paragraphs: [
                    "Nous privilégions les essences régionales — noyer de la montagne libanaise, chêne du Nord-Liban — complétées par des bois européens sélectionnés pour leur stabilité. Le travertin et les marbres proviennent de carrières du bassin levantin et d'Italie, dont nous connaissons les exploitants.",
                    "Nos chutes de plateau ne sont pas jetées : elles deviennent sellets, socles et plateaux d'objets, vendus dans la collection éclairage et objets d'art. Une manière de faire vivre la matière jusqu'au bout, et de réduire le volume de copeaux destinés à la filière bois-énergie.",
                ],
                specs: [
                    { label: 'Séchage', value: '18 mois en grange, à l’air libre' },
                    { label: 'Traçabilité', value: 'Bois et pierre d’origine identifiée' },
                    { label: 'Valorisation', value: 'Chutes transformées en objets de la Maison' },
                    { label: 'Finition', value: 'Cires et huiles sans solvant pétrochimique' },
                ],
            },
            { depth: DEPTH, tone: 'light' },
        ),

        /* ------------------------------------------------- La Maison en dates */
        `<section class="py-24 px-6 lg:px-12 max-w-4xl mx-auto" aria-labelledby="dates-title">
            ${sectionHeading({
                eyebrow: 'Chronologie',
                title: 'La Maison en quelques dates',
                id: 'dates-title',
                align: 'center',
            })}
            <ol class="mt-14 space-y-10 border-l border-line-strong ps-8">
                <li class="relative">
                    <span class="absolute -left-[41px] top-1.5 w-3 h-3 rounded-full bg-accent" aria-hidden="true"></span>
                    <p class="text-xs uppercase tracking-[0.2em] text-accent-ink font-semibold">1948</p>
                    <h3 class="font-serif text-xl text-ink mt-1">${tr("Ouverture de l'atelier rue des Ébénistes")}</h3>
                    <p class="text-sm text-muted font-light mt-2 leading-relaxed">${tr('Ibrahim Kabbara installe son établi et signe ses premières tables de réception pour les familles tripolitaines.')}</p>
                </li>
                <li class="relative">
                    <span class="absolute -left-[41px] top-1.5 w-3 h-3 rounded-full bg-accent" aria-hidden="true"></span>
                    <p class="text-xs uppercase tracking-[0.2em] text-accent-ink font-semibold">1976</p>
                    <h3 class="font-serif text-xl text-ink mt-1">${tr('Naissance de la collection Al-Mina')}</h3>
                    <p class="text-sm text-muted font-light mt-2 leading-relaxed">${tr("La deuxième génération dessine le canapé modulaire qui fera la réputation de la Maison auprès des architectes d'intérieur du Levant.")}</p>
                </li>
                <li class="relative">
                    <span class="absolute -left-[41px] top-1.5 w-3 h-3 rounded-full bg-accent" aria-hidden="true"></span>
                    <p class="text-xs uppercase tracking-[0.2em] text-accent-ink font-semibold">2003</p>
                    <h3 class="font-serif text-xl text-ink mt-1">${tr("Ouverture du bureau d'études 3D")}</h3>
                    <p class="text-sm text-muted font-light mt-2 leading-relaxed">${tr("Le dessin technique et la modélisation photoréaliste deviennent systématiques pour les projets d'architecture d'intérieur.")}</p>
                </li>
                <li class="relative">
                    <span class="absolute -left-[41px] top-1.5 w-3 h-3 rounded-full bg-accent" aria-hidden="true"></span>
                    <p class="text-xs uppercase tracking-[0.2em] text-accent-ink font-semibold">2025</p>
                    <h3 class="font-serif text-xl text-ink mt-1">${tr('Cinq collections, un atelier')}</h3>
                    <p class="text-sm text-muted font-sans font-light mt-2 leading-relaxed">${tr("La Maison réunit salons, salles à manger, chambres, rangements et pièces d'art dans un même catalogue sur-mesure, expédié dans plus de dix pays.")}</p>
                </li>
            </ol>
        </section>`,

        /* ------------------------------------------- Renvoi vers les collections */
        `<section class="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-line" aria-labelledby="atelier-collections">
            ${sectionHeading({
                eyebrow: 'Production',
                title: 'Ce que l’atelier fabrique',
                id: 'atelier-collections',
                align: 'center',
            })}
            <ul class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                ${collections
                    .map(
                        (collection) => `<li>
                    <a href="${href(collection.path, { depth: DEPTH })}" class="group flex items-start justify-between gap-4 py-4 border-b border-line-strong hover:border-accent transition">
                        <span>
                            <span class="block font-serif text-lg text-ink group-hover:text-accent-ink transition">${collection.navLabel}</span>
                            <span class="block text-xs text-muted font-light mt-1">${collection.eyebrow}</span>
                        </span>
                        ${icon('arrow-right', 'icon w-4 h-4 stroke-[2] text-accent-ink shrink-0 mt-2')}
                    </a>
                </li>`,
                    )
                    .join('\n                ')}
            </ul>
        </section>`,

        ctaBand({
            depth: DEPTH,
            eyebrow: 'Venir à l’atelier',
            title: 'Visitez l’atelier de la rue des Ébénistes',
            text: "Sur rendez-vous, nous ouvrons les portes de l'atelier : présentation des essences, des finitions et des pièces en fabrication. Une heure suffit pour comprendre comment nous travaillons.",
            primary: { label: tr('Réserver une visite privée'), dialogId: 'consultationModal' },
            secondary: { label: 'Voir le showroom', path: '/contact/' },
        }),

        newsletterSection(),
    ].join('\n\n        ');

    return {
        path: PATH,
        depth: DEPTH,
        title: "L'Atelier d'Ébénisterie de Tripoli | Maison Tripoli",
        description:
            "Trois générations d'ébénistes au cœur de Tripoli : séchage du noyer, assemblages traditionnels et finitions à la main. Visitez l'atelier et son savoir-faire.",
        includeQuickView: false,
        body,
        jsonLd: [
            {
                '@type': 'AboutPage',
                '@id': `${site.url}/atelier/#page`,
                url: `${site.url}/atelier/`,
                name: "L'Atelier d'ébénisterie de Tripoli",
                description:
                    "Histoire, savoir-faire et engagements de l'atelier Maison Tripoli : séchage du bois, assemblage traditionnel, finitions à la main et valorisation des chutes.",
                inLanguage: 'fr-FR',
                isPartOf: { '@id': `${site.url}/#site` },
                about: { '@id': STORE_ID },
                breadcrumb: { '@id': `${site.url}/atelier/#fil` },
            },
            {
                ...breadcrumbSchema([{ label: 'Accueil', path: '/' }, { label: "L'Atelier", path: PATH }]),
                '@id': `${site.url}/atelier/#fil`,
            },
            storeSchema(),
        ],
    };
}
