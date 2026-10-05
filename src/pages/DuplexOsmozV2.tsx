import { useState, useEffect } from 'react';
import {
  MapPin, Users, Maximize2, Coffee,
  Wifi, Tv, UtensilsCrossed, Presentation, ChevronRight
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { useLocale } from '../i18n/context';
import ImageGallery from '../components/ImageGallery';
import { srcSet, SIZES } from '../lib/responsiveImage';

const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);
const D = 'images/Duplex Haussmannien/webp/';

// ─── DATA ────────────────────────────────────────────────────────────────────

const platforms = [
  { name: 'Kactus',       url: 'https://www.kactus.com/fr/lieux/duplex-osmoz',       logo: u('images/logos/kactus.png') },
  { name: 'Officeriders', url: 'https://www.officeriders.com/fr/salles/duplex-osmoz', logo: u('images/logos/or.png') },
  { name: 'ABC Salles',   url: 'https://www.abcsalles.com/lieu/duplex-osmoz',         logo: u('images/logos/abcsalles.png') },
  { name: 'Naboo',        url: 'https://www.naboo.app/explorer/houses/duplex-osmoz',  logo: u('images/logos/naboo.jpeg') },
  { name: 'Rejolt',       url: 'https://www.rejolt.com',                              logo: null },
];

// Le texte vient de t.duplex / t.venue ; ne restent ici que les valeurs non
// textuelles (icônes, images, capacités, liens), dans le même ordre.
const amenityIcons = [Wifi, Tv, Coffee, UtensilsCrossed, Tv, Presentation, Maximize2, Tv];

const configurations = [
  { capacity: 20, image: u(`${D}duplex-reunion-01.webp`) },
  { capacity: 30, image: u(`${D}duplex-salon-06.webp`) },
  { capacity: 25, image: u(`${D}duplex-reunion-04.webp`) },
  { capacity: 40, image: u(`${D}duplex-salon-01.webp`) },
];

// ─── GALERIE PREVIEW (libellés et alt dans t.duplex.gallery, même ordre) ─────
const galleryUrls = [
  u(`${D}duplex-salon-01.webp`),
  u(`${D}duplex-cuisine-01.webp`),
  u(`${D}duplex-salle-reunion-01.webp`),
  u(`${D}duplex-reunion-01.webp`),
  u(`${D}duplex-diner-01.webp`),
  u(`${D}duplex-entree-01.webp`),
  u(`${D}duplex-ambiance-01.webp`),
  u(`${D}duplex-facade-01.webp`),
];

// ─── TOUTES LES IMAGES LIGHTBOX ──────────────────────────────────────────────
// alt = « <pièce> vue <n> » (t.duplex.rooms / t.duplex.view), ou la pièce seule.
type Room = 'salon' | 'salonEtage' | 'cuisine' | 'salleReunion' | 'reunion' | 'diner' | 'entree' | 'ambiance' | 'facade';
const photos: { file: string; room: Room; n?: number }[] = [
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({ file: `duplex-salon-0${n}.webp`, room: 'salon' as const, n })),
  { file: 'duplex-salon-etage-01.webp', room: 'salonEtage', n: 1 },
  { file: 'duplex-salon-etage-02.webp', room: 'salonEtage', n: 2 },
  ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ file: `duplex-cuisine-0${n}.webp`, room: 'cuisine' as const, n })),
  ...[1, 2, 3, 4, 5].map((n) => ({ file: `duplex-salle-reunion-0${n}.webp`, room: 'salleReunion' as const, n })),
  ...[1, 2, 3, 4, 5, 6].map((n) => ({ file: `duplex-reunion-0${n}.webp`, room: 'reunion' as const, n })),
  ...[1, 2, 3, 4, 5].map((n) => ({ file: `duplex-diner-0${n}.webp`, room: 'diner' as const, n })),
  { file: 'duplex-entree-01.webp', room: 'entree', n: 1 },
  { file: 'duplex-entree-02.webp', room: 'entree', n: 2 },
  { file: 'duplex-ambiance-01.webp', room: 'ambiance' },
  { file: 'duplex-facade-01.webp', room: 'facade' },
];

