import React, { createContext, useContext, useState, useCallback } from 'react';
import { RegistrationModal } from '../components/registration/RegistrationModal';
import { FloatingEventButton } from '../components/registration/FloatingEventButton';

interface RegistrationContextType {
  openRegistration: () => void;
  closeRegistration: () => void;
  isRegistrationOpen: boolean;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openRegistration = useCallback(() => setIsOpen(true), []);
  const closeRegistration = useCallback(() => setIsOpen(false), []);

  return (
    <RegistrationContext.Provider value={{ openRegistration, closeRegistration, isRegistrationOpen: isOpen }}>
      {children}
      <RegistrationModal isOpen={isOpen} onClose={closeRegistration} />
      <FloatingEventButton onClick={openRegistration} />
    </RegistrationContext.Provider>
  );
};

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}
