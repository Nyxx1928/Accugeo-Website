import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

describe("Contact integration", () => {
  it("renders contact form and key fields", () => {
    render(<Contact />);

    expect(
      screen.getByRole("heading", { name: /get in touch/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /message/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });
});
