import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PageHeroProps {
  title: string;
  badge?: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  badge,
  description,
  breadcrumbs,
  className
}) => {
  return (
    <div className={cn('bg-navy-950 text-white pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden', className)}>
      {/* Background architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />
      {/* Gold radiant corner accent */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <Container>
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 font-medium">
            <Link to="/" className="hover:text-gold-300 transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-gold-300 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gold-300">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {badge && (
          <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gold-400/15 text-gold-300 border border-gold-400/30 mb-4">
            {badge}
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
          {title}
        </h1>

        {description && (
          <p className="mt-5 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
};
