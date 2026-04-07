# Design Document: Landing Page Enhancements

## Overview

This design document outlines the technical approach for enhancing the Accugeo landing page with improved UI/UX, subtle animations, and additional content sections. The enhancements will be implemented using React, Next.js 14, TypeScript, and Tailwind CSS, maintaining the existing tech stack while adding minimal dependencies.

The design focuses on:
- Performance-first animation system using CSS and native Intersection Observer API
- Accessibility compliance with reduced motion support
- Mobile-responsive design patterns
- Minimal bundle size impact (<10KB gzipped)
- Reusable animation hooks and utilities

## Architecture

### Component Hierarchy

```
app/page.tsx (Main Layout)
├── Navbar (existing)
├── Hero (enhanced)
│   ├── HeroContent
│   ├── TrustIndicators (new)
│   └── CTAButtons (new)
├── About (enhanced)
│   ├── AboutContent
│   └── StatsGrid (new)
├── WhyChooseUs (new)
│   └── FeatureGrid
├── Services (enhanced)
│   ├── ServiceCarousel
│   ├── CarouselIndicators (enhanced)
│   └── ServiceCard
├── Testimonials (new)
│   └── TestimonialCarousel
├── Contact (enhanced)
│   └── ContactForm (enhanced validation)
├── Footer (existing)
└── BackToTop (new)
```

### Animation System Architecture

The animation system is built on three layers:

1. **CSS Layer**: Keyframe animations and transitions defined in globals.css
2. **Hook Layer**: React hooks for scroll-triggered animations and state management
3. **Component Layer**: Components that consume hooks and apply CSS classes

```
Animation System
├── CSS Animations (globals.css)
│   ├── @keyframes fadeInUp
│   ├── @keyframes fadeIn
│   ├── @keyframes float
│   ├── @keyframes breathe
│   └── @keyframes slideIn
├── Hooks (hooks/)
│   ├── useInView.ts (existing, enhanced)
│   ├── useScrollTrigger.ts (new)
│   ├── useParallax.ts (new)
│   └── useReducedMotion.ts (new)
└── Utilities (lib/)
    └── animations.ts (new)
```

## Components and Interfaces

### 1. Enhanced Hero Component

**File**: `components/Hero.tsx`

**Purpose**: Display hero section with CTAs, trust indicators, parallax background, and entrance animations.

**Props Interface**:
```typescript
interface HeroProps {
  // No props needed - content is static
}

interface TrustIndicator {
  icon: React.ReactNode;
  value: string;
  label: string;
}
```

**Key Features**:
- Parallax background effect using `useParallax` hook
- Staggered entrance animations for headline, tagline, CTAs, and trust indicators
- Two CTA buttons: primary (contact) and secondary (services)
- Three trust indicators: years in business, certifications, projects completed

**Animation Timing**:
- Headline: 0ms delay, 600ms duration
- Tagline: 200ms delay, 600ms duration
- CTA buttons: 400ms delay, 600ms duration
- Trust indicators: 600ms delay, 600ms duration

### 2. TrustIndicators Component

**File**: `components/TrustIndicators.tsx`

**Purpose**: Display company credibility metrics with icons and floating animations.

**Props Interface**:
```typescript
interface TrustIndicatorsProps {
  indicators: TrustIndicator[];
  className?: string;
}
```

**Styling**:
- Horizontal flex layout on desktop, grid on mobile
- Icons with floating animation (3-4s duration)
- Large numerical values with descriptive labels below

### 3. Enhanced About Component

**File**: `components/About.tsx`

**Purpose**: Display company information with stats grid and scroll-triggered animations.

**Props Interface**:
```typescript
interface AboutProps {
  // No props needed
}

interface Stat {
  value: string;
  label: string;
  icon?: React.ReactNode;
}
```

**Key Features**:
- Stats grid with 3 key metrics
- Staggered animation for stats (100ms delay between each)
- Fade-in animation when section enters viewport
- Fixed missing image reference

### 4. WhyChooseUs Component

**File**: `components/WhyChooseUs.tsx`

**Purpose**: Display key differentiators in a grid layout.

**Props Interface**:
```typescript
interface WhyChooseUsProps {
  // No props needed
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}
```

**Layout**:
- 2x2 grid on desktop, single column on mobile
- Each feature card with icon, title, and description
- Fade-in animation when entering viewport
- Hover effect with subtle scale and glow

