export type SubscribeNewsletterResult = {
  alreadySubscribed: boolean;
};

export async function subscribeToNewsletter(email: string, source = 'unknown'): Promise<SubscribeNewsletterResult> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error('Adresse e-mail invalide.');
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
    throw new Error(payload?.error || 'Une erreur est survenue. Veuillez réessayer dans quelques instants.');
  }

  return {
    alreadySubscribed: Boolean(payload?.alreadySubscribed),
  };
}
