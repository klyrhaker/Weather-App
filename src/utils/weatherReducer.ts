import type { TransformedWeatherResponse } from "../types/weather";

export type WeatherState = {
  loading: boolean;
  data: TransformedWeatherResponse | null;
  error: string | null;
};

export type WeatherAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: TransformedWeatherResponse }
  | { type: "FETCH_ERROR"; payload: string };

export const initialState: WeatherState = {
  loading: false,
  data: null,
  error: null,
};

export function weatherReducer(
  state: WeatherState,
  action: WeatherAction,
): WeatherState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_ERROR":
      return { loading: false, data: null, error: action.payload };
    case "FETCH_SUCCESS":
      return { loading: false, error: null, data: action.payload };
    default:
      const exhaustiveCheck: never = action;
      return state;
  }
}
