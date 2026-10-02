import React from 'react';
import { Container } from './Container';
import { Button } from './Button';
import { ArrowRight, Sparkles, Calendar, MapPin, Tag } from 'lucide-react';
import { eventConfig } from '../../data/event';

interface CTASectionProps {
  onRegisterClick: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onRegisterClick }) => {
  return (
    <section className="relative bg-navy-950 text-white py-24 sm:py-32 overflow-hidden border-t border-navy-800">
      {/* Decorative gradient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-navy-700/30 via-gold-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      {/* Subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/15 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-widest mb-8">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Equip Indian Churches Presents</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
          ONE LIFE.<br className="hidden sm:inline" />
          <span className="text-slate-300"> ONE DESIRE.</span><br className="hidden sm:inline" />
          <span className="text-gold-400"> ONE PURPOSE.</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-base sm:text-xl text-slate-300 font-medium mb-10">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            Live for Christ.
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            Glorify Christ.
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            Proclaim Christ.
          </span>
        </div>

        <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg mb-12 leading-relaxed">
          Join hundreds of young men and women from across India for three unforgettable days of sound biblical preaching, earnest prayer, and gospel community.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="accent"
            onClick={onRegisterClick}
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto text-base px-8 py-4 shadow-lg shadow-gold-400/10"
          >
            REGISTER FOR CROSSLIFE
          </Button>
          <Button
            size="lg"
            variant="outline-white"
            as="a"
            href="/about"
            className="w-full sm:w-auto text-base px-8 py-4"
          >
            Discover CrossLife Vision
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span>{eventConfig.dates}</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            <span>{eventConfig.venue.name}, {eventConfig.venue.city}</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-gold-400" />
            <span>Early Bird ₹{eventConfig.earlyBirdPrice.toLocaleString('en-IN')} (Code: {eventConfig.promoCode})</span>
          </span>
        </div>
      </Container>
    </section>
  );
};
