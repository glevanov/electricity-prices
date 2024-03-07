<script lang="ts">
  import Chart from "./ui/chart/chart.svelte";
  import Loader from "./ui/loader/loader.svelte";
  import ErrorMessage from "./ui/error-message/error-message.svelte";

  import { loadData } from "./api/api";
  import { pullToSwipe } from "./pull-to-swipe";
  import type { Failure, Success } from "./api/api.types";

  let isLoading = true;
  let data: Success["data"] | undefined;
  let error: Failure["error"] | undefined;

  $: showChart = data !== undefined && error === undefined;

  const handleLoad = () => {
    isLoading = true;
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
  };

  handleLoad();

  pullToSwipe(handleLoad).init();
</script>

{#if isLoading}
  <Loader />
{:else if showChart && data}
  <Chart {data} />
{:else}
  <ErrorMessage message={error ?? "Неизвестная ошибка"} />
{/if}
