<script lang="ts">
  import type { Segment } from "../../api/api.types";
  import { formatHour, getCurrentHourInMalmo } from "../../temporal/temporal";
  // import Details from "./details.svelte";

  export let today: Segment;

  const hour = getCurrentHourInMalmo();
  const price = today.points.find((point) => point.hour === hour)?.price;

  const start = `${formatHour(hour)}:00`;
  const end = `${formatHour(hour + 1)}:00`;
</script>

<div class="header">
  <div class="pricing">
    {#if typeof price === "number"}
      <span class="price">{price} эре</span> за киловатт-час
    {:else}
      <span>не удалось найти цену за киловатт-час</span>
    {/if}

    <div class="subHeader">в Мальмё на {start}-{end}</div>
  </div>

  <!-- <Details /> -->
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .price {
    font-weight: bold;
  }

  .subHeader {
    display: block;

    color: var(--sub-text-color);
    font-size: 16px;
  }
</style>
