# Accugeo Website Performance Optimization Guide

## Baseline from current repo

- Framework: Next.js 14 (App Router)
- Current production build output (`npm run build`):
  - `/` route JS: `38.9 kB`
  - First Load JS: `126 kB`
  - Shared JS: `87.3 kB`
- Static assets in `public/`:
  - `38` files
  - total size about `7 MB`
  - `26` files are larger than `100 KB`
- Largest image: `public/Hero-bg.png` at about `1.75 MB`

## Highest-impact opportunities (priority order)

### 1) Stop rendering the entire home page as a Client Component

**Where:** `app/page.tsx:1`

`app/page.tsx` is marked with `"use client"`, which forces the whole page tree into client rendering + hydration. This is the biggest render-path cost right now.

**What to do:**

- Remove `"use client"` from `app/page.tsx`.
- Keep only truly interactive sections as Client Components (`Navbar`, `Contact`, maybe parts of `Services` / `About`).
- Convert static/presentational sections to Server Components where possible.

**Expected impact:** faster initial render, less hydration work, better TTI/INP on mobile.

---

### 2) Replace hero CSS background image with optimized `next/image`

**Where:** `components/Hero.tsx:23`

Hero currently uses inline CSS background image (`url(/Hero-bg.png)`) so it bypasses Next.js image optimization controls.

**What to do:**

- Replace background-image style with `<Image fill priority ... />`.
- Convert `Hero-bg.png` to modern format (`.webp` or `.avif`) and create a mobile variant.
- Keep `priority` only for the real LCP image.

**Expected impact:** major LCP improvement.

---

### 3) Reduce eager image loading (`priority`) below the fold

**Where:**

- `components/About.tsx:37`
- `components/Services.tsx:266`
- `components/Navbar.tsx:122`

Multiple images are marked `priority`. Overusing `priority` competes for early network bandwidth.

**What to do:**

- Keep `priority` only on logo + true LCP asset.
- Remove priority from below-the-fold content.
- Ensure accurate `sizes` attributes for all responsive images.

**Expected impact:** better critical resource scheduling and faster top-of-page render.

---

### 4) Compress and normalize `public/` image assets

**Where:** `public/*`

Current image payload is heavy for first visit and mobile users.

**What to do:**

- Batch convert large JPG/PNG assets to WebP/AVIF.
- Target approximate budgets:
  - hero image <= 250 KB (mobile), <= 450 KB (desktop)
  - inline card/gallery images <= 120 KB each
- Keep original masters outside runtime `public/` directory.

**Expected impact:** faster first load and lower data usage.

---

### 5) Avoid render-blocking external font CSS in `<head>`

**Where:** `app/layout.tsx:18`

`<link href="https://fonts.cdnfonts.com/css/sansation" ...>` is render-blocking and adds third-party latency.

**What to do:**

- Prefer local/self-hosted font or `next/font`.
- If keeping external font, add preconnect and ensure fallback metrics are tuned.

**Expected impact:** faster first paint, fewer layout shifts.

---

### 6) Limit continuous canvas animation work

**Where:** `components/Squares.tsx:182`, `components/Squares.tsx:197`

`Squares` runs a continuous `requestAnimationFrame` loop. Even subtle background animation can hurt CPU/GPU on mid-range devices.

**What to do:**

- Pause animation when section is off-screen (IntersectionObserver).
- Reduce frame rate or square density on mobile.
- Keep reduced-motion fallback (already present) and extend to low-power mode.

**Expected impact:** smoother scrolling and better battery life.

---

### 7) Cut globally expensive hover styles

**Where:** `app/globals.css:245`

Global selectors:

- `button:hover`
- `a:hover`

apply `filter: brightness(1.1)` + underline to all buttons/links, increasing paint work and creating unintended style work across the page.

**What to do:**

- Remove global hover rules.
- Apply hover styles only to specific utility classes/components.

**Expected impact:** lower style recalculation/paint overhead and cleaner visual control.

---

### 8) Lazy-load below-the-fold interactive sections

**Where:** `app/page.tsx`

The initial route imports all sections up front.

**What to do:**

- Dynamically import non-critical sections (`About`, `Services`, `Contact`, `Footer`) with `next/dynamic`.
- Optionally render lightweight skeleton/placeholders.

**Expected impact:** reduced main-thread work and earlier first content display.

---

### 9) Remove unused dependency weight

**Where:** `package.json`

Likely-unused packages increase install/build overhead and can accidentally leak into bundles.

**Candidates to verify:**

- `framer-motion`
- `embla-carousel-react`
- `shadcn` CLI package (if not needed at runtime)

**What to do:**

- Confirm usage, then remove unused deps.
- Rebuild and compare route bundle sizes.

**Expected impact:** cleaner dependency graph and potentially smaller JS output.

## Suggested implementation sequence

1. Remove client boundary from `app/page.tsx` and keep interactivity isolated.
2. Optimize hero image delivery (`next/image` + compressed assets).
3. Remove non-critical `priority` usage and lazy-load below-the-fold sections.
4. Gate/pause `Squares` animation when not visible.
5. Migrate font loading away from render-blocking external CSS.
6. Trim global hover CSS and clean unused dependencies.

## Verification checklist after each change

- Run `npm run build` and compare `First Load JS`.
- Run Lighthouse (mobile) and track:
  - LCP
  - INP
  - CLS
  - Total Blocking Time
- Test on low-end/mobile throttling (Slow 4G + 4x CPU).
- Confirm no visual regressions for hero, navbar, and services sections.

## Optional next step (if you want)

Add lightweight real-user monitoring with `reportWebVitals`/analytics so future UI changes are measured against real LCP/INP, not just lab scores.
