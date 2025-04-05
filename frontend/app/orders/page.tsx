"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../lib/authContext";
import { useRouter } from "next/navigation";
import { getCustomerOrders, Order } from "../../lib/api";
import Link from "next/link";

export default function OrderHistory() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    fetchOrders();
  }, [token, router]);

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const data = await getCustomerOrders(token);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Restaurant Hub</h1>
        <div className="flex gap-4">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <button onClick={logout} className="text-red-400 hover:text-red-300">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 text-black">Your Orders</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">You haven’t placed any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-medium text-black">
                    Order #{order.id}
                  </h3>
                  <p className="text-gray-600">
                    Total: ${Number(order.total).toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    Placed: {new Date(order.created_at).toLocaleString()}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      order.status === "delivered"
                        ? "text-green-600"
                        : order.status === "shipped"
                        ? "text-blue-600"
                        : order.status === "preparing"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    Status: {order.status}
                  </p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">
                  View Details (Coming Soon)
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="bg-black text-white p-4 text-center">
        <p>© 2025 Restaurant Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
