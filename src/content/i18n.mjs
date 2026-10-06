/* =========================================================================
   Internationalisation — socle
   -------------------------------------------------------------------------
   Le français reste la langue source : les gabarits et les contenus sont
   écrits en français, puis traduits au rendu par `tr(locale, 'texte source')`.

   Principes retenus pour préserver le référencement :

   • Une URL par langue : le français reste à la racine, l'anglais sous /en/
     et l'arabe sous /ar/ (jamais de bascule de langue par JavaScript seul).
   • Chaque page traduite porte son propre titre, sa description, son canonical
     et ses balises hreflang réciproques (dont x-default vers le français).
   • Aucune page « mélangée » : une page n'est publiée dans une langue que si
     sa traduction est complète. Le build échoue sinon (voir `tr()`).
   • L'arabe est servi avec dir="rtl" et lang="ar", la mise en page utilisant
     des utilitaires logiques (start/end) plutôt que gauche/droite.
   ========================================================================= */

/** Métadonnées de chaque langue. */
export const locales = {
    fr: {
        code: 'fr',
        htmlLang: 'fr',
        dir: 'ltr',
        ogLocale: 'fr_FR',
        hreflang: 'fr',
        label: 'Français',
        short: 'FR',
        switchLabel: 'Changer de langue',
        switchLabelMobile: 'Changer de langue — menu mobile',
    },
    en: {
        code: 'en',
        htmlLang: 'en',
        dir: 'ltr',
        ogLocale: 'en_US',
        hreflang: 'en',
        label: 'English',
        short: 'EN',
        switchLabel: 'Change language',
        switchLabelMobile: 'Change language — mobile menu',
    },
    ar: {
        code: 'ar',
        htmlLang: 'ar',
        dir: 'rtl',
        ogLocale: 'ar_LB',
        hreflang: 'ar',
        label: 'العربية',
        short: 'ع',
        switchLabel: 'تغيير اللغة',
        switchLabelMobile: 'تغيير اللغة — قائمة الهاتف',
    },
};

export const localeCodes = Object.keys(locales);
export const defaultLocale = 'fr';

/**
 * Registre des pages traduites : chemin français → langues disponibles.
 * Source unique de vérité, partagée par le générateur (routes à produire),
 * les gabarits (liens localisés, sélecteur de langue) et le plan de site
 * (balises hreflang).
 *
 * Une page absente de ce registre n'existe qu'en français : le sélecteur ne
 * la propose pas dans les autres langues et les liens des pages traduites
 * pointent alors vers la version française.
 */
export const PAGE_LOCALES = {
    '/': ['fr', 'en', 'ar'],
    '/collections/': ['fr', 'en', 'ar'],
    '/collections/salons/': ['fr', 'en', 'ar'],
    '/collections/salles-a-manger/': ['fr', 'en', 'ar'],
    '/collections/chambres/': ['fr', 'en', 'ar'],
    '/collections/rangements/': ['fr', 'en', 'ar'],
    '/collections/eclairage-objets/': ['fr', 'en', 'ar'],
};

/** Langues disponibles pour un chemin donné (français par défaut). */
export function localesFor(pathname) {
    return PAGE_LOCALES[pathname] || ['fr'];
}

/** La page existe-t-elle dans cette langue ? */
export function hasLocale(pathname, locale) {
    return localesFor(pathname).includes(locale);
}

/* -------------------------------------------------------------------------
   Traductions « d'habillage » (navigation, pied de page, formulaires, couches)
   Clés = texte source français TEL QU'ÉCRIT dans les gabarits.
   ------------------------------------------------------------------------- */