### 5. Enhanced Services Component

**File**: `components/Services.tsx`

**Purpose**: Enhanced carousel with better indicators, keyboard navigation, and smooth transitions.

**Props Interface**:
```typescript
interface ServicesProps {
  // No props needed - services array is internal
}

interface Service {
  title: string;
  subServices: string[];
  images: [string, string, string];
}
```

**Enhancements**:
- Larger indicator dots (44x44px touch targets)
- Service counter text (e.g., "1 of 6")
- Keyboard navigation (arrow keys)
- Fade + slide transitions (400ms duration)
- Disabled navigation during transitions
- ARIA live region for screen reader announcements

### 6. Testimonials Component

**File**: `components/Testimonials.tsx`

**Purpose**: Display client testimonials in a carousel or grid layout.

**Props Interface**:
```typescript
interface TestimonialsProps {
  // No props needed
}

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role?: string;
}
```

**Layout**:
- 3-column grid on desktop, single column on mobile
- Each testimonial card with quote, author, company, and optional role
- Fade-in animation when entering viewport
- Placeholder content for 3-5 testimonials

### 7. Enhanced Contact Component

**File**: `components/Contact.tsx`

**Purpose**: Enhanced form with real-time validation, phone formatting, and success animations.

**Props Interface**:
```typescript
interface ContactProps {
  // No props needed
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}
```

**Enhancements**:
- Real-time validation on blur
- Phone number auto-formatting (US and Philippines formats)
- Loading state with spinner during submission
- Success animation with checkmark icon (scale-in effect)
- Auto-dismiss success message after 5 seconds
- Enhanced focus states with border color and shadow

**Validation Rules**:
- Name: Required, min 2 characters
- Email: Required, valid email format
- Phone: Optional, valid phone format if provided
- Message: Required, min 10 characters

### 8. BackToTop Component

**File**: `components/BackToTop.tsx`

**Purpose**: Fixed button that appears on scroll and smoothly scrolls to top.

**Props Interface**:
```typescript
interface BackToTopProps {
  threshold?: number; // Default: 300px
}
```

**Behavior**:
- Hidden by default
- Fade in when scrolled past threshold (300px)
- Fade out when scrolled back to top
- Smooth scroll animation (800ms duration)
- Fixed position: bottom-right corner
- Keyboard accessible with ARIA label

## Data Models

### TrustIndicator Model

```typescript
interface TrustIndicator {
  icon: React.ReactNode;
  value: string;
  label: string;
}

// Example data
const trustIndicators: TrustIndicator[] = [
  {
    icon: <CalendarIcon />,
    value: "15+",
    label: "Years in Business"
  },
  {
    icon: <AwardIcon />,
    value: "50+",
    label: "Certifications"
  },
  {
    icon: <UsersIcon />,
    value: "500+",
    label: "Projects Completed"
  }
];
```

### Stat Model

```typescript
interface Stat {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

// Example data
const stats: Stat[] = [
  { value: "15+", label: "Years in Business" },
  { value: "500+", label: "Projects Completed" },
  { value: "50+", label: "Certifications" }
];
```

### Feature Model

```typescript
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Example data
const features: Feature[] = [
  {
    icon: <ShieldCheckIcon />,
    title: "Certified Excellence",
    description: "Accredited by leading industry bodies with 50+ certifications"
  },
  {
    icon: <ClockIcon />,
    title: "Fast Turnaround",
    description: "Quick testing and reporting without compromising accuracy"
  },
  {
    icon: <UsersIcon />,
    title: "Expert Team",
    description: "Experienced professionals with decades of combined expertise"
  },
  {
    icon: <TrendingUpIcon />,
    title: "Proven Track Record",
    description: "500+ successful projects across diverse construction sectors"
  }
];
```

### Testimonial Model

```typescript
interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role?: string;
}

// Example data
const testimonials: Testimonial[] = [
  {
    quote: "Accugeo's thorough testing and detailed reports gave us confidence in our material choices. Their team was professional and responsive throughout the project.",
    author: "John Smith",
    company: "ABC Construction",
    role: "Project Manager"
  },
  {
    quote: "We've worked with Accugeo on multiple projects. Their expertise in soil investigation and material testing is unmatched in the industry.",
    author: "Maria Garcia",
    company: "XYZ Developers",
    role: "Chief Engineer"
  },
  {
    quote: "Fast turnaround times without sacrificing quality. Accugeo helped us stay on schedule while ensuring all materials met specifications.",
    author: "David Lee",
    company: "BuildRight Inc.",
    role: "Site Supervisor"
  }
];
```

