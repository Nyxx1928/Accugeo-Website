/**
 * Demo: useInView Hook Usage Examples
 * 
 * This file demonstrates how to use the enhanced useInView hook
 * with various configuration options.
 */

import { useInView } from "./useInView";

// Example 1: Basic usage with default options
// - threshold: 0.2 (trigger when 20% visible)
// - rootMargin: "0px 0px -50px 0px"
// - triggerOnce: true (animate only once)
export function BasicExample() {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-600 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h2>This section fades in when scrolled into view</h2>
    </div>
  );
}

// Example 2: Custom threshold (trigger when 50% visible)
export function CustomThresholdExample() {
  const { ref, visible } = useInView({ threshold: 0.5 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={visible ? "animate-fade-in-up" : "opacity-0"}
    >
      <h2>This triggers when 50% visible</h2>
    </div>
  );
}

// Example 3: Trigger multiple times (not just once)
export function MultiTriggerExample() {
  const { ref, visible } = useInView({ triggerOnce: false });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-opacity duration-600 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2>This fades in/out every time it enters/leaves viewport</h2>
    </div>
  );
}

// Example 4: Custom rootMargin (trigger earlier/later)
export function CustomRootMarginExample() {
  const { ref, visible } = useInView({
    rootMargin: "0px 0px -200px 0px", // Trigger 200px before entering viewport
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={visible ? "animate-fade-in-up" : "opacity-0"}
    >
      <h2>This triggers 200px before entering viewport</h2>
    </div>
  );
}

// Example 5: Complete custom configuration
export function FullCustomExample() {
  const { ref, visible } = useInView({
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
    triggerOnce: true,
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`transition-all duration-600 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
    >
      <h2>Fully customized animation trigger</h2>
      <p>Triggers when 30% visible, 100px before viewport</p>
    </section>
  );
}

// Example 6: Staggered animations for multiple elements
export function StaggeredExample() {
  const { ref: ref1, visible: visible1 } = useInView();
  const { ref: ref2, visible: visible2 } = useInView();
  const { ref: ref3, visible: visible3 } = useInView();

  return (
    <div>
      <div
        ref={ref1 as React.RefObject<HTMLDivElement>}
        className={`transition-all duration-600 ${
          visible1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h3>First item</h3>
      </div>
      <div
        ref={ref2 as React.RefObject<HTMLDivElement>}
        className={`transition-all duration-600 delay-100 ${
          visible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h3>Second item (100ms delay)</h3>
      </div>
      <div
        ref={ref3 as React.RefObject<HTMLDivElement>}
        className={`transition-all duration-600 delay-200 ${
          visible3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h3>Third item (200ms delay)</h3>
      </div>
    </div>
  );
}

/**
 * Accessibility Notes:
 * 
 * - The hook automatically respects prefers-reduced-motion
 * - When reduced motion is enabled, content appears immediately (visible = true)
 * - No animation classes are needed when reduced motion is active
 * - Fallback for browsers without Intersection Observer support
 */
