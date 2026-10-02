import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { brandContent } from '../../data/content';
import { Cross, Heart, Megaphone, ArrowUpRight } from 'lucide-react';

export const ThreePillars: React.FC = () => {
  const iconComponents = [Cross, Heart, Megaphone];

  return (
    <Section variant="dark-navy" spacing="xl" id="what-is-crosslife" className="relative">
      {/* Background Architectural Accent Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #F4C34E 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      <Container>
        {/* Editorial Section Introduction */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full bg-gold-400/15 text-gold-300 border border-gold-400/30">
            THE CROSSLIFE FOUNDATION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            What is CrossLife?
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-slate-300 leading-relaxed font-light">
            {brandContent.whatIsCrossLife.statement}
          </p>
        </div>

        {/* The 3 Core Pillars - Architectural Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {brandContent.threePillars.map((item, idx) => {
            const IconComponent = iconComponents[idx];
            return (
              <div
                key={idx}
                className="group relative bg-navy-900/90 rounded-2xl p-8 border border-navy-800 hover:border-gold-400/60 transition-all duration-300 hover:-translate-y-1 shadow-card flex flex-col justify-between"
              >
                {/* Subtle top indicator line */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent group-hover:via-gold-400 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-xl bg-navy-950/80 border border-navy-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-gold-400" />
                    </div>
                  <span className="text-3xl font-black text-slate-700/60 font-mono group-hover:text-gold-400/40 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block">
                    {item.pillar}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    {item.subtitle}
                  </h3>
                </div>

                <div className="text-sm font-semibold text-slate-200 mb-3 font-serif italic">
                  “{item.meaning}”
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-navy-800/80 flex items-center text-xs text-slate-400 font-medium group-hover:text-gold-300 transition-colors">
                <span>Theology in Practice</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
        </div>
      </Container>
    </Section>
  );
};
