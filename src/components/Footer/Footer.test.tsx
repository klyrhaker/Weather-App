import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("renders logo", () => {
    render(<Footer city="" />);
    const logo = screen.getByRole("heading", { name: /@klyrh weather/i });
    expect(logo).toBeInTheDocument();
  });
  test("renders  name city in description", () => {
    render(<Footer city="berlin" />);
    const description = screen.getByText(/^weather in berlin/);
    expect(description).toBeInTheDocument();
  });
});
