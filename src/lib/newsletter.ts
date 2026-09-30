export type SubscribeNewsletterResult = {
  alreadySubscribed: boolean;
};

// Codes d'erreur (jamais de texte) : c'est le formulaire qui affiche le
// message dans la langue courante. `serverMessage` conserve un éventuel
// message renvoyé par la fonction Netlify, à des fins de diagnostic.
export type NewsletterErrorCode = 'invalid_email' | 'request_failed';

export class NewsletterError extends Error {
  constructor(public readonly code: NewsletterErrorCode, public readonly serverMessage?: string) {
    super(code);
    this.name = 'NewsletterError';
  }
}

export async function subscribeToNewsletter(email: string, source = 'unknown'): Promise<SubscribeNewsletterResult> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new NewsletterError('invalid_email');
  }

  const response = await fetch('/.netlify/functions/subscribe-newsletter', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: normalizedEmail,
      source,
      pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new NewsletterError('request_failed', typeof payload?.error === 'string' ? payload.error : undefined);
  }

  return {
    alreadySubscribed: Boolean(payload?.alreadySubscribed),
  };
}
