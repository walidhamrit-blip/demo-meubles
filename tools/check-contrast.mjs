#!/usr/bin/env node
/**
 * tools/check-contrast.mjs
 * ---------------------------------------------------------------------------
 * Vérifie les contrastes WCAG 2.1 des trois thèmes (`clair`, `ebene`, `noyer`).
 *
 * Les palettes sont lues directement dans `src/input.css` : le test porte donc
 * sur la source de vérité, pas sur une copie qui pourrait dériver.
 *
 * Paires contrôlées (celles réellement employées par les gabarits) :
 *   • texte courant sur les surfaces            → 4,5:1 minimum (AA)
 *   • texte secondaire / discret sur surfaces   → 3:1 minimum (AA grand texte)
 *   • texte sur bande inversée                  → 4,5:1 / 3:1
 *   • texte sur aplat bronze, papier            → 4,5:1
 *   • tracés d'interface (bordures, pastilles)  → 3:1 (AA « composants »)
 *
 * Usage : node tools/check-contrast.mjs
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

/* ------------------------------------------------------------ Lecture CSS */

/** Extrait les palettes `--mt-*` de chaque bloc de thème de src/input.css. */
async function readPalettes() {
    const css = await readFile(path.join(ROOT, 'src', 'input.css'), 'utf8');
    const palettes = {};

    const blocks = css.matchAll(/(?:^|\n)([^{}]*?)\{([^{}]*)\}/g);
    for (const [, selector, body] of blocks) {
        if (!/--mt-/.test(body)) continue;
        const names = [...selector.matchAll(/\[data-theme='([a-z]+)'\]/g)].map((m) => m[1]);
        if (!names.length && !/:root/.test(selector)) continue;

        const tokens = {};
        for (const [, key, value] of body.matchAll(/--mt-([a-z0-9-]+):\s*([\d\s]+);/g)) {
            tokens[key] = value.trim().split(/\s+/).map(Number);
        }

        for (const name of names.length ? names : ['clair']) palettes[name] = tokens;
    }
    return palettes;
}

/* ------------------------------------------------------------ Contrastes */

const channel = (value) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

/** Rapport de contraste WCAG entre deux triplets RVB. */
function ratio(foreground, background) {
    const a = luminance(foreground);
    const b = luminance(background);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/* ------------------------------------------------------------ Paires testées */

/** [avant-plan, arrière-plan, seuil, usage] */
const PAIRS = [
    ['ink', 'surface', 4.5, 'Texte courant sur fond de page'],
    ['ink', 'surface-2', 4.5, 'Texte courant sur section alternée'],
    ['ink', 'surface-3', 4.5, 'Texte courant sur carte / pastille'],
    ['ink-strong', 'surface', 4.5, 'Titres sur fond de page'],
    ['muted', 'surface', 4.5, 'Texte secondaire sur fond de page'],
    ['muted', 'surface-2', 4.5, 'Texte secondaire sur section alternée'],
    ['accent-ink', 'surface', 4.5, 'Sur-titre bronze sur fond de page'],
    ['accent-ink', 'surface-2', 4.5, 'Sur-titre bronze sur section alternée'],
    ['accent-ink', 'surface-3', 3, 'Bronze sur carte'],
    ['on-accent', 'accent', 4.5, 'Libellé sur bouton bronze'],
    ['on-paper', 'paper', 4.5, 'Libellé sur bouton principal'],
    ['on-inverse', 'inverse', 4.5, 'Texte courant sur bande sombre'],
    ['on-inverse-soft', 'inverse', 4.5, 'Titre secondaire sur bande sombre'],
    ['on-inverse-muted', 'inverse', 3, 'Texte discret sur bande sombre'],
    ['on-inverse-faint', 'inverse', 3, 'Mentions sur bande sombre'],
    ['ink', 'surface-alt', 4.5, 'Texte sur surface alternative'],
    ['line-strong', 'surface', 1.2, 'Bordures de carte (lisibilité structurelle)'],
];

/* ------------------------------------------------------------ Exécution */

const palettes = await readPalettes();
const themes = Object.keys(palettes);

let failures = 0;
let checks = 0;

console.log(`\nContrastes WCAG 2.1 — ${themes.length} thème(s) : ${themes.join(', ')}\n`);

for (const theme of themes) {
    const tokens = palettes[theme];
    const rows = [];

    for (const [fg, bg, min, label] of PAIRS) {
        if (!tokens[fg] || !tokens[bg]) {
            console.log(`  ⚠ jeton manquant dans « ${theme} » : ${fg} / ${bg}`);
            continue;
        }
        const value = ratio(tokens[fg], tokens[bg]);
        const ok = value >= min;
        checks += 1;
        if (!ok) failures += 1;
        rows.push({ ok, value, min, label, fg, bg });
    }

    const bad = rows.filter((row) => !row.ok);
    const worst = [...rows].sort((a, b) => a.value / a.min - b.value / b.min)[0];

    console.log(
        `${bad.length === 0 ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m'} ${theme.padEnd(7)}` +
            `${String(rows.length).padStart(3)} paires · ` +
            `pire cas : ${worst.value.toFixed(2)}:1 (min ${worst.min}) — ${worst.label}`,
    );

    for (const row of bad) {
        console.log(
            `      ✗ ${row.label} : ${row.value.toFixed(2)}:1 < ${row.min}:1 (${row.fg} sur ${row.bg})`,
        );
    }
    console.log('');
}

if (failures === 0) {
    console.log(`\x1b[32m✓\x1b[0m Contrastes conformes : ${checks} vérifications, ${themes.length} thèmes.\n`);
    process.exit(0);
}

console.log(`\x1b[31m✗\x1b[0m ${failures} contraste(s) insuffisant(s) sur ${checks} vérifications.\n`);
process.exit(1);
