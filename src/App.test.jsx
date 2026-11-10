import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

describe("App", () => {
  it("mostra o título da rede social", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Rede Social" })).toBeInTheDocument();
  });
});
