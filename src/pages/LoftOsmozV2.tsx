import { useState, useEffect } from 'react';
import { MapPin, Users, Maximize2, Coffee, Wifi, Tv, UtensilsCrossed, Presentation, Music, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { useLocale } from '../i18n/context';
import ImageGallery from '../components/ImageGallery';
import { srcSet, SIZES } from '../lib/responsiveImage';

// ─── helpers ────────────────────────────────────────────────────────────────
const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);

// ─── DATA ────────────────────────────────────────────────────────────────────

const platforms = [
  { name: 'Kactus',       url: 'https://www.kactus.com/fr/lieux/loft-osmoz-place-des-vosges',                                                          logo: u('images/logos/kactus.png') },
  { name: 'Officeriders', url: 'https://www.officeriders.com/fr/salles/loft-lumineux-moderne-industriel?category=meeting',                              logo: u('images/logos/or.png') },
  { name: 'ABC Salles',   url: 'https://www.abcsalles.com/lieu/loft-osmoz',                                                                             logo: u('images/logos/abcsalles.png') },
  { name: 'Naboo',        url: 'https://www.naboo.app/explorer/houses/loft-osmoz',                                                                      logo: u('images/logos/naboo.jpeg') },
  { name: 'Giggster',     url: 'https://giggster.com/listing-preview/loft-osmoz-meeting-room-and-showroom-in-marais',                                   logo: u('images/logos/giggster.png') },
  { name: 'Peerspace',    url: 'https://www.peerspace.com/fr/pages/listings/67223aec8687373c1c672007',                                                  logo: u('images/logos/peerspace.png') },
];

// Le texte vient de t.loft / t.venue ; ne restent ici que les valeurs non
// textuelles (icônes, images, capacités, liens), dans le même ordre.
const amenityIcons = [Wifi, Tv, Coffee, UtensilsCrossed, Music, Presentation, Tv, Maximize2];

const configurations = [
  { capacity: 14, images: [u('images/Loft/1 SdR.jpg'), u('images/Loft/11 Salle de reunion 2.jpg')] },
  { capacity: 20, images: [u('images/Loft/12 Salle de reunion 4.jpg'), u('images/Loft/13 Salle de reunion 5.jpg')] },
  { capacity: 25, images: [u('images/Loft/7 Salon pleiniere 1.jpg'), u('images/Loft/2 Salon pleiniere 2.jpg')] },
  { capacity: 25, images: [u('images/Loft/21 Cuisine 3.jpg'), u('images/Loft/18 Cocktail 3.jpg'), u('images/Loft/17 Cocktail 2.jpg'), u('images/Loft/5 Accueil.jpg')] },
];

// Galerie labellisée (libellés et alt dans t.loft.gallery, même ordre)
const galleryUrls = [
  u('images/Loft/2 Salon pleiniere 2.jpg'),
  u('images/Loft/1 SdR.jpg'),
  u('images/Loft/3 salle a manger.jpg'),
  u('images/Loft/4 Cuisine 5.jpg'),
  u('images/Loft/7 Salon pleiniere 1.jpg'),
  u('images/Loft/6 Salon pleiniere 6.jpg'),
  u('images/Loft/11 Salle de reunion 2.jpg'),
  u('images/Loft/12 Salle de reunion 4.jpg'),
  u('images/Loft/9 salle a manger.jpg'),
  u('images/Loft/21 Cuisine 3.jpg'),
  u('images/Loft/18 Cocktail 3.jpg'),
  u('images/Loft/8 Cocktail 1.jpg'),
  u('images/Loft/5 Accueil.jpg'),
  u('images/Loft/25 DSC4695-HDR.jpg'),
];

