# Mobile UI Fix Guide: Navbar and Status Badges

## Scope

This guide fixes the mobile-view UX issues visible in the current hero screenshots, focused on:

- Navbar behavior and visual layering on mobile
- Hero status badges readability, density, and above-the-fold visibility

## Screenshot-Based Findings

### Navbar (Mobile Drawer Open State)

1. Menu links visually overlap hero headline area, which weakens readability and hierarchy.
2. Drawer surface separation is weak; page content still competes with navigation.
3. Header row feels crowded (dual logos plus long brand line plus close icon).
4. Open drawer state does not feel structurally distinct from page content.

### Status Badges in Hero

1. Badge stack is too tall in portrait mobile, so the third badge is cut off.
2. Vertical spacing is excessive for first viewport UX.
3. Label contrast and scale are acceptable but can be improved for quick scanning.
4. Current one-column badge layout is inefficient for small screens.

## Mobile Navbar Fix Plan

### Design Goals

- Navigation must dominate when opened.
- Navigation labels should be easy to tap and scan.
- Brand identity should stay present but compact.
- Open and close behavior should feel intentional and stable.

### Required Changes in components/Navbar.tsx

1. Make drawer a fully separated mobile layer:

- Keep a strong backdrop: black at 65 to 75 percent opacity.
- Keep drawer panel opaque and visually elevated.
- Ensure no underlying content competes with menu links.

2. Reduce header clutter inside drawer:

- Use one logo only in drawer header.
- Limit brand text to one short line on mobile.
- Move full company name out of drawer header (optional subtitle area only if space allows).

3. Improve nav item structure:

- Use 48px minimum row height for each menu action.
- Add clear active state chip or left border indicator for current section.
- Increase vertical spacing between nav groups.

4. Tighten icon controls:

- Keep hamburger and close controls at 44x44 minimum touch area.
- Use consistent icon size (24 to 28px).

5. Stabilize mobile header behavior:

- Keep fixed header height at 64px.
- Avoid dynamic size jumps while scrolling.

6. Accessibility and focus:

- Keep focus trap and Escape close behavior.
- Keep aria-current on active section button.
- Keep body scroll lock while drawer is open.

## Status Badge Fix Plan

### Design Goals

- Show all key trust stats without forcing deep scroll.
- Improve at-a-glance comprehension.
- Preserve emphasis while reducing vertical bulk.

### Required Changes in components/TrustIndicators.tsx

1. Replace one-column stack on narrow phones:

- Use a 3-column compact grid on widths 360px and up.
- Use a 2-column compact fallback only for very narrow widths.

2. Reduce vertical footprint:

- Lower min-height per badge container on mobile.
- Decrease icon to 22 to 24px on mobile.
- Use tighter spacing between icon, value, and label.

3. Improve typography rhythm:

- Value: 28 to 32px equivalent, semantically dominant.
- Label: 13 to 14px equivalent with higher contrast.
- Keep line-height compact to avoid card bloat.

4. Add subtle card surfaces:

- Give each badge a soft dark surface with border and slight blur.
- This improves readability over the busy hero image.

### Required Changes in components/Hero.tsx

1. Reposition badges higher in the first viewport:

- Reduce gap after CTA group on mobile.
- Place badge grid in a compact row block directly beneath CTAs.

2. Tune hero container height for mobile browser chrome behavior:

- Prefer min-height using small viewport units where needed.
- Avoid clipping near bottom on short displays.

3. Reduce text block pressure:

- Slightly reduce paragraph line length and bottom margin on mobile.
- Prevent hero copy from pushing badges out of first-view context.

## Suggested Tailwind Direction

### Navbar mobile panel

- Backdrop: bg-black/70
- Panel width: max-w-[320px] for compact phones, max-w-[340px] otherwise
- Panel elevation: stronger shadow for separation

### Badge layout

- Grid: grid-cols-2 at smallest widths, then grid-cols-3 by 360px+
- Badge card: rounded-xl, border-white/15, bg-black/35
- Mobile spacing: gap-3 between cards, compact internal padding

## Acceptance Criteria

1. Opening the mobile drawer no longer visually competes with hero text.
2. Navbar menu items are easy to scan and tap with one thumb.
3. All trust badges are visible in a compact form near first viewport on common mobile sizes.
4. No horizontal overflow at 320px width.
5. Focus trap, Escape close, and active section indication remain functional.

## Device Validation Matrix

- 320x640 (small Android)
- 360x800 (common Android)
- 375x667 (iPhone SE class)
- 390x844 (modern iPhone)
- 412x915 (large Android)

## Implementation Order

1. Navbar layering and drawer structure in components/Navbar.tsx
2. Badge compact grid in components/TrustIndicators.tsx
3. Hero spacing and viewport behavior tuning in components/Hero.tsx
4. Real-device pass and accessibility verification

## Quick Regression Checklist

- Mobile menu opens and closes without scroll bleed.
- Active section highlight works in drawer and desktop nav.
- CTA buttons and badges remain visible and balanced in first viewport.
- Reduced-motion users still get instant or minimal animation behavior.
