import type { Dictionary } from '../fr';
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

export const en: Dictionary = {
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
  errorBoundary: {
    title: 'Something went wrong',
    text: 'We’re sorry for the inconvenience. Please try again, or contact support if the problem persists.',
    home: 'Back to home',
  },
  notFound: {
    metaTitle: 'Page not found | OSMOZ',
    kicker: 'Error 404',
    title: 'This page does not exist or is no longer available.',
    home: 'Back to home',
    spaces: 'See our spaces',
  },
};
