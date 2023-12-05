import { fetchData } from "./elprisetjustnu-api/fetchData.js";

export const loadData = async () => {
  try {
    return {
      isSuccess: true,
      data: await fetchData(),
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      error: "Ошибка при загрузке данных",
    };
  }
};
