/* =========================================================================
   Page — Erreur 404  « /404.html »
   -------------------------------------------------------------------------
   Servie par l'hébergeur avec un code HTTP 404. Volontairement exclue de
   l'index (`noindex, follow`) : son rôle est de rattraper le visiteur et
   de diffuser du signal vers les pages stratégiques.
   ========================================================================= */

import { site } from '../site.config.mjs';
import { icon } from '../templates/components.mjs';
import { tr, localized, inLanguage } from '../content/i18n.mjs';

/* Une page 404 est servie pour n'importe quelle URL demandée : les liens
   relatifs seraient résolus par rapport à cette URL et non au fichier.
   On utilise donc des chemins absolus à la racine, préfixés par le
   éventuel chemin de base du déploiement. */
const root = (target) => `${site.basePath}${target}`;

export default function erreur404() {
    const body = `<section class="py-24 px-6 lg:px-12 max-w-3xl mx-auto text-center" aria-labelledby="error-title">
            <p class="text-xs uppercase tracking-[0.3em] text-accent-ink font-semibold mb-4">${tr('Erreur 404')}</p>
            <h1 id="error-title" class="font-serif text-4xl sm:text-6xl text-ink font-light leading-tight mb-6">${tr("Cette pièce n'est plus au catalogue")}</h1>
            <p class="text-muted text-sm leading-relaxed font-light mb-10">${tr("La page demandée est introuvable ou a été déplacée. Nos collections, l'atelier de Tripoli et le service sur-mesure restent accessibles depuis l'accueil.")}</p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="${root('/')}" class="w-full sm:w-auto px-8 py-3.5 bg-inverse text-on-inverse text-xs uppercase tracking-[0.22em] font-medium hover:bg-accent hover:text-on-accent transition duration-300">${tr("Retour à l'accueil")}</a>
                <a href="${root('/collections/')}" class="w-full sm:w-auto px-8 py-3.5 border border-ink text-ink text-xs uppercase tracking-[0.22em] font-medium hover:bg-surface-3 transition duration-300">${tr('Voir les collections')}</a>
            </div>

            <div class="mt-16 pt-10 border-t border-line-strong text-left">
                <h2 class="font-serif text-xl text-ink font-normal mb-5">${tr('Pages les plus consultées')}</h2>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    <li>
                        <a href="${root('/collections/salons/')}" class="inline-flex items-center gap-3 text-muted hover:text-accent-ink transition">
                            ${icon('arrow-right', 'icon w-4 h-4 stroke-[2] text-accent-ink')}
${tr('Salons &amp; banquettes')}
                        </a>
                    </li>
                    <li>
                        <a href="${root('/collections/salles-a-manger/')}" class="inline-flex items-center gap-3 text-muted hover:text-accent-ink transition">
                            ${icon('arrow-right', 'icon w-4 h-4 stroke-[2] text-accent-ink')}
${tr('Salles à manger &amp; tables')}
                        </a>
                    </li>
                    <li>
                        <a href="${root('/collections/chambres/')}" class="inline-flex items-center gap-3 text-muted hover:text-accent-ink transition">
                            ${icon('arrow-right', 'icon w-4 h-4 stroke-[2] text-accent-ink')}
${tr('Chambres &amp; suites')}
                        </a>
                    </li>
                    <li>
                        <a href="${root('/sur-mesure/')}" class="inline-flex items-center gap-3 text-muted hover:text-accent-ink transition">
                            ${icon('arrow-right', 'icon w-4 h-4 stroke-[2] text-accent-ink')}
${tr('Service sur-mesure')}
                        </a>
                    </li>
                    <li>
                        <a href="${root('/projets/')}" class="inline-flex items-center gap-3 text-muted hover:text-accent-ink transition">
                            ${icon('arrow-right', 'icon w-4 h-4 stroke-[2] text-accent-ink')}
${tr('Demeures réalisées')}
                        </a>
                    </li>
                    <li>
                        <a href="${root('/contact/')}" class="inline-flex items-center gap-3 text-muted hover:text-accent-ink transition">
                            ${icon('arrow-right', 'icon w-4 h-4 stroke-[2] text-accent-ink')}
${tr('Showroom &amp; contact')}
                        </a>
                    </li>
                </ul>
            </div>
        </section>`;

    return {
        path: '/404.html',
        depth: 0,
        // Page d'erreur servie depuis n'importe quelle URL : liens en
        // absolu racine (préfixés par le chemin de base éventuel).
        rootAbsoluteLinks: true,
        title: localized({
            fr: 'Page introuvable (404) | Ébénisterie Maison Tripoli',
            en: 'Page not found (404) | Maison Tripoli',
            ar: 'الصفحة غير موجودة (٤٠٤) | ميزون طرابلس',
        }),
        description: localized({
            fr: 'La page recherchée n\'existe pas ou a été déplacée. Retrouvez les collections de mobilier d\'art et l\'atelier d\'ébénisterie Maison Tripoli à Tripoli, au Liban.',
            en: 'The page you are looking for does not exist or has been moved. Find the art furniture collections and the Maison Tripoli workshop in Tripoli, Lebanon.',
            ar: 'الصفحة المطلوبة غير موجودة أو نُقلت. اعثر على مجموعات الأثاث الفني وورشة ميزون طرابلس في طرابلس، لبنان، من الصفحة الرئيسية.',
        }),
        robots: 'noindex, follow',
        includeQuickView: false,
        body,
        jsonLd: [
            {
                '@type': 'WebPage',
                '@id': `${site.url}/404.html#page`,
                url: `${site.url}/404.html`,
                name: tr('Page introuvable',),
                inLanguage: inLanguage(),
                isPartOf: { '@id': `${site.url}/#site` },
                about: { '@id': `${site.url}/#boutique` },
            },
        ],
    };
}
