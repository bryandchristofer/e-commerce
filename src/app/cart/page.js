"use client";

import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="p-4 bg-white shadow-md rounded mb-2">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <h2>{item.title}</h2>
              <p>Rp {(item.price * 15000).toLocaleString()}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Hapus
              </button>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Kosongkan Keranjang
          </button>
        </div>
      ) : (
        <p>Keranjang Anda kosong.</p>
      )}
    </div>
  );
}
