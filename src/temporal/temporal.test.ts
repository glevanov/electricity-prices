import { afterEach, describe, expect, it, vi } from "vitest";
import { extractHours, getCurrentHourInMalmo } from "./temporal";

describe("extractHours", () => {
  it("should extract the hour from a timestamp", () => {
    expect(extractHours("2021-01-01T12:00:00+01:00")).toBe(12);
    expect(extractHours("2021-01-01T00:00:00+01:00")).toBe(0);
    expect(extractHours("2024-03-10T23:00:00+01:00")).toBe(23);
    expect(extractHours("2020-02-14T01:22:33+01:00")).toBe(1);
    expect(extractHours("2020-12-29T17:30:00+01:00")).toBe(17);
  });
});

describe("getCurrentHourInMalmo", () => {
  afterEach(() => {
    vi.useRealTimers;
  });

  it("handles single digit hours", () => {
    const date = new Date("2021-01-01T09:00:00+01:00");
    vi.setSystemTime(date);
    expect(getCurrentHourInMalmo()).toBe(9);

    const date2 = new Date("2021-01-01T01:00:00+01:00");
    vi.setSystemTime(date2);
    expect(getCurrentHourInMalmo()).toBe(1);

    const date3 = new Date("2021-01-01T00:00:00+01:00");
    vi.setSystemTime(date3);
    expect(getCurrentHourInMalmo()).toBe(0);
  });

  it("handles double digit hours", () => {
    const date = new Date("2021-01-01T12:00:00+01:00");
    vi.setSystemTime(date);
    expect(getCurrentHourInMalmo()).toBe(12);

    const date2 = new Date("2021-01-01T23:00:00+01:00");
    vi.setSystemTime(date2);
    expect(getCurrentHourInMalmo()).toBe(23);

    const date3 = new Date("2021-01-01T17:00:00+01:00");
    vi.setSystemTime(date3);
    expect(getCurrentHourInMalmo()).toBe(17);
  });
});
