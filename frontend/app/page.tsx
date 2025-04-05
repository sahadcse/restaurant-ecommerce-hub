"use client";

import { useEffect, useState } from "react";
import { getRestaurants, Restaurant } from "../lib/api";
import Image from "next/image";
import Link from "next/link";
import CartModal from "../components/CartModal";

import { useAuth } from "../lib/authContext";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Restaurant Hub</h1>
        <div className="flex gap-4">
          <Link href="/dashboard/orders" className="text-primary hover:underline">
            OrdersRES
          </Link>
          {token ? (
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          )}
          <Link
            href="/admin/restaurants"
            className="text-primary hover:underline"
          >
            Admin
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {token && (
          <p className="text-lg text-gray-700 mb-4">
            Welcome back! Explore your favorite restaurants.
          </p>
        )}
        <h2 className="text-3xl font-semibold mb-6 text-black">
          Explore Restaurants
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : restaurants.length === 0 ? (
          <p className="text-gray-500">No restaurants available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                {restaurant.logo_url ? (
                  <Image
                    src={restaurant.logo_url}
                    alt={restaurant.name}
                    width={300}
                    height={128}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <h3 className="text-xl font-medium text-black">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600">{restaurant.location}</p>
                <Link href={`/restaurant/${restaurant.id}`}>
                  <button className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">
                    View Menu
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="bg-black text-white p-4 text-center">
        <p>© 2025 Restaurant Hub. All rights reserved.</p>
      </footer>
      <CartModal />
    </div>
  );
}
