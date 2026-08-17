import { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import styles from "./SearchWeather.module.css";

export type SearchWeatherProps = {
  onCityChange: (city: string) => void;
};

function SearchWeather({ onCityChange }: SearchWeatherProps) {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!debouncedValue) return;
    onCityChange(debouncedValue);
  }, [debouncedValue, onCityChange]);

  return (
    <label htmlFor="search-input">
      <input
        className={styles.search}
        data-testid="search-city"
        placeholder="Search City"
        ref={inputRef}
        id="search-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </label>
  );
}
export default SearchWeather;
