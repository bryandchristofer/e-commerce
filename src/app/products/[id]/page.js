"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";

export default function ProductPage({ params: paramsPromise }) {
  const [product, setProduct] = useState(null);
  const [id, setId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    paramsPromise.then((params) => {
      setId(params.id);
    });
  }, [paramsPromise]);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) return <p>Memuat produk...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-contain rounded-lg"
          />
        </div>
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
      </div>
    </div>
  );
}
