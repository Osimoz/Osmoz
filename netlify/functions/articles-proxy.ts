// Proxy BabyLoveGrowth → expose deux modes :
//   GET /.netlify/functions/articles-proxy
//     → liste paginée (limit=50, offset auto jusqu'à épuisement)
//   GET /.netlify/functions/articles-proxy?id=XXXX
//     → article unique avec content_html
//
// La clé API reste serveur-side (BABYLOVE_API_KEY, sans préfixe VITE).

const BABYLOVE_BASE = 'https://api.babylovegrowth.ai/api/integrations/v1/articles';
const PAGE_SIZE = 50;
const MAX_OFFSET = 1000; // garde-fou

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

type Event = {
  httpMethod: string;
  queryStringParameters?: Record<string, string | undefined> | null;
};

export const handler = async (event: Event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Méthode non autorisée — GET uniquement' }),
    };
  }

  const apiKey = process.env.BABYLOVE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'BABYLOVE_API_KEY non configuré côté serveur' }),
    };
  }

  const headers = {
    'X-API-Key': apiKey,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const id = event.queryStringParameters?.id;

  // Mode "un seul article par id" : on relaie tel quel.
  if (id) {
    try {
      const res = await fetch(`${BABYLOVE_BASE}/${encodeURIComponent(id)}`, { headers });
      const text = await res.text();
      return {
        statusCode: res.status,
        headers: {
          ...CORS,
          'Content-Type': res.headers.get('content-type') ?? 'application/json',
        },
        body: text,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        statusCode: 502,
        headers: { ...CORS, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: `Erreur proxy : ${message}` }),
      };
    }
  }

  // Mode liste : on paginate jusqu'à épuisement et on agrège.
  try {
    const aggregated: unknown[] = [];
    let offset = 0;
    while (offset <= MAX_OFFSET) {
      const url = `${BABYLOVE_BASE}?limit=${PAGE_SIZE}&offset=${offset}`;
      const res = await fetch(url, { headers });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        return {
          statusCode: res.status,
          headers: { ...CORS, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: `Upstream ${res.status}: ${text || res.statusText}` }),
        };
      }
      const payload = await res.json();
      // L'API peut renvoyer soit un tableau direct, soit { data: [...] }, soit { articles: [...] }.
      const batch = extractArray(payload);
      if (batch.length === 0) break;
      aggregated.push(...batch);
      if (batch.length < PAGE_SIZE) break;
      offset += PAGE_SIZE;
    }
    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ articles: aggregated }),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      statusCode: 502,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: `Erreur proxy : ${message}` }),
    };
  }
};

function extractArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === 'object') {
    const p = payload as Record<string, unknown>;
    if (Array.isArray(p.data)) return p.data;
    if (Array.isArray(p.articles)) return p.articles;
    if (Array.isArray(p.results)) return p.results;
  }
  return [];
}
