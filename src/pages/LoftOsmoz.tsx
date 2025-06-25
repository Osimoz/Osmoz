import { useState } from 'react';
import { MapPin, Users, Euro, Calendar, Coffee, Wifi, Tv, UtensilsCrossed, Fan, HdmiPort, Box, Presentation } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import BannerSlideshow from '../components/BannerSlideshow';
import { useNavigate } from 'react-router-dom';

// Logos des plateformes
import kactusLogo from '../assets/Logo/kactus.png';
import officeridersLogo from '../assets/Logo/or.png';
import abcLogo from '../assets/Logo/abcsalles.png';
import nabooLogo from '../assets/Logo/naboo.jpeg';
import giggsterLogo from '../assets/Logo/giggster.png';
import peerspaceLogo from '../assets/Logo/peerspace.png';

const platforms = [
  { name: "Kactus", url: "https://www.kactus.com/fr/lieux/loft-osmoz-place-des-vosges", Logo: kactusLogo },
  { name: "Officeriders", url: "https://www.officeriders.com/fr/salles/loft-lumineux-moderne-industriel?category=meeting", Logo: officeridersLogo },
  { name: "We Are Scene", url: "https://www.wearescene.com/fr/lieu/tournage-shooting-paris-marais-loft-prestigieux", Logo: null },
  { name: "ABC Salles", url: "https://www.abcsalles.com/lieu/loft-osmoz", Logo: abcLogo },
  { name: "Naboo", url: "https://www.naboo.app/explorer/houses/loft-osmoz", Logo: nabooLogo },
  { name: "Giggster", url: "https://giggster.com/listing-preview/loft-osmoz-meeting-room-and-showroom-in-marais", Logo: giggsterLogo },
  { name: "Peerspace", url: "https://www.peerspace.com/fr/pages/listings/67223aec8687373c1c672007?utm_source=copy_link&utm_campaign=listing_sharing", Logo: peerspaceLogo },
];

const amenities = [
  { icon: Wifi, label: "Wifi haut débit" },
  { icon: Coffee, label: "Machine à café en grains" },
  { icon: Tv, label: "Écrans connectés" },
  { icon: UtensilsCrossed, label: "Cuisine équipée" },
  { icon: Fan, label: "Ventilateur" }, 
  { icon: HdmiPort, label: "Cable HDMI" },
  { icon: Box, label: "Rangement" }, 
  { icon: Presentation, label: "Paperboard" } 
];

