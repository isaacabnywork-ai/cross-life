import React from 'react';
import { PageHero } from '../components/common/PageHero';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { CTASection } from '../components/common/CTASection';
import { useRegistration } from '../context/RegistrationContext';
import { Container } from '../components/common/Container';
import { Section } from '../components/common/Section';
import { Train } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <>
      <PageHero
        badge="HELP & INFORMATION"
        title="Frequently Asked Questions"
        description="Comprehensive answers to conference schedules, travel planning, dorm accommodations, meals, and eligibility."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      {/* Travel Advisory Callout Box */}
      <Section variant="light-blue" spacing="sm">
        <Container>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-navy-100 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-navy-800 uppercase tracking-wider">
                  <Train className="w-4 h-4 text-navy-700" />
                  <span>Important Travel Advisory</span>
                </div>
                <h3 className="text-xl font-extrabold text-navy-950">
                  Planning Your Trip to Hyderabad (Sept 2027)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Train reservations on Indian Railways open 120 days prior (approx. May/June 2027). We strongly encourage attendees to book tickets as soon as reservations open to secure confirmed berths to Secunderabad / Hyderabad Deccan.
                </p>
              </div>

              <div className="shrink-0 p-3 rounded-xl bg-navy-50 border border-navy-100 text-center min-w-[140px]">
                <div className="text-[10px] font-bold text-slate-500 uppercase">First Session</div>
                <div className="text-lg font-black text-navy-950">11:00 AM</div>
                <div className="text-[11px] text-slate-500">14 Sept 2027</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Accordion with all categories visible */}
      <FAQAccordion showAllCategories={true} />

      {/* Final CTA */}
      <CTASection onRegisterClick={openRegistration} />
    </>
  );
};
