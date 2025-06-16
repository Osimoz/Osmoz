import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Spaces from './pages/Spaces';
import LoftOsmoz from './pages/LoftOsmoz';
import PatioOsmoz from './pages/PatioOsmoz';
import Contact from './pages/Contact';
import QuestionsFrequentes from './pages/Questions-Frequentes';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fbfbf3' }}>
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spaces" element={<Spaces />} />
            <Route path="/spaces/loft-osmoz" element={<LoftOsmoz />} />
            <Route path="/spaces/patio-osmoz" element={<PatioOsmoz />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/questions-frequentes" element={<QuestionsFrequentes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
