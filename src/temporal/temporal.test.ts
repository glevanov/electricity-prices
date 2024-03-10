import { describe, expect, it } from "vitest";
import { extractHours } from "./temporal";

describe("extractHours", () => {
  it("should extract the hour from a timestamp", () => {
    expect(extractHours("2021-01-01T12:00:00+01:00")).toBe(12);
    expect(extractHours("2021-01-01T00:00:00+01:00")).toBe(0);
    expect(extractHours("2024-03-10T23:00:00+01:00")).toBe(23);
    expect(extractHours("2020-02-14T01:22:33+01:00")).toBe(1);
    expect(extractHours("2020-12-29T17:30:00+01:00")).toBe(17);
  });
});
