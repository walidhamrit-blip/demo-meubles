/* =========================================================================
   Pages de collection
   -------------------------------------------------------------------------
   Produit :
     • /collections/                 → hub listant les cinq collections
     • /collections/<slug>/          → une page par collection

   Chaque page fille possède son H1, ses métadonnées, son contenu éditorial
   (texte non dupliqué), sa FAQ et son propre graphe de données structurées
   (CollectionPage + ItemList de Product + BreadcrumbList + FAQPage).
   ========================================================================= */

import { currentDepth, href } from '../lib/paths.mjs';
import { site } from '../site.config.mjs';
import { collections } from '../content/collections.mjs';
import { collectionImages } from '../content/imagery.mjs';
import { productsByCollection, priceRange } from '../content/products.mjs';
import { tr, localized } from '../content/i18n.mjs';
import {
    icon,
    responsiveImage,
    collectionCard,
    sectionHeading,
    buttonLink,
    buttonDialog,
    faqBlock,
    faqSchema,
    breadcrumbs,
    breadcrumbSchema,
    productSchema,
    storeSchema,
    STORE_ID,
} from '../templates/components.mjs';
import {
    productGrid,
    editorialSection,
    relatedCollectionsSection,
    ctaBand,
    newsletterSection,
    finishStrip,
} from '../templates/sections.mjs';

/* ==========================================================================
   1. HUB — /collections/
   ========================================================================== */

function hubBody() {
    const depth = currentDepth;

    const cards = collections
        .map(
            (collection, index) => `<li>
                    ${collectionCard(collection, {
                        depth,
                        image: collectionImages[collection.slug],
                        sizes: '(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 92vw',
                        eager: index < 2,
                    })}
                </li>`,
        )
        .join('\n                ');

    return `<section class="pt-16 pb-12 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="hub-title">
            ${breadcrumbs([{ label: 'Accueil', path: '/' }, { label: tr('Collections') }], depth)}

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                <div class="lg:col-span-7">
                    <p class="text-xs uppercase tracking-[0.25em] text-accent-ink font-semibold">${tr('Catalogue 2025')}</p>
                    <h1 id="hub-title" class="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink font-light mt-3 leading-tight">${tr("Collections de Mobilier d'Art Fabriquées à Tripoli")}</h1>
                </div>
                <div class="lg:col-span-5">
                    <p class="text-muted text-sm leading-relaxed font-light">${tr('Cinq familles de mobilier, un seul atelier. Chaque collection est déclinable en dimensions, en essences et en textiles : vous ne choisissez pas un modèle dans un catalogue, vous en fixez les cotes avec nos menuisiers.')}</p>
                </div>
            </div>
        </section>

        <section class="pb-24 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="hub-list-title">
            <h2 id="hub-list-title" class="sr-only">${tr('Les cinq collections de la Maison')}</h2>
            <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                ${cards}
            </ul>
        </section>

        <section class="py-24 bg-surface-2 border-y border-line px-6 lg:px-12" aria-labelledby="choisir-title">
            <div class="max-w-7xl mx-auto">
                ${sectionHeading({
                    eyebrow: 'Bien choisir',
                    title: tr('Trois critères avant de commander'),
                    id: 'choisir-title',
                    align: 'center',
                })}

                <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
                    <article class="space-y-4">
                        <span class="inline-flex w-11 h-11 items-center justify-center border border-accent text-accent-ink">${icon('check', 'icon w-5 h-5 stroke-[1.5]')}</span>
                        <h3 class="font-serif text-xl text-ink font-normal">${tr('Le volume disponible')}</h3>
                        <p class="text-sm text-muted leading-relaxed font-light">${tr("Un salon exige 90 cm de recul devant l'assise, une table de réception 60 cm de largeur utile par convive. Nous vérifions votre plan avant de fixer les dimensions, pour éviter la pièce juste — et l'erreur coûteuse.")}</p>
                    </article>
                    <article class="space-y-4">
                        <span class="inline-flex w-11 h-11 items-center justify-center border border-accent text-accent-ink">${icon('check', 'icon w-5 h-5 stroke-[1.5]')}</span>
                        <h3 class="font-serif text-xl text-ink font-normal">${tr("L'usage réel de la pièce")}</h3>
                        <p class="text-sm text-muted leading-relaxed font-light">${tr("Une table de famille qui accueille quatorze convives n'appelle pas le même plateau qu'une table de travail. Nous adaptons l'essence, l'épaisseur et la finition — huilée pour le contact, laquée pour l'apparat.")}</p>
                    </article>
                    <article class="space-y-4">
                        <span class="inline-flex w-11 h-11 items-center justify-center border border-accent text-accent-ink">${icon('check', 'icon w-5 h-5 stroke-[1.5]')}</span>
                        <h3 class="font-serif text-xl text-ink font-normal">${tr('La cohérence des matières')}</h3>
                        <p class="text-sm text-muted leading-relaxed font-light">${tr('Une maison se lit comme un ensemble : le noyer du salon peut reprendre dans la bibliothèque, le travertin de la table dans les sellets de la chambre. Nos ateliers conservent les nuanciers pour harmoniser vos commandes successives.')}</p>
                    </article>
                </div>
            </div>
        </section>

        ${ctaBand({
            depth,
            eyebrow: tr('Service sur-mesure'),
            title: tr('Vous ne trouvez pas la dimension exacte ?'),
            text: tr('Nous fabriquons chaque pièce à la cote, sur mesure. Transmettez-nous votre plan ou vos dimensions : nous vous répondons sous 24 heures avec une proposition chiffrée.'),
            primary: { label: tr('Réserver une visite privée'), dialogId: 'consultationModal' },
            secondary: { label: tr('Découvrir le sur-mesure'), path: '/sur-mesure/' },
        })}

        ${newsletterSection()}`;
}

