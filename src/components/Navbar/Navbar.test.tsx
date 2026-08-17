import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import userEvent from "@testing-library/user-event";

const { toggleThemeMock } = vi.hoisted(() => ({
  toggleThemeMock: vi.fn(),
}));

vi.mock("../../hooks/useTheme", () => ({
  default: () => ["light", toggleThemeMock],
}));

describe("Navbar", () => {
  test("renders logo", () => {
    render(<Navbar onCityChange={() => {}} onRequestLocation={() => {}} />);
    const logo = screen.getByRole("heading", { name: /klyrh weather/i });
    expect(logo).toBeInTheDocument();
  });
  test("renders theme toggle button", () => {
    render(<Navbar onCityChange={() => {}} onRequestLocation={() => {}} />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });
  test("calls toggleTheme on button click", async () => {
    const user = userEvent.setup();
    render(<Navbar onCityChange={() => {}} onRequestLocation={() => {}} />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button);
    expect(toggleThemeMock).toHaveBeenCalled();
  });
  test("renders city search input", () => {
    render(<Navbar onCityChange={() => {}} onRequestLocation={() => {}} />);
    const input = screen.getByTestId("search-city");
    expect(input).toBeInTheDocument();
  });
  test("renders button 'my location'", () => {
    render(<Navbar onCityChange={() => {}} onRequestLocation={() => {}} />);
    const button = screen.getByRole("button", { name: /my location/i });
    expect(button).toBeInTheDocument();
  });
  test("calls onRequestLocation on location button click", async () => {
    const onRequestLocation = vi.fn();
    const user = userEvent.setup();
    render(
      <Navbar onCityChange={() => {}} onRequestLocation={onRequestLocation} />,
    );
    const button = screen.getByRole("button", { name: /my location/i });
    await user.click(button);
    expect(onRequestLocation).toHaveBeenCalledTimes(1);
  });
});
