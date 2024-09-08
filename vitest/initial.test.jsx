import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("Initial test", () => {
  it("should work", () => {
    render(<App />);
    screen.debug();
  })
})