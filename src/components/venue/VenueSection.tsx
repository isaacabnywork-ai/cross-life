import React from 'react';
import { Section } from '../common/Section';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { eventConfig } from '../../data/event';
import { MapPin, Navigation, Bed, Utensils, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const VenueSection: React.FC = () => {
  return (
    <Section variant="white" spacing="xl" id="venue">
      <Container>
        <SectionHeading
          eyebrow="CONFERENCE LOCATION"
          title={eventConfig.venue.name}
          subtitle={`${eventConfig.venue.city}, ${eventConfig.venue.state} — A tranquil campus designed for focused teaching, shared meals, and deep community.`}
        />

        {/* Venue Split Editorial Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Main Large Hero Image (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 aspect-[16/10] group bg-navy-950">
              <img
                src={eventConfig.venue.images[0]}
                alt={eventConfig.venue.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                <div>
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-1">
                    Conference Campus
                  </span>
                  <div className="text-xl font-bold text-white">
                    Ashirwad Global Learning Centre
                  </div>
                </div>
                <a
                  href={eventConfig.venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md text-xs font-bold text-white hover:bg-white hover:text-navy-950 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Details & Amenities (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-navy-800 text-sm font-bold">
                <MapPin className="w-4 h-4 text-navy-700" />
                <span>{eventConfig.venue.fullAddress}</span>
              </div>
              <h3 className="text-2xl font-black text-navy-950 leading-tight">
                Dedicated Campus for Study & Fellowship
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Ashirwad Global Learning Centre provides an ideal learning environment away from urban bustle, allowing attendees to focus entirely on God's Word, prayer, and intentional relationship-building.
              </p>
            </div>

            {/* Campus Features Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <Bed className="w-5 h-5 text-navy-700 mb-2" />
                <h4 className="text-xs font-bold text-navy-950">Dormitory Lodging</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Separate dorms for men and women.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <Utensils className="w-5 h-5 text-navy-700 mb-2" />
                <h4 className="text-xs font-bold text-navy-950">Communal Dining</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">All meals included in registration.</p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                as="a"
                href={eventConfig.venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto text-sm"
              >
                VIEW LOCATION & DIRECTIONS
              </Button>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery of Campus Grounds */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {eventConfig.venue.images.slice(1, 5).map((imgUrl, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-sm border border-slate-200 group relative"
            >
              <img
                src={imgUrl}
                alt={`Ashirwad campus facility ${idx + 2}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
