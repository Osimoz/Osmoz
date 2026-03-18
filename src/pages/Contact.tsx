import React, { useState, useEffect } from 'react';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const EMAILJS_SERVICE_ID = 'service_5dizo3p';
const EMAILJS_TEMPLATE_ID = 'template_ffl7k88';
const EMAILJS_PUBLIC_KEY = '1Q_BLfh61Y9oi6ls_';

export default function Contact() {
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setError('Merci de remplir tous les champs.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: `${form.firstName} ${form.lastName}`,
        reply_to: form.email,
        phone: '',
        company: '',
        subject: 'Message via page Contact',
        message: form.message,
        to_email: 'contact@osmoz.work',
      });
      setIsSubmitted(true);
      setForm({ firstName: '', lastName: '', email: '', message: '' });
    } catch {
      setError("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact — OSMOZ | Nous écrire</title>
        <meta name="description" content="Une question sur nos espaces ? Contactez l'équipe Osmoz. Pour une réservation, utilisez notre formulaire dédié." />
        <link rel="canonical" href="https://osmoz.work/contact" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="pt-32 pb-24 bg-[#fbfbf3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-4">
              Nous écrire
            </p>
            <h1
              className="font-light text-[#01142a] mb-5"
              style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Contact
            </h1>
            <p className="text-base font-light text-gray-500 leading-relaxed">
              Une question, une demande particulière ? Écrivez-nous. Pour une réservation, utilisez{' '}
              <Link to="/reservation" className="text-[#862637] underline underline-offset-4 hover:text-[#01142a] transition-colors">
                notre formulaire dédié
              </Link>
              .
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl">
            {/* Form */}
            <div className="bg-white rounded-3xl border border-[#e5e5e5] p-8 sm:p-10">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <svg className="h-14 w-14 mx-auto mb-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#862637' }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-light text-[#01142a] mb-3">Message envoyé</h3>
                  <p className="text-sm font-light text-gray-500 mb-6">
                    Merci ! Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#862637] text-[#fee1d4] px-6 py-3 rounded-xl text-xs tracking-[0.2em] uppercase font-light hover:bg-[#01142a] hover:text-white transition-all duration-300"
                  >
                    Nouveau message
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-lg font-light text-[#01142a] mb-2">Votre message</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-light uppercase tracking-[0.15em] text-gray-500">Nom *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-0 border-b border-gray-200 px-0 py-2 text-base text-[#01142a] focus:border-[#862637] focus:ring-0 transition-colors"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-light uppercase tracking-[0.15em] text-gray-500">Prénom *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-0 border-b border-gray-200 px-0 py-2 text-base text-[#01142a] focus:border-[#862637] focus:ring-0 transition-colors"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-light uppercase tracking-[0.15em] text-gray-500">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-0 border-b border-gray-200 px-0 py-2 text-base text-[#01142a] focus:border-[#862637] focus:ring-0 transition-colors"
                      style={{ outline: 'none', boxShadow: 'none' }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-light uppercase tracking-[0.15em] text-gray-500">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-transparent border-0 border-b border-gray-200 px-0 py-2 text-base text-[#01142a] focus:border-[#862637] focus:ring-0 resize-none transition-colors"
                      style={{ outline: 'none', boxShadow: 'none' }}
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm font-light">{error}</p>}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[#862637] text-[#fee1d4] px-7 py-3.5 rounded-xl text-xs tracking-[0.2em] uppercase font-light hover:bg-[#01142a] hover:text-white transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? 'Envoi…' : 'Envoyer'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Coordonnées */}
            <div className="flex flex-col justify-center space-y-10">
              <div>
                <p className="text-xs font-light uppercase tracking-[0.3em] text-[#862637] mb-6">Nos coordonnées</p>
                <div className="space-y-5">
                  <a href="mailto:contact@osmoz.work" className="flex items-center gap-4 text-[#01142a] hover:text-[#862637] transition-colors">
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <span className="font-light text-sm">contact@osmoz.work</span>
                  </a>
                  <a href="tel:+33675186932" className="flex items-center gap-4 text-[#01142a] hover:text-[#862637] transition-colors">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <span className="font-light text-sm">+33 6 75 18 69 32</span>
                  </a>
                </div>
              </div>

              <div className="border border-[#e5e5e5] rounded-2xl p-7 bg-white">
                <p className="text-xs font-light uppercase tracking-[0.3em] text-gray-400 mb-3">Réserver un espace</p>
                <p className="text-sm font-light text-gray-500 leading-relaxed mb-5">
                  Pour une demande de réservation, de devis ou de disponibilité, utilisez notre formulaire dédié.
                </p>
                <Link
                  to="/reservation"
                  className="inline-flex items-center gap-2 bg-[#01142a] text-white px-6 py-3 rounded-xl text-xs tracking-[0.18em] uppercase font-light hover:bg-[#862637] hover:text-[#fee1d4] transition-all duration-300"
                >
                  Formulaire de réservation
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
