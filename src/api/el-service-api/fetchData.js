import { mapData } from "../mapper.js";

const endpoint = "https://electricity-service.onrender.com";
// const endpoint = "http://localhost:3000";

/**
 * @deprecated Use elpriset API instead
 */
export const fetchData = async () => {
  const response = await fetch(endpoint);
  const data = await response.json();
  // TODO UI now expects Date object instead of timestamp, so this needs to be updated in transform layer

  return mapData(data);
};
