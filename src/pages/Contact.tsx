import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const TYPEFORM_URL = "https://qcwzpyu0fgi.typeform.com/to/pK7k123c";

export default function Contact() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-light mb-6">Contact</h1>
          <p className="text-xl font-light text-gray-600 italic" style={{ fontFamily: 'Playfair Display' }}>
            Vous êtes une entreprise et souhaitez organiser un événement sur mesure, ou simplement obtenir plus d'informations ?
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-gray-600" />
                <a href="mailto:contact@osmoz.work" className="text-gray-600 hover:text-black transition-colors">
                  contact@osmoz.work
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-gray-600" />
                <a href="tel:+33675186932" className="text-gray-600 hover:text-black transition-colors">
                  06 75 18 69 32
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-gray-600" />
                <address className="text-gray-600 not-italic">
                  10 rue Roger Verlomme, 75003 Paris
                </address>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => window.open(TYPEFORM_URL, "_blank")}
              className="bg-black text-white px-8 py-4 rounded-lg text-sm tracking-widest font-light hover:bg-white hover:text-black border border-black transition duration-300 inline-flex items-center gap-2"
            >
              Nous contacter
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}