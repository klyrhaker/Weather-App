import { renderHook, waitFor } from "@testing-library/react";
import weatherService from "../services/weatherService";
import useWeather from "./useWeather";

vi.mock("../services/weatherService");

describe("useWeather", () => {
  test("returns initial state when url is null", () => {
    const { result } = renderHook(() => useWeather(null));
    expect(result.current).toEqual({ data: null, loading: false, error: null });
  });
  test("does not call weatherService when url is null", () => {
    renderHook(() => useWeather(null));
    expect(weatherService).not.toHaveBeenCalled();
  });
  test("returns transformed data after a successful fetch", async () => {
    const mockRawResponse = {
      days: [
        {
          datetime: "2026-08-10",
          temp: 22.2,
          feelslike: 22.1,
          conditions: "Частично облачно",
          icon: "partly-cloudy-day",
        },
      ],
    };
    vi.mocked(weatherService).mockResolvedValue(mockRawResponse);
    const { result } = renderHook(() => useWeather("https://fake-url.com"));
    await waitFor(() => {
      expect(result.current.data).toEqual([
        {
          datetime: "2026-08-10",
          temp: 22.2,
          feelslike: 22.1,
          conditions: "Частично облачно",
          icon: "partly-cloudy-day",
        },
      ]);
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
