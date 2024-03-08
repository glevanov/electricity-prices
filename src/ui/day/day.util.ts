import { isToday, isTomorrow } from "date-fns";

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
