import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Users } from 'lucide-react';

const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);

const spaces = [
  {
    id: 'loft-osmoz',
    slug: 'loft',
    title: 'Le Loft Osmoz',
    eyebrow: 'Marais · Paris 3e',
    description: 'Un loft contemporain de 120 m² au cœur du Marais. Volumes épurés, lumière zénithale et mobilier modulable pour vos réunions et ateliers d\'exception.',
    image: u('images/Loft/7 Salon pleiniere 1.jpg'),
    capacity: '25 personnes',
    price: 'À partir de 649 €',
    tags: ['Réunion', 'Atelier', 'Séminaire'],
  },
  {
    id: 'duplex-osmoz',
    slug: 'duplex',
    title: 'Le Duplex Haussmannien',
    eyebrow: 'Montmartre · Paris 2e',
    description: 'Duplex haussmannien lumineux avec verrières, moulures et parquet. Deux niveaux modulables, cuisine équipée et cour privée pour des journées de travail mémorables.',
    image: u('images/Duplex Haussmannien/webp/duplex-salon-01.webp'),
    capacity: '40 personnes',
    price: 'À partir de 1 499 €',
    tags: ['Séminaire', 'Cocktail', 'Workshop'],
  },
  {
    id: 'penthouse-osmoz',
    slug: 'penthouse',
    title: 'Le Penthouse',
    eyebrow: 'La Défense · Vue panoramique',
    description: 'Penthouse confidentiel de 150 m² avec jardin suspendu de 350 m² au dernier étage d\'une tour de La Défense. Vue sur Paris et la Tour Eiffel. Un lieu rare.',
    image: u('images/Penthouse/1 - AI Modified View.jpg'),
    capacity: '40 personnes',
    price: 'À partir de 1 499 €',
    tags: ['Privatisation', 'Événement', 'Rooftop'],
  },
];

export default function Spaces() {
  const spacesBreadcrumbLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://osmoz.work/' },
          { '@type': 'ListItem', position: 2, name: 'Nos espaces', item: 'https://osmoz.work/spaces' },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Espaces privatifs authentiques OSMOZ à Paris',
        description: 'Sélection d\'espaces authentiques privatisables à Paris et La Défense pour événements corporate',
        numberOfItems: 3,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Le Loft OSMOZ — Marais Paris 3e',
            url: 'https://osmoz.work/spaces/loft-osmoz',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Le Duplex Haussmannien OSMOZ — Paris 2e',
            url: 'https://osmoz.work/spaces/duplex-osmoz',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Le Penthouse OSMOZ — La Défense Puteaux',
            url: 'https://osmoz.work/spaces/penthouse-osmoz',
          },
        ],
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Nos Espaces — Location d'Espaces Authentiques Paris | OSMOZ</title>
        <meta name="description" content="Trois espaces privatifs authentiques à Paris pour vos événements d'entreprise. Le Loft au Marais, Le Duplex Paris 2e, Le Penthouse La Défense. De 5 à 40 personnes. Privatisation exclusive. Devis sous 24h." />
        <link rel="canonical" href="https://osmoz.work/spaces" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(spacesBreadcrumbLd)}</script>
      </Helmet>

      <div className="pt-32 pb-24 bg-[#fbfbf3]">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-4">
            Nos espaces
          </p>
          <h1
            className="font-light text-[#01142a] max-w-2xl mb-5"
            style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Trois lieux. Une seule promesse.
          </h1>
          <p className="text-base font-normal text-gray-500 max-w-xl leading-relaxed">
            Des lieux privatifs, chaleureux et authentiques où vos équipes se retrouvent vraiment.
          </p>
        </div>

        {/* Space cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
          {spaces.map((space, i) => (
            <Link
              key={space.id}
              to={`/spaces/${space.id}`}
              className="group block"
            >
              <div className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-0 rounded-3xl overflow-hidden border border-[#e5e5e5] bg-white hover:shadow-2xl transition-all duration-500`}>
                {/* Image */}
                <div className="relative lg:w-[55%] aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <img
                    src={space.image}
                    alt={space.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Tags */}
                  <div className="absolute top-5 left-5 flex gap-2 flex-wrap">
                    {space.tags.map(tag => (
                      <span key={tag} className="bg-white/90 backdrop-blur-sm text-[#01142a] text-[10px] font-light uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-[45%] flex flex-col justify-center p-8 sm:p-12 lg:p-14">
                  <p className="text-[10px] font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">
                    {space.eyebrow}
                  </p>
                  <h2
                    className="font-light text-[#01142a] mb-5"
                    style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                  >
                    {space.title}
                  </h2>
                  <p className="text-sm font-light text-gray-500 leading-loose mb-8 max-w-sm">
                    {space.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-6 mb-10">
                    <div className="flex items-center gap-2 text-sm font-light text-[#01142a]">
                      <Users className="h-4 w-4 text-[#862637]" />
                      {space.capacity}
                    </div>
                    <div className="text-sm font-light text-[#01142a]">
                      {space.price}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="inline-flex items-center gap-2 bg-[#862637] text-[#fee1d4] px-6 py-3 rounded-xl text-xs tracking-[0.18em] uppercase font-normal group-hover:bg-[#01142a] group-hover:text-white transition-all duration-300">
                      Découvrir
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <Link
                      to={`/reservation?space=${space.slug}`}
                      onClick={e => e.stopPropagation()}
                      className="text-xs font-normal tracking-[0.18em] uppercase text-[#01142a] underline underline-offset-4 hover:text-[#862637] transition-colors duration-200"
                    >
                      Réserver ce lieu
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA band */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="bg-[#01142a] rounded-3xl p-10 sm:p-16 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-white/40 mb-3">Privatisation clé en main</p>
              <h3
                className="font-light text-white max-w-md"
                style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                Pas encore sûr de quel espace vous convient ?
              </h3>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 border border-white/30 text-white px-8 py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-normal hover:bg-white hover:text-[#01142a] transition-all duration-300 inline-flex items-center gap-2"
            >
              Nous contacter
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
