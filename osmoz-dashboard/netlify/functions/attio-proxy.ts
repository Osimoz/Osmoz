import type { Handler } from '@netlify/functions';

const ATTIO_BASE = 'https://api.attio.com';

export const handler: Handler = async (event) => {
  const apiKey = process.env.ATTIO_API_KEY || process.env.VITE_ATTIO_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: 'Missing ATTIO_API_KEY env var' };
  }

  const subPath = event.path.replace(/^\/\.netlify\/functions\/attio-proxy/, '');
  const url = `${ATTIO_BASE}${subPath}`;

  try {
    const res = await fetch(url, {
      method: event.httpMethod,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: event.httpMethod === 'GET' || event.httpMethod === 'HEAD' ? undefined : event.body || undefined,
    });
    const text = await res.text();
    return {
      statusCode: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' },
      body: text,
    };
  } catch (err: any) {
    return { statusCode: 502, body: `Proxy error: ${err?.message ?? String(err)}` };
  }
};
