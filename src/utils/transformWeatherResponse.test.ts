import transformWeatherResponse from "./transformWeatherResponse";

describe("transformWeatherResponse", () => {
  test("returns an array of WeatherDay objects extracted from the raw response", () => {
    const mockRawResponse = {
      resolvedAddress: "london",
      days: [
        {
          datetime: "2026-08-10",
          temp: 22.2,
          feelslike: 22.1,
          conditions: "Частично облачно",
          icon: "partly-cloudy-day",
          cloudcover: 82.8,
          humidity: 50.7,
        },
      ],
    };
    const result = transformWeatherResponse(mockRawResponse);
    expect(result).toEqual({
      resolvedAddress: "london",
      days: [
        {
          datetime: "2026-08-10",
          temp: 22.2,
          feelslike: 22.1,
          conditions: "Частично облачно",
          icon: "partly-cloudy-day",
        },
      ],
    });
  });
  test("transforms all days in a multi-day response", () => {
    const multiDayResponse = {
      resolvedAddress: "london",
      days: [
        {
          datetime: "2026-08-10",
          temp: 22.2,
          feelslike: 22.1,
          conditions: "Частично облачно",
          icon: "partly-cloudy-day",
        },
        {
          datetime: "2026-08-11",
          temp: 19.5,
          feelslike: 18.0,
          conditions: "Дождь",
          icon: "rain",
        },
        {
          datetime: "2026-08-12",
          temp: 25.0,
          feelslike: 26.3,
          conditions: "Ясно",
          icon: "clear-day",
        },
      ],
    };

    const result = transformWeatherResponse(multiDayResponse);

    expect(result).toEqual({
      resolvedAddress: "london",
      days: [
        {
          datetime: "2026-08-10",
          temp: 22.2,
          feelslike: 22.1,
          conditions: "Частично облачно",
          icon: "partly-cloudy-day",
        },
        {
          datetime: "2026-08-11",
          temp: 19.5,
          feelslike: 18.0,
          conditions: "Дождь",
          icon: "rain",
        },
        {
          datetime: "2026-08-12",
          temp: 25.0,
          feelslike: 26.3,
          conditions: "Ясно",
          icon: "clear-day",
        },
      ],
    });
  });
});
