import { useState, useEffect } from 'react';
import {
  MapPin, Users, Maximize2, Calendar, Coffee,
  Wifi, Tv, UtensilsCrossed, Presentation, ChevronRight
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ImageGallery from '../components/ImageGallery';

const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);
const D = 'images/Duplex Haussmannien/';

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
  { label: 'Demi-journée',      hours: '08h30 - 12h  ou  14h - 18h', price: '1 999€' },
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
    image: u(`${D}8 Reunion Salon 1.jpg`),
  },
  {
    label: 'Conférence',
    capacity: 30,
    description: "Disposition en conférence face à l'écran pour présentations, formations et ateliers stratégiques.",
    image: u(`${D}9 Salon Conference 4.jpg`),
  },
  {
    label: 'Rectangle',
    capacity: 25,
    description: 'Tables en rectangle pour favoriser les échanges et la collaboration en groupe.',
    image: u(`${D}10 Salon rectangle 1.jpg`),
  },
  {
    label: 'Cocktail',
    capacity: 50,
    description: 'Deux niveaux ouverts, cuisine équipée, bar. Ambiance conviviale pour cocktails, déjeuners et afterworks.',
    image: u(`${D}1 Salon Normal 3.jpg`),
  },
];

// ─── GALERIE PREVIEW 2x2 ─────────────────────────────────────────────────────
const galleryItems = [
  { url: u(`${D}1 Salon Normal 3.jpg`),     label: 'Salon principal',    alt: 'Salon principal Duplex Haussmannien Osmoz - moulures parquet lumiere naturelle Paris 2e' },
  { url: u(`${D}4 Escalier.jpg`),           label: 'Escalier sculptural', alt: 'Escalier sculptural Duplex Osmoz - deux niveaux charme haussmannien' },
  { url: u(`${D}3 Cuisine 5.jpg`),          label: 'Cuisine',            alt: 'Cuisine professionnelle equipee Duplex Osmoz Paris 2e' },
  { url: u(`${D}8 Reunion Salon 1.jpg`),    label: 'Salle de réunion',   alt: 'Configuration reunion Duplex Osmoz grande table ecran TV' },
  { url: u(`${D}9 Salon Conference 4.jpg`), label: 'Conférence',         alt: 'Configuration conference Duplex Osmoz 30 personnes' },
  { url: u(`${D}6 Exterieur 3.jpg`),        label: 'Extérieur',          alt: 'Exterieur cour privee Duplex Osmoz Paris Montmartre' },
  { url: u(`${D}2 OK DEN 2.png`),           label: 'Bureau',             alt: 'Espace bureau lounge Duplex Osmoz' },
  { url: u(`${D}36 Escalier haut 2.jpg`),   label: 'Étage',              alt: 'Second niveau Duplex Osmoz' },
];

