import React from 'react';
import { Hero } from '../components/hero/Hero';
import { ThreePillars } from '../components/pillars/ThreePillars';
import { WhatsUnique } from '../components/about/WhatsUnique';
import { WhoIsItFor } from '../components/about/WhoIsItFor';
import { VenueSection } from '../components/venue/VenueSection';
import { SpeakerSection } from '../components/speakers/SpeakerSection';
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

      {/* 2. THE THREE PILLARS — Live for Christ • Glorify Christ • Proclaim Christ */}
      <ThreePillars />

      {/* 3. WHAT MAKES CROSSLIFE UNIQUE — Substance Over Style • Truth Over Trend */}
      <WhatsUnique showFullText={false} />

      {/* 4. WHO IS CROSSLIFE FOR — Scannable 4-card profile for ages 18–25 */}
      <WhoIsItFor />

      {/* 5. VENUE & CAMPUS GROUNDS — Ashirwad Hyderabad, Dorms & Communal Dining */}
      <VenueSection />

      {/* 6. SPEAKERS & EXPOSITION — Pastors from across India */}
      <SpeakerSection />

      {/* 7. LITERATURE & FREE BOOK GIFT — Don't Waste Your Life by John Piper */}
      <BookPromotion onRegisterClick={openRegistration} />

      {/* 8. ESSENTIAL FAQs — Top 4 questions with direct link to full FAQ catalog */}
      <FAQAccordion isCompact />

      {/* 9. ORGANISER & STRATEGIC PARTNERS — Sleek partnership strip */}
      <OrganiserSection isCompact />
    </>
  );
};
