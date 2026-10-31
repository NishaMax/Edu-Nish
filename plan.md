# EduNish — Development Plan

> **Domain:** edunish.lk  
> **Stack:** Next.js 15 (App Router, Static Export) · Tailwind CSS v4 · Supabase (Free Tier) · Google Drive (PDF hosting) · Vercel (Deployment)  
> **Audience:** Sri Lankan Grade 6–13 students (O/L & A/L)  
> **Languages:** Sinhala · English · Tamil  

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Folder Structure](#2-folder-structure)
3. [Phase 0 — Project Scaffolding & Design System](#phase-0--project-scaffolding--design-system)
4. [Phase 1 — Static Frontend (UI/UX Shell)](#phase-1--static-frontend-uiux-shell)
5. [Phase 2 — Trilingual Routing & SEO Engine](#phase-2--trilingual-routing--seo-engine)
6. [Phase 3 — Supabase Integration & Data Layer](#phase-3--supabase-integration--data-layer)
7. [Phase 4 — Google Drive Download Pipeline](#phase-4--google-drive-download-pipeline)
8. [Phase 5 — Search, Suggestions & UX Polish](#phase-5--search-suggestions--ux-polish)
9. [Phase 6 — Admin Dashboard](#phase-6--admin-dashboard)
10. [Phase 7 — Performance, SEO Hardening & Launch](#phase-7--performance-seo-hardening--launch)
11. [Phase 8 — Post-Launch (Analytics, Ads, Monitoring)](#phase-8--post-launch-analytics-ads-monitoring)
12. [Database Schema](#database-schema)
13. [Google Drive Link Strategy](#google-drive-link-strategy)
14. [SEO Technical Strategy](#seo-technical-strategy)

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                      USER (Mobile)                       │
│              2GB RAM · 3G/4G · Chrome Android            │
└────────────────────────┬─────────────────────────────────┘
                         │ HTTPS
                         ▼
┌──────────────────────────────────────────────────────────┐
│               Vercel Edge Network (CDN)                  │
│         Static HTML/CSS/JS · ISR for dynamic pages       │
│         Edge Functions for API routes                    │
└────────────┬─────────────────────────┬───────────────────┘
             │                         │
             ▼                         ▼
┌────────────────────┐    ┌────────────────────────────────┐
│  Supabase (Free)   │    │     Google Drive (PDF Host)    │
│  PostgreSQL DB     │    │  Direct download links via     │
│  Text metadata     │    │  /uc?export=download&id=ID     │
│  only (~2000 rows) │    │  Organized: Grade/Subject/Year │
└────────────────────┘    └────────────────────────────────┘
```

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Static Generation (SSG/ISR)** | Zero server compute at request time → instant loads on 2GB devices |
| **No file storage in DB** | Supabase free tier has 1GB DB limit; PDFs stay on unlimited Google Drive |
| **Google Drive direct links** | Bypasses the heavy Drive preview UI; file downloads instantly to phone |
| **App Router + `generateStaticParams`** | Every paper page is pre-rendered HTML → perfect Lighthouse & SEO scores |
| **Trilingual URL routing** | `/si/`, `/en/`, `/ta/` prefixes → Google indexes each language separately |
| **Tailwind v4 (CSS-first)** | Smaller CSS bundle, no JS config file, native cascade layers |
| **No auth** | Fully public pages → maximum crawlability, no login friction for students |

---

## 2. Folder Structure

```
edunish/
├── public/
│   ├── fonts/                    # Self-hosted Sinhala/Tamil/English fonts
│   │   ├── noto-sans-sinhala/
│   │   ├── noto-sans-tamil/
│   │   └── inter/
│   ├── icons/                    # Favicons, PWA icons
│   ├── og/                       # Open Graph images (auto-generated)
│   └── robots.txt
│
├── src/
│   ├── app/
│   │   ├── [locale]/             # Dynamic locale segment: en | si | ta
│   │   │   ├── layout.tsx        # Locale-aware root layout (RTL-ready for Tamil)
│   │   │   ├── page.tsx          # Home — hero + grade selector
│   │   │   │
│   │   │   ├── ol/               # O/L Section
│   │   │   │   ├── page.tsx      # Subject grid for O/L
│   │   │   │   └── [subject]/
│   │   │   │       ├── page.tsx  # Year listing for subject
│   │   │   │       └── [year]/
│   │   │   │           └── page.tsx  # Paper detail + download
│   │   │   │
│   │   │   ├── al/               # A/L Section (same structure as O/L)
│   │   │   │   ├── page.tsx
│   │   │   │   └── [subject]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── [year]/
│   │   │   │           └── page.tsx
│   │   │   │
│   │   │   ├── notes/            # Study notes section
│   │   │   │   └── [...slug]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── search/           # Search results page
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── about/
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/                # Admin dashboard (password-protected)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx          # Dashboard overview
│   │   │   ├── papers/
│   │   │   │   ├── page.tsx      # Paper CRUD list
│   │   │   │   └── new/
│   │   │   │       └── page.tsx  # Add new paper form
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── search/
│   │   │   │   └── route.ts      # Suggestion-based search endpoint
│   │   │   ├── download/
│   │   │   │   └── route.ts      # Proxy/redirect to Drive direct link + count
│   │   │   ├── admin/
│   │   │   │   └── route.ts      # Admin auth + CRUD endpoints
│   │   │   └── revalidate/
│   │   │       └── route.ts      # On-demand ISR trigger from admin
│   │   │
│   │   ├── layout.tsx            # Root layout (fonts, metadata defaults)
│   │   ├── not-found.tsx
│   │   └── sitemap.ts            # Dynamic sitemap generation
│   │
│   ├── components/
│   │   ├── ui/                   # Atomic UI components
│   │   │   ├── GlassCard.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── ShareButtons.tsx
│   │   │
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── Breadcrumb.tsx
│   │   │
│   │   └── sections/             # Page sections
│   │       ├── HeroSection.tsx
│   │       ├── GradeGrid.tsx
│   │       ├── SubjectGrid.tsx
│   │       ├── PaperList.tsx
│   │       ├── DownloadCard.tsx
│   │       ├── PopularPapers.tsx
│   │       └── RequestForm.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts         # Supabase browser client
│   │   │   ├── server.ts         # Supabase server client (for SSG)
│   │   │   └── queries.ts        # Typed query functions
│   │   │
│   │   ├── i18n/
│   │   │   ├── config.ts         # Locale definitions & defaults
│   │   │   ├── dictionaries.ts   # Dictionary loader
│   │   │   └── dictionaries/
│   │   │       ├── en.json       # English translations
│   │   │       ├── si.json       # Sinhala translations
│   │   │       └── ta.json       # Tamil translations
│   │   │
│   │   ├── drive.ts              # Google Drive link converter
│   │   ├── seo.ts                # SEO metadata generator
│   │   ├── schema.ts             # JSON-LD structured data builders
│   │   └── constants.ts          # Subjects, grades, years mappings
│   │
│   ├── hooks/
│   │   ├── useSearch.ts          # Debounced search with suggestions
│   │   └── useLocale.ts          # Current locale helper
│   │
│   └── types/
│       ├── paper.ts              # Paper, Subject, Grade types
│       ├── i18n.ts               # Dictionary type definitions
│       └── database.ts           # Supabase generated types
│
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql                  # Sample data for development
│
├── scripts/
│   ├── generate-types.ts         # Generate TypeScript types from Supabase
│   └── bulk-import.ts            # CSV → Supabase bulk paper import
│
├── tailwind.config.ts            # Tailwind v4 (minimal, CSS-first)
├── next.config.ts
├── package.json
├── tsconfig.json
└── .env.local                    # SUPABASE_URL, SUPABASE_ANON_KEY, ADMIN_PASSWORD
```

---

## Phase 0 — Project Scaffolding & Design System
**Goal:** Bootable project with design tokens, fonts, and base theme.

### Tasks

- [ ] **0.1** Initialize Next.js 15 project with App Router and TypeScript
  ```bash
  npx -y create-next-app@latest ./ --ts --app --tailwind --eslint --src-dir --import-alias "@/*" --use-npm
  ```
- [ ] **0.2** Install & configure Tailwind CSS v4
  - Set up `@theme` block in `globals.css` with custom design tokens
  - Define color palette:
    - **Primary:** Deep navy `#0a0e1a` (background)
    - **Secondary:** Electric teal `#00e5a0` (accent/CTA)
    - **Tertiary:** Soft violet `#7c5cfc` (highlights)
    - **Surface:** `rgba(255,255,255,0.04)` to `rgba(255,255,255,0.08)` (glass layers)
    - **Text:** `#e8e8ed` (primary), `#8b8b9e` (muted)
  - Define spacing, border-radius, and shadow tokens
  - Configure light theme overrides via `[data-theme="light"]`

- [ ] **0.3** Self-host fonts for performance (no Google Fonts CDN calls)
  - Download & subset: **Inter** (Latin), **Noto Sans Sinhala**, **Noto Sans Tamil**
  - Use `next/font/local` for optimal loading with `font-display: swap`
  - Configure font fallback chains per locale

- [ ] **0.4** Create base `layout.tsx` with:
  - HTML `lang` attribute dynamically set per locale
  - Viewport meta tag optimized for mobile
  - Theme color meta tag for browser chrome
  - Preconnect hints for Supabase and Google Drive domains

- [ ] **0.5** Set up project-level constants (`src/lib/constants.ts`):
  - Grade mapping (6–11 for O/L, 12–13 for A/L)
  - Subject list per exam type with trilingual names and URL slugs
  - Year ranges (2000–2026)
  - Exam types: `past-paper`, `model-paper`, `marking-scheme`, `notes`

### Deliverable
> A running Next.js app with the dark theme visible, custom fonts loading, and Tailwind design tokens ready.

---

## Phase 1 — Static Frontend (UI/UX Shell)
**Goal:** Build all user-facing pages with hardcoded/mock data. Every page is pixel-perfect and buttery smooth.

### Design Principles
- **3-Tap Rule:** Home → Subject → Year → Download. Never more than 3 taps.
- **Mobile-First:** Design for 360px width first; scale up.
- **Glassmorphism (Sparse):** Only on cards and the header. Use `backdrop-filter: blur()` with `will-change: transform` for GPU acceleration. Limit to ≤5 glass elements per viewport.
- **Animations:** CSS-only (no Framer Motion). Use `@starting-style` for entry animations. Keep all animations under 300ms.
- **No skeleton screens on static pages** — content is pre-rendered.

### Tasks

- [ ] **1.1** Build **Layout Components**
  - `Header.tsx` — Sticky, glass-effect header with:
    - EduNish logo (custom SVG, not a generic icon)
    - Language switcher (🇱🇰 si / en / ta) — pill-style toggle
    - Theme toggle (sun/moon icon, smooth transition)
    - Mobile hamburger menu (slide-in drawer)
  - `Footer.tsx` — Minimal footer with subject links, contact, social
  - `MobileNav.tsx` — Bottom sheet navigation for mobile
  - `Breadcrumb.tsx` — `/en/ol/maths/2019` → `Home > O/L > Mathematics > 2019`

- [ ] **1.2** Build **Home Page** (`/[locale]/page.tsx`)
  - Hero section:
    - Trilingual heading (dynamically matches locale)
    - Animated gradient text for the tagline
    - CTA button → scrolls to grade selector
    - Subtle floating geometric shapes (CSS-only, no canvas)
  - Grade selector grid:
    - Two sections: "O/L (Grade 6–11)" and "A/L (Grade 12–13)"
    - Cards with grade number, subject count badge, and hover glow
  - Popular papers section (hardcoded for now):
    - Horizontal scroll carousel of trending papers
    - Download count badges
  - Features section:
    - "Free Forever" · "All Three Languages" · "Instant Download"

- [ ] **1.3** Build **Subject Grid Page** (`/[locale]/ol/page.tsx` and `/[locale]/al/page.tsx`)
  - Grid of subject cards (icon + name in current locale)
  - Each card shows paper count badge
  - Filter chips: "All" · "Past Papers" · "Model Papers" · "Notes"
  - Entrance animation: stagger-fade cards

- [ ] **1.4** Build **Year Listing Page** (`/[locale]/ol/[subject]/page.tsx`)
  - Subject header with icon and description
  - Year cards in reverse chronological order (newest first)
  - Each year card shows:
    - Year number prominently
    - Available mediums (Sinhala/English/Tamil badges)
    - Paper types available (Past Paper, Marking Scheme)
    - Download count

- [ ] **1.5** Build **Paper Detail / Download Page** (`/[locale]/ol/[subject]/[year]/page.tsx`)
  - Paper title and metadata (Subject, Year, Medium, Exam)
  - **Primary CTA: "Download PDF" button** (large, accent color, pulse animation)
  - Secondary options: View marking scheme, related papers
  - Share buttons (WhatsApp, Telegram, Copy Link)
  - "Request a Paper" mini-form (just subject + year + note)
  - Related papers sidebar/section

- [ ] **1.6** Build **Search Results Page** (`/[locale]/search/page.tsx`)
  - Shows results matching the search query
  - Grouped by subject with year/medium tags
  - "No results" state with suggestions

- [ ] **1.7** Build **Atomic UI Components**
  - `GlassCard.tsx` — Reusable card with configurable blur, border, and glow
  - `Button.tsx` — Primary, secondary, ghost variants with loading state
  - `Badge.tsx` — For mediums (si/en/ta), paper types, download counts
  - `SearchBar.tsx` — Input with magnifying glass icon, suggestion dropdown
  - `LanguageSwitcher.tsx` — Three-way toggle preserving current path
  - `ThemeToggle.tsx` — Dark/light with smooth CSS transition
  - `ShareButtons.tsx` — WhatsApp, Telegram, Copy Link (Web Share API fallback)
  - `Skeleton.tsx` — For any client-fetched content

- [ ] **1.8** Build **Paper Request Form** (`RequestForm.tsx`)
  - Simple form: Subject dropdown, Year input, Medium select, optional message
  - Stores requests in a Supabase `requests` table (wired in Phase 3)
  - Success toast animation

### Deliverable
> Fully navigable frontend with mock data. All pages render, all transitions work, all components styled. Feels like a finished product except downloads don't work yet.

---

## Phase 2 — Trilingual Routing & SEO Engine
**Goal:** Implement i18n routing, generate SEO metadata for all three languages, and add structured data.

### Tasks

- [ ] **2.1** Implement **Locale Routing System**
  - Use Next.js `[locale]` dynamic segment in App Router
  - Create `middleware.ts` for:
    - Auto-detecting browser language (`Accept-Language` header)
    - Redirecting `/` → `/si/` (default for Sri Lankan users)
    - Validating locale param (only `en`, `si`, `ta` allowed)
  - `LanguageSwitcher` swaps locale in URL while preserving the rest of the path

- [ ] **2.2** Build **Translation Dictionary System**
  - Create JSON dictionaries: `en.json`, `si.json`, `ta.json`
  - Contents:
    - UI strings (buttons, labels, navigation)
    - Subject names in all three languages
    - Grade labels
    - SEO templates (title patterns, meta description patterns)
  - Helper function: `getDictionary(locale)` → returns typed dictionary
  - All subject slugs remain in English for URL consistency (`/si/ol/maths/2019` not `/si/ol/ගණිතය/2019`)

- [ ] **2.3** Implement **SEO Metadata Generation** (`src/lib/seo.ts`)
  - `generatePaperMeta(locale, exam, subject, year)` → returns:
    ```
    Title: "2019 O/L Mathematics Past Paper | Download PDF Free — EduNish"
    Title (si): "2019 සා/පෙළ ගණිතය පසුගිය විභාග ප්‍රශ්න පත්‍ර | PDF බාගන්න — EduNish"
    Title (ta): "2019 சா/த கணிதம் கடந்த கால வினாத்தாள் | PDF பதிவிறக்கம் — EduNish"
    ```
  - Generate `<meta name="description">` in each language
  - Generate `<link rel="alternate" hreflang="si|en|ta">` tags
  - Canonical URLs pointing to the current locale version
  - Open Graph tags with localized titles

- [ ] **2.4** Implement **JSON-LD Structured Data** (`src/lib/schema.ts`)
  - **EducationalOrganization** schema on every page:
    ```json
    {
      "@type": "EducationalOrganization",
      "name": "EduNish",
      "url": "https://edunish.lk",
      "description": "Free O/L and A/L past papers for Sri Lankan students"
    }
    ```
  - **Course** schema per subject page
  - **DigitalDocument** schema per paper page (name, datePublished, inLanguage, educationalLevel)
  - **BreadcrumbList** schema on all pages
  - **WebSite** schema with `SearchAction` (for Google Sitelinks Searchbox)

- [ ] **2.5** Build **Dynamic Sitemap** (`src/app/sitemap.ts`)
  - Generates URLs for all `locale × exam × subject × year` combinations
  - Includes `<xhtml:link rel="alternate">` for each language version
  - Priority: Home (1.0) > Subject pages (0.8) > Paper pages (0.6)
  - `changefreq`: monthly for paper pages, weekly for subject pages

- [ ] **2.6** Create **`robots.txt`** and **`manifest.json`**
  - `robots.txt`: Allow all, point to sitemap
  - `manifest.json`: PWA-ready manifest with EduNish branding

### Deliverable
> Every page has localized URLs, complete SEO metadata, JSON-LD structured data, and a comprehensive sitemap. Switching languages preserves the current page context.

---

## Phase 3 — Supabase Integration & Data Layer
**Goal:** Connect Supabase PostgreSQL, define the schema, seed data, and replace all mock data with live queries.

### Tasks

- [ ] **3.1** Set up **Supabase Project**
  - Create project on supabase.com (free tier)
  - Store `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env.local`
  - Install `@supabase/supabase-js`

- [ ] **3.2** Create **Database Schema** (see [Database Schema](#database-schema) section below)
  - Run migration `001_initial_schema.sql`
  - Tables: `papers`, `subjects`, `requests`
  - Row Level Security (RLS): Public read on `papers` and `subjects`; admin-only write
  - Create indexes on `(exam_type, subject_slug, year)` for fast lookups

- [ ] **3.3** Generate **TypeScript types** from Supabase
  ```bash
  npx supabase gen types typescript --project-id <id> > src/types/database.ts
  ```

- [ ] **3.4** Build **Query Layer** (`src/lib/supabase/queries.ts`)
  - `getSubjects(examType)` → all subjects for O/L or A/L
  - `getPapersBySubject(examType, subjectSlug)` → years + metadata
  - `getPaper(examType, subjectSlug, year)` → single paper with Drive URL
  - `searchPapers(query, locale)` → suggestion-style search results
  - `getPopularPapers(limit)` → top papers by download count
  - `incrementDownloadCount(paperId)` → bump counter
  - `submitRequest(data)` → insert into requests table

- [ ] **3.5** Implement **Static Generation with Supabase**
  - `generateStaticParams()` in each `[subject]` and `[year]` route
  - Fetches all valid combinations from Supabase at build time
  - ISR revalidation: `revalidate = 3600` (1 hour) so new papers appear within an hour

- [ ] **3.6** Replace **all mock data** with live Supabase queries
  - Home page: popular papers from DB
  - Subject pages: subjects from DB
  - Year listing: papers grouped by year from DB
  - Paper detail: full paper metadata from DB

- [ ] **3.7** Seed **development data**
  - Create `supabase/seed.sql` with ~50 sample papers across subjects
  - Include all three mediums and both exam types

### Deliverable
> All pages now pull real data from Supabase. Static generation works — pages are pre-built at deploy time. Adding a paper to Supabase makes it appear on the site within 1 hour.

---

## Phase 4 — Google Drive Download Pipeline
**Goal:** Convert Drive share links to direct downloads; implement the download flow.

### Tasks

- [ ] **4.1** Build **Drive Link Converter** (`src/lib/drive.ts`)
  ```typescript
  // Input:  "https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
  // Output: "https://drive.google.com/uc?export=download&id=FILE_ID"
  
  export function toDirectDownloadLink(shareUrl: string): string {
    const match = shareUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) throw new Error("Invalid Google Drive URL");
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  ```

- [ ] **4.2** Build **Download API Route** (`src/app/api/download/route.ts`)
  - Accepts `paperId` parameter
  - Looks up the Drive URL from Supabase
  - Increments download counter (`download_count += 1`)
  - Returns a 302 redirect to the direct Drive download link
  - This ensures:
    - Download counts are tracked
    - The actual Drive URL is never exposed in frontend HTML
    - We can swap storage backends later without changing frontend

- [ ] **4.3** Wire **Download Button** in paper detail page
  - Button click → `GET /api/download?id=PAPER_ID`
  - Show brief "Preparing download..." toast
  - Browser handles the file download natively
  - After download initiates, show "Downloaded! ✓" confirmation

- [ ] **4.4** Implement **Share Functionality**
  - WhatsApp: `https://wa.me/?text=` + encoded paper URL
  - Telegram: `https://t.me/share/url?url=` + encoded paper URL
  - Copy Link: Clipboard API with success toast
  - Use Web Share API on supported devices as primary option

- [ ] **4.5** Add **Download Count Display**
  - Show download count on paper cards and detail pages
  - Format: "1.2K downloads" for large numbers
  - Update count client-side after successful download (optimistic UI)

### Deliverable
> Tapping "Download" on any paper instantly starts a PDF download to the phone. No Google Drive preview UI is shown. Download counts are tracked. Share buttons work.

---

## Phase 5 — Search, Suggestions & UX Polish
**Goal:** Implement suggestion-based search and finalize all micro-interactions.

### Tasks

- [ ] **5.1** Build **Search API** (`src/app/api/search/route.ts`)
  - Accepts `q` (query string) and `locale` parameters
  - Uses PostgreSQL `ILIKE` or `tsvector` for matching
  - Searches across: subject names (all 3 languages), years, exam types
  - Returns max 8 suggestions, each with: title, exam type, subject, year, URL
  - Response time target: < 200ms

- [ ] **5.2** Build **SearchBar Component** (`src/components/ui/SearchBar.tsx`)
  - Positioned in header (collapses to icon on mobile, expands on tap)
  - Debounced input (300ms) triggers search API
  - Dropdown shows suggestions as user types:
    ```
    🔍 "maths 2019"
    ├── 📄 2019 O/L Mathematics Past Paper
    ├── 📄 2019 O/L Mathematics Marking Scheme
    └── 📄 2019 A/L Combined Mathematics Past Paper
    ```
  - Keyboard navigation (↑↓ Enter)
  - "Enter" with text → navigates to `/search?q=...` page
  - Suggestion click → navigates directly to paper page

- [ ] **5.3** Build **`useSearch` Hook** (`src/hooks/useSearch.ts`)
  - Manages search state, debouncing, loading, and results
  - Caches recent searches in `sessionStorage`
  - Handles empty states and error states

- [ ] **5.4** Polish **Micro-Animations**
  - Page transitions: fade-in with slight upward slide (CSS `@starting-style`)
  - Card hover: subtle scale(1.02) + shadow elevation
  - Button press: scale(0.97) feedback
  - Download button: pulse animation on CTA
  - Badge appearance: pop-in with slight bounce
  - Theme toggle: smooth color transition (300ms on `*` selector)
  - Search dropdown: slide-down with fade

- [ ] **5.5** Implement **Dark/Light Theme Toggle**
  - Store preference in `localStorage`
  - Respect `prefers-color-scheme` on first visit
  - Apply theme via `data-theme` attribute on `<html>`
  - Smooth transition on toggle (no flash of wrong theme on load)

- [ ] **5.6** Implement **Paper Request Form**
  - Wire to Supabase `requests` table
  - Fields: Subject, Year, Medium, Message (optional)
  - Client-side validation
  - Rate limiting: max 5 requests per session
  - Success/error feedback with toast notifications

### Deliverable
> Search with suggestions works. All interactions feel polished and responsive. Theme toggle is smooth. Paper requests are stored in DB.

---

## Phase 6 — Admin Dashboard
**Goal:** Build a password-protected admin panel for managing paper metadata.

### Tasks

- [ ] **6.1** Implement **Admin Authentication**
  - Simple password-based auth (no user accounts needed)
  - Password stored as hashed env variable `ADMIN_PASSWORD_HASH`
  - Login page at `/admin/login`
  - Session stored in HTTP-only cookie (JWT with 24h expiry)
  - Middleware protects all `/admin/*` routes (except `/admin/login`)

- [ ] **6.2** Build **Admin Dashboard** (`/admin/page.tsx`)
  - Stats overview: total papers, total downloads, recent requests
  - Quick actions: Add Paper, View Requests, Trigger Rebuild

- [ ] **6.3** Build **Paper Management** (`/admin/papers/page.tsx`)
  - Table view of all papers with sorting and filtering
  - Columns: Subject, Year, Exam, Medium, Downloads, Drive Link
  - Inline edit capability
  - Delete with confirmation

- [ ] **6.4** Build **Add/Edit Paper Form** (`/admin/papers/new/page.tsx`)
  - Fields: Subject (dropdown), Year, Exam Type, Medium, Google Drive URL
  - Auto-validates Drive URL format
  - Auto-converts to direct download link on save
  - Triggers ISR revalidation after save (`/api/revalidate`)

- [ ] **6.5** Build **Bulk Import Tool**
  - CSV upload: `subject,year,exam_type,medium,drive_url`
  - Preview table before confirming import
  - Progress bar for large imports
  - Error reporting for invalid rows

- [ ] **6.6** Build **Request Viewer** (`/admin/requests/page.tsx`)
  - List all student paper requests
  - Mark as "fulfilled" when paper is added
  - Filter by status: pending / fulfilled

### Deliverable
> Admin can log in, add/edit/delete papers, bulk import from CSV, and view student requests. Adding a paper triggers ISR so it appears on the public site within minutes.

---

## Phase 7 — Performance, SEO Hardening & Launch
**Goal:** Achieve 95+ Lighthouse scores, validate SEO setup, and deploy to production.

### Tasks

- [ ] **7.1** Performance Optimization
  - Run Lighthouse audit on all page types
  - Target: Performance 95+, Accessibility 95+, SEO 100, Best Practices 95+
  - Optimize:
    - Ensure zero layout shift (CLS = 0)
    - First Contentful Paint < 1.5s on 3G
    - Total JS bundle < 100KB gzipped
    - Remove any unused CSS (Tailwind v4 handles this automatically)
    - Lazy load below-fold content
    - Use `loading="lazy"` on all images
    - Preload critical fonts

- [ ] **7.2** SEO Validation
  - Test all structured data with Google Rich Results Test
  - Validate sitemap with Google Search Console
  - Submit sitemap to Google, Bing
  - Test `hreflang` tags with hreflang testing tool
  - Verify canonical URLs are correct
  - Check Open Graph previews on WhatsApp, Telegram, Facebook

- [ ] **7.3** Mobile Testing
  - Test on low-end Android devices (2GB RAM target)
  - Verify smooth scrolling, no jank
  - Test on slow 3G connection (Chrome DevTools throttling)
  - Verify Google Drive downloads work on:
    - Chrome Android
    - Samsung Internet
    - Safari iOS

- [ ] **7.4** Security Hardening
  - Add security headers via `next.config.ts`:
    - `X-Content-Type-Options: nosniff`
    - `X-Frame-Options: DENY`
    - `Referrer-Policy: strict-origin-when-cross-origin`
    - `Content-Security-Policy` (strict)
  - Rate limiting on API routes (Vercel Edge middleware)
  - Input sanitization on search and request form

- [ ] **7.5** Production Deployment
  - Connect GitHub repo to Vercel
  - Configure custom domain: `edunish.lk`
  - Set environment variables in Vercel dashboard
  - Enable Vercel Analytics (free tier)
  - Set up automatic deployments on `main` branch push
  - Configure Vercel Edge regions: Mumbai (closest to Sri Lanka)

### Deliverable
> Site is live at edunish.lk with 95+ Lighthouse scores, complete SEO setup, and passing all mobile tests.

---

## Phase 8 — Post-Launch (Analytics, Ads, Monitoring)
**Goal:** Monitor performance, prepare for AdSense, and iterate based on data.

### Tasks

- [ ] **8.1** Set up **Google Search Console**
  - Verify domain ownership
  - Submit sitemap for all three language versions
  - Monitor indexing progress
  - Track search performance by query and language

- [ ] **8.2** Set up **Google Analytics 4**
  - Track: page views, downloads, search queries, language preference
  - Custom events: `paper_download`, `paper_request`, `language_switch`, `theme_toggle`
  - Set up conversion goals for downloads

- [ ] **8.3** Prepare **Ad Zones** (for future AdSense)
  - Reserve ad placement positions in layout (hidden until activated):
    - Below header (mobile banner 320×50)
    - Between paper listings (native in-feed)
    - Paper detail page sidebar (desktop) / below content (mobile)
  - Ensure ad containers don't cause CLS when activated
  - Add `ads.txt` file ready for AdSense verification

- [ ] **8.4** Set up **Uptime Monitoring**
  - Use free tier of UptimeRobot or similar
  - Monitor: homepage, API endpoints, sitemap
  - Alert via email/Telegram on downtime

- [ ] **8.5** Create **Content Pipeline**
  - Document process for adding new papers:
    1. Upload PDF to correct Google Drive folder
    2. Copy share link
    3. Add to admin dashboard (auto-converts link)
    4. Paper appears on site within 1 hour (ISR)
  - Target: 50+ papers added per week during exam season

---

## Database Schema

```sql
-- ============================================
-- EduNish Database Schema (Supabase PostgreSQL)
-- ============================================

-- Subjects table
CREATE TABLE subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,             -- "mathematics", "science", etc.
  name_en TEXT NOT NULL,                  -- "Mathematics"
  name_si TEXT NOT NULL,                  -- "ගණිතය"
  name_ta TEXT NOT NULL,                  -- "கணிதம்"
  exam_type TEXT NOT NULL CHECK (exam_type IN ('ol', 'al')),
  icon TEXT,                              -- Emoji or icon identifier
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Papers table (core content)
CREATE TABLE papers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  year INT NOT NULL CHECK (year >= 2000 AND year <= 2030),
  medium TEXT NOT NULL CHECK (medium IN ('si', 'en', 'ta')),
  paper_type TEXT NOT NULL CHECK (paper_type IN ('past-paper', 'model-paper', 'marking-scheme', 'notes')),
  drive_url TEXT NOT NULL,                -- Original Google Drive share URL
  direct_url TEXT NOT NULL,               -- Converted direct download URL
  title_en TEXT,                          -- Optional custom title override
  title_si TEXT,
  title_ta TEXT,
  download_count INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Composite unique constraint
  UNIQUE(subject_id, year, medium, paper_type)
);

-- Student requests for missing papers
CREATE TABLE requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_text TEXT NOT NULL,             -- Free text (what subject they want)
  year INT,
  medium TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'fulfilled', 'rejected')),
  session_id TEXT,                        -- For rate limiting
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Indexes for performance
-- ============================================
CREATE INDEX idx_papers_lookup ON papers(subject_id, year, medium);
CREATE INDEX idx_papers_type ON papers(paper_type);
CREATE INDEX idx_papers_published ON papers(is_published) WHERE is_published = true;
CREATE INDEX idx_subjects_exam ON subjects(exam_type);

-- Full text search index (for search suggestions)
CREATE INDEX idx_papers_search ON papers USING gin(
  to_tsvector('english', COALESCE(title_en, '') || ' ' || year::text)
);

-- ============================================
-- Row Level Security
-- ============================================
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read subjects" ON subjects FOR SELECT USING (true);
CREATE POLICY "Public can read published papers" ON papers FOR SELECT USING (is_published = true);
CREATE POLICY "Public can insert requests" ON requests FOR INSERT WITH CHECK (true);

-- Admin write access (via service role key, bypasses RLS)
```

---

## Google Drive Link Strategy

### How It Works

```
┌─────────────────────────────────────────────────────┐
│ Admin adds paper with Google Drive share URL:        │
│ https://drive.google.com/file/d/ABC123/view?usp=... │
└──────────────────────┬──────────────────────────────┘
                       │ Auto-convert on save
                       ▼
┌─────────────────────────────────────────────────────┐
│ Stored in DB as direct_url:                          │
│ https://drive.google.com/uc?export=download&id=ABC123│
└──────────────────────┬──────────────────────────────┘
                       │ User taps "Download"
                       ▼
┌─────────────────────────────────────────────────────┐
│ API Route (/api/download?id=paper-uuid):             │
│ 1. Look up direct_url from DB                       │
│ 2. Increment download_count                         │
│ 3. Return 302 redirect to direct_url                │
└──────────────────────┬──────────────────────────────┘
                       │ Browser follows redirect
                       ▼
┌─────────────────────────────────────────────────────┐
│ PDF downloads directly to phone                      │
│ ✅ No Drive preview UI                               │
│ ✅ No Google account required                        │
│ ✅ Works on all mobile browsers                      │
└─────────────────────────────────────────────────────┘
```

### Google Drive Folder Organization

```
EduNish Papers (Google Drive)/
├── O-Level/
│   ├── Mathematics/
│   │   ├── 2024/
│   │   │   ├── past-paper-si.pdf
│   │   │   ├── past-paper-en.pdf
│   │   │   ├── past-paper-ta.pdf
│   │   │   └── marking-scheme-en.pdf
│   │   ├── 2023/
│   │   └── ...
│   ├── Science/
│   └── ...
├── A-Level/
│   ├── Combined-Mathematics/
│   └── ...
└── Model-Papers/
    └── ...
```

### Important Notes
- All Drive files must have sharing set to **"Anyone with the link"**
- Files under 100MB download immediately; larger files may show a virus scan warning
- Keep individual PDFs under 25MB for best mobile experience
- The `uc?export=download` URL pattern works for files shared publicly

---

## SEO Technical Strategy

### URL Structure

| Pattern | Example | Target Query |
|---------|---------|-------------|
| `/en/ol/mathematics/2019` | English O/L Maths 2019 | "2019 maths O/L past papers" |
| `/si/ol/ganithaya/2019` | Sinhala O/L Maths 2019 | "2019 සා/පෙළ ගණිතය past papers" |
| `/ta/ol/kanitham/2019` | Tamil O/L Maths 2019 | "2019 கணிதம் past papers" |
| `/en/al/combined-mathematics/2023` | A/L Combined Maths | "2023 A/L combined maths past paper" |

> **Note:** Subject slugs are localized for maximum SEO impact in each language.

### Meta Tag Templates

**English:**
```html
<title>2019 O/L Mathematics Past Paper — Free PDF Download | EduNish</title>
<meta name="description" content="Download the 2019 O/L Mathematics past paper PDF for free. Available in Sinhala, English, and Tamil. Includes marking scheme. — EduNish Sri Lanka" />
```

**Sinhala:**
```html
<title>2019 සා/පෙළ ගණිතය පසුගිය විභාග ප්‍රශ්න පත්‍රය — නොමිලේ PDF | EduNish</title>
<meta name="description" content="2019 සාමාන්‍ය පෙළ ගණිතය පසුගිය විභාග ප්‍රශ්න පත්‍රය නොමිලේ බාගන්න. සිංහල, ඉංග්‍රීසි, දෙමළ මාධ්‍ය. — EduNish ශ්‍රී ලංකා" />
```

**Tamil:**
```html
<title>2019 சா/த கணிதம் கடந்த கால வினாத்தாள் — இலவச PDF | EduNish</title>
<meta name="description" content="2019 சாதாரண தர கணிதம் கடந்த கால வினாத்தாளை இலவசமாக பதிவிறக்கம் செய்யுங்கள். சிங்களம், ஆங்கிலம், தமிழ் மொழிகளில். — EduNish இலங்கை" />
```

### Hreflang Implementation

```html
<link rel="alternate" hreflang="en" href="https://edunish.lk/en/ol/mathematics/2019" />
<link rel="alternate" hreflang="si" href="https://edunish.lk/si/ol/ganithaya/2019" />
<link rel="alternate" hreflang="ta" href="https://edunish.lk/ta/ol/kanitham/2019" />
<link rel="alternate" hreflang="x-default" href="https://edunish.lk/en/ol/mathematics/2019" />
```

### Structured Data (JSON-LD) Per Paper Page

```json
{
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "2019 O/L Mathematics Past Paper",
  "description": "Official 2019 Ordinary Level Mathematics past examination paper",
  "datePublished": "2019",
  "inLanguage": ["si", "en", "ta"],
  "educationalLevel": "O/L",
  "isAccessibleForFree": true,
  "provider": {
    "@type": "EducationalOrganization",
    "name": "EduNish",
    "url": "https://edunish.lk"
  }
}
```

---

## Timeline Estimate

| Phase | Duration | Dependencies |
|-------|----------|-------------|
| Phase 0 — Scaffolding | 1 day | None |
| Phase 1 — Frontend Shell | 3–4 days | Phase 0 |
| Phase 2 — i18n & SEO | 2 days | Phase 1 |
| Phase 3 — Supabase | 2 days | Phase 2 |
| Phase 4 — Drive Downloads | 1 day | Phase 3 |
| Phase 5 — Search & Polish | 2 days | Phase 3, 4 |
| Phase 6 — Admin Dashboard | 2–3 days | Phase 3 |
| Phase 7 — Launch Prep | 1–2 days | All above |
| Phase 8 — Post-Launch | Ongoing | Phase 7 |
| **Total** | **~14–17 days** | |

---

> [!IMPORTANT]
> **Execution Order:** We build the frontend first (Phases 0–2) so the UI/UX and SEO structure are locked before connecting any backend. This prevents design compromises driven by data constraints.

> [!TIP]
> **Quick Win:** After Phase 2, we can already deploy to Vercel with mock data. This gives us a live URL to test SEO indexing and share with users for feedback while we build the backend.
