import { useEffect, useState } from 'react';
import { MapPin, Users, Euro, Calendar, Coffee, Wifi, Tv, UtensilsCrossed, Fan, HdmiPort, Box, Presentation } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import BannerSlideshow from '../components/BannerSlideshow';
import { useNavigate } from 'react-router-dom';

// Util: chemins images sûrs local + prod (gère sous-répertoire et espaces)
const base = import.meta.env.BASE_URL;
const u = (path: string) => encodeURI(`${base}${path.replace(/^\//, '')}`);

// --- Bannière (4 visuels) ---
const bannerImages = [
  { url: u('images/Duplex Haussmannien/1 Salon Normal 3.jpg'), alt: 'Duplex Haussmannien – Salon principal lumineux' },
  { url: u('images/Duplex Haussmannien/2 Salle TV 1.jpg'),    alt: 'Duplex Haussmannien – Salon TV' },
  { url: u('images/Duplex Haussmannien/3 Cuisine 5.jpg'),     alt: 'Duplex Haussmannien – Cuisine équipée' },
  { url: u('images/Duplex Haussmannien/6 Exterieur 3.jpg'),   alt: 'Duplex Haussmannien – Extérieur et cour' },
];

// --- Galerie (sélection élargie) ---
const allImages = [
  { url: u('images/Duplex Haussmannien/1 Salon Normal 3.jpg'), alt: 'Salon principal' },
  { url: u('images/Duplex Haussmannien/2 Salle TV 1.jpg'), alt: 'Salle TV' },
  { url: u('images/Duplex Haussmannien/3 Cuisine 5.jpg'), alt: 'Cuisine 5' },
  { url: u('images/Duplex Haussmannien/4 Escalier.jpg'), alt: 'Escalier intérieur' },
  { url: u('images/Duplex Haussmannien/5 Entrée 2.jpg'), alt: 'Entrée' },
  { url: u('images/Duplex Haussmannien/6 Exterieur 3.jpg'), alt: 'Extérieur 3' },
  { url: u('images/Duplex Haussmannien/7 Entrée 1.jpg'), alt: 'Entrée 1' },
  { url: u('images/Duplex Haussmannien/8 Reunion Salon 1.jpg'), alt: 'Réunion salon 1' },
  { url: u('images/Duplex Haussmannien/9 Salon Conference 4.jpg'), alt: 'Salon conférence 4' },
  { url: u('images/Duplex Haussmannien/10 Salon rectangle 1.jpg'), alt: 'Salon rectangle 1' },
  { url: u('images/Duplex Haussmannien/11 Salon rectangle 2.jpg'), alt: 'Salon rectangle 2' },
  { url: u('images/Duplex Haussmannien/12 Salon rectangle 3.jpg'), alt: 'Salon rectangle 3' },
  { url: u('images/Duplex Haussmannien/13 Reunion Salon 2.jpg'), alt: 'Réunion salon 2' },
  { url: u('images/Duplex Haussmannien/14 Reunion Salon 3.jpg'), alt: 'Réunion salon 3' },
  { url: u('images/Duplex Haussmannien/15 Réunion Salon 4.jpg'), alt: 'Réunion salon 4' },
  { url: u('images/Duplex Haussmannien/16 Salon conférence 1.jpg'), alt: 'Salon conférence 1' },
  { url: u('images/Duplex Haussmannien/17 Salon conférence 2.jpg'), alt: 'Salon conférence 2' },
  { url: u('images/Duplex Haussmannien/18 Salon Conference 3.jpg'), alt: 'Salon conference 3' },
  { url: u('images/Duplex Haussmannien/20 Salon normal 1.jpg'), alt: 'Salon normal 1' },
  { url: u('images/Duplex Haussmannien/21 Salon normal 2.jpg'), alt: 'Salon normal 2' },
  { url: u('images/Duplex Haussmannien/23 Salon normal 4.jpg'), alt: 'Salon normal 4' },
  { url: u('images/Duplex Haussmannien/24 Salon normal 5.jpg'), alt: 'Salon normal 5' },
  { url: u('images/Duplex Haussmannien/25 Salon normal 6.jpg'), alt: 'Salon normal 6' },

  { url: u('images/Duplex Haussmannien/26 Cuisine 1.jpg'), alt: 'Cuisine 1' },
  { url: u('images/Duplex Haussmannien/27 Cuisine 2.jpg'), alt: 'Cuisine 2' },
  { url: u('images/Duplex Haussmannien/30 Cuisine 3.jpg'), alt: 'Cuisine 3' },
  { url: u('images/Duplex Haussmannien/32 Cuisine 4.jpg'), alt: 'Cuisine 4' },
  { url: u('images/Duplex Haussmannien/33 Cuisine 6.jpg'), alt: 'Cuisine 6' },
  { url: u('images/Duplex Haussmannien/34 Cuisine 7.jpg'), alt: 'Cuisine 7' },

  { url: u('images/Duplex Haussmannien/36 Escalier haut 2.jpg'), alt: 'Escalier haut 2' },
  { url: u('images/Duplex Haussmannien/37 Escalier Haut 1.jpg'), alt: 'Escalier haut 1' },

  { url: u('images/Duplex Haussmannien/38 Salle TV 2.jpg'), alt: 'Salle TV 2' },

  { url: u('images/Duplex Haussmannien/40 Chambre 1.jpg'), alt: 'Chambre 1' },
  { url: u('images/Duplex Haussmannien/41 Chambre 2.jpg'), alt: 'Chambre 2' },
  { url: u('images/Duplex Haussmannien/42 Chambre 3.jpg'), alt: 'Chambre 3' },
  { url: u('images/Duplex Haussmannien/43 Chambre 4.jpg'), alt: 'Chambre 4' },
  { url: u('images/Duplex Haussmannien/44 Chambre 5.jpg'), alt: 'Chambre 5' },

  { url: u('images/Duplex Haussmannien/45 Salle de bain 1.jpg'), alt: 'Salle de bain 1' },
  { url: u('images/Duplex Haussmannien/46 Salle de bain 2.jpg'), alt: 'Salle de bain 2' },
  { url: u('images/Duplex Haussmannien/47 Salle de bain 3.jpg'), alt: 'Salle de bain 3' },

  { url: u('images/Duplex Haussmannien/49 Exterieur 1.jpg'), alt: 'Extérieur 1' },
  { url: u('images/Duplex Haussmannien/50 Exterieur 2.jpg'), alt: 'Extérieur 2' },
];

