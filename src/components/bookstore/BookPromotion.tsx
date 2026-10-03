import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { eventConfig } from '../../data/event';
import { Button } from '../common/Button';
import { Gift, ArrowRight, Check } from 'lucide-react';

import type { BookPromotionSectionData } from '../../types/cms';

interface BookPromotionProps {
  onRegisterClick: () => void;
  data?: BookPromotionSectionData;
}

export const BookPromotion: React.FC<BookPromotionProps> = ({ onRegisterClick, data }) => {
  const { freeBook } = eventConfig;
  const badge = data?.badge || freeBook.badge;
  const bookTitle = data?.bookTitle || freeBook.title;
  const author = data?.author || freeBook.author;
  const coverImage = data?.coverImageUrl || freeBook.image;
  const description = data?.description || "Register Now & Receive Your Free Copy — A special gift for registered participants. At CrossLife, we believe God calls young men and women to count their lives worth losing for the surpassing worth of knowing Christ Jesus.";
  const buttonText = data?.buttonText || "REGISTER NOW & CLAIM GIFT";

  return (
    <Section variant="green-tint" spacing="lg" id="free-book">
      <Container>
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-900 to-navy-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          {/* Radiant glow accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
            {/* Book Cover Visual (4 cols) */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative group">
                {/* Physical Book Shadow Effect */}
                <div className="absolute -inset-2 bg-emerald-500/20 rounded-2xl blur-lg group-hover:bg-emerald-500/30 transition-all duration-300" />
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-emerald-400/40 w-44 sm:w-56 aspect-[2/3] bg-emerald-950">
                  <img
                    src={coverImage}
                    alt={bookTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Editorial Copy & Claim CTA (8 cols) */}
            <div className="md:col-span-8 space-y-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5 text-emerald-400" />
                <span>{badge}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  “{bookTitle}”
                </h3>
                <div className="text-base sm:text-lg font-medium text-emerald-300">
                  By {author}
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {description}
              </p>

              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Physical book copy handed to you at on-site check-in</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Complimentary with both Early Bird and Regular tickets</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={onRegisterClick}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="py-4 px-8 text-base shadow-lg shadow-emerald-950/40"
                >
                  {buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
