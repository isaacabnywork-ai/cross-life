import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { eventConfig } from '../../data/event';
import { navigationData } from '../../data/navigation';
import { useCMS } from '../../context/CMSContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onRegisterClick }) => {
  const { navigation, globalSettings } = useCMS();
  const navItems = (navigation && navigation.length > 0)
    ? navigation.filter((item) => item.isVisible)
    : (navigationData as any[]);

  const [openSectionId, setOpenSectionId] = useState<string | null>(navItems[0]?.id || null);

  // Keyboard Escape & Body Scroll Lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  const regConfig = globalSettings?.registration;
  const eventDates = regConfig?.dates || eventConfig.dates;
  const promoCode = regConfig?.promoCode || eventConfig.promoCode;
  const discount = regConfig?.discount ?? eventConfig.discount;
  const siteName = globalSettings?.siteName || 'CrossLife';
  const logoUrl = globalSettings?.logoUrl || '/images/crosslife-logo.webp';
  const organiserName = globalSettings?.organiserName || 'Equip Indian Churches';

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        {/* Top bar with Logo & Close */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <img
              src={logoUrl}
              alt={siteName}
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-extrabold text-navy-950 text-lg tracking-tight">{siteName}</span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-navy-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Navigation List */}
        <div className="p-5 space-y-2 flex-1">
          {navItems.map((item) => {
            if (item.megaMenu && item.megaMenu.columns?.length > 0) {
              const isSectionOpen = openSectionId === item.id;
              return (
                <div key={item.id} className="border-b border-slate-100 pb-2">
                  <button
                    type="button"
                    onClick={() => toggleSection(item.id)}
                    className="flex items-center justify-between w-full py-2.5 text-base font-bold text-navy-950 text-left uppercase tracking-wide"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isSectionOpen ? 'rotate-180 text-navy-900' : ''
                      }`}
                    />
                  </button>

                  {isSectionOpen && (
                    <div className="pl-2 py-2 space-y-3 text-sm text-slate-600">
                      {item.megaMenu.columns.map((col: any, colIdx: number) => (
                        <div key={colIdx} className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                            {col.title}
                          </span>
                          {col.items.map((sub: any, sIdx: number) => {
                            if (sub.href === '#register') {
                              return (
                                <button
                                  key={sIdx}
                                  type="button"
                                  onClick={() => {
                                    onClose();
                                    onRegisterClick();
                                  }}
                                  className="block py-1 text-left w-full hover:text-navy-900 font-semibold text-navy-800"
                                >
                                  {sub.label}
                                </button>
                              );
                            }
                            return (
                              <Link
                                key={sIdx}
                                to={sub.href}
                                onClick={onClose}
                                className="block py-1 hover:text-navy-900 transition-colors"
                              >
                                <span>{sub.label}</span>
                                {sub.badge && (
                                  <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-gold-100 text-navy-900">
                                    {sub.badge}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      ))}

                      {item.megaMenu.highlight && (
                        <div className="p-3 rounded-xl bg-navy-950 text-white mt-3">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gold-300 uppercase tracking-wider mb-1">
                            <Sparkles className="w-3 h-3 text-gold-400" />
                            <span>{item.megaMenu.highlight.title}</span>
                          </div>
                          <p className="text-xs text-slate-300 mb-2">
                            {item.megaMenu.highlight.description}
                          </p>
                          <Link
                            to={item.megaMenu.highlight.ctaHref}
                            onClick={onClose}
                            className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1"
                          >
                            <span>{item.megaMenu.highlight.ctaText}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            // Direct link
            return (
              <Link
                key={item.id}
                to={item.href || '/'}
                onClick={onClose}
                className="block py-3 text-base font-bold text-navy-950 hover:text-navy-700 border-b border-slate-100 uppercase tracking-wide transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Bottom Action Area */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-3">
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium text-navy-800">
              <Calendar className="w-3.5 h-3.5 text-navy-600" />
              <span>{eventDates}</span>
            </span>
            {discount > 0 && (
              <span className="font-semibold text-emerald-700">Code: {promoCode} (-₹{discount})</span>
            )}
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              onClose();
              onRegisterClick();
            }}
            className="w-full py-3.5 bg-navy-950 text-white"
          >
            REGISTER NOW
          </Button>

          <div className="text-center">
            <span className="text-[11px] text-slate-500">Organised by </span>
            <span className="text-[11px] font-bold text-navy-900">{organiserName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
