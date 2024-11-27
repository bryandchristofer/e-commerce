"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      const productsWithSlug = data.map((product) => ({
        ...product,
        slug: generateSlug(product.title),
      }));
      setProducts(productsWithSlug);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      {/* Daftar Produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="p-4 bg-white shadow-lg rounded-md flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Gambar Produk */}
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-48 object-contain mb-4 rounded-md group-hover:scale-105 transition-transform"
              />

              {/* Nama Produk */}
              <h2 className="font-bold text-lg mb-2 line-clamp-2 min-h-[48px]">
                {product.title}
              </h2>

              {/* Harga Produk */}
              <p className="text-gray-700 text-sm mb-4">
                Rp {(product.price * 15000).toLocaleString()}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            Tidak ada produk ditemukan.
          </p>
        )}
      </div>
    </div>
  );
}
