export const Chart = (data) => {
  const chartNode = document.createElement('div')
  chartNode.classList.add('chart')

  const headerNode = document.createElement('div')
  headerNode.classList.add('header')
  headerNode.appendChild(document.createTextNode('Электричество в Мальмё'))
  const subHeaderNode = document.createElement('span')
  subHeaderNode.classList.add('subHeader')
  subHeaderNode.appendChild(document.createTextNode('эре/час'))
  headerNode.appendChild(subHeaderNode)
  chartNode.appendChild(headerNode)

  const graphNode = document.createElement('div')
  graphNode.classList.add('data')

  const currentHour = new Date().getHours()
  let isCurrentHourFound = false

  data.forEach(({ hour, price, height }) => {
    const barNode = document.createElement('div')
    barNode.classList.add('percentage')

    const priceNode = document.createElement('span')
    priceNode.classList.add('price')
    if (!isCurrentHourFound && hour === currentHour) {
      priceNode.classList.add('current')
      isCurrentHourFound = true
    }
    priceNode.setAttribute('style', `--bar-height: ${height}%`)
    priceNode.appendChild(document.createTextNode(Math.floor(price)))

    const hourNode = document.createElement('span')
    hourNode.appendChild(document.createTextNode(hour))
    barNode.appendChild(priceNode)
    barNode.appendChild(hourNode)

    graphNode.appendChild(barNode)
  })
  chartNode.appendChild(graphNode)

  return chartNode
}
