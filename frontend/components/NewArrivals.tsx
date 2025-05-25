"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useWishlist, WishlistItem } from "../lib/wishlistContext";
import { useCart } from "../lib/cartContext";

interface Product {
  id: number;
  image: string;
  badge?: "SALE" | "NEW";
  category: string;
  name: string;
  rating: number;
  price: string;
  oldPrice?: string;
  extraInfo?: string;
}

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToWishlist, removeFromWishlist, isItemInWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    import("@/data/newArrivals.json")
      .then((mod) => setProducts((mod.default || mod) as Product[]))
      .catch(() => setProducts([]));
  }, []);

  const handleWishlistToggle = (product: Product) => {
    const wishlistItem: WishlistItem = {
      id: product.id,
      restaurant_id: 0, // Assuming 0 is a valid placeholder or default
      name: product.name,
      price:
        typeof product.price === "string" && product.price.startsWith("$")
          ? parseFloat(product.price.replace("$", ""))
          : Number(product.price),
      image_url: product.image,
      description: undefined,
    };
    if (isItemInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      restaurant_id: 0, // Assuming 0 is a valid placeholder or default
      name: product.name,
      price:
        typeof product.price === "string" && product.price.startsWith("$")
          ? parseFloat(product.price.replace("$", ""))
          : Number(product.price),
      image_url: product.image,
      description: undefined,
      quantity: 1,
    };
    addToCart(cartItem);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700">
            New <span className="text-teal-500">Arrivals</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Browse The Collection of Top Products
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              oldPrice={product.oldPrice}
              description={undefined}
              category={product.category}
              badge={product.badge}
              rating={product.rating}
              extraInfo={product.extraInfo}
              inWishlist={isItemInWishlist(product.id)}
              onWishlistToggle={() => handleWishlistToggle(product)}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