// ─── CROSS-SELL ──────────────────────────────────────────────────────────────
const otherSpaces = [
  { key: 'loft', image: u('images/Loft/2 Salon pleiniere 2.jpg'), link: '/spaces/loft-osmoz' },
  { key: 'penthouse', image: u('images/Penthouse/2 - Salon.jpg'), link: '/spaces/penthouse-osmoz' },
] as const;

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function DuplexOsmozV2() {
  const navigate = useNavigate();
  const { t, p } = useLocale();
  const d = t.duplex;
  const v = t.venue;
  const abs = (frPath: string) => `https://osmoz-space.com${p(frPath)}`;
  const galleryItems = galleryUrls.map((url, i) => ({ url, ...d.gallery[i] }));
  const allImages = photos.map(({ file, room, n }) => ({
    url: u(`${D}${file}`),
    alt: n ? `${d.rooms[room]} ${d.view} ${n}` : d.rooms[room],
  }));
  const [activeConfig, setActiveConfig] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsStatsVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Le Duplex Haussmannien OSMOZ',
    description: d.jsonLd.description,
    url: abs('/spaces/duplex-osmoz'),
    image: 'https://osmoz-space.com/images/Duplex%20Haussmannien/1%20Salon%20Normal%203.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '146 rue Montmartre',
      addressLocality: 'Paris',
      postalCode: '75002',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 48.8672, longitude: 2.3456 },
    maximumAttendeeCapacity: 40,
    amenityFeature: d.jsonLd.amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    offers: [
      { '@type': 'Offer', ...d.jsonLd.offers[0], price: '1499', priceCurrency: 'EUR' },
      { '@type': 'Offer', ...d.jsonLd.offers[1], price: '2499', priceCurrency: 'EUR' },
    ],
    telephone: '+33675186932',
    email: 'contact@osmoz-space.com',
    openingHours: 'Mo-Fr 08:00-22:00',
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: v.jsonLd.paymentAccepted,
    isAccessibleForFree: false,
    publicAccess: false,
    smokingAllowed: false,
  };

  const duplexBreadcrumbFaqLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: v.jsonLd.home, item: abs('/') },
          { '@type': 'ListItem', position: 2, name: v.jsonLd.spaces, item: abs('/spaces') },
          { '@type': 'ListItem', position: 3, name: d.jsonLd.breadcrumb, item: abs('/spaces/duplex-osmoz') },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: d.jsonLd.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return (
    <div className="pt-0">

      {/* ── SEO ── */}
      <SEO route="duplex" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(duplexBreadcrumbFaqLd)}</script>
        <link rel="preload" as="image" href={u(`${D}duplex-salon-01.webp`)} />
      </Helmet>

      {/* ── 1. HERO ── */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img
          src={u(`${D}duplex-salon-01.webp`)}
          alt={d.heroAlt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 px-4 text-center">
          <p className="text-white/60 font-normal tracking-[0.3em] text-xs mb-4 uppercase">
            {d.kicker}
          </p>
          <h1
            className="t-h1 text-hero text-white mb-4"
          >
            {d.name}
          </h1>
          <p className="text-white/70 font-light tracking-[0.15em] text-sm mb-10 uppercase">
            {d.location}
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {d.pills.map((pill) => (
              <span
                key={pill}
                className="bg-white/10 backdrop-blur-sm text-white border border-white/25 px-4 py-1.5 rounded-full text-xs font-light tracking-widest uppercase"
              >
                {pill}
              </span>
            ))}
          </div>

          <button
            onClick={() => navigate(p('/reservation?space=duplex'))}
            className="btn-label bg-white text-[#01142a] px-12 py-4 rounded-lg text-xs uppercase hover:bg-[#862637] hover:text-[#fee1d4] border border-white transition-all duration-300"
          >
            {v.book}
          </button>
        </div>
      </section>

      {/* ── 2. STICKY STATS BAR ──
          Calée sous le header (72px de haut, z-50) : elle glisse de derrière
          lui et se pose juste en dessous. Masquée, elle ne capte aucun clic. */}
      <div
        className={`fixed top-[72px] left-0 right-0 z-40 bg-[#fbfbf3]/95 backdrop-blur-sm border-b border-[#e5e5e5] shadow-sm transition-all duration-500 ${
          isStatsVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="tnum flex items-center gap-6 text-xs font-light text-[#01142a] tracking-wide uppercase">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="h-3 w-3" />{d.stats.surface}
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Users className="h-3 w-3" />{d.stats.people}
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />{d.stats.address}
            </span>
          </div>
          <button
            onClick={() => navigate(p('/reservation?space=duplex'))}
            className="btn-label bg-[#862637] text-[#fee1d4] px-5 py-2 rounded-lg text-xs uppercase hover:bg-[#fee1d4] hover:text-[#862637] transition duration-300 whitespace-nowrap"
          >
            {v.quote}
          </button>
        </div>
      </div>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-[#e5e5e5] px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <p className="text-xs font-light text-gray-400 uppercase tracking-widest">{v.from}</p>
          <p className="t-figure text-lg text-[#01142a]">{d.price}</p>
        </div>
        <button
          onClick={() => navigate(p('/reservation?space=duplex'))}
          className="btn-label bg-[#862637] text-[#fee1d4] px-6 py-3 rounded-lg text-xs uppercase flex-1 max-w-[200px]"
        >
          {v.book}
        </button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-28 lg:pb-20">
        <div className="space-y-24">

          {/* ── 3. DESCRIPTION + GALERIE ── */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start mb-8">
              <div>
                <p
                  className="t-quote text-2xl text-[#01142a] mb-6 leading-loose"
                >
                  {d.intro.quote}
                </p>
                <p className="text-sm font-light leading-loose text-gray-500 mb-8">
                  {d.intro.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {d.intro.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#01142a]/15 text-[#01142a] text-xs font-light px-3 py-1.5 rounded-full hover:border-[#01142a]/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Horizontal gallery strip ── */}
            <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
              {galleryItems.map((img, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-64 sm:w-80 aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group snap-start"
                  onClick={() => { const idx = allImages.findIndex(a => a.url === img.url); openGallery(idx >= 0 ? idx : 0); }}
                >
                  <img
                    src={img.url}
                    srcSet={srcSet(img.url)}
                    sizes={SIZES.galleryStrip}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs font-light px-2 py-0.5 rounded">
                    {img.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => openGallery(0)}
              className="btn-label mt-8 inline-flex items-center gap-2 text-xs text-[#01142a] uppercase underline underline-offset-4 hover:text-[#862637] transition-colors"
            >
              {v.allPhotos}
              <span className="text-gray-400">({allImages.length})</span>
            </button>
          </section>

          {/* ── 4. CONFIGURATIONS ── */}
          <section>
            <div className="mb-10">
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{d.configurationsKicker}</p>
              <h2
                className="t-h2 text-h3 text-[#01142a]"
              >
                {v.configurations.title}
              </h2>
            </div>

            <div className="flex gap-2 mb-10 flex-wrap">
              {d.configurations.map((c, i) => (
                <button
                  key={c.label}
                  onClick={() => setActiveConfig(i)}
                  className={`px-5 py-2 rounded-full text-xs font-normal tracking-widest uppercase transition-all duration-200 ${
                    activeConfig === i
                      ? 'bg-[#01142a] text-white'
                      : 'bg-white border border-[#01142a]/15 text-[#01142a] hover:border-[#01142a]/40'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#f5f5f0]">
                <img
                  src={configurations[activeConfig].image}
                  srcSet={srcSet(configurations[activeConfig].image)}
                  sizes={SIZES.halfColumn}
                  alt={`${d.configurationAltBefore}${d.configurations[activeConfig].label}${d.configurationAltAfter}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
              <div>
                <p
                  className="t-key text-5xl text-[#01142a] mb-1"
                >
                  {configurations[activeConfig].capacity}
                </p>
                <p className="text-xs font-light text-gray-400 mb-6 uppercase tracking-widest">
                  {v.people} · {d.configurations[activeConfig].label}
                </p>
                <p className="text-sm font-light text-gray-500 leading-loose">
                  {d.configurations[activeConfig].description}
                </p>
              </div>
            </div>
          </section>

          {/* ── 5. ÉQUIPEMENTS ── */}
          <section>
            <div className="mb-10">
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{d.amenitiesKicker}</p>
              <h2
                className="t-h2 text-h3 text-[#01142a]"
              >
                {v.amenities.title}
              </h2>
            </div>

            <p className="text-xs font-light uppercase tracking-widest text-gray-300 mb-5">{v.amenities.included}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {d.amenities.map((label, i) => {
                const Icon = amenityIcons[i];
                return (
                <div key={i} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-[#862637] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-light text-[#01142a]">{label}</span>
                </div>
                );
              })}
            </div>

            <p className="text-xs font-light uppercase tracking-widest text-gray-300 mb-5">{v.amenities.onDemand}</p>
            <div className="flex flex-wrap gap-2">
              {d.amenitiesOnDemand.map((item) => (
                <span
                  key={item}
                  className="border border-[#01142a]/15 text-[#01142a] text-xs font-light px-4 py-2 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* ── 6. TARIFS ── */}
          <section>
            <div className="mb-10">
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{v.pricing.kicker}</p>
              <h2
                className="t-h2 text-h3 text-[#01142a]"
              >
                {v.pricing.title}
              </h2>
              <p className="text-xs font-light text-gray-400 mt-2 tracking-wide">
                {d.pricingNote}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {d.tarifs.map((tarif) => (
                <div
                  key={tarif.label}
                  className="border border-[#e5e5e5] rounded-xl p-6 bg-white hover:border-[#01142a]/40 hover:shadow-sm transition-all duration-200 group"
                >
                  <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-3">{tarif.label}</p>
                  <p
                    className="t-figure text-2xl text-[#01142a] mb-2 group-hover:text-[#862637] transition-colors"
                  >
                    {tarif.price}
                  </p>
                  <p className="text-xs font-light text-gray-400">{tarif.hours}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA BAND ── */}
          <section className="bg-[#01142a] rounded-2xl p-10 sm:p-14">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="text-center sm:text-left">
                <p className="text-[#fee1d4]/60 text-xs uppercase tracking-[0.3em] mb-1">{v.from}</p>
                <p className="t-key text-white text-4xl">{d.price}</p>
                <p className="text-white/40 text-xs mt-1 font-light">{v.ctaBand.note}</p>
              </div>
              <button
                onClick={() => navigate(p('/reservation?space=duplex'))}
                className="btn-label bg-white text-[#01142a] px-10 py-4 rounded-lg text-xs uppercase hover:bg-[#862637] hover:text-[#fee1d4] transition-all duration-300"
              >
                {v.book}
              </button>
              <div className="text-center">
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">{v.ctaBand.or}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {platforms.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${v.ctaBand.viewOn} ${platform.name}`}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                    >
                      {platform.logo ? (
                        <img src={platform.logo} alt={platform.name} className="w-5 h-5 object-contain" loading="lazy" />
                      ) : (
                        <span className="text-xs font-light text-white">{platform.name[0]}</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 7. ACCÈS ── */}
          <section>
            <div className="mb-10">
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{v.access.kicker}</p>
              <h2
                className="t-h2 text-h3 text-[#01142a]"
              >
                {v.access.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-start gap-3 mb-8">
                  <MapPin className="h-4 w-4 text-[#862637] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-light text-[#01142a]">{d.access.street}</p>
                    <p className="text-sm font-light text-gray-400">{d.access.city}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {d.access.transit.map((stop) => (
                    <div key={stop.station} className="flex items-center gap-3">
                      <span className="bg-[#01142a] text-white text-xs px-2.5 py-0.5 rounded font-light tracking-wide flex-shrink-0">
                        M
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-light text-[#01142a]">{stop.station}</span>
                        <span className="text-xs text-gray-400">{d.access.lineLabel} {stop.line}</span>
                        <span className="text-xs text-gray-400">· {stop.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="aspect-[4/3] rounded-xl overflow-hidden bg-[#f0ede8] relative group cursor-pointer border border-[#e5e5e5]"
                onClick={() => setMapLoaded(true)}
              >
                {mapLoaded ? (
                  <iframe
                    src="https://maps.google.com/maps?q=146+rue+Montmartre+75002+Paris&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={d.access.mapTitle}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 group-hover:bg-black/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#862637]/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[#862637]" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-normal text-[#01142a] tracking-widest uppercase">
                      {v.access.map}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── 8. CROSS-SELL ── */}
      <section className="bg-white border-t border-[#e5e5e5] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{d.crossSellKicker}</p>
            <h2
              className="t-h2 text-h3 text-[#01142a]"
            >
              {v.crossSell.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherSpaces.map((s) => {
              const o = d.otherSpaces[s.key];
              return (
              <Link
                key={s.key}
                to={p(s.link)}
                className="group block bg-[#fbfbf3] rounded-xl overflow-hidden border border-[#e5e5e5] hover:border-[#01142a]/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={s.image}
                    srcSet={srcSet(s.image)}
                    sizes={SIZES.halfColumn}
                    alt={`${o.title} Osmoz`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3
                      className="t-h3 text-base text-[#01142a] mb-1"
                    >
                      {o.title}
                    </h3>
                    <p className="text-xs font-light text-gray-400 tracking-wide">
                      {o.location} · {o.surface} · {o.capacity}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-4 w-4 text-[#862637] group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <ImageGallery
        images={allImages}
        initialIndex={selectedImageIndex}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
