import React, { useState, useEffect } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_5dizo3p';
const EMAILJS_TEMPLATE_ID = 'template_ffl7k88';
const EMAILJS_PUBLIC_KEY = '1Q_BLfh61Y9oi6ls_';

const spaces = [
  { id: 'loft',      label: 'Loft Osmoz',         sub: 'Marais · 25 pers.' },
  { id: 'duplex',    label: 'Duplex Haussmannien', sub: 'Paris 2e · 40 pers.' },
  { id: 'penthouse', label: 'Le Penthouse',        sub: 'La Défense · 40 pers.' },
];

const timeSlots = [
  { id: 'morning',   label: 'Matin',      hours: '08h30–12h' },
  { id: 'afternoon', label: 'Après-midi', hours: '14h–18h' },
  { id: 'fullday',   label: 'Journée',    hours: '08h30–18h30' },
  { id: 'evening',   label: 'Soirée',     hours: '18h30–22h' },
];

const guestOptions = ['1–10', '11–20', '21–30', '31–40', '41+'];
const serviceOptions = ['Petit-déjeuner', 'Déjeuner', 'Cocktail', 'Teambuilding', 'Cours de cuisine'];

type F = {
  firstName: string; lastName: string; phone: string; email: string; company: string;
  space: string; date: string; timeSlot: string; guests: string;
  services: string[]; comments: string;
};
type Err = Partial<Record<keyof F, string>>;

