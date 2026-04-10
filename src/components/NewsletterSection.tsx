import { useState } from 'react';
import { subscribeToNewsletter } from '../lib/brevo';

const STORAGE_KEY = 'osmoz_newsletter_dismissed';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribeToNewsletter(email);
    } catch {
      // silencieux — on confirme quand même
    }
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, '1');
  };

  return (
    <section style={{ borderTop: '1px solid rgba(28,28,26,0.08)', background: '#01142a' }}>
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
              Recevez toutes nos actualités.
            </p>
          </div>

          {/* Formulaire */}
          <div>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  style={{
                    flex: 1,
                    padding: '14px 18px',
                    fontSize: '13px',
                    fontWeight: 300,
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRight: 'none',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#ffffff',
                    outline: 'none',
                    fontFamily: 'inherit',
                    letterSpacing: '0.02em',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(254,225,212,0.35)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
                <button
                  type="submit"
                  style={{
                    padding: '14px 28px',
                    background: '#862637',
                    color: '#fbfbf3',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 400,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.25s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fbfbf3'; e.currentTarget.style.color = '#01142a'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#862637'; e.currentTarget.style.color = '#fbfbf3'; }}
                >
                  S'inscrire
                </button>
              </form>
            ) : (
              <div>
                <p style={{ fontFamily: 'Playfair Display', fontWeight: 300, fontSize: '1.3rem', color: '#ffffff', fontStyle: 'italic', marginBottom: '8px' }}>
                  Vous êtes dans la liste.
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                  On revient vers vous très vite.
                </p>
              </div>
            )}
            <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', marginTop: '14px', letterSpacing: '0.05em' }}>
              Pas de spam. Désabonnement en un clic.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
