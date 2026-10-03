import React from 'react';
import { DynamicSectionRenderer } from '../components/cms/DynamicSectionRenderer';
import { useRegistration } from '../context/RegistrationContext';

export const Home: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <>
      <DynamicSectionRenderer pageId="page-home" onRegisterClick={openRegistration} />
    </>
  );
};

export default Home;
