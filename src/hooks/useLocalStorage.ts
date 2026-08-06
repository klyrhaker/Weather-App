import { useState, type Dispatch, type SetStateAction } from "react";

function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error(err);
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  });

  function setStoredValue(newValue: T | ((prev: T) => T)): void {
    try {
      if (typeof newValue === "function") {
        setValue((prev) => {
          const result = (newValue as (prev: T) => T)(prev);
          localStorage.setItem(key, JSON.stringify(result));
          return result;
        });
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return [value, setStoredValue];
}
export default useLocalStorage;
