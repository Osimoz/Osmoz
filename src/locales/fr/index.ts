// Dictionnaire français = référence de structure. `en` est typé `Dictionary`,
// donc une clé manquante ou en trop en anglais est une erreur `tsc -b`.
// Un objet par composant / page ; les pages viennent s'ajouter ici au fur et
// à mesure de leur extraction.
import { home } from './home';
import { shared } from './shared';
import { spaces } from './spaces';
import { contact } from './contact';
import { reservation } from './reservation';
import { faq } from './faq';
import { rse } from './rse';
import { legal, privacy } from './legal';
import { venue } from './venue';
import { loft } from './loft';
import { duplex } from './duplex';
import { penthouse } from './penthouse';
import { experience } from './experience';

export const fr = {
  home,
  shared,
  spaces,
  contact,
  reservation,
  faq,
  rse,
  legal,
  privacy,
  venue,
  loft,
  duplex,
  penthouse,
  experience,
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
  errorBoundary: {
    title: 'Une erreur est survenue',
    text: 'Nous nous excusons pour la gêne occasionnée. Veuillez réessayer ou contacter le support si le problème persiste.',
    home: "Retour à l'accueil",
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
