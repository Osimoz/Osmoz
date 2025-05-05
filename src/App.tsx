import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import Spaces from './pages/Spaces';
import LoftOsmoz from './pages/LoftOsmoz';
import PatioOsmoz from './pages/PatioOsmoz';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ScrollToTop from './components/ScrollToTop'; // ✅ import ajouté

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* ✅ déclenche le scroll en haut à chaque changement de route */}
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fbfbf3' }}>
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spaces" element={<Spaces />} />
            <Route path="/spaces/loft-osmoz" element={<LoftOsmoz />} />
            <Route path="/spaces/patio-osmoz" element={<PatioOsmoz />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
