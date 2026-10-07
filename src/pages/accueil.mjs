/* =========================================================================
   Page d'accueil — « / »
   -------------------------------------------------------------------------
   Rôle : vitrine globale de la Maison. Elle présente la promesse de marque,
   puis aiguille le visiteur (et le moteur de recherche) vers les cinq pages
   de collection — c'est le nœud principal du maillage interne.
   ========================================================================= */

import {
    currentDepth as DEPTH,
    href,
    asset,
} from '../lib/paths.mjs';
import { site } from '../site.config.mjs';
import { collections } from '../content/collections.mjs';
import { heroImage, collectionImages, editorialImages, projectImages } from '../content/imagery.mjs';
import { tr, localized, inLanguage } from '../content/i18n.mjs';
import {
    icon,
    responsiveImage,
    collectionCard,
    sectionHeading,
    buttonLink,
    buttonDialog,
    storeSchema,
} from '../templates/components.mjs';
import { materialsSection, newsletterSection, ctaBand } from '../templates/sections.mjs';

const PATH = '/';
/**
 * Héros de la page d'accueil.
 *
 * Mise en page éditoriale : le bloc titre est ancré en BAS et aligné sur le
 * bord d'attaque (à droite en arabe, à gauche en anglais), tandis que le
 * chapeau et les appels à l'action occupent la colonne opposée. Le regard
 * descend l'image puis rencontre le titre, au lieu de buter sur un bloc
 * centré posé au milieu de la photographie.
 *
 * Le fond est animé d'un zoom lent et continu (`hero-zoom`, CSS pur) :
 * l'image respire sans jamais laisser apparaître de bord, uniquement par
 * `transform`, donc sans impact sur les Core Web Vitals. L'animation est
 * neutralisée par `prefers-reduced-motion` (voir src/input.css).
 *
 * Le titre est composé dans la police d'affichage de la page : Amiri (naskh
 * classique) en arabe, Cormorant Garamond en anglais — d'où `font-display`,
 * qui résout le jeton `--mt-font-display` selon la langue du document.
 */
function hero() {
    return `<section class="relative min-h-[80vh] lg:min-h-[90vh] flex items-end bg-inverse overflow-hidden" aria-labelledby="hero-title">
            <div class="absolute inset-0 z-0">
                ${responsiveImage({
                    src: heroImage.src,
                    alt: heroImage.alt,
                    widths: heroImage.widths,
                    sizes: '100vw',
                    width: heroImage.width,
                    height: heroImage.height,
                    priority: true,
                    className:
                        'hero-zoom w-full h-full object-cover object-center opacity-70 filter brightness-[0.88]',
                })}
                <div class="absolute inset-0 bg-gradient-to-t from-inverse via-inverse/50 to-black/30" aria-hidden="true"></div>
            </div>

            <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
                <div class="lg:col-span-7">
                    <p class="inline-block uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[11px] sm:text-xs font-medium text-on-inverse-muted mb-5 border-b border-line-strong/40 pb-2">${tr('Le grand savoir-faire libanais')}</p>
                    <h1 id="hero-title" class="hero-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide leading-[1.12] text-on-inverse">${tr("Mobilier d'Art &amp; Haute Ébénisterie")}<span class="hero-subline block italic font-normal">${tr('Sculptés à Tripoli depuis 1948')}</span>
                    </h1>
                </div>
                <div class="lg:col-span-5">
                    <p class="max-w-xl text-sm sm:text-base text-on-inverse-muted/90 font-light leading-relaxed mb-8 tracking-wide">${tr("Depuis plus de 70 ans, nos maîtres ébénistes allient le marbre du Levant, le noyer massif et les velours d'exception pour habiller les demeures les plus raffinées.")}</p>
                    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                        ${buttonLink({ label: tr('Découvrir les collections'), path: '/collections/', depth: DEPTH, variant: 'primary' })}
                        ${buttonLink({ label: tr('Visiter le showroom'), path: '/contact/', depth: DEPTH, variant: 'outlineLight' })}
                    </div>
                </div>
            </div>

            <!-- Centrage volontairement physique (left) : en écriture arabe,
                 « start » vaut « right », et la flèche se décalerait de sa
                 propre largeur. -->
            <a href="#collections" class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-on-inverse-muted/70 hover:text-on-inverse-soft transition animate-bounce" aria-label="${tr('Faire défiler vers les collections')}">
                ${icon('chevron-down', 'icon w-6 h-6 stroke-[1.5]')}
            </a>
        </section>`;
}

function quote() {
    return `<section class="py-24 px-6 md:px-12 bg-surface-2 border-b border-line" aria-label="${tr('Parole de maître ébéniste')}">
            <figure class="max-w-4xl mx-auto text-center">
                <div class="w-12 h-px bg-accent mx-auto mb-8" aria-hidden="true"></div>
                <blockquote>
                    <p class="font-serif text-2xl sm:text-3xl md:text-4xl text-ink font-light leading-snug italic mb-6">
                        ${tr('« Tripoli est le berceau séculaire du bois noble. Nous ne construisons pas de simples meubles ; nous forgeons des pièces de famille destinées à traverser les générations. »')}</p>
                </blockquote>
                <figcaption class="text-xs uppercase tracking-[0.3em] text-accent-ink font-medium">${tr('Maître Fadi Kabbara — Directeur de création,')}<cite class="not-italic">${tr('Atelier de Tripoli')}</cite>
                </figcaption>
            </figure>
        </section>`;
}

