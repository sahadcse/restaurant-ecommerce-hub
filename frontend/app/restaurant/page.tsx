// Make sure this file exports a component or function
"use client";

import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { getRestaurants } from "../../lib/api";
import RestaurantCard from "@/components/RestaurantCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Restaurant {
  id: number;
  name: string;
  location: string;
  logo_url?: string;
}

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
//   const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-black">Restaurants</h1>
        {loading ? (
          <p className="text-gray-500">Loading restaurants...</p>
        ) : restaurants.length === 0 ? (
          <p className="text-gray-500">No restaurants available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}