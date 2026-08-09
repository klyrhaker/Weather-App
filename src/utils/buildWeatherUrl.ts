function buildWeatherUrl(city: string): string | null {
  if (city.trim().length === 0) return null;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city.trim())}?key=${apiKey}&unitGroup=metric&lang=ru`;
}
export default buildWeatherUrl;