export function hubPage() {
    const depth = currentDepth;

    return {
        path: '/collections/',
        depth,
        title: localized({
            fr: 'Collections de Mobilier d’Art à Tripoli | Maison Tripoli',
            en: 'Art Furniture Collections in Tripoli | Maison Tripoli',
            ar: 'مجموعات الأثاث الفني في طرابلس | ميزون طرابلس',
        }),
        description: localized({
            fr: "Salons, salles à manger, chambres, rangements et éclairage : les cinq collections de mobilier d'art fabriquées dans notre atelier de Tripoli.",
            en: 'Seating, dining, bedrooms, storage and lighting: the five art furniture collections made in our Tripoli workshop. Solid walnut, marble and bespoke sizing.',
            ar: 'جلسات وطاولات طعام وغرف نوم وتخزين وإضاءة: مجموعات الأثاث الفني الخمس المصنوعة في ورشتنا في طرابلس. خشب جوز صلب ورخام ومقاسات حسب الطلب.',
        }),
        includeQuickView: false,
        body: hubBody(),
        jsonLd: [
            {
                '@type': 'CollectionPage',
                '@id': `${site.url}/collections/#page`,
                url: `${site.url}/collections/`,
                name: 'Collections de mobilier d’art Maison Tripoli',
                description:
                    "Les cinq collections de mobilier d'art Maison Tripoli, fabriquées à Tripoli : salons, salles à manger, chambres, rangements, éclairage et objets.",
                inLanguage: 'fr-FR',
                isPartOf: { '@id': `${site.url}/#site` },
                about: { '@id': STORE_ID },
                breadcrumb: { '@id': `${site.url}/collections/#fil` },
                mainEntity: {
                    '@type': 'ItemList',
                    numberOfItems: collections.length,
                    itemListElement: collections.map((collection, index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        name: collection.navLabel,
                        url: `${site.url}${collection.path}`,
                    })),
                },
            },
            {
                ...breadcrumbSchema([{ label: 'Accueil', path: '/' }, { label: 'Collections', path: '/collections/' }]),
                '@id': `${site.url}/collections/#fil`,
            },
        ],
    };
}

/* ==========================================================================
   2. PAGES FILLES — /collections/<slug>/
   ========================================================================== */

