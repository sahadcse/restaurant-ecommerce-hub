"use client";

import Image from "next/image";
import Link from "next/link";

interface RestaurantProps {
  restaurant: {
    id: number;
    name: string;
    location: string;
    logo_url?: string;
  };
}

export default function RestaurantCard({ restaurant }: RestaurantProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`} passHref>
      <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
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
            <h3 className="text-lg font-medium text-black">{restaurant.name}</h3>
            <p className="text-gray-600">{restaurant.location}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}