export default function LoftOsmoz() {
  const navigate = useNavigate();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const bannerImages = [
    { url: "/images/2_DSC4734-HDR OK.jpg", alt: "Loft Osmoz - Vue principale" },
    { url: "/images/17Vue Pleiniere Verriere.jpg", alt: "Loft Osmoz - Entrée" },
    { url: "/images/13_DSC4713-HDR.jpg", alt: "Loft Osmoz - Espace de travail" },
    { url: "/images/12BVerlomme08.jpeg", alt: "Loft Osmoz - Vue d'ensemble" }
  ];

const allImages = [
  { url: "/images/1_DSC4725-HDR OK.jpg", alt: "Loft Osmoz - Vue 1" },
  { url: "/images/2_DSC4734-HDR OK.jpg", alt: "Loft Osmoz - Vue 2" },
  { url: "/images/3_DSC4743-HDR.jpg", alt: "Loft Osmoz - Vue 3" },
  { url: "/images/4_DSC4710-HDR.jpg", alt: "Loft Osmoz - Vue 4" },
  { url: "/images/5_DSC3713-HDR.jpg", alt: "Loft Osmoz - Vue 5" },
  { url: "/images/6_DSC4719-HDR.jpg", alt: "Loft Osmoz - Vue 6" },
  { url: "/images/7_DSC4722-HDR.jpg", alt: "Loft Osmoz - Vue 7" },
  { url: "/images/8_DSC4701-HDR.jpg", alt: "Loft Osmoz - Vue 8" },
  { url: "/images/9_DSC4704-HDR.jpg", alt: "Loft Osmoz - Vue 9" },
  { url: "/images/10_DSC4731-HDR.jpg", alt: "Loft Osmoz - Vue 10" },
  { url: "/images/11_DSC4737-HDR.jpg", alt: "Loft Osmoz - Vue 11" },
  { url: "/images/12_DSC4740-HDR.jpg", alt: "Loft Osmoz - Vue 12" },
  { url: "/images/12BVerlomme08.jpeg", alt: "Loft Osmoz - Vue 13" },
  { url: "/images/12CVerlomme07.jpeg", alt: "Loft Osmoz - Vue 14" },
  { url: "/images/13_DSC4713-HDR.jpg", alt: "Loft Osmoz - Vue 15" },
  { url: "/images/14_DSC4716-HDR.jpg", alt: "Loft Osmoz - Vue 16" },
  { url: "/images/15Vue Pleiniere Cuisine.jpg", alt: "Loft Osmoz - Vue 17" },
  { url: "/images/16Vue Pleiniere Entrée.jpg", alt: "Loft Osmoz - Vue 18" },
  { url: "/images/17Vue Pleiniere Verriere.jpg", alt: "Loft Osmoz - Vue 19" },
  { url: "/images/18_DSC4629-HDR.jpg", alt: "Loft Osmoz - Vue 20" },
  { url: "/images/19_DSC4632-HDR.jpg", alt: "Loft Osmoz - Vue 21" },
  { url: "/images/20_DSC4635-HDR OK.jpg", alt: "Loft Osmoz - Vue 22" },
  { url: "/images/21_DSC4638-HDR.jpg", alt: "Loft Osmoz - Vue 23" },
  { url: "/images/22_DSC4641-HDR.jpg", alt: "Loft Osmoz - Vue 24" },
  { url: "/images/23_DSC4647-HDR.jpg", alt: "Loft Osmoz - Vue 25" },
  { url: "/images/24_DSC4650-HDR.jpg", alt: "Loft Osmoz - Vue 26" },
  { url: "/images/25_DSC4653-HDR.jpg", alt: "Loft Osmoz - Vue 27" },
  { url: "/images/26_DSC4656-HDR.jpg", alt: "Loft Osmoz - Vue 28" },
  { url: "/images/27_DSC4659-HDR.jpg", alt: "Loft Osmoz - Vue 29" },
  { url: "/images/28_DSC4662-HDR.jpg", alt: "Loft Osmoz - Vue 30" },
  { url: "/images/29_DSC4668-HDR.jpg", alt: "Loft Osmoz - Vue 31" },
  { url: "/images/30_DSC4689-HDR.jpg", alt: "Loft Osmoz - Vue 32" },
  { url: "/images/31_DSC4692-HDR.jpg", alt: "Loft Osmoz - Vue 33" },
  { url: "/images/32_DSC4695-HDR.jpg", alt: "Loft Osmoz - Vue 34" },
  { url: "/images/33_DSC4698-HDR OK .jpg", alt: "Loft Osmoz - Vue 35" },
  { url: "/images/34Verlomme11.jpeg", alt: "Loft Osmoz - Vue 36" },
  { url: "/images/35Verlomme12.jpeg", alt: "Loft Osmoz - Vue 37" },
  { url: "/images/36_Verlomme13.jpeg", alt: "Loft Osmoz - Vue 38" }
];

const gridImages = [...allImages].sort(() => 0.5 - Math.random()).slice(0, 2);

  return (
    <div className="pt-24">
      <BannerSlideshow 
        images={bannerImages}
        title="Loft OSMOZ"
        onImageClick={() => openGallery(0)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-gray-500 mb-8 text-sm">
              <MapPin className="h-4 w-4" />
              <span className="font-light">10 rue Roger Verlomme, 75003, Paris</span>
            </div>

            <div className="text-center mb-8">
              <p className="text-xl italic font-light text-gray-800" style={{ fontFamily: 'Playfair Display' }}>
                Offrez à votre équipe une expérience inoubliable dans ce loft exclusif de 110m², niché au cœur du Marais, proche de la Place des Vosges !
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
              <h2 className="text-2xl font-light mb-6">Description</h2>
              <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                <p>Situé dans un quartier historique de Paris, le Loft OSMOZ offre un cadre unique pour vos événements professionnels.</p>
                <p>Le loft se compose d'une grande salle principale baignée de lumière naturelle, d'une cuisine entièrement équipée, et d'espaces de travail modulables.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Réunions d'équipe et séminaires</li>
                  <li>Ateliers créatifs et formations</li>
                  <li>Événements d'entreprise</li>
                  <li>Shootings photos et tournages</li>
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
                <span className="font-light text-gray-600">Jusqu'à 30 personnes</span>
              </div>
              <div className="flex items-center gap-2 mb-8">
                <Euro className="h-5 w-5 text-gray-600" />
                <span className="font-light text-gray-600">À partir de 500€</span>
              </div>
              <button 
                onClick={() => navigate("/contact")}
                className="w-full bg-black text-white px-6 py-3 rounded-lg text-sm tracking-widest font-light hover:bg-white hover:text-black border border-black transition duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Réserver
              </button>

              {/* Liens marketplaces */}
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
                      <img src={platform.Logo} alt={platform.name} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                    ) : (
                      <span className="text-xs font-semibold text-gray-700 group-hover:text-white">W</span>
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