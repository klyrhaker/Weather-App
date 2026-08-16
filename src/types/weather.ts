export type WeatherDay = {
  conditions: string;
  datetime: string;
  feelslike: number;
  icon: string;
  temp: number;
};
export type TransformedWeatherResponse = {
  resolvedAddress: string;
  days: WeatherDay[];
};
