import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Confirmation() {
  return (
    <>
      <Helmet>
        <title>Inscription confirmée | OSMOZ</title>
        <meta name="description" content="Votre inscription à la newsletter OSMOZ est confirmée." />
        <link rel="canonical" href="https://osmoz.work/confirmation" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="pt-32 pb-24 bg-[#fbfbf3] min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-4">
              Newsletter
            </p>
            <h1
              className="font-light text-[#01142a] mb-6"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Inscription confirmée
            </h1>
            <p className="text-base font-light text-gray-600 leading-relaxed mb-10">
              Merci ! Votre inscription à la newsletter OSMOZ est bien confirmée. Vous recevrez prochainement nos actualités, événements et sélections.
            </p>
            <Link
              to="/"
              className="inline-block text-xs font-normal uppercase tracking-[0.3em] text-[#01142a] border-b border-[#01142a] pb-1 hover:text-[#862637] hover:border-[#862637] transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
