// Loader Google Tag Manager (GTM-P9XGX8GH) déclenché APRÈS acceptation des
// cookies via CookieBanner. Le script <head> a été retiré de index.html pour
// rester RGPD-compliant : GTM ne se charge jamais tant que l'utilisateur n'a
// pas accepté.
//
// Why: GTM injecte ensuite ses propres tags (GA, Ads, etc.) qui posent des
// cookies non strictement nécessaires — donc soumis à consent.
//
// La fonction est idempotente : appeler loadGTM() plusieurs fois est sans
// effet (un seul script est injecté). Le dataLayer existe déjà (initialisé
// dans index.html), tout ce qui y a été poussé avant l'injection sera rejoué
// par GTM à son chargement.

const GTM_ID = 'GTM-P9XGX8GH';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    __osmozGtmLoaded?: boolean;
  }
}

export function loadGTM(): void {
  if (typeof window === 'undefined') return;
  if (window.__osmozGtmLoaded) return;
  window.__osmozGtmLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
}
