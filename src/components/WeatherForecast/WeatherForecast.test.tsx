import { render, screen, within } from "@testing-library/react";
import WeatherForecast from "./WeatherForecast";
import userEvent from "@testing-library/user-event";

describe("WeatherForecast", () => {
  test("renders 1 skeleton day block when loading with default range", () => {
    const props = { loading: true, error: null, data: null };
    render(<WeatherForecast {...props} />);
    const dayBlocks = screen.getAllByTestId(/^skeleton-day-/);
    expect(dayBlocks).toHaveLength(1);
  });
  test("renders error text when error prop is provided", () => {
    const props = {
      loading: false,
      error: "Failed to fetch weather data",
      data: null,
    };
    render(<WeatherForecast {...props} />);
    const error = screen.getByRole("alert");
    expect(error).toHaveTextContent(/failed to fetch weather data/i);
  });
  test("renders text 'search for a city to see the weather' when data is null (idle)", () => {
    const props = {
      data: null,
      loading: false,
      error: null,
    };
    render(<WeatherForecast {...props} />);
    const idle = screen.getByText(/search for a city to see the weather/i);
    expect(idle).toBeInTheDocument();
  });
  test("renders weather-list when data isn't null", () => {
    const props = {
      data: {
        resolvedAddress: "london",
        days: [
          {
            datetime: "2026-08-08",
            temp: 25,
            conditions: "Clear",
            icon: "clear-day",
            feelslike: 20,
          },
        ],
      },
      loading: false,
      error: null,
    };
    render(<WeatherForecast {...props} />);
    const dayBlock = screen.getByTestId("day-2026-08-08");
    expect(within(dayBlock).getByText("2026-08-08")).toBeInTheDocument();
    expect(within(dayBlock).getByText("Clear")).toBeInTheDocument();
    expect(
      within(dayBlock).getByTestId("weather-icon-clear-day"),
    ).toBeInTheDocument();
    expect(within(dayBlock).getByText("temp: 25°C")).toBeInTheDocument();
    expect(within(dayBlock).getByText("feelslike: 20°C")).toBeInTheDocument();
  });
  test("switches temperature unit from celsius to fahrenheit on button click", async () => {
    const user = userEvent.setup();
    const props = {
      data: {
        resolvedAddress: "london",
        days: [
          {
            datetime: "2026-08-08",
            temp: 25,
            conditions: "Clear",
            icon: "clear-day",
            feelslike: 20,
          },
        ],
      },
      loading: false,
      error: null,
    };
    render(<WeatherForecast {...props} />);
    const dayBlock = screen.getByTestId("day-2026-08-08");
    expect(within(dayBlock).getByText("temp: 25°C")).toBeInTheDocument();
    expect(within(dayBlock).getByText("feelslike: 20°C")).toBeInTheDocument();
    const toggleTemp = screen.getByTestId("toggle-temp");
    await user.click(toggleTemp);
    expect(within(dayBlock).getByText("temp: 77°F")).toBeInTheDocument();
    expect(within(dayBlock).getByText("feelslike: 68°F")).toBeInTheDocument();
  });
  test("updates number of rendered days when range button is clicked", async () => {
    const props = {
      loading: false,
      error: null,
      data: {
        resolvedAddress: "london",
        days: Array.from({ length: 10 }, (_, i) => ({
          conditions: i === 1 ? "Rain" : "Clear",
          datetime: `2026-08-${String(i + 1).padStart(2, "0")}`,
          feelslike: 24,
          icon: i === 1 ? "rain" : "clear-day",
          temp: 25,
        })),
      },
    };
    const user = userEvent.setup();
    render(<WeatherForecast {...props} />);
    const getDayBlocks = () => screen.getAllByTestId(/^day-/);
    const todayBtn = screen.getByRole("button", { name: /today/i });
    const threeDaysBtn = screen.getByRole("button", { name: /3days/i });
    const tenDaysBtn = screen.getByRole("button", { name: /10days/i });

    expect(getDayBlocks().length).toBe(1);
    await user.click(threeDaysBtn);
    expect(getDayBlocks().length).toBe(3);
    await user.click(tenDaysBtn);
    expect(getDayBlocks().length).toBe(10);
    await user.click(todayBtn);
    expect(getDayBlocks().length).toBe(1);
  });
  test("renders resolvedAddress only once regardless of the number of days", async () => {
    const props = {
      loading: false,
      error: null,
      data: {
        resolvedAddress: "london",
        days: Array.from({ length: 10 }, (_, i) => ({
          conditions: i === 1 ? "Rain" : "Clear",
          datetime: `2026-08-${String(i + 1).padStart(2, "0")}`,
          feelslike: 24,
          icon: i === 1 ? "rain" : "clear-day",
          temp: 25,
        })),
      },
    };
    const user = userEvent.setup();
    render(<WeatherForecast {...props} />);
    const tenDaysBtn = screen.getByRole("button", { name: /10days/i });
    await user.click(tenDaysBtn);
    const resolvedAddress = screen.queryAllByText("london");
    expect(resolvedAddress).toHaveLength(1);
  });
});
