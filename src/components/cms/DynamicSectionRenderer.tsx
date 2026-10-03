import React from 'react';
import { useCMS } from '../../context/CMSContext';
import type { PageSection } from '../../types/cms';
import { Hero } from '../hero/Hero';
import { ThreePillars } from '../pillars/ThreePillars';
import { WhoIsItFor } from '../about/WhoIsItFor';
import { WhatsUnique } from '../about/WhatsUnique';
import { VenueSection } from '../venue/VenueSection';
import { BookPromotion } from '../bookstore/BookPromotion';
import { FAQAccordion } from '../faq/FAQAccordion';
import { OrganiserSection } from '../partners/OrganiserSection';
import { GoalsSection } from '../about/GoalsSection';
import { WhyCrossLife } from '../about/WhyCrossLife';
import { RichTextSection } from '../common/RichTextSection';
import { CTABannerSection } from '../common/CTABannerSection';

interface DynamicSectionRendererProps {
  pageId: string;
  onRegisterClick: () => void;
}

export const DynamicSectionRenderer: React.FC<DynamicSectionRendererProps> = ({
  pageId,
  onRegisterClick
}) => {
  const { getSectionsForPage } = useCMS();
  const sections = getSectionsForPage(pageId);

  const visibleSections = sections.filter((s) => s.isVisible);

  if (!visibleSections || visibleSections.length === 0) {
    return null;
  }

  return (
    <>
      {visibleSections.map((section: PageSection) => {
        switch (section.type) {
          case 'hero':
            return (
              <Hero
                key={section.id}
                data={section.data as any}
                onRegisterClick={onRegisterClick}
              />
            );

          case 'three_pillars':
            return (
              <ThreePillars
                key={section.id}
                data={section.data as any}
              />
            );

          case 'who_is_it_for':
            return (
              <WhoIsItFor
                key={section.id}
                data={section.data as any}
              />
            );

          case 'whats_unique':
            return (
              <WhatsUnique
                key={section.id}
                data={section.data as any}
              />
            );

          case 'venue':
            return (
              <VenueSection
                key={section.id}
                data={section.data as any}
              />
            );

          case 'book_promotion':
            return (
              <BookPromotion
                key={section.id}
                data={section.data as any}
                onRegisterClick={onRegisterClick}
              />
            );

          case 'faq':
            return (
              <FAQAccordion
                key={section.id}
                data={section.data as any}
                isCompact={(section.data as any)?.isCompact}
              />
            );

          case 'organiser_partners':
            return (
              <OrganiserSection
                key={section.id}
                data={section.data as any}
                isCompact={(section.data as any)?.isCompact}
              />
            );

          case 'goals':
            return (
              <GoalsSection
                key={section.id}
                data={section.data as any}
              />
            );

          case 'why_crosslife':
            return (
              <WhyCrossLife
                key={section.id}
                data={section.data as any}
              />
            );

          case 'rich_text':
            return (
              <RichTextSection
                key={section.id}
                id={section.id === 'sec-about-intro' ? 'about' : undefined}
                data={section.data as any}
                onCtaClick={onRegisterClick}
              />
            );

          case 'cta_banner':
            return (
              <CTABannerSection
                key={section.id}
                data={section.data as any}
                onRegisterClick={onRegisterClick}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
};
