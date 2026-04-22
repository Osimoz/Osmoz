import React, { useRef, useEffect } from 'react';
import { Users, Lightbulb, UtensilsCrossed, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NewsletterSection from '../components/NewsletterSection';

const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);

// ─── CLIENT LOGOS ─────────────────────────────────────────────────────────────
const logos: string[] = [
  u('images/logos/google.svg'),
  u('images/logos/sncf.svg'),
  u('images/logos/generali.svg'),
  u('images/logos/swisslife.svg'),
  u('images/logos/arkema.svg'),
  u('images/logos/bayard.svg'),
  u('images/logos/dataiku.svg'),
  u('images/logos/quicksign.svg'),
  u('images/logos/kactus.png'),
  u('images/logos/lavie.svg'),
];

function ClientLogos() {
  return (
    <section className="bg-[#fbfbf3] py-12 border-t border-b border-[#e5e5e5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-normal uppercase text-gray-400 tracking-[0.3em] mb-8">
          Ils nous font confiance
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-12 animate-marquee-fast whitespace-nowrap">
            {logos.concat(logos).map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Logo client Osmoz ${idx + 1}`}
                loading="lazy"
                className="h-8 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition duration-300 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const spaces = [
  {
    tag: 'Marais · Paris 3e',
    title: 'Le Loft',
    stats: '110 m² · 25 personnes',
    pills: ['Réunion', 'Séminaire', 'Workshop', 'Tournage'],
    image: u('images/Loft/2 Salon pleiniere 2.jpg'),
    alt: 'Le Loft Osmoz – salon avec verrière, Paris Marais 3e',
    link: '/spaces/loft-osmoz',
  },
  {
    tag: 'Montmartre · Paris 2e',
    title: 'Le Duplex',
    stats: '300 m² · 40 personnes',
    pills: ['Réunion', 'Conférence', 'Cocktail', 'Séminaire'],
    image: u('images/Duplex Haussmannien/duplex-salon-01.png'),
    alt: 'Le Duplex Haussmannien Osmoz – salon moulures parquet Paris 2e',
    link: '/spaces/duplex-osmoz',
  },
  {
    tag: 'La Défense · Puteaux',
    title: 'Le Penthouse',
    stats: '150 m² + jardin 350 m² · 40 personnes',
    pills: ['Réunion', 'Cocktail', 'Séminaire', 'Vue panoramique'],
    image: u('images/Penthouse/2 - Salon.jpg'),
    alt: 'Le Penthouse Osmoz – espace panoramique La Défense Puteaux',
    link: '/spaces/penthouse-osmoz',
  },
];

const useCases = [
  {
    Icon: Users,
    title: 'Réunions & séminaires',
    description:
      "De 5 à 40 personnes, dans un cadre qui sort de l'ordinaire. Mobilier modulable, équipements pro inclus.",
  },
  {
    Icon: Lightbulb,
    title: 'Ateliers & workshops',
    description:
      "Des espaces qui s'organisent selon vos besoins. Table en U, îlots, plénière — on prépare tout à l'avance.",
  },
  {
    Icon: UtensilsCrossed,
    title: 'Cocktails & déjeuners',
    description:
      'Un panel de services sur mesure\u00a0: traiteur, chef privé, activités pour que chaque journée soit vraiment la vôtre.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Choisissez votre espace',
    description:
      'Parcourez nos trois lieux à Paris et trouvez celui qui correspond à votre équipe et à votre format.',
  },
  {
    number: '02',
    title: 'Envoyez votre demande',
    description:
      'Quelques lignes suffisent. Nous revenons vers vous sous quelques heures avec les disponibilités et un devis.',
  },
  {
    number: '03',
    title: 'Profitez de votre journée',
    description:
      "Vous arrivez, on a tout préparé. Échangez, créez, formez-vous, célébrez.",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function HomeV2() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute('playsinline', 'true');
    const playPromise = v.play?.();
    if (playPromise && typeof (playPromise as Promise<void>).catch === 'function') {
      (playPromise as Promise<void>).catch(() => {
        /* autoplay blocked: poster s'affiche */
      });
    }
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Osmoz',
    description:
      "Location d'espaces atypiques à Paris pour séminaires, réunions et workshops. Exclusivement pour les entreprises.",
    url: 'https://osmoz.work',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    priceRange: '€€€',
  };

  return (
    <>
      <Helmet>
        <title>OSMOZ — Location d'espaces atypiques à Paris | Séminaires, Réunions, Workshops</title>
        <meta
          name="description"
          content="Privatisez un espace atypique à Paris pour vos réunions, séminaires et workshops. Le Loft (Marais), Le Duplex (Paris 2e), Le Penthouse (La Défense). Exclusivement pour les entreprises."
        />
        <link rel="canonical" href="https://osmoz.work/" />
        <meta property="og:title" content="OSMOZ — Location d'espaces atypiques à Paris" />
        <meta
          property="og:description"
          content="Privatisez un espace atypique à Paris pour vos réunions, séminaires et workshops. Exclusivement pour les entreprises."
        />
        <meta
          property="og:image"
          content="https://osmoz.work/images/Loft/2%20Salon%20pleiniere%202.jpg"
        />
        <meta property="og:url" content="https://osmoz.work/" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── 1. HERO ── */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src="/Osmoz Office_Horizontal.mp4.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content — left-aligned, bottom */}
        <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-12 pb-16 sm:pb-20 max-w-7xl mx-auto w-full">
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-4">
            Paris · Marais · La Défense
          </p>
          <h1
            className="text-white font-light leading-tight mb-6 max-w-3xl"
            style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            Vos lieux. Votre journée.
          </h1>
          <p className="text-white/70 font-normal text-base sm:text-lg mb-10 max-w-xl leading-relaxed">
            Séminaires, réunions, workshops.
            <br className="hidden sm:block" />
            Privatisation à la journée, exclusivement pour les entreprises.
          </p>
          <div>
            <button
              onClick={() => navigate('/reservation')}
              className="bg-[#862637] text-[#fee1d4] px-8 sm:px-10 py-4 text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-white hover:text-[#01142a] transition-all duration-300 inline-flex items-center gap-2"
            >
              Voir les disponibilités
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. CLIENT LOGOS ── */}
      <ClientLogos />

      {/* ── 4. SPACES ── */}
      <section className="py-24 sm:py-32 bg-[#fbfbf3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14 sm:mb-16">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 mb-3">
              Nos espaces
            </p>
            <h2
              className="font-normal text-[#01142a] max-w-xl"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Trois lieux. Une seule promesse.
            </h2>
            <p className="text-sm font-light text-gray-500 mt-3">
              Privatisation exclusive à la journée pour vos équipes.
            </p>
          </div>

          {/* 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Active space cards */}
            {spaces.map((space) => (
              <Link
                key={space.title}
                to={space.link}
                className="group block rounded-2xl overflow-hidden border border-[#e5e5e5] hover:border-[#01142a]/20 hover:shadow-2xl transition-all duration-500 bg-white"
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={space.image}
                    alt={space.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white text-white text-xs tracking-[0.2em] uppercase px-6 py-3 rounded-lg">
                      Voir l'espace
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">{space.tag}</p>
                  <h3
                    className="text-xl font-normal text-[#01142a] mb-1"
                    style={{ fontFamily: 'Playfair Display' }}
                  >
                    {space.title}
                  </h3>
                  <p className="text-sm font-light text-gray-500 mb-4">{space.stats}</p>
                  <div className="flex flex-wrap gap-2">
                    {space.pills.map((pill) => (
                      <span
                        key={pill}
                        className="text-xs font-light px-3 py-1 rounded-full border border-[#e5e5e5] text-gray-500"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}

            {/* Coming soon card */}
            <div className="rounded-2xl overflow-hidden border border-[#e5e5e5] bg-white">
              {/* Image with blur + overlay */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={u('images/Loft/2 Salon pleiniere 2.jpg')}
                  alt="Prochain espace Osmoz – bientôt disponible"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover blur-md scale-105"
                />
                <div className="absolute inset-0 bg-[#01142a]/70" />
                {/* Badge */}
                <span className="absolute top-4 right-4 bg-[#862637] text-[#fee1d4] text-xs px-3 py-1 rounded-full font-light tracking-wide">
                  Bientôt disponible
                </span>
              </div>
              {/* Content */}
              <div className="p-6">
                <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">Paris · 2026</p>
                <h3
                  className="text-xl font-normal text-[#01142a] mb-3"
                  style={{ fontFamily: 'Playfair Display' }}
                >
                  Prochain espace Osmoz
                </h3>
                <p className="text-sm font-light text-gray-500 mb-5 leading-relaxed">
                  Un nouveau lieu arrive en 2026. Rejoignez la liste d'attente pour être les premiers informés.
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-[#862637] text-[#fee1d4] text-xs tracking-[0.2em] uppercase px-6 py-3 rounded-lg hover:bg-[#01142a] transition-all duration-300"
                >
                  Être prévenu en priorité
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />

      {/* ── 5. USE CASES ── */}
      <section className="py-24 sm:py-32 bg-white border-t border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14 sm:mb-16">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 mb-3">
              Pour quels moments
            </p>
            <h2
              className="font-normal text-[#01142a]"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Chaque espace s'adapte à votre format.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="border border-[#e5e5e5] rounded-2xl p-8 sm:p-10 bg-white hover:shadow-md transition-all duration-300"
              >
                <item.Icon className="h-6 w-6 text-[#862637] mb-6" strokeWidth={1.5} />
                <h3
                  className="text-lg font-normal text-[#01142a] mb-3"
                  style={{ fontFamily: 'Playfair Display' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm font-light text-gray-500 leading-loose">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. MID-PAGE CTA BAND ── */}
      <section className="bg-[#01142a] py-24 sm:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-light italic text-white max-w-2xl mx-auto mb-4"
            style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Votre prochaine journée d'équipe commence ici.
          </h2>
          <p className="text-white/50 font-light mb-10 text-sm">
            Disponibilités, devis et confirmation en moins de 24h.
          </p>
          <button
            onClick={() => navigate('/reservation')}
            className="bg-white text-[#01142a] px-10 sm:px-12 py-4 text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-[#862637] hover:text-[#fee1d4] transition-all duration-300"
          >
            Voir les disponibilités
          </button>
        </div>
      </section>

      {/* ── 7. HOW IT WORKS ── */}
      <section className="py-24 sm:py-32 bg-[#fbfbf3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14 sm:mb-16">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 mb-3">
              Simple & rapide
            </p>
            <h2
              className="font-normal text-[#01142a]"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`py-10 md:py-0 md:px-10 ${
                  i > 0
                    ? 'border-t border-[#e5e5e5] md:border-t-0 md:border-l md:border-[#e5e5e5]'
                    : ''
                }`}
              >
                <p
                  className="font-light text-[#01142a]/10 leading-none mb-4"
                  style={{ fontFamily: 'Playfair Display', fontSize: '5rem' }}
                >
                  {step.number}
                </p>
                <h3 className="text-base font-normal text-[#01142a] mb-2">{step.title}</h3>
                <p className="text-sm font-light text-gray-400 leading-loose">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA ── */}
      <section className="py-24 sm:py-32 bg-white border-t border-[#e5e5e5] text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 mb-4">Osmoz</p>
          <h2
            className="font-normal text-[#01142a] max-w-2xl mx-auto mb-10"
            style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Prêt à sortir du bureau ?
          </h2>
          <button
            onClick={() => navigate('/reservation')}
            className="bg-[#862637] text-[#fee1d4] px-10 sm:px-12 py-4 text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-[#01142a] transition-all duration-300"
          >
            Réserver un espace
          </button>
        </div>
      </section>
    </>
  );
}
