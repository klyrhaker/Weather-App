import type { WeatherDay } from "../types/weather";
import { selectDaysByRange } from "./selectDaysByRange";

const days: WeatherDay[] = [
  {
    conditions: "Clear",
    datetime: "2026-08-01",
    feelslike: 24,
    icon: "clear-day",
    temp: 25,
  },
  {
    conditions: "Rain",
    datetime: "2026-08-02",
    feelslike: 24,
    icon: "rain",
    temp: 25,
  },
  {
    conditions: "Clear",
    datetime: "2026-08-03",
    feelslike: 24,
    icon: "clear-day",
    temp: 25,
  },
  {
    conditions: "Clear",
    datetime: "2026-08-04",
    feelslike: 24,
    icon: "clear-day",
    temp: 25,
  },
  {
    conditions: "Clear",
    datetime: "2026-08-05",
    feelslike: 24,
    icon: "clear-day",
    temp: 25,
  },
  {
    conditions: "Clear",
    datetime: "2026-08-06",
    feelslike: 24,
    icon: "clear-day",
    temp: 25,
  },
  {
    conditions: "Clear",
    datetime: "2026-08-07",
    feelslike: 24,
    icon: "clear-day",
    temp: 25,
  },
  {
    conditions: "Clear",
    datetime: "2026-08-08",
    feelslike: 24,
    icon: "clear-day",
    temp: 25,
  },
  {
    conditions: "Clear",
    datetime: "2026-08-09",
    feelslike: 24,
    icon: "clear-day",
    temp: 25,
  },
  {
    conditions: "Clear",
    datetime: "2026-08-10",
    feelslike: 24,
    icon: "clear-day",
    temp: 25,
  },
];
describe("selectDaysByRange", () => {
  test("returns only the first day for 'today' range", () => {
    const result = selectDaysByRange(days, "today");
    expect(result).toHaveLength(1);
    expect(result).toEqual([days[0]]);
  });
  test("returns three days for '3days' range", () => {
    const result = selectDaysByRange(days, "3days");
    expect(result).toHaveLength(3);
    expect(result).toEqual(days.slice(0, 3));
  });
  test("returns ten days for '10days' range", () => {
    const result = selectDaysByRange(days, "10days");
    expect(result).toHaveLength(10);
    expect(result).toEqual(days);
  });
});
