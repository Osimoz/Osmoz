// Page /spaces/penthouse-osmoz (src/pages/PenthouseOsmoz.tsx).
export const penthouse = {
  kicker: 'Osmoz · La Défense',
  name: 'Le Penthouse',
  location: 'La Défense · Puteaux',
  heroAlt: 'Penthouse Osmoz – Séjour 4, La Défense',
  pills: ['150 m² + jardin 350 m²', '40 pers. max', 'Vue panoramique Paris', 'À partir de 1 499€ HT'],
  stats: { surface: '150 m² + jardin 350 m²', people: '40 personnes max', address: 'Tour Cofonca, La Défense' },
  price: '1 499€',
  intro: {
    quote: "Au dernier étage d'une tour de La Défense, perché au-dessus de Paris.",
    text: "Un penthouse confidentiel de 150 m², entièrement privatisé, avec jardin suspendu de 350 m² et vue panoramique sur tout Paris. Lieu rare et inattendu, esthétique 70's, espaces baignés de lumière, salle de réunion confidentielle et jardin ouvert sur le ciel. L'ensemble compose un cadre pensé pour alterner temps de travail et moments plus informels, dans une atmosphère unique.",
    tags: ['Réunion', 'Séminaire', 'Workshop', 'Cocktail', 'Vue panoramique', 'Outdoor'],
  },
  // Noms de pièces des photos (« <pièce> <n> » en galerie, « Penthouse Osmoz – <pièce> <n> » en lightbox).
  rooms: {
    rooftop: 'Rooftop',
    bureau: 'Bureau',
    sejour: 'Séjour',
    sejourReunion: 'Séjour format réunion',
    sejourConference: 'Séjour format conférence',
    escalier: 'Escalier',
    sdb: 'SDB',
  },
  lightboxPrefix: 'Penthouse Osmoz – ',
  configurations: [
    { label: 'Réunion confidentielle', description: 'Table en cuir noir, tapisserie ancienne, vue directe sur Paris. Idéal pour comités de direction et réunions stratégiques.' },
    { label: 'Workshop / Séjour', description: "Grand séjour 70's modulable. Canapés déplaçables, espace flexible adapté aux ateliers." },
    { label: 'Cocktail / Lounge', description: 'Séjour ouvert sur le jardin suspendu. Ambiance unique perchée au-dessus de Paris.' },
    { label: 'Jardin suspendu', description: '350 m² de gazon privatif au dernier étage. Vue panoramique sur Paris, la Tour Eiffel et La Défense.' },
  ],
  configurationAltBefore: 'Penthouse Osmoz – configuration ',
  configurationAltAfter: ' La Défense',
  amenities: ['Wifi haut débit', 'Écrans connectés', 'Salle de réunion confidentielle', 'Paperboard', 'Câble HDMI', 'Espaces modulables', 'Jardin privatif 350 m²', 'Vue panoramique sur Paris'],
  amenitiesOnDemand: ['Chef privé', 'Service traiteur', 'Activités team building', 'Œnologie', 'Activités outdoor'],
  tarifs: [
    { label: 'Demi-journée', hours: '08h30 - 12h  ou  14h - 18h', price: '1 499€' },
    { label: 'Journée', hours: '08h30 - 18h30', price: '2 499€' },
    { label: 'Soirée', hours: '18h30 - 22h', price: '1 999€' },
    { label: 'Journée + soirée', hours: '08h30 - 22h', price: '2 999€' },
  ],
  access: {
    street: 'Tour Cofonca, 6-8 rue Jean Jaurès',
    city: '92800 Puteaux',
    transit: [
      { badge: 'M', station: 'La Défense – Grande Arche', detail: '(ligne 1) — 5 min à pied' },
      { badge: 'RER', station: 'La Défense', detail: '(RER A) — 5 min à pied' },
      { badge: 'T', station: 'La Défense', detail: '(Tram T2) — 3 min à pied' },
    ],
    mapTitle: 'Localisation Penthouse Osmoz – Tour Cofonca La Défense',
  },
  otherSpaces: {
    loft: { title: 'Le Loft', location: 'Marais, Paris 3e', surface: '110 m²', capacity: '25 pers.' },
    duplex: { title: 'Le Duplex Haussmannien', location: 'Montmartre, Paris 2e', surface: '300 m²', capacity: '40 pers.' },
  },
  jsonLd: {
    description: "Penthouse de 150m² avec jardin suspendu de 350m² au dernier étage d'une tour de La Défense. Vue panoramique sur Paris et la Tour Eiffel, esthétique 70's, salle de réunion confidentielle. Idéal pour séminaires, cocktails, réunions de direction et événements outdoor jusqu'à 40 personnes. Privatisation exclusive à la journée pour les entreprises.",
    amenities: ['Wifi haut débit', 'Écran connecté', 'Jardin suspendu 350m²', 'Vue panoramique Paris', 'Salle de réunion confidentielle', 'Paperboard', 'Câble HDMI', 'Privatisation totale'],
    offers: [
      { name: 'Demi-journée', description: 'Privatisation demi-journée — 08h30-12h ou 14h-18h' },
      { name: 'Journée complète', description: 'Privatisation journée complète — 08h30-18h30' },
      { name: 'Soirée', description: 'Privatisation soirée — 18h30-22h' },
      { name: 'Journée + soirée', description: 'Privatisation journée complète + soirée — 08h30-22h' },
    ],
    breadcrumb: 'Le Penthouse',
    faq: [
      { question: 'Combien de personnes peut accueillir Le Penthouse OSMOZ ?', answer: "Le Penthouse OSMOZ accueille jusqu'à 40 personnes en intérieur et jusqu'à 40 personnes sur le rooftop suspendu de 350m² avec vue sur Paris." },
      { question: 'Où se trouve Le Penthouse OSMOZ ?', answer: 'Le Penthouse OSMOZ est situé Tour Cofonca, 6-8 rue Jean Jaurès, Puteaux 92800. Accès depuis le métro La Défense ligne 1 en 5 minutes à pied.' },
      { question: 'Quel est le tarif de location du Penthouse OSMOZ ?', answer: 'Le Penthouse OSMOZ est disponible à partir de 1499€ HT pour une demi-journée, 2499€ HT pour une journée complète et 1999€ HT pour une soirée. Devis personnalisé sous 24h.' },
    ],
  },
};

export type PenthouseDictionary = typeof penthouse;
