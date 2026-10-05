import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { useLocale } from '../i18n/context';
import { Link } from 'react-router-dom';
import AProposTabs from '../components/AProposTabs';
import type { RichSegment } from '../locales/fr/faq';

// Rend une réponse avec liens internes : segments texte + { text, to } (voir
// src/locales/fr/faq.ts), le chemin FR étant traduit par p().
function RichAnswer({ segments, p }: { segments: RichSegment[]; p: (frPath: string) => string }) {
  return (
    <p>
      {segments.map((seg, i) =>
        typeof seg === 'string' ? (
          seg
        ) : (
          <Link key={i} to={p(seg.to)} className="text-[#862637] underline underline-offset-2">
            {seg.text}
          </Link>
        ),
      )}
    </p>
  );
}

export default function QuestionsFrequentes() {
  const { t, p } = useLocale();
  const f = t.faq;
  const faqCategories = f.categories;
  const allItems = faqCategories.flatMap((c) => c.items);
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
      <SEO route="faq" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <AProposTabs />

      <div className="pt-0 pb-24 bg-[#fbfbf3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <div className="mb-14">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-4">{f.kicker}</p>
            <h1
              className="t-display text-h1 text-[#01142a] mb-5"
            >
              {f.title}
            </h1>
            <p className="text-base font-light text-gray-500 leading-relaxed max-w-2xl">
              {f.intro}
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
                              {item.rich ? <RichAnswer segments={item.rich} p={p} /> : item.answer}
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
