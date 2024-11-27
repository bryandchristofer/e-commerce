import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Mini E-Commerce",
  description: "Belanja produk terbaik di toko online kami!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <CartProvider>
          <Navbar />
          <main className="p-4">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
