import { useState } from 'react';
import { MapPin, Users, Euro, Calendar, Coffee, Wifi, Tv, UtensilsCrossed, Fan, HdmiPort, Box, Presentation } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import BannerSlideshow from '../components/BannerSlideshow';
import { useNavigate } from 'react-router-dom';

const bannerImages = [
  {
    url: "/images/patio/patio.salon-vue-complete.jpeg",
    alt: "Le Patio - Vue principale"
  },
  {
    url: "/images/patio/patio-escalier-haut.jpg",
    alt: "Le Patio - Escalier haut"
  },
  {
    url: "/images/patio/patio-salon1-vueVerriere.jpg",
    alt: "Le Patio - Vue verrière"
  },
  {
    url: "/images/patio/patio-cuisine1.jpg",
    alt: "Le Patio - Cuisine"
  }
];

const allImages = [
  { url: "/images/patio/patio-cuisine-3.jpg", alt: "Le Patio - Cuisine 3" },
  { url: "/images/patio/patio-cuisine1.jpg", alt: "Le Patio - Cuisine 1" },
  { url: "/images/patio/patio-cuisine2.jpg", alt: "Le Patio - Cuisine 2" },
  { url: "/images/patio/patio-escalier-haut.jpg", alt: "Le Patio - Escalier haut 1" },
  { url: "/images/patio/patio-escalier-haut2.jpg", alt: "Le Patio - Escalier haut 2" },
  { url: "/images/patio/patio-escalierbas.jpg", alt: "Le Patio - Escalier bas" },
  { url: "/images/patio/patio-escalierbas2.jpg", alt: "Le Patio - Escalier bas 2" },
  { url: "/images/patio/patio-salledebain.jpg", alt: "Le Patio - Salle de bain" },
  { url: "/images/patio/patio-salon-vue-dos.jpeg", alt: "Le Patio - Salon vue dos" },
  { url: "/images/patio/patio-salon-vuecuisine.jpg", alt: "Le Patio - Salon vue cuisine" },
  { url: "/images/patio/patio-salon-vuetele.jpeg", alt: "Le Patio - Salon vue télé" },
  { url: "/images/patio/patio-salon1-vueVerriere.jpg", alt: "Le Patio - Salon 1 vue verrière" },
  { url: "/images/patio/patio-salon2-vueCuisine.jpg", alt: "Le Patio - Salon 2 vue cuisine" },
  { url: "/images/patio/patio-salon2.vueverriere.jpg.jpg", alt: "Le Patio - Salon 2 vue verrière" },
  { url: "/images/patio/patio.salon-vue-complete.jpeg", alt: "Le Patio - Vue complète" }
];

const previewImages = allImages.slice(0, 4); // ⚡ n'affiche que 4 images dans la grille initiale

const amenities = [
  { icon: Wifi, label: "Wifi haut débit" },
  { icon: Coffee, label: "Machine à café en grains" },
  { icon: Tv, label: "Écrans connectés" },
  { icon: UtensilsCrossed, label: "Cuisine équipée" },
  { icon: Fan, label: "Climatisation" },
  { icon: HdmiPort, label: "Cable HDMI" },
  { icon: Box, label: "Rangement" },
  { icon: Presentation, label: "Paperboard" }
];

export default function PatioOsmoz() {
  const navigate = useNavigate();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <div className="pt-24">
      <BannerSlideshow 
        images={bannerImages}
        title="Patio OSMOZ"
        onImageClick={() => openGallery(0)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-gray-500 mb-8 text-sm">
              <MapPin className="h-4 w-4" />
              <span className="font-light">42 rue General Foy, 75008, Paris</span>
            </div>

            <div className="text-center mb-8">
              <p className="text-xl italic font-light text-gray-800" style={{ fontFamily: 'Playfair Display' }}>
                Découvrez notre espace lumineux de 120m² avec verrières, idéalement situé au calme dans une cour privée proche de Saint Lazare.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12">
              {previewImages.map((img, index) => (
                <div 
                  key={index}
                  className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openGallery(index)}
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
                  Le Patio OSMOZ est un espace exceptionnel de 120m² baigné de lumière naturelle grâce à ses 
                  magnifiques verrières. Situé dans une cour privée au calme, il offre un cadre idéal pour 
                  vos événements professionnels.
                </p>
                <p>
                  L'espace se compose d'une grande salle principale lumineuse, d'une cuisine équipée et 
                  d'espaces de travail modulables pouvant accueillir jusqu'à 30 personnes.
                </p>
                <p>Idéal pour :</p>
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