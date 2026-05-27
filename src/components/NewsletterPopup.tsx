import { useState, useEffect } from 'react';

const STORAGE_KEY = 'osmoz_newsletter_dismissed';
const LINKEDIN_NL = 'https://www.linkedin.com/newsletters/osmoz-7453432571654295552';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
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

        <p style={{
          fontSize: '13px',
          lineHeight: 1.8,
          color: '#6b6860',
          fontWeight: 300,
          marginBottom: '32px',
        }}>
          Suivez notre actualité directement sur LinkedIn.
        </p>

        <a
          href={LINKEDIN_NL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismiss}
          style={{
            display: 'block',
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
            textDecoration: 'none',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#862637')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#01142a')}
        >
          S'inscrire à notre Newsletter LinkedIn →
        </a>
      </div>
    </>
  );
}
