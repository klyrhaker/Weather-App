import type { WeatherDay } from "../../utils/weatherReducer";
import type { WeatherRange } from "../../utils/selectDaysByRange";
import { selectDaysByRange } from "../../utils/selectDaysByRange";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import transformTemp from "../../utils/transformTemp";

type WeatherForecastProps = {
  loading: boolean;
  error: string | null;
  data: WeatherDay[] | null;
};

function WeatherForecast({ loading, error, data }: WeatherForecastProps) {
  const [days, setDays] = useState(data);
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [range, setRange] = useState<WeatherRange>("today");
  useEffect(() => {
    data && setDays(selectDaysByRange(data, range));
  }, [data, range]);

  if (loading) return <p>loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Search for a city to see the weather</p>;
  const formatTemp = (value: number) => {
    if (unit === "celsius") return `${value}°C`;
    return `${transformTemp(value, "celsius")}°F`;
  };
  return (
    <>
      {days && (
        <ul>
          {days.map((day) => (
            <li key={day.datetime} data-testid={`day-${day.datetime}`}>
              <p>{day.datetime}</p>
              <p>{day.conditions}</p>
              <p>{`temp: ${formatTemp(day.temp)}`}</p>
              <p>{`feelslike: ${formatTemp(day.feelslike)}`}</p>
              <p>{day.icon}</p>
            </li>
          ))}
        </ul>
      )}
      <Button
        onClick={() => setRange("today")}
        aria-pressed={range === "today"}
      >
        today
      </Button>
      <Button
        onClick={() => setRange("3days")}
        aria-pressed={range === "3days"}
      >
        3days
      </Button>
      <Button
        onClick={() => setRange("10days")}
        aria-pressed={range === "10days"}
      >
        10days
      </Button>
      <Button
        onClick={() =>
          setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"))
        }
        data-testid="toggle-temp"
        aria-pressed={unit === "fahrenheit"}
      >
        {unit}
      </Button>
    </>
  );
}
export default WeatherForecast;
