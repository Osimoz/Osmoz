import { useState, useEffect } from 'react';
import {
  MapPin, Users, Maximize2,
  Wifi, Tv, Presentation, ChevronRight, Eye, TreePine, Layers
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

const amenities = [
  { icon: Wifi,        label: 'Wifi haut débit' },
  { icon: Tv,          label: 'Écrans connectés' },
  { icon: Maximize2,   label: 'Salle de réunion confidentielle' },
  { icon: Presentation,label: 'Paperboard' },
  { icon: Tv,          label: 'Câble HDMI' },
  { icon: Layers,      label: 'Espaces modulables' },
  { icon: TreePine,    label: 'Jardin privatif 350 m²' },
  { icon: Eye,         label: 'Vue panoramique sur Paris' },
];

const amenitiesOnDemand = [
  'Chef privé',
  'Service traiteur',
  'Activités team building',
  'Œnologie',
  'Activités outdoor',
];

const tarifs = [
  { label: 'Demi-journée',      hours: '08h30 - 12h  ou  14h - 18h', price: '1 499€' },
  { label: 'Journée',           hours: '08h30 - 18h30',               price: '2 499€' },
  { label: 'Soirée',            hours: '18h30 - 22h',                 price: '1 999€' },
  { label: 'Journée + soirée',  hours: '08h30 - 22h',                 price: '2 999€' },
];

const configurations = [
  {
    label: 'Réunion confidentielle',
    capacity: 15,
    description: 'Table en cuir noir, tapisserie ancienne, vue directe sur Paris. Idéal pour comités de direction et réunions stratégiques.',
    image: u(`${P}4 - Salle de Reunion.jpg`),
  },
  {
    label: 'Workshop / Séjour',
    capacity: 30,
    description: 'Grand séjour 70\'s modulable. Canapés déplaçables, espace flexible adapté aux ateliers.',
    image: u(`${P}16 - Salon.jpg`),
  },
  {
    label: 'Cocktail / Lounge',
    capacity: 40,
    description: 'Séjour ouvert sur le jardin suspendu. Ambiance unique perchée au-dessus de Paris.',
    image: u(`${P}2 - Salon.jpg`),
  },
  {
    label: 'Jardin suspendu',
    capacity: 40,
    description: '350 m² de gazon privatif au dernier étage. Vue panoramique sur Paris, la Tour Eiffel et La Défense.',
    image: u(`${P}7 - AI Modified Jardin.png`),
  },
];

const galleryItems = [
  { url: u(`${P}1 - AI Modified View.png`),   label: 'Vue panoramique',  alt: 'Vue panoramique Paris depuis le Penthouse Osmoz La Défense' },
  { url: u(`${P}4 - Salle de Reunion.jpg`),   label: 'Salle de réunion', alt: 'Salle de réunion confidentielle Penthouse Osmoz – table en cuir vue Paris' },
  { url: u(`${P}3 - AI modified Jardin.png`), label: 'Jardin suspendu',  alt: 'Jardin suspendu 350m² Penthouse Osmoz La Défense' },
  { url: u(`${P}5 - Salon.jpg`),              label: 'Séjour 70\'s',     alt: 'Séjour 70\'s Penthouse Osmoz – ambiance vintage lumineuse' },
  { url: u(`${P}2 - Salon.jpg`),              label: 'Salon',            alt: 'Salon Penthouse Osmoz – vue sur Paris' },
  { url: u(`${P}7 - AI Modified Jardin.png`), label: 'Jardin – vue 2',   alt: 'Jardin suspendu Penthouse Osmoz – vue 2' },
  { url: u(`${P}9 - Salon.jpg`),              label: 'Salon – vue 3',    alt: 'Salon Penthouse Osmoz – vue 3' },
  { url: u(`${P}16 - Salon.jpg`),             label: 'Séjour',           alt: 'Séjour Penthouse Osmoz – vue 16' },
];

const allImages = [
  { url: u(`${P}1 - AI Modified View.png`),   alt: 'Vue panoramique Paris – Penthouse Osmoz La Défense' },
  { url: u(`${P}2 - Salon.jpg`),              alt: 'Salon principal Penthouse Osmoz' },
  { url: u(`${P}3 - AI modified Jardin.png`), alt: 'Jardin suspendu Penthouse Osmoz – vue aérienne' },
  { url: u(`${P}4 - Salle de Reunion.jpg`),   alt: 'Salle de réunion Penthouse Osmoz – table cuir noir' },
  { url: u(`${P}5 - Salon.jpg`),              alt: 'Séjour Penthouse Osmoz – esthétique 70\'s' },
  { url: u(`${P}6 - Escalier .jpg`),          alt: 'Escalier Penthouse Osmoz' },
  { url: u(`${P}7 - AI Modified Jardin.png`), alt: 'Jardin suspendu Penthouse Osmoz – vue 2' },
  { url: u(`${P}8 - AI Modified Jardin.png`), alt: 'Jardin suspendu Penthouse Osmoz – vue 3' },
  { url: u(`${P}9 - Salon.jpg`),              alt: 'Salon Penthouse Osmoz – vue 9' },
  { url: u(`${P}10 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 10' },
  { url: u(`${P}11 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 11' },
  { url: u(`${P}12 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 12' },
  { url: u(`${P}13 - Salon .jpg`),            alt: 'Salon Penthouse Osmoz – vue 13' },
  { url: u(`${P}14 - Escalier.jpg`),          alt: 'Escalier Penthouse Osmoz – vue 14' },
  { url: u(`${P}15 - Escalier.jpg`),          alt: 'Escalier Penthouse Osmoz – vue 15' },
  { url: u(`${P}16 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 16' },
  { url: u(`${P}17 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 17' },
  { url: u(`${P}18 - Salon .jpg`),            alt: 'Salon Penthouse Osmoz – vue 18' },
  { url: u(`${P}19 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 19' },
  { url: u(`${P}20 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 20' },
  { url: u(`${P}21 - Salon .jpg`),            alt: 'Salon Penthouse Osmoz – vue 21' },
  { url: u(`${P}22 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 22' },
  { url: u(`${P}23 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 23' },
  { url: u(`${P}24 - Vue Tours.jpg`),         alt: 'Vue tours La Défense depuis Penthouse Osmoz' },
  { url: u(`${P}25 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 25' },
  { url: u(`${P}26 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 26' },
  { url: u(`${P}27 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 27' },
  { url: u(`${P}28 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 28' },
  { url: u(`${P}29 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 29' },
  { url: u(`${P}30 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 30' },
  { url: u(`${P}31 - Salon.jpg`),             alt: 'Salon Penthouse Osmoz – vue 31' },
  { url: u(`${P}32 - Vue SdR.jpg`),           alt: 'Vue salle de réunion Penthouse Osmoz – vue 32' },
  { url: u(`${P}33 - Vue SdR.jpg`),           alt: 'Vue salle de réunion Penthouse Osmoz – vue 33' },
  { url: u(`${P}34 - Vue SdR.jpg`),           alt: 'Vue salle de réunion Penthouse Osmoz – vue 34' },
  { url: u(`${P}35 - Vue SdR.jpg`),           alt: 'Vue salle de réunion Penthouse Osmoz – vue 35' },
  { url: u(`${P}36 - SdR.jpg`),              alt: 'Salle de réunion Penthouse Osmoz – vue 36' },
  { url: u(`${P}37 - SdR.jpg`),              alt: 'Salle de réunion Penthouse Osmoz – vue 37' },
  { url: u(`${P}38 - SdR.jpg`),              alt: 'Salle de réunion Penthouse Osmoz – vue 38' },
  { url: u(`${P}39 - SdR.jpg`),              alt: 'Salle de réunion Penthouse Osmoz – vue 39' },
  { url: u(`${P}40 - SdR.jpg`),              alt: 'Salle de réunion Penthouse Osmoz – vue 40' },
];

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
    title: 'Le Duplex Haussmannien',
    location: 'Montmartre, Paris 2e',
    surface: '300 m²',
    capacity: '50 pers.',
    image: u('images/Duplex Haussmannien/1 Salon Normal 3.jpg'),
    link: '/spaces/duplex-osmoz',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function PenthouseOsmoz() {
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
    name: 'Penthouse Osmoz',
    description: 'Espace privatif 150m² + jardin 350m² au dernier étage de La Défense. Vue panoramique sur Paris. Réunions, séminaires et cocktails jusqu\'à 40 personnes.',
    url: 'https://osmoz.work/spaces/penthouse-osmoz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tour Cofonca, 6-8 rue Jean Jaurès',
      addressLocality: 'Puteaux',
      postalCode: '92800',
      addressCountry: 'FR',
    },
    maximumAttendeeCapacity: 40,
    photo: 'https://osmoz.work/images/Penthouse/2%20-%20Salon.jpg',
    priceRange: '1499€ - 2999€',
  };

  return (
    <div className="pt-0">
      {/* ── SEO ── */}
      <Helmet>
        <title>Penthouse Osmoz — Location espace vue panoramique Paris La Défense | Séminaires & Réunions</title>
        <meta name="description" content="Privatisez le Penthouse Osmoz : 150m² + jardin suspendu 350m² au dernier étage d'une tour de La Défense. Vue panoramique sur Paris et la Tour Eiffel. Réunions, séminaires, cocktails jusqu'à 40 personnes." />
        <link rel="canonical" href="https://osmoz.work/spaces/penthouse-osmoz" />
        <meta property="og:title" content="Penthouse Osmoz — Espace vue panoramique Paris La Défense" />
        <meta property="og:description" content="150m² + jardin suspendu 350m² au dernier étage de La Défense. Vue panoramique sur Paris et la Tour Eiffel. À partir de 1 499€ HT." />
        <meta property="og:image" content="https://osmoz.work/images/Penthouse/2%20-%20Salon.jpg" />
        <meta property="og:url" content="https://osmoz.work/spaces/penthouse-osmoz" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── 1. HERO ── */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img
          src={u(`${P}2 - Salon.jpg`)}
          alt="Penthouse Osmoz – salon vue panoramique sur Paris, La Défense"
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
          <p className="text-white/60 font-light tracking-[0.3em] text-xs mb-4 uppercase">
            Osmoz · La Défense
          </p>
          <h1
            className="text-white font-light mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            Le Penthouse
          </h1>
          <p className="text-white/70 font-light tracking-[0.15em] text-sm mb-10 uppercase">
            La Défense · Puteaux
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {['150 m² + jardin 350 m²', '40 pers. max', 'Vue panoramique Paris', 'À partir de 1 499€ HT'].map((pill) => (
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
              <Maximize2 className="h-3 w-3" strokeWidth={1.5} />150 m² + jardin 350 m²
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Users className="h-3 w-3" strokeWidth={1.5} />40 personnes max
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="h-3 w-3" strokeWidth={1.5} />Tour Cofonca, La Défense
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

      {/* ── MOBILE STICKY CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-[#e5e5e5] px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <p className="text-xs font-light text-gray-400 uppercase tracking-widest">À partir de</p>
          <p className="text-lg font-light text-[#01142a]" style={{ fontFamily: 'Playfair Display' }}>1 499€</p>
        </div>
        <button
          onClick={() => navigate('/contact')}
          className="bg-[#862637] text-[#fee1d4] px-6 py-3 rounded-lg text-xs tracking-[0.2em] uppercase font-light flex-1 max-w-[200px]"
        >
          Réserver ce lieu
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
                  className="text-xl italic font-light text-[#01142a] mb-6 leading-loose"
                  style={{ fontFamily: 'Playfair Display' }}
                >
                  Au dernier étage d'une tour de La Défense, perché au-dessus de Paris.
                </p>
                <p className="text-sm font-light leading-loose text-gray-600 mb-6">
                  Un penthouse confidentiel de 150 m², entièrement privatisé, avec jardin suspendu de 350 m² et vue panoramique sur tout Paris. Lieu rare et inattendu — esthétique 70's, espaces baignés de lumière, salle de réunion confidentielle et jardin ouvert sur le ciel. L'ensemble compose un cadre pensé pour alterner temps de travail et moments plus informels, dans une atmosphère unique.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Réunion', 'Séminaire', 'Workshop', 'Cocktail', 'Vue panoramique', 'Outdoor'].map((tag) => (
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
              className="mt-6 text-sm font-light text-[#01142a] underline underline-offset-4 hover:text-[#862637] transition-colors"
            >
              Voir toutes les photos ({allImages.length})
            </button>
          </section>

          {/* ── 4. CONFIGURATIONS ── */}
          <section>
            <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-2">Configurations</p>
            <h2 className="text-2xl font-light text-[#01142a] mb-8" style={{ fontFamily: 'Playfair Display' }}>
              Comment aménager l'espace ?
            </h2>

            <div className="flex gap-2 mb-8 flex-wrap">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#f0ede8]">
                <img
                  src={configurations[activeConfig].image}
                  alt={`Penthouse Osmoz – configuration ${configurations[activeConfig].label} La Défense`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div>
                <p className="text-3xl font-light text-[#01142a] mb-1" style={{ fontFamily: 'Playfair Display' }}>
                  {configurations[activeConfig].capacity} personnes
                </p>
                <p className="text-sm font-light text-gray-500 mb-4 uppercase tracking-widest">
                  {configurations[activeConfig].label}
                </p>
                <p className="text-sm font-light text-gray-600 leading-loose">
                  {configurations[activeConfig].description}
                </p>
              </div>
            </div>
          </section>

          {/* ── 5. ÉQUIPEMENTS ── */}
          <section>
            <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-2">Services</p>
            <h2 className="text-2xl font-light text-[#01142a] mb-8" style={{ fontFamily: 'Playfair Display' }}>
              Équipements & services
            </h2>

            <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-4">Inclus</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
              {amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <a.icon className="h-4 w-4 text-[#862637] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-light text-[#01142a]">{a.label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-4">Sur demande</p>
            <div className="flex flex-wrap gap-3">
              {amenitiesOnDemand.map((item) => (
                <span key={item} className="border border-[#01142a]/20 text-[#01142a] text-xs font-light px-3 py-1.5 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* ── 6. TARIFS ── */}
          <section>
            <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-2">Tarification</p>
            <h2 className="text-2xl font-light text-[#01142a] mb-2" style={{ fontFamily: 'Playfair Display' }}>
              Tarifs — location seule
            </h2>
            <p className="text-xs font-light text-gray-400 mb-8 uppercase tracking-widest">Hors taxes · Services en supplément</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tarifs.map((t) => (
                <div key={t.label} className="border border-[#e5e5e5] rounded-xl p-5 bg-white hover:border-[#01142a]/40 hover:shadow-sm transition-all duration-200 group">
                  <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-2">{t.label}</p>
                  <p
                    className="text-2xl font-light text-[#01142a] mb-2 group-hover:text-[#862637] transition-colors"
                    style={{ fontFamily: 'Playfair Display' }}
                  >
                    {t.price}
                  </p>
                  <p className="text-xs font-light text-gray-500">{t.hours}</p>
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
                onClick={() => navigate('/contact')}
                className="bg-white text-[#01142a] px-10 py-4 rounded-lg text-xs tracking-[0.2em] uppercase font-light hover:bg-[#862637] hover:text-[#fee1d4] transition-all duration-300"
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
            <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-2">Localisation</p>
            <h2 className="text-2xl font-light text-[#01142a] mb-8" style={{ fontFamily: 'Playfair Display' }}>
              Comment venir ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-start gap-3 mb-6">
                  <MapPin className="h-4 w-4 text-[#862637] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-light text-[#01142a]">Tour Cofonca, 6-8 rue Jean Jaurès</p>
                    <p className="text-sm font-light text-gray-500">92800 Puteaux</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm font-light text-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#01142a] text-white text-xs px-2 py-0.5 rounded font-light flex-shrink-0">M</span>
                    <span><strong className="font-normal text-[#01142a]">La Défense – Grande Arche</strong> (ligne 1) — 5 min à pied</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#01142a] text-white text-xs px-2 py-0.5 rounded font-light flex-shrink-0">RER</span>
                    <span><strong className="font-normal text-[#01142a]">La Défense</strong> (RER A) — 5 min à pied</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#01142a] text-white text-xs px-2 py-0.5 rounded font-light flex-shrink-0">T</span>
                    <span><strong className="font-normal text-[#01142a]">La Défense</strong> (Tram T2) — 3 min à pied</span>
                  </div>
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
                    title="Localisation Penthouse Osmoz – Tour Cofonca La Défense"
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
      </div>

      {/* ── 8. CROSS-SELL ── */}
      <section className="bg-white border-t border-[#e5e5e5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-2">Nos espaces</p>
          <h2
            className="text-2xl font-light text-[#01142a] mb-10"
            style={{ fontFamily: 'Playfair Display' }}
          >
            Découvrir nos autres espaces
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherSpaces.map((s) => (
              <Link
                key={s.title}
                to={s.link}
                className="group block bg-[#fbfbf3] rounded-xl overflow-hidden border border-[#e5e5e5] hover:border-[#01142a]/30 transition-all duration-300 hover:shadow-md"
              >
                <div className="aspect-[16/9] overflow-hidden bg-[#f0ede8]">
                  <img
                    src={s.image}
                    alt={`${s.title} – Osmoz`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-light text-[#01142a] mb-1">{s.title}</h3>
                    <p className="text-xs font-light text-gray-400">{s.location} · {s.surface} · {s.capacity}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#862637] group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
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
