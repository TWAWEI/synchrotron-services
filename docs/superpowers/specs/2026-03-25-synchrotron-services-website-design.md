# Synchrotron Technology Services Website - Design Spec

## Overview

A professional website for an independent technology service company that leverages NSRRC synchrotron radiation resources to serve industrial clients. The site positions services by industry problems solved, not by technical capabilities.

## Target Audience

Industrial clients: biotech/pharma companies, semiconductor/materials firms, food/agriculture companies, precision manufacturing companies. These clients need analytical problems solved but don't need to understand synchrotron technology details.

## Brand & Tone

- Independent company identity, separate from NSRRC
- Based on NSRRC brand foundations but with a more modern, tech-forward aesthetic
- High-end technology feel combined with problem-oriented communication
- Approachable: clients should feel they can engage without technical expertise

## Site Architecture

```
/ (Home)
├── /solutions (Industry Solutions)
│   ├── /solutions/biotech-pharma
│   │   → Drug structure analysis, protein crystallography, drug delivery system analysis
│   ├── /solutions/semiconductor-materials
│   │   → Thin film structure, nanomaterial analysis, defect detection
│   ├── /solutions/food-agriculture
│   │   → Composition analysis, food safety testing, trace elements
│   └── /solutions/precision-manufacturing
│       → Quality inspection, reverse engineering, material verification
├── /services (How to Work With Us)
│   ├── /services/analysis — Contract analysis
│   ├── /services/consulting — Technical consulting
│   ├── /services/equipment — Equipment rental
│   └── /services/collaboration — Industry-academia collaboration
├── /cases (Success Stories)
│   └── Categorized by industry
├── /about (About Us)
│   ├── Company introduction & vision
│   └── Team
└── /contact (Contact Us)
    └── Inquiry form + contact info
```

## Homepage Structure

### 1. Hero Section
- Value proposition headline (e.g., "World-class analytical technology, solving core industry problems")
- Subtitle: unique resource advantage
- Primary CTA: "Find Your Solution" → /solutions
- Secondary CTA: "Get in Touch" → /contact
- Background: tech-feel dynamic visual (leveraging existing light halo assets)

### 2. Industry Entry Cards (4 cards)
- Biotech & Pharma
- Semiconductor & Materials
- Food & Agriculture
- Precision Manufacturing
- Each card: industry icon + one pain-point sentence + link to industry page

### 3. Why Choose Us (3-4 differentiators)
- World-class facility resources
- Deep industry experience
- One-stop service
- Fast turnaround

### 4. Featured Success Stories (2-3 cases)
- Client industry + problem solved + outcome metrics

### 5. Collaboration Process (4 steps)
- Consultation → Planning → Execution → Delivery

### 6. Bottom CTA
- "Not sure what you need? Let us help you evaluate."
- Link to contact form

### 7. Footer
- Company info, quick links, contact details

## Industry Solution Pages

Each industry page follows the same template:
1. Industry hero with relevant imagery
2. "Problems We Solve" — list of common challenges in that industry
3. "How We Help" — specific analytical capabilities framed as solutions
4. Relevant success stories
5. CTA to contact/consultation

Technical details (what equipment/techniques are used) appear as supporting context within solutions, not as primary selling points.

## Services Overview Page (`/services`)

A single page listing all four collaboration modes as cards:
- Each card: icon + title + 1-2 sentence description + link to detail page
- Page intro text: "Multiple ways to work with us, tailored to your needs"

## Success Stories Page (`/cases`)

### Page Template
- Filter bar: filter by industry (biotech, semiconductor, food, manufacturing, all)
- Case cards in grid layout (2-3 columns desktop, 1 column mobile)
- Each card links to an expanded inline view (no separate detail page in v1)

### Case Study Content Schema
```json
{
  "id": "string",
  "title": "string",
  "industry": "biotech-pharma | semiconductor-materials | food-agriculture | precision-manufacturing",
  "client": "string (company name, can be anonymized)",
  "challenge": "string (1-2 sentences: what problem the client faced)",
  "solution": "string (1-2 sentences: how we helped)",
  "outcome": "string (measurable results or key achievements)",
  "techniques": ["string (supporting technical context, optional)"],
  "image": "string (path to case image, optional)",
  "featured": "boolean (show on homepage)"
}
```

## About Page (`/about`)

Single page with two sections (not sub-routes):
1. **Company Introduction & Vision** — who we are, our mission, our unique value
2. **Team** — key team members with photo, name, title, brief bio

## Contact Form Specification

### Form Fields
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Name | text | yes | Contact person name |
| Company | text | yes | Company name |
| Industry | select | yes | Options: biotech/pharma, semiconductor/materials, food/agriculture, precision manufacturing, other |
| Email | email | yes | Validated format |
| Phone | tel | no | |
| Service Interest | select | no | Options: contract analysis, consulting, equipment rental, collaboration |
| Description | textarea | yes | Brief description of needs (max 1000 chars) |

