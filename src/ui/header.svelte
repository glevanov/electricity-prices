<script>
  export let today

  const now = new Date()
  const hour = now.getHours()
  const price = today.points.find(point => point.hour === hour).price

  const formatHour = hour => hour < 10 ? `0${hour}` : String(hour)
  
  const start = `${formatHour(hour)}:00`
  const end = `${formatHour(hour + 1)}:00`
</script>

<style>
  .price {
    font-weight: bold;
  }

  .subHeader {
    display: block;

    color: var(--sub-text-color);
    font-size: 16px;
  }
</style>

<div class="header">
  <span class="price">{price} эре</span> за киловатт-час
  <div class="subHeader">в Мальмё на {start}-{end}</div>
</div>
