import React from 'react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { eventConfig } from '../../data/event';
import { brandContent } from '../../data/content';
import { Calendar, MapPin, ArrowRight, Quote, Sparkles } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  return (
    <section className="relative bg-white pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Subtle background architectural line motif */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0B294B 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      <Container>
        {/* Editorial Top Eyebrow Grid */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-navy-900 uppercase tracking-wider">Registrations Open</span>
            <span>•</span>
            <span>Ages {eventConfig.audience}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Organised by <strong className="text-navy-900">{brandContent.organiserName}</strong></span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="flex items-center gap-1 font-semibold text-navy-800">
              <MapPin className="w-3.5 h-3.5 text-navy-700" />
              {eventConfig.venue.city}, Telangana
            </span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 border border-navy-100/80 text-navy-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>{eventConfig.badge}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-navy-950 leading-[1.05]">
                ONE LIFE.<br />
                <span className="text-navy-700">ONE DESIRE.</span><br />
                <span className="text-gold-500">ONE PURPOSE.</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-slate-600 max-w-xl font-normal leading-relaxed text-balance">
              A conference designed to inspire and equip young people to live for Christ, glorify Christ, and proclaim His Gospel.
            </p>

            {/* Three Pillar Mini Bar */}
            <div className="flex flex-wrap gap-2 pt-1 pb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-50 text-navy-900 border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-700" />
                To live for Christ
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-50 text-navy-900 border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                To glorify God
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-50 text-navy-900 border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-950" />
                To proclaim the Gospel
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onRegisterClick}
                icon={<ArrowRight className="w-4 h-4" />}
                className="py-4 px-8 text-base shadow-card bg-navy-900 hover:bg-navy-950"
              >
                REGISTER NOW
              </Button>
              <Button
                variant="secondary"
                size="lg"
                as="a"
                href="#what-is-crosslife"
                className="py-4 px-8 text-base"
              >
                DISCOVER CROSSLIFE
              </Button>
            </div>

            {/* Date & Rate Quick Pill */}
            <div className="pt-4 flex items-center gap-3 text-xs text-slate-500">
              <span className="font-semibold text-navy-900 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-navy-700" />
                {eventConfig.dates}
              </span>
              <span>•</span>
              <span>Early bird ₹{eventConfig.earlyBirdPrice.toLocaleString('en-IN')} (Save ₹{eventConfig.discount} with code <strong className="text-navy-900">{eventConfig.promoCode}</strong>)</span>
            </div>
          </div>

          {/* Right Column: Visual Composition & Scripture (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Visual Card Composition */}
            <div className="relative">
              {/* Main Image Frame (Auditorium & Pulpit) */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-navy-950 aspect-[4/3] group">
                <img
                  src="/images/preaching.jpg"
                  alt="Word of God being preached at CrossLife Conference"
                  className="w-full h-full object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] font-bold tracking-widest uppercase text-gold-300 mb-1">
                    Gospel-Centred Preaching
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    Sitting under the authoritative and sufficient Word of God
                  </div>
                </div>
              </div>

              {/* 1 Timothy 4:12 Scripture Box (Overlaid) */}
              <div className="mt-4 sm:-mt-10 sm:ml-8 relative z-10 bg-navy-900 text-white p-6 rounded-2xl shadow-xl border border-navy-800">
                <div className="flex items-start gap-3">
                  <Quote className="w-6 h-6 text-gold-400 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base font-serif italic text-slate-200 leading-relaxed">
                      “{brandContent.scriptureQuote.text}”
                    </p>
                    <div className="text-xs font-bold text-gold-400 tracking-wider uppercase text-right">
                      — {brandContent.scriptureQuote.verse}
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner Decorative Accent */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-20 h-20 bg-gold-400/20 rounded-full blur-xl pointer-events-none" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
