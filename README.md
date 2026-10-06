# Maison Tripoli — Site vitrine

Site vitrine de la maison d'édition et manufacture de mobilier d'art **Maison Tripoli**
(ébénisterie haut de gamme, Tripoli — Liban). Ce dépôt contient le site **et** son
outillage de contrôle qualité SEO / accessibilité / performance.

---

## 1. Structure du projet

```
.
├── index.html                  Page d'accueil (one-page : collections, héritage, sur-mesure, galerie, contact)
├── mentions-legales.html       Mentions légales, CGV, confidentialité, expéditions
├── 404.html                    Page d'erreur personnalisée (noindex, follow)
├── robots.txt                  Directives d'exploration + déclaration du sitemap
├── sitemap.xml                 Plan de site XML (+ balisage image)
├── site.webmanifest            Manifeste PWA (icônes, couleurs, nom d'application)
├── src/input.css               Source CSS (directives Tailwind + styles de la Maison)
├── assets/
│   ├── css/main.css            CSS compilé et minifié — versionné, à déployer tel quel
│   ├── js/main.js              Logique applicative, sans aucune dépendance externe
│   └── img/                    Favicon SVG, icônes PNG, carte Open Graph, visuel d'attente
├── tools/
│   ├── build-icons.mjs         Génère le sprite SVG à partir des icônes Lucide réellement utilisées
│   ├── build-brand-assets.py   Génère favicons, icônes PWA et carte Open Graph (Pillow)
│   ├── audit-seo.mjs           Contrôle SEO technique + accessibilité de toutes les pages
│   └── smoke-test.mjs          Tests fonctionnels du DOM (jsdom)
├── tailwind.config.js          Palette, typographies et fichiers scannés
└── .htmlvalidate.json          Règles de validation HTML5 / W3C
```

Le site est **statique** : aucun serveur applicatif, aucune base de données, aucune
dépendance JavaScript à l'exécution. Il se déploie en copiant les fichiers sur
n'importe quel hébergeur ou CDN.

---

## 2. Commandes

```bash
npm install              # outils de développement uniquement

npm run prepare-assets   # régénère le sprite d'icônes puis compile le CSS
npm run build            # compile uniquement le CSS (assets/css/main.css, minifié)
npm run dev              # recompilation du CSS à chaque modification (watch)
npm run icons            # reconstruit le sprite SVG des icônes

npm run serve            # prévisualisation locale sur http://localhost:8080

npm run validate         # validation HTML5 (html-validate, règles W3C)
npm run audit            # audit SEO / accessibilité / performance statique
npm run test             # tests fonctionnels du DOM (jsdom)
npm run check            # les trois d'ensemble — à lancer avant chaque mise en ligne
```

**Le CSS compilé est versionné volontairement** : le site peut être publié
sans étape de build côté hébergeur. Après toute modification de classes dans le
HTML ou le JS, relancer `npm run build` (sinon Tailwind ne génère pas les
nouvelles classes).

---

## 3. Ajouter ou modifier une icône

1. Utiliser l'icône dans le HTML :
   ```html
   <svg class="icon w-5 h-5 stroke-[2]" aria-hidden="true" focusable="false"><use href="#i-search"></use></svg>
   ```
   ou depuis le JS : `createIcon('search', 'icon w-5 h-5 stroke-[2]')`.
2. Lancer `npm run icons` : le script détecte l'usage, extrait le tracé depuis
   `lucide-static` et réinjecte le sprite entre les marqueurs `<!-- ICONS:START -->`
   et `<!-- ICONS:END -->` de chaque page.

> Ne jamais éditer le contenu du sprite à la main : il est écrasé à chaque exécution.

---

## 4. Mise en production — points à personnaliser

| À faire | Où |
| --- | --- |
| Remplacer le domaine `www.maisontripoli.com` par le domaine réel | `index.html`, `mentions-legales.html`, `404.html`, `robots.txt`, `sitemap.xml` |
| Brancher les formulaires sur un back-end (ou un service type Formspree / Netlify Forms) | `assets/js/main.js` → `handleContactSubmit`, `handleConsultationSubmit`, `handleNewsletterSubmit` |
| Mettre à jour la date de dernière révision | `sitemap.xml` → `lastmod` |
| Héberger les photos sur le domaine (WebP/AVIF) au lieu d'Unsplash | `index.html`, `assets/js/main.js` |
| Compléter les mentions légales (raison sociale, registre, TVA) | `mentions-legales.html` |
| Ajouter une bannière de consentement **si** un outil de mesure d'audience ou une régie est ajouté | Avant tout script tiers |

---

## 5. Contrôle avant mise en ligne

```bash
npm run check
```

Sortie attendue : validation HTML sans erreur, audit à 0 erreur / 0 avertissement,
tests fonctionnels réussis. Les scripts échouent volontairement (code de sortie ≠ 0)
si une régression est détectée, ce qui permet de les brancher dans une intégration
continue (GitHub Actions, Netlify, Vercel…).

---

## 6. Compatibilité

HTML5 / CSS3 modernes. Le rendu a été conçu mobile-first et testé sur les moteurs
Chromium, Gecko (Firefox) et WebKit (Safari). Les fonctionnalités interactives
(navigation, filtres, fiches produits, devis) dégradent proprement en l'absence de
JavaScript : tout le contenu éditorial reste lisible et indexable.
