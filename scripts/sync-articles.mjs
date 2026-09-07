// Sync des articles BabyLoveGrowth → fichiers JSON statiques, au build.
//
// Tourne via le hook npm `prebuild`, donc `npm run build` (local ET Netlify)
// rafraîchit toujours les données AVANT que Vite ne copie public/ dans dist/.
//
// Why: l'API BabyLoveGrowth est rate-limitée. On la contacte UNE seule fois
// par build ici, on écrit le résultat dans public/data/, et le front lit ces
// fichiers statiques — jamais l'API — à chaque vue. Les nouveaux articles
// passent en ligne au prochain rebuild (planifié quotidiennement via
// .github/workflows/sync-articles.yml).
//
// Résilience: toute erreur est NON fatale (warn + exit 0) pour qu'une API
// lente/down ne casse jamais un déploiement ; le front garde son fallback.

import { mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const API_BASE = 'https://api.babylovegrowth.ai/api/integrations/v1/articles';
const PAGE_SIZE = 50; // max API = 500 ; 50 garde chaque requête légère.
const MAX_ARTICLES = 500; // garde-fou global
const DETAIL_DELAY_MS = 200; // throttle poli entre les fetch de contenu

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
    const res = await fetch(`${API_BASE}?limit=${PAGE_SIZE}&offset=${offset}`, { headers });
    if (!res.ok) throw new Error(`liste HTTP ${res.status} @offset=${offset}`);
    const batch = extractArray(await res.json());
    if (batch.length === 0) break;
    all.push(...batch);
    if (batch.length < PAGE_SIZE) break; // dernière page
    offset += PAGE_SIZE;
  }
  return all;
}

async function fetchDetail(id) {
  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, { headers });
  if (!res.ok) throw new Error(`détail HTTP ${res.status} id=${id}`);
  return unwrap(await res.json());
}

async function main() {
  if (!apiKey) {
    console.warn('[sync-articles] BABYLOVE_API_KEY absent — sync ignoré (le front utilisera son fallback).');
    return;
  }

  let list;
  try {
    list = await fetchList();
  } catch (err) {
    // On ne touche PAS aux données existantes en cas d'échec de la liste.
    console.warn(`[sync-articles] échec de la liste — données existantes conservées : ${err.message}`);
    return;
  }

  // Newest first (l'API le garantit déjà ; on trie défensivement par date).
  list.sort((a, b) => {
    const ta = a?.created_at ? Date.parse(a.created_at) : 0;
    const tb = b?.created_at ? Date.parse(b.created_at) : 0;
    return tb - ta;
  });

  // (Re)construit proprement le dossier de données pour purger les articles
  // supprimés côté API.
  await rm(DATA_DIR, { recursive: true, force: true });
  await mkdir(ARTICLES_DIR, { recursive: true });

  const summaries = [];
  let detailOk = 0;

  for (const item of list) {
    if (!item?.slug || !item?.title) continue;

    const summary = {
      id: item.id,
      title: item.title,
      slug: item.slug,
      meta_description: item.meta_description ?? '',
      excerpt: item.excerpt ?? '',
      created_at: item.created_at ?? null,
    };
    summaries.push(summary);

    // On écrit toujours un fichier par slug (résumé + contenu si dispo), pour
    // qu'aucune page article ne renvoie un 404 même si le détail échoue.
    let full = { ...summary };
    if (item.id != null) {
      try {
        full = { ...summary, ...(await fetchDetail(item.id)) };
        detailOk += 1;
      } catch (err) {
        console.warn(`[sync-articles] contenu manquant pour "${item.slug}" : ${err.message}`);
      }
      await sleep(DETAIL_DELAY_MS);
    }
    await writeFile(join(ARTICLES_DIR, `${item.slug}.json`), JSON.stringify(full));
  }

  await writeFile(
    join(DATA_DIR, 'articles.json'),
    JSON.stringify({ syncedAt: new Date().toISOString(), articles: summaries })
  );

  console.log(`[sync-articles] ${summaries.length} articles synchronisés (${detailOk} avec contenu).`);
}

main().catch((err) => {
  // Filet ultime : ne JAMAIS casser le build à cause du sync.
  console.warn(`[sync-articles] erreur non fatale : ${err?.message ?? err}`);
});
