import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { LogoHorizontal } from './Logo';

const TYPEFORM_URL = "https://tally.so/r/mDx24R";

export const Navigation = () => {
  const openTypeform = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(TYPEFORM_URL, '_blank');
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-sm border-b border-black/5" style={{ backgroundColor: 'rgba(254, 225, 212, 0.7)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/">
              <LogoHorizontal color="#862637" />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/" className="hover:opacity-80 tracking-wide relative group py-2" style={{ color: '#862637' }}>
              <span className="font-light text-sm tracking-widest">Accueil</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/spaces" className="hover:opacity-80 tracking-wide relative group py-2" style={{ color: '#862637' }}>
              <span className="font-light text-sm tracking-widest">Espaces</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/blog" className="hover:opacity-80 tracking-wide relative group py-2" style={{ color: '#862637' }}>
              <span className="font-light text-sm tracking-widest">Blog</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/contact" className="hover:opacity-80 tracking-wide relative group py-2" style={{ color: '#862637' }}>
              <span className="font-light text-sm tracking-widest">Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#862637] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <button 
              onClick={openTypeform}
              className="bg-[#862637] text-[#fee1d4] px-6 py-2.5 text-sm tracking-widest font-light hover:bg-[#fee1d4] hover:text-[#862637] border border-[#fee1d4] transition duration-300 rounded-lg"
            >
              Réservez
            </button>
          </div>
          <div className="md:hidden">
            <Menu className="h-6 w-6" style={{ color: '#862637' }} />
          </div>
        </div>
      </div>
    </nav>
  );
};