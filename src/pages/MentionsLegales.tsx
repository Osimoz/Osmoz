import SEO from '../components/SEO';
import { useLocale } from '../i18n/context';
import { Link } from 'react-router-dom';

const EMAIL = 'contact@osmoz-space.com';
const emailLink = <a href={`mailto:${EMAIL}`} className="text-[#862637] hover:text-[#01142a] transition-colors">{EMAIL}</a>;

function SectionNumber({ n }: { n: string }) {
  return <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-3">{n}</p>;
}
function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-lg font-semibold text-[#01142a] mb-4">{children}</h2>;
}

export default function MentionsLegales() {
  const { t, p } = useLocale();
  const l = t.legal;
  return (
    <>
      <SEO route="legal" />

      <div className="pt-32 pb-24 bg-[#fbfbf3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-[#862637] mb-4">
              {l.kicker}
            </p>
            <h1
              className="t-h1 text-h1 text-[#01142a] mb-5"
            >
              {l.title}
            </h1>
            <p className="text-sm font-light text-gray-400">
              {l.updated}
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl space-y-12">

            <section>
              <SectionNumber n="01" />
              <SectionTitle>{l.publisher.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {l.publisher.intro}
              </p>
              <div className="mt-4 pl-5 border-l border-[#e5e5e5] space-y-1">
                <p className="text-base font-normal text-[#01142a]">{l.publisher.company}</p>
                <p className="text-base font-light text-gray-600">{l.publisher.form}</p>
                <p className="text-base font-light text-gray-600">{l.publisher.capital}</p>
                <p className="text-base font-light text-gray-600">{l.publisher.address}</p>
                <p className="text-base font-light text-gray-600">{l.publisher.siren}</p>
                <p className="text-base font-light text-gray-600">{l.publisher.rcs}</p>
                <p className="text-base font-light text-gray-600">{l.publisher.vat}</p>
                <p className="text-base font-light text-gray-600">{l.publisher.president}</p>
                <p className="text-base font-light text-gray-600">
                  {l.publisher.emailLabel}{' '}
                  {emailLink}
                </p>
              </div>
            </section>

            <section>
              <SectionNumber n="02" />
              <SectionTitle>{l.director.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {l.director.text}
              </p>
            </section>

            <section>
              <SectionNumber n="03" />
              <SectionTitle>{l.hosting.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-5">
                {l.hosting.intro}
              </p>
              <div className="pl-5 border-l border-[#e5e5e5] space-y-1">
                <p className="text-base font-normal text-[#01142a]">{l.hosting.name}</p>
                <p className="text-base font-light text-gray-600">{l.hosting.address}</p>
                <p className="text-base font-light text-gray-600">
                  {l.hosting.websiteLabel}{' '}
                  <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-[#862637] hover:text-[#01142a] transition-colors">
                    https://www.netlify.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <SectionNumber n="04" />
              <SectionTitle>{l.ip.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {l.ip.text}
              </p>
            </section>

            <section>
              <SectionNumber n="05" />
              <SectionTitle>{l.data.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-4">
                {l.data.text1}
              </p>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-4">
                {l.data.text2Before}
                {emailLink}
              </p>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {l.data.text3Before}
                <Link to={p('/politique-de-confidentialite')} className="text-[#862637] underline underline-offset-4 hover:text-[#01142a] transition-colors">
                  {l.data.text3Link}
                </Link>
                {l.data.text3After}
              </p>
            </section>

            <section>
              <SectionNumber n="06" />
              <SectionTitle>{l.cookies.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {l.cookies.text}
              </p>
            </section>

            <section>
              <SectionNumber n="07" />
              <SectionTitle>{l.links.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {l.links.text}
              </p>
            </section>

            <section>
              <SectionNumber n="08" />
              <SectionTitle>{l.liability.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {l.liability.text}
              </p>
            </section>

            <section>
              <SectionNumber n="09" />
              <SectionTitle>{l.law.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {l.law.text}
              </p>
            </section>

            <section>
              <SectionNumber n="10" />
              <SectionTitle>{l.contact.title}</SectionTitle>
              <p className="text-base font-light text-gray-600 leading-relaxed mb-2">
                {l.contact.intro}
              </p>
              <div className="pl-5 border-l border-[#e5e5e5] space-y-1">
                <p className="text-base font-light text-gray-600">{l.contact.address}</p>
                <p className="text-base font-light text-gray-600">
                  {l.contact.emailLabel}{' '}
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
