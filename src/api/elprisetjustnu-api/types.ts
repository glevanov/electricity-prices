import type { Analytics, Point } from "../api.types";

export type HourData = {
  SEK_per_kWh: number;
  EUR_per_kWh: number;
  EXR: number;
  time_start: string;
  time_end: string;
};

export type TransformedPoint = Pick<Point, "price" | "hour">;

export type FetchedSegment = {
  start: Date;
  points: TransformedPoint[];
};

export type SegmentWithAnalytics = FetchedSegment & Analytics;
