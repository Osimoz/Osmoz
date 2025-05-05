import React, { useState, useEffect } from 'react';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';


// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_5dizo3p"; // Your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_ffl7k88"; // Your EmailJS template ID
const EMAILJS_PUBLIC_KEY = "1Q_BLfh61Y9oi6ls_"; // Your EmailJS public key

export default function Contact() {
  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          company: formData.company || 'Non spécifiée',
          message: formData.message,
          to_email: 'contact@osmoz.work',
        }
      );
      
      console.log('Email sent successfully:', response);
      
      // Success
      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
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
          {/* Form section */}
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
          
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-light mb-4"> Contactez-nous </h3>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  {error && (
                    <div className="text-red-500 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-6 py-3 rounded-lg text-sm tracking-widest font-light hover:bg-white hover:text-black border border-black transition duration-300 inline-flex items-center gap-2"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
                
                {/* Contact details - keeps your existing styling */}
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
