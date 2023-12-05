const HOURS_OFFSET = 2;

const trimTodayPoints = (data) =>
  data.reduce((slice, day, index) => {
    if (index === 0) {
      const hour = new Date().getHours();
      const hourIndex = day.points.findIndex((point) => point.hour === hour);
      return [
        ...slice,
        {
          ...day,
          points: day.points.slice(
            hourIndex > HOURS_OFFSET ? hourIndex - HOURS_OFFSET : 0,
          ),
        },
      ];
    }
    return [...slice, day];
  }, []);

const addHeightToPoints = (data) => {
  let maxValue = 0;

  for (const day of data) {
    for (const point of day.points) {
      if (point.price > maxValue) {
        maxValue = point.price;
      }
    }
  }

  const limit = 90;
  const scaling = limit / maxValue;

  return data.map((item) => ({
    ...item,
    points: item.points.map((point) => ({
      ...point,
      height: Math.round(point.price * scaling),
    })),
  }));
};

export const mapData = (data) => {
  const withTodaySliced = trimTodayPoints(data);
  const withHeight = addHeightToPoints(withTodaySliced);

  return withHeight;
};
