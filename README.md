# Maison Tripoli — Site vitrine multi-pages

Site vitrine de la maison d'édition et manufacture de mobilier d'art **Maison Tripoli**
(ébénisterie haut de gamme, Tripoli — Liban). Le dépôt contient le site **statique
généré** et son outillage de contrôle qualité SEO / accessibilité / performance.

Le site n'est plus une page unique : il est organisé en **13 pages HTML** dont une
page d'accueil vitrine et **5 pages de collection** optimisées séparément pour le
référencement naturel.

---

## 1. Carte du site

```
/                                Vitrine générale (hub) → ItemList des 5 collections
├── /collections/                Page pivot des collections
│   ├── /collections/salons/                Salons & banquettes
│   ├── /collections/salles-a-manger/       Tables de réception & salles à manger
│   ├── /collections/chambres/              Chambres & suites
│   ├── /collections/rangements/            Rangements & bureaux
│   └── /collections/eclairage-objets/      Éclairage & objets d'art
├── /atelier/                    Atelier, matières, héritage
├── /sur-mesure/                 Processus de projet sur-mesure
├── /projets/                    Réalisations in situ
├── /contact/                    Showroom & contact (NAP, plan, FAQ)
├── /mentions-legales/           Mentions légales, CGV, confidentialité
└── /404.html                    Erreur personnalisée (noindex, follow)
```

### Versions linguistiques

Le français est servi à la racine (langue pivot) ; les pages **traduites** vivent
sous `/en/` et `/ar/` :

```
/en/                             Home (traduite, hreflang réciproque)
/en/collections/                 Collections hub
/ar/                             النسخة العربية (dir="rtl")
/ar/collections/                 مجموعات
```

Seules les pages déclarées dans `PAGE_LOCALES` (`src/content/i18n.mjs`) sont
publiées dans une autre langue : le build refuse de générer une page à moitié
traduite (il échoue en listant les chaînes manquantes), et le contrôle
`npm run check:i18n` vérifie qu'aucun texte français ne subsiste dans une page
traduite. Les pages non traduites ne portent ni `hreflang` ni entrée de plan de
site supplémentaire ; le sélecteur y renvoie vers l'accueil de la langue visée.

`robots.txt` et `sitemap.xml` sont **générés** par le build à partir de cette liste ;
le plan de site porte les alternances `xhtml:link` (hreflang) de chaque page.

---

## 2. Structure du dépôt

```
.
├── index.html … mentions-legales/     HTML publié (généré — ne pas éditer à la main)
├── 404.html                           Page d'erreur générée
├── sitemap.xml · robots.txt           Générés par le build
├── site.webmanifest                   Manifeste PWA (icônes, couleurs, nom)
├── src/
│   ├── site.config.mjs                Domaine, NAP, réseaux, mentions légales
│   ├── input.css                      Source Tailwind (directives + styles de la Maison)
│   ├── content/                       Données éditoriales : collections, produits, images
│   ├── lib/                           Utilitaires : chemins relatifs, encodage HTML
│   ├── templates/                     Layout, sections, composants réutilisables
│   └── pages/                         Un module par page (accueil, collections, atelier…)
├── assets/
│   ├── css/main.css                   CSS compilé et minifié — versionné, à déployer tel quel
│   ├── js/main.js                     Logique applicative, sans aucune dépendance externe
│   ├── js/catalog.js                  Catalogue navigateur (généré, lu par main.js)
│   └── img/                           Favicons, icônes PWA, carte Open Graph, visuel d'attente
├── tools/
│   ├── build-site.mjs                 Générateur : HTML, sitemap, robots.txt, catalogue
│   ├── build-icons.mjs                Sprite SVG issu des seules icônes réellement utilisées
│   ├── build-brand-assets.py          Favicons, icônes PWA et carte Open Graph (Pillow)
│   ├── check-styles.mjs               Vérifie que chaque classe utilisée existe dans le CSS compilé
│   ├── audit-seo.mjs                  Audit SEO technique + accessibilité de toutes les pages
│   └── smoke-test.mjs                 Parcours fonctionnels du DOM (jsdom)
├── docs/
│   ├── architecture-multi-pages.md    Architecture, carte des routes, conventions SEO
│   └── rapport-optimisation-seo.md    Rapport d'optimisation initial
├── tailwind.config.js                 Palette, typographies et fichiers scannés
└── .htmlvalidate.json                 Règles de validation HTML5 / W3C
```

**Le HTML publié et le CSS compilé sont versionnés volontairement** : le site peut
être mis en ligne sans étape de build côté hébergeur. Toute modification de source
doit être suivie de `npm run build`, sinon le HTML publié ne reflète pas la source.