### FormState Model

```typescript
interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface FormStatus {
  kind: "success" | "error" | "pending" | null;
  message: string;
}
```

## Animation Hooks

### useInView Hook (Enhanced)

**File**: `hooks/useInView.ts`

**Purpose**: Trigger animations when elements enter viewport using Intersection Observer.

**Interface**:
```typescript
interface UseInViewOptions {
  threshold?: number; // Default: 0.2
  rootMargin?: string; // Default: "0px 0px -50px 0px"
  triggerOnce?: boolean; // Default: true
}

interface UseInViewReturn {
  ref: React.RefObject<HTMLElement>;
  visible: boolean;
}

function useInView(options?: UseInViewOptions): UseInViewReturn;
```

**Enhancements**:
- Configurable threshold and rootMargin
- Option to trigger multiple times or once
- Respects prefers-reduced-motion

### useScrollTrigger Hook (New)

**File**: `hooks/useScrollTrigger.ts`

**Purpose**: Detect scroll position for showing/hiding elements like BackToTop button.

**Interface**:
```typescript
interface UseScrollTriggerOptions {
  threshold?: number; // Default: 300
}

interface UseScrollTriggerReturn {
  triggered: boolean;
  scrollY: number;
}

function useScrollTrigger(options?: UseScrollTriggerOptions): UseScrollTriggerReturn;
```

**Implementation**:
- Uses `window.scrollY` with throttled event listener
- Throttle delay: 100ms for performance
- Cleanup on unmount

### useParallax Hook (New)

**File**: `hooks/useParallax.ts`

**Purpose**: Create parallax effect on background elements.

**Interface**:
```typescript
interface UseParallaxOptions {
  speed?: number; // Default: 0.5 (50% of scroll speed)
  disabled?: boolean; // Disable on mobile or reduced motion
}

interface UseParallaxReturn {
  ref: React.RefObject<HTMLElement>;
  transform: string;
}

function useParallax(options?: UseParallaxOptions): UseParallaxReturn;
```

**Implementation**:
- Calculates transform based on scroll position and element position
- Disabled on mobile devices (screen width < 768px)
- Disabled when prefers-reduced-motion is enabled
- Uses `transform: translateY()` for GPU acceleration

### useReducedMotion Hook (New)

**File**: `hooks/useReducedMotion.ts`

**Purpose**: Detect user's reduced motion preference.

**Interface**:
```typescript
function useReducedMotion(): boolean;
```

**Implementation**:
- Checks `window.matchMedia('(prefers-reduced-motion: reduce)')`
- Updates on preference change
- Returns `true` if reduced motion is preferred

## CSS Animations

### Animation Keyframes

**File**: `app/globals.css`

