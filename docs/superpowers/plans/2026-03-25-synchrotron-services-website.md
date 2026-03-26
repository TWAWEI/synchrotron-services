# Synchrotron Technology Services Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional, industry-focused website for a synchrotron technology services company using Next.js 15 + Tailwind CSS 4.

**Architecture:** Next.js App Router with static generation (SSG). Content stored as TypeScript data files in `src/content/`. Pages organized by route: solutions (by industry), services (collaboration modes), cases, about, contact. Shared UI components in `src/components/`.

**Tech Stack:** Next.js 15, Tailwind CSS 4, Framer Motion, React Hook Form, Resend, Lucide React, @vercel/analytics, next-intl (scaffold), TypeScript

**Spec:** `docs/superpowers/specs/2026-03-25-synchrotron-services-website-design.md`

---

## File Map

```
synchrotron-services/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout: HTML shell, fonts, Header + Footer
│   │   ├── page.tsx                      # Homepage: Hero, IndustryCards, WhyUs, Cases, Process, CTA
│   │   ├── not-found.tsx                 # 404 page
│   │   ├── solutions/
│   │   │   ├── page.tsx                  # Solutions overview grid
│   │   │   └── [industry]/
│   │   │       └── page.tsx              # Dynamic industry page
│   │   ├── services/
│   │   │   ├── page.tsx                  # Services overview grid
│   │   │   └── [service]/
│   │   │       └── page.tsx              # Dynamic service detail page
│   │   ├── cases/
│   │   │   └── page.tsx                  # Success stories with filter
│   │   ├── about/
│   │   │   └── page.tsx                  # About: intro + team
│   │   ├── contact/
│   │   │   └── page.tsx                  # Contact form
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts              # Contact form API (validation, honeypot, Resend)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx                # Reusable Button (primary/secondary/outline variants)
│   │   │   ├── card.tsx                  # Reusable Card component
│   │   │   ├── section-heading.tsx       # Section title + subtitle
│   │   │   └── animate-on-scroll.tsx     # Framer Motion scroll reveal wrapper
│   │   ├── layout/
│   │   │   ├── header.tsx                # Sticky header with nav + mobile menu
│   │   │   ├── footer.tsx                # Footer with links + contact info
│   │   │   └── mobile-nav.tsx            # Mobile hamburger navigation
│   │   └── sections/
│   │       ├── hero.tsx                  # Homepage hero section
│   │       ├── industry-cards.tsx        # 4 industry entry cards
│   │       ├── why-us.tsx                # Differentiators section
│   │       ├── featured-cases.tsx        # Featured case studies
│   │       ├── process-steps.tsx         # 4-step collaboration process
│   │       └── bottom-cta.tsx            # Bottom CTA section
│   ├── content/
│   │   ├── solutions.ts                  # All industry solution data
│   │   ├── services.ts                   # All service mode data
│   │   ├── cases.ts                      # All case study data
│   │   ├── team.ts                       # Team member data
│   │   └── site.ts                       # Site-wide metadata, company info
│   ├── lib/
│   │   ├── types.ts                      # Shared TypeScript types
│   │   └── utils.ts                      # cn() helper, other utilities
│   └── styles/
│       └── globals.css                   # Tailwind directives + custom CSS vars
├── public/
│   ├── images/                           # Static images
│   └── og-image.png                      # Default OG image
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── messages/
│   └── zh-TW.json                        # i18n scaffold (prepared for next-intl)
└── .env.local.example                    # RESEND_API_KEY, CONTACT_EMAIL
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `synchrotron-services/` (entire project root)
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`
- Create: `src/styles/globals.css`
- Create: `src/lib/utils.ts`
- Create: `src/lib/types.ts`
- Create: `.env.local.example`

- [ ] **Step 1: Create Next.js project**

