"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMenuItems, MenuItem } from "../../../lib/api";
import { useCart } from "../../../lib/cartContext";
import { useWishlist, WishlistItem } from "../../../lib/wishlistContext";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function RestaurantMenu() {
  const { id } = useParams();
  const restaurantId = typeof id === "string" ? parseInt(id) : NaN;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isItemInWishlist } = useWishlist();

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

  const handleWishlistToggle = (menuItem: MenuItem) => {
    const wishlistItem: WishlistItem = {
      id: menuItem.id,
      restaurant_id: menuItem.restaurant_id,
      name: menuItem.name,
      price: Number(menuItem.price),
      image_url: menuItem.image_url,
      description: menuItem.description,
    };

    if (isItemInWishlist(menuItem.id)) {
      removeFromWishlist(menuItem.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 text-black">Menu</h2>
        {loading ? (
          <p className="text-gray-500">Loading menu...</p>
        ) : menuItems.length === 0 ? (
          <p className="text-gray-500">No menu items available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image_url || ""}
                price={Number(item.price)}
                description={item.description}
                inWishlist={isItemInWishlist(item.id)}
                onWishlistToggle={() => handleWishlistToggle(item)}
                onAddToCart={() => addToCart(item)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
