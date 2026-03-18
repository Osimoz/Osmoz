import React, { useState, useEffect } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_5dizo3p';
const EMAILJS_TEMPLATE_ID = 'template_ffl7k88';
const EMAILJS_PUBLIC_KEY = '1Q_BLfh61Y9oi6ls_';

const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);

const spaces = [
  { id: 'loft',       label: 'Loft Osmoz',         sub: 'Marais · 25 pers.',      image: u('images/Loft/7 Salon pleiniere 1.jpg') },
  { id: 'duplex',     label: 'Duplex Haussmannien', sub: 'Paris 2e · 50 pers.',    image: u('images/Duplex Haussmannien/1 Salon Normal 3.jpg') },
  { id: 'penthouse',  label: 'Le Penthouse',        sub: 'La Défense · 40 pers.',  image: u('images/Penthouse/1 - AI Modified View.png') },
];

const timeSlots = [
  { id: 'morning',   label: 'Matin',       hours: '08h30–12h' },
  { id: 'afternoon', label: 'Après-midi',  hours: '14h–18h' },
  { id: 'fullday',   label: 'Journée',     hours: '08h30–18h30' },
  { id: 'evening',   label: 'Soirée',      hours: '18h30–22h' },
];

const guestOptions = ['1–10', '11–20', '21–30', '31–40', '41–50', '50+'];
const serviceOptions = ['Petit-déjeuner', 'Déjeuner', 'Cocktail'];

