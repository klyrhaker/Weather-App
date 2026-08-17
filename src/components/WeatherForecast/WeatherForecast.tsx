import type { WeatherRange } from "../../utils/selectDaysByRange";
import { selectDaysByRange } from "../../utils/selectDaysByRange";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import transformTemp from "../../utils/transformTemp";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./WeatherForecast.module.css";
import {
  type WeatherDay,
  type TransformedWeatherResponse,
} from "../../types/weather";

type WeatherForecastProps = {
  loading: boolean;
  error: string | null;
  data: TransformedWeatherResponse | null;
};

const RANGE_TO_COUNT: Record<WeatherRange, number> = {
  today: 1,
  "3days": 3,
  "10days": 10,
};

function WeatherForecast({ loading, error, data }: WeatherForecastProps) {
  const [days, setDays] = useState<WeatherDay[] | null>(data?.days ?? null);
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [range, setRange] = useState<WeatherRange>("today");

  useEffect(() => {
    data && setDays(selectDaysByRange(data.days, range));
  }, [data, range]);

  const count = RANGE_TO_COUNT[range];

  if (loading) return <Skeleton count={count} />;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Search for a city to see the weather</p>;
  const formatTemp = (value: number) => {
    if (unit === "celsius") return `${value}°C`;
    return `${transformTemp(value, "celsius")}°F`;
  };
  return (
    <div className={styles.forecast}>
      <div className={styles.rangeControls}>
        <Button
          className={styles.rangeButton}
          onClick={() => setRange("today")}
          aria-pressed={range === "today"}
        >
          today
        </Button>
        <Button
          className={styles.rangeButton}
          onClick={() => setRange("3days")}
          aria-pressed={range === "3days"}
        >
          3days
        </Button>
        <Button
          className={styles.rangeButton}
          onClick={() => setRange("10days")}
          aria-pressed={range === "10days"}
        >
          10days
        </Button>
        <Button
          className={styles.unitToggle}
          onClick={() =>
            setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"))
          }
          data-testid="toggle-temp"
          aria-pressed={unit === "fahrenheit"}
        >
          {unit}
        </Button>
      </div>
      {days && (
        <>
          <p className={styles.address}>{data.resolvedAddress}</p>
          <ul className={styles.list}>
            {days.map((day) => (
              <li
                className={styles.dayCard}
                key={day.datetime}
                data-testid={`day-${day.datetime}`}
              >
                <p className={styles.date}>{day.datetime}</p>
                <p className={styles.conditions}>{day.conditions}</p>
                <p className={styles.temp}>{`temp: ${formatTemp(day.temp)}`}</p>
                <p
                  className={styles.feelslike}
                >{`feelslike: ${formatTemp(day.feelslike)}`}</p>
                <WeatherIcon code={day.icon} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
export default WeatherForecast;
