// Pré-rendering SEO du <head>, au build (hook npm `postbuild`).
//
// Tourne APRÈS `vite build`. À partir du template dist/index.html, il écrit un
// dist/<route>/index.html par route AVEC son propre <head> (title, description,
// canonical, Open Graph, Twitter) figé dans le HTML servi. Les crawlers — y
// compris ceux qui n'exécutent pas le JS — voient donc des balises uniques par
// page, ce qui corrige les snippets SERP et le CTR.
//
// Le CORPS reste rendu par React côté client (inchangé) : on ne pré-rend que le
// <head>. La source de vérité des textes est src/lib/seo-config.json, partagée
// avec le composant src/components/SEO.tsx.
//
// Les pages articles (/articles/<slug>) sont générées depuis les JSON déjà
// synchronisés dans dist/data/ (title, description, hero, JSON-LD).

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const CONFIG_PATH = join(ROOT, 'src', 'lib', 'seo-config.json');

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Sérialise un JSON-LD (objet OU string déjà sérialisée) en neutralisant toute
// fermeture </script> qui casserait la page.
function jsonLdText(value) {
  if (!value) return null;
  const raw = typeof value === 'string' ? value : JSON.stringify(value);
  const trimmed = raw.trim();
  if (!trimmed) return null;
  return trimmed.replace(/<\/(script)/gi, '<\\/$1');
}

// Why `data-rh="true"` sur chaque balise : au runtime, react-helmet-async ne
// remplace que les balises qui portent cet attribut
// (`head.querySelectorAll('meta[data-rh]')`). Sans lui, les balises
// pré-rendues restent en place et Helmet AJOUTE les siennes par-dessus : la
// page finit avec deux <meta name="description"> et deux <link rel="canonical">
// dès que le JS s'exécute (ce que voient les crawlers qui rendent le JS).
// Avec l'attribut, Helmet reconnaît les balises identiques via isEqualNode()
// et les conserve telles quelles — une seule balise par type, sans flash.
// Les valeurs doivent donc rester identiques à celles de src/components/SEO.tsx
// (même source : src/lib/seo-config.json).
function seoBlock({ title, description, url, image, type = 'website', locale = 'fr_FR', robots = 'index, follow', publishedTime, extra = [] }) {
  const t = esc(title);
  const d = esc(description);
  const u = esc(url);
  const img = esc(image);
  const rh = 'data-rh="true"';
  const lines = [
    `<title ${rh}>${t}</title>`,
    d && `<meta ${rh} name="description" content="${d}" />`,
    `<link ${rh} rel="canonical" href="${u}" />`,
    `<meta ${rh} name="robots" content="${esc(robots)}" />`,
    `<meta ${rh} property="og:type" content="${esc(type)}" />`,
    `<meta ${rh} property="og:url" content="${u}" />`,
    `<meta ${rh} property="og:title" content="${t}" />`,
    d && `<meta ${rh} property="og:description" content="${d}" />`,
    img && `<meta ${rh} property="og:image" content="${img}" />`,
    `<meta ${rh} property="og:locale" content="${esc(locale)}" />`,
    `<meta ${rh} property="og:site_name" content="OSMOZ" />`,
    publishedTime && `<meta ${rh} property="article:published_time" content="${esc(publishedTime)}" />`,
    `<meta ${rh} name="twitter:card" content="summary_large_image" />`,
    `<meta ${rh} name="twitter:title" content="${t}" />`,
    d && `<meta ${rh} name="twitter:description" content="${d}" />`,
    img && `<meta ${rh} name="twitter:image" content="${img}" />`,
    // Le JSON-LD reste SANS data-rh : la page article le re-rend via son propre
    // <Helmet>, et le marquer ferait supprimer le bloc pré-rendu tant que
    // l'article n'est pas chargé (ou si le fetch échoue).
    ...extra,
  ].filter(Boolean);
  return lines.map((l) => `    ${l}`).join('\n');
}

// Remplace le bloc entre les marqueurs <!-- SEO:start --> … <!-- SEO:end -->.
const SEO_RE = /[ \t]*<!-- SEO:start[\s\S]*?<!-- SEO:end -->/;

function renderPage(template, block) {
  if (!SEO_RE.test(template)) {
    throw new Error('marqueurs <!-- SEO:start/end --> introuvables dans dist/index.html');
  }
  return template.replace(SEO_RE, block);
}

async function writeRoute(path, html) {
  // Fichiers PLATS pour éviter la redirection slash final de Netlify :
  //   "/"        → dist/index.html
  //   "/x/y"     → dist/x/y.html   (PAS dist/x/y/index.html → sinon 301 vers /x/y/)
  // Netlify sert alors /x/y en 200 direct, sans slash, sans redirection.
  if (path === '/') {
    await writeFile(join(DIST, 'index.html'), html);
    return 'dist/index.html';
  }
  const rel = path.replace(/^\/+|\/+$/g, '');
  const file = join(DIST, `${rel}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  return `dist/${rel}.html`;
}

async function main() {
  const template = await readFile(join(DIST, 'index.html'), 'utf8');
  const config = JSON.parse(await readFile(CONFIG_PATH, 'utf8'));
  const { baseUrl, image: defaultImage, locale } = config.defaults;

  const written = [];

  // 1) Routes marketing (seo-config.json)
  for (const [path, meta] of Object.entries(config.routes)) {
    const url = `${baseUrl}${path === '/' ? '/' : path}`;
    const block = seoBlock({
      title: meta.title,
      description: meta.description,
      url,
      image: meta.image ?? defaultImage,
      type: meta.type ?? 'website',
      locale,
      robots: meta.robots ?? 'index, follow',
    });
    written.push(await writeRoute(path, renderPage(template, block)));
  }

  // 2) Pages articles (/articles/<slug>) depuis dist/data/
  const articlesDir = join(DIST, 'data', 'articles');
  let articleFiles = [];
  try {
    articleFiles = (await readdir(articlesDir)).filter((f) => f.endsWith('.json'));
  } catch {
    console.warn('[prerender-seo] dist/data/articles absent — pages articles ignorées (build sans clé API ?).');
  }

  for (const file of articleFiles) {
    let a;
    try {
      a = JSON.parse(await readFile(join(articlesDir, file), 'utf8'));
    } catch {
      continue;
    }
    if (!a?.slug || !a?.title) continue;
    const url = `${baseUrl}/articles/${a.slug}`;
    const extra = [];
    const publishedAt = a.publishedAt ?? a.created_at;
    const ld = jsonLdText(a.jsonLd);
    const faq = jsonLdText(a.faqJsonLd);
    if (ld) extra.push(`<script type="application/ld+json">${ld}</script>`);
    if (faq) extra.push(`<script type="application/ld+json">${faq}</script>`);

    const block = seoBlock({
      title: `${a.title} | OSMOZ`,
      description: a.meta_description || a.excerpt || '',
      url,
      image: a.hero_image_url || defaultImage,
      type: 'article',
      locale,
      publishedTime: publishedAt,
      extra,
    });
    written.push(await writeRoute(`/articles/${a.slug}`, renderPage(template, block)));
  }

  console.log(`[prerender-seo] ${written.length} pages HTML générées (${articleFiles.length} articles).`);
}

main().catch((err) => {
  // Le pré-rendering est un bonus SEO : on ne casse pas le build s'il échoue,
  // le site reste servi (avec le <head> fallback de dist/index.html).
  console.warn(`[prerender-seo] non fatal : ${err?.message ?? err}`);
});
