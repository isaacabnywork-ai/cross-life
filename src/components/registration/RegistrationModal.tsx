import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { eventConfig } from '../../data/event';
import { registrationConfig } from '../../config/site';
import { Check, Copy, Sparkles, Calendar, Clock, AlertCircle, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '../common/Button';
import { useCMS } from '../../context/CMSContext';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const { globalSettings } = useCMS();
  const regConfig = globalSettings?.registration;
  const isRegOpen = regConfig?.isOpen ?? true;
  const earlyBirdPrice = regConfig?.earlyBirdPrice ?? eventConfig.earlyBirdPrice;
  const regularPrice = regConfig?.regularPrice ?? eventConfig.regularPrice;
  const discount = regConfig?.discount ?? eventConfig.discount;
  const activePromoCode = (regConfig?.promoCode || eventConfig.promoCode).trim().toUpperCase();
  const eventDates = regConfig?.dates || eventConfig.dates;
  const directUrl = regConfig?.directUrl || registrationConfig.registrationUrl;
  const contactEmail = globalSettings?.email || 'contact@crosslife.in';

  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    city: '',
    church: '',
    promoCode: activePromoCode,
  });

  const isPromoValid = formData.promoCode.trim().toUpperCase() === activePromoCode;
  const finalPrice = isPromoValid ? Math.max(0, earlyBirdPrice - discount) : earlyBirdPrice;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activePromoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrimaryClick = () => {
    if (directUrl) {
      window.open(directUrl, '_blank', 'noopener,noreferrer');
      onClose();
    } else {
      setShowForm(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetState = () => {
    setShowForm(false);
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={resetState} maxWidth="lg" title="CrossLife 2027 Registration">
      <div className="max-h-[85vh] overflow-y-auto p-5 sm:p-7">
        {!isRegOpen ? (
          /* Registration Closed State */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-navy-950">Registration is Currently Closed</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Ticket registrations for CrossLife {eventConfig.year} are not currently active. If you have an inquiry or group request, please contact our team.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Organisers</span>
              </a>
              <Button variant="outline" onClick={resetState}>
                Close
              </Button>
            </div>
          </div>
        ) : !showForm ? (
          <div>
            {/* Header: Logo and Audience Pill */}
            <div className="flex flex-col items-center text-center pb-5 border-b border-slate-100">
              <div className="h-10 mb-3 flex items-center justify-center">
                <img
                  src={globalSettings?.logoUrl || "/images/crosslife-logo.webp"}
                  alt="CrossLife"
                  className="h-9 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-navy-50 text-navy-800 border border-navy-100">
                {eventConfig.audience} • {eventConfig.gender}
              </span>
            </div>

            {/* Schedule & Dates Grid */}
            <div className="grid grid-cols-2 gap-3 my-5">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5 text-navy-700" />
                  <span>SCHEDULE</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-navy-950">
                  {eventConfig.schedule}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Starts {eventConfig.startTime}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <Calendar className="w-3.5 h-3.5 text-navy-700" />
                  <span>EVENT DATES</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-navy-950">
                  {eventDates}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{eventConfig.venue.city}, Telangana</div>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-4 rounded-xl border-2 border-navy-700 bg-navy-50/40 relative text-center">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide bg-navy-900 text-white">
                  Current Tier
                </div>
                <div className="text-xs font-bold text-navy-700 uppercase tracking-wider mt-1">
                  EARLY BIRD
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
                  ₹{earlyBirdPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">/ person</div>
                <div className="text-[11px] text-amber-700 font-medium mt-1">Until {eventConfig.earlyBirdDeadline}</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white text-center opacity-85">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  REGULAR
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-700 mt-1">
                  ₹{regularPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">/ person</div>
                <div className="text-[11px] text-slate-400 mt-1">From August 1st, 2027</div>
              </div>
            </div>

            {/* Promo Code Banner */}
            {discount > 0 && (
              <div className="p-3.5 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50/70 mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <div className="text-sm font-extrabold text-navy-950">
                    Save ₹{discount} on Early Bird!
                  </div>
                  <div className="text-xs text-amber-900">
                    Apply coupon during checkout for instant discount
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm px-3 py-1.5 rounded-lg bg-amber-500 text-white shadow-sm select-all">
                    {activePromoCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-1.5 rounded-md hover:bg-amber-200/60 text-amber-900 transition-colors"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Free Book Gift Box */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 mb-5 flex items-center gap-4">
              <img
                src={eventConfig.freeBook.image}
                alt={eventConfig.freeBook.title}
                className="w-14 sm:w-16 h-20 object-cover rounded shadow-md border border-emerald-200 shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded mb-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  {eventConfig.freeBook.badge}
                </span>
                <div className="text-sm font-bold text-emerald-950 leading-tight">
                  “{eventConfig.freeBook.title}” <span className="font-normal text-xs text-emerald-800">by {eventConfig.freeBook.author}</span>
                </div>
                <div className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Register Now & Receive Your FREE Copy — A special physical book gift for every registered participant.
                </div>
              </div>
            </div>

            {/* Language & Seat Notice */}
            <div className="text-[11px] text-slate-500 space-y-1 mb-5 text-center">
              <div className="font-medium text-amber-800 bg-amber-50/50 py-1 px-2.5 rounded inline-flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{eventConfig.languageNotice}</span>
              </div>
              <div>{eventConfig.seatsNotice} Lodging and meals are fully included.</div>
            </div>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handlePrimaryClick}
              className="w-full text-base py-3.5 bg-navy-950 hover:bg-navy-900"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {directUrl ? 'Proceed to Registration' : 'Register Now & Claim Gift'}
            </Button>
          </div>
        ) : !submitted ? (
          <div>
            {/* Form Step */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-navy-950">Registration Details</h3>
                <p className="text-xs text-slate-500">CrossLife Conference {eventConfig.year} • Hyderabad</p>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-xs text-navy-700 hover:underline font-semibold"
              >
                ← Back to Overview
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-navy-700 focus:ring-1 focus:ring-navy-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-navy-700 focus:ring-1 focus:ring-navy-700 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-navy-700 focus:ring-1 focus:ring-navy-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age (18–25) *</label>
                  <input
                    type="number"
                    min="18"
                    max="25"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="e.g. 21"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-navy-700 focus:ring-1 focus:ring-navy-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-navy-700 focus:ring-1 focus:ring-navy-700 outline-none bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City / State *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-navy-700 focus:ring-1 focus:ring-navy-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Home / Local Church *</label>
                  <input
                    type="text"
                    required
                    value={formData.church}
                    onChange={(e) => setFormData({ ...formData, church: e.target.value })}
                    placeholder="Your church name"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-navy-700 focus:ring-1 focus:ring-navy-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.promoCode}
                    onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                    placeholder={activePromoCode}
                    className="flex-1 px-3 py-2 text-sm font-mono uppercase rounded-lg border border-slate-300 focus:border-navy-700 outline-none"
                  />
                  {formData.promoCode.trim().length > 0 && (
                    isPromoValid ? (
                      <div className="px-3 py-2 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 flex items-center">
                        ₹{discount} OFF Applied
                      </div>
                    ) : (
                      <div className="px-3 py-2 text-xs font-bold rounded-lg bg-rose-100 text-rose-800 flex items-center">
                        Invalid Code
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Early Bird Registration (Lodging & Meals included):</span>
                  <span>₹{earlyBirdPrice.toLocaleString('en-IN')}</span>
                </div>
                {isPromoValid && discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount (Code: {activePromoCode}):</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-navy-950 font-bold text-sm pt-1 border-t border-slate-200">
                  <span>Total Payable:</span>
                  <span className="text-base text-navy-900">₹{finalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full text-base py-3"
                icon={<ShieldCheck className="w-4 h-4" />}
              >
                Complete Registration (₹{finalPrice.toLocaleString('en-IN')})
              </Button>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-navy-950 mb-2">Registration Received!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
              Thank you, <strong className="text-navy-900">{formData.fullName}</strong>. Your provisional spot for CrossLife {eventConfig.year} has been reserved.
            </p>

            <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-200 max-w-md mx-auto text-xs space-y-2 mb-6">
              <div><strong className="text-slate-700">Dates:</strong> {eventDates}</div>
              <div><strong className="text-slate-700">Venue:</strong> {globalSettings?.venueAddress || eventConfig.venue.fullAddress}</div>
              <div><strong className="text-slate-700">Amount:</strong> ₹{finalPrice.toLocaleString('en-IN')}</div>
              <div><strong className="text-slate-700">Free Book:</strong> “{eventConfig.freeBook.title}” by {eventConfig.freeBook.author} (will be handed to you at on-site check-in)</div>
            </div>

            <p className="text-xs text-slate-500 mb-6">
              Payment instructions and attendee confirmation have been dispatched to <strong>{formData.email}</strong>.
            </p>

            <Button variant="primary" onClick={resetState}>
              Close Window
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RegistrationModal;