```css
/* Fade in from bottom */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Simple fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Floating animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Breathing scale animation */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Slide in from right */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Slide in from left */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scale in */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Animation Utility Classes

```css
/* Entrance animations */
.animate-fade-in-up {
  animation: fadeInUp 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-fade-in {
  animation: fadeIn 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-slide-in-right {
  animation: slideInRight 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-scale-in {
  animation: scaleIn 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Continuous animations */
.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-breathe {
  animation: breathe 2.5s ease-in-out infinite;
}

/* Animation delays */
.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}

/* Initial state for animations */
.opacity-0-initial {
  opacity: 0;
}

/* Reduced motion override */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up,
  .animate-fade-in,
  .animate-slide-in-right,
  .animate-slide-in-left,
  .animate-scale-in,
  .animate-float,
  .animate-breathe {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

### Hover Effects

```css
/* Button glow effect */
.btn-glow {
  transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-glow:hover {
  box-shadow: 0 0 20px rgba(196, 30, 58, 0.5);
}

/* Link underline animation */
.link-underline {
  position: relative;
  transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.link-underline:hover::after {
  width: 100%;
}

/* Card hover effect */
.card-hover {
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
```

## Phone Number Formatting

### Formatting Utility

**File**: `lib/phoneFormatter.ts`

**Purpose**: Format phone numbers for US and Philippines formats.

**Interface**:
```typescript
function formatPhoneNumber(value: string, country?: 'US' | 'PH'): string;
function stripPhoneFormatting(value: string): string;
function detectPhoneCountry(value: string): 'US' | 'PH' | null;
```

**Implementation**:
- US format: `(123) 456-7890` or `+1 (123) 456-7890`
- Philippines format: `+63 912 345 6789`
- Auto-detect country based on prefix (+1 or +63)
- Strip all non-numeric characters except leading +

**Example**:
```typescript
formatPhoneNumber('1234567890', 'US') // "(123) 456-7890"
formatPhoneNumber('639123456789', 'PH') // "+63 912 345 6789"
stripPhoneFormatting('+1 (123) 456-7890') // "11234567890"
```

## Form Validation

### Validation Utility

**File**: `lib/validation.ts`

**Purpose**: Validate form fields with descriptive error messages.

**Interface**:
```typescript
interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

interface ValidationResult {
  valid: boolean;
  error?: string;
}

function validateField(value: string, rules: ValidationRule): ValidationResult;
function validateEmail(email: string): ValidationResult;
function validatePhone(phone: string): ValidationResult;
```

**Validation Rules**:
- **Name**: Required, min 2 characters, max 100 characters
- **Email**: Required, valid email format (RFC 5322 simplified)
- **Phone**: Optional, valid phone format if provided (US or PH)
- **Message**: Required, min 10 characters, max 1000 characters

**Error Messages**:
- Name: "Name must be at least 2 characters"
- Email: "Please enter a valid email address"
- Phone: "Please enter a valid phone number"
- Message: "Message must be at least 10 characters"

## Performance Optimization

### Bundle Size Strategy

1. **CSS-First Animations**: Use CSS keyframes and transitions instead of JavaScript animation libraries
2. **Native APIs**: Use Intersection Observer API instead of third-party scroll libraries
3. **Code Splitting**: Lazy load non-critical components (Testimonials, BackToTop)
4. **Tree Shaking**: Import only needed icons from lucide-react
5. **No Additional Dependencies**: All functionality built with existing dependencies

**Estimated Bundle Impact**:
- New hooks: ~2KB
- New components: ~5KB
- CSS animations: ~1KB
- Utilities: ~2KB
- **Total**: ~10KB gzipped (within requirement)

### Animation Performance

1. **GPU Acceleration**: Use `transform` and `opacity` for all animations
2. **Avoid Layout Thrashing**: Never animate `width`, `height`, `top`, `left`
3. **Throttle Scroll Events**: Throttle scroll listeners to 100ms
4. **Intersection Observer**: Use for scroll-triggered animations instead of scroll events
5. **Will-Change Hint**: Apply `will-change: transform` to animated elements

**Performance Targets**:
- 60fps for all animations
- <100ms interaction response time
- No layout shifts during animations

### Mobile Optimization

1. **Disable Parallax**: Disable parallax effects on mobile devices
2. **Reduce Animation Complexity**: Simplify animations on lower-end devices
3. **Touch Targets**: Ensure all interactive elements are at least 44x44px
4. **Responsive Images**: Use appropriate image sizes for mobile viewports

## Mobile Responsiveness

### Breakpoints

Using Tailwind CSS default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Component Responsive Behavior

**Hero Section**:
- Desktop: Two-column layout (text left, trust indicators right)
- Mobile: Single column, stacked layout
- Font sizes: `text-5xl` → `text-3xl`

**About Section**:
- Desktop: Two-column layout (image left, text right)
- Mobile: Single column, image above text
- Stats grid: 3 columns → 1 column

**WhyChooseUs Section**:
- Desktop: 2x2 grid
- Tablet: 2x2 grid
- Mobile: Single column

**Services Carousel**:
- Desktop: Side-by-side images and text
- Mobile: Stacked layout, smaller images
- Indicators: Always visible, larger touch targets

**Testimonials Section**:
- Desktop: 3-column grid
- Tablet: 2-column grid
- Mobile: Single column carousel

**Contact Form**:
- Desktop: Two-column layout (location left, form right)
- Mobile: Single column, stacked layout
- Form fields: Full width on mobile

**BackToTop Button**:
- Desktop: 56x56px, bottom-right (24px from edges)
- Mobile: 48x48px, bottom-right (16px from edges)

### Touch Interactions

1. **Minimum Touch Targets**: 44x44px for all interactive elements
2. **Hover States**: Convert to active states on touch devices
3. **Swipe Gestures**: Add swipe support for carousels on mobile
4. **Tap Feedback**: Visual feedback on tap (scale or color change)

## Error Handling

### Form Submission Errors

**Error Types**:
1. **Validation Errors**: Client-side validation failures
2. **Network Errors**: Failed to reach API endpoint
3. **Server Errors**: API returned error response
4. **Timeout Errors**: Request took too long

**Error Handling Strategy**:
```typescript
try {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send message');
  }

  // Success handling
} catch (error) {
  if (error instanceof TypeError) {
    // Network error
    setStatus({ kind: 'error', message: 'Network error. Please check your connection.' });
  } else {
    // Other errors
    setStatus({ kind: 'error', message: error.message });
  }
}
```

**Error Display**:
- Inline validation errors below each field
- Global error message at top of form
- Error styling: red border, red text, error icon
- Auto-dismiss after 5 seconds (except validation errors)

### Animation Fallbacks

**Intersection Observer Not Supported**:
```typescript
if (!('IntersectionObserver' in window)) {
  // Show all content immediately without animations
  setVisible(true);
  return;
}
```

**Reduced Motion Preference**:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable all animations
  return;
}
```

**Performance Issues**:
- Monitor frame rate using `requestAnimationFrame`
- Disable complex animations if frame rate drops below 30fps
- Fallback to instant state changes

### Image Loading Errors

**Missing Images**:
```typescript
<img
  src="/about-image.png"
  alt="About Accugeo"
  onError={(e) => {
    e.currentTarget.src = '/placeholder.png'; // Fallback image
    e.currentTarget.onerror = null; // Prevent infinite loop
  }}
/>
```

**Lazy Loading**:
- Use Next.js Image component for automatic optimization
- Provide placeholder while loading
- Handle loading errors gracefully

## Testing Strategy

### Unit Testing

**Test Framework**: Jest + React Testing Library

**Components to Test**:
1. **TrustIndicators**: Renders correct number of indicators, displays values and labels
2. **WhyChooseUs**: Renders feature grid, displays icons and descriptions
3. **Testimonials**: Renders testimonial cards, displays quotes and authors
4. **BackToTop**: Shows/hides based on scroll position, scrolls to top on click
5. **Enhanced Contact Form**: Validates fields, formats phone numbers, handles submission

**Example Tests**:
```typescript
describe('TrustIndicators', () => {
  it('renders all indicators', () => {
    const indicators = [
      { icon: <div>Icon</div>, value: '15+', label: 'Years' }
    ];
    render(<TrustIndicators indicators={indicators} />);
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('Years')).toBeInTheDocument();
  });
});

describe('Contact Form', () => {
  it('validates email format', async () => {
    render(<Contact />);
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    fireEvent.blur(emailInput);
    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('formats phone number', () => {
    render(<Contact />);
    const phoneInput = screen.getByLabelText('Phone');
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    expect(phoneInput.value).toBe('(123) 456-7890');
  });
});
```

### Integration Testing

**Scenarios to Test**:
1. **Hero to Contact Flow**: Click CTA button, scroll to contact form
2. **Services Navigation**: Navigate through services using arrows and indicators
3. **Form Submission Flow**: Fill form, submit, see success message
4. **Scroll Animations**: Scroll through page, verify sections animate in
5. **Back to Top**: Scroll down, click back to top, verify scroll to top

### Accessibility Testing

**Tools**: axe-core, WAVE, manual keyboard testing

**Checklist**:
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible on all elements
- [ ] ARIA labels on icon-only buttons
- [ ] ARIA live regions for dynamic content
- [ ] Color contrast meets WCAG AA standards
- [ ] Reduced motion preference respected
- [ ] Screen reader announces carousel changes
- [ ] Form validation errors announced to screen readers

### Performance Testing

**Metrics to Monitor**:
1. **Lighthouse Score**: Target 90+ for Performance
2. **First Contentful Paint (FCP)**: <1.8s
3. **Largest Contentful Paint (LCP)**: <2.5s
4. **Cumulative Layout Shift (CLS)**: <0.1
5. **Time to Interactive (TTI)**: <3.8s
6. **Bundle Size**: <10KB increase (gzipped)

**Testing Tools**:
- Chrome DevTools Performance tab
- Lighthouse CI
- WebPageTest
- Bundle analyzer

### Browser Testing

**Browsers to Test**:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

**Features to Verify**:
- Intersection Observer support
- CSS animations
- Flexbox and Grid layouts
- Touch events
- Scroll behavior



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several areas of redundancy:

1. **Reduced Motion Properties**: Multiple criteria (4.5, 5.4, 6.5, 7.5, 13.4, 23.1-23.4) all specify that animations should be disabled when reduced motion is enabled. These can be consolidated into a single comprehensive property.

2. **Viewport Animation Properties**: Criteria 7.1, 13.1, and 21.4 all specify the same fade-in behavior for different sections. This can be expressed as one property that applies to all observed sections.

3. **Form Field Properties**: Multiple criteria about form field behavior (15.1, 15.3, 17.1, 17.3, 17.4) can be consolidated into properties about all form fields rather than specific examples.

4. **Animation Performance Properties**: Criteria 22.1-22.4 all relate to animation performance and can be combined into comprehensive properties about animation implementation.

5. **Keyboard Accessibility**: Criteria 2.4 and 20.5 both relate to keyboard accessibility and can be expressed as a general property.

The following properties represent the unique, non-redundant validation requirements:

### Property 1: Heading Hierarchy Preservation

*For any* page section, heading levels should be sequential without skipping levels (e.g., h1 → h2 → h3, never h1 → h3).

**Validates: Requirements 1.4**

### Property 2: Interactive Element Keyboard Accessibility

*For any* interactive element (buttons, links, form fields), the element should be focusable via keyboard and display a visible focus indicator.

**Validates: Requirements 2.4, 20.5**

### Property 3: WCAG Contrast Compliance

*For any* text element with a background, the color contrast ratio should meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 2.1**

### Property 4: Trust Indicator Structure

*For any* trust indicator, it should contain an icon element and a numerical value with a descriptive label.

**Validates: Requirements 3.4**

### Property 5: Reduced Motion Disables All Animations

*For any* animated element, when the user's prefers-reduced-motion setting is enabled, all animations (entrance, floating, parallax, transitions) should be disabled and content should appear immediately.

**Validates: Requirements 4.5, 5.4, 6.5, 7.5, 13.4, 23.1, 23.2, 23.3, 23.4**

### Property 6: Parallax Transform Proportionality

*For any* element with parallax effect, the transform translateY value should be approximately 50% of the scroll distance (within 10% tolerance).

**Validates: Requirements 5.1**

### Property 7: Parallax Text Exclusion

*For any* text element within a parallax section, the element should not have transform styles applied (parallax should only affect background layers).

**Validates: Requirements 5.2**

### Property 8: Parallax Movement Bounds

*For any* element with parallax effect, the absolute transform translateY value should not exceed 200 pixels to prevent excessive displacement.

**Validates: Requirements 5.3**

### Property 9: Floating Animation Easing

*For any* element with floating or breathing animation, the animation timing function should be ease-in-out or a cubic-bezier function (not linear).

**Validates: Requirements 6.3**

### Property 10: Floating Animation Infinite Loop

*For any* element with floating or breathing animation, the animation-iteration-count should be set to infinite.

**Validates: Requirements 6.4**

### Property 11: Viewport-Triggered Animation

*For any* section with scroll-triggered animation, when the section enters the viewport (20% visible), a fade-in animation should be applied exactly once per page load.

**Validates: Requirements 7.1, 7.4, 13.1, 21.4**

### Property 12: Hover Effect CSS Transitions

*For any* element with hover effects, the effect should be implemented using CSS transitions (not JavaScript animations) for performance.

**Validates: Requirements 8.4**

### Property 13: Button Hover Glow Effect

*For any* call-to-action button, hovering should apply a box-shadow glow effect with a transition duration between 150ms and 250ms.

**Validates: Requirements 8.1**

### Property 14: Navigation Link Hover Underline

*For any* navigation link, hovering should apply an underline animation with a transition duration between 250ms and 350ms.

**Validates: Requirements 8.2**

### Property 15: Carousel Indicator Hover Scale

*For any* carousel indicator, hovering should scale the element to 110-130% with a transition duration between 150ms and 250ms.

**Validates: Requirements 8.3**

### Property 16: Touch Target Minimum Size

*For any* interactive element (buttons, links, indicators), the computed width and height should be at least 44 pixels to meet touch accessibility standards.

**Validates: Requirements 9.1**

### Property 17: Carousel Indicator Click Navigation

*For any* carousel indicator, clicking it should transition to the corresponding service with a duration between 300ms and 500ms.

**Validates: Requirements 9.3**

### Property 18: Carousel Wrap-Around Navigation

*For any* carousel, navigating forward from the last item should wrap to the first item, and navigating backward from the first item should wrap to the last item.

**Validates: Requirements 10.3**

### Property 19: Carousel ARIA Live Announcements

*For any* carousel, when the active item changes, the change should be announced to screen readers via an ARIA live region.

**Validates: Requirements 10.4**

### Property 20: Carousel Slide Direction Consistency

*For any* carousel navigation, the slide animation direction should match the navigation direction (slide left when going forward, slide right when going backward).

**Validates: Requirements 11.3**

### Property 21: Carousel Navigation Disabled During Transition

*For any* carousel, all navigation controls (arrows, indicators, keyboard) should be disabled while a transition is in progress.

**Validates: Requirements 11.4**

### Property 22: Stats Formatting Structure

*For any* stat element, it should contain a numerical value and a descriptive label as separate elements.

**Validates: Requirements 12.4**

### Property 23: Staggered Animation Delays

*For any* group of elements with staggered animations, each subsequent element should have an animation delay that increases by a consistent interval (e.g., 100ms).

**Validates: Requirements 13.2**

### Property 24: Image Alt Text Presence

*For any* image element, it should have a non-empty alt attribute for accessibility (decorative images should have alt="").

**Validates: Requirements 14.2**

### Property 25: Required Field Validation on Blur

*For any* required form field, when the field loses focus (blur event) and is empty, a validation error message should be displayed.

**Validates: Requirements 15.1**

### Property 26: Email Format Validation

*For any* email input field, when the field contains a value that doesn't match a valid email pattern, a format error message should be displayed.

**Validates: Requirements 15.2**

### Property 27: Error Removal on Valid Input

*For any* form field with a validation error, when the field value becomes valid, the error message should be removed.

**Validates: Requirements 15.3**

### Property 28: Validation Error Styling

*For any* validation error message, it should be styled with error color (red) and include an error icon for visual clarity.

**Validates: Requirements 15.4**

### Property 29: Phone Number Auto-Formatting

*For any* phone input field, when a user types digits, the input should be automatically formatted according to the detected country pattern (US or Philippines).

**Validates: Requirements 16.1**

### Property 30: Phone Number Format Stripping

*For any* phone input field, when the form is submitted, the phone value should contain only digits and optionally a leading + (all formatting characters removed).

**Validates: Requirements 16.3**

### Property 31: Form Field Focus Styling

*For any* form field, when focused, the field should display a distinct border color and box-shadow with a transition duration between 150ms and 250ms.

**Validates: Requirements 17.1, 17.4**

### Property 32: Form Field Disabled During Submission

*For any* form field, when the form is in a submitting state, all fields should be disabled to prevent modification.

**Validates: Requirements 17.3**

### Property 33: Form Field Clearing After Success

*For any* form field, after successful form submission, the field value should be cleared (reset to empty string).

**Validates: Requirements 18.3**

### Property 34: Testimonial Structure Completeness

*For any* testimonial element, it should contain a quote, author name, and company name as required fields.

**Validates: Requirements 19.2**

### Property 35: Animation GPU Acceleration

*For any* CSS animation or transition, only transform and opacity properties should be animated to ensure GPU acceleration (never width, height, top, left, margin, padding).

**Validates: Requirements 22.1, 22.4**

### Property 36: Animation Duration Bounds

*For any* CSS animation or transition, the duration should be between 200ms and 800ms for optimal user experience.

**Validates: Requirements 22.2**

### Property 37: Animation Easing Functions

*For any* CSS animation or transition, the timing function should be cubic-bezier or ease-in-out (not linear) for natural movement.

**Validates: Requirements 22.3**

### Property 38: Parallax Disabled on Mobile

*For any* element with parallax effect, the effect should be disabled when the viewport width is below 768px (mobile breakpoint).

**Validates: Requirements 24.2**

### Property 39: Touch Event Parity

*For any* element with hover effects, touch events (touchstart/touchend) should trigger the same visual state changes as hover for mobile users.

**Validates: Requirements 24.3**