export const ui = {
    en: {
        /* En-tête */
        'Atelier &amp; Showroom Tripoli • Rue des Ébénistes':
            'Atelier &amp; Showroom Tripoli • Rue des Ébénistes',
        'Fabrication artisanale &amp; sur-mesure • Expédition internationale':
            'Hand-made and made-to-measure • International shipping',
        'Atelier Mobilier • 1948': 'Furniture workshop • 1948',
        'Ouvrir le menu de navigation': 'Open the navigation menu',
        'Navigation principale': 'Main navigation',
        'Navigation mobile': 'Mobile navigation',
        'Rechercher une pièce au catalogue': 'Search the catalogue',
        'Prendre rendez-vous': 'Book an appointment',
        'Ouvrir ma sélection et mon devis': 'Open my selection and quote',
        'Thème': 'Theme',
        'Thème d’affichage': 'Display theme',
        'Thème clair — sable': 'Light theme — sand',
        'Thème sombre — Ébène': 'Dark theme — Ebony',
        'Thème sombre — Noyer': 'Dark theme — Walnut',
        'Aller au contenu principal': 'Skip to main content',
        'Écrire à l’atelier sur WhatsApp': 'Message the workshop on WhatsApp',
        WhatsApp: 'WhatsApp',

        /* Navigation */
        Accueil: 'Home',
        Collections: 'Collections',
        Atelier: 'Workshop',
        'Sur-mesure': 'Bespoke',
        Projets: 'Projects',
        Contact: 'Contact',

        /* Tiroir mobile */
        'Rechercher une pièce': 'Search for a piece',
        'Visite privée au showroom': 'Private showroom visit',
        'Service personnalisé': 'Personal service',

        /* Pied de page */
        'La Maison': 'The House',
        'Atelier Tripoli': 'Tripoli Atelier',
        'Tripoli, Liban': 'Tripoli, Lebanon',
        'Tripoli, Liban (livraison internationale)': 'Tripoli, Lebanon (international shipping)',
        'Suivre Maison Tripoli sur Instagram (nouvelle fenêtre)':
            'Follow Maison Tripoli on Instagram (opens in a new window)',
        'Suivre Maison Tripoli sur Facebook (nouvelle fenêtre)':
            'Follow Maison Tripoli on Facebook (opens in a new window)',
        'Localiser le showroom Maison Tripoli sur Google Maps (nouvelle fenêtre)':
            'Locate the Maison Tripoli showroom on Google Maps (opens in a new window)',
        'Informations complémentaires et liens utiles': 'Further information and useful links',

        /* Couches : recherche, panier, fiche produit, rendez-vous */
        'Recherche au catalogue': 'Catalogue search',
        'Fermer la recherche': 'Close search',
        'Rechercher une pièce, une matière ou une collection':
            'Search for a piece, a material or a collection',
        'Tapez « Noyer », « Canapé », « Table »…': 'Type “Walnut”, “Sofa”, “Table”…',
        'Mon devis &amp; panier': 'My quote &amp; selection',
        'Fermer ma sélection': 'Close my selection',
        'Votre sélection est vide': 'Your selection is empty',
        'Parcourez nos collections signatures pour ajouter vos pièces.':
            'Browse our signature collections to add pieces.',
        'Total estimatif :': 'Estimated total:',
        'Finaliser la demande de devis': 'Complete the quote request',
        'Confirmer la demande': 'Confirm the request',
        'Fermer la fiche produit': 'Close the product sheet',
        'Aperçu de la pièce sélectionnée dans les collections Maison Tripoli':
            'Preview of the selected piece from the Maison Tripoli collections',
        'Personnaliser les dimensions / finitions': 'Customise dimensions / finishes',
        'Ajouter au devis &amp; panier': 'Add to quote &amp; selection',
        'Fermer la fenêtre de rendez-vous': 'Close the appointment window',
        'Maison Tripoli Concierge': 'Maison Tripoli Concierge',
        'Objet de la visite': 'Purpose of the visit',
        'Achat de mobilier pour particulier': 'Furniture purchase — private client',
        'Collaboration professionnelle (architecte)': 'Professional collaboration (architect)',
        'Projet villa / appartement complet': 'Full villa / apartment project',
        'Date souhaitée': 'Preferred date',
        'Votre nom &amp; prénom': 'Your first and last name',
        'Numéro mobile (WhatsApp)': 'Mobile number (WhatsApp)',

        /* Fiche produit dynamique (renseignée par JavaScript) */
        'Dimensions :': 'Dimensions:',
        'Délai atelier :': 'Workshop lead time:',
        'Origine :': 'Origin:',
        'Fabriqué sur commande (4 à 6 semaines)': 'Made to order (4 to 6 weeks)',
        'Salon habillé par Maison Tripoli : mobilier d’art en noyer massif et lin écru':
            'Living room furnished by Maison Tripoli: solid walnut and raw linen furniture',

        /* Métadonnées et divers */
        'Maison Tripoli — retour à l’accueil': 'Maison Tripoli — back to home',

        /* --- Pages d'accueil et hub, générées depuis les gabarits --- */
        "Aperçus confidentiels de nos nouvelles lignes de mobilier, invitations aux vernissages et chroniques sur l'architecture libanaise.":
            'Confidential previews of our new furniture lines, private view invitations and notes on Lebanese architecture.',
        'Atelier de Tripoli':
            'Tripoli Atelier',
        'Atelier de confection Tripoli':
            'Making and upholstery workshop, Tripoli',
        "Bien au-delà d'un centre de production, la ville de":
            'Far more than a production centre, the city of',
        "Boiseries, mobilier, éclairage et pierre : nous dessinons l'ensemble et fabriquons dans un même langage de matières.":
            'Panelling, furniture, lighting and stone: we design the whole scheme and build it in a single language of materials.',
        "Capitale historique des corporations d'artisans d'art, où chaque ruelle du vieux souk perpétue le travail du bois noble.":
            'Historic capital of the craft guilds, where every alley of the old souk keeps the working of noble wood alive.',
        'Catalogue 2025':
            '2025 catalogue',
        'Chêne clair':
            'Light oak',
        'Cinq familles de mobilier, un seul atelier. Chaque collection est déclinable en dimensions, en essences et en textiles : vous ne choisissez pas un modèle dans un catalogue, vous en fixez les cotes avec nos menuisiers.':
            'Five furniture families, one workshop. Every collection can be adapted in dimensions, woods and textiles: you do not pick a model from a catalogue, you set its dimensions with our joiners.',
        "Collections de Mobilier d'Art Fabriquées à Tripoli":
            'Art Furniture Collections Made in Tripoli',
        'Commander un échantillon':
            'Order a sample',
        'Console Basse « Bahia » en Noyer Sculpté':
            'Bahia Low Console in Carved Walnut',
        "Console basse Bahia en noyer foncé sculpté et ciré à la main, finition d'ébénisterie de l'atelier Maison Tripoli":
            'Bahia low console in dark carved walnut, hand-waxed, finished in the Maison Tripoli cabinetmaking workshop',
        'Correspondance privée':
            'Private correspondence',
        "Depuis plus de 70 ans, nos maîtres ébénistes allient le marbre du Levant, le noyer massif et les velours d'exception pour habiller les demeures les plus raffinées.":
            'For over seventy years our master cabinetmakers have combined Levantine marble, solid walnut and exceptional velvets to furnish the most refined residences.',
        "Durée de garantie sur l'ébénisterie":
            'Guarantee period on cabinetmaking',
        "Découvrir l'atelier &amp; la démarche RSE":
            'Discover the workshop &amp; our responsibility commitments',
        'Exemplaire atelier':
            'Workshop piece',
        'Fabrication locale à Tripoli':
            'Made locally in Tripoli',
        'Faire défiler vers les collections':
            'Scroll to the collections',
        "Fil d'Ariane":
            'Breadcrumb',
        "Garantie sur l'ébénisterie":
            'Cabinetmaking guarantee',
        'Immersion dans les résidences contemporaines habillées par les ateliers de la Maison.':
            "A look inside contemporary residences furnished by the Maison's workshops.",
        "L'usage réel de la pièce":
            'How the piece will actually be used',
        'La Noblesse des Matières Sélectionnées':
            'The Nobility of the Selected Materials',
        'La cohérence des matières':
            'Consistency across materials',
        'Langue':
            'Language',
        'Le grand savoir-faire libanais':
            'The great Lebanese craft tradition',
        'Le volume disponible':
            'The space available',
        'Les cinq collections de la Maison':
            "The Maison's five collections",
        'Maison Tripoli':
            'Maison Tripoli',
        "Maison Tripoli — retour à l'accueil":
            'Maison Tripoli — back to home',
        "Maison d'édition et manufacture de mobilier de prestige à Tripoli, Liban. Chaque création incarne un dialogue entre rigueur architecturale contemporaine et maîtrise artisanale méditerranéenne.":
            'A publishing house and manufacture of prestige furniture in Tripoli, Lebanon. Every creation embodies a dialogue between contemporary architectural rigour and Mediterranean craftsmanship.',
        'Maître Fadi Kabbara — Directeur de création,':
            'Master Fadi Kabbara — Creative director,',
        "Mobilier d'Art &amp; Haute Ébénisterie":
            'Art Furniture &amp; Fine Cabinetmaking',
        'Mon devis &amp; sélection':
            'My quote &amp; selection',
        'Noyer Royal de la Vallée :':
            'Royal Valley walnut:',
        'Noyer foncé':
            'Dark walnut',
        'Parole de maître ébéniste':
            'Words from a master cabinetmaker',
        'Recevez nos nouvelles éditions':
            'Receive our new editions',
        "Réservez un créneau d'accueil exclusif avec notre bureau d'architecture d'intérieur à Tripoli.":
            'Book a private appointment with our interior architecture studio in Tripoli.',
        "S'inscrire":
            'Subscribe',
        'Sculptés à Tripoli depuis 1948':
            'Carved in Tripoli since 1948',
        'Sur-mesure intégral':
            'Entirely made to measure',
        "Séchage naturel en grange à Tripoli pendant 18 mois, puis polissage ciré à la main avec une cire d'abeille biologique libanaise.":
            'Naturally air-dried in a Tripoli barn for eighteen months, then hand-polished with Lebanese organic beeswax.',
        'Sélectionnez une essence de finition :':
            'Choose a finish wood:',
        'Taux de fabrication locale':
            'Local manufacturing rate',
        'Travertin':
            'Travertine',
        "Tripoli (Al-Fayha'a)":
            "Tripoli (Al-Fayha'a)",
        'Tripoli Atelier':
            'Tripoli Atelier',
        'Un projet complet, du calepinage à la pose':
            'A complete project, from setting-out to installation',
        "Un salon exige 90 cm de recul devant l'assise, une table de réception 60 cm de largeur utile par convive. Nous vérifions votre plan avant de fixer les dimensions, pour éviter la pièce juste — et l'erreur coûteuse.":
            'A seating area needs 90 cm of clearance in front of the seat, a dining table 60 cm of usable width per guest. We check your plan before setting the dimensions, to avoid the piece that only just fits — and the costly mistake.',
        'Une maison se lit comme un ensemble : le noyer du salon peut reprendre dans la bibliothèque, le travertin de la table dans les sellets de la chambre. Nos ateliers conservent les nuanciers pour harmoniser vos commandes successives.':
            'A house reads as a whole: the walnut of the living room can return in the bookcase, the travertine of the table in the bedroom plinths. Our workshops keep the shade cards to harmonise your successive orders.',
        "Une table de famille qui accueille quatorze convives n'appelle pas le même plateau qu'une table de travail. Nous adaptons l'essence, l'épaisseur et la finition — huilée pour le contact, laquée pour l'apparat.":
            'A family table seating fourteen guests does not call for the same top as a work table. We adapt the wood, the thickness and the finish — oiled for everyday contact, lacquered for ceremony.',
        'Voir tous les projets livrés':
            'See all completed projects',
        'Votre adresse e-mail':
            'Your email address',
        'À Tripoli, chaque pièce prend racine dans le choix intransigeant des essences de bois locales et régionales, associées aux marbres extraits du bassin levantin et aux tissages européens.':
            'In Tripoli, every piece is rooted in an uncompromising choice of local and regional woods, combined with marble quarried in the Levantine basin and European weaves.',
        'Ébène noir':
            'Black ebony',
        'page d’accueil':
            'home page',
            /* Compléments : sélecteur de langue, rubans, données éditoriales */
        '* Tarifs hors droits de douane selon la destination. Frais de fret calculés sur étude technique.':
            '* Prices exclude customs duties, which depend on the destination. Freight is quoted after a technical review.',
        'Agencement &amp; boiseries': 'Fitted joinery &amp; panelling',
        'Assises &amp; réception': 'Seating &amp; receptions',
        'Boiseries intégrées et suite présidentielle': 'Built-in panelling and a presidential suite',
        'Catalogue — édition 2025': 'Catalogue — 2025 edition',
        "Chambre principale d'une résidence privée à Dubaï : boiseries intégrées et suite présidentielle en chêne fumé":
            'Master bedroom of a private Dubai residence: built-in smoked-oak panelling and a presidential suite',
        'Chambre sur mesure Maison Tripoli : boiseries en chêne fumé et tête de lit capitonnée en lin':
            'Made-to-measure Maison Tripoli bedroom: smoked-oak panelling and a padded linen headboard',
        'Chambres &amp; suites': 'Bedrooms &amp; suites',
        'Cinq collections, un même atelier': 'Five collections, one workshop',
        'Conditions de vente': 'Terms of sale',
        'Demeures réalisées': 'Completed residences',
        'Découvrir la collection': 'Discover the collection',
        'Découvrir le sur-mesure': 'Discover bespoke work',
        'Découvrir les collections': 'Discover the collections',
        "Enfilade cannelée en noyer massif et marbre noir, menuiserie d'art de l'atelier Maison Tripoli":
            'Fluted solid-walnut sideboard with black marble, art joinery from the Maison Tripoli workshop',
        'Espace professionnels': 'Professionals',
        'Expéditions': 'Shipping',
        "Finitions disponibles sur l'ensemble des collections —": 'Finishes available across all collections —',
        "L'Atelier": 'The Workshop',
        "L'histoire de Tripoli": 'The history of Tripoli',
        "L'âme de la ville": 'The soul of the city',
        'Laiton &amp; pierre': 'Brass &amp; stone',
        'Laiton patiné &amp; bronze': 'Patinated brass &amp; bronze',
        'Livraison, pose &amp; installation internationale': 'International delivery, fitting and installation',
        'Loro Piana': 'Loro Piana',
        "Lustre en laiton massif martelé et objets en travertin, éclairage d'art Maison Tripoli":
            'Hand-hammered solid-brass chandelier and travertine objects, Maison Tripoli art lighting',
        'Marbre noir Marquina': 'Marquina black marble',
        'Marbrerie levantine': 'Levantine marble work',
        'Marbriers du Nord-Liban': 'North Lebanon stonemasons',
        "Maître ébéniste travaillant le noyer à l'établi dans l'atelier de menuiserie d'art de Maison Tripoli au Liban":
            "Master cabinetmaker shaping walnut at the bench in Maison Tripoli's art-joinery workshop in Lebanon",
        'Mentions légales': 'Legal notice',
        'Menuiserie &amp; rangement': 'Joinery &amp; storage',
        'Menuiserie d’art': 'Art joinery',
        'Nos conseillers vous reçoivent au showroom de Tripoli ou vous répondent sous 24 heures pour un devis, un plan de teinte ou une estimation de délai.':
            'Our advisers welcome you at the Tripoli showroom, or answer within 24 hours with a quote, a finish plan or a lead-time estimate.',
        'Nos maîtres ébénistes': 'Our master cabinetmakers',
        'Notre méthode': 'Our method',
        'Nous fabriquons chaque pièce à la cote, sur mesure. Transmettez-nous votre plan ou vos dimensions : nous vous répondons sous 24 heures avec une proposition chiffrée.':
            'Every piece is made to measure. Send us your plan or your dimensions: we reply within 24 hours with a costed proposal.',
        'Penthouse Sursock': 'Penthouse Sursock',
        'Pierre Frey': 'Pierre Frey',
        'Private Estate': 'Private Estate',
        'Prototypes de teinte &amp; nomenclatures matières': 'Finish prototypes &amp; material schedules',
        'Rangements &amp; bureaux': 'Storage &amp; desks',
        'Relevé sur site &amp; dessins d’exécution': 'On-site surveys &amp; shop drawings',
        'Restauration de mobilier': 'Furniture restoration',
        'Rubelli': 'Rubelli',
        'Réserver une visite privée': 'Book a private visit',
        'Salle à manger de la Villa Al-Bahr à Tripoli : table en chêne blanchi et chaises en cuir sellier cousues main':
            'Dining room of Villa Al-Bahr in Tripoli: bleached-oak table and hand-stitched saddle-leather chairs',
        'Salle à manger équipée par Maison Tripoli : table de réception en chêne blanchi et chaises de cuir':
            'Dining room furnished by Maison Tripoli: bleached-oak dining table and leather chairs',
        'Salles à manger': 'Dining rooms',
        "Salon contemporain habillé par Maison Tripoli : canapé en noyer massif et lin écru, ébénisterie d'art à Tripoli":
            'Contemporary living room by Maison Tripoli: solid-walnut sofa in ecru linen, art cabinetmaking in Tripoli',
        'Salon de réception meublé par Maison Tripoli : assises en noyer massif et velours grège':
            'Reception room furnished by Maison Tripoli: solid-walnut seating in greige velvet',
        'Salon du Penthouse Sursock à Beyrouth : canapé sur-mesure en noyer et velours grège signé Maison Tripoli':
            'Living room of the Sursock Penthouse in Beirut: bespoke walnut sofa in greige velvet by Maison Tripoli',
        'Salon sur-mesure noyer et velours grège': 'Bespoke walnut and greige-velvet living room',
        'Salons &amp; banquettes': 'Living rooms &amp; banquettes',
        'Service sur-mesure': 'Bespoke service',
        'Showroom': 'Showroom',
        'Suites &amp; repos': 'Suites &amp; rest',
        'Sur-Mesure': 'Bespoke',
        'Table en chêne blanchi et chaises cuir sellier': 'Bleached-oak table and saddle-leather chairs',
        'Tables &amp; réception': 'Tables &amp; receptions',
        'Tanneries partenaires': 'Partner tanneries',
        'Tisserands partenaires': 'Partner weavers',
        'Travertin du bassin levantin': 'Levantine travertine',
        'Trois critères avant de commander': 'Three criteria before ordering',
        'Un projet, une pièce ou une simple question ?': 'A project, a single piece, or just a question?',
        'Une dynastie de menuisiers au cœur de la Méditerranée': 'A dynasty of cabinetmakers at the heart of the Mediterranean',
        'Villa Al-Bahr': 'Villa Al-Bahr',
        'Visiter le showroom': 'Visit the showroom',
        'Voir toutes les collections': 'See all the collections',
        'Vous ne trouvez pas la dimension exacte ?': 'Can’t find the exact size?',
        '« Tripoli est le berceau séculaire du bois noble. Nous ne construisons pas de simples meubles ; nous forgeons des pièces de famille destinées à traverser les générations. »':
            '“Tripoli is the age-old cradle of noble wood. We do not build mere furniture; we forge family pieces made to outlive generations.”',
        'Ébénisterie sur-mesure': 'Bespoke cabinetmaking',
        "Éclairage &amp; objets d'art": 'Lighting &amp; objets d’art',
        'Éclairage sur-mesure': 'Bespoke lighting',
        'Écrire à la Maison': 'Write to the Maison',
        'Canapés modulaires, banquettes de réception et fauteuils clubs dessinés pour les grands salons, dans le noyer massif et le cuir pleine fleur de nos ateliers.':
            'Modular sofas, reception banquettes and club armchairs drawn for large living rooms, in the solid walnut and full-grain leather of our workshops.',
        'Enfilades cannelées, consoles d’entrée et bureaux d’apparat : la menuiserie d’art de nos maîtres ébénistes, du tiroir à fond de velours à la façade cannelée main.':
            'Fluted sideboards, entrance consoles and formal desks: art joinery by our master cabinetmakers, from velvet-lined drawers to hand-fluted fronts.',
        'Lits king size, têtes de lit capitonnées et boiseries murales dessinés aux cotes exactes de votre chambre, jusqu’aux sous-combles et pans coupés.':
            'King-size beds, padded headboards and wall panelling drawn to the exact dimensions of your bedroom, right up to attic slopes and cut corners.',
        'Lustres en laiton massif martelé du Souk des Cuivres, sellets en travertin et pièces d’art : la touche finale qui fait lire un intérieur comme une composition.':
            'Chandeliers in hand-hammered solid brass from the Coppersmiths’ Souk, travertine side tables and objets d’art: the final touch that makes an interior read as a composition.',
        "Tables de réception monolithiques, tables d'appoint cérusées et plateaux de pierre naturelle, dimensionnés pour vos repas et vos volumes.":
            'Monolithic dining tables, cerused side tables and natural-stone tops, sized for your meals and your rooms.',
        "incarne l'épicentre du mobilier haut de gamme au Moyen-Orient. Nos ateliers transmettent toujours l'assemblage en queue d'aronde, le panneautage à plate-bande et la marqueterie.":
            'is the epicentre of high-end furniture in the Middle East. Our workshops still pass on dovetail joinery, raised-panel framing and marquetry.',
        'voir les cinq collections':
            'see the five collections',
        'Atelier &amp; Showroom Tripoli • Rue des Ébénistes':
            'Atelier &amp; Showroom Tripoli • Cabinetmakers’ Street',
        'Mobilier &amp; art de vivre, Tripoli, Liban.':
            'Furniture &amp; the art of living, Tripoli, Lebanon.',
        'République libanaise':
            'Republic of Lebanon',
        "Boulevard Fouad Chehab, Quartier des Ateliers d'Art":
            "Boulevard Fouad Chehab, Artisans' Quarter",

        Tripoli:
            'Tripoli',


        /* Champs éditoriaux des pages de collection */
        'Agencement':
            'Fitting out',
        'Ajuster le salon à votre volume, pas l’inverse':
            'Fit the living room to your space, not the other way round',
        'Assurez-vous la pose des boiseries ?':
            'Do you fit the panelling yourselves?',
        "Au-delà de la pièce isolée, nous réalisons des murs de rangement complets : bibliothèques toute hauteur, niches éclairées, portes escamotables qui masquent un bureau ou un dressing. Le calepinage est dessiné pour que chaque porte s'aligne avec les lignes de la pièce.":
            'Beyond the single piece, we build complete storage walls: full-height bookcases, lit niches and concealed doors that hide a desk or a dressing room. The layout is drawn so that every door lines up with the lines of the room.',
        'Banquette Sursock en noyer massif et velours grège, assise sur-mesure de salon de réception':
            'Sursock banquette in solid walnut and greige velvet, made-to-measure seating for a reception room',
        'Banquette de réception inspirée des salons beyrouthins du début du siècle : assise galbée, dossier bas et piètement fuselé tourné à la main. Le velours grège est sélectionné chez nos tisserands partenaires, le bois issu du séchage lent de nos propres granges.':
            'A reception banquette inspired by the Beirut salons of the early twentieth century: a curved seat, a low back and a hand-turned tapered base. The greige velvet comes from our partner weavers; the wood is slowly dried in our own barns.',
        'Banquette « Sursock »':
            'Sursock Banquette',
        "Boiseries &amp; Tête de Lit sur-Mesure « Al-Fayha'a »":
            'Bespoke Panelling &amp; Headboard “Al-Fayha’a”',
        "Boiseries murales et tête de lit sur-mesure en chêne pour chambre d'une résidence Maison Tripoli":
            'Made-to-measure oak wall panelling and headboard for a bedroom in a Maison Tripoli residence',
        "Boiseries murales et têtes de lit dessinées à la demande pour les chambres aux géométries complexes : pans coupés, soupentes, sous-combles. Nous fournissons les plans d'exécution, le calepinage et les prototypes de teinte avant toute mise en fabrication dans notre atelier de Tripoli.":
            'Wall panelling and headboards drawn to order for bedrooms with awkward geometry: cut corners, mezzanines, attic spaces. We provide shop drawings, layout plans and finish prototypes before anything is made in our Tripoli workshop.',
        'Bureau Ministre « Citadelle »':
            'Citadelle Ministerial Desk',
        "Bureau d'apparat à caissons, laqué satiné à l'ancienne en sept couches successives dans nos ateliers de Tripoli. Le plateau est protégé par un cuir patiné, les poignées fondues en bronze massif et ajustées à la main sur chaque tiroir.":
            'A formal panelled desk, satin-lacquered in seven successive coats the old way in our Tripoli workshops. The top is protected by a patinated leather, and the handles are cast in solid bronze and hand-fitted to each drawer.',
        'Bureau ministre Citadelle en ébène teinté et laque satinée avec poignées en bronze massif':
            'Citadelle ministerial desk in stained ebony and satin lacquer with solid-bronze handles',
        'Canapé Modulaire « Al-Mina »':
            'Al-Mina Modular Sofa',
        'Canapé modulaire':
            'Modular sofa',
        'Canapé modulaire Al-Mina en noyer massif huilé et lin bouclé écru, ébénisterie Maison Tripoli à Tripoli':
            'Al-Mina modular sofa in oiled solid walnut and ecru bouclé linen, Maison Tripoli cabinetmaking in Tripoli',
        'Canapés, banquettes et fauteuils façonnés main à Tripoli : noyer massif, lin bouclé et cuir pleine fleur. Sur mesure, livraison internationale.':
            'Sofas, banquettes and armchairs shaped by hand in Tripoli: solid walnut, bouclé linen and full-grain leather. Made to measure, shipped worldwide.',
        'Capitonnage, matières et respiration du sommeil':
            'Upholstery, materials and the breathability of sleep',
        'Caractéristiques de la collection':
            'Collection specifications',
        'Ce qui distingue cette collection':
            'What sets this collection apart',
        'Chambres &amp; Lits sur-Mesure à Tripoli | Maison Tripoli':
            'Bespoke Bedrooms &amp; Beds in Tripoli | Maison Tripoli',
        'Chambres &amp; Suites de Nuit sur-Mesure à Tripoli':
            'Made-to-Measure Bedrooms &amp; Night Suites in Tripoli',
        'Chambres &amp; suites de nuit':
            'Bedrooms &amp; night suites',
        "Chaque cannelure est fraisée, ébarbée puis poncée à la main, et la façade est finie d'un seul geste continu pour éviter les surépaisseurs dans les creux. Les teintes sont validées sur panneau témoin avant finition définitive.":
            'Each flute is milled, deburred and sanded by hand, and the front is finished in one continuous pass to avoid build-up in the hollows. Colours are approved on a sample board before the final finish.',
        "Chaque pièce est ciselée, assemblée puis patinée à la main : deux exemplaires d'un même modèle ne se ressemblent jamais tout à fait, ce qui en fait des pièces signées plutôt que des objets industrialisés.":
            'Every piece is chased, assembled and patinated by hand: no two examples of the same model are ever quite identical, which makes them signed pieces rather than mass-produced objects.',
        "Chaque pièce est déclinable : longueur du module, profondeur d'assise, hauteur de dossier, choix du tissu et de la teinte du bois. Vous validez un prototype de teinte avant lancement, et nous fabriquons pour votre volume, pas pour un standard.":
            'Every piece can be varied: module length, seat depth, back height, fabric and wood tone. You approve a finish prototype before production starts, and we build for your room, not for a standard.',
        "Chef-d'œuvre des ateliers du port d'Al-Mina : structure apparente en noyer foncé de la vallée, coussins d'assise garnis de plumes et lin bouclé de première sélection. Chaque module est ajustable pour composer un salon sur-mesure, du trois places à la composition d'angle.":
            'A masterpiece from the workshops of Al-Mina harbour: an exposed frame in dark valley walnut, seat cushions filled with feathers and first-grade bouclé linen. Each module adjusts to compose a made-to-measure living room, from a three-seater to a corner arrangement.',
        'Chêne blanchi, piètement arqué, vernis déperlant':
            'Bleached oak, arched base, water-repellent varnish',
        'Chêne cérusé, finition huilée mate':
            'Cerused oak, matt oiled finish',
        'Chêne fumé libanais, lin capitonné écru':
            'Lebanese smoked oak, ecru padded linen',
        'Chêne fumé, boiseries intégrées, laiton brossé':
            'Smoked oak, built-in panelling, brushed brass',
        'Chêne massif sculpté, travertin adouci':
            'Carved solid oak, softened travertine',
        'Chêne, noyer ou ébène — teintes personnalisées':
            'Oak, walnut or ebony — custom tones',
        'Chêne, travertin et marbre du bassin levantin':
            'Oak, travertine and Levantine marble',
        "Colonne d'exposition taillée dans un bloc unique de travertin, adoucie et chanfreinée par nos marbriers partenaires du Nord-Liban. Pensée pour mettre en valeur une céramique, une sculpture ou une lampe, elle porte le veinage naturel de la pierre d'un seul tenant.":
            'A display column cut from a single block of travertine, softened and chamfered by our partner stonemasons in North Lebanon. Designed to set off a ceramic, a sculpture or a lamp, it carries the stone’s natural veining in one piece.',
        'Combien de temps faut-il pour fabriquer un canapé sur mesure à Tripoli ?':
            'How long does a made-to-measure sofa take to build in Tripoli?',
        'Comment se déroule un projet de chambre sur mesure ?':
            'How does a bespoke bedroom project run?',
        'Comment sont finies les façades cannelées ?':
            'How are the fluted fronts finished?',
        "Comptez huit à douze semaines pour une suite complète (tête de lit, boiseries, chevets et banc), et deux semaines supplémentaires pour la pose et les réglages. Une suite simple — lit et chevets — s'établit plutôt entre cinq et sept semaines.":
            'Allow eight to twelve weeks for a complete suite (headboard, panelling, bedside tables and bench), plus two weeks for fitting and adjustments. A simple suite — bed and bedside tables — is closer to five to seven weeks.',
        'Comptez quatre à six semaines entre la validation du prototype de teinte et la livraison, pour une pièce du catalogue. Un salon complet de plusieurs modules demandera plutôt six à huit semaines. Le délai vous est confirmé par écrit au moment du devis.':
            'Allow four to six weeks between approval of the finish prototype and delivery for a catalogue piece. A complete living room of several modules will take closer to six to eight weeks. The lead time is confirmed in writing with your quote.',
        'Confort':
            'Comfort',
        'Console Basse « Bahia »':
            'Bahia Low Console',
        'Console basse Bahia en noyer royal sculpté et ciré à la main, mobilier d’entrée Maison Tripoli':
            'Bahia low console in carved royal walnut, hand-waxed, Maison Tripoli entrance furniture',
        "Console d'entrée ou de salon taillée dans un noyer royal séché 18 mois en grange, puis polie et cirée à la main à la cire d'abeille biologique libanaise. Deux tiroirs à fond de velours et une niche ouverte pour les objets du quotidien.":
            'An entrance or living-room console carved from royal walnut barn-dried for 18 months, then polished and hand-waxed with organic Lebanese beeswax. Two velvet-lined drawers and an open niche for everyday objects.',
        'Cuir pleine fleur tanné végétal, laiton bronze antique':
            'Vegetable-tanned full-grain leather, antique bronze brass',
        "Côté bureau, nous travaillons des pièces d'apparat à caissons, laquées à l'ancienne en sept couches, avec cuir patiné et poignées de bronze massif fondu puis ajusté à la main sur chaque façade.":
            'For desks, we build formal panelled pieces, lacquered the old way in seven coats, with patinated leather and solid-bronze handles cast and hand-fitted to each front.',
        "Dessinée pour une résidence balnéaire du littoral de Tripoli : chêne blanchi à la main, piètement arqué qui libère l'assise des convives et plateau traité pour résister aux embruns. Une pièce pensée pour les repas d'été en bord de mer.":
            'Designed for a seaside residence on the Tripoli coast: hand-bleached oak, an arched base that frees the diners’ legs and a top treated to withstand sea spray. A piece made for summer meals by the water.',
        'Dinanderie':
            'Copperwork',
        'Du meuble isolé au mur de rangement':
            'From a single piece to a whole storage wall',
        'Du plan d’architecte au plateau posé':
            'From the architect’s plan to the fitted top',
        "Elles peuvent porter une gravure discrète — monogramme, date, nom de lieu — exécutée à la main. Une manière de marquer une pièce offerte, une distinction ou la livraison d'une résidence.":
            'They can carry a discreet engraving — a monogram, a date, a place name — cut by hand. A way to mark a gift, a distinction or the handover of a residence.',
        'Enfilade Tell Raymond aux façades cannelées faites main et plateau en marbre noir Marquina':
            'Tell Raymond sideboard with hand-fluted fronts and a Marquina black marble top',
        'Enfilade « Tell Raymond »':
            'Tell Raymond Sideboard',
        "Enfilades cannelées, consoles et bureaux d'apparat en noyer et ébène massifs, laqués et cirés à la main dans notre atelier de Tripoli, au Liban.":
            'Fluted sideboards, consoles and formal desks in solid walnut and ebony, hand-lacquered and waxed in our Tripoli workshop, Lebanon.',
        'Enfilades, Commodes &amp; Bureaux en Bois Massif':
            'Sideboards, Chests &amp; Desks in Solid Wood',
        'Enfilades, Commodes &amp; Bureaux à Tripoli | Maison Tripoli':
            'Sideboards, Chests &amp; Desks in Tripoli | Maison Tripoli',
        'Ensemble Lit « Qadisha »':
            'Qadisha Bed Set',
        'Ensemble lit Qadisha à tête de lit capitonnée en lin écru et structure en chêne fumé libanais':
            'Qadisha bed set with padded ecru linen headboard and Lebanese smoked-oak frame',
        'Fabrication':
            'Making',
        'Fauteuil Club « Miramar »':
            'Miramar Club Armchair',
        'Fauteuil club Miramar en cuir pleine fleur tanné végétal et piètement en laiton bronze':
            'Miramar club armchair in vegetable-tanned full-grain leather with antique bronze brass base',
        'Façades composées de 120 cannelures fraisées individuellement par nos maîtres menuisiers tripolitains, plateau en marbre noir Marquina et charnières amorties. Un rangement de réception qui dialogue avec les pierres sombres de la citadelle.':
            'Fronts made of 120 flutes milled individually by our master joiners in Tripoli, a Marquina black marble top and soft-close hinges. A reception piece that converses with the dark stones of the citadel.',
        "Façonné à Tripoli selon les traditions de l'ébénisterie fine. Structure équilibrée en noyer massif, mousse haute résilience et revêtement sur-mesure.":
            'Shaped in Tripoli in the tradition of fine cabinetmaking. A balanced solid-walnut frame, high-resilience foam and a made-to-measure cover.',
        'Finitions disponibles':
            'Available finishes',
        'Garantie structure':
            'Frame warranty',
        "Hommage aux forêts séculaires de la Qadisha. Tête de lit sculptée dans un chêne fumé libanais et alcôve capitonnée en lin écru déperlant. L'ensemble est réalisé aux dimensions exactes de votre chambre, avec chevets et banc de pied assortis sur demande.":
            'A tribute to the age-old forests of the Qadisha valley. A headboard carved from Lebanese smoked oak and an alcove upholstered in water-repellent ecru linen. The set is made to the exact dimensions of your bedroom, with matching bedside tables and a foot bench on request.',
        'Inspirée par la pierre historique de la forteresse Raymond de Saint-Gilles à Tripoli. Piétement sculpté à la gouge dans une seule pièce de chêne et plateau de travertin adouci, chanfreiné par nos marbriers du Nord-Liban. Une table de réception dimensionnée pour douze convives.':
            'Inspired by the historic stone of the Raymond de Saint-Gilles fortress in Tripoli. A base gouge-carved from a single block of oak and a softened travertine top, chamfered by our stonemasons in North Lebanon. A dining table sized for twelve guests.',
        'Intervenez-vous sur un relevé de cotes sur place ?':
            'Do you carry out on-site measurements?',
        'L 260 × P 105 × H 76 cm':
            'L 260 × D 105 × H 76 cm',
        "L'assise, du bois brut au garnissage":
            'The seat, from raw wood to upholstery',
        'La cannelure, la laque et le marbre':
            'Fluting, lacquer and marble',
        "La chambre est la pièce où le sur-mesure prend tout son sens : les murs y sont rarement droits, la fenêtre rarement centrée et le plafond parfois en pente. C'est précisément là qu'un agencement dessiné à la cote devient nécessaire, et qu'un lit standard montre ses limites.":
            'The bedroom is where bespoke work makes most sense: walls are rarely square, the window rarely centred, the ceiling sometimes sloped. This is precisely where joinery drawn to measure becomes necessary — and where a standard bed shows its limits.',
        "La finition est protéinée ou patinée antique : le laiton se patine naturellement avec le temps, ce qui est recherché ; un vernis incolore optionnel permet de figer l'éclat initial si vous préférez éviter les marques du temps.":
            'The finish is either protein-sealed or antique-patinated: brass patinates naturally over time, which is what people want; an optional clear lacquer freezes the original shine if you would rather avoid the marks of time.',
        "La hauteur est réglable à la pose au moyen d'un câble acier et d'un raccord vissé, de 60 cm à 200 cm. Pour les architectures à grande hauteur, nous fournissons un câblage de longueur spécifique sur simple indication de la hauteur finie souhaitée.":
            'Height is adjusted on site with a steel cable and a threaded connector, from 60 cm to 200 cm. For tall spaces we supply a cable of specific length as soon as you tell us the finished height you want.',
        "La livraison s'effectue sous gants blancs, avec montage du piétement sur place et contrôle du niveau au laser. Nous repartons avec les chutes de découpe, et vous avec la garantie de conformité signée.":
            'Delivery is made in white gloves, with the base assembled on site and levelling checked by laser. We leave with the offcuts and you keep the signed certificate of conformity.',
        "La salle à manger est la pièce du rassemblement. Une table doit offrir le bon dégagement par convive — soixante centimètres minimum — sans encombrer la circulation. Nous étudions votre plan, proposons les dimensions justes et vérifions l'implantation avant de débiter le premier plateau.":
            'The dining room is where people gather. A table must give each guest the right elbow room — sixty centimetres minimum — without blocking the flow of the room. We study your plan, propose the right dimensions and check the layout before cutting the first top.',
        "La structure d'ébénisterie est garantie 30 ans contre tout vice de fabrication. Le garnissage et les revêtements bénéficient d'une garantie de 5 ans. Sont exclus les dommages liés à un usage non conforme ou à une exposition prolongée à l'humidité.":
            'The cabinetmaking frame is guaranteed for 30 years against any manufacturing defect. Upholstery and covers carry a 5-year warranty. Damage from misuse or prolonged exposure to damp is excluded.',
        "Laiton lourd façonné au marteau dans les ruelles du Souk des Cuivres de Tripoli, suspension réglable et diffusion lumineuse chaude. Chaque facette est débitée, ciselée puis patinée à la main : aucune pièce n'est identique à une autre.":
            'Heavy brass shaped by hammer in the alleys of Tripoli’s Coppersmiths’ Souk, adjustable suspension and warm light diffusion. Every facet is cut, chased and patinated by hand: no two pieces are alike.',
        'Laiton massif martelé à la main':
            'Hand-hammered solid brass',
        'Le cadre est en chêne, noyer ou ébène massif. Le garnissage associe une mousse technique à densités différenciées et un textile respirant : lin lavé, laine déperlante ou velours. Les tissus synthétiques sont déconseillés pour préserver le confort de respiration du couchage.':
            'The frame is solid oak, walnut or ebony. The upholstery combines technical foam at differentiated densities with a breathable textile: washed linen, water-repellent wool or velvet. Synthetic fabrics are not recommended, to preserve the breathability of the bed.',
        "Le chêne de nos plateaux provient de fûts sélectionnés pour la régularité de leur veinage, débités en plots larges afin d'éviter les joints disgracieux au centre de la table. Le chêne blanchi, cérusé ou fumé est travaillé à la main dans l'atelier.":
            'The oak for our tops comes from logs selected for the regularity of their grain, sawn into wide planks to avoid ugly joints at the centre of the table. Bleached, cerused or smoked oak is worked by hand in the workshop.',
        "Le garnissage est réalisé à l'ancienne : sangles de jute tendues, ressorts noyés, plumes d'oie enveloppées dans des toiles de coton. Le revêtement est coupé et posé par un tapissier qui ajuste les raccords de motif à la main.":
            'Upholstery is done the old way: taut jute webbing, pocketed springs, goose feathers wrapped in cotton cloth. The cover is cut and fitted by an upholsterer who aligns pattern repeats by hand.',
        "Le laiton brut évolue naturellement vers une teinte ambrée puis plus profonde : c'est une patine recherchée, qui garde la mémoire du toucher. Une finition protéinée peut figer l'éclat d'origine si vous préférez une lecture constante.":
            'Raw brass naturally deepens from amber to a darker tone: a sought-after patina that keeps a memory of every touch. A protein finish can freeze the original shine if you prefer a constant look.',
        "Le laiton est mis en forme au marteau sur des formes de bois, puis recuit pour retrouver sa ductilité avant d'être retravaillé. Le ciselage se fait à froid, à l'aide de poinçons et de burins : c'est cette étape qui creuse les facettes et fabrique la diffusion lumineuse si particulière des lustres de Tripoli.":
            'The brass is hammered into shape over wooden forms, then annealed to regain its ductility before being worked again. Chasing is done cold, with punches and gravers: this is the step that hollows the facets and creates the very particular light diffusion of Tripoli chandeliers.',
        'Le laiton se patine-t-il avec le temps ?':
            'Does brass patinate over time?',
        'Le laiton, du Souk des Cuivres à votre plafond':
            'Brass, from the Coppersmiths’ Souk to your ceiling',
        "Le noyer est sélectionné en grume, débité puis séché lentement dans nos granges du Nord-Liban pendant dix-huit mois. Vient ensuite l'assemblage à queue d'aronde et tenon-mortaise, sans vis apparente, qui garantit la tenue du cadre sur plusieurs décennies.":
            'The walnut is selected in the log, sawn and then slowly dried in our barns in North Lebanon for eighteen months. Then comes dovetail and mortise-and-tenon assembly, with no visible screws, which keeps the frame sound for decades.',
        "Le noyer et le chêne offrent la meilleure stabilité pour un plan de travail, l'ébène teinté et le laqué étant réservés aux pièces d'apparat. Le plateau peut recevoir un cuir patiné collé à chaud, insensible aux variations d'humidité.":
            'Walnut and oak offer the best stability for a working surface, while stained ebony and lacquer are reserved for formal pieces. The top can take a patinated leather, hot-bonded and unaffected by changes in humidity.',
        'Le plateau en travertin craint-il les taches ?':
            'Does the travertine top stain?',
        "Le rangement est le révélateur d'un intérieur : c'est lui qui libère les surfaces et donne sa respiration à une pièce. Nos enfilades, commodes et consoles sont dessinées autour de vos objets, avec des profondeurs utiles pensées pour le linge de table, la vaisselle ou la documentation.":
            'Storage reveals what an interior really is: it frees the surfaces and lets a room breathe. Our sideboards, chests and consoles are drawn around your possessions, with useful depths designed for table linen, china or paperwork.',
        'Le travertin est une pierre poreuse par nature : nous appliquons systématiquement un traitement hydrofuge et oléofuge en deux passes après le polissage. Un essuyage rapide suffit alors au quotidien. Une réimprégnation est conseillée tous les deux ans.':
            'Travertine is porous by nature: we always apply a water- and oil-repellent treatment in two passes after polishing. A quick wipe is then enough day to day. Re-impregnation every two years is recommended.',
        "Le travertin et le marbre sont débités et chanfreinés par nos marbriers partenaires de la région du Nord-Liban. Les dalles sont choisies côte à côte pour que le veinage se poursuive d'un bout à l'autre du plateau, puis adoucies et traitées contre les taches.":
            'Travertine and marble are cut and chamfered by our partner stonemasons in North Lebanon. Slabs are chosen side by side so the veining continues across the whole top, then softened and treated against stains.',
        "Les finitions varient selon l'usage : cirée à la cire d'abeille pour les bois nobles qui doivent se patiner, laquée satinée pour les pièces d'apparat, huilée pour les surfaces de contact fréquent. Les plateaux de marbre sont choisis avec vous en atelier, sur dalle.":
            'Finishes vary with use: beeswax for noble woods that should patinate, satin lacquer for formal pieces, oil for surfaces in frequent contact. Marble tops are chosen with you at the workshop, from the slab.',
        'Lits, têtes de lit capitonnées et boiseries de chambre sur mesure, façonnés à Tripoli en chêne fumé et lin. Étude sur plan ou relevé de cotes sur place.':
            'Beds, padded headboards and bespoke bedroom panelling, shaped in Tripoli in smoked oak and linen. Study from plans or on-site measurements.',
        'Livrez-vous les salons à l’étranger ?':
            'Do you deliver living rooms abroad?',
        'Lustre Géométrique « Khan »':
            'Khan Geometric Chandelier',
        'Lustre géométrique Khan en laiton massif martelé à la main, éclairage d’art de Tripoli':
            'Khan geometric chandelier in hand-hammered solid brass, Tripoli art lighting',
        "Lustres en Laiton &amp; Objets d'Art à Tripoli | Maison Tripoli":
            'Brass Chandeliers &amp; Objets d’Art in Tripoli | Maison Tripoli',
        "Lustres en laiton massif martelé du Souk des Cuivres, sellets et objets en travertin : pièces d'art façonnées main dans notre atelier de Tripoli, Liban.":
            'Chandeliers in hand-hammered solid brass from the Coppersmiths’ Souk, travertine side tables and objects: art pieces shaped by hand in our Tripoli workshop, Lebanon.',
        'Matières':
            'Materials',
        "Menuiserie d'art":
            'Art joinery',
        'Méthode':
            'Method',
        "Nos plateaux sont massifs, bordés à la main et protégés par une finition huilée ou un cuir patiné. Le piétement est choisi pour libérer l'assise des jambes : monolithe sculpté, arche centrale ou deux pieds en V inversé selon le style du lieu.":
            'Our tops are solid, hand-edged and protected by an oiled finish or a patinated leather. The base is chosen to free the sitters’ legs: a carved monolith, a central arch or two inverted V legs, depending on the style of the place.',
        "Nous concevons des ensembles complets — tête de lit, boiseries, chevets suspendus, bac de lit et banc de pied — dans un même langage de matières. L'ensemble est ensuite fabriqué dans notre atelier de Tripoli et posé par nos soins.":
            'We design complete sets — headboard, panelling, hanging bedside tables, bed tray and foot bench — in one shared language of materials. The set is then made in our Tripoli workshop and fitted by our own team.',
        "Nous démarrons par un relevé de cotes, sur place au Liban ou sur plan pour l'étranger, puis nous produisons les élévations et le plan d'implantation. Après validation des teintes et des textiles, la fabrication en atelier prend huit à quatorze semaines selon l'ampleur des boiseries.":
            'We start with measurements, on site in Lebanon or from plans abroad, then produce elevations and a layout plan. Once colours and textiles are approved, workshop production takes eight to fourteen weeks depending on the extent of the panelling.',
        'Nous expédions en Europe, dans le Golfe et en Afrique du Nord. Les pièces sont emballées en caisse bois sur mesure, manipulées sous gants blancs et dédouanées par notre transitaire. Les frais de fret sont calculés après étude du volume et de la destination.':
            'We ship to Europe, the Gulf and North Africa. Pieces are packed in made-to-measure wooden crates, handled in white gloves and cleared by our freight forwarder. Freight is quoted after reviewing volume and destination.',
        "Nous fabriquons les assises assorties — chaises à dossier plein, chaises-coques en cuir sellier ou bancs filants — dans la même essence et avec le même traitement de finition, afin que l'ensemble lise comme une pièce unique.":
            'We make the matching seating — solid-back chairs, saddle-leather shell chairs or long benches — in the same species and with the same finish, so the whole reads as a single piece.',
        'Noyer massif huilé, lin bouclé écru, garnissage plumes':
            'Oiled solid walnut, ecru bouclé linen, feather filling',
        'Noyer massif, marbre noir Marquina':
            'Solid walnut, Marquina black marble',
        'Noyer massif, velours grège, piètement fuselé':
            'Solid walnut, greige velvet, tapered base',
        'Noyer royal ciré à la cire d’abeille':
            'Royal walnut waxed with beeswax',
        'Objets':
            'Objects',
        "Oui, c'est le cœur de notre service aux professionnels : lecture de plans, dessins d'exécution, prototypes de teinte, nomenclatures matières et livraison sur chantier. Nous intervenons du Liban à l'Europe et au Golfe.":
            'Yes — that is the core of our service to professionals: reading plans, shop drawings, finish prototypes, material schedules and delivery to site. We work from Lebanon to Europe and the Gulf.',
        "Oui, chaque assise est déclinable au centimètre : longueur, profondeur, hauteur d'assise et de dossier. Côté revêtement, nous travaillons avec les tissus Rubelli, Pierre Frey et Loro Piana, ainsi qu'avec le cuir pleine fleur tanné végétal de nos tanneries partenaires.":
            'Yes, every seat can be varied to the centimetre: length, depth, seat and back height. For covers we work with Rubelli, Pierre Frey and Loro Piana fabrics, as well as vegetable-tanned full-grain leather from our partner tanneries.',
        "Oui, chaque luminaire est câblé avec des douilles en céramique, du fil doublement isolé et des raccords conformes aux exigences CE et IEC. Un marquage et une notice de montage accompagnent la livraison ; l'installation doit être réalisée par un électricien qualifié.":
            'Yes, every light fitting is wired with ceramic lampholders, double-insulated cable and connectors that meet CE and IEC requirements. Marking and assembly instructions come with the delivery; installation must be carried out by a qualified electrician.',
        'Oui, nos enfilades se déclinent de 120 à 400 cm, avec un nombre de portes et de caissons ajustable. Le pas des cannelures est recalculé pour rester régulier quelle que soit la longueur finale, sans cannelure coupée en bout.':
            'Yes, our sideboards are made from 120 to 400 cm, with an adjustable number of doors and sections. The flute pitch is recalculated to stay regular whatever the final length, with no flutes cut short at the ends.',
        "Oui, nos équipes assurent la pose au Liban, y compris les murs de rangement toute hauteur et les bibliothèques intégrées. À l'étranger, nous formons les équipes de pose locales et supervisons le chantier par visioconférence ou sur site.":
            'Yes, our teams handle fitting in Lebanon, including full-height storage walls and built-in bookcases. Abroad, we train the local fitting teams and supervise the site by video call or in person.',
        "Oui, partout au Liban, généralement dans les dix jours suivant la validation d'intention. À l'étranger, nous travaillons sur plans vérifiés par votre architecte et nous nous déplaçons pour la pose finale, une fois les ouvrages prêts à recevoir.":
            'Yes, anywhere in Lebanon, usually within ten days of agreeing the intent. Abroad, we work from plans checked by your architect and travel for the final fitting once the works are ready.',
        "Petite table d'usage, dite « de portage », dont le veinage linéaire est sélectionné à la gouge puis cérusé à la main. Finition sablée et huilée mat pour préserver la clarté méditerranéenne du bois. Idéale en accoudoir de canapé ou en chevet de grande suite.":
            'A small occasional table, known as a carrying table, whose straight grain is chosen with the gouge and then cerused by hand. Sanded and matt-oiled to preserve the Mediterranean clarity of the wood. Ideal as a sofa-side table or beside a large bed.',
        'Peut-on adapter la hauteur de suspension ?':
            'Can the suspension height be adjusted?',
        'Peut-on adapter la longueur d’une enfilade ?':
            'Can a sideboard be made to a different length?',
        'Peut-on assortir les chaises à la table ?':
            'Can the chairs be matched to the table?',
        'Peut-on choisir la dimension et le tissu du canapé ?':
            'Can you choose the size and fabric of the sofa?',
        'Pièces au catalogue':
            'Catalogue pieces',
        "Pour le garnissage, nous privilégions le lin lavé et les laines déperlantes, naturellement respirantes, plutôt que les textiles synthétiques qui retiennent l'humidité. Les teintes sont validées sur un prototype de trente centimètres avant lancement.":
            'For upholstery we prefer washed linen and water-repellent wools, naturally breathable, over synthetic textiles that trap moisture. Colours are approved on a thirty-centimetre prototype before production starts.',
        "Pour les projets hôteliers et résidentiels d'envergure, nous livrons les ouvrages par lots numérotés avec un plan de pose par chambre, afin que les équipes de chantier posent sans erreur et sans retouche.":
            'For large hotel and residential projects we deliver in numbered batches with a room-by-room fitting plan, so site teams install without mistakes and without reworking.',
        "Première étape : le relevé. Nous nous déplaçons au Liban ou travaillons sur plan vérifié pour les projets à l'étranger. Deuxième étape : le dessin d'aménagement, avec élévations cotées et implantation des chevets, prises et éclairages.":
            'First step: measuring. We travel within Lebanon or work from checked plans for projects abroad. Second step: the layout drawing, with dimensioned elevations and the position of bedside tables, sockets and lighting.',
        'Proposez-vous des pièces uniques ?':
            'Do you offer one-off pieces?',
        'Prévoyez 60 cm de largeur utile par convive, soit environ 360 cm pour douze personnes réparties des deux côtés, ou 300 cm si les extrémités sont occupées. Nous vérifions systématiquement le dégagement disponible dans la pièce avant de valider les cotes.':
            'Allow 60 cm of usable width per guest, so about 360 cm for twelve people seated on both sides, or 300 cm if the ends are occupied. We always check the clearance available in the room before confirming dimensions.',
        'Quel délai pour une suite de nuit complète ?':
            'How long does a complete bedroom suite take?',
        'Quelle dimension de table pour douze convives ?':
            'What size table for twelve guests?',
        'Quelle garantie s’applique sur une assise en noyer massif ?':
            'What warranty applies to a solid walnut seat?',
        'Quelles essences pour un bureau sur mesure ?':
            'Which woods for a bespoke desk?',
        'Quelles matières pour une tête de lit capitonnée ?':
            'Which materials for a padded headboard?',
        'Rangements, enfilades &amp; bureaux':
            'Storage, sideboards &amp; desks',
        'Salons &amp; Banquettes en Noyer Massif, Sculptés à Tripoli':
            'Living Rooms &amp; Banquettes in Solid Walnut, Carved in Tripoli',
        'Salons &amp; Canapés en Noyer Massif à Tripoli | Maison Tripoli':
            'Solid Walnut Sofas &amp; Living Rooms in Tripoli | Maison Tripoli',
        'Savoir-faire':
            'Craft',
        'Sellets, plateaux et pièces de collection':
            'Side tables, trays and collectors’ pieces',
        'Sellette Monolithe en Travertin':
            'Travertine Monolith Side Table',
        'Sellette monolithe en travertin romain adouci, socle d’exposition en pierre naturelle levantine':
            'Monolith side table in softened Roman travertine, display plinth in Levantine natural stone',
        "Si vous travaillez avec un architecte d'intérieur, notre bureau d'études fournit les fichiers techniques, les nomenclatures de tissus et les échantillons nécessaires à la validation du projet par votre client.":
            'If you work with an interior architect, our design office supplies the technical files, fabric schedules and samples your client needs to sign off the project.',
        "Si, trois à quatre fois par an, nous éditons des pièces uniques en collaboration avec les maîtres dinandiers du souk : grande suspension, paravent de laiton ou ensemble de sellets. Les projets de création dédiés sont possibles, avec un délai d'étude de quatre à six semaines.":
            'Yes — three to four times a year we issue one-off pieces with the master coppersmiths of the souk: a large suspension, a brass screen or a set of side tables. Dedicated commissions are possible, with a design phase of four to six weeks.',
        'Suite de Nuit « Achrafieh »':
            'Achrafieh Bedroom Suite',
        'Suite de nuit Achrafieh avec boiseries intégrées en chêne fumé et chevets suspendus en laiton':
            'Achrafieh bedroom suite with built-in smoked-oak panelling and hanging brass bedside tables',
        'Suite de nuit complète : tête de lit, boiseries murales, chevets suspendus et banc capitonné dessinés pour un même volume. Le projet démarre par un relevé de cotes sur place ou sur plan, puis un prototype de teinte validé en atelier avant lancement de la fabrication.':
            'A complete bedroom suite: headboard, wall panelling, hanging bedside tables and a padded bench drawn for one single space. The project starts with measurements on site or from plans, then a finish prototype approved in the workshop before production begins.',
        'Table Monolithe « Citadelle »':
            'Citadelle Monolith Table',
        "Table d'Appoint « Tripoli »":
            'Tripoli Side Table',
        "Table d'appoint Tripoli en chêne clair cérusé, finition huilée mate, mobilier sur-mesure libanais":
            'Tripoli side table in light cerused oak, matt oiled finish, Lebanese made-to-measure furniture',
        'Table de Réception « Al-Bahr »':
            'Al-Bahr Dining Table',
        'Table de réception Al-Bahr en chêne blanchi pour salle à manger de résidence balnéaire à Tripoli':
            'Al-Bahr dining table in bleached oak for the dining room of a seaside residence in Tripoli',
        'Table monolithe Citadelle en chêne massif sculpté et travertin veiné, table de réception Maison Tripoli':
            'Citadelle monolith table in carved solid oak and veined travertine, Maison Tripoli dining table',
        'Tables de Réception &amp; Salles à Manger en Bois Massif':
            'Dining Tables &amp; Rooms in Solid Wood',
        'Tables de Réception &amp; Salles à Manger | Maison Tripoli':
            'Dining Tables &amp; Dining Rooms | Maison Tripoli',
        "Tables de réception en chêne et travertin, tables d'appoint et sellets en pierre naturelle : mobilier de salle à manger fabriqué à Tripoli. Devis en 24 h.":
            'Dining tables in oak and travertine, side tables and side stools in natural stone: dining-room furniture made in Tripoli. Quote within 24 hours.',
        'Toutes les pièces sont déclinables en dimensions, essences et textiles. Sélectionnez une pièce pour en consulter la fiche détaillée.':
            'Every piece can be varied in dimensions, wood species and textiles. Select a piece to see its full details.',
        'Travertin romain adouci et chanfreiné':
            'Softened, chamfered Roman travertine',
        "Troisième étape : les prototypes de teinte et les échantillons textiles, validés par vous ou votre architecte. Quatrième étape : la fabrication en atelier, la livraison sous gants blancs et la pose, suivies d'un réglage des portes et tiroirs après une semaine de mise en place.":
            'Third step: finish prototypes and textile samples, approved by you or your architect. Fourth step: workshop production, white-glove delivery and fitting, followed by adjustment of doors and drawers one week after installation.',
        "Un intérieur se termine par la lumière et par les objets. Nos luminaires et pièces d'art sont fabriqués en petites séries dans les ateliers d'artisans de Tripoli, dans la continuité d'une tradition de dinanderie qui a fait la réputation du Souk des Cuivres.":
            'An interior is finished by light and by objects. Our light fittings and art pieces are made in small series in the workshops of Tripoli’s craftsmen, continuing a copperworking tradition that built the reputation of the Coppersmiths’ Souk.',
        'Un projet de chambre en quatre étapes':
            'A bedroom project in four steps',
        "Un salon d'angle dans une pièce en L, une banquette filante sous une fenêtre à arcades, deux fauteuils clubs face à une cheminée : nous partons de vos cotes et de vos usages. Un plan de calepinage vous est transmis avant fabrication, avec l'implantation des modules, les passages et les dégagements.":
            'A corner sofa in an L-shaped room, a long banquette under an arched window, two club armchairs facing a fireplace: we start from your dimensions and how you live. A layout plan is sent before production, with module positions, circulation and clearances.',
        "Un salon réussi tient à trois choses : la justesse des proportions, la noblesse de la matière et le confort d'usage. Nos assises sont dessinées dans l'atelier de Tripoli, assemblées à tenons et mortaises, puis garnies à la main — plumes d'oie pour l'assise, mousse haute résilience pour le maintien.":
            'A successful living room rests on three things: right proportions, noble material and comfort in use. Our seats are drawn in the Tripoli workshop, assembled with mortise and tenon, then upholstered by hand — goose feathers for the seat, high-resilience foam for support.',
        'Une autre question ?':
            'Another question?',
        "Une façade cannelée se travaille avec des fraises profilées réglées à la main : chaque cannelure est fraisée, ébarbée puis poncée individuellement avant assemblage. C'est cette régularité du pas qui donne à l'enfilade sa lecture architecturale et son ombre portée.":
            'A fluted front is worked with profiled cutters set by hand: each flute is milled, deburred and sanded individually before assembly. It is that regularity of pitch that gives the sideboard its architectural reading and its cast shadow.',
        "Une tête de lit capitonnée se compose d'un cadre de bois massif, d'une mousse technique et d'un garnissage textile. Nous écartons les mousses trop fermes qui rendent l'appui inconfortable en lecture, et privilégions des densités différenciées selon la hauteur d'appui.":
            'A padded headboard is made of a solid wood frame, technical foam and a textile cover. We rule out foams that are too firm and make leaning back uncomfortable, and prefer differentiated densities depending on the height of the support.',
        'Vos luminaires sont-ils électrifiés aux normes ?':
            'Are your light fittings wired to standard?',
        "Vous nous transmettez un plan, un relevé ou une intention : nous produisons les dessins d'exécution, le calepinage des dalles et une proposition de piètement. Une maquette à l'échelle peut être réalisée pour les configurations complexes ou les volumes atypiques.":
            'You send us a plan, a survey or an intention: we produce shop drawings, the slab layout and a proposal for the base. A scale model can be made for complex configurations or unusual volumes.',
        'banquette velours sur mesure':
            'bespoke velvet banquette',
        'boiseries de chambre sur mesure':
            'bespoke bedroom panelling',
        'bureau sur mesure ébène':
            'bespoke ebony desk',
        'canapé sur mesure Tripoli':
            'bespoke sofa Tripoli',
        'chambre sur mesure architecte':
            'bespoke bedroom architect',
        'commode noyer massif Tripoli':
            'solid walnut chest Tripoli',
        'enfilade sur mesure Liban':
            'bespoke sideboard Lebanon',
        'fauteuil club cuir Tripoli':
            'leather club armchair Tripoli',
        'lit sur mesure Tripoli':
            'bespoke bed Tripoli',
        'luminaire artisanal Tripoli':
            'handmade lighting Tripoli',
        'lustre laiton massif Liban':
            'solid brass chandelier Lebanon',
        'menuiserie d’art Tripoli':
            'art joinery Tripoli',
        'objet décoratif travertin':
            'travertine decorative object',
        'pièce unique laiton martelé':
            'one-off hammered brass piece',
        'plateau travertin sur mesure Liban':
            'bespoke travertine top Lebanon',
        'salon en noyer massif Liban':
            'solid walnut living room Lebanon',
        'table de réception sur mesure':
            'bespoke dining table',
        'table salle à manger chêne massif':
            'solid oak dining table',
        'table sur plan architecte Tripoli':
            'table from architect’s plan Tripoli',
        'tête de lit capitonnée Liban':
            'padded headboard Lebanon',
        'À côté des luminaires, nous taillons des objets de présentation : sellets monolithes en travertin, plateaux en marbre noir, socles pour céramiques ou sculptures. Ces pièces sont découpées dans des chutes de nos plateaux de table, ce qui leur donne une parenté de matière avec le mobilier de la pièce.':
            'Alongside lighting, we cut display objects: monolith travertine side tables, black marble trays, plinths for ceramics or sculptures. These pieces are cut from offcuts of our table tops, which gives them a material kinship with the furniture in the room.',
        'Ébène teinté, laque satinée 7 couches, bronze':
            'Stained ebony, satin lacquer in 7 coats, bronze',
        "Éclairage d'Art &amp; Objets en Laiton et Travertin":
            'Art Lighting &amp; Objects in Brass and Travertine',
        "Écrivez à l'atelier":
            'Write to the workshop',
        'Élégance méditerranéenne intemporelle. Cuir pleine fleur patiné artisanalement dans les cours intérieures de Tripoli, coutures sellier et piètement en laiton brossé. Une édition numérotée de trente pièces par an, fabriquée dans notre atelier du Nord-Liban.':
            'Timeless Mediterranean elegance. Full-grain leather patinated by hand in the inner courtyards of Tripoli, saddle stitching and a brushed brass base. A numbered edition of thirty pieces a year, made in our North Lebanon workshop.',
        'Fabriquez-vous des tables sur plan d’architecte ?':
            'Do you build tables from an architect’s plan?',
        "Vous nous transmettez un plan, un relevé ou une intention : nous produisons les dessins d'exécution, le calepinage des dalles et une proposition de piétement. Une maquette à l'échelle peut être réalisée pour les configurations complexes ou les volumes atypiques.":
            'You send us a plan, a survey or an intention: we produce shop drawings, the slab layout and a proposal for the base. A scale model can be made for complex configurations or unusual volumes.',

        /* Libellés de page des collections */
        'Chêne blanchi':
            'Bleached oak',
        'Chêne cérusé':
            'Cerused oak',
        'Demander un devis':
            'Request a quote',
        'Découvrir aussi':
            'Discover also',
        'Laiton massif':
            'Solid brass',
        'Les pièces de la collection':
            'Pieces in the collection',
        'Noyer massif &amp; bouclé':
            'Solid walnut &amp; bouclé',
        'Noyer sculpté':
            'Carved walnut',
        'Pièce maîtresse':
            'Signature piece',
        'Poursuivre la visite':
            'Continue the visit',
        'Projet sur devis':
            'Project by quote',
        'Questions fréquentes':
            'Frequently asked questions',
        'Recevez votre devis personnalisé':
            'Receive your personalised quote',
        'Suite complète':
            'Complete suite',
        'Tête de lit sur-mesure':
            'Made-to-measure headboard',
        'Velours grège':
            'Greige velvet',
        'Voir la méthode sur-mesure':
            'See the bespoke method',
        'nous répondons sous 24 heures.':
            'we answer within 24 hours.',
        'À partir de':
            'From',
        'Ébène &amp; bronze':
            'Ebony &amp; bronze',
        'Édition numérotée':
            'Numbered edition',

        /* Fiches techniques des collections */
        '30 ans sur la structure d’ébénisterie':
            '30 years on the cabinetmaking frame',
        '60 cm par convive, 90 cm de recul':
            '60 cm per guest, 90 cm clearance',
        'Accastillage':
            'Fittings',
        'Antique protéiné ou laiton brut évolutif':
            'Protein-sealed antique or evolving raw brass',
        'Assemblage':
            'Assembly',
        'Assurée par nos équipes au Liban':
            'Handled by our teams in Lebanon',
        'Boiseries':
            'Panelling',
        'Boiseries murales et chevets intégrés':
            'Wall panelling and built-in bedside tables',
        'Bronze massif, laiton brossé, charnières amorties':
            'Solid bronze, brushed brass, soft-close hinges',
        'Cannelées, à plate-bande ou laquées':
            'Fluted, raised-panel or lacquered',
        'Charnières amorties et tiroirs à fond de velours':
            'Soft-close hinges and velvet-lined drawers',
        'Chêne massif, travertin ou marbre':
            'Solid oak, travertine or marble',
        'Chêne, noyer ou ébène, teinte sur mesure':
            'Oak, walnut or ebony, custom tone',
        'Câble acier réglable de 60 à 200 cm':
            'Steel cable adjustable from 60 to 200 cm',
        'De 140 à 320 cm sur mesure':
            'From 140 to 320 cm, made to measure',
        'Douilles céramique, câblage CE / IEC':
            'Ceramic lampholders, CE / IEC wiring',
        'Dégagement conseillé':
            'Recommended clearance',
        'Essences':
            'Woods',
        'Façades':
            'Fronts',
        'Façades cannelées fraisées à la main':
            'Hand-milled fluted fronts',
        'Finition':
            'Finish',
        'Fonds de tiroir velours, plateaux amovibles':
            'Velvet drawer bottoms, removable trays',
        'Garantie':
            'Warranty',
        'Garnissage':
            'Upholstery',
        'Hauteur de suspension réglable':
            'Adjustable suspension height',
        'Huile dure, vernis déperlant ou cire':
            'Hard oil, water-repellent varnish or wax',
        'Intérieurs':
            'Interiors',
        'Laiton massif martelé et patiné main':
            'Hand-hammered, hand-patinated solid brass',
        'Laiton massif, travertin, bronze':
            'Solid brass, travertine, bronze',
        'Largeur 160 à 320 cm, appui 120 cm':
            'Width 160 to 320 cm, backrest 120 cm',
        'Lin lavé, laine déperlante, velours':
            'Washed linen, water-repellent wool, velvet',
        'Longueur utile':
            'Usable length',
        'Marbre et bronze ajustés sur mesure':
            'Marble and bronze fitted to measure',
        'Matériaux':
            'Materials',
        'Modules et dimensions ajustables au centimètre':
            'Modules and dimensions adjustable to the centimetre',
        'Noyer ou chêne massif, séché 18 mois':
            'Solid walnut or oak, dried 18 months',
        'Noyer, chêne, ébène teinté':
            'Walnut, oak, stained ebony',
        'Patiné':
            'Patinated',
        'Plateau':
            'Top',
        'Plateaux massifs jusqu’à 320 cm sans joint':
            'Solid tops up to 320 cm without a joint',
        'Plumes d’oie, mousse HR, ressorts noyés':
            'Goose feathers, HR foam, pocketed springs',
        'Pose':
            'Fitting',
        'Relevé sur place ou étude sur plan':
            'On-site survey or study from plans',
        'Structure':
            'Frame',
        'Structure en noyer massif séché 18 mois':
            'Frame in solid walnut dried 18 months',
        'Suspension':
            'Suspension',
        'Tenon-mortaise et queue d’aronde':
            'Mortise-and-tenon and dovetail',
        'Textiles':
            'Textiles',
        'Tissus Rubelli, Pierre Frey et Loro Piana':
            'Rubelli, Pierre Frey and Loro Piana fabrics',
        'Travertin et marbre découpés au Nord-Liban':
            'Travertine and marble cut in North Lebanon',
        'Têtes de lit':
            'Headboards',
        'Têtes de lit réalisées à la cote de la pièce':
            'Headboards made to the exact dimensions of the room',
        'pièces':
            'pieces',
        'Édition 2025':
            'Edition 2025',
        'Électrification':
            'Wiring',
        'Électrification aux normes CE / IEC':
            'Wiring to CE / IEC standards',
        'Étude d’implantation pour 6 à 14 convives':
            'Layout study for 6 to 14 guests',
    },

    ar: {
        /* En-tête */
        'Atelier &amp; Showroom Tripoli • Rue des Ébénistes':
            'الورشة وصالة العرض في طرابلس • شارع صنّاع الخشب',
        'Fabrication artisanale &amp; sur-mesure • Expédition internationale':
            'صناعة يدوية وحسب الطلب • شحن دولي',
        'Atelier Mobilier • 1948': 'ورشة الأثاث • ١٩٤٨',
        'Ouvrir le menu de navigation': 'فتح قائمة التنقّل',
        'Navigation principale': 'التنقّل الرئيسي',
        'Navigation mobile': 'تنقّل الهاتف',
        'Rechercher une pièce au catalogue': 'البحث في الكتالوج',
        'Prendre rendez-vous': 'حدّد موعداً',
        'Ouvrir ma sélection et mon devis': 'فتح اختياراتي وطلب العرض',
        'Thème': 'المظهر',
        'Thème d’affichage': 'مظهر العرض',
        'Thème clair — sable': 'مظهر فاتح — رملي',
        'Thème sombre — Ébène': 'مظهر داكن — أبنوس',
        'Thème sombre — Noyer': 'مظهر داكن — جوز',
        'Aller au contenu principal': 'الانتقال إلى المحتوى الرئيسي',
        'Écrire à l’atelier sur WhatsApp': 'مراسلة الورشة على واتساب',
        WhatsApp: 'واتساب',

        /* Navigation */
        Accueil: 'الرئيسية',
        Collections: 'المجموعات',
        Atelier: 'الورشة',
        'Sur-mesure': 'حسب الطلب',
        Projets: 'المشاريع',
        Contact: 'اتصل بنا',

        /* Tiroir mobile */
        'Rechercher une pièce': 'ابحث عن قطعة',
        'Visite privée au showroom': 'زيارة خاصة لصالة العرض',
        'Service personnalisé': 'خدمة شخصية',

        /* Pied de page */
        'La Maison': 'الدار',
        'Atelier Tripoli': 'ورشة طرابلس',
        'Tripoli, Liban': 'طرابلس، لبنان',
        'Tripoli, Liban (livraison internationale)': 'طرابلس، لبنان (شحن دولي)',
        'Suivre Maison Tripoli sur Instagram (nouvelle fenêtre)':
            'تابع maison tripoli على إنستغرام (نافذة جديدة)',
        'Suivre Maison Tripoli sur Facebook (nouvelle fenêtre)':
            'تابع maison tripoli على فيسبوك (نافذة جديدة)',
        'Localiser le showroom Maison Tripoli sur Google Maps (nouvelle fenêtre)':
            'موقع صالة العرض على خرائط غوغل (نافذة جديدة)',
        'Informations complémentaires et liens utiles': 'معلومات إضافية وروابط مفيدة',

        /* Couches : recherche, panier, fiche produit, rendez-vous */
        'Recherche au catalogue': 'البحث في الكتالوج',
        'Fermer la recherche': 'إغلاق البحث',
        'Rechercher une pièce, une matière ou une collection': 'ابحث عن قطعة أو مادة أو مجموعة',
        'Tapez « Noyer », « Canapé », « Table »…': 'اكتب «جوز»، «كنبة»، «طاولة»…',
        'Mon devis &amp; panier': 'طلب العرض والاختيارات',
        'Fermer ma sélection': 'إغلاق اختياراتي',
        'Votre sélection est vide': 'اختياراتك فارغة',
        'Parcourez nos collections signatures pour ajouter vos pièces.':
            'تصفّح مجموعاتنا المميّزة لإضافة قطعك.',
        'Total estimatif :': 'المجموع التقديري:',
        'Finaliser la demande de devis': 'إتمام طلب عرض السعر',
        'Confirmer la demande': 'تأكيد الطلب',
        'Fermer la fiche produit': 'إغلاق بطاقة القطعة',
        'Aperçu de la pièce sélectionnée dans les collections Maison Tripoli':
            'معاينة القطعة المختارة من مجموعات maison tripoli',
        'Personnaliser les dimensions / finitions': 'تخصيص المقاسات والتشطيبات',
        'Ajouter au devis &amp; panier': 'أضف إلى طلب العرض والاختيارات',
        'Fermer la fenêtre de rendez-vous': 'إغلاق نافذة الموعد',
        'Maison Tripoli Concierge': 'خدمة عملاء maison tripoli',
        'Objet de la visite': 'موضوع الزيارة',
        'Achat de mobilier pour particulier': 'شراء أثاث — عميل خاص',
        'Collaboration professionnelle (architecte)': 'تعاون مهني (مهندس معماري)',
        'Projet villa / appartement complet': 'مشروع فيلا أو شقة كاملة',
        'Date souhaitée': 'التاريخ المطلوب',
        'Votre nom &amp; prénom': 'الاسم الكامل',
        'Numéro mobile (WhatsApp)': 'رقم الجوال (واتساب)',

        /* Fiche produit dynamique (renseignée par JavaScript) */
        'Dimensions :': 'المقاسات:',
        'Délai atelier :': 'مدة التنفيذ:',
        'Origine :': 'المصدر:',
        'Fabriqué sur commande (4 à 6 semaines)': 'يُصنع حسب الطلب (٤ إلى ٦ أسابيع)',
        'Salon habillé par Maison Tripoli : mobilier d’art en noyer massif et lin écru':
            'صالة مفروشة من maison tripoli: أثاث فني من خشب الجوز الصلب والكتان الطبيعي',

        /* Métadonnées et divers */
        'Maison Tripoli — retour à l’accueil': 'maison tripoli — العودة إلى الرئيسية',

        /* --- Pages d'accueil et hub, générées depuis les gabarits --- */
        "Aperçus confidentiels de nos nouvelles lignes de mobilier, invitations aux vernissages et chroniques sur l'architecture libanaise.":
            'معاينات خاصة لمجموعاتنا الجديدة من الأثاث، ودعوات إلى المعارض، ومواد عن العمارة اللبنانية.',
        'Atelier de Tripoli':
            'ورشة طرابلس',
        'Atelier de confection Tripoli':
            'ورشة التصنيع والتنجيد في طرابلس',
        "Bien au-delà d'un centre de production, la ville de":
            'أبعد من كونها مركز إنتاج، فإنّ مدينة',
        "Boiseries, mobilier, éclairage et pierre : nous dessinons l'ensemble et fabriquons dans un même langage de matières.":
            'الأعمال الخشبية والأثاث والإضاءة والحجر: نصمّم المجموعة كاملة وننفّذها بلغة مواد واحدة.',
        "Capitale historique des corporations d'artisans d'art, où chaque ruelle du vieux souk perpétue le travail du bois noble.":
            'العاصمة التاريخية لنقابات الصنّاع، حيث لا يزال كلّ زقاق في السوق القديم يحفظ حرفة الأخشاب النفيسة.',
        'Catalogue 2025':
            'كتالوج ٢٠٢٥',
        'Chêne clair':
            'بلوط فاتح',
        'Cinq familles de mobilier, un seul atelier. Chaque collection est déclinable en dimensions, en essences et en textiles : vous ne choisissez pas un modèle dans un catalogue, vous en fixez les cotes avec nos menuisiers.':
            'خمس عائلات من الأثاث وورشة واحدة. كلّ مجموعة قابلة للتعديل في المقاسات والأخشاب والأقمشة: أنت لا تختار نموذجاً من كتالوج، بل تحدّد مقاساته مع نجّارينا.',
        "Collections de Mobilier d'Art Fabriquées à Tripoli":
            'مجموعات الأثاث الفني المصنوعة في طرابلس',
        'Commander un échantillon':
            'اطلب عيّنة',
        'Console Basse « Bahia » en Noyer Sculpté':
            'كونسول منخفض «باهية» من الجوز المنحوت',
        "Console basse Bahia en noyer foncé sculpté et ciré à la main, finition d'ébénisterie de l'atelier Maison Tripoli":
            'كونسول باهية المنخفض من الجوز الداكن المنحوت، مصقول بالشمع يدوياً، بتشطيب نجارة الورشة',
        'Correspondance privée':
            'مراسلات خاصة',
        "Depuis plus de 70 ans, nos maîtres ébénistes allient le marbre du Levant, le noyer massif et les velvets d'exception pour habiller les demeures les plus raffinées.":
            'منذ أكثر من ٧٠ عاماً، يجمع أساتذة النجارة لدينا رخام الشام وخشب الجوز الصلب والأقمشة الفاخرة لتأثيث أرقى المساكن.',
        "Depuis plus de 70 ans, nos maîtres ébénistes allient le marbre du Levant, le noyer massif et les velours d'exception pour habiller les demeures les plus raffinées.":
            'منذ أكثر من ٧٠ عاماً، يجمع أساتذة النجارة لدينا رخام الشام وخشب الجوز الصلب والأقمشة الفاخرة لتأثيث أرقى المساكن.',
        "Durée de garantie sur l'ébénisterie":
            'مدّة الضمان على الأعمال الخشبية',
        "Découvrir l'atelier &amp; la démarche RSE":
            'تعرّف على الورشة والمسؤولية المجتمعية',
        'Exemplaire atelier':
            'قطعة من الورشة',
        'Fabrication locale à Tripoli':
            'تصنيع محلي في طرابلس',
        'Faire défiler vers les collections':
            'مرّر إلى المجموعات',
        "Fil d'Ariane":
            'مسار التنقّل',
        "Garantie sur l'ébénisterie":
            'ضمان الأعمال الخشبية',
        'Immersion dans les résidences contemporaines habillées par les ateliers de la Maison.':
            'جولة داخل مساكن معاصرة فرّشتها ورشات الدار.',
        "L'usage réel de la pièce":
            'الاستخدام الفعلي للقطعة',
        'La Noblesse des Matières Sélectionnées':
            'نُبل المواد المختارة',
        'La cohérence des matières':
            'تناسق المواد',
        'Langue':
            'اللغة',
        'Le grand savoir-faire libanais':
            'الحرفة اللبنانية العريقة',
        'Le volume disponible':
            'المساحة المتاحة',
        'Les cinq collections de la Maison':
            'مجموعات الدار الخمس',
        'Maison Tripoli':
            'Maison Tripoli',
        "Maison Tripoli — retour à l'accueil":
            'maison tripoli — العودة إلى الرئيسية',
        "Maison d'édition et manufacture de mobilier de prestige à Tripoli, Liban. Chaque création incarne un dialogue entre rigueur architecturale contemporaine et maîtrise artisanale méditerranéenne.":
            'دار نشر ومصنع للأثاث الفاخر في طرابلس، لبنان. تجسّد كلّ قطعة حواراً بين الصرامة المعمارية المعاصرة والإتقان الحرفي المتوسطي.',
        'Maître Fadi Kabbara — Directeur de création,':
            'المعلّم فادي كبارة — مدير الإبداع،',
        "Mobilier d'Art &amp; Haute Ébénisterie":
            'أثاث فني وصناعة خشب راقية',
        'Mon devis &amp; sélection':
            'طلب العرض واختياراتي',
        'Noyer Royal de la Vallée :':
            'جوز الوادي الملكي:',
        'Noyer foncé':
            'جوز داكن',
        'Parole de maître ébéniste':
            'كلمة من معلّم نجارة',
        'Recevez nos nouvelles éditions':
            'استلم إصداراتنا الجديدة',
        "Réservez un créneau d'accueil exclusif avec notre bureau d'architecture d'intérieur à Tripoli.":
            'احجز موعداً خاصاً مع مكتب هندسة الديكور الداخلي لدينا في طرابلس.',
        "S'inscrire":
            'اشترك',
        'Sculptés à Tripoli depuis 1948':
            'منحوتة في طرابلس منذ ١٩٤٨',
        'Sur-mesure intégral':
            'تفصيل كامل',
        "Séchage naturel en grange à Tripoli pendant 18 mois, puis polissage ciré à la main avec une cire d'abeille biologique libanaise.":
            'تجفيف طبيعي في مخزن بطرابلس لمدة ١٨ شهراً، ثم صقل بالشمع يدوياً بشمع نحل لبناني عضوي.',
        'Sélectionnez une essence de finition :':
            'اختر عرق الخشب للتشطيب:',
        'Taux de fabrication locale':
            'نسبة التصنيع المحلي',
        'Travertin':
            'ترافرتين',
        "Tripoli (Al-Fayha'a)":
            'طرابلس (الفيحاء)',
        'Tripoli Atelier':
            'ورشة طرابلس',
        'Un projet complet, du calepinage à la pose':
            'مشروع كامل، من التخطيط التنفيذي إلى التركيب',
        "Un salon exige 90 cm de recul devant l'assise, une table de réception 60 cm de largeur utile par convive. Nous vérifions votre plan avant de fixer les dimensions, pour éviter la pièce juste — et l'erreur coûteuse.":
            'تحتاج جلسة الجلوس إلى ٩٠ سم أمام المقعد، وتحتاج طاولة الاستقبال إلى ٦٠ سم عرضاً لكلّ ضيف. نتحقّق من مخططك قبل تثبيت المقاسات، لتفادي القطعة «التي بالكاد تدخل» والخطأ المكلف.',
        'Une maison se lit comme un ensemble : le noyer du salon peut reprendre dans la bibliothèque, le travertin de la table dans les sellets de la chambre. Nos ateliers conservent les nuanciers pour harmoniser vos commandes successives.':
            'يُقرأ المنزل كوحدة واحدة: جوز الصالة يمكن أن يتكرّر في المكتبة، وترافرتين الطاولة في مساند غرفة النوم. تحفظ ورشاتنا بطاقات الألوان لتنسيق طلباتك المتتابعة.',
        "Une table de famille qui accueille quatorze convives n'appelle pas le même plateau qu'une table de travail. Nous adaptons l'essence, l'épaisseur et la finition — huilée pour le contact, laquée pour l'apparat.":
            'طاولة العائلة التي تجمع أربعة عشر ضيفاً لا تحتاج السطح نفسه الذي تحتاجه طاولة العمل. نعدّل العرق والسماكة والتشطيب — زيتي للملامسة، ولَمعي للاستقبال.',
        'Voir tous les projets livrés':
            'شاهد كلّ المشاريع المنفّذة',
        'Votre adresse e-mail':
            'بريدك الإلكتروني',
        'À Tripoli, chaque pièce prend racine dans le choix intransigeant des essences de bois locales et régionales, associées aux marbres extraits du bassin levantin et aux tissages européens.':
            'في طرابلس، تجد كلّ قطعة جذورها في اختيار صارم لأخشاب محلية وإقليمية، مع رخام مستخرج من حوض الشام وأقمشة أوروبية.',
        'Ébène noir':
            'أبنوس أسود',
        'page d’accueil':
            'الصفحة الرئيسية',

        /* Compléments : sélecteur de langue, rubans, données éditoriales */
        '* Tarifs hors droits de douane selon la destination. Frais de fret calculés sur étude technique.':
            '* الأسعار لا تشمل الرسوم الجمركية حسب الوجهة. تُحتسب أجور الشحن بعد دراسة فنية.',
        'Agencement &amp; boiseries': 'تجهيزات وتخشيب',
        'Assises &amp; réception': 'الجلسات والاستقبال',
        'Boiseries intégrées et suite présidentielle': 'تخشيب مدمج وجناح رئاسي',
        'Catalogue — édition 2025': 'الكتالوج — إصدار ٢٠٢٥',
        "Chambre principale d'une résidence privée à Dubaï : boiseries intégrées et suite présidentielle en chêne fumé":
            'غرفة رئيسية في مسكن خاص بدبي: تخشيب مدمج وجناح رئاسي من البلوط المدخّن',
        'Chambre sur mesure Maison Tripoli : boiseries en chêne fumé et tête de lit capitonnée en lin':
            'غرفة نوم مفصّلة من ميزون طرابلس: تخشيب من البلوط المدخّن ورأس سرير مبطّن بالكتان',
        'Chambres &amp; suites': 'غرف النوم والأجنحة',
        'Cinq collections, un même atelier': 'خمس مجموعات، ورشة واحدة',
        'Conditions de vente': 'شروط البيع',
        'Demeures réalisées': 'مساكن منفّذة',
        'Découvrir la collection': 'استكشف المجموعة',
        'Découvrir le sur-mesure': 'استكشف العمل حسب الطلب',
        'Découvrir les collections': 'استكشف المجموعات',
        "Enfilade cannelée en noyer massif et marbre noir, menuiserie d'art de l'atelier Maison Tripoli":
            'خزانة مخدّدة من خشب الجوز الصلب والرخام الأسود، نجارة فنية من ورشة ميزون طرابلس',
        'Espace professionnels': 'قسم المهنيين',
        'Expéditions': 'الشحن',
        "Finitions disponibles sur l'ensemble des collections —": 'تشطيبات متوفرة في كل المجموعات —',
        "L'Atelier": 'الورشة',
        "L'histoire de Tripoli": 'تاريخ طرابلس',
        "L'âme de la ville": 'روح المدينة',
        'Laiton &amp; pierre': 'نحاس وحجر',
        'Laiton patiné &amp; bronze': 'نحاس عتيق وبرونز',
        'Livraison, pose &amp; installation internationale': 'تسليم وتركيب وتجهيز دولي',
        'Loro Piana': 'لورو بيانا',
        "Lustre en laiton massif martelé et objets en travertin, éclairage d'art Maison Tripoli":
            'ثريا من النحاس الصلب المطروق وقطع من الترافرتين، إضاءة فنية من ميزون طرابلس',
        'Marbre noir Marquina': 'رخام ماركينا الأسود',
        'Marbrerie levantine': 'أعمال الرخام في حوض الشام',
        'Marbriers du Nord-Liban': 'حرفيّو الرخام في شمال لبنان',
        "Maître ébéniste travaillant le noyer à l'établi dans l'atelier de menuiserie d'art de Maison Tripoli au Liban":
            'معلّم نجارة يعمل على خشب الجوز عند المنضدة في ورشة النجارة الفنية لميزون طرابلس في لبنان',
        'Mentions légales': 'المعلومات القانونية',
        'Menuiserie &amp; rangement': 'نجارة وخزائن',
        'Menuiserie d’art': 'نجارة فنية',
        'Nos conseillers vous reçoivent au showroom de Tripoli ou vous répondent sous 24 heures pour un devis, un plan de teinte ou une estimation de délai.':
            'يستقبلك مستشارونا في صالة العرض في طرابلس، أو يجيبونك خلال ٢٤ ساعة بعرض سعر أو مخطط تشطيب أو تقدير للمدة.',
        'Nos maîtres ébénistes': 'معلمو النجارة لدينا',
        'Notre méthode': 'منهجنا',
        'Nous fabriquons chaque pièce à la cote, sur mesure. Transmettez-nous votre plan ou vos dimensions : nous vous répondons sous 24 heures avec une proposition chiffrée.':
            'نصنع كل قطعة حسب المقاس المطلوب. أرسل إلينا مخططك أو مقاساتك: نجيبك خلال ٢٤ ساعة بعرض مفصّل بالأسعار.',
        'Penthouse Sursock': 'بنتهاوس سرسق',
        'Pierre Frey': 'بيير فراي',
        'Private Estate': 'مسكن خاص',
        'Prototypes de teinte &amp; nomenclatures matières': 'نماذج التشطيب وجداول المواد',
        'Rangements &amp; bureaux': 'خزائن ومكاتب',
        'Relevé sur site &amp; dessins d’exécution': 'رفع المقاسات في الموقع ومخططات التنفيذ',
        'Restauration de mobilier': 'ترميم الأثاث',
        'Rubelli': 'روبّيلي',
        'Réserver une visite privée': 'احجز زيارة خاصة',
        'Salle à manger de la Villa Al-Bahr à Tripoli : table en chêne blanchi et chaises en cuir sellier cousues main':
            'غرفة طعام فيلا البحر في طرابلس: طاولة من البلوط المبيّض وكراسي من الجلد السروجي المخيط يدوياً',
        'Salle à manger équipée par Maison Tripoli : table de réception en chêne blanchi et chaises de cuir':
            'غرفة طعام مجهّزة من ميزون طرابلس: طاولة استقبال من البلوط المبيّض وكراسي جلدية',
        'Salles à manger': 'غرف الطعام',
        "Salon contemporain habillé par Maison Tripoli : canapé en noyer massif et lin écru, ébénisterie d'art à Tripoli":
            'صالة معاصرة من ميزون طرابلس: أريكة من خشب الجوز الصلب وكتان بلون العاج، نجارة فنية في طرابلس',
        'Salon de réception meublé par Maison Tripoli : assises en noyer massif et velours grège':
            'صالة استقبال مؤثّثة من ميزون طرابلس: جلسات من خشب الجوز الصلب ومخمل بلون الرمادي الدافئ',
        'Salon du Penthouse Sursock à Beyrouth : canapé sur-mesure en noyer et velours grège signé Maison Tripoli':
            'صالة بنتهاوس سرسق في بيروت: أريكة مفصّلة من خشب الجوز والمخمل بلون الرمادي الدافئ من ميزون طرابلس',
        'Salon sur-mesure noyer et velours grège': 'صالة مفصّلة من خشب الجوز والمخمل بلون الرمادي الدافئ',
        'Salons &amp; banquettes': 'الصالونات والمقاعد الطويلة',
        'Service sur-mesure': 'خدمة التفصيل حسب الطلب',
        'Showroom': 'صالة العرض',
        'Suites &amp; repos': 'الأجنحة والراحة',
        'Sur-Mesure': 'حسب الطلب',
        'Table en chêne blanchi et chaises cuir sellier': 'طاولة من البلوط المبيّض وكراسي من الجلد السروجي',
        'Tables &amp; réception': 'الطاولات والاستقبال',
        'Tanneries partenaires': 'مدابغ شريكة',
        'Tisserands partenaires': 'نسّاجون شركاء',
        'Travertin du bassin levantin': 'ترافرتين حوض الشام',
        'Trois critères avant de commander': 'ثلاثة معايير قبل الطلب',
        'Un projet, une pièce ou une simple question ?': 'مشروع أو قطعة واحدة أو سؤال بسيط؟',
        'Une dynastie de menuisiers au cœur de la Méditerranée': 'سلالة من النجّارين في قلب المتوسط',
        'Villa Al-Bahr': 'فيلا البحر',
        'Visiter le showroom': 'زيارة صالة العرض',
        'Voir toutes les collections': 'شاهد كل المجموعات',
        'Vous ne trouvez pas la dimension exacte ?': 'لم تجد المقاس المطلوب؟',
        '« Tripoli est le berceau séculaire du bois noble. Nous ne construisons pas de simples meubles ; nous forgeons des pièces de famille destinées à traverser les générations. »':
            '«طرابلس مهد الخشب النبيل منذ قرون. نحن لا نصنع أثاثاً عادياً، بل نُبدع قطعاً عائلية تُورَّث جيلاً بعد جيل.»',
        'Ébénisterie sur-mesure': 'نجارة حسب الطلب',
        "Éclairage &amp; objets d'art": 'إضاءة وقطع فنية',
        'Éclairage sur-mesure': 'إضاءة حسب الطلب',
        'Écrire à la Maison': 'راسل الدار',
        'Canapés modulaires, banquettes de réception et fauteuils clubs dessinés pour les grands salons, dans le noyer massif et le cuir pleine fleur de nos ateliers.':
            'أرائك وحدات ومقاعد استقبال وكراسي كلوب مصمّمة للصالات الكبيرة، من خشب الجوز الصلب والجلد الكامل في ورشاتنا.',
        'Enfilades cannelées, consoles d’entrée et bureaux d’apparat : la menuiserie d’art de nos maîtres ébénistes, du tiroir à fond de velours à la façade cannelée main.':
            'خزائن مخدّدة وطاولات مدخل ومكاتب فخمة: نجارة فنية من معلمينا، من الأدراج المبطّنة بالمخمل إلى الواجهات المخدّدة يدوياً.',
        'Lits king size, têtes de lit capitonnées et boiseries murales dessinés aux cotes exactes de votre chambre, jusqu’aux sous-combles et pans coupés.':
            'أسرّة كبيرة ورؤوس أسرّة مبطّنة وتخشيب جداري يُرسم على مقاسات غرفتك تماماً، حتى الأسقف المائلة والزوايا المقطوعة.',
        'Lustres en laiton massif martelé du Souk des Cuivres, sellets en travertin et pièces d’art : la touche finale qui fait lire un intérieur comme une composition.':
            'ثريات من النحاس الصلب المطروق من سوق النحّاسين، وطاولات جانبية من الترافرتين وقطع فنية: اللمسة الأخيرة التي تجعل التصميم الداخلي يُقرأ كتكوين واحد.',
        "Tables de réception monolithiques, tables d'appoint cérusées et plateaux de pierre naturelle, dimensionnés pour vos repas et vos volumes.":
            'طاولات استقبال صلبة، وطاولات جانبية بتشطيب مبيّض وسطوح من الحجر الطبيعي، بمقاسات تناسب ولائمك ومساحاتك.',
        "incarne l'épicentre du mobilier haut de gamme au Moyen-Orient. Nos ateliers transmettent toujours l'assemblage en queue d'aronde, le panneautage à plate-bande et la marqueterie.":
            'هي مركز الأثاث الراقي في الشرق الأوسط. وما زالت ورشاتنا تنقل تعشيق ذيل الحمام وتأطير الألواح البارزة والتطعيم بالخشب.',
        'voir les cinq collections':
            'شاهد المجموعات الخمس',
        'Atelier &amp; Showroom Tripoli • Rue des Ébénistes':
            'الورشة وصالة العرض في طرابلس • شارع أصحاب المهن الفنية',
        'Mobilier &amp; art de vivre, Tripoli, Liban.':
            'أثاث وفنّ المعيشة، طرابلس، لبنان.',
        'République libanaise':
            'الجمهورية اللبنانية',
        "Boulevard Fouad Chehab, Quartier des Ateliers d'Art":
            'شارع فؤاد شهاب، حي الورشات الفنية',

        Tripoli:
            'طرابلس',


        /* Champs éditoriaux des pages de collection */
        'Agencement':
            'تجهيز',
        'Ajuster le salon à votre volume, pas l’inverse':
            'ليتناسب الصالون مع مساحتك، لا العكس',
        'Assurez-vous la pose des boiseries ?':
            'هل تتولّون تركيب التخشيب؟',
        "Au-delà de la pièce isolée, nous réalisons des murs de rangement complets : bibliothèques toute hauteur, niches éclairées, portes escamotables qui masquent un bureau ou un dressing. Le calepinage est dessiné pour que chaque porte s'aligne avec les lignes de la pièce.":
            'إلى جانب القطعة الواحدة، ننفّذ جدران تخزين كاملة: مكتبات بكامل الارتفاع، وكوّات مضاءة، وأبواب مخفية تحجب مكتباً أو غرفة ملابس. يُرسم التوزيع بحيث يصطفّ كل باب مع خطوط الغرفة.',
        'Banquette Sursock en noyer massif et velours grège, assise sur-mesure de salon de réception':
            'مقعد سرسق من خشب الجوز الصلب والمخمل الرمادي الدافئ، جلسة مفصّلة لصالة استقبال',
        'Banquette de réception inspirée des salons beyrouthins du début du siècle : assise galbée, dossier bas et piètement fuselé tourné à la main. Le velours grège est sélectionné chez nos tisserands partenaires, le bois issu du séchage lent de nos propres granges.':
            'مقعد استقبال مستوحى من صالونات بيروت في مطلع القرن: جلسة منحنية وظهر منخفض وقاعدة مخروطية مشغولة على المخرطة يدوياً. يُختار المخمل الرمادي من نسّاجينا الشركاء، والخشب من تجفيف بطيء في مخازننا.',
        'Banquette « Sursock »':
            'مقعد «سرسق»',
        "Boiseries &amp; Tête de Lit sur-Mesure « Al-Fayha'a »":
            'تخشيب ورأس سرير حسب الطلب «الفيحاء»',
        "Boiseries murales et tête de lit sur-mesure en chêne pour chambre d'une résidence Maison Tripoli":
            'تخشيب جداري ورأس سرير مفصّلان من البلوط لغرفة نوم في مسكن ميزون طرابلس',
        "Boiseries murales et têtes de lit dessinées à la demande pour les chambres aux géométries complexes : pans coupés, soupentes, sous-combles. Nous fournissons les plans d'exécution, le calepinage et les prototypes de teinte avant toute mise en fabrication dans notre atelier de Tripoli.":
            'تخشيب جداري ورؤوس أسرّة تُرسم حسب الطلب للغرف ذات الهندسة المعقّدة: زوايا مقطوعة، وأسقف معلّقة، ومساحات تحت السطح. نسلّم مخططات التنفيذ والتوزيع ونماذج التشطيب قبل أي تصنيع في ورشتنا في طرابلس.',
        'Bureau Ministre « Citadelle »':
            'مكتب وزاري «القلعة»',
        "Bureau d'apparat à caissons, laqué satiné à l'ancienne en sept couches successives dans nos ateliers de Tripoli. Le plateau est protégé par un cuir patiné, les poignées fondues en bronze massif et ajustées à la main sur chaque tiroir.":
            'مكتب استقبال بألواح مؤطّرة، بطلاء لامع نصف لامع بالطريقة القديمة في سبع طبقات متتالية في ورشاتنا في طرابلس. يُحمى السطح بجلد عتيق، والمقابض مصبوبة من البرونز الصلب ومثبّتة يدوياً على كل درج.',
        'Bureau ministre Citadelle en ébène teinté et laque satinée avec poignées en bronze massif':
            'مكتب وزاري «القلعة» من الأبنوس الملوّن بطلاء نصف لامع ومقابض من البرونز الصلب',
        'Canapé Modulaire « Al-Mina »':
            'أريكة وحدات «المينا»',
        'Canapé modulaire':
            'أريكة وحدات',
        'Canapé modulaire Al-Mina en noyer massif huilé et lin bouclé écru, ébénisterie Maison Tripoli à Tripoli':
            'أريكة المينا الوحدات من خشب الجوز الصلب المزيّت والكتان المجعّد بلون العاج، نجارة ميزون طرابلس في طرابلس',
        'Canapés, banquettes et fauteuils façonnés main à Tripoli : noyer massif, lin bouclé et cuir pleine fleur. Sur mesure, livraison internationale.':
            'أرائك ومقاعد وكراسي مشغولة يدوياً في طرابلس: خشب الجوز الصلب والكتان المجعّد والجلد الكامل. تفصيل حسب الطلب وتسليم دولي.',
        'Capitonnage, matières et respiration du sommeil':
            'التنجيد والمواد وتنفّس النوم',
        'Caractéristiques de la collection':
            'مواصفات المجموعة',
        'Ce qui distingue cette collection':
            'ما يميّز هذه المجموعة',
        'Chambres &amp; Lits sur-Mesure à Tripoli | Maison Tripoli':
            'غرف نوم وأسرّة حسب الطلب في طرابلس | ميزون طرابلس',
        'Chambres &amp; Suites de Nuit sur-Mesure à Tripoli':
            'غرف وأجنحة نوم مفصّلة حسب الطلب في طرابلس',
        'Chambres &amp; suites de nuit':
            'غرف وأجنحة النوم',
        "Chaque cannelure est fraisée, ébarbée puis poncée à la main, et la façade est finie d'un seul geste continu pour éviter les surépaisseurs dans les creux. Les teintes sont validées sur panneau témoin avant finition définitive.":
            'تُفرَز كل مخدّة، ثم تُشذّب وتُصقل يدوياً، ويُنهى الوجه بحركة واحدة متّصلة لتفادي تراكم الطلاء في الأخاديد. تُعتمد الألوان على لوح نموذجي قبل التشطيب النهائي.',
        "Chaque pièce est ciselée, assemblée puis patinée à la main : deux exemplaires d'un même modèle ne se ressemblent jamais tout à fait, ce qui en fait des pièces signées plutôt que des objets industrialisés.":
            'كل قطعة تُنقش وتُجمّع وتُشيخ يدوياً: لا يتشابه نموذجان من الطراز نفسه تماماً، ما يجعلها قطعاً موقّعة لا منتجات مصنعية.',
        "Chaque pièce est déclinable : longueur du module, profondeur d'assise, hauteur de dossier, choix du tissu et de la teinte du bois. Vous validez un prototype de teinte avant lancement, et nous fabriquons pour votre volume, pas pour un standard.":
            'كل قطعة قابلة للتعديل: طول الوحدة، وعمق الجلسة، وارتفاع الظهر، واختيار القماش ولون الخشب. تعتمد نموذج التشطيب قبل الانطلاق، ونصنع لمساحتك لا لقياس جاهز.',
        "Chef-d'œuvre des ateliers du port d'Al-Mina : structure apparente en noyer foncé de la vallée, coussins d'assise garnis de plumes et lin bouclé de première sélection. Chaque module est ajustable pour composer un salon sur-mesure, du trois places à la composition d'angle.":
            'تحفة من ورشات ميناء المينا: هيكل ظاهر من جوز الوادي الداكن، ووسائد جلسة محشوّة بالريش وكتان مجعّد من أفضل الأنواع. كل وحدة قابلة للتعديل لتكوين صالون مفصّل، من ثلاث مقاعد إلى تكوين زاوية.',
        'Chêne blanchi, piètement arqué, vernis déperlant':
            'بلوط مبيّض وقاعدة مقوّسة وطلاء طارد للماء',
        'Chêne cérusé, finition huilée mate':
            'بلوط مبيّض بالشمع، تشطيب زيتي مطفي',
        'Chêne fumé libanais, lin capitonné écru':
            'بلوط لبناني مدخّن وكتان مبطّن بلون العاج',
        'Chêne fumé, boiseries intégrées, laiton brossé':
            'بلوط مدخّن وتخشيب مدمج ونحاس مصنفر',
        'Chêne massif sculpté, travertin adouci':
            'بلوط صلب منحوت وترافرتين ملطّف',
        'Chêne, noyer ou ébène — teintes personnalisées':
            'بلوط أو جوز أو أبنوس — ألوان مخصّصة',
        'Chêne, travertin et marbre du bassin levantin':
            'بلوط وترافرتين ورخام حوض الشام',
        "Colonne d'exposition taillée dans un bloc unique de travertin, adoucie et chanfreinée par nos marbriers partenaires du Nord-Liban. Pensée pour mettre en valeur une céramique, une sculpture ou une lampe, elle porte le veinage naturel de la pierre d'un seul tenant.":
            'عمود عرض منحوت من كتلة ترافرتين واحدة، ملطّف ومشطوف الحواف على يد حرفيّي الرخام الشركاء في شمال لبنان. صُمّم لإبراز خزفية أو منحوتة أو مصباح، ويحمل عروق الحجر الطبيعية من قطعة واحدة.',
        'Combien de temps faut-il pour fabriquer un canapé sur mesure à Tripoli ?':
            'كم يستغرق تصنيع أريكة مفصّلة في طرابلس؟',
        'Comment se déroule un projet de chambre sur mesure ?':
            'كيف يسير مشروع غرفة نوم مفصّلة؟',
        'Comment sont finies les façades cannelées ?':
            'كيف تُشطّب الواجهات المخدّدة؟',
        "Comptez huit à douze semaines pour une suite complète (tête de lit, boiseries, chevets et banc), et deux semaines supplémentaires pour la pose et les réglages. Une suite simple — lit et chevets — s'établit plutôt entre cinq et sept semaines.":
            'احسب ثمانية إلى اثني عشر أسبوعاً لجناح كامل (رأس سرير وتخشيب وطاولات جانبية ومقعد)، وأسبوعين إضافيين للتركيب والضبط. أمّا الجناح البسيط — سرير وطاولتان — فيستغرق بين خمسة وسبعة أسابيع.',
        'Comptez quatre à six semaines entre la validation du prototype de teinte et la livraison, pour une pièce du catalogue. Un salon complet de plusieurs modules demandera plutôt six à huit semaines. Le délai vous est confirmé par écrit au moment du devis.':
            'احسب أربعة إلى ستة أسابيع بين اعتماد نموذج التشطيب والتسليم بالنسبة لقطعة من الكتالوج. أمّا صالون كامل بعدة وحدات فيحتاج ستة إلى ثمانية أسابيع. تُثبَّت المدة كتابياً مع عرض السعر.',
        'Confort':
            'الراحة',
        'Console Basse « Bahia »':
            'طاولة منخفضة «باهية»',
        'Console basse Bahia en noyer royal sculpté et ciré à la main, mobilier d’entrée Maison Tripoli':
            'طاولة باهية المنخفضة من الجوز الملكي المنحوت والمشمّع يدوياً، أثاث مداخل ميزون طرابلس',
        "Console d'entrée ou de salon taillée dans un noyer royal séché 18 mois en grange, puis polie et cirée à la main à la cire d'abeille biologique libanaise. Deux tiroirs à fond de velours et une niche ouverte pour les objets du quotidien.":
            'طاولة مدخل أو صالون منحوتة من الجوز الملكي المجفّف في المخزن ١٨ شهراً، ثم مصقولة ومشمّعة يدوياً بشمع نحل لبناني عضوي. درجان مبطّنان بالمخمل وكوّة مفتوحة لأغراض الاستعمال اليومي.',
        'Cuir pleine fleur tanné végétal, laiton bronze antique':
            'جلد كامل مدبوغ نباتياً ونحاس برونزي عتيق',
        "Côté bureau, nous travaillons des pièces d'apparat à caissons, laquées à l'ancienne en sept couches, avec cuir patiné et poignées de bronze massif fondu puis ajusté à la main sur chaque façade.":
            'أمّا المكاتب، فنصنع قطعاً فخمة بألواح مؤطّرة، مطلية بالطريقة القديمة في سبع طبقات، مع جلد عتيق ومقابض من البرونز الصلب المصبوب والمثبّت يدوياً على كل واجهة.',
        "Dessinée pour une résidence balnéaire du littoral de Tripoli : chêne blanchi à la main, piètement arqué qui libère l'assise des convives et plateau traité pour résister aux embruns. Une pièce pensée pour les repas d'été en bord de mer.":
            'صُمّمت لمسكن ساحلي على شاطئ طرابلس: بلوط مبيّض يدوياً، وقاعدة مقوّسة تمنح الجالسين مساحة للأرجل، وسطح معالج يقاوم رشاش البحر. قطعة لأطعمة الصيف على البحر.',
        'Dinanderie':
            'صناعة النحاس',
        'Du meuble isolé au mur de rangement':
            'من القطعة الواحدة إلى جدار تخزين كامل',
        'Du plan d’architecte au plateau posé':
            'من مخطط المهندس إلى السطح المركّب',
        "Elles peuvent porter une gravure discrète — monogramme, date, nom de lieu — exécutée à la main. Une manière de marquer une pièce offerte, une distinction ou la livraison d'une résidence.":
            'يمكن أن تحمل نقشاً هادئاً — حرفاً أو تاريخاً أو اسم مكان — منفّذاً يدوياً. طريقة لتخليد قطعة مُهداة أو تكريم أو تسليم مسكن.',
        'Enfilade Tell Raymond aux façades cannelées faites main et plateau en marbre noir Marquina':
            'خزانة تل ريمون بواجهات مخدّدة مصنوعة يدوياً وسطح من رخام ماركينا الأسود',
        'Enfilade « Tell Raymond »':
            'خزانة «تل ريمون»',
        "Enfilades cannelées, consoles et bureaux d'apparat en noyer et ébène massifs, laqués et cirés à la main dans notre atelier de Tripoli, au Liban.":
            'خزائن مخدّدة وطاولات مدخل ومكاتب فخمة من الجوز والأبنوس الصلب، مطلية ومشمّعة يدوياً في ورشتنا في طرابلس، لبنان.',
        'Enfilades, Commodes &amp; Bureaux en Bois Massif':
            'خزائن وأدراج ومكاتب من الخشب الصلب',
        'Enfilades, Commodes &amp; Bureaux à Tripoli | Maison Tripoli':
            'خزائن وأدراج ومكاتب في طرابلس | ميزون طرابلس',
        'Ensemble Lit « Qadisha »':
            'طقم سرير «قاديشا»',
        'Ensemble lit Qadisha à tête de lit capitonnée en lin écru et structure en chêne fumé libanais':
            'طقم سرير قاديشا برأس مبطّن من الكتان بلون العاج وهيكل من البلوط اللبناني المدخّن',
        'Fabrication':
            'التصنيع',
        'Fauteuil Club « Miramar »':
            'كرسي كلوب «ميرامار»',
        'Fauteuil club Miramar en cuir pleine fleur tanné végétal et piètement en laiton bronze':
            'كرسي كلوب ميرامار من الجلد الكامل المدبوغ نباتياً وقاعدة من النحاس البرونزي',
        'Façades composées de 120 cannelures fraisées individuellement par nos maîtres menuisiers tripolitains, plateau en marbre noir Marquina et charnières amorties. Un rangement de réception qui dialogue avec les pierres sombres de la citadelle.':
            'واجهات من ١٢٠ مخدّة مفرّزة واحدة واحدة على يد معلّمي النجارة في طرابلس، وسطح من رخام ماركينا الأسود ومفاصل مبطّئة. قطعة استقبال تحاور حجارة القلعة الداكنة.',
        "Façonné à Tripoli selon les traditions de l'ébénisterie fine. Structure équilibrée en noyer massif, mousse haute résilience et revêtement sur-mesure.":
            'مشغول في طرابلس وفق تقاليد النجارة الراقية. هيكل متوازن من الجوز الصلب وإسفنج عالي المرونة وتغطية حسب المقاس.',
        'Finitions disponibles':
            'التشطيبات المتوفرة',
        'Garantie structure':
            'ضمان الهيكل',
        "Hommage aux forêts séculaires de la Qadisha. Tête de lit sculptée dans un chêne fumé libanais et alcôve capitonnée en lin écru déperlant. L'ensemble est réalisé aux dimensions exactes de votre chambre, avec chevets et banc de pied assortis sur demande.":
            'تحية لغابات قاديشا العريقة. رأس سرير منحوت من بلوط لبناني مدخّن وكوّة مبطّنة بكتان بلون العاج طارد للماء. يُنفّذ الطقم بمقاسات غرفتك تماماً، مع طاولات جانبية ومقعد أقدام متناسقين عند الطلب.',
        'Inspirée par la pierre historique de la forteresse Raymond de Saint-Gilles à Tripoli. Piétement sculpté à la gouge dans une seule pièce de chêne et plateau de travertin adouci, chanfreiné par nos marbriers du Nord-Liban. Une table de réception dimensionnée pour douze convives.':
            'مستوحاة من حجر قلعة ريمون دي سان جيل التاريخية في طرابلس. قاعدة منحوتة بالإزميل من قطعة بلوط واحدة وسطح ترافرتين ملطّف مشطوف على يد حرفيّي الرخام في شمال لبنان. طاولة استقبال بمقاسات اثني عشر ضيفاً.',
        'Intervenez-vous sur un relevé de cotes sur place ?':
            'هل تقومون برفع المقاسات في الموقع؟',
        'L 260 × P 105 × H 76 cm':
            'طول ٢٦٠ × عمق ١٠٥ × ارتفاع ٧٦ سم',
        "L'assise, du bois brut au garnissage":
            'الجلسة، من الخشب الخام إلى التنجيد',
        'La cannelure, la laque et le marbre':
            'التخديد والطلاء والرخام',
        "La chambre est la pièce où le sur-mesure prend tout son sens : les murs y sont rarement droits, la fenêtre rarement centrée et le plafond parfois en pente. C'est précisément là qu'un agencement dessiné à la cote devient nécessaire, et qu'un lit standard montre ses limites.":
            'غرفة النوم هي المكان الذي يتجلّى فيه التفصيل حسب الطلب: الجدران نادراً ما تكون مستقيمة، والنافذة نادراً ما تكون في الوسط، والسقف قد يكون مائلاً. هنا يصبح التجهيز المرسوم على المقاس ضرورة، ويظهر قصور السرير الجاهز.',
        "La finition est protéinée ou patinée antique : le laiton se patine naturellement avec le temps, ce qui est recherché ; un vernis incolore optionnel permet de figer l'éclat initial si vous préférez éviter les marques du temps.":
            'التشطيب إمّا بطبقة بروتينية أو بتشييخ عتيق: يتشيخ النحاس طبيعياً مع الزمن وهذا مطلوب؛ ويمكن بطلاء لا لون له أن يثبّت اللمعان الأصلي إن فضّلت تفادي آثار الزمن.',
        "La hauteur est réglable à la pose au moyen d'un câble acier et d'un raccord vissé, de 60 cm à 200 cm. Pour les architectures à grande hauteur, nous fournissons un câblage de longueur spécifique sur simple indication de la hauteur finie souhaitée.":
            'يُضبط الارتفاع عند التركيب بكابل فولاذي ووصلة ملولبة، من ٦٠ سم إلى ٢٠٠ سم. للمساحات العالية نوفّر كابلاً بطول خاصّ بمجرد تحديد الارتفاع النهائي المطلوب.',
        "La livraison s'effectue sous gants blancs, avec montage du piétement sur place et contrôle du niveau au laser. Nous repartons avec les chutes de découpe, et vous avec la garantie de conformité signée.":
            'يتم التسليم بقفازات بيضاء، مع تركيب القاعدة في الموقع وضبط الاستواء بالليزر. نأخذ معنا بقايا القصّ وتحتفظون أنتم بإفادة المطابقة موقّعة.',
        "La salle à manger est la pièce du rassemblement. Une table doit offrir le bon dégagement par convive — soixante centimètres minimum — sans encombrer la circulation. Nous étudions votre plan, proposons les dimensions justes et vérifions l'implantation avant de débiter le premier plateau.":
            'غرفة الطعام هي مكان الاجتماع. يجب أن توفّر الطاولة المساحة المناسبة لكل ضيف — ستين سنتيمتراً كحدّ أدنى — دون إعاقة الحركة. ندرس مخططك ونقترح المقاسات الصحيحة ونتحقق من التوزيع قبل قصّ أول سطح.',
        "La structure d'ébénisterie est garantie 30 ans contre tout vice de fabrication. Le garnissage et les revêtements bénéficient d'une garantie de 5 ans. Sont exclus les dommages liés à un usage non conforme ou à une exposition prolongée à l'humidité.":
            'هيكل النجارة مضمون ٣٠ عاماً ضد أي عيب في التصنيع. أمّا التنجيد والتغطيات فمضمونة ٥ أعوام. تُستثنى الأضرار الناتجة عن استعمال غير مطابق أو تعرّض مطوّل للرطوبة.',
        "Laiton lourd façonné au marteau dans les ruelles du Souk des Cuivres de Tripoli, suspension réglable et diffusion lumineuse chaude. Chaque facette est débitée, ciselée puis patinée à la main : aucune pièce n'est identique à une autre.":
            'نحاس ثقيل مشغول بالمطرقة في أزقة سوق النحّاسين في طرابلس، تعليق قابل للتعديل وإضاءة دافئة. كل وجه يُقصّ ويُنقش ويُشيخ يدوياً: لا تتطابق قطعتان.',
        'Laiton massif martelé à la main':
            'نحاس صلب مطروق يدوياً',
        'Le cadre est en chêne, noyer ou ébène massif. Le garnissage associe une mousse technique à densités différenciées et un textile respirant : lin lavé, laine déperlante ou velours. Les tissus synthétiques sont déconseillés pour préserver le confort de respiration du couchage.':
            'الهيكل من البلوط أو الجوز أو الأبنوس الصلب. يجمع التنجيد بين إسفنج تقني بكثافات متباينة ونسيج يتنفّس: كتان مغسول أو صوف طارد للماء أو مخمل. لا نوصي بالأقمشة الصناعية حفاظاً على تهوية الفراش.',
        "Le chêne de nos plateaux provient de fûts sélectionnés pour la régularité de leur veinage, débités en plots larges afin d'éviter les joints disgracieux au centre de la table. Le chêne blanchi, cérusé ou fumé est travaillé à la main dans l'atelier.":
            'يأتي بلوط أسطحنا من جذوع مختارة لانتظام عروقها، تُقصّ إلى ألواح عريضة لتفادي الوصلات القبيحة في وسط الطاولة. ويُشغّل البلوط المبيّض أو المكرّر أو المدخّن يدوياً في الورشة.',
        "Le garnissage est réalisé à l'ancienne : sangles de jute tendues, ressorts noyés, plumes d'oie enveloppées dans des toiles de coton. Le revêtement est coupé et posé par un tapissier qui ajuste les raccords de motif à la main.":
            'يُنفّذ التنجيد بالطريقة القديمة: أحزمة جوت مشدودة، ونوابض مغروسة، وريش إوز ملفوف بأقمشة قطنية. ويُقصّ الغلاف ويُركّب على يد منجّد يضبط تطابق النقوش يدوياً.',
        "Le laiton brut évolue naturellement vers une teinte ambrée puis plus profonde : c'est une patine recherchée, qui garde la mémoire du toucher. Une finition protéinée peut figer l'éclat d'origine si vous préférez une lecture constante.":
            'يتحوّل النحاس الخام طبيعياً إلى لون عنبري ثم أغمق: وهو تشييخ مرغوب يحفظ أثر اللمس. ويمكن بطبقة بروتينية تثبيت اللمعان الأصلي إن فضّلت مظهراً ثابتاً.',
        "Le laiton est mis en forme au marteau sur des formes de bois, puis recuit pour retrouver sa ductilité avant d'être retravaillé. Le ciselage se fait à froid, à l'aide de poinçons et de burins : c'est cette étape qui creuse les facettes et fabrique la diffusion lumineuse si particulière des lustres de Tripoli.":
            'يُشكّل النحاس بالمطرقة على قوالب خشبية، ثم يُلدّن ليستعيد مرونته قبل إعادة تشغيله. ويُنقش على البارد بالمثاقب والأزاميل: هذه المرحلة هي التي تحفر الأوجه وتصنع الانتشار الضوئي المميّز لثريات طرابلس.',
        'Le laiton se patine-t-il avec le temps ?':
            'هل يتشيخ النحاس مع الزمن؟',
        'Le laiton, du Souk des Cuivres à votre plafond':
            'النحاس، من سوق النحّاسين إلى سقفك',
        "Le noyer est sélectionné en grume, débité puis séché lentement dans nos granges du Nord-Liban pendant dix-huit mois. Vient ensuite l'assemblage à queue d'aronde et tenon-mortaise, sans vis apparente, qui garantit la tenue du cadre sur plusieurs décennies.":
            'يُختار الجوز من الجذوع، ثم يُقصّ ويُجفّف ببطء في مخازننا في شمال لبنان ثمانية عشر شهراً. بعدها يأتي التعشيق بذيل الحمام والنقر واللسان، دون براغٍ ظاهرة، ما يضمن ثبات الهيكل لعقود.',
        "Le noyer et le chêne offrent la meilleure stabilité pour un plan de travail, l'ébène teinté et le laqué étant réservés aux pièces d'apparat. Le plateau peut recevoir un cuir patiné collé à chaud, insensible aux variations d'humidité.":
            'يمنح الجوز والبلوط أفضل استقرار لسطح العمل، أمّا الأبنوس الملوّن والطلاء فيُخصّصان للقطع الفخمة. ويمكن أن يحمل السطح جلداً عتيقاً ملصوقاً بالحرارة، لا يتأثر بتغيّر الرطوبة.',
        'Le plateau en travertin craint-il les taches ?':
            'هل يتأثر سطح الترافرتين بالبقع؟',
        "Le rangement est le révélateur d'un intérieur : c'est lui qui libère les surfaces et donne sa respiration à une pièce. Nos enfilades, commodes et consoles sont dessinées autour de vos objets, avec des profondeurs utiles pensées pour le linge de table, la vaisselle ou la documentation.":
            'التخزين هو كاشف التصميم الداخلي: به تُفرَّغ الأسطح وتتنفّس الغرفة. نرسم خزائننا وأدراجنا وطاولات المدخل حول مقتنياتك، بأعماق عملية مدروسة لبياض المائدة والأطباق والأوراق.',
        'Le travertin est une pierre poreuse par nature : nous appliquons systématiquement un traitement hydrofuge et oléofuge en deux passes après le polissage. Un essuyage rapide suffit alors au quotidien. Une réimprégnation est conseillée tous les deux ans.':
            'الترافرتين حجر مسامي بطبيعته: نطبّق دائماً معالجاً طارداً للماء والزيت على مرحلتين بعد الصقل. ويكفي عندها مسح سريع في الاستعمال اليومي. ونوصي بإعادة التشريب كل عامين.',
        "Le travertin et le marbre sont débités et chanfreinés par nos marbriers partenaires de la région du Nord-Liban. Les dalles sont choisies côte à côte pour que le veinage se poursuive d'un bout à l'autre du plateau, puis adoucies et traitées contre les taches.":
            'يُقصّ الترافرتين والرخام وتُشطف حوافهما على يد حرفيّي الرخام الشركاء في شمال لبنان. تُختار الألواح متجاورة لتستمر العروق من طرف السطح إلى طرفه، ثم تُلطَّف وتُعالج ضد البقع.',
        "Les finitions varient selon l'usage : cirée à la cire d'abeille pour les bois nobles qui doivent se patiner, laquée satinée pour les pièces d'apparat, huilée pour les surfaces de contact fréquent. Les plateaux de marbre sont choisis avec vous en atelier, sur dalle.":
            'تتنوّع التشطيبات بحسب الاستعمال: شمع نحل للأخشاب النبيلة التي يُراد لها أن تتشيخ، وطلاء نصف لامع للقطع الفخمة، وزيت للأسطح كثيرة الملامسة. أمّا أسطح الرخام فتُختار معك في الورشة من اللوح.',
        'Lits, têtes de lit capitonnées et boiseries de chambre sur mesure, façonnés à Tripoli en chêne fumé et lin. Étude sur plan ou relevé de cotes sur place.':
            'أسرّة ورؤوس أسرّة مبطّنة وتخشيب غرف حسب الطلب، مشغولة في طرابلس من البلوط المدخّن والكتان. دراسة على مخطط أو برفع مقاسات في الموقع.',
        'Livrez-vous les salons à l’étranger ?':
            'هل تسلّمون الصالونات إلى الخارج؟',
        'Lustre Géométrique « Khan »':
            'ثريا هندسية «خان»',
        'Lustre géométrique Khan en laiton massif martelé à la main, éclairage d’art de Tripoli':
            'ثريا خان الهندسية من النحاس الصلب المطروق يدوياً، إضاءة فنية من طرابلس',
        "Lustres en Laiton &amp; Objets d'Art à Tripoli | Maison Tripoli":
            'ثريات نحاسية وقطع فنية في طرابلس | ميزون طرابلس',
        "Lustres en laiton massif martelé du Souk des Cuivres, sellets et objets en travertin : pièces d'art façonnées main dans notre atelier de Tripoli, Liban.":
            'ثريات من النحاس الصلب المطروق من سوق النحّاسين، وطاولات جانبية وقطع من الترافرتين: أعمال فنية مشغولة يدوياً في ورشتنا في طرابلس، لبنان.',
        'Matières':
            'المواد',
        "Menuiserie d'art":
            'نجارة فنية',
        'Méthode':
            'المنهج',
        "Nos plateaux sont massifs, bordés à la main et protégés par une finition huilée ou un cuir patiné. Le piétement est choisi pour libérer l'assise des jambes : monolithe sculpté, arche centrale ou deux pieds en V inversé selon le style du lieu.":
            'أسطحنا صلبة وحوافها مشغولة يدوياً ومحمية بتشطيب زيتي أو جلد عتيق. وتُختار القاعدة لتفسح مجالاً للأرجل: كتلة منحوتة أو قوس مركزي أو رجلان على شكل V مقلوب بحسب طراز المكان.',
        "Nous concevons des ensembles complets — tête de lit, boiseries, chevets suspendus, bac de lit et banc de pied — dans un même langage de matières. L'ensemble est ensuite fabriqué dans notre atelier de Tripoli et posé par nos soins.":
            'نصمّم أطقماً كاملة — رأس سرير وتخشيب وطاولات جانبية معلّقة وحوض سرير ومقعد أقدام — بلغة مواد واحدة. ثم يُصنع الطقم في ورشتنا في طرابلس ويُركّب على أيدينا.',
        "Nous démarrons par un relevé de cotes, sur place au Liban ou sur plan pour l'étranger, puis nous produisons les élévations et le plan d'implantation. Après validation des teintes et des textiles, la fabrication en atelier prend huit à quatorze semaines selon l'ampleur des boiseries.":
            'نبدأ برفع المقاسات، في الموقع داخل لبنان أو على المخطط للخارج، ثم ننتج الواجهات ومخطط التوزيع. بعد اعتماد الألوان والأقمشة يستغرق التصنيع في الورشة ثمانية إلى أربعة عشر أسبوعاً حسب حجم التخشيب.',
        'Nous expédions en Europe, dans le Golfe et en Afrique du Nord. Les pièces sont emballées en caisse bois sur mesure, manipulées sous gants blancs et dédouanées par notre transitaire. Les frais de fret sont calculés après étude du volume et de la destination.':
            'نشحن إلى أوروبا والخليج وشمال إفريقيا. تُغلّف القطع في صناديق خشبية مفصّلة، وتُتداول بقفازات بيضاء، وتُخلَّص جمركياً عبر وكيلنا. وتُحتسب أجور الشحن بعد دراسة الحجم والوجهة.',
        "Nous fabriquons les assises assorties — chaises à dossier plein, chaises-coques en cuir sellier ou bancs filants — dans la même essence et avec le même traitement de finition, afin que l'ensemble lise comme une pièce unique.":
            'نصنع الجلسات المتناسقة — كراسي بظهر مصمت، أو كراسي بقشرة جلد سروجي، أو مقاعد طويلة — من العرق نفسه وبتشطيب واحد، ليُقرأ الطقم كقطعة واحدة.',
        'Noyer massif huilé, lin bouclé écru, garnissage plumes':
            'جوز صلب مزيّت، كتان مجعّد بلون العاج، حشو ريش',
        'Noyer massif, marbre noir Marquina':
            'جوز صلب، رخام ماركينا الأسود',
        'Noyer massif, velours grège, piètement fuselé':
            'جوز صلب، مخمل رمادي دافئ، قاعدة مخروطية',
        'Noyer royal ciré à la cire d’abeille':
            'جوز ملكي مشمّع بشمع النحل',
        'Objets':
            'قطع فنية',
        "Oui, c'est le cœur de notre service aux professionnels : lecture de plans, dessins d'exécution, prototypes de teinte, nomenclatures matières et livraison sur chantier. Nous intervenons du Liban à l'Europe et au Golfe.":
            'نعم، هذا جوهر خدمتنا للمهنيين: قراءة المخططات، ومخططات التنفيذ، ونماذج التشطيب، وجداول المواد، والتسليم إلى الموقع. نعمل من لبنان إلى أوروبا والخليج.',
        "Oui, chaque assise est déclinable au centimètre : longueur, profondeur, hauteur d'assise et de dossier. Côté revêtement, nous travaillons avec les tissus Rubelli, Pierre Frey et Loro Piana, ainsi qu'avec le cuir pleine fleur tanné végétal de nos tanneries partenaires.":
            'نعم، كل مقعد قابل للتعديل بالسنتيمتر: الطول والعمق وارتفاع الجلسة والظهر. أمّا التغطية فنعمل مع أقمشة روبّيلي وبيير فراي ولورو بيانا، ومع الجلد الكامل المدبوغ نباتياً من مدابغنا الشريكة.',
        "Oui, chaque luminaire est câblé avec des douilles en céramique, du fil doublement isolé et des raccords conformes aux exigences CE et IEC. Un marquage et une notice de montage accompagnent la livraison ; l'installation doit être réalisée par un électricien qualifié.":
            'نعم، كل مصباح موصول بمساكات خزفية وسلك مزدوج العزل ووصلات مطابقة لمتطلّبات CE وIEC. ويُسلَّم معه وسم وورقة تركيب؛ ويجب أن يقوم بالتركيب كهربائي مؤهّل.',
        'Oui, nos enfilades se déclinent de 120 à 400 cm, avec un nombre de portes et de caissons ajustable. Le pas des cannelures est recalculé pour rester régulier quelle que soit la longueur finale, sans cannelure coupée en bout.':
            'نعم، تُنفَّذ خزائننا من ١٢٠ إلى ٤٠٠ سم، بعدد أبواب وصناديق قابل للتعديل. ويُعاد حساب تباعد المخدّات ليبقى منتظماً أيّاً كان الطول النهائي، دون مخدّة مقطوعة في الطرف.',
        "Oui, nos équipes assurent la pose au Liban, y compris les murs de rangement toute hauteur et les bibliothèques intégrées. À l'étranger, nous formons les équipes de pose locales et supervisons le chantier par visioconférence ou sur site.":
            'نعم، تتولّى فرقنا التركيب في لبنان، بما في ذلك جدران التخزين بكامل الارتفاع والمكتبات المدمجة. وفي الخارج ندرّب فرق التركيب المحلية ونشرف على الورشة بالاتصال المرئي أو حضورياً.',
        "Oui, partout au Liban, généralement dans les dix jours suivant la validation d'intention. À l'étranger, nous travaillons sur plans vérifiés par votre architecte et nous nous déplaçons pour la pose finale, une fois les ouvrages prêts à recevoir.":
            'نعم، في كل لبنان، عادةً خلال عشرة أيام من إقرار الاتجاه. وفي الخارج نعمل على مخططات يتحقق منها مهندسك، ونتنقّل للتركيب النهائي بعد أن تصبح الأعمال جاهزة.',
        "Petite table d'usage, dite « de portage », dont le veinage linéaire est sélectionné à la gouge puis cérusé à la main. Finition sablée et huilée mat pour préserver la clarté méditerranéenne du bois. Idéale en accoudoir de canapé ou en chevet de grande suite.":
            'طاولة صغيرة للاستعمال، تُعرف بـ«طاولة الحمل»، تُختار عروقها المستقيمة بالإزميل ثم تُكرَّر يدوياً. تشطيب رملي وزيتي مطفي للحفاظ على إشراق الخشب المتوسطي. مثالية بجانب الأريكة أو في جناح واسع.',
        'Peut-on adapter la hauteur de suspension ?':
            'هل يمكن تعديل ارتفاع التعليق؟',
        'Peut-on adapter la longueur d’une enfilade ?':
            'هل يمكن تعديل طول الخزانة؟',
        'Peut-on assortir les chaises à la table ?':
            'هل يمكن تنسيق الكراسي مع الطاولة؟',
        'Peut-on choisir la dimension et le tissu du canapé ?':
            'هل يمكن اختيار مقاس الأريكة وقماشها؟',
        'Pièces au catalogue':
            'قطع من الكتالوج',
        "Pour le garnissage, nous privilégions le lin lavé et les laines déperlantes, naturellement respirantes, plutôt que les textiles synthétiques qui retiennent l'humidité. Les teintes sont validées sur un prototype de trente centimètres avant lancement.":
            'في التنجيد نفضّل الكتان المغسول والأصواف الطاردة للماء، فهي تتنفّس طبيعياً، بدل الأقمشة الصناعية التي تحبس الرطوبة. وتُعتمد الألوان على نموذج بطول ثلاثين سنتيمتراً قبل الانطلاق.',
        "Pour les projets hôteliers et résidentiels d'envergure, nous livrons les ouvrages par lots numérotés avec un plan de pose par chambre, afin que les équipes de chantier posent sans erreur et sans retouche.":
            'في المشاريع الفندقية والسكنية الكبرى، نسلّم الأعمال على دفعات مرقّمة مع مخطط تركيب لكل غرفة، حتى تثبّت فرق الورشة دون خطأ ودون إعادة عمل.',
        "Première étape : le relevé. Nous nous déplaçons au Liban ou travaillons sur plan vérifié pour les projets à l'étranger. Deuxième étape : le dessin d'aménagement, avec élévations cotées et implantation des chevets, prises et éclairages.":
            'المرحلة الأولى: رفع المقاسات. نتنقّل داخل لبنان أو نعمل على مخطط متحقَّق منه للمشاريع في الخارج. المرحلة الثانية: رسم التجهيز، مع واجهات بمقاسات وتوزيع الطاولات الجانبية والمقابس والإضاءة.',
        'Proposez-vous des pièces uniques ?':
            'هل تقدّمون قطعاً فريدة؟',
        'Prévoyez 60 cm de largeur utile par convive, soit environ 360 cm pour douze personnes réparties des deux côtés, ou 300 cm si les extrémités sont occupées. Nous vérifions systématiquement le dégagement disponible dans la pièce avant de valider les cotes.':
            'احسب ٦٠ سم عرضاً صافياً لكل ضيف، أي نحو ٣٦٠ سم لاثني عشر شخصاً موزّعين على الجانبين، أو ٣٠٠ سم إذا كانت الأطراف مشغولة. نتحقق دائماً من المساحة المتاحة في الغرفة قبل تثبيت المقاسات.',
        'Quel délai pour une suite de nuit complète ?':
            'كم تستغرق غرفة نوم كاملة؟',
        'Quelle dimension de table pour douze convives ?':
            'أيّ مقاس طاولة لاثني عشر ضيفاً؟',
        'Quelle garantie s’applique sur une assise en noyer massif ?':
            'أيّ ضمان يشمل مقعداً من الجوز الصلب؟',
        'Quelles essences pour un bureau sur mesure ?':
            'أيّ أخشاب لمكتب حسب الطلب؟',
        'Quelles matières pour une tête de lit capitonnée ?':
            'أيّ مواد لرأس سرير مبطّن؟',
        'Rangements, enfilades &amp; bureaux':
            'خزائن وأدراج ومكاتب',
        'Salons &amp; Banquettes en Noyer Massif, Sculptés à Tripoli':
            'صالونات ومقاعد من الجوز الصلب، منحوتة في طرابلس',
        'Salons &amp; Canapés en Noyer Massif à Tripoli | Maison Tripoli':
            'صالونات وأرائك من الجوز الصلب في طرابلس | ميزون طرابلس',
        'Savoir-faire':
            'الحرفة',
        'Sellets, plateaux et pièces de collection':
            'طاولات جانبية وصواني وقطع للهواة',
        'Sellette Monolithe en Travertin':
            'طاولة جانبية من الترافرتين',
        'Sellette monolithe en travertin romain adouci, socle d’exposition en pierre naturelle levantine':
            'طاولة جانبية من الترافرتين الروماني الملطّف، قاعدة عرض من الحجر الطبيعي الشامي',
        "Si vous travaillez avec un architecte d'intérieur, notre bureau d'études fournit les fichiers techniques, les nomenclatures de tissus et les échantillons nécessaires à la validation du projet par votre client.":
            'إذا كنت تعمل مع مهندس ديكور داخلي، يوفّر مكتب دراساتنا الملفات الفنية وجداول الأقمشة والعيّنات اللازمة لاعتماد المشروع من عميلك.',
        "Si, trois à quatre fois par an, nous éditons des pièces uniques en collaboration avec les maîtres dinandiers du souk : grande suspension, paravent de laiton ou ensemble de sellets. Les projets de création dédiés sont possibles, avec un délai d'étude de quatre à six semaines.":
            'نعم، ثلاث إلى أربع مرات في السنة نُصدر قطعاً فريدة بالتعاون مع معلّمي النحاس في السوق: تعليقة كبيرة أو حاجز من النحاس أو طقم طاولات جانبية. ويمكن تنفيذ مشاريع إبداعية مخصّصة بمدة دراسة من أربعة إلى ستة أسابيع.',
        'Suite de Nuit « Achrafieh »':
            'جناح نوم «الأشرفية»',
        'Suite de nuit Achrafieh avec boiseries intégrées en chêne fumé et chevets suspendus en laiton':
            'جناح نوم الأشرفية بتخشيب مدمج من البلوط المدخّن وطاولات جانبية نحاسية معلّقة',
        'Suite de nuit complète : tête de lit, boiseries murales, chevets suspendus et banc capitonné dessinés pour un même volume. Le projet démarre par un relevé de cotes sur place ou sur plan, puis un prototype de teinte validé en atelier avant lancement de la fabrication.':
            'جناح نوم كامل: رأس سرير وتخشيب جداري وطاولات جانبية معلّقة ومقعد مبطّن، مرسومة لمساحة واحدة. يبدأ المشروع برفع مقاسات في الموقع أو على المخطط، ثم نموذج تشطيب يُعتمد في الورشة قبل بدء التصنيع.',
        'Table Monolithe « Citadelle »':
            'طاولة «القلعة» الصلبة',
        "Table d'Appoint « Tripoli »":
            'طاولة جانبية «طرابلس»',
        "Table d'appoint Tripoli en chêne clair cérusé, finition huilée mate, mobilier sur-mesure libanais":
            'طاولة طرابلس الجانبية من البلوط الفاتح المكرَّر بتشطيب زيتي مطفي، أثاث لبناني حسب الطلب',
        'Table de Réception « Al-Bahr »':
            'طاولة استقبال «البحر»',
        'Table de réception Al-Bahr en chêne blanchi pour salle à manger de résidence balnéaire à Tripoli':
            'طاولة استقبال البحر من البلوط المبيّض لغرفة طعام في مسكن ساحلي في طرابلس',
        'Table monolithe Citadelle en chêne massif sculpté et travertin veiné, table de réception Maison Tripoli':
            'طاولة القلعة الصلبة من البلوط الصلب المنحوت والترافرتين المعرّق، طاولة استقبال ميزون طرابلس',
        'Tables de Réception &amp; Salles à Manger en Bois Massif':
            'طاولات استقبال وغرف طعام من الخشب الصلب',
        'Tables de Réception &amp; Salles à Manger | Maison Tripoli':
            'طاولات استقبال وغرف طعام | ميزون طرابلس',
        "Tables de réception en chêne et travertin, tables d'appoint et sellets en pierre naturelle : mobilier de salle à manger fabriqué à Tripoli. Devis en 24 h.":
            'طاولات استقبال من البلوط والترافرتين، وطاولات جانبية ومقاعد من الحجر الطبيعي: أثاث غرف الطعام مصنوع في طرابلس. عرض سعر خلال ٢٤ ساعة.',
        'Toutes les pièces sont déclinables en dimensions, essences et textiles. Sélectionnez une pièce pour en consulter la fiche détaillée.':
            'كل القطع قابلة للتعديل في المقاسات والأخشاب والأقمشة. اختر قطعة لعرض بطاقتها التفصيلية.',
        'Travertin romain adouci et chanfreiné':
            'ترافرتين روماني ملطّف ومشطوف',
        "Troisième étape : les prototypes de teinte et les échantillons textiles, validés par vous ou votre architecte. Quatrième étape : la fabrication en atelier, la livraison sous gants blancs et la pose, suivies d'un réglage des portes et tiroirs après une semaine de mise en place.":
            'المرحلة الثالثة: نماذج التشطيب وعيّنات الأقمشة، تُعتمد منك أو من مهندسك. المرحلة الرابعة: التصنيع في الورشة، والتسليم بقفازات بيضاء والتركيب، يتبعها ضبط الأبواب والأدراج بعد أسبوع من التركيب.',
        "Un intérieur se termine par la lumière et par les objets. Nos luminaires et pièces d'art sont fabriqués en petites séries dans les ateliers d'artisans de Tripoli, dans la continuité d'une tradition de dinanderie qui a fait la réputation du Souk des Cuivres.":
            'يكتمل التصميم الداخلي بالضوء والقطع الفنية. تُصنع مصابيحنا وقطعنا الفنية بدفعات صغيرة في ورشات حرفيّي طرابلس، استمراراً لتقليد صناعة النحاس الذي بنى سمعة سوق النحّاسين.',
        'Un projet de chambre en quatre étapes':
            'مشروع غرفة نوم في أربع مراحل',
        "Un salon d'angle dans une pièce en L, une banquette filante sous une fenêtre à arcades, deux fauteuils clubs face à une cheminée : nous partons de vos cotes et de vos usages. Un plan de calepinage vous est transmis avant fabrication, avec l'implantation des modules, les passages et les dégagements.":
            'صالون زاوية في غرفة على شكل L، أو مقعد ممتد تحت نافذة ذات أقواس، أو كرسيّا كلوب أمام مدفأة: ننطلق من مقاساتك وطريقة استعمالك. نرسل مخطط التوزيع قبل التصنيع، مع مواضع الوحدات والممرات والمسافات.',
        "Un salon réussi tient à trois choses : la justesse des proportions, la noblesse de la matière et le confort d'usage. Nos assises sont dessinées dans l'atelier de Tripoli, assemblées à tenons et mortaises, puis garnies à la main — plumes d'oie pour l'assise, mousse haute résilience pour le maintien.":
            'الصالون الناجح يقوم على ثلاثة أمور: دقّة النسب، ونُبل المادة، وراحة الاستعمال. تُرسم جلساتنا في ورشة طرابلس، وتُجمَّع بالنقر واللسان، ثم تُنجَّد يدوياً — ريش إوز للجلسة وإسفنج عالي المرونة للدعم.',
        'Une autre question ?':
            'سؤال آخر؟',
        "Une façade cannelée se travaille avec des fraises profilées réglées à la main : chaque cannelure est fraisée, ébarbée puis poncée individuellement avant assemblage. C'est cette régularité du pas qui donne à l'enfilade sa lecture architecturale et son ombre portée.":
            'تُشغّل الواجهة المخدّدة بفرازات مبروفة تُضبط يدوياً: كل مخدّة تُفرَز وتُشذّب وتُصقل واحدة واحدة قبل التجميع. وهذا الانتظام في التباعد هو ما يمنح الخزانة قراءتها المعمارية وظلّها المسقط.',
        "Une tête de lit capitonnée se compose d'un cadre de bois massif, d'une mousse technique et d'un garnissage textile. Nous écartons les mousses trop fermes qui rendent l'appui inconfortable en lecture, et privilégions des densités différenciées selon la hauteur d'appui.":
            'يتكوّن رأس السرير المبطّن من إطار خشب صلب وإسفنج تقني وتغطية نسيجية. نستبعد الإسفنج الصلب جداً الذي يجعل الاستناد غير مريح أثناء القراءة، ونفضّل كثافات متباينة بحسب ارتفاع الاستناد.',
        'Vos luminaires sont-ils électrifiés aux normes ?':
            'هل مصابيحكم موصولة وفق المعايير؟',
        "Vous nous transmettez un plan, un relevé ou une intention : nous produisons les dessins d'exécution, le calepinage des dalles et une proposition de piètement. Une maquette à l'échelle peut être réalisée pour les configurations complexes ou les volumes atypiques.":
            'ترسل إلينا مخططاً أو رفع مقاسات أو فكرة: ننتج مخططات التنفيذ وتوزيع الألواح واقتراحاً للقاعدة. ويمكن تنفيذ مجسّم بالمقاس للحالات المعقّدة أو المساحات غير النمطية.',
        'banquette velours sur mesure':
            'مقعد مخمل حسب الطلب',
        'boiseries de chambre sur mesure':
            'تخشيب غرف حسب الطلب',
        'bureau sur mesure ébène':
            'مكتب أبنوس حسب الطلب',
        'canapé sur mesure Tripoli':
            'أريكة حسب الطلب طرابلس',
        'chambre sur mesure architecte':
            'غرفة حسب الطلب لمهندس',
        'commode noyer massif Tripoli':
            'خزانة جوز صلب طرابلس',
        'enfilade sur mesure Liban':
            'خزانة حسب الطلب لبنان',
        'fauteuil club cuir Tripoli':
            'كرسي كلوب جلد طرابلس',
        'lit sur mesure Tripoli':
            'سرير حسب الطلب طرابلس',
        'luminaire artisanal Tripoli':
            'إضاءة حرفية طرابلس',
        'lustre laiton massif Liban':
            'ثريا نحاس صلب لبنان',
        'menuiserie d’art Tripoli':
            'نجارة فنية طرابلس',
        'objet décoratif travertin':
            'قطعة زخرفية ترافرتين',
        'pièce unique laiton martelé':
            'قطعة فريدة نحاس مطروق',
        'plateau travertin sur mesure Liban':
            'سطح ترافرتين حسب الطلب لبنان',
        'salon en noyer massif Liban':
            'صالون جوز صلب لبنان',
        'table de réception sur mesure':
            'طاولة استقبال حسب الطلب',
        'table salle à manger chêne massif':
            'طاولة طعام بلوط صلب',
        'table sur plan architecte Tripoli':
            'طاولة على مخطط مهندس طرابلس',
        'tête de lit capitonnée Liban':
            'رأس سرير مبطّن لبنان',
        'À côté des luminaires, nous taillons des objets de présentation : sellets monolithes en travertin, plateaux en marbre noir, socles pour céramiques ou sculptures. Ces pièces sont découpées dans des chutes de nos plateaux de table, ce qui leur donne une parenté de matière avec le mobilier de la pièce.':
            'إلى جانب الإضاءة، ننحت قطع عرض: طاولات جانبية صلبة من الترافرتين، وصواني من الرخام الأسود، وقواعد للخزفيات والمنحوتات. تُقصّ هذه القطع من بقايا أسطح طاولاتنا، ما يمنحها قرابة مادية مع أثاث الغرفة.',
        'Ébène teinté, laque satinée 7 couches, bronze':
            'أبنوس ملوّن، طلاء نصف لامع بسبع طبقات، برونز',
        "Éclairage d'Art &amp; Objets en Laiton et Travertin":
            'إضاءة فنية وقطع من النحاس والترافرتين',
        "Écrivez à l'atelier":
            'راسل الورشة',
        'Élégance méditerranéenne intemporelle. Cuir pleine fleur patiné artisanalement dans les cours intérieures de Tripoli, coutures sellier et piètement en laiton brossé. Une édition numérotée de trente pièces par an, fabriquée dans notre atelier du Nord-Liban.':
            'أناقة متوسطية خالدة. جلد كامل مُشيَّخ حرفياً في الأفنية الداخلية لطرابلس، وخياطة سروجية، وقاعدة من النحاس المصنفر. إصدار مرقّم من ثلاثين قطعة سنوياً، يُصنع في ورشتنا في شمال لبنان.',
        'Fabriquez-vous des tables sur plan d’architecte ?':
            'هل تصنعون طاولات على مخطط مهندس؟',
        "Vous nous transmettez un plan, un relevé ou une intention : nous produisons les dessins d'exécution, le calepinage des dalles et une proposition de piétement. Une maquette à l'échelle peut être réalisée pour les configurations complexes ou les volumes atypiques.":
            'ترسل إلينا مخططاً أو رفع مقاسات أو فكرة: ننتج مخططات التنفيذ وتوزيع الألواح واقتراحاً للقاعدة. ويمكن تنفيذ مجسّم بالمقاس للحالات المعقّدة أو المساحات غير النمطية.',

        /* Libellés de page des collections */
        'Chêne blanchi':
            'بلوط مبيّض',
        'Chêne cérusé':
            'بلوط مكرَّر',
        'Demander un devis':
            'اطلب عرض سعر',
        'Découvrir aussi':
            'اكتشف أيضاً',
        'Laiton massif':
            'نحاس صلب',
        'Les pièces de la collection':
            'قطع المجموعة',
        'Noyer massif &amp; bouclé':
            'جوز صلب وكتان مجعّد',
        'Noyer sculpté':
            'جوز منحوت',
        'Pièce maîtresse':
            'القطعة الرئيسية',
        'Poursuivre la visite':
            'تابع الزيارة',
        'Projet sur devis':
            'مشروع بعرض سعر',
        'Questions fréquentes':
            'الأسئلة الشائعة',
        'Recevez votre devis personnalisé':
            'احصل على عرض سعر مخصّص',
        'Suite complète':
            'جناح كامل',
        'Tête de lit sur-mesure':
            'رأس سرير حسب الطلب',
        'Velours grège':
            'مخمل رمادي دافئ',
        'Voir la méthode sur-mesure':
            'شاهد منهج التفصيل',
        'nous répondons sous 24 heures.':
            'نجيبك خلال ٢٤ ساعة.',
        'À partir de':
            'ابتداءً من',
        'Ébène &amp; bronze':
            'أبنوس وبرونز',
        'Édition numérotée':
            'إصدار مرقّم',

        /* Fiches techniques des collections */
        '30 ans sur la structure d’ébénisterie':
            '٣٠ عاماً على هيكل النجارة',
        '60 cm par convive, 90 cm de recul':
            '٦٠ سم لكل ضيف، و٩٠ سم مسافة خلفية',
        'Accastillage':
            'التراكيب المعدنية',
        'Antique protéiné ou laiton brut évolutif':
            'تشييخ عتيق بطبقة بروتينية أو نحاس خام متطوّر',
        'Assemblage':
            'التجميع',
        'Assurée par nos équipes au Liban':
            'تتولّاها فرقنا في لبنان',
        'Boiseries':
            'التخشيب',
        'Boiseries murales et chevets intégrés':
            'تخشيب جداري وطاولات جانبية مدمجة',
        'Bronze massif, laiton brossé, charnières amorties':
            'برونز صلب، نحاس مصنفر، مفاصل مبطّئة',
        'Cannelées, à plate-bande ou laquées':
            'مخدّدة أو مؤطّرة أو مطلية',
        'Charnières amorties et tiroirs à fond de velours':
            'مفاصل مبطّئة وأدراج مبطّنة بالمخمل',
        'Chêne massif, travertin ou marbre':
            'بلوط صلب أو ترافرتين أو رخام',
        'Chêne, noyer ou ébène, teinte sur mesure':
            'بلوط أو جوز أو أبنوس، بلون حسب الطلب',
        'Câble acier réglable de 60 à 200 cm':
            'كابل فولاذي قابل للتعديل من ٦٠ إلى ٢٠٠ سم',
        'De 140 à 320 cm sur mesure':
            'من ١٤٠ إلى ٣٢٠ سم حسب الطلب',
        'Douilles céramique, câblage CE / IEC':
            'مساكات خزفية وتوصيل مطابق CE / IEC',
        'Dégagement conseillé':
            'المسافة الموصى بها',
        'Essences':
            'الأخشاب',
        'Façades':
            'الواجهات',
        'Façades cannelées fraisées à la main':
            'واجهات مخدّدة مفرّزة يدوياً',
        'Finition':
            'التشطيب',
        'Fonds de tiroir velours, plateaux amovibles':
            'قيعان أدراج مخملية وصواني قابلة للنزع',
        'Garantie':
            'الضمان',
        'Garnissage':
            'التنجيد',
        'Hauteur de suspension réglable':
            'ارتفاع تعليق قابل للتعديل',
        'Huile dure, vernis déperlant ou cire':
            'زيت صلب أو طلاء طارد للماء أو شمع',
        'Intérieurs':
            'الداخل',
        'Laiton massif martelé et patiné main':
            'نحاس صلب مطروق ومُشيَّخ يدوياً',
        'Laiton massif, travertin, bronze':
            'نحاس صلب، ترافرتين، برونز',
        'Largeur 160 à 320 cm, appui 120 cm':
            'العرض من ١٦٠ إلى ٣٢٠ سم، مسند بارتفاع ١٢٠ سم',
        'Lin lavé, laine déperlante, velours':
            'كتان مغسول أو صوف طارد للماء أو مخمل',
        'Longueur utile':
            'الطول الصافي',
        'Marbre et bronze ajustés sur mesure':
            'رخام وبرونز مضبوطان حسب المقاس',
        'Matériaux':
            'المواد',
        'Modules et dimensions ajustables au centimètre':
            'وحدات ومقاسات قابلة للتعديل بالسنتيمتر',
        'Noyer ou chêne massif, séché 18 mois':
            'جوز أو بلوط صلب، مجفّف ١٨ شهراً',
        'Noyer, chêne, ébène teinté':
            'جوز، بلوط، أبنوس ملوّن',
        'Patiné':
            'مُشيَّخ',
        'Plateau':
            'السطح',
        'Plateaux massifs jusqu’à 320 cm sans joint':
            'أسطح صلبة حتى ٣٢٠ سم دون وصلة',
        'Plumes d’oie, mousse HR, ressorts noyés':
            'ريش إوز، إسفنج عالي المرونة، نوابض مغروسة',
        'Pose':
            'التركيب',
        'Relevé sur place ou étude sur plan':
            'رفع مقاسات في الموقع أو دراسة على المخطط',
        'Structure':
            'الهيكل',
        'Structure en noyer massif séché 18 mois':
            'هيكل من الجوز الصلب المجفّف ١٨ شهراً',
        'Suspension':
            'التعليق',
        'Tenon-mortaise et queue d’aronde':
            'نقر ولسان وذيل حمام',
        'Textiles':
            'الأقمشة',
        'Tissus Rubelli, Pierre Frey et Loro Piana':
            'أقمشة روبّيلي وبيير فراي ولورو بيانا',
        'Travertin et marbre découpés au Nord-Liban':
            'ترافرتين ورخام مقصوصان في شمال لبنان',
        'Têtes de lit':
            'رؤوس الأسرّة',
        'Têtes de lit réalisées à la cote de la pièce':
            'رؤوس أسرّة تُنفّذ على مقاس الغرفة',
        'pièces':
            'قطع',
        'Édition 2025':
            'إصدار ٢٠٢٥',
        'Électrification':
            'التوصيل الكهربائي',
        'Électrification aux normes CE / IEC':
            'توصيل كهربائي وفق معايير CE / IEC',
        'Étude d’implantation pour 6 à 14 convives':
            'دراسة توزيع من ٦ إلى ١٤ ضيفاً',
    },
};

