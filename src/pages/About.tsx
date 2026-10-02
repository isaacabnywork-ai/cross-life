import React from 'react';
import { PageHero } from '../components/common/PageHero';
import { Section } from '../components/common/Section';
import { Container } from '../components/common/Container';
import { ThreePillars } from '../components/pillars/ThreePillars';
import { WhyCrossLife } from '../components/about/WhyCrossLife';
import { WhoIsItFor } from '../components/about/WhoIsItFor';
import { WhatsUnique } from '../components/about/WhatsUnique';
import { GoalsSection } from '../components/about/GoalsSection';
import { OrganiserSection } from '../components/partners/OrganiserSection';
import { CTASection } from '../components/common/CTASection';
import { useRegistration } from '../context/RegistrationContext';
import { brandContent } from '../data/content';
import { Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <>
      <PageHero
        badge="ABOUT THE MOVEMENT"
        title="About CrossLife"
        description="A conference organised by Equip Indian Churches to inspire and equip young people to live for Christ, glorify Christ, and proclaim His Gospel."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* Foundational Mission Statement */}
      <Section variant="white" spacing="lg" id="about">
        <Container size="narrow">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 text-navy-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Official Mission</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 leading-tight">
              Rooted in Christ, Invested in the Local Church
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-serif italic">
              “{brandContent.about.lead}”
            </p>
            <div className="text-base text-slate-600 leading-relaxed pt-2">
              {brandContent.about.body}
            </div>
          </div>
        </Container>
      </Section>

      {/* One Life / One Desire / One Purpose */}
      <ThreePillars />

      {/* Why CrossLife? */}
      <WhyCrossLife />

      {/* Who is CrossLife for? */}
      <WhoIsItFor />

      {/* What's Unique About CrossLife? (Substance over style, Truth over trend) */}
      <WhatsUnique />

      {/* Hopes & Goals (01 to 05 Numbered Layout) */}
      <GoalsSection />

      {/* Equip Indian Churches Organiser Section */}
      <OrganiserSection />

      {/* Final Call to Action */}
      <CTASection onRegisterClick={openRegistration} />
    </>
  );
};
