import Link from "next/link";

export default async function HomePage() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 bg-white shadow-lg rounded-md flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain mb-4 rounded-md"
          />
          <h2 className="font-bold text-lg mb-2 line-clamp-2">
            {product.title}
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            Rp {(product.price * 15000).toLocaleString()}
          </p>
          <Link
            href={`/products/${product.id}`}
            className="mt-auto bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600 transition-colors"
          >
            Lihat Detail
          </Link>
        </div>
      ))}
    </div>
  );
}
