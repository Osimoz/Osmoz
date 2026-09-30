// Libellés communs aux trois pages lieux (Loft, Duplex, Penthouse).
export const venue = {
  book: 'Réserver ce lieu',
  quote: 'Demander un devis',
  from: 'À partir de',
  people: 'personnes',
  peopleShort: 'pers.',
  allPhotos: 'Voir toutes les photos',
  configurations: {
    kicker: 'Configurations',
    title: "Comment aménager l'espace ?",
    altPrefix: 'configuration',
  },
  amenities: {
    kicker: 'Services',
    title: 'Équipements & services',
    included: 'Inclus',
    onDemand: 'Sur demande',
  },
  pricing: {
    kicker: 'Tarification',
    title: 'Tarifs — location seule',
    note: 'Hors taxes · Services en supplément',
  },
  ctaBand: {
    note: 'Hors taxes · Location seule',
    or: 'Ou réserver via',
    viewOn: 'Voir sur',
  },
  access: {
    kicker: 'Localisation',
    title: 'Comment venir ?',
    map: 'Voir sur la carte',
    mapTitle: 'Localisation',
  },
  crossSell: {
    kicker: 'Nos espaces',
    title: 'Découvrir nos autres espaces',
  },
  jsonLd: {
    home: 'Accueil',
    spaces: 'Nos espaces',
    paymentAccepted: 'Virement bancaire, Carte bancaire',
  },
};

export type VenueDictionary = typeof venue;
