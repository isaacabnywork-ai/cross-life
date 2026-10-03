import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import type { CMSNavItem } from '../../types/cms';
import {
  Menu,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Save,
  Plus,
  Trash2,
  Bell,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const AdminNavigation: React.FC = () => {
  const { navigation, updateNavigation, globalSettings, updateGlobalSettings } = useCMS();
  const [navItems, setNavItems] = useState<CMSNavItem[]>(JSON.parse(JSON.stringify(navigation)));
  const [announcement, setAnnouncement] = useState(JSON.parse(JSON.stringify(globalSettings.announcementBar)));
  const [expandedMegaMenuId, setExpandedMegaMenuId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const next = [...navItems];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    next.forEach((item, idx) => (item.sortOrder = idx + 1));
    setNavItems(next);
  };

  const handleMoveDown = (index: number) => {
    if (index === navItems.length - 1) return;
    const next = [...navItems];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    next.forEach((item, idx) => (item.sortOrder = idx + 1));
    setNavItems(next);
  };

  const handleToggleVisibility = (index: number) => {
    const next = [...navItems];
    next[index].isVisible = !next[index].isVisible;
    setNavItems(next);
  };

  const handleSaveAll = () => {
    updateNavigation(navItems);
    updateGlobalSettings({ announcementBar: announcement });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddNavItem = () => {
    const newItem: CMSNavItem = {
      id: `nav-${Date.now()}`,
      label: 'New Link',
      href: '/new-page',
      sortOrder: navItems.length + 1,
      isVisible: true
    };
    setNavItems([...navItems, newItem]);
  };

  const handleDeleteNavItem = (index: number) => {
    if (window.confirm('Delete this navigation link?')) {
      const next = navItems.filter((_, i) => i !== index);
      setNavItems(next);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header and Save Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950 tracking-tight">Navigation & Mega Menus</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Control the top announcement bar, header links, order, and mega menu columns.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{isSaved ? 'Saved Successfully!' : 'Save Navigation'}</span>
        </button>
      </div>

      {/* 1. Announcement Bar Manager */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-gold-500" />
            <h2 className="font-bold text-navy-950 text-sm">Top Announcement Bar Notice</h2>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-navy-950">
            <span>Enabled</span>
            <input
              type="checkbox"
              checked={announcement.enabled}
              onChange={(e) => setAnnouncement({ ...announcement, enabled: e.target.checked })}
              className="rounded"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Badge Text</label>
            <input
              type="text"
              value={announcement.badgeText || ''}
              onChange={(e) => setAnnouncement({ ...announcement, badgeText: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Discount Text</label>
            <input
              type="text"
              value={announcement.text || ''}
              onChange={(e) => setAnnouncement({ ...announcement, text: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Promo Code</label>
            <input
              type="text"
              value={announcement.promoCode || ''}
              onChange={(e) => setAnnouncement({ ...announcement, promoCode: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Dates & City</label>
            <input
              type="text"
              value={announcement.datesNotice || ''}
              onChange={(e) => setAnnouncement({ ...announcement, datesNotice: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Header Navigation Items List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Menu className="w-4 h-4 text-navy-800" />
            <h2 className="font-bold text-navy-950 text-sm">Header Navigation Items</h2>
          </div>
          <button
            onClick={handleAddNavItem}
            className="px-3 py-1.5 rounded-lg bg-navy-50 hover:bg-navy-100 text-navy-900 text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Link</span>
          </button>
        </div>

        <div className="space-y-3">
          {navItems.map((item, idx) => {
            const hasMega = !!item.megaMenu;
            const isExpanded = expandedMegaMenuId === item.id;

            return (
              <div
                key={item.id || idx}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  {/* Left: Reorder & inputs */}
                  <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button
                        disabled={idx === 0}
                        onClick={() => handleMoveUp(idx)}
                        className="p-1 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-30 text-slate-600"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        disabled={idx === navItems.length - 1}
                        onClick={() => handleMoveDown(idx)}
                        className="p-1 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-30 text-slate-600"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 flex-1">
                      <input
                        type="text"
                        placeholder="Label"
                        value={item.label}
                        onChange={(e) => {
                          const next = [...navItems];
                          next[idx].label = e.target.value;
                          setNavItems(next);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold outline-none bg-white"
                      />
                      <input
                        type="text"
                        placeholder="URL (e.g. /speakers)"
                        value={item.href || ''}
                        disabled={hasMega}
                        onChange={(e) => {
                          const next = [...navItems];
                          next[idx].href = e.target.value;
                          setNavItems(next);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono outline-none bg-white disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {hasMega && (
                      <button
                        type="button"
                        onClick={() => setExpandedMegaMenuId(isExpanded ? null : item.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-navy-50 text-navy-800 text-xs font-bold flex items-center gap-1 hover:bg-navy-100 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Mega Menu Columns</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(idx)}
                      className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                        item.isVisible
                          ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                          : 'text-slate-400 bg-slate-200 hover:bg-slate-300'
                      }`}
                      title={item.isVisible ? 'Visible' : 'Hidden'}
                    >
                      {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteNavItem(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Mega Menu Editor for this item */}
                {hasMega && isExpanded && item.megaMenu && (
                  <div className="pt-3 border-t border-slate-200 space-y-4 bg-white p-4 rounded-xl">
                    <span className="text-xs font-bold uppercase tracking-wider text-navy-950 block">
                      Mega Menu Structure for &quot;{item.label}&quot;
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {item.megaMenu.columns.map((col, colIdx) => (
                        <div key={colIdx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                          <label className="block font-bold text-slate-700">Column #{colIdx + 1} Title</label>
                          <input
                            type="text"
                            value={col.title}
                            onChange={(e) => {
                              const next = [...navItems];
                              next[idx].megaMenu!.columns[colIdx].title = e.target.value;
                              setNavItems(next);
                            }}
                            className="w-full px-2.5 py-1 rounded border border-slate-300 font-bold bg-white text-xs"
                          />

                          <div className="space-y-1.5 pt-2">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Column Links</span>
                            {col.items.map((link, linkIdx) => (
                              <div key={linkIdx} className="space-y-1 p-2 rounded bg-white border border-slate-200">
                                <input
                                  type="text"
                                  placeholder="Link Label"
                                  value={link.label}
                                  onChange={(e) => {
                                    const next = [...navItems];
                                    next[idx].megaMenu!.columns[colIdx].items[linkIdx].label = e.target.value;
                                    setNavItems(next);
                                  }}
                                  className="w-full px-2 py-0.5 border border-slate-200 text-xs font-semibold rounded"
                                />
                                <input
                                  type="text"
                                  placeholder="URL (e.g. /about#why)"
                                  value={link.href}
                                  onChange={(e) => {
                                    const next = [...navItems];
                                    next[idx].megaMenu!.columns[colIdx].items[linkIdx].href = e.target.value;
                                    setNavItems(next);
                                  }}
                                  className="w-full px-2 py-0.5 border border-slate-200 text-[11px] font-mono rounded"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Highlight Card for Mega Menu */}
                    {item.megaMenu.highlight && (
                      <div className="p-3 rounded-lg bg-gold-50/50 border border-gold-200 text-xs space-y-2">
                        <span className="font-bold text-gold-900 block text-xs">
                          Side Highlight Card
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Highlight Title"
                            value={item.megaMenu.highlight.title}
                            onChange={(e) => {
                              const next = [...navItems];
                              next[idx].megaMenu!.highlight!.title = e.target.value;
                              setNavItems(next);
                            }}
                            className="px-2.5 py-1 rounded border border-slate-300 font-bold bg-white text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Highlight Description"
                            value={item.megaMenu.highlight.description}
                            onChange={(e) => {
                              const next = [...navItems];
                              next[idx].megaMenu!.highlight!.description = e.target.value;
                              setNavItems(next);
                            }}
                            className="px-2.5 py-1 rounded border border-slate-300 bg-white text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
