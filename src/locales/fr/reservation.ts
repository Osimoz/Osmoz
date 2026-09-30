// Page /reservation (src/pages/Reservation.tsx). L'e-mail envoyé à l'équipe
// OSMOZ reste en français (voir la page) : seul le contenu visible est ici.
export const reservation = {
  header: {
    kicker: 'Osmoz · Paris',
    title: 'Réserver un espace',
    subtitle: 'Réponse garantie sous 24h · Pas encore fixé sur une date ? Aucun problème.',
  },
  sections: {
    details: 'Vos coordonnées',
    event: 'Votre événement',
  },
  optional: '(optionnel)',
  fields: {
    firstName: 'Prénom',
    lastName: 'Nom',
    phone: 'Téléphone',
    email: 'Email pro',
    company: 'Société',
    services: 'Services',
    space: 'Espace',
    date: 'Date',
    guests: 'Personnes',
    guestsSuffix: 'pers.',
    timeSlot: 'Créneau',
    comments: 'Commentaires',
    commentsPlaceholder: 'Besoins spécifiques, questions…',
  },
  spaces: {
    loft: { label: 'Loft Osmoz', sub: 'Marais · 25 pers.' },
    duplex: { label: 'Duplex Haussmannien', sub: 'Paris 2e · 40 pers.' },
    penthouse: { label: 'Le Penthouse', sub: 'La Défense · 40 pers.' },
  },
  timeSlots: {
    morning: { label: 'Matin', hours: '08h30–12h' },
    afternoon: { label: 'Après-midi', hours: '14h–18h' },
    fullday: { label: 'Journée', hours: '08h30–18h30' },
    evening: { label: 'Soirée', hours: '18h30–22h' },
  },
  services: ['Petit-déjeuner', 'Déjeuner', 'Cocktail', 'Teambuilding', 'Cours de cuisine'],
  consent: {
    dataBefore: "J'accepte que mes données soient utilisées dans le cadre du traitement de ma demande, conformément à la ",
    dataLink: 'politique de confidentialité',
    dataAfter: '.',
    newsletter: "Je souhaite recevoir les actualités, offres et inspirations d'Osmoz par e-mail.",
  },
  validation: {
    required: 'Requis',
    invalidEmail: 'Email invalide',
    accept: 'Veuillez accepter',
  },
  footer: {
    requiredBefore: 'Champs ',
    requiredAfter: ' obligatoires · Les autres peuvent être précisés plus tard',
  },
  submit: 'Envoyer ma demande',
  sending: 'Envoi…',
  submitError: "Erreur d'envoi. Écrivez-nous à contact@osmoz-space.com",
  sent: {
    metaTitle: 'Demande envoyée, OSMOZ Paris | Réponse sous 24h',
    title: 'Demande envoyée',
    textBefore: 'Notre équipe vous contacte sous ',
    textStrong: '24h',
    textAfter: ' pour confirmer les disponibilités.',
    home: "Retour à l'accueil",
  },
};

export type ReservationDictionary = typeof reservation;
