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

// Écoute les changements de route (react-router v6) et envoie une page vue à
// chaque navigation, PREMIER RENDU INCLUS.
//
// Les titres sont posés de façon asynchrone par react-helmet-async (via rAF),
// et l'effet de ce hook s'exécute avant celui du Helmet de la page. On diffère
// donc la lecture de document.title de deux requestAnimationFrame pour être sûr
// que le titre de la nouvelle route est déjà appliqué au moment du push.
export function usePageTracking(): void {
  const { pathname, search } = useLocation();

  useEffect(() => {
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        const path = window.location.pathname + window.location.search;
        trackPageView(path, document.title);
      });
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
    };
  }, [pathname, search]);
}
