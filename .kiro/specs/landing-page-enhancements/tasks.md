# Implementation Plan: Landing Page Enhancements

## Overview

This implementation plan covers enhancements to the Accugeo landing page including a performance-first animation system, new content sections (WhyChooseUs, Testimonials, BackToTop), enhanced existing sections (Hero, About, Services, Contact), and improved form validation. The implementation uses TypeScript, React, Next.js 14, and Tailwind CSS with minimal bundle size impact (<10KB gzipped).

## Tasks

- [x] 1. Set up animation system foundation
  - [x] 1.1 Create CSS keyframes and animation utility classes
    - Add keyframe definitions to `app/globals.css`: fadeInUp, fadeIn, float, breathe, slideInRight, slideInLeft, scaleIn
    - Create animation utility classes with proper timing and easing
    - Add animation delay classes (200ms, 400ms, 600ms)
    - Add reduced motion media query overrides
    - Add hover effect classes (btn-glow, link-underline, card-hover)
    - _Requirements: 4.1-4.5, 6.1-6.5, 8.1-8.4, 22.1-22.4, 23.1-23.5_
  
  - [ ]* 1.2 Write property test for animation CSS properties
    - **Property 35: Animation GPU Acceleration**
    - **Property 36: Animation Duration Bounds**
    - **Property 37: Animation Easing Functions**
    - **Validates: Requirements 22.1, 22.2, 22.3, 22.4**
  
  - [x] 1.3 Create useReducedMotion hook
    - Implement hook in `hooks/useReducedMotion.ts`
    - Detect prefers-reduced-motion media query
    - Update on preference change
    - Return boolean indicating reduced motion preference
    - _Requirements: 23.5_
  
  - [ ]* 1.4 Write property test for useReducedMotion hook
    - **Property 5: Reduced Motion Disables All Animations**
    - **Validates: Requirements 4.5, 5.4, 6.5, 7.5, 13.4, 23.1-23.4**
  
  - [x] 1.5 Enhance useInView hook
    - Update existing `hooks/useInView.ts` with configurable options
    - Add threshold, rootMargin, and triggerOnce options
    - Integrate useReducedMotion for accessibility
    - Add fallback for browsers without Intersection Observer
    - _Requirements: 7.1-7.5_
  
  - [ ]* 1.6 Write property test for useInView hook
    - **Property 11: Viewport-Triggered Animation**
    - **Validates: Requirements 7.1, 7.4, 13.1, 21.4**
  
  - [x] 1.7 Create useScrollTrigger hook
    - Implement hook in `hooks/useScrollTrigger.ts`
    - Detect scroll position with configurable threshold
    - Throttle scroll events to 100ms for performance
    - Return triggered state and current scrollY
    - Cleanup event listeners on unmount
    - _Requirements: 20.1, 20.3_
  
  - [x] 1.8 Create useParallax hook
    - Implement hook in `hooks/useParallax.ts`
    - Calculate transform based on scroll position
    - Support configurable speed (default 0.5)
    - Disable on mobile devices (width < 768px)
    - Integrate useReducedMotion for accessibility
    - Use translateY for GPU acceleration
    - _Requirements: 5.1-5.4, 24.2_
  
  - [ ]* 1.9 Write property tests for useParallax hook
    - **Property 6: Parallax Transform Proportionality**
    - **Property 8: Parallax Movement Bounds**
    - **Property 38: Parallax Disabled on Mobile**
    - **Validates: Requirements 5.1, 5.3, 24.2**

