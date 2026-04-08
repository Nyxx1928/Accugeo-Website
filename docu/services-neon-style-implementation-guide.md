# Services Page Reference-Style Implementation Guide

## Objective

Recreate the visual style of the provided reference services page (dark neo-noir, electric red glow, glass surfaces, alternating content rows) and apply it to this project's Services experience.

This guide is written for the current codebase and maps directly to the existing component structure.

This version also includes footer redesign guidance based on the second full-page screenshot.

## Target Files

- `components/Services.tsx` (main refactor target)
- `app/globals.css` (shared utility classes and keyframes)
- `public/` (service image assets if replacing current placeholders)

## Reference Style Breakdown (What to Copy)

### 1) Overall mood

- Deep navy/near-black background.
- Soft radial red glows on the left/right edges.
- High contrast white text with muted secondary copy.
- Minimal accent color usage (red for active states, not everywhere).

### 2) Composition

- Header block centered at top of section.
- Services shown as stacked feature rows.
- First row: text/accordion on left, collage image card on right.
- Second row alternates (image left, text right).
- Large spacing between rows to create editorial rhythm.

### 3) Surface treatment

- Subtle card borders: low-opacity red/white.
- Blurred translucent surfaces instead of flat boxes.
- Rounded corners with medium-large radius.
- Soft shadows and inner glow for depth.

### 4) Typography behavior

- Strong section title.
- Medium-weight service titles.
- Small uppercase utility labels.
- Body copy constrained to readable line lengths.

### 5) Interaction pattern

- Accordion sub-items under each service title.
- Small chevron icons for expand/collapse.
- Smooth but restrained transitions.

### 6) Full-page continuity from second screenshot

- A large pre-footer CTA strip appears before portfolio/testimonial/footer blocks.
- Footer sits on the same deep red-charcoal atmosphere, not a separate bright block.
- Footer contains a left brand cluster and right-side multi-column navigation.
- Large low-opacity brand wordmark appears behind footer content.
- A diagonal/radial red light streak appears near the bottom-right.

## Visual Token Set (Use These)

Use this exact palette and effect baseline so implementation stays close to the screenshot:

```css
:root {
  --services-bg-0: #090507;
  --services-bg-1: #14070c;
  --services-bg-2: #0a0406;
  --services-surface: rgba(52, 16, 26, 0.42);
  --services-border: rgba(200, 93, 114, 0.26);
  --services-text: #f5f7ff;
  --services-muted: #c7a3ae;
  --services-accent: #e56c81;
  --services-glow: rgba(196, 30, 58, 0.3);
  --footer-bg-0: #090507;
  --footer-bg-1: #13070b;
  --footer-border: rgba(200, 93, 114, 0.18);
  --footer-muted: #b88f9b;
  --footer-wordmark: rgba(227, 157, 171, 0.11);
}
```

## Layout Spec

### Section shell

- Vertical padding: `py-24 md:py-32`.
- Background: layered gradients with two radial glow elements.
- Max width container: `max-w-[1180px] mx-auto px-6 md:px-8`.

### Header area

- Eyebrow label (small uppercase tracking).
- Main heading (`text-4xl md:text-6xl`).
- Supporting text limited to about 56-64 characters per line.

### Service rows

- Gap between rows: `gap-y-20 md:gap-y-24`.
- Row grid: `md:grid md:grid-cols-2 md:gap-10 lg:gap-14`.
- Alternate row order using index parity.

### Text column

- Service title (`text-3xl md:text-4xl`).
- Summary paragraph with muted tone.
- Accordion list below summary.

### Image collage column

- One framed panel with 2x2 split using thin divider lines.
- Rounded outer border `rounded-2xl`.
- Inner image overlays for tonal consistency.

## Structural Refactor Plan for `components/Services.tsx`

### Step 1: Replace carousel framing with editorial stacked rows

- Keep your existing `services` array.
- Render rows with `services.map(...)` as static stacked sections.
- Remove arrow controls and numeric pagination for this style match.

Reason: the reference style is not carousel-first; it is row-first and reading-flow focused.

### Step 2: Introduce alternating row directions

- For even index rows: text left, image right.
- For odd index rows: image left, text right.
- On mobile, always stack text first then image.

### Step 3: Convert sub-services to accordion items

- Replace dense bullet list with collapsible items.
- Keep one expanded item by default per service.
- Add smooth height transition (`max-height` + opacity).

### Step 4: Rebuild image treatment

- Use `next/image` only.
- One primary image fills the panel.
- Overlay vertical/horizontal divider lines to simulate the collage split from the reference.
- Optional secondary thumbnails can be absolute-positioned for richer composition.

### Step 5: Add atmospheric background layers

- Two radial glow blobs:
  - Left: upper-left region.
  - Right: middle-right region.
- Keep opacity low to avoid cartoonish glow.

## Recommended Class Recipes

### Section wrapper

