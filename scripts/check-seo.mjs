// Vérification SEO du HTML généré (à lancer APRÈS `npm run build`) :
//   npm run check:seo
//
// 1. Pour chaque page pré-rendue : <html lang>, title, description (longueur),
//    canonical auto-référente, hreflang réciproques, robots.
// 2. Aucune URL du sitemap ne pointe vers une page noindex ; chaque URL du
//    sitemap correspond à un fichier pré-rendu ; aucune page /en ne
//    canonicalise vers la FR ; chaque hreflang pointe vers une page existante.
// 3. Tableau récapitulatif des pages clés + liste des URLs à soumettre.
//
// Sortie non nulle si une vérification échoue (utilisable en CI).

import { readFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const config = JSON.parse(await readFile(join(ROOT, 'src', 'lib', 'seo-config.json'), 'utf8'));
const BASE = config.defaults.baseUrl;

const exists = (p) => access(p).then(() => true, () => false);
const fileFor = (path) => join(DIST, path === '/' ? 'index.html' : `${path.replace(/^\/+/, '')}.html`);
const attr = (html, re) => (html.match(re) ?? [])[1] ?? '';
const all = (html, re) => [...html.matchAll(new RegExp(re.source, 'g'))].map((m) => m[1]);
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

function inspect(html) {
  return {
    lang: attr(html, /<html lang="([^"]*)">/),
    title: decode(attr(html, /<title[^>]*>([^<]*)<\/title>/)),
    description: decode(attr(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/)),
    canonical: attr(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/),
    robots: attr(html, /<meta[^>]*name="robots"[^>]*content="([^"]*)"/),
    hreflang: all(html, /<link[^>]*rel="alternate"[^>]*hreflang="([^"]*)"/),
    hreflangHrefs: all(html, /<link[^>]*rel="alternate"[^>]*href="([^"]*)"/),
    descriptions: (html.match(/<meta[^>]*name="description"/g) ?? []).length,
    canonicals: (html.match(/<link[^>]*rel="canonical"/g) ?? []).length,
  };
}

const failures = [];
const fail = (msg) => failures.push(msg);

// ── 1. Pages de la table de routes ────────────────────────────────────────
const pages = [];
for (const [key, route] of Object.entries(config.routes)) {
  for (const lang of ['fr', 'en']) {
    const path = route.path?.[lang];
    if (!path || !route[lang]) continue;
    const file = fileFor(path);
    if (!(await exists(file))) { fail(`${path}: fichier pré-rendu manquant (${file})`); continue; }
    const html = await readFile(file, 'utf8');
    const i = inspect(html);
    const noindex = /noindex/i.test(route.robots ?? '');
    pages.push({ key, lang, path, ...i, noindex });

    if (i.lang !== lang) fail(`${path}: <html lang> = "${i.lang}", attendu "${lang}"`);
    if (!i.title) fail(`${path}: title vide`);
    if (i.title.length > 60) fail(`${path}: title trop long (${i.title.length})`);
    if (!i.description) fail(`${path}: description vide`);
    if (i.description.length > 160) fail(`${path}: description trop longue (${i.description.length})`);
    if (i.descriptions !== 1) fail(`${path}: ${i.descriptions} meta description`);
    if (i.canonicals !== 1) fail(`${path}: ${i.canonicals} canonical`);
    if (i.canonical !== `${BASE}${path}`) fail(`${path}: canonical non auto-référente (${i.canonical})`);
    if (lang === 'en' && !i.canonical.startsWith(`${BASE}/en`)) fail(`${path}: page EN canonicalisant vers la FR (${i.canonical})`);
    if (/noindex/i.test(i.robots) !== noindex) fail(`${path}: robots "${i.robots}" incohérent avec la config`);
    const bilingual = Boolean(route.path.fr && route.path.en);
    if (bilingual) {
      const expected = ['fr', 'en', 'x-default'];
      if (JSON.stringify(i.hreflang) !== JSON.stringify(expected)) fail(`${path}: hreflang ${JSON.stringify(i.hreflang)}, attendu ${JSON.stringify(expected)}`);
      const xDefault = i.hreflangHrefs[i.hreflang.indexOf('x-default')];
      if (xDefault !== `${BASE}${route.path.fr}`) fail(`${path}: x-default → ${xDefault}, attendu la FR`);
      for (const href of i.hreflangHrefs) {
        if (!(await exists(fileFor(href.replace(BASE, '') || '/')))) fail(`${path}: hreflang vers une page inexistante (${href})`);
      }
    } else if (i.hreflang.length) fail(`${path}: hreflang inattendu sur une page FR seule`);
  }
}

// ── 2. Sitemap ────────────────────────────────────────────────────────────
const sitemapFile = join(DIST, 'sitemap.xml');
if (!(await exists(sitemapFile))) fail('dist/sitemap.xml manquant');
const sitemap = (await exists(sitemapFile)) ? await readFile(sitemapFile, 'utf8') : '';
const locs = all(sitemap, /<loc>([^<]*)<\/loc>/);
for (const loc of locs) {
  const path = loc.replace(BASE, '') || '/';
  const file = fileFor(path);
  if (!(await exists(file))) { fail(`sitemap: ${loc} sans fichier pré-rendu`); continue; }
  const i = inspect(await readFile(file, 'utf8'));
  if (/noindex/i.test(i.robots)) fail(`sitemap: ${loc} est en noindex`);
  if (i.canonical !== loc) fail(`sitemap: ${loc} a une canonical différente (${i.canonical})`);
}
for (const p of pages) {
  const inSitemap = locs.includes(`${BASE}${p.path}`);
  if (p.noindex && inSitemap) fail(`sitemap: page noindex présente (${p.path})`);
  if (!p.noindex && !inSitemap) fail(`sitemap: page indexable absente (${p.path})`);
}
const notFound = join(DIST, '404.html');
if (!(await exists(notFound))) fail('dist/404.html manquant');
else {
  const i = inspect(await readFile(notFound, 'utf8'));
  if (!/noindex/i.test(i.robots)) fail('404.html: pas de noindex');
  if (i.canonicals) fail('404.html: ne doit pas avoir de canonical');
}

// ── 3. Récapitulatif ──────────────────────────────────────────────────────
const KEY_PAGES = ['home', 'loft', 'faq'];
console.log('\n=== Pages clés (FR / EN) ===');
console.log('page          lang  title(len)  desc(len)  canonical=self  hreflang        robots');
for (const p of pages.filter((p) => KEY_PAGES.includes(p.key))) {
  console.log(
    `${p.key.padEnd(13)} ${p.lang}    ${String(p.title.length).padStart(3)}         ${String(p.description.length).padStart(3)}        ${p.canonical === `${BASE}${p.path}` ? 'yes' : 'NO '}             ${p.hreflang.join(',').padEnd(15)} ${p.robots}`,
  );
}
console.log(`\n=== Sitemap : ${locs.length} URLs (${locs.filter((l) => l.startsWith(`${BASE}/en`)).length} EN, ${locs.filter((l) => l.includes('/articles/')).length} articles) ===`);
console.log('\n=== URLs à soumettre dans Search Console (nouvelles pages EN) ===');
for (const p of pages.filter((p) => p.lang === 'en' && !p.noindex)) console.log(`${BASE}${p.path}`);

if (failures.length) {
  console.error(`\n✖ ${failures.length} problème(s) :`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`\n✓ ${pages.length} pages vérifiées, sitemap cohérent, 404.html en noindex.`);
