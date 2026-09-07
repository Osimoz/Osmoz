// Sync des articles BabyLoveGrowth → fichiers JSON statiques, au build.
//
// Tourne via le hook npm `prebuild`, donc `npm run build` (local ET Netlify)
// rafraîchit toujours les données AVANT que Vite ne copie public/ dans dist/.
//
// Why: l'API BabyLoveGrowth est rate-limitée. On la contacte UNE seule fois
// par build ici, on écrit le résultat dans public/data/, et le front lit ces
// fichiers statiques — jamais l'API — à chaque vue. Les nouveaux articles
// passent en ligne au prochain rebuild (planifié via GitHub Actions).
//
// Robustesse (leçon d'un build qui avait perdu tout le contenu) :
//   - Chaque requête réessaie avec backoff sur 429 / 5xx (respecte Retry-After).
//   - Garde-fou qualité : si trop peu d'articles obtiennent leur contenu, on
//     SORT EN ERREUR (exit 1) → le build Netlify échoue → le dernier déploiement
//     publié (avec contenu) reste en ligne, au lieu de publier un site vide.

import { mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const API_BASE = 'https://api.babylovegrowth.ai/api/integrations/v1/articles';
const PAGE_SIZE = 50; // max API = 500 ; 50 garde chaque requête légère.
const MAX_ARTICLES = 500; // garde-fou global
const DETAIL_DELAY_MS = 300; // throttle poli entre les fetch de contenu
const MAX_RETRIES = 5; // par requête, sur 429 / 5xx
const MIN_CONTENT_COVERAGE = 0.6; // en-dessous → build en échec (protège le live)

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'public', 'data');
const ARTICLES_DIR = join(DATA_DIR, 'articles');

// La clé reste serveur-side (variable Netlify BABYLOVE_API_KEY), jamais dans
// le bundle client.
const apiKey = process.env.BABYLOVE_API_KEY;