/** Langue en cours de rendu (posée par le générateur avant chaque page). */
let currentLocale = defaultLocale;

/** Fixe la langue du rendu en cours. Appelé par tools/build-site.mjs. */
export function setLocale(locale) {
    if (!locales[locale]) throw new Error(`setLocale() : langue inconnue « ${locale} »`);
    currentLocale = locale;
}

/** Langue du rendu en cours. */
export function getLocale() {
    return currentLocale;
}

/** Chaînes d'habillage manquantes, collectées pendant le rendu. */
const missing = [];

/** Nombre de traductions manquantes relevées jusqu'ici (repère d'annulation). */
export function missingCount() {
    return missing.length;
}

/**
 * Annule les signalements postérieurs au repère : sert au générateur, qui
 * évalue une page dans une langue donnée sans la publier (page non traduite).
 */
export function rollbackMissing(marker) {
    missing.length = marker;
}

/**
 * Sélectionne une valeur selon la langue du rendu en cours.
 * Sert aux métadonnées (titre, description), qui ne sont pas de simples
 * traductions mais des formulations propres à chaque marché.
 *
 * @param {{fr: string, en?: string, ar?: string}} values
 */
export function localized(values) {
    return values[currentLocale] ?? values[defaultLocale];
}

/**
 * Traduit une chaîne (habillage ou contenu) dans la langue du rendu en cours.
 *
 * En français, la chaîne source est renvoyée telle quelle : la version
 * française reste écrite en clair dans les gabarits, il n'y a donc aucune
 * copie à maintenir. Dans les autres langues, une traduction absente est
 * enregistrée : le build échoue plutôt que de publier une page à moitié
 * traduite (voir `missingTranslations()`).
 *
 * @param {string} source texte source français
 */
