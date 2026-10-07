#!/usr/bin/env node
/* =========================================================================
   Contrôle des traductions — tools/check-i18n.mjs
   -------------------------------------------------------------------------
   Le site est publié en arabe (racine) et en anglais (/en/). Le français
   n'est plus une langue servie : il ne subsiste que dans le code, comme
   langue de rédaction — les chaînes françaises y servent de CLÉS dans la
   table `ui` (src/content/i18n.mjs).

   Le générateur refuse de publier une chaîne passée par `tr()` qui n'a pas
   de traduction. Ce contrôle-ci couvre le cas inverse : une chaîne JAMAIS
   passée par `tr()` (donc affichée en français sans que rien ne le signale)
   sur une page publiée.

   Deux règles, appliquées aux nœuds de texte réellement présents dans le
   HTML livré :

     1. le texte est identique à une CLÉ de la table `ui` (donc à une chaîne
        source française) et sa traduction pour cette langue est différente :
        la chaîne n'a pas été traduite au rendu → ERREUR ;
     2. le texte ressemble à du français (accents ou mots-outils) sans
        figurer dans les exceptions légitimes (noms propres, adresses,
        marques) → ERREUR.

   Usage : node tools/check-i18n.mjs   (intégré à `npm run check`)
   ========================================================================= */

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ui, localeCodes } from '../src/content/i18n.mjs';

/** Décodage des entités HTML : le HTML livré est comparé au texte brut. */
function decodeEntities(value) {
    return value
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
        .replace(/&([a-z]+);/gi, ' ');
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* --- Textes qui restent légitimement en français ------------------------- */
const KEEP = [
    // Raisons sociales, marques et noms propres cités dans le contenu.
    /^(Rubelli|Pierre Frey|Loro Piana|Maison Tripoli|Tripoli|Levant|Marquina|Sursock|El-Mina|Al-Bahr|Dubaï|Dubai|Beyrouth)$/i,
    // Adresses et voies (l'adresse postale ne se traduit pas).
    /^(Rue des Ébénistes|Boulevard Fouad Chehab|Quartier des Ateliers d'Art|Tripoli, Liban|Liban-Nord|1300|LB)$/i,
    /^Boulevard Fouad Chehab, Quartier des Ateliers d'Art, Tripoli, (Liban|Lebanon|لبنان)\.$/,
    /^(Penthouse Sursock|Villa Al-Bahr|Private Estate|Dubaï Hills|Beit El-Mina|Chalet d'altitude|Appartement de réception|Villa de Dubaï)$/,
    /^Boulevard Fouad Chehab, Quartier des Ateliers d'Art\.?$/,
    /^Boulevard Fouad Chehab, Quartier des Ateliers d'Art, Tripoli, Liban-Nord 1300\.?$/,
    // Données de contact (NAP) : identiques dans toutes les langues.
    /^\+?[\d\s().-]{7,}$/,
    /@|\b(maisontripoli\.com|instagram|facebook|google)\b/i,
    /^https?:\/\//i,
    // Sigles, unités, références et identifiants.
    /^(m²|cm|mm|kg|FR|EN|AR|[A-Z]{2,4}|[A-Z]{2}-\d{4})$/,
    /^\d{4}$/,
    // Mentions techniques et noms de fichiers.
    /\.(jpg|jpeg|png|webp|svg|avif)$/i,
    /^(JPEG|WebP|AVIF|PNG|SVG)$/,
    // Expressions latines et termes d'usage international.
    /^(In situ|Showroom|Atelier|WhatsApp|B2B|GDPR|CE \/ IEC)$/,
];

/**
 * Un texte « ressemble à du français ».
 *
 * Deux signaux seulement, choisis pour ne pas confondre le français avec les
 * autres langues présentes sur le site :
 *
 *   • un mot-outil FRANÇAIS NON AMBIGU (les listes courtes du type « ce »,
 *     « la », « en » sont écartées : « CE / IEC » n'est pas du français) ;
 *   • une lettre accentuée propre au français.
 *
 * Les textes sans aucun caractère latin (arabe, chiffres, ponctuation) sont
 * ignorés : ils ne peuvent pas être du français.
 */
const FRENCH_WORDS = [
    'les', 'des', 'une', 'pour', 'avec', 'dans', 'notre', 'nos', 'votre', 'vos',
    'est', 'sont', 'être', 'avoir', 'fait', 'faire', 'tout', 'tous', 'toutes',
    'chaque', 'depuis', 'entre', 'aux', 'cette', 'ces', 'dont', 'nous', 'vous',
    'voir', 'découvrir', 'demander', 'prendre', 'rendez', 'atelier', 'ateliers',
    'collection', 'collections', 'livraison', 'devis', 'finitions', 'disponibles',
    'ensemble', 'catalogue', 'édition', 'matières', 'sur-mesure', 'pièce',
    'pièces', 'meuble', 'meubles', 'bois', 'marbre', 'cuir', 'tissu', 'ébénisterie',
    'sur', 'sous', 'chez', 'vers', 'puis', 'ainsi', 'aussi', 'mais', 'donc',
];

const FRENCH = new RegExp('\\b(' + FRENCH_WORDS.join('|') + ')\\b', 'gi');
const ACCENTED = /[àâäçéèêëîïôöùûüÿœæ]/i;
/** Présence d'une lettre latine : sans elle, le texte ne peut pas être français. */
const LATIN = /[A-Za-z]/;

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

    const textes = cleaned
        .replace(/<[^>]+>/g, '\n')
        .split('\n')
        .map((line) => decode(line).replace(/\s+/g, ' ').trim())
        .filter(Boolean);

    /* Attributs lus par les moteurs et les lecteurs d'écran : le texte
       alternatif d'une image est du contenu, il doit être traduit comme le
       reste (il échappe au nettoyage ci-dessus, qui retire les balises). */
    const attributs = [
        ...html.matchAll(
            /\b(?:alt|title|aria-label|content)="([^"]{3,})"/g,
        ),
    ]
        .map((m) => decode(m[1]).replace(/\s+/g, ' ').trim())
        .filter((value) => value && !/^https?:/i.test(value) && !/^[\w-]+$/.test(value));

    return [...textes, ...attributs];
}

