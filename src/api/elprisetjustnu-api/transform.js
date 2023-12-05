const roundToTwoDecimal = (number) =>
  Math.round((number + Number.EPSILON) * 100) / 100;

const transformDay = (day) => ({
  price: roundToTwoDecimal(day.SEK_per_kWh * 100),
  hour: new Date(day.time_start).getHours(),
});

export const transformPoints = (data) => data.map(transformDay);
