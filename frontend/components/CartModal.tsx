"use client";

import { useState, useEffect } from "react";
import { useCart } from "../lib/cartContext";
import { useAuth } from "../lib/authContext";
import Image from "next/image";
import Link from "next/link";
import { createOrder } from "../lib/api";
import { FiX } from "react-icons/fi";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const { token } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOrderSuccess(false);
    }
  }, [isOpen]);

  const subTotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const vatRate = 0.2;
  const vatAmount = subTotal * vatRate;
  const total = subTotal + vatAmount;

  const handleCheckout = async () => {
    if (!token) {
      alert("Please log in to checkout.");
      onClose();
      return;
    }

    if (cart.length === 0) return;

    setIsCheckingOut(true);
    try {
      const restaurantId = cart[0].restaurant_id;
      const items = cart.map((item) => ({
        menu_item_id: item.id,
        quantity: item.quantity,
      }));
      await createOrder(restaurantId, items, subTotal, token);
      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      addToCart({ ...item, quantity: newQuantity });
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm md:max-w-md lg:w-[25%] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-black">My Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            <FiX />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {orderSuccess ? (
            <div className="text-center flex flex-col items-center justify-center h-full">
              <p className="text-green-600 text-lg mb-4">
                Order placed successfully!
              </p>
              <button
                onClick={() => {
                  setOrderSuccess(false);
                  onClose();
                }}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border border-gray-200 p-3 rounded-md relative"
                >
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg"
                    title="Remove item"
                  >
                    <FiX />
                  </button>
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-medium text-black leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ${Number(item.price).toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center border border-gray-200 rounded w-fit mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-gray-600 px-2 py-0.5 rounded-l hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-gray-600 px-2 py-0.5 rounded-r hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!orderSuccess && cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 space-y-3">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Sub-Total:</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>VAT ({(vatRate * 100).toFixed(0)}%):</span>
              <span>${vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-black">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/cart" passHref>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  VIEW CART
                </button>
              </Link>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm font-medium"
              >
                {isCheckingOut ? "PROCESSING..." : "CHECKOUT"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
