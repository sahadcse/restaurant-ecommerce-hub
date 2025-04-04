"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMenuItems, MenuItem } from "../../../lib/api";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../../lib/cartContext";
import CartModal from "../../../components/CartModal";
import { useAuth } from "../../../lib/authContext";

export default function RestaurantMenu() {
  const { id } = useParams();
  const restaurantId = typeof id === "string" ? parseInt(id) : NaN;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { token } = useAuth();

  useEffect(() => {
    if (isNaN(restaurantId)) return;

    const fetchMenu = async () => {
      try {
        const data = await getMenuItems(restaurantId);
        setMenuItems(data);
      } catch (err) {
        console.error("Error fetching menu items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [restaurantId]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white p-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Restaurant Hub
        </Link>
        {token ? (
          <>
            <Link href="#" className="text-white hover:underline">
              Logout(coming soon)
            </Link>
            <Link href="/dashboard/menu" className="text-white hover:underline">
              Dashboard
            </Link>
          </>
        ) : (
          <Link href="/login" className="text-white hover:underline">
            Login
          </Link>
        )}
        <Link href="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 text-black">Menu</h2>
        {loading ? (
          <p className="text-gray-500">Loading menu...</p>
        ) : menuItems.length === 0 ? (
          <p className="text-gray-500">No menu items available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                {item.image_url ? (
                  <div className="relative w-full h-32 mb-4">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <h3 className="text-xl font-medium text-black">{item.name}</h3>
                <p className="text-gray-600">
                  {item.description || "No description"}
                </p>
                <p className="text-primary font-semibold mt-2">
                  ${Number(item.price).toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-4 text-center">
        <p>© 2025 Restaurant Hub. All rights reserved.</p>
      </footer>
      <CartModal />
    </div>
  );
}