- [x] 2. Enhance Hero section with CTAs, trust indicators, and animations
  - [x] 2.1 Create TrustIndicators component
    - Create `components/TrustIndicators.tsx`
    - Define TrustIndicator interface (icon, value, label)
    - Implement horizontal flex layout (responsive to grid on mobile)
    - Add floating animation to icons (3-4s duration)
    - Include placeholder data for 3 indicators (years, certifications, projects)
    - _Requirements: 3.1-3.4_
  
  - [ ]* 2.2 Write property tests for TrustIndicators component
    - **Property 4: Trust Indicator Structure**
    - **Property 9: Floating Animation Easing**
    - **Property 10: Floating Animation Infinite Loop**
    - **Validates: Requirements 3.4, 6.3, 6.4**
  
  - [x] 2.3 Update Hero component with CTAs and trust indicators
    - Update `components/Hero.tsx`
    - Add primary CTA button (navigate to contact section)
    - Add secondary CTA button (navigate to services section)
    - Integrate TrustIndicators component
    - Add breathing animation to CTA buttons (2-3s duration)
    - Ensure keyboard accessibility and focus states
    - _Requirements: 2.1-2.4, 3.1-3.4_
  
  - [ ]* 2.4 Write property tests for Hero CTAs
    - **Property 2: Interactive Element Keyboard Accessibility**
    - **Property 3: WCAG Contrast Compliance**
    - **Property 13: Button Hover Glow Effect**
    - **Validates: Requirements 2.1, 2.4, 8.1**
  
  - [x] 2.5 Add entrance animations to Hero section
    - Apply staggered fade-in animations to Hero elements
    - Headline: 0ms delay, 600ms duration
    - Tagline: 200ms delay, 600ms duration
    - CTA buttons: 400ms delay, 600ms duration
    - Trust indicators: 600ms delay, 600ms duration
    - Use opacity-0-initial class for initial state
    - _Requirements: 4.1-4.5_
  
  - [x] 2.6 Add parallax effect to Hero background
    - Integrate useParallax hook in Hero component
    - Apply parallax to background layer only (not text)
    - Set speed to 0.5 (50% of scroll speed)
    - Ensure text readability is maintained
    - _Requirements: 5.1-5.4_
  
  - [ ]* 2.7 Write property test for Hero parallax text exclusion
    - **Property 7: Parallax Text Exclusion**
    - **Validates: Requirements 5.2**

- [x] 3. Checkpoint - Verify Hero section enhancements
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Enhance About section with stats grid and animations
  - [x] 4.1 Create StatsGrid component
    - Create `components/StatsGrid.tsx`
    - Define Stat interface (value, label, icon)
    - Implement 3-column grid layout (responsive to 1 column on mobile)
    - Include placeholder data for 3 stats (years, projects, certifications)
    - Add staggered animation support (100ms delay between stats)
    - _Requirements: 12.1-12.5_
  
  - [ ]* 4.2 Write property test for StatsGrid component
    - **Property 22: Stats Formatting Structure**
    - **Property 23: Staggered Animation Delays**
    - **Validates: Requirements 12.4, 13.2**
  
  - [x] 4.3 Update About component with stats and animations
    - Update `components/About.tsx`
    - Integrate StatsGrid component
    - Fix missing image reference (use existing or placeholder)
    - Add proper alt text to image
    - Integrate useInView hook for fade-in animation
    - Apply staggered animations to stats and description
    - _Requirements: 12.1-12.5, 13.1-13.4, 14.1-14.4_
  
  - [ ]* 4.4 Write property test for About image accessibility
    - **Property 24: Image Alt Text Presence**
    - **Validates: Requirements 14.2**

- [x] 5. Create WhyChooseUs section
  - [x] 5.1 Create WhyChooseUs component
    - Create `components/WhyChooseUs.tsx`
    - Define Feature interface (icon, title, description)
    - Implement 2x2 grid layout (responsive to single column on mobile)
    - Include placeholder data for 4 features (certifications, turnaround, team, track record)
    - Integrate useInView hook for fade-in animation
    - Add card hover effects (scale and glow)
    - _Requirements: 21.1-21.4_
  
  - [ ]* 5.2 Write property test for WhyChooseUs hover effects
    - **Property 16: Touch Target Minimum Size**
    - **Property 39: Touch Event Parity**
    - **Validates: Requirements 9.1, 24.3**
  
  - [x] 5.3 Add WhyChooseUs to main page layout
    - Update `app/page.tsx`
    - Insert WhyChooseUs section between About and Services
    - Ensure proper spacing and responsive layout
    - _Requirements: 21.1_

