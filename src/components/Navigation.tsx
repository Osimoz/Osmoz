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
    <nav className="fixed w-full z-50 backdrop-blur-sm bg-[#fbfbf3]/70 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/">
              <LogoHorizontal />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/" className="text-gray-600 hover:text-black tracking-wide relative group py-2">
              <span className="font-light text-sm tracking-widest">Accueil</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/spaces" className="text-gray-600 hover:text-black tracking-wide relative group py-2">
              <span className="font-light text-sm tracking-widest">Espaces</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-black tracking-wide relative group py-2">
              <span className="font-light text-sm tracking-widest">Blog</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-black tracking-wide relative group py-2">
              <span className="font-light text-sm tracking-widest">Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <button 
              onClick={openTypeform}
              className="bg-black/90 text-white px-6 py-2.5 text-sm tracking-widest font-light hover:bg-white hover:text-black border border-black transition duration-300 rounded-lg"
            >
              Réservez
            </button>
          </div>
          <div className="md:hidden">
            <Menu className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};