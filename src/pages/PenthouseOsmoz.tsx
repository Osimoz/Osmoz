import { useState, useEffect } from 'react';
import {
  MapPin, Users, Maximize2,
  Wifi, Tv, Presentation, ChevronRight, Eye, TreePine, Layers
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { useLocale } from '../i18n/context';
import ImageGallery from '../components/ImageGallery';

// ─── helpers ────────────────────────────────────────────────────────────────
const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);
const P = 'images/Penthouse/';

// ─── DATA ────────────────────────────────────────────────────────────────────

const platforms = [
  { name: 'Kactus',       url: 'https://www.kactus.com/fr/lieux/le-penthouse-osmoz-la-defense',                                                                                                  logo: u('images/logos/kactus.png') },
  { name: 'Naboo',        url: 'https://www.naboo.app/search?minBudget=100&maxBudget=150&travelType=DAILY_TRIP&adults=10&placeId=ChIJxfUaLBpl5kcR4MryedU_O9g',                                   logo: u('images/logos/naboo.jpeg') },
  { name: 'Officeriders', url: 'https://app.officeriders.com/workspace/5190006',                                                                                                                  logo: u('images/logos/or.png') },
  { name: 'WeAreScene',   url: 'https://www.wearescene.com/fr/lieu/le-penthouse-la-defense',                                                                                                      logo: null },
  { name: 'Rejolt',       url: 'https://www.rejolt.com',                                                                                                                                          logo: null },
];

// Le texte vient de t.penthouse / t.venue ; ne restent ici que les valeurs non
// textuelles (icônes, images, capacités, liens), dans le même ordre.
const amenityIcons = [Wifi, Tv, Maximize2, Presentation, Tv, Layers, TreePine, Eye];

const configurations = [
  { capacity: 15, image: u(`${P}Bureau 24 bis.jpg`) },
  { capacity: 30, image: u(`${P}Sejour format reunion 18.jpg`) },
  { capacity: 40, image: u(`${P}Cocktail copie.jpg`) },
  { capacity: 40, image: u(`${P}Rooftop 1.JPG`) },
];

