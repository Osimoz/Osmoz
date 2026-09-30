// Page /spaces (src/pages/Spaces.tsx).
export const spaces = {
  kicker: 'Nos espaces',
  title: 'Trois lieux. Une seule promesse.',
  subtitle: 'Des lieux privatifs, chaleureux et authentiques où vos équipes se retrouvent vraiment.',
  discover: 'Découvrir',
  book: 'Réserver ce lieu',
  cta: {
    kicker: 'Privatisation clé en main',
    title: 'Pas encore sûr de quel espace vous convient ?',
    button: 'Nous contacter',
  },
  items: {
    loft: {
      title: 'Le Loft Osmoz',
      eyebrow: 'Marais · Paris 3e',
      description: "Un loft contemporain de 120 m² au cœur du Marais. Volumes épurés, lumière zénithale et mobilier modulable pour vos réunions et ateliers d'exception.",
      capacity: '25 personnes',
      price: 'À partir de 649 €',
      tags: ['Réunion', 'Atelier', 'Séminaire'],
    },
    duplex: {
      title: 'Le Duplex Haussmannien',
      eyebrow: 'Montmartre · Paris 2e',
      description: 'Duplex haussmannien lumineux avec verrières, moulures et parquet. Deux niveaux modulables, cuisine équipée et cour privée pour des journées de travail mémorables.',
      capacity: '40 personnes',
      price: 'À partir de 1 499 €',
      tags: ['Séminaire', 'Cocktail', 'Workshop'],
    },
    penthouse: {
      title: 'Le Penthouse',
      eyebrow: 'La Défense · Vue panoramique',
      description: "Penthouse confidentiel de 150 m² avec jardin suspendu de 350 m² au dernier étage d'une tour de La Défense. Vue sur Paris et la Tour Eiffel. Un lieu rare.",
      capacity: '40 personnes',
      price: 'À partir de 1 499 €',
      tags: ['Privatisation', 'Événement', 'Rooftop'],
    },
  },
  jsonLd: {
    home: 'Accueil',
    spaces: 'Nos espaces',
    listName: 'Espaces privatifs authentiques OSMOZ à Paris',
    listDescription: "Sélection d'espaces authentiques privatisables à Paris et La Défense pour événements corporate",
    items: {
      loft: 'Le Loft OSMOZ — Marais Paris 3e',
      duplex: 'Le Duplex Haussmannien OSMOZ — Paris 2e',
      penthouse: 'Le Penthouse OSMOZ — La Défense Puteaux',
    },
  },
};

export type SpacesDictionary = typeof spaces;
