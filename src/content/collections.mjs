/* =========================================================================
   Contenu éditorial des collections
   -------------------------------------------------------------------------
   Chaque collection devient une page dédiée à une URL propre :
       /collections/<slug>/
   Elle porte son propre H1, ses métadonnées uniques, son texte éditorial
   (contenu non dupliqué), sa FAQ et son maillage interne.

   ⚠️ Les longueurs de `title` (50–60 car.) et `description` (120–160 car.)
      sont contrôlées par `npm run audit`.
   ========================================================================= */

export const collections = [
    {
        slug: 'salons',
        path: '/collections/salons/',
        navLabel: 'Salons &amp; banquettes',
        breadcrumbLabel: 'Salons &amp; banquettes',
        eyebrow: 'Assises &amp; réception',
        h1: 'Salons &amp; Banquettes en Noyer Massif, Sculptés à Tripoli',
        title: 'Salons &amp; Canapés en Noyer Massif à Tripoli | Maison Tripoli',
        description:
            "Canapés, banquettes et fauteuils façonnés main à Tripoli : noyer massif, lin bouclé et cuir pleine fleur. Sur mesure, livraison internationale.",
        metaKeywords: [
            'canapé sur mesure Tripoli',
            'salon en noyer massif Liban',
            'banquette velours sur mesure',
            'fauteuil club cuir Tripoli',
        ],
        summary:
            "Canapés modulaires, banquettes de réception et fauteuils clubs dessinés pour les grands salons, dans le noyer massif et le cuir pleine fleur de nos ateliers.",
        highlights: [
            { icon: 'check', label: 'Structure en noyer massif séché 18 mois' },
            { icon: 'check', label: 'Modules et dimensions ajustables au centimètre' },
            { icon: 'check', label: 'Tissus Rubelli, Pierre Frey et Loro Piana' },
        ],
        intro: [
            "Un salon réussi tient à trois choses : la justesse des proportions, la noblesse de la matière et le confort d'usage. Nos assises sont dessinées dans l'atelier de Tripoli, assemblées à tenons et mortaises, puis garnies à la main — plumes d'oie pour l'assise, mousse haute résilience pour le maintien.",
            "Chaque pièce est déclinable : longueur du module, profondeur d'assise, hauteur de dossier, choix du tissu et de la teinte du bois. Vous validez un prototype de teinte avant lancement, et nous fabriquons pour votre volume, pas pour un standard.",
        ],
        sections: [
            {
                id: 'savoir-faire',
                eyebrow: 'Savoir-faire',
                heading: "L'assise, du bois brut au garnissage",
                paragraphs: [
                    "Le noyer est sélectionné en grume, débité puis séché lentement dans nos granges du Nord-Liban pendant dix-huit mois. Vient ensuite l'assemblage à queue d'aronde et tenon-mortaise, sans vis apparente, qui garantit la tenue du cadre sur plusieurs décennies.",
                    "Le garnissage est réalisé à l'ancienne : sangles de jute tendues, ressorts noyés, plumes d'oie enveloppées dans des toiles de coton. Le revêtement est coupé et posé par un tapissier qui ajuste les raccords de motif à la main.",
                ],
                specs: [
                    { label: 'Structure', value: 'Noyer ou chêne massif, séché 18 mois' },
                    { label: 'Assemblage', value: 'Tenon-mortaise et queue d’aronde' },
                    { label: 'Garnissage', value: 'Plumes d’oie, mousse HR, ressorts noyés' },
                    { label: 'Garantie', value: '30 ans sur la structure d’ébénisterie' },
                ],
            },
            {
                id: 'ajuster',
                eyebrow: 'Sur-mesure',
                heading: 'Ajuster le salon à votre volume, pas l’inverse',
                paragraphs: [
                    "Un salon d'angle dans une pièce en L, une banquette filante sous une fenêtre à arcades, deux fauteuils clubs face à une cheminée : nous partons de vos cotes et de vos usages. Un plan de calepinage vous est transmis avant fabrication, avec l'implantation des modules, les passages et les dégagements.",
                    "Si vous travaillez avec un architecte d'intérieur, notre bureau d'études fournit les fichiers techniques, les nomenclatures de tissus et les échantillons nécessaires à la validation du projet par votre client.",
                ],
            },
        ],
        faq: [
            {
                q: 'Combien de temps faut-il pour fabriquer un canapé sur mesure à Tripoli ?',
                a: "Comptez quatre à six semaines entre la validation du prototype de teinte et la livraison, pour une pièce du catalogue. Un salon complet de plusieurs modules demandera plutôt six à huit semaines. Le délai vous est confirmé par écrit au moment du devis.",
            },
            {
                q: 'Peut-on choisir la dimension et le tissu du canapé ?',
                a: "Oui, chaque assise est déclinable au centimètre : longueur, profondeur, hauteur d'assise et de dossier. Côté revêtement, nous travaillons avec les tissus Rubelli, Pierre Frey et Loro Piana, ainsi qu'avec le cuir pleine fleur tanné végétal de nos tanneries partenaires.",
            },
            {
                q: 'Livrez-vous les salons à l’étranger ?',
                a: "Nous expédions en Europe, dans le Golfe et en Afrique du Nord. Les pièces sont emballées en caisse bois sur mesure, manipulées sous gants blancs et dédouanées par notre transitaire. Les frais de fret sont calculés après étude du volume et de la destination.",
            },
            {
                q: 'Quelle garantie s’applique sur une assise en noyer massif ?',
                a: "La structure d'ébénisterie est garantie 30 ans contre tout vice de fabrication. Le garnissage et les revêtements bénéficient d'une garantie de 5 ans. Sont exclus les dommages liés à un usage non conforme ou à une exposition prolongée à l'humidité.",
            },
        ],
        related: ['chambres', 'eclairage-objets'],
    },

    {
        slug: 'salles-a-manger',
        path: '/collections/salles-a-manger/',
        navLabel: 'Salles à manger',
        breadcrumbLabel: 'Salles à manger',
        eyebrow: 'Tables &amp; réception',
        h1: 'Tables de Réception &amp; Salles à Manger en Bois Massif',
        title: 'Tables de Réception &amp; Salles à Manger | Maison Tripoli',
        description:
            "Tables de réception en chêne et travertin, tables d'appoint et sellets en pierre naturelle : mobilier de salle à manger fabriqué à Tripoli. Devis en 24 h.",
        metaKeywords: [
            'table de réception sur mesure',
            'table salle à manger chêne massif',
            'plateau travertin sur mesure Liban',
            'table sur plan architecte Tripoli',
        ],
        summary:
            "Tables de réception monolithiques, tables d'appoint cérusées et plateaux de pierre naturelle, dimensionnés pour vos repas et vos volumes.",
        highlights: [
            { icon: 'check', label: 'Plateaux massifs jusqu’à 320 cm sans joint' },
            { icon: 'check', label: 'Travertin et marbre découpés au Nord-Liban' },
            { icon: 'check', label: 'Étude d’implantation pour 6 à 14 convives' },
        ],
        intro: [
            "La salle à manger est la pièce du rassemblement. Une table doit offrir le bon dégagement par convive — soixante centimètres minimum — sans encombrer la circulation. Nous étudions votre plan, proposons les dimensions justes et vérifions l'implantation avant de débiter le premier plateau.",
            "Nos plateaux sont massifs, bordés à la main et protégés par une finition huilée ou un cuir patiné. Le piétement est choisi pour libérer l'assise des jambes : monolithe sculpté, arche centrale ou deux pieds en V inversé selon le style du lieu.",
        ],
        sections: [
            {
                id: 'matieres',
                eyebrow: 'Matières',
                heading: 'Chêne, travertin et marbre du bassin levantin',
                paragraphs: [
                    "Le chêne de nos plateaux provient de fûts sélectionnés pour la régularité de leur veinage, débités en plots larges afin d'éviter les joints disgracieux au centre de la table. Le chêne blanchi, cérusé ou fumé est travaillé à la main dans l'atelier.",
                    "Le travertin et le marbre sont débités et chanfreinés par nos marbriers partenaires de la région du Nord-Liban. Les dalles sont choisies côte à côte pour que le veinage se poursuive d'un bout à l'autre du plateau, puis adoucies et traitées contre les taches.",
                ],
                specs: [
                    { label: 'Plateau', value: 'Chêne massif, travertin ou marbre' },
                    { label: 'Longueur utile', value: 'De 140 à 320 cm sur mesure' },
                    { label: 'Dégagement conseillé', value: '60 cm par convive, 90 cm de recul' },
                    { label: 'Finition', value: 'Huile dure, vernis déperlant ou cire' },
                ],
            },
            {
                id: 'projets',
                eyebrow: 'Projets',
                heading: 'Du plan d’architecte au plateau posé',
                paragraphs: [
                    "Vous nous transmettez un plan, un relevé ou une intention : nous produisons les dessins d'exécution, le calepinage des dalles et une proposition de piétement. Une maquette à l'échelle peut être réalisée pour les configurations complexes ou les volumes atypiques.",
                    "La livraison s'effectue sous gants blancs, avec montage du piétement sur place et contrôle du niveau au laser. Nous repartons avec les chutes de découpe, et vous avec la garantie de conformité signée.",
                ],
            },
        ],
        faq: [
            {
                q: 'Quelle dimension de table pour douze convives ?',
                a: "Prévoyez 60 cm de largeur utile par convive, soit environ 360 cm pour douze personnes réparties des deux côtés, ou 300 cm si les extrémités sont occupées. Nous vérifions systématiquement le dégagement disponible dans la pièce avant de valider les cotes.",
            },
            {
                q: 'Le plateau en travertin craint-il les taches ?',
                a: "Le travertin est une pierre poreuse par nature : nous appliquons systématiquement un traitement hydrofuge et oléofuge en deux passes après le polissage. Un essuyage rapide suffit alors au quotidien. Une réimprégnation est conseillée tous les deux ans.",
            },
            {
                q: 'Fabriquez-vous des tables sur plan d’architecte ?',
                a: "Oui, c'est le cœur de notre service aux professionnels : lecture de plans, dessins d'exécution, prototypes de teinte, nomenclatures matières et livraison sur chantier. Nous intervenons du Liban à l'Europe et au Golfe.",
            },
            {
                q: 'Peut-on assortir les chaises à la table ?',
                a: "Nous fabriquons les assises assorties — chaises à dossier plein, chaises-coques en cuir sellier ou bancs filants — dans la même essence et avec le même traitement de finition, afin que l'ensemble lise comme une pièce unique.",
            },
        ],
        related: ['rangements', 'salons'],
    },

    {
        slug: 'chambres',
        path: '/collections/chambres/',
        navLabel: 'Chambres &amp; suites',
        breadcrumbLabel: 'Chambres &amp; suites de nuit',
        eyebrow: 'Suites &amp; repos',
        h1: 'Chambres &amp; Suites de Nuit sur-Mesure à Tripoli',
        title: 'Chambres &amp; Lits sur-Mesure à Tripoli | Maison Tripoli',
        description:
            "Lits, têtes de lit capitonnées et boiseries de chambre sur mesure, façonnés à Tripoli en chêne fumé et lin. Étude sur plan ou relevé de cotes sur place.",
        metaKeywords: [
            'lit sur mesure Tripoli',
            'tête de lit capitonnée Liban',
            'boiseries de chambre sur mesure',
            'chambre sur mesure architecte',
        ],
        summary:
            "Lits king size, têtes de lit capitonnées et boiseries murales dessinés aux cotes exactes de votre chambre, jusqu’aux sous-combles et pans coupés.",
        highlights: [
            { icon: 'check', label: 'Têtes de lit réalisées à la cote de la pièce' },
            { icon: 'check', label: 'Boiseries murales et chevets intégrés' },
            { icon: 'check', label: 'Relevé sur place ou étude sur plan' },
        ],
        intro: [
            "La chambre est la pièce où le sur-mesure prend tout son sens : les murs y sont rarement droits, la fenêtre rarement centrée et le plafond parfois en pente. C'est précisément là qu'un agencement dessiné à la cote devient nécessaire, et qu'un lit standard montre ses limites.",
            "Nous concevons des ensembles complets — tête de lit, boiseries, chevets suspendus, bac de lit et banc de pied — dans un même langage de matières. L'ensemble est ensuite fabriqué dans notre atelier de Tripoli et posé par nos soins.",
        ],
        sections: [
            {
                id: 'confort',
                eyebrow: 'Confort',
                heading: 'Capitonnage, matières et respiration du sommeil', 
                paragraphs: [
                    "Une tête de lit capitonnée se compose d'un cadre de bois massif, d'une mousse technique et d'un garnissage textile. Nous écartons les mousses trop fermes qui rendent l'appui inconfortable en lecture, et privilégions des densités différenciées selon la hauteur d'appui.",
                    "Pour le garnissage, nous privilégions le lin lavé et les laines déperlantes, naturellement respirantes, plutôt que les textiles synthétiques qui retiennent l'humidité. Les teintes sont validées sur un prototype de trente centimètres avant lancement.",
                ],
                specs: [
                    { label: 'Têtes de lit', value: 'Largeur 160 à 320 cm, appui 120 cm' },
                    { label: 'Boiseries', value: 'Chêne, noyer ou ébène, teinte sur mesure' },
                    { label: 'Textiles', value: 'Lin lavé, laine déperlante, velours' },
                    { label: 'Pose', value: 'Assurée par nos équipes au Liban' },
                ],
            },
            {
                id: 'projet-chambre',
                eyebrow: 'Méthode',
                heading: 'Un projet de chambre en quatre étapes',
                paragraphs: [
                    "Première étape : le relevé. Nous nous déplaçons au Liban ou travaillons sur plan vérifié pour les projets à l'étranger. Deuxième étape : le dessin d'aménagement, avec élévations cotées et implantation des chevets, prises et éclairages.",
                    "Troisième étape : les prototypes de teinte et les échantillons textiles, validés par vous ou votre architecte. Quatrième étape : la fabrication en atelier, la livraison sous gants blancs et la pose, suivies d'un réglage des portes et tiroirs après une semaine de mise en place.",
                ],
            },
        ],
        faq: [
            {
                q: 'Comment se déroule un projet de chambre sur mesure ?',
                a: "Nous démarrons par un relevé de cotes, sur place au Liban ou sur plan pour l'étranger, puis nous produisons les élévations et le plan d'implantation. Après validation des teintes et des textiles, la fabrication en atelier prend huit à quatorze semaines selon l'ampleur des boiseries.",
            },
            {
                q: 'Quelles matières pour une tête de lit capitonnée ?',
                a: "Le cadre est en chêne, noyer ou ébène massif. Le garnissage associe une mousse technique à densités différenciées et un textile respirant : lin lavé, laine déperlante ou velours. Les tissus synthétiques sont déconseillés pour préserver le confort de respiration du couchage.",
            },
            {
                q: 'Intervenez-vous sur un relevé de cotes sur place ?',
                a: "Oui, partout au Liban, généralement dans les dix jours suivant la validation d'intention. À l'étranger, nous travaillons sur plans vérifiés par votre architecte et nous nous déplaçons pour la pose finale, une fois les ouvrages prêts à recevoir.",
            },
            {
                q: 'Quel délai pour une suite de nuit complète ?',
                a: "Comptez huit à douze semaines pour une suite complète (tête de lit, boiseries, chevets et banc), et deux semaines supplémentaires pour la pose et les réglages. Une suite simple — lit et chevets — s'établit plutôt entre cinq et sept semaines.",
            },
        ],
        related: ['salles-a-manger', 'salons'],
    },

    {
        slug: 'rangements',
        path: '/collections/rangements/',
        navLabel: 'Rangements &amp; bureaux',
        breadcrumbLabel: 'Rangements, enfilades &amp; bureaux',
        eyebrow: 'Menuiserie &amp; rangement',
        h1: 'Enfilades, Commodes &amp; Bureaux en Bois Massif',
        title: 'Enfilades, Commodes &amp; Bureaux à Tripoli | Maison Tripoli',
        description:
            "Enfilades cannelées, consoles et bureaux d'apparat en noyer et ébène massifs, laqués et cirés à la main dans notre atelier de Tripoli, au Liban.",
        metaKeywords: [
            'enfilade sur mesure Liban',
            'commode noyer massif Tripoli',
            'bureau sur mesure ébène',
            'menuiserie d’art Tripoli',
        ],
        summary:
            "Enfilades cannelées, consoles d’entrée et bureaux d’apparat : la menuiserie d’art de nos maîtres ébénistes, du tiroir à fond de velours à la façade cannelée main.",
        highlights: [
            { icon: 'check', label: 'Façades cannelées fraisées à la main' },
            { icon: 'check', label: 'Charnières amorties et tiroirs à fond de velours' },
            { icon: 'check', label: 'Marbre et bronze ajustés sur mesure' },
        ],
        intro: [
            "Le rangement est le révélateur d'un intérieur : c'est lui qui libère les surfaces et donne sa respiration à une pièce. Nos enfilades, commodes et consoles sont dessinées autour de vos objets, avec des profondeurs utiles pensées pour le linge de table, la vaisselle ou la documentation.",
            "Côté bureau, nous travaillons des pièces d'apparat à caissons, laquées à l'ancienne en sept couches, avec cuir patiné et poignées de bronze massif fondu puis ajusté à la main sur chaque façade.",
        ],
        sections: [
            {
                id: 'menuiserie',
                eyebrow: "Menuiserie d'art",
                heading: 'La cannelure, la laque et le marbre',
                paragraphs: [
                    "Une façade cannelée se travaille avec des fraises profilées réglées à la main : chaque cannelure est fraisée, ébarbée puis poncée individuellement avant assemblage. C'est cette régularité du pas qui donne à l'enfilade sa lecture architecturale et son ombre portée.",
                    "Les finitions varient selon l'usage : cirée à la cire d'abeille pour les bois nobles qui doivent se patiner, laquée satinée pour les pièces d'apparat, huilée pour les surfaces de contact fréquent. Les plateaux de marbre sont choisis avec vous en atelier, sur dalle.",
                ],
                specs: [
                    { label: 'Essences', value: 'Noyer, chêne, ébène teinté' },
                    { label: 'Façades', value: 'Cannelées, à plate-bande ou laquées' },
                    { label: 'Accastillage', value: 'Bronze massif, laiton brossé, charnières amorties' },
                    { label: 'Intérieurs', value: 'Fonds de tiroir velours, plateaux amovibles' },
                ],
            },
            {
                id: 'agencement',
                eyebrow: 'Agencement',
                heading: 'Du meuble isolé au mur de rangement',
                paragraphs: [
                    "Au-delà de la pièce isolée, nous réalisons des murs de rangement complets : bibliothèques toute hauteur, niches éclairées, portes escamotables qui masquent un bureau ou un dressing. Le calepinage est dessiné pour que chaque porte s'aligne avec les lignes de la pièce.",
                    "Pour les projets hôteliers et résidentiels d'envergure, nous livrons les ouvrages par lots numérotés avec un plan de pose par chambre, afin que les équipes de chantier posent sans erreur et sans retouche.",
                ],
            },
        ],
        faq: [
            {
                q: 'Peut-on adapter la longueur d’une enfilade ?',
                a: "Oui, nos enfilades se déclinent de 120 à 400 cm, avec un nombre de portes et de caissons ajustable. Le pas des cannelures est recalculé pour rester régulier quelle que soit la longueur finale, sans cannelure coupée en bout.",
            },
            {
                q: 'Quelles essences pour un bureau sur mesure ?',
                a: "Le noyer et le chêne offrent la meilleure stabilité pour un plan de travail, l'ébène teinté et le laqué étant réservés aux pièces d'apparat. Le plateau peut recevoir un cuir patiné collé à chaud, insensible aux variations d'humidité.",
            },
            {
                q: 'Comment sont finies les façades cannelées ?',
                a: "Chaque cannelure est fraisée, ébarbée puis poncée à la main, et la façade est finie d'un seul geste continu pour éviter les surépaisseurs dans les creux. Les teintes sont validées sur panneau témoin avant finition définitive.",
            },
            {
                q: 'Assurez-vous la pose des boiseries ?',
                a: "Oui, nos équipes assurent la pose au Liban, y compris les murs de rangement toute hauteur et les bibliothèques intégrées. À l'étranger, nous formons les équipes de pose locales et supervisons le chantier par visioconférence ou sur site.",
            },
        ],
        related: ['eclairage-objets', 'chambres'],
    },

    {
        slug: 'eclairage-objets',
        path: '/collections/eclairage-objets/',
        navLabel: "Éclairage &amp; objets d'art",
        breadcrumbLabel: "Éclairage &amp; objets d'art",
        eyebrow: 'Laiton &amp; pierre',
        h1: "Éclairage d'Art &amp; Objets en Laiton et Travertin",
        title: "Lustres en Laiton &amp; Objets d'Art à Tripoli | Maison Tripoli",
        description:
            "Lustres en laiton massif martelé du Souk des Cuivres, sellets et objets en travertin : pièces d'art façonnées main dans notre atelier de Tripoli, Liban.",
        metaKeywords: [
            'lustre laiton massif Liban',
            'luminaire artisanal Tripoli',
            'objet décoratif travertin',
            'pièce unique laiton martelé',
        ],
        summary:
            "Lustres en laiton massif martelé du Souk des Cuivres, sellets en travertin et pièces d’art : la touche finale qui fait lire un intérieur comme une composition.",
        highlights: [
            { icon: 'check', label: 'Laiton massif martelé et patiné main' },
            { icon: 'check', label: 'Électrification aux normes CE / IEC' },
            { icon: 'check', label: 'Hauteur de suspension réglable' },
        ],
        intro: [
            "Un intérieur se termine par la lumière et par les objets. Nos luminaires et pièces d'art sont fabriqués en petites séries dans les ateliers d'artisans de Tripoli, dans la continuité d'une tradition de dinanderie qui a fait la réputation du Souk des Cuivres.",
            "Chaque pièce est ciselée, assemblée puis patinée à la main : deux exemplaires d'un même modèle ne se ressemblent jamais tout à fait, ce qui en fait des pièces signées plutôt que des objets industrialisés.",
        ],
        sections: [
            {
                id: 'dinanderie',
                eyebrow: 'Dinanderie',
                heading: 'Le laiton, du Souk des Cuivres à votre plafond',
                paragraphs: [
                    "Le laiton est mis en forme au marteau sur des formes de bois, puis recuit pour retrouver sa ductilité avant d'être retravaillé. Le ciselage se fait à froid, à l'aide de poinçons et de burins : c'est cette étape qui creuse les facettes et fabrique la diffusion lumineuse si particulière des lustres de Tripoli.",
                    "La finition est protéinée ou patinée antique : le laiton se patine naturellement avec le temps, ce qui est recherché ; un vernis incolore optionnel permet de figer l'éclat initial si vous préférez éviter les marques du temps.",
                ],
                specs: [
                    { label: 'Matériaux', value: 'Laiton massif, travertin, bronze' },
                    { label: 'Électrification', value: 'Douilles céramique, câblage CE / IEC' },
                    { label: 'Suspension', value: 'Câble acier réglable de 60 à 200 cm' },
                    { label: 'Patiné', value: 'Antique protéiné ou laiton brut évolutif' },
                ],
            },
            {
                id: 'objets',
                eyebrow: 'Objets',
                heading: 'Sellets, plateaux et pièces de collection',
                paragraphs: [
                    "À côté des luminaires, nous taillons des objets de présentation : sellets monolithes en travertin, plateaux en marbre noir, socles pour céramiques ou sculptures. Ces pièces sont découpées dans des chutes de nos plateaux de table, ce qui leur donne une parenté de matière avec le mobilier de la pièce.",
                    "Elles peuvent porter une gravure discrète — monogramme, date, nom de lieu — exécutée à la main. Une manière de marquer une pièce offerte, une distinction ou la livraison d'une résidence.",
                ],
            },
        ],
        faq: [
            {
                q: 'Vos luminaires sont-ils électrifiés aux normes ?',
                a: "Oui, chaque luminaire est câblé avec des douilles en céramique, du fil doublement isolé et des raccords conformes aux exigences CE et IEC. Un marquage et une notice de montage accompagnent la livraison ; l'installation doit être réalisée par un électricien qualifié.",
            },
            {
                q: 'Peut-on adapter la hauteur de suspension ?',
                a: "La hauteur est réglable à la pose au moyen d'un câble acier et d'un raccord vissé, de 60 cm à 200 cm. Pour les architectures à grande hauteur, nous fournissons un câblage de longueur spécifique sur simple indication de la hauteur finie souhaitée.",
            },
            {
                q: 'Le laiton se patine-t-il avec le temps ?',
                a: "Le laiton brut évolue naturellement vers une teinte ambrée puis plus profonde : c'est une patine recherchée, qui garde la mémoire du toucher. Une finition protéinée peut figer l'éclat d'origine si vous préférez une lecture constante.",
            },
            {
                q: 'Proposez-vous des pièces uniques ?',
                a: "Si, trois à quatre fois par an, nous éditons des pièces uniques en collaboration avec les maîtres dinandiers du souk : grande suspension, paravent de laiton ou ensemble de sellets. Les projets de création dédiés sont possibles, avec un délai d'étude de quatre à six semaines.",
            },
        ],
        related: ['salons', 'rangements'],
    },
];

/** Retrouve une collection par son slug. */
export function collectionBySlug(slug) {
    return collections.find((collection) => collection.slug === slug);
}

/** Collections « sœurs » (maillage interne). */
export function relatedCollections(slug) {
    return collectionBySlug(slug).related.map(collectionBySlug);
}
