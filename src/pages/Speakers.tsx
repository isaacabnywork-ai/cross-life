import React from 'react';
import { PageHero } from '../components/common/PageHero';
import { SpeakerSection } from '../components/speakers/SpeakerSection';
import { CTASection } from '../components/common/CTASection';
import { useRegistration } from '../context/RegistrationContext';
import { Container } from '../components/common/Container';
import { Section } from '../components/common/Section';


export const Speakers: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <>
      <PageHero
        badge="PREACHING & LEADERSHIP"
        title="Speakers & Preachers"
        description="Pastors, biblicists, and church leaders committed to Reformed evangelical orthodoxy, traveling from across India to open the Scriptures."
        breadcrumbs={[{ label: 'Speakers' }]}
      />

      {/* Philosophy of Preaching Section */}
      <Section variant="white" spacing="lg">
        <Container size="narrow">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-navy-800 uppercase tracking-widest px-3 py-1 rounded-full bg-navy-50 border border-navy-100">
              OUR PULPIT CONVICTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
              Feeding the Flock with Truth, Not Trends
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              At CrossLife, speakers do not deliver inspirational self-help talks or entertainment-driven monologues. Instead, every main session is dedicated to the faithful exposition of God’s Word—explaining the text, showing Christ in all of Scripture, and applying biblical truth directly to young adult life.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Speakers Component */}
      <SpeakerSection />

      {/* Final CTA */}
      <CTASection onRegisterClick={openRegistration} />
    </>
  );
};
