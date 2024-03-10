// We need custom date handlers since we want to operate specifically
// in Malmö time zone, and JS Date object is not very good at that.
import { isToday, isTomorrow } from "date-fns";

/**
 * Extracts the hours from a timestamp
 */
export const extractHours = (date: string) => Number(date.substring(11, 13));

/**
 * Returns the current hour in Malmö
 */
export const getCurrentHourInMalmo = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Europe/Stockholm",
    hour: "numeric",
  };

  const hour = now.toLocaleTimeString("ru-RU", options);

  return Number(hour);
};

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const formatDay = (start: Date) =>
  start.toLocaleDateString("ru-RU", { weekday: "long" });

const DAY_NAME = {
  TODAY: "Сегодня",
  TOMORROW: "Завтра",
} as const;

export const getDayName = (start: Date) => {
  if (isToday(start)) {
    return DAY_NAME.TODAY;
  }

  if (isTomorrow(start)) {
    return DAY_NAME.TOMORROW;
  }

  return capitalizeFirstLetter(formatDay(start));
};

/**
 * Formats the hour to a two-digit string
 */
export const formatHour = (hour: number) =>
  hour < 10 ? `0${hour}` : String(hour);
