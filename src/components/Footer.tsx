import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-black/5 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {currentYear} Osmoz. Tous droits réservés.
          </div>
          <div className="flex gap-8">
            <Link to="/legal/privacy" className="text-sm text-gray-500 hover:text-black transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/legal/terms" className="text-sm text-gray-500 hover:text-black transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}