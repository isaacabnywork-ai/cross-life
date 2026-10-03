import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MediaPickerModal } from './components/MediaPickerModal';
import {
  Settings,
  Save,
  Image as ImageIcon,
  Share2,
  Ticket,
  Mail,
  Globe
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { globalSettings, updateGlobalSettings } = useCMS();
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(globalSettings)));
  const [isSaved, setIsSaved] = useState(false);
  const [mediaPickerCallback, setMediaPickerCallback] = useState<((url: string) => void) | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateGlobalSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950 tracking-tight">Global Site Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure branding, contact details, social links, ticket pricing, and SEO defaults.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{isSaved ? 'Settings Saved!' : 'Save All Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
        {/* 1. Core Brand & Organiser */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 font-bold text-navy-950 text-sm border-b border-slate-100 pb-3">
            <Globe className="w-4 h-4 text-navy-800" />
            <span>Brand Identity & Organiser</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Site Name</label>
              <input
                type="text"
                value={formData.siteName || ''}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Organiser Name</label>
              <input
                type="text"
                value={formData.organiserName || ''}
                onChange={(e) => setFormData({ ...formData, organiserName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Organiser URL</label>
              <input
                type="url"
                value={formData.organiserUrl || ''}
                onChange={(e) => setFormData({ ...formData, organiserUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Brand Logo URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.logoUrl || ''}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-xs"
              />
              <button
                type="button"
                onClick={() => setMediaPickerCallback(() => (url: string) => setFormData({ ...formData, logoUrl: url }))}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-navy-900 flex items-center gap-1.5 shrink-0"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Media</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Conference Rates & Registration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 font-bold text-navy-950 text-sm border-b border-slate-100 pb-3">
            <Ticket className="w-4 h-4 text-gold-600" />
            <span>Conference Registration & Pricing</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Early Bird Price (₹)</label>
              <input
                type="number"
                value={formData.registration.earlyBirdPrice || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration: { ...formData.registration, earlyBirdPrice: Number(e.target.value) }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Regular Price (₹)</label>
              <input
                type="number"
                value={formData.registration.regularPrice || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration: { ...formData.registration, regularPrice: Number(e.target.value) }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Discount Amount (₹)</label>
              <input
                type="number"
                value={formData.registration.discount || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration: { ...formData.registration, discount: Number(e.target.value) }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Promo Coupon Code</label>
              <input
                type="text"
                value={formData.registration.promoCode || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration: { ...formData.registration, promoCode: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Conference Dates Text</label>
              <input
                type="text"
                value={formData.registration.dates || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration: { ...formData.registration, dates: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Direct External Registration URL (Optional)
            </label>
            <input
              type="url"
              placeholder="Leave empty to use built-in modal; or paste Google Form / Ticket URL"
              value={formData.registration.directUrl || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  registration: { ...formData.registration, directUrl: e.target.value }
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono text-xs"
            />
          </div>
        </div>

        {/* 3. Contact & Venue Location */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 font-bold text-navy-950 text-sm border-b border-slate-100 pb-3">
            <Mail className="w-4 h-4 text-navy-800" />
            <span>Contact & Venue Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Numbers (comma separated)</label>
              <input
                type="text"
                value={(formData.phones || []).join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phones: e.target.value.split(',').map((p) => p.trim())
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Venue Name</label>
            <input
              type="text"
              value={formData.venueName || ''}
              onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Venue Address</label>
            <input
              type="text"
              value={formData.venueAddress || ''}
              onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
            />
          </div>
        </div>

        {/* 4. Social Channels */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 font-bold text-navy-950 text-sm border-b border-slate-100 pb-3">
            <Share2 className="w-4 h-4 text-navy-800" />
            <span>Social Channels</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Instagram URL</label>
              <input
                type="url"
                value={formData.socials?.instagram || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, instagram: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Channel URL</label>
              <input
                type="url"
                value={formData.socials?.whatsapp || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, whatsapp: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">YouTube URL</label>
              <input
                type="url"
                value={formData.socials?.youtube || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, youtube: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* 5. Footer & Copyright */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 font-bold text-navy-950 text-sm border-b border-slate-100 pb-3">
            <Settings className="w-4 h-4 text-navy-800" />
            <span>Footer & Attribution</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Footer About Text</label>
            <textarea
              rows={2}
              value={formData.footer?.aboutText || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  footer: { ...formData.footer, aboutText: e.target.value }
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Copyright Text</label>
              <input
                type="text"
                value={formData.footer?.copyrightText || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    footer: { ...formData.footer, copyrightText: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Powered By Text</label>
              <input
                type="text"
                value={formData.footer?.poweredByText || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    footer: { ...formData.footer, poweredByText: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
              />
            </div>
          </div>
        </div>
      </form>

      {/* Embedded Media Picker */}
      {mediaPickerCallback && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => setMediaPickerCallback(null)}
          onSelect={(url) => {
            mediaPickerCallback(url);
            setMediaPickerCallback(null);
          }}
        />
      )}
    </div>
  );
};
