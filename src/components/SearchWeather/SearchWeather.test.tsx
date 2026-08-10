import { render, screen, waitFor } from "@testing-library/react";
import SearchWeather from "./SearchWeather";
import userEvent from "@testing-library/user-event";

describe("SearchWeather", () => {
  test("renders input for searching a city", () => {
    render(<SearchWeather onCityChange={() => {}} />);

    const input = screen.getByRole("textbox", {
      name: /search city/i,
    });

    expect(input).toBeInTheDocument();
  });

  test("focuses input on mount", () => {
    render(<SearchWeather onCityChange={() => {}} />);

    const input = screen.getByRole("textbox", {
      name: /search city/i,
    });

    expect(input).toHaveFocus();
  });

  test("calls onCityChange with debounced value after user types a city", async () => {
    const user = userEvent.setup();
    const onCityChange = vi.fn();

    render(<SearchWeather onCityChange={onCityChange} />);

    const input = screen.getByRole("textbox", {
      name: /search city/i,
    });

    await user.type(input, "Moscow");

    expect(input).toHaveValue("Moscow");

    await waitFor(() => {
      expect(onCityChange).toHaveBeenCalledWith("Moscow");
    });
  });
});