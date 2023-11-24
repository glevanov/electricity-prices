window.onload = function() {
    const data = [20, 22, 22, 42]
    const maxValue = Math.max(...data)
    const limit = 90
    const scaling = limit / maxValue
    const normalizedData = data.map(value => Math.round(value * scaling))
    console.log(normalizedData)

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
    data.forEach((value, index) => {
        const bar = document.createElement('div')
        bar.classList.add('percentage')

        const price = document.createElement('span')
        price.classList.add('price')
        price.setAttribute('style', `--bar-height: ${normalizedData[index]}%`)
        price.appendChild(document.createTextNode(value))
        
        const hour = document.createElement('span')
        hour.appendChild(document.createTextNode(index + 10))
        bar.appendChild(price)
        bar.appendChild(hour)
        
        graph.appendChild(bar)
    })
    chart.appendChild(graph)
    
    document.body.textContent = ''
    document.body.appendChild(chart)
}