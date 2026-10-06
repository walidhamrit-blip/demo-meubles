/* =========================================================================
   Page — Showroom &amp; contact  « /contact/ »
   -------------------------------------------------------------------------
   Page de conversion et de référencement local : coordonnées complètes
   (NAP cohérent avec le JSON-LD), horaires, accès, formulaire étiqueté.
   ========================================================================= */

import { href } from '../lib/paths.mjs';
import { site } from '../site.config.mjs';
import { icon, sectionHeading, breadcrumbs, breadcrumbSchema, storeSchema, faqBlock, faqSchema } from '../templates/components.mjs';
import { newsletterSection } from '../templates/sections.mjs';

const PATH = '/contact/';
const DEPTH = 1;

const faq = [
    {
        q: 'Faut-il prendre rendez-vous pour visiter le showroom ?',
        a: "Le showroom est ouvert du lundi au samedi de 09h30 à 18h30 en accès libre. Le rendez-vous est toutefois recommandé : il garantit la présence d'un conseiller designer et permet de préparer les échantillons de matières correspondant à votre projet.",
    },
    {
        q: 'Répondez-vous aux demandes envoyées depuis l’étranger ?',
        a: "Oui. Les demandes internationales reçoivent une première réponse sous 24 heures ouvrées, avec une estimation de cadrage et la liste des informations nécessaires (plans, dimensions, destination) pour établir un devis de fret précis.",
    },
    {
        q: 'Peut-on voir les matières avant de commander ?',
        a: "Nous envoyons sur demande une mallette d'échantillons — essences de bois, pierres et textiles — pour les projets confirmés. Au Liban, la visite de l'atelier permet de voir les finitions appliquées sur des panneaux témoins grandeur réelle.",
    },
];

