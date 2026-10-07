#!/usr/bin/env node
/**
 * tools/build-brand-marks.mjs
 * ---------------------------------------------------------------------------
 * Écrit dans `assets/img/brands/` la signature graphique de chaque maison et
 * fournisseur partenaire, telle qu'elle est affichée dans le premier ruban
 * défilant (voir src/content/brand-marks.mjs, source unique de vérité).
 *
 * Les pages embarquent ces marques en SVG inline — pour qu'elles prennent la
 * couleur du thème actif et qu'aucune requête ne soit nécessaire. Les fichiers
 * écrits ici servent aux usages hors site : impression, réseaux sociaux,
 * remplacement par un logo officiel (même nom de fichier, même emplacement).
 *
 * Usage : node tools/build-brand-marks.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { brandMarks, markFile } from '../src/content/brand-marks.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'assets', 'img', 'brands');

await mkdir(DIR, { recursive: true });

let bytes = 0;
for (const mark of brandMarks()) {
    const svg = markFile(mark);
    await writeFile(path.join(DIR, `${mark.slug}.svg`), svg, 'utf8');
    bytes += Buffer.byteLength(svg, 'utf8');
}

console.log(
    `  ✓ marques partenaires              → assets/img/brands/                ${String(brandMarks().length).padStart(2)} fichiers · ${Math.round(bytes / 1024)} Ko`,
);
