import { addDays, lightFormat, startOfDay } from "date-fns";
import { transformPoints } from "./transform.js";
import { mapData } from "../mapper.js";

const zone = "SE4";
const endpoint = "https://www.elprisetjustnu.se/api/v1/prices";
const getUrl = (date) => {
  const priceDate = lightFormat(date, "yyyy/MM-dd");

  return `${endpoint}/${priceDate}_${zone}.json`;
};

const fetchUrl = async (url) =>
  await fetch(url)
    .then((response) => response.json())
    .catch(() => null);

export const fetchData = async () => {
  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);

  const requests = [today, tomorrow].map((date) => {
    const url = getUrl(date);
    return fetchUrl(url);
  });
  const responses = await Promise.all(requests);

  const segments = [today, tomorrow].reduce((segments, date, index) => {
    const repsonse = responses[index];

    if (repsonse === null) return segments;

    return [
      ...segments,
      {
        start: date,
        points: transformPoints(repsonse),
      },
    ];
  }, []);

  return mapData(segments);
};
