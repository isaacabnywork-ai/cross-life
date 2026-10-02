import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { brandContent } from '../../data/content';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, Shield, Users } from 'lucide-react';

interface WhatsUniqueProps {
  showFullText?: boolean;
}

export const WhatsUnique: React.FC<WhatsUniqueProps> = ({ showFullText = false }) => {
  return (
    <Section variant="dark-navy" spacing="xl" id="unique" className="relative overflow-hidden">
      {/* Editorial Watermark / Background Accent */}
      <div 
        className="absolute -right-20 top-1/2 -translate-y-1/2 text-[140px] md:text-[200px] font-black text-white/[0.02] select-none pointer-events-none font-sans"
        aria-hidden="true"
      >
        TRUTH
      </div>

      <Container>
        {/* Top Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full bg-gold-400/15 text-gold-300 border border-gold-400/30">
            THEOLOGICAL DISTINCTIVES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            What's Unique About CrossLife?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed font-light">
            CrossLife is not just another youth event—it's a call to wholehearted, gospel-centered discipleship for young people across India.
          </p>
        </div>

        {/* Sophisticated Dual Banner: SUBSTANCE OVER STYLE • TRUTH OVER TREND */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          <div className="relative p-8 sm:p-10 rounded-2xl bg-navy-900 border-2 border-navy-800 hover:border-gold-400/40 transition-colors shadow-card flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest uppercase text-gold-400 mb-3">
                PRIMARY COMMITMENT 01
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
                SUBSTANCE OVER STYLE
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                At a time when many youth gatherings focus on entertainment, hype, and emotionalism, CrossLife stands apart by placing the weighty, glorious truths of Scripture front and center.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-navy-800/80 text-xs font-semibold text-gold-300">
              Serious Biblical Preaching & Doctrine
            </div>
          </div>

          <div className="relative p-8 sm:p-10 rounded-2xl bg-navy-900 border-2 border-navy-800 hover:border-gold-400/40 transition-colors shadow-card flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest uppercase text-gold-400 mb-3">
                PRIMARY COMMITMENT 02
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
                TRUTH OVER TREND
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Cultural tides and youth ministry trends come and go. The eternal Word of God endures forever. We feed young minds and hearts with sound doctrine that withstands testing.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-navy-800/80 text-xs font-semibold text-gold-300">
              Unchanging Scripture Over Cultural Hype
            </div>
          </div>
        </div>

        {/* If Home: Show clean 4 pillars + CTA link. If About: Show full 6-paragraph prose */}
        {!showFullText ? (
          <div className="bg-navy-900/80 rounded-2xl p-6 sm:p-8 border border-navy-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="text-base sm:text-lg font-serif italic text-gold-300">
                “Come ready to be challenged, sharpened, encouraged, and fed—not by trends, but by truth.”
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300 pt-1 font-medium">
                <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-gold-400" /> Expository Sermons</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-gold-400" /> Sound Literature</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-gold-400" /> Fellowship</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-gold-400" /> Church Centered</span>
              </div>
            </div>

            <Link
              to="/about#unique"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-navy-950 font-bold text-xs sm:text-sm uppercase tracking-wide transition-all shrink-0 shadow-md"
            >
              <span>Read Full Vision</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Long-form Editorial Prose on About page */
          <div className="bg-navy-900/60 rounded-3xl p-8 sm:p-12 border border-navy-800/80 max-w-5xl mx-auto shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 text-slate-300 text-base leading-relaxed">
              <div className="space-y-6">
                <p className="text-lg text-white font-medium leading-relaxed">
                  {brandContent.whatsUnique.paragraphs[0]}
                </p>
                <p>
                  {brandContent.whatsUnique.paragraphs[1]}
                </p>
                <p>
                  {brandContent.whatsUnique.paragraphs[2]}
                </p>
              </div>

              <div className="space-y-6">
                <p>
                  {brandContent.whatsUnique.paragraphs[3]}
                </p>
                <div className="p-6 rounded-xl bg-navy-950 border-l-4 border-gold-400 text-slate-200">
                  <p className="font-serif italic text-base leading-relaxed">
                    “{brandContent.whatsUnique.paragraphs[4]}”
                  </p>
                </div>
                <p className="text-lg font-bold text-gold-400">
                  {brandContent.whatsUnique.paragraphs[5]}
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};
