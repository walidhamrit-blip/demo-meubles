/* =========================================================================
   Composants d'interface réutilisables
   -------------------------------------------------------------------------
   Chaque fonction retourne une chaîne HTML. Ils remplacent les partials
   d'un framework : mêmes conventions (props → markup), aucune dépendance.
   ========================================================================= */

import { href, asset } from '../lib/paths.mjs';
import { site } from '../site.config.mjs';

/* ------------------------------------------------------------------ Icônes */

/** Icône du sprite SVG inline. Toujours décorative (aria-hidden). */
export function icon(id, classes = 'icon w-4 h-4 stroke-[2]') {
    return `<svg class="${classes}" aria-hidden="true" focusable="false"><use href="#i-${id}"></use></svg>`;
}

/* ------------------------------------------------------------------ Images */

const QUALITY = { 400: 70, 600: 72, 800: 72, 1000: 75, 1200: 75, 1600: 72, 2000: 75 };

/** Construit une URL d'image servie à la largeur demandée. */
export function imageUrl(base, width, quality) {
    const q = quality ?? QUALITY[width] ?? 72;
    return `${base}?auto=format&amp;fit=crop&amp;w=${width}&amp;q=${q}`;
}

/**
 * Image responsive complète : srcset + sizes + dimensions intrinsèques
 * (anti-CLS) + chargement différé, sauf pour l'image LCP.
 */
export function responsiveImage({
    src,
    alt,
    widths = [400, 600, 800],
    sizes = '100vw',
    width,
    height,
    className = 'w-full h-full object-cover',
    priority = false,
}) {
    const largest = widths[widths.length - 1];
    const srcset = widths.map((w) => `${imageUrl(src, w)} ${w}w`).join(', ');

    return `<img
                     src="${imageUrl(src, largest)}"
                     srcset="${srcset}"
                     sizes="${sizes}"
                     width="${width ?? largest}"
                     height="${height ?? Math.round((width ?? largest) * 1.25)}"
                     ${priority ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}
                     alt="${alt}"
                     class="${className}">`;
}

/* ---------------------------------------------------------------- Boutons */

export function buttonLink({ label, path, depth, variant = 'primary', icon: iconId, className = '' }) {
    const styles = {
        primary: 'bg-paper text-on-paper hover:bg-accent hover:text-on-accent shadow-sm',
        dark: 'bg-inverse text-on-inverse hover:bg-accent hover:text-on-accent',
        bronze: 'bg-accent text-on-accent hover:bg-paper hover:text-on-paper',
        outline: 'border border-ink text-ink hover:bg-surface-3',
        outlineLight: 'border border-on-inverse/30 text-on-inverse hover:bg-white/10 backdrop-blur-sm',
    };

    if (!styles[variant]) {
        throw new Error(`buttonLink : variante inconnue « ${variant} » (disponibles : ${Object.keys(styles).join(', ')})`);
    }

    const content = iconId
        ? `<span>${label}</span>${icon(iconId, 'icon w-4 h-4 stroke-[2]')}`
        : label;

    return `<a href="${href(path, { depth })}" class="inline-flex items-center justify-center gap-3 px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium transition duration-300 ${styles[variant]} ${className}">${content}</a>`;
}

/** Bouton d'action ouvrant une couche (modale / tiroir). */
export function buttonDialog({ label, dialogId, variant = 'dark', className = '' }) {
    const styles = {
        dark: 'bg-inverse text-on-inverse hover:bg-accent hover:text-on-accent',
        outline: 'border border-ink text-ink hover:bg-surface-3',
        light: 'border border-on-inverse/30 text-on-inverse hover:bg-white/10 backdrop-blur-sm',
        outlineLight: 'border border-on-inverse/30 text-on-inverse hover:bg-white/10 backdrop-blur-sm',
    };
    if (!styles[variant]) {
        throw new Error(`buttonDialog : variante inconnue « ${variant} » (disponibles : ${Object.keys(styles).join(', ')})`);
    }

    return `<button type="button" data-open-dialog="${dialogId}" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium transition duration-300 ${styles[variant]} ${className}">${label}</button>`;
}

/* ------------------------------------------------------------ Titres de section */

export function sectionHeading({ eyebrow, title, id, align = 'left', tone = 'dark', as = 'h2' }) {
    const alignment = align === 'center' ? 'text-center max-w-2xl mx-auto' : '';
    const eyebrowColor = tone === 'light' ? 'text-accent-ink' : 'text-accent-ink';
    const titleColor = tone === 'light' ? 'text-on-inverse-soft' : 'text-ink';

    return `<div class="${alignment}">
                ${eyebrow ? `<p class="${eyebrowColor} text-xs uppercase tracking-[0.25em] font-semibold">${eyebrow}</p>` : ''}
                <${as} ${id ? `id="${id}"` : ''} class="font-serif text-3xl sm:text-5xl ${titleColor} font-light mt-2 leading-tight">${title}</${as}>
            </div>`;
}

