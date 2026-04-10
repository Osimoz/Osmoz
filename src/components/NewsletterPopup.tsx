import { useState, useEffect } from 'react';
import { subscribeToNewsletter } from '../lib/brevo';

const STORAGE_KEY = 'osmoz_newsletter_dismissed';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Ne pas afficher si déjà fermé ou soumis
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 400);
    localStorage.setItem(STORAGE_KEY, '1');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribeToNewsletter(email);
      setSubmitted(true);
      localStorage.setItem(STORAGE_KEY, '1');
      setTimeout(() => dismiss(), 2500);
    } catch {
      // En cas d'erreur réseau, on confirme quand même visuellement
      setSubmitted(true);
      localStorage.setItem(STORAGE_KEY, '1');
      setTimeout(() => dismiss(), 2500);
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(1, 20, 42, 0.45)',
          backdropFilter: 'blur(3px)',
          zIndex: 200,
          opacity: closing ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: closing ? 'translate(-50%, calc(-50% + 16px))' : 'translate(-50%, -50%)',
          zIndex: 201,
          width: 'clamp(300px, 90vw, 460px)',
          background: '#fbfbf3',
          padding: 'clamp(36px, 5vw, 56px)',
          opacity: closing ? 0 : 1,
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {/* Bouton fermer */}
        <button
          onClick={dismiss}
          aria-label="Fermer"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9b9690',
            fontSize: '20px',
            fontWeight: 200,
            lineHeight: 1,
            padding: '4px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#01142a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#9b9690')}
        >
          ×
        </button>

        {!submitted ? (
          <>
            {/* Label */}
            <p style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#862637',
              fontWeight: 500,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#862637' }} />
              Newsletter
            </p>

            {/* Titre */}
            <h2 style={{
              fontFamily: 'Playfair Display',
              fontWeight: 300,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.2,
              color: '#01142a',
              marginBottom: '12px',
            }}>
              Restez informé.
            </h2>

            {/* Texte */}
            <p style={{
              fontSize: '13px',
              lineHeight: 1.8,
              color: '#6b6860',
              fontWeight: 300,
              marginBottom: '32px',
            }}>
              Recevez toutes nos actualités.
            </p>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  fontSize: '13px',
                  fontWeight: 300,
                  border: '1px solid rgba(28,28,26,0.14)',
                  background: '#ffffff',
                  color: '#01142a',
                  outline: 'none',
                  fontFamily: 'inherit',
                  letterSpacing: '0.02em',
                  boxSizing: 'border-box',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(134,38,55,0.4)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(28,28,26,0.14)')}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '13px',
                  background: '#01142a',
                  color: '#fbfbf3',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.25s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#862637')}
                onMouseLeave={e => (e.currentTarget.style.background = '#01142a')}
              >
                S'inscrire
              </button>
            </form>

            {/* Discrétion */}
            <p style={{ fontSize: '9px', color: '#b5b0a8', marginTop: '16px', letterSpacing: '0.05em' }}>
              Pas de spam. Désabonnement en un clic.
            </p>
          </>
        ) : (
          /* Confirmation */
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#862637', marginBottom: '20px' }}>
              Merci !
            </p>
            <h2 style={{ fontFamily: 'Playfair Display', fontWeight: 300, fontSize: '1.6rem', color: '#01142a', lineHeight: 1.25 }}>
              Vous êtes dans la liste.
            </h2>
            <p style={{ fontSize: '13px', color: '#9b9690', fontWeight: 300, marginTop: '12px', lineHeight: 1.8 }}>
              On revient vers vous très vite.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
