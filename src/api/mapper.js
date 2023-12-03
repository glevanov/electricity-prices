const HOURS_OFFSET = 2;

export const mapData = (data) => {
  const withTodaySliced = data.reduce((slice, day, index) => {
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

  let maxValue = 0;

  for (const day of withTodaySliced) {
    for (const point of day.points) {
      if (point.price > maxValue) {
        maxValue = point.price;
      }
    }
  }

  const limit = 90;
  const scaling = limit / maxValue;

  return withTodaySliced.map((item) => ({
    ...item,
    points: item.points.map((point) => ({
      ...point,
      height: Math.round(point.price * scaling),
    })),
  }));
};
