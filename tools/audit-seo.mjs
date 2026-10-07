#!/usr/bin/env node
/**
 * tools/audit-seo.mjs
 * ---------------------------------------------------------------------------
 * Contrôle qualité automatisé (SEO technique + accessibilité + performance
 * statique) sur les pages du site. À exécuter avant chaque mise en ligne :
 *
 *     node tools/audit-seo.mjs
 *
 * Vérifie notamment :
 *   • un seul <h1> par page et hiérarchie de titres sans saut de niveau ;
 *   • longueur des <title> (50–60 car.) et meta descriptions (120–160 car.) ;
 *   • présence des balises Open Graph et Twitter Card ;
 *   • attribut alt sur toutes les images + dimensions intrinsèques (CLS) ;
 *   • attributs rel/target sur les liens sortants ;
 *   • cohérence des ancres internes (pas de lien mort) ;
 *   • validité du JSON-LD ;
 *   • balisage sémantique (header/nav/main/section/article/footer).
 */
import { readFile } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

/** Répertoires techniques exclus de l'audit. */
const IGNORED_DIRS = new Set(['node_modules', '.git', 'src', 'tools', 'docs', 'assets']);

/** Découvre toutes les pages HTML générées, à n'importe quelle profondeur. */
async function collectPages(dir = ROOT, acc = []) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (IGNORED_DIRS.has(entry.name)) continue;
            await collectPages(path.join(dir, entry.name), acc);
        } else if (entry.name.endsWith('.html')) {
            acc.push(path.relative(ROOT, path.join(dir, entry.name)));
        }
    }
    return acc.sort();
}

const PAGES = await collectPages();

let errors = 0;
let warnings = 0;

const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const dim = (text) => `\x1b[2m${text}\x1b[0m`;

function fail(page, message) {
    errors += 1;
    console.log(`  ${red('✖')} ${message} ${dim(`[${page}]`)}`);
}

function warn(page, message) {
    warnings += 1;
    console.log(`  ${yellow('!')} ${message} ${dim(`[${page}]`)}`);
}

function pass(message) {
    console.log(`  ${green('✓')} ${message}`);
}

/** Retire les blocs script/style pour l'analyse de texte. */
function stripCode(html) {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '');
}

function decodeEntities(text) {
    return text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&laquo;|&raquo;/g, '"');
}

