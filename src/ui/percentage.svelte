<script>
  export let hour;
  export let price;
  export let height;
  export let isCurrentHour;
</script>

<dl class="percentage">
  <dd
    class="price {isCurrentHour ? 'current' : ''}"
    style="--bar-height: {height}%"
  >
    {Math.floor(price)}
  </dd>
  <dt class="hour">{hour}</dt>
</dl>

<style>
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

  dl,
  dd,
  dt {
    margin: 0;
  }
</style>