```bash
cd "/Users/hsutingwei/Library/CloudStorage/GoogleDrive-myshine852@gmail.com/其他電腦/我的筆記型電腦/Job/1. Neutron_Industry/2026-生醫年會"
npx create-next-app@latest synchrotron-services --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

Expected: Project created with default Next.js 15 + Tailwind CSS 4 + App Router.

- [ ] **Step 2: Install dependencies**

```bash
cd synchrotron-services
npm install framer-motion lucide-react react-hook-form resend clsx tailwind-merge @vercel/analytics next-intl
```

- [ ] **Step 3: Configure Tailwind with project color palette**

Write `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A1628",
        secondary: "#1E3A5F",
        accent: "#00D4FF",
        surface: "#F8FAFC",
        "text-dark": "#1A1A2E",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Set up globals.css with Tailwind directives and CSS variables**

Write `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: #0A1628;
    --color-secondary: #1E3A5F;
    --color-accent: #00D4FF;
  }

  body {
    @apply bg-white text-text-dark antialiased;
  }
}
```

- [ ] **Step 5: Create utility helpers**

Write `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 6: Create shared TypeScript types**

Write `src/lib/types.ts`:

```ts
export type IndustrySlug =
  | "biotech-pharma"
  | "semiconductor-materials"
  | "food-agriculture"
  | "precision-manufacturing";

export type ServiceSlug =
  | "analysis"
  | "consulting"
  | "equipment"
  | "collaboration";

export interface Solution {
  slug: IndustrySlug;
  title: string;
  subtitle: string;
  icon: string;
  painPoint: string;
  problems: string[];
  capabilities: { title: string; description: string }[];
  image: string;
}

export interface Service {
  slug: ServiceSlug;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: IndustrySlug;
  client: string;
  challenge: string;
  solution: string;
  outcome: string;
  techniques: string[];
  image?: string;
  featured: boolean;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image?: string;
}
```

- [ ] **Step 7: Create .env.local.example**

Write `.env.local.example`:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=contact@example.com
```

- [ ] **Step 8: Create i18n scaffold**

Write `messages/zh-TW.json`:

```json
{
  "site": {
    "name": "SynchroTech",
    "description": "世界級分析技術，解決產業核心問題"
  }
}
```

This is a placeholder scaffold. Full i18n integration will happen in a future version. The file exists so the `next-intl` migration path is clear.

- [ ] **Step 9: Verify dev server starts**

```bash
npm run dev
```

Expected: Dev server running on http://localhost:3000, default Next.js page renders.

- [ ] **Step 10: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 project with Tailwind CSS 4 and dependencies"
```

---

## Task 2: Content Data Files

**Files:**
- Create: `src/content/site.ts`
- Create: `src/content/solutions.ts`
- Create: `src/content/services.ts`
- Create: `src/content/cases.ts`
- Create: `src/content/team.ts`

- [ ] **Step 1: Create site-wide metadata**

Write `src/content/site.ts`:

```ts
export const siteConfig = {
  name: "SynchroTech",
  description: "世界級分析技術，解決產業核心問題",
  url: "https://synchrotech.com",
  contactEmail: "contact@synchrotech.com",
  contactPhone: "+886-3-578-0281",
  address: "新竹市東區科學路 101 號",
  companyIntro:
    "我們是一家獨立的技術服務公司，運用世界頂尖的同步輻射分析設施，為產業客戶提供精準、高效的分析解決方案。",
  vision:
    "讓尖端科學技術成為產業創新的助力，降低技術門檻，加速產品研發與品質提升。",
} as const;
```

- [ ] **Step 2: Create solutions content**

Write `src/content/solutions.ts` with all 4 industry solutions. Each entry includes `slug`, `title`, `subtitle`, `icon` (Lucide icon name), `painPoint`, `problems` (array of strings), `capabilities` (array of `{title, description}`), and `image` path. Content in Traditional Chinese.

- [ ] **Step 3: Create services content**

Write `src/content/services.ts` with all 4 service modes: 委託分析, 技術顧問, 設備租用, 產學合作. Each entry includes `slug`, `title`, `description`, `icon`, and `details` array.

- [ ] **Step 4: Create case studies content**

Write `src/content/cases.ts` with 4-6 placeholder case studies (at least one per industry), following the `CaseStudy` type. Mark 2-3 as `featured: true`.

- [ ] **Step 5: Create team data**

Write `src/content/team.ts` with 3-4 placeholder team members following the `TeamMember` type.

- [ ] **Step 6: Verify all content files import correctly**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/content/
git commit -m "feat: add content data files for solutions, services, cases, and team"
```

