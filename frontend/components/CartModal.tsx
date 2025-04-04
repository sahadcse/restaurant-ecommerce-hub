'use client';

import { useState } from 'react';
import { useCart } from '../lib/cartContext';
import { useAuth } from '../lib/authContext';
import Image from 'next/image';

import { createOrder } from '../lib/api';

export default function CartModal() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);


  const handleCheckout = async () => {
    if (!token) {
      alert('Please log in to checkout.');
      return;
    }

    if (cart.length === 0) return;

    setIsCheckingOut(true);
    try {
      const restaurantId = cart[0].restaurant_id; // Assume all items from same restaurant
      const items = cart.map((item) => ({
        menu_item_id: item.id,
        quantity: item.quantity,
      }));
      await createOrder(restaurantId, items, total, token);
      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors"
      >
        Cart ({
          cart.reduce((sum, item) => sum + item.quantity, 0)
        })
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-black">Your Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>
            {orderSuccess ? (
              <div className="text-center">
                <p className="text-green-600 text-lg mb-4">Order placed successfully!</p>
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    setIsOpen(false);
                  }}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-black">{item.name}</h3>
                        <p className="text-gray-600">
                        ${Number(item.price).toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t pt-4">
                  <p className="text-lg font-semibold text-black">
                    Total: ${total.toFixed(2)}
                  </p>
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={clearCart}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors disabled:bg-teal-400"
                    >
                      {isCheckingOut ? 'Processing...' : 'Checkout'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}