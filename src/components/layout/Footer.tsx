import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { siteConfig } from '../../config/site';
import { eventConfig } from '../../data/event';
import { Mail, MapPin } from 'lucide-react';

import { useCMS } from '../../context/CMSContext';

interface FooterProps {
  onRegisterClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRegisterClick }) => {
  const { globalSettings } = useCMS();
  const footerSettings = globalSettings.footer;
  const socials = globalSettings.socials;

  return (
    <footer className="bg-navy-950 text-white pt-16 pb-12 border-t border-navy-850">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-850">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={globalSettings.logoUrl || "/images/crosslife-logo.webp"}
                alt={globalSettings.siteName || "CrossLife"}
                className="h-10 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.footer-logo-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <div className="footer-logo-fallback hidden font-extrabold text-2xl text-white tracking-tight">
                Cross<span className="text-gold-400">Life</span>
              </div>
            </Link>

            <div className="text-gold-400 font-bold tracking-widest text-xs uppercase">
              {globalSettings.tagline || "ONE LIFE. ONE DESIRE. ONE PURPOSE."}
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {footerSettings.aboutText || "CrossLife is a young people’s conference organised by Equip Indian Churches to inspire and equip young people to live for Christ, glorify Christ, and proclaim His Gospel."}
            </p>

            <div className="pt-2 text-xs text-slate-400">
              <span className="text-slate-500">Organised by:</span>{' '}
              <a
                href={globalSettings.organiserUrl || "https://equipindianchurches.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-200 hover:text-gold-300 underline underline-offset-2"
              >
                {globalSettings.organiserName || siteConfig.organiser}
              </a>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={socials.instagram || siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CrossLife Instagram"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-gold-300 hover:bg-navy-850 hover:border-gold-400/40 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CrossLife WhatsApp Channel"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:bg-navy-850 hover:border-emerald-400/40 transition-colors font-bold text-xs"
              >
                WA
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CrossLife YouTube"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-navy-850 hover:border-red-400/40 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/about" className="hover:text-gold-300 transition-colors">About CrossLife</Link></li>
              <li><Link to="/about#why" className="hover:text-gold-300 transition-colors">Why CrossLife</Link></li>
              <li><Link to="/about#unique" className="hover:text-gold-300 transition-colors">What's Unique</Link></li>
              <li><Link to="/about#goals" className="hover:text-gold-300 transition-colors">Hopes & Goals</Link></li>
              <li><Link to="/speakers" className="hover:text-gold-300 transition-colors">Speakers Lineup</Link></li>
              <li><Link to="/partners" className="hover:text-gold-300 transition-colors">Partners & Sponsors</Link></li>
              <li><Link to="/statement-of-faith" className="hover:text-gold-300 transition-colors font-medium text-slate-200">Statement of Faith</Link></li>
            </ul>
          </div>

          {/* Column 3: Conference Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-4">
              Conference 2027
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/conference#overview" className="hover:text-gold-300 transition-colors">Event Dates: {eventConfig.dates}</Link></li>
              <li><Link to="/conference#venue" className="hover:text-gold-300 transition-colors">{eventConfig.venue.name}</Link></li>
              <li><Link to="/conference#venue" className="hover:text-gold-300 transition-colors">{eventConfig.venue.city}, {eventConfig.venue.state}</Link></li>
              <li><Link to="/conference#pricing" className="hover:text-gold-300 transition-colors">Early Bird: ₹{eventConfig.earlyBirdPrice.toLocaleString('en-IN')}</Link></li>
              <li><Link to="/conference#free-book" className="hover:text-gold-300 transition-colors">Free Book Gift</Link></li>
              <li><Link to="/conference#bookstore" className="hover:text-gold-300 transition-colors">Dedicated Bookstore</Link></li>
              <li><Link to="/faq" className="hover:text-gold-300 transition-colors">FAQs & Travel Guide</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Registration Trigger */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-4">
              Contact & Location
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{globalSettings.venueAddress || eventConfig.venue.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${globalSettings.email || siteConfig.email}`} className="hover:text-gold-300">
                  {globalSettings.email || siteConfig.email}
                </a>
              </div>
              <div className="flex flex-col gap-1 pl-6 text-slate-300">
                {(globalSettings.phones || siteConfig.phones).map((p, idx) => (
                  <a key={idx} href={`tel:${p.replace(/\s+/g, '')}`} className="hover:text-gold-300">
                    {p}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onRegisterClick}
                className="w-full text-center px-4 py-2.5 rounded-lg bg-gold-400 hover:bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Register For 2027
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>{footerSettings.copyrightText || "© 2026 - All Rights Reserved Powered by"} <a href={footerSettings.poweredByUrl || "http://abnyweb.in"} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white underline underline-offset-2">{footerSettings.poweredByText || "ABNY Web"}</a></p>
          <div className="flex items-center gap-6">
            <Link to="/statement-of-faith" className="hover:text-slate-200 transition-colors">Statement of Faith</Link>
            <Link to="/faq" className="hover:text-slate-200 transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">Contact</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
