import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

type FaqItem = {
  question: string;
  answer: string;
  answerJsx?: React.ReactNode;
};

type FaqCategory = {
  label: string;
  items: FaqItem[];
};

const faqCategories: FaqCategory[] = [
  {
    label: 'Questions générales',
    items: [
      {
        question: "Y a-t-il une personne sur place pour nous accueillir ?",
        answer: `Le jour de votre événement au Loft OSMOZ, un membre de notre équipe est toujours là pour vous recevoir. Une fois que vous êtes installés, vous bénéficiez d'une totale autonomie. Et si vous souhaitez être accompagné, nous pouvons prévoir un régisseur ou un maître d'hôtel pour un service d'accueil sur-mesure.`
      },
      {
        question: "Est-il possible de prolonger ou raccourcir la réservation au dernier moment ?",
        answer: `Oui, nous faisons tout pour nous adapter ! Il suffit de nous informer au plus tard 7 jours avant. Nous ajustons les horaires selon nos disponibilités, avec transparence sur d'éventuels frais additionnels.`
      },
      {
        question: "Peut-on réserver à la demi-journée ou à la journée entière ?",
        answer: `Tout à fait. Que ce soit pour un format court le matin, une journée complète, ou un après-midi suivi d'un cocktail, le Loft OSMOZ s'adapte à vos besoins. Flexibilité et personnalisation sont au cœur de notre approche.`
      },
      {
        question: "Quelles prestations sont offertes avec la location de la salle de réunion ?",
        answer: "Quand vous réservez le Loft OSMOZ, plusieurs prestations sont naturellement incluses, c'est notre manière d'accueillir comme à la maison. Tous les meubles sont modulables : vous pouvez organiser l'espace comme vous le souhaitez, en fonction de votre format (réunion, atelier, déjeuner, etc.). Du café bio fraîchement moulu, une sélection de thés de qualité et de l'eau fraîche est également à disposition. L'idée, c'est que vous arriviez, vous posiez vos affaires… et que tout soit prêt pour commencer."
      },
    ],
  },
  {
    label: 'Événements & accompagnement',
    items: [
      {
        question: "Quels types d'événements d'entreprise peut-on organiser dans un lieu Osmoz ?",
        answer: "Les espaces Osmoz accueillent tous les formats d'événements professionnels à la journée : réunions et comités de direction, séminaires d'équipe, workshops et ateliers, formations, conférences et plénières, cocktails et afterworks, déjeuners d'affaires, ainsi que tournages et shootings photo. Chaque lieu est modulable pour combiner plusieurs formats dans la même journée, par exemple une plénière le matin, des ateliers en îlots l'après-midi et un cocktail en soirée. Osmoz est réservé exclusivement aux entreprises : nous n'accueillons pas d'événements pour particuliers.",
        answerJsx: (
          <p>Les espaces Osmoz accueillent tous les formats d'événements professionnels à la journée : réunions et comités de direction, séminaires d'équipe, workshops et ateliers, formations, conférences et plénières, cocktails et afterworks, déjeuners d'affaires, ainsi que tournages et shootings photo. Chaque lieu est modulable pour combiner plusieurs formats dans la même journée, par exemple une plénière le matin, des ateliers en îlots l'après-midi et un cocktail en soirée. Osmoz est réservé exclusivement aux entreprises : nous n'accueillons pas d'événements pour particuliers. <Link to="/spaces" className="text-[#862637] underline underline-offset-2">Découvrir nos espaces →</Link></p>
        ),
      },
      {
        question: "Les espaces Osmoz sont-ils entièrement privatisés pour mon événement ?",
        answer: "Oui, chaque lieu Osmoz est intégralement privatisé pour votre journée, sans cohabitation avec d'autres réservations. Cette privatisation exclusive garantit la confidentialité des échanges, la liberté de circulation entre les espaces et l'usage de l'intégralité du lieu (salle de réunion, salon, cuisine, extérieurs quand ils existent). C'est un parti pris d'Osmoz : contrairement à une marketplace, nous ne sous-louons pas au créneau. Chaque journée est dédiée à une seule entreprise.",
      },
      {
        question: "Est-il possible d'organiser un événement en soirée ou le week-end chez Osmoz ?",
        answer: "Oui, les trois lieux Osmoz accueillent des événements en soirée jusqu'à 22 h, avec deux formules dédiées : « Soirée » (18 h 30 – 22 h) ou « Journée + soirée » (8 h 30 – 22 h). Les soirées sont idéales pour les cocktails d'entreprise, afterworks, dîners d'équipe ou lancements de produit. Les événements le week-end sont étudiés au cas par cas selon la disponibilité des lieux : précisez votre besoin dans la demande de devis et nous revenons sous 24 h.",
        answerJsx: (
          <p>Oui, les trois lieux Osmoz accueillent des événements en soirée jusqu'à 22 h, avec deux formules dédiées : « Soirée » (18 h 30 – 22 h) ou « Journée + soirée » (8 h 30 – 22 h). Les soirées sont idéales pour les cocktails d'entreprise, afterworks, dîners d'équipe ou lancements de produit. Les événements le week-end sont étudiés au cas par cas : précisez votre besoin dans votre <Link to="/reservation" className="text-[#862637] underline underline-offset-2">demande de devis</Link> et nous revenons sous 24 h.</p>
        ),
      },
      {
        question: "Peut-on tourner un film ou organiser un shooting photo dans un espace Osmoz ?",
        answer: "Oui, les trois lieux Osmoz accueillent régulièrement des productions audiovisuelles : tournages publicitaires, captations vidéo, shootings mode ou corporate, podcasts filmés. Le Loft (Marais) offre une verrière et un mur en pierre très photogéniques, Le Duplex Haussmannien (Paris 2e) un escalier sculptural avec moulures et parquet, et Le Penthouse (La Défense) une vue panoramique sur Paris avec jardin suspendu. La privatisation exclusive à la journée garantit à votre équipe un accès complet, sans interférence avec d'autres réservations.",
        answerJsx: (
          <p>Oui, les trois lieux Osmoz accueillent régulièrement des productions audiovisuelles : tournages publicitaires, captations vidéo, shootings mode ou corporate, podcasts filmés. <Link to="/spaces/loft-osmoz" className="text-[#862637] underline underline-offset-2">Le Loft (Marais)</Link> offre une verrière et un mur en pierre très photogéniques, <Link to="/spaces/duplex-osmoz" className="text-[#862637] underline underline-offset-2">Le Duplex Haussmannien (Paris 2e)</Link> un escalier sculptural avec moulures et parquet, et <Link to="/spaces/penthouse-osmoz" className="text-[#862637] underline underline-offset-2">Le Penthouse (La Défense)</Link> une vue panoramique sur Paris avec jardin suspendu.</p>
        ),
      },
    ],
  },
  {
    label: 'Lieux, capacités & accessibilité',
    items: [
      {
        question: "Combien de personnes peut-on accueillir dans les espaces Osmoz ?",
        answer: "Les trois lieux Osmoz accueillent de 5 à 40 personnes selon l'adresse et le format. Le Loft dans le Marais privatise jusqu'à 25 personnes sur 110 m², Le Duplex Haussmannien à Paris 2e reçoit 40 personnes sur 300 m² et deux niveaux, et Le Penthouse à La Défense accueille 40 personnes sur 150 m² intérieurs plus 350 m² de jardin suspendu. Chaque espace propose plusieurs configurations (plénière, table en U, îlots, cocktail) pour s'adapter à votre format.",
        answerJsx: (
          <p>Les trois lieux Osmoz accueillent de 5 à 40 personnes selon l'adresse et le format. <Link to="/spaces/loft-osmoz" className="text-[#862637] underline underline-offset-2">Le Loft (Marais)</Link> privatise jusqu'à 25 personnes sur 110 m², <Link to="/spaces/duplex-osmoz" className="text-[#862637] underline underline-offset-2">Le Duplex Haussmannien (Paris 2e)</Link> reçoit 40 personnes sur 300 m² et deux niveaux, et <Link to="/spaces/penthouse-osmoz" className="text-[#862637] underline underline-offset-2">Le Penthouse (La Défense)</Link> accueille 40 personnes sur 150 m² intérieurs plus 350 m² de jardin suspendu.</p>
        ),
      },
      {
        question: "Dans quels quartiers de Paris se trouvent les espaces Osmoz ?",
        answer: "Osmoz opère trois adresses choisies pour leur centralité : Le Loft au cœur du Marais (10 rue Roger Verlomme, Paris 3e, à deux pas de la Place des Vosges), Le Duplex Haussmannien dans le quartier Bourse-Montmartre (146 rue Montmartre, Paris 2e) et Le Penthouse à La Défense (Tour Cofonca, 6-8 rue Jean Jaurès, Puteaux). Ces trois localisations couvrent à la fois le cœur historique de Paris et le premier quartier d'affaires français.",
      },
      {
        question: "Certains espaces Osmoz disposent-ils d'extérieurs ou d'une vue panoramique ?",
        answer: "Oui. Le Penthouse à La Défense dispose d'un jardin suspendu privatif de 350 m² au dernier étage d'une tour, avec vue panoramique sur Paris et la Tour Eiffel, un extérieur rare pour un événement d'entreprise. Le Duplex Haussmannien (Paris 2e) possède une cour privée à l'arrière. Ces espaces extérieurs sont parfaits pour une pause café, un cocktail en plein air ou un moment de respiration entre deux sessions de travail.",
        answerJsx: (
          <p>Oui. <Link to="/spaces/penthouse-osmoz" className="text-[#862637] underline underline-offset-2">Le Penthouse à La Défense</Link> dispose d'un jardin suspendu privatif de 350 m² au dernier étage d'une tour, avec vue panoramique sur Paris et la Tour Eiffel, un extérieur rare pour un événement d'entreprise. <Link to="/spaces/duplex-osmoz" className="text-[#862637] underline underline-offset-2">Le Duplex Haussmannien (Paris 2e)</Link> possède une cour privée à l'arrière. Ces espaces extérieurs sont parfaits pour une pause café, un cocktail en plein air ou un moment de respiration entre deux sessions de travail.</p>
        ),
      },
      {
        question: "Les lieux Osmoz sont-ils accessibles aux personnes à mobilité réduite (PMR) et bien desservis par les transports ?",
        answer: "Côté transports, les trois adresses sont à quelques minutes à pied d'un métro ou RER : Le Loft via Chemin Vert (ligne 8), Bastille (lignes 1, 5, 8) et Saint-Paul (ligne 1) ; Le Duplex via Bourse (ligne 3), Grands Boulevards (lignes 8, 9) et Sentier (ligne 3) ; Le Penthouse via La Défense – Grande Arche (ligne 1), RER A et tram T2. L'accessibilité PMR varie selon la configuration de chaque bâtiment : précisez ce besoin dans votre demande, nous vous orientons vers le lieu le plus adapté. Aucun parking privé, mais des parkings publics se trouvent à proximité immédiate.",
      },
    ],
  },
  {
    label: 'Tarifs & réservation',
    items: [
      {
        question: "Combien coûte la privatisation d'un lieu Osmoz pour un séminaire à Paris ?",
        answer: "Les tarifs démarrent à 649 € HT la demi-journée pour Le Loft (Marais, jusqu'à 25 personnes), 1 499 € HT pour Le Penthouse (La Défense, jusqu'à 40 personnes) et 1 499 € HT pour Le Duplex Haussmannien (Paris 2e, jusqu'à 40 personnes). En journée complète (8 h 30 – 18 h 30), comptez de 999 € à 2 499 € HT selon le lieu. Ces tarifs correspondent à la location seule : la restauration, les animations de team building et les extensions horaires sont chiffrées en option, sur devis.",
        answerJsx: (
          <p>Les tarifs démarrent à 649 € HT la demi-journée pour <Link to="/spaces/loft-osmoz" className="text-[#862637] underline underline-offset-2">Le Loft (Marais)</Link>, 1 499 € HT pour <Link to="/spaces/penthouse-osmoz" className="text-[#862637] underline underline-offset-2">Le Penthouse (La Défense)</Link> et 1 999 € HT pour <Link to="/spaces/duplex-osmoz" className="text-[#862637] underline underline-offset-2">Le Duplex Haussmannien (Paris 2e)</Link>. En journée complète (8 h 30 – 18 h 30), comptez de 999 € à 2 499 € HT selon le lieu. La restauration, les animations et les extensions horaires sont chiffrées en option, sur devis.</p>
        ),
      },
      {
        question: "Comment obtenir un devis pour privatiser un espace Osmoz ?",
        answer: "Le plus simple est d'envoyer une demande via le formulaire de contact sur osmoz.work en précisant la date, le nombre de participants, le format souhaité (réunion, séminaire, cocktail, tournage…) et vos besoins en restauration ou animation. Nous revenons sous 24 h avec les disponibilités, un devis détaillé et des propositions d'options. La demande est gratuite et sans engagement.",
        answerJsx: (
          <p>Le plus simple est d'envoyer une demande via <Link to="/reservation" className="text-[#862637] underline underline-offset-2">notre formulaire de réservation</Link> en précisant la date, le nombre de participants, le format souhaité (réunion, séminaire, cocktail, tournage…) et vos besoins en restauration ou animation. Nous revenons sous 24 h avec les disponibilités, un devis détaillé et des propositions d'options. La demande est gratuite et sans engagement.</p>
        ),
      },
      {
        question: "Combien de temps à l'avance faut-il réserver un lieu pour un séminaire à Paris ?",
        answer: "Pour un séminaire à Paris, comptez 3 à 6 semaines d'anticipation, et 2 à 3 mois pour les pics de saison (juin, septembre-octobre, décembre). Osmoz confirme la disponibilité et envoie un devis sous 24 h, et peut accueillir des demandes de dernière minute si le lieu est libre. Plus la demande arrive tôt, plus vous avez de latitude sur la date, le menu et les animations.",
      },
    ],
  },
  {
    label: 'Restauration, services & équipements',
    items: [
      {
        question: "Quelle offre de restauration proposez-vous pour un événement d'entreprise ?",
        answer: "Osmoz propose une offre de restauration complète, construite sur mesure selon le rythme de votre journée : petit déjeuner, déjeuner (plats à partager, buffet, lunchbox ou dîner assis), pause gourmande, cocktail dînatoire. Deux formats principaux : la Cheffe privée Fleur, qui cuisine sur place avec des produits de saison, ou nos traiteurs partenaires engagés (Brigat', Adar, Les Cuistots Migrateurs, Terroir du Nil, Karmama). Tout est préparé ou livré le jour même. Les régimes spécifiques (végétarien, vegan, sans gluten, allergies, halal) sont pris en compte sur demande.",
        answerJsx: (
          <p>Osmoz propose une offre de restauration complète, construite sur mesure selon le rythme de votre journée : petit déjeuner, déjeuner (plats à partager, buffet, lunchbox ou dîner assis), pause gourmande, cocktail dînatoire. Deux formats principaux : la Cheffe privée Fleur, qui cuisine sur place avec des produits de saison, ou nos traiteurs partenaires engagés (Brigat', Adar, Les Cuistots Migrateurs, Terroir du Nil, Karmama). Les régimes spécifiques (végétarien, vegan, sans gluten, allergies, halal) sont pris en compte sur demande. <Link to="/experience" className="text-[#862637] underline underline-offset-2">Découvrir l'offre culinaire →</Link></p>
        ),
      },
      {
        question: "Quelles animations et activités de team building sont proposées chez Osmoz ?",
        answer: "Trois familles d'animations sont disponibles directement dans le lieu : les animations culinaires (atelier pizzaiolo, atelier pâtisserie-chocolat, dégustation d'huîtres animée), les quiz et challenges (Bagel Quiz, blind test avec option chanteuse live, Meet & Win pour la cohésion), et les formats immersifs (atelier doublage de film, Green City pour sensibiliser aux enjeux RSE, escape game en réalité virtuelle avec débrief coach). Toutes ces activités sont intégrées à la journée, sans logistique supplémentaire de votre côté.",
        answerJsx: (
          <p>Trois familles d'animations sont disponibles directement dans le lieu : les animations culinaires (atelier pizzaiolo, atelier pâtisserie-chocolat, dégustation d'huîtres animée), les quiz et challenges (Bagel Quiz, blind test avec option chanteuse live, Meet & Win), et les formats immersifs (atelier doublage de film, Green City RSE, escape game en réalité virtuelle). <Link to="/experience" className="text-[#862637] underline underline-offset-2">Voir toutes les activités →</Link></p>
        ),
      },
      {
        question: "Les espaces Osmoz sont-ils équipés pour des réunions hybrides et des visioconférences ?",
        answer: "Oui, chaque lieu est équipé en standard pour les formats hybrides : wifi haut débit, écrans connectés, câble HDMI, paperboard. Caméras et micros adaptés à la visio (Teams, Zoom, Google Meet) sont disponibles sur demande selon la taille du groupe. Précisez le format hybride et le nombre de participants à distance dans votre demande : le setup technique est calé en amont pour que vous n'ayez rien à brancher vous-même le jour J.",
      },
    ],
  },
  {
    label: 'Engagement RSE & différenciation',
    items: [
      {
        question: "Osmoz propose-t-il une approche éco-responsable pour les événements d'entreprise ?",
        answer: "Oui, la démarche RSE d'Osmoz repose sur quatre piliers concrets. Zéro déchet opérationnel : plastique à usage unique banni, tri sélectif intégré, filtration d'eau pour supprimer les bouteilles. Cuisine locale et responsable : produits de saison, circuit court, filières bio ou HVE, gestion active du gaspillage. Réhabilitation plutôt que construction : nos lieux sont des espaces existants transformés, pas de nouvelle construction. Mobilité sobre : Paris intra-muros ou proche, transports en commun à portée, éclairage LED. Des indicateurs de performance sont disponibles sur demande pour vos bilans RSE et rapports de durabilité.",
        answerJsx: (
          <p>Oui, la démarche RSE d'Osmoz repose sur quatre piliers concrets : zéro déchet opérationnel, cuisine locale et responsable, réhabilitation plutôt que construction, et mobilité sobre. Des indicateurs de performance sont disponibles sur demande pour vos bilans RSE et rapports de durabilité. <Link to="/rse" className="text-[#862637] underline underline-offset-2">En savoir plus sur notre démarche RSE →</Link></p>
        ),
      },
    ],
  },
];

