<script>
  import Chart from "./ui/chart.svelte";
  import Loader from "./ui/loader.svelte";
  import ErrorMessage from "./ui/error-message.svelte";

  import { loadData } from "./api/api.js";
  import { PersistentStorage } from "./persistent-storage.js";

  const storage = new PersistentStorage();

  let loading = true;
  let data = storage.load() ?? undefined;
  let error;

  $: showLoader = loading && data === undefined;
  $: showChart = data !== undefined && error === undefined;

  loadData().then((response) => {
    if (response.isSuccess) {
      data = response.data;
      error = undefined;
      storage.write(data);
    } else {
      data = undefined;
      error = response.error;
    }
    loading = false;
  });
</script>

{#if showLoader}
  <Loader />
{:else if showChart}
  <Chart {data} />
{:else}
  <ErrorMessage message={error ?? "Неизвестная ошибка"} />
{/if}
