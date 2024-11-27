"use client";

import { useCart } from "../../../context/CartContext";

export default function ProductClient({ product }) {
  const { addToCart } = useCart();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <p className="text-gray-600 text-lg mb-4">
        Rp {(product.price * 15000).toLocaleString()}
      </p>
      <p className="text-gray-700 mb-6">{product.description}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
}
