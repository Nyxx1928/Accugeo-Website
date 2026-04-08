# Contact Page Reference-Style Implementation Guide

## Objective

Recreate the visual style of the provided contact page reference (dark geometric background, red atmospheric glow, oversized editorial headline, minimal underlined form fields) and apply it to this project Contact section.

This guide is aligned with your existing codebase so you can keep your current form logic and API integration while replacing layout and styling.

## Target Files

- `components/Contact.tsx` (main refactor target)
- `app/globals.css` (shared visual tokens and utility styles)
- `public/` (optional background texture or geometric image if needed)
- `components/Contact.integration.test.tsx` (update assertions only if headings/button labels change)

## Current vs Reference (Gap Analysis)

### Current Contact section

- Two-column card layout with map/location block on the left and boxed form on the right.
- Uses filled input backgrounds and rounded form fields.
- Uses standard section heading and utility card framing.

### Reference design

- One premium panel centered on page with cinematic atmosphere.
- Left side is image-heavy and editorial, right side is red-tinted narrative + form.
- Very large typographic hero line with a red emphasized keyword.
- Inputs are minimalist with bottom borders only (not full boxes).
- Form feels integrated into design, not detached in a separate card.

## Visual DNA to Copy

### 1) Page atmosphere

- Outer page background: dark gray/black with subtle depth and blur.
- Main panel background: black base with left-side geometric texture and right-side red radial gradient.
- Contrast style: strong white text, restrained red highlights, low-opacity divider lines.

### 2) Composition

- Main panel width around `min(1120px, 92vw)` and large vertical presence.
- Top row contains:
  - Small brand word (top-left)
  - Small pill button + menu icon (top-right)
- Content row split into two columns:
  - Left: oversized headline + compact contact details near bottom-left.
  - Right: supporting paragraph + clean form.

### 3) Typography

- Headline should be large and editorial (approx `clamp(2.2rem, 5.6vw, 5rem)`).
- Highlight one keyword in red.
- Paragraphs use lighter weight and wider leading.
- Field labels are subtle and small.

### 4) Form styling

- Field style: transparent background + `border-bottom` only.
- No heavy rounded boxes for input fields.
- Generous vertical spacing between groups.
- Submit button: outlined/ghost with soft border and subtle hover glow.

### 5) Mobile behavior

- Collapse to one column.
- Keep headline prominent but reduced to fit (`clamp(2rem, 10vw, 3.2rem)`).
- Keep field heights/tap areas at least 44px.
- Keep contact details below form on mobile to preserve hierarchy.

## Design Tokens (Recommended)

Add these variables inside `:root` in `app/globals.css`:

```css
:root {
  --contact-bg-0: #060709;
  --contact-bg-1: #0d0d10;
  --contact-panel: #08090c;
  --contact-panel-border: rgba(255, 255, 255, 0.14);
  --contact-text: #f4f5f7;
  --contact-muted: #b5b8c1;
  --contact-accent: #d31f2f;
  --contact-accent-deep: #891018;
  --contact-line: rgba(255, 255, 255, 0.35);
  --contact-line-active: rgba(255, 255, 255, 0.85);
}
```

## Section Shell Spec

Use a wrapper that creates depth around the panel:

```tsx
<section id="contact" className="relative overflow-hidden bg-[#0a0b0d] py-16 md:py-24 text-white">
```

Add atmosphere layers behind panel:

```tsx
<div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_85%_78%,rgba(211,31,47,0.22),transparent_44%),linear-gradient(180deg,#111214_0%,#090a0c_100%)]" />
```

## Contact Panel Spec

Panel container:

- `relative mx-auto w-full max-w-[1120px]`
- `min-h-[680px]`
- `border border-white/15`
- `bg-[#08090c]`
- `overflow-hidden`

Inside panel, use two absolute visual layers:

1. Left texture layer (geometric image look)
2. Right red gradient layer

Example layer classes:

