export const mapData = (data) => {
  const prices = data.map(({ price }) => price)

  const maxValue = Math.max(...prices)
  const limit = 90
  const scaling = limit / maxValue

  return data.map(item => ({
    ...item,
    height: Math.round(item.price * scaling)
  }))
}
