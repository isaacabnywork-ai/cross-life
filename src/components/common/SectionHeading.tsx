import React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: 'left' | 'center' | 'right';
  inverted?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  inverted = false,
  className
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  return (
    <div className={cn('flex flex-col max-w-3xl mb-12 md:mb-16', alignClasses[align], className)}>
      {eyebrow && (
        <span
          className={cn(
            'inline-flex items-center text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full',
            inverted
              ? 'bg-gold-400/15 text-gold-300 border border-gold-400/30'
              : 'bg-navy-100/70 text-navy-800 border border-navy-200/50'
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-balance',
          inverted ? 'text-white' : 'text-navy-950'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <div
          className={cn(
            'mt-4 text-base sm:text-lg leading-relaxed text-balance',
            inverted ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {subtitle}
        </div>
      )}
      <div
        className={cn(
          'h-1 w-12 rounded mt-6',
          inverted ? 'bg-gold-400' : 'bg-navy-700',
          align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
        )}
        aria-hidden="true"
      />
    </div>
  );
};
