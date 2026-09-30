// Composants partagés : newsletter (section, pop-up, formulaire) et galerie.
export const shared = {
  newsletter: {
    kicker: 'Newsletter',
    headline: 'Recevez les actualités d’Osmoz',
    description: 'Conseils, inspirations, nouveaux espaces et actualités directement dans votre boîte mail.',
    submit: 'Je m’inscris',
    emailLabel: 'Votre adresse e-mail',
    emailPlaceholder: 'Votre adresse e-mail',
    sending: 'Envoi…',
    subscribed: '✓ Inscrit !',
    alreadySubscribedShort: '✓ Déjà inscrit',
    disclaimerBefore: "En vous inscrivant, vous acceptez de recevoir les actualités d'Osmoz par e-mail. Vous pouvez vous désinscrire à tout moment. Consultez notre ",
    disclaimerLink: 'politique de confidentialité',
    disclaimerAfter: '.',
    errorRequired: 'Votre adresse e-mail est requise.',
    errorInvalid: 'Adresse e-mail invalide.',
    errorGeneric: 'Une erreur est survenue. Veuillez réessayer dans quelques instants.',
    alreadySubscribed: 'Cette adresse est déjà inscrite à notre newsletter.',
    success: 'Merci ! Votre inscription à la newsletter a bien été prise en compte.',
    closePopup: 'Fermer le pop-up',
    close: 'Fermer',
  },
  gallery: {
    close: 'Fermer la galerie',
    previous: 'Image précédente',
    next: 'Image suivante',
  },
};

export type SharedDictionary = typeof shared;
