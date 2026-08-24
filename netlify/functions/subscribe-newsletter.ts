type RequestBody = {
  email?: string;
  source?: string;
  pageUrl?: string;
};

type BrevoErrorResponse = {
  code?: number;
  message?: string;
};

export const handler = async (event: { httpMethod: string; body: string | null }) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Méthode non autorisée' }),
    };
  }

  // Parse request body
  let body: RequestBody = {};
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Requête invalide' }),
    };
  }

  const { email, source, pageUrl } = body;

  // Validate email
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return {
      statusCode: 400,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Adresse e-mail invalide' }),
    };
  }

  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();

  // Check environment variables
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);

  if (!apiKey || !listId || isNaN(listId)) {
    console.error('[Newsletter] Configuration Brevo manquante');
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Erreur de configuration serveur' }),
    };
  }

  try {
    // Prepare contact attributes
    const attributes: Record<string, unknown> = {};
    if (source) {
      attributes.SIGNUP_SOURCE = source;
    }
    if (pageUrl) {
      attributes.SIGNUP_URL = pageUrl;
    }
    attributes.SIGNUP_DATE = new Date().toISOString();

    // Call Brevo API
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: normalizedEmail,
        listIds: [listId],
        attributes: Object.keys(attributes).length ? attributes : undefined,
        updateEnabled: true,
      }),
    });

    const brevoBody = await brevoRes.json().catch(() => ({})) as BrevoErrorResponse;
    const brevoMessage = brevoBody?.message || 'Erreur Brevo';

    // Handle successful responses
    if (brevoRes.ok || brevoRes.status === 204) {
      return {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          success: true,
          alreadySubscribed: false,
          message: 'Inscription réussie',
        }),
      };
    }

    // Duplicate or invalid contact payloads from Brevo are treated as already subscribed.
    if (brevoRes.status === 400 || brevoRes.status === 422) {
      const duplicate = /already|exist|duplicate|in list|list/i.test(String(brevoMessage));
      console.log(`[Newsletter] Brevo status ${brevoRes.status}: ${brevoMessage}`);

      if (duplicate) {
        return {
          statusCode: 200,
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            success: true,
            alreadySubscribed: true,
            message: 'Adresse déjà inscrite',
          }),
        };
      }

      return {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          error: `Inscription impossible : ${brevoMessage}`,
        }),
      };
    }

    if (brevoRes.status === 401 || brevoRes.status === 403) {
      console.error('[Newsletter] Brevo auth error:', brevoRes.status, brevoBody);
      return {
        statusCode: 500,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          error: 'La clé Brevo est invalide ou absente. Vérifiez BREVO_API_KEY dans Netlify.',
        }),
      };
    }

    if (brevoRes.status === 429) {
      console.error('[Newsletter] Brevo rate limit:', brevoRes.status, brevoBody);
      return {
        statusCode: 429,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          error: 'Trop de tentatives. Merci de réessayer dans quelques instants.',
        }),
      };
    }

    console.error('[Newsletter] Erreur Brevo:', brevoRes.status, brevoBody);
    return {
      statusCode: 502,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        error: `Service temporairement indisponible (${brevoMessage})`,
      }),
    };
  } catch (err) {
    console.error('[Newsletter] Exception:', err instanceof Error ? err.message : err);
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Erreur interne du serveur' }),
    };
  }
};