export default function Reservation() {
  const [searchParams] = useSearchParams();
  const sp = ['loft','duplex','penthouse'].includes(searchParams.get('space') || '') ? searchParams.get('space')! : '';

  const [form, setForm] = useState<F>({
    firstName:'', lastName:'', phone:'', email:'', company:'',
    space: sp, date:'', timeSlot:'', guests:'', services:[], comments:'',
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

  const validate = (): Err => {
    const e: Err = {};
    if (!form.firstName.trim()) e.firstName = 'Requis';
    if (!form.lastName.trim())  e.lastName  = 'Requis';
    if (!form.phone.trim())     e.phone     = 'Requis';
    if (!form.email.trim())     e.email     = 'Requis';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.company.trim())   e.company   = 'Requis';
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
    const spaceLabel  = spaces.find(s=>s.id===form.space)?.label || (form.space ? form.space : 'Non précisé');
    const timeLabel   = timeSlots.find(t=>t.id===form.timeSlot)?.label || '';
    const timeHours   = timeSlots.find(t=>t.id===form.timeSlot)?.hours || '';
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: `${form.firstName} ${form.lastName}`,
        reply_to: form.email,
        phone: form.phone,
        company: form.company,
        subject: `Réservation — ${spaceLabel}`,
        space: spaceLabel || 'Non précisé',
        date: form.date || 'Non précisée',
        time_slot: timeLabel ? `${timeLabel} (${timeHours})` : 'Non précisé',
        guests: form.guests ? `${form.guests} pers.` : 'Non précisé',
        services: form.services.length ? form.services.join(', ') : 'Aucun',
        comments: form.comments || 'Aucun',
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitErr("Erreur d'envoi. Écrivez-nous à contact@osmoz.work");
    } finally { setSubmitting(false); }
  };

  if (submitted) return (
    <>
      <Helmet><title>Demande envoyée — OSMOZ</title></Helmet>
      <div className="pt-32 pb-24 min-h-screen flex items-center bg-[#fbfbf3]">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-14 h-14 rounded-full bg-[#862637]/10 flex items-center justify-center mx-auto mb-5">
            <Check className="h-7 w-7 text-[#862637]" strokeWidth={1.5} />
          </div>
          <h1 className="font-light text-[#01142a] mb-3" style={{ fontFamily:'Playfair Display', fontSize:'clamp(1.8rem,4vw,2.4rem)' }}>
            Demande envoyée
          </h1>
          <p className="text-sm font-light text-gray-500 leading-relaxed mb-8">
            Notre équipe vous contacte sous <strong className="font-normal text-[#01142a]">24h</strong> pour confirmer les disponibilités.
          </p>
          <a href="/" className="inline-block bg-[#01142a] text-white px-8 py-3 rounded-xl text-xs tracking-[0.2em] uppercase font-normal hover:bg-[#862637] transition-all duration-300">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </>
  );

  /* ── label helper ── */
  const L = ({ t, opt }: { t: string; opt?: boolean }) => (
    <p className="text-[10px] font-normal uppercase tracking-[0.18em] text-gray-400 mb-1.5">
      {t}{opt ? <span className="normal-case tracking-normal ml-1 text-gray-300">(optionnel)</span> : <span className="text-[#862637] ml-0.5">*</span>}
    </p>
  );
  const inputCls = (err?: string) =>
    `w-full bg-transparent border-b py-1.5 text-base text-[#01142a] focus:outline-none transition-colors ${err ? 'border-red-400' : 'border-gray-200 focus:border-[#01142a]'}`;

  return (
    <>
      <Helmet>
        <title>Réserver — OSMOZ | Paris</title>
        <meta name="description" content="Réservez votre espace Osmoz à Paris pour séminaires, réunions et événements d'entreprise. Réponse sous 24h." />
        <link rel="canonical" href="https://osmoz.work/reservation" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white/95 backdrop-blur border-t border-[#e5e5e5] px-4 py-3">
        <button type="button" onClick={handleSubmit} disabled={submitting}
          className="w-full bg-[#862637] text-[#fee1d4] py-3.5 rounded-xl text-xs tracking-[0.2em] uppercase font-normal hover:bg-[#01142a] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60">
          {submitting ? 'Envoi…' : 'Envoyer ma demande'}
          {!submitting && <ChevronRight className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className="pt-20 pb-28 sm:pb-12 bg-[#fbfbf3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Header — ultra compact */}
          <div className="text-center mb-6">
            <p className="text-[10px] font-normal uppercase tracking-[0.3em] text-[#862637] mb-1.5">Osmoz · Paris</p>
            <h1 className="font-light text-[#01142a]" style={{ fontFamily:'Playfair Display', fontSize:'clamp(1.6rem,3.5vw,2.4rem)' }}>
              Réserver un espace
            </h1>
            <p className="text-xs font-light text-gray-400 mt-1">Réponse garantie sous 24h · Pas encore fixé sur une date ? Aucun problème.</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 sm:p-7">
            {/* ── Two-column layout on desktop ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">

              {/* LEFT: Coordonnées */}
              <div className="space-y-4 pb-5 sm:pb-0 border-b sm:border-b-0 sm:border-r border-[#f0f0e8] sm:pr-8">
                <p className="text-[10px] font-normal uppercase tracking-[0.25em] text-gray-300">Vos coordonnées</p>

                <div className="grid grid-cols-2 gap-x-3">
                  <div data-error={errors.firstName ? true : undefined}>
                    <L t="Prénom" />
                    <input type="text" name="firstName" value={form.firstName} onChange={onChange} className={inputCls(errors.firstName)} />
                    {errors.firstName && <p className="text-[9px] text-red-400 mt-0.5">{errors.firstName}</p>}
                  </div>
                  <div data-error={errors.lastName ? true : undefined}>
                    <L t="Nom" />
                    <input type="text" name="lastName" value={form.lastName} onChange={onChange} className={inputCls(errors.lastName)} />
                    {errors.lastName && <p className="text-[9px] text-red-400 mt-0.5">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-3">
                  <div data-error={errors.phone ? true : undefined}>
                    <L t="Téléphone" />
                    <input type="tel" name="phone" value={form.phone} onChange={onChange} className={inputCls(errors.phone)} />
                    {errors.phone && <p className="text-[9px] text-red-400 mt-0.5">{errors.phone}</p>}
                  </div>
                  <div data-error={errors.email ? true : undefined}>
                    <L t="Email pro" />
                    <input type="email" name="email" value={form.email} onChange={onChange} className={inputCls(errors.email)} />
                    {errors.email && <p className="text-[9px] text-red-400 mt-0.5">{errors.email}</p>}
                  </div>
                </div>

                <div data-error={errors.company ? true : undefined}>
                  <L t="Société" />
                  <input type="text" name="company" value={form.company} onChange={onChange} className={inputCls(errors.company)} />
                  {errors.company && <p className="text-[9px] text-red-400 mt-0.5">{errors.company}</p>}
                </div>

                {/* Services */}
                <div className="pt-1">
                  <L t="Services" opt />
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {serviceOptions.map(s => {
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
                <p className="text-[10px] font-normal uppercase tracking-[0.25em] text-gray-300">Votre événement</p>

                {/* Espace — 3 compact text buttons */}
                <div>
                  <L t="Espace" opt />
                  <div className="flex flex-col gap-1.5">
                    {spaces.map(s => (
                      <button key={s.id} type="button" onClick={() => set('space', form.space===s.id ? '' : s.id)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-all duration-150 ${
                          form.space===s.id ? 'border-[#01142a] bg-[#01142a] text-white' : 'border-[#e5e5e5] text-[#01142a] hover:border-[#01142a]/30'
                        }`}>
                        <span>
                          <span className="block text-xs font-light">{s.label}</span>
                          <span className={`block text-[10px] font-light ${form.space===s.id ? 'text-white/50' : 'text-gray-400'}`}>{s.sub}</span>
                        </span>
                        {form.space===s.id && <Check className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={2} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date + Personnes */}
                <div className="grid grid-cols-2 gap-x-3">
                  <div>
                    <L t="Date" opt />
                    <input type="date" name="date" value={form.date} onChange={onChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={inputCls()} />
                  </div>
                  <div>
                    <L t="Personnes" opt />
                    <select name="guests" value={form.guests} onChange={onChange}
                      className={`${inputCls()} appearance-none cursor-pointer`}>
                      <option value="">–</option>
                      {guestOptions.map(o => <option key={o} value={o}>{o} pers.</option>)}
                    </select>
                  </div>
                </div>

                {/* Créneau */}
                <div>
                  <L t="Créneau" opt />
                  <div className="grid grid-cols-2 gap-1.5">
                    {timeSlots.map(t => (
                      <button key={t.id} type="button" onClick={() => set('timeSlot', form.timeSlot===t.id ? '' : t.id)}
                        className={`border rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                          form.timeSlot===t.id ? 'border-[#01142a] bg-[#01142a] text-white' : 'border-[#e5e5e5] text-[#01142a] hover:border-[#01142a]/30'
                        }`}>
                        <p className="text-xs font-light">{t.label}</p>
                        <p className={`text-[10px] font-light ${form.timeSlot===t.id ? 'text-white/50' : 'text-gray-400'}`}>{t.hours}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Commentaires */}
                <div>
                  <L t="Commentaires" opt />
                  <textarea name="comments" value={form.comments} onChange={onChange} rows={2}
                    placeholder="Besoins spécifiques, questions…"
                    className="w-full bg-transparent border-b border-gray-200 py-1.5 text-base text-[#01142a] focus:outline-none focus:border-[#01142a] resize-none placeholder:text-gray-300 font-light transition-colors" />
                </div>
              </div>
            </div>

            {/* Submit error */}
            {submitErr && <p className="text-xs text-red-500 font-light mt-4">{submitErr}</p>}

            {/* Desktop CTA */}
            <div className="hidden sm:flex items-center justify-between mt-6 pt-5 border-t border-[#f0f0e8]">
              <p className="text-[10px] font-light text-gray-400">
                Champs <span className="text-[#862637]">*</span> obligatoires · Les autres peuvent être précisés plus tard
              </p>
              <button type="button" onClick={handleSubmit} disabled={submitting}
                className="bg-[#862637] text-[#fee1d4] px-8 py-3 rounded-xl text-xs tracking-[0.2em] uppercase font-normal hover:bg-[#01142a] hover:text-white transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-60">
                {submitting ? 'Envoi…' : 'Envoyer ma demande'}
                {!submitting && <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