- [x] 6. Enhance Services carousel with indicators, keyboard nav, and transitions
  - [x] 6.1 Enhance carousel indicators
    - Update `components/Services.tsx`
    - Increase indicator size to 44x44px touch targets
    - Add distinct styling for active indicator
    - Add service counter text (e.g., "1 of 6")
    - Add click handlers for indicator navigation
    - _Requirements: 9.1-9.4_
  
  - [ ]* 6.2 Write property tests for carousel indicators
    - **Property 15: Carousel Indicator Hover Scale**
    - **Property 17: Carousel Indicator Click Navigation**
    - **Validates: Requirements 8.3, 9.3**
  
  - [x] 6.3 Add keyboard navigation to carousel
    - Add keyboard event listeners (ArrowLeft, ArrowRight)
    - Implement wrap-around navigation (first ↔ last)
    - Add ARIA live region for screen reader announcements
    - Ensure carousel is focusable
    - _Requirements: 10.1-10.4_
  
  - [ ]* 6.4 Write property tests for carousel keyboard navigation
    - **Property 18: Carousel Wrap-Around Navigation**
    - **Property 19: Carousel ARIA Live Announcements**
    - **Validates: Requirements 10.3, 10.4**
  
  - [x] 6.5 Add slide transitions to carousel
    - Implement fade-out (200ms) then fade-in (200ms) transitions
    - Add slide animation in navigation direction
    - Disable navigation controls during transition
    - Add transition state management
    - _Requirements: 11.1-11.4_
  
  - [ ]* 6.6 Write property tests for carousel transitions
    - **Property 20: Carousel Slide Direction Consistency**
    - **Property 21: Carousel Navigation Disabled During Transition**
    - **Validates: Requirements 11.3, 11.4**

- [x] 7. Checkpoint - Verify carousel enhancements
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Create Testimonials section
  - [x] 8.1 Create Testimonials component
    - Create `components/Testimonials.tsx`
    - Define Testimonial interface (quote, author, company, role)
    - Implement 3-column grid layout (responsive: 2 columns tablet, 1 column mobile)
    - Include placeholder data for 3-5 testimonials
    - Integrate useInView hook for fade-in animation
    - Add card styling with proper spacing
    - _Requirements: 19.1-19.4_
  
  - [ ]* 8.2 Write property test for Testimonials structure
    - **Property 34: Testimonial Structure Completeness**
    - **Validates: Requirements 19.2**
  
  - [x] 8.3 Add Testimonials to main page layout
    - Update `app/page.tsx`
    - Insert Testimonials section between Services and Contact
    - Ensure proper spacing and responsive layout
    - _Requirements: 19.1_

- [x] 9. Enhance Contact form with validation, phone formatting, and animations
  - [x] 9.1 Create phone formatting utility
    - Create `lib/phoneFormatter.ts`
    - Implement formatPhoneNumber function (US and Philippines formats)
    - Implement stripPhoneFormatting function
    - Implement detectPhoneCountry function
    - Support auto-detection based on prefix (+1 or +63)
    - _Requirements: 16.1-16.4_
  
  - [ ]* 9.2 Write property tests for phone formatting
    - **Property 29: Phone Number Auto-Formatting**
    - **Property 30: Phone Number Format Stripping**
    - **Validates: Requirements 16.1, 16.3**
  
  - [x] 9.3 Create form validation utility
    - Create `lib/validation.ts`
    - Define ValidationRule and ValidationResult interfaces
    - Implement validateField function
    - Implement validateEmail function (RFC 5322 simplified)
    - Implement validatePhone function
    - Define validation rules for name, email, phone, message
    - _Requirements: 15.1-15.4_
  
  - [ ]* 9.4 Write property tests for form validation
    - **Property 25: Required Field Validation on Blur**
    - **Property 26: Email Format Validation**
    - **Property 27: Error Removal on Valid Input**
    - **Property 28: Validation Error Styling**
    - **Validates: Requirements 15.1, 15.2, 15.3, 15.4**
  
  - [x] 9.5 Update Contact component with real-time validation
    - Update `components/Contact.tsx`
    - Add FormState and ValidationErrors interfaces
    - Implement validation on blur for all fields
    - Display inline error messages with proper styling
    - Remove errors when fields become valid
    - _Requirements: 15.1-15.4_
  
  - [x] 9.6 Add phone formatting to Contact form
    - Integrate phoneFormatter utility in Contact component
    - Apply auto-formatting on input change
    - Strip formatting before form submission
    - Support paste and auto-format
    - _Requirements: 16.1-16.4_
  
  - [x] 9.7 Add visual feedback to Contact form
    - Add focus state styling (border color, box-shadow, 200ms transition)
    - Add loading state with spinner during submission
    - Disable all fields during submission
    - Add subtle shadow effects to focused fields
    - _Requirements: 17.1-17.4_
  
  - [ ]* 9.8 Write property tests for Contact form interactions
    - **Property 31: Form Field Focus Styling**
    - **Property 32: Form Field Disabled During Submission**
    - **Validates: Requirements 17.1, 17.3, 17.4**
  
  - [x] 9.9 Add success animation to Contact form
    - Create success message component with checkmark icon
    - Implement scale-in animation (400ms duration)
    - Clear all form fields after successful submission
    - Auto-dismiss success message after 5 seconds
    - _Requirements: 18.1-18.4_
  
  - [ ]* 9.10 Write property test for form field clearing
    - **Property 33: Form Field Clearing After Success**
    - **Validates: Requirements 18.3**