function collectionsShowcase() {
    return `<section id="collections" class="py-24 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="collections-title">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-line-strong">
                ${sectionHeading({
                    eyebrow: tr('Catalogue — édition 2025'),
                    title: tr('Cinq collections, un même atelier'),
                    id: 'collections-title',
                })}
                <a href="${href('/collections/', { depth: DEPTH })}" class="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-medium text-ink border-b border-ink pb-2 hover:text-accent-ink hover:border-accent transition shrink-0">
                    ${tr('Voir toutes les collections')}${icon('arrow-right', 'icon w-4 h-4 stroke-[2]')}
                </a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                ${collections
                    .map((collection, index) =>
                        collectionCard(collection, {
                            depth: DEPTH,
                            image: collectionImages[collection.slug],
                            sizes: '(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 92vw',
                            eager: index === 0,
                        }),
                    )
                    .join('\n                ')}
                <div class="hidden lg:flex flex-col justify-center bg-inverse text-on-inverse p-10 aspect-[4/5]">
                    <p class="text-[10px] tracking-[0.3em] uppercase text-accent-ink font-semibold">${tr('Sur-mesure intégral')}</p>
                    <p class="font-serif text-2xl sm:text-3xl font-light mt-3 leading-tight">${tr('Un projet complet, du calepinage à la pose')}</p>
                    <p class="text-xs text-on-inverse-muted font-light mt-4 leading-relaxed">${tr("Boiseries, mobilier, éclairage et pierre : nous dessinons l'ensemble et fabriquons dans un même langage de matières.")}</p>
                    <div class="mt-8">
                        ${buttonLink({ label: tr('Notre méthode'), path: '/sur-mesure/', depth: DEPTH, variant: 'bronze', className: 'text-[11px]' })}
                    </div>
                </div>
            </div>
        </section>`;
}

function atelierTeaser() {
    return `<section class="py-24 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="atelier-teaser-title">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <figure class="lg:col-span-6 relative">
                    <div class="aspect-[4/5] bg-surface-3 overflow-hidden relative">
                        ${responsiveImage({
                            src: editorialImages.atelierArtisan.src,
                            alt: editorialImages.atelierArtisan.alt,
                            widths: editorialImages.atelierArtisan.widths,
                            sizes: '(min-width: 1024px) 45vw, 92vw',
                            width: editorialImages.atelierArtisan.width,
                            height: editorialImages.atelierArtisan.height,
                        })}
                    </div>
                    <figcaption class="hidden sm:block absolute -bottom-8 -right-8 bg-inverse text-on-inverse-soft p-8 max-w-xs shadow-xl">
                        <span class="block font-serif text-3xl italic font-light mb-1">${tr('Tripoli, Liban')}</span>
                        <p class="text-xs text-on-inverse-muted font-light leading-relaxed">${tr("Capitale historique des corporations d'artisans d'art, où chaque ruelle du vieux souk perpétue le travail du bois noble.")}</p>
                    </figcaption>
                </figure>

                <div class="lg:col-span-6 space-y-8 lg:pl-6">
                    ${sectionHeading({
                        eyebrow: tr("L'âme de la ville"),
                        title: tr('Une dynastie de menuisiers au cœur de la Méditerranée'),
                        id: 'atelier-teaser-title',
                    })}
                    <p class="text-muted text-sm sm:text-base leading-relaxed font-light">${tr("Bien au-delà d'un centre de production, la ville de")}<strong class="font-medium text-ink-strong">${tr("Tripoli (Al-Fayha'a)")}</strong>${tr("incarne l'épicentre du mobilier haut de gamme au Moyen-Orient. Nos ateliers transmettent toujours l'assemblage en queue d'aronde, le panneautage à plate-bande et la marqueterie.")}
                    </p>
                    <dl class="grid grid-cols-2 gap-8 pt-4 border-t border-line-strong">
                        <div>
                            <dt class="sr-only">${tr('Taux de fabrication locale')}</dt>
                            <dd>
                                <span class="font-serif text-3xl text-ink block">100 %</span>
                                <span class="text-xs uppercase tracking-wider text-muted">${tr('Fabrication locale à Tripoli')}</span>
                            </dd>
                        </div>
                        <div>
                            <dt class="sr-only">${tr("Durée de garantie sur l'ébénisterie")}</dt>
                            <dd>
                                <span class="font-serif text-3xl text-ink block">30 ans</span>
                                <span class="text-xs uppercase tracking-wider text-muted">${tr("Garantie sur l'ébénisterie")}</span>
                            </dd>
                        </div>
                    </dl>
                    <div class="pt-2">
                        <a href="${href('/atelier/', { depth: DEPTH })}" class="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-medium text-ink border-b border-ink pb-2 hover:text-accent-ink hover:border-accent transition">
                            <span>${tr("Découvrir l'atelier &amp; la démarche RSE")}</span>
                            ${icon('arrow-up-right', 'icon w-4 h-4 stroke-[2]')}
                        </a>
                    </div>
                </div>
            </div>
        </section>`;
}

