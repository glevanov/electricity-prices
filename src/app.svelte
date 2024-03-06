<script>
  import Chart from "./ui/chart/chart.svelte";
  import Loader from "./ui/loader/loader.svelte";
  import ErrorMessage from "./ui/error-message/error-message.svelte";

  import { loadData } from "./api/api.js";

  let isLoading = true;
  let data;
  let error;

  $: showChart = data !== undefined && error === undefined;

  loadData().then((response) => {
    if (response.isSuccess) {
      data = response.data;
      error = undefined;
    } else {
      data = undefined;
      error = response.error;
    }
    isLoading = false;
  });
</script>

{#if isLoading}
  <Loader />
{:else if showChart}
  <Chart {data} />
{:else}
  <ErrorMessage message={error ?? "Неизвестная ошибка"} />
{/if}
