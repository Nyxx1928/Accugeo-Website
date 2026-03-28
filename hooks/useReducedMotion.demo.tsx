"use client";

import { useReducedMotion } from "./useReducedMotion";

/**
 * Demo component to test useReducedMotion hook
 * This can be temporarily added to a page to verify the hook works
 */
export function ReducedMotionDemo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="p-8 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Reduced Motion Detection</h2>
      <p className="mb-4">
        Current preference:{" "}
        <strong className={prefersReducedMotion ? "text-red-600" : "text-green-600"}>
          {prefersReducedMotion ? "Reduced Motion Enabled" : "Animations Enabled"}
        </strong>
      </p>
      <p className="text-sm text-gray-600">
        To test: Open your system settings and toggle "Reduce motion" preference.
        This component will update automatically.
      </p>
      <div
        className={`mt-4 p-4 bg-blue-500 text-white rounded ${
          prefersReducedMotion ? "" : "animate-pulse"
        }`}
      >
        {prefersReducedMotion
          ? "Animations disabled - this box is static"
          : "Animations enabled - this box is pulsing"}
      </div>
    </div>
  );
}
