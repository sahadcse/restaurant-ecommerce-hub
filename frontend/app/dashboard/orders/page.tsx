'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../lib/authContext';
import { useRouter } from 'next/navigation';
import { getRestaurantOrders, updateOrderStatus, Order, getRestaurantByOwner } from '../../../lib/api';

export default function OrderManagement() {
  const { token } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    const fetchRestaurantAndOrders = async () => {
      try {
        const restaurant = await getRestaurantByOwner(token);
        setRestaurantId(restaurant.id);
        const data = await getRestaurantOrders(restaurant.id, token);
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurantAndOrders();
  }, [token, router]);

  const handleStatusChange = async (orderId: number, newStatus: Order['status']) => {
    if (!token || !restaurantId) return;
    try {
      const updated = await updateOrderStatus(orderId, newStatus, token);
      setOrders(orders.map((order) => (order.id === orderId ? updated : order)));
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  if (!token || !restaurantId) return null;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-black">Order Management</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-medium text-black">Order #{order.id}</h3>
                <p className="text-gray-600">Total: ${Number(order.total).toFixed(2)}</p>
                <p className="text-gray-600">Placed: {new Date(order.created_at).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as Order['status'])
                  }
                  className="p-2 border rounded text-black"
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}