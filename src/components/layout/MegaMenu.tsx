import React from 'react';
import { Link } from 'react-router-dom';
import type { NavItem } from '../../data/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  item: NavItem;
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ item, isOpen, onClose, onRegisterClick }) => {
  if (!isOpen || !item.megaMenu) return null;

  const { columns, highlight } = item.megaMenu;

  return (
    <>
      {/* Background Dim Backdrop */}
      <div
        className="fixed inset-0 top-[110px] bg-navy-950/25 backdrop-blur-[1px] z-40 transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="absolute top-full left-0 right-0 w-full bg-white shadow-modal border-t border-slate-200/90 transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-1"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main 3 Columns */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="space-y-4">
                <h4 className="text-xs font-bold text-navy-800 uppercase tracking-widest pb-2 border-b border-slate-100">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.items.map((subItem, idx) => {
                    const isRegister = subItem.href === '#register';
                    return (
                      <li key={idx}>
                        {isRegister ? (
                          <button
                            onClick={() => {
                              onClose();
                              onRegisterClick();
                            }}
                            className="group block text-left w-full p-2 rounded-lg hover:bg-navy-50/70 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-navy-950 group-hover:text-navy-700">
                                {subItem.label}
                              </span>
                              {subItem.badge && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                  {subItem.badge}
                                </span>
                              )}
                            </div>
                            {subItem.description && (
                              <p className="text-xs text-slate-500 mt-0.5 group-hover:text-slate-600 line-clamp-1">
                                {subItem.description}
                              </p>
                            )}
                          </button>
                        ) : (
                          <Link
                            to={subItem.href}
                            onClick={onClose}
                            className="group block p-2 rounded-lg hover:bg-navy-50/70 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-navy-950 group-hover:text-navy-700">
                                {subItem.label}
                              </span>
                              {subItem.badge && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gold-100 text-navy-900 border border-gold-200">
                                  {subItem.badge}
                                </span>
                              )}
                            </div>
                            {subItem.description && (
                              <p className="text-xs text-slate-500 mt-0.5 group-hover:text-slate-600 line-clamp-1">
                                {subItem.description}
                              </p>
                            )}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Highlight Card */}
          {highlight && (
            <div className="lg:col-span-1 bg-gradient-to-br from-navy-900 to-navy-950 rounded-xl p-5 text-white flex flex-col justify-between shadow-subtle relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-gold-300 bg-gold-400/15 px-2.5 py-0.5 rounded-full mb-3">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  <span>Highlight</span>
                </div>
                <h5 className="text-base font-bold text-white mb-2 leading-snug">
                  {highlight.title}
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {highlight.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-800">
                <Link
                  to={highlight.ctaHref}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 hover:text-gold-200 transition-colors"
                >
                  <span>{highlight.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </>
  );
};
