/**
 * Demo: useScrollTrigger Hook Usage Examples
 * 
 * This file demonstrates how to use the useScrollTrigger hook
 * for scroll-based UI elements like BackToTop buttons.
 */

import { useScrollTrigger } from "./useScrollTrigger";

// Example 1: Basic usage with default threshold (300px)
export function BackToTopButton() {
  const { triggered } = useScrollTrigger();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full shadow-lg transition-opacity duration-300 ${
        triggered ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

// Example 2: Custom threshold (show after scrolling 500px)
export function EarlyBackToTop() {
  const { triggered } = useScrollTrigger({ threshold: 500 });

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 transition-all duration-300 ${
        triggered
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      Back to Top
    </button>
  );
}

// Example 3: Using scrollY value for progress indicator
export function ScrollProgressBar() {
  const { scrollY } = useScrollTrigger();

  // Calculate scroll percentage
  const documentHeight = typeof document !== "undefined" 
    ? document.documentElement.scrollHeight - window.innerHeight 
    : 1;
  const scrollPercentage = (scrollY / documentHeight) * 100;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-primary transition-all duration-100"
        style={{ width: `${Math.min(scrollPercentage, 100)}%` }}
      />
    </div>
  );
}

// Example 4: Conditional header styling based on scroll
export function StickyHeader() {
  const { triggered } = useScrollTrigger({ threshold: 100 });

  return (
    <header
      className={`fixed top-0 w-full transition-all duration-300 ${
        triggered
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="container mx-auto">
        <h1>Logo</h1>
      </nav>
    </header>
  );
}

// Example 5: Multiple triggers with different thresholds
export function MultiThresholdExample() {
  const { triggered: showBackToTop } = useScrollTrigger({ threshold: 300 });
  const { triggered: showProgressBar } = useScrollTrigger({ threshold: 100 });
  const { scrollY } = useScrollTrigger();

  return (
    <>
      {/* Progress bar appears after 100px */}
      {showProgressBar && (
        <div className="fixed top-0 left-0 w-full h-1 bg-primary z-50" />
      )}

      {/* Back to top appears after 300px */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full"
        >
          ↑
        </button>
      )}

      {/* Display current scroll position */}
      <div className="fixed bottom-6 left-6 bg-white p-2 rounded shadow">
        Scroll: {scrollY}px
      </div>
    </>
  );
}

/**
 * Performance Notes:
 * 
 * - Scroll events are throttled to 100ms for optimal performance
 * - Uses passive event listeners to improve scroll performance
 * - Cleanup is handled automatically on unmount
 * - Multiple instances of the hook can be used simultaneously
 */

/**
 * Accessibility Notes:
 * 
 * - Ensure buttons have proper ARIA labels
 * - BackToTop buttons should be keyboard accessible
 * - Consider focus management when scrolling programmatically
 * - Test with keyboard navigation
 */
