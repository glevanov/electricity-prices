import { describe, expect, it } from "vitest";

import { getDayName } from "./day.util";
import { addDays } from "date-fns";

describe("getDayName", () => {
  it("handles today", () => {
    const today = new Date();
    expect(getDayName(today)).toBe("Сегодня");
  });

  it("handles tomorrow", () => {
    const tomorrow = addDays(new Date(), 1);
    expect(getDayName(tomorrow)).toBe("Завтра");
  });

  it("should return the correct day name for a specific date", () => {
    const specificDate = new Date(2023, 0, 1); // January 1, 2023 is a Sunday
    expect(getDayName(specificDate)).toBe("Воскресенье");
  });
});
