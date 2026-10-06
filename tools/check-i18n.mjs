#!/usr/bin/env node
/* =========================================================================
   Contrôle des traductions — tools/check-i18n.mjs
   -------------------------------------------------------------------------
   Le générateur refuse de publier une page dont une chaîne passée par `tr()`
   n'est pas traduite. Ce contrôle-ci couvre le cas inverse : une chaîne
   JAMAIS passée par `tr()` (donc restée en français, sans que rien ne le
   signale) sur une page traduite.

   Méthode : on compare les nœuds de texte des pages/versions publiées dans
   une autre langue avec ceux de la page française correspondante. Tout texte
   identique dans les deux versions qui ressemble à du français est signalé.

   Usage : node tools/check-i18n.mjs   (intégré à `npm run check`)
   ========================================================================= */

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales, localeCodes, defaultLocale, localesFor } from '../src/content/i18n.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* --- Textes qui restent légitimement en français ------------------------- */
const KEEP = [
    // Marques et noms propres cités dans les rubans et les fiches produits.
    /^(Rubelli|Pierre Frey|Loro Piana|Maison Tripoli|Tripoli|Levant|Marquina)$/i,
    // Données de contact (NAP) : identiques dans toutes les langues.
    /^\+?[\d\s().-]{7,}$/,
    /@|\.(com|lb|fr|net)\b/i,
    // Libellés identiques dans les deux langues (noms propres, anglicismes
    // déjà employés en français, localités).
    /^(Collections|Showroom|Tripoli Atelier|Dubaï Hills|Penthouse Sursock|Villa Al-Bahr|Private Estate|Loro Piana|Rubelli|Pierre Frey)$/,
    // Sigles et unités.
    /^(m²|cm|mm|kg|FR|EN|AR|[A-Z]{2,4})$/,
];

/** Un texte « ressemble à du français » : accents ou mots-outils fréquents. */
const FRENCH = new RegExp(
    '\\b(' +
        [
            'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'ou', 'pour', 'avec',
            'sur', 'dans', 'par', 'sans', 'notre', 'nos', 'votre', 'vos', 'son', 'ses',
            'est', 'sont', 'être', 'avoir', 'fait', 'faire', 'plus', 'tout', 'tous',
            'toutes', 'chaque', 'depuis', 'entre', 'aux', 'au', 'en', 'ce', 'cette',
            'ces', 'qui', 'que', 'quoi', 'dont', 'nous', 'vous', 'ils', 'elle',
            'voir', 'découvrir', 'demander', 'prendre', 'rendez', 'atelier',
            'collection', 'collections', 'livraison', 'devis', 'finitions',
            'disponibles', 'ensemble', 'catalogue', 'édition', 'matières', 'sur-mesure',
            'pièce', 'pièces', 'meuble', 'meubles', 'bois', 'marbre', 'cuir', 'tissu',
        ].join('|') +
        ')\\b',
    'i',
);

function textNodes(html) {
    const cleaned = html
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
        .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
        .replace(/<!--[\s\S]*?-->/g, ' ');

    const decode = (value) =>
        value
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
            .replace(/&([a-z]+);/gi, ' ');

    return cleaned
        .replace(/<[^>]+>/g, '\n')
        .split('\n')
        .map((line) => decode(line).replace(/\s+/g, ' ').trim())
        .filter(Boolean);
}

/** Chemin de la version française d'une page publiée dans une autre langue. */
function sourcePathOf(publicPath, locale) {
    if (publicPath === `/${locale}/`) return '/';
    return publicPath.slice(`/${locale}`.length);
}

async function htmlFiles(dir, acc = []) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) await htmlFiles(full, acc);
        else if (entry.name.endsWith('.html')) acc.push(full);
    }
    return acc;
}

const failures = [];
let checked = 0;

for (const locale of localeCodes) {
    if (locale === defaultLocale) continue;

    const files = (await htmlFiles(path.join(ROOT, locale))).filter((file) => file.endsWith('.html'));

    for (const file of files) {
        const relative = path.relative(ROOT, file).split(path.sep).join('/');
        const publicPath = `/${relative}`;

        if (publicPath === `/${locale}/404.html`) continue;

        // Les pages publiées sont des « index.html » : la contrepartie
        // française se trouve au même chemin, moins le préfixe de langue.
        const sourcePath = path.join(ROOT, sourcePathOf(publicPath, locale));
        let french;
        try {
            french = await readFile(sourcePath, 'utf8');
        } catch {
            // La page n'a pas de contrepartie française : rien à comparer.
            continue;
        }

        const frenchTexts = new Set(textNodes(french));
        const localizedTexts = [...new Set(textNodes(await readFile(file, 'utf8')))];

        for (const text of localizedTexts) {
            if (!frenchTexts.has(text)) continue; // traduit, ou absent du français
            if (text.length < 8) continue; // menus d'une lettre, sigles…
            if (KEEP.some((rule) => rule.test(text))) continue;
            if (!FRENCH.test(text) && !/[àâäçéèêëîïôöùûüœ]/i.test(text)) continue;
            failures.push({ page: relative, text });
        }
        checked += 1;
    }
}

if (failures.length) {
    console.error(`\n✖ ${failures.length} texte(s) resté(s) en français sur une page traduite :\n`);
    const byPage = new Map();
    for (const failure of failures) {
        if (!byPage.has(failure.page)) byPage.set(failure.page, new Set());
        byPage.get(failure.page).add(failure.text);
    }
    for (const [page, texts] of byPage) {
        console.error(`  ${page}`);
        for (const text of texts) console.error(`     · ${text.slice(0, 96)}`);
    }
    console.error(
        '\nCorrectif : passer la chaîne par `tr()` (ou par un getter localisé) puis' +
            ' ajouter la traduction dans src/content/i18n.mjs.\n',
    );
    process.exit(1);
}

console.log(`\n✓ Traductions complètes : aucun texte français résiduel sur ${checked} page(s) traduite(s).\n`);
