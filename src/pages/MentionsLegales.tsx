import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function MentionsLegales() {
  return (
    <>
      <Helmet>
        <title>Mentions Légales | OSMOZ</title>
        <meta name="description" content="Mentions légales du site osmoz.work : informations sur l'éditeur, l'hébergeur, la propriété intellectuelle et la protection des données." />
        <link rel="canonical" href="https://osmoz.work/mentions-legales" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="pt-32 pb-24 bg-[#fbfbf3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-4">
              Informations légales
            </p>
            <h1
              className="font-light text-[#01142a] mb-5"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Mentions Légales
            </h1>
            <p className="text-sm font-light text-gray-400">
              Dernière mise à jour : mars 2026
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl space-y-12">

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">01</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Éditeur du site</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                Le site osmoz.work est édité par la société :
              </p>
              <div className="mt-4 pl-5 border-l border-[#e5e5e5] space-y-1">
                <p className="text-base font-normal text-[#01142a]">OSMOZ</p>
                <p className="text-base font-light text-gray-600">Société par Actions Simplifiée (SAS)</p>
                <p className="text-base font-light text-gray-600">Capital social : 3 000,00 €</p>
                <p className="text-base font-light text-gray-600">Siège social : 19 avenue Rapp, 75007 Paris, France</p>
                <p className="text-base font-light text-gray-600">SIREN : 930 149 273</p>
                <p className="text-base font-light text-gray-600">RCS Paris</p>
                <p className="text-base font-light text-gray-600">Numéro de TVA intracommunautaire : FR40930149273</p>
                <p className="text-base font-light text-gray-600">Président : Edouard Courtois dit Duverger</p>
                <p className="text-base font-light text-gray-600">
                  Email :{' '}
                  <a href="mailto:contact@osmoz.work" className="text-[#862637] hover:text-[#01142a] transition-colors">
                    contact@osmoz.work
                  </a>
                </p>
              </div>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">02</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Directeur de la publication</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                Le directeur de la publication est Edouard Courtois dit Duverger, en sa qualité de Président de la société OSMOZ.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">03</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Hébergement</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-5">
                Le site est hébergé par :
              </p>
              <div className="pl-5 border-l border-[#e5e5e5] space-y-1">
                <p className="text-base font-normal text-[#01142a]">Netlify, Inc.</p>
                <p className="text-base font-light text-gray-600">Adresse : 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis</p>
                <p className="text-base font-light text-gray-600">
                  Site web :{' '}
                  <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-[#862637] hover:text-[#01142a] transition-colors">
                    https://www.netlify.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">04</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Propriété intellectuelle</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) est la propriété exclusive de la société OSMOZ ou de ses partenaires. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès écrit d'OSMOZ. Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">05</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Protection des données personnelles</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition concernant vos données personnelles.
              </p>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-4">
                Pour exercer ces droits ou pour toute question relative au traitement de vos données, vous pouvez contacter OSMOZ à l'adresse suivante :{' '}
                <a href="mailto:contact@osmoz.work" className="text-[#862637] hover:text-[#01142a] transition-colors">
                  contact@osmoz.work
                </a>
              </p>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                Pour plus d'informations, veuillez consulter notre{' '}
                <Link to="/politique-de-confidentialite" className="text-[#862637] underline underline-offset-4 hover:text-[#01142a] transition-colors">
                  Politique de Confidentialité
                </Link>{' '}
                accessible sur ce site.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">06</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Cookies</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                Le site osmoz.work est susceptible d'utiliser des cookies afin d'améliorer l'expérience utilisateur. Conformément à la réglementation en vigueur, vous êtes informé de la présence de ces cookies lors de votre première visite et pouvez les accepter ou les refuser. Vous pouvez également configurer votre navigateur pour désactiver les cookies.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">07</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Liens hypertextes</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                Le site osmoz.work peut contenir des liens vers d'autres sites internet. OSMOZ ne peut être tenu responsable du contenu de ces sites tiers ni des dommages ou préjudices pouvant résulter de leur utilisation. La création de liens hypertextes vers le site osmoz.work est soumise à l'accord préalable et exprès d'OSMOZ.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">08</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Limitation de responsabilité</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                OSMOZ s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, OSMOZ ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition. En conséquence, OSMOZ décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site, ainsi que pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le site.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">09</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Droit applicable et juridiction compétente</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                Les présentes mentions légales sont soumises au droit français. En cas de litige et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">10</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Contact</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-2">
                Pour toute question relative au présent site ou pour nous contacter :
              </p>
              <div className="pl-5 border-l border-[#e5e5e5] space-y-1">
                <p className="text-base font-light text-gray-600">OSMOZ, 19 avenue Rapp, 75007 Paris</p>
                <p className="text-base font-light text-gray-600">
                  Email :{' '}
                  <a href="mailto:contact@osmoz.work" className="text-[#862637] hover:text-[#01142a] transition-colors">
                    contact@osmoz.work
                  </a>
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
