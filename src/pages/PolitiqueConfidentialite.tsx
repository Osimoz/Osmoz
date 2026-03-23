import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité | OSMOZ</title>
        <meta name="description" content="Politique de confidentialité d'OSMOZ : collecte, utilisation et protection de vos données personnelles conformément au RGPD." />
        <link rel="canonical" href="https://osmoz.work/politique-de-confidentialite" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="pt-32 pb-24 bg-[#fbfbf3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-4">
              Données personnelles
            </p>
            <h1
              className="font-light text-[#01142a] mb-5"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Politique de Confidentialité
            </h1>
            <p className="text-sm font-light text-gray-400">
              Dernière mise à jour : mars 2026
            </p>
          </div>

          {/* Intro */}
          <div className="max-w-3xl mb-12">
            <p className="text-base font-light text-gray-600 leading-relaxed mb-4">
              La société OSMOZ (ci-après « nous », « notre » ou « OSMOZ ») accorde une grande importance à la protection de vos données personnelles. La présente Politique de Confidentialité décrit comment nous collectons, utilisons, stockons et protégeons vos données dans le cadre de l'utilisation du site osmoz.work.
            </p>
            <p className="text-base font-light text-gray-600 leading-relaxed">
              Elle est établie conformément au Règlement (UE) 2016/679 du Parlement européen (RGPD) et à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés (loi Informatique et Libertés), modifiée.
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl space-y-12">

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">01</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Responsable du traitement</h2>
              <div className="pl-5 border-l border-[#e5e5e5] space-y-1">
                <p className="text-base font-normal text-[#01142a]">OSMOZ</p>
                <p className="text-base font-light text-gray-600">SAS au capital de 3 000,00 €</p>
                <p className="text-base font-light text-gray-600">19 avenue Rapp, 75007 Paris, France</p>
                <p className="text-base font-light text-gray-600">SIREN : 930 149 273, RCS Paris</p>
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
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Données personnelles collectées</h2>

              <p className="text-base font-semibold text-[#01142a] mb-2">2.1 Données collectées directement</p>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-6">
                Lorsque vous remplissez un formulaire de contact ou effectuez une demande de réservation, nous collectons : votre nom et prénom, votre adresse email, votre numéro de téléphone, le nom de votre entreprise, et tout message ou information que vous nous transmettez volontairement.
              </p>

              <p className="text-base font-semibold text-[#01142a] mb-2">2.2 Données collectées automatiquement</p>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                Lors de votre navigation sur le site, nous pouvons collecter automatiquement certaines données techniques : adresse IP, type et version de navigateur, pages visitées, durée de visite, source de trafic. Ces données sont collectées via des cookies ou outils d'analyse d'audience.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">03</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Finalités et bases légales du traitement</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-5">
                Vos données sont traitées pour les finalités suivantes :
              </p>
              <div className="space-y-4">
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-1">Gestion des demandes de contact et de réservation</p>
                  <p className="text-base font-light text-gray-600">Base légale : exécution d'un contrat ou mesures précontractuelles (art. 6.1.b RGPD).</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-1">Envoi de communications commerciales (newsletter, offres)</p>
                  <p className="text-base font-light text-gray-600">Base légale : consentement (art. 6.1.a RGPD).</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-1">Amélioration du site et analyse d'audience</p>
                  <p className="text-base font-light text-gray-600">Base légale : intérêt légitime (art. 6.1.f RGPD).</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-1">Respect de nos obligations légales et comptables</p>
                  <p className="text-base font-light text-gray-600">Base légale : obligation légale (art. 6.1.c RGPD).</p>
                </div>
              </div>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">04</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Destinataires des données</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-4">
                Vos données personnelles sont destinées aux membres habilités de la société OSMOZ. Elles peuvent être transmises à des sous-traitants techniques dans le cadre de la fourniture de nos services (hébergement, emailing, CRM), qui agissent uniquement sur instruction d'OSMOZ et dans le respect du RGPD.
              </p>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                OSMOZ ne vend ni ne loue vos données personnelles à des tiers. Vos données peuvent être communiquées aux autorités compétentes si la loi l'exige.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">05</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Durée de conservation</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-5">
                Vos données sont conservées pour les durées suivantes :
              </p>
              <div className="space-y-4">
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Données de contact et prospects</p>
                  <p className="text-base font-light text-gray-600">3 ans à compter du dernier contact.</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Données clients</p>
                  <p className="text-base font-light text-gray-600">5 ans à compter de la fin de la relation contractuelle (obligation comptable).</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Données de navigation (cookies)</p>
                  <p className="text-base font-light text-gray-600">13 mois maximum.</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Données d'abonnés à la newsletter</p>
                  <p className="text-base font-light text-gray-600">Jusqu'au désabonnement ou retrait du consentement.</p>
                </div>
              </div>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">06</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Vos droits</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-5">
                Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
              </p>
              <div className="space-y-4">
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Droit d'accès</p>
                  <p className="text-base font-light text-gray-600">Obtenir une copie des données que nous détenons sur vous.</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Droit de rectification</p>
                  <p className="text-base font-light text-gray-600">Corriger des données inexactes ou incomplètes.</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Droit à l'effacement</p>
                  <p className="text-base font-light text-gray-600">Demander la suppression de vos données, sous réserve de nos obligations légales.</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Droit à la limitation</p>
                  <p className="text-base font-light text-gray-600">Restreindre temporairement le traitement de vos données.</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Droit à la portabilité</p>
                  <p className="text-base font-light text-gray-600">Recevoir vos données dans un format structuré et lisible par machine.</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Droit d'opposition</p>
                  <p className="text-base font-light text-gray-600">Vous opposer au traitement de vos données, notamment à des fins de prospection.</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Droit de retrait du consentement</p>
                  <p className="text-base font-light text-gray-600">Retirer votre consentement à tout moment, sans que cela remette en cause la licéité du traitement antérieur.</p>
                </div>
              </div>
              <p className="text-base font-light text-gray-600 leading-relaxed mt-5 mb-4">
                Pour exercer l'un de ces droits, adressez votre demande par email à :{' '}
                <a href="mailto:contact@osmoz.work" className="text-[#862637] hover:text-[#01142a] transition-colors">
                  contact@osmoz.work
                </a>
                . Nous nous engageons à vous répondre dans un délai d'un (1) mois à compter de la réception de votre demande.
              </p>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                Si vous estimez que vos droits ne sont pas respectés, vous avez la possibilité d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL),{' '}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#862637] hover:text-[#01142a] transition-colors">
                  www.cnil.fr
                </a>
                .
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">07</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Cookies</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-5">
                Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d'un site. Le site osmoz.work peut utiliser les types de cookies suivants :
              </p>
              <div className="space-y-4">
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Cookies strictement nécessaires</p>
                  <p className="text-base font-light text-gray-600">Indispensables au bon fonctionnement du site. Ils ne nécessitent pas votre consentement.</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Cookies analytiques</p>
                  <p className="text-base font-light text-gray-600">Mesure d'audience et statistiques de navigation (ex : Google Analytics). Soumis à consentement.</p>
                </div>
                <div className="pl-5 border-l border-[#e5e5e5]">
                  <p className="text-base font-normal text-[#01142a] mb-0.5">Cookies marketing</p>
                  <p className="text-base font-light text-gray-600">Personnalisation publicitaire et suivi des campagnes. Soumis à consentement.</p>
                </div>
              </div>
              <p className="text-base font-light text-gray-600 leading-relaxed mt-5">
                Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies ou être alerté de leur dépôt. La désactivation de certains cookies peut toutefois affecter votre expérience de navigation.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">08</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Sécurité des données</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                OSMOZ met en oeuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte, destruction ou divulgation accidentelle. Le site est hébergé sur une infrastructure sécurisée (Netlify, Inc.) avec protocole HTTPS.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">09</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Transferts hors Union Européenne</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                Certains de nos prestataires techniques (Netlify, GoDaddy, Brevo) peuvent être établis en dehors de l'Union Européenne, notamment aux États-Unis. Dans ce cas, les transferts sont encadrés par des garanties appropriées (clauses contractuelles types de la Commission Européenne ou mécanismes équivalents) conformément au RGPD.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">10</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Modifications de la présente politique</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                OSMOZ se réserve le droit de modifier la présente Politique de Confidentialité à tout moment, notamment pour se conformer à toute évolution légale, réglementaire ou technique. La date de mise à jour figurant en haut du document sera actualisée à chaque modification. Nous vous encourageons à consulter régulièrement cette page.
              </p>
            </section>

            <section>
              <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">11</p>
              <h2 className="text-lg font-semibold text-[#01142a] mb-4">Contact</h2>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-2">
                Pour toute question relative à la présente Politique de Confidentialité :
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
