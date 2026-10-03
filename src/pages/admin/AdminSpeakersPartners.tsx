import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import type { Speaker, Partner } from '../../types/cms';
import { MediaPickerModal } from './components/MediaPickerModal';
import {
  Users,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

export const AdminSpeakersPartners: React.FC = () => {
  const {
    speakers,
    addSpeaker,
    updateSpeaker,
    deleteSpeaker,
    partners,
    addPartner,
    updatePartner,
    deletePartner
  } = useCMS();

  const [activeTab, setActiveTab] = useState<'speakers' | 'partners'>('speakers');

  // Speaker States
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [isAddingSpeaker, setIsAddingSpeaker] = useState(false);
  const [newSpeakerName, setNewSpeakerName] = useState('');
  const [newSpeakerChurch, setNewSpeakerChurch] = useState('');
  const [newSpeakerBio, setNewSpeakerBio] = useState('');

  // Partner States
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isAddingPartner, setIsAddingPartner] = useState(false);
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerRole, setNewPartnerRole] = useState('Partner');
  const [newPartnerWebsite, setNewPartnerWebsite] = useState('');
  const [newPartnerDesc, setNewPartnerDesc] = useState('');

  // Media picker modal helper
  const [mediaPickerCallback, setMediaPickerCallback] = useState<((url: string) => void) | null>(null);

  const handleAddSpeakerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpeakerName.trim()) return;

    addSpeaker({
      name: newSpeakerName.trim(),
      title: 'Pastor & Speaker',
      church: newSpeakerChurch.trim(),
      city: 'India',
      bio: newSpeakerBio.trim(),
      sortOrder: speakers.length + 1,
      isActive: true
    });

    setNewSpeakerName('');
    setNewSpeakerChurch('');
    setNewSpeakerBio('');
    setIsAddingSpeaker(false);
  };

  const handleAddPartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerName.trim()) return;

    addPartner({
      name: newPartnerName.trim(),
      tagline: '',
      role: newPartnerRole,
      website: newPartnerWebsite.trim(),
      description: newPartnerDesc.trim(),
      sortOrder: partners.length + 1,
      isActive: true
    });

    setNewPartnerName('');
    setNewPartnerWebsite('');
    setNewPartnerDesc('');
    setIsAddingPartner(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Title & Tab Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950 tracking-tight">
            Speakers & Ministry Partners
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage the expositor lineup and strategic partner organizations.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('speakers')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'speakers'
                ? 'bg-white text-navy-950 shadow-sm'
                : 'text-slate-600 hover:text-navy-950'
            }`}
          >
            Speakers ({speakers.length})
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'partners'
                ? 'bg-white text-navy-950 shadow-sm'
                : 'text-slate-600 hover:text-navy-950'
            }`}
          >
            Partners ({partners.length})
          </button>
        </div>
      </div>

      {/* SPEAKERS TAB */}
      {activeTab === 'speakers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Speaker Lineup
            </span>
            <button
              onClick={() => setIsAddingSpeaker(true)}
              className="px-3.5 py-1.5 bg-navy-900 hover:bg-navy-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Speaker</span>
            </button>
          </div>

          {speakers.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-2">
              <Users className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="font-bold text-navy-950 text-sm">Lineup Announcement In Progress</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No individual speakers added yet. The site currently displays the official announcement placeholder. Click &quot;Add Speaker&quot; above to announce speakers.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {speakers.map((spk) => (
                <div key={spk.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-navy-100 flex items-center justify-center shrink-0 overflow-hidden">
                      {spk.imageUrl ? (
                        <img src={spk.imageUrl} alt={spk.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-6 h-6 text-navy-800" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-navy-950 text-sm">{spk.name}</h4>
                      <div className="text-xs text-slate-500">{spk.church || spk.title}</div>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">{spk.bio}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => updateSpeaker(spk.id, { isActive: !spk.isActive })}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        spk.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {spk.isActive ? 'Active' : 'Hidden'}
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingSpeaker(spk)}
                        className="p-1 rounded text-slate-500 hover:text-navy-950"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${spk.name}?`)) deleteSpeaker(spk.id);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PARTNERS TAB */}
      {activeTab === 'partners' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ministry Partners & Sponsors
            </span>
            <button
              onClick={() => setIsAddingPartner(true)}
              className="px-3.5 py-1.5 bg-navy-900 hover:bg-navy-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Partner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-navy-50 text-navy-800">
                      {partner.role}
                    </span>
                    <button
                      onClick={() => updatePartner(partner.id, { isActive: !partner.isActive })}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        partner.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {partner.isActive ? 'Active' : 'Hidden'}
                    </button>
                  </div>
                  <h4 className="font-bold text-navy-950 text-sm">{partner.name}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-3">{partner.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  {partner.website ? (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-navy-800 flex items-center gap-1 hover:underline"
                    >
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : <span />}

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingPartner(partner)}
                      className="p-1 rounded text-slate-500 hover:text-navy-950"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${partner.name}?`)) deletePartner(partner.id);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Speaker Modal */}
      {isAddingSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-navy-950 text-base">Add Conference Speaker</h3>
              <button onClick={() => setIsAddingSpeaker(false)} className="p-1 rounded text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleAddSpeakerSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Speaker Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pastor John Doe"
                  value={newSpeakerName}
                  onChange={(e) => setNewSpeakerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Church / Ministry</label>
                <input
                  type="text"
                  placeholder="e.g. Grace Fellowship Church, Delhi"
                  value={newSpeakerChurch}
                  onChange={(e) => setNewSpeakerChurch(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bio</label>
                <textarea
                  rows={3}
                  placeholder="Pastoral background and bio..."
                  value={newSpeakerBio}
                  onChange={(e) => setNewSpeakerBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button type="button" onClick={() => setIsAddingSpeaker(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-navy-900 rounded-lg">Save Speaker</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Speaker Modal */}
      {editingSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-navy-950 text-base">Edit Speaker</h3>
              <button onClick={() => setEditingSpeaker(null)} className="p-1 rounded text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              updateSpeaker(editingSpeaker.id, editingSpeaker);
              setEditingSpeaker(null);
            }} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Speaker Name</label>
                <input
                  type="text"
                  required
                  value={editingSpeaker.name}
                  onChange={(e) => setEditingSpeaker({ ...editingSpeaker, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Church / Ministry</label>
                <input
                  type="text"
                  value={editingSpeaker.church}
                  onChange={(e) => setEditingSpeaker({ ...editingSpeaker, church: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={editingSpeaker.bio}
                  onChange={(e) => setEditingSpeaker({ ...editingSpeaker, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Photo URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingSpeaker.imageUrl || ''}
                    onChange={(e) => setEditingSpeaker({ ...editingSpeaker, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerCallback(() => (url: string) => setEditingSpeaker({ ...editingSpeaker, imageUrl: url }))}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-navy-900 flex items-center gap-1"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button type="button" onClick={() => setEditingSpeaker(null)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-navy-900 rounded-lg">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Partner Modal */}
      {isAddingPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-navy-950 text-base">Add Partner Organization</h3>
              <button onClick={() => setIsAddingPartner(false)} className="p-1 rounded text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleAddPartnerSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Equip Indian Churches"
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role / Sponsorship</label>
                <input
                  type="text"
                  placeholder="e.g. Partner, Bookstore Sponsor"
                  value={newPartnerRole}
                  onChange={(e) => setNewPartnerRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Website URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newPartnerWebsite}
                  onChange={(e) => setNewPartnerWebsite(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of ministry..."
                  value={newPartnerDesc}
                  onChange={(e) => setNewPartnerDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button type="button" onClick={() => setIsAddingPartner(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-navy-900 rounded-lg">Save Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Partner Modal */}
      {editingPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-navy-950 text-base">Edit Partner</h3>
              <button onClick={() => setEditingPartner(null)} className="p-1 rounded text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              updatePartner(editingPartner.id, editingPartner);
              setEditingPartner(null);
            }} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  required
                  value={editingPartner.name}
                  onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                <input
                  type="text"
                  value={editingPartner.role}
                  onChange={(e) => setEditingPartner({ ...editingPartner, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Website URL</label>
                <input
                  type="text"
                  value={editingPartner.website || ''}
                  onChange={(e) => setEditingPartner({ ...editingPartner, website: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingPartner.description}
                  onChange={(e) => setEditingPartner({ ...editingPartner, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Logo URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingPartner.logoUrl || ''}
                    onChange={(e) => setEditingPartner({ ...editingPartner, logoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerCallback(() => (url: string) => setEditingPartner({ ...editingPartner, logoUrl: url }))}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-navy-900 flex items-center gap-1"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button type="button" onClick={() => setEditingPartner(null)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-navy-900 rounded-lg">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
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

export default AdminSpeakersPartners;
