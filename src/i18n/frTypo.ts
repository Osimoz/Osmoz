// Typographie française : espace fine insécable (U+202F) avant : ; ! ? et à
// l'intérieur des guillemets « ». Appliquée une seule fois au dictionnaire FR
// (src/locales/index.ts) ; le dictionnaire EN n'y passe jamais — en anglais il
// n'y a pas d'espace avant la ponctuation.
//
// La règle ne fait que remplacer une espace DÉJÀ présente : elle ne touche donc
// ni aux URL ("https://…"), ni aux horaires ("08h30 - 12h"), ni aux adresses
// e-mail. Les balises meta (seo-config.json) ne sont volontairement pas
// traitées : certains aperçus affichent mal l'espace fine.

const NNBSP = '\u202F';

export function frTypo(text: string): string {
  return text
    .replace(/ ([:;!?])/g, `${NNBSP}$1`)
    .replace(/« /g, `«${NNBSP}`)
    .replace(/ »/g, `${NNBSP}»`);
}

/** Applique `fn` à toutes les chaînes d'un objet, en conservant sa forme. */
export function mapStrings<T>(value: T, fn: (s: string) => string): T {
  if (typeof value === 'string') return fn(value) as T;
  if (Array.isArray(value)) return value.map((v) => mapStrings(v, fn)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, mapStrings(v, fn)])) as T;
  }
  return value;
}
