import React, { useMemo, useState } from 'react';
import { NewsletterError, subscribeToNewsletter } from '../lib/newsletter';
import { useLocale } from '../i18n/context';

type NewsletterFormProps = {
  source?: 'home' | 'popup' | 'articles' | 'reservation' | 'footer' | string;
  headline?: string;
  description?: string;
  submitLabel?: string;
  hideHeader?: boolean;
  tone?: 'dark' | 'light';
  className?: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm({
  source = 'popup',
  headline,
  description,
  submitLabel,
  hideHeader = false,
  tone = 'dark',
  className = '',
  onSuccess,
  onError,
  inputRef,
}: NewsletterFormProps) {
  const { t, p } = useLocale();
  const n = t.shared.newsletter;
  // Les props texte restent des surcharges optionnelles ; par défaut, le dictionnaire.
  const finalHeadline = headline ?? n.headline;
  const finalDescription = description ?? n.description;
  const finalSubmit = submitLabel ?? n.submit;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already_subscribed' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email]);
  const isSubmitting = status === 'loading';
  const isAlreadySubmitted = submittedEmail === normalizedEmail && (status === 'success' || status === 'already_subscribed');
  const disclaimerText = (
    <>
      {n.disclaimerBefore}
      <a href={p('/politique-de-confidentialite')} target="_blank" rel="noopener noreferrer" className={tone === 'light' ? 'text-[#862637] underline' : 'text-[#fee1d4] underline'}>
        {n.disclaimerLink}
      </a>
      {n.disclaimerAfter}
    </>
  );

  const validateEmail = () => {
    if (!normalizedEmail) {
      return n.errorRequired;
    }
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return n.errorInvalid;
    }
    return '';
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (status !== 'idle') {
      setStatus('idle');
      setMessage('');
    }
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
        setMessage(n.alreadySubscribed);
      } else {
        setStatus('success');
        setMessage(n.success);
      }
      onSuccess?.();
    } catch (err) {
      const text = err instanceof NewsletterError && err.code === 'invalid_email' ? n.errorInvalid : n.errorGeneric;
      setStatus('error');
      setMessage(text);
      onError?.(text);
    }
  };

  return (
    <div className={className}>
      {!hideHeader && (
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-[#862637] mb-4">{n.kicker}</p>
          <h2 className="t-serif text-[#fbfbf3] text-3xl sm:text-4xl mb-4">
            {finalHeadline}
          </h2>
          <p className="text-sm text-[#f5f5ef] max-w-2xl leading-relaxed">
            {finalDescription}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label htmlFor={`newsletter-email-${source}`} className="sr-only">
            {n.emailLabel}
          </label>
          <input
            ref={inputRef}
            id={`newsletter-email-${source}`}
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={n.emailPlaceholder}
            className="w-full rounded-3xl border border-[#e5e5e5] bg-white/95 px-5 py-4 text-sm text-[#01142a] placeholder:text-gray-400 focus:border-[#01142a] focus:outline-none focus:ring-2 focus:ring-[#862637]/20"
            aria-invalid={status === 'error' ? 'true' : 'false'}
            aria-describedby={`newsletter-message-${source}`}
          />
          <button
            type="submit"
            disabled={isSubmitting || isAlreadySubmitted}
            className={`btn-label rounded-3xl px-6 py-4 text-xs uppercase text-[#fbfbf3] transition ${
 status === 'success' ? 'bg-green-600 hover:bg-green-700' :
 status === 'already_subscribed' ? 'bg-blue-600 hover:bg-blue-700' :
 'bg-[#862637] hover:bg-[#01142a]'
 } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {isSubmitting ? n.sending : status === 'success' ? n.subscribed : status === 'already_subscribed' ? n.alreadySubscribedShort : finalSubmit}
          </button>
        </div>

        <p id={`newsletter-message-${source}`} className={`text-[11px] leading-relaxed font-medium ${
          status === 'error' ? 'text-red-500' :
          status === 'success' ? 'text-green-500' :
          status === 'already_subscribed' ? 'text-blue-500' :
          tone === 'light' ? 'text-[#6b6860]' : 'text-[#f5f5ef]/80'
        }`} aria-live="polite">
          {status === 'error' || status === 'success' || status === 'already_subscribed' ? message : disclaimerText}
        </p>
      </form>
    </div>
  );
}
