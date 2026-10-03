import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { speakerData } from '../../data/speakers';
import { SpeakerCard } from './SpeakerCard';
import { Mic, Sparkles } from 'lucide-react';

import { useCMS } from '../../context/CMSContext';

export const SpeakerSection: React.FC = () => {
  const { speakers } = useCMS();
  const activeSpeakers = (speakers && speakers.length > 0)
    ? speakers.filter((s) => s.isActive)
    : speakerData.speakers;
  const hasSpeakers = activeSpeakers.length > 0;

  return (
    <Section variant="dark-navy" spacing="xl" id="speakers" className="relative">
      {/* Background Graphic Accent */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      <Container>
        <SectionHeading
          inverted
          eyebrow="BIBLICAL PREACHING"
          title="Pastors from Across India."
          subtitle={speakerData.description}
        />

        {hasSpeakers ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker as any} />
            ))}
          </div>
        ) : (
          /* Clean Configurable Announcement Placeholder (No fake people) */
          <div className="max-w-3xl mx-auto bg-navy-900/80 rounded-3xl p-8 sm:p-12 border border-navy-800 text-center relative overflow-hidden shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gold-400/15 border border-gold-400/30 text-gold-400 flex items-center justify-center mx-auto mb-6">
              <Mic className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950 text-gold-300 text-xs font-bold uppercase tracking-wider mb-4 border border-navy-800">
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Lineup Announcement In Progress</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Faithful Biblical Preachers & Expositors
            </h3>

            <p className="text-base text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto">
              {speakerData.announcementText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-navy-800/80 text-left">
              <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800/60">
                <div className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">
                  Expository Sermons
                </div>
                <div className="text-xs text-slate-400">
                  Careful verse-by-verse opening of Scripture.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800/60">
                <div className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">
                  Pastoral Q&A Panels
                </div>
                <div className="text-xs text-slate-400">
                  Practical engagement on culture and Christian living.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800/60">
                <div className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">
                  Personal Mentorship
                </div>
                <div className="text-xs text-slate-400">
                  Shared meal tables with seasoned shepherds.
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};
