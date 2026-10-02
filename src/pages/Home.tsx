import React from 'react';
import { Hero } from '../components/hero/Hero';
import { ThreePillars } from '../components/pillars/ThreePillars';
import { WhoIsItFor } from '../components/about/WhoIsItFor';
import { WhatsUnique } from '../components/about/WhatsUnique';
import { VenueSection } from '../components/venue/VenueSection';
import { BookPromotion } from '../components/bookstore/BookPromotion';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { OrganiserSection } from '../components/partners/OrganiserSection';
import { useRegistration } from '../context/RegistrationContext';

export const Home: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <>
      {/* 1. HERO — Dates, Venue, Live Countdown, Direct Actions */}
      <Hero onRegisterClick={openRegistration} />

      {/* 2. THE THREE PILLARS (Dark Navy) — Live for Christ • Glorify Christ • Proclaim Christ */}
      <ThreePillars />

      {/* 3. WHO IS CROSSLIFE FOR (Light Blue) — Scannable 4-card profile for ages 18–25 */}
      <WhoIsItFor />

      {/* 4. WHAT MAKES CROSSLIFE UNIQUE (Dark Navy) — Substance Over Style • Truth Over Trend */}
      <WhatsUnique showFullText={false} />

      {/* 5. VENUE & CAMPUS GROUNDS (White) — Ashirwad Hyderabad, Dorms & Communal Dining */}
      <VenueSection />

      {/* 6. LITERATURE & FREE BOOK GIFT (Green Tint) — Don't Waste Your Life by John Piper */}
      <BookPromotion onRegisterClick={openRegistration} />

      {/* 7. ESSENTIAL FAQs (White) — Top 4 questions with direct link to full FAQ catalog */}
      <FAQAccordion isCompact />

      {/* 8. ORGANISER & STRATEGIC PARTNERS (Off-White) — Sleek partnership strip */}
      <OrganiserSection isCompact />
    </>
  );
};
