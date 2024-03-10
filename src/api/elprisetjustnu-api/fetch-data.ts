import { addDays, lightFormat, startOfDay } from "date-fns";
import { transformPoints } from "./transform";
import { mapData } from "./mapper";
import type { FetchedSegment, HourData } from "./types";
import type { Segment } from "../api.types";

const zone = "SE4";
const endpoint = "https://www.elprisetjustnu.se/api/v1/prices";
const getUrl = (date: Date) => {
  const priceDate = lightFormat(date, "yyyy/MM-dd");

  return `${endpoint}/${priceDate}_${zone}.json`;
};

const fetchUrl = async (url: string): Promise<HourData[] | null> =>
  await fetch(url)
    .then((response) => response.json())
    .catch(() => null);

export const fetchData = async (): Promise<Segment[]> => {
  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);

  const requests = [today, tomorrow].map((date) => {
    const url = getUrl(date);
    return fetchUrl(url);
  });
  const responses = await Promise.all(requests);

  const segments = [today, tomorrow].reduce<FetchedSegment[]>(
    (segments, date, index) => {
      const repsonse = responses[index];

      if (repsonse === null) return segments;

      return [
        ...segments,
        {
          start: date,
          points: transformPoints(repsonse),
        },
      ];
    },
    [],
  );

  return mapData(segments);
};