// Photos : « <pièce> <n> » (t.penthouse.rooms). Les 8 premières forment la
// galerie ; toutes alimentent la lightbox avec le préfixe « Penthouse Osmoz – ».
type Room = 'rooftop' | 'bureau' | 'sejour' | 'sejourReunion' | 'sejourConference' | 'escalier' | 'sdb';
const photos: { file: string; room: Room; n: string }[] = [
  { file: 'Rooftop 1.JPG', room: 'rooftop', n: '1' },
  { file: 'Rooftop 2.JPG', room: 'rooftop', n: '2' },
  { file: 'Bureau 3 .jpg', room: 'bureau', n: '3' },
  { file: 'Sejour 4.JPG', room: 'sejour', n: '4' },
  { file: 'Sejour 5.JPG', room: 'sejour', n: '5' },
  { file: 'Sejour 6.JPG', room: 'sejour', n: '6' },
  { file: 'Sejour 7.jpg', room: 'sejour', n: '7' },
  { file: 'Sejour 8.JPG', room: 'sejour', n: '8' },
  { file: 'Sejour 9.JPG', room: 'sejour', n: '9' },
  { file: 'Sejour 10.JPG', room: 'sejour', n: '10' },
  { file: 'Sejour 11.JPG', room: 'sejour', n: '11' },
  { file: 'Sejour 11 bis .jpg', room: 'sejour', n: '11 bis' },
  { file: 'Sejour 12.JPG', room: 'sejour', n: '12' },
  { file: 'Sejour 13.jpg', room: 'sejour', n: '13' },
  { file: 'Sejour 14.JPG', room: 'sejour', n: '14' },
  { file: 'Sejour 15.jpg', room: 'sejour', n: '15' },
  { file: 'Sejour 16.JPG', room: 'sejour', n: '16' },
  { file: 'Sejour 17.jpg', room: 'sejour', n: '17' },
  { file: 'Sejour format reunion 18.jpg', room: 'sejourReunion', n: '18' },
  { file: 'Sejour format reunion 18 bis.jpg', room: 'sejourReunion', n: '18 bis' },
  { file: 'Sejour format conference 19.jpg', room: 'sejourConference', n: '19' },
  { file: 'Sejour format conference 19 bis.jpg', room: 'sejourConference', n: '19 bis' },
  { file: 'Sejour 20.jpg', room: 'sejour', n: '20' },
  { file: 'Bureau 21.jpg', room: 'bureau', n: '21' },
  { file: 'Bureau 22.JPG', room: 'bureau', n: '22' },
  { file: 'Bureau 23.JPG', room: 'bureau', n: '23' },
  { file: 'Bureau 24.jpg', room: 'bureau', n: '24' },
  { file: 'Bureau 24 bis.jpg', room: 'bureau', n: '24 bis' },
  { file: 'Bureau 25.JPG', room: 'bureau', n: '25' },
  { file: 'Bureau 26.JPG', room: 'bureau', n: '26' },
  { file: 'Bureau 26 bis.jpg', room: 'bureau', n: '26 bis' },
  { file: 'Bureau 27.JPG', room: 'bureau', n: '27' },
  { file: 'Bureau 27 bis.jpg', room: 'bureau', n: '27 bis' },
  { file: 'Bureau 28.JPG', room: 'bureau', n: '28' },
  { file: 'Escalier 29.jpg', room: 'escalier', n: '29' },
  ...['30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'].map((n) => ({ file: `Rooftop ${n}.JPG`, room: 'rooftop' as const, n })),
  { file: 'Rooftop 41.jpg', room: 'rooftop', n: '41' },
  { file: 'Rooftop 42.JPG', room: 'rooftop', n: '42' },
  { file: 'Rooftop 43.JPG', room: 'rooftop', n: '43' },
  { file: 'Rooftop 44.jpg', room: 'rooftop', n: '44' },
  { file: 'Rooftop 45.jpg', room: 'rooftop', n: '45' },
  { file: 'Rooftop 46.JPG', room: 'rooftop', n: '46' },
  { file: 'Rooftop 47.jpg', room: 'rooftop', n: '47' },
  { file: 'Rooftop 48.JPG', room: 'rooftop', n: '48' },
  { file: 'Rooftop 49.JPG', room: 'rooftop', n: '49' },
  { file: 'SDB 50.jpg', room: 'sdb', n: '50' },
];

