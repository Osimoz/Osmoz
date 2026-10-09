const WEBHOOK_URL = import.meta.env.VITE_MAKE_BOOKING_WEBHOOK_URL as string | undefined;

export type BookingWebhookPayload = {
  source: 'site_reservation';
  submitted_at: string;
  lang: string;
  page_url: string;
  first_name: string; last_name: string; email: string; phone: string; company: string;
  space_id: string; space_label: string;
  date: string;
  time_slot_id: string; time_slot_label: string; time_slot_hours: string;
  guests: string;
  services: string[];
  comments: string;
  newsletter_opt_in: boolean;
};

/** Fire-and-forget : ne lève jamais, ne bloque jamais l'UI. Ignoré si l'URL n'est pas définie. */
export function sendBookingWebhook(payload: BookingWebhookPayload): void {
  if (!WEBHOOK_URL) return;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      keepalive: true,
    })
      .catch(err => console.warn('[bookingWebhook] échec', err))
      .finally(() => clearTimeout(timer));
  } catch (err) {
    console.warn('[bookingWebhook] échec', err);
  }
}
