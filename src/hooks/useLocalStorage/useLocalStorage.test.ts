import { renderHook } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";
import { act } from "react";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test("initializes state and localStorage with the initial value", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initialValue"));
    const initial = JSON.parse(localStorage.getItem("key")!);
    expect(result.current[0]).toBe("initialValue");
    expect(initial).toBe("initialValue");
  });
  test("updates state and localStorage when setter is called", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initialValue"));
    act(() => {
      result.current[1]("newValue");
    });
    const currentValue = JSON.parse(localStorage.getItem("key")!);

    expect(result.current[0]).toBe("newValue");
    expect(currentValue).toBe("newValue");
  });
  test("updates state using the functional updater form", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initialValue"));
    act(() => {
      result.current[1]((prev) => prev + "_1");
      result.current[1]((prev) => prev + "_2");
    });
    const currentValue = JSON.parse(localStorage.getItem("key")!);
    expect(result.current[0]).toBe("initialValue_1_2");
    expect(currentValue).toBe("initialValue_1_2");
  });
  test("reads existing value from localStorage instead of using initialValue", () => {
    localStorage.setItem("key", JSON.stringify("currentValue"));
    const { result } = renderHook(() => useLocalStorage("key", "initialValue"));
    const currentValue = JSON.parse(localStorage.getItem("key")!);
    expect(result.current[0]).toBe("currentValue");
    expect(currentValue).toBe("currentValue");
  });
  test("falls back to initialValue when localStorage contains invalid JSON", () => {
    localStorage.setItem("key", "invalid json {{{{");
    const { result } = renderHook(() => useLocalStorage("key", "initialValue"));

    const currentValue = JSON.parse(localStorage.getItem("key")!);
    expect(result.current[0]).toBe("initialValue");
    expect(currentValue).toBe("initialValue");
  });
});
