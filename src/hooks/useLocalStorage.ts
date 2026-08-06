import { useState, type Dispatch, type SetStateAction } from "react";

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
}

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
    }
    safeSetItem(key, JSON.stringify(initial));
    return initial;
  });

  function setStoredValue(newValue: T | ((prev: T) => T)): void {
    if (typeof newValue === "function") {
      setValue((prev) => {
        const result = (newValue as (prev: T) => T)(prev);
        safeSetItem(key, JSON.stringify(result));
        return result;
      });
    } else {
      safeSetItem(key, JSON.stringify(newValue));
      setValue(newValue);
    }
  }

  return [value, setStoredValue];
}

export default useLocalStorage;