const otherSpaces = [
  { key: 'loft', image: u('images/Loft/2 Salon pleiniere 2.jpg'), link: '/spaces/loft-osmoz' },
  { key: 'duplex', image: u('images/Duplex Haussmannien/duplex-salon-01.png'), link: '/spaces/duplex-osmoz' },
] as const;

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function PenthouseOsmoz() {
  const navigate = useNavigate();
  const { t, p } = useLocale();
  const h = t.penthouse;
  const v = t.venue;
  const abs = (frPath: string) => `https://osmoz-space.com${p(frPath)}`;
  const galleryItems = photos.slice(0, 8).map(({ file, room, n }) => ({ url: u(`${P}${file}`), label: `${h.rooms[room]} ${n}`, alt: `${h.rooms[room]} ${n}` }));
  const allImages = photos.map(({ file, room, n }) => ({ url: u(`${P}${file}`), alt: `${h.lightboxPrefix}${h.rooms[room]} ${n}` }));
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
    name: 'Le Penthouse OSMOZ',
    description: h.jsonLd.description,
    url: abs('/spaces/penthouse-osmoz'),
    image: 'https://osmoz-space.com/images/Penthouse/2%20-%20Salon.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6-8 rue Jean Jaurès, Tour Cofonca',
      addressLocality: 'Puteaux',
      postalCode: '92800',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 48.8924, longitude: 2.2384 },
    maximumAttendeeCapacity: 40,
    amenityFeature: h.jsonLd.amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    offers: ['1499', '2499', '1999', '2999'].map((price, i) => ({ '@type': 'Offer', ...h.jsonLd.offers[i], price, priceCurrency: 'EUR' })),
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

  const penthouseBreadcrumbFaqLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: v.jsonLd.home, item: abs('/') },
          { '@type': 'ListItem', position: 2, name: v.jsonLd.spaces, item: abs('/spaces') },
          { '@type': 'ListItem', position: 3, name: h.jsonLd.breadcrumb, item: abs('/spaces/penthouse-osmoz') },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: h.jsonLd.faq.map((item) => ({
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
      <SEO route="penthouse" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(penthouseBreadcrumbFaqLd)}</script>
      </Helmet>

      {/* ── 1. HERO ── */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img
          src={u(`${P}Sejour 4.JPG`)}
          alt={h.heroAlt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 px-4 text-center">
          <p className="text-white/60 font-normal tracking-[0.3em] text-xs mb-4 uppercase">
            {h.kicker}
          </p>
          <h1
            className="t-h1 text-hero text-white mb-4"
          >
            {h.name}
          </h1>
          <p className="text-white/70 font-light tracking-[0.15em] text-sm mb-10 uppercase">
            {h.location}
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {h.pills.map((pill) => (
              <span
                key={pill}
                className="bg-white/10 backdrop-blur-sm text-white border border-white/25 px-4 py-1.5 rounded-full text-xs font-light tracking-widest uppercase"
              >
                {pill}
              </span>
            ))}
          </div>

          <button
            onClick={() => navigate(p('/reservation?space=penthouse'))}
            className="btn-label bg-white text-[#01142a] px-12 py-4 rounded-lg text-xs uppercase hover:bg-[#862637] hover:text-[#fee1d4] border border-white transition-all duration-300"
          >
            {v.book}
          </button>
        </div>
      </section>

      {/* ── 2. STICKY STATS BAR ── */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-[#fbfbf3]/95 backdrop-blur-sm border-b border-[#e5e5e5] shadow-sm transition-all duration-500 ${
          isStatsVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="tnum flex items-center gap-6 text-xs font-light text-[#01142a] tracking-wide uppercase">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="h-3 w-3" strokeWidth={1.5} />{h.stats.surface}
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Users className="h-3 w-3" strokeWidth={1.5} />{h.stats.people}
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="h-3 w-3" strokeWidth={1.5} />{h.stats.address}
            </span>
          </div>
          <button
            onClick={() => navigate(p('/reservation?space=penthouse'))}
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
          <p className="t-figure text-lg text-[#01142a]">{h.price}</p>
        </div>
        <button
          onClick={() => navigate(p('/reservation?space=penthouse'))}
          className="btn-label bg-[#862637] text-[#fee1d4] px-6 py-3 rounded-lg text-xs uppercase flex-1 max-w-[200px]"
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
                  {h.intro.quote}
                </p>
                <p className="text-sm font-light leading-loose text-gray-600 mb-6">
                  {h.intro.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {h.intro.tags.map((tag) => (
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
                  className="relative flex-shrink-0 w-64 sm:w-80 aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group snap-start bg-[#f0ede8]"
                  onClick={() => openGallery(i)}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
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
            <h2 className="t-h2 text-h3 text-[#01142a] mb-8">
              {v.configurations.title}
            </h2>

            <div className="flex gap-2 mb-8 flex-wrap">
              {h.configurations.map((c, i) => (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#f0ede8]">
                <img
                  src={configurations[activeConfig].image}
                  alt={`${h.configurationAltBefore}${h.configurations[activeConfig].label}${h.configurationAltAfter}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div>
                <p className="t-key text-[2rem] text-[#01142a] mb-1">
                  {configurations[activeConfig].capacity} {v.people}
                </p>
                <p className="text-sm font-light text-gray-500 mb-4 uppercase tracking-widest">
                  {h.configurations[activeConfig].label}
                </p>
                <p className="text-sm font-light text-gray-600 leading-loose">
                  {h.configurations[activeConfig].description}
                </p>
              </div>
            </div>
          </section>

          {/* ── 5. ÉQUIPEMENTS ── */}
          <section>
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{v.amenities.kicker}</p>
            <h2 className="t-h2 text-h3 text-[#01142a] mb-8">
              {v.amenities.title}
            </h2>

            <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-4">{v.amenities.included}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
              {h.amenities.map((label, i) => {
                const Icon = amenityIcons[i];
                return (
                <div key={i} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-[#862637] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-light text-[#01142a]">{label}</span>
                </div>
                );
              })}
            </div>

            <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-4">{v.amenities.onDemand}</p>
            <div className="flex flex-wrap gap-3">
              {h.amenitiesOnDemand.map((item) => (
                <span key={item} className="border border-[#01142a]/20 text-[#01142a] text-xs font-light px-3 py-1.5 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* ── 6. TARIFS ── */}
          <section>
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{v.pricing.kicker}</p>
            <h2 className="t-h2 text-h3 text-[#01142a] mb-2">
              {v.pricing.title}
            </h2>
            <p className="text-xs font-light text-gray-400 mb-8 uppercase tracking-widest">{v.pricing.note}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {h.tarifs.map((tarif) => (
                <div key={tarif.label} className="border border-[#e5e5e5] rounded-xl p-5 bg-white hover:border-[#01142a]/40 hover:shadow-sm transition-all duration-200 group">
                  <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-2">{tarif.label}</p>
                  <p
                    className="t-figure text-2xl text-[#01142a] mb-2 group-hover:text-[#862637] transition-colors"
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
                <p className="t-key text-white text-4xl">{h.price}</p>
                <p className="text-white/40 text-xs mt-1 font-light">{v.ctaBand.note}</p>
              </div>
              <button
                onClick={() => navigate(p('/reservation?space=penthouse'))}
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
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">{v.access.kicker}</p>
            <h2 className="t-h2 text-h3 text-[#01142a] mb-8">
              {v.access.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-start gap-3 mb-6">
                  <MapPin className="h-4 w-4 text-[#862637] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-light text-[#01142a]">{h.access.street}</p>
                    <p className="text-sm font-light text-gray-500">{h.access.city}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm font-light text-gray-600">
                  {h.access.transit.map((stop) => (
                    <div key={stop.badge} className="flex items-center gap-3">
                      <span className="bg-[#01142a] text-white text-xs px-2 py-0.5 rounded font-light flex-shrink-0">{stop.badge}</span>
                      <span><strong className="font-normal text-[#01142a]">{stop.station}</strong> {stop.detail}</span>
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
                    src="https://maps.google.com/maps?q=Tour+Cofonca+6+rue+Jean+Jaures+92800+Puteaux&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={h.access.mapTitle}
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
            className="t-h2 text-h3 text-[#01142a] mb-10"
          >
            {v.crossSell.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherSpaces.map((s) => {
              const o = h.otherSpaces[s.key];
              return (
              <Link
                key={s.key}
                to={p(s.link)}
                className="group block bg-[#fbfbf3] rounded-xl overflow-hidden border border-[#e5e5e5] hover:border-[#01142a]/30 transition-all duration-300 hover:shadow-md"
              >
                <div className="aspect-[16/9] overflow-hidden bg-[#f0ede8]">
                  <img
                    src={s.image}
                    alt={`${o.title} – Osmoz`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-normal text-[#01142a] mb-1">{o.title}</h3>
                    <p className="text-xs font-light text-gray-400">{o.location} · {o.surface} · {o.capacity}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#862637] group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
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
