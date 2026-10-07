/**
 * tailwind.config.js
 * ---------------------------------------------------------------------------
 * Les couleurs ne portent plus de valeurs fixes : chaque jeton sémantique
 * pointe vers une variable CSS (triplet RVB) définie dans `src/input.css`
 * pour chacun des trois thèmes (`clair`, `ebene`, `noyer`).
 *
 * Conséquence : une classe comme `bg-surface` ou `text-ink` s'adapte
 * automatiquement au thème actif, sans dupliquer les classes dans le HTML
 * (donc sans alourdir le CSS ni les gabarits).
 *
 * @type {import('tailwindcss').Config}
 */
const theme = (name) => `rgb(var(--mt-${name}) / <alpha-value>)`;

module.exports = {
    // Fichiers scannés pour ne générer QUE les classes réellement utilisées
    // (CSS final ~20 Ko au lieu des ~400 Ko du CDN Play).
    content: [
        './index.html',              // pages générées (français, langue pivot)…
        './en/**/*.html',            // …et versions traduites
        './ar/**/*.html',
        './collections/**/*.html',
        './atelier/**/*.html',
        './sur-mesure/**/*.html',
        './projets/**/*.html',
        './contact/**/*.html',
        './mentions-legales/**/*.html',
        './404.html',
        './src/**/*.mjs',            // …et leurs gabarits/composants sources
        './assets/js/**/*.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
                sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
                /* Police d'affichage des grands titres : elle change d'écriture
                   selon la langue de la page (voir --mt-font-display dans
                   src/input.css). Utilisée par le titre du héros d'accueil. */
                display: ['var(--mt-font-display)'],
            },
            colors: {
                /* Surfaces */
                surface: theme('surface'),
                'surface-2': theme('surface-2'),
                'surface-3': theme('surface-3'),
                'surface-4': theme('surface-4'),
                'surface-alt': theme('surface-alt'),

                /* Texte */
                ink: theme('ink'),
                'ink-strong': theme('ink-strong'),
                muted: theme('muted'),

                /* Lignes et bordures */
                line: theme('line'),
                'line-soft': theme('line-soft'),
                'line-strong': theme('line-strong'),
                'line-faint': theme('line-faint'),

                /* Accent (bronze de la Maison) */
                accent: theme('accent'),
                'accent-ink': theme('accent-ink'),
                'on-accent': theme('on-accent'),

                /* Bandes inversées (sections sombres en thème clair) */
                inverse: theme('inverse'),
                'inverse-strong': theme('inverse-strong'),
                'on-inverse': theme('on-inverse'),
                'on-inverse-soft': theme('on-inverse-soft'),
                'on-inverse-muted': theme('on-inverse-muted'),
                'on-inverse-faint': theme('on-inverse-faint'),

                /* « Papier » : remplissages qui restent clairs dans tous les
                   thèmes (bouton principal, pastilles) pour garantir le contraste */
                paper: theme('paper'),
                'on-paper': theme('on-paper'),
            },
        },
    },
    plugins: [],
};
