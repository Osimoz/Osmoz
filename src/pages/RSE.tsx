import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLocale } from '../i18n/context';
import AProposTabs from '../components/AProposTabs';

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Le texte vient de t.rse ; ne restent ici que les valeurs non textuelles.

const pillarNumbers = ['01', '02', '03', '04'];

const actionGradients = [
  'linear-gradient(160deg, #e2eade 0%, #d5e0cf 60%, #c5d3be 100%)',
  'linear-gradient(160deg, #e2eade 0%, #d5e0cf 60%, #c5d3be 100%)',
  'linear-gradient(160deg, #dce5df 0%, #cfdbcf 60%, #bfcfc0 100%)',
  'linear-gradient(160deg, #dce5df 0%, #cfdbcf 60%, #bfcfc0 100%)',
];

const commitmentNumbers = ['01', '02', '03'];

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────

const reveal: CSSProperties = {
  opacity: 0,
  transform: 'translateY(28px)',
  transition: 'opacity 0.8s ease, transform 0.8s ease',
};

const revealD = (d: number): CSSProperties => ({ ...reveal, transitionDelay: `${d}s` });

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function RSE() {
  const navigate = useNavigate();
  const { t, p } = useLocale();
  const r = t.rse;

  // Scroll reveal via IntersectionObserver
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <SEO route="rse" />

      <AProposTabs />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{ paddingTop: '0' }}
      >
        {/* Left — text */}
        <div
          className="relative flex flex-col justify-center px-8 sm:px-14 lg:px-16 xl:px-20 py-20"
          style={{ background: '#fafaf8' }}
        >
          {/* Vertical border on desktop */}
          <div
            className="absolute top-0 bottom-0 right-0 hidden lg:block"
            style={{ width: '1px', background: 'rgba(28,28,26,0.08)' }}
          />

          <p
            data-reveal
            style={{ ...reveal, fontSize: '10px', letterSpacing: '0.3em', color: '#862637', fontWeight: 500, marginBottom: '40px', textTransform: 'uppercase' }}
          >
            {r.hero.kicker}
          </p>

          <h1 className="t-display t-display-hero"
            data-reveal
            style={{
              ...revealD(0.15),
              fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
              color: '#01142a',
              marginBottom: '36px',
            }}
          >
            {r.hero.titleLine1}<br />
            {r.hero.titleLine2Before}<em className="italic">{r.hero.titleLine2Em}</em><br />
            {r.hero.titleLine3}
          </h1>

          <p
            data-reveal
            style={{
              ...revealD(0.3),
              fontSize: 'var(--text-body)',
              lineHeight: 1.8,
              color: '#6b6860',
              maxWidth: '420px',
              fontWeight: 300,
              marginBottom: '56px',
            }}
          >
            {r.hero.text}
          </p>

          <div
            data-reveal
            style={{ ...revealD(0.45), display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => document.getElementById('piliers')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-label hover:bg-[#862637] transition-colors duration-300"
              style={{
                padding: '14px 32px',
                background: '#01142a',
                color: '#fafaf8',
                fontSize: '11px',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {r.hero.ctaPillars}
            </button>
            <button
              onClick={() => navigate(p('/reservation'))}
              className="btn-label hover:text-[#01142a] transition-colors"
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                color: '#6b6860',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {r.hero.ctaBook} <span>→</span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div
            data-reveal
            style={{ ...revealD(0.9), position: 'absolute', bottom: '40px', left: 'clamp(32px, 5vw, 80px)', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <div style={{ width: '40px', height: '1px', background: '#c8c4bc' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b6860' }}>
              {r.hero.scroll}
            </span>
          </div>
        </div>

        {/* Right — gradient panel + watermark */}
        <div
          className="hidden lg:flex relative items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #dce5df 0%, #cfdbcf 50%, #bfcfc0 100%)', opacity: 0, animation: 'fadeIn 1.2s ease 0.4s forwards' }}
        >
          <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
          <span className="t-display"
            style={{
              fontSize: 'clamp(120px, 16vw, 220px)',
              color: 'rgba(28,28,26,0.05)',
              userSelect: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {r.hero.watermark}
          </span>
          <span
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '40px',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(28,28,26,0.45)',
              background: 'rgba(250,250,248,0.7)',
              padding: '8px 14px',
              backdropFilter: 'blur(4px)',
            }}
          >
            {r.hero.badge}
          </span>
        </div>
      </section>

      {/* ── MANIFESTE ────────────────────────────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid rgba(28,28,26,0.08)',
          padding: 'clamp(80px, 10vw, 160px) clamp(24px, 5vw, 60px)',
          background: '#fafaf8',
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-20 items-start">
          <div
            data-reveal
            style={{ ...reveal }}
            className="lg:sticky lg:top-28"
          >
            <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6b6860', fontWeight: 500, paddingTop: '8px' }}>
              {r.manifesto.kicker}
            </p>
          </div>

          <div data-reveal style={revealD(0.1)}>
            <p className="t-serif"
              style={{
                color: '#01142a',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                marginBottom: '48px',
              }}
            >
              {r.manifesto.titleBefore}
              <em className="italic" style={{ color: '#862637' }}>{r.manifesto.titleEm}</em>{r.manifesto.titleAfter}<br />
              {r.manifesto.titleLine2}
            </p>
            <p
              style={{
                fontSize: 'var(--text-body)',
                lineHeight: 2,
                color: '#6b6860',
                fontWeight: 300,
                maxWidth: '680px',
              }}
              className="md:columns-2 md:gap-12"
            >
              {r.manifesto.body}
            </p>
          </div>
        </div>
      </section>

      {/* ── PILIERS ──────────────────────────────────────────────────────────── */}
      <section
        id="piliers"
        style={{
          borderTop: '1px solid rgba(28,28,26,0.08)',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 60px)',
          background: '#fafaf8',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            data-reveal
            style={{ ...reveal, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', flexWrap: 'wrap', gap: '24px' }}
          >
            <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6b6860', fontWeight: 500 }}>
              {r.pillarsSection.kicker}
            </p>
            <h2 className="t-serif" style={{ color: '#01142a', fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)' }}>
              {r.pillarsSection.titleLine1}<br />{r.pillarsSection.titleLine2}
            </h2>
          </div>

          {/* 4-cell grid with hairline joints */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: '2px', background: 'rgba(28,28,26,0.1)' }}
          >
            {r.pillars.map((pillar, i) => (
              <div
                key={pillarNumbers[i]}
                data-reveal
                style={{
                  ...revealD(i * 0.1),
                  background: '#fafaf8',
                  padding: '56px 40px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
                className="group hover:bg-[#fafaf8] transition-colors duration-300"
              >
                {/* Bottom accent on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ height: '2px', background: '#862637' }}
                />
                <span className="t-display"
                  style={{
                    fontSize: '72px',
                    color: 'rgba(28,28,26,0.08)',
                    display: 'block',
                    marginBottom: '32px',
                    transition: 'color 0.3s',
                  }}
                >
                  {pillarNumbers[i]}
                </span>
                <p className="t-serif" style={{ fontSize: '22px', color: '#01142a', marginBottom: '16px' }}>
                  {pillar.title}
                </p>
                <p style={{ fontSize: 'var(--text-small)', lineHeight: 1.8, color: '#6b6860' }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIONS ──────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(28,28,26,0.08)' }}>
        {r.actions.map((action, i) => (
          <div
            key={action.index}
            className={`grid grid-cols-1 lg:grid-cols-2`}
            style={{ borderBottom: '1px solid rgba(28,28,26,0.08)', minHeight: '480px' }}
          >
            {/* Visual panel — alternates left/right */}
            <div
              className={`relative flex items-center justify-center overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}
              style={{ background: actionGradients[i], minHeight: '320px' }}
            >
              <span className="t-display"
                style={{
                  fontSize: 'clamp(40px, 6vw, 90px)',
                  color: 'rgba(28,28,26,0.06)',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}
              >
                {action.word}
              </span>
              <span
                style={{
                  position: 'absolute',
                  bottom: '32px',
                  left: '32px',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(28,28,26,0.5)',
                  background: 'rgba(250,250,248,0.7)',
                  padding: '8px 14px',
                  backdropFilter: 'blur(6px)',
                }}
              >
                {action.tag}
              </span>
            </div>

            {/* Content */}
            <div
              data-reveal
              style={{
                ...reveal,
                background: '#fafaf8',
                padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 72px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              className={i % 2 === 1 ? 'lg:order-1' : ''}
            >
              {/* Index label with line */}
              <div
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#862637',
                  fontWeight: 500,
                  marginBottom: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#862637', flexShrink: 0 }} />
                {action.index}
              </div>

              <h3 className="t-serif"
                style={{
                  color: '#01142a',
                  marginBottom: '28px',
                  fontSize: 'clamp(1.75rem, 2.8vw, 2.75rem)',
                }}
              >
                {action.title}
              </h3>

              <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.9, color: '#6b6860', marginBottom: '36px', maxWidth: '480px', fontWeight: 300 }}>
                {action.body}
              </p>

              {/* Tags — rectangle, no border-radius */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {action.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-block',
                      padding: '6px 14px',
                      border: '1px solid rgba(28,28,26,0.12)',
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#6b6860',
                      background: 'transparent',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ borderTop: '1px solid rgba(28,28,26,0.08)', background: '#fafaf8' }}
      >
        {/* Left — CTA content */}
        <div
          data-reveal
          style={{
            ...reveal,
            padding: 'clamp(80px, 10vw, 160px) clamp(24px, 5vw, 60px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#862637', fontWeight: 500, marginBottom: '32px' }}>
            {r.cta.kicker}
          </p>
          <h2 className="t-serif"
            style={{
              color: '#01142a',
              marginBottom: '32px',
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            }}
          >
            {r.cta.titleLine1}<br />
            {r.cta.titleLine2Before}<em className="italic" style={{ color: '#862637' }}>{r.cta.titleLine2Em}</em><br />
            {r.cta.titleLine3}
          </h2>
          <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.9, color: '#6b6860', marginBottom: '48px', maxWidth: '460px', fontWeight: 300 }}>
            {r.cta.text}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(p('/reservation'))}
              className="btn-label hover:bg-[#862637] transition-colors duration-300"
              style={{
                padding: '14px 32px',
                background: '#01142a',
                color: '#fafaf8',
                fontSize: '11px',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {r.cta.quote}
            </button>
            <Link
              to={p('/spaces')}
              className="btn-label hover:text-[#01142a] transition-colors"
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                color: '#6b6860',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              {r.cta.spaces}
            </Link>
          </div>
        </div>

        {/* Right — engagement list */}
        <div
          data-reveal
          style={{
            ...revealD(0.2),
            borderTop: '1px solid rgba(28,28,26,0.08)',
            padding: 'clamp(80px, 10vw, 160px) clamp(24px, 5vw, 60px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          className="lg:border-t-0 lg:border-l"
          // overrides the class border color with inline on the lg breakpoint handled via CSS class below
        >
          <style>{`.lg\\:border-l { border-left: 1px solid rgba(28,28,26,0.08) !important; }`}</style>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {r.commitments.map((item, i) => (
              <li
                key={commitmentNumbers[i]}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '20px',
                  paddingTop: '24px',
                  paddingBottom: '24px',
                  borderBottom: i < r.commitments.length - 1 ? '1px solid rgba(28,28,26,0.08)' : 'none',
                }}
              >
                <span className="t-display" style={{ fontSize: '36px', color: 'rgba(28,28,26,0.12)', flexShrink: 0, width: '48px' }}>
                  {commitmentNumbers[i]}
                </span>
                <div>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#01142a', fontWeight: 500, marginBottom: '4px' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 'var(--text-small)', color: '#6b6860', lineHeight: 1.7, fontWeight: 300 }}>
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
