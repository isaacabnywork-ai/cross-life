import React, { useState } from 'react';
import { siteConfig } from '../../config/site';
import { eventConfig } from '../../data/event';
import { Button } from '../common/Button';
import { Phone, Mail, MapPin, Send, CheckCircle2, Shield, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaChecked) {
      setError('Please check the verification box before sending.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsCaptchaChecked(false);
    setSubmitted(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-card border border-slate-200/80 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Direct Contact Information (5 cols) */}
        <div className="lg:col-span-5 bg-navy-950 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-8 relative z-10">
            <div>
              <span className="text-xs font-bold text-gold-400 tracking-widest uppercase block mb-2">
                GET IN TOUCH
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Contact the CrossLife Team
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Have questions about registration, travel coordination, or group participation? We are here to help.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-6">
              {/* Call Us */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-gold-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">
                    Call Us
                  </h4>
                  <div className="space-y-1 text-sm text-slate-200 font-medium">
                    {siteConfig.phones.map((phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="block hover:text-gold-300 transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-gold-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">
                    Email Us
                  </h4>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-slate-200 hover:text-gold-300 transition-colors block"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-gold-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">
                    Venue
                  </h4>
                  <p className="text-sm text-slate-200 leading-snug">
                    {eventConfig.venue.name},<br />
                    {eventConfig.venue.city}, {eventConfig.venue.state}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-navy-850 text-xs text-slate-400 relative z-10">
            <span>Organised by </span>
            <strong className="text-white">{siteConfig.organiser}</strong>
          </div>
        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12">
          {!submitted ? (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-navy-950 mb-1">
                  You can write to us
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Fill out the form below and we will get back to you shortly.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-navy-700 focus:ring-1 focus:ring-navy-700 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-navy-700 focus:ring-1 focus:ring-navy-700 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98867 69948"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-navy-700 focus:ring-1 focus:ring-navy-700 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you with CrossLife?"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-navy-700 focus:ring-1 focus:ring-navy-700 outline-none transition-colors"
                  />
                </div>

                {/* reCAPTCHA Placeholder Box as specified in Prompt */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl inline-flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="recaptcha"
                    checked={isCaptchaChecked}
                    onChange={(e) => setIsCaptchaChecked(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-navy-800 focus:ring-navy-800 cursor-pointer"
                  />
                  <label htmlFor="recaptcha" className="text-xs text-slate-700 font-medium cursor-pointer flex items-center gap-2">
                    <span>I'm not a robot</span>
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                  </label>
                </div>

                <div>
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    icon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto px-8"
                  >
                    Submit Message
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            /* Success State */
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-navy-950">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to CrossLife. A member of our coordination team from Equip Indian Churches will review your note and respond via email or phone.
              </p>
              <div className="pt-4">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Send Another Message
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
