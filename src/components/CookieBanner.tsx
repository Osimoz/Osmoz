import { useState, useEffect } from 'react';
import posthog from 'posthog-js';
import { ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'osmoz-cookie-consent';

function initPostHog(): void {
  posthog.init('phc_5Ji4D4oRaqsu6fJijIcdmvwPyZLxRaYua4MUqqZ0FOc', {
    api_host: 'https://eu.i.posthog.com',
    capture_pageview: true,
  });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (consent === 'accepted') {
      initPostHog();
      return;
    }
    if (consent === 'refused') return;

    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = (): void => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    initPostHog();
    setVisible(false);
  };

  const handleRefuse = (): void => {
    localStorage.setItem(STORAGE_KEY, 'refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      aria-live="polite"
      className="fixed bottom-6 left-6 z-50 max-w-sm w-full bg-[#fbfbf3] border border-[#e5e5e5] rounded-2xl shadow-lg p-6 animate-cookie-banner"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-4 w-4 text-[#862637]" />
        <span className="text-xs uppercase tracking-[0.2em] text-[#862637] font-normal">
          Cookies & confidentialité
        </span>
      </div>

      {/* Body */}
      <p className="text-sm font-normal text-[#01142a] mb-1">
        Nous utilisons des cookies
      </p>
      <p className="text-xs font-light text-gray-400 leading-relaxed mb-5">
        Pour analyser les visites et améliorer votre expérience. Aucune donnée
        personnelle n'est vendue ou partagée.
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAccept}
          aria-label="Accepter les cookies"
          className="bg-[#862637] text-[#fee1d4] text-xs tracking-[0.15em] uppercase font-normal px-5 py-2.5 rounded-lg hover:bg-[#01142a] transition-all duration-200 flex-1"
        >
          Accepter
        </button>
        <button
          onClick={handleRefuse}
          aria-label="Refuser les cookies"
          className="bg-transparent text-[#01142a]/50 text-xs tracking-[0.15em] uppercase font-normal px-5 py-2.5 rounded-lg border border-[#e5e5e5] hover:border-[#01142a]/30 hover:text-[#01142a] transition-all duration-200 flex-1"
        >
          Refuser
        </button>
      </div>

      {/* Link */}
      <a
        href="/mentions-legales"
        className="block text-xs text-gray-300 hover:text-gray-400 text-center mt-2 underline underline-offset-2"
      >
        En savoir plus
      </a>
    </div>
  );
}
