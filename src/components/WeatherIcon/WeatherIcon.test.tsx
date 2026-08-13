import { render, screen } from "@testing-library/react";
import WeatherIcon from "./WeatherIcon";

describe("WeatherIcon", () => {
  test("renders the icon corresponding to the given weather code", () => {
    render(<WeatherIcon code="rain" />);
    const icon = screen.getByTestId("weather-icon-rain");
    expect(icon).toBeInTheDocument();
  });
  test("renders the default cloudy icon when the weather code is not recognized", () => {
    render(<WeatherIcon code="unknown-weather" />);
    const icon = screen.getByTestId("weather-icon-cloudy");
    expect(icon).toBeInTheDocument();
  });
});
