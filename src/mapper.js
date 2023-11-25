const HOURS_OFFSET = 2

export const mapData = (data) => {
  const hour = new Date().getHours()
  const hourIndex = data.findIndex(item => item.hour === hour)
  const slice = data.slice(hourIndex > HOURS_OFFSET ? hourIndex - HOURS_OFFSET : 0)

  const prices = slice.map(({ price }) => price)

  const maxValue = Math.max(...prices)
  const limit = 90
  const scaling = limit / maxValue

  return slice.map(item => ({
    ...item,
    height: Math.round(item.price * scaling)
  }))
}
