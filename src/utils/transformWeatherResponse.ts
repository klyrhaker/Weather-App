import type { TransformedWeatherResponse } from "../types/weather";

export type RawWeatherDay = {
  datetime: string;
  temp: number;
  feelslike: number;
  conditions: string;
  icon: string;
  [key: string]: unknown;
};
export type RawWeatherResponse = {
  resolvedAddress: string;
  days: RawWeatherDay[];
};

function transformWeatherResponse(
  response: RawWeatherResponse,
): TransformedWeatherResponse {
  return {
    resolvedAddress: response.resolvedAddress,
    days: response.days.map(
      ({ datetime, feelslike, conditions, icon, temp }) => ({
        datetime,
        feelslike,
        conditions,
        icon,
        temp,
      }),
    ),
  };
}
export default transformWeatherResponse;
