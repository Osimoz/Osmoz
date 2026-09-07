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

function seoBlock({ title, description, url, image, type = 'website', locale = 'fr_FR', extra = [] }) {
  const t = esc(title);
  const d = esc(description);
  const u = esc(url);
  const img = esc(image);
  const lines = [
    `<title>${t}</title>`,
    d && `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${u}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<meta property="og:type" content="${esc(type)}" />`,
    `<meta property="og:url" content="${u}" />`,
    `<meta property="og:title" content="${t}" />`,
    d && `<meta property="og:description" content="${d}" />`,
    img && `<meta property="og:image" content="${img}" />`,
    `<meta property="og:locale" content="${esc(locale)}" />`,
    `<meta property="og:site_name" content="OSMOZ" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    d && `<meta name="twitter:description" content="${d}" />`,
    img && `<meta name="twitter:image" content="${img}" />`,
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
  // "/" → dist/index.html ; "/x/y" → dist/x/y/index.html
  const rel = path === '/' ? '' : path.replace(/^\/+|\/+$/g, '');
  const dir = rel ? join(DIST, rel) : DIST;
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html);
  return rel ? `dist/${rel}/index.html` : 'dist/index.html';
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
    if (publishedAt) extra.push(`<meta property="article:published_time" content="${esc(publishedAt)}" />`);
    const ld = jsonLdText(a.jsonLd);
    const faq = jsonLdText(a.faqJsonLd);
    if (ld) extra.push(`<script type="application/ld+json">${ld}</script>`);
    if (faq) extra.push(`<script type="application/ld+json">${faq}</script>`);

    const block = seoBlock({
      title: a.title,
      description: a.meta_description || a.excerpt || '',
      url,
      image: a.hero_image_url || defaultImage,
      type: 'article',
      locale,
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
