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

export interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
}

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get<Restaurant[]>('/restaurants');
  return response.data;
};

export const getMenuItems = async (restaurantId: number): Promise<MenuItem[]> => {
  const response = await api.get<MenuItem[]>(`/menu/${restaurantId}`);
  return response.data;
};

export interface Order {
  id: number;
  user_id: number;
  restaurant_id: number;
  status: 'pending' | 'preparing' | 'shipped' | 'delivered';
  total: number;
  created_at: string;
}


export const createOrder = async (
  restaurantId: number,
  items: { menu_item_id: number; quantity: number }[],
  total: number,
  token: string
): Promise<Order> => {
  const response = await api.post<Order>(
    '/orders',
    { restaurant_id: restaurantId, items, total },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log('Order response:', response);
  return response.data;
};

export default api;