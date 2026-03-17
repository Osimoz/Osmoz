import { useState, useEffect } from 'react';
import { MapPin, Users, Maximize2, Calendar, Coffee, Wifi, Tv, UtensilsCrossed, Presentation, Music, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ImageGallery from '../components/ImageGallery';

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

const amenities = [
  { icon: Wifi,             label: 'Wifi haut débit' },
  { icon: Tv,               label: 'Écrans connectés' },
  { icon: Coffee,           label: 'Machine à café en grains' },
  { icon: UtensilsCrossed,  label: 'Cuisine entièrement équipée' },
  { icon: Music,            label: 'Sonorisation' },
  { icon: Presentation,     label: 'Paperboard' },
  { icon: Tv,               label: 'Câble HDMI' },
  { icon: Maximize2,        label: 'Bar' },
];

const amenitiesOnDemand = [
  'Chef privé',
  'Service traiteur',
  'Activités team building',
  'Atelier cuisine',
];

const tarifs = [
  { label: 'Demi-journée', hours: '08h30 - 12h  ou  14h - 18h', price: '749€' },
  { label: 'Journée',      hours: '08h30 - 18h30',               price: '1 099€' },
  { label: 'Soirée',       hours: '18h30 - 22h',                 price: '849€' },
  { label: 'Journée + soirée', hours: '08h30 - 22h',             price: '1 499€' },
];

const configurations = [
  {
    label: 'Réunion',
    capacity: 14,
    description: 'Grande table centrale, écran TV, paperboard.',
    images: [
      u('images/Loft/1 SdR.jpg'),
      u('images/Loft/11 Salle de reunion 2.jpg'),
    ],
  },
  {
    label: 'Workshop',
    capacity: 20,
    description: 'Tables modulables en îlots, mobilier déplaçable.',
    images: [
      u('images/Loft/12 Salle de reunion 4.jpg'),
      u('images/Loft/13 Salle de reunion 5.jpg'),
    ],
  },
  {
    label: 'Plénière',
    capacity: 25,
    description: "Rangées face à l'écran, configuration théâtre.",
    images: [
      u('images/Loft/7 Salon pleiniere 1.jpg'),
      u('images/Loft/2 Salon pleiniere 2.jpg'),
    ],
  },
  {
    label: 'Lounge',
    capacity: 25,
    description: 'Canapés, bar, ambiance cocktail ou déjeuner.',
    images: [
      u('images/Loft/21 Cuisine 3.jpg'),
      u('images/Loft/18 Cocktail 3.jpg'),
      u('images/Loft/17 Cocktail 2.jpg'),
      u('images/Loft/5 Accueil.jpg'),
    ],
  },
];

// Galerie labellisée
const galleryItems = [
  { url: u('images/Loft/2 Salon pleiniere 2.jpg'),    label: 'Salon',             alt: 'Salon Loft Osmoz – verrière, configuration plénière' },
  { url: u('images/Loft/1 SdR.jpg'),                 label: 'Salle de réunion',  alt: 'Salle de réunion Loft Osmoz – mur en pierre, lumière naturelle, Paris Marais' },
  { url: u('images/Loft/3 salle a manger.jpg'),       label: 'Salle à manger',    alt: 'Salle à manger Loft Osmoz – grande table conviviale' },
  { url: u('images/Loft/4 Cuisine 5.jpg'),            label: 'Cuisine',           alt: 'Cuisine équipée Loft Osmoz – bar, îlot central' },
  { url: u('images/Loft/7 Salon pleiniere 1.jpg'),    label: 'Verrière',          alt: 'Verrière Loft Osmoz – lumière naturelle' },
  { url: u('images/Loft/6 Salon pleiniere 6.jpg'),    label: 'Plénière',          alt: 'Configuration plénière Loft Osmoz – écran OSMOZ' },
  { url: u('images/Loft/11 Salle de reunion 2.jpg'),  label: 'Réunion',           alt: 'Configuration réunion Loft Osmoz' },
  { url: u('images/Loft/12 Salle de reunion 4.jpg'),  label: 'Réunion – U',       alt: 'Salle de réunion Loft Osmoz – configuration en U' },
  { url: u('images/Loft/9 salle a manger.jpg'),       label: 'Salle à manger',    alt: 'Salle à manger Loft Osmoz – vue 2' },
  { url: u('images/Loft/21 Cuisine 3.jpg'),           label: 'Bar',               alt: 'Bar Loft Osmoz – espace lounge et cocktail' },
  { url: u('images/Loft/18 Cocktail 3.jpg'),          label: 'Cocktail',          alt: 'Espace cocktail Loft Osmoz' },
  { url: u('images/Loft/8 Cocktail 1.jpg'),           label: 'Cocktail – vue 2',  alt: 'Espace cocktail Loft Osmoz – vue 2' },
  { url: u('images/Loft/5 Accueil.jpg'),              label: 'Accueil',           alt: 'Cour intérieure Loft Osmoz' },
  { url: u('images/Loft/25 DSC4695-HDR.jpg'),         label: 'Cour',              alt: 'Cour pavée Loft Osmoz – fontaine' },
];

// Cross-sell autres lieux
const otherSpaces = [
  {
    title: 'Le Duplex Haussmannien',
    location: 'Montmartre, Paris 2e',
    surface: '300 m²',
    capacity: '50 pers.',
    image: u('images/Duplex Haussmannien/1 Salon Normal 3.jpg'),
    link: '/spaces/duplex-osmoz',
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

export default function LoftOsmozV2() {
  const navigate = useNavigate();
  const [activeConfig, setActiveConfig] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  // Show sticky stats bar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => setIsStatsVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allImages = galleryItems.map((g) => ({ url: g.url, alt: g.alt }));

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  // ── structured data JSON-LD ──
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: 'Loft Osmoz',
    description: 'Espace atypique 110m² au cœur du Marais, Paris 3e. Idéal pour réunions, séminaires, workshops, shootings.',
    url: 'https://osmoz.work/spaces/loft-osmoz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10 rue Roger Verlomme',
      addressLocality: 'Paris',
      postalCode: '75003',
      addressCountry: 'FR',
    },
    maximumAttendeeCapacity: 25,
    photo: 'https://osmoz.work/images/Loft/2%20Salon%20pleiniere%202.jpg',
  };

  return (
    <div className="pt-0">
      {/* ── SEO ── */}
      <Helmet>
        <title>Loft Osmoz — Location espace atypique Marais Paris 3e</title>
        <meta name="description" content="Louez le Loft Osmoz, 110m² au cœur du Marais près de la Place des Vosges. Idéal pour réunions, séminaires, workshops et shootings. Cuisine équipée, verrière, ambiance unique." />
        <link rel="canonical" href="https://osmoz.work/spaces/loft-osmoz" />
        <meta property="og:title" content="Loft Osmoz — Espace atypique Marais Paris 3e" />
        <meta property="og:description" content="110m² au cœur du Marais, verrière, cuisine équipée, modulable. À partir de 749€." />
        <meta property="og:image" content="https://osmoz.work/images/Loft/2%20Salon%20pleiniere%202.jpg" />
        <meta property="og:url" content="https://osmoz.work/spaces/loft-osmoz" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── 1. HERO ── */}
      <section className="relative h-[88vh] w-full overflow-hidden">
        <img
          src={u('images/Loft/2 Salon pleiniere 2.jpg')}
          alt="Loft Osmoz – verrière et salon, Paris Marais"
          fetchPriority="high"
          loading="eager"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* content */}
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 px-4 text-center">
          <h1
            className="text-white font-light mb-3 leading-tight"
            style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Le Loft
          </h1>
          <p className="text-white/80 font-light tracking-[0.2em] text-sm mb-8 uppercase">
            Marais · Paris 3e
          </p>

          {/* pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {['110 m²', '25 pers. max', 'À partir de 749€'].map((pill) => (
              <span
                key={pill}
                className="bg-white/15 backdrop-blur-sm text-white border border-white/30 px-4 py-1.5 rounded-full text-sm font-light tracking-wide"
              >
                {pill}
              </span>
            ))}
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-[#01142a] px-10 py-3.5 rounded-lg text-sm tracking-widest font-light hover:bg-[#862637] hover:text-[#fee1d4] border border-white transition duration-300"
          >
            Réserver ce lieu
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
            <span className="flex items-center gap-1.5"><Maximize2 className="h-3.5 w-3.5" />110 m²</span>
            <span className="hidden sm:flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />25 personnes</span>
            <span className="hidden md:flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />10 rue Roger Verlomme, Paris 3e</span>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="bg-[#862637] text-[#fee1d4] px-5 py-2 rounded-lg text-xs tracking-widest font-light hover:bg-[#fee1d4] hover:text-[#862637] transition duration-300 whitespace-nowrap"
          >
            Demander un devis
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-20">

            {/* ── 3. DESCRIPTION + GALERIE ── */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* texte */}
                <div>
                  <p
                    className="text-xl italic font-light text-[#01142a] mb-6 leading-relaxed"
                    style={{ fontFamily: 'Playfair Display' }}
                  >
                    Au cœur du Marais, à deux pas de la Place des Vosges.
                  </p>
                  <p className="text-sm font-light leading-relaxed text-gray-600 mb-6">
                    Sublimé par une verrière et un mur en pierre, ce loft de 110m² conjugue authenticité et modernité.
                    Deux espaces communicants — une salle de réunion intimiste et un salon chaleureux avec cuisine ouverte — s'adaptent à tous vos formats professionnels.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Réunion', 'Séminaire', 'Workshop', 'Déjeuner', 'Shooting'].map((tag) => (
                      <span key={tag} className="border border-[#01142a]/20 text-[#01142a] text-xs font-light px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* galerie 2x2 */}
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
                        loading="lazy"
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
                className="mt-6 text-sm font-light text-[#01142a] underline underline-offset-4 hover:text-[#862637] transition-colors"
              >
                Voir toutes les photos ({allImages.length})
              </button>
            </section>

            {/* ── 4. CONFIGURATIONS ── */}
            <section>
              <h2 className="text-2xl font-light text-[#01142a] mb-8" style={{ fontFamily: 'Playfair Display' }}>
                Comment aménager l'espace ?
              </h2>

              {/* tabs */}
              <div className="flex gap-2 mb-8 flex-wrap">
                {configurations.map((c, i) => (
                  <button
                    key={c.label}
                    onClick={() => setActiveConfig(i)}
                    className={`px-5 py-2 rounded-full text-sm font-light tracking-wide transition-all duration-200 ${
                      activeConfig === i
                        ? 'bg-[#01142a] text-white'
                        : 'bg-white border border-[#01142a]/20 text-[#01142a] hover:border-[#01142a]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* config content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src={configurations[activeConfig].images[0]}
                    alt={`Loft Osmoz – configuration ${configurations[activeConfig].label}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-3xl font-light text-[#01142a] mb-1" style={{ fontFamily: 'Playfair Display' }}>
                    {configurations[activeConfig].capacity} personnes
                  </p>
                  <p className="text-sm font-light text-gray-500 mb-4 uppercase tracking-widest">
                    {configurations[activeConfig].label}
                  </p>
                  <p className="text-sm font-light text-gray-600 leading-relaxed">
                    {configurations[activeConfig].description}
                  </p>
                </div>
              </div>
            </section>

            {/* ── 5. ÉQUIPEMENTS ── */}
            <section>
              <h2 className="text-2xl font-light text-[#01142a] mb-8" style={{ fontFamily: 'Playfair Display' }}>
                Équipements & services
              </h2>

              <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-4">Inclus</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
                {amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <a.icon className="h-4 w-4 text-[#862637] flex-shrink-0" />
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
              <h2 className="text-2xl font-light text-[#01142a] mb-2" style={{ fontFamily: 'Playfair Display' }}>
                Tarifs — location seule
              </h2>
              <p className="text-xs font-light text-gray-400 mb-8 uppercase tracking-widest">Hors taxes · Services en supplément</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tarifs.map((t) => (
                  <div key={t.label} className="border border-[#e5e5e5] rounded-lg p-5 bg-white hover:border-[#01142a] transition-colors duration-200">
                    <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-2">{t.label}</p>
                    <p
                      className="text-2xl font-light text-[#01142a] mb-2"
                      style={{ fontFamily: 'Playfair Display' }}
                    >
                      {t.price}
                    </p>
                    <p className="text-xs font-light text-gray-500">{t.hours}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-[#862637] text-[#fee1d4] px-10 py-3.5 rounded-lg text-sm tracking-widest font-light hover:bg-[#fee1d4] hover:text-[#862637] border border-transparent transition duration-300"
                >
                  Demander un devis
                </button>
              </div>
            </section>

            {/* ── 7. ACCÈS ── */}
            <section>
              <h2 className="text-2xl font-light text-[#01142a] mb-8" style={{ fontFamily: 'Playfair Display' }}>
                Comment venir ?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="flex items-start gap-3 mb-5">
                    <MapPin className="h-4 w-4 text-[#862637] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-light text-[#01142a]">10 rue Roger Verlomme</p>
                      <p className="text-sm font-light text-gray-500">75003 Paris</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm font-light text-gray-600">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#01142a] text-white text-xs px-2 py-0.5 rounded font-light">M</span>
                      <span><strong className="font-normal text-[#01142a]">Chemin Vert</strong> (ligne 8) — 3 min à pied</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#01142a] text-white text-xs px-2 py-0.5 rounded font-light">M</span>
                      <span><strong className="font-normal text-[#01142a]">Bastille</strong> (lignes 1, 5, 8) — 7 min à pied</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#01142a] text-white text-xs px-2 py-0.5 rounded font-light">M</span>
                      <span><strong className="font-normal text-[#01142a]">Saint-Paul</strong> (ligne 1) — 8 min à pied</span>
                    </div>
                  </div>
                </div>

                {/* Google Maps lazy — click to load */}
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#e5e5e5] relative group cursor-pointer"
                  onClick={(e) => {
                    const target = e.currentTarget;
                    target.innerHTML = `<iframe src="https://maps.google.com/maps?q=10+rue+Roger+Verlomme+75003+Paris&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy"></iframe>`;
                  }}
                >
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=10+rue+Roger+Verlomme,Paris&zoom=15&size=600x400&key=`}
                    alt="Carte Loft Osmoz – 10 rue Roger Verlomme Paris 3e"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 group-hover:bg-black/10 transition-colors">
                    <MapPin className="h-8 w-8 text-[#862637]" />
                    <span className="text-sm font-light text-[#01142a]">Cliquer pour ouvrir la carte</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="lg:col-span-1">
            <div className="bg-[#faf9f7] p-8 rounded-lg border border-[#e5e5e5] sticky top-24">

              <div className="space-y-3 mb-6 text-sm font-light text-[#01142a]">
                <div className="flex items-center gap-2">
                  <Maximize2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span>110 m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span>Jusqu'à 25 personnes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span>Marais, Paris 3e</span>
                </div>
              </div>

              <div className="border-t border-[#e5e5e5] pt-5 mb-6">
                <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-3">Tarifs</p>
                <div className="space-y-2">
                  {tarifs.map((t) => (
                    <div key={t.label} className="flex justify-between items-center text-sm font-light text-[#01142a]">
                      <span className="text-gray-500">{t.label}</span>
                      <span>{t.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-[#862637] text-[#fee1d4] px-6 py-3.5 rounded-lg text-sm tracking-widest font-light hover:bg-[#fee1d4] hover:text-[#862637] border border-transparent transition duration-300 flex items-center justify-center gap-2 mb-6"
              >
                <Calendar className="h-4 w-4" />
                Réserver ce lieu
              </button>

              <p className="text-xs font-light text-center text-gray-400 mb-4">Ou réserver via</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {platforms.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Voir sur ${p.name}`}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-[#01142a] bg-white hover:bg-[#fce9de] transition-colors"
                  >
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} className="w-5 h-5 object-contain" loading="lazy" />
                    ) : (
                      <span className="text-xs font-light text-gray-600">{p.name[0]}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 8. CROSS-SELL ── */}
      <section className="bg-white border-t border-[#e5e5e5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="group block bg-[#fbfbf3] rounded-lg overflow-hidden border border-[#e5e5e5] hover:border-[#01142a] transition-all duration-300 hover:shadow-md"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={s.image}
                    alt={`${s.title} – Osmoz`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-light text-[#01142a] mb-1">{s.title}</h3>
                    <p className="text-xs font-light text-gray-400">{s.location} · {s.surface} · {s.capacity}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#862637] group-hover:translate-x-1 transition-transform" />
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
