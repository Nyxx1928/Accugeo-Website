# Accugeo — UI / UX Implementation Plan

## Overview
This file turns the UI/UX recommendations from `UI_UX_Review.md` into a concrete, prioritized implementation checklist with code hints and file targets.

**Quick link to review file:** [UI_UX_Review.md](UI_UX_Review.md)

---

## Top Priorities (apply first)
- Add a primary CTA in the hero and wire it to the Contact section or a lead form.
- Reduce `min-h-screen` usage outside the hero; make hero mobile-friendly (`min-h-[60vh]`).
- Lazy-load and convert heavy images to WebP/AVIF; add width/height or `aspect-ratio` to images.

---

## File targets (start here)
- `components/Hero.tsx` — add primary CTA and mobile adjustments.
- `components/Navbar.tsx` — add shrink-on-scroll behavior and improve mobile drawer focus.
- `components/Services.tsx` — convert to card layout or accessible carousel.
- `components/Contact.tsx` — add accessible contact form with validation.
- `components/Squares.tsx` — ensure `prefers-reduced-motion` and provide low-cost fallback.
- `app/globals.css` and `tailwind.config.ts` — spacing, font preload, and design tokens.

---

## Implementation snippets & guidance

**1) Hero — Primary CTA**
- Add a prominent primary button near the headline. Example (insert into `components/Hero.tsx`):

```jsx
// inside Hero markup
<div className="mt-8 flex gap-4">
  <a href="#contact" className="inline-block rounded-md bg-brand-red text-white px-6 py-3 text-lg font-semibold shadow hover:translate-y-[-3px] transition-transform">
    Request a Quote
  </a>
  <a href="#services" className="inline-block rounded-md border border-white/20 px-5 py-3 text-sm">
    View Services
  </a>
</div>
```

- Replace hero height class: change `h-screen` → `min-h-[60vh] md:h-screen` so mobile shows CTA without scrolling.

**2) Navbar — shrink-on-scroll**
- Add a small scroll effect that toggles a `compact` class. Example hook (to include in `components/Navbar.tsx`):

```tsx
useEffect(() => {
  const onScroll = () => {
    document.documentElement.classList.toggle('nav-compact', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

- In CSS (globals or tailwind utilities) provide `.nav-compact` styles to reduce height, logo size, and padding.

**3) Services — accessible cards**
- Transform image-heavy grid into cards containing: image (aria-hidden or alt), title (H3), 1-line benefit, CTA.
- Example card structure for `components/Services.tsx`:

```jsx
<article className="service-card"> 
  <img src="..." alt="Survey drone over farmland" width="640" height="480" loading="lazy" />
  <h3 className="text-xl font-semibold">Topographic Surveys</h3>
  <p className="text-sm text-neutral-300">Deliver actionable elevation models for planning.</p>
  <a className="mt-3 inline-block btn-primary" href="#contact">Get a Quote</a>
</article>
```

**4) Contact — accessible form skeleton**
- Add `aria-live` for error messages, labels, required indicators, and client-side validation.

```tsx
<form aria-labelledby="contact-heading" onSubmit={handleSubmit}>
  <h2 id="contact-heading">Contact Us</h2>
  <label htmlFor="name">Name</label>
  <input id="name" name="name" required />
  <label htmlFor="email">Email</label>
  <input id="email" name="email" type="email" required />
  <label htmlFor="message">Message</label>
  <textarea id="message" name="message" required />
  <div aria-live="polite" id="form-status"></div>
  <button type="submit">Send Message</button>
</form>
```

**5) Images & performance**
- Convert heavy assets to WebP/AVIF and keep responsive `srcset`.
- Add `loading="lazy"` for non-hero images and ensure `width`/`height` or `style={{ aspectRatio: '16/9' }}` to avoid CLS.
- Example CLI using `sharp` (Node) or `cwebp` to convert source images:

```
# with sharp in Node script
sharp('src.jpg').resize(1200).toFile('src.webp')

# or using cwebp
cwebp input.jpg -q 80 -o output.webp
```

**6) Canvas fallback**
- In `components/Squares.tsx`, if `prefers-reduced-motion` or low-device-memory, render a static SVG or CSS background instead of animating canvas.

**7) Accessibility checklist**
- Ensure heading hierarchy: `Hero` H1, sections H2.
- Verify color contrast for `brand-red` on dark background (AA at minimum).
- Ensure all interactive elements have visible focus states and 44–48px tap targets on mobile.
- Confirm focus trap and focus return behavior for the mobile drawer.

**8) Performance checklist**
- Preload primary font with `<link rel="preload" href="/fonts/primary.woff2" as="font" type="font/woff2" crossorigin>` in `app/layout.tsx`.
- Serve optimized images (WebP/AVIF), lazy-load below-the-fold images.
- Remove unnecessary `min-h-screen` to avoid heavy initial paint.

---

## Quick Wins (complete in one short PR)
- Add CTA to `components/Hero.tsx` (see snippet above).
- Replace `h-screen` on hero for small screens (`min-h-[60vh] md:h-screen`).
- Add `loading="lazy"` and explicit sizes to all `<img>` tags in `components/Services.tsx` and `components/Footer.tsx`.

---

## Testing & verification
- Run the site locally: `npm run dev` (check `package.json`).
- Manually verify: hero CTA visible on mobile, navbar shrinks on scroll, services show cards with CTAs.
- Run Lighthouse (Performance / Accessibility) and iterate on failing items.

---

## Next steps (pick one)
- I can implement the `Hero` CTA + mobile hero adjustment in a PR now.
- Or I can implement the navbar shrink-on-scroll and mobile drawer fixes next.

Tell me which to start and I'll implement it and open the next TODO item as `in-progress`.
