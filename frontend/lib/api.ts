import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.102:3001", // Backend URL
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

export const createMenuItem = async (
  restaurantId: number,
  item: Omit<MenuItem, 'id' | 'restaurant_id'>,
  token: string
): Promise<MenuItem> => {
  const response = await api.post<MenuItem>(
    '/menu',
    { restaurant_id: restaurantId, ...item },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const updateMenuItem = async (
  id: number,
  item: Omit<MenuItem, 'id' | 'restaurant_id'>,
  token: string
): Promise<MenuItem> => {
  const response = await api.put<MenuItem>(
    `/menu/${id}`,
    item,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deleteMenuItem = async (id: number, token: string): Promise<void> => {
  await api.delete(`/menu/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const getRestaurantOrders = async (
  restaurantId: number,
  token: string
): Promise<Order[]> => {
  const response = await api.get<Order[]>(`/orders/restaurant/${restaurantId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateOrderStatus = async (
  orderId: number,
  status: 'pending' | 'preparing' | 'shipped' | 'delivered',
  token: string
): Promise<Order> => {
  const response = await api.put<Order>(
    `/orders/${orderId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getRestaurantByOwner = async (token: string): Promise<Restaurant> => {
  const response = await api.get<Restaurant[]>('/restaurants', {
    headers: { Authorization: `Bearer ${token}` },
  });
  // Assume first restaurant belongs to the owner (simplified for now)
  return response.data.find((r) => !r.approved) || response.data[0];
};

export const getAllRestaurantsForAdmin = async (token: string): Promise<Restaurant[]> => {
  const response = await api.get<Restaurant[]>('/restaurants/restaurantsAdmin', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Admin sees all restaurants
};

export const updateRestaurant = async (
  id: number,
  data: Partial<Restaurant>,
  token: string
): Promise<Restaurant> => {
  const response = await api.put<Restaurant>(`/restaurants/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update restaurant details (admin only) "/:id/approve" const { approved } = req.body;
export const updateStatusRestaurant = async (
  id: number,
  data: { approved: boolean },
  token: string
): Promise<Restaurant> => {
  const response = await api.put<Restaurant>(`/restaurants/${id}/approve`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}



export const deleteRestaurant = async (id: number, token: string): Promise<void> => {
  await api.delete(`/restaurants/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

export default api;