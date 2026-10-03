import React, { useState } from 'react';
import type { PageSection } from '../../../types/cms';
import { MediaPickerModal } from './MediaPickerModal';
import { X, Save, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

interface SectionEditModalProps {
  section: PageSection;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSection: Partial<PageSection>) => void;
}

export const SectionEditModal: React.FC<SectionEditModalProps> = ({
  section,
  isOpen,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState(section.title);
  const [isVisible, setIsVisible] = useState(section.isVisible);
  const [data, setData] = useState<any>(JSON.parse(JSON.stringify(section.data || {})));
  const [mediaPickerField, setMediaPickerField] = useState<string | null>(null);


  // Handle Escape key to dismiss
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDataChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave({
      title,
      isVisible,
      data
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-navy-100 text-navy-800">
                {section.type.replace(/_/g, ' ')}
              </span>
              <h3 className="font-bold text-navy-950 text-base">Edit Section Content</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Changes reflect live on the website immediately after saving.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          {/* General Section Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200">
            <div>
              <label className="block text-xs font-bold text-navy-950 uppercase mb-1">
                Admin Section Label
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-navy-950 block text-xs">Section Visibility</span>
                <span className="text-[11px] text-slate-500">Show or hide on public site</span>
              </div>
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isVisible ? 'bg-navy-900' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isVisible ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Section Type Specific Editors */}
          {/* 1. HERO SECTION */}
          {section.type === 'hero' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Top Eyebrow Badge</label>
                  <input
                    type="text"
                    value={data.eyebrow || ''}
                    onChange={(e) => handleDataChange('eyebrow', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dates Text</label>
                  <input
                    type="text"
                    value={data.datesText || ''}
                    onChange={(e) => handleDataChange('datesText', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Main Headline (Support linebreaks)</label>
                <textarea
                  rows={3}
                  value={data.headline || ''}
                  onChange={(e) => handleDataChange('headline', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subheadline Description</label>
                <textarea
                  rows={2}
                  value={data.subheadline || ''}
                  onChange={(e) => handleDataChange('subheadline', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary CTA Button</label>
                  <input
                    type="text"
                    value={data.primaryCtaText || ''}
                    onChange={(e) => handleDataChange('primaryCtaText', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Secondary CTA Button</label>
                  <input
                    type="text"
                    value={data.secondaryCtaText || ''}
                    onChange={(e) => handleDataChange('secondaryCtaText', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Early Bird Notice</label>
                <input
                  type="text"
                  value={data.earlyBirdNotice || ''}
                  onChange={(e) => handleDataChange('earlyBirdNotice', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hero Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={data.bgImageUrl || ''}
                    onChange={(e) => handleDataChange('bgImageUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-xs"
                    placeholder="/images/preaching.jpg"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerField('bgImageUrl')}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-navy-900 flex items-center gap-1.5 shrink-0"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Choose</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Scripture Quote</label>
                  <input
                    type="text"
                    value={data.quoteText || ''}
                    onChange={(e) => handleDataChange('quoteText', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Scripture Reference</label>
                  <input
                    type="text"
                    value={data.quoteAuthor || ''}
                    onChange={(e) => handleDataChange('quoteAuthor', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. THREE PILLARS SECTION */}
          {section.type === 'three_pillars' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={data.badge || ''}
                    onChange={(e) => handleDataChange('badge', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Heading</label>
                  <input
                    type="text"
                    value={data.heading || ''}
                    onChange={(e) => handleDataChange('heading', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                <textarea
                  rows={2}
                  value={data.subtitle || ''}
                  onChange={(e) => handleDataChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">Pillars List</label>
                  <button
                    type="button"
                    onClick={() => {
                      const newPillar = {
                        id: `p-${Date.now()}`,
                        number: `0${(data.pillars || []).length + 1}`,
                        title: 'NEW PILLAR',
                        subtitle: 'PILLAR SUBTITLE',
                        meaning: '',
                        scripture: '',
                        reference: '',
                        description: ''
                      };
                      handleDataChange('pillars', [...(data.pillars || []), newPillar]);
                    }}
                    className="text-xs font-bold text-navy-900 hover:text-navy-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Pillar
                  </button>
                </div>

                <div className="space-y-3">
                  {(data.pillars || []).map((pillar: any, pIdx: number) => (
                    <div key={pillar.id || pIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-navy-900">Pillar #{pIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = data.pillars.filter((_: any, i: number) => i !== pIdx);
                            handleDataChange('pillars', updated);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Title (e.g. ONE LIFE)"
                          value={pillar.title || ''}
                          onChange={(e) => {
                            const updated = [...data.pillars];
                            updated[pIdx].title = e.target.value;
                            handleDataChange('pillars', updated);
                          }}
                          className="px-3 py-1.5 rounded border border-slate-300 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Subtitle (e.g. LIVE FOR CHRIST)"
                          value={pillar.subtitle || ''}
                          onChange={(e) => {
                            const updated = [...data.pillars];
                            updated[pIdx].subtitle = e.target.value;
                            handleDataChange('pillars', updated);
                          }}
                          className="px-3 py-1.5 rounded border border-slate-300 text-xs"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description..."
                        value={pillar.description || ''}
                        onChange={(e) => {
                          const updated = [...data.pillars];
                          updated[pIdx].description = e.target.value;
                          handleDataChange('pillars', updated);
                        }}
                        className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. WHO IS IT FOR SECTION */}
          {section.type === 'who_is_it_for' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={data.badge || ''}
                    onChange={(e) => handleDataChange('badge', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Heading</label>
                  <input
                    type="text"
                    value={data.heading || ''}
                    onChange={(e) => handleDataChange('heading', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                <textarea
                  rows={2}
                  value={data.subtitle || ''}
                  onChange={(e) => handleDataChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">Target Audience Cards</label>
                  <button
                    type="button"
                    onClick={() => {
                      const newCard = {
                        id: `w-${Date.now()}`,
                        title: 'Audience Title',
                        subtitle: 'Description subtitle',
                        description: 'Detailed description of this group',
                        tag: 'Audience'
                      };
                      handleDataChange('cards', [...(data.cards || []), newCard]);
                    }}
                    className="text-xs font-bold text-navy-900 hover:text-navy-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Card
                  </button>
                </div>

                <div className="space-y-3">
                  {(data.cards || []).map((card: any, cIdx: number) => (
                    <div key={card.id || cIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-navy-900">Card #{cIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = data.cards.filter((_: any, i: number) => i !== cIdx);
                            handleDataChange('cards', updated);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Title (e.g. Young Adults 18–25)"
                        value={card.title || ''}
                        onChange={(e) => {
                          const updated = [...data.cards];
                          updated[cIdx].title = e.target.value;
                          handleDataChange('cards', updated);
                        }}
                        className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                      />
                      <textarea
                        rows={2}
                        placeholder="Description..."
                        value={card.description || ''}
                        onChange={(e) => {
                          const updated = [...data.cards];
                          updated[cIdx].description = e.target.value;
                          handleDataChange('cards', updated);
                        }}
                        className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. VENUE SECTION */}
          {section.type === 'venue' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={data.badge || ''}
                    onChange={(e) => handleDataChange('badge', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Venue Name</label>
                  <input
                    type="text"
                    value={data.venueName || data.heading || ''}
                    onChange={(e) => {
                      handleDataChange('venueName', e.target.value);
                      handleDataChange('heading', e.target.value);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Address</label>
                <input
                  type="text"
                  value={data.fullAddress || ''}
                  onChange={(e) => handleDataChange('fullAddress', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={data.description || ''}
                  onChange={(e) => handleDataChange('description', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Venue Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={data.imageUrl || ''}
                    onChange={(e) => handleDataChange('imageUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerField('imageUrl')}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-navy-900 flex items-center gap-1.5 shrink-0"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Choose</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps URL</label>
                <input
                  type="text"
                  value={data.directionsUrl || ''}
                  onChange={(e) => handleDataChange('directionsUrl', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-xs"
                />
              </div>
            </div>
          )}

          {/* 5. BOOK PROMOTION SECTION */}
          {section.type === 'book_promotion' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={data.badge || ''}
                    onChange={(e) => handleDataChange('badge', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Book Title</label>
                  <input
                    type="text"
                    value={data.bookTitle || ''}
                    onChange={(e) => handleDataChange('bookTitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Author</label>
                <input
                  type="text"
                  value={data.author || ''}
                  onChange={(e) => handleDataChange('author', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={data.description || ''}
                  onChange={(e) => handleDataChange('description', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={data.buttonText || ''}
                  onChange={(e) => handleDataChange('buttonText', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Book Cover Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={data.coverImageUrl || ''}
                    onChange={(e) => handleDataChange('coverImageUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerField('coverImageUrl')}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-navy-900 flex items-center gap-1.5 shrink-0"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Choose</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. RICH TEXT SECTION */}
          {section.type === 'rich_text' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={data.badge || ''}
                    onChange={(e) => handleDataChange('badge', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Heading</label>
                  <input
                    type="text"
                    value={data.heading || ''}
                    onChange={(e) => handleDataChange('heading', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={data.subtitle || ''}
                  onChange={(e) => handleDataChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Body Content (Paragraphs)</label>
                <textarea
                  rows={6}
                  value={data.content || ''}
                  onChange={(e) => handleDataChange('content', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Text (Optional)</label>
                  <input
                    type="text"
                    value={data.ctaText || ''}
                    onChange={(e) => handleDataChange('ctaText', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CTA Link (Optional)</label>
                  <input
                    type="text"
                    value={data.ctaHref || ''}
                    onChange={(e) => handleDataChange('ctaHref', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 7. WHY CROSSLIFE */}
          {section.type === 'why_crosslife' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Heading</label>
                <input
                  type="text"
                  value={data.heading || ''}
                  onChange={(e) => handleDataChange('heading', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Paragraphs (Separate with double linebreaks)</label>
                <textarea
                  rows={5}
                  value={Array.isArray(data.paragraphs) ? data.paragraphs.join('\n\n') : data.paragraphs || ''}
                  onChange={(e) => handleDataChange('paragraphs', e.target.value.split('\n\n'))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* 8. GOALS SECTION */}
          {section.type === 'goals' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Heading</label>
                <input
                  type="text"
                  value={data.heading || ''}
                  onChange={(e) => handleDataChange('heading', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Hopes & Goals List</label>
                <div className="space-y-3">
                  {(data.goals || []).map((goal: any, gIdx: number) => (
                    <div key={goal.id || gIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-xs text-navy-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {goal.number || `0${gIdx + 1}`}
                        </span>
                        <input
                          type="text"
                          value={goal.title || ''}
                          onChange={(e) => {
                            const updated = [...data.goals];
                            updated[gIdx].title = e.target.value;
                            handleDataChange('goals', updated);
                          }}
                          className="flex-1 px-3 py-1.5 rounded border border-slate-300 text-xs font-bold"
                          placeholder="Goal Title"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={goal.description || ''}
                        onChange={(e) => {
                          const updated = [...data.goals];
                          updated[gIdx].description = e.target.value;
                          handleDataChange('goals', updated);
                        }}
                        className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                        placeholder="Description..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 9. CTA BANNER SECTION */}
          {section.type === 'cta_banner' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Heading</label>
                <input
                  type="text"
                  value={data.heading || ''}
                  onChange={(e) => handleDataChange('heading', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                <textarea
                  rows={2}
                  value={data.subtitle || ''}
                  onChange={(e) => handleDataChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Button Text</label>
                  <input
                    type="text"
                    value={data.primaryButtonText || ''}
                    onChange={(e) => handleDataChange('primaryButtonText', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Early Bird Notice</label>
                  <input
                    type="text"
                    value={data.earlyBirdNotice || ''}
                    onChange={(e) => handleDataChange('earlyBirdNotice', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Embedded Media Picker */}
      {mediaPickerField && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => setMediaPickerField(null)}
          onSelect={(url) => {
            handleDataChange(mediaPickerField, url);
            setMediaPickerField(null);
          }}
        />
      )}
    </div>
  );
};