---

## Task 3: Base UI Components

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/section-heading.tsx`
- Create: `src/components/ui/animate-on-scroll.tsx`

- [ ] **Step 1: Create Button component**

Write `src/components/ui/button.tsx`:

```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
  readonly variant?: ButtonVariant;
  readonly href?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly type?: "button" | "submit";
  readonly disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-primary hover:bg-accent/90",
  secondary: "bg-secondary text-white hover:bg-secondary/90",
  outline: "border-2 border-accent text-accent hover:bg-accent/10",
};

export function Button({
  variant = "primary",
  href,
  children,
  className,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-200",
    variantStyles[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} disabled={disabled}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create Card component**

Write `src/components/ui/card.tsx` — a flexible card with optional hover scale animation, accepting `children`, `className`, and optional `href` for clickable cards.

- [ ] **Step 3: Create SectionHeading component**

Write `src/components/ui/section-heading.tsx` — accepts `title`, `subtitle` (optional), `align` (center/left), renders an `<h2>` with accent underline decoration.

- [ ] **Step 4: Create AnimateOnScroll wrapper**

Write `src/components/ui/animate-on-scroll.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimateOnScrollProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
}: AnimateOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add base UI components — Button, Card, SectionHeading, AnimateOnScroll"
```

---

## Task 4: Layout Components (Header + Footer)

**Files:**
- Create: `src/components/layout/header.tsx`
- Create: `src/components/layout/footer.tsx`
- Create: `src/components/layout/mobile-nav.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create Header component**

Write `src/components/layout/header.tsx` — sticky top header with:
- Logo/company name on left
- Navigation links: 產業解決方案, 合作方式, 成功案例, 關於我們
- CTA button: 聯絡我們
- Mobile: hamburger menu trigger
- Transparent on hero, solid on scroll (use `useEffect` + scroll listener)

- [ ] **Step 2: Create MobileNav component**

Write `src/components/layout/mobile-nav.tsx` — slide-in menu panel with all nav links, triggered by hamburger. Uses Framer Motion for slide animation. Closes on link click or outside click.

- [ ] **Step 3: Create Footer component**

Write `src/components/layout/footer.tsx` — dark background (`bg-primary`), 3-column layout:
- Column 1: Company name + short description
- Column 2: Quick links (all nav pages)
- Column 3: Contact info (email, phone, address from `siteConfig`)
- Bottom bar: copyright

- [ ] **Step 4: Update root layout**

Modify `src/app/layout.tsx`:
- Import Noto Sans TC from `next/font/google`
- Import `globals.css`
- Add `<Header />` and `<Footer />` wrapping `{children}`
- Add `<Analytics />` from `@vercel/analytics/react` before closing `</body>`
- Set metadata: title template, default description, OG tags from `siteConfig`

- [ ] **Step 5: Verify layout renders on dev server**

```bash
npm run dev
```

Visit http://localhost:3000. Expected: Header and footer visible, nav links present, mobile menu works.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx
git commit -m "feat: add Header, Footer, MobileNav layout components and root layout"
```

---

## Task 5: Homepage

**Files:**
- Create: `src/components/sections/hero.tsx`
- Create: `src/components/sections/industry-cards.tsx`
- Create: `src/components/sections/why-us.tsx`
- Create: `src/components/sections/featured-cases.tsx`
- Create: `src/components/sections/process-steps.tsx`
- Create: `src/components/sections/bottom-cta.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Hero section**

Write `src/components/sections/hero.tsx`:
- Full viewport height, dark background (`bg-primary`)
- Headline: "世界級分析技術，解決產業核心問題"
- Subtitle about unique resource advantage
- Two CTAs: "找到你的解決方案" (primary) + "立即諮詢" (outline)
- Subtle gradient/glow background effect with CSS

- [ ] **Step 2: Create IndustryCards section**

Write `src/components/sections/industry-cards.tsx`:
- 4 cards in a grid (2x2 desktop, 1 column mobile)
- Each card: Lucide icon + industry title + pain point sentence
- Links to `/solutions/[industry]`
- Hover scale effect
- Data sourced from `solutions` content

- [ ] **Step 3: Create WhyUs section**

Write `src/components/sections/why-us.tsx`:
- 4 differentiators in grid
- Each: icon + title + short description
- Alternating light background section

- [ ] **Step 4: Create FeaturedCases section**

Write `src/components/sections/featured-cases.tsx`:
- Filter cases where `featured === true` from content
- Display 2-3 case cards: industry tag + title + challenge + outcome
- "查看更多案例" link to `/cases`

- [ ] **Step 5: Create ProcessSteps section**

Write `src/components/sections/process-steps.tsx`:
- 4 steps horizontal (desktop) / vertical (mobile)
- Connected by line/arrows
- Each step: number + icon + title + short description
- Steps: 需求諮詢 → 方案規劃 → 執行分析 → 交付報告

- [ ] **Step 6: Create BottomCTA section**

Write `src/components/sections/bottom-cta.tsx`:
- Dark background section
- Text: "不確定需要什麼服務？讓我們幫你評估"
- CTA button to `/contact`

- [ ] **Step 7: Assemble homepage**

Modify `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/sections/hero";
import { IndustryCards } from "@/components/sections/industry-cards";
import { WhyUs } from "@/components/sections/why-us";
import { FeaturedCases } from "@/components/sections/featured-cases";
import { ProcessSteps } from "@/components/sections/process-steps";
import { BottomCTA } from "@/components/sections/bottom-cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <IndustryCards />
      <WhyUs />
      <FeaturedCases />
      <ProcessSteps />
      <BottomCTA />
    </main>
  );
}
```

- [ ] **Step 8: Visual check on dev server**

Visit http://localhost:3000. Expected: All 6 sections render in order, responsive on mobile, animations trigger on scroll.

- [ ] **Step 9: Commit**

```bash
git add src/components/sections/ src/app/page.tsx
git commit -m "feat: build homepage with all sections — Hero, IndustryCards, WhyUs, Cases, Process, CTA"
```

---

## Task 6: Solutions Pages (Industry)

**Files:**
- Create: `src/app/solutions/page.tsx`
- Create: `src/app/solutions/[industry]/page.tsx`

- [ ] **Step 1: Create solutions overview page**

Write `src/app/solutions/page.tsx`:
- Page heading: "產業解決方案"
- Subtitle: "選擇您的產業，了解我們如何協助您"
- 4 industry cards in grid, linking to detail pages
- SEO metadata

- [ ] **Step 2: Create dynamic industry page**

Write `src/app/solutions/[industry]/page.tsx`:
- `generateStaticParams()` returning all 4 industry slugs
- `generateMetadata()` with dynamic title/description per industry
- Template sections:
  1. Hero with industry title + subtitle
  2. "我們解決的問題" — problems list
  3. "我們如何幫助您" — capabilities grid
  4. Related case studies (filtered by industry)
  5. CTA to contact
- 404 if slug not found

- [ ] **Step 3: Visual check**

Visit http://localhost:3000/solutions and click into each industry page. Expected: All 4 industry pages render correctly with unique content.

- [ ] **Step 4: Commit**

```bash
git add src/app/solutions/
git commit -m "feat: add solutions overview and dynamic industry pages"
```

---

## Task 7: Services Pages

**Files:**
- Create: `src/app/services/page.tsx`
- Create: `src/app/services/[service]/page.tsx`

- [ ] **Step 1: Create services overview page**

Write `src/app/services/page.tsx`:
- Heading: "合作方式"
- Subtitle: "多元合作模式，量身打造您的需求"
- 4 service cards with icon, title, description, link to detail

- [ ] **Step 2: Create dynamic service detail page**

Write `src/app/services/[service]/page.tsx`:
- `generateStaticParams()` for all 4 service slugs
- `generateMetadata()` per service
- Service title, full description, detail list
- JSON-LD `Service` structured data per service page
- CTA to contact with pre-selected service interest

- [ ] **Step 3: Visual check**

Visit all service pages. Expected: All render with correct content.

- [ ] **Step 4: Commit**

```bash
git add src/app/services/
git commit -m "feat: add services overview and dynamic service detail pages"
```

---

## Task 8: Cases Page (Success Stories)

**Files:**
- Create: `src/app/cases/page.tsx`

- [ ] **Step 1: Create cases page**

Write `src/app/cases/page.tsx`:
- Client component (needs state for filter)
- Industry filter bar: 全部, 生技醫藥, 半導體材料, 食品農業, 精密製造
- Case cards grid (2-3 columns desktop, 1 mobile)
- Each card: industry tag + title + client + challenge + outcome
- Click to expand inline (toggle `expanded` state per card)
- Expanded view shows: full challenge, solution, outcome, techniques
- SEO metadata

- [ ] **Step 2: Visual check**

Visit http://localhost:3000/cases. Expected: Filter works, cards render, expand/collapse works.

- [ ] **Step 3: Commit**

```bash
git add src/app/cases/
git commit -m "feat: add success stories page with industry filter and expandable cards"
```

---

## Task 9: About Page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create about page**

Write `src/app/about/page.tsx`:
- Section 1: Company intro — siteConfig.companyIntro + vision, with a decorative background
- Section 2: Team — grid of team member cards (photo placeholder + name + title + bio)
- SEO metadata

- [ ] **Step 2: Visual check**

Visit http://localhost:3000/about. Expected: Both sections render with content from data files.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/
git commit -m "feat: add about page with company intro and team sections"
```

