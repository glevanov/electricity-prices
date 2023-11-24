export const mapData = (data) => {
    const maxValue = Math.max(...data)
    const limit = 90
    const scaling = limit / maxValue

    return data.map(value => ({
        value,
        height: Math.round(value * scaling)
    }))
}