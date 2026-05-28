// Proxy d'audit Attio — accès direct par script externe, protégé par token.
//
// Usage :
//   curl -H "X-Audit-Token: $AUDIT_TOKEN" \
//        "https://<site>/.netlify/functions/attio-audit?path=/objects/deals/records/query"
//   ou en query string (moins sûr, mais pratique pour les URLs partageables) :
//        "https://<site>/.netlify/functions/attio-audit?path=/objects/...&audit_token=..."
//
// Différent du proxy du dashboard (attio-proxy.ts) :
//   - GET only (query-string), pas de POST anonyme depuis le browser
//   - Authentification obligatoire via header X-Audit-Token OU query param audit_token
//   - Forward vers https://api.attio.com/v2{path}

export default async (request) => {
  if (request.method !== 'GET') {
    return json({ error: 'Méthode non autorisée — GET uniquement' }, 405);
  }

  const expected = process.env.AUDIT_TOKEN;
  if (!expected) {
    return json({ error: 'AUDIT_TOKEN non configuré côté serveur' }, 500);
  }

  const url = new URL(request.url);
  const headerToken = request.headers.get('x-audit-token');
  const queryToken = url.searchParams.get('audit_token');
  const provided = headerToken || queryToken;
  if (!provided || provided !== expected) {
    return json({ error: "Token d'audit invalide ou manquant" }, 401);
  }

  const path = url.searchParams.get('path');
  if (!path || !path.startsWith('/')) {
    return json(
      { error: 'Query param "path" manquant ou invalide — doit commencer par /' },
      400
    );
  }

  // Réutilise la même clé Attio que le proxy du dashboard (ATTIO_API_KEY déjà
  // configurée dans Netlify). ATTIO_TOKEN reste accepté comme alias.
  const attioToken = process.env.ATTIO_API_KEY || process.env.ATTIO_TOKEN;
  if (!attioToken) {
    return json({ error: 'ATTIO_API_KEY/ATTIO_TOKEN non configuré côté serveur' }, 500);
  }

  // Conserve les autres query params éventuels (ex: ?path=/...&limit=10),
  // en strippant nos propres params (path, audit_token).
  const passthrough = new URLSearchParams(url.searchParams);
  passthrough.delete('path');
  passthrough.delete('audit_token');
  const qs = passthrough.toString();
  const target = `https://api.attio.com/v2${path}${qs ? `?${qs}` : ''}`;

  try {
    const res = await fetch(target, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${attioToken}`,
        Accept: 'application/json',
      },
    });
    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' },
    });
  } catch (err) {
    return json({ error: `Erreur proxy : ${err?.message ?? String(err)}` }, 502);
  }
};

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
