// Page /presentation/bonne-nouvelle-… (src/pages/BonneNouvellePresentation.tsx).
// Distincte de la page publique du lieu (t.bonneNouvelle, /spaces/bonne-nouvelle-osmoz).
// Présentation commerciale du lieu, envoyée par lien aux prospects à la place
// de la plaquette PDF. Elle doit se lire comme un document à part : hors
// navigation, noindex, aucun tarif, aucune demande de devis, aucun lien vers
// le reste du site. Seuls les contacts, en bas, permettent de donner suite.
export const bonneNouvellePresentation = {
  kicker: 'Osmoz · Paris 9e',
  name: 'Bonne Nouvelle',
  location: 'Grands Boulevards · Paris 9e',
  heroAlt: 'Bonne Nouvelle Osmoz – le salon de l’appartement haussmannien, Paris 9e',
  pills: ['100 m²', 'Jusqu’à 30 personnes', 'Entièrement privatisable', 'Appartement haussmannien'],
  stats: { surface: '100 m²', people: '30 personnes max', address: '20 bd Poissonnière, Paris 9e' },
  discover: 'Découvrir le lieu',
  // Rappel discret en bas de page : cette page remplace la plaquette.
  confidential: 'Présentation réservée à nos clients',
  vision: {
    kicker: 'Notre vision',
    quote: 'Bien plus qu’un lieu : un espace pensé pour permettre à vos équipes de se retrouver et de se recentrer.',
    p1: 'Chez OSMOZ, nous réinventons les espaces de travail en lieux vivants, authentiques et modulables. Réunions confidentielles, séminaires, journées d’équipe, déjeuners d’affaires… nos espaces s’adaptent avec justesse à chaque format, dans une atmosphère intimiste et chaleureuse.',
    p2: 'Nous assurons un accompagnement sur-mesure, où chaque détail est pensé avec soin pour offrir une expérience fluide.',
  },
  place: {
    kicker: 'Le lieu',
    title: 'Un appartement haussmannien de 100 m², au cœur du 9e',
    p1: 'Niché au cœur du 9e arrondissement, Bonne Nouvelle vous accueille dans un appartement haussmannien de 100 m², où parquet, moulures et lumière naturelle composent un décor typiquement parisien.',
    p2: 'L’appartement dispose d’espaces adaptés au travail en groupe et en sous-groupes : un grand salon, une salle de réunion, une salle à manger ainsi qu’une cuisine équipée et spacieuse. Entièrement privatisable, le lieu cultive une atmosphère chaleureuse et informelle, comme si l’on se retrouvait chez un collègue.',
    p3: 'Un cadre intimiste, idéal pour conjuguer réunions stratégiques, journées d’étude et déjeuners ou dîners dans une atmosphère propice aux échanges et à la convivialité.',
    facts: [
      { label: 'Adresse', value: '20 boulevard Poissonnière, 75009 Paris' },
      { label: 'Surface', value: '100 m²' },
      { label: 'Capacité', value: 'Jusqu’à 30 personnes' },
      { label: 'Étage', value: '3e étage, avec ascenseur' },
      { label: 'Privatisation', value: 'Exclusive : demi-journée, journée ou soirée' },
    ],
    tags: ['Réunion confidentielle', 'Séminaire', 'Journée d’équipe', 'Workshop', 'Déjeuner d’affaires', 'Cocktail'],
  },
  gallery: { kicker: 'En images', title: 'Le lieu en images', all: 'Voir toutes les photos' },
  // Légendes des photos (galerie) ; la lightbox les préfixe.
  photos: {
    salonLounge: 'Le salon',
    salonConference: 'Le salon, format plénière',
    salonReunion: 'Le salon, format réunion',
    salleReunion: 'La salle de réunion',
    salleManger: 'La salle à manger',
    cuisinePetitDej: 'La cuisine, petit-déjeuner',
    cuisineDejeuner: 'La cuisine, déjeuner',
  },
  lightboxPrefix: 'Bonne Nouvelle Osmoz – ',
  rooms: {
    kicker: 'Les espaces',
    title: 'Quatre espaces qui se répondent',
    items: {
      salon: {
        name: 'Le salon',
        capacity: '30 personnes',
        formats: 'Plénière · Réunion · Lounge',
        text: 'Trois hautes fenêtres sur le boulevard, moulures, parquet et canapés : le cœur de l’appartement. En plénière, il accueille 30 personnes face à l’écran ; en réunion ou en workshop, 20 personnes autour des canapés ; en lounge, il devient le lieu du cocktail ou de la pause.',
        equipment: ['Écran connecté', 'Paperboard', 'Canapés modulables', 'Balcon'],
      },
      reunion: {
        name: 'La salle de réunion',
        capacity: '16 personnes',
        formats: 'Comité · Réunion stratégique · Visio',
        text: 'Une grande table, une cheminée en marbre et deux écrans : la salle des réunions qui demandent concentration et confidentialité. Idéale pour un comité de direction, une réunion stratégique ou un sous-groupe pendant un séminaire.',
        equipment: ['Écran de projection', 'Visioconférence', 'Paperboard', 'Fournitures'],
      },
      manger: {
        name: 'La salle à manger',
        capacity: '20 personnes',
        formats: 'Déjeuner · Dîner · Atelier',
        text: 'Une longue table en bois sous un mur de miroirs : le déjeuner ou le dîner y réunissent 20 convives. Avec son écran mobile, elle sert aussi de seconde salle de travail pour les ateliers en sous-groupes.',
        equipment: ['Écran de projection mobile', 'Paperboard', 'Fournitures'],
      },
      cuisine: {
        name: 'La cuisine ouverte',
        capacity: 'Cocktail & catering',
        formats: 'Petit-déjeuner · Pauses · Cocktail',
        text: 'Un îlot carrelé, des tabourets hauts et une cuisine équipée et spacieuse : le point de rendez-vous du petit-déjeuner, des pauses et du cocktail. Notre cheffe et nos traiteurs partenaires y travaillent sur place.',
        equipment: ['Cuisine équipée', 'Îlot central', 'Machine à café'],
      },
    },
  },
  formats: {
    kicker: 'Formats',
    title: 'Quel format pour votre journée ?',
    people: 'pers.',
    items: [
      { label: 'Conférence, plénière', capacity: 30, where: 'Le salon' },
      { label: 'Réunion', capacity: 20, where: 'Le salon' },
      { label: 'Workshop', capacity: 20, where: 'Le salon' },
      { label: 'Comité, réunion stratégique', capacity: 16, where: 'La salle de réunion' },
      { label: 'Déjeuner ou dîner assis', capacity: 20, where: 'La salle à manger' },
      { label: 'Cocktail', capacity: 30, where: 'Le salon et la cuisine' },
    ],
    note: 'Les espaces se combinent : plénière au salon, sous-groupes en salle de réunion et en salle à manger, déjeuner servi à table ou en buffet autour de l’îlot de la cuisine.',
  },
  plan: {
    kicker: 'Le plan',
    title: 'Plan des espaces',
    caption: '100 m² · Salon · Salle de réunion · Salle à manger · Cuisine ouverte · Vestiaire · Sanitaires · Balcon',
    alt: 'Plan de l’appartement Bonne Nouvelle Osmoz : salon, salle de réunion, salle à manger, cuisine ouverte',
  },
  amenities: {
    kicker: 'Services',
    title: 'Équipements & services',
    included: 'Inclus',
    onDemand: 'Sur demande',
    items: ['Wifi haut débit', 'Deux écrans connectés', 'Visioconférence', 'Paperboards', 'Fournitures', 'Cuisine équipée', 'Vestiaire', 'Privatisation totale'],
    onDemandItems: ['Cheffe privée', 'Traiteurs partenaires', 'Petit-déjeuner', 'Cocktail', 'Animations team building'],
  },
  fleur: {
    kicker: 'La cheffe privée Fleur',
    title: 'Une cuisine de saison, préparée sur place',
    text: 'Plats à partager, buffet ou cocktail fingerfood : Fleur cuisine dans l’appartement, avec les produits du marché. Du soin dans chaque assiette, du salé jusqu’au sucré.',
    portraitAlt: 'Fleur, cheffe privée OSMOZ, en cuisine',
    mosaicAlt: 'Mosaïque des plats de Fleur — OSMOZ',
  },
  testimonials: {
    kicker: 'Ils parlent d’OSMOZ',
    title: 'Ce que nos clients en disent',
    items: [
      { company: 'L’Oréal', quote: 'Belle parenthèse de travail d’équipe hier chez Osmoz ! Un grand merci à Edouard pour son accueil attentionné et son professionnalisme. Un lieu qu’on recommande sans hésiter.' },
      { company: 'Google', quote: 'Nous avons réuni 20 collaborateurs pour une journée de travail dans ce très bel appartement. Merci à Edouard et Emma pour votre aide.' },
      { company: 'Cartier', quote: 'Nous cherchions un lieu différent des salles de réunion classiques. Cet appartement correspondait parfaitement à ce que nous voulions, plein de charme et authentique. Mention spéciale pour la cuisinière Fleur.' },
    ],
  },
  access: {
    kicker: 'Localisation',
    title: 'Comment venir ?',
    street: '20 boulevard Poissonnière',
    city: '75009 Paris',
    floor: '3e étage, avec ascenseur',
    transit: [
      { badge: 'M', station: 'Bonne Nouvelle', detail: '(lignes 8 et 9) — 1 min à pied' },
      { badge: 'M', station: 'Grands Boulevards', detail: '(lignes 8 et 9) — 1 min à pied' },
      { badge: 'M', station: 'Strasbourg – Saint-Denis', detail: '(lignes 4, 8 et 9) — 5 min à pied' },
    ],
    map: 'Voir sur la carte',
    mapTitle: 'Localisation Bonne Nouvelle Osmoz – 20 boulevard Poissonnière, Paris 9e',
  },
  contacts: {
    kicker: 'Vos contacts',
    title: 'Une équipe à votre écoute',
    people: [
      { name: 'Edouard Duverger', role: 'Fondateur', phone: '+33 6 75 18 69 32' },
      { name: 'Emma Millereau', role: 'Chief of staff', phone: '+33 6 20 12 86 25' },
    ],
    email: 'contact@osmoz-space.com',
  },
};

export type BonneNouvellePresentationDictionary = typeof bonneNouvellePresentation;
