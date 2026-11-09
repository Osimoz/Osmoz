import { useState, useEffect } from 'react';
import {
  MapPin, Users, Maximize2, ArrowDown, Phone, Mail,
  Wifi, Tv, Video, Presentation, Pencil, ChefHat, Shirt, Lock,
  Mic2, Lightbulb, Briefcase, UtensilsCrossed, Wine,
} from 'lucide-react';
import SEO from '../components/SEO';
import ImageGallery from '../components/ImageGallery';
import { useLocale } from '../i18n/context';
import { srcSet, SIZES } from '../lib/responsiveImage';

// Page de présentation de Bonne Nouvelle, envoyée par lien aux prospects à la
// place de la plaquette PDF. Elle se lit comme un document à part : hors
// navigation, noindex (seo-config.json), sans tarif, sans demande de devis et
// sans lien vers le reste du site (header et footer réduits, voir LangLayout).
// La suite se donne par les contacts, en bas. Les textes vivent dans
// t.bonneNouvellePresentation ; ici ne restent que les images et les icônes.
// La page publique du lieu (/spaces/bonne-nouvelle-osmoz, BonneNouvelle.tsx)
// est une autre page : celle-ci ne la remplace pas et n'y renvoie pas.

// ─── helpers ────────────────────────────────────────────────────────────────
const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);
const P = 'images/bonne-nouvelle/';

// Visuels de la plaquette, avec leur largeur réelle : le srcset ne cite que
// les variantes qui existent (scripts/generate-responsive-images.mjs).
// Les trois premiers forment la galerie ; tous alimentent la lightbox.
type PhotoKey = 'salonLounge' | 'salonReunion' | 'salonConference' | 'salleReunion' | 'salleManger' | 'cuisinePetitDej' | 'cuisineDejeuner';
const photos: { key: PhotoKey; file: string; width: number; height: number }[] = [
  { key: 'salonReunion', file: 'salon-reunion.webp', width: 1610, height: 1255 },
  { key: 'salonConference', file: 'salon-conference.webp', width: 1611, height: 1255 },
  { key: 'salleReunion', file: 'salle-de-reunion.webp', width: 1379, height: 943 },
  { key: 'salonLounge', file: 'salon-lounge.webp', width: 1086, height: 823 },
  { key: 'salleManger', file: 'salle-a-manger.webp', width: 1536, height: 1024 },
  { key: 'cuisinePetitDej', file: 'cuisine-petit-dejeuner.webp', width: 1655, height: 950 },
  { key: 'cuisineDejeuner', file: 'cuisine-dejeuner.webp', width: 1637, height: 1255 },
];
const GALLERY_COUNT = 3;
const photoOf = (key: PhotoKey) => photos.find((p) => p.key === key)!;
const indexOf = (key: PhotoKey) => photos.findIndex((p) => p.key === key);
const imgAttrs = (key: PhotoKey) => {
  const { file, width } = photoOf(key);
  const url = u(`${P}${file}`);
  return { src: url, srcSet: srcSet(url, width) };
};

// Chaque espace est illustré par une photo sans personnages.
const roomKeys = ['salon', 'reunion', 'manger', 'cuisine'] as const;
const roomPhotos: Record<(typeof roomKeys)[number], PhotoKey> = {
  salon: 'salonLounge',
  reunion: 'salleReunion',
  manger: 'salleManger',
  cuisine: 'cuisinePetitDej',
};

// Même ordre que t.bonneNouvellePresentation.formats.items / amenities.items.
const formatIcons = [Mic2, Users, Lightbulb, Briefcase, UtensilsCrossed, Wine];
const amenityIcons = [Wifi, Tv, Video, Presentation, Pencil, ChefHat, Shirt, Lock];

