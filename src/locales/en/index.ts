import type { Dictionary } from '../fr';
import { home } from './home';
import { shared } from './shared';
import { spaces } from './spaces';
import { contact } from './contact';
import { reservation } from './reservation';
import { faq } from './faq';

export const en: Dictionary = {
  home,
  shared,
  spaces,
  contact,
  reservation,
  faq,
  lang: {
    fr: 'FR',
    en: 'EN',
    switchAria: 'Passer en français',
  },
  nav: {
    home: 'Home',
    spaces: 'Spaces',
    experience: 'Experience',
    articles: 'Articles',
    about: 'About',
    commitments: 'Our commitments',
    faq: 'FAQ',
    contact: 'Contact',
    book: 'Book',
    bookSpace: 'Book a space',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  footer: {
    rights: 'All rights reserved.',
    contact: 'Contact',
    faq: 'FAQ',
    csr: 'CSR',
    legal: 'Legal notice',
    privacy: 'Privacy policy',
  },
  notFound: {
    metaTitle: 'Page not found | OSMOZ',
    kicker: 'Error 404',
    title: 'This page does not exist or is no longer available.',
    home: 'Back to home',
    spaces: 'See our spaces',
  },
};
