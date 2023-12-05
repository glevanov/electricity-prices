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

  const segments = await [today, tomorrow].reduce(async (segments, date) => {
    const url = getUrl(date);
    const data = await fetchUrl(url);

    if (data === null) return segments;

    const points = transformPoints(data);

    return [
      ...segments,
      {
        start: date,
        points,
      },
    ];
  }, []);

  return mapData(segments);
};
