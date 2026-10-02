import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { eventConfig } from '../../data/event';
import { BookCard } from './BookCard';
import { ExternalLink } from 'lucide-react';

export const BookstoreSection: React.FC = () => {
  const { bookstore } = eventConfig;

  return (
    <Section variant="light-blue" spacing="xl" id="bookstore">
      <Container>
        <SectionHeading
          eyebrow="EQUIPPING THE MIND"
          title={bookstore.title}
          subtitle={bookstore.description}
        />

        {/* Real Bookstore Photo Exhibition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 items-center">
          {/* Main Large Display Image (7 cols) */}
          <div className="md:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-card border-4 border-white aspect-[16/10] bg-navy-950 group">
              <img
                src={bookstore.images[0]}
                alt="For The Truth Bookstore Table at Conference"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400 block mb-1">
                  On-Campus Pop-Up
                </span>
                <p className="text-sm font-semibold text-slate-100">
                  Carefully selected reformed literature, commentaries, and biblical theology at conference-exclusive pricing.
                </p>
              </div>
            </div>
          </div>

          {/* Three Supporting Stacked Photos (5 cols) */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            {bookstore.images.slice(1, 4).map((imgUrl, idx) => (
              <div
                key={idx}
                className={`rounded-xl overflow-hidden shadow-sm border-2 border-white aspect-[4/3] bg-slate-100 group ${idx === 2 ? 'col-span-2 aspect-[21/9]' : ''}`}
              >
                <img
                  src={imgUrl}
                  alt={`Bookstore display ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Selected Highlight Titles */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950">
              Featured Conference Literature
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Curated titles to fuel your love for God's truth.
            </p>
          </div>

          <a
            href="https://forthetruth.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-navy-800 hover:text-navy-950"
          >
            <span>Browse For The Truth</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bookstore.books.slice(1, 5).map((book, idx) => (
            <BookCard
              key={idx}
              title={book.title}
              author={book.author}
              image={book.image}
              description={book.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};
