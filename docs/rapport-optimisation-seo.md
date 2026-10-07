# Rapport d'audit et d'optimisation — Maison Tripoli

**Périmètre :** `index.html` (page unique de 74 Ko livrée initialement)
**Objectif :** référencement naturel, performance (Core Web Vitals), accessibilité, responsive
**Méthode :** analyse statique du code, mesures de poids, audit automatisé (`tools/audit-seo.mjs`),
tests fonctionnels du DOM (`tools/smoke-test.mjs`), validation HTML5 (`html-validate`, règles W3C)

---

## 1. Synthèse

| Indicateur | Avant | Après |
| --- | --- | --- |
| JavaScript tiers bloquant le rendu | Tailwind Play CDN + Lucide ≈ **800 Ko** (ordre de grandeur) | **0 Ko** |
| Docker CSS | compilé à la volée par le navigateur (CDN Play) | **26,8 Ko** (5,9 Ko gzip) |
| JavaScript applicatif | ~600 lignes en ligne, non mis en cache | **30,4 Ko** (7,7 Ko gzip) |
| Poids total des actifs propres | 74 Ko (HTML seul, plus les CDN) | **159 Ko bruts / 30 Ko gzip** |
| Images avec `alt` | 11 / 13 dans le HTML, 0 / 2 générées par JS | **14 / 14 + 3 dynamiques** |
| Images en `loading="lazy"` | 0 / 13 | **13 / 13** (hero en `fetchpriority="high"`) |
| Images responsives (`srcset`/`sizes`) | 0 | **14 blocs, 4 largeurs + 4 densités** |
| Dimensions intrinsèques (`width`/`height`, anti-CLS) | 0 / 13 | **14 / 14** |
| Balises `<section>` nommées (accessibles) | 0 / 9 | **9 / 9** |
| Liens morts (`href="#"`) | 7 | **0** |
| Erreurs de validation HTML5 | jeu de règles W3C | **0** |
| Avertissements de l'audit SEO interne | non mesuré | **0** |
| Données structurées Schema.org | aucune | **LocalBusiness + WebSite + 6 Product** |

Toutes les vérifications passent : `npm run check` → validation HTML sans erreur,
audit à 0 erreur / 0 avertissement, 29 tests fonctionnels réussis.

---

## 2. Points faibles détectés (avant intervention)

### 2.1 Structure et sémantique

1. **Aucun `<!DOCTYPE html>`** : le document démarrait directement sur `<html>`, ce qui
   place les navigateurs en **mode « quirks »** (interprétation CSS/JS dégradée et
   non conforme). Défaut bloquant.
2. **Hiérarchie de titres orpheline** : les `<h4>` du pied de page n'avaient aucun
   `<h3>` parent, et les titres de modales commençaient à `<h3>` sans `<h2>`.
   L'outline du document était ambigu pour les moteurs comme pour les lecteurs d'écran.
3. **`<section>` sans nom accessible** : 9 sections, dont 4 sans titre du tout.
4. **Contenu cliquable porté par des `<article onclick>`** : les fiches produits
   n'étaient ni focalisables ni activables au clavier, sans `role` ni intitulé.
5. **Icônes décoratives** portées par des `<i data-lucide>` sans alternative ni
   masquage (`aria-hidden`), et boutons « œil » sans intitulé.

### 2.2 Métadonnées

6. **Aucune `meta description`, aucune `canonical`, aucune balise Open Graph ni
   Twitter Card, aucune directive `robots`** : seules `charset` et `viewport` étaient
   présentes. Les partages sociaux ne produisaient aucune vignette.
7. **`<title>` unique de 60 caractères**, sans mot-clé transactionnel local
   (« ébénisterie », « Tripoli ») et sans structure marque + bénéfice.
8. **Absence de données structurées** : ni identité locale (NAP, horaires, géolocalisation),
   ni catalogue produits — c'est précisément ce qui alimente les résultats enrichis
   et le pack local de Google.
9. **Absence de `robots.txt`, `sitemap.xml`, favicon, image de partage et manifeste**.

### 2.3 Performance

10. **`cdn.tailwindcss.com` (Tailwind Play CDN)** : ~400 Ko de JavaScript qui compile
    le CSS **dans le navigateur**, en bloquant le rendu, sans cache exploitable et
    explicitement déconseillé en production.
