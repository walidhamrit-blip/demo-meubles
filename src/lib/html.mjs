/**
 * src/lib/html.mjs
 * ---------------------------------------------------------------------------
 * Les données éditoriales (`src/content/*`, `src/site.config.mjs`) sont écrites
 * une seule fois puis consommées dans deux types de contextes :
 *
 *   • HTML  — texte, attributs, <title>, métadonnées : l'esperluette doit être
 *             encodée en `&amp;` (règle html-validate `no-raw-characters`).
 *   • Données — JSON-LD, `assets/js/catalog.js`, flux RSS : le texte doit rester
 *             brut, sinon le navigateur ou les moteurs affichent `&amp;` tel quel.
 *
 * La source de vérité est donc encodée (contexte HTML majoritaire), et ce module
 * fournit le décodage explicite au moment de sérialiser les contextes « données ».
 */

const NAMED_ENTITIES = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: '\u00a0',
    hellip: '…',
    mdash: '—',
    ndash: '–',
    laquo: '«',
    raquo: '»',
    deg: '°',
    euro: '€',
};

/**
 * Décode les entités HTML nommées et numériques d'une chaîne.
 * @param {unknown} value
 * @returns {unknown} la chaîne décodée, ou la valeur inchangée si ce n'est pas une chaîne.
 */
export function decodeEntities(value) {
    if (typeof value !== 'string') return value;

    return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
        if (entity[0] === '#') {
            const code = entity[1] === 'x' || entity[1] === 'X'
                ? Number.parseInt(entity.slice(2), 16)
                : Number.parseInt(entity.slice(1), 10);
            return Number.isFinite(code) ? String.fromCodePoint(code) : match;
        }
        return Object.hasOwn(NAMED_ENTITIES, entity) ? NAMED_ENTITIES[entity] : match;
    });
}

/**
 * Décode récursivement toutes les chaînes d'une structure (objet, tableau, Map).
 * Utilisé avant `JSON.stringify()` pour le JSON-LD et le catalogue navigateur.
 * @template T
 * @param {T} value
 * @returns {T}
 */
export function decodeDeep(value) {
    if (typeof value === 'string') return /** @type {T} */ (decodeEntities(value));
    if (Array.isArray(value)) return /** @type {T} */ (value.map((item) => decodeDeep(item)));
    if (value && typeof value === 'object') {
        if (value instanceof Map) {
            return /** @type {T} */ (
                new Map([...value].map(([key, item]) => [key, decodeDeep(item)]))
            );
        }
        return /** @type {T} */ (
            Object.fromEntries(Object.entries(value).map(([key, item]) => [key, decodeDeep(item)]))
        );
    }
    return value;
}