type FormState = {
  firstName: string; lastName: string; phone: string; email: string; company: string;
  space: string; date: string; timeSlot: string; guests: string;
  services: string[]; comments: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const Field = ({
  label, required, error, children,
}: { label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
  <div data-error={error ? true : undefined}>
    <label className="block text-[10px] font-light uppercase tracking-[0.18em] text-gray-400 mb-1.5">
      {label}{required && <span className="text-[#862637] ml-0.5">*</span>}
    </label>
    {children}
    {error && <p className="text-[10px] text-red-400 mt-1">{error}</p>}
  </div>
);

const inputCls = (err?: string) =>
  `w-full bg-transparent border-b py-2 text-base text-[#01142a] focus:outline-none transition-colors ${err ? 'border-red-400' : 'border-gray-200 focus:border-[#01142a]'}`;

export default function Reservation() {
  const [searchParams] = useSearchParams();
  const spaceParam = ['loft', 'duplex', 'penthouse'].includes(searchParams.get('space') || '')
    ? searchParams.get('space')! : '';

  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', phone: '', email: '', company: '',
    space: spaceParam, date: '', timeSlot: '', guests: '', services: [], comments: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => { emailjs.init(EMAILJS_PUBLIC_KEY); }, []);
  useEffect(() => { if (spaceParam) setForm(f => ({ ...f, space: spaceParam })); }, [spaceParam]);

  const set = (name: keyof FormState, value: string) => {
    setForm(f => ({ ...f, [name]: value }));
    setErrors(e => ({ ...e, [name]: undefined }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    set(e.target.name as keyof FormState, e.target.value);

  const toggleService = (s: string) =>
    setForm(f => ({ ...f, services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s] }));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.firstName.trim()) e.firstName = 'Requis';
    if (!form.lastName.trim()) e.lastName = 'Requis';
    if (!form.phone.trim()) e.phone = 'Requis';
    if (!form.email.trim()) e.email = 'Requis';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.company.trim()) e.company = 'Requis';
    if (!form.space) e.space = 'Choisir un espace';
    if (!form.date) e.date = 'Requis';
    if (!form.timeSlot) e.timeSlot = 'Choisir un créneau';
    if (!form.guests) e.guests = 'Requis';
    return e;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      document.querySelector('[data-error]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    const spaceLabel = spaces.find(s => s.id === form.space)?.label || form.space;
    const timeLabel = timeSlots.find(t => t.id === form.timeSlot)?.label || form.timeSlot;
    const timeHours = timeSlots.find(t => t.id === form.timeSlot)?.hours || '';
    const messageBody = `DEMANDE DE RÉSERVATION OSMOZ
Contact : ${form.firstName} ${form.lastName} | ${form.phone} | ${form.email} | ${form.company}
Espace : ${spaceLabel}
Date : ${form.date} | Créneau : ${timeLabel} (${timeHours}) | Personnes : ${form.guests}
Services : ${form.services.length > 0 ? form.services.join(', ') : 'Aucun'}
Commentaires : ${form.comments || 'Aucun'}`;
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: `${form.firstName} ${form.lastName}`,
        reply_to: form.email,
        phone: form.phone,
        company: form.company,
        subject: `Réservation — ${spaceLabel}`,
        message: messageBody,
        to_email: 'contact@osmoz.work',
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitError("Erreur d'envoi. Réessayez ou écrivez-nous à contact@osmoz.work");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet><title>Demande envoyée — OSMOZ</title></Helmet>
        <div className="pt-32 pb-24 min-h-screen flex items-center bg-[#fbfbf3]">
          <div className="max-w-md mx-auto px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#862637]/10 flex items-center justify-center mx-auto mb-5">
              <Check className="h-7 w-7 text-[#862637]" strokeWidth={1.5} />
            </div>
            <h1 className="font-light text-[#01142a] mb-3" style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(1.8rem,4vw,2.4rem)' }}>
              Demande envoyée
            </h1>
            <p className="text-sm font-light text-gray-500 leading-relaxed mb-8">
              Notre équipe vous contacte sous <strong className="font-normal text-[#01142a]">24h</strong> pour confirmer les disponibilités.
            </p>
            <a href="/" className="inline-block bg-[#01142a] text-white px-8 py-3 rounded-xl text-xs tracking-[0.2em] uppercase font-light hover:bg-[#862637] transition-all duration-300">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Réserver — OSMOZ | Paris</title>
        <meta name="description" content="Réservez votre espace Osmoz à Paris pour séminaires, réunions et événements d'entreprise. Réponse sous 24h." />
        <link rel="canonical" href="https://osmoz.work/reservation" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white border-t border-[#e5e5e5] px-4 py-3 shadow-xl">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-[#862637] text-[#fee1d4] py-3.5 rounded-xl text-xs tracking-[0.2em] uppercase font-light hover:bg-[#01142a] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSubmitting ? 'Envoi…' : 'Envoyer ma demande'}
          {!isSubmitting && <ChevronRight className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className="pt-24 pb-28 sm:pb-16 bg-[#fbfbf3]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {/* Compact header */}
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[10px] font-light uppercase tracking-[0.3em] text-[#862637] mb-2">Osmoz · Paris</p>
            <h1 className="font-light text-[#01142a]" style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
              Réserver un espace
            </h1>
            <p className="text-xs font-light text-gray-400 mt-2">Réponse garantie sous 24h</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 sm:p-8 space-y-7">

            {/* ── Coordonnées ── */}
            <div>
              <p className="text-[10px] font-light uppercase tracking-[0.25em] text-gray-300 mb-4">Vos coordonnées</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                <Field label="Prénom" required error={errors.firstName}>
                  <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className={inputCls(errors.firstName)} />
                </Field>
                <Field label="Nom" required error={errors.lastName}>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className={inputCls(errors.lastName)} />
                </Field>
                <Field label="Téléphone" required error={errors.phone}>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputCls(errors.phone)} />
                </Field>
                <Field label="Email pro" required error={errors.email}>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className={inputCls(errors.email)} />
                </Field>
                <div className="col-span-2">
                  <Field label="Société" required error={errors.company}>
                    <input type="text" name="company" value={form.company} onChange={handleChange} className={inputCls(errors.company)} />
                  </Field>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#f0f0e8]" />

            {/* ── Espace ── */}
            <div data-error={errors.space ? true : undefined}>
              <p className="text-[10px] font-light uppercase tracking-[0.25em] text-gray-300 mb-3">
                Espace souhaité <span className="text-[#862637]">*</span>
              </p>
              {/* Horizontal scroll on mobile, 3-col on desktop */}
              <div className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto pb-1 sm:pb-0 [&::-webkit-scrollbar]:hidden">
                {spaces.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => set('space', s.id)}
                    className={`relative flex-shrink-0 w-[44vw] sm:w-auto overflow-hidden rounded-xl border-2 text-left transition-all duration-200 ${
                      form.space === s.id ? 'border-[#01142a] shadow-md' : 'border-[#e5e5e5] hover:border-[#01142a]/30'
                    }`}
                  >
                    <div className="aspect-[3/2] overflow-hidden">
                      <img src={s.image} alt={s.label} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-[11px] font-light text-[#01142a] leading-tight">{s.label}</p>
                      <p className="text-[10px] font-light text-gray-400 mt-0.5">{s.sub}</p>
                    </div>
                    {form.space === s.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#01142a] flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {errors.space && <p className="text-[10px] text-red-400 mt-1.5">{errors.space}</p>}
            </div>

            {/* ── Date + Guests ── */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <Field label="Date souhaitée" required error={errors.date}>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={inputCls(errors.date)}
                />
              </Field>
              <Field label="Nombre de personnes" required error={errors.guests}>
                <select name="guests" value={form.guests} onChange={handleChange}
                  className={`${inputCls(errors.guests)} appearance-none cursor-pointer`}>
                  <option value="">–</option>
                  {guestOptions.map(o => <option key={o} value={o}>{o} pers.</option>)}
                </select>
              </Field>
            </div>

            {/* ── Créneau ── */}
            <div data-error={errors.timeSlot ? true : undefined}>
              <p className="text-[10px] font-light uppercase tracking-[0.25em] text-gray-300 mb-3">
                Créneau <span className="text-[#862637]">*</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlots.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => set('timeSlot', t.id)}
                    className={`border rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                      form.timeSlot === t.id
                        ? 'border-[#01142a] bg-[#01142a] text-white'
                        : 'border-[#e5e5e5] text-[#01142a] hover:border-[#01142a]/30'
                    }`}
                  >
                    <p className="text-xs font-light leading-tight">{t.label}</p>
                    <p className={`text-[10px] font-light mt-0.5 ${form.timeSlot === t.id ? 'text-white/50' : 'text-gray-400'}`}>{t.hours}</p>
                  </button>
                ))}
              </div>
              {errors.timeSlot && <p className="text-[10px] text-red-400 mt-1.5">{errors.timeSlot}</p>}
            </div>

            {/* ── Services + Commentaires ── */}
            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-light uppercase tracking-[0.25em] text-gray-300 mb-3">Services (optionnel)</p>
                <div className="flex gap-2 flex-wrap">
                  {serviceOptions.map(s => {
                    const on = form.services.includes(s);
                    return (
                      <button key={s} type="button" onClick={() => toggleService(s)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-light transition-all duration-200 ${
                          on ? 'border-[#862637] bg-[#862637] text-white' : 'border-[#e5e5e5] text-[#01142a] hover:border-[#862637]/40'
                        }`}>
                        {on && <Check className="h-3 w-3" strokeWidth={2.5} />}
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-light uppercase tracking-[0.18em] text-gray-400 mb-1.5">
                  Commentaires (optionnel)
                </label>
                <textarea
                  name="comments"
                  value={form.comments}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Besoins spécifiques, contexte de l'événement…"
                  className="w-full bg-transparent border-b border-gray-200 py-2 text-base text-[#01142a] focus:outline-none focus:border-[#01142a] resize-none placeholder:text-gray-300 font-light transition-colors"
                />
              </div>
            </div>

            {/* Submit error */}
            {submitError && <p className="text-xs text-red-500 font-light">{submitError}</p>}

            {/* Desktop CTA */}
            <div className="hidden sm:flex items-center justify-between pt-2">
              <p className="text-[10px] font-light text-gray-400">
                Champs <span className="text-[#862637]">*</span> obligatoires · Réponse sous 24h
              </p>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#862637] text-[#fee1d4] px-9 py-3.5 rounded-xl text-xs tracking-[0.2em] uppercase font-light hover:bg-[#01142a] hover:text-white transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? 'Envoi…' : 'Envoyer ma demande'}
                {!isSubmitting && <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
