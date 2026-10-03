import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { uploadMediaFile } from '../../services/cms/cmsStorage';
import {
  Upload,
  Copy,
  Check,
  Trash2,
  Search,
  ExternalLink
} from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const { media, addMedia, deleteMedia } = useCMS();
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const item = await uploadMediaFile(files[i]);
        addMedia(item);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please check image file format.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = media.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.altText?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950 tracking-tight">Media Library</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Upload and manage images, event graphics, and downloadable assets.
          </p>
        </div>

        <label className="px-4 py-2.5 bg-navy-900 hover:bg-navy-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
          <Upload className="w-4 h-4" />
          <span>Upload Image</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Upload Drag/Drop Box */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 hover:border-navy-900 p-8 text-center transition-colors">
        <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center mx-auto mb-3">
          <Upload className="w-6 h-6 text-navy-800" />
        </div>
        <h3 className="font-bold text-navy-950 text-sm">Upload New Media</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Drag and drop images here, or browse from your computer. PNG, JPEG, WebP, SVG supported.
        </p>
        <label className="mt-4 inline-block px-4 py-2 bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs rounded-xl cursor-pointer transition-colors">
          Choose Files
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {isUploading && (
        <div className="text-center py-4 text-xs font-bold text-navy-900 animate-pulse bg-navy-50 rounded-xl">
          Uploading media assets to store...
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-subtle">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search media by filename or alt text..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs text-slate-800 outline-none placeholder:text-slate-400"
        />
        <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
          {filteredMedia.length} / {media.length} files
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.map((item) => {
          const isCopied = copiedId === item.id;
          const kbSize = (item.size / 1024).toFixed(1);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-card transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.altText || item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 p-1 rounded-lg bg-navy-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Open full size"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-3 space-y-1.5 flex-1">
                <span className="text-xs font-bold text-navy-950 truncate block" title={item.name}>
                  {item.name}
                </span>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{kbSize} KB</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="p-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(item.id, item.url)}
                  className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1 transition-colors"
                  title="Copy URL to clipboard"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-500" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Delete "${item.name}" from media library?`)) {
                      deleteMedia(item.id);
                    }
                  }}
                  className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete media"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
