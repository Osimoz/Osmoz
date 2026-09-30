import type { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LangLayout from './components/LangLayout';
import { usePageTracking } from './lib/analytics';
import { LANGS, ROUTE_KEYS, pathFor, type RouteKey } from './i18n/paths';

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
import NotFound from './pages/NotFound';

// Une page par clé de route de src/lib/seo-config.json. Une clé sans page (ou
// l'inverse) est une erreur de compilation.
const PAGES: Record<RouteKey, ReactElement> = {
  home: <HomeV2 />,
  spaces: <Spaces />,
  loft: <LoftOsmozV2 />,
  duplex: <DuplexOsmozV2 />,
  penthouse: <PenthouseOsmoz />,
  contact: <Contact />,
  reservation: <Reservation />,
  faq: <QuestionsFrequentes />,
  experience: <Experience />,
  articles: <Articles />,
  rse: <RSE />,
  legal: <MentionsLegales />,
  privacy: <PolitiqueConfidentialite />,
};

// Envoie une page vue GA4 à chaque changement de route. Doit être DANS le
// Router (utilise useLocation).
function RouteAnalytics() {
  usePageTracking();
  return null;
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <RouteAnalytics />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fbfbf3' }}>
        <Routes>
          {/* Un arbre de routes par langue, monté sur les chemins de la table. */}
          {LANGS.map((lang) => (
            <Route key={lang} element={<LangLayout lang={lang} />}>
              {ROUTE_KEYS.map((key) => {
                const path = pathFor(key, lang);
                return path ? <Route key={key} path={path} element={PAGES[key]} /> : null;
              })}
              {/* Les articles n'existent qu'en français (/en/articles/* → 301, netlify.toml). */}
              {lang === 'fr' && <Route path="/articles/:slug" element={<ArticleDetail />} />}
              <Route path={lang === 'fr' ? '*' : '/en/*'} element={<NotFound />} />
            </Route>
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
