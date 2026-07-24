import React, { useEffect, useMemo, useState } from 'react';
import { subscribeToNewsletter } from '../lib/newsletter';

type NewsletterFormProps = {
  source?: 'home' | 'popup' | 'articles' | 'reservation' | 'footer' | string;
  headline?: string;
  description?: string;
  submitLabel?: string;
  hideHeader?: boolean;
  className?: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm({
  source = 'popup',
  headline = 'Recevez les actualités d’Osmoz',
  description = 'Conseils, inspirations, nouveaux espaces et actualités directement dans votre boîte mail.',
  submitLabel = 'Je m’inscris',
  hideHeader = false,
  className = '',
  onSuccess,
  onError,
  inputRef,
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already_subscribed' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email]);
  const isSubmitting = status === 'loading';
  const isAlreadySubmitted = submittedEmail === normalizedEmail && (status === 'success' || status === 'already_subscribed');

  useEffect(() => {
    if (status !== 'idle') {
      setMessage('');
    }
  }, [email, status]);

  const validateEmail = () => {
    if (!normalizedEmail) {
      return 'Votre adresse e-mail est requise.';
    }
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return 'Adresse e-mail invalide.';
    }
    return '';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || isAlreadySubmitted) return;

    const error = validateEmail();
    if (error) {
      setStatus('error');
      setMessage(error);
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const result = await subscribeToNewsletter(normalizedEmail, source);
      setSubmittedEmail(normalizedEmail);
      if (result.alreadySubscribed) {
        setStatus('already_subscribed');
        setMessage('Cette adresse est déjà inscrite à notre newsletter.');
      } else {
        setStatus('success');
        setMessage('Merci ! Votre inscription à la newsletter a bien été prise en compte.');
      }
      onSuccess?.();
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer dans quelques instants.';
      setStatus('error');
      setMessage(text);
      onError?.(text);
    }
  };

  return (
    <div className={className}>
      {!hideHeader && (
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-[#862637] mb-4">Newsletter</p>
          <h2 className="font-light text-[#fbfbf3] text-3xl sm:text-4xl leading-tight mb-4" style={{ fontFamily: 'Playfair Display' }}>
            {headline}
          </h2>
          <p className="text-sm text-[#f5f5ef] max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label htmlFor={`newsletter-email-${source}`} className="sr-only">
            Votre adresse e-mail
          </label>
          <input
            ref={inputRef}
            id={`newsletter-email-${source}`}
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Votre adresse e-mail"
            className="w-full rounded-3xl border border-[#e5e5e5] bg-white/95 px-5 py-4 text-sm text-[#01142a] placeholder:text-gray-400 focus:border-[#01142a] focus:outline-none focus:ring-2 focus:ring-[#862637]/20"
            aria-invalid={status === 'error' ? 'true' : 'false'}
            aria-describedby={`newsletter-message-${source}`}
          />
          <button
            type="submit"
            disabled={isSubmitting || isAlreadySubmitted}
            className="rounded-3xl bg-[#862637] px-6 py-4 text-xs tracking-[0.2em] uppercase text-[#fbfbf3] transition hover:bg-[#01142a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Envoi…' : submitLabel}
          </button>
        </div>

        <p id={`newsletter-message-${source}`} className={`text-[11px] leading-relaxed ${status === 'error' ? 'text-red-500' : 'text-[#f5f5ef]/80'}`} aria-live="polite">
          {status === 'error' ? message : (
            <>
              En vous inscrivant, vous acceptez de recevoir les actualités d'Osmoz par e-mail. Vous pouvez vous désinscrire à tout moment. Consultez notre{' '}
              <a href="/politique-de-confidentialite" target="_blank" rel="noopener noreferrer" className="text-[#fee1d4] underline">
                politique de confidentialité
              </a>.
            </>
          )}
        </p>
      </form>
    </div>
  );
}
