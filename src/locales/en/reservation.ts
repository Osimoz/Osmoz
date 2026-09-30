import type { ReservationDictionary } from '../fr/reservation';

export const reservation: ReservationDictionary = {
  header: {
    kicker: 'Osmoz · Paris',
    title: 'Book a space',
    subtitle: 'Guaranteed reply within 24 hours · No date yet? No problem.',
  },
  sections: {
    details: 'Your details',
    event: 'Your event',
  },
  optional: '(optional)',
  fields: {
    firstName: 'First name',
    lastName: 'Last name',
    phone: 'Phone',
    email: 'Work email',
    company: 'Company',
    services: 'Services',
    space: 'Space',
    date: 'Date',
    guests: 'Guests',
    guestsSuffix: 'people',
    timeSlot: 'Time slot',
    comments: 'Comments',
    commentsPlaceholder: 'Specific needs, questions…',
  },
  spaces: {
    loft: { label: 'Loft Osmoz', sub: 'Le Marais · 25 people' },
    duplex: { label: 'Duplex Haussmannien', sub: 'Paris 2nd · 40 people' },
    penthouse: { label: 'Le Penthouse', sub: 'La Défense · 40 people' },
  },
  timeSlots: {
    morning: { label: 'Morning', hours: '8:30am–12pm' },
    afternoon: { label: 'Afternoon', hours: '2pm–6pm' },
    fullday: { label: 'Full day', hours: '8:30am–6:30pm' },
    evening: { label: 'Evening', hours: '6:30pm–10pm' },
  },
  services: ['Breakfast', 'Lunch', 'Cocktail party', 'Team building', 'Cooking class'],
  consent: {
    dataBefore: 'I agree to my data being used to process my request, in line with the ',
    dataLink: 'privacy policy',
    dataAfter: '.',
    newsletter: 'I’d like to receive news, offers and inspiration from Osmoz by email.',
  },
  validation: {
    required: 'Required',
    invalidEmail: 'Invalid email',
    accept: 'Please accept',
  },
  footer: {
    requiredBefore: 'Fields marked ',
    requiredAfter: ' are required · The rest can be confirmed later',
  },
  submit: 'Send my request',
  sending: 'Sending…',
  submitError: 'Something went wrong. Email us at contact@osmoz-space.com',
  sent: {
    metaTitle: 'Request sent, OSMOZ Paris | Reply within 24h',
    title: 'Request sent',
    textBefore: 'Our team will contact you within ',
    textStrong: '24 hours',
    textAfter: ' to confirm availability.',
    home: 'Back to home',
  },
};