const headers = {
  'X-API-Key': apiKey ?? '',
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Français uniquement (le site est FR ; Weglot gère la traduction à la volée).
// Absence de languageCode = on garde (rétro-compat).
function isFrench(code) {
  return !code || /^fr/i.test(String(code));
}

// Fetch avec réessais sur 429 (rate limit) et 5xx. Respecte Retry-After.
async function fetchJson(url, label) {
  let lastErr;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const res = await fetch(url, { headers });
      if (res.status === 429 || res.status >= 500) {
        const retryAfter = Number(res.headers.get('retry-after'));
        const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : Math.min(30000, 1000 * 2 ** attempt); // backoff exponentiel, cap 30s
        console.warn(`[sync-articles] ${label} HTTP ${res.status} — retry ${attempt + 1}/${MAX_RETRIES} dans ${waitMs}ms`);
        await sleep(waitMs);
        continue;
      }
      if (!res.ok) throw new Error(`${label} HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastErr = err;
      // Erreur réseau : petit backoff puis on retente.
      await sleep(Math.min(30000, 1000 * 2 ** attempt));
    }
  }
  throw lastErr ?? new Error(`${label} : échec après ${MAX_RETRIES} tentatives`);
}

function extractArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === 'object') {
    for (const k of ['data', 'articles', 'results']) {
      if (Array.isArray(payload[k])) return payload[k];
    }
  }
  return [];
}

// L'API peut renvoyer l'article brut ou wrappé ({ data } / { article }).
function unwrap(payload) {
  if (
    payload &&
    typeof payload === 'object' &&
    !('content_html' in payload) &&
    !('title' in payload)
  ) {
    return payload.data ?? payload.article ?? payload;
  }
  return payload;
}

// Pagination limit/offset : on s'arrête dès qu'une page renvoie < PAGE_SIZE.
async function fetchList() {
  const all = [];
  let offset = 0;
  while (offset < MAX_ARTICLES) {
    const batch = extractArray(await fetchJson(`${API_BASE}?limit=${PAGE_SIZE}&offset=${offset}`, `liste@${offset}`));
    if (batch.length === 0) break;
    all.push(...batch);
    if (batch.length < PAGE_SIZE) break; // dernière page
    offset += PAGE_SIZE;
  }
  return all;
}

// Date de publication : publishedAt en priorité, sinon created_at.
function pubTime(a) {
  const raw = a?.publishedAt ?? a?.created_at;
  return raw ? Date.parse(raw) || 0 : 0;
}

async function main() {
  if (!apiKey) {
    console.warn('[sync-articles] BABYLOVE_API_KEY absent — sync ignoré (le front utilisera son fallback).');
    return; // build local sans clé : on n'échoue pas
  }

  const listRaw = await fetchList(); // throw → build échoue → dernier deploy conservé
  const list = listRaw.filter((a) => a?.slug && a?.title && isFrench(a.languageCode));
  const excluded = listRaw.length - list.length;

  // Newest first (par date de publication).
  list.sort((a, b) => pubTime(b) - pubTime(a));

  // (Re)construit proprement le dossier pour purger les articles supprimés.
  await rm(DATA_DIR, { recursive: true, force: true });
  await mkdir(ARTICLES_DIR, { recursive: true });

  const summaries = [];
  let detailOk = 0;

  for (const item of list) {
    let full = { ...item };
    if (item.id != null) {
      try {
        const detail = unwrap(await fetchJson(`${API_BASE}/${encodeURIComponent(item.id)}`, `détail ${item.slug}`));
        full = { ...item, ...detail };
        if (full.content_html) detailOk += 1;
      } catch (err) {
        console.warn(`[sync-articles] contenu manquant pour "${item.slug}" : ${err.message}`);
      }
      await sleep(DETAIL_DELAY_MS);
    }

    // Garde la séparation des langues jusqu'au bout (au cas où languageCode
    // n'apparaîtrait que dans le détail).
    if (!isFrench(full.languageCode)) continue;

    // Fichier détail = tout ce que renvoie l'API (content_html, content_markdown,
    // hero_image_url, jsonLd, faqJsonLd, languageCode, publishedAt, …).
    await writeFile(join(ARTICLES_DIR, `${item.slug}.json`), JSON.stringify(full));

    // Résumé (liste) = champs utiles aux cartes + tri.
    summaries.push({
      id: full.id,
      title: full.title,
      slug: full.slug,
      meta_description: full.meta_description ?? '',
      excerpt: full.excerpt ?? '',
      hero_image_url: full.hero_image_url ?? null,
      languageCode: full.languageCode ?? null,
      publishedAt: full.publishedAt ?? full.created_at ?? null,
    });
  }

  await writeFile(
    join(DATA_DIR, 'articles.json'),
    JSON.stringify({ syncedAt: new Date().toISOString(), articles: summaries })
  );

  const coverage = summaries.length ? detailOk / summaries.length : 0;
  console.log(
    `[sync-articles] ${summaries.length} articles FR (${excluded} exclus non-FR) — ` +
    `${detailOk} avec contenu (${Math.round(coverage * 100)}%).`
  );

  // Garde-fou : ne PAS publier un site quasi sans contenu. Échouer ici laisse
  // le dernier déploiement valide en ligne.
  if (summaries.length === 0 || coverage < MIN_CONTENT_COVERAGE) {
    console.error(`[sync-articles] couverture contenu ${Math.round(coverage * 100)}% < ${MIN_CONTENT_COVERAGE * 100}% — build stoppé pour préserver le live.`);
    process.exit(1);
  }
}

main().catch((err) => {
  // Erreur fatale (liste inaccessible, etc.) → on stoppe le build : le dernier
  // déploiement publié (avec contenu) reste en ligne.
  console.error(`[sync-articles] échec du sync : ${err?.message ?? err}`);
  process.exit(1);
});
