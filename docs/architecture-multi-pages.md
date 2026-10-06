# Architecture multi-pages — Maison Tripoli

Ce document décrit la structure du site après sa transformation d'une page unique
(`index.html`) en un **site statique généré, organisé par collection**. Il explique
la carte des routes, la correspondance entre les sources et le HTML publié, les
conventions SEO appliquées à chaque page et la marche à suivre pour ajouter une
nouvelle collection.

---

## 1. Principe général

Le dépôt ne contient plus une page écrite à la main mais un **générateur de site
statique** en JavaScript natif (Node ≥ 20, aucune dépendance applicative) :

```
src/  ──►  tools/build-site.mjs  ──►  HTML publié + sitemap.xml + robots.txt + catalog.js
```

* Les **données éditoriales** (collections, produits, images) vivent dans `src/content/`.
* Les **gabarits** (layout, sections, composants) vivent dans `src/templates/`.
* Les **pages** sont des modules qui assemblent données + gabarits : `src/pages/`.
* Le **script de build** parcourt les pages, contrôle chaque page (titre, description,
  `<h1>`, JSON-LD), écrit les fichiers puis régénère `sitemap.xml` et `robots.txt`.

Le résultat déployé est du **HTML/CSS/JS statique** : pas de serveur applicatif,
pas de base de données, pas de framework à l'exécution. Il s'héberge sur n'importe
quel hébergeur statique ou CDN (Netlify, Vercel, Cloudflare Pages, Apache, Nginx…).

> **Pourquoi pas Next.js ?** Le besoin est éditorial : quelques dizaines de pages,
> contenu stable, SEO maîtrisé au niveau du HTML. Un générateur statique offre le
> même HTML sémantique, les mêmes données structurées et de meilleurs Core Web
> Vitals, sans serveur Node à maintenir ni coût de rendu par requête. Décision
> documentée et assumée ; elle reste réversible (chaque page est isolée dans son
> module).

---

## 2. Carte des routes

Le site expose **13 pages HTML** dont **12 indexables** (la page 404 est exclue du
`sitemap.xml` et déclarée `noindex, follow`).

| URL | Fichier publié | Source | Rôle |
| --- | --- | --- | --- |
| `/` | `index.html` | `src/pages/accueil.mjs` | Vitrine générale : positionnement, aperçu des 5 collections, savoir-faire, projets, contact |
| `/collections/` | `collections/index.html` | `src/pages/collections.mjs` → `hubPage()` | Page pivot : présente les 5 collections et lie les pages filles |
| `/collections/salons/` | `collections/salons/index.html` | `src/pages/collections.mjs` → `collectionPage()` | Collection « Salons & banquettes » + `ItemList` de produits |
| `/collections/salles-a-manger/` | `collections/salles-a-manger/index.html` | idem | Collection « Tables de réception & salles à manger » |
| `/collections/chambres/` | `collections/chambres/index.html` | idem | Collection « Chambres & suites » |
| `/collections/rangements/` | `collections/rangements/index.html` | idem | Collection « Rangements & bureaux » |
| `/collections/eclairage-objets/` | `collections/eclairage-objets/index.html` | idem | Collection « Éclairage & objets d'art » |
| `/atelier/` | `atelier/index.html` | `src/pages/atelier.mjs` | Atelier, matières, héritage, engagements |
| `/sur-mesure/` | `sur-mesure/index.html` | `src/pages/sur-mesure.mjs` | Processus de projet sur-mesure en 4 étapes + FAQ |
| `/projets/` | `projets/index.html` | `src/pages/projets.mjs` | Réalisations in situ (villas, hôtels, restaurants) |
| `/contact/` | `contact/index.html` | `src/pages/contact.mjs` | Showroom & contact, NAP complet, coordonnées GPS, FAQ |
| `/mentions-legales/` | `mentions-legales/index.html` | `src/pages/mentions-legales.mjs` | Mentions légales, CGV, confidentialité |
| — | `404.html` | `src/pages/erreur-404.mjs` | Erreur personnalisée (`noindex, follow`), liens de rattrapage auto-résolus |

`robots.txt` et `sitemap.xml` sont **générés** à partir de cette même liste : ils ne
doivent jamais être édités à la main.

---

## 3. Correspondance sources → site publié

