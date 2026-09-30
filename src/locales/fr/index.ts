// Dictionnaire français = référence de structure. `en` est typé `Dictionary`,
// donc une clé manquante ou en trop en anglais est une erreur `tsc -b`.
// Un objet par composant / page ; les pages viennent s'ajouter ici au fur et
// à mesure de leur extraction.
export const fr = {
  lang: {
    fr: 'FR',
    en: 'EN',
    switchAria: 'Switch to English',
  },
  nav: {
    home: 'Accueil',
    spaces: 'Espaces',
    experience: 'Expérience',
    articles: 'Articles',
    about: 'À propos',
    commitments: 'Nos engagements',
    faq: 'FAQ',
    contact: 'Contact',
    book: 'Réserver',
    bookSpace: 'Réserver un espace',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  footer: {
    rights: 'Tous droits réservés.',
    contact: 'Contact',
    faq: 'FAQ',
    csr: 'RSE',
    legal: 'Mentions légales',
    privacy: 'Politique de confidentialité',
  },
  notFound: {
    metaTitle: 'Page introuvable | OSMOZ',
    kicker: 'Erreur 404',
    title: "Cette page n'existe pas ou n'est plus disponible.",
    home: "Retour à l'accueil",
    spaces: 'Voir nos espaces',
  },
};

export type Dictionary = typeof fr;
