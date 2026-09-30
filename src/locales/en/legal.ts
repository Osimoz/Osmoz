import type { LegalDictionary, PrivacyDictionary } from '../fr/legal';

export const legal: LegalDictionary = {
  kicker: 'Legal information',
  title: 'Legal Notice',
  updated: 'Last updated: March 2026',
  publisher: {
    title: 'Site publisher',
    intro: 'The website osmoz-space.com is published by:',
    company: 'OSMOZ',
    form: 'Société par Actions Simplifiée (SAS) — simplified joint-stock company under French law',
    capital: 'Share capital: €3,000.00',
    address: 'Registered office: 19 avenue Rapp, 75007 Paris, France',
    siren: 'SIREN: 930 149 273',
    rcs: 'Paris Trade and Companies Register (RCS Paris)',
    vat: 'EU VAT number: FR40930149273',
    president: 'President: Edouard Courtois dit Duverger',
    emailLabel: 'Email:',
  },
  director: {
    title: 'Publication director',
    text: 'The publication director is Edouard Courtois dit Duverger, as President of OSMOZ.',
  },
  hosting: {
    title: 'Hosting',
    intro: 'The site is hosted by:',
    name: 'Netlify, Inc.',
    address: 'Address: 512 2nd Street, Suite 200, San Francisco, CA 94107, United States',
    websiteLabel: 'Website:',
  },
  ip: {
    title: 'Intellectual property',
    text: 'All content on this site (text, images, graphics, logo, icons, sounds, software, etc.) is the exclusive property of OSMOZ or its partners. Any reproduction, distribution, modification, adaptation, retransmission or publication of these elements, even in part, is strictly prohibited without the express written consent of OSMOZ. Any such representation or reproduction, by any means whatsoever, constitutes an infringement punishable under Articles L.335-2 et seq. of the French Intellectual Property Code.',
  },
  data: {
    title: 'Personal data protection',
    text1: 'In accordance with the General Data Protection Regulation (GDPR) and the French Data Protection Act of 6 January 1978 as amended, you have the right to access, rectify, erase, restrict, port and object to the processing of your personal data.',
    text2Before: 'To exercise these rights or for any question about how your data is processed, you can contact OSMOZ at: ',
    text3Before: 'For more information, please see our ',
    text3Link: 'Privacy Policy',
    text3After: ' available on this site.',
  },
  cookies: {
    title: 'Cookies',
    text: 'The website osmoz-space.com may use cookies to improve the user experience. In accordance with current regulations, you are informed of these cookies on your first visit and can accept or refuse them. You can also configure your browser to disable cookies.',
  },
  links: {
    title: 'Hyperlinks',
    text: 'The website osmoz-space.com may contain links to other websites. OSMOZ cannot be held responsible for the content of these third-party sites or for any damage resulting from their use. Creating hyperlinks to osmoz-space.com is subject to the prior express consent of OSMOZ.',
  },
  liability: {
    title: 'Limitation of liability',
    text: 'OSMOZ strives to keep the information published on this site accurate and up to date. However, OSMOZ cannot guarantee the accuracy, precision or completeness of the information provided. Accordingly, OSMOZ declines all liability for any imprecision, inaccuracy or omission in the information available on this site, and for any damage resulting from fraudulent intrusion by a third party leading to a change in the information provided on the site.',
  },
  law: {
    title: 'Governing law and jurisdiction',
    text: 'This legal notice is governed by French law. In the event of a dispute, and failing an amicable resolution, the French courts shall have sole jurisdiction.',
  },
  contact: {
    title: 'Contact',
    intro: 'For any question about this site or to get in touch:',
    address: 'OSMOZ, 19 avenue Rapp, 75007 Paris',
    emailLabel: 'Email:',
  },
};

