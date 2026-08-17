import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import useWeather from "./hooks/useWeather";
import buildWeatherUrl from "./utils/buildWeatherUrl";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import useLocalStorage from "./hooks/useLocalStorage";
import useGeolocation from "./hooks/useGeolocation";


function App() {
  const [city, setCity] = useLocalStorage("city", "");
  const { loading, error, data } = useWeather(buildWeatherUrl(city));
  const { loadingLoc, coords, requestLocation } = useGeolocation();

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (!coords) return;
    setCity(`${coords?.latitude} ${coords?.longitude}`);
  }, [coords]);

  return (
    <>
      <Navbar onCityChange={setCity} onRequestLocation={requestLocation} />
      {loadingLoc && <p>Определяем местоположение...</p>}
      <WeatherForecast loading={loading} error={error} data={data} />
    </>
  );
}

export default App;
