export type Point = {
  price: number;
  hour: number;
  height: number;
};

export type Analytics = {
  aboveAverage: number[][];
  belowAverage: number[][];
};

export type Segment = {
  start: Date;
  points: Point[];
} & Analytics;

export type Success = Readonly<{
  isSuccess: true;
  data: Segment[];
}>;

export type Failure = Readonly<{
  isSuccess: false;
  error: string;
}>;

export type Result = Success | Failure;
