import React, { useState, useEffect } from 'react';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EmailJS functionality simulated for demo purposes
// In your actual implementation, you would import and use EmailJS

// EmailJS configuration (keeping your original values)
const EMAILJS_SERVICE_ID = "service_5dizo3p";
const EMAILJS_TEMPLATE_ID = "template_ffl7k88";
const EMAILJS_PUBLIC_KEY = "1Q_BLfh61Y9oi6ls_";

export default function Contact() {
  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    subject: 'Je souhaite'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // EmailJS implementation would go here:
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          reply_to: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          to_email: 'contact@osmoz.work',
        }
      );
      
      // Simulated success for demo
      console.log('Form data that would be sent:', formData);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setIsSubmitted(true);
      setFormData({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '', 
        company: '', 
        message: '',
        subject: 'Je souhaite'
      });
    } catch (err) {
      setError('Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-light mb-6">Contact</h1>
          <p className="text-xl font-light text-gray-600 italic" style={{ fontFamily: 'Playfair Display' }}>
            Vous cherchez un lieu à Paris pour organiser une réunion, un séminaire ou un événement sur mesure ? Contactez Osmoz pour une expérience professionnelle clé en main.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            {isSubmitted ? (
              <div className="text-center py-8">
                <svg 
                  className="h-16 w-16 mx-auto mb-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ color:'#862637' }}
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <h3 className="text-2xl font-light mb-4">Message envoyé</h3>
                <p className="text-gray-600 mb-6">
                  Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-black text-white px-6 py-3 rounded-lg text-sm tracking-widest font-light hover:bg-white hover:text-black border border-black transition duration-300"
                >
                  Nouveau message
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact form */}
                <div className="space-y-6">
                  <h3 className="text-xl font-light mb-6">Contactez-nous</h3>
                  
                  {/* Name fields in same row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Votre nom *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-2 text-gray-900 focus:border-black focus:ring-0 transition-colors"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Votre prénom *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-2 text-gray-900 focus:border-black focus:ring-0 transition-colors"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Contact details in same row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-2 text-gray-900 focus:border-black focus:ring-0 transition-colors"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Votre mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-2 text-gray-900 focus:border-black focus:ring-0 transition-colors"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Company and Subject in same row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Nom de société *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-2 text-gray-900 focus:border-black focus:ring-0 transition-colors"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      </label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-2 text-gray-900 focus:border-black focus:ring-0 appearance-none cursor-pointer transition-colors"
                          style={{ outline: 'none', boxShadow: 'none' }}
                        >
                          <option value="Je souhaite">Je souhaite</option>
                          <option value="Organiser un événement">Organiser un événement</option>
                          <option value="Réserver un espace">Réserver un espace</option>
                          <option value="Demander un devis">Demander un devis</option>
                          <option value="Autre demande">Autre demande</option>
                        </select>
                        <svg 
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-2 text-gray-900 focus:border-black focus:ring-0 resize-none transition-colors"
                      style={{ outline: 'none', boxShadow: 'none' }}
                    />
                  </div>
                  
                  {error && (
                    <div className="text-red-500 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-black text-white px-6 py-3 rounded-lg text-sm tracking-widest font-light hover:bg-white hover:text-black border border-black transition duration-300 inline-flex items-center gap-2"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Contact details - keeping your existing styling */}
                <div className="space-y-8">
                  <h3 className="text-xl font-light mb-4">Nos coordonnées</h3>
                  
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-gray-600" />
                    <a href="mailto:contact@osmoz.work" className="text-gray-600 hover:text-black transition-colors">
                      contact@osmoz.work
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-gray-600" />
                    <a href="tel:+33675186932" className="text-gray-600 hover:text-black transition-colors">
                      +33 6 75 18 69 32
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}