/* =========================================================================
   Page — Mentions légales, CGV &amp; confidentialité  « /mentions-legales/ »
   -------------------------------------------------------------------------
   ⚠️ Contenu à faire valider par un conseil juridique et à compléter avec
      les mentions d'immatriculation réelles (registre de commerce, TVA).
   ========================================================================= */

import {
    currentDepth as DEPTH,
    href,
} from '../lib/paths.mjs';
import { site } from '../site.config.mjs';
import { icon, breadcrumbs, breadcrumbSchema } from '../templates/components.mjs';
import { tr } from '../content/i18n.mjs';

const PATH = '/mentions-legales/';
export default function mentionsLegales() {
    const { contact } = site;

    const body = `<section class="pt-16 pb-24 px-6 lg:px-12 max-w-3xl mx-auto" aria-labelledby="legal-title">
            ${breadcrumbs([{ label: 'Accueil', path: '/' }, { label: 'Mentions légales' }], DEPTH)}

            <p class="text-xs uppercase tracking-[0.3em] text-accent-ink font-semibold mb-3">${tr('Informations réglementaires')}</p>
            <h1 id="legal-title" class="font-serif text-3xl sm:text-5xl text-ink font-light leading-tight mb-6">${tr('Mentions Légales &amp; Conditions de Vente')}</h1>
            <p class="text-muted text-sm leading-relaxed font-light mb-14">${tr("Dernière mise à jour : octobre 2026. Ce document précise l'identité de l'éditeur du site, les conditions d'acquisition des pièces d'ébénisterie et le traitement de vos données personnelles.")}</p>

            <section aria-labelledby="editeur" class="mb-12">
                <h2 id="editeur" class="font-serif text-2xl text-ink font-normal mb-4">1. Éditeur du site</h2>
                <address class="not-italic text-sm text-muted leading-relaxed space-y-1">
                    <p><strong class="font-medium text-ink-strong">${site.legalName}</strong> — atelier d'ébénisterie et manufacture de mobilier d'art.</p>
                    <p>${contact.street}, ${contact.locality}, ${contact.countryName}.</p>
                    <p>${tr('Téléphone :')}<a href="tel:${contact.phoneHref}" class="underline underline-offset-2 hover:text-ink">${contact.phone.replace(/ /g, '&nbsp;')}</a></p>
                    <p>${tr('E-mail :')}<a href="mailto:${contact.email}" class="underline underline-offset-2 hover:text-ink">${contact.email}</a></p>
                </address>
            </section>

            <section aria-labelledby="propriete" class="mb-12">
                <h2 id="propriete" class="font-serif text-2xl text-ink font-normal mb-4">2. Propriété intellectuelle</h2>
                <p class="text-sm text-muted leading-relaxed font-light">
                    L'ensemble des créations, dessins techniques, photographies, textes et marques présents sur ce site sont protégés. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable de ${site.name}. Les photographies d'ambiance utilisées à titre de démonstration proviennent de banques d'images sous licence.
                </p>
            </section>

            <section id="conditions-de-vente" aria-labelledby="cgv" class="mb-12">
                <h2 id="cgv" class="font-serif text-2xl text-ink font-normal mb-4">3. Conditions générales de vente</h2>
                <div class="text-sm text-muted leading-relaxed font-light space-y-4">
                    <p>${tr("Les pièces présentées sont fabriquées sur commande dans notre atelier de Tripoli. Le devis transmis via le site constitue une demande de chiffrage et non une commande ferme : celle-ci devient définitive après validation des plans techniques, du choix des matières et versement d'un acompte de 40 %.")}</p>
                    <p>${tr('Le délai de fabrication indicatif est de 4 à 6 semaines pour les pièces du catalogue et de 8 à 16 semaines pour les projets sur-mesure intégrant boiseries et mobilier. Les délais sont confirmés par écrit à la commande.')}</p>
                    <p>${tr("L'ébénisterie est garantie 30 ans contre tout vice de structure. Le garnissage et les revêtements sont garantis 5 ans. Sont exclus les dommages résultant d'un usage non conforme, d'une exposition prolongée à l'humidité ou d'une modification par un tiers.")}</p>
                </div>
            </section>

            <section id="expeditions" aria-labelledby="expedition" class="mb-12">
                <h2 id="expedition" class="font-serif text-2xl text-ink font-normal mb-4">4. Expéditions &amp; livraisons</h2>
                <p class="text-sm text-muted leading-relaxed font-light">${tr("Nous livrons au Liban et à l'international (Europe, Golfe, Afrique du Nord). Les pièces sont emballées en caisse bois sur mesure et manipulées sous gants blancs. Les tarifs de fret sont établis après étude technique, selon le volume, la destination et les droits de douane applicables. L'installation par nos artisans est incluse au Liban et disponible sur devis à l'étranger.")}</p>
            </section>

            <section aria-labelledby="confidentialite" class="mb-12">
                <h2 id="confidentialite" class="font-serif text-2xl text-ink font-normal mb-4">5. Données personnelles &amp; cookies</h2>
                <div class="text-sm text-muted leading-relaxed font-light space-y-4">
                    <p>${tr('Les informations transmises via les formulaires (nom, téléphone, e-mail, description du projet) sont utilisées exclusivement pour répondre à votre demande de devis ou de rendez-vous. Elles ne sont ni vendues ni cédées à des tiers et sont conservées 36 mois maximum.')}</p>
                    <p>${tr("Conformément au Règlement général sur la protection des données (RGPD) et à la loi libanaise n° 81/2018, vous disposez d'un droit d'accès, de rectification, d'opposition et d'effacement. Toute demande peut être adressée à")}<a href="mailto:${contact.email}" class="underline underline-offset-2 hover:text-ink">${contact.email}</a>.
                    </p>
                    <p>${tr("Ce site ne dépose aucun cookie publicitaire ni traceur tiers. Les ressources externes utilisées (polices web, images d'ambiance) sont chargées en HTTPS depuis leurs propres serveurs. Si vous intégrez par la suite un outil de mesure d'audience ou une régie publicitaire, une bannière de consentement conforme deviendra obligatoire avant tout dépôt de cookie non essentiel.")}</p>
                </div>
            </section>

            <section aria-labelledby="mediateur" class="mb-12">
                <h2 id="mediateur" class="font-serif text-2xl text-ink font-normal mb-4">6. Litiges</h2>
                <p class="text-sm text-muted leading-relaxed font-light">${tr('Le droit libanais est applicable. En cas de litige, une solution amiable sera recherchée en priorité ; à défaut, les tribunaux compétents de Tripoli (Liban) seront seuls saisis.')}</p>
            </section>

            <p class="pt-8 border-t border-line-strong">
                <a href="${href('/', { depth: DEPTH })}" class="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-medium text-ink border-b border-ink pb-2 hover:text-accent-ink hover:border-accent transition">
                    <span>${tr("Retour à l'accueil")}</span>
                    ${icon('arrow-right', 'icon w-4 h-4 stroke-[2]')}
                </a>
            </p>
        </section>`;

    return {
        path: PATH,
        depth: DEPTH,
        title: 'Mentions Légales, CGV &amp; Confidentialité | Maison Tripoli',
        description:
            "Mentions légales, conditions générales de vente, confidentialité et expéditions de Maison Tripoli, atelier d'ébénisterie et de mobilier d'art à Tripoli.",
        includeQuickView: false,
        body,
        jsonLd: [
            {
                '@type': 'WebPage',
                '@id': `${site.url}/mentions-legales/#page`,
                url: `${site.url}/mentions-legales/`,
                name: 'Mentions légales, conditions de vente et confidentialité',
                description:
                    "Informations légales de Maison Tripoli : éditeur, propriété intellectuelle, conditions générales de vente, expéditions, protection des données et règlement des litiges.",
                inLanguage: 'fr-FR',
                isPartOf: { '@id': `${site.url}/#site` },
                breadcrumb: { '@id': `${site.url}/mentions-legales/#fil` },
            },
            {
                ...breadcrumbSchema([{ label: 'Accueil', path: '/' }, { label: 'Mentions légales', path: PATH }]),
                '@id': `${site.url}/mentions-legales/#fil`,
            },
        ],
    };
}
