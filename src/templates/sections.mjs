/* =========================================================================
   Sections de page réutilisables
   -------------------------------------------------------------------------
   Blocs éditoriaux partagés par plusieurs pages (grille produits, section
   « matières », maillage interne, bandeau d'appel à l'action, newsletter).
   ========================================================================= */

import { href } from '../lib/paths.mjs';
import { site } from '../site.config.mjs';
import { tr } from '../content/i18n.mjs';
import {
    icon,
    responsiveImage,
    productCard,
    collectionCard,
    sectionHeading,
    finishStrip,
    buttonLink,
    buttonDialog,
} from './components.mjs';
import { productsByCollection } from '../content/products.mjs';
import { relatedCollections } from '../content/collections.mjs';
import { collectionImages } from '../content/imagery.mjs';

/* ------------------------------------------------------------ Grille produits */

export function productGrid(products, depth) {
    return `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                ${products.map((product) => productCard(product, depth)).join('\n                ')}
            </div>`;
}

/* --------------------------------------------------- Section éditoriale (H2) */

/**
 * Section de texte avec liste de caractéristiques et visuel optionnel.
 * @param {object} section { id, eyebrow, heading, paragraphs, specs }
 */
export function editorialSection(section, { depth, tone = 'light', image } = {}) {
    const isDark = tone === 'dark';

    const specs = section.specs
        ? `<dl class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 pt-8 border-t ${
              isDark ? 'border-line-strong/20' : 'border-line-strong'
          }">
                ${section.specs
                    .map(
                        (spec) => `<div>
                    <dt class="text-[10px] uppercase tracking-[0.2em] ${isDark ? 'text-accent-ink' : 'text-accent-ink'} font-semibold">${spec.label}</dt>
                    <dd class="text-sm ${isDark ? 'text-on-inverse-muted' : 'text-ink-strong'} mt-1 font-light">${spec.value}</dd>
                </div>`,
                    )
                    .join('\n                ')}
            </dl>`
        : '';

    const text = `<div class="space-y-6">
                ${sectionHeading({ eyebrow: section.eyebrow, title: section.heading, id: section.id, tone: isDark ? 'light' : 'dark' })}
                ${section.paragraphs
                    .map(
                        (paragraph) =>
                            `<p class="text-sm sm:text-base leading-relaxed font-light ${
                                isDark ? 'text-on-inverse-muted' : 'text-muted'
                            }">${paragraph}</p>`,
                    )
                    .join('\n                ')}
                ${specs}
            </div>`;

    if (!image) {
        return `<section class="${
            isDark ? 'bg-inverse text-on-inverse' : 'bg-surface-2 border-y border-line'
        } py-24 px-6 lg:px-12" aria-labelledby="${section.id}">
            <div class="max-w-3xl mx-auto">${text}</div>
        </section>`;
    }

    return `<section class="${
        isDark ? 'bg-inverse text-on-inverse' : 'bg-surface-2 border-y border-line'
    } py-24 px-6 lg:px-12" aria-labelledby="${section.id}">
            <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div class="lg:col-span-6">${text}</div>
                <figure class="lg:col-span-6">
                    <div class="aspect-[4/5] overflow-hidden ${image.border ? 'border border-line-strong/20' : 'bg-surface-3'}">
                        ${responsiveImage({
                            src: image.src,
                            alt: image.alt,
                            widths: [600, 800, 1000],
                            sizes: '(min-width: 1024px) 45vw, 92vw',
                            width: image.width ?? 1000,
                            height: image.height ?? 1250,
                        })}
                    </div>
                    ${image.caption ? `<figcaption class="mt-4 text-[11px] uppercase tracking-widest ${isDark ? 'text-on-inverse-faint' : 'text-muted'}">${image.caption}</figcaption>` : ''}
                </figure>
            </div>
        </section>`;
}

/* ------------------------------------------------------------- Maillage interne */

export function relatedCollectionsSection(collection, depth) {
    const related = relatedCollections(collection.slug);

    return `<section class="py-24 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="related-title">
            ${sectionHeading({
                eyebrow: 'Poursuivre la visite',
                title: 'Découvrir aussi',
                id: 'related-title',
                align: 'center',
            })}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
                ${related.map((item) => collectionCard(item, { depth, image: collectionImages[item.slug], sizes: '(min-width: 768px) 45vw, 92vw' })).join('\n                ')}
            </div>
        </section>`;
}

/* --------------------------------------------------------------- Bandeau CTA */

export function ctaBand({ depth, eyebrow, title, text, primary, secondary, tone = 'dark' }) {
    const isDark = tone === 'dark';

    return `<section class="py-20 px-6 lg:px-12 ${isDark ? 'bg-inverse text-on-inverse' : 'bg-surface-3'}" aria-labelledby="cta-title">
            <div class="max-w-4xl mx-auto text-center space-y-6">
                ${eyebrow ? `<p class="text-xs uppercase tracking-[0.3em] ${isDark ? 'text-accent-ink' : 'text-accent-ink'} font-semibold">${eyebrow}</p>` : ''}
                <h2 id="cta-title" class="font-serif text-3xl sm:text-4xl font-light leading-tight ${isDark ? 'text-on-inverse-soft' : 'text-ink'}">${title}</h2>
                <p class="text-sm leading-relaxed font-light max-w-2xl mx-auto ${isDark ? 'text-on-inverse-muted' : 'text-muted'}">${text}</p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    ${primary ? buttonDialog({ label: primary.label, dialogId: primary.dialogId, variant: isDark ? 'outlineLight' : 'dark' }) : ''}
                    ${secondary ? buttonLink({ label: secondary.label, path: secondary.path, depth, variant: isDark ? 'bronze' : 'outline' }) : ''}
                </div>
            </div>
        </section>`;
}

/* --------------------------------------------------------------- Newsletter */

export function newsletterSection() {
    return `<section class="py-16 bg-surface-3 text-center px-6 border-t border-line-strong" aria-labelledby="newsletter-title">
            <div class="max-w-xl mx-auto">
                <p class="text-[11px] uppercase tracking-[0.3em] text-accent-ink block mb-2">${tr('Correspondance privée')}</p>
                <h2 id="newsletter-title" class="font-serif text-2xl sm:text-3xl font-light text-ink mb-3">${tr('Recevez nos nouvelles éditions')}</h2>
                <p class="text-xs text-muted mb-6 leading-relaxed">${tr("Aperçus confidentiels de nos nouvelles lignes de mobilier, invitations aux vernissages et chroniques sur l'architecture libanaise.")}</p>
                <form id="newsletterForm" class="flex flex-col sm:flex-row gap-2">
                    <label for="newsletterEmail" class="sr-only">${tr('Votre adresse e-mail')}</label>
                    <input type="email" id="newsletterEmail" name="email" required autocomplete="email" inputmode="email" placeholder="${tr('Votre adresse e-mail')}"
                           class="w-full bg-surface border border-line-strong px-4 py-3 text-xs focus:outline-none focus:border-ink">
                    <button type="submit" class="px-8 py-3 bg-inverse text-on-inverse text-xs uppercase tracking-widest hover:bg-accent hover:text-on-accent transition shrink-0">${tr("S'inscrire")}</button>
                </form>
                <p id="newsletterStatus" class="mt-3 text-xs text-emerald-800" role="status" aria-live="polite"></p>
            </div>
        </section>`;
}

/* ------------------------------------------------- Section matières (accueil) */

export function materialsSection(depth) {
    return `<section class="py-24 bg-surface-2 border-y border-line" aria-labelledby="matieres-title">
            <div class="max-w-7xl mx-auto px-6 lg:px-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    <div class="lg:col-span-5 space-y-6">
                        <p class="text-xs uppercase tracking-[0.25em] text-accent-ink font-semibold">${tr('Atelier de confection Tripoli')}</p>
                        <h2 id="matieres-title" class="font-serif text-3xl sm:text-5xl text-ink font-light leading-tight">${tr('La Noblesse des Matières Sélectionnées')}</h2>
                        <p class="text-muted text-sm leading-relaxed font-light">${tr('À Tripoli, chaque pièce prend racine dans le choix intransigeant des essences de bois locales et régionales, associées aux marbres extraits du bassin levantin et aux tissages européens.')}</p>

                        <div class="pt-4 border-t border-line-strong space-y-4">
                            <p id="finish-label" class="text-xs uppercase tracking-widest font-medium text-ink">${tr('Sélectionnez une essence de finition :')}</p>

                            <div class="flex flex-wrap items-center gap-4" role="group" aria-labelledby="finish-label">
                                <button type="button" class="finish-btn flex flex-col items-center group" data-material="walnut" aria-pressed="true">
                                    <span class="finish-swatch w-12 h-12 rounded-full border-2 bg-[#483327] shadow-inner mb-1.5 transition transform group-hover:scale-105" aria-hidden="true"></span>
                                    <span class="text-[11px] uppercase tracking-wider text-ink-strong font-medium">${tr('Noyer foncé')}</span>
                                </button>
                                <button type="button" class="finish-btn flex flex-col items-center group" data-material="oak" aria-pressed="false">
                                    <span class="finish-swatch w-12 h-12 rounded-full border-2 bg-[#BCA07B] shadow-inner mb-1.5 transition transform group-hover:scale-105" aria-hidden="true"></span>
                                    <span class="text-[11px] uppercase tracking-wider text-muted group-hover:text-ink-strong font-medium">${tr('Chêne clair')}</span>
                                </button>
                                <button type="button" class="finish-btn flex flex-col items-center group" data-material="travertine" aria-pressed="false">
                                    <span class="finish-swatch w-12 h-12 rounded-full border-2 bg-[#DCD4C5] shadow-inner mb-1.5 transition transform group-hover:scale-105" aria-hidden="true"></span>
                                    <span class="text-[11px] uppercase tracking-wider text-muted group-hover:text-ink-strong font-medium">${tr('Travertin')}</span>
                                </button>
                                <button type="button" class="finish-btn flex flex-col items-center group" data-material="ebony" aria-pressed="false">
                                    <span class="finish-swatch w-12 h-12 rounded-full border-2 bg-[#1E1B18] shadow-inner mb-1.5 transition transform group-hover:scale-105" aria-hidden="true"></span>
                                    <span class="text-[11px] uppercase tracking-wider text-muted group-hover:text-ink-strong font-medium">${tr('Ébène noir')}</span>
                                </button>
                            </div>

                            <div id="materialDescription" class="bg-surface p-4 border border-line mt-4 text-xs text-ink-strong/80 leading-relaxed" role="status" aria-live="polite">
                                <strong class="font-medium text-ink block mb-1">${tr('Noyer Royal de la Vallée :')}</strong>${tr("Séchage naturel en grange à Tripoli pendant 18 mois, puis polissage ciré à la main avec une cire d'abeille biologique libanaise.")}</div>
                        </div>
                    </div>

                    <div class="lg:col-span-7">
                        <figure class="relative bg-surface-3 overflow-hidden shadow-2xl aspect-[16/10] group">
                            <img id="materialPreviewImg"
                                 src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=1200&amp;q=75"
                                 srcset="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=800&amp;q=72 800w,
                                         https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=1200&amp;q=75 1200w,
                                         https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=1600&amp;q=72 1600w"
                                 sizes="(min-width: 1024px) 58vw, 92vw"
                                 width="1600" height="1000" loading="lazy" decoding="async"
                                 alt="${tr("Console basse Bahia en noyer foncé sculpté et ciré à la main, finition d'ébénisterie de l'atelier Maison Tripoli")}"
                                 class="w-full h-full object-cover transition-opacity duration-500">
                            <figcaption class="absolute bottom-6 start-6 end-6 bg-surface/90 backdrop-blur-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <span>
                                    <span class="block text-[10px] tracking-widest uppercase text-accent-ink font-semibold">${tr('Exemplaire atelier')}</span>
                                    <span id="materialTitle" class="block font-serif text-lg text-ink">${tr('Console Basse « Bahia » en Noyer Sculpté')}</span>
                                </span>
                                <button type="button" data-open-dialog="consultationModal" class="text-xs uppercase tracking-widest underline underline-offset-4 hover:text-accent-ink shrink-0 text-left">${tr('Commander un échantillon')}</button>
                            </figcaption>
                        </figure>
                        <p class="mt-4 text-[11px] uppercase tracking-widest text-muted">
                            ${tr("Finitions disponibles sur l'ensemble des collections —")}${`<a href="${href('/collections/', { depth })}" class="underline underline-offset-4 hover:text-ink">${tr('voir les cinq collections')}</a>`}
                        </p>
                    </div>

                </div>
            </div>
        </section>`;
}

/* ------------------------------------------------------- Bandeau finitions court */

export function finishSection(tone = 'dark') {
    return `<div class="pt-8 mt-8 border-t border-line-strong">
                <p class="text-xs uppercase tracking-[0.25em] text-accent-ink font-semibold mb-5">${tr('Quatre finitions au choix')}</p>
                ${finishStrip(tone)}
            </div>`;
}

export {
    icon,
    responsiveImage,
    productCard,
    collectionCard,
    sectionHeading,
    buttonLink,
    buttonDialog,
    finishStrip,
};