/** Toutes les pages HTML livrées, avec la langue déduite du chemin. */
async function publishedPages(dir = ROOT, acc = []) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        if (['src', 'tools', 'docs', 'assets'].includes(entry.name)) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await publishedPages(full, acc);
        } else if (entry.name.endsWith('.html')) {
            const relative = path.relative(ROOT, full).split(path.sep).join('/');
            const locale = relative.startsWith('en/') ? 'en' : localeCodes[0];
            acc.push({ file: full, relative, locale });
        }
    }
    return acc;
}

const failures = [];
let checked = 0;

for (const page of await publishedPages()) {
    const texts = [...new Set(textNodes(await readFile(page.file, 'utf8')))];
    const dictionary = Object.fromEntries(
        Object.entries(ui[page.locale] || {}).map(([key, value]) => [
            decodeEntities(key).replace(/\s+/g, ' ').trim(),
            decodeEntities(value).replace(/\s+/g, ' ').trim(),
        ]),
    );
    // Valeurs déjà traduites pour cette langue : un texte qui leur est
    // identique est correct par construction (les traductions anglaises
    // contiennent des mots communs au français : « collection », « catalogue »).
    const knownValues = new Set(Object.values(dictionary));

    for (const text of texts) {
        if (text.length < 3) continue; // sigles, nombres, ponctuation
        if (KEEP.some((rule) => rule.test(text))) continue;
        if (knownValues.has(text)) continue; // traduction officielle de cette langue

        // Règle 1 — la chaîne affichée est une clé française de la table,
        // dont la traduction existe mais n'a pas été appliquée.
        const translated = dictionary[text];
        if (translated !== undefined && translated !== text) {
            failures.push({ page: page.relative, text, reason: 'non traduit (clé de la table `ui`)' });
            continue;
        }

        // Règle 2 — la chaîne ressemble à du français sans être répertoriée.
        if (text.length < 8) continue; // bruit des libellés courts, déjà couverts par la règle 1
        if (!LATIN.test(text)) continue;
        // Un seul mot-outil ne suffit pas : « collections », « catalogue » ou
        // « atelier » sont aussi de l'anglais. Il faut un accent, ou deux
        // marqueurs français distincts.
        const marqueurs = new Set([...text.matchAll(FRENCH)].map((m) => m[1].toLowerCase()));
        if (marqueurs.size < 2 && !ACCENTED.test(text)) continue;
        failures.push({ page: page.relative, text, reason: 'texte français hors table `ui`' });
    }
    checked += 1;
}

if (failures.length) {
    console.error(`\n✖ ${failures.length} texte(s) resté(s) en français sur ${checked} page(s) publiée(s) :\n`);
    const byPage = new Map();
    for (const failure of failures) {
        if (!byPage.has(failure.page)) byPage.set(failure.page, new Map());
        byPage.get(failure.page).set(failure.text, failure.reason);
    }
    for (const [page, texts] of byPage) {
        console.error(`  ${page}`);
        for (const [text, reason] of texts) console.error(`     · ${text.slice(0, 400)}  [${reason}]`);
    }
    console.error(
        '\nCorrectif : passer la chaîne par `tr()` (ou par un getter localisé) puis' +
            ' ajouter la traduction dans src/content/i18n.mjs — ou, s\'il s\'agit d\'un nom' +
            ' propre, l\'ajouter aux exceptions du présent contrôle.\n',
    );
    process.exit(1);
}

console.log(`\n✓ Traductions complètes : aucun texte français résiduel sur ${checked} page(s) publiée(s).\n`);
