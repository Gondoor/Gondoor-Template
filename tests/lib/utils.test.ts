import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("resolves tailwind conflicts — last class wins", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("ignores falsy values", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("supports conditional classes", () => {
    const active = true;
    expect(cn("base", active && "active")).toBe("base active");
  });
});
