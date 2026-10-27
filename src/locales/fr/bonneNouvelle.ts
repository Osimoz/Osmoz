// Page /spaces/bonne-nouvelle-osmoz (src/pages/BonneNouvelle.tsx). Images,
// icônes, capacités et coordonnées restent dans la page.
export const bonneNouvelle = {
  name: 'Bonne Nouvelle',
  location: 'Bonne Nouvelle · Paris 9e',
  newBadge: 'Nouveau lieu',
  heroAlt: 'Salon lumineux de l’espace Bonne Nouvelle OSMOZ, avec moulures et fenêtres sur rue',
  pills: ['100 m²', '30 pers. max', 'À partir de 1 000€'],
  stats: { surface: '100 m²', people: '30 personnes', address: '20 boulevard Poissonnière, Paris 9e' },
  price: '1 000€',
  intro: {
    quote: 'Un appartement haussmannien au cœur du 9e arrondissement.',
    text: "Parquet, moulures et lumière naturelle composent un décor parisien chaleureux. Le lieu réunit un grand salon, une salle de réunion, une salle à manger et une cuisine équipée. Entièrement privatisable, il accueille réunions, workshops, journées d’étude et repas d’équipe.",
    tags: ['Réunion', 'Plénière', 'Workshop', 'Cocktail', 'Déjeuner'],
  },
  gallery: [
    { label: 'Salon', alt: 'Salon principal de l’espace Bonne Nouvelle OSMOZ' },
    { label: 'Cocktail', alt: 'Salon de l’espace Bonne Nouvelle en format cocktail' },
    { label: 'Plénière', alt: 'Salon de l’espace Bonne Nouvelle en format plénière' },
    { label: 'Réunion informelle', alt: 'Salon de l’espace Bonne Nouvelle en format réunion informelle' },
    { label: 'Salle à manger', alt: 'Salle à manger de l’espace Bonne Nouvelle OSMOZ' },
    { label: 'Salle de réunion', alt: 'Salle de réunion de l’espace Bonne Nouvelle OSMOZ' },
    { label: 'Cuisine', alt: 'Cuisine ouverte de l’espace Bonne Nouvelle OSMOZ' },
    { label: 'Toilettes', alt: 'Toilettes de l’espace Bonne Nouvelle OSMOZ' },
  ],
  configurations: [
    { label: 'Plénière', description: "Rangées de chaises face à l'écran dans le grand salon, pour présentations et formations." },
    { label: 'Cocktail', description: 'Grand salon ouvert et cuisine équipée, pour cocktails et afterworks.' },
    { label: 'Réunion informelle', description: 'Canapés et fauteuils du salon, pour échanger dans un cadre détendu.' },
    { label: 'Salle de réunion', description: 'Grande table dans une pièce dédiée, pour comités et réunions de travail.' },
    { label: 'Déjeuner', description: 'Grande table de la salle à manger, à côté de la cuisine ouverte.' },
  ],
  configurationAlt: 'Bonne Nouvelle OSMOZ',
  amenities: ['Wifi', '2 écrans', 'Écran de projection', 'Paperboards', 'Cuisine équipée'],
  amenitiesOnDemand: ['Chef privé', 'Service traiteur', 'Activités team building'],
  plan: {
    kicker: 'Plan',
    title: "Plan de l'espace",
    alt: 'Plan de l’espace Bonne Nouvelle OSMOZ : salon, salle de réunion, salle à manger et cuisine ouverte',
    enlarge: 'Agrandir le plan',
  },
  tarifs: [
    { label: 'Demi-journée', hours: '08h30 - 12h  ou  14h - 18h', price: '1 000€' },
    { label: 'Journée', hours: '08h30 - 18h30', price: '1 500€' },
    { label: 'Soirée', hours: '18h30 - 22h', price: '1 200€' },
    { label: 'Journée + soirée', hours: '08h30 - 22h', price: '2 000€' },
  ],
  access: {
    street: '20 boulevard Poissonnière',
    city: '75009 Paris',
    transit: [
      { station: 'Grands Boulevards', detail: '(lignes 8, 9) — 1 min à pied' },
      { station: 'Bonne Nouvelle', detail: '(lignes 8, 9) — 3 min à pied' },
    ],
    mapTitle: 'Localisation Bonne Nouvelle OSMOZ',
  },
  otherSpaces: {
    loft: { title: 'Le Loft', location: 'Marais, Paris 3e', surface: '110 m²', capacity: '25 pers.' },
    duplex: { title: 'Le Duplex Haussmannien', location: 'Montmartre, Paris 2e', surface: '300 m²', capacity: '40 pers.' },
    penthouse: { title: 'Le Penthouse', location: 'La Défense, Puteaux', surface: '150 m²', capacity: '40 pers.' },
  },
  jsonLd: {
    description: "Appartement haussmannien privatif de 100m² au 20 boulevard Poissonnière, Paris 9e. Parquet, moulures et lumière naturelle. Grand salon, salle de réunion, salle à manger et cuisine équipée. Idéal pour réunions, workshops, plénières, cocktails et déjeuners jusqu'à 30 personnes. Privatisation exclusive à la journée pour les entreprises.",
    amenities: ['Wifi', 'Écrans', 'Écran de projection', 'Paperboard', 'Cuisine équipée', 'Privatisation totale'],
    offers: [
      { name: 'Demi-journée', description: 'Privatisation demi-journée — 08h30-12h ou 14h-18h' },
      { name: 'Journée complète', description: 'Privatisation journée complète — 08h30-18h30' },
    ],
    breadcrumb: 'Bonne Nouvelle',
    faq: [
      { question: 'Combien de personnes peut accueillir Bonne Nouvelle OSMOZ ?', answer: "Bonne Nouvelle OSMOZ accueille jusqu'à 30 personnes. L'espace fait 100m² et est entièrement privatisé pour votre événement." },
      { question: 'Où se trouve Bonne Nouvelle OSMOZ ?', answer: 'Bonne Nouvelle OSMOZ est situé au 20 boulevard Poissonnière, Paris 9e, près des métros Grands Boulevards et Bonne Nouvelle (lignes 8 et 9).' },
      { question: 'Quel est le tarif de location de Bonne Nouvelle OSMOZ ?', answer: 'Bonne Nouvelle OSMOZ est disponible à partir de 1 000€ HT pour une demi-journée et 1 500€ HT pour une journée complète. Devis personnalisé sous 24h.' },
    ],
  },
};

export type BonneNouvelleDictionary = typeof bonneNouvelle;