function attr(tag, name) {
    const match = tag.match(new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
    return match ? match[1] ?? match[2] ?? '' : null;
}

const results = {};

for (const page of PAGES) {
    console.log(`\n${page}`);
    const html = await readFile(path.join(ROOT, page), 'utf8');
    const body = stripCode(html);
    const is404 = page.endsWith('404.html');

    // --- 1. Titre et métadonnées -----------------------------------------
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    if (!titleMatch) {
        fail(page, 'balise <title> absente');
    } else {
        const title = decodeEntities(titleMatch[1]).trim();
        results[page] = { title };
        const length = title.length;
        if (length < 30 || length > 65) {
            warn(page, `<title> de ${length} caractères (cible 50–60) : « ${title} »`);
        } else {
            pass(`<title> : ${length} caractères`);
        }
        if (/[|\u2014\u2013-]\s*\S/.test(title) === false) {
            warn(page, '<title> sans séparateur de marque en fin de libellé');
        }
    }

    const description = attr(html.match(/<meta\s+name="description"[^>]*>/i)?.[0] ?? '', 'content');
    if (!description) {
        fail(page, 'meta description absente');
    } else {
        const length = decodeEntities(description).length;
        if (length < 110 || length > 165) {
            warn(page, `meta description de ${length} caractères (cible 120–160)`);
        } else {
            pass(`meta description : ${length} caractères`);
        }
    }

    // --- 2. Canonical, robots, Open Graph --------------------------------
    if (!/<link\s+rel="canonical"/i.test(html)) fail(page, 'lien canonical absent');
    else pass('lien canonical présent');

    const robots = attr(html.match(/<meta\s+name="robots"[^>]*>/i)?.[0] ?? '', 'content') || '';
    if (is404) {
        if (!/noindex/.test(robots)) fail(page, 'page 404 non exclue de l’index (robots: noindex attendu)');
        else pass('robots : noindex, follow');
    } else if (!/index/.test(robots)) {
        fail(page, 'page non indexable (robots absent ou noindex)');
    } else {
        pass('indexation autorisée');
    }

    const requiredOg = ['og:type', 'og:title', 'og:description', 'og:url', 'og:image', 'og:locale', 'og:site_name'];
    const missingOg = requiredOg.filter((property) => !new RegExp(`property="${property}"`, 'i').test(html));
    if (missingOg.length) fail(page, `balises Open Graph manquantes : ${missingOg.join(', ')}`);
    else pass(`Open Graph complet (${requiredOg.length} balises)`);

    const ogImage = attr(html.match(/<meta\s+property="og:image"[^>]*>/i)?.[0] ?? '', 'content') || '';
    if (ogImage && !/^https?:\/\//.test(ogImage)) fail(page, 'og:image doit utiliser une URL absolue');
    if (!/twitter:card/.test(html)) warn(page, 'carte Twitter/X absente');

    // --- 3. Structure sémantique & titres --------------------------------
    const headings = [...body.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
        level: Number(match[1]),
        text: decodeEntities(match[2].replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim(),
    }));

    const h1s = headings.filter((heading) => heading.level === 1);
    if (h1s.length !== 1) {
        fail(page, `${h1s.length} balise(s) <h1> détectée(s) — une seule attendue`);
    } else {
        pass(`un unique <h1> : « ${h1s[0].text} »`);
    }

    let previous = 0;
    let skip = null;
    for (const heading of headings) {
        if (previous && heading.level > previous + 1) {
            skip = `h${previous} → h${heading.level} (« ${heading.text} »)`;
            break;
        }
        previous = heading.level;
    }
    if (skip) fail(page, `saut de niveau dans la hiérarchie : ${skip}`);
    else pass(`hiérarchie de titres séquentielle (${headings.length} titres)`);

    const landmarks = ['<header', '<nav', '<main', '<footer'];
    const missingLandmarks = landmarks.filter((tag) => !body.toLowerCase().includes(tag));
    if (missingLandmarks.length) fail(page, `balises sémantiques absentes : ${missingLandmarks.join(', ')}`);
    else pass('repères sémantiques header/nav/main/footer présents');

    if ((body.match(/<main\b/gi) || []).length > 1) fail(page, 'plusieurs balises <main>');

    // --- 4. Images --------------------------------------------------------
    const images = [...body.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
    const withoutAlt = images.filter((tag) => attr(tag, 'alt') === null);
    if (withoutAlt.length) fail(page, `${withoutAlt.length} image(s) sans attribut alt`);
    else pass(`${images.length} images, toutes pourvues d’un alt`);

    // Une image à alt vide est légitime lorsqu'elle est décorative : c'est le
    // cas de la copie de bouclage des rubans, déjà masquée aux technologies
    // d'assistance (`aria-hidden="true" data-marquee-clone`).
    const decorative = [...body.matchAll(/<[^>]*data-marquee-clone[^>]*>[\s\S]*?<\/li>/gi)]
        .flatMap((match) => [...match[0].matchAll(/<img\b[^>]*>/gi)].map((image) => image[0]));
    const emptyAlt = images.filter((tag) => attr(tag, 'alt') === '' && !decorative.includes(tag));
    if (emptyAlt.length && !is404) warn(page, `${emptyAlt.length} image(s) à alt vide (décoratives ?)`);

    const withoutDimensions = images.filter((tag) => !attr(tag, 'width') || !attr(tag, 'height'));
    if (withoutDimensions.length) warn(page, `${withoutDimensions.length} image(s) sans width/height (risque de CLS)`);

    const heavyAlt = images.filter((tag) => (attr(tag, 'alt') || '').length > 125);
    if (heavyAlt.length) warn(page, `${heavyAlt.length} alt de plus de 125 caractères (troncature possible)`);

    const svgWithoutLabel = [...body.matchAll(/<svg\b[^>]*>(?![\s\S]{0,80}<title)/gi)].length;
    const decorativeSvgOk = (body.match(/<svg[^>]*aria-hidden="true"/gi) || []).length;
    if (svgWithoutLabel > 0 && decorativeSvgOk === 0) {
        warn(page, 'des <svg> sans aria-hidden ni <title>');
    }

    // --- 5. Liens ---------------------------------------------------------
    const anchors = [...body.matchAll(/<a\b[^>]*>/gi)].map((match) => match[0]);
    const external = anchors.filter((tag) => /^https?:\/\//i.test(attr(tag, 'href') || ''));
    const unsafeExternal = external.filter(
        (tag) => attr(tag, 'target') === '_blank' && !/noopener/.test(attr(tag, 'rel') || ''),
    );
    if (unsafeExternal.length) fail(page, `${unsafeExternal.length} lien(s) target="_blank" sans rel="noopener"`);
    else pass(`${external.length} liens sortants, tous sécurisés (rel="noopener")`);

    const emptyHref = anchors.filter((tag) => attr(tag, 'href') === '#');
    if (emptyHref.length) fail(page, `${emptyHref.length} lien(s) avec href="#" (cible indéfinie)`);

    const iconLinks = anchors.filter((tag) => /aria-label|>[\s\S]*[A-Za-zÀ-ÿ]/.test(tag));
    if (iconLinks.length !== anchors.length) {
        // Vérification plus fine : tout lien dont le contenu textuel est vide doit porter un aria-label
        const links = [...body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];
        const silent = links.filter(([, attributes, content]) => {
            const text = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
            return text.length === 0 && !/aria-label=/.test(attributes);
        });
        if (silent.length) fail(page, `${silent.length} lien(s) sans texte ni aria-label`);
        else pass('tous les liens ont un intitulé visible ou un aria-label');
    }

    // --- 6. Ancres internes ----------------------------------------------
    const ids = new Set([...body.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
    const localAnchors = anchors
        .map((tag) => attr(tag, 'href'))
        .filter((href) => href && href.startsWith('#'))
        .map((href) => href.slice(1))
        .filter((id) => id && id !== '');

    const brokenAnchors = [...new Set(localAnchors)].filter((id) => !ids.has(id));
    if (brokenAnchors.length) fail(page, `ancres internes introuvables : ${brokenAnchors.map((a) => '#' + a).join(', ')}`);
    else pass(`${new Set(localAnchors).size} ancres internes résolues`);

    // --- 7. Données structurées ------------------------------------------
    const jsonLdBlocks = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    if (!jsonLdBlocks.length) {
        if (!is404) fail(page, 'aucune donnée structurée JSON-LD');
    } else {
        for (const [, block] of jsonLdBlocks) {
            try {
                JSON.parse(block);
            } catch (error) {
                fail(page, `JSON-LD invalide : ${error.message}`);
            }
        }
        pass(`${jsonLdBlocks.length} bloc(s) JSON-LD valides`);
    }

    // --- 8. Ressources bloquantes ----------------------------------------
    const blockingScripts = [...html.matchAll(/<script(?![^>]*\b(?:defer|async|type="application\/ld\+json|type="module"))[^>]*src="([^"]+)"/gi)].map(
        (match) => match[1],
    );
    if (blockingScripts.length) fail(page, `script(s) bloquant le rendu : ${blockingScripts.join(', ')}`);
    else pass('aucun script bloquant le rendu');

    const htmlWithoutNoscript = html.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');
    const stylesheets = [...htmlWithoutNoscript.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/gi)].map((match) => match[0]);
    const blockingStylesheets = stylesheets.filter(
        (tag) => !/media="print"/i.test(tag) || !/onload=/i.test(tag),
    );
    const externalBlocking = blockingStylesheets.filter((tag) => /href="https?:\/\//i.test(tag));
    if (externalBlocking.length) {
        warn(page, `${externalBlocking.length} feuille(s) de style tierce(s) bloquant le rendu`);
    } else if (stylesheets.length) {
        pass(`${stylesheets.length} feuille(s) de style, aucune ne bloque le rendu`);
    }
    if (!/class="skip-link"/.test(body)) warn(page, 'lien d’évitement (skip link) absent');

    const isRoot = /^(index\.html|[a-z]{2}\/index\.html)$/.test(page);
    // Le libellé est traduit sur les pages en anglais et en arabe : on
    // s'appuie sur le repère stable `data-breadcrumb`, avec repli sur le
    // libellé français pour les pages historiques.
    const hasBreadcrumb = /data-breadcrumb|aria-label="Fil d[’']Ariane"/.test(body);
    if (!isRoot && !is404 && !hasBreadcrumb) {
        fail(page, 'fil d’Ariane absent sur une page de niveau inférieur');
    } else if (!isRoot && !is404) {
        pass('fil d’Ariane présent');
    }

    // --- 8 bis. Maillage interne ------------------------------------------
    const internalLinks = [...body.matchAll(/<a\b[^>]*href="((?!https?:|mailto:|tel:|#)[^"]+)"/gi)].map(
        (match) => match[1],
    );
    const uniqueTargets = new Set(
        internalLinks.map((target) => target.split('#')[0]).filter(Boolean),
    );
    if (!is404 && uniqueTargets.size < 3) {
        warn(page, `maillage interne faible : ${uniqueTargets.size} cible(s) unique(s)`);
    } else if (!is404) {
        pass(`${uniqueTargets.size} cibles internes uniques`);
    }

    // --- 9. Ressources locales -------------------------------------------
    const localRefs = new Set();
    for (const match of html.matchAll(/(?:src|href)="((?!https?:|mailto:|tel:|#|\/\/)[^"]+)"/gi)) {
        const reference = match[1].split('#')[0].split('?')[0];
        if (reference) localRefs.add(reference);
    }
    const missingFiles = [];
    for (const reference of localRefs) {
        // Les liens sont relatifs à la page : on les résout depuis son dossier.
        // Une cible terminée par « / » correspond à un « index.html ».
        const pageDir = path.dirname(path.join(ROOT, page));
        const target = reference.startsWith('/')
            ? path.join(ROOT, reference)
            : path.resolve(pageDir, reference);
        const candidate = reference.endsWith('/') || reference === '/'
            ? path.join(target, 'index.html')
            : target;

        try {
            await readFile(candidate);
        } catch {
            missingFiles.push(reference);
        }
    }
    if (missingFiles.length) fail(page, `ressource(s) locale(s) introuvable(s) : ${missingFiles.join(', ')}`);
    else pass(`${localRefs.size} ressources locales présentes`);

    // --- 10. Poids des ressources critiques -------------------------------
    if (page === 'index.html') {
        const cssSize = (await readFile(path.join(ROOT, 'assets/css/main.css'))).length;
        const jsSize = (await readFile(path.join(ROOT, 'assets/js/main.js'))).length;
        const htmlSize = html.length;
        const budget = 130 * 1024;
        if (cssSize > 60 * 1024) warn(page, `CSS de ${Math.round(cssSize / 1024)} Ko (budget 60 Ko)`);
        else pass(`CSS ${Math.round(cssSize / 1024)} Ko • JS ${Math.round(jsSize / 1024)} Ko • HTML ${Math.round(htmlSize / 1024)} Ko`);

        const total = cssSize + jsSize;
        if (total > budget) warn(page, `actifs locaux de ${Math.round(total / 1024)} Ko`);
    }
}

/* -------------------------------------------------------------------------
   Synthèse
   ------------------------------------------------------------------------- */
console.log(`\n${'─'.repeat(64)}`);
if (errors === 0) {
    console.log(`${green('Audit réussi')} — ${warnings} avertissement(s), 0 erreur.`);
} else {
    console.log(`${red(`${errors} erreur(s)`)} et ${warnings} avertissement(s) à corriger.`);
}
process.exit(errors === 0 ? 0 : 1);