```tsx
<div className="absolute inset-y-0 left-0 w-[58%] bg-[url('/contact-geo-texture.jpg')] bg-cover bg-center opacity-55" />
<div className="absolute inset-y-0 right-0 w-[52%] bg-[radial-gradient(circle_at_30%_20%,rgba(211,31,47,0.72),rgba(70,7,12,0.92)_48%,rgba(8,9,12,0.98)_100%)]" />
<div className="absolute inset-0 bg-black/36" />
```

If you do not want a new image asset, replace the left layer with gradient + subtle noise pattern.

## Layout Blueprint for components/Contact.tsx

Use this structure while preserving your existing state and submit logic:

```tsx
<section id="contact" className="...">
  <div className="...panel...">
    {/* top utility row */}
    <div className="...">
      <span>Accugeo</span>
      <div>
        <button>Make an enquiry</button>
        <button aria-label="Open menu">...</button>
      </div>
    </div>

    {/* main content grid */}
    <div className="grid lg:grid-cols-[1.05fr_0.95fr] ...">
      <div>
        <h2>
          Let's build <span>greatest</span> projects together.
        </h2>
        <div>contact details block</div>
      </div>

      <div>
        <p>supporting paragraph...</p>
        <form onSubmit={handleSubmit}>...</form>
      </div>
    </div>
  </div>
</section>
```

## Form Field Recipes (Minimal Underline Style)

For each input:

```tsx
<input className="w-full bg-transparent border-0 border-b border-white/35 pb-2 text-white placeholder:text-white/40 focus:border-white/85 focus:outline-none" />
```

For textarea:

```tsx
<textarea
  rows={4}
  className="w-full resize-none bg-transparent border-0 border-b border-white/35 pb-2 text-white placeholder:text-white/40 focus:border-white/85 focus:outline-none"
/>
```

Submit button style:

```tsx
<button className="rounded-full border border-white/55 px-5 py-2 text-sm text-white transition hover:border-white hover:bg-white/10">
  Send Inquiry
</button>
```

## Copy and Content Mapping

Map your existing content to the reference style:

- Keep existing contact channels from current component:
  - Email: `accugeo@gmail.com`
  - Phones: `09178971006`, `(02)8725-9882`
  - Address: `175 Kamias Road Extn., Sikatuna Village, Quezon City`
- Replace the top heading text with an Accugeo-specific message if desired.
- Keep form fields minimal: `Name`, `Email`, `Project Information`.

Note: You can keep `phone` state in logic but hide the phone field in UI if strict visual parity is required.

## Accessibility Requirements

- Keep visible label text for all fields (or use `aria-label` if visual label style is minimal).
- Ensure red text meets contrast ratio against dark background.
- Preserve keyboard focus outlines (`:focus-visible`) for all inputs and buttons.
- Status messages should remain `role="status"` / `role="alert"` as currently implemented.

## Performance and UX

- If adding a large texture image, use optimized size and WebP.
- Keep atmosphere effects mostly CSS gradients to avoid heavy assets.
- Add reduced-motion fallback for any opacity/translate intro animation.

## Test Impact

Current integration test checks:

- heading text includes `Get in touch`
- button label includes `Send Message`

If you change these labels to match the reference style, update `components/Contact.integration.test.tsx` accordingly.

## Implementation Order

1. Keep submit logic and state handling unchanged in `components/Contact.tsx`.
2. Replace section markup with panel-based structure.
3. Apply gradient/image layers and two-column layout.
4. Restyle fields from boxed inputs to underlined inputs.
5. Update CTA/button styling to ghost outline.
6. Verify mobile stacking behavior at 375px and 430px widths.
7. Update tests if visible copy changed.

## Done Criteria (Visual Match)

- Contact area feels like one cinematic panel, not two separate cards.
- Headline is large, editorial, and includes red emphasis.
- Form lines are underlined only with transparent backgrounds.
- Red glow is atmospheric and controlled, not oversaturated.
- Mobile layout keeps readability and interaction comfort.

## Optional Enhancement

If you want exact texture fidelity from the reference screenshot, add one dark geometric background image in `public/` and blend with the right-side red radial gradient. This achieves the closest look with minimal code complexity.
