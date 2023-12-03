<script>
  import Header from './header.svelte'
  import Day from './day.svelte'

  export let data
</script>

<style>
  .chart {
    --margin: 12px;

    box-sizing: border-box;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 8px;
    height: calc(100vh - var(--margin) * 2);
    max-height: 600px;
    width: calc(100% - var(--margin) * 2);
    max-width: max-content;
    padding: 8px;
    margin: var(--margin);

    border: 1px solid var(--border-color);
    border-radius: 6px;
  }

  .dataWrapper {
    display: flex;
    gap: 8px;

    overflow-y: auto;
  }
</style>

<div class="chart">
  <Header today={data[0]} />

  <div class="dataWrapper">
    {#each data as day}
      <Day day={day} />
    {/each}
  </div>
</div>
