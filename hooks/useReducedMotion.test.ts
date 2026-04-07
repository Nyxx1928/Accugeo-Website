import { renderHook, act } from "@testing-library/react";
import { useReducedMotion } from "./useReducedMotion";

describe("useReducedMotion", () => {
  let matchMediaMock: jest.Mock;
  let addEventListenerMock: jest.Mock;
  let removeEventListenerMock: jest.Mock;

  beforeEach(() => {
    addEventListenerMock = jest.fn();
    removeEventListenerMock = jest.fn();
    matchMediaMock = jest.fn();

    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return false when reduced motion is not preferred", () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    });

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
    expect(matchMediaMock).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("should return true when reduced motion is preferred", () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    });

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should add event listener for preference changes", () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    });

    renderHook(() => useReducedMotion());

    expect(addEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("should update when preference changes", () => {
    let changeHandler: (event: MediaQueryListEvent) => void;

    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: (event: string, handler: (event: MediaQueryListEvent) => void) => {
        changeHandler = handler;
      },
      removeEventListener: removeEventListenerMock,
    });

    const { result, rerender } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);

    // Simulate preference change
    act(() => {
      changeHandler!({ matches: true } as MediaQueryListEvent);
    });

    // Force re-render to get updated value
    rerender();

    expect(result.current).toBe(true);
  });

  it("should remove event listener on unmount", () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    });

    const { unmount } = renderHook(() => useReducedMotion());

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
