import React, { useRef, useState, Suspense, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import posthog from 'posthog-js';

posthog.init('VOTRE_CLE_API_POSTHOG', {
  api_host: 'https://app.posthog.com',
  capture_pageview: true,
});

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth < 768) setIsMobile(true);
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleClickReserve = () => {
    posthog.capture('Click Réservez Home', {
      page: location.pathname,
      location: 'hero landing',
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {!isMobile ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/Osmoz-Optimized.webm" type="video/webm" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          ) : (
            <img
              src="/fallback-hero.jpg"
              alt="Hero fallback"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-black/30"></div>

          {!isMobile && (
            <button
              onClick={togglePlayPause}
              className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-opacity duration-300 z-10"
            >
              {isPlaying ? (
                <span className="text-white">||</span>
              ) : (
                <span className="text-white">▶</span>
              )}
            </button>
          )}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-7xl font-light mb-6 leading-tight tracking-wide text-white drop-shadow-lg">
              Des espaces à louer pour travailler <em className="font-light italic tracking-wide">autrement</em>
            </h1>
            <p className="text-lg font-light tracking-[0.2em] mb-12 text-white/90 drop-shadow-md">
              Travaillez, créez, connectez.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/contact"
                onClick={handleClickReserve}
                className="bg-[#862637] text-[#fee1d4] px-10 py-5 rounded-lg hover:bg-[#fee1d4] hover:text-[#862637] border-2 border-transparent transition duration-300 text-lg tracking-widest font-light shadow-lg hover:shadow-xl"
              >
                Réservez <ArrowRight className="ml-2 h-5 w-5 inline-block" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Adresses premium et design",
                description: "Des lieux uniques, mêlant charme et modernité, pour des événements inspirants et productifs.",
                icon: '/icons/castle.svg'
              },
              {
                title: "Service sur-mesure",
                description: "Une prise en charge complète, du concept à l'exécution, pour vous offrir un évenement sans stress.",
                icon: '/icons/gem.svg'
              },
              {
                title: "Espaces modulables et flexibles",
                description: "Des configurations adaptables à tous vos besoins : réunions, séminaires, déjeuners ou showroom.",
                icon: '/icons/warehouse.svg'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center px-4 group cursor-pointer"
              >
                <img src={feature.icon} alt="" className="w-10 h-10 mx-auto mb-2" loading="lazy" />
                <h3 className="text-base font-light tracking-wide mb-1 text-[#01142a]">
                  {feature.title}
                </h3>
                <p className="font-light leading-relaxed text-xs text-[#01142a]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spaces Preview Section */}
      <section className="pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <p className="text-sm font-light tracking-[0.2em] mb-2 text-[#01142a]">NOS ESPACES</p>
              <h2 className="text-3xl font-light text-[#01142a]">
                Découvrez nos <em className="font-light italic text-[#01142a]">espaces</em>
              </h2>
            </div>
            <Link
              to="/spaces"
              className="bg-[#862637] text-[#fee1d4] px-6 py-2.5 text-sm tracking-widest font-light hover:bg-[#fee1d4] hover:text-[#862637] border border-transparent transition duration-300 rounded-lg flex items-center"
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
                image: "/images/1_DSC4725-HDR OK.jpg",
                link: "/spaces/loft-osmoz"
              },
              {
                title: "Le Loft - Cuisine",
                description: "Une cuisine professionnelle équipée, idéale pour les événements culinaires et les pauses conviviales.",
                image: "/images/3_DSC4743-HDR.jpg",
                link: "/spaces/loft-osmoz"
              },
              {
                title: "Le Patio",
                description: "Un espace lumineux et élégant, mêlant verrières et design atypique, idéal pour vos réunions haut de gamme et sessions créatives.",
                image: "/images/patio/patio.salon-vue-complete.jpeg",
                link: "/spaces/patio-osmoz"
              }
            ].map((space, index) => (
              <Link
                key={index}
                to={space.link}
                className="block group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-light mb-2 text-[#01142a]">{space.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-[#01142a]">
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
