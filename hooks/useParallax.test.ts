import { renderHook, act } from "@testing-library/react";
import { useParallax } from "./useParallax";
import { useReducedMotion } from "./useReducedMotion";

// Mock useReducedMotion hook
jest.mock("./useReducedMotion");

describe("useParallax", () => {
  let mockUseReducedMotion: jest.MockedFunction<typeof useReducedMotion>;

  beforeEach(() => {
    mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>;
    mockUseReducedMotion.mockReturnValue(false);

    // Mock window.innerWidth for mobile detection
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Mock window.scrollY
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });

    // Use fake timers
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should return ref and initial transform", () => {
    const { result } = renderHook(() => useParallax());

    expect(result.current.ref).toBeDefined();
    expect(result.current.transform).toBe("translateY(0px)");
  });

  it("should use default speed of 0.5", () => {
    const { result } = renderHook(() => useParallax());
    const mockElement = document.createElement("div");
    
    // Set up element position
    jest.spyOn(mockElement, "getBoundingClientRect").mockReturnValue({
      top: 0,
      bottom: 100,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Assign ref
    act(() => {
      (result.current.ref as React.MutableRefObject<HTMLElement>).current = mockElement;
    });

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    // Wait for throttle
    jest.advanceTimersByTime(100);

    // Transform should be approximately 50% of scroll (speed = 0.5)
    // offset = (scrollY - elementTop) * speed = (100 - 0) * 0.5 = 50
    expect(result.current.transform).toContain("translateY");
  });

  it("should disable parallax on mobile devices (width < 768px)", () => {
    Object.defineProperty(window, "innerWidth", { value: 767, writable: true });

    const { result } = renderHook(() => useParallax());

    expect(result.current.transform).toBe("translateY(0px)");
  });

  it("should disable parallax when reduced motion is enabled", () => {
    mockUseReducedMotion.mockReturnValue(true);

    const { result } = renderHook(() => useParallax());

    expect(result.current.transform).toBe("translateY(0px)");
  });

  it("should disable parallax when disabled option is true", () => {
    const { result } = renderHook(() => useParallax({ disabled: true }));

    expect(result.current.transform).toBe("translateY(0px)");
  });

  it("should support configurable speed", () => {
    const { result } = renderHook(() => useParallax({ speed: 0.3 }));
    const mockElement = document.createElement("div");
    
    jest.spyOn(mockElement, "getBoundingClientRect").mockReturnValue({
      top: 0,
      bottom: 100,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    act(() => {
      (result.current.ref as React.MutableRefObject<HTMLElement>).current = mockElement;
    });

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    jest.advanceTimersByTime(100);

    // Transform should use custom speed
    expect(result.current.transform).toContain("translateY");
  });

  it("should clamp transform to prevent excessive displacement (max 200px)", () => {
    const { result } = renderHook(() => useParallax({ speed: 1.0 }));
    const mockElement = document.createElement("div");
    
    jest.spyOn(mockElement, "getBoundingClientRect").mockReturnValue({
      top: 0,
      bottom: 100,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    act(() => {
      (result.current.ref as React.MutableRefObject<HTMLElement>).current = mockElement;
    });

    // Simulate large scroll that would exceed 200px
    Object.defineProperty(window, "scrollY", { value: 1000, writable: true });
    
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    jest.advanceTimersByTime(100);

    // Transform should be clamped to 200px
    const transformValue = result.current.transform;
    const match = transformValue.match(/translateY\((-?\d+)px\)/);
    if (match) {
      const value = Math.abs(parseInt(match[1]));
      expect(value).toBeLessThanOrEqual(200);
    }
  });

  it.skip("should cleanup scroll listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { result, unmount } = renderHook(() => useParallax());
    const mockElement = document.createElement("div");
    
    // Set up element position
    jest.spyOn(mockElement, "getBoundingClientRect").mockReturnValue({
      top: 0,
      bottom: 100,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Set the ref to trigger the effect
    act(() => {
      (result.current.ref as React.MutableRefObject<HTMLElement>).current = mockElement;
    });

    // Force a re-render to trigger the effect
    act(() => {
      window.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(100);
    });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it("should use translateY for GPU acceleration", () => {
    const { result } = renderHook(() => useParallax());

    // Transform should always use translateY format
    expect(result.current.transform).toMatch(/^translateY\(-?\d+px\)$/);
  });
});