/* -------------------------------------------------------------- Fil d'Ariane */

/**
 * Fil d'Ariane accessible + balisage BreadcrumbList.
 * @param {Array<{label: string, path?: string}>} items
 */
export function breadcrumbs(items, depth) {
    const list = items
        .map((item, index) => {
            const isLast = index === items.length - 1;
            const content = isLast
                ? `<span aria-current="page" class="${index === 0 ? 'text-ink-strong' : 'text-ink-strong'}">${item.label}</span>`
                : `<a href="${href(item.path, { depth })}" class="hover:text-accent-ink transition">${item.label}</a>`;

            return `<li class="flex items-center gap-2">
                    ${index > 0 ? '<span aria-hidden="true" class="text-on-inverse-faint">/</span>' : ''}
                    ${content}
                </li>`;
        })
        .join('\n                    ');

    return `<nav aria-label="Fil d'Ariane" class="text-[11px] uppercase tracking-[0.18em] text-muted mb-8">
                <ol class="flex flex-wrap items-center gap-2">
                    ${list}
                </ol>
            </nav>`;
}

/** Données structurées BreadcrumbList correspondantes. */
export function breadcrumbSchema(items) {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            ...(item.path ? { item: `${site.url}${item.path}` } : {}),
        })),
    };
}

/* ------------------------------------------------------------ Carte produit */

/**
 * Carte produit : l'ensemble de la surface est cliquable via un pseudo-élément
 * plein cadre sur le bouton du titre, ce qui garantit l'accessibilité clavier.
 */
export function productCard(product, depth) {
    const priceLabel = product.priceFrom
        ? `À partir de ${product.price.toLocaleString('fr-FR')} $`
        : `${product.price.toLocaleString('fr-FR')} $`;

    return `<article class="product-item group relative flex flex-col" data-collection="${product.collection}">
                    <div class="relative overflow-hidden bg-surface-3 aspect-[4/5] mb-5">
                        ${responsiveImage({
                            src: product.image,
                            alt: product.alt,
                            widths: [400, 600, 800, 1000],
                            sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw',
                            width: 1000,
                            height: 1250,
                        })}
                        <span class="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm text-[10px] tracking-widest uppercase px-3 py-1 font-medium text-ink">
                            ${product.badge}
                        </span>
                        <span class="absolute bottom-4 right-4 bg-inverse text-on-inverse w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300" aria-hidden="true">
                            ${icon('eye', 'icon w-4 h-4 stroke-[2]')}
                        </span>
                    </div>
                    <div class="flex flex-1 justify-between items-start gap-3 text-ink">
                        <div>
                            <h3 class="font-serif text-xl font-normal group-hover:text-accent-ink transition">
                                <button type="button" class="text-left cursor-pointer after:absolute after:inset-0 after:content-['']" data-quickview="${product.slug}">
                                    ${product.name}
                                </button>
                            </h3>
                            <p class="text-xs text-muted mt-1 font-light">${product.materials}</p>
                        </div>
                        <p class="font-serif text-lg text-ink-strong whitespace-nowrap">${priceLabel}</p>
                    </div>
                </article>`;
}

/* ------------------------------------------------------- Carte de collection */

/** Vignette de collection utilisée sur l'accueil et le hub. */
export function collectionCard(collection, { depth, image, sizes, eager = false }) {
    return `<article class="group relative overflow-hidden bg-surface-3 aspect-[4/5]">
                    ${responsiveImage({
                        src: image.src,
                        alt: image.alt,
                        widths: image.widths,
                        sizes,
                        width: image.width,
                        height: image.height,
                        priority: eager,
                        className: `w-full h-full object-cover transition-transform duration-700 group-hover:scale-105`,
                    })}
                    <div class="absolute inset-0 bg-gradient-to-t from-inverse/90 via-inverse/25 to-transparent" aria-hidden="true"></div>
                    <div class="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-on-inverse">
                        <p class="text-[10px] tracking-[0.3em] uppercase text-on-inverse-muted">${collection.eyebrow}</p>
                        <h3 class="font-serif text-2xl sm:text-3xl font-light mt-2">
                            <a href="${href(collection.path, { depth })}" class="after:absolute after:inset-0 after:content-['']">
                                ${collection.navLabel}
                            </a>
                        </h3>
                        <p class="text-xs text-on-inverse-muted/90 font-light mt-2 leading-relaxed max-w-sm">${collection.summary}</p>
                        <p class="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-on-inverse-muted">
                            Découvrir la collection ${icon('arrow-right', 'icon w-4 h-4 stroke-[2]')}
                        </p>
                    </div>
                </article>`;
}

/* ------------------------------------------------------- Pastilles de matières */

