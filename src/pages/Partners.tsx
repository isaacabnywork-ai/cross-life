import React from 'react';
import { PageHero } from '../components/common/PageHero';
import { OrganiserSection } from '../components/partners/OrganiserSection';
import { CTASection } from '../components/common/CTASection';
import { useRegistration } from '../context/RegistrationContext';
import { Container } from '../components/common/Container';
import { Section } from '../components/common/Section';


export const Partners: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <>
      <PageHero
        badge="UNITY IN TRUTH"
        title="Organiser & Partners"
        description="CrossLife is organised by Equip Indian Churches in collaborative fellowship with ministry partners committed to sound doctrine and biblical church health."
        breadcrumbs={[{ label: 'Partners' }]}
      />

      {/* Main Organiser & Partners Presentation */}
      <OrganiserSection />

      {/* Gospel Partnership Philosophy */}
      <Section variant="white" spacing="lg">
        <Container size="narrow">
          <div className="bg-navy-50/70 border border-navy-100 rounded-3xl p-8 sm:p-12 text-center space-y-4">
            <span className="text-xs font-bold text-navy-800 uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-navy-200">
              BIBLICAL COOPERATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Why Gospel Partnership Matters
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl mx-auto">
              We believe local churches and ministries are called to stand arm-in-arm for the defense and proclamation of the Gospel. CrossLife exists because pastors, publishers, and educators have chosen to unite around the truth of God’s Word for the sake of the next generation.
            </p>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <CTASection onRegisterClick={openRegistration} />
    </>
  );
};
