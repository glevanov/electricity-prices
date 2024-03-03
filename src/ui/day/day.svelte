<script>
  import { isToday } from "date-fns";

  import { getDayName } from "./day.util.js";
  import Percentage from "../percentage.svelte";

  export let day;
  const { points, start } = day;

  const isCurrentDate = isToday(start);
  const currentHour = new Date().getHours();
  const currentHourIndex = isCurrentDate
    ? day.points.findIndex(({ hour }) => hour === currentHour)
    : undefined;
</script>

<article class="day">
  <div class="percentages">
    {#each points as { hour, price, height }, index}
      <Percentage
        {hour}
        {price}
        {height}
        isCurrentHour={index === currentHourIndex}
        key={hour}
      />
    {/each}
  </div>

  <h2 class="dayName">
    {getDayName(start)}
  </h2>
</article>

<style>
  .day {
    --bar-width: 45px;

    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .dayName {
    position: sticky;
    left: 0;

    margin: 0;
    width: min-content;

    font-weight: inherit;
    font-size: inherit;
  }

  .percentages {
    display: flex;
    gap: 8px;
    height: 100%;
  }
</style>
