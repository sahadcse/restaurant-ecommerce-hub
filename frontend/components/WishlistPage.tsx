"use client";
import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb";
import WishlistTable from "./WishlistTable"; // Remove WishlistItem import if not needed directly
import { useCart } from "../lib/cartContext";
import { useWishlist, WishlistItem } from "../lib/wishlistContext"; // Keep WishlistItem import here

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Wishlist Page" },
];

const WishlistPage = () => {
  // Use global wishlist state and actions
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Remove from wishlist after adding to cart
  const handleAddToCart = (item: WishlistItem) => {
    // Transform WishlistItem to match the MenuItem interface for cart
    const cartItem = {
      id: item.id,
      restaurant_id: item.restaurant_id, // Use restaurant_id from wishlist item
      name: item.name,
      price: item.price, // Use numeric price directly
      image_url: item.image_url, // Map image_url
      description: item.description, // Map description
      quantity: 1,
    };

    addToCart(cartItem); // Add to cart with quantity 1
    removeFromWishlist(item.id); // Remove from global wishlist
  };

  const handleDelete = (id: number) => {
    removeFromWishlist(id); // Use global remove action
  };

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <Breadcrumb items={breadcrumbItems} className="mb-4 sm:mb-8" />
      <div className="bg-white rounded shadow p-4 sm:p-8 max-w-full sm:max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-1">
              Product <span className="text-green-400">Wishlist</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Your product wish is our first priority.
            </p>
          </div>
          <button className="w-full sm:w-44 bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded">
            Shop Now
          </button>
        </div>
        <div className="border border-gray-300 rounded">
          <div className="p-2 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-4">
              WISHLIST ({wishlist.length}) {/* Optionally display count here */}
            </h3>
            <WishlistTable
              items={wishlist} // Use global wishlist items
              onAddToCart={handleAddToCart}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
