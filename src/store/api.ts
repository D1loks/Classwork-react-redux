import axios from "axios";

const api = axios.create({
  baseURL: "https://dogs.kobernyk.com/api/v1",
});
//пагінація
export const fetchDogs = async (token: string, limit = 10) => {
  const response = await api.get(`/dogs?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
// Функція для отримання собаки за ID
export const fetchDogById = async (token: string, id: string) => {
  const response = await api.get(`/dogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