export const privacy: PrivacyDictionary = {
  kicker: 'Personal data',
  title: 'Privacy Policy',
  updated: 'Last updated: March 2026',
  intro1: 'OSMOZ (“we”, “our” or “OSMOZ”) takes the protection of your personal data seriously. This Privacy Policy describes how we collect, use, store and protect your data when you use the website osmoz-space.com.',
  intro2: 'It is drawn up in accordance with Regulation (EU) 2016/679 of the European Parliament (GDPR) and French Act No. 78-17 of 6 January 1978 on data processing, files and freedoms (the Data Protection Act), as amended.',
  controller: {
    title: 'Data controller',
    company: 'OSMOZ',
    form: 'SAS with share capital of €3,000.00',
    address: '19 avenue Rapp, 75007 Paris, France',
    siren: 'SIREN: 930 149 273, RCS Paris',
    emailLabel: 'Email:',
  },
  collected: {
    title: 'Personal data collected',
    directTitle: '2.1 Data collected directly',
    directText: 'When you fill in a contact form or make a booking request, we collect: your first and last name, your email address, your phone number, your company name, and any message or information you choose to send us.',
    autoTitle: '2.2 Data collected automatically',
    autoText: 'While you browse the site, we may automatically collect certain technical data: IP address, browser type and version, pages visited, visit duration, traffic source. This data is collected through cookies or audience-measurement tools.',
  },
  purposes: {
    title: 'Purposes and legal bases of processing',
    intro: 'Your data is processed for the following purposes:',
    items: [
      { title: 'Handling contact and booking requests', text: 'Legal basis: performance of a contract or pre-contractual measures (Art. 6.1.b GDPR).' },
      { title: 'Sending commercial communications (newsletter, offers)', text: 'Legal basis: consent (Art. 6.1.a GDPR).' },
      { title: 'Improving the site and audience analysis', text: 'Legal basis: legitimate interest (Art. 6.1.f GDPR).' },
      { title: 'Meeting our legal and accounting obligations', text: 'Legal basis: legal obligation (Art. 6.1.c GDPR).' },
    ],
  },
  recipients: {
    title: 'Data recipients',
    text1: 'Your personal data is intended for authorised members of OSMOZ. It may be passed on to technical processors as part of providing our services (hosting, emailing, CRM), who act solely on OSMOZ’s instructions and in compliance with the GDPR.',
    text2: 'OSMOZ does not sell or rent your personal data to third parties. Your data may be disclosed to the competent authorities where required by law.',
  },
  retention: {
    title: 'Retention period',
    intro: 'Your data is kept for the following periods:',
    items: [
      { title: 'Contact and prospect data', text: '3 years from the last contact.' },
      { title: 'Customer data', text: '5 years from the end of the contractual relationship (accounting obligation).' },
      { title: 'Browsing data (cookies)', text: '13 months maximum.' },
      { title: 'Newsletter subscriber data', text: 'Until you unsubscribe or withdraw consent.' },
    ],
  },
  rights: {
    title: 'Your rights',
    intro: 'Under the GDPR, you have the following rights over your personal data:',
    items: [
      { title: 'Right of access', text: 'Obtain a copy of the data we hold about you.' },
      { title: 'Right to rectification', text: 'Correct inaccurate or incomplete data.' },
      { title: 'Right to erasure', text: 'Request the deletion of your data, subject to our legal obligations.' },
      { title: 'Right to restriction', text: 'Temporarily restrict the processing of your data.' },
      { title: 'Right to portability', text: 'Receive your data in a structured, machine-readable format.' },
      { title: 'Right to object', text: 'Object to the processing of your data, in particular for marketing purposes.' },
      { title: 'Right to withdraw consent', text: 'Withdraw your consent at any time, without affecting the lawfulness of processing carried out beforehand.' },
    ],
    exerciseBefore: 'To exercise any of these rights, send your request by email to: ',
    exerciseAfter: '. We undertake to reply within one (1) month of receiving your request.',
    complaintBefore: 'If you believe your rights are not being respected, you can lodge a complaint with the French data protection authority, the Commission Nationale de l’Informatique et des Libertés (CNIL), ',
    complaintLink: 'www.cnil.fr',
    complaintAfter: '.',
  },
  cookies: {
    title: 'Cookies',
    intro: 'A cookie is a small text file placed on your device when you visit a website. The website osmoz-space.com may use the following types of cookies:',
    items: [
      { title: 'Strictly necessary cookies', text: 'Essential for the site to work properly. They do not require your consent.' },
      { title: 'Analytics cookies', text: 'Audience measurement and browsing statistics (e.g. Google Analytics). Subject to consent.' },
      { title: 'Marketing cookies', text: 'Ad personalisation and campaign tracking. Subject to consent.' },
    ],
    outro: 'You can configure your browser at any time to refuse cookies or to be alerted when they are placed. Disabling some cookies may however affect your browsing experience.',
  },
  security: {
    title: 'Data security',
    text: 'OSMOZ implements appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, destruction or accidental disclosure. The site is hosted on a secure infrastructure (Netlify, Inc.) over HTTPS.',
  },
  transfers: {
    title: 'Transfers outside the European Union',
    text: 'Some of our technical providers (Netlify, GoDaddy, Brevo) may be established outside the European Union, in particular in the United States. In that case, transfers are governed by appropriate safeguards (European Commission standard contractual clauses or equivalent mechanisms) in accordance with the GDPR.',
  },
  changes: {
    title: 'Changes to this policy',
    text: 'OSMOZ reserves the right to amend this Privacy Policy at any time, in particular to comply with any legal, regulatory or technical development. The update date at the top of the document will be revised with each change. We encourage you to check this page regularly.',
  },
  contact: {
    title: 'Contact',
    intro: 'For any question about this Privacy Policy:',
    address: 'OSMOZ, 19 avenue Rapp, 75007 Paris',
    emailLabel: 'Email:',
  },
};
