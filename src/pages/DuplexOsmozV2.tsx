import { useState, useEffect } from 'react';
import {
  MapPin, Users, Maximize2, Coffee,
  Wifi, Tv, UtensilsCrossed, Presentation, ChevronRight
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ImageGallery from '../components/ImageGallery';

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

const amenities = [
  { icon: Wifi,            label: 'Wifi haut débit' },
  { icon: Tv,              label: 'Écrans connectés' },
  { icon: Coffee,          label: 'Machine à café en grains' },
  { icon: UtensilsCrossed, label: 'Cuisine entièrement équipée' },
  { icon: Tv,              label: 'Câble HDMI' },
  { icon: Presentation,    label: 'Paperboard' },
  { icon: Maximize2,       label: 'Espaces modulables sur 2 niveaux' },
  { icon: Tv,              label: 'Ventilation' },
];

const amenitiesOnDemand = [
  'Chef privé',
  'Service traiteur',
  'Activités team building',
  'Atelier cuisine',
  'Œnologie',
];

const tarifs = [
  { label: 'Demi-journée',      hours: '08h30 - 12h  ou  14h - 18h', price: '1 499€' },
  { label: 'Journée',           hours: '08h30 - 18h30',               price: '2 499€' },
  { label: 'Soirée',            hours: '18h30 - 22h',                 price: '1 999€' },
  { label: 'Journée + soirée',  hours: '08h30 - 22h',                 price: '2 999€' },
];

// ─── CONFIGURATIONS ──────────────────────────────────────────────────────────
const configurations = [
  {
    label: 'Réunion',
    capacity: 20,
    description: 'Grande table centrale dans le salon haussmannien, écran TV, paperboard. Idéal pour réunions de direction et comités.',
    image: u(`${D}duplex-reunion-01.webp`),
  },
  {
    label: 'Conférence',
    capacity: 30,
    description: "Disposition en conférence face à l'écran pour présentations, formations et ateliers stratégiques.",
    image: u(`${D}duplex-salon-06.webp`),
  },
  {
    label: 'Rectangle',
    capacity: 25,
    description: 'Tables en rectangle pour favoriser les échanges et la collaboration en groupe.',
    image: u(`${D}duplex-reunion-04.webp`),
  },
  {
    label: 'Cocktail',
    capacity: 40,
    description: 'Deux niveaux ouverts, cuisine équipée, bar. Ambiance conviviale pour cocktails, déjeuners et afterworks.',
    image: u(`${D}duplex-salon-01.webp`),
  },
];

// ─── GALERIE PREVIEW ─────────────────────────────────────────────────────────
const galleryItems = [
  { url: u(`${D}duplex-salon-01.webp`),          label: 'Salon',           alt: 'Salon Duplex Osmoz - Paris' },
  { url: u(`${D}duplex-cuisine-01.webp`),         label: 'Cuisine',         alt: 'Cuisine équipée Duplex Osmoz - Paris' },
  { url: u(`${D}duplex-salle-reunion-01.webp`),   label: 'Salle de réunion', alt: 'Salle de réunion Duplex Osmoz' },
  { url: u(`${D}duplex-reunion-01.webp`),         label: 'Salle de réunion', alt: 'Configuration réunion Duplex Osmoz' },
  { url: u(`${D}duplex-diner-01.webp`),           label: 'Dîner & Déjeuner', alt: 'Dîner et déjeuner Duplex Osmoz' },
  { url: u(`${D}duplex-entree-01.webp`),          label: 'Entrée',          alt: 'Entrée Duplex Osmoz' },
  { url: u(`${D}duplex-ambiance-01.webp`),        label: 'Ambiance',        alt: 'Ambiance Duplex Osmoz' },
  { url: u(`${D}duplex-facade-01.webp`),          label: 'Façade',          alt: 'Façade extérieure Duplex Osmoz' },
];

// ─── TOUTES LES IMAGES LIGHTBOX ──────────────────────────────────────────────
const allImages = [
  // Salon
  { url: u(`${D}duplex-salon-01.webp`),        alt: 'Salon vue 1' },
  { url: u(`${D}duplex-salon-02.webp`),        alt: 'Salon vue 2' },
  { url: u(`${D}duplex-salon-03.webp`),        alt: 'Salon vue 3' },
  { url: u(`${D}duplex-salon-04.webp`),        alt: 'Salon vue 4' },
  { url: u(`${D}duplex-salon-05.webp`),        alt: 'Salon vue 5' },
  { url: u(`${D}duplex-salon-06.webp`),        alt: 'Salon vue 6' },
  { url: u(`${D}duplex-salon-07.webp`),        alt: 'Salon vue 7' },
  { url: u(`${D}duplex-salon-08.webp`),        alt: 'Salon vue 8' },
  { url: u(`${D}duplex-salon-09.webp`),        alt: 'Salon vue 9' },
  { url: u(`${D}duplex-salon-etage-01.webp`),  alt: 'Salon étage vue 1' },
  { url: u(`${D}duplex-salon-etage-02.webp`),  alt: 'Salon étage vue 2' },
  // Cuisine
  { url: u(`${D}duplex-cuisine-01.webp`),      alt: 'Cuisine vue 1' },
  { url: u(`${D}duplex-cuisine-02.webp`),      alt: 'Cuisine vue 2' },
  { url: u(`${D}duplex-cuisine-03.webp`),      alt: 'Cuisine vue 3' },
  { url: u(`${D}duplex-cuisine-04.webp`),      alt: 'Cuisine vue 4' },
  { url: u(`${D}duplex-cuisine-05.webp`),      alt: 'Cuisine vue 5' },
  { url: u(`${D}duplex-cuisine-06.webp`),      alt: 'Cuisine vue 6' },
  { url: u(`${D}duplex-cuisine-07.webp`),      alt: 'Cuisine vue 7' },
  { url: u(`${D}duplex-cuisine-08.webp`),      alt: 'Cuisine vue 8' },
  // Salle de réunion
  { url: u(`${D}duplex-salle-reunion-01.webp`), alt: 'Salle de réunion vue 1' },
  { url: u(`${D}duplex-salle-reunion-02.webp`), alt: 'Salle de réunion vue 2' },
  { url: u(`${D}duplex-salle-reunion-03.webp`), alt: 'Salle de réunion vue 3' },
  { url: u(`${D}duplex-salle-reunion-04.webp`), alt: 'Salle de réunion vue 4' },
  { url: u(`${D}duplex-salle-reunion-05.webp`), alt: 'Salle de réunion vue 5' },
  // Réunion
  { url: u(`${D}duplex-reunion-01.webp`),      alt: 'Réunion vue 1' },
  { url: u(`${D}duplex-reunion-02.webp`),      alt: 'Réunion vue 2' },
  { url: u(`${D}duplex-reunion-03.webp`),      alt: 'Réunion vue 3' },
  { url: u(`${D}duplex-reunion-04.webp`),      alt: 'Réunion vue 4' },
  { url: u(`${D}duplex-reunion-05.webp`),      alt: 'Réunion vue 5' },
  { url: u(`${D}duplex-reunion-06.webp`),      alt: 'Réunion vue 6' },
  // Dîner & Déjeuner
  { url: u(`${D}duplex-diner-01.webp`),        alt: 'Dîner Déjeuner vue 1' },
  { url: u(`${D}duplex-diner-02.webp`),        alt: 'Dîner Déjeuner vue 2' },
  { url: u(`${D}duplex-diner-03.webp`),        alt: 'Dîner Déjeuner vue 3' },
  { url: u(`${D}duplex-diner-04.webp`),        alt: 'Dîner Déjeuner vue 4' },
  { url: u(`${D}duplex-diner-05.webp`),        alt: 'Dîner Déjeuner vue 5' },
  // Entrée
  { url: u(`${D}duplex-entree-01.webp`),       alt: 'Entrée vue 1' },
  { url: u(`${D}duplex-entree-02.webp`),       alt: 'Entrée vue 2' },
  // Ambiance
  { url: u(`${D}duplex-ambiance-01.webp`),     alt: 'Ambiance' },
  // Façade
  { url: u(`${D}duplex-facade-01.webp`),       alt: 'Façade extérieure' },
];

// ─── CROSS-SELL ──────────────────────────────────────────────────────────────
const otherSpaces = [
  {
    title: 'Le Loft',
    location: 'Marais, Paris 3e',
    surface: '110 m²',
    capacity: '25 pers.',
    image: u('images/Loft/2 Salon pleiniere 2.jpg'),
    link: '/spaces/loft-osmoz',
  },
  {
    title: 'Le Penthouse',
    location: 'La Défense, Puteaux',
    surface: '150 m²',
    capacity: '40 pers.',
    image: u('images/Penthouse/2 - Salon.jpg'),
    link: '/spaces/penthouse-osmoz',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function DuplexOsmozV2() {
  const navigate = useNavigate();
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
    description: "Appartement haussmannien de 300m² sur deux étages au cœur du 2e arrondissement de Paris. Esprit résidentiel chic, escalier en ferronnerie, parquet ancien. Idéal pour séminaires, conférences, cocktails, dîners de direction et journées d'équipe jusqu'à 40 personnes. Privatisation exclusive à la journée pour les entreprises.",
    url: 'https://osmoz.work/spaces/duplex-osmoz',
    image: 'https://osmoz.work/images/Duplex%20Haussmannien/1%20Salon%20Normal%203.jpg',
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
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Wifi haut débit', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Écran connecté', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Paperboard', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Câble HDMI', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Cuisine équipée', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Deux étages', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Privatisation totale', value: true },
    ],
    offers: [
      { '@type': 'Offer', name: 'Journée — moins de 15 personnes', price: '1500', priceCurrency: 'EUR', description: "Privatisation journée complète jusqu'à 15 personnes" },
      { '@type': 'Offer', name: 'Journée — plus de 15 personnes', price: '2500', priceCurrency: 'EUR', description: 'Privatisation journée complète de 15 à 40 personnes' },
    ],
    telephone: '+33675186932',
    email: 'contact@osmoz.work',
    openingHours: 'Mo-Fr 08:00-22:00',
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Virement bancaire, Carte bancaire',
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
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://osmoz.work/' },
          { '@type': 'ListItem', position: 2, name: 'Nos espaces', item: 'https://osmoz.work/spaces' },
          { '@type': 'ListItem', position: 3, name: 'Le Duplex', item: 'https://osmoz.work/spaces/duplex-osmoz' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Combien de personnes peut accueillir Le Duplex OSMOZ ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Le Duplex Haussmannien OSMOZ accueille jusqu'à 40 personnes sur 300m² répartis sur deux étages. L'appartement est entièrement privatisé.",
            },
          },
          {
            '@type': 'Question',
            name: 'Où se trouve Le Duplex OSMOZ ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le Duplex OSMOZ est situé au 146 rue Montmartre, Paris 2e, au cœur du 2e arrondissement de Paris.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quel est le tarif de location du Duplex OSMOZ ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Le Duplex OSMOZ est disponible à partir de 1500€ HT pour une journée jusqu'à 15 personnes, et 2500€ HT au-delà. Devis personnalisé sous 24h.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="pt-0">

      {/* ── SEO ── */}
      <Helmet>
        <title>Le Duplex OSMOZ — Appartement Haussmannien Privatif Paris 2e | 300m² · 40 personnes</title>
        <meta name="description" content="Le Duplex Haussmannien OSMOZ Paris 2e : 300m² sur deux étages dans un appartement authentique au cœur de Paris. Réunions, séminaires, cocktails. Jusqu'à 40 personnes. Devis sous 24h." />
        <link rel="canonical" href="https://osmoz.work/spaces/duplex-osmoz" />
        <meta property="og:title" content="Duplex Haussmannien Osmoz — Espace premium Paris 2e" />
        <meta property="og:description" content="300m² haussmanniens sur 2 niveaux. Moulures, escalier sculptural, cuisine équipée. Jusqu'à 40 personnes. À partir de 1 499€ HT." />
        <meta property="og:image" content="https://osmoz.work/images/Duplex%20Haussmannien/duplex-salon-01.webp" />
        <meta property="og:url" content="https://osmoz.work/spaces/duplex-osmoz" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(duplexBreadcrumbFaqLd)}</script>
        <link rel="preload" as="image" href={u(`${D}duplex-salon-01.webp`)} />
        <link rel="preload" as="image" href={u(`${D}duplex-cuisine-01.webp`)} />
        <link rel="preload" as="image" href={u(`${D}duplex-reunion-01.webp`)} />
      </Helmet>

      {/* ── 1. HERO ── */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img
          src={u(`${D}duplex-salon-01.webp`)}
          alt="Duplex Haussmannien Osmoz - salon principal lumineux moulures parquet Paris 2e"
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
            Osmoz · Paris 2e
          </p>
          <h1
            className="text-white font-light mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            Le Duplex Haussmannien
          </h1>
          <p className="text-white/70 font-light tracking-[0.15em] text-sm mb-10 uppercase">
            146 rue Montmartre · Paris 2e
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {['300 m²', '2 niveaux', '40 pers. max', 'À partir de 1 499€ HT'].map((pill) => (
              <span
                key={pill}
                className="bg-white/10 backdrop-blur-sm text-white border border-white/25 px-4 py-1.5 rounded-full text-xs font-light tracking-widest uppercase"
              >
                {pill}
              </span>
            ))}
          </div>

          <button
            onClick={() => navigate('/reservation?space=duplex')}
            className="bg-white text-[#01142a] px-12 py-4 rounded-lg text-xs tracking-[0.2em] font-normal uppercase hover:bg-[#862637] hover:text-[#fee1d4] border border-white transition-all duration-300"
          >
            Réserver ce lieu
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
          <div className="flex items-center gap-6 text-xs font-light text-[#01142a] tracking-wide uppercase">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="h-3 w-3" />300 m²
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Users className="h-3 w-3" />40 personnes max
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />146 rue Montmartre, Paris 2e
            </span>
          </div>
          <button
            onClick={() => navigate('/reservation?space=duplex')}
            className="bg-[#862637] text-[#fee1d4] px-5 py-2 rounded-lg text-xs tracking-widest font-normal uppercase hover:bg-[#fee1d4] hover:text-[#862637] transition duration-300 whitespace-nowrap"
          >
            Demander un devis
          </button>
        </div>
      </div>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-[#e5e5e5] px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <p className="text-xs font-light text-gray-400 uppercase tracking-widest">À partir de</p>
          <p className="text-lg font-light text-[#01142a]" style={{ fontFamily: 'Playfair Display' }}>1 499€</p>
        </div>
        <button
          onClick={() => navigate('/reservation?space=duplex')}
          className="bg-[#862637] text-[#fee1d4] px-6 py-3 rounded-lg text-xs tracking-[0.2em] uppercase font-normal flex-1 max-w-[200px]"
        >
          Réserver ce lieu
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
                  className="text-2xl italic font-light text-[#01142a] mb-6 leading-loose"
                  style={{ fontFamily: 'Playfair Display' }}
                >
                  Deux niveaux. Un escalier sculptural. Le cœur du 2e.
                </p>
                <p className="text-sm font-light leading-loose text-gray-500 mb-8">
                  Derrière sa façade discrète, ce duplex haussmannien de 300m² s'ouvre sur deux
                  niveaux reliés par un escalier d'exception. Moulures, parquet et lumière naturelle
                  composent un cadre entièrement privatisé pour votre journée — avec une cuisine
                  professionnelle pour orchestrer déjeuners et pauses sur mesure.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Réunion', 'Séminaire', 'Workshop', 'Conférence', 'Cocktail', "Déjeuner d'affaires"].map((tag) => (
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
              className="mt-8 inline-flex items-center gap-2 text-xs font-normal text-[#01142a] tracking-widest uppercase underline underline-offset-4 hover:text-[#862637] transition-colors"
            >
              Voir toutes les photos
              <span className="text-gray-400">({allImages.length})</span>
            </button>
          </section>

          {/* ── 4. CONFIGURATIONS ── */}
          <section>
            <div className="mb-10">
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">Flexibilité</p>
              <h2
                className="text-2xl font-normal text-[#01142a]"
                style={{ fontFamily: 'Playfair Display' }}
              >
                Comment aménager l'espace ?
              </h2>
            </div>

            <div className="flex gap-2 mb-10 flex-wrap">
              {configurations.map((c, i) => (
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
                  alt={`Duplex Osmoz configuration ${configurations[activeConfig].label} Paris 2e`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
              <div>
                <p
                  className="text-5xl font-light text-[#01142a] mb-1 leading-none"
                  style={{ fontFamily: 'Playfair Display' }}
                >
                  {configurations[activeConfig].capacity}
                </p>
                <p className="text-xs font-light text-gray-400 mb-6 uppercase tracking-widest">
                  personnes · {configurations[activeConfig].label}
                </p>
                <p className="text-sm font-light text-gray-500 leading-loose">
                  {configurations[activeConfig].description}
                </p>
              </div>
            </div>
          </section>

          {/* ── 5. ÉQUIPEMENTS ── */}
          <section>
            <div className="mb-10">
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">Tout est prévu</p>
              <h2
                className="text-2xl font-normal text-[#01142a]"
                style={{ fontFamily: 'Playfair Display' }}
              >
                Équipements & services
              </h2>
            </div>

            <p className="text-xs font-light uppercase tracking-widest text-gray-300 mb-5">Inclus</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <a.icon className="h-4 w-4 text-[#862637] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-light text-[#01142a]">{a.label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-light uppercase tracking-widest text-gray-300 mb-5">Sur demande</p>
            <div className="flex flex-wrap gap-2">
              {amenitiesOnDemand.map((item) => (
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
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">Tarification</p>
              <h2
                className="text-2xl font-normal text-[#01142a]"
                style={{ fontFamily: 'Playfair Display' }}
              >
                Tarifs — location seule
              </h2>
              <p className="text-xs font-light text-gray-400 mt-2 tracking-wide">
                Hors taxes · Services traiteur et activités en supplément
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tarifs.map((t) => (
                <div
                  key={t.label}
                  className="border border-[#e5e5e5] rounded-xl p-6 bg-white hover:border-[#01142a]/40 hover:shadow-sm transition-all duration-200 group"
                >
                  <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-3">{t.label}</p>
                  <p
                    className="text-2xl font-light text-[#01142a] mb-2 group-hover:text-[#862637] transition-colors"
                    style={{ fontFamily: 'Playfair Display' }}
                  >
                    {t.price}
                  </p>
                  <p className="text-xs font-light text-gray-400">{t.hours}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA BAND ── */}
          <section className="bg-[#01142a] rounded-2xl p-10 sm:p-14">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="text-center sm:text-left">
                <p className="text-[#fee1d4]/60 text-xs uppercase tracking-[0.3em] mb-1">À partir de</p>
                <p className="text-white text-4xl font-light" style={{ fontFamily: 'Playfair Display' }}>1 499€</p>
                <p className="text-white/40 text-xs mt-1 font-light">Hors taxes · Location seule</p>
              </div>
              <button
                onClick={() => navigate('/reservation?space=duplex')}
                className="bg-white text-[#01142a] px-10 py-4 rounded-lg text-xs tracking-[0.2em] uppercase font-normal hover:bg-[#862637] hover:text-[#fee1d4] transition-all duration-300"
              >
                Réserver ce lieu
              </button>
              <div className="text-center">
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">Ou réserver via</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {platforms.map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Voir sur ${p.name}`}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                    >
                      {p.logo ? (
                        <img src={p.logo} alt={p.name} className="w-5 h-5 object-contain" loading="lazy" />
                      ) : (
                        <span className="text-xs font-light text-white">{p.name[0]}</span>
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
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">Localisation</p>
              <h2
                className="text-2xl font-normal text-[#01142a]"
                style={{ fontFamily: 'Playfair Display' }}
              >
                Comment venir ?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-start gap-3 mb-8">
                  <MapPin className="h-4 w-4 text-[#862637] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-light text-[#01142a]">146 rue Montmartre</p>
                    <p className="text-sm font-light text-gray-400">75002 Paris</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { station: 'Bourse',           line: '3',    time: '3 min à pied' },
                    { station: 'Grands Boulevards', line: '8, 9', time: '5 min à pied' },
                    { station: 'Sentier',           line: '3',    time: '5 min à pied' },
                  ].map((t) => (
                    <div key={t.station} className="flex items-center gap-3">
                      <span className="bg-[#01142a] text-white text-xs px-2.5 py-0.5 rounded font-light tracking-wide flex-shrink-0">
                        M
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-light text-[#01142a]">{t.station}</span>
                        <span className="text-xs text-gray-400">ligne {t.line}</span>
                        <span className="text-xs text-gray-400">· {t.time}</span>
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
                    title="Localisation Duplex Osmoz"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 group-hover:bg-black/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#862637]/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[#862637]" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-normal text-[#01142a] tracking-widest uppercase">
                      Voir sur la carte
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
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2">Osmoz</p>
            <h2
              className="text-2xl font-normal text-[#01142a]"
              style={{ fontFamily: 'Playfair Display' }}
            >
              Découvrir nos autres espaces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherSpaces.map((s) => (
              <Link
                key={s.title}
                to={s.link}
                className="group block bg-[#fbfbf3] rounded-xl overflow-hidden border border-[#e5e5e5] hover:border-[#01142a]/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={s.image}
                    alt={`${s.title} Osmoz`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3
                      className="text-base font-normal text-[#01142a] mb-1"
                      style={{ fontFamily: 'Playfair Display' }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-xs font-light text-gray-400 tracking-wide">
                      {s.location} · {s.surface} · {s.capacity}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-4 w-4 text-[#862637] group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            ))}
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
