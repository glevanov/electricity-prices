<script>
  import { isToday, isTomorrow } from "date-fns";

  export let day;
  const { points, start } = day;

  const isCurrentDate = isToday(start);
  const currentHour = new Date().getHours();
  const currentHourIndex = isCurrentDate
    ? day.points.findIndex(({ hour }) => hour === currentHour)
    : undefined;

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const formatDay = () =>
    start.toLocaleDateString("ru-RU", { weekday: "long" });

  const getDayName = () => {
    if (isToday(start)) {
      return "Сегодня";
    }
    if (isTomorrow(start)) {
      return "Завтра";
    }
    return capitalizeFirstLetter(formatDay());
  };
</script>

<div class="day">
  <div class="percentages">
    {#each points as { hour, price, height }, index}
      <div class="percentage">
        <span
          class="price {index === currentHourIndex ? 'current' : ''}"
          style="--bar-height: {height}%"
        >
          {Math.floor(price)}
        </span>
        <span>{hour}</span>
      </div>
    {/each}
  </div>
  <div class="dayName">
    {getDayName(start)}
  </div>
</div>

<style>
  .day {
    --bar-width: 45px;

    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .percentages {
    display: flex;
    gap: 8px;
    height: 100%;
  }

  .percentage {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 8px;
    align-items: end;
    justify-items: center;
  }

  .price {
    --min-height: 40px;

    display: flex;
    align-items: start;
    justify-content: center;
    height: max(var(--min-height), var(--bar-height));
    padding-top: 12px;
    width: var(--bar-width);
    box-sizing: border-box;

    border-radius: 6px;
    background-color: var(--bar-color);

    color: var(--bar-text-color);
    font-size: 16px;
    font-weight: bold;
  }

  .price.current {
    background-color: var(--current-bar-color);
  }

  .dayName {
    position: sticky;
    left: 0;
    width: min-content;
  }
</style>
