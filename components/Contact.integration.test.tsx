import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

describe("Contact integration", () => {
  it("renders contact form and key fields", () => {
    render(<Contact />);

    expect(
      screen.getByRole("heading", { name: /let's build greatest projects together\./i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /project information/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send inquiry/i }),
    ).toBeInTheDocument();
  });
});
