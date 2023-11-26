<script>
  import Chart from './ui/chart.svelte'
  import Loader from './ui/loader.svelte'
  import ErrorMessage from './ui/error-message.svelte'

  import { loadData } from './api.js'

  let loading = true
  let response

  loadData()
    .then((data) => {
      response = data
      loading = false
    })
</script>

{#if loading}
  <Loader />
{:else if response.isSuccess}
  <Chart data={response.data} />
{:else}
  <ErrorMessage message={response.error} />
{/if}
