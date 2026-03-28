import { renderHook, act } from "@testing-library/react";
import { useScrollTrigger } from "./useScrollTrigger";

describe("useScrollTrigger", () => {
  let scrollYValue = 0;

  beforeEach(() => {
    scrollYValue = 0;

    // Mock window.scrollY
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: scrollYValue,
    });

    // Mock scroll event
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should return initial scroll state", () => {
    const { result } = renderHook(() => useScrollTrigger());

    expect(result.current.triggered).toBe(false);
    expect(result.current.scrollY).toBe(0);
  });

  it("should trigger when scrolled past default threshold (300px)", () => {
    const { result } = renderHook(() => useScrollTrigger());

    // Simulate scroll past threshold
    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 350,
      });
      window.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(100);
    });

    expect(result.current.triggered).toBe(true);
    expect(result.current.scrollY).toBe(350);
  });

  it("should not trigger when scrolled below threshold", () => {
    const { result } = renderHook(() => useScrollTrigger());

    // Simulate scroll below threshold
    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 250,
      });
      window.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(100);
    });

    expect(result.current.triggered).toBe(false);
    expect(result.current.scrollY).toBe(250);
  });

  it("should use custom threshold", () => {
    const { result } = renderHook(() => useScrollTrigger({ threshold: 500 }));

    // Scroll to 400px (below custom threshold)
    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 400,
      });
      window.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(100);
    });

    expect(result.current.triggered).toBe(false);

    // Scroll to 600px (above custom threshold)
    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 600,
      });
      window.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(100);
    });

    expect(result.current.triggered).toBe(true);
    expect(result.current.scrollY).toBe(600);
  });

  it("should throttle scroll events to 100ms", () => {
    const { result } = renderHook(() => useScrollTrigger());

    // Trigger multiple scroll events rapidly
    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 100,
      });
      window.dispatchEvent(new Event("scroll"));

      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 200,
      });
      window.dispatchEvent(new Event("scroll"));

      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 400,
      });
      window.dispatchEvent(new Event("scroll"));

      // Only advance by 50ms (within throttle window)
      jest.advanceTimersByTime(50);
    });

    // Should still be at initial state (throttled)
    expect(result.current.scrollY).toBe(0);

    // Advance past throttle delay
    act(() => {
      jest.advanceTimersByTime(60);
    });

    // Now should update to last scroll value after throttle completes
    expect(result.current.scrollY).toBe(400);
  });

  it("should cleanup event listeners on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useScrollTrigger());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });

  it("should handle initial scroll position above threshold", () => {
    // Set initial scroll position above threshold
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useScrollTrigger());

    expect(result.current.triggered).toBe(true);
    expect(result.current.scrollY).toBe(500);
  });
});
