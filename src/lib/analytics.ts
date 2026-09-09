import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Page vue GA4 fiable dans une SPA. On pousse un événement personnalisé
// `page_view` dans le dataLayer ; c'est GTM (GTM-MBSKF297) qui relaie vers GA4
// (G-3MHEPT5EES) via une balise « Événement GA4 » déclenchée sur cet événement.
// La config GA4 a send_page_view = false → aucune page vue automatique, donc
// pas de doublon (on n'appelle jamais gtag directement ni config('page_path')).

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackPageView(path: string, title: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

// Dernier pathname RÉELLEMENT envoyé. Volontairement au niveau module (et non un
// useRef) : un useRef est réinitialisé au remontage du composant (double montage
// de React.StrictMode en dev, ou tout remount), ce qui laisserait passer un 2e
// push. Le module persiste tant que la page n'est pas rechargée → dédup fiable.
let lastTrackedPath: string | null = null;

// Écoute les changements de route (react-router v6) et envoie une page vue à
// chaque navigation, PREMIER RENDU INCLUS, et UNE SEULE FOIS par pathname.
//
// - page_path = location.pathname uniquement (sans query string ni hash).
// - On diffère la lecture de document.title de deux requestAnimationFrame : les
//   titres sont posés de façon asynchrone par react-helmet-async, et l'effet de
//   ce hook s'exécute avant celui du Helmet de la page.
// - Dédup : on ne pousse que si le pathname a changé par rapport au dernier
//   envoyé (revérifié dans le rAF pour couvrir les doubles effets StrictMode).
export function usePageTracking(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lastTrackedPath === pathname) return;

    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        if (lastTrackedPath === pathname) return;
        lastTrackedPath = pathname;
        trackPageView(pathname, document.title);
      });
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
    };
  }, [pathname]);
}
