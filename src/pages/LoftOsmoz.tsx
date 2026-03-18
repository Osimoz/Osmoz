import { useState } from 'react';
import {
  MapPin,
  Users,
  Euro,
  Calendar,
  Coffee,
  Wifi,
  Tv,
  UtensilsCrossed,
  Fan,
  HdmiPort,
  Box,
  Presentation,
} from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import BannerSlideshow from '../components/BannerSlideshow';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const platforms = [
  {
    name: "Kactus",
    url: "https://www.kactus.com/fr/lieux/loft-osmoz-place-des-vosges",
    Logo: "/images/logos/kactus.png",
  },
  {
    name: "Officeriders",
    url: "https://www.officeriders.com/fr/salles/loft-lumineux-moderne-industriel?category=meeting",
    Logo: "/images/logos/or.png",
  },
  {
    name: "We Are Scene",
    url: "https://www.wearescene.com/fr/lieu/tournage-shooting-paris-marais-loft-prestigieux",
    Logo: null,
  },
  {
    name: "ABC Salles",
    url: "https://www.abcsalles.com/lieu/loft-osmoz",
    Logo: "/images/logos/abcsalles.png",
  },
  {
    name: "Naboo",
    url: "https://www.naboo.app/explorer/houses/loft-osmoz",
    Logo: "/images/logos/naboo.jpeg",
  },
  {
    name: "Giggster",
    url: "https://giggster.com/listing-preview/loft-osmoz-meeting-room-and-showroom-in-marais",
    Logo: "/images/logos/giggster.png",
  },
  {
    name: "Peerspace",
    url: "https://www.peerspace.com/fr/pages/listings/67223aec8687373c1c672007?utm_source=copy_link&utm_campaign=listing_sharing",
    Logo: "/images/logos/peerspace.png",
  },
];

const amenities = [
  { icon: Wifi, label: "Wifi haut débit" },
  { icon: Coffee, label: "Machine à café en grains" },
  { icon: Tv, label: "Écrans connectés" },
  { icon: UtensilsCrossed, label: "Cuisine équipée" },
  { icon: Fan, label: "Ventilateur" },
  { icon: HdmiPort, label: "Cable HDMI" },
  { icon: Box, label: "Rangement" },
  { icon: Presentation, label: "Paperboard" },
];

export default function LoftOsmoz() {
  const navigate = useNavigate();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const base = import.meta.env.BASE_URL;

  const bannerImages = [
    { url: encodeURI(`${base}images/Loft/1 SdR.jpg`), alt: "Loft Osmoz - Salle de réunion" },
    { url: encodeURI(`${base}images/Loft/2 Salon pleiniere 2.jpg`), alt: "Loft Osmoz - Salon plénière" },
    { url: encodeURI(`${base}images/Loft/3 salle a manger.jpg`), alt: "Loft Osmoz - Salle à manger" },
    { url: encodeURI(`${base}images/Loft/4 Cuisine 5.jpg`), alt: "Loft Osmoz - Cuisine" },
  ];

  const allImages = [
    { url: "/images/1_DSC4725-HDR OK.jpg", alt: "Loft Osmoz - Vue 1" },
    // … garde toutes tes images comme avant
    { url: "/images/36_Verlomme13.jpeg", alt: "Loft Osmoz - Vue 38" },
  ];

  const gridImages = [...allImages].sort(() => 0.5 - Math.random()).slice(0, 2);

  return (
    <div className="pt-24">
      {/* SEO */}
      <Helmet>
        <title>Loft OSMOZ — Location d’espace atypique à Paris Marais</title>
        <meta
          name="description"
          content="Louez le Loft OSMOZ, un espace lumineux de 110m² au cœur du Marais, idéal pour séminaires, réunions, showrooms ou tournages. Cuisine équipée, wifi haut débit, et ambiance comme à la maison."
        />
        <link rel="canonical" href="https://osmoz.work/spaces/loft-osmoz" />
      </Helmet>

      <BannerSlideshow images={bannerImages} title="Loft OSMOZ" onImageClick={() => openGallery(0)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-gray-500 mb-8 text-sm">
              <MapPin className="h-4 w-4" />
              <span className="font-light">10 rue Roger Verlomme, 75003, Paris</span>
            </div>

            <div className="text-center mb-8">
              <p
                className="text-xl italic font-light text-gray-800"
                style={{ fontFamily: 'Playfair Display' }}
              >
                Offrez à votre équipe une expérience inoubliable dans ce loft exclusif de 110m², niché au
                cœur du Marais, proche de la Place des Vosges !
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12">
              {gridImages.map((img, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openGallery(index)}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
                  />
                </div>
              ))}
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-normal mb-6">Description</h2>
              <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                <p>
                  Situé dans un quartier historique de Paris, le Loft OSMOZ offre un cadre unique pour vos
                  événements professionnels.
                </p>
                <p>
                  Le loft se compose d'une grande salle principale baignée de lumière naturelle, d'une cuisine
                  entièrement équipée, et d'espaces de travail modulables.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Réunions d'équipe et séminaires</li>
                  <li>Ateliers créatifs et formations</li>
                  <li>Événements d'entreprise</li>
                  <li>Shootings photos et tournages</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-normal mb-6">Équipements</h2>
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
                <span className="font-light text-gray-600">Jusqu'à 30 personnes</span>
              </div>
              <div className="flex items-center gap-2 mb-8">
                <Euro className="h-5 w-5 text-gray-600" />
                <span className="font-light text-gray-600">À partir de 500€</span>
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-black text-white px-6 py-3 rounded-lg text-sm tracking-widest font-normal hover:bg-white hover:text-black border border-black transition duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Réserver
              </button>

              <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                {platforms.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-gray-300 hover:border-black bg-white hover:bg-[#fce9de] transition-colors"
                    title={`Voir sur ${platform.name}`}
                  >
                    {platform.Logo ? (
                      <img
                        src={platform.Logo}
                        alt={platform.name}
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-gray-700">{platform.name[0]}</span>
                    )}
                  </a>
                ))}
              </div>
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
