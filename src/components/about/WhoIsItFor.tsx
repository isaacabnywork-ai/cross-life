import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { brandContent } from '../../data/content';
import { CheckCircle2 } from 'lucide-react';

export const WhoIsItFor: React.FC = () => {
  const criteria = [
    {
      title: "Desire for Biblical Grounding",
      desc: "Young believers longing to understand Scripture deeply, moving beyond superficial cliches into rich sound doctrine."
    },
    {
      title: "Engaged Church Members",
      desc: "Young men and women who love their local church and want to serve their pastors and congregations with biblical faithfulness."
    },
    {
      title: "Passionate Disciple-Makers",
      desc: "Those who want practical equipping to share the Gospel boldly on campus, in the workplace, and with family."
    },
    {
      title: "Seeking Clarity for Everyday Life",
      desc: "Anyone navigating vocations, friendships, dating, and cultural tensions with a desire to honor Jesus in all things."
    }
  ];

  return (
    <Section variant="light-blue" spacing="xl" id="who">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full bg-navy-200/60 text-navy-900 border border-navy-300/40">
            AUDIENCE & ELIGIBILITY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Who is CrossLife For?
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-slate-700 leading-relaxed font-normal text-balance">
            {brandContent.whoIsItFor.paragraphs[0]}
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {criteria.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-subtle border border-slate-200/80 hover:shadow-card transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center mb-4 border border-navy-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-navy-950 mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Editorial Summary Box */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm max-w-4xl mx-auto text-center">
          <p className="text-base sm:text-lg text-slate-800 font-serif italic leading-relaxed">
            “{brandContent.whoIsItFor.paragraphs[1]}”
          </p>
          <div className="mt-4 text-xs font-bold text-navy-800 tracking-wider uppercase">
            — Equip Indian Churches Pastoral Committee
          </div>
        </div>
      </Container>
    </Section>
  );
};
