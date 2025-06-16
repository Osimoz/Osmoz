import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  {
    question: "Y a-t-il une personne sur place pour nous accueillir ?",
    answer: `Le jour de votre événement au Loft OSMOZ, un membre de notre équipe est toujours là pour vous recevoir. Une fois que vous êtes installés, vous bénéficiez d'une totale autonomie. Et si vous souhaitez être accompagné, nous pouvons prévoir un régisseur ou un maître d'hôtel pour un service d'accueil sur-mesure.`
  },
  {
    question: "Est-il possible de prolonger ou raccourcir la réservation au dernier moment ?",
    answer: `Oui, nous faisons tout pour nous adapter ! Il suffit de nous informer au plus tard 7 jours avant. Nous ajustons les horaires selon nos disponibilités, avec transparence sur d’éventuels frais additionnels.`
  },
  {
    question: "Peut-on réserver à la demi-journée ou à la journée entière ?",
    answer: `Tout à fait. Que ce soit pour un format court le matin, une journée complète, ou un après-midi suivi d’un cocktail, le Loft OSMOZ s’adapte à vos besoins. Flexibilité et personnalisation sont au cœur de notre approche.`
  },
  {
    question: "Quelles prestations sont offertes avec la location de la salle de réunion ?",
    answer: "Quand vous réservez le Loft OSMOZ, plusieurs prestations sont naturellement incluses, c’est notre manière d’accueillir comme à la maison.Tous les meubles sont modulables : vous pouvez organiser l’espace comme vous le souhaitez, en fonction de votre format (réunion, atelier, déjeuner, etc.). Du café bio fraîchement moulu, une sélection de thés de qualité et de l'eau fraîche est également à disposition. L’idée, c’est que vous arriviez, vous posiez vos affaires… et que tout soit prêt pour commencer."
  }
];

export default function QuestionsFrequentes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-light mb-4 text-[#00142A]">FAQ</h1>
          <p className="text-gray-600 font-light leading-relaxed max-w-2xl">
            Vous préparez une réunion, un séminaire ou une journée de travail chez OSMOZ ? Voici les questions les plus fréquentes qu’on nous pose, avec des réponses simples.
          </p>
        </div>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-[#FFE1D4] rounded-xl overflow-hidden shadow-sm">
              <button
                className="w-full flex justify-between items-center p-5 text-left bg-[#FFE1D4] hover:bg-[#fcd3c3] transition"
                onClick={() => toggleIndex(index)}
              >
                <span className="text-[#6B2138] text-lg font-medium">{item.question}</span>
                {openIndex === index ? <ChevronUp className="text-[#6B2138]" /> : <ChevronDown className="text-[#6B2138]" />}
              </button>
              {openIndex === index && (
                <div className="bg-white p-6 text-[#00142A] text-sm leading-relaxed border-t border-[#FFE1D4]">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}