import type { HourData, TransformedPoint } from "./types";

const roundToTwoDecimal = (number: number) =>
  Math.round((number + Number.EPSILON) * 100) / 100;

const transformDay = (day: HourData): TransformedPoint => ({
  price: roundToTwoDecimal(day.SEK_per_kWh * 100),
  hour: new Date(day.time_start).getHours(),
});

export const transformPoints = (data: HourData[]) => data.map(transformDay);
