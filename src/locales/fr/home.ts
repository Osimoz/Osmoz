// Page d'accueil (src/pages/HomeV2.tsx). Les images, liens et icônes restent
// dans la page ; ici uniquement le texte.
export const home = {
  logos: {
    kicker: 'Ils nous font confiance',
    alt: 'Logo client Osmoz',
  },
  hero: {
    kicker: 'Paris · Bonne Nouvelle · Marais · La Défense',
    title: 'Vos lieux. Votre journée.',
    line1: 'Séminaires, réunions, workshops.',
    line2: 'Privatisation à la journée, exclusivement pour les entreprises.',
    cta: 'Voir les disponibilités',
  },
  spacesSection: {
    kicker: 'Nos espaces',
    title: 'Quatre lieux. Une seule promesse.',
    subtitle: 'Privatisation exclusive à la journée pour vos équipes.',
    view: "Voir l'espace",
    newBadge: 'Nouveau',
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
    bonneNouvelle: {
      tag: 'Bonne Nouvelle · Paris',
      title: 'Bonne Nouvelle',
      stats: '100 m² · 30 personnes max',
      pills: ['Réunion', 'Workshop', 'Cocktail'],
      alt: 'Salon principal de l’espace Bonne Nouvelle OSMOZ',
    },
  },
  useCasesSection: {
    kicker: 'Pour quels moments',
    title: "Chaque espace s'adapte à votre format.",
  },
  useCases: [
    {
      title: 'Réunions & séminaires',
      description: "Des lieux et des configurations variés, dans un cadre qui sort de l'ordinaire. Mobilier modulable, équipements pro inclus.",
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
      description: 'Parcourez nos quatre lieux à Paris et trouvez celui qui correspond à votre équipe et à votre format.',
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
    description: "OSMOZ propose quatre espaces privatisables à Paris et La Défense pour les entreprises : Le Loft, Le Duplex Haussmannien, Le Penthouse et Bonne Nouvelle, appartement haussmannien de 100 m² pouvant accueillir jusqu'à 30 personnes.",
    paymentAccepted: 'Virement bancaire, Carte bancaire',
    offers: {
      loft: "Espace privatif 110m², Place des Vosges, Paris 3e. Jusqu'à 25 personnes.",
      duplex: "Appartement haussmannien 300m², Paris 2e. Jusqu'à 40 personnes.",
      penthouse: "Penthouse 150m² + jardin 350m², La Défense. Jusqu'à 40 personnes.",
      bonneNouvelle: 'Appartement haussmannien de 100 m² au 20 boulevard Poissonnière, Paris 9e. Jusqu’à 30 personnes.',
    },
    faq: [
      {
        question: "Qu'est-ce qu'OSMOZ ?",
        answer: "OSMOZ est une société parisienne spécialisée dans la location d'espaces privatifs authentiques exclusivement pour les entreprises. Nous proposons quatre lieux : Le Loft au Marais, Le Duplex Haussmannien, le Penthouse à La Défense et Bonne Nouvelle, appartement haussmannien de 100 m² au 20 boulevard Poissonnière, Paris 9e, jusqu'à 30 personnes.",
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
