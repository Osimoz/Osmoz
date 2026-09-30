import type { PenthouseDictionary } from '../fr/penthouse';

export const penthouse: PenthouseDictionary = {
  kicker: 'Osmoz · La Défense',
  name: 'Le Penthouse',
  location: 'La Défense · Puteaux',
  heroAlt: 'Penthouse Osmoz – Living room 4, La Défense',
  pills: ['150 m² + 350 m² garden', 'Up to 40 people', 'Panoramic view of Paris', 'From 1,499 € excl. VAT'],
  stats: { surface: '150 m² + 350 m² garden', people: 'Up to 40 people', address: 'Tour Cofonca, La Défense' },
  price: '1,499 €',
  intro: {
    quote: 'On the top floor of a La Défense tower, perched above Paris.',
    text: 'A discreet 150 m² penthouse, entirely private, with a 350 m² hanging garden and a panoramic view over the whole of Paris. A rare, unexpected place: 70s aesthetic, light-filled rooms, a confidential meeting room and a garden open to the sky. Together they make a setting designed to alternate focused work and more informal moments, in a one-of-a-kind atmosphere.',
    tags: ['Meeting', 'Off-site', 'Workshop', 'Cocktail party', 'Panoramic view', 'Outdoor'],
  },
  rooms: {
    rooftop: 'Rooftop',
    bureau: 'Office',
    sejour: 'Living room',
    sejourReunion: 'Living room, meeting layout',
    sejourConference: 'Living room, conference layout',
    escalier: 'Staircase',
    sdb: 'Bathroom',
  },
  lightboxPrefix: 'Penthouse Osmoz – ',
  configurations: [
    { label: 'Confidential meeting room', description: 'Black leather table, antique tapestry, direct view over Paris. Ideal for board meetings and strategy sessions.' },
    { label: 'Workshop / Living room', description: 'Large modular 70s living room. Movable sofas, a flexible space suited to workshops.' },
    { label: 'Cocktail / Lounge', description: 'Living room opening onto the hanging garden. A unique atmosphere perched above Paris.' },
    { label: 'Hanging garden', description: '350 m² of private lawn on the top floor. Panoramic view over Paris, the Eiffel Tower and La Défense.' },
  ],
  configurationAltBefore: 'Penthouse Osmoz – layout ',
  configurationAltAfter: ' La Défense',
  amenities: ['High-speed wifi', 'Connected screens', 'Confidential meeting room', 'Flipchart', 'HDMI cable', 'Modular spaces', 'Private 350 m² garden', 'Panoramic view of Paris'],
  amenitiesOnDemand: ['Private chef', 'Catering', 'Team-building activities', 'Wine tasting', 'Outdoor activities'],
  tarifs: [
    { label: 'Half day', hours: '8:30am - 12pm  or  2pm - 6pm', price: '1,499 €' },
    { label: 'Full day', hours: '8:30am - 6:30pm', price: '2,499 €' },
    { label: 'Evening', hours: '6:30pm - 10pm', price: '1,999 €' },
    { label: 'Day + evening', hours: '8:30am - 10pm', price: '2,999 €' },
  ],
  access: {
    street: 'Tour Cofonca, 6-8 rue Jean Jaurès',
    city: '92800 Puteaux',
    transit: [
      { badge: 'M', station: 'La Défense – Grande Arche', detail: '(line 1) — 5 min walk' },
      { badge: 'RER', station: 'La Défense', detail: '(RER A) — 5 min walk' },
      { badge: 'T', station: 'La Défense', detail: '(Tram T2) — 3 min walk' },
    ],
    mapTitle: 'Penthouse Osmoz location – Tour Cofonca, La Défense',
  },
  otherSpaces: {
    loft: { title: 'Le Loft', location: 'Le Marais, Paris 3rd', surface: '110 m²', capacity: '25 people' },
    duplex: { title: 'Le Duplex Haussmannien', location: 'Montmartre, Paris 2nd', surface: '300 m²', capacity: '40 people' },
  },
  jsonLd: {
    description: 'Penthouse of 150 m² with a 350 m² hanging garden on the top floor of a La Défense tower. Panoramic view over Paris and the Eiffel Tower, 70s aesthetic, confidential meeting room. Ideal for off-sites, cocktail parties, board meetings and outdoor events for up to 40 people. Exclusive day hire for companies.',
    amenities: ['High-speed wifi', 'Connected screen', '350 m² hanging garden', 'Panoramic view of Paris', 'Confidential meeting room', 'Flipchart', 'HDMI cable', 'Fully private'],
    offers: [
      { name: 'Half day', description: 'Half-day private hire — 8:30am-12pm or 2pm-6pm' },
      { name: 'Full day', description: 'Full-day private hire — 8:30am-6:30pm' },
      { name: 'Evening', description: 'Evening private hire — 6:30pm-10pm' },
      { name: 'Day + evening', description: 'Full-day + evening private hire — 8:30am-10pm' },
    ],
    breadcrumb: 'Le Penthouse',
    faq: [
      { question: 'How many people can Le Penthouse OSMOZ host?', answer: 'Le Penthouse OSMOZ hosts up to 40 people indoors and up to 40 people on the 350 m² hanging rooftop with a view over Paris.' },
      { question: 'Where is Le Penthouse OSMOZ?', answer: 'Le Penthouse OSMOZ is at Tour Cofonca, 6-8 rue Jean Jaurès, 92800 Puteaux. A 5-minute walk from La Défense metro station (line 1).' },
      { question: 'How much does it cost to hire Le Penthouse OSMOZ?', answer: 'Le Penthouse OSMOZ is available from 1,499 € excl. VAT for a half day, 2,499 € excl. VAT for a full day and 1,999 € excl. VAT for an evening. Tailored quote within 24 hours.' },
    ],
  },
};
