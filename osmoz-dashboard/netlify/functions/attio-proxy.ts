import type { Handler } from '@netlify/functions';

const ATTIO_BASE = 'https://api.attio.com';

/**
 * Extract the Attio API sub-path from a Netlify function invocation.
 *
 * event.path may be either:
 *   - "/.netlify/functions/attio-proxy/v2/objects/deals/records/query" (direct call)
 *   - "/api/attio/v2/objects/deals/records/query" (came via the rewrite in netlify.toml)
 *
 * Both must resolve to "/v2/objects/deals/records/query".
 */
function extractSubPath(rawPath: string): string {
  let sub = rawPath
    .replace(/^\/\.netlify\/functions\/attio-proxy/, '')
    .replace(/^\/api\/attio/, '');
  if (!sub.startsWith('/')) sub = '/' + sub;
  return sub;
}

export const handler: Handler = async (event) => {
  const apiKey = process.env.ATTIO_API_KEY || process.env.VITE_ATTIO_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing ATTIO_API_KEY env var on the Netlify site' }),
    };
  }

  const subPath = extractSubPath(event.path || '');
  if (!subPath.startsWith('/v2/')) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Invalid proxy path — expected /v2/...',
        received: event.path,
        resolved: subPath,
      }),
    };
  }

  const queryString = event.rawQuery
    ? `?${event.rawQuery}`
    : event.queryStringParameters
      ? `?${new URLSearchParams(event.queryStringParameters as Record<string, string>).toString()}`
      : '';
  const url = `${ATTIO_BASE}${subPath}${queryString}`;

  try {
    const res = await fetch(url, {
      method: event.httpMethod,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body:
        event.httpMethod === 'GET' || event.httpMethod === 'HEAD'
          ? undefined
          : event.body || undefined,
    });
    const text = await res.text();
    return {
      statusCode: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' },
      body: text,
    };
  } catch (err: any) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: `Proxy error: ${err?.message ?? String(err)}` }),
    };
  }
};
