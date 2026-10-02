import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  id,
  question,
  answer,
  isOpen,
  onToggle
}) => {
  return (
    <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-200">
      <button
        type="button"
        id={`faq-btn-${id}`}
        aria-controls={`faq-content-${id}`}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-navy-950 text-sm sm:text-base hover:bg-slate-50/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-800"
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200',
            isOpen ? 'rotate-180 text-navy-900' : ''
          )}
        />
      </button>

      {isOpen && (
        <div
          id={`faq-content-${id}`}
          role="region"
          aria-labelledby={`faq-btn-${id}`}
          className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/30 animate-in fade-in duration-200"
        >
          {answer}
        </div>
      )}
    </div>
  );
};
