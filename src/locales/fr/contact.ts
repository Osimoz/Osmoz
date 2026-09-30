// Page /contact (src/pages/Contact.tsx).
export const contact = {
  kicker: 'Nous écrire',
  title: 'Contact',
  introBefore: 'Une question, une demande particulière ? Écrivez-nous. Pour une réservation, utilisez ',
  introLink: 'notre formulaire dédié',
  introAfter: '.',
  sent: {
    title: 'Message envoyé',
    text: 'Merci ! Nous vous répondrons dans les plus brefs délais.',
    again: 'Nouveau message',
  },
  form: {
    title: 'Votre message',
    lastName: 'Nom *',
    firstName: 'Prénom *',
    email: 'Email *',
    message: 'Message *',
    sending: 'Envoi…',
    send: 'Envoyer',
    errorRequired: 'Merci de remplir tous les champs.',
    errorSend: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.",
  },
  details: {
    kicker: 'Nos coordonnées',
  },
  book: {
    kicker: 'Réserver un espace',
    text: 'Pour une demande de réservation, de devis ou de disponibilité, utilisez notre formulaire dédié.',
    button: 'Formulaire de réservation',
  },
};

export type ContactDictionary = typeof contact;