11. **`unpkg.com/lucide@latest`** : ~350 Ko de JS supplémentaires, **version non
    figée** (« latest ») — risque de rupture et de chaîne d'approvisionnement.
    La totalité des icônes était en outre injectée côté client.
12. **Images non optimisées** : 13 images servies en **pleine largeur (jusqu'à 2000 px)**
    sur mobile faute de `srcset`/`sizes`, **toutes chargées en priorité** (aucun
    `loading="lazy"`), **aucune dimension déclarée** → gaspillage de bande passante
    et **décalage de mise en page (CLS)**.
13. **8 graisses de police** chargées (Cormorant 5 + Plus Jakarta 3) via une feuille
    de style **bloquante**, sans `font-display`.
14. **CSS personnalisé mort** : `no-scrollbar` et `luxury-line-clamp` n'étaient utilisés nulle part.
15. **`window.event` implicite** dans `filterProducts()` et `changeMaterial()`
    (la variable `event` des gestionnaires `onclick` en ligne) : API non standard,
    fragile hors Chromium.

### 2.4 Liens, accessibilité et conversion

16. **7 liens morts `href="#"`** (logo, 3 réseaux sociaux, « Presse », 3 liens légaux) :
    culs-de-sac pour les robots comme pour les visiteurs.
17. **Aucun `rel="noopener"`/`noreferrer"`** et aucun `target="_blank"` maîtrisé ;
    les liens sociaux sans intitulé de remplacement.
18. **Modales inaccessibles** : pas de `role="dialog"`, pas d'`aria-modal`, pas de
    piège de focus, pas de restitution du focus, fermeture par `Échap` partielle.
19. **Champs de formulaire non étiquetés** : `<label>` sans `for`/`id` pour tous les
    champs (contact, rendez-vous, newsletter) — échec des critères WCAG.
20. **Aucun lien d'évitement**, aucun `aria-expanded` sur le menu mobile, aucune
    annonce vocale des résultats de recherche ou de filtrage.
21. **Cibles tactiles insuffisantes** (< 44 px) sur les icônes d'en-tête, et en-tête
    surchargé sous 360 px.

### 2.5 Conformité

22. **Aucune page de mentions légales ni de CGV/confidentialité**, alors que des
    données personnelles sont collectées (formulaires) et que la page renvoie vers
    des liens juridiques inexistants.
23. **Aucune page 404 personnalisée**.

---

## 3. Corrections appliquées

### 3.1 Structure sémantique et balisage HTML5

- `<!DOCTYPE html>` restauré → **mode standards**.
- **Un seul `<h1>`**, réécrit pour porter le mot-clé principal :
  « **Mobilier d'Art & Haute Ébénisterie — Sculptés à Tripoli depuis 1948** ».
- Hiérarchie strictement séquentielle `h1 → h2 → h3` (23 titres vérifiés
  automatiquement) ; titres de modales passés en `<h2>` (`h2` unique par modale,
  tiroir de devis compris), `<h4>` du pied de page renumérotés en `<h3>`.
- Repères sémantiques complets : `header`, `nav` (navigation principale, navigation
  mobile, 2 navigations de pied de page + fil d'Ariane sur les pages internes),
  `main`, 9 `section` **toutes nommées** via `aria-labelledby`, `article` par produit,
  `figure`/`figcaption` pour les visuels éditoriaux, `blockquote`/`figcaption` pour
  la citation du fondateur, `address` pour les coordonnées, `dl`/`dt`/`dd` pour les
  statistiques et les caractéristiques produit, `footer`.
- Fiches produits converties en `<h3><button data-quickview="N">` : cliquables à la
  souris **et** activables au clavier, cible tactile de toute la carte obtenue par
  pseudo-élément plein cadre (`after:absolute after:inset-0`), sans `onclick` en ligne.

### 3.2 Métadonnées

- **`<title>` : 55 caractères** — `Ébénisterie & Mobilier d'Art à Tripoli | Maison Tripoli`
- **`meta description` : 157 caractères**, incitative et localisée.
- **`meta robots`** (`index, follow, max-image-preview:large`), `author`, `theme-color`,
  `geo.region`, `geo.placename`, `format-detection`.
- **Open Graph complet** (type, site_name, locale, title, description, url, image
  + dimensions et texte alternatif) et **Twitter Card `summary_large_image`**.
- **`canonical`** absolue sur chaque page.
- **JSON-LD `@graph`** : `FurnitureStore` (adresse, géocoordonnées, horaires,
  téléphone, fourchette de prix, zones desservies, réseaux sociaux, services),
  `WebSite` et `ItemList` de **6 `Product`** avec prix, devise, disponibilité, état,
  matière et vendeur — cohérent avec les données affichées et avec `assets/js/main.js`.
- `robots.txt`, `sitemap.xml` (avec extension image), `site.webmanifest`,
  `favicon.svg`, `apple-touch-icon.png`, icônes 192/512 px et **carte Open Graph
  1200 × 630 générée avec la signature de la Maison** (`tools/build-brand-assets.py`).
- Pages `mentions-legales.html` (RGPD, CGV, expéditions, litiges) et `404.html`
  (`noindex, follow`, maillage de secours).

### 3.3 Performance et Core Web Vitals

- **Suppression des deux CDN bloquants.** Le CSS est compilé hors ligne par Tailwind
  (`src/input.css` + `tailwind.config.js`) et livré minifié : **26,8 Ko (5,9 Ko gzip)**.
  Les 17 icônes réellement utilisées sont extraites dans un **sprite SVG inline de
  4,4 Ko** (`tools/build-icons.mjs`) référencé par `<use href="#i-xxx">`.
- **JavaScript applicatif externalisé** dans `assets/js/main.js` (30,4 Ko, 7,7 Ko gzip),
  chargé en `defer` : plus aucun script ne bloque le rendu, et les 600 lignes de code
  bénéficient enfin du cache navigateur.
- **LCP** : image du hero `preload` avec `imagesrcset`, `fetchpriority="high"`,
  première candidate filtrée à 800 px de large.
- **Images** : chaque visuel dispose d'un `srcset` (400/600/800/1000–2000 px selon
  l'emplacement), d'un `sizes` correspondant à la grille réelle, de `width`/`height`
  intrinsèques (**CLS ≈ 0**) et de `loading="lazy"` + `decoding="async"` sauf pour le hero.
- **Polices** : graisses inutilisées supprimées (300 et 600 seuls conservés),
  `preconnect` vers `fonts.googleapis.com` **et** `fonts.gstatic.com` (le `crossorigin`
  manquait), feuille de style en mode **non bloquant** (`media="print"` + `onload`,
  repli `<noscript>`), `display=swap`.
- **CSS mort supprimé** (`no-scrollbar`, `luxury-line-clamp`, règle `::selection` en
  double dans les classes utilitaires, motif `contrast-105` invalide).
- **Défilement** : écouteur `scroll` en `{ passive: true }` avec régulation par
  `requestAnimationFrame` ; recherche instantanée temporisée (150 ms) — les
  gestionnaires ne saturent plus le fil principal.

### 3.4 Accessibilité

- **Attributs `alt` descriptifs et enrichis en mots-clés naturels** sur **toutes** les
  images, y compris celles générées en JavaScript (fiches produit, panier, recherche),
  où le `alt` provient désormais du référentiel de données.
- **Aucune image sans dimensions**, `alt=""` réservé au strict décoratif.
- **Modales et tiroirs** : `role="dialog"`, `aria-modal="true"`, `aria-labelledby`,
  `aria-hidden` synchronisé, **piège de focus** circulaire (`Tab`/`Maj+Tab`), fermeture
  par `Échap` et par clic sur le fond, **restitution du focus** à l'élément déclencheur,
  verrouillage du défilement du document.
- **Formulaires** : chaque champ possède un `<label for>` associé, un `autocomplete`,
  un `inputmode` adapté (téléphone, courriel), une validation native respectée
  (`checkValidity`/`reportValidity`) et un **retour de statut** en `role="status" aria-live="polite"`.
- **Annonces vocales** : nombre de pièces affichées après filtrage, résultats de
  recherche, confirmations d'ajout au panier et d'envoi de formulaire.
- **Navigation clavier et lecteurs d'écran** : `aria-expanded`/`aria-controls` sur le
  menu mobile et le panier, `aria-pressed` sur les filtres et le nuancier de matières,
  `aria-label` explicites sur **tous** les liens et boutons icônes (indiquant l'ouverture
  d'une nouvelle fenêtre), **lien d'évitement** « Aller au contenu principal »,
  `:focus-visible` avec anneau bronze contrasté, `scroll-padding-top` pour que les
  ancres ne passent pas sous l'en-tête collant.
- **Préférences utilisateur** : `@media (prefers-reduced-motion: reduce)` neutralise
  animations et défilement fluide ; `color-scheme: light`.

### 3.5 Liens

- **7 liens morts `href="#"` éliminés** : le logo renvoie à `/`, les réseaux sociaux
  vers des URL absolues, « Presse & distinctions » et les liens juridiques vers
  `mentions-legales.html` (avec ancres `#conditions-de-vente` et `#expeditions`).
- Tous les liens sortants sont en `target="_blank"` **avec `rel="noopener noreferrer me"`**
  (le `me` déclarant les profils sociaux), et portent un intitulé accessible.
- Téléphone et courriel en `tel:`/`mailto:` cliquables, numéros avec espaces
  insécables (pas de coupure de ligne).
- Vérification automatique : **aucune ancre interne ne pointe vers un `id` inexistant**,
  **aucune ressource locale manquante**.

### 3.6 Responsive et mobile-first

- En-tête restructuré : hauteur 64 px sur mobile / 80 px sur grand écran, signature
  réduite sous 640 px, espacements adaptés — plus de débordement à 320 px.
- Le tiroir mobile gagne **l'accès à la recherche** (absente sur mobile auparavant)
  et à la prise de rendez-vous.
- Titre principal ramené de `4xl` à `3xl` sur mobile (`sm:6xl → md:7xl` ensuite) ;
  hero en `80vh` sur mobile.
- Grilles vérifiées de 320 px à 1920 px : `1 → 2 → 3` colonnes pour le catalogue,
  `1 → 3` pour la galerie, `1 → 2` pour les blocs éditoriaux.
- Cibles tactiles portées à ≥ 44 px (icônes d'en-tête avec `p-2`/`-m-2`,
  boutons de fermeture, suppression au panier), `flex-wrap` sur les rangées de
  filtres et de pastilles de matières.
- Légende du visuel « matières » passée en colonne sous 640 px ; `aspect-ratio`
  conservé partout pour éviter les sauts de mise en page.

---

## 4. Vérifications automatisées livrées

| Script | Rôle |
| --- | --- |
| `npm run validate` | Validation HTML5 stricte (règles W3C + accessibilité `wcag/h*`) — 0 erreur |
| `npm run audit` | 26 contrôles par page : `h1` unique, hiérarchie de titres, longueur `<title>`/description, canonical, robots, Open Graph, `alt`, dimensions, `rel` des liens sortants, intitulés accessibles, ancres internes, JSON-LD, scripts bloquants, ressources locales, budget de poids — **0 erreur, 0 avertissement** |
| `npm run test` | 29 tests fonctionnels jsdom : fiche produit, panier, filtres, nuancier, recherche (accents/casse), modales, `Échap`, focus, formulaires — **0 erreur JavaScript** |

---

## 5. Actions restant à la charge de l'exploitant

1. **Remplacer le domaine** `www.maisontripoli.com` par le domaine réel
   (`index.html`, `mentions-legales.html`, `404.html`, `robots.txt`, `sitemap.xml`)
   — c'est indispensable pour que `canonical`, Open Graph et JSON-LD soient exacts.
2. **Brancher les formulaires** sur un back-end (ou un service managé) et ajouter un
   accusé de réception par courriel : les traitements actuels sont des simulations
   front-end.
3. **Auto-héberger les photographies** en WebP/AVIF sur le domaine : les visuels
   Unsplash utilisés pour la démonstration restent une dépendance tierce (poids,
   latence, contrôle des formats). Les attributs `srcset`/`sizes` sont déjà en place,
   il suffira de changer les URL.
4. **Compléter les mentions légales** (raison sociale, registre du commerce, TVA)
   et faire relire la politique de confidentialité.
5. **Déclarer le site** dans Google Search Console et Bing Webmaster Tools, soumettre
   `sitemap.xml`, puis créer/optimiser la fiche **Google Business Profile** (le
   balisage local est prêt à l'emploi).
6. **Bannière de consentement** obligatoire avant tout ajout d'un outil de mesure
   d'audience ou d'une régie publicitaire (aucun cookie n'est déposé à ce jour).
7. **Enrichir le contenu** : fiches produit dédiées (`/collections/{collection}/{produit}/`)
   avec le balisage `Product`, journal d'atelier (`/journal/`, balisage `Article`) et
   pages de ville pour le référencement local. Les versions arabe et anglaise sont
   en place ; c'est le contenu qui reste le principal levier de croissance.
8. **Brancher `npm run check`** dans une intégration continue pour bloquer toute
   régression SEO ou accessibilité avant déploiement.
