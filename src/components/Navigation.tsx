import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LogoHorizontal } from './Logo';

export const Navigation = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleReservationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/contact');
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <nav
      className="fixed w-full z-50 backdrop-blur-sm border-b border-black/5"
      style={{ backgroundColor: 'rgba(254, 225, 212, 0.7)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand / Logo (unchanged) */}
          <div className="flex items-center">
            <Link to="/" onClick={() => setOpen(false)}>
              <LogoHorizontal color="#862637" />
            </Link>
          </div>

          {/* Desktop nav (unchanged look) */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/" className="hover:opacity-80 tracking-wide relative group py-2" style={{ color: '#862637' }}>
              <span className="font-light text-sm tracking-widest">Accueil</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/spaces" className="hover:opacity-80 tracking-wide relative group py-2" style={{ color: '#862637' }}>
              <span className="font-light text-sm tracking-widest">Espaces</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/Questions-Frequentes" className="hover:opacity-80 tracking-wide relative group py-2" style={{ color: '#862637' }}>
              <span className="font-light text-sm tracking-widest">FAQ</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/contact" className="hover:opacity-80 tracking-wide relative group py-2" style={{ color: '#862637' }}>
              <span className="font-light text-sm tracking-widest">Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <button
              onClick={handleReservationClick}
              className="bg-[#862637] text-[#fee1d4] px-6 py-2.5 text-sm tracking-widest font-light hover:bg-[#fee1d4] hover:text-[#862637] border border-[#fee1d4] transition duration-300 rounded-lg"
            >
              Réservez
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
            >
              {open ? <X className="h-6 w-6" style={{ color: '#862637' }} /> : <Menu className="h-6 w-6" style={{ color: '#862637' }} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay + dropdown */}
      {/* Overlay to close when clicking outside */}
      <div
        className={`md:hidden fixed inset-0 ${open ? 'block' : 'hidden'} z-40`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      {/* Dropdown panel */}
      <div className={`md:hidden absolute left-3 right-3 top-20 ${open ? 'block' : 'hidden'} z-50 rounded-xl shadow-xl border border-[#862637]/20`}
           style={{ backgroundColor: 'rgba(254, 225, 212, 0.98)' }}>
        <div className="p-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-white/40"
            style={{ color: '#862637' }}
          >
            <span className="font-light text-sm tracking-widest">Accueil</span>
          </Link>
          <Link
            to="/spaces"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-white/40"
            style={{ color: '#862637' }}
          >
            <span className="font-light text-sm tracking-widest">Espaces</span>
          </Link>
          <Link
            to="/Questions-Frequentes"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-white/40"
            style={{ color: '#862637' }}
          >
            <span className="font-light text-sm tracking-widest">FAQ</span>
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-white/40"
            style={{ color: '#862637' }}
          >
            <span className="font-light text-sm tracking-widest">Contact</span>
          </Link>
          <button
            onClick={(e) => { handleReservationClick(e); setOpen(false); }}
            className="w-full mt-1 bg-[#862637] text-[#fee1d4] px-4 py-2 text-sm tracking-widest font-light hover:bg-[#fee1d4] hover:text-[#862637] border border-[#fee1d4] transition duration-300 rounded-lg"
          >
            Réservez
          </button>
        </div>
      </div>
    </nav>
  );
};
