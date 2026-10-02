import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { eventConfig } from '../../data/event';
import { Users, Calendar, MapPin, Tag, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { Countdown } from './Countdown';

interface EventOverviewProps {
  onRegisterClick: () => void;
}

export const EventOverview: React.FC<EventOverviewProps> = ({ onRegisterClick }) => {
  return (
    <Section variant="light-blue" spacing="lg" id="event-overview">
      <Container>
        <SectionHeading
          eyebrow="CONFERENCE OVERVIEW"
          title="Gathering the Next Generation for Christ"
          subtitle="Everything you need to know about dates, venue, eligibility, and rates for CrossLife 2027."
        />

        {/* 3 Core Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: For Whom? */}
          <div className="bg-white rounded-2xl p-7 shadow-subtle border border-slate-200/80 flex flex-col justify-between hover:shadow-card transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center mb-5 border border-navy-100">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                For Whom?
              </span>
              <h3 className="text-xl font-extrabold text-navy-950 mb-2">
                {eventConfig.audience}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Open to {eventConfig.gender}. Designed for university students, young working professionals, and young adults seeking deep biblical roots.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-navy-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              English comprehension required
            </div>
          </div>

          {/* Card 2: When? */}
          <div className="bg-white rounded-2xl p-7 shadow-subtle border border-slate-200/80 flex flex-col justify-between hover:shadow-card transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center mb-5 border border-navy-100">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                When?
              </span>
              <h3 className="text-xl font-extrabold text-navy-950 mb-2">
                {eventConfig.dates}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {eventConfig.schedule}. Sessions begin at {eventConfig.startTime} on Tuesday and conclude with lunch on Thursday.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              Check-in opens early morning on 14th Sept.
            </div>
          </div>

          {/* Card 3: Where? */}
          <div className="bg-white rounded-2xl p-7 shadow-subtle border border-slate-200/80 flex flex-col justify-between hover:shadow-card transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center mb-5 border border-navy-100">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Where?
              </span>
              <h3 className="text-xl font-extrabold text-navy-950 mb-2">
                {eventConfig.venue.name}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {eventConfig.venue.city}, {eventConfig.venue.state}. A dedicated learning centre campus with full dormitory lodging and dining.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <a
                href={eventConfig.venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-navy-800 hover:text-navy-950 underline underline-offset-2 flex items-center gap-1"
              >
                <span>View on Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Pricing & Promo Banner Block */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left side: Countdown & Text (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Conference Countdown</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Secure Your Place Early
              </h3>
              <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                Registration includes dormitory accommodation, all meals from Tuesday lunch through Thursday lunch, conference notebook, and a free copy of “{eventConfig.freeBook.title}”.
              </p>

              <div className="pt-2">
                <Countdown />
              </div>
            </div>

            {/* Right side: Pricing Cards & Action (5 cols) */}
            <div className="lg:col-span-5 bg-white text-navy-950 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-navy-800 uppercase tracking-wider block">Early Bird Rate</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-black text-navy-950">₹{eventConfig.earlyBirdPrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-500">/ person</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Regular Rate</span>
                  <span className="text-lg font-bold text-slate-400 line-through">₹{eventConfig.regularPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Promo code badge */}
              <div className="my-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold text-amber-950">Save ₹{eventConfig.discount} on Early Bird</span>
                </div>
                <span className="font-mono font-bold text-xs bg-amber-500 text-white px-2 py-1 rounded">
                  {eventConfig.promoCode}
                </span>
              </div>

              <Button
                variant="accent"
                size="lg"
                onClick={onRegisterClick}
                className="w-full py-3.5 text-base font-bold"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Register & Claim Gift
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
