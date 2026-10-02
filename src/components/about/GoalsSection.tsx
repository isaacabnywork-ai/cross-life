import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { brandContent } from '../../data/content';

export const GoalsSection: React.FC = () => {
  return (
    <Section variant="white" spacing="xl" id="goals">
      <Container>
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full bg-navy-100 text-navy-800 border border-navy-200/50">
            CONFERENCE OUTCOMES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Hopes & Goals
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            We pray and plan with five distinct, intentional outcomes for every attendee who walks through the doors of CrossLife.
          </p>
        </div>

        {/* Elegant Numbered Editorial Layout */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {brandContent.goals.map((goal, idx) => (
            <div
              key={idx}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group hover:bg-slate-50/60 transition-colors px-4 -mx-4 rounded-xl"
            >
              {/* Number (2 cols) */}
              <div className="md:col-span-2">
                <span className="font-mono text-3xl sm:text-4xl font-black text-navy-800 group-hover:text-gold-500 transition-colors">
                  {goal.number}
                </span>
              </div>

              {/* Title (3 cols) */}
              <div className="md:col-span-3">
                <h3 className="text-xl sm:text-2xl font-bold text-navy-950 group-hover:text-navy-700 transition-colors">
                  {goal.title}
                </h3>
              </div>

              {/* Description (7 cols) */}
              <div className="md:col-span-7">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
