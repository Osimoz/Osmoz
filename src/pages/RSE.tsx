import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const piliers = [
  {
    number: '01',
    title: 'Zéro déchet opérationnel',
    desc: "Éliminer le plastique, structurer le tri, repenser chaque consommable. Rien n'est anodin.",
  },
  {
    number: '02',
    title: 'Cuisine locale & responsable',
    desc: 'Des partenaires traiteurs engagés, des produits de saison, des circuits courts. La gastronomie sans compromis.',
  },
  {
    number: '03',
    title: 'Réhabilitation plutôt que construction',
    desc: "Redonner vie à des espaces existants. Réduire l'empreinte carbone dès la fondation.",
  },
  {
    number: '04',
    title: 'Mobilité & installations sobres',
    desc: "Paris intra-muros. Transports en commun à portée. Éclairage LED. Filtration d'eau. Les détails techniques comptent aussi.",
  },
];

const actions = [
  {
    index: 'Action 01',
    word: 'Zéro',
    tag: 'Tri sélectif intégré, tous nos espaces',
    gradient: 'linear-gradient(160deg, #e2eade 0%, #d5e0cf 60%, #c5d3be 100%)',
    title: 'Tendre vers le zéro déchet',
    body: "Nous avons banni le plastique à usage unique de l'ensemble de nos espaces. Chaque lieu est équipé de dispositifs de tri sélectif identifiés, et nous privilégions des alternatives durables pour tous les contenants, accessoires et consommables. Chaque détail compte, même les plus invisibles.",
    tags: ['Plastique éliminé', 'Tri sélectif', 'Alternatives durables'],
  },
  {
    index: 'Action 02',
    word: 'Local',
    tag: 'Produits de saison, filières engagées',
    gradient: 'linear-gradient(160deg, #e2eade 0%, #d5e0cf 60%, #c5d3be 100%)',
    title: 'Une table qui respecte son territoire',
    body: "Nous collaborons exclusivement avec des traiteurs partageant nos engagements environnementaux. Produits de saison, approvisionnement local, filières biologiques ou certifiées HVE, réduction des emballages. Et parce que le gaspillage alimentaire est une question sérieuse, nous ajustons les quantités, redistribuons les surplus et encourageons les formats à emporter.",
    tags: ['Saison', 'Circuit court', 'Bio / HVE', 'Anti-gaspillage'],
  },
  {
    index: 'Action 03',
    word: 'Réhabiliter',
    tag: 'Patrimoine réhabilité, Paris',
    gradient: 'linear-gradient(160deg, #dce5df 0%, #cfdbcf 60%, #bfcfc0 100%)',
    title: 'Réhabiliter plutôt que construire',
    body: "OSMOZ ne bâtit pas : il transforme. En valorisant des lieux existants, nous limitons l'artificialisation des sols et réduisons l'empreinte carbone liée à la construction. Nos espaces sont des héritages réactivés, déjà intégrés au tissu urbain, porteurs d'une histoire, prêts pour la prochaine.",
    tags: ['Patrimoine', 'Empreinte réduite', 'Tissu urbain'],
  },
  {
    index: 'Action 04',
    word: 'Paris',
    tag: 'Intra-muros, transports à portée',
    gradient: 'linear-gradient(160deg, #dce5df 0%, #cfdbcf 60%, #bfcfc0 100%)',
    title: 'Au cœur de Paris, pour de bonnes raisons',
    body: "Nos espaces sont situés à Paris intra-muros, à proximité immédiate des transports en commun. Un choix stratégique : moins de déplacements longue distance, plus de mobilités douces, une logistique simplifiée. Nous sommes aussi équipés d'ampoules LED basse consommation et de systèmes de filtration d'eau pour éliminer le recours aux bouteilles plastiques.",
    tags: ['Transports en commun', 'Éclairage LED', 'Filtration eau'],
  },
];

