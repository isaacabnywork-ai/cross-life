import React from 'react';
import { Hero } from '../components/hero/Hero';
import { EventOverview } from '../components/event/EventOverview';
import { ThreePillars } from '../components/pillars/ThreePillars';
import { WhyCrossLife } from '../components/about/WhyCrossLife';
import { WhoIsItFor } from '../components/about/WhoIsItFor';
import { WhatsUnique } from '../components/about/WhatsUnique';
import { GoalsSection } from '../components/about/GoalsSection';
import { SpeakerSection } from '../components/speakers/SpeakerSection';
import { OrganiserSection } from '../components/partners/OrganiserSection';
import { VenueSection } from '../components/venue/VenueSection';
import { BookstoreSection } from '../components/bookstore/BookstoreSection';
import { BookPromotion } from '../components/bookstore/BookPromotion';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { CTASection } from '../components/common/CTASection';
import { useRegistration } from '../context/RegistrationContext';

export const Home: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <>
      {/* 1. HERO (White) */}
      <Hero onRegisterClick={openRegistration} />

      {/* 2. EVENT OVERVIEW (Light Blue) */}
      <EventOverview onRegisterClick={openRegistration} />

      {/* 3. THREE PILLARS (Dark Navy: One Life / Desire / Purpose) */}
      <ThreePillars />

      {/* 4. WHY CROSSLIFE (White Editorial Split) */}
      <WhyCrossLife />

      {/* 5. WHO IS CROSSLIFE FOR (Light Blue) */}
      <WhoIsItFor />

      {/* 6. WHAT'S UNIQUE (Dark Navy: Substance Over Style • Truth Over Trend) */}
      <WhatsUnique />

      {/* 7. HOPES & GOALS (White Numbered Editorial 01–05) */}
      <GoalsSection />

      {/* 8. SPEAKERS (Image / Dark Navy: Pastors from Across India) */}
      <SpeakerSection />

      {/* 9. ORGANISER & PARTNERS (Off-White / Light) */}
      <OrganiserSection />

      {/* 10. VENUE (White: Ashirwad Global Learning Centre, Hyderabad) */}
      <VenueSection />

      {/* 11. DEDICATED BOOKSTORE (Light Blue: Curated by For The Truth) */}
      <BookstoreSection />

      {/* 12. FREE BOOK (Green-Tinted: Don't Waste Your Life) */}
      <BookPromotion onRegisterClick={openRegistration} />

      {/* 13. FAQ (White Accordion) */}
      <FAQAccordion />

      {/* 14. FINAL CTA (Navy) */}
      <CTASection onRegisterClick={openRegistration} />
    </>
  );
};
