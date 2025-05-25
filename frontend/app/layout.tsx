import "./globals.css";
import { CartProvider } from "../lib/cartContext";
import { AuthProvider } from "../lib/authContext";
import { WishlistProvider } from "../lib/wishlistContext";

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.4.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.4.0/uicons-brands/css/uicons-brands.css"
        ></link>
      </head>
      <body className="font-sans">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
