import {
  weatherReducer as reducer,
  type WeatherAction,
  type WeatherState,
} from "./weatherReducer";

describe("weatherReducer", () => {
  test("FETCH_START sets loading true, clears error, keeps existing data", () => {
    const state: WeatherState = {
      loading: false,
      data: [
        {
          conditions: "Clear",
          datetime: "2026-08-08",
          feelslike: 24,
          icon: "clear-day",
          temp: 25,
        },
      ],
      error: "error",
    };
    const action: WeatherAction = { type: "FETCH_START" };
    const result = reducer(state, action);
    expect(result.loading).toBe(true);
    expect(result.data).toEqual(state.data);
    expect(result.error).toBe(null);
  });
  test("FETCH_ERROR sets error message, loading false, clears data", () => {
    const state: WeatherState = {
      loading: true,
      data: [
        {
          conditions: "Clear",
          datetime: "2026-08-08",
          feelslike: 24,
          icon: "clear-day",
          temp: 25,
        },
      ],
      error: null,
    };
    const action: WeatherAction = { type: "FETCH_ERROR", payload: "error 404" };
    const result = reducer(state, action);
    expect(result.error).toBe("error 404");
    expect(result.data).toBe(null);
    expect(result.loading).toBe(false);
  });
  test("FETCH_SUCCESS sets data and stops loading", () => {
    const action: WeatherAction = {
      type: "FETCH_SUCCESS",
      payload: [
        {
          conditions: "Clear",
          datetime: "2026-08-08",
          feelslike: 24,
          icon: "clear-day",
          temp: 25,
        },
      ],
    };
    const state: WeatherState = {
      loading: true,
      data: null,
      error: null,
    };
    const result = reducer(state, action);
    expect(result.data).toEqual(action.payload);
    expect(result.loading).toBe(false);
    expect(result.error).toBe(null);
  });
});
