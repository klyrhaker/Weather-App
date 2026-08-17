import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import useWeather from "./hooks/useWeather";
import buildWeatherUrl from "./utils/buildWeatherUrl";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import useLocalStorage from "./hooks/useLocalStorage";
import useGeolocation from "./hooks/useGeolocation";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.css";

function App() {
  const [city, setCity] = useLocalStorage("city", "");
  const { loading, error, data } = useWeather(buildWeatherUrl(city));
  const { loadingLoc, coords, requestLocation } = useGeolocation();

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (!coords) return;
    setCity(`${coords?.latitude},${coords?.longitude}`);
  }, [coords]);

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <Navbar onCityChange={setCity} onRequestLocation={requestLocation} />
        {loadingLoc && (
          <p className={styles.locatingMessage}>Определяем местоположение...</p>
        )}
        <WeatherForecast loading={loading} error={error} data={data} />
      </div>
      <Footer city={city} />
    </div>
  );
}

export default App;
