import { useState, useEffect, useRef } from 'react';
import NewsletterForm from './NewsletterForm';

const STORAGE_KEY = 'osmoz_newsletter_dismissed';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  const dismiss = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 400);
    localStorage.setItem(STORAGE_KEY, '1');
  };

  if (!visible) return null;

  return (
    <>
      <div
        onClick={dismiss}
        role="button"
        aria-label="Fermer le pop-up"
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

      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: closing ? 'translate(-50%, calc(-50% + 16px))' : 'translate(-50%, -50%)',
          zIndex: 201,
          width: 'clamp(320px, 92vw, 520px)',
          background: '#fbfbf3',
          padding: 'clamp(32px, 4vw, 48px)',
          borderRadius: '32px',
          boxShadow: '0 32px 80px rgba(1, 20, 42, 0.18)',
          opacity: closing ? 0 : 1,
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
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
            fontSize: '24px',
            fontWeight: 600,
            lineHeight: 1,
            padding: '4px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#01142a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9b9690')}
        >
          ×
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <p style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#862637',
              fontWeight: 500,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#862637' }} />
              Newsletter
            </p>
            <h2 style={{
              fontFamily: 'Playfair Display',
              fontWeight: 300,
              fontSize: 'clamp(1.6rem, 3vw, 2.3rem)',
              lineHeight: 1.2,
              color: '#01142a',
              marginBottom: '8px',
            }}>
              Recevez les actualités d’Osmoz
            </h2>
            <p style={{
              fontSize: '13px',
              lineHeight: 1.8,
              color: '#6b6860',
              fontWeight: 300,
              marginBottom: 0,
            }}>
              Conseils, inspirations, nouveaux espaces et actualités directement dans votre boîte mail.
            </p>
          </div>

          <NewsletterForm source="popup" submitLabel="Je m’inscris" inputRef={inputRef} />
        </div>
      </div>
    </>
  );
}