```
src/
├── site.config.mjs          Nom, domaine, coordonnées NAP, réseaux, mentions légales
├── input.css                Source Tailwind (directives @tailwind + styles Maison)
├── content/
│   ├── collections.mjs      5 collections : slug, chemin, H1, title, description, univers
│   ├── products.mjs         14 produits : prix, dimensions, matières, délais, alt
│   └── imagery.mjs          Bibliothèque d'images (URL, dimensions, alt, largeurs srcset)
├── lib/
│   ├── paths.mjs            href() / asset() / canonical() — résolution selon la profondeur
│   └── html.mjs             decodeEntities() / decodeDeep() — décodage pour les contextes « données »
├── templates/
│   ├── layout.mjs           <head>, métadonnées, Open Graph, JSON-LD, header, footer, sprite
│   ├── sections.mjs         Sections réutilisables (hero, éditorial, FAQ, CTA, bandeau final)
│   └── components.mjs       Boutons, cartes produit, fil d'Ariane, images responsives, icônes
└── pages/
    ├── accueil.mjs          export default accueil()
    ├── collections.mjs      hubPage() + collectionPage(collection) + collectionPages()
    ├── atelier.mjs          export default atelier()
    ├── sur-mesure.mjs       export default surMesure()
    ├── projets.mjs          export default projets()
    ├── contact.mjs          export default contact()
    ├── mentions-legales.mjs export default mentionsLegales()
    └── erreur-404.mjs       export default erreur404()
```

Chaque page exporte une fonction retournant un objet **route** normalisé :

```js
{
  path: '/collections/salons/',   // URL publique (sert au canonical, au sitemap, à la nav)
  depth: 2,                       // profondeur → préfixe relatif des liens et des assets
  output: 'collections/salons/index.html',
  title, description,             // métadonnées contrôlées par le build
  body,                           // HTML du <main>
  jsonLd,                         // nœuds schema.org (@graph)
  noindex,                        // true pour la 404
  breadcrumbs,                    // fil d'Ariane visible + BreadcrumbList
}
```

`tools/build-site.mjs` collecte ces routes (`routes = [accueil(), ...collectionPages(), …]`),
les valide, puis écrit chaque fichier et les fichiers annexes.

### Contrôles opérés par le build (bloquants)

| Contrôle | Règle |
| --- | --- |
| `<title>` | 30–65 caractères (cible rédactionnelle 50–60) |
| `<meta name="description">` | 110–165 caractères (cible 120–160) |
| `<h1>` | exactement 1 par page, jamais vide |
| Fil d'Ariane | obligatoire dès que `depth > 0` |
| JSON-LD | au moins un nœud dans `@graph`, `@id` uniques |
| Liens internes | résolus et existants |

Un écrit qui échoue fait sortir le build en code ≠ 0 : aucune page dégradée n'est
publiée.

---

## 4. Conventions SEO appliquées à chaque page

1. **Un `<h1>` unique** reprenant l'intention de recherche principale de la page
   (jamais de `<h1>` décoratif), puis hiérarchie `h2`/`h3` **séquentielle**.
2. **`<title>` unique** de 50–60 caractères : mot-clé principal + qualificatif local
   (« à Tripoli ») + marque, dans cet ordre de priorité.
