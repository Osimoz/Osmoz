import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/context';

export default function NotFound() {
  const { t, p, lang } = useLocale();
  const s = t.notFound;

  return (
    <div style={{ background: '#fbfbf3', minHeight: '60vh' }}>
      <Helmet>
        <html lang={lang} />
        <title>{s.metaTitle}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div
        className="max-w-2xl mx-auto text-center"
        style={{ padding: 'clamp(120px, 14vw, 180px) clamp(24px, 5vw, 60px)' }}
      >
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#862637',
            fontWeight: 500,
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}
        >
          {s.kicker}
        </p>
        <h1 className="t-serif"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#01142a',
            marginBottom: '32px',
          }}
        >
          {s.title}
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={p('/')}
            className="btn-label inline-block bg-[#01142a] text-white px-8 py-3 rounded-xl text-xs uppercase hover:bg-[#862637] transition-all duration-300"
          >
            {s.home}
          </Link>
          <Link
            to={p('/spaces')}
            className="btn-label inline-block border border-[#01142a] text-[#01142a] px-8 py-3 rounded-xl text-xs uppercase hover:bg-[#01142a] hover:text-white transition-all duration-300"
          >
            {s.spaces}
          </Link>
        </div>
      </div>
    </div>
  );
}
