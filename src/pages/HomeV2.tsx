import { useRef, useEffect } from 'react';
import { Users, Lightbulb, UtensilsCrossed, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { useLocale } from '../i18n/context';
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
  const { t } = useLocale();
  return (
    <section className="bg-[#fbfbf3] py-12 border-t border-b border-[#e5e5e5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-normal uppercase text-gray-400 tracking-[0.3em] mb-8">
          {t.home.logos.kicker}
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-12 animate-marquee-fast whitespace-nowrap">
            {logos.concat(logos).map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${t.home.logos.alt} ${idx + 1}`}
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

// Le texte (tag, titre, pills, alt) vient de t.home.spaces[key].
const spaces = [
  { key: 'loft', image: u('images/Loft/2 Salon pleiniere 2.jpg'), link: '/spaces/loft-osmoz' },
  { key: 'duplex', image: u('images/Duplex Haussmannien/webp/duplex-salon-01.webp'), link: '/spaces/duplex-osmoz' },
  { key: 'penthouse', image: u('images/Penthouse/2 - Salon.jpg'), link: '/spaces/penthouse-osmoz' },
] as const;

// Une icône par cas d'usage, dans l'ordre de t.home.useCases.
const useCaseIcons = [Users, Lightbulb, UtensilsCrossed];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function HomeV2() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { t, p } = useLocale();
  const h = t.home;

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
    name: 'OSMOZ',
    description: h.jsonLd.description,
    url: 'https://osmoz-space.com',
    logo: 'https://osmoz-space.com/logo.png',
    image: 'https://osmoz-space.com/images/Loft/2%20Salon%20pleiniere%202.jpg',
    telephone: '+33675186932',
    email: 'contact@osmoz-space.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 48.8566, longitude: 2.3522 },
    openingHours: 'Mo-Fr 08:00-22:00',
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: h.jsonLd.paymentAccepted,
    hasMap: 'https://maps.google.com/?q=Paris+France',
    sameAs: [
      'https://www.instagram.com/osmoz_space',
      'https://www.linkedin.com/company/osmoz',
    ],
    makesOffer: [
      { '@type': 'Offer', name: 'Le Loft OSMOZ', description: h.jsonLd.offers.loft, url: `https://osmoz-space.com${p('/spaces/loft-osmoz')}` },
      { '@type': 'Offer', name: 'Le Duplex Haussmannien OSMOZ', description: h.jsonLd.offers.duplex, url: `https://osmoz-space.com${p('/spaces/duplex-osmoz')}` },
      { '@type': 'Offer', name: 'Le Penthouse OSMOZ', description: h.jsonLd.offers.penthouse, url: `https://osmoz-space.com${p('/spaces/penthouse-osmoz')}` },
    ],
  };

  const homeFaqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: h.jsonLd.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <SEO route="home" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(homeFaqLd)}</script>
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
            {h.hero.kicker}
          </p>
          <h1
            className="text-white font-light leading-tight mb-6 max-w-3xl"
            style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            {h.hero.title}
          </h1>
          <p className="text-white/70 font-normal text-base sm:text-lg mb-10 max-w-xl leading-relaxed">
            {h.hero.line1}
            <br className="hidden sm:block" />
            {h.hero.line2}
          </p>
          <div>
            <button
              onClick={() => navigate(p('/reservation'))}
              className="bg-[#862637] text-[#fee1d4] px-8 sm:px-10 py-4 text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-white hover:text-[#01142a] transition-all duration-300 inline-flex items-center gap-2"
            >
              {h.hero.cta}
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
              {h.spacesSection.kicker}
            </p>
            <h2
              className="font-normal text-[#01142a] max-w-xl"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {h.spacesSection.title}
            </h2>
            <p className="text-sm font-light text-gray-500 mt-3">
              {h.spacesSection.subtitle}
            </p>
          </div>

          {/* 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Active space cards */}
            {spaces.map((space) => {
              const s = h.spaces[space.key];
              return (
              <Link
                key={space.key}
                to={p(space.link)}
                className="group block rounded-2xl overflow-hidden border border-[#e5e5e5] hover:border-[#01142a]/20 hover:shadow-2xl transition-all duration-500 bg-white"
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={space.image}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white text-white text-xs tracking-[0.2em] uppercase px-6 py-3 rounded-lg">
                      {h.spacesSection.view}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">{s.tag}</p>
                  <h3
                    className="text-xl font-normal text-[#01142a] mb-1"
                    style={{ fontFamily: 'Playfair Display' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm font-light text-gray-500 mb-4">{s.stats}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.pills.map((pill) => (
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
              );
            })}

            {/* Coming soon card */}
            <div className="rounded-2xl overflow-hidden border border-[#e5e5e5] bg-white">
              {/* Image with blur + overlay */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={u('images/Loft/2 Salon pleiniere 2.jpg')}
                  alt={h.comingSoon.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover blur-md scale-105"
                />
                <div className="absolute inset-0 bg-[#01142a]/70" />
                {/* Badge */}
                <span className="absolute top-4 right-4 bg-[#862637] text-[#fee1d4] text-xs px-3 py-1 rounded-full font-light tracking-wide">
                  {h.comingSoon.badge}
                </span>
              </div>
              {/* Content */}
              <div className="p-6">
                <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">{h.comingSoon.tag}</p>
                <h3
                  className="text-xl font-normal text-[#01142a] mb-3"
                  style={{ fontFamily: 'Playfair Display' }}
                >
                  {h.comingSoon.title}
                </h3>
                <p className="text-sm font-light text-gray-500 mb-5 leading-relaxed">
                  {h.comingSoon.text}
                </p>
                <button
                  onClick={() => navigate(p('/contact'))}
                  className="bg-[#862637] text-[#fee1d4] text-xs tracking-[0.2em] uppercase px-6 py-3 rounded-lg hover:bg-[#01142a] transition-all duration-300"
                >
                  {h.comingSoon.cta}
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
              {h.useCasesSection.kicker}
            </p>
            <h2
              className="font-normal text-[#01142a]"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {h.useCasesSection.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {h.useCases.map((item, i) => {
              const Icon = useCaseIcons[i];
              return (
              <div
                key={item.title}
                className="border border-[#e5e5e5] rounded-2xl p-8 sm:p-10 bg-white hover:shadow-md transition-all duration-300"
              >
                <Icon className="h-6 w-6 text-[#862637] mb-6" strokeWidth={1.5} />
                <h3
                  className="text-lg font-normal text-[#01142a] mb-3"
                  style={{ fontFamily: 'Playfair Display' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm font-light text-gray-500 leading-loose">{item.description}</p>
              </div>
              );
            })}
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
            {h.ctaBand.title}
          </h2>
          <p className="text-white/50 font-light mb-10 text-sm">
            {h.ctaBand.subtitle}
          </p>
          <button
            onClick={() => navigate(p('/reservation'))}
            className="bg-white text-[#01142a] px-10 sm:px-12 py-4 text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-[#862637] hover:text-[#fee1d4] transition-all duration-300"
          >
            {h.ctaBand.cta}
          </button>
        </div>
      </section>

      {/* ── 7. HOW IT WORKS ── */}
      <section className="py-24 sm:py-32 bg-[#fbfbf3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14 sm:mb-16">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 mb-3">
              {h.how.kicker}
            </p>
            <h2
              className="font-normal text-[#01142a]"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {h.how.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {h.steps.map((step, i) => (
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
          <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 mb-4">{h.finalCta.kicker}</p>
          <h2
            className="font-normal text-[#01142a] max-w-2xl mx-auto mb-10"
            style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {h.finalCta.title}
          </h2>
          <button
            onClick={() => navigate(p('/reservation'))}
            className="bg-[#862637] text-[#fee1d4] px-10 sm:px-12 py-4 text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-[#01142a] transition-all duration-300"
          >
            {h.finalCta.cta}
          </button>
        </div>
      </section>
    </>
  );
}
