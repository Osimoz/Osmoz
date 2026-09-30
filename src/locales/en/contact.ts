import type { ContactDictionary } from '../fr/contact';

export const contact: ContactDictionary = {
  kicker: 'Get in touch',
  title: 'Contact',
  introBefore: 'A question, a specific request? Write to us. To book a space, please use ',
  introLink: 'our booking form',
  introAfter: '.',
  sent: {
    title: 'Message sent',
    text: 'Thank you! We’ll get back to you as soon as possible.',
    again: 'New message',
  },
  form: {
    title: 'Your message',
    lastName: 'Last name *',
    firstName: 'First name *',
    email: 'Email *',
    message: 'Message *',
    sending: 'Sending…',
    send: 'Send',
    errorRequired: 'Please fill in all the fields.',
    errorSend: 'Something went wrong while sending. Please try again.',
  },
  details: {
    kicker: 'Our details',
  },
  book: {
    kicker: 'Book a space',
    text: 'For a booking, a quote or an availability request, please use our dedicated form.',
    button: 'Booking form',
  },
};
