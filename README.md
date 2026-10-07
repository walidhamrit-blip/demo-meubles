# Maison Tripoli — Site vitrine multi-pages

Site vitrine de la maison d'édition et manufacture de mobilier d'art **Maison Tripoli**
(ébénisterie haut de gamme, Tripoli — Liban). Le dépôt contient le site **statique
généré** et son outillage de contrôle qualité SEO / accessibilité / performance.

Le site n'est plus une page unique : il est organisé en **13 pages sources** dont une
page d'accueil vitrine et **5 pages de collection** optimisées séparément pour le
référencement naturel, soit **26 pages publiées** : chacune est servie en arabe
(langue principale) **et** en anglais.

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

### Versions linguistiques — arabe d'abord

Le site est **bilingue arabe / anglais** et ne publie aucune page française :

```
/                                الصفحة الرئيسية        (lang="ar", dir="rtl", x-default)
├── /collections/ … les cinq collections                المجموعات
├── /atelier/ · /sur-mesure/ · /projets/ · /contact/ · /mentions-legales/
/en/                             Home                   (lang="en", hreflang réciproque)
├── /en/collections/ … les cinq collections
└── /en/atelier/ · /en/sur-mesure/ · /en/projets/ · /en/contact/ · /en/mentions-legales/
/404.html  ·  /en/404.html        erreur personnalisée (noindex, follow)
```

L'arabe est la **langue principale** : il occupe la racine du domaine, il est
déclaré `x-default`, et le site lui-même est rédigé en arabe standard (les
chiffres restent en chiffres arabes occidentaux, comme le veut l'usage levantin).
L'anglais est la **seconde langue**, servi sous `/en/`.

Le français n'existe plus qu'à l'intérieur du code : c'est la **langue de
rédaction**. Chaque chaîne française sert de clé dans la table `ui`
(`src/content/i18n.mjs`) ; le rendu passe par `tr()` qui renvoie la valeur
arabe ou anglaise de la page en cours. `PAGE_LOCALES` énumère les 13 routes
publiées dans les deux langues : le build **échoue** en listant les chaînes
manquantes plutôt que de publier une page à moitié traduite, et
`npm run check:i18n` vérifie qu'aucun texte français ne subsiste dans une page
publiée (nœuds de texte, attributs `alt`, `title`, `aria-label`, `content`).

`robots.txt` et `sitemap.xml` sont **générés** par le build ; le plan de site
porte les alternances `xhtml:link` (`ar`, `en`, `x-default` → arabe) de chaque
page, et un canonical auto-référent par langue.

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

npm run build            # HTML des 26 pages + sprite d'icônes + sigles + catalogue + CSS
npm run build:site       # HTML, sitemap.xml, robots.txt, catalog.js
npm run build:css        # CSS minifié (assets/css/main.css)
npm run build:icons      # sprite SVG des icônes
npm run build:logos      # sigles SVG des maisons et fournisseurs partenaires
npm run dev              # recompilation du CSS à chaque modification (watch)
npm run brand            # favicons, icônes PWA et carte Open Graph

npm run serve            # prévisualisation locale sur http://localhost:8080

npm run validate         # validation HTML5 des 26 pages (html-validate, règles W3C)
npm run check:styles     # classes utilisées ⊂ classes compilées (garde-fou Tailwind)
npm run check:contrast   # contrastes WCAG des trois thèmes (clair + 2 sombres)
npm run check:i18n       # aucun texte français résiduel dans une page publiée
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

### Un sigle de partenaire

Le premier ruban défilant n'affiche **aucun libellé texte** : chaque maison ou
fournisseur y est représenté par une image (`<img>`), son sigle — monogramme
encadré suivi du nom en capitales.

1. Modifier la liste `MARKS` (`src/content/brand-marks.mjs`) : `slug`, `name`
   (clé de traduction, reprise dans le texte alternatif), `monogram`, `wordmark`.
2. Lancer `npm run build:logos` : les fichiers `assets/img/marques/<slug>.svg`
   sont engendrés (dimensions déduites du mot-symbole).
3. `npm run check` : le test fonctionnel vérifie que chaque image du ruban
   existe, porte un `alt` et des dimensions, et qu'aucun texte ne subsiste
   à côté d'elle.

Pour afficher le **logo officiel** d'une maison (avec son autorisation) : le
déposer au même emplacement, sous le même nom de fichier. Le balisage, les
attributs `alt`, `width`, `height` et le chargement différé ne changent pas.

---

### Une traduction

1. Ajouter la page dans `PAGE_LOCALES` (`src/content/i18n.mjs`), par exemple
   `'/sur-mesure/': ['ar', 'en']` — les deux langues servies.
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
