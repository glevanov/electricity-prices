export const renderChart = (data) => {
    const chart = document.createElement('div')
    chart.classList.add('chart')

    const header = document.createElement('div')
    header.classList.add('header')
    header.appendChild(document.createTextNode('Цена за электричество'))
    const subHeader = document.createElement('span')
    subHeader.classList.add('subHeader')
    subHeader.appendChild(document.createTextNode('эре/час'))
    header.appendChild(subHeader)
    chart.appendChild(header)

    const graph = document.createElement('div')
    graph.classList.add('data')
    data.forEach(({ value, height }, index) => {
        const bar = document.createElement('div')
        bar.classList.add('percentage')

        const price = document.createElement('span')
        price.classList.add('price')
        price.setAttribute('style', `--bar-height: ${height}%`)
        price.appendChild(document.createTextNode(value))
        
        const hour = document.createElement('span')
        hour.appendChild(document.createTextNode(index + 8))
        bar.appendChild(price)
        bar.appendChild(hour)
        
        graph.appendChild(bar)
    })
    chart.appendChild(graph)
    
    document.body.textContent = ''
    document.body.appendChild(chart)
}
