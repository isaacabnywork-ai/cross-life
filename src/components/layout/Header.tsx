import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationData, type NavItem } from '../../data/navigation';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { Button } from '../common/Button';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { Menu, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { eventConfig } from '../../data/event';

import { useCMS } from '../../context/CMSContext';

interface HeaderProps {
  onRegisterClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterClick }) => {
  const { navigation, globalSettings } = useCMS();
  const navItems = (navigation && navigation.length > 0)
    ? navigation.filter((item) => item.isVisible)
    : (navigationData as any[]);

  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollDirection();
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = (item: NavItem) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (item.megaMenu) {
      setActiveMegaMenu(item.label);
    } else {
      setActiveMegaMenu(null);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  const handleMenuEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const closeMegaMenu = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMegaMenu(null);
  };

  // Close on route change during render
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    if (activeMegaMenu !== null) {
      setActiveMegaMenu(null);
    }
  }

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeMegaMenu();
      }
    };
    if (activeMegaMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMegaMenu]);

  const activeItem = navItems.find(
    (item) => item.label === activeMegaMenu && item.megaMenu
  );

  const announcement = globalSettings.announcementBar;

  return (
    <>
      {/* Top Banner Notice for Early Bird */}
      {announcement.enabled && (
        <div className="bg-navy-950 text-white text-xs py-2 px-4 border-b border-navy-850 relative z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-gold-400 text-navy-950 font-bold uppercase text-[10px]">
                {announcement.badgeText || "Early Bird"}
              </span>
              <span className="hidden sm:inline text-slate-300">
                {announcement.text || "Save ₹500 with code"}
              </span>
              <span className="font-mono font-bold text-gold-300 bg-white/10 px-1.5 py-0.5 rounded">
                {announcement.promoCode || eventConfig.promoCode}
              </span>
              <span className="text-slate-400 hidden md:inline">
                ({announcement.datesNotice || `${eventConfig.dates} • Hyderabad`})
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-300">
              <Link to="/statement-of-faith" className="hover:text-gold-300 transition-colors hidden sm:inline">
                Statement of Faith
              </Link>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <a href={`mailto:${globalSettings.email || "contact@crosslife.in"}`} className="hover:text-gold-300 transition-colors">
                {globalSettings.email || "contact@crosslife.in"}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Header */}
      <header
        ref={headerRef}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMenuEnter}
        className={cn(
          'sticky top-0 left-0 right-0 z-40 transition-all duration-300 relative',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-subtle border-b border-slate-200/80 py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4 sm:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo on Left */}
          <Link
            to="/"
            onClick={closeMegaMenu}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 rounded-lg p-1"
            aria-label="CrossLife Conference Home"
          >
            <div className="h-10 sm:h-11 flex items-center">
              <img
                src={globalSettings.logoUrl || "/images/crosslife-logo.webp"}
                alt={globalSettings.siteName || "CrossLife"}
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="logo-fallback hidden items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">Cross<span className="text-navy-700">Life</span></span>
              </div>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navItems.map((item, idx) => {
              const hasMegaMenu = !!item.megaMenu;
              const isActive = item.href ? location.pathname === item.href : false;
              const isMegaActive = activeMegaMenu === item.label;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => handleMouseEnter(item)}
                >
                  {hasMegaMenu ? (
                    <button
                      type="button"
                      onClick={() => setActiveMegaMenu(isMegaActive ? null : item.label)}
                      className={cn(
                        'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold tracking-wide transition-colors uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700',
                        isMegaActive
                          ? 'text-navy-950 bg-navy-50 font-extrabold'
                          : 'text-slate-700 hover:text-navy-950 hover:bg-slate-50'
                      )}
                      aria-expanded={isMegaActive}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200 opacity-60',
                          isMegaActive ? 'rotate-180 text-navy-900' : ''
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href || '#'}
                      onClick={closeMegaMenu}
                      className={cn(
                        'px-3.5 py-2 rounded-lg text-sm font-bold tracking-wide transition-colors uppercase block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700',
                        isActive
                          ? 'text-navy-900 bg-navy-50 font-extrabold'
                          : 'text-slate-700 hover:text-navy-950 hover:bg-slate-50'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action: REGISTER NOW Button (Desktop) & Hamburger (Mobile) */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={onRegisterClick}
              className="hidden sm:inline-flex bg-navy-900 hover:bg-navy-950 text-white font-bold tracking-wide uppercase px-5 py-2.5 shadow-sm"
            >
              REGISTER NOW
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:text-navy-950 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Global Full-Width Mega Menu Mounted at Header Level */}
        {activeItem && (
          <MegaMenu
            item={activeItem}
            isOpen={true}
            onClose={closeMegaMenu}
            onRegisterClick={onRegisterClick}
          />
        )}
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onRegisterClick={onRegisterClick}
      />
    </>
  );
};
