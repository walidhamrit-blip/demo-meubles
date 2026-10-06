#!/usr/bin/env node
/**
 * tools/build-icons.mjs
 * ---------------------------------------------------------------------------
 * Génère un sprite SVG inline à partir des icônes Lucide (licence ISC)
 * réellement utilisées dans les pages, puis l'injecte entre les marqueurs
 * <!-- ICONS:START --> et <!-- ICONS:END --> de chaque page.
 *
 * Remplace le script tiers https://unpkg.com/lucide@latest (~300 Ko de JS
 * bloquant, non épinglé, exécuté côté client) par ~7 Ko de SVG statique.
 *
 * Usage : node tools/build-icons.mjs
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { readdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const ICONS_DIR = path.join(ROOT, 'node_modules', 'lucide-static', 'icons');

/** Répertoires techniques exclus de l'exploration. */
const IGNORED_DIRS = new Set(['node_modules', '.git', 'src', 'tools', 'docs', 'assets']);

/** Découvre toutes les pages HTML générées (profondeur illimitée). */
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

/** Icônes de marque retirées de lucide-static (traits « Feather », ISC). */
const BRAND_ICONS = {
    instagram: `<rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />`,
    facebook: `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />`,
};

/** Extrait le contenu interne d'un fichier .svg Lucide. */
function extractPaths(svg) {
    return svg
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<svg[^>]*>/i, '')
        .replace(/<\/svg>/i, '')
        .split('\n')
        .map((line) => line.trim())
        .join('')
        .replace(/\s{2,}/g, ' ');
}

/**
 * Icônes réellement utilisées :
 *  - dans le HTML     : <use href="#i-xxx">
 *  - dans les scripts : createIcon('xxx', …)
 */
async function collectUsedIconIds() {
    const used = new Set();

    for (const page of await collectPages()) {
        let html;
        try {
            html = await readFile(path.join(ROOT, page), 'utf8');
        } catch {
            continue; // page absente : on ignore
        }
        for (const match of html.matchAll(/<use\s+href="#i-([a-z0-9-]+)"/g)) {
            used.add(match[1]);
        }
    }

    const scriptsDir = path.join(ROOT, 'assets', 'js');
    for (const file of readdirSync(scriptsDir)) {
        if (!file.endsWith('.js')) continue;
        const script = await readFile(path.join(scriptsDir, file), 'utf8');
        for (const match of script.matchAll(/createIcon\(\s*'([a-z0-9-]+)'/g)) {
            used.add(match[1]);
        }
    }

    return [...used].sort();
}

function buildSymbol(id, inner) {
    return (
        `  <symbol id="i-${id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
        `stroke-linecap="round" stroke-linejoin="round">${inner}</symbol>`
    );
}

async function main() {
    const available = new Set(
        readdirSync(ICONS_DIR)
            .filter((f) => f.endsWith('.svg'))
            .map((f) => f.replace(/\.svg$/, '')),
    );

    const used = await collectUsedIconIds();
    if (used.length === 0) {
        console.log('Aucune icône <use href="#i-..."> trouvée.');
        return;
    }

    const symbols = [];
    for (const id of used) {
        if (BRAND_ICONS[id]) {
            symbols.push(buildSymbol(id, BRAND_ICONS[id]));
            continue;
        }
        if (!available.has(id)) {
            throw new Error(
                `Icône « ${id} » introuvable dans lucide-static. ` +
                    `Disponibles : ${[...available].slice(0, 8).join(', ')}…`,
            );
        }
        const svg = await readFile(path.join(ICONS_DIR, `${id}.svg`), 'utf8');
        symbols.push(buildSymbol(id, extractPaths(svg)));
    }

    // Conteneur masqué de façon robuste (display:none casse <use> dans certains
    // moteurs) — technique recommandée : dimensions nulles + overflow hidden.
    const sprite = [
        '<!-- ICONS:START — généré par tools/build-icons.mjs, ne pas éditer à la main -->',
        '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon-sprite">',
        ...symbols,
        '</svg>',
        '<!-- ICONS:END -->',
    ].join('\n    ');

    let injected = 0;
    for (const page of await collectPages()) {
        const file = path.join(ROOT, page);
        let html;
        try {
            html = await readFile(file, 'utf8');
        } catch {
            continue;
        }
        const re = /<!-- ICONS:START[\s\S]*?ICONS:END -->/;
        if (!re.test(html)) continue;
        await writeFile(file, html.replace(re, sprite), 'utf8');
        injected += 1;
    }

    console.log(
        `Sprite généré : ${symbols.length} icônes (${used.join(', ')}) — injecté dans ${injected} page(s).`,
    );
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
