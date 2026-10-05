import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LogoHorizontal } from './Logo';
import { LangPill } from './LangSwitch';
import { useLocale } from '../i18n/context';

export const Navigation = () => {
  const navigate = useNavigate();
  const { t, p } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aproposOpen, setAproposOpen] = useState(false);

  const handleReservationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(p('/reservation'));
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
          <Link to={p('/')} onClick={() => setOpen(false)} className="flex-shrink-0">
            <LogoHorizontal color="#862637" />
          </Link>

          {/* Desktop nav : à partir de lg. En dessous les liens ne tiennent
              pas sur une ligne, le menu burger prend le relais. */}
          <div className="hidden lg:flex items-center gap-4 min-[1120px]:gap-6 xl:gap-10">
            {[
              { to: '/', label: t.nav.home },
              { to: '/spaces', label: t.nav.spaces },
              { to: '/experience', label: t.nav.experience },
              { to: '/articles', label: t.nav.articles },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={p(to)}
                className="relative group py-1"
              >
                <span className="text-[#01142a] font-normal text-xs tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-[#862637]">
                  {label}
                </span>
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}

            {/* Dropdown À propos */}
            <div
              className="relative py-1"
              onMouseEnter={() => setAproposOpen(true)}
              onMouseLeave={() => setAproposOpen(false)}
            >
              <Link to={p('/rse')} className="relative group flex items-center gap-1">
                <span className="text-[#01142a] font-normal text-xs tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-[#862637]">
                  {t.nav.about}
                </span>
                <span className="text-[10px] text-[#01142a] group-hover:text-[#862637] transition-colors duration-200">▾</span>
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>

              {/* Pont invisible pour ne pas perdre le hover entre le lien et le dropdown */}
              <div className="absolute top-full left-0 w-full h-2" />

              <div className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-52 bg-[#fbfbf3] border border-[#e5e5e5] shadow-lg rounded-xl overflow-hidden transition-all duration-200 origin-top z-50 ${
                aproposOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
              }`}>
                <Link
                  to={p('/rse')}
                  className="block px-5 py-3 text-xs tracking-[0.12em] uppercase text-[#01142a] hover:text-[#862637] hover:bg-white transition-colors duration-150"
                  onClick={() => setAproposOpen(false)}
                >
                  {t.nav.commitments}
                </Link>
                <div className="mx-4 h-px bg-[#e5e5e5]" />
                <Link
                  to={p('/questions-frequentes')}
                  className="block px-5 py-3 text-xs tracking-[0.12em] uppercase text-[#01142a] hover:text-[#862637] hover:bg-white transition-colors duration-150"
                  onClick={() => setAproposOpen(false)}
                >
                  {t.nav.faq}
                </Link>
              </div>
            </div>

            <Link to={p('/contact')} className="relative group py-1">
              <span className="text-[#01142a] font-normal text-xs tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-[#862637]">{t.nav.contact}</span>
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>

            {/* Sélecteur de langue : chaque langue mène à la page équivalente */}
            <LangPill />

            <button
              onClick={handleReservationClick}
              className="btn-label ml-2 bg-[#862637] text-[#fee1d4] px-6 py-2.5 text-xs uppercase rounded-lg hover:bg-[#01142a] hover:text-white transition-all duration-300 border border-transparent"
            >
              {t.nav.book}
            </button>
          </div>

          {/* Mobile : la pilule de langue reste dans la barre, à côté du burger */}
          <div className="lg:hidden flex items-center gap-1">
            <LangPill onNavigate={() => setOpen(false)} />
            <button
              className="p-3 -mr-1"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
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
      </div>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-40`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden absolute left-3 right-3 top-[76px] z-50 rounded-2xl border border-[#e5e5e5] bg-[#fbfbf3] shadow-xl transition-all duration-300 origin-top ${
          open ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        <div className="p-3 space-y-0.5">
          {[
            { to: '/', label: t.nav.home },
            { to: '/spaces', label: t.nav.spaces },
            { to: '/experience', label: t.nav.experience },
            { to: '/articles', label: t.nav.articles },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={p(to)}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-xl text-[#01142a] font-normal text-sm tracking-[0.12em] uppercase hover:bg-white transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
          <div className="px-4 py-2 text-xs tracking-[0.15em] uppercase text-[#9b9690]">{t.nav.about}</div>
          <Link to={p('/rse')} onClick={() => setOpen(false)} className="block pl-8 pr-4 py-2.5 rounded-xl text-[#01142a] font-normal text-sm tracking-[0.12em] uppercase hover:bg-white transition-colors duration-150">
            {t.nav.commitments}
          </Link>
          <Link to={p('/questions-frequentes')} onClick={() => setOpen(false)} className="block pl-8 pr-4 py-2.5 rounded-xl text-[#01142a] font-normal text-sm tracking-[0.12em] uppercase hover:bg-white transition-colors duration-150">
            {t.nav.faq}
          </Link>
          <Link to={p('/contact')} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-[#01142a] font-normal text-sm tracking-[0.12em] uppercase hover:bg-white transition-colors duration-150">
            {t.nav.contact}
          </Link>
          <div className="pt-2 pb-1 px-1">
            <button
              onClick={(e) => { handleReservationClick(e); setOpen(false); }}
              className="btn-label w-full bg-[#862637] text-[#fee1d4] px-4 py-3 text-xs uppercase rounded-xl hover:bg-[#01142a] transition-all duration-300"
            >
              {t.nav.bookSpace}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
