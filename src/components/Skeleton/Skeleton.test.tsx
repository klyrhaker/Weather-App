import { render, screen } from "@testing-library/react";
import Skeleton from "./Skeleton";

describe("Skeleton", () => {
  test("renders the number of day blocks matching the count prop", () => {
    render(<Skeleton count={3} />);
    const daysBlock = screen.getAllByTestId(/^skeleton-day-/);
    expect(daysBlock).toHaveLength(3);
  });
});