function collectionBody(collection) {
    const depth = currentDepth;
    const products = productsByCollection(collection.slug);

    const highlights = `<ul class="space-y-3 text-xs tracking-wider uppercase text-ink-strong/90">
                    ${collection.highlights
                        .map(
                            (item) => `<li class="flex items-center gap-3">
                        ${icon(item.icon, 'icon w-4 h-4 stroke-[2] text-accent-ink')}
                        <span>${item.label}</span>
                    </li>`,
                        )
                        .join('\n                    ')}
                </ul>`;

    const hero = `<section class="pt-16 pb-14 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="collection-title">
            ${breadcrumbs(
                [
                    { label: 'Accueil', path: '/' },
                    { label: 'Collections', path: '/collections/' },
                    { label: collection.breadcrumbLabel },
                ],
                depth,
            )}

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div class="lg:col-span-7">
                    <p class="text-xs uppercase tracking-[0.25em] text-accent-ink font-semibold">${collection.eyebrow}</p>
                    <h1 id="collection-title" class="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink font-light mt-3 leading-[1.1]">
                        ${collection.h1}
                    </h1>
                    <div class="mt-8 space-y-5">
                        ${collection.intro
                            .map(
                                (paragraph) =>
                                    `<p class="text-sm sm:text-base text-muted leading-relaxed font-light">${paragraph}</p>`,
                            )
                            .join('\n                        ')}
                    </div>
                    <div class="mt-10 flex flex-col sm:flex-row gap-4">
                        ${buttonDialog({ label: 'Demander un devis', dialogId: 'consultationModal', variant: 'dark' })}
                        ${buttonLink({ label: tr('Visiter le showroom'), path: '/contact/', depth, variant: 'outline' })}
                    </div>
                </div>

                <aside class="lg:col-span-5 bg-surface-2 border border-line p-8" aria-label="${tr('Caractéristiques de la collection')}">
                    <h2 class="font-serif text-xl text-ink font-normal mb-5">${tr('Ce qui distingue cette collection')}</h2>
                    ${highlights}
                    <div class="mt-8 pt-6 border-t border-line-strong">
                        <p class="text-xs uppercase tracking-[0.25em] text-accent-ink font-semibold mb-4">${tr('Finitions disponibles')}</p>
                        ${finishStrip('dark')}
                    </div>
                    <dl class="mt-8 pt-6 border-t border-line-strong space-y-3 text-xs">
                        <div class="flex justify-between gap-4">
                            <dt class="text-muted uppercase tracking-wider">${tr('Pièces au catalogue')}</dt>
                            <dd class="font-medium text-ink-strong">${products.length}</dd>
                        </div>
                        <div class="flex justify-between gap-4">
                            <dt class="text-muted uppercase tracking-wider">${tr('Fabrication')}</dt>
                            <dd class="font-medium text-ink-strong">${tr('Atelier de Tripoli')}</dd>
                        </div>
                        <div class="flex justify-between gap-4">
                            <dt class="text-muted uppercase tracking-wider">${tr('Garantie structure')}</dt>
                            <dd class="font-medium text-ink-strong">30 ans</dd>
                        </div>
                    </dl>
                </aside>
            </div>
        </section>`;

    const grid = `<section class="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-line" aria-labelledby="pieces-title">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                ${sectionHeading({
                    eyebrow: `Édition 2025 — ${products.length} pièces`,
                    title: 'Les pièces de la collection',
                    id: 'pieces-title',
                })}
                <p class="text-xs text-muted font-light max-w-sm">${tr('Toutes les pièces sont déclinables en dimensions, essences et textiles. Sélectionnez une pièce pour en consulter la fiche détaillée.')}</p>
            </div>
            ${productGrid(products, depth)}
        </section>`;

    const sections = collection.sections
        .map((section, index) =>
            editorialSection(section, {
                depth,
                tone: index === 1 ? 'dark' : 'light',
            }),
        )
        .join('\n\n        ');

    const faq = `<section class="py-24 px-6 lg:px-12 max-w-4xl mx-auto" aria-labelledby="faq-title">
            ${sectionHeading({
                eyebrow: 'Questions fréquentes',
                title: `Tout savoir sur nos ${collection.navLabel.toLowerCase()}`,
                id: 'faq-title',
                align: 'center',
            })}
            <div class="mt-14">
                ${faqBlock(collection.faq)}
            </div>
            <p class="mt-10 text-center text-xs text-muted font-light">${tr('Une autre question ?')}<a href="${href('/contact/', { depth })}" class="underline underline-offset-4 hover:text-ink">${tr("Écrivez à l'atelier")}</a>,
                nous répondons sous 24 heures.
            </p>
        </section>`;

    return [hero, grid, sections, faq, relatedCollectionsSection(collection, depth), ctaBand({
        depth,
        eyebrow: 'Passer commande',
        title: 'Recevez votre devis personnalisé',
        text: `Transmettez-nous vos dimensions, votre plan ou vos inspirations : nous revenons vers vous avec une proposition chiffrée et un délai de fabrication ferme pour votre projet de ${collection.navLabel.toLowerCase()}.`,
        primary: { label: 'Réserver une visite privée', dialogId: 'consultationModal' },
        secondary: { label: 'Voir la méthode sur-mesure', path: '/sur-mesure/' },
    })].join('\n\n        ');
}

export function collectionPage(collection) {
    const depth = currentDepth;
    const products = productsByCollection(collection.slug);
    const range = priceRange(collection.slug);

    return {
        path: collection.path,
        depth,
        title: collection.title,
        description: collection.description,
        includeQuickView: true,
        body: collectionBody(collection),
        jsonLd: [
            {
                '@type': 'CollectionPage',
                '@id': `${site.url}${collection.path}#page`,
                url: `${site.url}${collection.path}`,
                name: collection.h1,
                description: collection.summary,
                inLanguage: 'fr-FR',
                isPartOf: { '@id': `${site.url}/#site` },
                about: { '@id': STORE_ID },
                keywords: collection.metaKeywords.join(', '),
                breadcrumb: { '@id': `${site.url}${collection.path}#fil` },
                mainEntity: {
                    '@type': 'ItemList',
                    name: `Pièces — ${collection.navLabel}`,
                    numberOfItems: products.length,
                    itemListElement: products.map((product, index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        item: productSchema(product),
                    })),
                },
            },
            {
                ...breadcrumbSchema([
                    { label: 'Accueil', path: '/' },
                    { label: 'Collections', path: '/collections/' },
                    { label: collection.breadcrumbLabel, path: collection.path },
                ]),
                '@id': `${site.url}${collection.path}#fil`,
            },
            {
                ...faqSchema(collection.faq),
                '@id': `${site.url}${collection.path}#faq`,
            },
            {
                '@type': 'AggregateOffer',
                '@id': `${site.url}${collection.path}#tarifs`,
                priceCurrency: site.currency,
                lowPrice: range.low,
                highPrice: range.high,
                offerCount: products.length,
                availability: 'https://schema.org/InStock',
                seller: { '@id': STORE_ID },
            },
        ],
    };
}

/** Toutes les pages générées par ce module (hub + collections). */
export function collectionPages() {
    return [hubPage(), ...collections.map(collectionPage)];
}
