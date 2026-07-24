import NewsletterForm from './NewsletterForm';

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
              Recevez les actualités d’Osmoz
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', fontWeight: 300 }}>
              Conseils, inspirations, nouveaux espaces et actualités directement dans votre boîte mail.
            </p>
          </div>

          <div style={{ padding: '32px', background: '#01142a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '32px' }}>
            <NewsletterForm source="home" hideHeader />
          </div>

        </div>
      </div>
    </section>
  );
}
