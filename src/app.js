import { loadData } from './api'
import { mapData } from './mapper'
import { Chart } from './ui/chart'
import { ErrorMessage  } from './ui/error-message'
import { render } from './ui/render'

window.onload = async function () {
  const response = await loadData()

  if (!response.isSuccess) {
    render(ErrorMessage(response.error))
    return
  }

  const mappedData = mapData(response.data)

  render(Chart(mappedData))
}
