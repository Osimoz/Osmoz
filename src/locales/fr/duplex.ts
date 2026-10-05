// Page /spaces/duplex-osmoz (src/pages/DuplexOsmozV2.tsx).
export const duplex = {
  kicker: 'Osmoz · Paris 2e',
  name: 'Le Duplex Haussmannien',
  location: '146 rue Montmartre · Paris 2e',
  heroAlt: 'Duplex Haussmannien Osmoz - salon principal lumineux moulures parquet Paris 2e',
  pills: ['300 m²', '2 niveaux', '40 pers. max', 'À partir de 1 499€ HT'],
  stats: { surface: '300 m²', people: '40 personnes max', address: '146 rue Montmartre, Paris 2e' },
  price: '1 499€',
  intro: {
    quote: 'Deux niveaux. Un escalier sculptural. Le cœur du 2e.',
    text: "Derrière sa façade discrète, ce duplex haussmannien de 300m² s'ouvre sur deux niveaux reliés par un escalier d'exception. Moulures, parquet et lumière naturelle composent un cadre entièrement privatisé pour votre journée — avec une cuisine professionnelle pour orchestrer déjeuners et pauses sur mesure.",
    tags: ['Réunion', 'Séminaire', 'Workshop', 'Conférence', 'Cocktail', "Déjeuner d'affaires"],
  },
  gallery: [
    { label: 'Salon', alt: 'Salon Duplex Osmoz - Paris' },
    { label: 'Cuisine', alt: 'Cuisine équipée Duplex Osmoz - Paris' },
    { label: 'Salle de réunion', alt: 'Salle de réunion Duplex Osmoz' },
    { label: 'Salle de réunion', alt: 'Configuration réunion Duplex Osmoz' },
    { label: 'Dîner & Déjeuner', alt: 'Dîner et déjeuner Duplex Osmoz' },
    { label: 'Entrée', alt: 'Entrée Duplex Osmoz' },
    { label: 'Ambiance', alt: 'Ambiance Duplex Osmoz' },
    { label: 'Façade', alt: 'Façade extérieure Duplex Osmoz' },
  ],
  // Alt des photos de la lightbox : « <pièce> vue <n> » (ou la pièce seule).
  rooms: {
    salon: 'Salon',
    salonEtage: 'Salon étage',
    cuisine: 'Cuisine',
    salleReunion: 'Salle de réunion',
    reunion: 'Réunion',
    diner: 'Dîner Déjeuner',
    entree: 'Entrée',
    ambiance: 'Ambiance',
    facade: 'Façade extérieure',
  },
  view: 'vue',
  configurationsKicker: 'Flexibilité',
  configurations: [
    { label: 'Réunion', description: 'Grande table centrale dans le salon haussmannien, écran TV, paperboard. Idéal pour réunions de direction et comités.' },
    { label: 'Conférence', description: "Disposition en conférence face à l'écran pour présentations, formations et ateliers stratégiques." },
    { label: 'Rectangle', description: 'Tables en rectangle pour favoriser les échanges et la collaboration en groupe.' },
    { label: 'Cocktail', description: 'Deux niveaux ouverts, cuisine équipée, bar. Ambiance conviviale pour cocktails, déjeuners et afterworks.' },
  ],
  configurationAltBefore: 'Duplex Osmoz configuration ',
  configurationAltAfter: ' Paris 2e',
  amenitiesKicker: 'Tout est prévu',
  amenities: ['Wifi haut débit', 'Écrans connectés', 'Machine à café en grains', 'Cuisine entièrement équipée', 'Câble HDMI', 'Paperboard', 'Espaces modulables sur 2 niveaux', 'Ventilation'],
  amenitiesOnDemand: ['Chef privé', 'Service traiteur', 'Activités team building', 'Atelier cuisine', 'Œnologie'],
  tarifs: [
    { label: 'Demi-journée', hours: '08h30 - 12h  ou  14h - 18h', price: '1 499€' },
    { label: 'Journée', hours: '08h30 - 18h30', price: '2 499€' },
    { label: 'Soirée', hours: '18h30 - 22h', price: '1 999€' },
    { label: 'Journée + soirée', hours: '08h30 - 22h', price: '2 999€' },
  ],
  pricingNote: 'Hors taxes · Services traiteur et activités en supplément',
  access: {
    street: '146 rue Montmartre',
    city: '75002 Paris',
    lineLabel: 'ligne',
    transit: [
      { station: 'Bourse', line: '3', time: '3 min à pied' },
      { station: 'Grands Boulevards', line: '8, 9', time: '5 min à pied' },
      { station: 'Sentier', line: '3', time: '5 min à pied' },
    ],
    mapTitle: 'Localisation Duplex Osmoz',
  },
  crossSellKicker: 'Osmoz',
  otherSpaces: {
    loft: { title: 'Le Loft', location: 'Marais, Paris 3e', surface: '110 m²', capacity: '25 pers.' },
    penthouse: { title: 'Le Penthouse', location: 'La Défense, Puteaux', surface: '150 m²', capacity: '40 pers.' },
  },
  jsonLd: {
    description: "Appartement haussmannien de 300m² sur deux étages au cœur du 2e arrondissement de Paris. Esprit résidentiel chic, escalier en ferronnerie, parquet ancien. Idéal pour séminaires, conférences, cocktails, dîners de direction et journées d'équipe jusqu'à 40 personnes. Privatisation exclusive à la journée pour les entreprises.",
    amenities: ['Wifi haut débit', 'Écran connecté', 'Paperboard', 'Câble HDMI', 'Cuisine équipée', 'Deux étages', 'Privatisation totale'],
    offers: [
      { name: 'Demi-journée', description: 'Privatisation demi-journée — 08h30-12h ou 14h-18h' },
      { name: 'Journée complète', description: 'Privatisation journée complète — 08h30-18h30' },
    ],
    breadcrumb: 'Le Duplex',
    faq: [
      { question: 'Combien de personnes peut accueillir Le Duplex OSMOZ ?', answer: "Le Duplex Haussmannien OSMOZ accueille jusqu'à 40 personnes sur 300m² répartis sur deux étages. L'appartement est entièrement privatisé." },
      { question: 'Où se trouve Le Duplex OSMOZ ?', answer: 'Le Duplex OSMOZ est situé au 146 rue Montmartre, Paris 2e, au cœur du 2e arrondissement de Paris.' },
      { question: 'Quel est le tarif de location du Duplex OSMOZ ?', answer: 'Le Duplex OSMOZ est disponible à partir de 1 499€ HT pour une demi-journée et 2 499€ HT pour une journée complète. Devis personnalisé sous 24h.' },
    ],
  },
};

export type DuplexDictionary = typeof duplex;
