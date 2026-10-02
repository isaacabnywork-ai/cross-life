import React from 'react';
import { PageHero } from '../components/common/PageHero';
import { Section } from '../components/common/Section';
import { Container } from '../components/common/Container';
import { statementOfFaithData, type ArticleOfFaith } from '../data/statementOfFaith';
import { siteConfig } from '../config/site';
import { Bookmark } from 'lucide-react';
import { CTASection } from '../components/common/CTASection';
import { useRegistration } from '../context/RegistrationContext';

export const StatementOfFaith: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <>
      <PageHero
        badge="THEOLOGICAL CONFESSION"
        title="Statement of Faith"
        description="The 11 historic, biblically orthodox convictions that undergird Equip Indian Churches and the CrossLife Conference."
        breadcrumbs={[{ label: 'Statement of Faith' }]}
      />

      <Section variant="white" spacing="xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Desktop Table of Contents Sticky Sidebar (4 cols) */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-800 pb-3 border-b border-slate-200">
                  <Bookmark className="w-4 h-4 text-gold-500" />
                  <span>Articles of Faith</span>
                </div>

                <nav className="space-y-1.5 text-xs">
                  {statementOfFaithData.map((art: ArticleOfFaith) => (
                    <a
                      key={art.number}
                      href={`#article-${art.number}`}
                      className="block py-1.5 px-2.5 rounded-lg text-slate-600 hover:text-navy-950 hover:bg-white hover:shadow-xs transition-all font-medium"
                    >
                      <span className="font-mono text-slate-400 mr-2">{String(art.number).padStart(2, '0')}.</span>
                      <span>{art.title.replace('—The Holy Bible', '')}</span>
                    </a>
                  ))}
                </nav>

                <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                  Confessed by <strong className="text-navy-900">{siteConfig.organiser}</strong> in the reformed evangelical tradition.
                </div>
              </div>
            </aside>

            {/* Main Typeset Theological Document (8 cols) */}
            <article className="lg:col-span-8 max-w-3xl">
              {/* Document Header Intro */}
              <div className="pb-10 mb-12 border-b border-slate-200">
                <span className="text-xs font-mono font-bold tracking-widest text-navy-700 uppercase block mb-2">
                  CONFESSION OF DOCTRINE
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight mb-4">
                  The Faith Once for All Delivered
                </h2>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-serif italic">
                  “Beloved, although I was very eager to write to you about our common salvation, I found it necessary to write appealing to you to contend for the faith that was once for all delivered to the saints.” — Jude 3
                </p>
              </div>

              {/* The 11 Numbered Articles (Editorial Typesetting, NOT boxed cards) */}
              <div className="space-y-16">
                {statementOfFaithData.map((article: ArticleOfFaith) => (
                  <section
                    key={article.number}
                    id={`article-${article.number}`}
                    className="scroll-mt-32 space-y-4"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xl sm:text-2xl font-black text-gold-500">
                        {String(article.number).padStart(2, '0')}.
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
                        {article.title}
                      </h3>
                    </div>

                    <div className="space-y-4 text-base sm:text-lg text-slate-800 leading-relaxed pl-8 border-l-2 border-slate-100">
                      {article.paragraphs.map((p: string, pIdx: number) => (
                        <p key={pIdx}>
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* End of Confession Note */}
              <div className="mt-20 pt-8 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
                <div className="font-bold text-navy-950 uppercase tracking-widest">
                  Equip Indian Churches • CrossLife Youth Conference
                </div>
                <p>Scripture citations are based on the English Standard Version (ESV).</p>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      <CTASection onRegisterClick={openRegistration} />
    </>
  );
};
