"use client";

import Link from "next/link";
import Cart from "./Cart";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo atau Judul */}
      <Link href="/" className="font-bold text-xl">
        Mini E-Commerce
      </Link>

      {/* Dropdown Keranjang */}
      <Cart />
    </nav>
  );
}
