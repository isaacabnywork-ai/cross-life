import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X, Calendar } from 'lucide-react';
import { Button } from '../common/Button';
import { eventConfig } from '../../data/event';
import { siteConfig } from '../../config/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onRegisterClick }) => {
  const [openSection, setOpenSection] = useState<string | null>('about');

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
        {/* Top bar with Logo & Close */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <img
              src="/images/crosslife-logo.webp"
              alt="CrossLife"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-extrabold text-navy-950 text-lg tracking-tight">CrossLife</span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-navy-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="p-5 space-y-2 flex-1">
          {/* ABOUT ACCORDION */}
          <div className="border-b border-slate-100 pb-2">
            <button
              onClick={() => toggleSection('about')}
              className="flex items-center justify-between w-full py-2.5 text-base font-bold text-navy-950 text-left"
            >
              <span>ABOUT</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSection === 'about' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'about' && (
              <div className="pl-3 py-2 space-y-2 text-sm text-slate-600">
                <Link to="/about#about" onClick={onClose} className="block py-1.5 hover:text-navy-900">About CrossLife</Link>
                <Link to="/about#why" onClick={onClose} className="block py-1.5 hover:text-navy-900">Why CrossLife</Link>
                <Link to="/about#who" onClick={onClose} className="block py-1.5 hover:text-navy-900">Who Is CrossLife For?</Link>
                <Link to="/about#unique" onClick={onClose} className="block py-1.5 hover:text-navy-900">What's Unique (Substance Over Style)</Link>
                <Link to="/about#goals" onClick={onClose} className="block py-1.5 hover:text-navy-900">Hopes & Goals</Link>
                <Link to="/statement-of-faith" onClick={onClose} className="block py-1.5 font-semibold text-navy-800 hover:text-navy-950">Statement of Faith (11 Articles)</Link>
              </div>
            )}
          </div>

          {/* CONFERENCE ACCORDION */}
          <div className="border-b border-slate-100 pb-2">
            <button
              onClick={() => toggleSection('conference')}
              className="flex items-center justify-between w-full py-2.5 text-base font-bold text-navy-950 text-left"
            >
              <span>CONFERENCE</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSection === 'conference' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'conference' && (
              <div className="pl-3 py-2 space-y-2 text-sm text-slate-600">
                <Link to="/conference" onClick={onClose} className="block py-1.5 hover:text-navy-900">Event Overview</Link>
                <Link to="/speakers" onClick={onClose} className="block py-1.5 hover:text-navy-900">Speakers (Pastors from Across India)</Link>
                <Link to="/conference#venue" onClick={onClose} className="block py-1.5 hover:text-navy-900">Venue (Ashirwad Hyderabad)</Link>
                <Link to="/conference#pricing" onClick={onClose} className="block py-1.5 hover:text-navy-900">Pricing & Early Bird Rates</Link>
                <Link to="/conference#free-book" onClick={onClose} className="block py-1.5 text-emerald-800 font-medium">Claim Free Book Gift</Link>
                <Link to="/conference#bookstore" onClick={onClose} className="block py-1.5 hover:text-navy-900">Dedicated Bookstore (For The Truth)</Link>
              </div>
            )}
          </div>

          {/* DIRECT LINKS */}
          <Link
            to="/speakers"
            onClick={onClose}
            className="block py-3 text-base font-bold text-navy-950 hover:text-navy-700 border-b border-slate-100"
          >
            SPEAKERS
          </Link>
          <Link
            to="/partners"
            onClick={onClose}
            className="block py-3 text-base font-bold text-navy-950 hover:text-navy-700 border-b border-slate-100"
          >
            PARTNERS
          </Link>
          <Link
            to="/faq"
            onClick={onClose}
            className="block py-3 text-base font-bold text-navy-950 hover:text-navy-700 border-b border-slate-100"
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            onClick={onClose}
            className="block py-3 text-base font-bold text-navy-950 hover:text-navy-700 border-b border-slate-100"
          >
            CONTACT
          </Link>
          <Link
            to="/statement-of-faith"
            onClick={onClose}
            className="block py-3 text-base font-bold text-navy-950 hover:text-navy-700"
          >
            STATEMENT OF FAITH
          </Link>
        </div>

        {/* Bottom Action Area */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-3">
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium text-navy-800">
              <Calendar className="w-3.5 h-3.5 text-navy-600" />
              <span>{eventConfig.dates}</span>
            </span>
            <span className="font-semibold text-emerald-700">Code: {eventConfig.promoCode} (-₹500)</span>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              onClose();
              onRegisterClick();
            }}
            className="w-full py-3.5 bg-navy-950 text-white"
          >
            REGISTER NOW
          </Button>

          <div className="text-center">
            <span className="text-[11px] text-slate-500">Organised by </span>
            <span className="text-[11px] font-bold text-navy-900">{siteConfig.organiser}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