const engagements = [
  {
    number: '01',
    title: "Espaces prêts à l'usage",
    desc: "Mobilier, audiovisuel, équipements : tout est déjà là. Moins de transport, moins d'impact.",
  },
  {
    number: '02',
    title: 'Traçabilité & transparence',
    desc: 'Indicateurs de performance disponibles sur demande pour vos bilans RSE et rapports de durabilité.',
  },
  {
    number: '03',
    title: 'Un lieu authentique et responsable',
    desc: 'Chaque espace OSMOZ est pensé pour être à la fois beau, fonctionnel et aligné avec nos valeurs.',
  },
];

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
      <Helmet>
        <title>Démarche RSE — OSMOZ | Événementiel responsable à Paris</title>
        <meta
          name="description"
          content="Découvrez la démarche RSE d'OSMOZ : zéro déchet, cuisine locale, réhabilitation du patrimoine et mobilité douce. Un événementiel responsable sans compromis sur l'expérience."
        />
        <link rel="canonical" href="https://osmoz.work/rse" />
        <meta property="og:title" content="Démarche RSE — OSMOZ | Événementiel responsable à Paris" />
        <meta
          property="og:description"
          content="La démarche RSE d'OSMOZ : engagements concrets pour un événementiel à impact positif."
        />
        <meta property="og:url" content="https://osmoz.work/rse" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{ paddingTop: '72px' }}
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
            Osmoz Engagé · Notre démarche RSE
          </p>

          <h1
            data-reveal
            style={{
              ...revealD(0.15),
              fontFamily: 'Playfair Display',
              fontWeight: 300,
              lineHeight: 1.05,
              fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
              color: '#01142a',
              marginBottom: '36px',
            }}
          >
            L'événementiel<br />
            peut être <em className="italic">à la hauteur</em><br />
            de ses ambitions.
          </h1>

          <p
            data-reveal
            style={{
              ...revealD(0.3),
              fontSize: '15px',
              lineHeight: 1.8,
              color: '#6b6860',
              maxWidth: '420px',
              fontWeight: 300,
              marginBottom: '56px',
            }}
          >
            Chez OSMOZ, nous croyons qu'un événement réussi ne laisse pas de traces, sauf dans les esprits.
          </p>

          <div
            data-reveal
            style={{ ...revealD(0.45), display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => document.getElementById('piliers')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:bg-[#862637] transition-colors duration-300"
              style={{
                padding: '14px 32px',
                background: '#01142a',
                color: '#fafaf8',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 400,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Découvrir nos engagements
            </button>
            <button
              onClick={() => navigate('/reservation')}
              className="hover:text-[#01142a] transition-colors"
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
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
              Organiser un événement <span>→</span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div
            data-reveal
            style={{ ...revealD(0.9), position: 'absolute', bottom: '40px', left: 'clamp(32px, 5vw, 80px)', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <div style={{ width: '40px', height: '1px', background: '#c8c4bc' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b6860' }}>
              Défiler
            </span>
          </div>
        </div>

        {/* Right — gradient panel + watermark */}
        <div
          className="hidden lg:flex relative items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #dce5df 0%, #cfdbcf 50%, #bfcfc0 100%)', opacity: 0, animation: 'fadeIn 1.2s ease 0.4s forwards' }}
        >
          <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
          <span
            style={{
              fontFamily: 'Playfair Display',
              fontWeight: 300,
              fontSize: 'clamp(120px, 16vw, 220px)',
              color: 'rgba(28,28,26,0.05)',
              lineHeight: 1,
              userSelect: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            RSE
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
            Démarche RSE · Paris
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
              Notre manifeste
            </p>
          </div>

          <div data-reveal style={revealD(0.1)}>
            <p
              style={{
                fontFamily: 'Playfair Display',
                fontWeight: 300,
                lineHeight: 1.3,
                color: '#01142a',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                marginBottom: '48px',
              }}
            >
              Concevoir des événements{' '}
              <em className="italic" style={{ color: '#862637' }}>à impact positif</em>,<br />
              sans compromis sur l'expérience.
            </p>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 2,
                color: '#6b6860',
                fontWeight: 300,
                maxWidth: '680px',
              }}
              className="md:columns-2 md:gap-12"
            >
              L'événementiel a longtemps tourné le dos à ses responsabilités. Plastique à usage
              unique, lieux inaccessibles, gaspillage alimentaire, empreinte carbone ignorée. OSMOZ
              fait le choix inverse : intégrer la durabilité dès la conception, sans sacrifier le
              soin apporté à chaque détail. Nos espaces sont des lieux vivants, pensés pour durer,
              pour les gens qui les habitent le temps d'une journée, et pour la ville qui les accueille
              depuis toujours.
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
              Nos engagements
            </p>
            <h2 style={{ fontFamily: 'Playfair Display', fontWeight: 300, lineHeight: 1.1, color: '#01142a', fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)' }}>
              Quatre piliers.<br />Des actions concrètes.
            </h2>
          </div>

          {/* 4-cell grid with hairline joints */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: '2px', background: 'rgba(28,28,26,0.1)' }}
          >
            {piliers.map((p, i) => (
              <div
                key={p.number}
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
                <span
                  style={{
                    fontFamily: 'Playfair Display',
                    fontSize: '72px',
                    fontWeight: 300,
                    color: 'rgba(28,28,26,0.08)',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: '32px',
                    transition: 'color 0.3s',
                  }}
                >
                  {p.number}
                </span>
                <p style={{ fontFamily: 'Playfair Display', fontSize: '22px', fontWeight: 400, color: '#01142a', marginBottom: '16px', lineHeight: 1.2 }}>
                  {p.title}
                </p>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#6b6860' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIONS ──────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(28,28,26,0.08)' }}>
        {actions.map((action, i) => (
          <div
            key={action.index}
            className={`grid grid-cols-1 lg:grid-cols-2`}
            style={{ borderBottom: '1px solid rgba(28,28,26,0.08)', minHeight: '480px' }}
          >
            {/* Visual panel — alternates left/right */}
            <div
              className={`relative flex items-center justify-center overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}
              style={{ background: action.gradient, minHeight: '320px' }}
            >
              <span
                style={{
                  fontFamily: 'Playfair Display',
                  fontWeight: 300,
                  fontSize: 'clamp(40px, 6vw, 90px)',
                  color: 'rgba(28,28,26,0.06)',
                  lineHeight: 1,
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

              <h3
                style={{
                  fontFamily: 'Playfair Display',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: '#01142a',
                  marginBottom: '28px',
                  fontSize: 'clamp(1.75rem, 2.8vw, 2.75rem)',
                }}
              >
                {action.title}
              </h3>

              <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#6b6860', marginBottom: '36px', maxWidth: '480px', fontWeight: 300 }}>
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
            Organiser un événement
          </p>
          <h2
            style={{
              fontFamily: 'Playfair Display',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#01142a',
              marginBottom: '32px',
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            }}
          >
            Un événement<br />
            mémorable <em className="italic" style={{ color: '#862637' }}>et</em><br />
            responsable.
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#6b6860', marginBottom: '48px', maxWidth: '460px', fontWeight: 300 }}>
            Pas de concession sur l'expérience. Pas de concession sur les valeurs. Nos espaces sont
            conçus pour les équipes qui cherchent mieux, et qui méritent les deux.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/reservation')}
              className="hover:bg-[#862637] transition-colors duration-300"
              style={{
                padding: '14px 32px',
                background: '#01142a',
                color: '#fafaf8',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 400,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Demander un devis
            </button>
            <Link
              to="/spaces"
              className="hover:text-[#01142a] transition-colors"
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#6b6860',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              Voir nos espaces →
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
            {engagements.map((item, i) => (
              <li
                key={item.number}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '20px',
                  paddingTop: '24px',
                  paddingBottom: '24px',
                  borderBottom: i < engagements.length - 1 ? '1px solid rgba(28,28,26,0.08)' : 'none',
                }}
              >
                <span style={{ fontFamily: 'Playfair Display', fontSize: '36px', fontWeight: 300, color: 'rgba(28,28,26,0.12)', lineHeight: 1, flexShrink: 0, width: '48px' }}>
                  {item.number}
                </span>
                <div>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#01142a', fontWeight: 500, marginBottom: '4px' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6b6860', lineHeight: 1.7, fontWeight: 300 }}>
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
