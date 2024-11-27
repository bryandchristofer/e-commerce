import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/products/")) {
    const id = pathname.split("/")[2];

    if (!isNaN(id)) {
      const res = await fetch("https://fakestoreapi.com/products");
      const products = await res.json();

      const product = products.find((item) => item.id.toString() === id);

      if (product) {
        const slug = product.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        url.pathname = `/products/${slug}`;
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}