const kickerCls = 'text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-2';
const h2Cls = 't-h2 text-h3 text-[#01142a]';
const hide = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none'; };

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function BonneNouvellePresentation() {
  const { t } = useLocale();
  const b = t.bonneNouvellePresentation;

  const allItems = photos.map(({ key }) => ({ ...imgAttrs(key), label: b.photos[key], alt: `${b.lightboxPrefix}${b.photos[key]}` }));
  const galleryItems = allItems.slice(0, GALLERY_COUNT);
  const lightboxImages = allItems.map(({ src, alt }) => ({ url: src, alt }));

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

  const hero = photoOf('salonLounge');

  return (
    <div className="pt-0">
      <SEO route="bonneNouvellePresentation" />

      {/* ── 1. HERO ── */}
      <section className="relative h-[88vh] w-full overflow-hidden">
        <img
          {...imgAttrs('salonLounge')}
          sizes={SIZES.hero}
          alt={b.heroAlt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={hero.width}
          height={hero.height}
          className="absolute inset-0 w-full h-full object-cover"
          onError={hide}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 px-4 text-center">
          <p className="text-white/60 font-normal tracking-[0.3em] text-xs mb-4 uppercase">{b.kicker}</p>
          <h1 className="t-h1 text-hero text-white mb-4">{b.name}</h1>
          <p className="text-white/70 font-light tracking-[0.15em] text-sm mb-10 uppercase">{b.location}</p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {b.pills.map((pill) => (
              <span key={pill} className="bg-white/10 backdrop-blur-sm text-white border border-white/25 px-4 py-1.5 rounded-full text-xs font-light tracking-widest uppercase">
                {pill}
              </span>
            ))}
          </div>

          <a
            href="#lieu"
            className="btn-label inline-flex items-center gap-2 text-white border border-white/40 hover:bg-white hover:text-[#01142a] px-8 py-3.5 rounded-lg text-xs uppercase transition-all duration-300"
          >
            {b.discover}
            <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      {/* ── 2. STICKY STATS BAR (desktop) : un rappel, sans action ── */}
      <div
        className={`fixed top-[72px] left-0 right-0 z-40 bg-[#fbfbf3]/95 backdrop-blur-sm border-b border-[#e5e5e5] shadow-sm transition-all duration-500 ${
          isStatsVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <span className="t-h3 text-base text-[#01142a]">{b.name}</span>
          <div className="tnum flex items-center gap-6 text-xs font-light text-[#01142a] tracking-wide uppercase">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="h-3 w-3" strokeWidth={1.5} />{b.stats.surface}
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Users className="h-3 w-3" strokeWidth={1.5} />{b.stats.people}
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="h-3 w-3" strokeWidth={1.5} />{b.stats.address}
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-24">

          {/* ── 3. VISION ── */}
          <section id="lieu" className="scroll-mt-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
              <div className="md:col-span-6">
                <p className={kickerCls}>{b.vision.kicker}</p>
                <p className="t-quote text-2xl sm:text-3xl text-[#01142a] leading-snug">{b.vision.quote}</p>
              </div>
              <div className="md:col-span-6 md:pt-7 space-y-5">
                <p className="text-sm font-light leading-loose text-gray-600">{b.vision.p1}</p>
                <p className="text-sm font-light leading-loose text-gray-600">{b.vision.p2}</p>
              </div>
            </div>
          </section>

          {/* ── 4. LE LIEU + GALERIE ── */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start mb-12">
              <div className="md:col-span-7">
                <p className={kickerCls}>{b.place.kicker}</p>
                <h2 className={`${h2Cls} mb-6`}>{b.place.title}</h2>
                <p className="text-sm font-light leading-loose text-gray-600 mb-4">{b.place.p1}</p>
                <p className="text-sm font-light leading-loose text-gray-600 mb-4">{b.place.p2}</p>
                <p className="text-sm font-light leading-loose text-gray-600 mb-6">{b.place.p3}</p>
                <div className="flex flex-wrap gap-2">
                  {b.place.tags.map((tag) => (
                    <span key={tag} className="border border-[#01142a]/20 text-[#01142a] text-xs font-light px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <dl className="md:col-span-5 bg-white border border-[#e5e5e5] rounded-2xl p-6 sm:p-8 divide-y divide-[#f0f0e8]">
                {b.place.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-3 gap-4 py-3 first:pt-0 last:pb-0">
                    <dt className="text-xs font-light uppercase tracking-widest text-gray-400 pt-0.5">{f.label}</dt>
                    <dd className="col-span-2 text-sm font-normal text-[#01142a]">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className={kickerCls}>{b.gallery.kicker}</p>
            <h2 className={`${h2Cls} mb-8`}>{b.gallery.title}</h2>

            {/* Trois photos : l'équipe en réunion, la plénière, la salle de réunion */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {galleryItems.map((img, i) => (
                <div
                  key={img.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group bg-[#f0ede8]"
                  onClick={() => openGallery(i)}
                >
                  <img
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes="(min-width: 1280px) 420px, (min-width: 640px) 33vw, 100vw"
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={hide}
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
              {b.gallery.all} ({lightboxImages.length})
            </button>
          </section>

          {/* ── 5. LES ESPACES ── */}
          <section>
            <p className={kickerCls}>{b.rooms.kicker}</p>
            <h2 className={`${h2Cls} mb-12`}>{b.rooms.title}</h2>

            <div className="space-y-14 md:space-y-20">
              {roomKeys.map((key, i) => {
                const room = b.rooms.items[key];
                const photoKey = roomPhotos[key];
                const flip = i % 2 === 1;
                return (
                  <article key={key} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                    <div
                      className={`md:col-span-7 aspect-[4/3] overflow-hidden rounded-2xl bg-[#f0ede8] cursor-pointer group ${flip ? 'md:order-2' : ''}`}
                      onClick={() => openGallery(indexOf(photoKey))}
                    >
                      <img
                        {...imgAttrs(photoKey)}
                        sizes="(min-width: 1280px) 720px, (min-width: 768px) 58vw, 100vw"
                        alt={`${b.lightboxPrefix}${b.photos[photoKey]}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        onError={hide}
                      />
                    </div>
                    <div className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
                      <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-3">{room.formats}</p>
                      <h3 className="t-h3 text-2xl text-[#01142a] mb-3">{room.name}</h3>
                      <p className="t-key text-[2rem] text-[#01142a] mb-5">{room.capacity}</p>
                      <p className="text-sm font-light leading-loose text-gray-600 mb-6">{room.text}</p>
                      <div className="flex flex-wrap gap-2">
                        {room.equipment.map((item) => (
                          <span key={item} className="border border-[#01142a]/20 text-[#01142a] text-xs font-light px-3 py-1 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* ── 6. FORMATS ── */}
          <section>
            <p className={kickerCls}>{b.formats.kicker}</p>
            <h2 className={`${h2Cls} mb-8`}>{b.formats.title}</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {b.formats.items.map((f, i) => {
                const Icon = formatIcons[i];
                return (
                  <div key={f.label} className="border border-[#e5e5e5] rounded-xl p-5 bg-white hover:border-[#01142a]/40 hover:shadow-sm transition-all duration-200">
                    <Icon className="h-4 w-4 text-[#862637] mb-4" strokeWidth={1.5} />
                    <p className="t-key text-3xl text-[#01142a] mb-1">
                      {f.capacity} <span className="text-base">{b.formats.people}</span>
                    </p>
                    <p className="text-sm font-normal text-[#01142a] mb-1">{f.label}</p>
                    <p className="text-xs font-light text-gray-400">{f.where}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-sm font-light leading-loose text-gray-600 mt-6 max-w-3xl">{b.formats.note}</p>
          </section>

          {/* ── 7. PLAN ── */}
          <section>
            <p className={kickerCls}>{b.plan.kicker}</p>
            <h2 className={`${h2Cls} mb-8`}>{b.plan.title}</h2>
            <figure className="bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden">
              <img
                src={u(`${P}plan.webp`)}
                srcSet={srcSet(u(`${P}plan.webp`))}
                sizes="(min-width: 1280px) 1280px, 100vw"
                alt={b.plan.alt}
                loading="lazy"
                decoding="async"
                width={1920}
                height={1080}
                className="w-full h-auto"
                onError={hide}
              />
              <figcaption className="px-6 py-4 border-t border-[#f0f0e8] text-xs font-light uppercase tracking-widest text-gray-400">
                {b.plan.caption}
              </figcaption>
            </figure>
          </section>

          {/* ── 8. ÉQUIPEMENTS ── */}
          <section>
            <p className={kickerCls}>{b.amenities.kicker}</p>
            <h2 className={`${h2Cls} mb-8`}>{b.amenities.title}</h2>

            <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-4">{b.amenities.included}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
              {b.amenities.items.map((label, i) => {
                const Icon = amenityIcons[i];
                return (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[#862637] flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm font-light text-[#01142a]">{label}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-4">{b.amenities.onDemand}</p>
            <div className="flex flex-wrap gap-3">
              {b.amenities.onDemandItems.map((item) => (
                <span key={item} className="border border-[#01142a]/20 text-[#01142a] text-xs font-light px-3 py-1.5 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* ── 9. LA CHEFFE PRIVÉE FLEUR ── */}
          <section>
            <p className={kickerCls}>{b.fleur.kicker}</p>
            <h2 className={`${h2Cls} mb-8`}>{b.fleur.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center bg-white border border-[#e5e5e5] rounded-2xl p-6 sm:p-8">
              <div className="md:col-span-4 aspect-[3/4] overflow-hidden rounded-xl bg-[#f0ede8]">
                <img
                  src={u(`${P}cheffe-fleur.webp`)}
                  srcSet={srcSet(u(`${P}cheffe-fleur.webp`), 1200)}
                  sizes="(min-width: 1280px) 380px, (min-width: 768px) 30vw, 100vw"
                  alt={b.fleur.portraitAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={hide}
                />
              </div>
              <div className="md:col-span-8">
                <p className="text-sm font-light leading-loose text-gray-600 mb-6">{b.fleur.text}</p>
                <div className="aspect-[2/1] overflow-hidden rounded-xl bg-[#f0ede8]">
                  <img
                    src={u(`${P}mosaique-plats.webp`)}
                    srcSet={srcSet(u(`${P}mosaique-plats.webp`))}
                    sizes="(min-width: 1280px) 760px, (min-width: 768px) 60vw, 100vw"
                    alt={b.fleur.mosaicAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={hide}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── 10. TÉMOIGNAGES ── */}
          <section>
            <p className={kickerCls}>{b.testimonials.kicker}</p>
            <h2 className={`${h2Cls} mb-8`}>{b.testimonials.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {b.testimonials.items.map((item) => (
                <blockquote key={item.company} className="bg-white border border-[#e5e5e5] rounded-2xl p-7 flex flex-col">
                  <p className="t-quote text-base text-[#01142a] leading-relaxed flex-1">« {item.quote} »</p>
                  <footer className="mt-6 pt-4 border-t border-[#f0f0e8] text-xs font-normal uppercase tracking-[0.2em] text-gray-400">
                    {item.company}
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>

          {/* ── 11. ACCÈS ── */}
          <section>
            <p className={kickerCls}>{b.access.kicker}</p>
            <h2 className={`${h2Cls} mb-8`}>{b.access.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-start gap-3 mb-6">
                  <MapPin className="h-4 w-4 text-[#862637] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-light text-[#01142a]">{b.access.street}</p>
                    <p className="text-sm font-light text-gray-500">{b.access.city}</p>
                    <p className="text-sm font-light text-gray-500">{b.access.floor}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm font-light text-gray-600">
                  {b.access.transit.map((stop) => (
                    <div key={stop.station} className="flex items-center gap-3">
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
                    src="https://maps.google.com/maps?q=20+boulevard+Poissonni%C3%A8re+75009+Paris&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={b.access.mapTitle}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 group-hover:bg-black/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#862637]/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[#862637]" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-normal text-[#01142a] tracking-widest uppercase">{b.access.map}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ── 12. CONTACTS : la seule suite proposée ── */}
          <section>
            <p className={kickerCls}>{b.contacts.kicker}</p>
            <h2 className={`${h2Cls} mb-8`}>{b.contacts.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {b.contacts.people.map((person) => (
                <div key={person.name} className="bg-white border border-[#e5e5e5] rounded-2xl p-6 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-[#862637]/10 flex items-center justify-center flex-shrink-0">
                    <span className="t-key text-lg text-[#862637]">
                      {person.name.split(' ').map((w) => w[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-normal text-[#01142a]">{person.name}</p>
                    <p className="text-xs font-light uppercase tracking-widest text-gray-400 mb-2">{person.role}</p>
                    <a href={`tel:${person.phone.replace(/\s/g, '')}`} className="tnum inline-flex items-center gap-2 text-sm font-light text-[#01142a] hover:text-[#862637] transition-colors">
                      <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {person.phone}
                    </a>
                  </div>
                </div>
              ))}
              <a
                href={`mailto:${b.contacts.email}`}
                className="bg-[#862637] text-[#fee1d4] rounded-2xl p-6 flex items-center gap-5 hover:bg-[#01142a] hover:text-white transition-colors duration-300 sm:col-span-2 lg:col-span-1"
              >
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-light break-all">{b.contacts.email}</span>
              </a>
            </div>

            <p className="mt-16 text-center text-xs font-light uppercase tracking-widest text-gray-400">{b.confidential}</p>
          </section>

        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <ImageGallery
        images={lightboxImages}
        initialIndex={selectedImageIndex}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
