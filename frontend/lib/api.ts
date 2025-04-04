import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.103:3001", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  logo_url?: string;
  owner_id: number;
  approved: boolean;
}

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get<Restaurant[]>("/restaurants");
  return response.data;
};

export default api;
