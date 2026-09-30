import type { SpacesDictionary } from '../fr/spaces';

export const spaces: SpacesDictionary = {
  kicker: 'Our spaces',
  title: 'Three spaces. One promise.',
  subtitle: 'Private, warm, authentic spaces where your team truly comes together.',
  discover: 'Discover',
  book: 'Book this space',
  cta: {
    kicker: 'Turnkey private hire',
    title: 'Not sure which space is right for you?',
    button: 'Contact us',
  },
  items: {
    loft: {
      title: 'Le Loft Osmoz',
      eyebrow: 'Le Marais · Paris 3rd',
      description: 'A contemporary 120 m² loft in the heart of Le Marais. Clean volumes, natural light from above and modular furniture for meetings and workshops that stand out.',
      capacity: '25 people',
      price: 'From 649 €',
      tags: ['Meeting', 'Workshop', 'Off-site'],
    },
    duplex: {
      title: 'Le Duplex Haussmannien',
      eyebrow: 'Montmartre · Paris 2nd',
      description: 'A bright Haussmann-style duplex with glass roofs, mouldings and parquet floors. Two modular levels, a fully equipped kitchen and a private courtyard for working days worth remembering.',
      capacity: '40 people',
      price: 'From 1,499 €',
      tags: ['Off-site', 'Cocktail party', 'Workshop'],
    },
    penthouse: {
      title: 'Le Penthouse',
      eyebrow: 'La Défense · Panoramic view',
      description: 'A discreet 150 m² penthouse with a 350 m² hanging garden on the top floor of a La Défense tower. Views over Paris and the Eiffel Tower. A rare place.',
      capacity: '40 people',
      price: 'From 1,499 €',
      tags: ['Private hire', 'Event', 'Rooftop'],
    },
  },
  jsonLd: {
    home: 'Home',
    spaces: 'Our spaces',
    listName: 'Authentic private spaces by OSMOZ in Paris',
    listDescription: 'A selection of authentic private-hire spaces in Paris and La Défense for corporate events',
    items: {
      loft: 'Le Loft OSMOZ — Le Marais, Paris 3rd',
      duplex: 'Le Duplex Haussmannien OSMOZ — Paris 2nd',
      penthouse: 'Le Penthouse OSMOZ — La Défense, Puteaux',
    },
  },
};
