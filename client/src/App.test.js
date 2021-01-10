import { render, screen } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

test("renders greeting", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  const linkElement = screen.getByText(/Trace/i);
  expect(linkElement).toBeInTheDocument();
});
