import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import useWeather from "./hooks/useWeather";
import buildWeatherUrl from "./utils/buildWeatherUrl";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [city, setCity] = useLocalStorage("city","london");
  const { loading, error, data } = useWeather(buildWeatherUrl(city));

  return (
    <>
      <Navbar onCityChange={setCity} />
      <WeatherForecast loading={loading} error={error} data={data} />
    </>
  );
}

export default App;
