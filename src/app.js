import { loadData } from './api'
import { mapData } from './mapper'
import { renderChart } from './render-chart'

window.onload = async function() {
    const data = await loadData()

    const mappedData = mapData(data)

    renderChart(mappedData)
}
