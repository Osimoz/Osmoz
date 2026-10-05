import SEO from '../components/SEO';
import { useLocale } from '../i18n/context';

const EMAIL = 'contact@osmoz-space.com';
const emailLink = <a href={`mailto:${EMAIL}`} className="text-[#862637] hover:text-[#01142a] transition-colors">{EMAIL}</a>;

function SectionNumber({ n }: { n: string }) {
  return <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">{n}</p>;
}
function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-lg font-semibold text-[#01142a] mb-4">{children}</h2>;
}
/** Liste « titre + texte » à bordure gauche (finalités, durées, droits, cookies). */
function ItemList({ items, titleMargin = 'mb-0.5' }: { items: { title: string; text: string }[]; titleMargin?: string }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.title} className="pl-5 border-l border-[#e5e5e5]">
          <p className={`text-base font-normal text-[#01142a] ${titleMargin}`}>{item.title}</p>
          <p className="text-base font-light text-gray-600">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function PolitiqueConfidentialite() {
  const { t } = useLocale();
  const v = t.privacy;
  return (
    <>
      <SEO route="privacy" />

      <div className="pt-32 pb-24 bg-[#fbfbf3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-4">
              {v.kicker}
            </p>
            <h1
              className="t-display text-h1 text-[#01142a] mb-5"
            >
              {v.title}
            </h1>
            <p className="text-sm font-light text-gray-400">
              {v.updated}
            </p>
          </div>

          {/* Intro */}
          <div className="max-w-3xl mb-12">
            <p className="text-base font-light text-gray-600 leading-relaxed mb-4">
              {v.intro1}
            </p>
            <p className="text-base font-light text-gray-600 leading-relaxed">
              {v.intro2}
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl space-y-12">

            <section>
              <SectionNumber n="01" />
              <SectionTitle>{v.controller.title}</SectionTitle>
              <div className="pl-5 border-l border-[#e5e5e5] space-y-1">
                <p className="text-base font-normal text-[#01142a]">{v.controller.company}</p>
                <p className="text-base font-light text-gray-600">{v.controller.form}</p>
                <p className="text-base font-light text-gray-600">{v.controller.address}</p>
                <p className="text-base font-light text-gray-600">{v.controller.siren}</p>
                <p className="text-base font-light text-gray-600">
                  {v.controller.emailLabel}{' '}
                  {emailLink}
                </p>
              </div>
            </section>

            <section>
              <SectionNumber n="02" />
              <SectionTitle>{v.collected.title}</SectionTitle>

              <p className="text-base font-semibold text-[#01142a] mb-2">{v.collected.directTitle}</p>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-6">
                {v.collected.directText}
              </p>

              <p className="text-base font-semibold text-[#01142a] mb-2">{v.collected.autoTitle}</p>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {v.collected.autoText}
              </p>
            </section>

            <section>
              <SectionNumber n="03" />
              <SectionTitle>{v.purposes.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-5">
                {v.purposes.intro}
              </p>
              <ItemList items={v.purposes.items} titleMargin="mb-1" />
            </section>

            <section>
              <SectionNumber n="04" />
              <SectionTitle>{v.recipients.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-4">
                {v.recipients.text1}
              </p>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {v.recipients.text2}
              </p>
            </section>

            <section>
              <SectionNumber n="05" />
              <SectionTitle>{v.retention.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-5">
                {v.retention.intro}
              </p>
              <ItemList items={v.retention.items} />
            </section>

            <section>
              <SectionNumber n="06" />
              <SectionTitle>{v.rights.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-5">
                {v.rights.intro}
              </p>
              <ItemList items={v.rights.items} />
              <p className="text-base font-light text-gray-600 leading-relaxed mt-5 mb-4">
                {v.rights.exerciseBefore}
                {emailLink}
                {v.rights.exerciseAfter}
              </p>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {v.rights.complaintBefore}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#862637] hover:text-[#01142a] transition-colors">
                  {v.rights.complaintLink}
                </a>
                {v.rights.complaintAfter}
              </p>
            </section>

            <section>
              <SectionNumber n="07" />
              <SectionTitle>{v.cookies.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-5">
                {v.cookies.intro}
              </p>
              <ItemList items={v.cookies.items} />
              <p className="text-base font-light text-gray-600 leading-relaxed mt-5">
                {v.cookies.outro}
              </p>
            </section>

            <section>
              <SectionNumber n="08" />
              <SectionTitle>{v.security.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {v.security.text}
              </p>
            </section>

            <section>
              <SectionNumber n="09" />
              <SectionTitle>{v.transfers.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {v.transfers.text}
              </p>
            </section>

            <section>
              <SectionNumber n="10" />
              <SectionTitle>{v.changes.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {v.changes.text}
              </p>
            </section>

            <section>
              <SectionNumber n="11" />
              <SectionTitle>{v.contact.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-2">
                {v.contact.intro}
              </p>
              <div className="pl-5 border-l border-[#e5e5e5] space-y-1">
                <p className="text-base font-light text-gray-600">{v.contact.address}</p>
                <p className="text-base font-light text-gray-600">
                  {v.contact.emailLabel}{' '}
                  {emailLink}
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
