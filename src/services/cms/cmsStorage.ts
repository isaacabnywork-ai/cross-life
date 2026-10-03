import {
  initialPages,
  initialSections,
  initialGlobalSettings,
  initialNavigation,
  initialMedia,
  initialSpeakers,
  initialPartners,
  initialFaqs
} from './initialData';
import type {
  Page,
  PageSection,
  GlobalSettings,
  CMSNavItem,
  MediaItem,
  Speaker,
  Partner,
  FAQItem,
  ActivityLog,
  AdminUser
} from '../../types/cms';
import { supabase, isSupabaseConfigured } from '../supabase';

const CMS_STORAGE_KEY = 'crosslife_cms_store_v1';
const CMS_USER_KEY = 'crosslife_cms_user_v1';

export interface CMSStoreData {
  pages: Page[];
  sections: Record<string, PageSection[]>;
  globalSettings: GlobalSettings;
  navigation: CMSNavItem[];
  media: MediaItem[];
  speakers: Speaker[];
  partners: Partner[];
  faqs: FAQItem[];
  activityLogs: ActivityLog[];
}

export const getDefaultCMSData = (): CMSStoreData => ({
  pages: JSON.parse(JSON.stringify(initialPages)),
  sections: JSON.parse(JSON.stringify(initialSections)),
  globalSettings: JSON.parse(JSON.stringify(initialGlobalSettings)),
  navigation: JSON.parse(JSON.stringify(initialNavigation)),
  media: JSON.parse(JSON.stringify(initialMedia)),
  speakers: JSON.parse(JSON.stringify(initialSpeakers)),
  partners: JSON.parse(JSON.stringify(initialPartners)),
  faqs: JSON.parse(JSON.stringify(initialFaqs)),
  activityLogs: [
    {
      id: 'log-init',
      action: 'System Initialized',
      entityType: 'settings',
      details: 'CrossLife CMS initialised with complete conference content.',
      user: 'System',
      timestamp: new Date().toISOString()
    }
  ]
});

// Broadcast custom window event when data changes
export const notifyCMSUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('crosslife-cms-changed'));
  }
};

export const loadStoredCMSData = (): CMSStoreData => {
  if (typeof window === 'undefined') {
    return getDefaultCMSData();
  }

  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultCMSData();
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw) as CMSStoreData;

    // Safety checks to ensure fields exist if schemas expand
    return {
      pages: parsed.pages || initialPages,
      sections: parsed.sections || initialSections,
      globalSettings: { ...initialGlobalSettings, ...(parsed.globalSettings || {}) },
      navigation: parsed.navigation || initialNavigation,
      media: parsed.media || initialMedia,
      speakers: parsed.speakers || initialSpeakers,
      partners: parsed.partners || initialPartners,
      faqs: parsed.faqs || initialFaqs,
      activityLogs: parsed.activityLogs || []
    };
  } catch (err) {
    console.error('Failed to load CMS data from localStorage:', err);
    return getDefaultCMSData();
  }
};

export const saveStoredCMSData = (data: CMSStoreData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
    notifyCMSUpdate();
  } catch (err) {
    console.error('Failed to save CMS data to localStorage:', err);
  }
};

export const logActivity = (
  store: CMSStoreData,
  action: string,
  entityType: ActivityLog['entityType'],
  details: string,
  user: string = 'Admin',
  entityId?: string
): CMSStoreData => {
  const newLog: ActivityLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    action,
    entityType,
    entityId,
    details,
    user,
    timestamp: new Date().toISOString()
  };

  const updatedLogs = [newLog, ...(store.activityLogs || [])].slice(0, 100);
  const updatedStore = { ...store, activityLogs: updatedLogs };
  saveStoredCMSData(updatedStore);
  return updatedStore;
};

// Media file upload helper
export const uploadMediaFile = async (
  file: File,
  altText: string = '',
  caption: string = ''
): Promise<MediaItem> => {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');

  // If Supabase Storage is configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const filePath = `cms-uploads/${timestamp}_${safeName}`;
      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(filePath);
        return {
          id: `med-${timestamp}`,
          name: file.name,
          url: publicUrlData.publicUrl,
          size: file.size,
          type: file.type,
          altText: altText || file.name,
          caption: caption || '',
          createdAt: new Date().toISOString()
        };
      }
    } catch (err) {
      console.warn('Supabase upload failed, falling back to local base64:', err);
    }
  }

  // Fallback: Read as Base64 Data URL so it is stored directly and works offline
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      const mediaItem: MediaItem = {
        id: `med-${timestamp}`,
        name: file.name,
        url,
        size: file.size,
        type: file.type,
        altText: altText || file.name,
        caption: caption || '',
        createdAt: new Date().toISOString()
      };
      resolve(mediaItem);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Auth Storage Helpers
export const getStoredAuthUser = (): AdminUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CMS_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredAuthUser = (user: AdminUser | null): void => {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(CMS_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CMS_USER_KEY);
  }
};
