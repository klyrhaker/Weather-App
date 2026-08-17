import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
export type Theme = "light" | "dark";

function useTheme(): [Theme, () => void] {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const [theme, setTheme] = useLocalStorage<Theme>(
    "theme",
    mediaQuery.matches ? "dark" : "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme(): void {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return [theme, toggleTheme];
}
export default useTheme;
