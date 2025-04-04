import "./globals.css";
import { CartProvider } from "../lib/cartContext";
import { AuthProvider } from "../lib/authContext";

export const metadata = {
  title: "Restaurant E-Commerce Hub",
  description: "Order food from your favorite restaurants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
