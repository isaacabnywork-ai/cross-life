import React from 'react';
import type { Speaker } from '../../data/speakers';
import { Globe, User } from 'lucide-react';

interface SpeakerCardProps {
  speaker: Speaker;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-subtle border border-slate-200/80 hover:shadow-card transition-all duration-300 flex flex-col group">
      <div className="aspect-[4/3] bg-navy-950 relative overflow-hidden">
        {speaker.photo ? (
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-100">
            <User className="w-16 h-16" />
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold text-gold-600 uppercase tracking-wider block mb-1">
            {speaker.role} • {speaker.ministry}
          </span>
          <h3 className="text-xl font-bold text-navy-950 mb-2">
            {speaker.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {speaker.bio}
          </p>
        </div>

        {speaker.socialLinks?.website && (
          <div className="pt-4 mt-4 border-t border-slate-100">
            <a
              href={speaker.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-800 hover:text-navy-950"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Ministry Website</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