3. **`<meta description>` unique** de 120–160 caractères, écrite pour le clic
   (bénéfice + matière + appel à l'action), jamais dupliquée entre deux pages.
4. **Ancrage local** : chaque page de collection énonce ou sous-entend « à Tripoli »,
   dans le H1, le title ou l'introduction — sans sur-optimisation.
5. **Open Graph + Twitter Card** complets et **`canonical` absolu** sur chaque page.
6. **Données structurées** cohérentes avec le contenu visible :
   * `FurnitureStore` (NAP, horaires, géolocalisation) — accueil et contact ;
   * `CollectionPage` + `ItemList`/`Product` — page pivot et pages de collection ;
   * `BreadcrumbList` — toutes les pages profondes ;
   * `FAQPage` — uniquement `/contact/` et `/sur-mesure/`.
7. **Maillage hub-and-spoke** : l'accueil pointe vers les 5 collections via un
   `ItemList`, chaque page de collection pointe vers ses voisines, le hub et les
   pages de conversion (`/sur-mesure/`, `/contact/`).
8. **Images** : `alt` descriptif et unique, `width`/`height` explicites, `srcset`/`sizes`,
   `loading="lazy"` partout sauf le visuel de hero (`fetchpriority="high"`).
9. **Accessibilité** : repères HTML5 (`header`, `nav`, `main`, `footer`), lien
   d'évitement, focus visible, `aria-current="page"` sur l'entrée de menu courante,
   contrastes AA, cibles tactiles ≥ 44 px.
10. **Sans JavaScript** : tout le contenu éditorial (collections, produits, FAQ en
    `<details>`, coordonnées) reste lisible et indexable.

---

## 5. Navigation et pied de page

Le header et le footer sont définis **une seule fois** dans `src/templates/layout.mjs`
et injectés dans les 13 pages : le menu ne contient plus aucun `href="#"`.

* Entrées principales : Accueil · Collections (menu déroulant des 5 collections) ·
  Atelier · Sur-mesure · Projets · Contact (+ bouton « Demander un devis »).
* Le libellé de chaque collection provient de `collections[].navLabel` : renommer une
  collection met à jour menu, fil d'Ariane et footer simultanément.
* L'URL courante est marquée `aria-current="page"`.
* Le pied de page reprend les 5 collections, les pages institutionnelles, les
  coordonnées NAP et les réseaux sociaux.
* Les liens internes sont **relatifs** et calculés via `href(target, { depth })` :
  le site fonctionne aussi bien à la racine d'un domaine que dans un sous-dossier.

---

## 6. Ajouter une collection

1. **Déclarer la collection** dans `src/content/collections.mjs` :

   ```js
   {
       slug: 'terrasses',
       path: '/collections/terrasses/',
       navLabel: 'Terrasses &amp; extérieurs',
       breadcrumbLabel: 'Terrasses',
       eyebrow: 'Mobilier d’extérieur',
       h1: 'Mobilier de Terrasse en Teck Massif, Fabriqué à Tripoli',
       title: 'Mobilier de Terrasse en Teck Massif à Tripoli | Maison Tripoli',
       description: '…120–160 caractères…',
       intro: '…',
       univers: [ /* sections éditoriales */ ],
       faq: [ /* questions/réponses */ ],
   }
   ```

2. **Ajouter ses produits** dans `src/content/products.mjs` (champ `collection: 'terrasses'`).
3. **Vérifier les images** référencées dans `src/content/imagery.mjs` (URL, `alt`, dimensions).
4. **Lancer** `npm run check` : la page, sa carte de produits, son fil d'Ariane, son
   `ItemList` et son entrée dans `sitemap.xml` sont générés automatiquement ; le menu
   déroulant et le footer l'incluent sans autre intervention.

---

## 7. Chaîne de contrôle qualité

| Commande | Vérifie |
| --- | --- |
| `npm run build` | Génère les 13 pages, le sprite d'icônes, le catalogue navigateur, `sitemap.xml`, `robots.txt`, puis compile le CSS |
| `npm run validate` | Validité HTML5 des 13 pages (html-validate, règles W3C) |
| `npm run check:styles` | Toute classe utilisée dans le HTML ou le JS existe dans le CSS compilé (détecte les classes Tailwind non générées) |
| `npm run audit` | SEO technique + accessibilité de toutes les pages (titre, description, `<h1>`, fil d'Ariane, JSON-LD, liens internes, `alt`) |
| `npm run test` | Parcours fonctionnels dans jsdom (recherche, panier, fiches produit, formulaires, menu) |
| `npm run check` | Enchaîne les cinq précédents — **à lancer avant chaque mise en ligne** |

---

## 8. Évolutions prévues (non implémentées)

* **Fiches produit dédiées** `/collections/{collection}/{produit}/` : la structure de
  données (`products.mjs`) et le balisage `Product` sont déjà en place ; il suffira
  d'ajouter une fonction `productPages()` dans `src/pages/collections.mjs` et de
  l'injecter dans la liste `routes` du build.
* **Version arabe / anglaise** : dupliquer `src/content/` par langue et ajouter un
  champ `locale` à la route, puis émettre les balises `hreflang`.
* **Blog / journal** (`/journal/`) : même modèle qu'une collection, avec `Article`
  au lieu de `CollectionPage`.
