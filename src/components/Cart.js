"use client";

import { useCart } from "../context/CartContext";
import { useState, useEffect, useRef } from "react";

export default function Cart() {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  return (
    <div className="relative" ref={cartRef}>
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="relative focus:outline-none"
      >
        Keranjang
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg p-6 z-50">
          <h2 className="text-lg font-bold mb-4">Keranjang</h2>
          {cart.length > 0 ? (
            <div>
              <ul className="space-y-4 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-bold">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          {formatCurrency(item.price * 15000)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Kuantitas: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-gray-300 text-gray-700 px-2 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-gray-300 text-gray-700 px-2 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t mt-4 pt-4">
                <p className="text-right text-lg font-bold">
                  Total: {formatCurrency(totalPrice * 15000)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Keranjang kosong</p>
          )}
        </div>
      )}
    </div>
  );
}
