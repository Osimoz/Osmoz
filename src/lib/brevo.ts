const API_KEY = import.meta.env.VITE_BREVO_API_KEY as string;
const LIST_ID = Number(import.meta.env.VITE_BREVO_LIST_ID);

export async function subscribeToNewsletter(email: string): Promise<void> {
  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      email,
      listIds: [LIST_ID],
      updateEnabled: true, // si le contact existe déjà, on l'ajoute juste à la liste
    }),
  });

  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || 'Erreur lors de l\'inscription');
  }
}
