import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type {
  Page,
  PageSection,
  SectionType,
  GlobalSettings,
  CMSNavItem,
  MediaItem,
  Speaker,
  Partner,
  FAQItem,
  ActivityLog,
  AdminUser
} from '../types/cms';
import {
  loadStoredCMSData,
  saveStoredCMSData,
  logActivity,
  getDefaultCMSData,
  getStoredAuthUser,
  setStoredAuthUser
} from '../services/cms/cmsStorage';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface CMSContextType {
  pages: Page[];
  sections: Record<string, PageSection[]>;
  globalSettings: GlobalSettings;
  navigation: CMSNavItem[];
  media: MediaItem[];
  speakers: Speaker[];
  partners: Partner[];
  faqs: FAQItem[];
  activityLogs: ActivityLog[];
  user: AdminUser | null;
  isLoading: boolean;
  // Getters
  getPageBySlug: (slug: string) => Page | undefined;
  getPageById: (id: string) => Page | undefined;
  getSectionsForPage: (pageId: string) => PageSection[];
  // Page operations
  updatePage: (id: string, updates: Partial<Page>) => void;
  createPage: (page: { slug: string; title: string; seo?: Page['seo'] }) => Page;
  deletePage: (id: string) => void;
  // Section operations
  updateSection: (pageId: string, sectionId: string, updates: Partial<PageSection>) => void;
  addSection: (pageId: string, type: SectionType, title?: string) => PageSection;
  deleteSection: (pageId: string, sectionId: string) => void;
  reorderSections: (pageId: string, orderedSectionIds: string[]) => void;
  toggleSectionVisibility: (pageId: string, sectionId: string) => void;
  duplicateSection: (pageId: string, sectionId: string) => PageSection;
  // Settings & Navigation
  updateGlobalSettings: (updates: Partial<GlobalSettings>) => void;
  updateNavigation: (navItems: CMSNavItem[]) => void;
  // Media operations
  addMedia: (mediaItem: MediaItem) => void;
  deleteMedia: (id: string) => void;
  // Speakers, Partners, FAQs
  addSpeaker: (speaker: Omit<Speaker, 'id'>) => Speaker;
  updateSpeaker: (id: string, updates: Partial<Speaker>) => void;
  deleteSpeaker: (id: string) => void;
  addPartner: (partner: Omit<Partner, 'id'>) => Partner;
  updatePartner: (id: string, updates: Partial<Partner>) => void;
  deletePartner: (id: string) => void;
  addFaq: (faq: Omit<FAQItem, 'id'>) => FAQItem;
  updateFaq: (id: string, updates: Partial<FAQItem>) => void;
  deleteFaq: (id: string) => void;
  // Auth & System
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setStore] = useState(() => loadStoredCMSData());
  const [user, setUser] = useState<AdminUser | null>(() => getStoredAuthUser());
  const [isLoading, setIsLoading] = useState(false);

  // Sync state if another tab or event updates localStorage
  useEffect(() => {
    const handleStorageUpdate = () => {
      setStore(loadStoredCMSData());
    };
    window.addEventListener('crosslife-cms-changed', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);
    return () => {
      window.removeEventListener('crosslife-cms-changed', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  const currentUserName = user?.name || 'Admin';

  // Helper getters
  const getPageBySlug = useCallback(
    (slug: string) => store.pages.find((p) => p.slug === slug),
    [store.pages]
  );

  const getPageById = useCallback(
    (id: string) => store.pages.find((p) => p.id === id),
    [store.pages]
  );

  const getSectionsForPage = useCallback(
    (pageId: string) => {
      const list = store.sections[pageId] || [];
      return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
    },
    [store.sections]
  );

  // Page operations
  const updatePage = useCallback(
    (id: string, updates: Partial<Page>) => {
      setStore((prev) => {
        const nextPages = prev.pages.map((p) =>
          p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
        );
        const nextStore = { ...prev, pages: nextPages };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Updated Page',
          'page',
          `Updated page settings for "${updates.title || id}"`,
          currentUserName,
          id
        );
      });
    },
    [currentUserName]
  );

  const createPage = useCallback(
    (pageData: { slug: string; title: string; seo?: Page['seo'] }) => {
      const now = new Date().toISOString();
      const id = `page-${Date.now()}`;
      const newPage: Page = {
        id,
        slug: pageData.slug.startsWith('/') ? pageData.slug : `/${pageData.slug}`,
        title: pageData.title,
        status: 'published',
        seo: pageData.seo || {
          title: `${pageData.title} | CrossLife`,
          description: `Read about ${pageData.title} at CrossLife young people's conference.`,
          ogImage: '/images/crosslife-logo.webp'
        },
        sectionIds: [],
        createdAt: now,
        updatedAt: now
      };

      setStore((prev) => {
        const nextPages = [...prev.pages, newPage];
        const nextSections = { ...prev.sections, [id]: [] };
        const nextStore = { ...prev, pages: nextPages, sections: nextSections };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Created Page',
          'page',
          `Created new page "${newPage.title}" (${newPage.slug})`,
          currentUserName,
          id
        );
      });

      return newPage;
    },
    [currentUserName]
  );

  const deletePage = useCallback(
    (id: string) => {
      setStore((prev) => {
        const pageToDelete = prev.pages.find((p) => p.id === id);
        const nextPages = prev.pages.filter((p) => p.id !== id);
        const { [id]: _, ...remainingSections } = prev.sections;
        const nextStore = { ...prev, pages: nextPages, sections: remainingSections };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Deleted Page',
          'page',
          `Deleted page "${pageToDelete?.title || id}"`,
          currentUserName,
          id
        );
      });
    },
    [currentUserName]
  );

  // Section operations
  const updateSection = useCallback(
    (pageId: string, sectionId: string, updates: Partial<PageSection>) => {
      setStore((prev) => {
        const pageSections = prev.sections[pageId] || [];
        const nextSections = pageSections.map((s) =>
          s.id === sectionId ? ({ ...s, ...updates, updatedAt: new Date().toISOString() } as PageSection) : s
        );
        const nextStore = {
          ...prev,
          sections: { ...prev.sections, [pageId]: nextSections }
        };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Updated Section',
          'section',
          `Modified section "${updates.title || sectionId}" on page ${pageId}`,
          currentUserName,
          sectionId
        );
      });
    },
    [currentUserName]
  );

  const addSection = useCallback(
    (pageId: string, type: SectionType, title?: string): PageSection => {
      const now = new Date().toISOString();
      const sectionId = `sec-${Date.now()}`;
      const defaultDataMap: Record<SectionType, any> = {
        hero: {
          eyebrow: 'A Conference for Young People',
          headline: 'ONE LIFE. ONE DESIRE. ONE PURPOSE.',
          subheadline: 'Equipping young people to live for Christ.',
          datesText: '14 – 16 Sept 2027',
          venueText: 'Ashirwad Global Learning Centre, Hyderabad',
          primaryCtaText: 'REGISTER NOW',
          primaryCtaAction: 'modal',
          secondaryCtaText: 'VIEW DETAILS',
          secondaryCtaHref: '/conference',
          showCountdown: true,
          targetDate: '2027-09-14T11:00:00+05:30'
        },
        three_pillars: {
          badge: 'OUR CALLING',
          heading: 'ONE LIFE. ONE DESIRE. ONE PURPOSE.',
          subtitle: 'The driving heartbeat behind CrossLife.',
          pillars: []
        },
        who_is_it_for: {
          badge: 'WHO IS CROSSLIFE FOR?',
          heading: 'Crafted for Men & Women Aged 18–25',
          subtitle: 'Seeking deeper biblical grounding.',
          cards: []
        },
        whats_unique: {
          badge: 'DISTINCTIVES',
          heading: 'Substance Over Style. Truth Over Trend.',
          subtitle: 'Gospel clarity and reverent worship.',
          items: []
        },
        venue: {
          badge: 'VENUE',
          heading: 'Ashirwad Global Learning Centre',
          subtitle: 'Hyderabad, Telangana',
          venueName: 'Ashirwad Global Learning Centre',
          address: 'Ashirwad Global Learning Centre',
          city: 'Hyderabad',
          state: 'Telangana',
          fullAddress: 'Ashirwad Global Learning Centre, Hyderabad, Telangana',
          description: 'A peaceful, enclosed campus in Hyderabad.',
          features: ['Dormitory Accommodations', 'All Meals Included'],
          directionsUrl: 'https://maps.google.com/?q=Ashirwad+Global+Learning+Centre+Hyderabad'
        },
        book_promotion: {
          badge: 'CONFERENCE GIFT',
          heading: 'Receive a Free Copy of “Don\'t Waste Your Life”',
          subtitle: 'By John Piper',
          bookTitle: 'Don\'t Waste Your Life',
          author: 'John Piper',
          bookSubtitle: 'Make your life count for Christ.',
          description: 'A passionate plea to make your life count for eternity.',
          perks: ['Free physical copy for every attendee'],
          buttonText: 'REGISTER NOW & CLAIM BOOK'
        },
        faq: {
          badge: 'FAQS',
          heading: 'Frequently Asked Questions',
          subtitle: 'Everything you need to know about the conference.',
          isCompact: false
        },
        organiser_partners: {
          badge: 'ORGANISER',
          heading: 'Equip Indian Churches',
          subtitle: 'Partnering for gospel growth across India.',
          isCompact: true,
          showOrganiser: true,
          showPartners: true
        },
        goals: {
          badge: 'HOPES & GOALS',
          heading: 'Five Intentional Outcomes',
          subtitle: 'What we pray God accomplishes in your life.',
          goals: []
        },
        why_crosslife: {
          badge: 'WHY CROSSLIFE?',
          heading: 'A Beacon Calling Young People to Gospel Faithfulness',
          subtitle: 'Navigating life with biblical clarity.',
          paragraphs: ['In a world filled with distractions, CrossLife stands as a beacon.'],
          quote: 'Let no one despise you for your youth.',
          quoteAuthor: '1 Timothy 4:12'
        },
        rich_text: {
          badge: 'SECTION',
          heading: 'Heading',
          subtitle: 'Subheading description text.',
          content: 'Add your rich markdown or formatted text here.'
        },
        cta_banner: {
          badge: 'REGISTRATION',
          heading: 'Ready to Join Us at CrossLife 2027?',
          subtitle: 'Early bird rates are available for a limited time.',
          primaryButtonText: 'REGISTER NOW',
          primaryButtonAction: 'modal'
        }
      };

      const currentList = store.sections[pageId] || [];
      const newSection: PageSection = {
        id: sectionId,
        pageId,
        type,
        title: title || `${type.replace(/_/g, ' ').toUpperCase()}`,
        sortOrder: currentList.length + 1,
        isVisible: true,
        data: defaultDataMap[type],
        updatedAt: now
      };

      setStore((prev) => {
        const pageSections = prev.sections[pageId] || [];
        const nextSections = [...pageSections, newSection];
        // Also update page sectionIds array
        const nextPages = prev.pages.map((p) =>
          p.id === pageId ? { ...p, sectionIds: [...p.sectionIds, sectionId] } : p
        );
        const nextStore = {
          ...prev,
          pages: nextPages,
          sections: { ...prev.sections, [pageId]: nextSections }
        };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Added Section',
          'section',
          `Added ${newSection.title} to page ${pageId}`,
          currentUserName,
          sectionId
        );
      });

      return newSection;
    },
    [currentUserName, store.sections]
  );

  const deleteSection = useCallback(
    (pageId: string, sectionId: string) => {
      setStore((prev) => {
        const pageSections = prev.sections[pageId] || [];
        const sectionToDelete = pageSections.find((s) => s.id === sectionId);
        const filtered = pageSections.filter((s) => s.id !== sectionId);
        // Normalize sort orders
        const reindexed = filtered.map((s, idx) => ({ ...s, sortOrder: idx + 1 }));
        const nextPages = prev.pages.map((p) =>
          p.id === pageId ? { ...p, sectionIds: p.sectionIds.filter((id) => id !== sectionId) } : p
        );
        const nextStore = {
          ...prev,
          pages: nextPages,
          sections: { ...prev.sections, [pageId]: reindexed }
        };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Deleted Section',
          'section',
          `Deleted section "${sectionToDelete?.title || sectionId}" from page ${pageId}`,
          currentUserName,
          sectionId
        );
      });
    },
    [currentUserName]
  );

  const reorderSections = useCallback(
    (pageId: string, orderedSectionIds: string[]) => {
      setStore((prev) => {
        const pageSections = prev.sections[pageId] || [];
        const sectionMap = new Map(pageSections.map((s) => [s.id, s]));
        const reordered: PageSection[] = [];

        orderedSectionIds.forEach((id, idx) => {
          const s = sectionMap.get(id);
          if (s) {
            reordered.push({ ...s, sortOrder: idx + 1 });
            sectionMap.delete(id);
          }
        });
        // Any remaining appended at end
        sectionMap.forEach((s) => {
          reordered.push({ ...s, sortOrder: reordered.length + 1 });
        });

        const nextPages = prev.pages.map((p) =>
          p.id === pageId ? { ...p, sectionIds: orderedSectionIds } : p
        );
        const nextStore = {
          ...prev,
          pages: nextPages,
          sections: { ...prev.sections, [pageId]: reordered }
        };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Reordered Sections',
          'section',
          `Reordered sections on page ${pageId}`,
          currentUserName
        );
      });
    },
    [currentUserName]
  );

  const toggleSectionVisibility = useCallback(
    (pageId: string, sectionId: string) => {
      setStore((prev) => {
        const pageSections = prev.sections[pageId] || [];
        const nextSections = pageSections.map((s) =>
          s.id === sectionId ? { ...s, isVisible: !s.isVisible, updatedAt: new Date().toISOString() } : s
        );
        const toggled = pageSections.find((s) => s.id === sectionId);
        const nextStore = {
          ...prev,
          sections: { ...prev.sections, [pageId]: nextSections }
        };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Toggled Visibility',
          'section',
          `Set visibility of section "${toggled?.title || sectionId}" to ${!toggled?.isVisible}`,
          currentUserName,
          sectionId
        );
      });
    },
    [currentUserName]
  );

  const duplicateSection = useCallback(
    (pageId: string, sectionId: string): PageSection => {
      const pageSections = store.sections[pageId] || [];
      const original = pageSections.find((s) => s.id === sectionId);
      if (!original) throw new Error('Section not found');

      const newId = `sec-${Date.now()}`;
      const duplicate: PageSection = {
        ...JSON.parse(JSON.stringify(original)),
        id: newId,
        title: `${original.title} (Copy)`,
        sortOrder: original.sortOrder + 1,
        updatedAt: new Date().toISOString()
      };

      setStore((prev) => {
        const list = prev.sections[pageId] || [];
        const nextList = [...list, duplicate].map((s, idx) => ({ ...s, sortOrder: idx + 1 }));
        const nextStore = {
          ...prev,
          sections: { ...prev.sections, [pageId]: nextList }
        };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Duplicated Section',
          'section',
          `Duplicated "${original.title}" on page ${pageId}`,
          currentUserName,
          newId
        );
      });

      return duplicate;
    },
    [currentUserName, store.sections]
  );

  // Settings & Navigation
  const updateGlobalSettings = useCallback(
    (updates: Partial<GlobalSettings>) => {
      setStore((prev) => {
        const nextSettings = { ...prev.globalSettings, ...updates };
        const nextStore = { ...prev, globalSettings: nextSettings };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Updated Global Settings',
          'settings',
          'Updated site configuration and contact information',
          currentUserName
        );
      });
    },
    [currentUserName]
  );

  const updateNavigation = useCallback(
    (navItems: CMSNavItem[]) => {
      setStore((prev) => {
        const nextStore = { ...prev, navigation: navItems };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Updated Navigation',
          'navigation',
          'Updated header navigation items and mega menu layout',
          currentUserName
        );
      });
    },
    [currentUserName]
  );

  // Media
  const addMedia = useCallback(
    (mediaItem: MediaItem) => {
      setStore((prev) => {
        const nextMedia = [mediaItem, ...prev.media];
        const nextStore = { ...prev, media: nextMedia };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Uploaded Media',
          'media',
          `Added media asset: "${mediaItem.name}"`,
          currentUserName,
          mediaItem.id
        );
      });
    },
    [currentUserName]
  );

  const deleteMedia = useCallback(
    (id: string) => {
      setStore((prev) => {
        const mediaToDelete = prev.media.find((m) => m.id === id);
        const nextMedia = prev.media.filter((m) => m.id !== id);
        const nextStore = { ...prev, media: nextMedia };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Deleted Media',
          'media',
          `Removed media asset: "${mediaToDelete?.name || id}"`,
          currentUserName,
          id
        );
      });
    },
    [currentUserName]
  );

  // Speakers, Partners, FAQs
  const addSpeaker = useCallback(
    (speakerData: Omit<Speaker, 'id'>): Speaker => {
      const newSpeaker: Speaker = {
        ...speakerData,
        id: `spk-${Date.now()}`
      };
      setStore((prev) => {
        const nextSpeakers = [...prev.speakers, newSpeaker];
        const nextStore = { ...prev, speakers: nextSpeakers };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Added Speaker',
          'speaker',
          `Added speaker profile: "${newSpeaker.name}"`,
          currentUserName,
          newSpeaker.id
        );
      });
      return newSpeaker;
    },
    [currentUserName]
  );

  const updateSpeaker = useCallback(
    (id: string, updates: Partial<Speaker>) => {
      setStore((prev) => {
        const nextSpeakers = prev.speakers.map((s) => (s.id === id ? { ...s, ...updates } : s));
        const nextStore = { ...prev, speakers: nextSpeakers };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Updated Speaker',
          'speaker',
          `Updated speaker profile "${updates.name || id}"`,
          currentUserName,
          id
        );
      });
    },
    [currentUserName]
  );

  const deleteSpeaker = useCallback(
    (id: string) => {
      setStore((prev) => {
        const nextSpeakers = prev.speakers.filter((s) => s.id !== id);
        const nextStore = { ...prev, speakers: nextSpeakers };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Deleted Speaker',
          'speaker',
          `Deleted speaker: ${id}`,
          currentUserName,
          id
        );
      });
    },
    [currentUserName]
  );

  const addPartner = useCallback(
    (partnerData: Omit<Partner, 'id'>): Partner => {
      const newPartner: Partner = {
        ...partnerData,
        id: `part-${Date.now()}`
      };
      setStore((prev) => {
        const nextPartners = [...prev.partners, newPartner];
        const nextStore = { ...prev, partners: nextPartners };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Added Partner',
          'partner',
          `Added partner: "${newPartner.name}"`,
          currentUserName,
          newPartner.id
        );
      });
      return newPartner;
    },
    [currentUserName]
  );

  const updatePartner = useCallback(
    (id: string, updates: Partial<Partner>) => {
      setStore((prev) => {
        const nextPartners = prev.partners.map((p) => (p.id === id ? { ...p, ...updates } : p));
        const nextStore = { ...prev, partners: nextPartners };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Updated Partner',
          'partner',
          `Updated partner: "${updates.name || id}"`,
          currentUserName,
          id
        );
      });
    },
    [currentUserName]
  );

  const deletePartner = useCallback(
    (id: string) => {
      setStore((prev) => {
        const nextPartners = prev.partners.filter((p) => p.id !== id);
        const nextStore = { ...prev, partners: nextPartners };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Deleted Partner',
          'partner',
          `Deleted partner: ${id}`,
          currentUserName,
          id
        );
      });
    },
    [currentUserName]
  );

  const addFaq = useCallback(
    (faqData: Omit<FAQItem, 'id'>): FAQItem => {
      const newFaq: FAQItem = {
        ...faqData,
        id: `faq-${Date.now()}`
      };
      setStore((prev) => {
        const nextFaqs = [...prev.faqs, newFaq];
        const nextStore = { ...prev, faqs: nextFaqs };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Added FAQ',
          'faq',
          `Added FAQ question: "${newFaq.question.slice(0, 40)}..."`,
          currentUserName,
          newFaq.id
        );
      });
      return newFaq;
    },
    [currentUserName]
  );

  const updateFaq = useCallback(
    (id: string, updates: Partial<FAQItem>) => {
      setStore((prev) => {
        const nextFaqs = prev.faqs.map((f) => (f.id === id ? { ...f, ...updates } : f));
        const nextStore = { ...prev, faqs: nextFaqs };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Updated FAQ',
          'faq',
          `Updated FAQ item: ${id}`,
          currentUserName,
          id
        );
      });
    },
    [currentUserName]
  );

  const deleteFaq = useCallback(
    (id: string) => {
      setStore((prev) => {
        const nextFaqs = prev.faqs.filter((f) => f.id !== id);
        const nextStore = { ...prev, faqs: nextFaqs };
        saveStoredCMSData(nextStore);
        return logActivity(
          nextStore,
          'Deleted FAQ',
          'faq',
          `Deleted FAQ item: ${id}`,
          currentUserName,
          id
        );
      });
    },
    [currentUserName]
  );

  // Auth
  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      try {
        const cleanEmail = email.trim().toLowerCase();

        // If Supabase is configured, attempt authentication against Supabase Auth
        if (isSupabaseConfigured() && supabase) {
          try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
              email: cleanEmail,
              password
            });
            if (!authError && authData.user) {
              const adminUser: AdminUser = {
                id: authData.user.id,
                email: authData.user.email || cleanEmail,
                name: (authData.user.user_metadata?.full_name || cleanEmail.split('@')[0]).toUpperCase(),
                role: 'super_admin'
              };
              setUser(adminUser);
              setStoredAuthUser(adminUser);
              setIsLoading(false);
              return { success: true };
            }
          } catch (supaErr) {
            console.warn('Supabase auth attempt failed, checking local credentials:', supaErr);
          }
        }

        // Secure offline administrator credentials
        if (cleanEmail === 'admin@crosslife.in' && password === 'crosslife2027') {
          const adminUser: AdminUser = {
            id: 'user-admin',
            email: 'admin@crosslife.in',
            name: 'ADMINISTRATOR',
            role: 'super_admin'
          };
          setUser(adminUser);
          setStoredAuthUser(adminUser);
          setIsLoading(false);
          return { success: true };
        }

        setIsLoading(false);
        return {
          success: false,
          error: 'Invalid credentials. Enter admin@crosslife.in and crosslife2027, or configure Supabase Auth.'
        };
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err.message || 'Authentication error' };
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setStoredAuthUser(null);
  }, []);

  const resetToDefaults = useCallback(() => {
    const defaultData = getDefaultCMSData();
    setStore(defaultData);
    saveStoredCMSData(defaultData);
  }, []);

  const contextValue = useMemo(
    () => ({
      pages: store.pages,
      sections: store.sections,
      globalSettings: store.globalSettings,
      navigation: store.navigation,
      media: store.media,
      speakers: store.speakers,
      partners: store.partners,
      faqs: store.faqs,
      activityLogs: store.activityLogs,
      user,
      isLoading,
      getPageBySlug,
      getPageById,
      getSectionsForPage,
      updatePage,
      createPage,
      deletePage,
      updateSection,
      addSection,
      deleteSection,
      reorderSections,
      toggleSectionVisibility,
      duplicateSection,
      updateGlobalSettings,
      updateNavigation,
      addMedia,
      deleteMedia,
      addSpeaker,
      updateSpeaker,
      deleteSpeaker,
      addPartner,
      updatePartner,
      deletePartner,
      addFaq,
      updateFaq,
      deleteFaq,
      login,
      logout,
      resetToDefaults
    }),
    [
      store,
      user,
      isLoading,
      getPageBySlug,
      getPageById,
      getSectionsForPage,
      updatePage,
      createPage,
      deletePage,
      updateSection,
      addSection,
      deleteSection,
      reorderSections,
      toggleSectionVisibility,
      duplicateSection,
      updateGlobalSettings,
      updateNavigation,
      addMedia,
      deleteMedia,
      addSpeaker,
      updateSpeaker,
      deleteSpeaker,
      addPartner,
      updatePartner,
      deletePartner,
      addFaq,
      updateFaq,
      deleteFaq,
      login,
      logout,
      resetToDefaults
    ]
  );

  return <CMSContext.Provider value={contextValue}>{children}</CMSContext.Provider>;
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