> Documentation détaillée : [`docs/architecture-multi-pages.md`](docs/architecture-multi-pages.md)
> (carte des routes, correspondance sources → HTML, ajout d'une collection, conventions SEO).

---

## 3. Commandes

```bash
npm install              # outils de développement uniquement

npm run build            # HTML des 13 pages + sprite d'icônes + catalogue + CSS minifié
npm run build:site       # HTML, sitemap.xml, robots.txt, catalog.js
npm run build:css        # CSS minifié (assets/css/main.css)
npm run build:icons      # sprite SVG des icônes
npm run dev              # recompilation du CSS à chaque modification (watch)
npm run brand            # favicons, icônes PWA et carte Open Graph

npm run serve            # prévisualisation locale sur http://localhost:8080

npm run validate         # validation HTML5 des 13 pages (html-validate, règles W3C)
npm run check:styles     # classes utilisées ⊂ classes compilées (garde-fou Tailwind)
npm run check:contrast   # contrastes WCAG des trois thèmes (clair + 2 sombres)
npm run check:i18n       # aucun texte français résiduel dans une page traduite
npm run audit            # audit SEO / accessibilité / performance statique
npm run test             # parcours fonctionnels du DOM (jsdom)
npm run check            # enchaîne build + validate + check:styles + check:contrast + check:i18n + audit + test
```

`npm run check` est **la commande de référence avant toute mise en ligne** : elle
échoue (code de sortie ≠ 0) dès qu'une régression est détectée, ce qui permet de la
brancher telle quelle dans une intégration continue.

---

## 4. Ajouter du contenu

### Une nouvelle collection

1. Déclarer la collection dans `src/content/collections.mjs`
   (`slug`, `path`, `navLabel`, `h1`, `title`, `description`, `univers`, `faq`).
2. Ajouter ses produits dans `src/content/products.mjs` (champ `collection`).
3. Lancer `npm run check`.

La page, son fil d'Ariane, son `ItemList` de produits, son entrée dans le menu
déroulant, dans le pied de page, dans le hub `/collections/` et dans `sitemap.xml`
sont générés automatiquement.

### Une icône

1. Utiliser l'icône dans le HTML :
   ```html
   <svg class="icon w-5 h-5 stroke-[2]" aria-hidden="true" focusable="false"><use href="#i-search"></use></svg>
   ```
   ou depuis le JS : `createIcon('search', 'icon w-5 h-5 stroke-[2]')`.
2. Lancer `npm run build:icons` : le script détecte l'usage, extrait le tracé depuis
   `lucide-static` et réinjecte le sprite entre les marqueurs `<!-- ICONS:START -->`
   et `<!-- ICONS:END -->` de chaque page.

> Ne jamais éditer le sprite ni les fichiers HTML générés à la main : ils sont
> écrasés à chaque exécution du build.

---

### Une traduction

1. Ajouter la page dans `PAGE_LOCALES` (`src/content/i18n.mjs`), par exemple
   `'/sur-mesure/': ['fr', 'en', 'ar']`.
2. Passer chaque chaîne visible du gabarit par `tr('…')` (ou par un accesseur
   `get x() { return tr('…'); }` dans un module de contenu).
3. Lancer `npm run build:site` : les traductions manquantes sont listées dans
   l'erreur, et il suffit de les ajouter aux blocs `en` / `ar` de la table `ui`.
4. Terminer par `npm run check` — `check:i18n` refuse tout texte français
   oublié dans une page traduite.

---

## 5. Mise en production — points à personnaliser

| À faire | Où |
| --- | --- |
| Remplacer le domaine `www.maisontripoli.com` par le domaine réel | `src/site.config.mjs` puis `npm run build` |
| Brancher les formulaires sur un back-end (ou un service type Formspree / Netlify Forms) | `assets/js/main.js` → `handleContactSubmit`, `handleConsultationSubmit`, `handleNewsletterSubmit` |
| Héberger les photos sur le domaine (WebP/AVIF) au lieu du CDN d'images | `src/content/imagery.mjs` |
| Compléter les mentions légales (raison sociale, registre, TVA) | `src/site.config.mjs` et `src/pages/mentions-legales.mjs` |
| Vérifier `changefreq` / `priority` par type de page | `tools/build-site.mjs` → `buildSitemap()` (`lastmod` est daté automatiquement à chaque build) |
| Ajouter une bannière de consentement **si** un outil de mesure d'audience ou une régie est ajouté | Avant tout script tiers |

---

## 6. Compatibilité et dégradation

HTML5 / CSS3 modernes, rendu conçu **mobile-first** et testé sur les moteurs
Chromium, Gecko (Firefox) et WebKit (Safari). Aucune dépendance JavaScript
externe à l'exécution : le budget de script est limité au code du site.

Sans JavaScript, tout le contenu éditorial reste lisible et indexable : navigation
par liens, FAQ en `<details>`, coordonnées et fiches descriptives en HTML. Les
fonctionnalités interactives (recherche instantanée, panier, aperçu produit,
formulaires) s'activent uniquement si le script est disponible.
