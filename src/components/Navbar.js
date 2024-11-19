"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <Link href="/" className="font-bold text-xl">
        Mini E-Commerce
      </Link>
      <Link href="/cart" className="relative">
        Keranjang
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  );
}
