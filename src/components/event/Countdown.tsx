import React, { useState, useEffect } from 'react';
import { eventConfig } from '../../data/event';

export const Countdown: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const target = new Date(eventConfig.startDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isPast) {
    return null;
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds }
  ];

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-4 ${className}`}>
      {units.map((unit, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-lg sm:text-2xl font-black text-white shadow-sm font-mono">
            {String(unit.value).padStart(2, '0')}
          </div>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300 mt-1.5">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};
