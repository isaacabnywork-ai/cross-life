import React from 'react';
import { Section } from './Section';
import { Container } from './Container';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';
import type { RichTextSectionData } from '../../types/cms';

interface RichTextSectionProps {
  id?: string;
  data?: RichTextSectionData;
  onCtaClick?: () => void;
}

export const RichTextSection: React.FC<RichTextSectionProps> = ({ id, data, onCtaClick }) => {
  if (!data) return null;

  const { badge, heading, subtitle, content, ctaText, ctaHref } = data;

  // Split content by double newlines into paragraphs
  const paragraphs = content ? content.split(/\n\n+/) : [];

  return (
    <Section variant="white" spacing="xl" id={id}>
      <Container size="narrow">
        <div className="space-y-6">
          {badge && (
            <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-navy-50 text-navy-800 border border-navy-100">
              {badge}
            </span>
          )}

          {heading && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
              {heading}
            </h2>
          )}

          {subtitle && (
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal">
              {subtitle}
            </p>
          )}

          <div className="space-y-4 pt-2 text-base text-slate-600 leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>

          {ctaText && (
            <div className="pt-4">
              <Button
                variant="primary"
                size="md"
                as={ctaHref ? 'a' : 'button'}
                href={ctaHref}
                onClick={onCtaClick}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {ctaText}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};
