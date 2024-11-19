import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";

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
