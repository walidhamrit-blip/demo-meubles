#!/usr/bin/env node
/**
 * tools/build-site.mjs
 * ---------------------------------------------------------------------------
 * Générateur de site statique.
 *
 *   src/site.config.mjs        identité, URL, navigation
 *   src/content/*.mjs          données (collections, produits, images)
 *   src/pages/*.mjs            une « route » par fichier (comme l'App Router)
 *   src/templates/*.mjs        layout et composants partagés
 *              ↓
 *   index.html, collections/**\/index.html, atelier/index.html, …
 *   sitemap.xml, robots.txt
 *
 * Aucune dépendance à l'exécution : la sortie est du HTML statique pur,
 * déployable par simple copie de fichiers.
 *
 * Usage : node tools/build-site.mjs
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { decodeDeep } from '../src/lib/html.mjs';
import { site } from '../src/site.config.mjs';
import { collections } from '../src/content/collections.mjs';
import { products } from '../src/content/products.mjs';
import { renderPage } from '../src/templates/layout.mjs';

import accueil from '../src/pages/accueil.mjs';
import { collectionPages } from '../src/pages/collections.mjs';
import atelier from '../src/pages/atelier.mjs';
import surMesure from '../src/pages/sur-mesure.mjs';
import projets from '../src/pages/projets.mjs';
import contact from '../src/pages/contact.mjs';
import mentionsLegales from '../src/pages/mentions-legales.mjs';
import erreur404 from '../src/pages/erreur-404.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

/* ------------------------------------------------------------------ Routage */

/**
 * Une « route » = un chemin public + un fichier de sortie.
 * « /collections/salons/ » est écrit dans « collections/salons/index.html »,
 * ce que tous les serveurs statiques servent à l'URL attendue.
 */
function resolveOutput(publicPath) {
    if (publicPath === '/') return 'index.html';
    if (publicPath.endsWith('.html')) return publicPath.slice(1);
    return `${publicPath.replace(/^\/|\/$/g, '')}/index.html`;
}

const routes = [
    accueil(),
    ...collectionPages(),
    atelier(),
    surMesure(),
    projets(),
    contact(),
    mentionsLegales(),
    erreur404(),
];

/* ------------------------------------------------------- Vérifications amont */

function validate(route) {
    const problems = [];

    if (!route.path.startsWith('/')) problems.push('chemin non absolu');
    if (!route.title || route.title.length < 30 || route.title.length > 65) {
        problems.push(`<title> hors bornes (${route.title?.length ?? 0} car.)`);
    }
    if (!route.description || route.description.length < 110 || route.description.length > 165) {
        problems.push(`meta description hors bornes (${route.description?.length ?? 0} car.)`);
    }
    if (route.path !== '/404.html' && !route.path.endsWith('/') ) {
        problems.push('les URL publiques doivent se terminer par « / » (ou être un fichier .html)');
    }

    return problems;
}

function assertValid(route) {
    const problems = validate(route);
    if (problems.length) {
        throw new Error(`Page ${route.path} invalide :\n   - ${problems.join('\n   - ')}`);
    }
}

/* ------------------------------------------------------------- Plan de site */

function buildSitemap(pages) {
    const today = new Date().toISOString().slice(0, 10);

    const toUrl = (page) => {
        const priority = page.path === '/' ? '1.0' : page.path.startsWith('/collections') ? '0.9' : '0.6';
        const changefreq = page.path === '/' ? 'weekly' : 'monthly';
        const images = page.path.startsWith('/collections/')
            ? products
                  .filter((product) => page.path.includes(product.collection))
                  .map(
                      (product) => `    <image:image>
      <image:loc>${product.image}?auto=format&amp;fit=crop&amp;w=1000&amp;q=75</image:loc>
      <image:title>${product.name} — Maison Tripoli</image:title>
    </image:image>`,
                  )
                  .join('\n')
            : '';

        return `  <url>
    <loc>${site.url}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${images ? `${images}\n` : ''}  </url>`;
    };

    return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Plan de site généré automatiquement par tools/build-site.mjs — ne pas éditer à la main -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map(toUrl).join('\n')}
</urlset>
`;
}

function buildRobots() {
    return `# robots.txt — ${site.name}
# Autorise l'exploration complète et pointe vers le plan de site.

User-agent: *
Allow: /

# Répertoires de travail : aucune valeur d'indexation
Disallow: /node_modules/
Disallow: /src/
Disallow: /tools/
Disallow: /docs/

