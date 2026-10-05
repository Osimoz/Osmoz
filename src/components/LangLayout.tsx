import { Outlet } from 'react-router-dom';
import { LocaleProvider } from '../i18n/LocaleProvider';
import type { Lang } from '../i18n/paths';
import { LangBanner } from './LangBanner';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import NewsletterPopup from './NewsletterPopup';

// Un layout par langue : pose la langue courante pour tout l'arbre (nav,
// pages, footer). Le bandeau de suggestion de langue n'existe que dans le
// navigateur : il n'est jamais dans le HTML servi.
export default function LangLayout({ lang }: { lang: Lang }) {
  return (
    <LocaleProvider lang={lang}>
      <LangBanner />
      <Navigation />
      <NewsletterPopup />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
