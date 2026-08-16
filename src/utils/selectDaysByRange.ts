import type { WeatherDay } from "../types/weather";


export type WeatherRange = "today" | "3days" | "10days";
export function selectDaysByRange(
  days: WeatherDay[],
  range: WeatherRange,
): WeatherDay[] {
  switch (range) {
    case "today":
      return [days[0]];
    case "3days":
      return days.slice(0, 3);
    case "10days":
      return days;
    default:
      const exhaustiveCheck: never = range;
      return days;
  }
}
