import type { FetchedSegment } from "../api/elprisetjustnu-api/types";

const getAverage = (segment: FetchedSegment) => {
  let sum: number = 0;
  for (const day of segment.points) {
    sum += day.price;
  }
  return sum / segment.points.length;
};

const splitByAverage = (segment: FetchedSegment) => {
  const average = getAverage(segment);

  const aboveAverage: number[][] = [];
  const belowAverage: number[][] = [];

  let start: number = segment.points[0].hour;
  let isBuildingAboveAverage: boolean = segment.points[0].price > average;

  for (let i = 0; i < segment.points.length; i++) {
    const point = segment.points[i];
    const { price, hour } = point;

    const isAboveAverage = price > average;

    if (isAboveAverage) {
      if (!isBuildingAboveAverage) {
        isBuildingAboveAverage = true;

        const end = hour - 1;
        if (start !== end) {
          belowAverage.push([start, hour]);
        }

        start = hour;
      }
    } else {
      if (isBuildingAboveAverage) {
        isBuildingAboveAverage = false;

        const end = hour - 1;
        if (start !== end) {
          aboveAverage.push([start, hour]);
        }

        start = hour;
      }
    }

    if (i === segment.points.length - 1) {
      if (isBuildingAboveAverage) {
        const end = isAboveAverage ? hour : hour - 1;
        aboveAverage.push([start, end]);
      } else {
        const end = !isAboveAverage ? hour : hour - 1;
        belowAverage.push([start, end]);
      }
    }
  }

  return { aboveAverage, belowAverage };
};

export const getAnalytics = (data: FetchedSegment[]) => {
  for (const segment of data) {
    console.log(splitByAverage(segment));
  }
};
