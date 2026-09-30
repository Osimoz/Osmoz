// Table des routes bilingues. Source de vérité : src/lib/seo-config.json,
// partagée avec scripts/prerender-seo.mjs (pré-rendu + sitemap) pour que le
// routeur, les liens, le sélecteur de langue et le HTML servi restent alignés.
//
// FR à la racine (/), EN sous /en/. Les slugs sont identiques sauf quand un
// slug anglais est nettement meilleur (faq, booking, csr, legal-notice,
// privacy-policy) — la correspondance vit dans `path` de chaque route.
// Une route sans `path.en` (articles) n'existe qu'en français.
import seo from '../lib/seo-config.json';

export type Lang = 'fr' | 'en';
export const LANGS = ['fr', 'en'] as const;
export const DEFAULT_LANG: Lang = 'fr';

export type RouteKey = keyof typeof seo.routes;
type RouteEntry = { path: { fr: string; en?: string } };
const routes = seo.routes as Record<RouteKey, RouteEntry>;
export const ROUTE_KEYS = Object.keys(routes) as RouteKey[];

export function pathFor(key: RouteKey, lang: Lang): string | undefined {
  return routes[key].path[lang];
}

const stripTrailingSlash = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

/** Clé de la route dont le chemin `lang` correspond exactement à `pathname`. */
export function matchRouteKey(pathname: string, lang: Lang): RouteKey | null {
  const clean = stripTrailingSlash(pathname);
  return ROUTE_KEYS.find((k) => routes[k].path[lang] === clean) ?? null;
}

/**
 * Traduit un chemin FR (éventuellement suivi d'une query/hash) vers `lang`.
 * Les pages n'écrivent que des chemins FR ; un chemin sans équivalent
 * (articles) est renvoyé tel quel, donc reste en français.
 */
export function localizePath(frPath: string, lang: Lang): string {
  if (lang === 'fr') return frPath;
  const i = frPath.search(/[?#]/);
  const path = i === -1 ? frPath : frPath.slice(0, i);
  const rest = i === -1 ? '' : frPath.slice(i);
  const key = matchRouteKey(path, 'fr');
  const target = key ? routes[key].path[lang] : undefined;
  return target ? target + rest : frPath;
}

/** Page équivalente dans l'autre langue (sélecteur de langue), sinon sa home. */
export function alternatePath(pathname: string, search: string, lang: Lang): { lang: Lang; to: string } {
  const other: Lang = lang === 'fr' ? 'en' : 'fr';
  const key = matchRouteKey(pathname, lang);
  const target = key ? routes[key].path[other] : undefined;
  return { lang: other, to: target ? target + search : routes.home.path[other] ?? '/' };
}
