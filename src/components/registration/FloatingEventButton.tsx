import React from 'react';
import { Calendar } from 'lucide-react';
import { eventConfig } from '../../data/event';

interface FloatingEventButtonProps {
  onClick: () => void;
}

export const FloatingEventButton: React.FC<FloatingEventButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-gold-500 hover:from-amber-600 hover:to-gold-600 text-navy-950 font-bold px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-lg shadow-gold-500/25 border-2 border-white/60 transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
        aria-label="View Event Information, Dates, and Rates"
      >
        {/* Stylized Cross symbol icon matching the original design */}
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-navy-950/10 text-navy-950 shrink-0">
          <Calendar className="w-3.5 h-3.5" />
        </span>
        
        <div className="text-left flex flex-col">
          <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase leading-tight">
            Event Info & Rates
          </span>
          <span className="text-[10px] font-semibold text-navy-900/80 hidden sm:inline">
            From ₹{(eventConfig.earlyBirdPrice - eventConfig.discount).toLocaleString('en-IN')} with code
          </span>
        </div>

        <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-navy-950 text-gold-300">
          -₹500
        </span>
      </button>
    </div>
  );
};
