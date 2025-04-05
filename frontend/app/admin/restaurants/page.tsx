"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../lib/authContext";
import { useRouter } from "next/navigation";
import {
  getAllRestaurantsForAdmin,
  updateStatusRestaurant,
  deleteRestaurant,
  Restaurant,
} from "../../../lib/api";
import Image from "next/image";

export default function RestaurantApprovals() {
  const { token } = useAuth();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    fetchRestaurants();
  }, [token, router]);

  const fetchRestaurants = async () => {
    if (!token) return;
    try {
      const data = await getAllRestaurantsForAdmin(token);
      setRestaurants(data);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id: number, approved: boolean) => {
    if (!token) return;
    try {
      const updated = await updateStatusRestaurant(id, { approved }, token);
      setRestaurants(restaurants.map((r) => (r.id === id ? updated : r)));
    } catch (err) {
      console.error("Error updating restaurant:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await deleteRestaurant(id, token);
      setRestaurants(restaurants.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error deleting restaurant:", err);
    }
  };

  if (!token) return null;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-black">
        Restaurant Approvals
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : restaurants.length === 0 ? (
        <p className="text-gray-500">No restaurants yet.</p>
      ) : (
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {restaurant.logo_url ? (
                  <Image
                    src={restaurant.logo_url}
                    alt={restaurant.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium text-black">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-600">{restaurant.location}</p>
                  <p className="text-gray-600">
                    Status: {restaurant.approved ? "Approved" : "Pending"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                {!restaurant.approved && (
                  <button
                    onClick={() => handleApproval(restaurant.id, true)}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(restaurant.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
