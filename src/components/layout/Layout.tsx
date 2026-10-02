import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from '../common/ScrollToTop';
import { useRegistration } from '../../context/RegistrationContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { openRegistration } = useRegistration();

  return (
    <div className="min-h-screen flex flex-col bg-surface-offwhite text-slate-850">
      <ScrollToTop />
      <Header onRegisterClick={openRegistration} />
      <main className="flex-1">
        {children}
      </main>
      <Footer onRegisterClick={openRegistration} />
    </div>
  );
};