export function tr(source) {
    if (currentLocale === defaultLocale) return source;

    const value = ui[currentLocale]?.[source];
    if (value === undefined) {
        const key = `${currentLocale} :: ${source}`;
        if (!missing.includes(key)) missing.push(key);
        return source;
    }
    return value;
}

/**
 * Traduit une chaîne de contenu de page (mêmes règles que `tr`, table
 * distincte pour garder l'habillage et les contenus séparés).
 */
export function tc(source) {
    return tr(source);
}

/** Liste des traductions manquantes détectées pendant le rendu. */
export function missingTranslations() {
    return [...missing].sort();
}

/* -------------------------------------------------------------------------
   Contenus de page traduits (au-delà de l'habillage)
   ------------------------------------------------------------------------- */

export const pageContent = {
    en: {
        accueil: {
            heroTitle: 'Bespoke furniture and art cabinetmaking, made in Tripoli',
            heroText:
                'Since 1948, our Tripoli workshop has designed solid walnut, oak and travertine furniture for villas, hotels and restaurants across Lebanon and the Gulf. Each piece is drawn, cut, assembled and finished on site.',
            heroPrimary: 'Explore our collections',
            heroSecondary: 'Request a quote',
            promiseTitle: 'A family workshop, a Levantine tradition',
            promiseText:
                'Three generations of cabinetmakers, one rule: cut nothing before the drawing is settled. Walnut from slow-dried stock, travertine and marble cut by our partners in North Lebanon, brass cast in small series.',
            collectionsTitle: 'Our five signature collections',
            collectionsText:
                'Each collection answers one way of living: reception, dining, sleeping, storage and light. Every piece can be adapted to your dimensions.',
            allCollections: 'See all collections',
            craftTitle: 'The workshop, from drawing to installation',
            craftText:
                'Site survey, execution drawings, material schedules, colour prototypes, then delivery and installation on site. Architects and studios are received by appointment.',
            craftCta: 'Discover the workshop',
            bespokeTitle: 'Made to your measurements, never the other way round',
            bespokeText:
                'Length, depth, seat height, finish, fabric: everything is settled with you on site or in the workshop, before the first cut.',
            bespokeCta: 'How bespoke works',
            projectsTitle: 'Recent site work',
            projectsText:
                'Private residences, hotels and restaurants furnished from the drawing board to installation.',
            projectsCta: 'See our projects',
            contactTitle: 'Talk to the workshop',
            contactText:
                'A question about a piece, a dimension or a project? Write to us or visit the showroom in Tripoli.',
            contactCta: 'Contact us',
        },
        collectionsHub: {
            title: 'Our furniture collections, made in Tripoli',
            intro:
                'Five families of pieces, all made to order in our Tripoli workshop: seating for reception rooms, dining tables, bedrooms, storage and lighting. Each collection can be adapted in size, material and finish.',
            cardCta: 'Discover the collection',
        },
    },

    ar: {
        accueil: {
            heroTitle: 'أثاث حسب الطلب وخشب فني، مصنوع في طرابلس',
            heroText:
                'منذ عام ١٩٤٨، تصمّم ورشتنا في طرابلس أثاثاً من خشب الجوز والبلوط والترافرتين، لفلل وفنادق ومطاعم في لبنان والخليج. كل قطعة تُرسم وتُقطع وتُجمع وتُشطّب في مكانها.',
            heroPrimary: 'استكشف مجموعاتنا',
            heroSecondary: 'اطلب عرض سعر',
            promiseTitle: 'ورشة عائلية وتقليد شامي',
            promiseText:
                'ثلاثة أجيال من صنّاع الخشب، وقاعدة واحدة: لا قطع قبل أن يكتمل الرسم. جوز من مخزوننا المجفّف ببطء، وترافرتين ورخام يقطعهما شركاؤنا في شمال لبنان، ونحاس مصبوب بكميات صغيرة.',
            collectionsTitle: 'مجموعاتنا الخمس المميّزة',
            collectionsText:
                'كل مجموعة تجيب على طريقة عيش: الاستقبال، الطعام، النوم، التخزين والإضاءة. ويمكن تكييف كل قطعة على مقاساتك.',
            allCollections: 'كل المجموعات',
            craftTitle: 'الورشة، من الرسم إلى التركيب',
            craftText:
                'رفع مقاسات على الموقع، رسومات تنفيذية، جداول المواد، نماذج ألوان، ثم التسليم والتركيب. نستقبل المهندسين والاستوديوهات بموعد مسبق.',
            craftCta: 'تعرّف على الورشة',
            bespokeTitle: 'يُصنع على مقاسك، لا العكس',
            bespokeText:
                'الطول، العمق، ارتفاع الجلسة، التشطيب، القماش: كل شيء يُتفق عليه معك في الموقع أو في الورشة، قبل أول قطع.',
            bespokeCta: 'كيف يعمل التفصيل',
            projectsTitle: 'أحدث المشاريع المنفّذة',
            projectsText: 'مساكن خاصة وفنادق ومطاعم، من لوح الرسم حتى التركيب.',
            projectsCta: 'شاهد مشاريعنا',
            contactTitle: 'تحدّث مع الورشة',
            contactText: 'سؤال عن قطعة أو مقاس أو مشروع؟ راسلنا أو زر صالة العرض في طرابلس.',
            contactCta: 'اتصل بنا',
        },
        collectionsHub: {
            title: 'مجموعات الأثاث لدينا، مصنوعة في طرابلس',
            intro:
                'خمس عائلات من القطع، تُصنع كلها حسب الطلب في ورشتنا في طرابلس: جلسات الاستقبال، طاولات الطعام، غرف النوم، التخزين والإضاءة. ويمكن تكييف كل مجموعة في المقاس والمادة والتشطيب.',
            cardCta: 'اكتشف المجموعة',
        },
    },
};
