import type { Result } from "./api.types";
import { fetchData } from "./elprisetjustnu-api/fetch-data";

export const loadData = async (): Promise<Result> => {
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
