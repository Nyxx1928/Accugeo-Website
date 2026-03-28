"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseInViewOptions {
  threshold?: number; // Default: 0.2
  rootMargin?: string; // Default: "0px 0px -50px 0px"
  triggerOnce?: boolean; // Default: true
}

interface UseInViewReturn {
  ref: React.RefObject<HTMLElement>;
  visible: boolean;
}

export function useInView(options?: UseInViewOptions): UseInViewReturn {
  const {
    threshold = 0.2,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
  } = options || {};

  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion is enabled, show content immediately
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    // Fallback for browsers without Intersection Observer
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    // If already in view on mount, trigger immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      if (!triggerOnce) {
        observer.observe(el);
      }
      return;
    }

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, prefersReducedMotion]);

  return { ref, visible };
}
