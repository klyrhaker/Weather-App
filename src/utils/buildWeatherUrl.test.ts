import buildWeatherUrl from "./buildWeatherUrl";

describe("buildWeatherUrl", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_WEATHER_API_KEY", "test-api-key");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });
  test("returns null when city is an empty string", () => {
    const city = "";
    const url = buildWeatherUrl(city);
    expect(url).toBe(null);
  });

  test("returns null when city is only whitespace", () => {
    const city = "  ";
    const url = buildWeatherUrl(city);
    expect(url).toBe(null);
  });
  test("builds a url containing the city and api key", () => {
    const url = buildWeatherUrl("london");
    expect(url).toContain("london");
    expect(url).toContain("test-api-key");
  });
  test("encodes spaces in multi-word city names", () => {
    const url = buildWeatherUrl("New York");
    expect(url).toContain("New%20York");
  });
});
