import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { dictionaries } from '../locales';
import { useLocale } from '../i18n/context';
import { rememberLang } from '../i18n/langChoice';
import { LANGS, type Lang } from '../i18n/paths';

// Adresse de la page courante dans chaque langue : la page elle-même pour la
// langue active, son équivalent pour l'autre. Sans équivalent (articles,
// 404), l'autre langue mène à sa page d'accueil.
function useLangLinks(): Record<Lang, string> {
  const { lang, alt } = useLocale();
  const { pathname, search } = useLocation();
  return { [lang]: pathname + search, [alt.lang]: alt.to } as Record<Lang, string>;
}

/**
 * Pilule « FR | EN » du header. Deux vrais liens <a href> (explorables), un
 * par langue ; cliquer mémorise le choix, sans jamais rediriger ailleurs.
 */
export function LangPill({ className = '', onNavigate }: { className?: string; onNavigate?: () => void }) {
  const { lang, t } = useLocale();
  const links = useLangLinks();
  return (
    <div
      role="group"
      aria-label={t.lang.label}
      className={`inline-flex shrink-0 items-stretch overflow-hidden rounded-full border border-[#862637] ${className}`}
    >
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <Link
            key={code}
            to={links[code]}
            hrefLang={code}
            lang={code}
            aria-label={dictionaries[code].lang.name}
            aria-current={active ? 'true' : undefined}
            onClick={() => {
              rememberLang(code);
              onNavigate?.();
            }}
            className={`btn-label inline-flex h-8 items-center px-3 text-[11px] uppercase transition-colors duration-200 ${
              active ? 'bg-[#862637] text-[#fee1d4]' : 'text-[#01142a] hover:text-[#862637]'
            }`}
          >
            {t.lang[code]}
          </Link>
        );
      })}
    </div>
  );
}

/** Les deux mêmes liens, en toutes lettres, pour le pied de page. */
export function LangTextLinks() {
  const { lang, t } = useLocale();
  const links = useLangLinks();
  return (
    <span role="group" aria-label={t.lang.label} className="flex items-center gap-2 text-sm font-normal">
      {LANGS.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && <span aria-hidden="true" className="text-gray-300">/</span>}
          <Link
            to={links[code]}
            hrefLang={code}
            lang={code}
            aria-current={code === lang ? 'true' : undefined}
            onClick={() => rememberLang(code)}
            className={`transition-colors ${code === lang ? 'text-[#01142a]' : 'text-gray-400 hover:text-[#01142a]'}`}
          >
            {dictionaries[code].lang.name}
          </Link>
        </Fragment>
      ))}
    </span>
  );
}