```tsx
<section
  id="services"
  className="relative overflow-hidden text-white py-24 md:py-32"
>
```

### Background layers

```tsx
<div className="absolute inset-0 bg-[linear-gradient(180deg,#090507_0%,#14070c_45%,#0a0406_100%)]" />
<div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#c41e3a]/25 blur-[120px]" />
<div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-[#7a1c2d]/20 blur-[140px]" />
```

### Glass service card

```tsx
className =
  "relative rounded-2xl border border-[#c85d72]/25 bg-[rgba(52,16,26,0.42)] backdrop-blur-md shadow-[0_18px_60px_rgba(18,6,10,0.45)]";
```

### Accordion trigger

```tsx
className =
  "w-full flex items-center justify-between py-3 text-left text-[0.98rem] md:text-base text-white/95 border-b border-white/10";
```

### Muted copy

```tsx
className = "text-[#9aa5d1] leading-relaxed text-sm md:text-[0.95rem]";
```

## Responsive Behavior Rules

- Mobile (`<768px`):
  - stack each service row vertically.
  - reduce heading size one step.
  - keep accordion tap targets at least 44px high.

- Tablet (`768-1023px`):
  - two columns with tighter gap.
  - reduce collage height slightly.

- Desktop (`>=1024px`):
  - preserve alternating rows.
  - keep strong negative space between sections.

## Accessibility Requirements

- All accordion triggers must be buttons.
- Use `aria-expanded` and `aria-controls` on each trigger.
- Keep focus-visible states high contrast on dark backgrounds.
- Keep alt text specific per image, not repeated service title only.

## Performance Requirements

- Keep `next/image` `sizes` values accurate.
- Preload only first row hero image if it is above the fold.
- Lazy-load all non-initial rows.

## Implementation Checklist

1. Refactor `components/Services.tsx` from carousel to stacked editorial layout.
2. Add per-service accordion open-state handling.
3. Add alternating left/right row composition by index.
4. Add background glow layers and glass surfaces.
5. Update image framing to collage-style panel.
6. Tune typography scale and spacing to match reference rhythm.
7. Validate responsive behavior at 375, 768, 1024, and 1440 widths.
8. Verify keyboard navigation and focus states for all accordion triggers.

## Done Criteria (Visual Parity)

- Section reads as dark blue neon, not flat black.
- Rows alternate left/right with clear visual rhythm.
- Accordion interactions feel smooth and legible.
- Image panels look framed, luminous, and premium.
- Final section feels stylistically close to the screenshot while using your project content.

## Optional: Keep Carousel Logic as Variant

If you want to preserve existing carousel behavior for future reuse:

- Keep current component as `ServicesCarousel.tsx`.
- Build the new reference-matched version as `ServicesEditorial.tsx`.
- Swap which one is rendered in `app/page.tsx`.

This avoids losing your tested interaction logic while enabling the new style direction.

## Footer Redesign Spec (From Second Screenshot)

### Target file

- `components/Footer.tsx`

### Footer visual direction

- Replace current solid red footer with a dark red-charcoal atmospheric shell.
- Keep content inside a constrained width container.
- Use 4 logical columns:
  - Brand column (logo, short description)
  - Navigation links
  - Services links
  - Follow us links
- Add oversized low-opacity background wordmark behind footer content.
- Add right-side red glow/light beam shape for visual continuity.
- Keep a compact legal row at the bottom.

### Footer structure blueprint

1. Outer wrapper:

- `relative overflow-hidden border-t border-white/10`
- `bg-[linear-gradient(180deg,#080a1f_0%,#0a0d24_100%)]`

2. Decorative layers:

- Background grid/line texture (very low opacity, optional).
- Bottom-right red radial glow.
- Large watermark text with low opacity.

3. Main content row:

- `grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]`
- Left column includes logo, brand name, 2-line description.
- Right columns are compact vertical link lists.

4. Bottom legal row:

- Left: copyright text.
- Right: terms, privacy, accessibility links.

### Footer class recipes

```tsx
<footer className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,#080a1f_0%,#0a0d24_100%)] text-white">
```

```tsx
<div className="absolute bottom-[-120px] right-[-60px] h-[320px] w-[320px] rounded-full bg-[#5b7dff]/25 blur-[90px]" />
```

```tsx
<p className="absolute bottom-6 left-0 text-[70px] md:text-[150px] font-semibold leading-none tracking-tight text-[rgba(157,169,227,0.11)] select-none pointer-events-none">
  Accugeo
</p>
```

### Footer content notes

- Keep link labels short and evenly spaced.
- Use muted text (`#b88f9b`) for descriptions and secondary links.
- Hover state should brighten text and add subtle underline.
- Ensure all links are keyboard focus visible on dark background.

### Footer done criteria

- Footer no longer uses bright red background.
- Layout and atmosphere visually align with the reference screenshot.
- Brand block + three link columns are clearly readable at desktop.
- Mobile stacks cleanly with preserved spacing and readable legal links.
