import { describe, expect, it } from "vitest";
import { roundToTwoDecimal, transformPoints, transformDay } from "./transform";
import { hourData } from "./__mocks__/hour-data.js";

describe("roundToTwoDecimal", () => {
  it("rounds a number to two decimals", () => {
    expect(roundToTwoDecimal(hourData[0].SEK_per_kWh * 100)).toBe(55.01);
    expect(roundToTwoDecimal(hourData[3].SEK_per_kWh * 100)).toBe(40.2);
    expect(roundToTwoDecimal(hourData[11].SEK_per_kWh * 100)).toBe(5.63);
    expect(roundToTwoDecimal(hourData[12].SEK_per_kWh * 100)).toBe(1.71);
  });
});

describe("transformDay", () => {
  it("transforms the data correctly", () => {
    expect(transformDay(hourData[0])).toEqual({
      hour: 0,
      price: 55.01,
    });
    expect(transformDay(hourData[11])).toEqual({
      hour: 11,
      price: 5.63,
    });
    expect(transformDay(hourData[23])).toEqual({
      hour: 23,
      price: 55.51,
    });
  });
});

describe("transformPoints", () => {
  it("transforms the data correctly", () => {
    expect(transformPoints(hourData)).toEqual([
      {
        hour: 0,
        price: 55.01,
      },
      {
        hour: 1,
        price: 52.08,
      },
      {
        hour: 2,
        price: 46.34,
      },
      {
        hour: 3,
        price: 40.2,
      },
      {
        hour: 4,
        price: 36.62,
      },
      {
        hour: 5,
        price: 36.5,
      },
      {
        hour: 6,
        price: 38.34,
      },
      {
        hour: 7,
        price: 44.65,
      },
      {
        hour: 8,
        price: 39.37,
      },
      {
        hour: 9,
        price: 33.28,
      },
      {
        hour: 10,
        price: 5.24,
      },
      {
        hour: 11,
        price: 5.63,
      },
      {
        hour: 12,
        price: 1.71,
      },
      {
        hour: 13,
        price: 1.79,
      },
      {
        hour: 14,
        price: 4.06,
      },
      {
        hour: 15,
        price: 20.53,
      },
      {
        hour: 16,
        price: 55.12,
      },
      {
        hour: 17,
        price: 62.39,
      },
      {
        hour: 18,
        price: 65.17,
      },
      {
        hour: 19,
        price: 62.81,
      },
      {
        hour: 20,
        price: 56.55,
      },
      {
        hour: 21,
        price: 59.31,
      },
      {
        hour: 22,
        price: 56.55,
      },
      {
        hour: 23,
        price: 55.51,
      },
    ]);
  });
});