export default function contact() {
    const { contact } = site;

    const body = [
        `<section class="pt-16 pb-14 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="contact-title">
            ${breadcrumbs([{ label: 'Accueil', path: '/' }, { label: 'Showroom &amp; contact' }], DEPTH)}

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div class="lg:col-span-7">
                    <p class="text-xs uppercase tracking-[0.25em] text-accent-ink font-semibold">Nous rendre visite</p>
                    <h1 id="contact-title" class="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink font-light mt-3 leading-[1.1]">
                        Showroom &amp; Atelier à Tripoli, Liban
                    </h1>
                </div>
                <div class="lg:col-span-5">
                    <p class="text-muted text-sm sm:text-base leading-relaxed font-light">
                        Nous vous accueillons au cœur historique de l'artisanat tripolitain. Venez voir les pièces grandeur réelle, toucher les matières et rencontrer les artisans qui fabriqueront votre mobilier.
                    </p>
                </div>
            </div>
        </section>

        <section class="pb-24 px-6 lg:px-12 max-w-7xl mx-auto" aria-labelledby="coordonnees-title">
            <h2 id="coordonnees-title" class="sr-only">Coordonnées du showroom et formulaire de demande</h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">

                <div class="space-y-10">
                    <address class="not-italic space-y-6 text-sm text-ink-strong">
                        <div class="flex items-start gap-4">
                            ${icon('map-pin', 'icon w-5 h-5 stroke-[2] text-accent-ink mt-0.5')}
                            <p>
                                <strong class="block text-ink uppercase tracking-wider text-[11px] font-semibold">Adresse du showroom</strong>
                                <span class="block mt-1 text-muted font-light">${contact.street}</span>
                                <span class="block text-muted font-light">${contact.locality}, ${contact.countryName}</span>
                                <a href="${contact.mapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 mt-3 text-xs uppercase tracking-[0.18em] text-ink border-b border-ink pb-1 hover:text-accent-ink hover:border-accent transition">
                                    Ouvrir dans Google Maps
                                    ${icon('arrow-up-right', 'icon w-4 h-4 stroke-[2]')}
                                </a>
                            </p>
                        </div>
                        <div class="flex items-start gap-4">
                            ${icon('clock', 'icon w-5 h-5 stroke-[2] text-accent-ink mt-0.5')}
                            <p>
                                <strong class="block text-ink uppercase tracking-wider text-[11px] font-semibold">Horaires d'ouverture</strong>
                                <span class="block mt-1 text-muted font-light">${contact.displayHours}</span>
                            </p>
                        </div>
                        <div class="flex items-start gap-4">
                            ${icon('phone', 'icon w-5 h-5 stroke-[2] text-accent-ink mt-0.5')}
                            <p>
                                <strong class="block text-ink uppercase tracking-wider text-[11px] font-semibold">Conciergerie téléphonique / WhatsApp</strong>
                                <a href="tel:${contact.phoneHref}" class="block mt-1 text-muted font-light hover:text-accent-ink transition">${contact.phone}</a>
                                <a href="tel:${contact.mobileHref}" class="block text-muted font-light hover:text-accent-ink transition">${contact.mobile}</a>
                                <a href="mailto:${contact.email}" class="block mt-2 text-ink-strong hover:text-accent-ink transition">${contact.email}</a>
                            </p>
                        </div>
                    </address>

                    <section class="bg-surface-2 border border-line p-8" aria-labelledby="acces-title">
                        <h3 id="acces-title" class="font-serif text-xl text-ink font-normal mb-4">Venir à l'atelier</h3>
                        <ul class="space-y-3 text-sm text-muted font-light">
                            <li class="flex gap-3">
                                ${icon('check', 'icon w-4 h-4 stroke-[2] text-accent-ink shrink-0 mt-1')}
                                <span>À dix minutes à pied du vieux souk et de la citadelle Raymond de Saint-Gilles.</span>
                            </li>
                            <li class="flex gap-3">
                                ${icon('check', 'icon w-4 h-4 stroke-[2] text-accent-ink shrink-0 mt-1')}
                                <span>Stationnement possible dans la rue des Ébénistes et sur le boulevard Fouad Chehab.</span>
                            </li>
                            <li class="flex gap-3">
                                ${icon('check', 'icon w-4 h-4 stroke-[2] text-accent-ink shrink-0 mt-1')}
                                <span>Une heure de route depuis Beyrouth ; accueil possible en français, arabe et anglais.</span>
                            </li>
                        </ul>
                    </section>

                    <div class="bg-inverse text-on-inverse p-8">
                        <p class="text-[10px] uppercase tracking-[0.3em] text-accent-ink font-semibold">Projets à l'étranger</p>
                        <p class="font-serif text-xl font-light mt-3">Vous ne pouvez pas vous déplacer ?</p>
                        <p class="text-xs text-on-inverse-muted font-light mt-3 leading-relaxed">
                            Nous conduisons les projets internationaux à distance : plans cotés, prototypes de teinte, échantillons expédiés et suivi photographique de la fabrication à chaque étape.
                        </p>
                        <p class="mt-6">
                            <a href="${href('/sur-mesure/', { depth: DEPTH })}" class="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-on-inverse-soft border-b border-line-soft pb-2 hover:text-accent-ink hover:border-accent transition">
                                <span>Voir la méthode sur-mesure</span>
                                ${icon('arrow-right', 'icon w-4 h-4 stroke-[2]')}
                            </a>
                        </p>
                    </div>
                </div>

                <div class="bg-surface p-8 sm:p-10 border border-line-strong shadow-sm">
                    <h3 class="font-serif text-2xl text-ink font-normal mb-2">Demander une visite privée ou un devis</h3>
                    <p class="text-xs text-muted mb-6">Un architecte d'intérieur de la Maison vous répondra sous 24 heures.</p>

                    <form id="contactForm" class="space-y-4 text-xs" novalidate>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="contactName" class="block uppercase tracking-wider text-[10px] text-muted mb-1">Nom complet *</label>
                                <input type="text" id="contactName" name="name" required autocomplete="name" placeholder="ex. Karim El-Mir"
                                       class="w-full bg-surface-2 border border-line-strong px-4 py-3 text-xs focus:outline-none focus:border-ink">
                            </div>
                            <div>
                                <label for="contactPhone" class="block uppercase tracking-wider text-[10px] text-muted mb-1">Téléphone / WhatsApp *</label>
                                <input type="tel" id="contactPhone" name="phone" required autocomplete="tel" inputmode="tel" placeholder="+961 …"
                                       class="w-full bg-surface-2 border border-line-strong px-4 py-3 text-xs focus:outline-none focus:border-ink">
                            </div>
                        </div>
                        <div>
                            <label for="contactEmail" class="block uppercase tracking-wider text-[10px] text-muted mb-1">Adresse e-mail *</label>
                            <input type="email" id="contactEmail" name="email" required autocomplete="email" inputmode="email" placeholder="votre@email.com"
                                   class="w-full bg-surface-2 border border-line-strong px-4 py-3 text-xs focus:outline-none focus:border-ink">
                        </div>
                        <div>
                            <label for="contactSubject" class="block uppercase tracking-wider text-[10px] text-muted mb-1">Type de demande</label>
                            <select id="contactSubject" name="subject" class="w-full bg-surface-2 border border-line-strong px-4 py-3 text-xs focus:outline-none focus:border-ink text-ink-strong">
                                <option>Visite showroom à Tripoli</option>
                                <option>Projet résidentiel sur-mesure</option>
                                <option>Achat d'une pièce du catalogue</option>
                                <option>Prescription architecte / B2B</option>
                            </select>
                        </div>
                        <div>
                            <label for="contactMessage" class="block uppercase tracking-wider text-[10px] text-muted mb-1">Votre message / précisions</label>
                            <textarea id="contactMessage" name="message" rows="4" placeholder="Dimensions, lieu du projet, pièces souhaitées…"
                                      class="w-full bg-surface-2 border border-line-strong px-4 py-3 text-xs focus:outline-none focus:border-ink"></textarea>
                        </div>
                        <button type="submit" class="w-full py-4 bg-inverse text-on-inverse uppercase tracking-[0.2em] text-xs font-medium hover:bg-accent hover:text-on-accent transition duration-300">
                            Transmettre la requête
                        </button>
                        <p class="text-[10px] text-muted leading-relaxed">
                            Les informations transmises sont utilisées uniquement pour traiter votre demande.
                            <a href="${href('/mentions-legales/', { depth: DEPTH })}" class="underline underline-offset-2 hover:text-ink">Politique de confidentialité</a>.
                        </p>
                    </form>

                    <p id="formSuccessMessage" class="hidden mt-4 p-3 bg-emerald-50 text-emerald-800 text-xs text-center border border-emerald-200" role="status" aria-live="polite"></p>
                </div>

            </div>
        </section>

        <section class="py-24 bg-surface-2 border-y border-line px-6 lg:px-12" aria-labelledby="faq-contact-title">
            <div class="max-w-4xl mx-auto">
                ${sectionHeading({
                    eyebrow: 'Questions fréquentes',
                    title: 'Visite, échantillons et projets à distance',
                    id: 'faq-contact-title',
                    align: 'center',
                })}
                <div class="mt-14">
                    ${faqBlock(faq)}
                </div>
            </div>
        </section>`,

        newsletterSection(),
    ].join('\n\n        ');

    return {
        path: PATH,
        depth: DEPTH,
        title: 'Showroom &amp; Atelier à Tripoli, Liban | Maison Tripoli',
        description:
            "Showroom et atelier Maison Tripoli à Tripoli : adresse, horaires, téléphone et formulaire de devis. Réponse sous 24 heures, livraison internationale.",
        includeQuickView: false,
        body,
        jsonLd: [
            storeSchema(),
            {
                '@type': 'ContactPage',
                '@id': `${site.url}/contact/#page`,
                url: `${site.url}/contact/`,
                name: 'Showroom et atelier Maison Tripoli à Tripoli',
                description:
                    "Coordonnées, horaires et accès du showroom et de l'atelier Maison Tripoli à Tripoli (Liban), ainsi que le formulaire de demande de devis et de visite privée.",
                inLanguage: 'fr-FR',
                isPartOf: { '@id': `${site.url}/#site` },
                about: { '@id': `${site.url}/#boutique` },
                breadcrumb: { '@id': `${site.url}/contact/#fil` },
            },
            {
                ...breadcrumbSchema([{ label: 'Accueil', path: '/' }, { label: 'Showroom &amp; contact', path: PATH }]),
                '@id': `${site.url}/contact/#fil`,
            },
            { ...faqSchema(faq), '@id': `${site.url}/contact/#faq` },
        ],
    };
}
