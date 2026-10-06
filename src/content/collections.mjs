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
import { tr } from './i18n.mjs';

export const collections = [
    {
        slug: 'salons',
        path: '/collections/salons/',
        get navLabel() {
            return tr(
                'Salons &amp; banquettes',
            );
        },
        get breadcrumbLabel() {
            return tr(
                'Salons &amp; banquettes',
            );
        },
        get eyebrow() {
            return tr(
                'Assises &amp; réception',
            );
        },
        get h1() {
            return tr(
                'Salons &amp; Banquettes en Noyer Massif, Sculptés à Tripoli',
            );
        },
        get title() {
            return tr(
                'Salons &amp; Canapés en Noyer Massif à Tripoli | Maison Tripoli',
            );
        },
        get description() {
            return tr(
                "Canapés, banquettes et fauteuils façonnés main à Tripoli : noyer massif, lin bouclé et cuir pleine fleur. Sur mesure, livraison internationale.",
            );
        },
        get metaKeywords() {
            return [
            tr('canapé sur mesure Tripoli'),
            tr('salon en noyer massif Liban'),
            tr('banquette velours sur mesure'),
            tr('fauteuil club cuir Tripoli'),
];
        },
        get summary() {
            return tr(
                "Canapés modulaires, banquettes de réception et fauteuils clubs dessinés pour les grands salons, dans le noyer massif et le cuir pleine fleur de nos ateliers.",
            );
        },
        highlights: [
            { icon: 'check', get label() { return tr('Structure en noyer massif séché 18 mois'); } },
            { icon: 'check', get label() { return tr('Modules et dimensions ajustables au centimètre'); } },
            { icon: 'check', get label() { return tr('Tissus Rubelli, Pierre Frey et Loro Piana'); } },
        ],
        get intro() {
            return [
            tr("Un salon réussi tient à trois choses : la justesse des proportions, la noblesse de la matière et le confort d'usage. Nos assises sont dessinées dans l'atelier de Tripoli, assemblées à tenons et mortaises, puis garnies à la main — plumes d'oie pour l'assise, mousse haute résilience pour le maintien."),
            tr("Chaque pièce est déclinable : longueur du module, profondeur d'assise, hauteur de dossier, choix du tissu et de la teinte du bois. Vous validez un prototype de teinte avant lancement, et nous fabriquons pour votre volume, pas pour un standard."),
];
        },
        sections: [
            {
                id: 'savoir-faire',
                get eyebrow() {
                    return tr(
                        'Savoir-faire',
                    );
                },
                get heading() {
                    return tr(
                        "L'assise, du bois brut au garnissage",
                    );
                },
                get paragraphs() {
                    return [
                    tr("Le noyer est sélectionné en grume, débité puis séché lentement dans nos granges du Nord-Liban pendant dix-huit mois. Vient ensuite l'assemblage à queue d'aronde et tenon-mortaise, sans vis apparente, qui garantit la tenue du cadre sur plusieurs décennies."),
                    tr("Le garnissage est réalisé à l'ancienne : sangles de jute tendues, ressorts noyés, plumes d'oie enveloppées dans des toiles de coton. Le revêtement est coupé et posé par un tapissier qui ajuste les raccords de motif à la main."),
];
                },
                specs: [
                    { get label() { return tr('Structure'); }, get value() { return tr('Noyer ou chêne massif, séché 18 mois'); } },
                    { get label() { return tr('Assemblage'); }, get value() { return tr('Tenon-mortaise et queue d’aronde'); } },
                    { get label() { return tr('Garnissage'); }, get value() { return tr('Plumes d’oie, mousse HR, ressorts noyés'); } },
                    { get label() { return tr('Garantie'); }, get value() { return tr('30 ans sur la structure d’ébénisterie'); } },
                ],
            },
            {
                id: 'ajuster',
                get eyebrow() {
                    return tr(
                        'Sur-mesure',
                    );
                },
                get heading() {
                    return tr(
                        'Ajuster le salon à votre volume, pas l’inverse',
                    );
                },
                get paragraphs() {
                    return [
                    tr("Un salon d'angle dans une pièce en L, une banquette filante sous une fenêtre à arcades, deux fauteuils clubs face à une cheminée : nous partons de vos cotes et de vos usages. Un plan de calepinage vous est transmis avant fabrication, avec l'implantation des modules, les passages et les dégagements."),
                    tr("Si vous travaillez avec un architecte d'intérieur, notre bureau d'études fournit les fichiers techniques, les nomenclatures de tissus et les échantillons nécessaires à la validation du projet par votre client."),
];
                },
            },
        ],
        faq: [
            {
                get q() {
                    return tr(
                        'Combien de temps faut-il pour fabriquer un canapé sur mesure à Tripoli ?',
                    );
                },
                get a() {
                    return tr(
                        "Comptez quatre à six semaines entre la validation du prototype de teinte et la livraison, pour une pièce du catalogue. Un salon complet de plusieurs modules demandera plutôt six à huit semaines. Le délai vous est confirmé par écrit au moment du devis.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Peut-on choisir la dimension et le tissu du canapé ?',
                    );
                },
                get a() {
                    return tr(
                        "Oui, chaque assise est déclinable au centimètre : longueur, profondeur, hauteur d'assise et de dossier. Côté revêtement, nous travaillons avec les tissus Rubelli, Pierre Frey et Loro Piana, ainsi qu'avec le cuir pleine fleur tanné végétal de nos tanneries partenaires.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Livrez-vous les salons à l’étranger ?',
                    );
                },
                get a() {
                    return tr(
                        "Nous expédions en Europe, dans le Golfe et en Afrique du Nord. Les pièces sont emballées en caisse bois sur mesure, manipulées sous gants blancs et dédouanées par notre transitaire. Les frais de fret sont calculés après étude du volume et de la destination.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Quelle garantie s’applique sur une assise en noyer massif ?',
                    );
                },
                get a() {
                    return tr(
                        "La structure d'ébénisterie est garantie 30 ans contre tout vice de fabrication. Le garnissage et les revêtements bénéficient d'une garantie de 5 ans. Sont exclus les dommages liés à un usage non conforme ou à une exposition prolongée à l'humidité.",
                    );
                },
            },
        ],
        related: ['chambres', 'eclairage-objets'],
    },

    {
        slug: 'salles-a-manger',
        path: '/collections/salles-a-manger/',
        get navLabel() {
            return tr(
                'Salles à manger',
            );
        },
        get breadcrumbLabel() {
            return tr(
                'Salles à manger',
            );
        },
        get eyebrow() {
            return tr(
                'Tables &amp; réception',
            );
        },
        get h1() {
            return tr(
                'Tables de Réception &amp; Salles à Manger en Bois Massif',
            );
        },
        get title() {
            return tr(
                'Tables de Réception &amp; Salles à Manger | Maison Tripoli',
            );
        },
        get description() {
            return tr(
                "Tables de réception en chêne et travertin, tables d'appoint et sellets en pierre naturelle : mobilier de salle à manger fabriqué à Tripoli. Devis en 24 h.",
            );
        },
        get metaKeywords() {
            return [
            tr('table de réception sur mesure'),
            tr('table salle à manger chêne massif'),
            tr('plateau travertin sur mesure Liban'),
            tr('table sur plan architecte Tripoli'),
];
        },
        get summary() {
            return tr(
                "Tables de réception monolithiques, tables d'appoint cérusées et plateaux de pierre naturelle, dimensionnés pour vos repas et vos volumes.",
            );
        },
        highlights: [
            { icon: 'check', get label() { return tr('Plateaux massifs jusqu’à 320 cm sans joint'); } },
            { icon: 'check', get label() { return tr('Travertin et marbre découpés au Nord-Liban'); } },
            { icon: 'check', get label() { return tr('Étude d’implantation pour 6 à 14 convives'); } },
        ],
        get intro() {
            return [
            tr("La salle à manger est la pièce du rassemblement. Une table doit offrir le bon dégagement par convive — soixante centimètres minimum — sans encombrer la circulation. Nous étudions votre plan, proposons les dimensions justes et vérifions l'implantation avant de débiter le premier plateau."),
            tr("Nos plateaux sont massifs, bordés à la main et protégés par une finition huilée ou un cuir patiné. Le piétement est choisi pour libérer l'assise des jambes : monolithe sculpté, arche centrale ou deux pieds en V inversé selon le style du lieu."),
];
        },
        sections: [
            {
                id: 'matieres',
                get eyebrow() {
                    return tr(
                        'Matières',
                    );
                },
                get heading() {
                    return tr(
                        'Chêne, travertin et marbre du bassin levantin',
                    );
                },
                get paragraphs() {
                    return [
                    tr("Le chêne de nos plateaux provient de fûts sélectionnés pour la régularité de leur veinage, débités en plots larges afin d'éviter les joints disgracieux au centre de la table. Le chêne blanchi, cérusé ou fumé est travaillé à la main dans l'atelier."),
                    tr("Le travertin et le marbre sont débités et chanfreinés par nos marbriers partenaires de la région du Nord-Liban. Les dalles sont choisies côte à côte pour que le veinage se poursuive d'un bout à l'autre du plateau, puis adoucies et traitées contre les taches."),
];
                },
                specs: [
                    { get label() { return tr('Plateau'); }, get value() { return tr('Chêne massif, travertin ou marbre'); } },
                    { get label() { return tr('Longueur utile'); }, get value() { return tr('De 140 à 320 cm sur mesure'); } },
                    { get label() { return tr('Dégagement conseillé'); }, get value() { return tr('60 cm par convive, 90 cm de recul'); } },
                    { get label() { return tr('Finition'); }, get value() { return tr('Huile dure, vernis déperlant ou cire'); } },
                ],
            },
            {
                id: 'projets',
                get eyebrow() {
                    return tr(
                        'Projets',
                    );
                },
                get heading() {
                    return tr(
                        'Du plan d’architecte au plateau posé',
                    );
                },
                get paragraphs() {
                    return [
                    tr("Vous nous transmettez un plan, un relevé ou une intention : nous produisons les dessins d'exécution, le calepinage des dalles et une proposition de piétement. Une maquette à l'échelle peut être réalisée pour les configurations complexes ou les volumes atypiques."),
                    tr("La livraison s'effectue sous gants blancs, avec montage du piétement sur place et contrôle du niveau au laser. Nous repartons avec les chutes de découpe, et vous avec la garantie de conformité signée."),
];
                },
            },
        ],
        faq: [
            {
                get q() {
                    return tr(
                        'Quelle dimension de table pour douze convives ?',
                    );
                },
                get a() {
                    return tr(
                        "Prévoyez 60 cm de largeur utile par convive, soit environ 360 cm pour douze personnes réparties des deux côtés, ou 300 cm si les extrémités sont occupées. Nous vérifions systématiquement le dégagement disponible dans la pièce avant de valider les cotes.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Le plateau en travertin craint-il les taches ?',
                    );
                },
                get a() {
                    return tr(
                        "Le travertin est une pierre poreuse par nature : nous appliquons systématiquement un traitement hydrofuge et oléofuge en deux passes après le polissage. Un essuyage rapide suffit alors au quotidien. Une réimprégnation est conseillée tous les deux ans.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Fabriquez-vous des tables sur plan d’architecte ?',
                    );
                },
                get a() {
                    return tr(
                        "Oui, c'est le cœur de notre service aux professionnels : lecture de plans, dessins d'exécution, prototypes de teinte, nomenclatures matières et livraison sur chantier. Nous intervenons du Liban à l'Europe et au Golfe.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Peut-on assortir les chaises à la table ?',
                    );
                },
                get a() {
                    return tr(
                        "Nous fabriquons les assises assorties — chaises à dossier plein, chaises-coques en cuir sellier ou bancs filants — dans la même essence et avec le même traitement de finition, afin que l'ensemble lise comme une pièce unique.",
                    );
                },
            },
        ],
        related: ['rangements', 'salons'],
    },

    {
        slug: 'chambres',
        path: '/collections/chambres/',
        get navLabel() {
            return tr(
                'Chambres &amp; suites',
            );
        },
        get breadcrumbLabel() {
            return tr(
                'Chambres &amp; suites de nuit',
            );
        },
        get eyebrow() {
            return tr(
                'Suites &amp; repos',
            );
        },
        get h1() {
            return tr(
                'Chambres &amp; Suites de Nuit sur-Mesure à Tripoli',
            );
        },
        get title() {
            return tr(
                'Chambres &amp; Lits sur-Mesure à Tripoli | Maison Tripoli',
            );
        },
        get description() {
            return tr(
                "Lits, têtes de lit capitonnées et boiseries de chambre sur mesure, façonnés à Tripoli en chêne fumé et lin. Étude sur plan ou relevé de cotes sur place.",
            );
        },
        get metaKeywords() {
            return [
            tr('lit sur mesure Tripoli'),
            tr('tête de lit capitonnée Liban'),
            tr('boiseries de chambre sur mesure'),
            tr('chambre sur mesure architecte'),
];
        },
        get summary() {
            return tr(
                "Lits king size, têtes de lit capitonnées et boiseries murales dessinés aux cotes exactes de votre chambre, jusqu’aux sous-combles et pans coupés.",
            );
        },
        highlights: [
            { icon: 'check', get label() { return tr('Têtes de lit réalisées à la cote de la pièce'); } },
            { icon: 'check', get label() { return tr('Boiseries murales et chevets intégrés'); } },
            { icon: 'check', get label() { return tr('Relevé sur place ou étude sur plan'); } },
        ],
        get intro() {
            return [
            tr("La chambre est la pièce où le sur-mesure prend tout son sens : les murs y sont rarement droits, la fenêtre rarement centrée et le plafond parfois en pente. C'est précisément là qu'un agencement dessiné à la cote devient nécessaire, et qu'un lit standard montre ses limites."),
            tr("Nous concevons des ensembles complets — tête de lit, boiseries, chevets suspendus, bac de lit et banc de pied — dans un même langage de matières. L'ensemble est ensuite fabriqué dans notre atelier de Tripoli et posé par nos soins."),
];
        },
        sections: [
            {
                id: 'confort',
                get eyebrow() {
                    return tr(
                        'Confort',
                    );
                },
                get heading() {
                    return tr(
                        'Capitonnage, matières et respiration du sommeil',
                    );
                }, 
                get paragraphs() {
                    return [
                    tr("Une tête de lit capitonnée se compose d'un cadre de bois massif, d'une mousse technique et d'un garnissage textile. Nous écartons les mousses trop fermes qui rendent l'appui inconfortable en lecture, et privilégions des densités différenciées selon la hauteur d'appui."),
                    tr("Pour le garnissage, nous privilégions le lin lavé et les laines déperlantes, naturellement respirantes, plutôt que les textiles synthétiques qui retiennent l'humidité. Les teintes sont validées sur un prototype de trente centimètres avant lancement."),
];
                },
                specs: [
                    { get label() { return tr('Têtes de lit'); }, get value() { return tr('Largeur 160 à 320 cm, appui 120 cm'); } },
                    { get label() { return tr('Boiseries'); }, get value() { return tr('Chêne, noyer ou ébène, teinte sur mesure'); } },
                    { get label() { return tr('Textiles'); }, get value() { return tr('Lin lavé, laine déperlante, velours'); } },
                    { get label() { return tr('Pose'); }, get value() { return tr('Assurée par nos équipes au Liban'); } },
                ],
            },
            {
                id: 'projet-chambre',
                get eyebrow() {
                    return tr(
                        'Méthode',
                    );
                },
                get heading() {
                    return tr(
                        'Un projet de chambre en quatre étapes',
                    );
                },
                get paragraphs() {
                    return [
                    tr("Première étape : le relevé. Nous nous déplaçons au Liban ou travaillons sur plan vérifié pour les projets à l'étranger. Deuxième étape : le dessin d'aménagement, avec élévations cotées et implantation des chevets, prises et éclairages."),
                    tr("Troisième étape : les prototypes de teinte et les échantillons textiles, validés par vous ou votre architecte. Quatrième étape : la fabrication en atelier, la livraison sous gants blancs et la pose, suivies d'un réglage des portes et tiroirs après une semaine de mise en place."),
];
                },
            },
        ],
        faq: [
            {
                get q() {
                    return tr(
                        'Comment se déroule un projet de chambre sur mesure ?',
                    );
                },
                get a() {
                    return tr(
                        "Nous démarrons par un relevé de cotes, sur place au Liban ou sur plan pour l'étranger, puis nous produisons les élévations et le plan d'implantation. Après validation des teintes et des textiles, la fabrication en atelier prend huit à quatorze semaines selon l'ampleur des boiseries.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Quelles matières pour une tête de lit capitonnée ?',
                    );
                },
                get a() {
                    return tr(
                        "Le cadre est en chêne, noyer ou ébène massif. Le garnissage associe une mousse technique à densités différenciées et un textile respirant : lin lavé, laine déperlante ou velours. Les tissus synthétiques sont déconseillés pour préserver le confort de respiration du couchage.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Intervenez-vous sur un relevé de cotes sur place ?',
                    );
                },
                get a() {
                    return tr(
                        "Oui, partout au Liban, généralement dans les dix jours suivant la validation d'intention. À l'étranger, nous travaillons sur plans vérifiés par votre architecte et nous nous déplaçons pour la pose finale, une fois les ouvrages prêts à recevoir.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Quel délai pour une suite de nuit complète ?',
                    );
                },
                get a() {
                    return tr(
                        "Comptez huit à douze semaines pour une suite complète (tête de lit, boiseries, chevets et banc), et deux semaines supplémentaires pour la pose et les réglages. Une suite simple — lit et chevets — s'établit plutôt entre cinq et sept semaines.",
                    );
                },
            },
        ],
        related: ['salles-a-manger', 'salons'],
    },

    {
        slug: 'rangements',
        path: '/collections/rangements/',
        get navLabel() {
            return tr(
                'Rangements &amp; bureaux',
            );
        },
        get breadcrumbLabel() {
            return tr(
                'Rangements, enfilades &amp; bureaux',
            );
        },
        get eyebrow() {
            return tr(
                'Menuiserie &amp; rangement',
            );
        },
        get h1() {
            return tr(
                'Enfilades, Commodes &amp; Bureaux en Bois Massif',
            );
        },
        get title() {
            return tr(
                'Enfilades, Commodes &amp; Bureaux à Tripoli | Maison Tripoli',
            );
        },
        get description() {
            return tr(
                "Enfilades cannelées, consoles et bureaux d'apparat en noyer et ébène massifs, laqués et cirés à la main dans notre atelier de Tripoli, au Liban.",
            );
        },
        get metaKeywords() {
            return [
            tr('enfilade sur mesure Liban'),
            tr('commode noyer massif Tripoli'),
            tr('bureau sur mesure ébène'),
            tr('menuiserie d’art Tripoli'),
];
        },
        get summary() {
            return tr(
                "Enfilades cannelées, consoles d’entrée et bureaux d’apparat : la menuiserie d’art de nos maîtres ébénistes, du tiroir à fond de velours à la façade cannelée main.",
            );
        },
        highlights: [
            { icon: 'check', get label() { return tr('Façades cannelées fraisées à la main'); } },
            { icon: 'check', get label() { return tr('Charnières amorties et tiroirs à fond de velours'); } },
            { icon: 'check', get label() { return tr('Marbre et bronze ajustés sur mesure'); } },
        ],
        get intro() {
            return [
            tr("Le rangement est le révélateur d'un intérieur : c'est lui qui libère les surfaces et donne sa respiration à une pièce. Nos enfilades, commodes et consoles sont dessinées autour de vos objets, avec des profondeurs utiles pensées pour le linge de table, la vaisselle ou la documentation."),
            tr("Côté bureau, nous travaillons des pièces d'apparat à caissons, laquées à l'ancienne en sept couches, avec cuir patiné et poignées de bronze massif fondu puis ajusté à la main sur chaque façade."),
];
        },
        sections: [
            {
                id: 'menuiserie',
                get eyebrow() {
                    return tr(
                        "Menuiserie d'art",
                    );
                },
                get heading() {
                    return tr(
                        'La cannelure, la laque et le marbre',
                    );
                },
                get paragraphs() {
                    return [
                    tr("Une façade cannelée se travaille avec des fraises profilées réglées à la main : chaque cannelure est fraisée, ébarbée puis poncée individuellement avant assemblage. C'est cette régularité du pas qui donne à l'enfilade sa lecture architecturale et son ombre portée."),
                    tr("Les finitions varient selon l'usage : cirée à la cire d'abeille pour les bois nobles qui doivent se patiner, laquée satinée pour les pièces d'apparat, huilée pour les surfaces de contact fréquent. Les plateaux de marbre sont choisis avec vous en atelier, sur dalle."),
];
                },
                specs: [
                    { get label() { return tr('Essences'); }, get value() { return tr('Noyer, chêne, ébène teinté'); } },
                    { get label() { return tr('Façades'); }, get value() { return tr('Cannelées, à plate-bande ou laquées'); } },
                    { get label() { return tr('Accastillage'); }, get value() { return tr('Bronze massif, laiton brossé, charnières amorties'); } },
                    { get label() { return tr('Intérieurs'); }, get value() { return tr('Fonds de tiroir velours, plateaux amovibles'); } },
                ],
            },
            {
                id: 'agencement',
                get eyebrow() {
                    return tr(
                        'Agencement',
                    );
                },
                get heading() {
                    return tr(
                        'Du meuble isolé au mur de rangement',
                    );
                },
                get paragraphs() {
                    return [
                    tr("Au-delà de la pièce isolée, nous réalisons des murs de rangement complets : bibliothèques toute hauteur, niches éclairées, portes escamotables qui masquent un bureau ou un dressing. Le calepinage est dessiné pour que chaque porte s'aligne avec les lignes de la pièce."),
                    tr("Pour les projets hôteliers et résidentiels d'envergure, nous livrons les ouvrages par lots numérotés avec un plan de pose par chambre, afin que les équipes de chantier posent sans erreur et sans retouche."),
];
                },
            },
        ],
        faq: [
            {
                get q() {
                    return tr(
                        'Peut-on adapter la longueur d’une enfilade ?',
                    );
                },
                get a() {
                    return tr(
                        "Oui, nos enfilades se déclinent de 120 à 400 cm, avec un nombre de portes et de caissons ajustable. Le pas des cannelures est recalculé pour rester régulier quelle que soit la longueur finale, sans cannelure coupée en bout.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Quelles essences pour un bureau sur mesure ?',
                    );
                },
                get a() {
                    return tr(
                        "Le noyer et le chêne offrent la meilleure stabilité pour un plan de travail, l'ébène teinté et le laqué étant réservés aux pièces d'apparat. Le plateau peut recevoir un cuir patiné collé à chaud, insensible aux variations d'humidité.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Comment sont finies les façades cannelées ?',
                    );
                },
                get a() {
                    return tr(
                        "Chaque cannelure est fraisée, ébarbée puis poncée à la main, et la façade est finie d'un seul geste continu pour éviter les surépaisseurs dans les creux. Les teintes sont validées sur panneau témoin avant finition définitive.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Assurez-vous la pose des boiseries ?',
                    );
                },
                get a() {
                    return tr(
                        "Oui, nos équipes assurent la pose au Liban, y compris les murs de rangement toute hauteur et les bibliothèques intégrées. À l'étranger, nous formons les équipes de pose locales et supervisons le chantier par visioconférence ou sur site.",
                    );
                },
            },
        ],
        related: ['eclairage-objets', 'chambres'],
    },

    {
        slug: 'eclairage-objets',
        path: '/collections/eclairage-objets/',
        get navLabel() {
            return tr(
                "Éclairage &amp; objets d'art",
            );
        },
        get breadcrumbLabel() {
            return tr(
                "Éclairage &amp; objets d'art",
            );
        },
        get eyebrow() {
            return tr(
                'Laiton &amp; pierre',
            );
        },
        get h1() {
            return tr(
                "Éclairage d'Art &amp; Objets en Laiton et Travertin",
            );
        },
        get title() {
            return tr(
                "Lustres en Laiton &amp; Objets d'Art à Tripoli | Maison Tripoli",
            );
        },
        get description() {
            return tr(
                "Lustres en laiton massif martelé du Souk des Cuivres, sellets et objets en travertin : pièces d'art façonnées main dans notre atelier de Tripoli, Liban.",
            );
        },
        get metaKeywords() {
            return [
            tr('lustre laiton massif Liban'),
            tr('luminaire artisanal Tripoli'),
            tr('objet décoratif travertin'),
            tr('pièce unique laiton martelé'),
];
        },
        get summary() {
            return tr(
                "Lustres en laiton massif martelé du Souk des Cuivres, sellets en travertin et pièces d’art : la touche finale qui fait lire un intérieur comme une composition.",
            );
        },
        highlights: [
            { icon: 'check', get label() { return tr('Laiton massif martelé et patiné main'); } },
            { icon: 'check', get label() { return tr('Électrification aux normes CE / IEC'); } },
            { icon: 'check', get label() { return tr('Hauteur de suspension réglable'); } },
        ],
        get intro() {
            return [
            tr("Un intérieur se termine par la lumière et par les objets. Nos luminaires et pièces d'art sont fabriqués en petites séries dans les ateliers d'artisans de Tripoli, dans la continuité d'une tradition de dinanderie qui a fait la réputation du Souk des Cuivres."),
            tr("Chaque pièce est ciselée, assemblée puis patinée à la main : deux exemplaires d'un même modèle ne se ressemblent jamais tout à fait, ce qui en fait des pièces signées plutôt que des objets industrialisés."),
];
        },
        sections: [
            {
                id: 'dinanderie',
                get eyebrow() {
                    return tr(
                        'Dinanderie',
                    );
                },
                get heading() {
                    return tr(
                        'Le laiton, du Souk des Cuivres à votre plafond',
                    );
                },
                get paragraphs() {
                    return [
                    tr("Le laiton est mis en forme au marteau sur des formes de bois, puis recuit pour retrouver sa ductilité avant d'être retravaillé. Le ciselage se fait à froid, à l'aide de poinçons et de burins : c'est cette étape qui creuse les facettes et fabrique la diffusion lumineuse si particulière des lustres de Tripoli."),
                    tr("La finition est protéinée ou patinée antique : le laiton se patine naturellement avec le temps, ce qui est recherché ; un vernis incolore optionnel permet de figer l'éclat initial si vous préférez éviter les marques du temps."),
];
                },
                specs: [
                    { get label() { return tr('Matériaux'); }, get value() { return tr('Laiton massif, travertin, bronze'); } },
                    { get label() { return tr('Électrification'); }, get value() { return tr('Douilles céramique, câblage CE / IEC'); } },
                    { get label() { return tr('Suspension'); }, get value() { return tr('Câble acier réglable de 60 à 200 cm'); } },
                    { get label() { return tr('Patiné'); }, get value() { return tr('Antique protéiné ou laiton brut évolutif'); } },
                ],
            },
            {
                id: 'objets',
                get eyebrow() {
                    return tr(
                        'Objets',
                    );
                },
                get heading() {
                    return tr(
                        'Sellets, plateaux et pièces de collection',
                    );
                },
                get paragraphs() {
                    return [
                    tr("À côté des luminaires, nous taillons des objets de présentation : sellets monolithes en travertin, plateaux en marbre noir, socles pour céramiques ou sculptures. Ces pièces sont découpées dans des chutes de nos plateaux de table, ce qui leur donne une parenté de matière avec le mobilier de la pièce."),
                    tr("Elles peuvent porter une gravure discrète — monogramme, date, nom de lieu — exécutée à la main. Une manière de marquer une pièce offerte, une distinction ou la livraison d'une résidence."),
];
                },
            },
        ],
        faq: [
            {
                get q() {
                    return tr(
                        'Vos luminaires sont-ils électrifiés aux normes ?',
                    );
                },
                get a() {
                    return tr(
                        "Oui, chaque luminaire est câblé avec des douilles en céramique, du fil doublement isolé et des raccords conformes aux exigences CE et IEC. Un marquage et une notice de montage accompagnent la livraison ; l'installation doit être réalisée par un électricien qualifié.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Peut-on adapter la hauteur de suspension ?',
                    );
                },
                get a() {
                    return tr(
                        "La hauteur est réglable à la pose au moyen d'un câble acier et d'un raccord vissé, de 60 cm à 200 cm. Pour les architectures à grande hauteur, nous fournissons un câblage de longueur spécifique sur simple indication de la hauteur finie souhaitée.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Le laiton se patine-t-il avec le temps ?',
                    );
                },
                get a() {
                    return tr(
                        "Le laiton brut évolue naturellement vers une teinte ambrée puis plus profonde : c'est une patine recherchée, qui garde la mémoire du toucher. Une finition protéinée peut figer l'éclat d'origine si vous préférez une lecture constante.",
                    );
                },
            },
            {
                get q() {
                    return tr(
                        'Proposez-vous des pièces uniques ?',
                    );
                },
                get a() {
                    return tr(
                        "Si, trois à quatre fois par an, nous éditons des pièces uniques en collaboration avec les maîtres dinandiers du souk : grande suspension, paravent de laiton ou ensemble de sellets. Les projets de création dédiés sont possibles, avec un délai d'étude de quatre à six semaines.",
                    );
                },
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
