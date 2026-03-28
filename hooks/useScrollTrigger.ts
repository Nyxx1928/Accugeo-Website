"use client";

import { useEffect, useState } from "react";

interface UseScrollTriggerOptions {
  threshold?: number; // Default: 300
}

interface UseScrollTriggerReturn {
  triggered: boolean;
  scrollY: number;
}

/**
 * Hook to detect scroll position and trigger state changes
 * Useful for showing/hiding elements based on scroll position (e.g., BackToTop button)
 * 
 * @param options - Configuration options
 * @param options.threshold - Scroll position in pixels to trigger state change (default: 300)
 * @returns Object containing triggered state and current scrollY position
 */
export function useScrollTrigger(
  options?: UseScrollTriggerOptions
): UseScrollTriggerReturn {
  const { threshold = 300 } = options || {};

  const [triggered, setTriggered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === "undefined") return;

    let timeoutId: NodeJS.Timeout | null = null;

    // Throttled scroll handler
    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        setTriggered(currentScrollY > threshold);
        timeoutId = null;
      }, 100);
    };

    // Set initial values
    const initialScrollY = window.scrollY;
    setScrollY(initialScrollY);
    setTriggered(initialScrollY > threshold);

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [threshold]);

  return { triggered, scrollY };
}
