"use client";

import { useEffect, useState } from "react";
import { getRestaurants, Restaurant } from "../lib/api";
import Image from "next/image";
import Link from "next/link";
// import CartModal from "../components/CartModal";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useAuth } from "../lib/authContext";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

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
      {/* Header */}
      <Header />

      {/* Main content */}
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
                {restaurant? (
                  <Image
                    src={"/placeholder-image.jpg"}
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
                  <button className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors cursor-pointer">
                    View Menu
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      {/* <CartModal /> */}
    </div>
  );
}
