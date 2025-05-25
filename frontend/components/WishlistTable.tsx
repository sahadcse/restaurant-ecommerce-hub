import Image from "next/image";
import { FiX, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import { WishlistItem } from "../lib/wishlistContext"; // Import updated WishlistItem

interface WishlistTableProps {
  items: WishlistItem[];
  onAddToCart: (item: WishlistItem) => void;
  onDelete: (id: number) => void;
}

const WishlistTable: React.FC<WishlistTableProps> = ({
  items,
  onAddToCart,
  onDelete,
}) => {
  // Track which images failed to load
  const [imageErrorIds, setImageErrorIds] = useState<number[]>([]);

  const handleImageError = (id: number) => {
    setImageErrorIds((prev) => [...prev, id]);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow-sm hidden sm:table">
        <thead>
          <tr className="border-b border-gray-400">
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Image
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Price
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-400 last:border-b-0"
            >
              <td className="px-4 py-3">
                <div className="w-10 h-10 relative flex items-center justify-center">
                  {item.image_url && !imageErrorIds.includes(item.id) ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-contain"
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded text-gray-600 font-bold text-base uppercase">
                      {item.name.split(" ")[0][0]}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">{item.name}</td>
              <td className="px-4 py-3">${item.price.toFixed(2)}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    className="bg-green-400 hover:bg-green-500 text-white rounded p-2"
                    title="Add to Cart"
                    onClick={() => onAddToCart(item)}
                  >
                    <FiShoppingCart />
                  </button>
                  <button
                    className="bg-gray-700 hover:bg-gray-800 text-white rounded p-2"
                    title="Delete"
                    onClick={() => onDelete(item.id)}
                  >
                    <FiX />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile layout */}
      <div className="sm:hidden flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded p-3 flex flex-col gap-2 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative flex-shrink-0 flex items-center justify-center">
                {item.image_url && !imageErrorIds.includes(item.id) ? (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="object-contain rounded"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded text-gray-600 font-bold text-lg uppercase">
                    {item.name.split(" ")[0][0]}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-700">{item.name}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-bold text-green-400">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="flex-1 bg-green-400 hover:bg-green-500 text-white rounded py-2 flex items-center justify-center gap-1"
                title="Add to Cart"
                onClick={() => onAddToCart(item)}
              >
                <FiShoppingCart />
                <span className="text-sm">Add to Cart</span>
              </button>
              <button
                className="flex-1 bg-gray-700 hover:bg-gray-800 text-white rounded py-2 flex items-center justify-center gap-1"
                title="Delete"
                onClick={() => onDelete(item.id)}
              >
                <FiX />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistTable;
