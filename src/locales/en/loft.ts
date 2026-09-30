import type { LoftDictionary } from '../fr/loft';

export const loft: LoftDictionary = {
  name: 'Le Loft',
  location: 'Le Marais · Paris 3rd',
  heroAlt: 'Loft Osmoz – glass roof and lounge, Le Marais, Paris',
  pills: ['110 m²', 'Up to 25 people', 'From 649 €'],
  stats: { surface: '110 m²', people: '25 people', address: '10 rue Roger Verlomme, Paris 3rd' },
  price: '649 €',
  intro: {
    quote: 'In the heart of Le Marais, a stone’s throw from Place des Vosges.',
    text: 'With its glass roof and stone wall, this 110 m² loft combines character and modernity. Two connecting spaces — an intimate meeting room and a warm lounge with an open kitchen — adapt to every professional format.',
    tags: ['Meeting', 'Off-site', 'Workshop', 'Lunch', 'Photo shoot'],
  },
  gallery: [
    { label: 'Lounge', alt: 'Loft Osmoz lounge – glass roof, plenary layout' },
    { label: 'Meeting room', alt: 'Loft Osmoz meeting room – stone wall, natural light, Le Marais, Paris' },
    { label: 'Dining room', alt: 'Loft Osmoz dining room – large convivial table' },
    { label: 'Kitchen', alt: 'Loft Osmoz fitted kitchen – bar, central island' },
    { label: 'Glass roof', alt: 'Loft Osmoz glass roof – natural light' },
    { label: 'Plenary', alt: 'Loft Osmoz plenary layout – OSMOZ screen' },
    { label: 'Meeting', alt: 'Loft Osmoz meeting layout' },
    { label: 'Meeting – U-shape', alt: 'Loft Osmoz meeting room – U-shape layout' },
    { label: 'Dining room', alt: 'Loft Osmoz dining room – view 2' },
    { label: 'Bar', alt: 'Loft Osmoz bar – lounge and cocktail area' },
    { label: 'Cocktail', alt: 'Loft Osmoz cocktail area' },
    { label: 'Cocktail – view 2', alt: 'Loft Osmoz cocktail area – view 2' },
    { label: 'Entrance', alt: 'Loft Osmoz inner courtyard' },
    { label: 'Courtyard', alt: 'Loft Osmoz cobbled courtyard – fountain' },
  ],
  configurations: [
    { label: 'Meeting', description: 'Large central table, TV screen, flipchart.' },
    { label: 'Workshop', description: 'Modular tables in clusters, movable furniture.' },
    { label: 'Plenary', description: 'Rows facing the screen, theatre-style layout.' },
    { label: 'Lounge', description: 'Sofas, bar, cocktail or lunch atmosphere.' },
  ],
  configurationAlt: 'Loft Osmoz',
  amenities: ['High-speed wifi', 'Connected screens', 'Bean-to-cup coffee machine', 'Fully equipped kitchen', 'Sound system', 'Flipchart', 'HDMI cable', 'Bar'],
  amenitiesOnDemand: ['Private chef', 'Catering', 'Team-building activities', 'Cooking workshop'],
  tarifs: [
    { label: 'Half day', hours: '8:30am - 12pm  or  2pm - 6pm', price: '649 €' },
    { label: 'Full day', hours: '8:30am - 6:30pm', price: '999 €' },
    { label: 'Evening', hours: '6:30pm - 10pm', price: '849 €' },
    { label: 'Day + evening', hours: '8:30am - 10pm', price: '1,499 €' },
  ],
  access: {
    street: '10 rue Roger Verlomme',
    city: '75003 Paris',
    transit: [
      { station: 'Chemin Vert', detail: '(line 8) — 3 min walk' },
      { station: 'Bastille', detail: '(lines 1, 5, 8) — 7 min walk' },
      { station: 'Saint-Paul', detail: '(line 1) — 8 min walk' },
    ],
    mapTitle: 'Loft Osmoz location',
  },
  otherSpaces: {
    duplex: { title: 'Le Duplex Haussmannien', location: 'Montmartre, Paris 2nd', surface: '300 m²', capacity: '40 people' },
    penthouse: { title: 'Le Penthouse', location: 'La Défense, Puteaux', surface: '150 m²', capacity: '40 people' },
  },
  jsonLd: {
    description: 'Private space of 110 m² a stone’s throw from Place des Vosges in Le Marais. Large bright glass roof, contemporary and warm atmosphere. Ideal for off-sites, board meetings, workshops, business lunches and film shoots. Exclusive day hire for companies.',
    amenities: ['High-speed wifi', 'Connected screen', 'Flipchart', 'HDMI cable', 'Fitted kitchen', 'Fully private'],
    offers: [
      { name: 'Half day', description: 'Half-day private hire — 8:30am-12pm or 2pm-6pm' },
      { name: 'Full day', description: 'Full-day private hire — 8:30am-6:30pm' },
    ],
    breadcrumb: 'Le Loft',
    faq: [
      { question: 'How many people can Le Loft OSMOZ host?', answer: 'Le Loft OSMOZ hosts up to 25 people. The space is 110 m² and entirely private for your event — you have it to yourselves.' },
      { question: 'Where is Le Loft OSMOZ?', answer: 'Le Loft OSMOZ is at 10 rue Roger Verlomme, Paris 3rd, a stone’s throw from Place des Vosges in Le Marais.' },
      { question: 'How much does it cost to hire Le Loft OSMOZ?', answer: 'Le Loft OSMOZ is available from 649 € excl. VAT for a half day and 999 € excl. VAT for a full day. Tailored quote within 24 hours.' },
    ],
  },
};
