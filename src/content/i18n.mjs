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
    /* Les pages de collection, de même que /atelier/, /sur-mesure/,
       /projets/ et /contact/, seront ajoutées ici au fur et à mesure de
       leur traduction : le build refuse de publier une page incomplète. */
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
