// @ts-expect-error: React import needed for JSX (even if unused in strict TS)
import React, { useRef, useEffect } from 'react';
import { ArrowRight, Castle, GemIcon, Warehouse } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';

posthog.init('phc_5Ji4D4oRaqsu6fJijIcdmvwPyZLxRaYua4MUqqZ0FOc', {
  api_host: 'https://app.posthog.com',
  capture_pageview: true,
});

function ClientLogos() {
  const logos = [
    "/logos/google.svg",
    "/logos/sncf.svg",
    "/logos/generali.svg",
    "/logos/swisslife.svg",
    "/logos/arkema.svg",
    "/logos/smartbox.svg",
    "/logos/dataiku.svg",
    "/logos/quicksign.svg",
    "/logos/pickup.svg",
    "/logos/bayard.svg",
    "/logos/mnstr.svg",
    "/logos/veesion.svg",
    "/logos/lavie.svg",
  ];

  return (
    <section className="bg-[#fbfbf3] py-10 border-t border-[#e5e5e5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-light uppercase text-[#01142a] tracking-widest mb-6">
          Ils nous font confiance
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {logos.concat(logos).map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Logo ${idx}`}
                className="h-10 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure mobile inline autoplay (iOS/Android)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    // extra safety for older iOS
    v.setAttribute('playsinline', 'true');
    const p = v.play?.();
    if (p && typeof (p as Promise<void>).catch === 'function') {
      (p as Promise<void>).catch(() => {
        // If autoplay is blocked, poster will show; no UI needed.
      });
    }
  }, []);

  const handleClickReserve = () => {
    posthog.capture('Click Réservez Home', {
      page: location.pathname,
      location: 'hero landing',
    });
    setTimeout(() => navigate('/contact'), 200);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/fallback-hero.jpg"
            className="w-full h-full object-cover"
          >
            {/* Keep MP4 (H.264) for iOS; WebM optional if you have it */}
            <source src="/Osmoz Office_Horizontal.mp4.mp4" type="video/mp4" />
            {/* <source src="/Osmoz Office_Horizontal.webm" type="video/webm" /> */}
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
          <div className="absolute inset-0 bg-black/30" />
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
              <button
                onClick={handleClickReserve}
                className="bg-[#862637] text-[#fee1d4] px-10 py-5 rounded-lg hover:bg-[#fee1d4] hover:text-[#862637] border-2 border-transparent transition duration-300 text-lg tracking-widest font-light shadow-lg hover:shadow-xl"
              >
                Réservez <ArrowRight className="ml-2 h-5 w-5 inline-block" />
              </button>
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
                Icon: Castle,
                title: "Comme à la maison mais en mieux",
                description: "Des lieux uniques pour sortir du bureau sans perdre en efficacité",
              },
              {
                Icon: GemIcon,
                title: "Service sur-mesure",
                description: "Une prise en charge complète, du concept à l'exécution, pour vous offrir un évenement sans stress.",
              },
              {
                Icon: Warehouse,
                title: "Espaces modulables et flexibles",
                description: "Des configurations adaptables à tous vos besoins : réunions, séminaires, déjeuners ou showroom.",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center px-4 group cursor-pointer">
                <feature.Icon className="w-10 h-10 mx-auto mb-2 stroke-[1.5] text-[#01142a]" />
                <h3 className="text-base font-light tracking-wide mb-1 text-[#01142a]">{feature.title}</h3>
                <p className="font-light leading-relaxed text-xs text-[#01142a]">{feature.description}</p>
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
                title: "Le Loft",
                description:
                  "Un espace lumineux et moderne, parfait pour des sessions de travail et des réunions créatives.",
                image: "/images/1_DSC4725-HDR OK.jpg",
                link: "/spaces/loft-osmoz",
                isComingSoon: false,
              },
              {
                title: "Le Duplex Haussmannien",
                description:
                  "Élégant et lumineux, idéal pour réunions, ateliers, tournages, moulures parquet au cœur de Paris.",
                image: "images/Duplex Haussmannien/1 Salon Normal 3.jpg",
                link: "/spaces/duplex-osmoz",
                isComingSoon: false,
              },
              {
                title: "L'Orangerie",
                description:
                  "Un espace lumineux et élégant, mêlant verrières et design atypique, idéal pour vos réunions haut de gamme et sessions créatives.",
                image: "/images/patio/patio.salon-vue-complete.jpeg",
                link: "/spaces/duplex-osmoz",
                isComingSoon: true,
              },
            ].map((space, index) => (
              <div key={index} className="relative">
                {space.isComingSoon ? (
                  <div className="block group bg-white rounded-lg overflow-hidden shadow-sm relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={space.image}
                        alt={space.title}
                        className="w-full h-full object-cover blur-sm"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-white text-xl font-light tracking-widest">
                            COMING SOON
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 opacity-60">
                      <h3 className="text-lg font-light mb-2 text-[#01142a]">{space.title}</h3>
                      <p className="text-sm font-light leading-relaxed text-[#01142a]">{space.description}</p>
                    </div>
                  </div>
                ) : (
                  <Link
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
                      <p className="text-sm font-light leading-relaxed text-[#01142a]">{space.description}</p>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau Logos Clients */}
      <ClientLogos />
    </>
  );
}