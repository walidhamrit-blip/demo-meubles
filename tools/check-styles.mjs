#!/usr/bin/env node
/**
 * tools/check-styles.mjs
 * ---------------------------------------------------------------------------
 * Vérifie que TOUTES les classes utilitaires utilisées dans les pages
 * générées et dans les scripts existent bien dans le CSS compilé.
 *
 * C'est le garde-fou du passage au multi-pages : une classe employée dans un
 * nouveau gabarit mais absente de `tailwind.config.js` (chemin non scanné)
 * ne produit aucune erreur visible — juste un design cassé. Ce script la
 * détecte avant la mise en ligne.
 *
 * Usage : node tools/check-styles.mjs
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const IGNORED_DIRS = new Set(['node_modules', '.git', 'src', 'tools', 'docs', 'assets']);

/** Classes qui ne sont pas des utilitaires Tailwind (crochets, états, JS). */
const NON_UTILITY = new Set([
    'group',
    'peer',
    'product-item',
    'cat-filter',
    'finish-btn',
    'finish-swatch',
    'icon',
    'icon-sprite',
    'skip-link',
    'is-open',
    'has-dialog-open',
    'lucide',
]);

async function collectFiles(dir, extensions, acc = []) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (IGNORED_DIRS.has(entry.name)) continue;
            await collectFiles(path.join(dir, entry.name), extensions, acc);
        } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
            acc.push(path.join(dir, entry.name));
        }
    }
    return acc;
}

/** Échappe une classe pour la recherche dans le CSS compilé. */
function escapeForCss(token) {
    return token.replace(/[:./%[\]()#!&,>+*~$@'"\\]/g, (char) => `\\${char}`);
}

function extractClasses(source) {
    const tokens = new Set();
    for (const match of source.matchAll(/class="([^"]*)"/g)) {
        match[1].split(/\s+/).forEach((token) => token && tokens.add(token));
    }
    // Classes construites dans les scripts (sélecteurs d'état notamment)
    for (const match of source.matchAll(/classList\.(?:add|toggle|remove)\(([^)]*)\)/g)) {
        for (const literal of match[1].matchAll(/'([^']+)'/g)) {
            literal[1].split(/\s+/).forEach((token) => token && tokens.add(token));
        }
    }
    return tokens;
}

async function main() {
    const css = await readFile(path.join(ROOT, 'assets', 'css', 'main.css'), 'utf8');
    const files = [
        ...(await collectFiles(ROOT, ['.html'])),
        ...(await collectFiles(path.join(ROOT, 'assets', 'js'), ['.js'])),
    ];

    const missing = new Map();
    let checked = 0;

    for (const file of files) {
        const source = await readFile(file, 'utf8');
        for (const token of extractClasses(source)) {
            if (NON_UTILITY.has(token)) continue;
            checked += 1;
            if (!css.includes(`.${escapeForCss(token)}`)) {
                const relative = path.relative(ROOT, file);
                if (!missing.has(token)) missing.set(token, new Set());
                missing.get(token).add(relative);
            }
        }
    }

    if (missing.size) {
        console.log(`\n✖ ${missing.size} classe(s) absente(s) du CSS compilé :\n`);
        for (const [token, sources] of [...missing].sort()) {
            console.log(`   • ${token}  →  ${[...sources].slice(0, 3).join(', ')}`);
        }
        console.log('\nCorrectif : vérifier les chemins `content` de tailwind.config.js puis relancer npm run build.\n');
        process.exit(1);
    }

    console.log(
        `\n✓ Styles cohérents : ${checked} assertions de classes sur ${files.length} fichiers, toutes présentes dans le CSS compilé.\n`,
    );
}

main().catch((error) => {
    console.error(`\n✖ Échec du contrôle : ${error.message}\n`);
    process.exit(1);
});
