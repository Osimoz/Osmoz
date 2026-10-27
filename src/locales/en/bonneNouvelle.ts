import type { BonneNouvelleDictionary } from '../fr/bonneNouvelle';

export const bonneNouvelle: BonneNouvelleDictionary = {
  name: 'Bonne Nouvelle',
  location: 'Bonne Nouvelle · Paris 9th',
  newBadge: 'New venue',
  heroAlt: 'Bright lounge at OSMOZ Bonne Nouvelle, with mouldings and tall windows',
  pills: ['100 m²', 'Up to 30 people', 'From 1,000 €'],
  stats: { surface: '100 m²', people: '30 people', address: '20 boulevard Poissonnière, Paris 9th' },
  price: '1,000 €',
  intro: {
    quote: 'A Haussmann-style apartment in the heart of Paris’s 9th arrondissement.',
    text: 'Parquet floors, mouldings and natural light create a warm Parisian setting. The space includes a large lounge, a meeting room, a dining room and a fitted kitchen. Fully private, it hosts meetings, workshops, team days and shared meals.',
    tags: ['Meeting', 'Plenary', 'Workshop', 'Cocktail party', 'Lunch'],
  },
  gallery: [
    { label: 'Lounge', alt: 'Main lounge of the OSMOZ Bonne Nouvelle space' },
    { label: 'Cocktail party', alt: 'Bonne Nouvelle lounge arranged for a cocktail party' },
    { label: 'Plenary', alt: 'Bonne Nouvelle lounge arranged in a plenary layout' },
    { label: 'Informal meeting', alt: 'Bonne Nouvelle lounge arranged for an informal meeting' },
    { label: 'Dining room', alt: 'Dining room of the OSMOZ Bonne Nouvelle space' },
    { label: 'Meeting room', alt: 'Meeting room of the OSMOZ Bonne Nouvelle space' },
    { label: 'Kitchen', alt: 'Open kitchen of the OSMOZ Bonne Nouvelle space' },
    { label: 'Restroom', alt: 'Restroom of the OSMOZ Bonne Nouvelle space' },
  ],
  configurations: [
    { label: 'Plenary', description: 'Rows of chairs facing the screen in the main lounge, for presentations and training sessions.' },
    { label: 'Cocktail party', description: 'Open lounge and fitted kitchen, for cocktail parties and after-work drinks.' },
    { label: 'Informal meeting', description: 'Sofas and armchairs in the lounge, for relaxed discussions.' },
    { label: 'Meeting room', description: 'A large table in a dedicated room, for committees and working sessions.' },
    { label: 'Lunch', description: 'The large dining room table, next to the open kitchen.' },
  ],
  configurationAlt: 'Bonne Nouvelle OSMOZ',
  amenities: ['Wifi', '2 screens', 'Projection screen', 'Flipcharts', 'Fitted kitchen'],
  amenitiesOnDemand: ['Private chef', 'Catering', 'Team-building activities'],
  plan: {
    kicker: 'Floor plan',
    title: 'Floor plan',
    alt: 'Floor plan of OSMOZ Bonne Nouvelle: lounge, meeting room, dining room and open kitchen',
    enlarge: 'Enlarge the floor plan',
  },
  tarifs: [
    { label: 'Half day', hours: '8:30am - 12pm  or  2pm - 6pm', price: '1,000 €' },
    { label: 'Full day', hours: '8:30am - 6:30pm', price: '1,500 €' },
    { label: 'Evening', hours: '6:30pm - 10pm', price: '1,200 €' },
    { label: 'Day + evening', hours: '8:30am - 10pm', price: '2,000 €' },
  ],
  access: {
    street: '20 boulevard Poissonnière',
    city: '75009 Paris',
    transit: [
      { station: 'Grands Boulevards', detail: '(lines 8, 9) — 1 min walk' },
      { station: 'Bonne Nouvelle', detail: '(lines 8, 9) — 3 min walk' },
    ],
    mapTitle: 'Bonne Nouvelle OSMOZ location',
  },
  otherSpaces: {
    loft: { title: 'Le Loft', location: 'Le Marais, Paris 3rd', surface: '110 m²', capacity: '25 people' },
    duplex: { title: 'Le Duplex Haussmannien', location: 'Montmartre, Paris 2nd', surface: '300 m²', capacity: '40 people' },
    penthouse: { title: 'Le Penthouse', location: 'La Défense, Puteaux', surface: '150 m²', capacity: '40 people' },
  },
  jsonLd: {
    description: 'Private 100 m² Haussmann-style apartment at 20 boulevard Poissonnière, Paris 9th. Parquet floors, mouldings and natural light. Large lounge, meeting room, dining room and fitted kitchen. Ideal for meetings, workshops, plenaries, cocktail parties and lunches for up to 30 people. Exclusive day hire for companies.',
    amenities: ['Wifi', 'Screens', 'Projection screen', 'Flipchart', 'Fitted kitchen', 'Exclusive hire'],
    offers: [
      { name: 'Half day', description: 'Half-day exclusive hire — 8:30am-12pm or 2pm-6pm' },
      { name: 'Full day', description: 'Full-day exclusive hire — 8:30am-6:30pm' },
    ],
    breadcrumb: 'Bonne Nouvelle',
    faq: [
      { question: 'How many people can OSMOZ Bonne Nouvelle host?', answer: 'OSMOZ Bonne Nouvelle hosts up to 30 people. The 100 m² space is fully private for your event.' },
      { question: 'Where is OSMOZ Bonne Nouvelle?', answer: 'OSMOZ Bonne Nouvelle is at 20 boulevard Poissonnière, Paris 9th, near Grands Boulevards and Bonne Nouvelle metro stations (lines 8 and 9).' },
      { question: 'How much does it cost to hire OSMOZ Bonne Nouvelle?', answer: 'OSMOZ Bonne Nouvelle is available from 1,000 € excl. VAT for a half day and 1,500 € excl. VAT for a full day. Tailored quote within 24 hours.' },
    ],
  },
};
