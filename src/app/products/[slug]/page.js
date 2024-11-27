import Image from "next/image";
import ProductClient from "./ProductClient";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;
  const slug = params.slug;

  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const product = products.find((item) => generateSlug(item.title) === slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan - Mini E-Commerce",
      description: "Produk yang Anda cari tidak ditemukan.",
    };
  }

  return {
    title: `Mini E-Commerce - ${product.title}`,
    description: `Detail tentang ${product.title}. Harga: Rp ${(
      product.price * 15000
    ).toLocaleString()}`,
  };
}

export default async function ProductPage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const slug = params.slug;

  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const product = products.find((item) => generateSlug(item.title) === slug);

  if (!product) {
    return <p>Produk tidak ditemukan.</p>;
  }

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
        <ProductClient product={product} />
      </div>
    </div>
  );
}
