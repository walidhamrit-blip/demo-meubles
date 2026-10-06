/* =========================================================================
   MAISON TRIPOLI — Logique applicative (multi-pages)
   -------------------------------------------------------------------------
   ✔ Aucune dépendance externe (ni CDN, ni framework, ni icônes injectées)
   ✔ Chargé en `defer` sur toutes les pages : n'entrave pas le rendu (LCP)
   ✔ Chaque module ne s'active que si ses éléments existent dans le DOM
     (une page de collection, la page d'accueil et la 404 partagent le même
     fichier sans jamais lever d'erreur)
   ✔ Couches accessibles : ARIA, piège de focus, touche Échap, retour du focus
   ========================================================================= */
(function () {
    'use strict';

    /* ---------------------------------------------------------------------
       Catalogue — miroir de src/content/products.mjs
       (injecté au build par tools/build-site.mjs)
       --------------------------------------------------------------------- */
    var catalogData = window.__MT_CATALOG__ || { products: [], collections: {}, collectionLabels: {} };
    var products = catalogData.products;
    var collectionPaths = catalogData.collections;
    var collectionLabels = catalogData.collectionLabels;

    var cart = [];
    var currentActiveProduct = null;
    var lastFocusedElement = null;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ---------------------------------------------------------------------
       Utilitaires
       --------------------------------------------------------------------- */
    function $(selector, scope) {
        return (scope || document).querySelector(selector);
    }

    function $all(selector, scope) {
        return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    }

    /** Normalise une chaîne : minuscules, sans accents (recherche tolérante). */
    function normalize(value) {
        return (value || '')
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function formatPrice(value) {
        return value.toLocaleString('fr-FR') + ' $';
    }

    /** Prix affiché (gère les pièces « à partir de »). */
    function priceLabel(product) {
        return product.priceFrom ? 'À partir de ' + formatPrice(product.price) : formatPrice(product.price);
    }

    function createIcon(iconId, classes) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', classes);
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', '#i-' + iconId);
        svg.appendChild(use);
        return svg;
    }

    /* ---------------------------------------------------------------------
       Couches (modales / tiroirs) accessibles
       --------------------------------------------------------------------- */
    var FOCUSABLE =
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

    function openDialog(dialog) {
        if (!dialog || dialog.classList.contains('is-open')) return;
        lastFocusedElement = document.activeElement;

        dialog.hidden = false;
        dialog.classList.add('is-open');
        dialog.setAttribute('aria-hidden', 'false');

        if (dialog.id === 'cartDrawer') {
            dialog.classList.add('translate-x-full');
            window.requestAnimationFrame(function () {
                dialog.classList.remove('translate-x-full');
            });
        }

        document.body.classList.add('has-dialog-open');

        var target = $('[autofocus]', dialog) || $('input, button, a', dialog);
        if (target) {
            window.setTimeout(
                function () {
                    target.focus();
                },
                prefersReducedMotion.matches ? 0 : 80,
            );
        }
    }

    function closeDialog(dialog) {
        if (!dialog || !dialog.classList.contains('is-open')) return;

        dialog.classList.remove('is-open');
        dialog.setAttribute('aria-hidden', 'true');
        dialog.hidden = true;

        if (dialog.id === 'cartDrawer') {
            dialog.classList.add('translate-x-full');
            var toggle = $('#cartToggleBtn');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }

        if (!$('[data-dialog].is-open')) {
            document.body.classList.remove('has-dialog-open');
        }

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    function closeAllDialogs() {
        $all('[data-dialog].is-open').forEach(closeDialog);
    }

    function trapFocus(event) {
        var dialog = event.currentTarget;
        var items = $all(FOCUSABLE, dialog).filter(function (element) {
            return element.offsetParent !== null;
        });
        if (!items.length) return;

        var first = items[0];
        var last = items[items.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    /* ---------------------------------------------------------------------
       Navigation mobile
       --------------------------------------------------------------------- */
    var mobileDrawer = $('#mobileDrawer');
    var mobileMenuBtn = $('#mobileMenuBtn');

    function setMobileMenu(open) {
        if (!mobileDrawer || !mobileMenuBtn) return;
        mobileDrawer.hidden = !open;
        mobileMenuBtn.setAttribute('aria-expanded', String(open));
        mobileMenuBtn.setAttribute(
            'aria-label',
            open ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation',
        );
    }

    /* ---------------------------------------------------------------------
       Nuancier des matières (page d'accueil)
       --------------------------------------------------------------------- */
    var materialDetails = {
        walnut: {
            title: 'Console Basse « Bahia » en Noyer Sculpté',
            alt: 'Console basse Bahia en noyer foncé sculpté et ciré à la main dans l’atelier de Tripoli',
            desc: "<strong>Noyer Royal de la Vallée :</strong> Séchage naturel en grange à Tripoli pendant 18 mois, puis polissage ciré à la main avec une cire d'abeille biologique libanaise.",
            img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75',
        },
        oak: {
            title: "Table d'Appoint « Tripoli » en Chêne Cérusé",
            alt: 'Table d’appoint Tripoli en chêne clair cérusé à la finition huilée mate',
            desc: '<strong>Chêne Clair de Haute Facture :</strong> Veinage linéaire sélectionné à la gouge, finition sablée et huilée mat pour préserver la clarté méditerranéenne.',
            img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=75',
        },
        travertine: {
            title: 'Sellette Monolithe en Travertin de la Côte',
            alt: 'Sellette monolithe en travertin romain adouci et chanfreiné, découpe de marbrerie levantine',
            desc: '<strong>Travertin Romain & Levant :</strong> Découpé et chanfreiné avec précision par nos marbriers partenaires de la région du Nord-Liban.',
            img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=75',
        },
        ebony: {
            title: 'Bureau Ministre en Ébène Teinté & Bronze',
            alt: 'Bureau ministre en ébène teinté laqué satiné et détails en bronze de l’atelier Maison Tripoli',
            desc: "<strong>Ébène Noir Velouté :</strong> Laque satinée à l'ancienne appliquée en 7 couches successives dans nos ateliers à Tripoli.",
            img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=75',
        },
    };

    function changeMaterial(type, trigger) {
        var data = materialDetails[type];
        if (!data) return;

        var previewImg = $('#materialPreviewImg');
        var title = $('#materialTitle');
        var description = $('#materialDescription');

        if (previewImg) {
            previewImg.style.opacity = '0';
            window.setTimeout(
                function () {
                    previewImg.src = data.img;
                    previewImg.alt = data.alt;
                    previewImg.style.opacity = '1';
                },
                prefersReducedMotion.matches ? 0 : 200,
            );
        }
        if (title) title.textContent = data.title;
        if (description) description.innerHTML = data.desc;

        $all('.finish-btn').forEach(function (button) {
            button.setAttribute('aria-pressed', String(button === trigger));
        });
    }

    /* ---------------------------------------------------------------------
       Fiche produit (quick view) — partagée par toutes les pages
       --------------------------------------------------------------------- */
    function findProduct(slug) {
        return products.filter(function (item) {
            return item.slug === slug;
        })[0];
    }

    function openQuickView(slug, trigger) {
        var product = findProduct(slug);
        if (!product) return;

        currentActiveProduct = product;

        var image = $('#modalProductImg');
        if (image) {
            image.src = product.image + '?auto=format&fit=crop&w=1000&q=75';
            image.alt = product.alt || product.name;
        }

        var fields = {
            modalProductTitle: product.name,
            modalProductPrice: priceLabel(product),
            modalProductBadge: product.badge,
            modalProductDesc: product.desc,
            modalProductDim: product.dimensions,
            modalProductLead: product.lead,
        };
        Object.keys(fields).forEach(function (id) {
            var element = document.getElementById(id);
            if (element) element.textContent = fields[id];
        });

        var collectionLink = $('#modalProductCollection');
        if (collectionLink) {
            collectionLink.textContent = '';
            if (collectionPaths[product.collection]) {
                var anchor = document.createElement('a');
                anchor.href = collectionPaths[product.collection];
                anchor.className = 'underline underline-offset-4 hover:text-bronze';
                anchor.textContent = 'Voir la collection ' + (collectionLabels[product.collection] || '');
                collectionLink.appendChild(anchor);
            }
        }

        if (trigger) lastFocusedElement = trigger;
        openDialog($('#quickViewModal'));
    }

    /* ---------------------------------------------------------------------
       Sélection & demande de devis
       --------------------------------------------------------------------- */
    function updateCartCount() {
        var badge = $('#cartCountBadge');
        var toggle = $('#cartToggleBtn');

        if (badge) badge.textContent = '(' + cart.length + ')';
        if (toggle) {
            toggle.setAttribute(
                'aria-label',
                cart.length
                    ? 'Ouvrir ma sélection et mon devis (' +
                          cart.length +
                          ' pièce' +
                          (cart.length > 1 ? 's' : '') +
                          ')'
                    : 'Ouvrir ma sélection et mon devis (vide)',
            );
        }
    }

    function buildEmptyCartState() {
        var wrapper = document.createElement('div');
        wrapper.className = 'text-center py-16 text-warmgray';

        wrapper.appendChild(createIcon('inbox', 'icon w-10 h-10 mx-auto stroke-[1] mb-3 text-sand-400'));

        var title = document.createElement('p');
        title.className = 'text-xs uppercase tracking-widest';
        title.textContent = 'Votre sélection est vide';

        var hint = document.createElement('p');
        hint.className = 'text-[11px] text-warmgray/80 mt-1';
        hint.textContent = 'Parcourez nos collections signatures pour ajouter vos pièces.';

        wrapper.appendChild(title);
        wrapper.appendChild(hint);
        return wrapper;
    }

    function renderCart() {
        var list = $('#cartItemsList');
        var subtotal = $('#cartSubtotal');
        if (!list) return;

        list.textContent = '';

        if (!cart.length) {
            list.appendChild(buildEmptyCartState());
            if (subtotal) subtotal.textContent = '0 $';
            return;
        }

        var total = 0;

        cart.forEach(function (item, index) {
            total += item.price;

            var row = document.createElement('div');
            row.className = 'flex items-center gap-4 py-3 border-b border-sand-200 text-xs';

            var image = document.createElement('img');
            image.src = item.image + '?auto=format&fit=crop&w=200&q=70';
            image.alt = item.alt || item.name;
            image.width = 56;
            image.height = 56;
            image.loading = 'lazy';
            image.decoding = 'async';
            image.className = 'w-14 h-14 object-cover border border-sand-300';

            var details = document.createElement('div');
            details.className = 'flex-1';

            var title = document.createElement('h3');
            title.className = 'font-serif text-sm font-medium text-espresso';
            title.textContent = item.name;

            var price = document.createElement('span');
            price.className = 'text-warmgray';
            price.textContent = priceLabel(item);

            details.appendChild(title);
            details.appendChild(price);

            var remove = document.createElement('button');
            remove.type = 'button';
            remove.className = 'text-warmgray hover:text-red-700 p-2';
            remove.setAttribute('aria-label', 'Retirer ' + item.name + ' de ma sélection');
            remove.appendChild(createIcon('trash-2', 'icon w-4 h-4 stroke-[2]'));
            remove.addEventListener('click', function () {
                cart.splice(index, 1);
                updateCartCount();
                renderCart();
            });

            row.appendChild(image);
            row.appendChild(details);
            row.appendChild(remove);
            list.appendChild(row);
        });

        if (subtotal) subtotal.textContent = formatPrice(total);
    }

    function toggleCart() {
        var drawer = $('#cartDrawer');
        if (!drawer) return;

        if (drawer.classList.contains('is-open')) {
            closeDialog(drawer);
            return;
        }

        renderCart();
        openDialog(drawer);
        var button = $('#cartToggleBtn');
        if (button) button.setAttribute('aria-expanded', 'true');
    }

    function addToCartCurrent() {
        if (!currentActiveProduct) return;

        cart.push(currentActiveProduct);
        updateCartCount();
        closeDialog($('#quickViewModal'));

        var status = $('#cartStatus');
        if (status) {
            status.textContent = currentActiveProduct.name + ' a été ajouté à votre sélection.';
        }
        toggleCart();
    }

    /* ---------------------------------------------------------------------
       Recherche instantanée (sur tout le catalogue, toutes pages)
       --------------------------------------------------------------------- */
    function buildSearchResult(product) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className =
            'w-full text-left flex items-center justify-between gap-4 p-3 hover:bg-sand-100 cursor-pointer border-b border-sand-200';
        button.setAttribute('aria-label', 'Voir la fiche de ' + product.name + ', ' + priceLabel(product));

        var left = document.createElement('span');
        left.className = 'flex items-center gap-4';

        var image = document.createElement('img');
        image.src = product.image + '?auto=format&fit=crop&w=120&q=70';
        image.alt = product.alt || product.name;
        image.width = 48;
        image.height = 48;
        image.loading = 'lazy';
        image.decoding = 'async';
        image.className = 'w-12 h-12 object-cover';

        var text = document.createElement('span');

        var title = document.createElement('span');
        title.className = 'block font-serif text-base text-espresso';
        title.textContent = product.name;

        var badge = document.createElement('span');
        badge.className = 'block text-[10px] uppercase tracking-wider text-warmgray';
        badge.textContent = (collectionLabels[product.collection] || '') + ' • ' + product.badge;

        text.appendChild(title);
        text.appendChild(badge);
        left.appendChild(image);
        left.appendChild(text);

        var price = document.createElement('span');
        price.className = 'font-serif text-charcoal whitespace-nowrap';
        price.textContent = priceLabel(product);

        button.appendChild(left);
        button.appendChild(price);
        button.addEventListener('click', function () {
            closeDialog($('#searchModal'));
            window.setTimeout(
                function () {
                    openQuickView(product.slug, $('#cartToggleBtn'));
                },
                prefersReducedMotion.matches ? 0 : 120,
            );
        });

        return button;
    }

    function liveSearch(query) {
        var results = $('#searchResults');
        if (!results) return;

        var needle = normalize(query);
        results.textContent = '';

        if (!needle) return;

        var matches = products.filter(function (product) {
            return (
                normalize(product.name).indexOf(needle) !== -1 ||
                normalize(product.desc).indexOf(needle) !== -1 ||
                normalize(product.badge).indexOf(needle) !== -1 ||
                normalize(product.materials).indexOf(needle) !== -1 ||
                normalize(collectionLabels[product.collection]).indexOf(needle) !== -1
            );
        });

        if (!matches.length) {
            var empty = document.createElement('p');
            empty.className = 'text-warmgray italic text-center';
            empty.textContent =
                'Aucun modèle ne correspond à cette recherche. Essayez « noyer », « table » ou « salon ».';
            results.appendChild(empty);
            return;
        }

        matches.forEach(function (product) {
            results.appendChild(buildSearchResult(product));
        });
    }

    /* ---------------------------------------------------------------------
       Formulaires (démonstration front-end)
       --------------------------------------------------------------------- */
    function showStatus(element, message) {
        if (!element) return;
        element.textContent = message;
        element.classList.remove('hidden');
        window.setTimeout(function () {
            element.textContent = '';
            element.classList.add('hidden');
        }, 8000);
    }

    function handleContactSubmit(event) {
        event.preventDefault();
        var form = event.currentTarget;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        showStatus(
            $('#formSuccessMessage'),
            'Votre demande a été reçue. Notre équipe à Tripoli vous contacte sous 24 heures.',
        );
        form.reset();
    }

    function handleConsultationSubmit(event) {
        event.preventDefault();
        var form = event.currentTarget;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        showStatus($('#consultationStatus'), 'Rendez-vous pré-enregistré. Nous confirmons la date par WhatsApp.');
        form.reset();

        window.setTimeout(function () {
            closeDialog($('#consultationModal'));
        }, 2500);
    }

    function handleNewsletterSubmit(event) {
        event.preventDefault();
        var form = event.currentTarget;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        showStatus($('#newsletterStatus'), 'Merci pour votre inscription à la gazette Maison Tripoli.');
        form.reset();
    }

    /* ---------------------------------------------------------------------
       Ombrage du header au défilement (écoute passive + rAF)
       --------------------------------------------------------------------- */
    function initScrollEffects() {
        var navbar = $('#navbar');
        if (!navbar) return;

        var ticking = false;

        window.addEventListener(
            'scroll',
            function () {
                if (ticking) return;
                ticking = true;
                window.requestAnimationFrame(function () {
                    navbar.classList.toggle('shadow-sm', window.scrollY > 30);
                    ticking = false;
                });
            },
            { passive: true },
        );
    }

    /* ---------------------------------------------------------------------
       Écouteurs globaux (délégation d'événements)
       --------------------------------------------------------------------- */
    function initEventListeners() {
        document.addEventListener('click', function (event) {
            var opener = event.target.closest('[data-open-dialog]');
            if (opener) {
                if (opener.hasAttribute('data-close-menu')) setMobileMenu(false);
                openDialog(document.getElementById(opener.getAttribute('data-open-dialog')));
                return;
            }

            var closer = event.target.closest('[data-close-dialog]');
            if (closer) {
                closeDialog(closer.closest('[data-dialog]'));
                return;
            }

            var quickView = event.target.closest('[data-quickview]');
            if (quickView) {
                openQuickView(quickView.getAttribute('data-quickview'), quickView);
                return;
            }

            var finish = event.target.closest('.finish-btn');
            if (finish) {
                changeMaterial(finish.getAttribute('data-material'), finish);
                return;
            }

            if (event.target.closest('[data-close-menu]')) {
                setMobileMenu(false);
                return;
            }

            // Clic sur le fond assombri d'une couche => fermeture
            if (event.target.hasAttribute('data-dialog')) {
                closeDialog(event.target);
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeAllDialogs();
                setMobileMenu(false);
            }
        });

        $all('[data-dialog]').forEach(function (dialog) {
            dialog.addEventListener('keydown', function (event) {
                if (event.key === 'Tab') trapFocus(event);
            });
        });

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function () {
                setMobileMenu(mobileDrawer.hidden);
            });
        }

        var cartToggleBtn = $('#cartToggleBtn');
        if (cartToggleBtn) cartToggleBtn.addEventListener('click', toggleCart);

        var addToCartBtn = $('#addToCartBtn');
        if (addToCartBtn) addToCartBtn.addEventListener('click', addToCartCurrent);

        var searchInput = $('#searchInput');
        if (searchInput) {
            var debounce;
            searchInput.addEventListener('input', function (event) {
                var value = event.target.value;
                window.clearTimeout(debounce);
                debounce = window.setTimeout(function () {
                    liveSearch(value);
                }, 150);
            });
        }

        var contactForm = $('#contactForm');
        if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);

        var consultationForm = $('#consultationForm');
        if (consultationForm) consultationForm.addEventListener('submit', handleConsultationSubmit);

        var newsletterForm = $('#newsletterForm');
        if (newsletterForm) newsletterForm.addEventListener('submit', handleNewsletterSubmit);

        var quoteRequestBtn = $('#quoteRequestBtn');
        if (quoteRequestBtn) {
            quoteRequestBtn.addEventListener('click', function () {
                showStatus(
                    $('#cartStatus'),
                    'Votre demande de chiffrage a été transmise à notre bureau de Tripoli. Un chargé d’affaires vous contacte d’ici 24 heures.',
                );
            });
        }
    }

    /* ---------------------------------------------------------------------
       Initialisation
       --------------------------------------------------------------------- */
    function init() {
        initScrollEffects();
        initEventListeners();
        updateCartCount();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
