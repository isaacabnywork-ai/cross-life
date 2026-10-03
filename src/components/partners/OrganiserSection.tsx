import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { brandContent } from '../../data/content';
import { partnerData, partnerOverview } from '../../data/partners';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useCMS } from '../../context/CMSContext';
import type { OrganiserPartnersSectionData } from '../../types/cms';

interface OrganiserSectionProps {
  isCompact?: boolean;
  data?: OrganiserPartnersSectionData;
}

export const OrganiserSection: React.FC<OrganiserSectionProps> = ({ 
  isCompact: isCompactProp, 
  data 
}) => {
  const { partners } = useCMS();
  const currentPartners = (partners && partners.length > 0)
    ? partners.filter((p) => p.isActive)
    : partnerData;

  const isCompact = isCompactProp !== undefined ? isCompactProp : (data?.isCompact ?? false);
  if (isCompact) {
    return (
      <Section variant="offwhite" spacing="lg" id="organiser">
        <Container>
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-subtle border border-slate-200/80 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-sm">
                  <polygon points="50,15 85,50 50,85 15,50" fill="#0F3158" />
                  <polygon points="50,15 65,30 50,45 35,30" fill="#1E4F85" />
                  <polygon points="65,30 85,50 70,65 50,45" fill="#2A66A8" />
                  <polygon points="50,45 70,65 50,85 30,65" fill="#3B82F6" />
                  <polygon points="35,30 50,45 30,65 15,50" fill="#93C5FD" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-navy-800 bg-navy-50 px-2.5 py-0.5 rounded-full border border-navy-100 mb-1 inline-block">
                  Conference Organiser
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-navy-950">
                  Equip Indian Churches
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mt-1 leading-relaxed">
                  A pastoral fellowship committed to biblical church revitalisation and raising the next generation of Gospel-centered believers across India.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/partners"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-navy-900 transition-colors"
              >
                <span>About Organiser & Partners</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    );
  }
  return (
    <Section variant="offwhite" spacing="xl" id="organiser">
      <Container>
        {/* Organiser Block */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-200/80 mb-20 text-center">
          <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full bg-navy-50 text-navy-800 border border-navy-100">
            CONFERENCE ORGANISER
          </span>

          {/* Geometric Diamond EIC Logo Graphic as seen in screenshot */}
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
              {/* Mosaic diamond representation of Equip Indian Churches */}
              <polygon points="50,15 85,50 50,85 15,50" fill="#0F3158" />
              <polygon points="50,15 65,30 50,45 35,30" fill="#1E4F85" />
              <polygon points="65,30 85,50 70,65 50,45" fill="#2A66A8" />
              <polygon points="50,45 70,65 50,85 30,65" fill="#3B82F6" />
              <polygon points="35,30 50,45 30,65 15,50" fill="#93C5FD" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 mb-6">
            Equip Indian Churches
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            {brandContent.organiser.lead}
          </p>

          {/* Biblical Verses Box */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/70 text-left max-w-2xl mx-auto space-y-4">
            <div className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-2">
              The Two Undergirding Biblical Verses:
            </div>

            {brandContent.organiser.verses.map((verse, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-navy-700 bg-white px-2 py-0.5 rounded border border-slate-200 mt-0.5 shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <strong className="text-sm text-navy-950 block">{verse.reference}</strong>
                  <p className="text-xs sm:text-sm font-serif italic text-slate-600 mt-0.5">
                    “{verse.quote}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners & Sponsors Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-slate-200/60 text-slate-700">
            STRATEGIC ALLIANCES
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            {partnerOverview.title}
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            {partnerOverview.description}
          </p>
        </div>

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentPartners.map((partner) => {
            const partnerLogo = (partner as any).logoUrl || (partner as any).logo;
            return (
              <div
                key={partner.id}
                className="bg-white rounded-2xl p-6 shadow-subtle border border-slate-200/80 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-navy-50 text-navy-800 border border-navy-100">
                      {partner.role}
                    </span>
                  </div>

                  <div className="h-14 mb-4 flex items-center">
                    {partnerLogo ? (
                      <img
                        src={partnerLogo}
                        alt={partner.name}
                        className="max-h-12 max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.partner-logo-fallback') as HTMLElement;
                          if (fallback) fallback.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div className={`partner-logo-fallback ${partnerLogo ? 'hidden' : 'block'} text-lg font-black text-navy-950`}>
                      {partner.name}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {partner.description}
                  </p>
                </div>

              {partner.website && (
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-navy-800 hover:text-navy-950 group"
                  >
                    <span>Visit Ministry</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
        </div>
      </Container>
    </Section>
  );
};
