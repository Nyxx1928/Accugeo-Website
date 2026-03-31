"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseParallaxOptions {
  speed?: number; // Default: 0.5 (50% of scroll speed)
  disabled?: boolean; // Disable on mobile or reduced motion
}

interface UseParallaxReturn {
  ref: React.RefObject<HTMLElement>;
  transform: string;
}

/**
 * Hook to create parallax effect on background elements
 * Calculates transform based on scroll position and element position
 * Disabled on mobile devices (width < 768px) and when reduced motion is enabled
 * 
 * @param options - Configuration options
 * @param options.speed - Parallax speed multiplier (default: 0.5)
 * @param options.disabled - Manually disable parallax effect
 * @returns Object containing ref and transform string for GPU-accelerated animation
 */
export function useParallax(
  options?: UseParallaxOptions
): UseParallaxReturn {
  const { speed = 0.5, disabled = false } = options || {};

  const ref = useRef<HTMLElement | null>(null);
  const [transform, setTransform] = useState("translateY(0px)");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if window is available (SSR safety)
    if (typeof window === "undefined") return;

    // Disable on mobile devices (width < 768px)
    const isMobile = window.innerWidth < 768;

    // Disable if reduced motion is enabled, on mobile, or manually disabled
    if (prefersReducedMotion || isMobile || disabled) {
      setTransform("translateY(0px)");
      return;
    }

    let timeoutId: NodeJS.Timeout | null = null;

    // Throttled scroll handler
    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const scrollY = window.scrollY;
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollY;

        // Calculate parallax offset
        const offset = (scrollY - elementTop) * speed;

        // Limit parallax movement to prevent excessive displacement (max 200px)
        const clampedOffset = Math.max(-200, Math.min(200, offset));

        setTransform(`translateY(${clampedOffset}px)`);
        timeoutId = null;
      }, 100);
    };

    // Set initial transform
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [speed, disabled, prefersReducedMotion]);

  return { ref, transform };
}
