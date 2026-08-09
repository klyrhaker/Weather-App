import { renderHook } from "@testing-library/react";
import { act } from "react";
import useDebounce from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  test("returns the initial value immediately, before any delay", () => {
    const { result } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } },
    );
    expect(result.current).toBe("a");
  });
  test("updates the value only after the delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } },
    );
    rerender({ value: "ab", delay: 500 });
    expect(result.current).toBe("a");
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe("ab");
  });
  test("resets the timer on rapid successive value changes, showing only the final value", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } },
    );
    rerender({ value: "ab", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    rerender({ value: "abc", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: "abcd", delay: 500 });

    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("abcd");
  });
});
