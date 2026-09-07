import { Helmet } from 'react-helmet-async';
import seo from '../lib/seo-config.json';

// Balises SEO par route (title, description, canonical absolu, Open Graph,
// Twitter). La source de vérité est src/lib/seo-config.json, partagée avec le
// script de pré-rendering (scripts/prerender-seo.mjs) pour que le HTML servi et
// le rendu client restent identiques.
//
// Le JSON-LD spécifique à une page (LocalBusiness, FAQ, Breadcrumb) reste géré
// dans la page elle-même via un <Helmet> dédié : il dépend de données calculées
// au rendu.

type RouteMeta = { title: string; description: string; image?: string; type?: string; robots?: string };

const defaults = seo.defaults;
const routes = seo.routes as Record<string, RouteMeta>;

type Props = {
  /** Chemin canonique de la route, ex. "/spaces/loft-osmoz". */
  path: string;
  /** Surcharges optionnelles (sinon lues dans seo-config.json). */
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  robots?: string;
};

export function buildCanonical(path: string): string {
  const clean = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  return `${defaults.baseUrl}${clean}`;
}

export default function SEO({ path, title, description, image, type, robots }: Props) {
  const meta = routes[path] ?? ({} as RouteMeta);
  const finalTitle = title ?? meta.title ?? defaults.siteName;
  const finalDesc = description ?? meta.description ?? '';
  const finalImage = image ?? meta.image ?? defaults.image;
  const finalType = type ?? meta.type ?? defaults.type;
  const finalRobots = robots ?? meta.robots ?? 'index, follow';
  const url = buildCanonical(path);

  return (
    <Helmet>
      <title>{finalTitle}</title>
      {finalDesc && <meta name="description" content={finalDesc} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content={finalRobots} />

      <meta property="og:type" content={finalType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      {finalDesc && <meta property="og:description" content={finalDesc} />}
      <meta property="og:image" content={finalImage} />
      <meta property="og:locale" content={defaults.locale} />
      <meta property="og:site_name" content={defaults.siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      {finalDesc && <meta name="twitter:description" content={finalDesc} />}
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
}