---

## Task 10: Contact Page + API Route

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create contact form page**

Write `src/app/contact/page.tsx`:
- Client component using React Hook Form
- Form fields per spec: name, company, industry (select), email, phone, service interest (select), description (textarea, max 1000 chars)
- Hidden honeypot field (named `website` to appear innocuous to bots)
- Inline validation errors
- JSON-LD `ContactPoint` structured data
- Submit handler: POST to `/api/contact`
- Success/error states with user-friendly messages
- Right side: contact info (email, phone, address)
- SEO metadata

- [ ] **Step 2: Create contact API route**

Write `src/app/api/contact/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Simple in-memory rate limiter (replaced by Redis/Upstash in production)
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  submissions.set(ip, timestamps);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface ContactFormData {
  name: string;
  company: string;
  industry: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  description: string;
  website?: string; // honeypot field (innocuous name)
}

export async function POST(request: NextRequest) {
  // Validate required env vars
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!apiKey || !contactEmail) {
    console.error("Missing required env vars: RESEND_API_KEY or CONTACT_EMAIL");
    return NextResponse.json(
      { error: "伺服器設定錯誤，請直接聯繫我們" },
      { status: 500 }
    );
  }

  // Rate limiting
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "提交次數過多，請稍後再試" },
      { status: 429 }
    );
  }

  try {
    const body: ContactFormData = await request.json();

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true }); // Silent reject
    }

    // Server-side validation
    if (!body.name || !body.company || !body.industry || !body.email || !body.description) {
      return NextResponse.json(
        { error: "請填寫所有必填欄位" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "請輸入有效的電子郵件地址" },
        { status: 400 }
      );
    }

    if (body.description.length > 1000) {
      return NextResponse.json(
        { error: "需求描述不得超過 1000 字" },
        { status: 400 }
      );
    }

    // HTML-escape all user input before building email
    const safe = {
      name: escapeHtml(body.name),
      company: escapeHtml(body.company),
      industry: escapeHtml(body.industry),
      email: escapeHtml(body.email),
      phone: escapeHtml(body.phone ?? "未提供"),
      serviceInterest: escapeHtml(body.serviceInterest ?? "未選擇"),
      description: escapeHtml(body.description),
    };

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "noreply@synchrotech.com",
      to: contactEmail,
      subject: `[網站諮詢] ${safe.company} - ${safe.name}`,
      html: `
        <h2>新的客戶諮詢</h2>
        <p><strong>姓名：</strong>${safe.name}</p>
        <p><strong>公司：</strong>${safe.company}</p>
        <p><strong>產業：</strong>${safe.industry}</p>
        <p><strong>Email：</strong>${safe.email}</p>
        <p><strong>電話：</strong>${safe.phone}</p>
        <p><strong>感興趣的服務：</strong>${safe.serviceInterest}</p>
        <p><strong>需求描述：</strong></p>
        <p>${safe.description}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "送出失敗，請稍後再試或直接聯繫我們" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Test form submission**

