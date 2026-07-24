import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieBanner from './components/CookieBanner';
import NewsletterPopup from './components/NewsletterPopup';

import HomeV2 from './pages/HomeV2';
import Spaces from './pages/Spaces';
import LoftOsmozV2 from './pages/LoftOsmozV2';
import DuplexOsmozV2 from './pages/DuplexOsmozV2';
import PenthouseOsmoz from './pages/PenthouseOsmoz';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import QuestionsFrequentes from './pages/Questions-Frequentes';
import MentionsLegales from './pages/MentionsLegales';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import RSE from './pages/RSE';
import Experience from './pages/Experience';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';

// Weglot fonctionne en mode sous-répertoire et préfixe l'URL avec /<langue>/.
// Si le premier segment du path matche une langue Weglot connue, on aligne
// le basename du router pour que les routes définies (/, /spaces, ...) matchent
// correctement sur /en/, /en/spaces, etc. Sinon basename = '/'.
const WEGLOT_LANGS = ['en'] as const;

function getRouterBasename(): string {
  if (typeof window === 'undefined') return '/';
  const first = window.location.pathname.split('/')[1];
  if (first && (WEGLOT_LANGS as readonly string[]).includes(first)) {
    return `/${first}`;
  }
  return '/';
}

// Why: le basename du router est calculé UNE FOIS au montage à partir de
// window.location.pathname. Si Weglot bascule la langue via pushState sans
// recharger la page, le basename reste figé sur l'ancienne valeur et plus
// aucune route ne matche (page blanche). On force un reload sur l'event
// Weglot pour que getRouterBasename() soit ré-évalué.
//
// Le snippet Weglot peut être injecté après le montage de l'app, on poll
// donc window.Weglot pendant 30s avant d'abandonner.
function useWeglotReloadOnLanguageChange(): void {
  useEffect(() => {
    type WeglotAPI = { on?: (event: string, cb: (...args: unknown[]) => void) => void };
    let bound = false;
    let interval: number | undefined;

    const tryBind = (): boolean => {
      const w = window as unknown as { Weglot?: WeglotAPI };
      if (w.Weglot && typeof w.Weglot.on === 'function') {
        w.Weglot.on('languageChanged', () => window.location.reload());
        bound = true;
        return true;
      }
      return false;
    };

    if (!tryBind()) {
      interval = window.setInterval(() => {
        if (tryBind() && interval !== undefined) {
          window.clearInterval(interval);
          interval = undefined;
        }
      }, 300);
      window.setTimeout(() => {
        if (interval !== undefined) {
          window.clearInterval(interval);
          interval = undefined;
        }
      }, 30_000);
    }

    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      void bound;
    };
  }, []);
}

export default function App() {
  useWeglotReloadOnLanguageChange();
  return (
    <BrowserRouter
      basename={getRouterBasename()}
      future={{ v7_relativeSplatPath: true }}
    >
      <ScrollToTop />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fbfbf3' }}>
        <Navigation />

        <NewsletterPopup />
        <CookieBanner />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomeV2 />} />
            <Route path="/spaces" element={<Spaces />} />
            <Route path="/spaces/loft-osmoz" element={<LoftOsmozV2 />} />
            <Route path="/spaces/duplex-osmoz" element={<DuplexOsmozV2 />} />
            <Route path="/spaces/penthouse-osmoz" element={<PenthouseOsmoz />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/questions-frequentes" element={<QuestionsFrequentes />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/rse" element={<RSE />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
