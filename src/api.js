const endpoint = 'https://electricity-service.onrender.com'

export const loadData = async () => {
	try {
		const response = await fetch(endpoint)
    return {
      isSuccess: true,
      data: await response.json()
    }
	} catch (error) {
    console.error(error)
    return {
      isSuccess: false,
      error: 'Ошибка при загрузке данных'
    }
  }
}
