import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLocale } from '../i18n/context';

const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);

// ─── IMAGES ───────────────────────────────────────────────────────────────────

const heroImg     = u('images/Fleur/f13dfe88-1af9-42d7-a56c-4721a5ca37d7.JPG'); // Fleur coupe asperges — hero
const fleurPortrait = u('images/Fleur/fleur-site.png'); // portrait Fleur — photo cadrée pour le site
const petitDej    = u('images/journee-petitdej.webp');
const dejImg      = u('images/journee-dejeuner.webp');
const pauseImg    = u('images/journee-pause.webp');
const dinerImg    = u('images/journee-diner.webp');

const mosaiqueImg = u('images/Fleur/mosaique-plats-1.png');

// Le texte vient de t.experience ; ne restent ici que les images des
// « moments », dans l'ordre de t.experience.moments.
const momentImages = [petitDej, dejImg, pauseImg, dinerImg];
const reassuranceNumbers = ['01', '02', '03'];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function Experience() {
  const navigate = useNavigate();
  const { t, p } = useLocale();
  const e = t.experience;
  const [activeMenu, setActiveMenu] = useState(-1);

  // Parallax immersive section
  const immersiveRef = useRef<HTMLDivElement>(null);
  const [immersiveProgress, setImmersiveProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!immersiveRef.current) return;
      const rect = immersiveRef.current.getBoundingClientRect();
      const total = immersiveRef.current.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      setImmersiveProgress(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SEO route="experience" />

      {/* ── 1. HERO ── */}
      <section
        className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{ paddingTop: '72px' }}
      >
        {/* Left — texte */}
        <div
          className="relative flex flex-col justify-center px-8 sm:px-14 lg:px-16 xl:px-20 py-20"
          style={{ background: '#fafaf8' }}
        >
          <div
            className="absolute top-0 bottom-0 right-0 hidden lg:block"
            style={{ width: '1px', background: 'rgba(28,28,26,0.08)' }}
          />

          <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#862637', fontWeight: 500, marginBottom: '40px', textTransform: 'uppercase' }}>
            {e.hero.kicker}
          </p>

          <h1 className="t-h1 text-hero"
            style={{
              color: '#01142a',
              marginBottom: '36px',
            }}
          >
            {e.hero.titleLine1}<br />
            <em>{e.hero.titleEm}</em><br />
            {e.hero.titleLine3}
          </h1>

          <p
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 1.8,
              color: '#6b6860',
              maxWidth: '420px',
              fontWeight: 300,
              marginBottom: '56px',
            }}
          >
            {e.hero.text}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('fleur')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-label hover:bg-[#862637] transition-colors duration-300"
              style={{ padding: '14px 32px', background: '#01142a', color: '#fafaf8', fontSize: '11px', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
            >
              {e.hero.ctaDiscover}
            </button>
            <button
              onClick={() => navigate(p('/reservation'))}
              className="btn-label hover:text-[#01142a] transition-colors"
              style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6b6860', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {e.hero.ctaRequest} →
            </button>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: 'absolute', bottom: '40px', left: 'clamp(32px, 5vw, 80px)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '1px', background: '#c8c4bc' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b6860' }}>{e.hero.scroll}</span>
          </div>
        </div>

        {/* Right — photo */}
        <div className="hidden lg:block relative overflow-hidden" style={{ minHeight: '100%' }}>
          <img
            src={heroImg}
            alt={e.hero.heroAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── 2. INTRO NARRATIVE ── */}
      <section
        style={{
          borderTop: '1px solid rgba(28,28,26,0.08)',
          padding: 'clamp(80px, 10vw, 160px) clamp(24px, 5vw, 60px)',
          background: '#fafaf8',
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12 lg:gap-20 items-start">
          <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 lg:sticky lg:top-28 pt-1">
            {e.intro.kicker}
          </p>
          <div className="max-w-3xl">
            <h2
              className="t-h2 text-h2 text-[#01142a] mb-10"
            >
              {e.intro.titleBefore}
              <em className="text-[#862637]">{e.intro.titleEm}</em>
            </h2>
            <p
              className="font-light text-gray-500 md:columns-2 md:gap-12"
              style={{ fontSize: 'var(--text-body)', lineHeight: 2 }}
            >
              {e.intro.body}
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. IMMERSIVE PARALLAX ── */}
      <div ref={immersiveRef} style={{ position: 'relative', height: '200vh' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Image avec parallax */}
          <img
            src={fleurPortrait}
            alt={e.immersive.alt}
            style={{
              position: 'absolute',
              top: '-10%',
              left: 0,
              width: '100%',
              height: '120%',
              objectFit: 'cover',
              objectPosition: '60% 5%',
              transform: `translateY(${immersiveProgress * 12}%)`,
              willChange: 'transform',
            }}
          />

          {/* Overlay progressif */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `rgba(1,20,42,${0.15 + immersiveProgress * 0.55})`,
              transition: 'background 0.05s',
            }}
          />

          {/* Texte central — apparaît en défilant */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 clamp(24px, 5vw, 80px)',
              textAlign: 'center',
              opacity: immersiveProgress > 0.12 ? 1 : 0,
              transform: `translateY(${Math.max(0, (0.12 - immersiveProgress)) * 200}px)`,
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(254,225,212,0.7)',
              marginBottom: '32px',
              fontWeight: 400,
            }}>
              {e.immersive.kicker}
            </p>
            <h2 className="t-h2"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 5rem)',
                color: '#ffffff',
                maxWidth: '800px',
                marginBottom: '40px',
              }}
            >
              {e.immersive.titleBefore}<em style={{ color: '#fee1d4' }}>{e.immersive.titleEm}</em>{e.immersive.titleAfter}
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'rgba(254,225,212,0.4)', margin: '0 auto' }} />
          </div>

          {/* Indicateur de scroll bas de page — disparaît en défilant */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              opacity: 1 - immersiveProgress * 4,
              transition: 'opacity 0.3s',
            }}
          >
            <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{e.immersive.scroll}</span>
            <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.25)', animation: 'none' }} />
          </div>
        </div>
      </div>

      {/* ── 5. CUISINE DE FLEUR ── */}
      <section id="fleur" style={{ borderTop: '1px solid rgba(28,28,26,0.08)', background: '#fafaf8' }}>

        {/* Texte pleine largeur */}
        <div
          style={{
            padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 60px)',
          }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12 lg:gap-20 items-start">
            <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#862637', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '4px' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#862637' }} />
              {e.fleur.kicker}
            </p>
            <div>
              <h2 className="t-h2 text-h2" style={{ color: '#01142a', marginBottom: '32px' }}>
                {e.fleur.titleLine1}<br />
                <em style={{ color: '#862637' }}>{e.fleur.titleEm}</em>
              </h2>
              <div style={{ fontSize: 'var(--text-body)', lineHeight: 2, color: '#6b6860', fontWeight: 300, maxWidth: '560px', marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p>
                  {e.fleur.p1}
                </p>
                <p>
                  {e.fleur.p2}
                </p>
                <p>
                  {e.fleur.p3Before}<em style={{ fontStyle: 'italic', color: '#01142a' }}>{e.fleur.p3Em1}</em>{e.fleur.p3Mid1}<em style={{ fontStyle: 'italic', color: '#01142a' }}>{e.fleur.p3Em2}</em>{e.fleur.p3Mid2}<em style={{ fontStyle: 'italic', color: '#01142a' }}>{e.fleur.p3Em3}</em>{e.fleur.p3After}
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {e.fleur.tags.map(tag => (
                  <span key={tag} style={{ padding: '6px 14px', border: '1px solid rgba(28,28,26,0.12)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b6860' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mosaïque plats — avec respiration */}
        <div className="w-full" style={{ padding: '0 clamp(24px, 4vw, 60px) clamp(64px, 8vw, 120px)' }}>
          <img
            src={mosaiqueImg}
            alt={e.fleur.mosaicAlt}
            loading="lazy"
            className="w-full h-auto block"
            style={{ display: 'block' }}
          />
        </div>
      </section>

      {/* ── 4. MENUS ── */}
      <section style={{ borderTop: '1px solid rgba(28,28,26,0.08)', background: '#ffffff' }}>

        {/* En-tête section */}
        <div style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 60px) clamp(48px, 6vw, 80px)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12 lg:gap-20 items-end">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 pt-1">
              {e.menusSection.kicker}
            </p>
            <div>
              <h2
                className="t-h2 text-h2 text-[#01142a]"
                style={{ marginBottom: '16px' }}
              >
                {e.menusSection.title}
              </h2>
              <p style={{ fontSize: 'var(--text-small)', color: '#9b9690', fontWeight: 300, letterSpacing: '0.02em' }}>
                {e.menusSection.hint}
              </p>
            </div>
          </div>
        </div>

        {/* Accordéon */}
        <div className="max-w-7xl mx-auto" style={{ padding: '0 clamp(24px, 5vw, 60px) clamp(80px, 10vw, 140px)' }}>
          {e.menus.map((menu, i) => {
            const open = activeMenu === i;
            return (
              <div key={menu.titre} style={{ borderTop: '1px solid rgba(28,28,26,0.08)' }}>

                {/* Ligne cliquable */}
                <button
                  onClick={() => setActiveMenu(open ? -1 : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'clamp(28px, 4vw, 44px) 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(20px, 3vw, 48px)', flex: 1 }}>
                    <span className="tnum" style={{ fontSize: 'clamp(0.75rem, 1vw, 0.9rem)', fontWeight: 300, color: '#c8c4bc', letterSpacing: '0.05em', flexShrink: 0 }}>
                      {menu.num}
                    </span>
                    <div>
                      <h3 className="t-h3"
                        style={{
                          fontSize: 'clamp(1.4rem, 3vw, 2.8rem)',
                          color: open ? '#862637' : '#01142a',
                          transition: 'color 0.3s ease',
                          margin: 0,
                        }}
                      >
                        {menu.titre}
                      </h3>
                      {menu.soustitre && (
                        <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9b9690', marginTop: '6px', fontWeight: 400 }}>
                          {menu.soustitre}
                        </p>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
                    <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9b9690', display: 'none' }} className="sm:inline">
                      {menu.occasion}
                    </span>
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid rgba(28,28,26,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 200,
                        color: open ? '#862637' : '#01142a',
                        transition: 'all 0.3s ease',
                        transform: open ? 'rotate(45deg)' : 'none',
                        flexShrink: 0,
                        lineHeight: 1,
                      }}
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* Contenu accordéon */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: open ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ paddingBottom: 'clamp(48px, 6vw, 80px)' }}>

                      {/* Intro */}
                      <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.9, color: '#6b6860', fontWeight: 300, marginBottom: '40px', maxWidth: '620px' }}>
                        {menu.intro}
                      </p>

                      {/* Colonnes plats */}
                      <div
                        className={`grid grid-cols-1 ${menu.colonnes.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}
                        style={{ gap: '0', borderTop: '1px solid rgba(28,28,26,0.07)' }}
                      >
                        {menu.colonnes.map((col, ci) => (
                          <div
                            key={col.label}
                            style={{
                              padding: 'clamp(24px, 3vw, 36px) clamp(20px, 2.5vw, 32px) clamp(24px, 3vw, 36px) 0',
                              paddingLeft: ci > 0 ? 'clamp(20px, 2.5vw, 32px)' : '0',
                              borderLeft: ci > 0 ? '1px solid rgba(28,28,26,0.07)' : 'none',
                            }}
                          >
                            <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#862637', marginBottom: '20px', fontWeight: 500 }}>
                              {col.label}
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {col.items.map((item) => (
                                <li
                                  key={item}
                                  style={{
                                    fontSize: 'var(--text-small)',
                                    color: '#01142a',
                                    fontWeight: 300,
                                    padding: '10px 0',
                                    borderBottom: '1px solid rgba(28,28,26,0.05)',
                                    lineHeight: 1.6,
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '12px',
                                  }}
                                >
                                  <span style={{ width: '16px', height: '1px', background: 'rgba(134,38,55,0.3)', flexShrink: 0, marginTop: '8px', display: 'inline-block' }} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Note bas */}
                      <p style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b5b0a8', marginTop: '24px' }}>
                        {menu.note}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
          {/* Dernière hairline */}
          <div style={{ borderTop: '1px solid rgba(28,28,26,0.08)' }} />
        </div>

      </section>

      {/* ── 5. MOMENTS DE LA JOURNÉE ── */}
      <section style={{ borderTop: '1px solid rgba(28,28,26,0.08)', background: '#fafaf8' }}>

        {/* En-tête */}
        <div style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 60px) clamp(56px, 7vw, 96px)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12 lg:gap-20 items-end">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 pt-1">{e.momentsSection.kicker}</p>
            <h2 className="t-h2 text-[#01142a]" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)' }}>
              {e.momentsSection.title}
            </h2>
          </div>
        </div>

        {/* Grille 2×2 — même format pour toutes les images */}
        <div className="max-w-7xl mx-auto" style={{ padding: '0 clamp(24px, 5vw, 60px) clamp(80px, 10vw, 140px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
            {e.moments.map((m, i) => (
              <div key={m.temps} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Photo — ratio fixe identique pour tous */}
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#e8e4dc' }}>
                  <img
                    src={momentImages[i]}
                    alt={m.alt}
                    loading="lazy"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>

                {/* Texte sous l'image */}
                <div style={{ paddingBottom: '8px' }}>
                  <p style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#862637', marginBottom: '10px', fontWeight: 500 }}>
                    {m.temps}
                  </p>
                  <p style={{ fontSize: 'var(--text-small)', lineHeight: 1.85, color: '#6b6860', fontWeight: 300, marginBottom: '16px' }}>
                    {m.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {m.tags.map(t => (
                      <span key={t} style={{ padding: '4px 12px', border: '1px solid rgba(28,28,26,0.10)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9b9690' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. ACTIVITÉS & ANIMATIONS ── */}
      <section style={{ borderTop: '1px solid rgba(28,28,26,0.08)', background: '#ffffff' }}>

        {/* En-tête */}
        <div style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 60px) clamp(48px, 6vw, 80px)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12 lg:gap-20 items-end">
            <p className="text-xs font-normal uppercase tracking-[0.3em] text-gray-400 pt-1">{e.activitiesSection.kicker}</p>
            <div>
              <h2 className="t-h2 text-[#01142a]" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)', marginBottom: '16px' }}>
                {e.activitiesSection.title}
              </h2>
              <p style={{ fontSize: 'var(--text-small)', color: '#9b9690', fontWeight: 300, maxWidth: '520px', lineHeight: 1.8 }}>
                {e.activitiesSection.text}
              </p>
            </div>
          </div>
        </div>

        {/* Accordéon activités */}
        <div className="max-w-7xl mx-auto" style={{ padding: '0 clamp(24px, 5vw, 60px) clamp(80px, 10vw, 140px)' }}>
          {e.activities.map((cat, i) => {
            const openAct = activeMenu === 100 + i;
            return (
              <div key={cat.titre} style={{ borderTop: '1px solid rgba(28,28,26,0.08)' }}>

                {/* Ligne accordéon */}
                <button
                  onClick={() => setActiveMenu(openAct ? -1 : 100 + i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'clamp(24px, 3.5vw, 40px) 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(20px, 3vw, 48px)', flex: 1 }}>
                    <span className="tnum" style={{ fontSize: '0.85rem', fontWeight: 300, color: '#c8c4bc', letterSpacing: '0.05em', flexShrink: 0 }}>
                      {cat.num}
                    </span>
                    <div>
                      <h3 className="t-h3" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2.4rem)', color: openAct ? '#862637' : '#01142a', transition: 'color 0.3s', margin: 0 }}>
                        {cat.titre}
                      </h3>
                      <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9b9690', marginTop: '6px' }}>
                        {cat.soustitre}
                      </p>
                    </div>
                  </div>
                  <span style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    border: '1px solid rgba(28,28,26,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', fontWeight: 200,
                    color: openAct ? '#862637' : '#01142a',
                    transition: 'all 0.3s ease',
                    transform: openAct ? 'rotate(45deg)' : 'none',
                    flexShrink: 0, lineHeight: 1,
                  }}>+</span>
                </button>

                {/* Contenu */}
                <div style={{ display: 'grid', gridTemplateRows: openAct ? '1fr' : '0fr', transition: 'grid-template-rows 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ paddingBottom: 'clamp(40px, 5vw, 72px)' }}>
                      <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.9, color: '#6b6860', fontWeight: 300, marginBottom: '36px', maxWidth: '580px' }}>
                        {cat.intro}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderTop: '1px solid rgba(28,28,26,0.07)' }}>
                        {cat.items.map((item) => (
                          <div key={item.nom} style={{ padding: 'clamp(20px, 2.5vw, 28px) 0', borderBottom: '1px solid rgba(28,28,26,0.07)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'start' }}>
                            <div>
                              <p className="t-quote" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', color: '#01142a', marginBottom: '8px' }}>
                                {item.nom}
                              </p>
                              <p style={{ fontSize: 'var(--text-small)', lineHeight: 1.75, color: '#6b6860', fontWeight: 300, maxWidth: '560px' }}>
                                {item.desc}
                              </p>
                            </div>
                            <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b5b0a8', whiteSpace: 'nowrap', paddingTop: '4px' }}>
                              {item.duree}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
          <div style={{ borderTop: '1px solid rgba(28,28,26,0.08)' }} />
        </div>
      </section>

      {/* ── 6. RÉASSURANCE ── */}
      <section
        style={{
          borderTop: '1px solid rgba(28,28,26,0.08)',
          background: '#01142a',
          overflow: 'hidden',
        }}
      >
        {/* Citation centrale */}
        <div
          style={{
            padding: 'clamp(72px, 9vw, 120px) clamp(24px, 5vw, 60px)',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(254,225,212,0.5)', marginBottom: '32px' }}>
            {e.promise.kicker}
          </p>
          <h2 className="t-h2 text-h2"
            style={{
              color: '#ffffff',
              maxWidth: '760px',
              margin: '0 auto',
            }}
          >
            {e.promise.titleBefore}
            <em style={{ color: '#fee1d4' }}>{e.promise.titleEm}</em>
          </h2>
        </div>

        {/* 3 blocs */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {e.reassurances.map((r, i) => (
            <div
              key={reassuranceNumbers[i]}
              style={{
                padding: 'clamp(48px, 6vw, 80px) clamp(32px, 4vw, 56px)',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p className="t-key" style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', color: 'rgba(254,225,212,0.15)', marginBottom: '32px' }}>
                {reassuranceNumbers[i]}
              </p>
              <h3 className="t-h3" style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', color: '#ffffff', marginBottom: '16px' }}>
                {r.titre}
              </h3>
              <p style={{ fontSize: 'var(--text-small)', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9 }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section
        style={{
          borderTop: '1px solid rgba(28,28,26,0.08)',
          padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 60px)',
          background: '#ffffff',
          textAlign: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#6b6860', marginBottom: '24px' }}>
            {e.cta.kicker}
          </p>
          <h2
            className="t-h2 text-h2 mx-auto"
            style={{
              color: '#01142a', maxWidth: '600px', marginBottom: '24px',
            }}
          >
            {e.cta.titleBefore}
            <em style={{ color: '#862637' }}>{e.cta.titleEm}</em>
          </h2>
          <p style={{ fontSize: 'var(--text-body)', fontWeight: 300, color: '#6b6860', maxWidth: '400px', margin: '0 auto 48px', lineHeight: 1.9 }}>
            {e.cta.text}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(p('/reservation'))}
              className="btn-label hover:bg-[#862637] transition-colors duration-300"
              style={{ padding: '14px 36px', background: '#01142a', color: '#fafaf8', fontSize: '11px', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
            >
              {e.cta.request}
            </button>
            <button
              onClick={() => navigate(p('/contact'))}
              className="btn-label hover:text-[#01142a] transition-colors"
              style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6b6860', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {e.cta.contact}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
