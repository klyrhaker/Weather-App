import type { FC, SVGProps } from "react";

import ClearDayIcon from "../../assets/clear-day.svg?react";
import ClearNightIcon from "../../assets/clear-night.svg?react";
import CloudyIcon from "../../assets/cloudy.svg?react";
import FogIcon from "../../assets/fog.svg?react";
import HailIcon from "../../assets/hail.svg?react";
import PartlyCloudyDayIcon from "../../assets/partly-cloudy-day.svg?react";
import PartlyCloudyNightIcon from "../../assets/partly-cloudy-night.svg?react";
import RainSnowShowersDayIcon from "../../assets/rain-snow-showers-day.svg?react";
import RainSnowShowersNightIcon from "../../assets/rain-snow-showers-night.svg?react";
import RainSnowIcon from "../../assets/rain-snow.svg?react";
import RainIcon from "../../assets/rain.svg?react";
import ShowersDayIcon from "../../assets/showers-day.svg?react";
import ShowersNightIcon from "../../assets/showers-night.svg?react";
import SleetIcon from "../../assets/sleet.svg?react";
import SnowShowersDayIcon from "../../assets/snow-showers-day.svg?react";
import SnowShowersNightIcon from "../../assets/snow-showers-night.svg?react";
import SnowIcon from "../../assets/snow.svg?react";
import ThunderRainIcon from "../../assets/thunder-rain.svg?react";
import ThunderShowersDayIcon from "../../assets/thunder-showers-day.svg?react";
import ThunderShowersNightIcon from "../../assets/thunder-showers-night.svg?react";
import ThunderIcon from "../../assets/thunder.svg?react";
import WindIcon from "../../assets/wind.svg?react";

import styles from "./WeatherIcon.module.css";

type WeatherIconProps = {
  code: string;
};

type IconEntry = {
  Icon: FC<SVGProps<SVGSVGElement>>;
  colorClass: string;
};

const WEATHER_ICON_MAP: Record<string, IconEntry> = {
  "clear-day": { Icon: ClearDayIcon, colorClass: styles.sunny },
  "clear-night": { Icon: ClearNightIcon, colorClass: styles.night },
  cloudy: { Icon: CloudyIcon, colorClass: styles.cloudy },
  fog: { Icon: FogIcon, colorClass: styles.fog },
  hail: { Icon: HailIcon, colorClass: styles.hail },
  "partly-cloudy-day": {
    Icon: PartlyCloudyDayIcon,
    colorClass: styles.partlyCloudyDay,
  },
  "partly-cloudy-night": {
    Icon: PartlyCloudyNightIcon,
    colorClass: styles.partlyCloudyNight,
  },
  "rain-snow-showers-day": {
    Icon: RainSnowShowersDayIcon,
    colorClass: styles.rainy,
  },
  "rain-snow-showers-night": {
    Icon: RainSnowShowersNightIcon,
    colorClass: styles.rainy,
  },
  "rain-snow": { Icon: RainSnowIcon, colorClass: styles.rainy },
  rain: { Icon: RainIcon, colorClass: styles.rainy },
  "showers-day": { Icon: ShowersDayIcon, colorClass: styles.rainy },
  "showers-night": { Icon: ShowersNightIcon, colorClass: styles.rainy },
  sleet: { Icon: SleetIcon, colorClass: styles.sleet },
  "snow-showers-day": { Icon: SnowShowersDayIcon, colorClass: styles.snowy },
  "snow-showers-night": {
    Icon: SnowShowersNightIcon,
    colorClass: styles.snowy,
  },
  snow: { Icon: SnowIcon, colorClass: styles.snowy },
  "thunder-rain": { Icon: ThunderRainIcon, colorClass: styles.thunder },
  "thunder-showers-day": {
    Icon: ThunderShowersDayIcon,
    colorClass: styles.thunder,
  },
  "thunder-showers-night": {
    Icon: ThunderShowersNightIcon,
    colorClass: styles.thunder,
  },
  thunder: { Icon: ThunderIcon, colorClass: styles.thunder },
  wind: { Icon: WindIcon, colorClass: styles.wind },
};

const DEFAULT_WEATHER_CODE = "cloudy";

const WeatherIcon: FC<WeatherIconProps> = ({ code }) => {
  const entry =
    WEATHER_ICON_MAP[code] ?? WEATHER_ICON_MAP[DEFAULT_WEATHER_CODE];
  const displayedCode = WEATHER_ICON_MAP[code] ? code : DEFAULT_WEATHER_CODE;
  const { Icon, colorClass } = entry;

  return (
    <Icon
      className={colorClass}
      aria-hidden="true"
      data-testid={`weather-icon-${displayedCode}`}
    />
  );
};

export default WeatherIcon;
