import useTheme from "../../hooks/useTheme";
import Button from "../Button/Button";
import { Sun, Moon } from "lucide-react";
import SearchWeather from "../SearchWeather/SearchWeather";
import styles from "./Navbar.module.css";

type NavbarProps = {
  onRequestLocation: () => void;
  onCityChange: (city: string) => void;
};
function Navbar({ onCityChange, onRequestLocation }: NavbarProps) {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo}>Klyrh Weather</h1>
        <div className={styles.search}>
          <SearchWeather onCityChange={onCityChange} />
        </div>
        <div className={styles.controls}>
          <Button
            className={styles.themeBtn}
            aria-label="toggle theme"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
          <Button className={styles.locationBtn} onClick={onRequestLocation}>
            My Location
          </Button>
        </div>
      </header>
    </>
  );
}
export default Navbar;