/* Les teintes sont exprimées en classes utilitaires (et non en styles en
   ligne) afin de rester conformes à la politique de sécurité de contenu
   et à la validation HTML. */
const FINISHES = [
    { name: 'Noyer foncé', swatch: 'bg-[#483327]' },
    { name: 'Chêne clair', swatch: 'bg-[#BCA07B]' },
    { name: 'Travertin', swatch: 'bg-[#DCD4C5]' },
    { name: 'Ébène noir', swatch: 'bg-[#1E1B18]' },
];

/** Rangée de finitions (statique, sans JavaScript) pour les pages de collection. */
export function finishStrip(tone = 'dark') {
    const labelColor = tone === 'light' ? 'text-on-inverse-muted' : 'text-muted';

    return `<ul class="flex flex-wrap items-center gap-x-6 gap-y-4">
                ${FINISHES.map(
                    (finish) => `<li class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-full border border-line-strong/60 shadow-inner shrink-0 ${finish.swatch}" aria-hidden="true"></span>
                    <span class="text-[11px] uppercase tracking-wider ${labelColor} font-medium">${finish.name}</span>
                </li>`,
                ).join('\n                ')}
            </ul>`;
}

/* ------------------------------------------------------------------ FAQ */

/** FAQ accessible sans JavaScript (<details> natif) — balisage FAQPage associé. */
export function faqBlock(items) {
    return `<div class="divide-y divide-line-strong border-y border-line-strong">
                ${items
                    .map(
                        (item) => `<details class="group py-6">
                    <summary class="flex items-start justify-between gap-6 cursor-pointer list-none">
                        <h3 class="font-serif text-lg sm:text-xl text-ink font-normal">${item.q}</h3>
                        <span class="shrink-0 mt-1 text-accent-ink transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                            ${icon('plus', 'icon w-5 h-5 stroke-[1.5]')}
                        </span>
                    </summary>
                    <p class="mt-4 text-sm text-muted leading-relaxed font-light max-w-3xl">${item.a}</p>
                </details>`,
                    )
                    .join('\n                ')}
            </div>`;
}

/** Données structurées FAQPage. */
export function faqSchema(items) {
    return {
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
    };
}

/* ------------------------------------------------------- Données structurées */

/** Référence au commerce (définie une fois dans le graphe de l'accueil). */
export const STORE_ID = `${site.url}/#boutique`;

export function storeSchema() {
    const { contact: c } = site;

    return {
        '@type': 'FurnitureStore',
        '@id': STORE_ID,
        name: site.name,
        alternateName: `${site.name} — Atelier de mobilier d'art`,
        description:
            "Maison d'édition et manufacture de mobilier de prestige à Tripoli depuis 1948 : ébénisterie d'art, mobilier sur-mesure en noyer massif, marbre du Levant et tissus d'exception.",
        url: `${site.url}/`,
        logo: `${site.url}/assets/img/favicon.svg`,
        image: [`${site.url}/assets/img/og-image.jpg`],
        telephone: c.phoneHref,
        email: c.email,
        priceRange: '$$$$',
        currenciesAccepted: 'USD, EUR, LBP',
        paymentAccepted: 'Espèces, Carte bancaire, Virement bancaire',
        foundingDate: String(site.foundingYear),
        slogan: "L'élégance vivante, sculptée à Tripoli",
        address: {
            '@type': 'PostalAddress',
            streetAddress: c.street,
            addressLocality: c.locality,
            addressRegion: c.region,
            postalCode: c.postalCode,
            addressCountry: c.country,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: c.geo.latitude,
            longitude: c.geo.longitude,
        },
        hasMap: c.mapsUrl,
        openingHoursSpecification: c.hours.map((slot) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: slot.days,
            opens: slot.opens,
            closes: slot.closes,
        })),
        areaServed: site.areaServed.map((area) => ({ '@type': area.type, name: area.name })),
        sameAs: Object.values(site.social),
        makesOffer: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Mobilier sur-mesure pour architectes d'intérieur" } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Restauration et rééditions d'ébénisterie" } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Boiseries et agencement de chambres sur mesure' } },
        ],
    };
}

/** Balisage Product complet pour un article du catalogue. */
export function productSchema(product) {
    const offer = {
        '@type': 'Offer',
        priceCurrency: site.currency,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: `${site.url}/collections/${product.collection}/`,
        seller: { '@id': STORE_ID },
        ...(product.priceFrom
            ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: product.price, priceCurrency: site.currency } }
            : { price: product.price }),
    };

    return {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: [imageUrl(product.image, 1000)],
        sku: product.slug,
        category: `Mobilier — ${product.collection}`,
        material: product.materials,
        brand: { '@type': 'Brand', name: site.name },
        manufacturer: { '@id': STORE_ID },
        offers: offer,
    };
}
