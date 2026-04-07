/**
 * Demo component showing useParallax hook usage
 * This is a reference implementation for the Hero section parallax effect
 */

"use client";

import { useParallax } from "./useParallax";

export function ParallaxDemo() {
  const { ref, transform } = useParallax({ speed: 0.5 });

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Parallax background layer */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"
        style={{ transform }}
      >
        <div className="absolute inset-0 bg-[url('/Hero-bg.png')] bg-cover bg-center opacity-30" />
      </div>

      {/* Content layer (no parallax) */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold">Parallax Effect Demo</h1>
          <p className="mt-4 text-xl">Scroll down to see the background move</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Usage notes:
 * 
 * 1. Apply the ref to the element you want to parallax (usually a background layer)
 * 2. Apply the transform style to that element
 * 3. The hook automatically:
 *    - Disables on mobile devices (width < 768px)
 *    - Disables when reduced motion is enabled
 *    - Clamps movement to prevent excessive displacement (max 200px)
 *    - Uses translateY for GPU acceleration
 * 
 * 4. Configurable options:
 *    - speed: Parallax speed multiplier (default: 0.5 = 50% of scroll speed)
 *    - disabled: Manually disable the effect
 * 
 * Example with custom speed:
 * const { ref, transform } = useParallax({ speed: 0.3 });
 * 
 * Example with manual disable:
 * const { ref, transform } = useParallax({ disabled: isMobile });
 */
