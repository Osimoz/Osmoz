// Page /spaces/loft-osmoz (src/pages/LoftOsmozV2.tsx). Images, icônes,
// capacités et coordonnées restent dans la page.
export const loft = {
  name: 'Le Loft',
  location: 'Marais · Paris 3e',
  heroAlt: 'Loft Osmoz – verrière et salon, Paris Marais',
  pills: ['110 m²', '25 pers. max', 'À partir de 649€'],
  stats: { surface: '110 m²', people: '25 personnes', address: '10 rue Roger Verlomme, Paris 3e' },
  price: '649€',
  intro: {
    quote: 'Au cœur du Marais, à deux pas de la Place des Vosges.',
    text: "Sublimé par une verrière et un mur en pierre, ce loft de 110m² conjugue authenticité et modernité. Deux espaces communicants — une salle de réunion intimiste et un salon chaleureux avec cuisine ouverte — s'adaptent à tous vos formats professionnels.",
    tags: ['Réunion', 'Séminaire', 'Workshop', 'Déjeuner', 'Shooting'],
  },
  gallery: [
    { label: 'Salon', alt: 'Salon Loft Osmoz – verrière, configuration plénière' },
    { label: 'Salle de réunion', alt: 'Salle de réunion Loft Osmoz – mur en pierre, lumière naturelle, Paris Marais' },
    { label: 'Salle à manger', alt: 'Salle à manger Loft Osmoz – grande table conviviale' },
    { label: 'Cuisine', alt: 'Cuisine équipée Loft Osmoz – bar, îlot central' },
    { label: 'Verrière', alt: 'Verrière Loft Osmoz – lumière naturelle' },
    { label: 'Plénière', alt: 'Configuration plénière Loft Osmoz – écran OSMOZ' },
    { label: 'Réunion', alt: 'Configuration réunion Loft Osmoz' },
    { label: 'Réunion – U', alt: 'Salle de réunion Loft Osmoz – configuration en U' },
    { label: 'Salle à manger', alt: 'Salle à manger Loft Osmoz – vue 2' },
    { label: 'Bar', alt: 'Bar Loft Osmoz – espace lounge et cocktail' },
    { label: 'Cocktail', alt: 'Espace cocktail Loft Osmoz' },
    { label: 'Cocktail – vue 2', alt: 'Espace cocktail Loft Osmoz – vue 2' },
    { label: 'Accueil', alt: 'Cour intérieure Loft Osmoz' },
    { label: 'Cour', alt: 'Cour pavée Loft Osmoz – fontaine' },
  ],
  configurations: [
    { label: 'Réunion', description: 'Grande table centrale, écran TV, paperboard.' },
    { label: 'Workshop', description: 'Tables modulables en îlots, mobilier déplaçable.' },
    { label: 'Plénière', description: "Rangées face à l'écran, configuration théâtre." },
    { label: 'Lounge', description: 'Canapés, bar, ambiance cocktail ou déjeuner.' },
  ],
  configurationAlt: 'Loft Osmoz',
  amenities: ['Wifi haut débit', 'Écrans connectés', 'Machine à café en grains', 'Cuisine entièrement équipée', 'Sonorisation', 'Paperboard', 'Câble HDMI', 'Bar'],
  amenitiesOnDemand: ['Chef privé', 'Service traiteur', 'Activités team building', 'Atelier cuisine'],
  tarifs: [
    { label: 'Demi-journée', hours: '08h30 - 12h  ou  14h - 18h', price: '649€' },
    { label: 'Journée', hours: '08h30 - 18h30', price: '999€' },
    { label: 'Soirée', hours: '18h30 - 22h', price: '849€' },
    { label: 'Journée + soirée', hours: '08h30 - 22h', price: '1 499€' },
  ],
  access: {
    street: '10 rue Roger Verlomme',
    city: '75003 Paris',
    transit: [
      { station: 'Chemin Vert', detail: '(ligne 8) — 3 min à pied' },
      { station: 'Bastille', detail: '(lignes 1, 5, 8) — 7 min à pied' },
      { station: 'Saint-Paul', detail: '(ligne 1) — 8 min à pied' },
    ],
    mapTitle: 'Localisation Loft Osmoz',
  },
  otherSpaces: {
    duplex: { title: 'Le Duplex Haussmannien', location: 'Montmartre, Paris 2e', surface: '300 m²', capacity: '40 pers.' },
    penthouse: { title: 'Le Penthouse', location: 'La Défense, Puteaux', surface: '150 m²', capacity: '40 pers.' },
  },
  jsonLd: {
    description: "Espace privatif de 110m² situé à deux pas de la Place des Vosges dans le Marais. Grande verrière lumineuse, ambiance contemporaine et chaleureuse. Idéal pour séminaires, réunions de direction, workshops, déjeuners d'affaires et tournages. Privatisation exclusive à la journée pour les entreprises.",
    amenities: ['Wifi haut débit', 'Écran connecté', 'Paperboard', 'Câble HDMI', 'Cuisine équipée', 'Privatisation totale'],
    offers: [
      { name: 'Demi-journée', description: 'Privatisation demi-journée — 08h30-12h ou 14h-18h' },
      { name: 'Journée complète', description: 'Privatisation journée complète — 08h30-18h30' },
    ],
    breadcrumb: 'Le Loft',
    faq: [
      { question: 'Combien de personnes peut accueillir Le Loft OSMOZ ?', answer: "Le Loft OSMOZ accueille jusqu'à 25 personnes. L'espace fait 110m² et est entièrement privatisé pour votre événement — vous êtes seuls." },
      { question: 'Où se trouve Le Loft OSMOZ ?', answer: 'Le Loft OSMOZ est situé au 10 rue Roger Verlomme, Paris 3e, à deux pas de la Place des Vosges dans le Marais.' },
      { question: 'Quel est le tarif de location du Loft OSMOZ ?', answer: 'Le Loft OSMOZ est disponible à partir de 649€ HT pour une demi-journée et 999€ HT pour une journée complète. Devis personnalisé sous 24h.' },
    ],
  },
};

export type LoftDictionary = typeof loft;
