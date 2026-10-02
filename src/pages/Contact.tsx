import React from 'react';
import { PageHero } from '../components/common/PageHero';
import { ContactForm } from '../components/contact/ContactForm';
import { Container } from '../components/common/Container';
import { Section } from '../components/common/Section';
import { CTASection } from '../components/common/CTASection';
import { useRegistration } from '../context/RegistrationContext';

export const Contact: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <>
      <PageHero
        badge="GET IN TOUCH"
        title="Contact Us"
        description="Whether you have questions about conference logistics, travel, or group queries, our team in Hyderabad is ready to assist you."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <Section variant="offwhite" spacing="xl">
        <Container>
          <ContactForm />
        </Container>
      </Section>

      <CTASection onRegisterClick={openRegistration} />
    </>
  );
};
