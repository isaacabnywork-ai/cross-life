import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { uploadMediaFile } from '../../../services/cms/cmsStorage';
import { X, Upload, Check, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = "Select Image from Media Library"
}) => {
  const { media, addMedia } = useCMS();
  const [isUploading, setIsUploading] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const newMedia = await uploadMediaFile(file);
      addMedia(newMedia);
      setSelectedUrl(newMedia.url);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirm = () => {
    if (customUrl.trim()) {
      onSelect(customUrl.trim());
      onClose();
    } else if (selectedUrl) {
      onSelect(selectedUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-navy-800" />
            <h3 className="font-bold text-navy-950 text-base">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Quick upload & URL row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* File Upload Button */}
            <label className="border-2 border-dashed border-slate-300 hover:border-navy-700 bg-slate-50 hover:bg-navy-50/50 rounded-xl p-4 flex items-center justify-center gap-3 cursor-pointer transition-colors text-center">
              <Upload className="w-5 h-5 text-navy-700" />
              <div className="text-left">
                <span className="text-xs font-bold text-navy-950 block">Upload New Image</span>
                <span className="text-[11px] text-slate-500">PNG, JPG, WebP up to 5MB</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>

            {/* Direct URL input */}
            <div className="border border-slate-200 rounded-xl p-3 flex items-center gap-2 bg-white">
              <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="url"
                placeholder="Or paste image URL (https://...)"
                value={customUrl}
                onChange={(e) => {
                  setCustomUrl(e.target.value);
                  if (e.target.value) setSelectedUrl(null);
                }}
                className="w-full text-xs text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {isUploading && (
            <div className="text-center py-4 text-xs font-bold text-navy-800 animate-pulse">
              Uploading image, please wait...
            </div>
          )}

          {/* Media Grid */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Uploaded Images ({media.length})
            </h4>

            {media.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No images in media library yet. Upload an image above.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto p-1">
                {media.map((item) => {
                  const isSelected = selectedUrl === item.url;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedUrl(item.url);
                        setCustomUrl('');
                      }}
                      className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 cursor-pointer transition-all group ${
                        isSelected
                          ? 'border-navy-900 ring-2 ring-navy-900/30 shadow-md'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.altText || item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-navy-900 text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-navy-950/80 px-2 py-1 text-[10px] text-white truncate">
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="text-xs text-slate-500 truncate max-w-sm">
            {customUrl ? `Custom: ${customUrl}` : selectedUrl ? `Selected: ${selectedUrl}` : 'No image selected'}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedUrl && !customUrl.trim()}
              className="px-5 py-2 text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
            >
              Select Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
