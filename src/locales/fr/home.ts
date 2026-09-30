// Page d'accueil (src/pages/HomeV2.tsx). Les images, liens et icônes restent
// dans la page ; ici uniquement le texte.
export const home = {
  logos: {
    kicker: 'Ils nous font confiance',
    alt: 'Logo client Osmoz',
  },
  hero: {
    kicker: 'Paris · Marais · La Défense',
    title: 'Vos lieux. Votre journée.',
    line1: 'Séminaires, réunions, workshops.',
    line2: 'Privatisation à la journée, exclusivement pour les entreprises.',
    cta: 'Voir les disponibilités',
  },
  spacesSection: {
    kicker: 'Nos espaces',
    title: 'Trois lieux. Une seule promesse.',
    subtitle: 'Privatisation exclusive à la journée pour vos équipes.',
    view: "Voir l'espace",
  },
  spaces: {
    loft: {
      tag: 'Marais · Paris 3e',
      title: 'Le Loft',
      stats: '110 m² · 25 personnes',
      pills: ['Réunion', 'Séminaire', 'Workshop', 'Tournage'],
      alt: 'Le Loft Osmoz – salon avec verrière, Paris Marais 3e',
    },
    duplex: {
      tag: 'Montmartre · Paris 2e',
      title: 'Le Duplex',
      stats: '300 m² · 40 personnes',
      pills: ['Réunion', 'Conférence', 'Cocktail', 'Séminaire'],
      alt: 'Le Duplex Haussmannien Osmoz – salon moulures parquet Paris 2e',
    },
    penthouse: {
      tag: 'La Défense · Puteaux',
      title: 'Le Penthouse',
      stats: '150 m² + jardin 350 m² · 40 personnes',
      pills: ['Réunion', 'Cocktail', 'Séminaire', 'Vue panoramique'],
      alt: 'Le Penthouse Osmoz – espace panoramique La Défense Puteaux',
    },
  },
  comingSoon: {
    alt: 'Prochain espace Osmoz – bientôt disponible',
    badge: 'Bientôt disponible',
    tag: 'Paris · 2026',
    title: 'Prochain espace Osmoz',
    text: "Un nouveau lieu arrive en 2026. Rejoignez la liste d'attente pour être les premiers informés.",
    cta: 'Être prévenu en priorité',
  },
  useCasesSection: {
    kicker: 'Pour quels moments',
    title: "Chaque espace s'adapte à votre format.",
  },
  useCases: [
    {
      title: 'Réunions & séminaires',
      description: "De 5 à 40 personnes, dans un cadre qui sort de l'ordinaire. Mobilier modulable, équipements pro inclus.",
    },
    {
      title: 'Ateliers & workshops',
      description: "Des espaces qui s'organisent selon vos besoins. Table en U, îlots, plénière — on prépare tout à l'avance.",
    },
    {
      title: 'Cocktails & déjeuners',
      description: 'Un panel de services sur mesure : traiteur, chef privé, activités pour que chaque journée soit vraiment la vôtre.',
    },
  ],
  ctaBand: {
    title: "Votre prochaine journée d'équipe commence ici.",
    subtitle: 'Disponibilités, devis et confirmation en moins de 24h.',
    cta: 'Voir les disponibilités',
  },
  how: {
    kicker: 'Simple & rapide',
    title: 'Comment ça marche ?',
  },
  steps: [
    {
      number: '01',
      title: 'Choisissez votre espace',
      description: 'Parcourez nos trois lieux à Paris et trouvez celui qui correspond à votre équipe et à votre format.',
    },
    {
      number: '02',
      title: 'Envoyez votre demande',
      description: 'Quelques lignes suffisent. Nous revenons vers vous sous quelques heures avec les disponibilités et un devis.',
    },
    {
      number: '03',
      title: 'Profitez de votre journée',
      description: 'Vous arrivez, on a tout préparé. Échangez, créez, formez-vous, célébrez.',
    },
  ],
  finalCta: {
    kicker: 'Osmoz',
    title: 'Prêt à sortir du bureau ?',
    cta: 'Réserver un espace',
  },
  // Données structurées (LocalBusiness + FAQPage) : même langue que la page.
  jsonLd: {
    description: "OSMOZ propose trois espaces privatisables authentiques et chaleureux à Paris et La Défense pour les entreprises. Séminaires, réunions de direction, workshops, cocktails et tournages. Le Loft (Marais, 110m²), Le Duplex Haussmannien (Paris 2e, 300m²), Le Penthouse (La Défense, 150m² + jardin 350m²).",
    paymentAccepted: 'Virement bancaire, Carte bancaire',
    offers: {
      loft: "Espace privatif 110m², Place des Vosges, Paris 3e. Jusqu'à 25 personnes.",
      duplex: "Appartement haussmannien 300m², Paris 2e. Jusqu'à 40 personnes.",
      penthouse: "Penthouse 150m² + jardin 350m², La Défense. Jusqu'à 40 personnes.",
    },
    faq: [
      {
        question: "Qu'est-ce qu'OSMOZ ?",
        answer: "OSMOZ est une société parisienne spécialisée dans la location d'espaces privatifs authentiques exclusivement pour les entreprises. Nous proposons trois lieux à Paris et La Défense : Le Loft au Marais (110m², 25 personnes), Le Duplex Haussmannien Paris 2e (300m², 40 personnes) et Le Penthouse La Défense (150m² + rooftop 350m², 40 personnes).",
      },
      {
        question: 'OSMOZ est-il ouvert aux particuliers ?',
        answer: "Non, OSMOZ loue ses espaces exclusivement aux entreprises. Nos lieux accueillent des séminaires, réunions de direction, workshops, cocktails et journées d'équipe.",
      },
      {
        question: 'Comment réserver un espace OSMOZ ?',
        answer: 'Envoyez-nous votre demande via le formulaire de contact sur osmoz-space.com. Nous revenons vers vous sous 24h avec les disponibilités et un devis personnalisé.',
      },
    ],
  },
};

export type HomeDictionary = typeof home;
