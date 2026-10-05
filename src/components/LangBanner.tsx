import { useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { dictionaries } from '../locales';
import { useLocale } from '../i18n/context';
import {
  browserLanguage,
  readLangChoice,
  rememberLang,
  shouldSuggestLang,
  subscribeLangChoice,
} from '../i18n/langChoice';

// Hauteur du bandeau, publiée sur <html> : le header fixe (Navigation) et les
// éléments collants s'en servent pour se décaler d'autant.
const HEIGHT_VAR = '--lang-banner-h';

// Rendu serveur / pré-rendu : jamais de bandeau dans le HTML servi. Il
// n'existe que dans le navigateur, une fois l'application montée.
const neverOnServer = () => false;

/**
 * Bandeau « ce site existe aussi dans votre langue ». Il ne redirige jamais :
 * il propose la page équivalente et retient la réponse (voir langChoice.ts).
 */
export function LangBanner() {
  const { lang } = useLocale();
  const visible = useSyncExternalStore(
    subscribeLangChoice,
    () => shouldSuggestLang(lang, readLangChoice(), browserLanguage(), navigator.userAgent),
    neverOnServer,
  );
  return visible ? <LangBannerBar /> : null;
}

function LangBannerBar() {
  const { lang, alt } = useLocale();
  // Le bandeau parle la langue qu'il propose : anglais sur les pages
  // françaises, français sur les pages anglaises.
  const s = dictionaries[alt.lang].lang;
  const bar = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = bar.current;
    if (!el) return;
    const root = document.documentElement;
    const publish = () => root.style.setProperty(HEIGHT_VAR, `${el.offsetHeight}px`);
    publish();
    // Le texte passe sur deux lignes en mobile : la hauteur suit.
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(publish);
    observer?.observe(el);
    window.addEventListener('resize', publish);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', publish);
      root.style.removeProperty(HEIGHT_VAR);
    };
  }, []);

  return (
    <>
      <div
        ref={bar}
        role="region"
        aria-label={s.label}
        lang={alt.lang}
        className="fixed top-0 inset-x-0 z-50 bg-[#fee1d4] text-[#01142a]"
      >
        <div className="relative max-w-7xl mx-auto pl-4 pr-2 sm:px-14 lg:px-16 py-2 flex items-center sm:justify-center gap-3 sm:gap-4">
          <p className="flex-1 sm:flex-none min-w-0 text-[13px] leading-snug">{s.banner.text}</p>
          <Link
            to={alt.to}
            hrefLang={alt.lang}
            onClick={() => rememberLang(alt.lang)}
            className="btn-label shrink-0 bg-[#862637] text-[#fee1d4] px-3.5 py-1.5 text-[11px] uppercase rounded-lg hover:bg-[#01142a] hover:text-white transition-colors duration-300"
          >
            {s.banner.cta}
          </Link>
          <button
            type="button"
            onClick={() => rememberLang(lang)}
            aria-label={s.banner.close}
            className="shrink-0 p-2 sm:absolute sm:right-4 lg:right-6 sm:top-1/2 sm:-translate-y-1/2 text-[#01142a]/70 hover:text-[#862637] transition-colors duration-200"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      {/* Réserve la place du bandeau dans le flux : le contenu descend d'autant. */}
      <div aria-hidden="true" className="shrink-0" style={{ height: `var(${HEIGHT_VAR}, 0px)` }} />
    </>
  );
}
