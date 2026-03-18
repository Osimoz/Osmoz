import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_5dizo3p';
const EMAILJS_TEMPLATE_ID = 'template_ffl7k88';
const EMAILJS_PUBLIC_KEY = '1Q_BLfh61Y9oi6ls_';

const base = import.meta.env.BASE_URL;
const u = (p: string) => encodeURI(`${base}${p.replace(/^\//, '')}`);

const spaces = [
  {
    id: 'loft',
    label: 'Le Loft Osmoz',
    location: 'Marais, Paris 3e',
    capacity: '25 pers. max',
    image: u('images/Loft/7 Salon pleiniere 1.jpg'),
  },
  {
    id: 'duplex',
    label: 'Le Duplex Haussmannien',
    location: 'Montmartre, Paris 2e',
    capacity: '50 pers. max',
    image: u('images/Duplex Haussmannien/1 Salon Normal 3.jpg'),
  },
  {
    id: 'penthouse',
    label: 'Le Penthouse',
    location: 'La Défense, Puteaux',
    capacity: '40 pers. max',
    image: u('images/Penthouse/1 - AI Modified View.png'),
  },
];

const timeSlots = [
  { id: 'morning',   label: 'Demi-journée matin',       hours: '08h30 – 12h' },
  { id: 'afternoon', label: 'Demi-journée après-midi',   hours: '14h – 18h' },
  { id: 'fullday',   label: 'Journée complète',          hours: '08h30 – 18h30' },
  { id: 'evening',   label: 'Soirée',                    hours: '18h30 – 22h' },
];

const guestOptions = ['1 – 10', '11 – 20', '21 – 30', '31 – 40', '41 – 50', '50+'];
const serviceOptions = ['Petit-déjeuner', 'Déjeuner', 'Cocktail'];

const spaceParamMap: Record<string, string> = {
  loft: 'loft',
  duplex: 'duplex',
  penthouse: 'penthouse',
};

