-- ==========================================================
-- CROSSLIFE CMS — SUPABASE POSTGRESQL SCHEMA
-- Component-Driven Lightweight CMS for CrossLife
-- ==========================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PAGES TABLE
CREATE TABLE IF NOT EXISTS public.pages (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
  seo JSONB NOT NULL DEFAULT '{"title":"","description":"","ogImage":""}'::jsonb,
  section_ids TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PAGE SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.page_sections (
  id TEXT PRIMARY KEY,
  page_id TEXT NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_sections_page_id ON public.page_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_page_sections_sort_order ON public.page_sections(sort_order);

-- 3. GLOBAL SITE SETTINGS TABLE (Single row)
CREATE TABLE IF NOT EXISTS public.global_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. NAVIGATION MENUS TABLE
CREATE TABLE IF NOT EXISTS public.navigation (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  mega_menu JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. MEDIA LIBRARY TABLE
CREATE TABLE IF NOT EXISTS public.media (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size BIGINT NOT NULL DEFAULT 0,
  type TEXT NOT NULL,
  width INT,
  height INT,
  alt_text TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SPEAKERS TABLE
CREATE TABLE IF NOT EXISTS public.speakers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  church TEXT,
  city TEXT,
  bio TEXT,
  topic TEXT,
  session_title TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. PARTNERS TABLE
CREATE TABLE IF NOT EXISTS public.partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  role TEXT NOT NULL DEFAULT 'Partner',
  description TEXT,
  website TEXT,
  logo_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details TEXT NOT NULL,
  user_name TEXT NOT NULL DEFAULT 'Admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read published content)
CREATE POLICY "Public pages are viewable by everyone" ON public.pages FOR SELECT USING (status = 'published');
CREATE POLICY "Public sections are viewable by everyone" ON public.page_sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public settings are viewable by everyone" ON public.global_settings FOR SELECT USING (true);
CREATE POLICY "Public navigation is viewable by everyone" ON public.navigation FOR SELECT USING (is_visible = true);
CREATE POLICY "Public media is viewable by everyone" ON public.media FOR SELECT USING (true);
CREATE POLICY "Public speakers are viewable by everyone" ON public.speakers FOR SELECT USING (is_active = true);
CREATE POLICY "Public partners are viewable by everyone" ON public.partners FOR SELECT USING (is_active = true);
CREATE POLICY "Public faqs are viewable by everyone" ON public.faqs FOR SELECT USING (is_published = true);

-- Authenticated admin policies (full CRUD access for authenticated staff)
CREATE POLICY "Authenticated users full access to pages" ON public.pages FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users full access to page_sections" ON public.page_sections FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users full access to global_settings" ON public.global_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users full access to navigation" ON public.navigation FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users full access to media" ON public.media FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users full access to speakers" ON public.speakers FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users full access to partners" ON public.partners FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users full access to faqs" ON public.faqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users full access to activity_logs" ON public.activity_logs FOR ALL TO authenticated USING (true);
