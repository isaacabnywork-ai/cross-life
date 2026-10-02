import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const WhoIsItFor: React.FC = () => {
  const criteria = [
    {
      title: "Biblical Grounding",
      desc: "Young believers longing to understand Scripture deeply, moving beyond cliches into rich sound doctrine."
    },
    {
      title: "Local Church Love",
      desc: "Men and women committed to actively serving their pastors and local congregations with faithfulness."
    },
    {
      title: "Gospel Disciple-Makers",
      desc: "Seeking practical equipping to share Christ boldly on campus, in the workplace, and with family."
    },
    {
      title: "Kingdom Purpose",
      desc: "Navigating vocations, relationships, and culture with an unshakeable desire to honor the Lord Jesus."
    }
  ];

  return (
    <Section variant="light-blue" spacing="xl" id="who">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-navy-100 text-navy-800 border border-navy-200">
            <Sparkles className="w-3.5 h-3.5 text-navy-700" />
            <span>Target Audience • Ages 18–25</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Who is CrossLife For?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            CrossLife is designed for young people who desire to grow in their faith, engage meaningfully in the local church, and learn how to live out the Gospel practically.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {criteria.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-subtle border border-slate-200/80 hover:shadow-card transition-shadow flex flex-col justify-between"
            >
              <div>
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
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