export default function Reservation() {
  const [searchParams] = useSearchParams();
  const spaceFromUrl = spaceParamMap[searchParams.get('space') || ''] || '';

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    space: spaceFromUrl,
    date: '',
    timeSlot: '',
    guests: '',
    services: [] as string[],
    comments: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Sync space from URL on mount
  useEffect(() => {
    if (spaceFromUrl) setForm((f) => ({ ...f, space: spaceFromUrl }));
  }, [spaceFromUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof typeof form]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const toggleService = (service: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};
    if (!form.firstName.trim()) newErrors.firstName = 'Requis';
    if (!form.lastName.trim()) newErrors.lastName = 'Requis';
    if (!form.phone.trim()) newErrors.phone = 'Requis';
    if (!form.email.trim()) newErrors.email = 'Requis';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email invalide';
    if (!form.company.trim()) newErrors.company = 'Requis';
    if (!form.space) newErrors.space = 'Veuillez choisir un espace';
    if (!form.date) newErrors.date = 'Requis';
    if (!form.timeSlot) newErrors.timeSlot = 'Veuillez choisir un créneau';
    if (!form.guests) newErrors.guests = 'Requis';
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorEl = document.querySelector('[data-error]');
      firstErrorEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const spaceLabel = spaces.find((s) => s.id === form.space)?.label || form.space;
    const timeLabel = timeSlots.find((t) => t.id === form.timeSlot)?.label || form.timeSlot;

    const messageBody = `DEMANDE DE RÉSERVATION OSMOZ
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Contact
• Prénom / Nom : ${form.firstName} ${form.lastName}
• Téléphone : ${form.phone}
• Email : ${form.email}
• Société : ${form.company}

Réservation
• Espace : ${spaceLabel}
• Date souhaitée : ${form.date}
• Créneau : ${timeLabel}
• Nombre de personnes : ${form.guests}

Services souhaités : ${form.services.length > 0 ? form.services.join(', ') : 'Aucun'}

Commentaires : ${form.comments || 'Aucun'}`;

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: `${form.firstName} ${form.lastName}`,
        reply_to: form.email,
        phone: form.phone,
        company: form.company,
        subject: `Demande de réservation — ${spaceLabel}`,
        message: messageBody,
        to_email: 'contact@osmoz.work',
      });

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitError("Une erreur s'est produite. Veuillez réessayer ou nous contacter par email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Demande envoyée — OSMOZ</title>
        </Helmet>
        <div className="pt-32 pb-24 min-h-screen flex items-center">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#862637]/10 flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-[#862637]" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-light text-[#01142a] mb-4" style={{ fontFamily: 'Playfair Display' }}>
              Demande envoyée
            </h1>
            <p className="text-gray-500 font-light leading-loose mb-8">
              Merci pour votre demande. Notre équipe vous contactera dans les <strong className="font-normal text-[#01142a]">24 heures</strong> pour confirmer les disponibilités et finaliser votre réservation.
            </p>
            <a
              href="/"
              className="inline-block bg-[#01142a] text-white px-8 py-3 rounded-lg text-xs tracking-[0.2em] uppercase font-light hover:bg-[#862637] transition-all duration-300"
            >
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
        <title>Réserver un espace — OSMOZ | Paris</title>
        <meta name="description" content="Réservez votre espace Osmoz à Paris pour séminaires, réunions et événements d'entreprise. Réponse sous 24h." />
        <link rel="canonical" href="https://osmoz.work/reservation" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="pt-32 pb-24" style={{ backgroundColor: '#fbfbf3' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-3">Osmoz · Paris</p>
            <h1
              className="font-light text-[#01142a] mb-4"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Réserver un espace
            </h1>
            <p className="text-sm font-light text-gray-500 leading-loose max-w-xl mx-auto">
              Remplissez ce formulaire et nous vous répondons sous 24h avec les disponibilités et un devis personnalisé.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 sm:p-12 space-y-12">

            {/* ── Section 1 : Coordonnées ── */}
            <section>
              <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-1">01</p>
              <h2 className="text-lg font-light text-[#01142a] mb-8" style={{ fontFamily: 'Playfair Display' }}>
                Vos coordonnées
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Prénom */}
                <div data-error={errors.firstName ? true : undefined}>
                  <label className="block text-xs font-light uppercase tracking-widest text-gray-400 mb-2">
                    Prénom <span className="text-[#862637]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b py-2 text-base text-[#01142a] focus:outline-none transition-colors ${errors.firstName ? 'border-red-400' : 'border-gray-200 focus:border-[#01142a]'}`}
                  />
                  {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>}
                </div>

                {/* Nom */}
                <div data-error={errors.lastName ? true : undefined}>
                  <label className="block text-xs font-light uppercase tracking-widest text-gray-400 mb-2">
                    Nom <span className="text-[#862637]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b py-2 text-base text-[#01142a] focus:outline-none transition-colors ${errors.lastName ? 'border-red-400' : 'border-gray-200 focus:border-[#01142a]'}`}
                  />
                  {errors.lastName && <p className="text-xs text-red-400 mt-1">{errors.lastName}</p>}
                </div>

                {/* Téléphone */}
                <div data-error={errors.phone ? true : undefined}>
                  <label className="block text-xs font-light uppercase tracking-widest text-gray-400 mb-2">
                    Téléphone <span className="text-[#862637]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b py-2 text-base text-[#01142a] focus:outline-none transition-colors ${errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-[#01142a]'}`}
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div data-error={errors.email ? true : undefined}>
                  <label className="block text-xs font-light uppercase tracking-widest text-gray-400 mb-2">
                    Email professionnel <span className="text-[#862637]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b py-2 text-base text-[#01142a] focus:outline-none transition-colors ${errors.email ? 'border-red-400' : 'border-gray-200 focus:border-[#01142a]'}`}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Société */}
                <div className="sm:col-span-2" data-error={errors.company ? true : undefined}>
                  <label className="block text-xs font-light uppercase tracking-widest text-gray-400 mb-2">
                    Nom de société <span className="text-[#862637]">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b py-2 text-base text-[#01142a] focus:outline-none transition-colors ${errors.company ? 'border-red-400' : 'border-gray-200 focus:border-[#01142a]'}`}
                  />
                  {errors.company && <p className="text-xs text-red-400 mt-1">{errors.company}</p>}
                </div>
              </div>
            </section>

            {/* ── Section 2 : Votre événement ── */}
            <section>
              <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-1">02</p>
              <h2 className="text-lg font-light text-[#01142a] mb-8" style={{ fontFamily: 'Playfair Display' }}>
                Votre événement
              </h2>

              {/* Choix de l'espace */}
              <div className="mb-8" data-error={errors.space ? true : undefined}>
                <label className="block text-xs font-light uppercase tracking-widest text-gray-400 mb-4">
                  Espace souhaité <span className="text-[#862637]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {spaces.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setForm((f) => ({ ...f, space: s.id }));
                        if (errors.space) setErrors((err) => ({ ...err, space: undefined }));
                      }}
                      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 text-left ${
                        form.space === s.id
                          ? 'border-[#01142a] shadow-md'
                          : 'border-[#e5e5e5] hover:border-[#01142a]/40'
                      }`}
                    >
                      <div className="aspect-[3/2] overflow-hidden">
                        <img
                          src={s.image}
                          alt={s.label}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-light text-[#01142a] leading-tight">{s.label}</p>
                        <p className="text-xs font-light text-gray-400 mt-0.5">{s.location}</p>
                        <p className="text-xs font-light text-gray-400">{s.capacity}</p>
                      </div>
                      {form.space === s.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#01142a] flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {errors.space && <p className="text-xs text-red-400 mt-2">{errors.space}</p>}
              </div>

              {/* Date + Créneau */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div data-error={errors.date ? true : undefined}>
                  <label className="block text-xs font-light uppercase tracking-widest text-gray-400 mb-2">
                    Date souhaitée <span className="text-[#862637]">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full bg-transparent border-b py-2 text-base text-[#01142a] focus:outline-none transition-colors ${errors.date ? 'border-red-400' : 'border-gray-200 focus:border-[#01142a]'}`}
                  />
                  {errors.date && <p className="text-xs text-red-400 mt-1">{errors.date}</p>}
                </div>

                <div data-error={errors.guests ? true : undefined}>
                  <label className="block text-xs font-light uppercase tracking-widest text-gray-400 mb-2">
                    Nombre de personnes <span className="text-[#862637]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b py-2 text-base text-[#01142a] focus:outline-none appearance-none cursor-pointer transition-colors ${errors.guests ? 'border-red-400' : 'border-gray-200 focus:border-[#01142a]'}`}
                    >
                      <option value="">Sélectionner</option>
                      {guestOptions.map((o) => (
                        <option key={o} value={o}>{o} personnes</option>
                      ))}
                    </select>
                    <Users className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" strokeWidth={1.5} />
                  </div>
                  {errors.guests && <p className="text-xs text-red-400 mt-1">{errors.guests}</p>}
                </div>
              </div>

              {/* Créneau horaire */}
              <div data-error={errors.timeSlot ? true : undefined}>
                <label className="block text-xs font-light uppercase tracking-widest text-gray-400 mb-4">
                  Créneau horaire <span className="text-[#862637]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setForm((f) => ({ ...f, timeSlot: t.id }));
                        if (errors.timeSlot) setErrors((err) => ({ ...err, timeSlot: undefined }));
                      }}
                      className={`border rounded-xl p-4 text-left transition-all duration-200 ${
                        form.timeSlot === t.id
                          ? 'border-[#01142a] bg-[#01142a] text-white'
                          : 'border-[#e5e5e5] text-[#01142a] hover:border-[#01142a]/40'
                      }`}
                    >
                      <p className="text-xs font-light leading-tight mb-1">{t.label}</p>
                      <p className={`text-xs font-light ${form.timeSlot === t.id ? 'text-white/60' : 'text-gray-400'}`}>{t.hours}</p>
                    </button>
                  ))}
                </div>
                {errors.timeSlot && <p className="text-xs text-red-400 mt-2">{errors.timeSlot}</p>}
              </div>
            </section>

            {/* ── Section 3 : Services ── */}
            <section>
              <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-1">03</p>
              <h2 className="text-lg font-light text-[#01142a] mb-2" style={{ fontFamily: 'Playfair Display' }}>
                Services souhaités
              </h2>
              <p className="text-xs font-light text-gray-400 mb-6">Optionnel — un chef ou traiteur peut être organisé sur demande</p>

              <div className="flex flex-wrap gap-3">
                {serviceOptions.map((s) => {
                  const selected = form.services.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-light transition-all duration-200 ${
                        selected
                          ? 'border-[#862637] bg-[#862637] text-white'
                          : 'border-[#e5e5e5] text-[#01142a] hover:border-[#862637]/40'
                      }`}
                    >
                      {selected && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                      {s}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ── Section 4 : Commentaires ── */}
            <section>
              <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-1">04</p>
              <h2 className="text-lg font-light text-[#01142a] mb-6" style={{ fontFamily: 'Playfair Display' }}>
                Commentaires additionnels
              </h2>
              <textarea
                name="comments"
                value={form.comments}
                onChange={handleChange}
                rows={4}
                placeholder="Besoins spécifiques, questions, contexte de l'événement..."
                className="w-full bg-transparent border-b border-gray-200 py-2 text-base text-[#01142a] focus:outline-none focus:border-[#01142a] resize-none transition-colors placeholder:text-gray-300 font-light"
              />
            </section>

            {/* Submit */}
            {submitError && (
              <p className="text-sm text-red-500 font-light">{submitError}</p>
            )}

            <div className="pt-2">
              <p className="text-xs font-light text-gray-400 mb-6">
                Les champs marqués <span className="text-[#862637]">*</span> sont obligatoires. Vous recevrez une confirmation sous 24h.
              </p>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#862637] text-[#fee1d4] px-12 py-4 rounded-lg text-xs tracking-[0.2em] uppercase font-light hover:bg-[#01142a] hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                {!isSubmitting && <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