// ─── TOUTES LES IMAGES LIGHTBOX ──────────────────────────────────────────────
const allImages = [
  { url: u(`${D}1 Salon Normal 3.jpg`),       alt: 'Salon principal vue 3' },
  { url: u(`${D}2 OK DEN 2.png`),             alt: 'Bureau lounge' },
  { url: u(`${D}2 Salle TV 1.jpg`),           alt: 'Salle TV vue 1' },
  { url: u(`${D}3 Cuisine 5.jpg`),            alt: 'Cuisine vue 5' },
  { url: u(`${D}4 Escalier.jpg`),             alt: 'Escalier sculptural' },
  { url: u(`${D}5 Entree 2.jpg`),             alt: 'Entree vue 2' },
  { url: u(`${D}6 Exterieur 3.jpg`),          alt: 'Exterieur vue 3' },
  { url: u(`${D}7 Entree 1.jpg`),             alt: 'Entree vue 1' },
  { url: u(`${D}8 Reunion Salon 1.jpg`),      alt: 'Reunion salon vue 1' },
  { url: u(`${D}9 Salon Conference 4.jpg`),   alt: 'Salon conference vue 4' },
  { url: u(`${D}10 Salon rectangle 1.jpg`),   alt: 'Salon rectangle vue 1' },
  { url: u(`${D}11 Salon rectangle 2.jpg`),   alt: 'Salon rectangle vue 2' },
  { url: u(`${D}12 Salon rectangle 3.jpg`),   alt: 'Salon rectangle vue 3' },
  { url: u(`${D}13 Reunion Salon 2.jpg`),     alt: 'Reunion salon vue 2' },
  { url: u(`${D}14 Reunion Salon 3.jpg`),     alt: 'Reunion salon vue 3' },
  { url: u(`${D}15 Reunion Salon 4.jpg`),     alt: 'Reunion salon vue 4' },
  { url: u(`${D}16 Salon conference 1.jpg`),  alt: 'Salon conference vue 1' },
  { url: u(`${D}17 Salon conference 2.jpg`),  alt: 'Salon conference vue 2' },
  { url: u(`${D}18 Salon Conference 3.jpg`),  alt: 'Salon conference vue 3' },
  { url: u(`${D}19 OK LIVING ROOM 7.png`),    alt: 'Living room vue 7' },
  { url: u(`${D}20 Salon normal 1.jpg`),      alt: 'Salon normal vue 1' },
  { url: u(`${D}21 Salon normal 2.jpg`),      alt: 'Salon normal vue 2' },
  { url: u(`${D}22 OK LIVING ROOM 1.png`),    alt: 'Living room vue 1' },
  { url: u(`${D}23 Salon normal 4.jpg`),      alt: 'Salon normal vue 4' },
  { url: u(`${D}24 Salon normal 5.jpg`),      alt: 'Salon normal vue 5' },
  { url: u(`${D}25 Salon normal 6.jpg`),      alt: 'Salon normal vue 6' },
  { url: u(`${D}26 Cuisine 1.jpg`),           alt: 'Cuisine vue 1' },
  { url: u(`${D}27 Cuisine 2.jpg`),           alt: 'Cuisine vue 2' },
  { url: u(`${D}28 OK KITCHEN 1.png`),        alt: 'Cuisine kitchen vue 1' },
  { url: u(`${D}29 DETAILS 3.png`),           alt: 'Details vue 3' },
  { url: u(`${D}30 Cuisine 3.jpg`),           alt: 'Cuisine vue 3' },
  { url: u(`${D}31 OK KITCHEN 2.png`),        alt: 'Cuisine kitchen vue 2' },
  { url: u(`${D}32 Cuisine 4.jpg`),           alt: 'Cuisine vue 4' },
  { url: u(`${D}33 Cuisine 6.jpg`),           alt: 'Cuisine vue 6' },
  { url: u(`${D}34 Cuisine 7.jpg`),           alt: 'Cuisine vue 7' },
  { url: u(`${D}35 OK DETAILS 2.png`),        alt: 'Details vue 2' },
  { url: u(`${D}36 Escalier haut 2.jpg`),     alt: 'Escalier haut vue 2' },
  { url: u(`${D}37 Escalier Haut 1.jpg`),     alt: 'Escalier haut vue 1' },
  { url: u(`${D}38 Salle TV 2.jpg`),          alt: 'Salle TV vue 2' },
  { url: u(`${D}39 OK DETAILS 4.png`),        alt: 'Details vue 4' },
  { url: u(`${D}40 Chambre 1.jpg`),           alt: 'Chambre vue 1' },
  { url: u(`${D}41 Chambre 2.jpg`),           alt: 'Chambre vue 2' },
  { url: u(`${D}42 Chambre 3.jpg`),           alt: 'Chambre vue 3' },
  { url: u(`${D}43 Chambre 4.jpg`),           alt: 'Chambre vue 4' },
  { url: u(`${D}44 Chambre 5.jpg`),           alt: 'Chambre vue 5' },
  { url: u(`${D}45 Salle de bain 1.jpg`),     alt: 'Salle de bain vue 1' },
  { url: u(`${D}46 Salle de bain 2.jpg`),     alt: 'Salle de bain vue 2' },
  { url: u(`${D}47 Salle de bain 3.jpg`),     alt: 'Salle de bain vue 3' },
  { url: u(`${D}48 Salle de bain bas.jpg`),   alt: 'Salle de bain bas' },
  { url: u(`${D}49 Exterieur 1.jpg`),         alt: 'Exterieur vue 1' },
  { url: u(`${D}50 Exterieur 2.jpg`),         alt: 'Exterieur vue 2' },
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
    capacity: '50 pers.',
    image: u('images/Penthouse/penthouse-hero.jpg'),
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
    '@type': 'EventVenue',
    name: 'Duplex Haussmannien Osmoz',
    description: "Espace premium 300m² au cœur de Paris 2e. Duplex haussmannien sur deux niveaux avec escalier sculptural, moulures et parquet. Idéal pour réunions, séminaires et événements entreprise jusqu'à 50 personnes.",
    url: 'https://osmoz.work/spaces/duplex-osmoz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '146 rue Montmartre',
      addressLocality: 'Paris',
      postalCode: '75002',
      addressCountry: 'FR',
    },
    maximumAttendeeCapacity: 50,
    photo: 'https://osmoz.work/images/Duplex%20Haussmannien/1%20Salon%20Normal%203.jpg',
    priceRange: '1999€ - 2999€',
  };

  return (
    <div className="pt-0">

      {/* ── SEO ── */}
      <Helmet>
        <title>Duplex Haussmannien Osmoz — Location espace premium Paris 2e Montmartre</title>
        <meta name="description" content="Louez le Duplex Haussmannien Osmoz : 300m² sur 2 niveaux au cœur de Paris 2e. Moulures, escalier sculptural, cuisine équipée. Idéal pour réunions, séminaires et conférences jusqu'à 50 personnes. À partir de 1 999€ HT." />
        <link rel="canonical" href="https://osmoz.work/spaces/duplex-osmoz" />
        <meta property="og:title" content="Duplex Haussmannien Osmoz — Espace premium Paris 2e" />
        <meta property="og:description" content="300m² haussmanniens sur 2 niveaux. Moulures, escalier sculptural, cuisine équipée. Jusqu'à 50 personnes. À partir de 1 999€ HT." />
        <meta property="og:image" content="https://osmoz.work/images/Duplex%20Haussmannien/1%20Salon%20Normal%203.jpg" />
        <meta property="og:url" content="https://osmoz.work/spaces/duplex-osmoz" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {/* Preload above-the-fold images */}
        <link rel="preload" as="image" href={u(`${D}1 Salon Normal 3.jpg`)} />
        <link rel="preload" as="image" href={u(`${D}4 Escalier.jpg`)} />
        <link rel="preload" as="image" href={u(`${D}3 Cuisine 5.jpg`)} />
        <link rel="preload" as="image" href={u(`${D}8 Reunion Salon 1.jpg`)} />
      </Helmet>

      {/* ── 1. HERO ── */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img
          src={u(`${D}1 Salon Normal 3.jpg`)}
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
          <p className="text-white/60 font-light tracking-[0.3em] text-xs mb-4 uppercase">
            Osmoz · Paris 2e
          </p>
          <h1
            className="text-white font-light mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
          >
            Le Duplex Haussmannien
          </h1>
          <p className="text-white/70 font-light tracking-[0.15em] text-sm mb-10 uppercase">
            146 rue Montmartre · Paris 2e
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {['300 m²', '2 niveaux', '50 pers. max', 'À partir de 1 999€ HT'].map((pill) => (
              <span
                key={pill}
                className="bg-white/10 backdrop-blur-sm text-white border border-white/25 px-4 py-1.5 rounded-full text-xs font-light tracking-widest uppercase"
              >
                {pill}
              </span>
            ))}
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-[#01142a] px-12 py-4 rounded-lg text-xs tracking-[0.2em] font-light uppercase hover:bg-[#862637] hover:text-[#fee1d4] border border-white transition-all duration-300"
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
              <Users className="h-3 w-3" />50 personnes max
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />146 rue Montmartre, Paris 2e
            </span>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="bg-[#862637] text-[#fee1d4] px-5 py-2 rounded-lg text-xs tracking-widest font-light uppercase hover:bg-[#fee1d4] hover:text-[#862637] transition duration-300 whitespace-nowrap"
          >
            Demander un devis
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-24">

            {/* ── 3. DESCRIPTION + GALERIE ── */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

                <div>
                  <p
                    className="text-2xl italic font-light text-[#01142a] mb-6 leading-relaxed"
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

                <div className="grid grid-cols-2 gap-3">
                  {galleryItems.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => openGallery(i)}
                    >
                      <img
                        src={img.url}
                        alt={img.alt}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs font-light px-2 py-0.5 rounded">
                        {img.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => openGallery(0)}
                className="mt-8 inline-flex items-center gap-2 text-xs font-light text-[#01142a] tracking-widest uppercase underline underline-offset-4 hover:text-[#862637] transition-colors"
              >
                Voir toutes les photos
                <span className="text-gray-400">({allImages.length})</span>
              </button>
            </section>

            {/* ── 4. CONFIGURATIONS ── */}
            <section>
              <div className="mb-10">
                <p className="text-xs font-light uppercase tracking-[0.2em] text-gray-400 mb-2">Flexibilité</p>
                <h2
                  className="text-2xl font-light text-[#01142a]"
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
                    className={`px-5 py-2 rounded-full text-xs font-light tracking-widest uppercase transition-all duration-200 ${
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
                <p className="text-xs font-light uppercase tracking-[0.2em] text-gray-400 mb-2">Tout est prévu</p>
                <h2
                  className="text-2xl font-light text-[#01142a]"
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
                <p className="text-xs font-light uppercase tracking-[0.2em] text-gray-400 mb-2">Tarification</p>
                <h2
                  className="text-2xl font-light text-[#01142a]"
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
                    <p className="text-xs font-light text-gray-400 leading-relaxed">{t.hours}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-[#862637] text-[#fee1d4] px-12 py-4 rounded-lg text-xs tracking-[0.2em] font-light uppercase hover:bg-[#fee1d4] hover:text-[#862637] border border-transparent transition-all duration-300"
                >
                  Demander un devis
                </button>
              </div>
            </section>

            {/* ── 7. ACCÈS ── */}
            <section>
              <div className="mb-10">
                <p className="text-xs font-light uppercase tracking-[0.2em] text-gray-400 mb-2">Localisation</p>
                <h2
                  className="text-2xl font-light text-[#01142a]"
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
                      <span className="text-xs font-light text-[#01142a] tracking-widest uppercase">
                        Voir sur la carte
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="lg:col-span-1">
            <div className="bg-[#faf9f7] rounded-2xl border border-[#e8e6e1] p-8 sticky top-24">

              <div className="space-y-3 mb-8 text-sm font-light text-[#01142a]">
                <div className="flex items-center gap-3">
                  <Maximize2 className="h-4 w-4 text-gray-300 flex-shrink-0" strokeWidth={1.5} />
                  <span>300 m² sur 2 niveaux</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-gray-300 flex-shrink-0" strokeWidth={1.5} />
                  <span>Jusqu'à 50 personnes</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-300 flex-shrink-0" strokeWidth={1.5} />
                  <span>Montmartre, Paris 2e</span>
                </div>
              </div>

              <div className="border-t border-[#e5e5e5] pt-6 mb-8">
                <p className="text-xs font-light uppercase tracking-[0.2em] text-gray-400 mb-4">Tarifs HT</p>
                <div className="space-y-2.5">
                  {tarifs.map((t) => (
                    <div key={t.label} className="flex justify-between items-baseline text-sm font-light">
                      <span className="text-gray-400">{t.label}</span>
                      <span className="text-[#01142a]">{t.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-[#862637] text-[#fee1d4] px-6 py-4 rounded-xl text-xs tracking-[0.2em] font-light uppercase hover:bg-[#fee1d4] hover:text-[#862637] border border-transparent transition-all duration-300 flex items-center justify-center gap-2 mb-6"
              >
                <Calendar className="h-4 w-4" strokeWidth={1.5} />
                Réserver ce lieu
              </button>

              <p className="text-xs font-light text-center text-gray-300 mb-4 tracking-widest uppercase">
                Aussi disponible sur
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {platforms.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Voir sur ${p.name}`}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] hover:border-[#01142a] bg-white hover:bg-[#fce9de] transition-all duration-200"
                  >
                    {p.logo ? (
                      <img
                        src={p.logo}
                        alt={p.name}
                        className="w-5 h-5 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xs font-light text-gray-500">{p.name[0]}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 8. CROSS-SELL ── */}
      <section className="bg-white border-t border-[#e5e5e5] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-light uppercase tracking-[0.2em] text-gray-400 mb-2">Osmoz</p>
            <h2
              className="text-2xl font-light text-[#01142a]"
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
                      className="text-base font-light text-[#01142a] mb-1"
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
