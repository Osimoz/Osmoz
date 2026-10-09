import React, { useState, useEffect } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { useLocale } from '../i18n/context';
import { useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { sendBookingWebhook } from '../lib/bookingWebhook';

const EMAILJS_SERVICE_ID = 'service_5dizo3p';
const EMAILJS_TEMPLATE_ID = 'template_ffl7k88';
const EMAILJS_PUBLIC_KEY = '1Q_BLfh61Y9oi6ls_';

// Libellés dans t.reservation.spaces / t.reservation.timeSlots.
const spaceIds = ['loft', 'duplex', 'penthouse'] as const;
const timeSlotIds = ['morning', 'afternoon', 'fullday', 'evening'] as const;

const guestOptions = ['1–10', '11–20', '21–30', '31–40', '41+'];

type F = {
  firstName: string; lastName: string; phone: string; email: string; company: string;
  space: string; date: string; timeSlot: string; guests: string;
  services: string[]; comments: string;
  acceptDataPolicy: boolean; acceptNewsletter: boolean;
};
type Err = Partial<Record<keyof F, string>>;

export default function Reservation() {
  const { t, p, lang } = useLocale();
  const r = t.reservation;
  const [searchParams] = useSearchParams();
  const sp = ['loft','duplex','penthouse'].includes(searchParams.get('space') || '') ? searchParams.get('space')! : '';

  const [form, setForm] = useState<F>({
    firstName:'', lastName:'', phone:'', email:'', company:'',
    space: sp, date:'', timeSlot:'', guests:'', services:[], comments:'',
    acceptDataPolicy: false, acceptNewsletter: false,
  });
  const [errors, setErrors] = useState<Err>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitErr, setSubmitErr] = useState<string|null>(null);

  useEffect(() => { emailjs.init(EMAILJS_PUBLIC_KEY); }, []);
  useEffect(() => { if (sp) setForm(f => ({ ...f, space: sp })); }, [sp]);

  const set = (k: keyof F, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: undefined }));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    set(e.target.name as keyof F, e.target.value);
  const toggleService = (s: string) =>
    setForm(f => ({ ...f, services: f.services.includes(s) ? f.services.filter(x=>x!==s) : [...f.services,s] }));
  const toggleCheckbox = (field: 'acceptDataPolicy' | 'acceptNewsletter') =>
    setForm(f => ({ ...f, [field]: !f[field] }));

  const validate = (): Err => {
    const e: Err = {};
    if (!form.firstName.trim()) e.firstName = r.validation.required;
    if (!form.lastName.trim())  e.lastName  = r.validation.required;
    if (!form.phone.trim())     e.phone     = r.validation.required;
    if (!form.email.trim())     e.email     = r.validation.required;
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = r.validation.invalidEmail;
    if (!form.company.trim())   e.company   = r.validation.required;
    if (!form.acceptDataPolicy) e.acceptDataPolicy = r.validation.accept;
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      document.querySelector('[data-error]')?.scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }
    setSubmitting(true); setSubmitErr(null);
    // E-mail interne (équipe OSMOZ) : reste en français, marqué (EN) si la
    // demande vient du site anglais. Les valeurs choisies gardent leur libellé affiché.
    const spaceLabel  = (spaceIds as readonly string[]).includes(form.space) ? r.spaces[form.space as typeof spaceIds[number]].label : (form.space ? form.space : 'Non précisé');
    const slot        = (timeSlotIds as readonly string[]).includes(form.timeSlot) ? r.timeSlots[form.timeSlot as typeof timeSlotIds[number]] : undefined;
    const timeLabel   = slot?.label || '';
    const timeHours   = slot?.hours || '';
    try {
      const emailjsPromise = emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: `${form.firstName} ${form.lastName}`,
        reply_to: form.email,
        phone: form.phone,
        company: form.company,
        subject: `Réservation — ${spaceLabel}${lang === 'en' ? ' (EN)' : ''}`,
        space: spaceLabel || 'Non précisé',
        date: form.date || 'Non précisée',
        time_slot: timeLabel ? `${timeLabel} (${timeHours})` : 'Non précisé',
        guests: form.guests ? `${form.guests} pers.` : 'Non précisé',
        services: form.services.length ? form.services.join(', ') : 'Aucun',
        comments: form.comments || 'Aucun',
      });

      if (form.acceptNewsletter) {
        const newsletterPromise = fetch('/.netlify/functions/subscribe-newsletter', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email: form.email, source: 'reservation', pageUrl: window.location.href }),
        });
        await Promise.all([emailjsPromise, newsletterPromise]);
      } else {
        await emailjsPromise;
      }

      sendBookingWebhook({
        source: 'site_reservation',
        submitted_at: new Date().toISOString(),
        lang,
        page_url: window.location.href,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        space_id: form.space,
        space_label: (spaceIds as readonly string[]).includes(form.space) ? spaceLabel : '',
        date: form.date,
        time_slot_id: form.timeSlot,
        time_slot_label: timeLabel,
        time_slot_hours: timeHours,
        guests: form.guests,
        services: form.services,
        comments: form.comments,
        newsletter_opt_in: form.acceptNewsletter,
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitErr(r.submitError);
    } finally { setSubmitting(false); }
  };

  if (submitted) return (
    <>
      <Helmet><html lang={lang} /><title>{r.sent.metaTitle}</title></Helmet>
      <div className="pt-32 pb-24 min-h-screen flex items-center bg-[#fbfbf3]">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-14 h-14 rounded-full bg-[#862637]/10 flex items-center justify-center mx-auto mb-5">
            <Check className="h-7 w-7 text-[#862637]" strokeWidth={1.5} />
          </div>
          <h1 className="t-h1 text-[#01142a] mb-3" style={{ fontSize: 'clamp(2rem,4vw,2.4rem)' }}>
            {r.sent.title}
          </h1>
          <p className="text-sm font-light text-gray-500 leading-relaxed mb-8">
            {r.sent.textBefore}<strong className="font-normal text-[#01142a]">{r.sent.textStrong}</strong>{r.sent.textAfter}
          </p>
          <a href={p('/')} className="btn-label inline-block bg-[#01142a] text-white px-8 py-3 rounded-xl text-xs uppercase hover:bg-[#862637] transition-all duration-300">
            {r.sent.home}
          </a>
        </div>
      </div>
    </>
  );

  /* ── label helper ── */
  const L = ({ t, opt }: { t: string; opt?: boolean }) => (
    <p className="text-[10px] font-normal uppercase tracking-[0.18em] text-gray-400 mb-1.5">
      {t}{opt ? <span className="normal-case tracking-normal ml-1 text-gray-300">{r.optional}</span> : <span className="text-[#862637] ml-0.5">*</span>}
    </p>
  );
  const inputCls = (err?: string) =>
    `w-full bg-transparent border-b py-1.5 text-base text-[#01142a] focus:outline-none transition-colors ${err ? 'border-red-400' : 'border-gray-200 focus:border-[#01142a]'}`;

  return (
    <>
      <SEO route="reservation" />

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white/95 backdrop-blur border-t border-[#e5e5e5] px-4 py-3">
        <button type="button" onClick={handleSubmit} disabled={submitting}
          className="btn-label w-full bg-[#862637] text-[#fee1d4] py-3.5 rounded-xl text-xs uppercase hover:bg-[#01142a] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60">
          {submitting ? r.sending : r.submit}
          {!submitting && <ChevronRight className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className="pt-20 pb-28 sm:pb-12 bg-[#fbfbf3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Header — ultra compact */}
          <div className="text-center mb-6">
            <p className="text-[10px] font-normal uppercase tracking-[0.3em] text-[#862637] mb-1.5">{r.header.kicker}</p>
            <h1 className="t-h1 text-[#01142a]" style={{ fontSize: 'clamp(2rem,3.5vw,2.4rem)' }}>
              {r.header.title}
            </h1>
            <p className="text-xs font-light text-gray-400 mt-1">{r.header.subtitle}</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 sm:p-7">
            {/* ── Two-column layout on desktop ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">

              {/* LEFT: Coordonnées */}
              <div className="space-y-4 pb-5 sm:pb-0 border-b sm:border-b-0 sm:border-r border-[#f0f0e8] sm:pr-8">
                <p className="text-[10px] font-normal uppercase tracking-[0.25em] text-gray-300">{r.sections.details}</p>

                <div className="grid grid-cols-2 gap-x-3">
                  <div data-error={errors.firstName ? true : undefined}>
                    <L t={r.fields.firstName} />
                    <input type="text" name="firstName" value={form.firstName} onChange={onChange} className={inputCls(errors.firstName)} />
                    {errors.firstName && <p className="text-[9px] text-red-400 mt-0.5">{errors.firstName}</p>}
                  </div>
                  <div data-error={errors.lastName ? true : undefined}>
                    <L t={r.fields.lastName} />
                    <input type="text" name="lastName" value={form.lastName} onChange={onChange} className={inputCls(errors.lastName)} />
                    {errors.lastName && <p className="text-[9px] text-red-400 mt-0.5">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-3">
                  <div data-error={errors.phone ? true : undefined}>
                    <L t={r.fields.phone} />
                    <input type="tel" name="phone" value={form.phone} onChange={onChange} className={inputCls(errors.phone)} />
                    {errors.phone && <p className="text-[9px] text-red-400 mt-0.5">{errors.phone}</p>}
                  </div>
                  <div data-error={errors.email ? true : undefined}>
                    <L t={r.fields.email} />
                    <input type="email" name="email" value={form.email} onChange={onChange} className={inputCls(errors.email)} />
                    {errors.email && <p className="text-[9px] text-red-400 mt-0.5">{errors.email}</p>}
                  </div>
                </div>

                <div data-error={errors.company ? true : undefined}>
                  <L t={r.fields.company} />
                  <input type="text" name="company" value={form.company} onChange={onChange} className={inputCls(errors.company)} />
                  {errors.company && <p className="text-[9px] text-red-400 mt-0.5">{errors.company}</p>}
                </div>

                {/* Services */}
                <div className="pt-1">
                  <L t={r.fields.services} opt />
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {r.services.map(s => {
                      const on = form.services.includes(s);
                      return (
                        <button key={s} type="button" onClick={() => toggleService(s)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px] font-light transition-all duration-150 ${
                            on ? 'border-[#862637] bg-[#862637] text-white' : 'border-[#e5e5e5] text-[#01142a] hover:border-[#862637]/40'
                          }`}>
                          {on && <Check className="h-2.5 w-2.5" strokeWidth={2.5} />}
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT: Événement */}
              <div className="space-y-4 pt-5 sm:pt-0 sm:pl-0">
                <p className="text-[10px] font-normal uppercase tracking-[0.25em] text-gray-300">{r.sections.event}</p>

                {/* Espace — 3 compact text buttons */}
                <div>
                  <L t={r.fields.space} opt />
                  <div className="flex flex-col gap-1.5">
                    {spaceIds.map(id => (
                      <button key={id} type="button" onClick={() => set('space', form.space===id ? '' : id)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-all duration-150 ${
                          form.space===id ? 'border-[#01142a] bg-[#01142a] text-white' : 'border-[#e5e5e5] text-[#01142a] hover:border-[#01142a]/30'
                        }`}>
                        <span>
                          <span className="block text-xs font-light">{r.spaces[id].label}</span>
                          <span className={`block text-[10px] font-light ${form.space===id ? 'text-white/50' : 'text-gray-400'}`}>{r.spaces[id].sub}</span>
                        </span>
                        {form.space===id && <Check className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={2} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date + Personnes */}
                <div className="grid grid-cols-2 gap-x-3">
                  <div>
                    <L t={r.fields.date} opt />
                    <input type="date" name="date" value={form.date} onChange={onChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={inputCls()} />
                  </div>
                  <div>
                    <L t={r.fields.guests} opt />
                    <select name="guests" value={form.guests} onChange={onChange}
                      className={`${inputCls()} appearance-none cursor-pointer`}>
                      <option value="">–</option>
                      {guestOptions.map(o => <option key={o} value={o}>{o} {r.fields.guestsSuffix}</option>)}
                    </select>
                  </div>
                </div>

                {/* Créneau */}
                <div>
                  <L t={r.fields.timeSlot} opt />
                  <div className="grid grid-cols-2 gap-1.5">
                    {timeSlotIds.map(id => (
                      <button key={id} type="button" onClick={() => set('timeSlot', form.timeSlot===id ? '' : id)}
                        className={`border rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                          form.timeSlot===id ? 'border-[#01142a] bg-[#01142a] text-white' : 'border-[#e5e5e5] text-[#01142a] hover:border-[#01142a]/30'
                        }`}>
                        <p className="text-xs font-light">{r.timeSlots[id].label}</p>
                        <p className={`text-[10px] font-light ${form.timeSlot===id ? 'text-white/50' : 'text-gray-400'}`}>{r.timeSlots[id].hours}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Commentaires */}
                <div>
                  <L t={r.fields.comments} opt />
                  <textarea name="comments" value={form.comments} onChange={onChange} rows={2}
                    placeholder={r.fields.commentsPlaceholder}
                    className="w-full bg-transparent border-b border-gray-200 py-1.5 text-base text-[#01142a] focus:outline-none focus:border-[#01142a] resize-none placeholder:text-gray-300 font-light transition-colors" />
                </div>
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4 mt-6 pt-6 border-t border-[#f0f0e8]">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="accept-data-policy"
                  checked={form.acceptDataPolicy}
                  onChange={() => toggleCheckbox('acceptDataPolicy')}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#862637] accent-[#862637]"
                  aria-describedby="data-policy-desc"
                  required
                />
                <label htmlFor="accept-data-policy" className="text-xs leading-relaxed text-gray-600 cursor-pointer">
                  {r.consent.dataBefore}
                  <a href={p('/politique-de-confidentialite')} target="_blank" rel="noopener noreferrer" className="text-[#862637] hover:text-[#01142a] underline">
                    {r.consent.dataLink}
                  </a>
                  {r.consent.dataAfter} <span className="text-[#862637] font-semibold">*</span>
                </label>
              </div>
              {errors.acceptDataPolicy && <p className="text-[9px] text-red-400 ml-7">{errors.acceptDataPolicy}</p>}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="accept-newsletter"
                  checked={form.acceptNewsletter}
                  onChange={() => toggleCheckbox('acceptNewsletter')}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#862637] accent-[#862637]"
                />
                <label htmlFor="accept-newsletter" className="text-xs leading-relaxed text-gray-600 cursor-pointer">
                  {r.consent.newsletter}
                </label>
              </div>
            </div>

            {/* Submit error */}
            {submitErr && <p className="text-xs text-red-500 font-light mt-4">{submitErr}</p>}


            {/* Desktop CTA */}
            <div className="hidden sm:flex items-center justify-between mt-6 pt-5 border-t border-[#f0f0e8]">
              <p className="text-[10px] font-light text-gray-400">
                {r.footer.requiredBefore}<span className="text-[#862637]">*</span>{r.footer.requiredAfter}
              </p>
              <button type="button" onClick={handleSubmit} disabled={submitting}
                className="btn-label bg-[#862637] text-[#fee1d4] px-8 py-3 rounded-xl text-xs uppercase hover:bg-[#01142a] hover:text-white transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-60">
                {submitting ? r.sending : r.submit}
                {!submitting && <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
