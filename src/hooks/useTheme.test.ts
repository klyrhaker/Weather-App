import { renderHook } from "@testing-library/react";
import { act } from "react";
import useTheme from "./useTheme";
function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });
  test("uses system theme when no value in localStorage", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useTheme());
    const currentTheme = JSON.parse(localStorage.getItem("theme")!);
    expect(result.current[0]).toBe("dark");
    expect(currentTheme).toBe("dark");
  });
  test("uses value from localStorage when it exists", () => {
    localStorage.setItem("theme", JSON.stringify("dark"));
    mockMatchMedia(false);
    const { result } = renderHook(() => useTheme());
    const currentTheme = JSON.parse(localStorage.getItem("theme")!);
    expect(result.current[0]).toBe("dark");
    expect(currentTheme).toBe("dark");
  });
  test("toggles theme", () => {
    mockMatchMedia(false);
    localStorage.setItem("theme", JSON.stringify("light"));
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe("light");
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe("dark");
  });
  test("handles multiple theme toggles correctly", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe("light");
    act(() => {
      result.current[1]();
      result.current[1]();
      result.current[1]();
      result.current[1]();
    });
    const currentTheme = JSON.parse(localStorage.getItem("theme")!);
    expect(currentTheme).toBe("light");
    expect(result.current[0]).toBe("light");
  });
});
