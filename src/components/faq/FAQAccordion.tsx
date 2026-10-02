import React, { useState } from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { faqData } from '../../data/faq';
import { FAQItem } from './FAQItem';
import { HelpCircle, Mail, Phone } from 'lucide-react';
import { siteConfig } from '../../config/site';

interface FAQAccordionProps {
  showAllCategories?: boolean;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ showAllCategories = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(faqData[0].category);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'overview-1': true // First item open by default
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categoriesToDisplay = showAllCategories
    ? faqData
    : faqData.filter(c => c.category === selectedCategory);

  return (
    <Section variant="white" spacing="xl" id="faq">
      <Container size="narrow">
        <SectionHeading
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Everything You Need to Know"
          subtitle="Answers to common questions regarding travel, accommodation, meals, registration, and donations."
        />

        {/* Category Filter Tabs (if not showing all) */}
        {!showAllCategories && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-slate-200">
            {faqData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat.category
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Groups */}
        <div className="space-y-8">
          {categoriesToDisplay.map((group) => (
            <div key={group.category} className="space-y-3">
              {showAllCategories && (
                <h3 className="text-lg font-extrabold text-navy-950 pt-4 pb-1 border-b border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold-500" />
                  <span>{group.category}</span>
                </h3>
              )}
              {group.items.map((item) => (
                <FAQItem
                  key={item.id}
                  id={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={!!openItems[item.id]}
                  onToggle={() => toggleItem(item.id)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-navy-50/70 border border-navy-100 text-center">
          <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center mx-auto mb-3">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-navy-950 mb-1">Still have a question?</h4>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 max-w-md mx-auto">
            Our team is glad to assist you with registration inquiries, travel planning, or financial aid.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-navy-800">
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-navy-950">
              <Mail className="w-4 h-4 text-navy-700" />
              <span>{siteConfig.email}</span>
            </a>
            <span className="text-slate-300">•</span>
            <a href={`tel:${siteConfig.phones[0].replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-navy-950">
              <Phone className="w-4 h-4 text-navy-700" />
              <span>{siteConfig.phones[0]}</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
};
