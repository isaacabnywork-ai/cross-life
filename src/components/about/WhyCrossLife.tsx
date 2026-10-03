import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { brandContent } from '../../data/content';
import { Church, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { WhyCrossLifeSectionData } from '../../types/cms';

interface WhyCrossLifeProps {
  data?: WhyCrossLifeSectionData;
}

export const WhyCrossLife: React.FC<WhyCrossLifeProps> = ({ data }) => {
  const badge = data?.badge || "A BEACON IN A DISTRACTED WORLD";
  const heading = data?.heading || "Why CrossLife?";
  const paragraphs = (data?.paragraphs && data.paragraphs.length > 0)
    ? data.paragraphs
    : brandContent.whyCrossLife.paragraphs;

  return (
    <Section variant="white" spacing="xl" id="why">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Collage (5 cols) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 aspect-[4/5] bg-navy-950 group">
              <img
                src="/images/singing.jpg"
                alt="Worship and singing at CrossLife"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-1">
                  Rooted in the Local Church
                </span>
                <p className="text-sm text-slate-200">
                  Calling a generation away from superficial hype into deep, biblical communion with Christ.
                </p>
              </div>
            </div>

            {/* Overlaid stat/quote callout */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-card border border-slate-200/80 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-navy-100/70 text-navy-900 flex items-center justify-center font-bold">
                  <Church className="w-5 h-5 text-navy-800" />
                </div>
                <div>
                  <div className="text-xs font-bold text-navy-950 uppercase tracking-wider">Church Centered</div>
                  <div className="text-[11px] text-slate-500">Not replacing the local church</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Empowering the next generation to be deeply invested members in their local assemblies.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div>
              <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-navy-100 text-navy-800 border border-navy-200/50">
                {badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-950 tracking-tight leading-[1.15]">
                {heading}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              {paragraphs[0]}
            </p>

            {paragraphs[1] && (
              <p className="text-base text-slate-600 leading-relaxed">
                {paragraphs[1]}
              </p>
            )}

            {paragraphs[2] && (
              <div className="p-6 rounded-2xl bg-navy-50/70 border-l-4 border-navy-800 space-y-2">
                <h4 className="text-sm font-bold text-navy-950 uppercase tracking-wide">
                  A Unique Three-Fold Convergence
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {paragraphs[2]}
                </p>
              </div>
            )}

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-navy-700 transition-colors group"
              >
                <span>Read Full CrossLife Vision & Theological Foundation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
