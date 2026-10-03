import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import type { PageSection, SectionType } from '../../types/cms';
import { SectionEditModal } from './components/SectionEditModal';
import {
  Layers,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit3,
  Copy,
  Trash2,
  Plus,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const AdminPageEditor: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    pages,
    getSectionsForPage,
    updateSection,
    reorderSections,
    toggleSectionVisibility,
    duplicateSection,
    deleteSection,
    addSection
  } = useCMS();

  const currentPageId = searchParams.get('pageId') || 'page-home';
  const selectedPage = pages.find((p) => p.id === currentPageId) || pages[0];

  const sections = getSectionsForPage(selectedPage?.id || 'page-home');
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [selectedTypeToAdd, setSelectedTypeToAdd] = useState<SectionType>('rich_text');

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const ids = sections.map((s) => s.id);
    const temp = ids[index - 1];
    ids[index - 1] = ids[index];
    ids[index] = temp;
    reorderSections(selectedPage.id, ids);
  };

  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const ids = sections.map((s) => s.id);
    const temp = ids[index + 1];
    ids[index + 1] = ids[index];
    ids[index] = temp;
    reorderSections(selectedPage.id, ids);
  };

  const handleAddSectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSection(selectedPage.id, selectedTypeToAdd);
    setIsAddingSection(false);
  };

  const sectionTypeOptions: { type: SectionType; label: string; desc: string }[] = [
    { type: 'hero', label: 'Hero Banner', desc: 'Main title, dates, countdown, CTA and scripture' },
    { type: 'three_pillars', label: 'The Three Pillars', desc: 'Live, Glorify, and Proclaim Christ' },
    { type: 'who_is_it_for', label: 'Who Is It For?', desc: 'Audience eligibility cards for ages 18–25' },
    { type: 'whats_unique', label: 'What\'s Unique (Distinctives)', desc: 'Substance over style & truth over trend' },
    { type: 'venue', label: 'Venue & Accommodations', desc: 'Ashirwad Campus info, amenities and maps' },
    { type: 'book_promotion', label: 'Free Book Promotion', desc: 'John Piper book gift and claim CTA' },
    { type: 'faq', label: 'Frequently Asked Questions', desc: 'Top inquiries accordion or full catalog' },
    { type: 'organiser_partners', label: 'Organiser & Partners', desc: 'Equip Indian Churches and ministry sponsors' },
    { type: 'goals', label: 'Five Hopes & Goals', desc: 'Numbered editorial outcomes' },
    { type: 'why_crosslife', label: 'Why CrossLife?', desc: 'Distraction beacon & pastoral conviction' },
    { type: 'rich_text', label: 'Rich Text / Editorial Block', desc: 'Custom formatted text paragraphs & heading' },
    { type: 'cta_banner', label: 'Registration CTA Banner', desc: 'High-conversion ticket register prompt' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Page Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950 tracking-tight">Section Builder</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Reorder, customize, show/hide, and add modular components to any page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Page Selector Dropdown */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-bold">
            <span className="text-slate-400">Page:</span>
            <select
              value={selectedPage?.id}
              onChange={(e) => setSearchParams({ pageId: e.target.value })}
              className="font-bold text-navy-950 bg-transparent outline-none cursor-pointer"
            >
              {pages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.slug})
                </option>
              ))}
            </select>
          </div>

          <a
            href={selectedPage?.slug || '/'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-sm transition-colors"
            title="Preview Live Page"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsAddingSection(true)}
            className="px-4 py-2 bg-navy-900 hover:bg-navy-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Section</span>
          </button>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {sections.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3">
            <Layers className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-navy-950 text-base">No sections on this page</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Click &quot;Add Section&quot; above to add modular components to this page.
            </p>
          </div>
        ) : (
          sections.map((section, index) => {
            const isFirst = index === 0;
            const isLast = index === sections.length - 1;

            return (
              <div
                key={section.id}
                className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-subtle ${
                  section.isVisible
                    ? 'border-slate-200 hover:border-slate-300'
                    : 'border-slate-200 bg-slate-50/70 opacity-60'
                }`}
              >
                {/* Left: Reorder & Info */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Move Up / Move Down buttons */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      disabled={isFirst}
                      onClick={() => handleMoveUp(index)}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={isLast}
                      onClick={() => handleMoveDown(index)}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Order Number Badge */}
                  <div className="w-7 h-7 rounded-lg bg-navy-50 text-navy-900 font-mono font-bold text-xs flex items-center justify-center border border-navy-100 shrink-0">
                    {index + 1}
                  </div>

                  {/* Section Title & Type */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-navy-950">
                        {section.title}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {section.type.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500">
                      {(section.data as any)?.heading
                        ? `Heading: "${(section.data as any).heading}"`
                        : (section.data as any)?.badge
                        ? `Badge: "${(section.data as any).badge}"`
                        : 'Default conference content'}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* Visibility toggle button */}
                  <button
                    onClick={() => toggleSectionVisibility(selectedPage.id, section.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      section.isVisible
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {section.isVisible ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>

                  {/* Edit Content */}
                  <button
                    onClick={() => setEditingSection(section)}
                    className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-950 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Content</span>
                  </button>

                  {/* Duplicate */}
                  <button
                    onClick={() => duplicateSection(selectedPage.id, section.id)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-navy-950 transition-colors"
                    title="Duplicate Section"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete section "${section.title}"?`)) {
                        deleteSection(selectedPage.id, section.id);
                      }
                    }}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                    title="Delete Section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Section Edit Modal */}
      {editingSection && (
        <SectionEditModal
          key={editingSection.id}
          section={editingSection}
          isOpen={true}
          onClose={() => setEditingSection(null)}
          onSave={(updates) => {
            updateSection(selectedPage.id, editingSection.id, updates);
            setEditingSection(null);
          }}
        />
      )}

      {/* Add New Section Modal */}
      {isAddingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-500" />
                <h3 className="font-bold text-navy-950 text-base">Add New Section to {selectedPage.title}</h3>
              </div>
              <button
                onClick={() => setIsAddingSection(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSectionSubmit} className="p-6 space-y-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Choose Section Component Template
              </label>

              <div className="space-y-2 max-h-72 overflow-y-auto p-1">
                {sectionTypeOptions.map((opt) => (
                  <label
                    key={opt.type}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      selectedTypeToAdd === opt.type
                        ? 'border-navy-900 bg-navy-50/60 ring-1 ring-navy-900'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sectionType"
                      value={opt.type}
                      checked={selectedTypeToAdd === opt.type}
                      onChange={() => setSelectedTypeToAdd(opt.type)}
                      className="mt-1"
                    />
                    <div>
                      <span className="font-bold text-navy-950 text-xs sm:text-sm block">
                        {opt.label}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {opt.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddingSection(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-lg shadow-sm"
                >
                  Add Section to Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPageEditor;
