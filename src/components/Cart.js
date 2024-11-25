"use client";

import { useCart } from "../context/CartContext";
import { useState, useEffect, useRef } from "react";

export default function Cart() {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef();

  // Tutup pop-up keranjang jika klik di luar
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

  return (
    <div className="relative" ref={cartRef}>
      {/* Tombol Keranjang */}
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

      {/* Pop-Up Keranjang */}
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-50">
          <h2 className="text-lg font-bold mb-4">Keranjang</h2>
          {cart.length > 0 ? (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    {/* Gambar Produk */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Rp {(item.price * 15000).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Kuantitas: {item.quantity}
                      </p>
                    </div>
                  </div>
                  {/* Tombol Tambah dan Kurangi */}
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
          ) : (
            <p className="text-gray-500">Keranjang kosong</p>
          )}
        </div>
      )}
    </div>
  );
}
