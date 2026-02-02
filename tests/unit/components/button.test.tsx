import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("renders with google variant", () => {
    render(<Button variant="google">Continue with Google</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Continue with Google");
    expect(button).toHaveClass("bg-white");
  });

  it("renders with enterprise variant", () => {
    render(<Button variant="enterprise">Enterprise Login</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Enterprise Login");
    expect(button).toHaveClass("bg-emerald-600");
  });

  it("renders as disabled", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-9");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-12");
  });
});
