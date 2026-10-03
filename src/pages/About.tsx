import React from 'react';
import { PageHero } from '../components/common/PageHero';
import { DynamicSectionRenderer } from '../components/cms/DynamicSectionRenderer';
import { useRegistration } from '../context/RegistrationContext';

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

      <DynamicSectionRenderer pageId="page-about" onRegisterClick={openRegistration} />
    </>
  );
};

export default About;
