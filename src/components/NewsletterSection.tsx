const LINKEDIN_NL = 'https://www.linkedin.com/newsletters/osmoz-7453432571654295552';

export default function NewsletterSection() {
  return (
    <section id="newsletter" style={{ borderTop: '1px solid rgba(28,28,26,0.08)', background: '#01142a' }}>
      <div
        className="max-w-7xl mx-auto"
        style={{ padding: 'clamp(72px, 9vw, 120px) clamp(24px, 5vw, 60px)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

          {/* Texte */}
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(254,225,212,0.5)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'rgba(254,225,212,0.4)' }} />
              Newsletter
            </p>
            <h2 style={{ fontFamily: 'Playfair Display', fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', lineHeight: 1.2, color: '#ffffff', marginBottom: '16px' }}>
              Restez informé.
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>
              Suivez notre actualité directement sur LinkedIn.
            </p>
          </div>

          {/* CTA LinkedIn */}
          <div>
            <a
              href={LINKEDIN_NL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 32px',
                background: '#862637',
                color: '#fbfbf3',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 400,
                textDecoration: 'none',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#fbfbf3'; (e.currentTarget as HTMLAnchorElement).style.color = '#01142a'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#862637'; (e.currentTarget as HTMLAnchorElement).style.color = '#fbfbf3'; }}
            >
              S'inscrire à notre Newsletter LinkedIn →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
