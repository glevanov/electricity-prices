<script>
  export let data

  const currentHour = new Date().getHours()
  const currentHourIndex = data.findIndex(({ hour }) => hour === currentHour)
</script>

<style>
  .chart {
    --margin: 12px;

    box-sizing: border-box;
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100vh;
    max-height: 600px;
    width: calc(100% - var(--margin) * 2);
    max-width: max-content;
    padding: 8px;
    margin: var(--margin);

    border: 1px solid var(--border-color);
    border-radius: 6px;
  }

  .subHeader {
    display: block;

    color: var(--sub-text-color);
    font-size: 16px;
  }

  .data {
    display: flex;
    gap: 8px;

    overflow-y: auto;
  }

  .percentage {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 8px;
    align-items: end;
    justify-items: center;
  }

  .price {
    display: flex;
    align-items: start;
    justify-content: center;
    height: var(--bar-height);
    padding-top: 12px;
    width: 45px;
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
</style>

<div class="chart">
  <div class="header">
    Электричество в Мальмё
    <span class="subHeader">эре/час</span>
  </div>

  <div class="data">
    {#each data as { hour, price, height }, index}
      <div class="percentage">
        <span class="price {index === currentHourIndex ? 'current' : ''}" style="--bar-height: {height}%">
          {Math.floor(price)}
        </span>
        <span>{hour}</span>
      </div>
    {/each}
  </div>
</div>