### Anti-Spam & Security
- Honeypot field (hidden field, reject if filled)
- Server-side input validation and sanitization in API route
- Rate limiting: max 5 submissions per IP per hour
- CSRF protection via Next.js built-in mechanisms

### Error Handling
- Client-side: inline validation errors per field
- Server-side: if Resend fails, return user-friendly error message and log the failure
- Success: show confirmation message with expected response time

## Content Strategy

Content is stored as JSON files in `content/` directory:
- `content/solutions/` — industry solution data
- `content/services/` — service mode descriptions
- `content/cases/` — case study data

Adding a new industry or case requires only adding a JSON file, no code changes.

## Tech Stack

| Item | Choice | Rationale |
|------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSG + SEO + extensibility |
| Styling | Tailwind CSS 4 | Paired with Impeccable design system |
| Design System | Impeccable | Professional design patterns & anti-patterns |
| Animation | Framer Motion | Subtle tech-feel micro-animations |
| Content | JSON/MDX files | Simple now, swappable to CMS later |
| i18n | next-intl (prepared) | Chinese first, English later |
| Deployment | Vercel | Zero-config, auto CI/CD |
| Forms | React Hook Form + Resend | Contact form email delivery |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Global layout (header + footer)
│   ├── page.tsx                # Homepage
│   ├── solutions/
│   │   ├── page.tsx            # Solutions overview
│   │   └── [industry]/
│   │       └── page.tsx        # Industry page (dynamic route)
│   ├── services/
│   │   ├── page.tsx            # Services overview
│   │   └── [service]/
│   │       └── page.tsx        # Service detail page
│   ├── cases/
│   │   └── page.tsx            # Success stories
│   ├── about/
│   │   └── page.tsx            # About us
│   └── contact/
│       └── page.tsx            # Contact form
├── components/
│   ├── ui/                     # Base UI components
│   ├── layout/                 # Header, Footer, Nav
│   └── sections/               # Page section components
├── content/
│   ├── solutions/              # Industry solution content
│   ├── services/               # Service descriptions
│   └── cases/                  # Case study data
├── lib/                        # Utility functions
└── styles/                     # Global styles
public/                         # Static assets (images, icons)
messages/
└── zh-TW.json                  # i18n (prepared)
```

## Visual Design Direction

### Color Palette
- **Primary**: Dark navy `#0A1628` — backgrounds, headers
- **Secondary**: Deep blue `#1E3A5F` — cards, sections
- **Accent**: Electric cyan `#00D4FF` — CTAs, highlights, hover states
- **Text**: White `#FFFFFF` on dark, Dark gray `#1A1A2E` on light
- **Surface**: Light gray `#F8FAFC` — light section backgrounds
- **Success/Error**: Standard green/red for form feedback

### Typography & Layout
- Modern, clean layout with generous whitespace
- Responsive: mobile-first design

### Imagery
- Hero background: use existing light halo assets from `設計元素/` folder (光暈.png series)
- Industry pages: stock photography or AI-generated imagery (sourced during implementation)
- Icons: Lucide React icon set for consistency

### Animations (bounded scope)
- Hero: subtle background particle/glow effect
- Scroll: fade-in-up for section entries (0.4s ease, triggered at 20% viewport)
- Cards: scale on hover (1.02x, 0.2s ease)
- No page transition animations in v1

### Design System
Impeccable (v1.5.1) is installed as a skill plugin providing design patterns and anti-patterns for AI-assisted frontend development. It integrates with Tailwind CSS 4 via skill commands (`/polish`, `/audit`, `/typeset`, etc.) during implementation, not as a runtime dependency.

## SEO Strategy

### Meta Tags
- Each page: unique `<title>` and `<meta name="description">`
- Open Graph tags (og:title, og:description, og:image) for social sharing
- Canonical URLs

### Structured Data (JSON-LD)
- Homepage: `Organization` schema
- Service pages: `Service` schema
- Contact page: `ContactPoint` schema

### Technical SEO
- Auto-generated `sitemap.xml` via Next.js
- `robots.txt` allowing all crawlers
- Semantic HTML throughout

## Future Extensibility

1. **i18n**: Add `messages/en.json` and configure next-intl routing
2. **CMS**: Replace JSON files with Sanity/Contentlayer
3. **Client Portal**: Add authentication + case tracking under `/portal`
4. **Blog/Insights**: Add `/blog` with MDX content

## Scope Boundaries

### In Scope (v1)
- All pages listed in site architecture
- Responsive design (mobile + desktop)
- Contact form with email delivery, anti-spam, and error handling
- SEO optimization (meta tags, structured data, sitemap)
- Chinese content
- Impeccable design system integration
- 404 error page with navigation back to homepage
- Basic Vercel Analytics

### Out of Scope (v1)
- English translation (i18n architecture prepared, no locale prefix routing in v1)
- CMS backend
- Client accounts / portal
- Blog
- File upload in contact form
- Case study detail pages (inline expand only)
