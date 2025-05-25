"use client";
import Image from "next/image";
import { FiHeart, FiEye, FiRepeat, FiShoppingCart } from "react-icons/fi";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number | string;
  oldPrice?: string;
  description?: string;
  category?: string;
  badge?: string;
  rating?: number;
  extraInfo?: string;
  inWishlist?: boolean;
  onWishlistToggle?: () => void;
  onAddToCart?: () => void;
}

const getBadgeColor = (badge?: string) => {
  if (badge === "SALE") return "bg-red-500 text-white";
  if (badge === "NEW") return "bg-teal-500 text-white";
  return "";
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  oldPrice,
//   description,
  category,
  badge,
  rating,
  extraInfo,
  inWishlist,
  onWishlistToggle,
  onAddToCart,
}) => (
  <div className="group bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col relative transition hover:shadow-lg overflow-hidden">
    {/* Image Container */}
    <div className="relative p-4 flex items-center justify-center h-48 w-full">
      {badge && (
        <span
          className={`absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-semibold uppercase z-10 ${getBadgeColor(
            badge
          )}`}
        >
          {badge}
        </span>
      )}
      {image ? (
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className="object-contain max-h-40 transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      {/* Action Icons Overlay - Appears on Hover */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        {onWishlistToggle && (
          <button
            onClick={onWishlistToggle}
            className={`p-2 rounded bg-white border border-gray-200 text-gray-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors ${
              inWishlist ? "text-red-500" : ""
            }`}
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FiHeart
              className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`}
            />
          </button>
        )}
        <button
          className="p-2 rounded bg-white border border-gray-200 text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-colors"
          title="Quick View"
          aria-label="Quick View"
        >
          <FiEye className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded bg-white border border-gray-200 text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-colors"
          title="Compare"
          aria-label="Compare"
        >
          <FiRepeat className="w-5 h-5" />
        </button>
        {onAddToCart && (
          <button
            onClick={onAddToCart}
            className="p-2 rounded bg-white border border-gray-200 text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-colors"
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>

    {/* Content Area */}
    <div className="w-full border-t border-gray-200 p-4 text-left">
      {category && <div className="text-gray-400 text-xs mb-1">{category}</div>}
      <div
        className="font-semibold text-gray-800 text-base mb-2 truncate"
        title={name}
      >
        {name}
      </div>
      <div className="flex items-center justify-between mb-2">
        {typeof rating === "number" && (
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" />
              </svg>
            ))}
          </div>
        )}
        {extraInfo && (
          <span className="text-gray-500 text-xs">{extraInfo}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg text-primary">
          {typeof price === "number" ? `$${price.toFixed(2)}` : price}
        </span>
        {oldPrice && (
          <span className="text-sm text-gray-400 line-through">{oldPrice}</span>
        )}
      </div>
    </div>
  </div>
);

export default ProductCard;
