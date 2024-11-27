"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../../../context/CartContext";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export default function ProductPage({ params: paramsPromise }) {
  const [product, setProduct] = useState(null);
  const [slug, setSlug] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    paramsPromise.then((params) => {
      setSlug(params.slug);
    });
  }, [paramsPromise]);

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();

        const matchedProduct = products.find(
          (item) => generateSlug(item.title) === slug
        );

        if (matchedProduct) {
          setProduct(matchedProduct);
        } else {
          console.error("Produk tidak ditemukan.");
        }
      };

      fetchProduct();
    }
  }, [slug]);

  if (!product) return <p>Memuat produk...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gambar Produk */}
        <div className="flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="w-full h-80 object-contain rounded-lg"
          />
        </div>
        {/* Detail Produk */}
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