- [x] 10. Checkpoint - Verify Contact form enhancements
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Create BackToTop button component
  - [x] 11.1 Create BackToTop component
    - Create `components/BackToTop.tsx`
    - Integrate useScrollTrigger hook (300px threshold)
    - Implement fade-in/fade-out based on scroll position
    - Add smooth scroll to top on click (800ms duration)
    - Position fixed in bottom-right corner
    - Ensure keyboard accessibility with ARIA label
    - Add responsive sizing (56x56px desktop, 48x48px mobile)
    - _Requirements: 20.1-20.5_
  
  - [ ]* 11.2 Write property test for BackToTop accessibility
    - **Property 2: Interactive Element Keyboard Accessibility**
    - **Validates: Requirements 20.5**
  
  - [x] 11.3 Add BackToTop to main page layout
    - Update `app/page.tsx`
    - Add BackToTop component at root level
    - Ensure proper z-index for visibility
    - _Requirements: 20.1_

- [x] 12. Replace placeholder content across all sections
  - [x] 12.1 Update content structure in all components
    - Remove lorem ipsum text from Hero, About, Services, Contact
    - Add semantic content areas with descriptive placeholders
    - Ensure proper heading hierarchy (h1 → h2 → h3)
    - Maintain semantic HTML structure
    - _Requirements: 1.1-1.4_
  
  - [ ]* 12.2 Write property test for heading hierarchy
    - **Property 1: Heading Hierarchy Preservation**
    - **Validates: Requirements 1.4**

- [x] 13. Optimize for mobile and performance
  - [x] 13.1 Add mobile-specific optimizations
    - Disable parallax on mobile devices (width < 768px)
    - Reduce animation complexity on mobile
    - Ensure touch interactions trigger hover states
    - Verify all touch targets are at least 44x44px
    - Test responsive layouts at all breakpoints
    - _Requirements: 24.1-24.4_
  
  - [x] 13.2 Verify bundle size and performance
    - Run build and check bundle size increase (<10KB gzipped)
    - Verify no additional dependencies added
    - Ensure CSS-first approach for animations
    - Confirm native Intersection Observer usage
    - Test animation performance (60fps target)
    - _Requirements: 25.1-25.4, 22.1-22.4_

- [x] 14. Final integration and testing
  - [x] 14.1 Wire all components together in main layout
    - Update `app/page.tsx` with final component order
    - Ensure proper spacing between sections
    - Verify scroll behavior and navigation
    - Test all CTA button navigation
    - _Requirements: All_
  
  - [ ]* 14.2 Write integration tests for user flows
    - Test Hero to Contact navigation flow
    - Test Services carousel navigation (arrows, indicators, keyboard)
    - Test form submission flow with validation
    - Test scroll animations across all sections
    - Test BackToTop button functionality
  
  - [ ]* 14.3 Perform accessibility audit
    - Run axe-core or WAVE accessibility checker
    - Verify keyboard navigation for all interactive elements
    - Check focus indicators visibility
    - Verify ARIA labels and live regions
    - Test with screen reader
    - Verify color contrast meets WCAG AA
    - Confirm reduced motion preference is respected
  
  - [ ]* 14.4 Perform cross-browser testing
    - Test in Chrome, Firefox, Safari, Edge (latest 2 versions)
    - Test on mobile Safari (iOS 14+) and Chrome Mobile (Android 10+)
    - Verify Intersection Observer support and fallbacks
    - Test CSS animations and transitions
    - Verify touch events and gestures

- [x] 15. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The implementation uses TypeScript, React, Next.js 14, and Tailwind CSS
- All animations use CSS-first approach with GPU acceleration (transform and opacity only)
- Bundle size increase must remain under 10KB gzipped
- Reduced motion preference must be respected throughout
- All interactive elements must meet 44x44px minimum touch target size