const allItems = faqCategories.flatMap(c => c.items);

export default function QuestionsFrequentes() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>FAQ — OSMOZ | Questions fréquentes sur la location d'espaces à Paris</title>
        <meta name="description" content="Toutes vos questions sur la location d'espaces Osmoz à Paris : événements, tarifs, restauration, équipements, RSE. Réponses claires et transparentes." />
        <link rel="canonical" href="https://osmoz.work/questions-frequentes" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="pt-24 pb-24 bg-[#fbfbf3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <div className="mb-14">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-4">Questions fréquentes</p>
            <h1
              className="font-light text-[#01142a] mb-5"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              FAQ
            </h1>
            <p className="text-base font-light text-gray-500 leading-relaxed max-w-2xl">
              Vous préparez une réunion, un séminaire ou une journée de travail chez OSMOZ ? Voici les questions les plus fréquentes, avec des réponses simples et directes.
            </p>
          </div>

          <div className="space-y-12">
            {faqCategories.map((cat) => (
              <div key={cat.label}>
                <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 mb-5">
                  {cat.label}
                </p>
                <div className="space-y-3">
                  {cat.items.map((item) => {
                    const key = `${cat.label}-${item.question}`;
                    const isOpen = openKey === key;
                    return (
                      <div key={key} className="border border-[#e5e5e5] rounded-xl overflow-hidden bg-white">
                        <button
                          className="w-full flex justify-between items-center p-5 text-left hover:bg-[#fafaf8] transition-colors"
                          onClick={() => setOpenKey(isOpen ? null : key)}
                        >
                          <span className="text-[#01142a] text-base font-normal pr-4">{item.question}</span>
                          {isOpen
                            ? <ChevronUp className="text-[#862637] flex-shrink-0" />
                            : <ChevronDown className="text-gray-400 flex-shrink-0" />
                          }
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-[#f0f0e8]">
                            <div className="pt-4">
                              {item.answerJsx ?? item.answer}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
