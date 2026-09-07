// Loader Google Ads (AW-16815960638) déclenché APRÈS acceptation des cookies
// via CookieBanner. Les balises <script> ont été retirées du <head> de
// index.html pour rester RGPD-compliant : le tag Google Ads ne se charge jamais
// tant que l'utilisateur n'a pas accepté (il dépose des cookies _gcl_* et
// contacte Google → soumis à consentement, comme GTM et PostHog).
//
// La fonction est idempotente : appeler loadGoogleAds() plusieurs fois
// n'injecte qu'un seul script. Le dataLayer est partagé avec GTM.

const ADS_ID = 'AW-16815960638';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    __osmozAdsLoaded?: boolean;
  }
}

export function loadGoogleAds(): void {
  if (typeof window === 'undefined') return;
  if (window.__osmozAdsLoaded) return;
  window.__osmozAdsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  // Signature gtag() standard : on pousse les arguments tels quels dans dataLayer.
  function gtag(...args: unknown[]): void {
    window.dataLayer.push(args as unknown as Record<string, unknown>);
  }
  window.gtag = window.gtag ?? gtag;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', ADS_ID);
}
