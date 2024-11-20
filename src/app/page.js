import Link from "next/link";

export default async function HomePage() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="p-4 bg-white shadow-lg rounded-md flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 group"
        >
          {/* Gambar Produk */}
          <img
            src={product.image}
            alt={product.title}
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
      ))}
    </div>
  );
}
