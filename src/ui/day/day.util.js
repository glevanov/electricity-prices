import { isToday, isTomorrow } from "date-fns";

const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const formatDay = (start) =>
  start.toLocaleDateString("ru-RU", { weekday: "long" });

const DAY_NAME = {
  TODAY: "Сегодня",
  TOMORROW: "Завтра",
};

export const getDayName = (start) => {
  if (isToday(start)) {
    return DAY_NAME.TODAY;
  }

  if (isTomorrow(start)) {
    return DAY_NAME.TOMORROW;
  }

  return capitalizeFirstLetter(formatDay());
};
