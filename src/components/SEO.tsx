import { Helmet } from 'react-helmet-async';
import seo from '../lib/seo-config.json';
import { useLocale } from '../i18n/context';
import { LANGS, type Lang, type RouteKey } from '../i18n/paths';

// Balises SEO par route et par langue (title, description, canonical absolu,
// Open Graph, Twitter). La source de vérité est src/lib/seo-config.json,
// partagée avec le script de pré-rendering (scripts/prerender-seo.mjs) pour
// que le HTML servi et le rendu client restent identiques : Helmet reconnaît
// alors les balises pré-rendues (data-rh) et ne les duplique pas.
//
// Le JSON-LD spécifique à une page (LocalBusiness, FAQ, Breadcrumb) reste géré
// dans la page elle-même via un <Helmet> dédié : il dépend de données calculées
// au rendu.

type LangMeta = { title: string; description: string };
type RouteMeta = {
  path: Partial<Record<Lang, string>>;
  fr: LangMeta;
  en?: LangMeta;
  image?: string;
  type?: string;
  robots?: string;
};

const defaults = seo.defaults;
const routes = seo.routes as Record<RouteKey, RouteMeta>;

type Props = {
  /** Clé de la route dans seo-config.json, ex. "loft". */
  route: RouteKey;
  /** Surcharges optionnelles (sinon lues dans seo-config.json). */
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  robots?: string;
};

export default function SEO({ route, title, description, image, type, robots }: Props) {
  const { lang } = useLocale();
  const entry = routes[route];
  // Tant qu'une route n'a pas de meta dans la langue courante, on retombe sur la FR.
  const meta = entry[lang] ?? entry.fr;
  const path = entry.path[lang] ?? entry.path.fr ?? '/';
  const finalTitle = title ?? meta.title ?? defaults.siteName;
  const finalDesc = description ?? meta.description ?? '';
  const finalImage = image ?? entry.image ?? defaults.image;
  const finalType = type ?? entry.type ?? defaults.type;
  const finalRobots = robots ?? entry.robots ?? 'index, follow';
  const url = `${defaults.baseUrl}${path}`;
  // hreflang réciproques (fr, en, x-default → fr) uniquement quand la page
  // existe dans les deux langues ; les articles restent FR seulement.
  const alternates = LANGS.filter((l) => entry.path[l]).map((l) => ({ lang: l, href: `${defaults.baseUrl}${entry.path[l]}` }));
  const hasAlternates = alternates.length > 1;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{finalTitle}</title>
      {finalDesc && <meta name="description" content={finalDesc} />}
      <link rel="canonical" href={url} />
      {hasAlternates && alternates.map((a) => <link key={a.lang} rel="alternate" hrefLang={a.lang} href={a.href} />)}
      {hasAlternates && <link rel="alternate" hrefLang="x-default" href={`${defaults.baseUrl}${entry.path.fr}`} />}
      <meta name="robots" content={finalRobots} />

      <meta property="og:type" content={finalType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      {finalDesc && <meta property="og:description" content={finalDesc} />}
      <meta property="og:image" content={finalImage} />
      <meta property="og:locale" content={defaults.locales[lang]} />
      <meta property="og:site_name" content={defaults.siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      {finalDesc && <meta name="twitter:description" content={finalDesc} />}
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
}
