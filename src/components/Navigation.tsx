import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LogoHorizontal } from './Logo';

export const Navigation = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleReservationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/reservation');
  };

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#fbfbf3]/98 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
          : 'bg-[#fbfbf3]/80 backdrop-blur-md border-b border-black/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">

          {/* Logo */}
          <Link to="/" onClick={() => setOpen(false)} className="flex-shrink-0">
            <LogoHorizontal color="#862637" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { to: '/', label: 'Accueil' },
              { to: '/spaces', label: 'Espaces' },
              { to: '/questions-frequentes', label: 'FAQ' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="relative group py-1"
              >
                <span className="text-[#01142a] font-normal text-xs tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-[#862637]">
                  {label}
                </span>
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}

            <button
              onClick={handleReservationClick}
              className="ml-2 bg-[#862637] text-[#fee1d4] px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-normal rounded-lg hover:bg-[#01142a] hover:text-white transition-all duration-300 border border-transparent"
            >
              Réserver
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-3 -mr-1"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            {open
              ? <X className="h-5 w-5 text-[#01142a]" />
              : <Menu className="h-5 w-5 text-[#01142a]" />
            }
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-40`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile dropdown */}
      <div
        className={`md:hidden absolute left-3 right-3 top-[76px] z-50 rounded-2xl border border-[#e5e5e5] bg-[#fbfbf3] shadow-xl transition-all duration-300 origin-top ${
          open ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        <div className="p-3 space-y-0.5">
          {[
            { to: '/', label: 'Accueil' },
            { to: '/spaces', label: 'Espaces' },
            { to: '/questions-frequentes', label: 'FAQ' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-xl text-[#01142a] font-normal text-sm tracking-[0.12em] uppercase hover:bg-white transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 pb-1 px-1">
            <button
              onClick={(e) => { handleReservationClick(e); setOpen(false); }}
              className="w-full bg-[#862637] text-[#fee1d4] px-4 py-3 text-xs tracking-[0.2em] uppercase font-normal rounded-xl hover:bg-[#01142a] transition-all duration-300"
            >
              Réserver un espace
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
