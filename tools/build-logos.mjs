#!/usr/bin/env node
/**
 * tools/build-logos.mjs
 * ---------------------------------------------------------------------------
 * Écrit dans `assets/img/marques/` le sigle de chaque maison et fournisseur
 * partenaire affiché par le premier ruban défilant.
 *
 * Les fichiers sont engendrés à partir de src/content/brand-marks.mjs (source
 * unique de vérité) : remplacer un logo officiel revient à déposer le fichier
 * autorisé au même emplacement, sans toucher au balisage des pages.
 *
 * Usage : node tools/build-logos.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { brandMarks, markFile } from '../src/content/brand-marks.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'assets', 'img', 'marques');

await mkdir(DIR, { recursive: true });

const marks = brandMarks();
let octets = 0;

for (const entry of marks) {
    const svg = markFile(entry);
    await writeFile(path.join(DIR, `${entry.slug}.svg`), svg, 'utf8');
    octets += Buffer.byteLength(svg, 'utf8');
}

console.log(
    `  ✓ sigles des partenaires           → assets/img/marques/            ${String(marks.length).padStart(2)} images · ${(octets / 1024).toFixed(1)} Ko`,
);
