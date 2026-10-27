import type { HomeDictionary } from '../fr/home';

export const home: HomeDictionary = {
  logos: {
    kicker: 'Trusted by',
    alt: 'Osmoz client logo',
  },
  hero: {
    kicker: 'Paris · Le Marais · La Défense',
    title: 'Your spaces. Your day.',
    line1: 'Off-sites, meetings, workshops.',
    line2: 'Private hire by the day, for companies only.',
    cta: 'Check availability',
  },
  spacesSection: {
    kicker: 'Our spaces',
    title: 'Four spaces. One promise.',
    subtitle: 'Exclusive day hire for your team.',
    view: 'See the space',
  },
  spaces: {
    loft: {
      tag: 'Le Marais · Paris 3rd',
      title: 'Le Loft',
      stats: '110 m² · 25 people',
      pills: ['Meeting', 'Off-site', 'Workshop', 'Film shoot'],
      alt: 'Le Loft Osmoz – lounge with glass roof, Le Marais, Paris 3rd',
    },
    duplex: {
      tag: 'Montmartre · Paris 2nd',
      title: 'Le Duplex',
      stats: '300 m² · 40 people',
      pills: ['Meeting', 'Conference', 'Cocktail party', 'Off-site'],
      alt: 'Le Duplex Haussmannien Osmoz – lounge with mouldings and parquet, Paris 2nd',
    },
    penthouse: {
      tag: 'La Défense · Puteaux',
      title: 'Le Penthouse',
      stats: '150 m² + 350 m² garden · 40 people',
      pills: ['Meeting', 'Cocktail party', 'Off-site', 'Panoramic view'],
      alt: 'Le Penthouse Osmoz – panoramic space, La Défense, Puteaux',
    },
    bonneNouvelle: {
      tag: 'Bonne Nouvelle · Paris',
      title: 'Bonne Nouvelle',
      stats: '100 m² · up to 30 people',
      pills: ['Meeting', 'Workshop', 'Cocktail party'],
      alt: 'Main lounge of the OSMOZ Bonne Nouvelle space',
    },
  },
  useCasesSection: {
    kicker: 'What it’s for',
    title: 'Every space adapts to your format.',
  },
  useCases: [
    {
      title: 'Meetings & off-sites',
      description: 'From 5 to 40 people, in a setting that isn’t just another meeting room. Modular furniture, professional equipment included.',
    },
    {
      title: 'Workshops & working sessions',
      description: 'Spaces arranged around what you need. U-shape, clusters, plenary — we set everything up before you arrive.',
    },
    {
      title: 'Cocktail parties & lunches',
      description: 'Tailored services — catering, private chef, activities — so the day is truly yours.',
    },
  ],
  ctaBand: {
    title: 'Your next team day starts here.',
    subtitle: 'Availability, quote and confirmation in under 24 hours.',
    cta: 'Check availability',
  },
  how: {
    kicker: 'Simple & fast',
    title: 'How it works',
  },
  steps: [
    {
      number: '01',
      title: 'Choose your space',
      description: 'Browse our four spaces in Paris and find the one that fits your team and your format.',
    },
    {
      number: '02',
      title: 'Send your request',
      description: 'A few lines are enough. We get back to you within hours with availability and a quote.',
    },
    {
      number: '03',
      title: 'Enjoy your day',
      description: 'You arrive, everything is ready. Talk, create, learn, celebrate.',
    },
  ],
  finalCta: {
    kicker: 'Osmoz',
    title: 'Ready to get out of the office?',
    cta: 'Book a space',
  },
  jsonLd: {
    description: 'OSMOZ offers four private-hire spaces in Paris and La Défense for companies, including Bonne Nouvelle, a 100 m² Haussmann-style apartment for up to 30 people.',
    paymentAccepted: 'Bank transfer, credit card',
    offers: {
      loft: 'Private space of 110 m², Place des Vosges, Paris 3rd. Up to 25 people.',
      duplex: 'Haussmann-style apartment of 300 m², Paris 2nd. Up to 40 people.',
      penthouse: 'Penthouse of 150 m² + 350 m² garden, La Défense. Up to 40 people.',
      bonneNouvelle: 'A 100 m² Haussmann-style apartment at 20 boulevard Poissonnière, Paris 9th. Up to 30 people.',
    },
    faq: [
      {
        question: 'What is OSMOZ?',
        answer: 'OSMOZ is a Paris-based company that rents authentic private spaces to companies only. We have four spaces: Le Loft in Le Marais, Le Duplex Haussmannien, Le Penthouse in La Défense and Bonne Nouvelle, a 100 m² Haussmann-style apartment at 20 boulevard Poissonnière, Paris 9th, for up to 30 people.',
      },
      {
        question: 'Is OSMOZ open to private individuals?',
        answer: 'No. OSMOZ rents its spaces to companies only. Our spaces host off-sites, board meetings, workshops, cocktail parties and team days.',
      },
      {
        question: 'How do I book an OSMOZ space?',
        answer: 'Send us your request through the contact form on osmoz-space.com. We get back to you within 24 hours with availability and a tailored quote.',
      },
    ],
  },
};
