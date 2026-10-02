# CrossLife 2027 — Official Conference Web Application

> **ONE LIFE. ONE DESIRE. ONE PURPOSE.**  
> A national Christian youth conference organised by **Equip Indian Churches**.  
> **Dates:** 14–16 September 2027 • **Venue:** Ashirwad Global Learning Centre, Hyderabad, Telangana.

---

## 1. Overview & Theological Identity

CrossLife is a conference designed to inspire and equip young people (ages 18–25) to live out **One Life** for Christ, with **One Desire** to glorify Him, and to fulfill **One Purpose**—to proclaim His Gospel.

Organised by **Equip Indian Churches**, CrossLife stands apart from superficial entertainment-based youth gatherings by committing to:
- **Substance Over Style:** Rigorous, expository biblical preaching and doctrinal clarity.
- **Truth Over Trend:** Anchored in the authoritative, sufficient Word of God and rooted in the local church.

---

## 2. Technology Stack

- **Framework:** React 19 + TypeScript
- **Bundler & Tooling:** Vite 8 + PostCSS + Autoprefixer
- **Styling:** Tailwind CSS (Custom conference palette: Deep Navy `#0B294B`, CrossLife Blue `#1E4F85`, Light Blue `#EEF4FB`, Off-White `#F7F9FC`, Gold `#F4C34E`)
- **Routing:** React Router 7 (`react-router-dom`)
- **Icons:** Lucide React (Clean, semantic usage only — strictly zero AI decorative emojis or gimmick blobs)
- **Deployment Target:** Vercel (Configured with `vercel.json` SPA rewrite rules)

---

## 3. Architecture & Directory Structure

The project employs a clean, scalable, decoupled architecture where content, event schedules, pricing tiers, and configuration are completely separated from presentation components for seamless CMS or API integration.

```
c:/Cross lifes/
├── public/
│   ├── favicon.svg             # Stylized CrossLife mark
│   └── images/                 # Authentic conference photography & book covers
│       ├── crosslife-logo.webp
│       ├── partners-org.webp
│       ├── partner-ftt.png
│       ├── preaching.jpg
│       ├── singing.jpg
│       ├── panel.png
│       ├── venue-1.webp .. venue-5.webp
│       └── bookstore-1.webp .. bookstore-4.webp
├── src/
│   ├── components/
│   │   ├── about/              # WhyCrossLife, WhoIsItFor, WhatsUnique, GoalsSection
│   │   ├── bookstore/          # BookstoreSection, BookPromotion, BookCard
│   │   ├── common/             # Container, Section, SectionHeading, Button, Modal, CTASection
│   │   ├── contact/            # ContactForm
│   │   ├── event/              # EventOverview, Countdown
│   │   ├── hero/               # Hero
│   │   ├── layout/             # Header, MegaMenu, MobileMenu, Footer, Layout
│   │   ├── partners/           # OrganiserSection
│   │   ├── pillars/            # ThreePillars
│   │   ├── registration/       # FloatingEventButton, RegistrationModal
│   │   ├── speakers/           # SpeakerSection, SpeakerCard
│   │   └── venue/              # VenueSection
│   ├── config/
│   │   └── site.ts             # Site metadata, registration URLs, contact details
│   ├── context/
│   │   └── RegistrationContext.tsx # Global modal & floating button state provider
│   ├── data/
│   │   ├── content.ts          # Official verbatim statements, quotes, 5 Hopes & Goals
│   │   ├── event.ts            # Dates, ticket prices, discounts, venue, free book data
│   │   ├── faq.ts              # Categorised FAQ records
│   │   ├── navigation.ts       # Desktop mega-menu & mobile navigation tree
│   │   ├── partners.ts         # Partner & sponsor ministry profiles
│   │   ├── speakers.ts         # Speaker lineup & expositor philosophy
│   │   └── statementOfFaith.ts # Complete 11 Articles of Faith with Scripture citations
│   ├── hooks/
│   │   ├── useModal.ts         # Accessible modal scroll-lock & ESC key handler
│   │   └── useScrollDirection.ts # Sticky header dynamic behavior
│   ├── pages/
│   │   ├── Home.tsx            # Full conference narrative & conversion flow
│   │   ├── About.tsx           # History, distinctives, 5 goals, 1 Tim 4:12 quote
│   │   ├── Conference.tsx      # Dates, schedule, pricing tiers, bookstore, venue
│   │   ├── Speakers.tsx        # Pastors from across India & biblical exposition
│   │   ├── Partners.tsx        # Equip Indian Churches & partner ministries
│   │   ├── FAQ.tsx             # Interactive searchable FAQ
│   │   ├── Contact.tsx         # Contact details & inquiry form
│   │   └── StatementOfFaith.tsx# Comprehensive 11 Articles of Faith
│   ├── App.tsx                 # Route declarations & provider wiring
│   ├── index.css               # Design system typography, color utility tokens
│   └── main.tsx                # React DOM root entry
├── vercel.json                 # Vercel SPA routing configuration
└── vite.config.ts              # Vite plugins & configuration
```

---

## 4. Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm (On Windows PowerShell, use `npm.cmd` or standard cmd.exe)

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Launches Vite HMR local server at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Executes TypeScript type checking (`tsc -b`) and generates production bundles in `dist/`.

### Local Production Preview
```bash
npm run preview
```
Runs a local HTTP server serving the production bundle at `http://localhost:4173`.

---

## 5. Configuration & Content Customization

All copy, rates, and event dates can be modified directly in the centralized data layer:

| Requirement | File Location | Key Variables |
|---|---|---|
| **Dates, Venue & Rates** | `src/data/event.ts` | `dates`, `earlyBirdPrice`, `discount`, `promoCode`, `venue` |
| **External Registration Link** | `src/config/site.ts` | `registrationConfig.registrationUrl` |
| **Contact Info & Socials** | `src/config/site.ts` | `siteConfig.email`, `siteConfig.phones`, `siteConfig.socials` |
| **Speaker Profiles** | `src/data/speakers.ts` | `speakerData.speakers` |
| **Partner Ministries** | `src/data/partners.ts` | `partnerData` |
| **Free Book Gift** | `src/data/event.ts` | `eventConfig.freeBook` |
| **FAQ Items & Categories** | `src/data/faq.ts` | `faqData` |
| **Statement of Faith** | `src/data/statementOfFaith.ts`| `statementOfFaith` |

---

## 6. Vercel Deployment

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In the Vercel Dashboard, click **Add New Project** and import the repository.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. `vercel.json` already contains the SPA fallback rule:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
All deep routes (`/about`, `/conference`, `/speakers`, `/statement-of-faith`, etc.) will hydrate properly on refresh.

---

## 7. Design Standards & Compliance

- **No AI Tropes:** Zero emojis, zero random floating blobs, zero fake testimonials or invented speakers.
- **Authentic Assets:** Real event photographs from past conferences, authentic logos, and genuine ministry links.
- **Conversion-Optimized:** Sticky "Event Info & Rates" floating button, early-bird coupon code copy feature, and integrated registration flow.
- **Accessibility:** Full keyboard navigability, semantic HTML5 tags (`<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`), aria labels, and high-contrast color ratios.
