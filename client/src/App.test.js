import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders greeting", () => {
  render(<App />);
  const linkElement = screen.getByText(/Splash/i);
  expect(linkElement).toBeInTheDocument();
});
