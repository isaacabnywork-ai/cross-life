import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import type { Page } from '../../types/cms';
import {
  FileText,
  Layers,
  Settings,
  ExternalLink,
  Plus,
  Trash2,
  X,
  Save,
  CheckCircle2
} from 'lucide-react';

export const AdminPages: React.FC = () => {
  const { pages, sections, updatePage, createPage, deletePage } = useCMS();
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');

  const handleSavePageSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    updatePage(editingPage.id, {
      title: editingPage.title,
      slug: editingPage.slug,
      status: editingPage.status,
      seo: editingPage.seo
    });

    setEditingPage(null);
  };

  const handleCreateNewPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSlug.trim()) return;

    createPage({
      title: newTitle.trim(),
      slug: newSlug.trim()
    });

    setNewTitle('');
    setNewSlug('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Add Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950 tracking-tight">Website Pages</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage page routes, SEO metadata, and open page section builders.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2.5 bg-navy-900 hover:bg-navy-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Page</span>
        </button>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 font-bold">Page Title</th>
                <th className="py-3.5 px-4 font-bold">Slug URL</th>
                <th className="py-3.5 px-4 font-bold">Sections</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Last Updated</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pages.map((p) => {
                const pageSections = sections[p.id] || [];
                const visibleCount = pageSections.filter((s) => s.isVisible).length;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-navy-950">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span>{p.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                      {p.slug}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      <span className="font-bold text-navy-900">{visibleCount}</span> active / {pageSections.length} total
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          p.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="capitalize">{p.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {new Date(p.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/builder?pageId=${p.id}`}
                          className="px-3 py-1.5 rounded-lg bg-navy-50 hover:bg-navy-100 text-navy-900 font-bold text-xs flex items-center gap-1 transition-colors"
                          title="Open visual section builder"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Sections</span>
                        </Link>
                        <button
                          onClick={() => setEditingPage(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition-colors"
                          title="Page SEO & Settings"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        <a
                          href={p.slug}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition-colors"
                          title="View Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        {p.slug !== '/' && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete page "${p.title}"?`)) {
                                deletePage(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Page"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Page Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-navy-950 text-base">Edit Page: {editingPage.title}</h3>
              <button
                onClick={() => setEditingPage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePageSettings} className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Page Title</label>
                  <input
                    type="text"
                    required
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Publication Status</label>
                <select
                  value={editingPage.status}
                  onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-navy-950 block">
                  SEO & Social Sharing
                </span>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={editingPage.seo?.title || ''}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        seo: { ...editingPage.seo, title: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    value={editingPage.seo?.description || ''}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        seo: { ...editingPage.seo, description: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-lg shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Page Settings</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Page Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-navy-950 text-base">Create New Page</h3>
              <button
                onClick={() => setIsCreating(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewPage} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Page Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule"
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    if (!newSlug) {
                      setNewSlug('/' + e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  placeholder="/schedule"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none font-mono text-xs"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-lg shadow-sm"
                >
                  Create Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPages;
