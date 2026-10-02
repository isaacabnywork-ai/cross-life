import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'white' | 'light-blue' | 'offwhite' | 'navy' | 'dark-navy' | 'green-tint';
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  id?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  variant = 'white',
  spacing = 'lg',
  id,
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    white: 'bg-white text-slate-800',
    'light-blue': 'bg-navy-50 text-slate-850 border-y border-navy-100/60',
    offwhite: 'bg-surface-offwhite text-slate-850',
    navy: 'bg-navy-900 text-white',
    'dark-navy': 'bg-navy-950 text-white',
    'green-tint': 'bg-emerald-50/50 text-slate-850 border-y border-emerald-100/60'
  };

  const spacingStyles = {
    none: 'py-0',
    sm: 'py-10 md:py-14',
    md: 'py-14 md:py-20',
    lg: 'py-20 md:py-28',
    xl: 'py-28 md:py-36'
  };

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden transition-colors',
        variantStyles[variant],
        spacingStyles[spacing],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
