import React from 'react';
import { PageHero } from '../components/common/PageHero';
import { Section } from '../components/common/Section';
import { Container } from '../components/common/Container';
import { EventOverview } from '../components/event/EventOverview';
import { VenueSection } from '../components/venue/VenueSection';
import { BookstoreSection } from '../components/bookstore/BookstoreSection';
import { BookPromotion } from '../components/bookstore/BookPromotion';
import { CTASection } from '../components/common/CTASection';
import { useRegistration } from '../context/RegistrationContext';
import { eventConfig } from '../data/event';
import { brandContent, type PillarItem } from '../data/content';
import { ShieldAlert } from 'lucide-react';

export const Conference: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <>
      <PageHero
        badge="EVENT 2027"
        title="CrossLife Conference 2027"
        description={`${eventConfig.dates} • ${eventConfig.venue.fullAddress}. Three full days of biblical exposition, corporate prayer, reverent singing, and gospel community.`}
        breadcrumbs={[{ label: 'Conference' }]}
      />

      {/* Main Event Overview & Pricing */}
      <EventOverview onRegisterClick={openRegistration} />

      {/* Conference Schedule & Features */}
      <Section variant="white" spacing="xl" id="schedule">
        <Container>
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-navy-800 uppercase tracking-widest px-3 py-1 rounded-full bg-navy-50 border border-navy-100 mb-3 inline-block">
              PROGRAM & ATMOSPHERE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
              What to Expect at CrossLife 2027
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              The conference starts at {eventConfig.startTime} on Tuesday, 14 September 2027, and concludes after lunch on Thursday, 16 September 2027.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {brandContent.conferenceFeatures.map((feat: PillarItem) => (
              <div
                key={feat.id}
                className="bg-white rounded-2xl overflow-hidden shadow-subtle border border-slate-200/80 group hover:shadow-card transition-all"
              >
                <div className="aspect-[4/3] bg-navy-950 overflow-hidden relative">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white font-bold text-base">
                    {feat.title}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Important Participant Notices Box */}
          <div className="bg-amber-50/70 border-2 border-amber-300/80 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="text-base font-bold text-navy-950">
                  Important Guidelines for Registered Attendees
                </h4>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li><strong>Target Demographic:</strong> Open exclusively to men and women aged {eventConfig.audience}.</li>
                  <li><strong>Language Requirement:</strong> {eventConfig.languageNotice}</li>
                  <li><strong>Full Participation:</strong> Please plan to attend all sessions from Tuesday morning to Thursday afternoon.</li>
                  <li><strong>Accommodations & Meals:</strong> Dormitory-style lodging and all meals are fully included in the registration fee.</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Venue Section */}
      <VenueSection />

      {/* Dedicated Bookstore */}
      <BookstoreSection />

      {/* Free Book Promotion */}
      <BookPromotion onRegisterClick={openRegistration} />

      {/* Final CTA */}
      <CTASection onRegisterClick={openRegistration} />
    </>
  );
};
