import { useEffect, useReducer } from "react";
import {
  initialState,
  weatherReducer,
  type WeatherState,
} from "../utils/weatherReducer";
import weatherService from "../services/weatherService";
import transformWeatherResponse, {
  type RawWeatherResponse,
} from "../utils/transformWeatherResponse";

function useWeather(url: string | null): WeatherState {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    const signal = controller.signal;
    async function load() {
      try {
        if (typeof url === "string") {
          dispatch({
            type: "FETCH_START",
          });
          const response = await weatherService(url, signal);
          const days = transformWeatherResponse(response as RawWeatherResponse);
          dispatch({ type: "FETCH_SUCCESS", payload: days });
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          dispatch({ type: "FETCH_ERROR", payload: err.message });
        }
      }
    }
    load();
    return () => controller.abort();
  }, [url]);
  return state;
}
export default useWeather;
