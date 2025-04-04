'use client';

import { useEffect, useState } from 'react';
import { getRestaurants, Restaurant } from '../lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <h1 className="text-2xl font-bold">Restaurant Hub</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 text-black">Explore Restaurants</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : restaurants.length === 0 ? (
          <p className="text-gray-500">No restaurants available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="border border-gray-400 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                {restaurant.logo_url ? (
                  <Image
                    src={restaurant.logo_url}
                    alt={restaurant.name}
                    width={400}
                    height={128}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <h3 className="text-xl font-medium text-black">{restaurant.name}</h3>
                <p className="text-gray-600">{restaurant.location}</p>
                <Link href={`/restaurant/${restaurant.id}`}>
                  <button className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">
                    View Menu
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-4 text-center">
        <p>&copy; 2025 Restaurant Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}