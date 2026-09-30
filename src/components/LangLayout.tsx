import { Outlet } from 'react-router-dom';
import { LocaleProvider } from '../i18n/LocaleProvider';
import type { Lang } from '../i18n/paths';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import NewsletterPopup from './NewsletterPopup';

// Un layout par langue : pose la langue courante pour tout l'arbre (nav,
// pages, footer). Le DOM produit est identique à l'ancien App.tsx.
export default function LangLayout({ lang }: { lang: Lang }) {
  return (
    <LocaleProvider lang={lang}>
      <Navigation />
      <NewsletterPopup />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
