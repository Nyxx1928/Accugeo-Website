# Accugeo Repository Analysis

Date: 2026-04-07

## Scope Reviewed

- App structure, components, hooks, API route, tests, config, docs
- Commands run:
  - `npm run lint`
  - `npm run test -- --runInBand`
  - `npm run build`

## Quick Status

- Build: passes
- Type/lint baseline: mostly clean, with image optimization warnings
- Tests: all suites pass, but test run logs React `act(...)` warnings
- Overall: good foundation, but still not production-hardened in several areas

## What Is Missing or Lacking

### 1) Content Readiness Gaps

Missing:

- Final hero copy and messaging
- Real contact details

Evidence:

- `components/Hero.tsx:31` uses placeholder heading text (`Tagline Here Lorem Ipsum`)
- `components/Hero.tsx:34` contains lorem ipsum body text
- `components/Contact.tsx:83`, `components/Contact.tsx:174` still use `example@gmail.com`
- `components/Contact.tsx:95`, `components/Contact.tsx:96` still use sample phone numbers

Impact:

- Low trust for visitors and poor conversion readiness.

### 2) Performance and Image Optimization

Missing:

- Consistent use of `next/image` for local assets

Evidence:

- Lint/build warnings for raw `<img>` in:
  - `components/Contact.tsx:70`
  - `components/Navbar.tsx:88`
  - `components/Navbar.tsx:197`
  - `components/Services.tsx:307`
  - `components/Services.tsx:311`
  - `components/Services.tsx:315`

Impact:

- Higher bandwidth usage and slower LCP risk, especially mobile.

### 3) Accessibility and Navigation Semantics

Missing:

- Proper interactive semantics for desktop nav items

Evidence:

- Desktop nav uses `asChild` with `<span>` for clickable items in:
  - `components/Navbar.tsx:146`
  - `components/Navbar.tsx:150`
  - `components/Navbar.tsx:155`
  - `components/Navbar.tsx:164`
  - `components/Navbar.tsx:173`

Why this matters:

- Clickable `<span>` elements are not naturally keyboard accessible like `<button>`/`<a>`.
- This can reduce accessibility compliance and keyboard usability.

### 4) API Reliability and Anti-Abuse Hardening

Missing:

- Durable/distributed rate-limiting strategy
- Bot mitigation (captcha/honeypot)
- Separate sender identity strategy for SendGrid

Evidence:

- In-memory rate store (`Map`) in `app/api/contact/route.ts:12`
- Rate limit logic tied to local memory (`app/api/contact/route.ts:59`)
- Same mailbox used for `to` and `from` in `app/api/contact/route.ts:114` and `app/api/contact/route.ts:115`

Impact:

- Serverless/multi-instance deployments can bypass in-memory limits.
- Contact endpoint remains vulnerable to spam/abuse bursts.

### 5) Testing and CI Coverage Gaps

Missing:

- API route tests (`app/api/contact/route.ts`)
- Contact form integration tests (`components/Contact.tsx`)
- Navbar accessibility tests (`components/Navbar.tsx`)
- Hook test for `useInView`
- CI step for running unit tests

Evidence:

- Only 4 test files exist:
  - `components/Services.test.tsx`
  - `hooks/useParallax.test.ts`
  - `hooks/useReducedMotion.test.ts`
  - `hooks/useScrollTrigger.test.ts`
- CI currently runs typecheck/lint/build but not tests in `.github/workflows/ci.yml:25`, `.github/workflows/ci.yml:28`, `.github/workflows/ci.yml:31`
- Skipped test in `hooks/useParallax.test.ts:176`
- Test run logs React `act(...)` warnings from `components/Services.tsx`

Impact:

- Regressions in form handling, API behavior, and accessibility can ship unnoticed.

### 6) Documentation and Developer Experience

Missing:

- Up-to-date README details
- Public env template (`.env.example`)
- Script alias for typecheck

Evidence:

- README lists `logo.png` and `hero-bg.png` in structure while actual asset naming differs (`README.md:52`, `README.md:53`)
- No `.env.example` found
- `package.json` has no `typecheck` script (scripts section at `package.json:5`)

Impact:

- Slower onboarding and avoidable setup mistakes.

### 7) Rendering Strategy and Bundle Efficiency

Lacking:

- Cleaner server/client boundary for homepage composition

Evidence:

- Entire homepage file is client-rendered (`app/page.tsx:1`)

Impact:

- Marketing pages can carry unnecessary client-side JS if top-level page is fully client-only.

## Recommendations

## Priority 1 (Do First)

1. Replace all placeholder copy/contact data with approved production content.
2. Convert key `<img>` usage to `next/image` with explicit `width`, `height`, and `sizes`.
3. Refactor desktop navbar links to semantic `<button>` or `<a>` elements.
4. Add CI test step: `npm run test -- --runInBand`.
5. Add `.env.example` documenting required variables:
   - `SENDGRID_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `RATE_LIMIT_WINDOW_MS`
   - `RATE_LIMIT_MAX`
   - `RATE_STORE_MAX_SIZE`

## Priority 2 (Near-Term)

1. Add tests for:
   - contact API success/failure/rate-limit paths
   - contact form submission and status rendering
   - navbar keyboard behavior and semantics
   - `useInView` behavior and fallback logic
2. Remove or fix skipped tests and eliminate `act(...)` warnings.
3. Add a `typecheck` script (`"typecheck": "tsc --noEmit"`) and use it in local workflow docs.
4. Update README to match current file naming and architecture.

## Priority 3 (Hardening)

1. Move rate limiting to a shared/durable store (Redis/Upstash or edge-compatible limiter).
2. Add anti-spam controls (honeypot + captcha).
3. Use verified sender strategy for SendGrid (`from` should be a verified domain sender).
4. Reassess homepage client boundary to reduce JS where feasible.

## Final Assessment

The project is in a good intermediate state: visually developed, typed, tested in selected areas, and buildable. The major gaps are production readiness items (content completion, accessibility semantics, image optimization, API hardening, and broader automated testing/CI gates).
