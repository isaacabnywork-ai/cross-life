import React from 'react';
import { Section } from './Section';
import { Container } from './Container';
import { Button } from './Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { CTABannerSectionData } from '../../types/cms';

interface CTABannerSectionProps {
  data?: CTABannerSectionData;
  onRegisterClick: () => void;
}

export const CTABannerSection: React.FC<CTABannerSectionProps> = ({ data, onRegisterClick }) => {
  const badge = data?.badge || "LIMITED REGISTRATION";
  const heading = data?.heading || "Secure Your Seat at CrossLife 2027";
  const subtitle = data?.subtitle || "Dormitory space is limited. Early bird pricing ends soon.";
  const primaryButtonText = data?.primaryButtonText || "REGISTER NOW";
  const secondaryButtonText = data?.secondaryButtonText;
  const secondaryButtonHref = data?.secondaryButtonHref;
  const earlyBird = data?.earlyBirdNotice || "Use promo code AIPC2026 to save ₹500";

  return (
    <Section variant="dark-navy" spacing="xl" className="relative overflow-hidden">
      {/* Background radiant decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-400/10 blur-[120px] pointer-events-none rounded-full" />

      <Container size="narrow">
        <div className="text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/15 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="accent"
              size="lg"
              onClick={onRegisterClick}
              icon={<ArrowRight className="w-4 h-4" />}
              className="py-4 px-8 text-base shadow-xl"
            >
              {primaryButtonText}
            </Button>

            {secondaryButtonText && (
              <Button
                variant="secondary"
                size="lg"
                as="a"
                href={secondaryButtonHref || '#'}
                className="py-4 px-8 text-base bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                {secondaryButtonText}
              </Button>
            )}
          </div>

          {earlyBird && (
            <div className="pt-2 text-xs font-semibold text-gold-400/90 tracking-wide">
              {earlyBird}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};
