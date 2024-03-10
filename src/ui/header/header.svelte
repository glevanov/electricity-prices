<script lang="ts">
  import type { Segment } from "../../api/api.types";
  import { formatHour, getCurrentHourInMalmo } from "../../temporal/temporal";

  export let today: Segment;

  const hour = getCurrentHourInMalmo();
  const price = today.points.find((point) => point.hour === hour)?.price;

  const start = `${formatHour(hour)}:00`;
  const end = `${formatHour(hour + 1)}:00`;
</script>

<div class="header">
  {#if typeof price === "number"}
    <span class="price">{price} эре</span> за киловатт-час
  {:else}
    <span>не удалось найти цену за киловатт-час</span>
  {/if}

  <div class="subHeader">в Мальмё на {start}-{end}</div>
</div>

<style>
  .price {
    font-weight: bold;
  }

  .subHeader {
    display: block;

    color: var(--sub-text-color);
    font-size: 16px;
  }
</style>
