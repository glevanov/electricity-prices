// We need custom date handlers since we want to operate specifically
// in Malmö time zone, and JS Date object is not very good at that.

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
