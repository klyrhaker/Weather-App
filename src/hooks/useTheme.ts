import useLocalStorage from "../../components/Navbar/useLocalStorage";

function useTheme(): [string, () => void] {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useLocalStorage(
    "theme",
    mediaQuery.matches ? "dark" : "light",
  );
  function toggleTheme(): void {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  return [theme, toggleTheme];
}
export default useTheme;