function projetsTeaser() {
    return `<section class="py-24 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="projets-teaser-title">
            <div class="text-center max-w-2xl mx-auto mb-16">
                ${sectionHeading({
                    eyebrow: 'In situ',
                    title: tr('Demeures réalisées'),
                    id: 'projets-teaser-title',
                    align: 'center',
                })}
                <p class="text-muted text-xs sm:text-sm mt-3 font-light">${tr('Immersion dans les résidences contemporaines habillées par les ateliers de la Maison.')}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${projectImages
                    .map(
                        (project) => `<figure class="group relative overflow-hidden aspect-[3/4] bg-surface-3">
                    ${responsiveImage({
                        src: project.src,
                        alt: project.alt,
                        widths: [400, 600, 800],
                        sizes: '(min-width: 768px) 31vw, 92vw',
                        width: 800,
                        height: 1067,
                    })}
                    <figcaption class="absolute inset-0 bg-gradient-to-t from-inverse/80 via-transparent to-transparent flex items-end p-8 text-on-inverse opacity-90 group-hover:opacity-100 transition">
                        <span>
                            <span class="block text-[10px] tracking-widest uppercase text-on-inverse-muted">${project.location}</span>
                            <span class="block font-serif text-2xl font-normal mt-1">${project.name}</span>
                            <span class="block text-xs text-on-inverse-muted font-light mt-1">${project.caption}</span>
                        </span>
                    </figcaption>
                </figure>`,
                    )
                    .join('\n                ')}
            </div>

            <div class="mt-14 text-center">
                <a href="${href('/projets/', { depth: DEPTH })}" class="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-medium text-ink border-b border-ink pb-2 hover:text-accent-ink hover:border-accent transition">
                    <span>${tr('Voir tous les projets livrés')}</span>
                    ${icon('arrow-right', 'icon w-4 h-4 stroke-[2]')}
                </a>
            </div>
        </section>`;
}

export default function accueil() {
    const body = [
        hero(),
        quote(),
        collectionsShowcase(),
        materialsSection(DEPTH),
        atelierTeaser(),
        projetsTeaser(),
        ctaBand({
            depth: DEPTH,
            eyebrow: tr('Prendre rendez-vous'),
            title: tr('Un projet, une pièce ou une simple question ?'),
            text: tr('Nos conseillers vous reçoivent au showroom de Tripoli ou vous répondent sous 24 heures pour un devis, un plan de teinte ou une estimation de délai.'),
            primary: { label: tr('Réserver une visite privée'), dialogId: 'consultationModal' },
            secondary: { label: tr('Écrire à la Maison'), path: '/contact/' },
        }),
        newsletterSection(),
    ].join('\n\n        ');

    return {
        path: PATH,
        depth: DEPTH,
        title: localized({
            fr: `${site.name} — Ébénisterie &amp; Mobilier d'Art à Tripoli`,
            en: `${site.name} — Art Furniture &amp; Cabinetmaking, Tripoli`,
            ar: 'ميزون طرابلس — نجارة فاخرة وأثاث فني في طرابلس',
        }),
        description: localized({
            fr: "Atelier d'ébénisterie depuis 1948, Maison Tripoli crée du mobilier d'art sur-mesure en noyer massif : salons, tables, chambres, luminaires. Showroom à Tripoli.",
            en: "A cabinetmaking workshop since 1948, Maison Tripoli makes bespoke solid walnut furniture: seating, tables, bedrooms, lighting. Showroom in Tripoli, Lebanon.",
            ar: 'ورشة نجارة منذ عام ١٩٤٨، تصمّم ميزون طرابلس أثاثاً فنياً حسب الطلب من خشب الجوز الصلب: جلسات وطاولات وغرف نوم وإضاءة. صالة عرض في طرابلس، لبنان.',
        }),
        ogType: 'website',
        includeQuickView: false,
        preload: `<link rel="preload" as="image"
          href="${heroImage.src}?auto=format&amp;fit=crop&amp;w=1600&amp;q=78"
          imagesrcset="${heroImage.widths.map((w) => `${heroImage.src}?auto=format&amp;fit=crop&amp;w=${w}&amp;q=${w >= 1600 ? 75 : 72} ${w}w`).join(', ')}"
          imagesizes="100vw" fetchpriority="high">`,
        body,
        jsonLd: [
            storeSchema(),
            {
                '@type': 'WebSite',
                '@id': `${site.url}/#site`,
                url: `${site.url}/`,
                name: site.name,
                inLanguage: inLanguage(),
                publisher: { '@id': `${site.url}/#boutique` },
            },
            {
                '@type': 'ItemList',
                '@id': `${site.url}/#collections`,
                name: 'Collections Maison Tripoli',
                numberOfItems: collections.length,
                itemListElement: collections.map((collection, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: collection.navLabel,
                    url: `${site.url}${collection.path}`,
                })),
            },
        ],
    };
}
