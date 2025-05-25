// frontend/lib/cartContext.tsx
// This file provides a context for managing the shopping cart in the application.
// It includes functionality to add, remove, and clear items in the cart, 
// as well as a custom hook for accessing the cart context.

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem } from "./api";

// Interfaces
interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem & { quantity?: number }) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

// Context creation
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart
  const addToCart = (item: MenuItem & { quantity?: number }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: item.quantity ?? i.quantity + 1 } // Use provided quantity or increment
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity ?? 1 }]; // Default to 1 if no quantity provided
    });
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook for consuming the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