Visit http://localhost:3000/contact. Fill in form, submit. Expected: Without valid Resend key, should show error state gracefully. With key, should send email.

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/ src/app/api/
git commit -m "feat: add contact page with form validation, honeypot, and Resend API route"
```

---

## Task 11: 404 Page + SEO

**Files:**
- Create: `src/app/not-found.tsx`
- Modify: `src/app/layout.tsx` (metadata)
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create 404 page**

Write `src/app/not-found.tsx`:
- Centered layout with "404" large text
- Message: "找不到您要的頁面"
- Button to go back to homepage

- [ ] **Step 2: Create sitemap generator**

Write `src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { solutions } from "@/content/solutions";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://synchrotech.com";

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/solutions`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/cases`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  const solutionPages = solutions.map((s) => ({
    url: `${baseUrl}/solutions/${s.slug}`,
    lastModified: new Date(),
  }));

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...solutionPages, ...servicePages];
}
```

- [ ] **Step 3: Create robots.txt**

Write `src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://synchrotech.com/sitemap.xml",
  };
}
```

- [ ] **Step 4: Add JSON-LD structured data to root layout**

Add `Organization` JSON-LD script tag in `layout.tsx` `<head>` with company name, url, contact info from `siteConfig`.

- [ ] **Step 5: Verify sitemap and robots**

```bash
npm run build
```

Check that `sitemap.xml` and `robots.txt` are generated. Expected: Build succeeds with all pages statically generated.

- [ ] **Step 6: Commit**

```bash
git add src/app/not-found.tsx src/app/sitemap.ts src/app/robots.ts src/app/layout.tsx
git commit -m "feat: add 404 page, sitemap, robots.txt, and JSON-LD structured data"
```

---

## Task 12: Design Polish with Impeccable

**Files:**
- Modify: Multiple component files as needed

- [ ] **Step 1: Run Impeccable `/audit` on all pages**

Use the Impeccable `/audit` skill command to review each page for design issues: typography, spacing, color contrast, visual hierarchy.

- [ ] **Step 2: Run `/typeset` for typography refinement**

Apply Impeccable `/typeset` to ensure proper font sizes, line heights, and heading hierarchy across all pages.

- [ ] **Step 3: Run `/polish` for final visual refinement**

Apply Impeccable `/polish` to clean up any remaining visual issues: alignment, padding consistency, hover states, focus states.

- [ ] **Step 4: Mobile responsiveness check**

Verify all pages at 375px, 768px, 1024px, 1440px breakpoints.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "style: apply Impeccable design polish — typography, spacing, responsiveness"
```

---

## Task 13: Production Build & Deployment Prep

**Files:**
- Modify: `next.config.ts` (output settings)
- Verify: all pages build successfully

- [ ] **Step 1: Configure next.config.ts for production**

Ensure `next.config.ts` has proper image domains, headers, and any needed rewrites.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: All pages statically generated, no build errors.

- [ ] **Step 3: Run production server locally**

```bash
npm start
```

Visit all pages, verify everything works. Check browser console for errors.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "chore: production build configuration and verification"
```

- [ ] **Step 5: Ready for Vercel deployment**

Deploy to Vercel:
```bash
npx vercel
```

Or connect GitHub repo to Vercel dashboard for auto-deploy.
