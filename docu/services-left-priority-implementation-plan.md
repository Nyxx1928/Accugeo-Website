# Services Left-Priority Alignment Plan

## Goal

Adjust the Services section so it clearly reads as left-priority in the site flow:

1. Hero: left-weighted
2. About: right-weighted
3. Core Values: centered
4. Services: left-weighted (this change)

This keeps a deliberate directional rhythm: left -> right -> center -> left.

## Current State Analysis

From `components/Services.tsx`, the section currently has modern visual treatment, but several elements remain center-weighted:

1. Section header is centered (`text-center`).
2. Slide navigation pills are centered.
3. Progress text is centered.
4. The card uses a balanced two-column layout, but outer framing still feels centered as a block.

Result: Services does not strongly continue the directional narrative established by Hero/About/Core Values.

## Directional Design Intent for Services

Make Services feel anchored from the left edge of the content container while still keeping desktop readability:

1. Left side is the visual anchor (media + section intro + controls).
2. Right side is supporting content (details and long-form text).
3. Center alignment is minimized in this section.

## Implementation Scope

Update alignment and layout emphasis only. No service content rewrite and no behavior changes to carousel logic.

## Proposed Changes (By Area)

### 1) Section Header Alignment

Target: `components/Services.tsx`

Change:

1. Replace centered header alignment with left alignment.
2. Keep typography scale and spacing close to current values.

Planned class adjustments:

1. Header wrapper from `text-center` to `text-left`.
2. Constrain header width to avoid full-row stretch (for example `max-w-3xl`).

Why:
This immediately signals left-priority before users interact with the carousel.

### 2) Carousel Frame Positioning

Target: `components/Services.tsx`

Change:

1. Keep region full width for responsiveness.
2. Shift perceived weight left by changing grid ratio and inner spacing.

Planned class adjustments:

1. Grid ratio from `md:grid-cols-[1.1fr_0.9fr]` to a stronger left ratio such as `md:grid-cols-[1.25fr_0.75fr]`.
2. Reduce symmetric horizontal padding around the slide wrapper so left content starts earlier.
3. Keep arrow controls accessible, but visually secondary.

Why:
The media side becomes the dominant visual column, matching the directional intent.

### 3) Text Block Visual Priority

Target: `components/Services.tsx`

Change:

1. Keep text on the right column, but lower visual dominance slightly.
2. Preserve readability and line length.

Planned adjustments:

1. Slightly reduce heading size at desktop if needed.
2. Maintain good contrast and spacing while reducing right-column visual pull.

Why:
Supports left-first scanning while keeping information complete.

### 4) Controls and Progress Alignment

Target: `components/Services.tsx`

Change:

1. Move service index pills from center to left.
2. Move progress text from center to left.

Planned class adjustments:

1. Pills wrapper from `justify-center` to `justify-start`.
2. Progress text from `text-center` to `text-left`.

Why:
Post-interaction elements should reinforce left-priority, not re-center the section.

### 5) Mobile Behavior

Target: `components/Services.tsx`

Change:

1. Keep mobile stack order as media then text.
2. Maintain left alignment for titles, summaries, and controls.
3. Ensure arrow buttons do not overlap critical content.

Why:
Directional intent should survive responsive breakpoints.

## Accessibility and Behavior Safeguards

Do not change:

1. Keyboard navigation (`ArrowLeft` and `ArrowRight`).
2. Live region announcements.
3. Transition lock behavior (`isTransitioningRef` and duration control).
4. Existing ARIA labels and roles unless improving clarity.

## Validation Checklist

### Visual QA

1. Services header starts from left edge of content frame.
2. First visual anchor on desktop is the media column.
3. Pills and progress are left-aligned.
4. Section no longer reads as center-weighted.

### Responsive QA

1. Test at 320px, 375px, 768px, 1024px, and 1440px.
2. Confirm no clipping/overlap for arrows and cards.
3. Confirm text remains readable with no cramped right column.

### Accessibility QA

1. Keyboard-only navigation still works end-to-end.
2. Screen reader announcement still updates on slide change.
3. Focus visibility remains clear on arrows and pills.

## Suggested Execution Order

1. Header and section-level alignment changes.
2. Grid ratio and slide shell spacing updates.
3. Controls/progress left alignment.
4. Responsive pass.
5. Accessibility pass.
6. Regression check in existing Services tests.

## Definition of Done

This task is complete when:

1. Services visually reads as left-priority on desktop and mobile.
2. Directional story is consistent across sections (left, right, center, left).
3. No regression in carousel interaction or accessibility behavior.