Sitemap: ${site.url}/sitemap.xml
`;
}

/* ------------------------------------------------- Catalogue côté navigateur */

/**
 * Écrit `assets/js/catalog.js` : miroir navigateur du catalogue, partagé par
 * toutes les pages (donc mis en cache une seule fois) et utilisé par la
 * recherche instantanée et la fenêtre de fiche produit.
 */
async function writeBrowserCatalog() {
    const payload = {
        products: products.map((product) => ({
            slug: product.slug,
            collection: product.collection,
            name: product.name,
            badge: product.badge,
            price: product.price,
            ...(product.priceFrom ? { priceFrom: true } : {}),
            dimensions: product.dimensions,
            materials: product.materials,
            lead: product.lead,
            desc: product.description,
            alt: product.alt,
            image: product.image,
        })),
        collections: Object.fromEntries(collections.map((c) => [c.slug, c.path])),
        collectionLabels: Object.fromEntries(collections.map((c) => [c.slug, c.navLabel])),
    };

    // Fichier de données lu par le navigateur : le texte doit y être brut.
    const catalog = decodeDeep(payload);

    const banner = `/* Généré par tools/build-site.mjs — ne pas éditer à la main.
   Source de vérité : src/content/products.mjs et src/content/collections.mjs */
`;
    const output = `${banner}window.__MT_CATALOG__ = ${JSON.stringify(catalog, null, 4)};
`;

    await writeFile(path.join(ROOT, 'assets', 'js', 'catalog.js'), output, 'utf8');
    console.log(`  ✓ catalogue navigateur           → assets/js/catalog.js            ${String(Math.round(Buffer.byteLength(output) / 1024)).padStart(4)} Ko`);
}

/* ---------------------------------------------------------- Anciennes sorties */

/** Pages de l'ancienne arborescence, remplacées par des URL dédiées. */
const LEGACY_FILES = ['mentions-legales.html'];

async function cleanLegacyOutput() {
    for (const file of LEGACY_FILES) {
        await rm(path.join(ROOT, file), { force: true });
    }
}

/* -------------------------------------------------------------- Point d'entrée */

async function build() {
    const seen = new Map();
    const written = [];
    const indexable = [];

    console.log(`\nGénération de ${routes.length} page(s) — ${site.url}`);

    for (const route of routes) {
        assertValid(route);

        if (seen.has(route.path)) {
            throw new Error(`Chemin dupliqué entre deux pages : ${route.path} et ${seen.get(route.path)}`);
        }
        seen.set(route.path, route.path);

        // Le préfixe relatif des liens et des ressources est calculé à partir
        // de la profondeur de la page (les pages « racine absolue », comme la
        // 404, gèrent leurs liens directement dans leur propre gabarit).
        const depth = route.depth;

        const html = renderPage({
            path: route.path,
            depth,
            title: route.title,
            description: route.description,
            robots: route.robots,
            ogType: route.ogType,
            preload: route.preload,
            includeQuickView: route.includeQuickView,
            body: route.body,
            jsonLd: route.jsonLd,
        });

        const output = resolveOutput(route.path);
        const target = path.join(ROOT, output);
        await mkdir(path.dirname(target), { recursive: true });
        await writeFile(target, html, 'utf8');

        const size = Buffer.byteLength(html, 'utf8');
        written.push({ output, size });
        console.log(
            `  ✓ ${route.path.padEnd(30)} → ${output.padEnd(38)} ${String(Math.round(size / 1024)).padStart(4)} Ko`,
        );

        if (route.robots !== 'noindex, follow') {
            indexable.push({ path: route.path, depth });
        }
    }

    await writeBrowserCatalog();

    // 404 : servie pour toutes les URL, exclue du plan de site
    await writeFile(path.join(ROOT, 'sitemap.xml'), buildSitemap(indexable), 'utf8');
    await writeFile(path.join(ROOT, 'robots.txt'), buildRobots(), 'utf8');
    await cleanLegacyOutput();

    const total = written.reduce((sum, file) => sum + file.size, 0);
    const collectionCount = collections.length;
    const productCount = products.length;

    console.log(
        `\nTerminé : ${written.length} pages HTML, ${collectionCount} collections, ${productCount} produits.`,
    );
    console.log(`Poids HTML cumulé : ${Math.round(total / 1024)} Ko (≈ ${Math.round(total / written.length / 1024)} Ko par page).`);
    console.log(`sitemap.xml : ${indexable.length} URL indexables (+ 1 page 404 exclue).\n`);
}

build().catch((error) => {
    console.error(`\n✖ Échec de la génération :\n${error.message}\n`);
    process.exit(1);
});
