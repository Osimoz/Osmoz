import React from 'react';
import { ArrowRight, Castle, GemIcon, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';

const TYPEFORM_URL = "https://tally.so/r/mDx24R";

export default function Home() {
  const openTypeform = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(TYPEFORM_URL, '_blank');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-light mb-8 leading-tight tracking-wide" style={{ color: '#01142a' }}>
              Des espaces à louer pour travailler <em className="font-light not-italic tracking-wide" style={{ fontStyle: 'italic', color: '#01142a' }}>autrement</em>
            </h1>
            <p className="text-sm font-light tracking-[0.2em] mb-8" style={{ color: '#01142a', textShadow: '0 1px 1px rgba(255, 255, 255, 0.7)' }}>
              Travaillez, créez, connectez.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={openTypeform}
                className="bg-[#01142a] text-[#5c9d7a] px-8 py-4 rounded-lg hover:bg-[#5c9d7a] hover:text-[#01142a] border border-[#01142a] transition-all duration-300 text-sm tracking-widest font-light"
              >
                Réservez <ArrowRight className="ml-2 h-5 w-5 inline-block" />
              </button>
            </div>
          </div>
          <div className="mt-16 aspect-[16/9] rounded-xl overflow-hidden">
            <video 
              autoPlay 
              muted 
              loop 
              className="w-full h-full object-cover"
            >
              <source src="/Assets/Video/video/Osmoz Office_Horizontal.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                Icon: Castle,
                title: "Adresses premium et design",
                description: "Des lieux uniques, mêlant charme et modernité, pour des événements inspirants et productifs."
              },
              {
                Icon: GemIcon,
                title: "Service sur-mesure",
                description: "Une prise en charge complète, du concept à l'exécution, pour vous offrir un évenement sans stress."
              },
              {
                Icon: Warehouse,
                title: "Espaces modulables et flexibles",
                description: "Des configurations adaptables à tous vos besoins : réunions, séminaires, déjeuners ou showroom."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center px-4 group cursor-pointer"
              >
                <feature.Icon className="w-10 h-10 mx-auto mb-2 stroke-[1.5] transition-all duration-300 group-hover:scale-110" style={{ color: '#01142a' }} />
                <h3 className="text-base font-light tracking-wide mb-1 transition-all duration-300" style={{ color: '#01142a' }}>
                  {feature.title}
                </h3>
                <p className="font-light leading-relaxed text-xs transition-all duration-300" style={{ color: '#01142a' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spaces preview section */}
      <section className="pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <p className="text-sm font-light tracking-[0.2em] mb-2" style={{ color: '#01142a' }}>NOS ESPACES</p>
              <h2 className="text-3xl font-light" style={{ color: '#01142a' }}>
                Découvrez nos <em className="font-light not-italic" style={{ fontStyle: 'italic', color: '#01142a' }}>espaces</em>
              </h2>
            </div>
            <Link 
              to="/spaces"
              className="bg-[#01142a] text-[#5c9d7a] px-6 py-2.5 text-sm tracking-widest font-light hover:bg-[#5c9d7a] hover:text-[#01142a] border border-[#01142a] transition duration-300 rounded-lg flex items-center"
            >
              Voir nos espaces
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Le Loft - Salle de travail",
                description: "Un espace lumineux et moderne, parfait pour les sessions de travail collaboratif et les réunions créatives.",
                image: "/images/1_DSC4725-HDR OK.jpg"
              },
              {
                title: "Le Loft - Cuisine",
                description: "Une cuisine professionnelle équipée, idéale pour les événements culinaires et les pauses conviviales.",
                image: "/images/3_DSC4743-HDR.jpg"
              },
              {
                title: "Le Patio",
                description: "Un espace lumineux et élégant, mêlant verrières et design atypique, idéal pour vos réunions haut de gamme et sessions créatives.",
                image: "/images/22_DSC4641-HDR.jpg"
              }
            ].map((space, index) => (
              <Link 
                key={index}
                to="/spaces/loft-osmoz"
                className="block group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-light mb-2 transition-colors" style={{ color: '#01142a' }}>{space.title}</h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: '#01142a' }}>
                    {space.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}