export type PageStatus = 'published' | 'draft' | 'archived';

export interface PageSEO {
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  status: PageStatus;
  seo: PageSEO;
  sectionIds: string[];
  updatedAt: string;
  createdAt: string;
}

export type SectionType =
  | 'hero'
  | 'three_pillars'
  | 'who_is_it_for'
  | 'whats_unique'
  | 'venue'
  | 'book_promotion'
  | 'faq'
  | 'organiser_partners'
  | 'goals'
  | 'why_crosslife'
  | 'rich_text'
  | 'cta_banner';

export interface BaseSectionData {
  badge?: string;
  heading?: string;
  subtitle?: string;
}

export interface HeroSectionData extends BaseSectionData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  datesText: string;
  venueText: string;
  primaryCtaText: string;
  primaryCtaAction: string; // 'modal' or url
  secondaryCtaText: string;
  secondaryCtaHref: string;
  quoteText?: string;
  quoteAuthor?: string;
  bgImageUrl?: string;
  earlyBirdNotice?: string;
  showCountdown: boolean;
  targetDate: string; // ISO date for countdown
}

export interface PillarItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  meaning: string;
  scripture: string;
  reference: string;
  description: string;
}

export interface ThreePillarsSectionData extends BaseSectionData {
  pillars: PillarItem[];
}

export interface AudienceCardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  iconName?: string;
}

export interface WhoIsItForSectionData extends BaseSectionData {
  cards: AudienceCardItem[];
}

export interface DistinctiveItem {
  id: string;
  number: string;
  title: string;
  subheadline: string;
  description: string;
  highlightText: string;
}

export interface WhatsUniqueSectionData extends BaseSectionData {
  items: DistinctiveItem[];
  showFullText?: boolean;
}

export interface VenueSectionData extends BaseSectionData {
  venueName: string;
  address: string;
  city: string;
  state: string;
  fullAddress: string;
  description: string;
  features: string[];
  directionsUrl: string;
  imageUrl?: string;
}

export interface BookPromotionSectionData extends BaseSectionData {
  bookTitle: string;
  author: string;
  bookSubtitle: string;
  description: string;
  perks: string[];
  buttonText: string;
  retailPrice?: string;
  conferencePrice?: string;
  coverImageUrl?: string;
}

export interface FAQSectionData extends BaseSectionData {
  isCompact?: boolean;
  maxItems?: number;
  categoryFilter?: string;
  showCategoryTabs?: boolean;
  viewAllText?: string;
  viewAllHref?: string;
}

export interface OrganiserPartnersSectionData extends BaseSectionData {
  isCompact?: boolean;
  showOrganiser?: boolean;
  showPartners?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export interface GoalItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface GoalsSectionData extends BaseSectionData {
  goals: GoalItem[];
}

export interface WhyCrossLifeSectionData extends BaseSectionData {
  paragraphs: string[];
  quote: string;
  quoteAuthor: string;
}

export interface RichTextSectionData extends BaseSectionData {
  content: string; // Markdown or formatted text
  ctaText?: string;
  ctaHref?: string;
}

export interface CTABannerSectionData extends BaseSectionData {
  primaryButtonText: string;
  primaryButtonAction: string; // 'modal' | url
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  earlyBirdNotice?: string;
}

export type SectionDataMap = {
  hero: HeroSectionData;
  three_pillars: ThreePillarsSectionData;
  who_is_it_for: WhoIsItForSectionData;
  whats_unique: WhatsUniqueSectionData;
  venue: VenueSectionData;
  book_promotion: BookPromotionSectionData;
  faq: FAQSectionData;
  organiser_partners: OrganiserPartnersSectionData;
  goals: GoalsSectionData;
  why_crosslife: WhyCrossLifeSectionData;
  rich_text: RichTextSectionData;
  cta_banner: CTABannerSectionData;
};

export interface PageSection<T extends SectionType = SectionType> {
  id: string;
  pageId: string;
  type: T;
  title: string; // Friendly name for admin display
  sortOrder: number;
  isVisible: boolean;
  data: SectionDataMap[T];
  updatedAt: string;
}

// Navigation & Mega Menu Types
export interface MegaMenuItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuHighlight {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image?: string;
}

export interface MegaMenuConfig {
  columns: MegaMenuColumn[];
  highlight?: MegaMenuHighlight;
}

export interface CMSNavItem {
  id: string;
  label: string;
  href?: string;
  sortOrder: number;
  isVisible: boolean;
  megaMenu?: MegaMenuConfig;
}

// Global Site Settings
export interface GlobalSettings {
  siteName: string;
  tagline: string;
  organiserName: string;
  organiserUrl: string;
  domain: string;
  logoUrl: string;
  email: string;
  phones: string[];
  venueName: string;
  venueAddress: string;
  announcementBar: {
    enabled: boolean;
    badgeText: string;
    text: string;
    promoCode: string;
    discountAmount: number;
    datesNotice: string;
    targetHref?: string;
  };
  socials: {
    instagram: string;
    whatsapp: string;
    youtube: string;
    facebook?: string;
    twitter?: string;
  };
  footer: {
    aboutText: string;
    copyrightText: string;
    poweredByText: string;
    poweredByUrl: string;
  };
  registration: {
    isOpen: boolean;
    directUrl: string; // If set, opens direct link instead of modal
    regularPrice: number;
    earlyBirdPrice: number;
    promoCode: string;
    discount: number;
    dates: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultOgImage: string;
  };
}

// Media Item
export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number; // in bytes
  type: string; // 'image/png', 'image/jpeg', 'image/webp', etc.
  width?: number;
  height?: number;
  altText: string;
  caption?: string;
  createdAt: string;
}

// Activity Log
export interface ActivityLog {
  id: string;
  action: string;
  entityType: 'page' | 'section' | 'navigation' | 'settings' | 'media' | 'speaker' | 'partner' | 'faq';
  entityId?: string;
  details: string;
  user: string;
  timestamp: string;
}

// Speaker & Partner & FAQ Direct Entity Types
export interface Speaker {
  id: string;
  name: string;
  title: string;
  church: string;
  city: string;
  bio: string;
  topic?: string;
  sessionTitle?: string;
  imageUrl?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Partner {
  id: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  website: string;
  logoUrl?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Registration' | 'Accommodation & Travel' | 'Doctrine & Schedule';
  sortOrder: number;
  isPublished: boolean;
}

// Admin User
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'editor';
}
