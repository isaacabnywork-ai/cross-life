-- ==========================================================
-- CROSSLIFE CMS — SUPABASE INITIAL SEED DATA
-- Pre-populates all existing CrossLife conference content
-- ==========================================================

-- 1. GLOBAL SETTINGS
INSERT INTO public.global_settings (id, data, updated_at)
VALUES (
  'default',
  '{
    "siteName": "CrossLife",
    "tagline": "ONE LIFE. ONE DESIRE. ONE PURPOSE.",
    "organiserName": "Equip Indian Churches",
    "organiserUrl": "https://equipindianchurches.com",
    "domain": "https://crosslife.in",
    "logoUrl": "/images/crosslife-logo.webp",
    "email": "contact@crosslife.in",
    "phones": ["+91 98867 69948", "+91 99368 44317"],
    "venueName": "Ashirwad Global Learning Centre",
    "venueAddress": "Ashirwad Global Learning Centre, Hyderabad, Telangana",
    "announcementBar": {
      "enabled": true,
      "badgeText": "Early Bird",
      "text": "Save ₹500 with code",
      "promoCode": "AIPC2026",
      "discountAmount": 500,
      "datesNotice": "14 – 16 Sept 2027 • Hyderabad",
      "targetHref": "/conference#pricing"
    },
    "socials": {
      "instagram": "https://www.instagram.com/crosslife.in/",
      "whatsapp": "https://whatsapp.com/channel/0029VakdM3o8fewqOG56qx35",
      "youtube": "https://www.youtube.com/@CrossLife25"
    },
    "footer": {
      "aboutText": "CrossLife is a young people’s conference organised by Equip Indian Churches to inspire and equip young people to live for Christ, glorify Christ, and proclaim His Gospel.",
      "copyrightText": "© 2026 - All Rights Reserved Powered by ABNY Web",
      "poweredByText": "ABNY Web",
      "poweredByUrl": "http://abnyweb.in"
    },
    "registration": {
      "isOpen": true,
      "directUrl": "",
      "regularPrice": 3000,
      "earlyBirdPrice": 2000,
      "promoCode": "AIPC2026",
      "discount": 500,
      "dates": "14 – 16 Sept 2027"
    },
    "seo": {
      "defaultTitle": "CrossLife | A Conference for Young People — Equip Indian Churches",
      "defaultDescription": "CrossLife is a young people\'s conference organised by Equip Indian Churches to inspire and equip young people to live for Christ, glorify Christ, and proclaim His Gospel.",
      "defaultOgImage": "/images/crosslife-logo.webp"
    }
  }'::jsonb,
  NOW()
)
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- 2. PAGES
INSERT INTO public.pages (id, slug, title, status, seo, section_ids, created_at, updated_at)
VALUES
(
  'page-home',
  '/',
  'Home',
  'published',
  '{"title":"CrossLife | A Conference for Young People — Equip Indian Churches","description":"CrossLife is a young people\'s conference organised by Equip Indian Churches.","ogImage":"/images/crosslife-logo.webp"}'::jsonb,
  ARRAY['sec-home-hero', 'sec-home-pillars', 'sec-home-who', 'sec-home-unique', 'sec-home-venue', 'sec-home-book', 'sec-home-faq', 'sec-home-partners'],
  NOW(),
  NOW()
),
(
  'page-about',
  '/about',
  'About CrossLife',
  'published',
  '{"title":"About CrossLife | Mission, Vision & Biblical Foundations","description":"Learn about the mission, five hopes & goals, and biblical foundations behind CrossLife.","ogImage":"/images/crosslife-logo.webp"}'::jsonb,
  ARRAY['sec-about-intro', 'sec-about-why', 'sec-about-who', 'sec-about-unique', 'sec-about-goals', 'sec-about-pillars', 'sec-about-organiser'],
  NOW(),
  NOW()
),
(
  'page-conference',
  '/conference',
  'Conference 2027',
  'published',
  '{"title":"Conference 2027 | Dates, Venue, Schedule & Registration","description":"Everything you need to know about CrossLife 2027: September 14–16 at Ashirwad Global Learning Centre.","ogImage":"/images/crosslife-logo.webp"}'::jsonb,
  ARRAY['sec-conf-overview', 'sec-conf-venue', 'sec-conf-book', 'sec-conf-cta'],
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, seo = EXCLUDED.seo, section_ids = EXCLUDED.section_ids, updated_at = NOW();

-- 3. PARTNERS
INSERT INTO public.partners (id, name, tagline, role, description, website, logo_url, sort_order, is_active)
VALUES
('part-eic', 'Equip Indian Churches', 'A Pastoral Fellowship', 'Organiser', 'A collaborative fellowship of pastors working together to provide direction and momentum to the biblical growth of churches across India in the reformed evangelical tradition.', 'https://equipindianchurches.com', NULL, 1, true),
('part-ftt', 'For The Truth', 'Christian Literature & Publishing', 'Bookstore Sponsor', 'An Indian Christian ministry dedicated to publishing, curating, and distributing sound, gospel-centered theological literature and biblical resources across the nation.', 'https://forthetruth.in', '/images/partner-ftt.png', 2, true),
('part-tbp', 'The Bible Project', 'Visual Exposition & Biblical Theology', 'Partner', 'Helping people experience the Bible as a unified story that leads to Jesus through thoughtful visual exposition and accessible biblical theology.', 'https://bibleproject.com', NULL, 3, true),
('part-svs', 'SVS', 'Theological Education', 'Partner', 'Partnering in theological education and gospel resource distribution to strengthen church leadership throughout India.', '', NULL, 4, true)
ON CONFLICT (id) DO NOTHING;

-- 4. ESSENTIAL FAQS
INSERT INTO public.faqs (id, question, answer, category, sort_order, is_published)
VALUES
('faq-1', 'When will CrossLife 2027 take place?', 'CrossLife 2027 will be held from Tuesday, 14th to Thursday, 16th September 2027.', 'General', 1, true),
('faq-2', 'Where will CrossLife 2027 take place?', 'The venue for CrossLife 2027 is Ashirwad Global Learning Centre, Hyderabad, Telangana.', 'General', 2, true),
('faq-3', 'When will the conference begin on the 14th?', 'The conference will begin promptly at 11:00 AM on 14th September 2027.', 'General', 3, true),
('faq-4', 'Can both men and women attend CrossLife 2027?', 'Yes, CrossLife 2027 is open to both men and women aged 18 to 25.', 'Registration', 4, true),
('faq-5', 'Is it important for participants to know English?', 'All sessions will be conducted in English, so a good understanding of English is necessary to fully participate.', 'Registration', 5, true),
('faq-6', 'What are the accommodation options?', 'Accommodation will be provided in dormitory-style arrangements. Lodging and meals are included in the registration fee.', 'Accommodation & Travel', 6, true)
ON CONFLICT (id) DO NOTHING;