// Cross-sell autres lieux
const otherSpaces = [
  { key: 'duplex', image: u('images/Duplex Haussmannien/1 Salon Normal 3.jpg'), link: '/spaces/duplex-osmoz' },
  { key: 'penthouse', image: u('images/Penthouse/2 - Salon.jpg'), link: '/spaces/penthouse-osmoz' },
] as const;

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function LoftOsmozV2() {
  const navigate = useNavigate();
  const { t, p } = useLocale();
  const l = t.loft;
  const v = t.venue;
  const abs = (frPath: string) => `https://osmoz-space.com${p(frPath)}`;
  const [activeConfig, setActiveConfig] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Show sticky stats bar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => setIsStatsVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryItems = galleryUrls.map((url, i) => ({ url, ...l.gallery[i] }));
  const allImages = galleryItems.map((g) => ({ url: g.url, alt: g.alt }));

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  // ── structured data JSON-LD ──
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Le Loft OSMOZ',
    description: l.jsonLd.description,
    url: abs('/spaces/loft-osmoz'),
    image: 'https://osmoz-space.com/images/Loft/2%20Salon%20pleiniere%202.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10 rue Roger Verlomme',
      addressLocality: 'Paris',
      postalCode: '75003',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 48.8566, longitude: 2.3630 },
    maximumAttendeeCapacity: 25,
    amenityFeature: l.jsonLd.amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    offers: [
      { '@type': 'Offer', ...l.jsonLd.offers[0], price: '649', priceCurrency: 'EUR' },
      { '@type': 'Offer', ...l.jsonLd.offers[1], price: '999', priceCurrency: 'EUR' },
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

  const loftBreadcrumbFaqLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: v.jsonLd.home, item: abs('/') },
          { '@type': 'ListItem', position: 2, name: v.jsonLd.spaces, item: abs('/spaces') },
          { '@type': 'ListItem', position: 3, name: l.jsonLd.breadcrumb, item: abs('/spaces/loft-osmoz') },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: l.jsonLd.faq.map((item) => ({
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
      <SEO route="loft" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(loftBreadcrumbFaqLd)}</script>
      </Helmet>

      {/* ── 1. HERO ── */}
      <section className="relative h-[88vh] w-full overflow-hidden">
        <img
          src={u('images/Loft/2 Salon pleiniere 2.jpg')}
          srcSet={srcSet(u('images/Loft/2 Salon pleiniere 2.jpg'))}
          sizes={SIZES.hero}
          alt={l.heroAlt}
          fetchPriority="high"
          loading="eager"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 px-4 text-center">
          <h1
            className="t-display t-display-hero text-white mb-3"
          >
            {l.name}
          </h1>
          <p className="text-white/80 font-light tracking-[0.2em] text-sm mb-8 uppercase">
            {l.location}
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {l.pills.map((pill) => (
              <span
                key={pill}
                className="bg-white/15 backdrop-blur-sm text-white border border-white/30 px-4 py-1.5 rounded-full text-sm font-light tracking-wide"
              >
                {pill}
              </span>
            ))}
          </div>

          <button
            onClick={() => navigate(p('/reservation?space=loft'))}
            className="bg-white text-[#01142a] px-10 py-3.5 rounded-lg text-sm tracking-widest font-normal hover:bg-[#862637] hover:text-[#fee1d4] border border-white transition duration-300"
          >
            {v.book}
          </button>
        </div>
      </section>

      {/* ── 2. STICKY STATS BAR ── */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-[#fbfbf3] border-b border-[#e5e5e5] shadow-sm transition-all duration-300 ${
          isStatsVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8 text-sm font-light text-[#01142a]">
            <span className="flex items-center gap-1.5"><Maximize2 className="h-3.5 w-3.5" />{l.stats.surface}</span>
            <span className="hidden sm:flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{l.stats.people}</span>
            <span className="hidden md:flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{l.stats.address}</span>
          </div>
          <button
            onClick={() => navigate(p('/reservation?space=loft'))}
            className="bg-[#862637] text-[#fee1d4] px-5 py-2 rounded-lg text-xs tracking-widest font-normal hover:bg-[#fee1d4] hover:text-[#862637] transition duration-300 whitespace-nowrap"
          >
            {v.quote}
          </button>
        </div>
      </div>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-[#e5e5e5] px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <p className="text-xs font-light text-gray-400 uppercase tracking-widest">{v.from}</p>
          <p className="t-figure text-lg text-[#01142a]">{l.price}</p>
        </div>
        <button
          onClick={() => navigate(p('/reservation?space=loft'))}
          className="bg-[#862637] text-[#fee1d4] px-6 py-3 rounded-lg text-xs tracking-[0.2em] uppercase font-normal flex-1 max-w-[200px]"
        >
          {v.book}
        </button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-28 lg:pb-16">
        <div className="space-y-20">

          {/* ── 3. DESCRIPTION + GALERIE ── */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-8">
              <div>
                <p
                  className="t-quote text-xl text-[#01142a] mb-6 leading-loose"
                >
                  {l.intro.quote}
                </p>
                <p className="text-sm font-light leading-loose text-gray-600 mb-6">
                  {l.intro.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {l.intro.tags.map((tag) => (
                    <span key={tag} className="border border-[#01142a]/20 text-[#01142a] text-xs font-light px-3 py-1 rounded-full">
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
                  onClick={() => openGallery(i)}
                >
                  <img
                    src={img.url}
                    srcSet={srcSet(img.url)}
                    sizes={SIZES.galleryStrip}
                    alt={img.alt}
                    loading="lazy"
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
              className="mt-6 text-sm font-normal text-[#01142a] underline underline-offset-4 hover:text-[#862637] transition-colors"
            >
              {v.allPhotos} ({allImages.length})
            </button>
          </section>

          {/* ── 4. CONFIGURATIONS ── */}
          <section>
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{v.configurations.kicker}</p>
            <h2 className="t-serif text-h3 text-[#01142a] mb-8">
              {v.configurations.title}
            </h2>

            <div className="flex gap-2 mb-8 flex-wrap">
              {l.configurations.map((c, i) => (
                <button
                  key={c.label}
                  onClick={() => setActiveConfig(i)}
                  className={`px-5 py-2 rounded-full text-sm font-normal tracking-wide transition-all duration-200 ${
                    activeConfig === i
                      ? 'bg-[#01142a] text-white'
                      : 'bg-white border border-[#01142a]/20 text-[#01142a] hover:border-[#01142a]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={configurations[activeConfig].images[0]}
                  srcSet={srcSet(configurations[activeConfig].images[0])}
                  sizes={SIZES.halfColumn}
                  alt={`${l.configurationAlt} – ${v.configurations.altPrefix} ${l.configurations[activeConfig].label}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="t-display tnum text-[2rem] text-[#01142a] mb-1">
                  {configurations[activeConfig].capacity} {v.people}
                </p>
                <p className="text-sm font-light text-gray-500 mb-4 uppercase tracking-widest">
                  {l.configurations[activeConfig].label}
                </p>
                <p className="text-sm font-light text-gray-600 leading-loose">
                  {l.configurations[activeConfig].description}
                </p>
              </div>
            </div>
          </section>

          {/* ── 5. ÉQUIPEMENTS ── */}
          <section>
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{v.amenities.kicker}</p>
            <h2 className="t-serif text-h3 text-[#01142a] mb-8">
              {v.amenities.title}
            </h2>

            <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-4">{v.amenities.included}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
              {l.amenities.map((label, i) => {
                const Icon = amenityIcons[i];
                return (
                <div key={i} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-[#862637] flex-shrink-0" />
                  <span className="text-sm font-light text-[#01142a]">{label}</span>
                </div>
                );
              })}
            </div>

            <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-4">{v.amenities.onDemand}</p>
            <div className="flex flex-wrap gap-3">
              {l.amenitiesOnDemand.map((item) => (
                <span key={item} className="border border-[#01142a]/20 text-[#01142a] text-xs font-light px-3 py-1.5 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* ── 6. TARIFS ── */}
          <section>
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{v.pricing.kicker}</p>
            <h2 className="t-serif text-h3 text-[#01142a] mb-2">
              {v.pricing.title}
            </h2>
            <p className="text-xs font-light text-gray-400 mb-8 uppercase tracking-widest">{v.pricing.note}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {l.tarifs.map((tarif) => (
                <div key={tarif.label} className="border border-[#e5e5e5] rounded-lg p-5 bg-white hover:border-[#01142a] transition-colors duration-200">
                  <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-2">{tarif.label}</p>
                  <p
                    className="t-figure text-2xl text-[#01142a] mb-2"
                  >
                    {tarif.price}
                  </p>
                  <p className="text-xs font-light text-gray-500">{tarif.hours}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA BAND ── */}
          <section className="bg-[#01142a] rounded-2xl p-10 sm:p-14">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="text-center sm:text-left">
                <p className="text-[#fee1d4]/60 text-xs uppercase tracking-[0.3em] mb-1">{v.from}</p>
                <p className="t-display tnum text-white text-4xl">{l.price}</p>
                <p className="text-white/40 text-xs mt-1 font-light">{v.ctaBand.note}</p>
              </div>
              <button
                onClick={() => navigate(p('/reservation?space=loft'))}
                className="bg-white text-[#01142a] px-10 py-4 rounded-lg text-xs tracking-[0.2em] uppercase font-normal hover:bg-[#862637] hover:text-[#fee1d4] transition-all duration-300"
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
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{v.access.kicker}</p>
            <h2 className="t-serif text-h3 text-[#01142a] mb-8">
              {v.access.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-start gap-3 mb-5">
                  <MapPin className="h-4 w-4 text-[#862637] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-light text-[#01142a]">{l.access.street}</p>
                    <p className="text-sm font-light text-gray-500">{l.access.city}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm font-light text-gray-600">
                  {l.access.transit.map((stop) => (
                    <div key={stop.station} className="flex items-center gap-3">
                      <span className="bg-[#01142a] text-white text-xs px-2 py-0.5 rounded font-light">M</span>
                      <span><strong className="font-normal text-[#01142a]">{stop.station}</strong> {stop.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Maps lazy — click to load (même pattern que DuplexOsmozV2, sans clé API) */}
              <div
                className="aspect-[4/3] rounded-lg overflow-hidden bg-[#f0ede8] relative group cursor-pointer border border-[#e5e5e5]"
                onClick={() => setMapLoaded(true)}
              >
                {mapLoaded ? (
                  <iframe
                    src="https://maps.google.com/maps?q=10+rue+Roger+Verlomme+75003+Paris&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={l.access.mapTitle}
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
      <section className="bg-white border-t border-[#e5e5e5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{v.crossSell.kicker}</p>
          <h2
            className="t-serif text-h3 text-[#01142a] mb-10"
          >
            {v.crossSell.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherSpaces.map((s) => {
              const o = l.otherSpaces[s.key];
              return (
              <Link
                key={s.key}
                to={p(s.link)}
                className="group block bg-[#fbfbf3] rounded-lg overflow-hidden border border-[#e5e5e5] hover:border-[#01142a] transition-all duration-300 hover:shadow-md"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={s.image}
                    srcSet={srcSet(s.image)}
                    sizes={SIZES.halfColumn}
                    alt={`${o.title} – Osmoz`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-normal text-[#01142a] mb-1">{o.title}</h3>
                    <p className="text-xs font-light text-gray-400">{o.location} · {o.surface} · {o.capacity}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#862637] group-hover:translate-x-1 transition-transform" />
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
