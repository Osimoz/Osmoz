import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { dictionaries } from '../locales';
import { useLocale } from '../i18n/context';
import { rememberLang } from '../i18n/langChoice';

/**
 * Bandeau « ce site existe aussi dans votre langue ». Il ne redirige jamais :
 * il propose la page équivalente et retient la réponse (voir langChoice.ts).
 *
 * Il est posé en haut de la page, dans le flux : il défile avec le contenu et
 * ne reste pas collé à l'écran. LangLayout ne le monte que dans le navigateur,
 * quand useLangSuggestion le demande, jamais dans le HTML servi.
 */
export function LangBanner() {
  const { lang, alt } = useLocale();
  // Le bandeau parle la langue qu'il propose : anglais sur les pages
  // françaises, français sur les pages anglaises.
  const s = dictionaries[alt.lang].lang;

  return (
    <div
      role="region"
      aria-label={s.label}
      lang={alt.lang}
      className="shrink-0 bg-[#fbfbf3] border-b border-[#862637] text-[#01142a]"
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
  );
}
