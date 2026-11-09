import { Outlet, useLocation } from 'react-router-dom';
import { LocaleProvider } from '../i18n/LocaleProvider';
import { useLangSuggestion } from '../i18n/useLangSuggestion';
import { isPresentationPath, type Lang } from '../i18n/paths';
import { LangBanner } from './LangBanner';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import NewsletterPopup from './NewsletterPopup';

// Un layout par langue : pose la langue courante pour tout l'arbre (nav,
// pages, footer). Le bandeau de suggestion de langue n'existe que dans le
// navigateur : il n'est jamais dans le HTML servi.
export default function LangLayout({ lang }: { lang: Lang }) {
  const suggestLang = useLangSuggestion(lang);
  // Une présentation envoyée à un prospect doit se lire comme un document à
  // part : header et footer réduits (aucun lien vers le reste du site), pas de
  // popup newsletter.
  const presentation = isPresentationPath(useLocation().pathname);
  return (
    <LocaleProvider lang={lang}>
      {suggestLang && <LangBanner />}
      <Navigation belowBanner={suggestLang} minimal={presentation} />
      {!presentation && <NewsletterPopup />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer minimal={presentation} />
    </LocaleProvider>
  );
}