const previewImages = allImages.slice(0, 4);

const amenities = [
  { icon: Wifi, label: 'Wifi haut débit' },
  { icon: Coffee, label: 'Machine à café en grains' },
  { icon: Tv, label: 'Écrans connectés' },
  { icon: UtensilsCrossed, label: 'Cuisine équipée' },
  { icon: Fan, label: 'Ventilation' },
  { icon: HdmiPort, label: 'Câble HDMI' },
  { icon: Box, label: 'Rangements' },
  { icon: Presentation, label: 'Paperboard' },
];

export default function DuplexOsmoz() {
  const navigate = useNavigate();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // SEO page title + JSON-LD
  useEffect(() => {
    document.title = 'Duplex Haussmannien – OSMOZ | Paris 2e';
  }, []);

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: 'Duplex Haussmannien – OSMOZ',
    address: '146 rue Montmartre, 75002 Paris, France',
    image: bannerImages.map(b => b.url),
    url: typeof window !== 'undefined' ? window.location.href : 'https://osmoz.work/spaces/duplex-osmoz',
    description:
      "Espace premium clé en main au cœur de Paris 2e : duplex haussmannien lumineux avec verrières, moulures et parquet, configurations modulables, équipements professionnels et restauration à la demande – idéal réunions, séminaires et ateliers.",
  };

  return (
    <div className="pt-24">
      {/* JSON-LD (SEO) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <BannerSlideshow
        images={bannerImages}
        title="Duplex Haussmannien"
        onImageClick={() => openGallery(0)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-gray-500 mb-8 text-sm">
              <MapPin className="h-4 w-4" />
              <span className="font-light">146 rue Montmartre, 75002, Paris</span>
            </div>

            <div className="text-center mb-8">
              <p className="text-xl italic font-light text-gray-800" style={{ fontFamily: 'Playfair Display' }}>
                Élégant, lumineux et au calme d’une cour privée, ce duplex haussmannien offre un cadre premium, clé en main,
                pour réunions, séminaires et ateliers. Verrières, moulures et parquet signent une atmosphère inspirante au cœur du 2<sup>e</sup>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12">
              {previewImages.map((img, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openGallery(allImages.indexOf(img))}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
                  />
                </div>
              ))}
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-light mb-6">Description</h2>
              <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                <p>
                  Pensé dans l’esprit des maisons de réunions haut de gamme, l’espace combine
                  <strong> lumière naturelle</strong>, <strong>modularité</strong> et <strong>confort</strong> :
                  grand salon transformable (conférence, U, rectangle, ateliers), cuisine équipée pour pauses et déjeuners,
                  salle TV et espaces propices à la créativité comme à la décision.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Deux niveaux au calme d’une cour privée, Paris 2e</li>
                  <li>Verrières, moulures, parquet : charme parisien et élégance</li>
                  <li>Agencements modulables pour réunions, séminaires et workshops</li>
                  <li>Solutions traiteur et services logistiques sur demande</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-light mb-6">Équipements</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <amenity.icon className="h-5 w-5 text-gray-600" />
                    <span className="font-light text-gray-600">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-gray-600" />
                <span className="font-light text-gray-600">Jusqu'à 40 personnes</span>
              </div>
              <div className="flex items-center gap-2 mb-8">
                <Euro className="h-5 w-5 text-gray-600" />
                <span className="font-light text-gray-600">À partir de 2000€</span>
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-black text-white px-6 py-3 rounded-lg text-sm tracking-widest font-light hover:bg-white hover:text-black border border-black transition duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Réserver
              </button>
            </div>
          </div>
        </div>
      </div>

      <ImageGallery
        images={allImages}
        initialIndex={selectedImageIndex}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}