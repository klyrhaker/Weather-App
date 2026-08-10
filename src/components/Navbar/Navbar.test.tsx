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
    render(<Navbar onCityChange={() => {}} />);
    const logo = screen.getByRole("heading", { name: /klyrh weather/i });
    expect(logo).toBeInTheDocument();
  });
  test("renders theme toggle button", () => {
    render(<Navbar onCityChange={() => {}} />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });
  test("calls toggleTheme on button click", async () => {
    const user = userEvent.setup();
    render(<Navbar onCityChange={() => {}} />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button);
    expect(toggleThemeMock).toHaveBeenCalled();
  });
  test("renders city search input", () => {
    render(<Navbar onCityChange={() => {}} />);
    const input = screen.getByRole("textbox", { name: /search city/i });
    expect(input).toBeInTheDocument();
  });
});
