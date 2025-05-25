"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react"; // Import useEffect
import { useAuth } from "../lib/authContext";
import { useCart } from "../lib/cartContext";
import { useWishlist } from "../lib/wishlistContext";
import HeaderTop from "./HeaderTop";
import HeaderNav from "./HeaderNav";
import CartModal from "./CartModal";
import headerData from "../data/headerData.json";
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";

// Reusable header with navigation links
const Header = () => {
  const { token, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Add mounted state

  // Set mounted to true only on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemCount = wishlist.length;
  const logoText = headerData.logo;

  return (
    <>
      <header className="">
        {/* Pass props to HeaderTop */}
        <HeaderTop
          onCartToggle={() => setIsCartOpen(true)}
          cartItemCount={cartItemCount}
          wishlistItemCount={wishlistItemCount} // Pass wishlist count
        />
        {/* Header Top End */}

        {/* Header Middle Section */}
        <div className="border-b border-gray-200 py-4 lg:py-0">
          <div className="container mx-auto px-4 relative">
            {/* Desktop Header Middle Start (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center justify-between py-4">
              {/* Header Logo Start */}
              <div className="header-logo">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/siteMainLogo.jpg"
                    alt={logoText || "Site Logo"}
                    width={86}
                    height={70}
                    priority // Load logo image with high priority
                    className="h-auto" // Maintain aspect ratio
                  />
                </Link>
              </div>
              {/* Header Logo End */}

              {/* Header Search Start */}
              <div className="flex-grow mx-8">
                <div className="header-search">
                  <form className="relative flex" action="#">
                    <input
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search Products..."
                      type="text"
                    />
                    <button
                      className="search_submit bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 flex items-center justify-center"
                      type="submit"
                    >
                      <FiSearch className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </div>
              {/* Header Search End */}

              {/* Header Button Start */}
              <div className="flex items-center space-x-4">
                {/* Header User Start */}
                <div className="relative group">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-blue-500"
                    title="Account"
                  >
                    <div className="header-icon mr-2">
                      <FiUser className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-medium">Account</span>
                      <span className="block text-xs text-gray-500">
                        {token ? "Manage" : "Login"}
                      </span>
                    </div>
                  </a>
                  <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-10">
                    {token ? (
                      <>
                        <li>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            My Account
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/checkout"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Checkout
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            href="/register"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Register
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/checkout"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Checkout
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                {/* Header User End */}

                {/* Header wishlist Start */}
                <Link
                  href="/wishlist"
                  className="flex items-center text-gray-700 hover:text-blue-500 relative"
                  title="Wishlist"
                >
                  <div className="header-icon mr-2 relative">
                    <FiHeart className="h-6 w-6" />
                    {/* Use mounted state for desktop badge */}
                    {mounted && wishlistItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ring-1 ring-white">
                        {wishlistItemCount}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-medium">Wishlist</span>
                    <span className="block text-xs text-gray-500">
                      {/* Use mounted state for desktop text count */}
                      <b className="font-semibold">
                        {mounted ? wishlistItemCount : 0}
                      </b>
                      -items
                    </span>
                  </div>
                </Link>
                {/* Header wishlist End */}

                {/* Header Cart Start */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center text-gray-700 hover:text-blue-500 relative cursor-pointer "
                  title="Cart"
                >
                  <div className="header-icon mr-2 relative">
                    <FiShoppingBag className="h-6 w-6" />
                    {/* Use mounted state for desktop badge */}
                    {mounted && cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ring-1 ring-white">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-medium">Cart</span>
                    <span className="block text-xs text-gray-500">
                      {/* Use mounted state for desktop text count */}
                      <b className="font-semibold">
                        {mounted ? cartItemCount : 0}
                      </b>
                      -items
                    </span>
                  </div>
                </button>
                {/* Header Cart End */}
              </div>
              {/* Header Button End */}
            </div>
            {/* Desktop Header Middle End */}

            {/* Mobile Header Middle Start (Visible on Mobile) */}
            <div className="lg:hidden text-center">
              {/* Mobile Logo */}
              <div className="header-logo mb-4">
                <Link href="/" className="inline-block">
                  <Image
                    src="/siteMainLogo.jpg"
                    alt={logoText || "Site Logo"}
                    width={86}
                    height={70}
                    priority // Load logo image with high priority
                    className="h-auto" // Maintain aspect ratio
                  />
                </Link>
              </div>
              {/* Mobile Search */}
              <div className="header-search">
                <form className="relative flex" action="#">
                  <input
                    className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Search Products..."
                    type="text"
                  />
                  <button
                    className="search_submit bg-teal-500 text-white px-3 py-2 rounded-r-md hover:bg-teal-600 flex items-center justify-center absolute right-0 top-0 bottom-0"
                    type="submit"
                    aria-label="Search"
                  >
                    <FiSearch className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
            {/* Mobile Header Middle End */}
          </div>
        </div>
        {/* Header Middle End */}

        {/* Header Nav Start */}
        <div className="hidden lg:block">
          <HeaderNav />
        </div>
        {/* Header Nav End */}
      </header>
      {/* Render CartModal, controlled by Header state */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
