import useTheme from "../../hooks/useTheme";
import Button from "../Button/Button";
import { Sun, Moon } from "lucide-react";
import SearchWeather from "../SearchWeather/SearchWeather";

type NavbarProps = {
  onCityChange: (city: string) => void;
};
function Navbar({ onCityChange }: NavbarProps) {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <header>
        <h1>Klyrh Weather</h1>
        <SearchWeather onCityChange={onCityChange} />
        <Button aria-label="toggle theme" onClick={toggleTheme}>
          {theme === "light" ? <Moon /> : <Sun />}
        </Button>
      </header>
    </>
  );
}
export default Navbar;
