/** @type {import('tailwindcss').Config} */
module.exports = {
    // Fichiers scannés pour ne générer QUE les classes réellement utilisées
    // (CSS final ~20 Ko au lieu des ~400 Ko du CDN Play).
    content: [
        './index.html',              // pages générées…
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
            },
            colors: {
                sand: {
                    50: '#FAF8F5',
                    100: '#F4EFEA',
                    200: '#E8DFD5',
                    300: '#D9CBBB',
                    400: '#C4B19C',
                },
                charcoal: '#1A1817',
                espresso: '#231F1D',
                bronze: '#8C7355',
                travertine: '#EFECE6',
                warmgray: '#78736E',
            },
        },
    },
    plugins: [],
};
