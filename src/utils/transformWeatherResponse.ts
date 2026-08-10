import type { WeatherDay } from "./weatherReducer";

export type RawWeatherDay = {
  datetime: string;
  temp: number;
  feelslike: number;
  conditions: string;
  icon: string;
  [key: string]: unknown;
};
export type RawWeatherResponse = {
  days: RawWeatherDay[];
};
function transformWeatherResponse(response: RawWeatherResponse): WeatherDay[] {
  return response.days.map(
    ({ datetime, feelslike, conditions, icon, temp }) => ({
      datetime,
      feelslike,
      conditions,
      icon,
      temp,
    }),
  );
}
export default transformWeatherResponse;
