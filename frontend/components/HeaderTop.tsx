"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import headerData from "../data/headerData.json";
import HeaderNav from "./HeaderNav"; // Import HeaderNav
// import { useWishlist } from "../lib/wishlistContext"; // Import useWishlist
import {
  FiPhoneCall,
  FiUser,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiChevronDown,
  FiChevronUp,
  FiX,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

interface Language {
  code: string;
  name: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface HeaderTopProps {
  onCartToggle: () => void;
  cartItemCount: number;
  wishlistItemCount: number; // Add wishlist count prop
}

const languages: Language[] = headerData.languages;
const currencies: Currency[] = headerData.currencies;
const phone: string = headerData.phone;
const whatsapp: string = headerData.whatsapp;
const topMessage: string = headerData.topMessage;

const HeaderTop: React.FC<HeaderTopProps> = ({
  onCartToggle,
  cartItemCount,
  wishlistItemCount, // Destructure wishlist count
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(languages[0]);
  const [selectedCurr, setSelectedCurr] = useState<Currency>(currencies[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Add mounted state

  const handleLangSelect = (lang: Language) => {
    setSelectedLang(lang);
    setIsLangOpen(false);
  };

  const handleCurrSelect = (curr: Currency) => {
    setSelectedCurr(curr);
    setIsCurrOpen(false);
  };

  // Effect to handle body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Revert to default
    }

    // Cleanup function to ensure style is removed if component unmounts while open
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]); // Dependency array ensures this runs when isMobileMenuOpen changes

  // Set mounted to true only on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="header-top bg-white py-2 text-sm border-b lg:border-none lg:bg-gray-100 lg:py-1">
      <div className="container mx-auto px-4">
        {/* Header Top Bar Start */}
        <div className="flex items-center justify-between lg:justify-start">
          {/* Mobile Menu Toggle Button - Moved to the left */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="gi-header-btn gi-site-menu-icon text-gray-700 hover:text-blue-600"
              title="Menu"
              aria-label="Open menu"
            >
              <FiMenu className="text-2xl" />
            </button>
          </div>

          {/* Desktop Top Left Section */}
          <div className="flex-1 text-left hidden lg:block">
            <div className="header-top-social">
              <ul className="m-0 p-0 list-none flex space-x-4">
                <li className="inline-block">
                  <a
                    href={`tel:${phone}`}
                    className="text-gray-700 hover:text-blue-600 flex items-center"
                  >
                    <FiPhoneCall className="mr-1" />
                    {phone}
                  </a>
                </li>
                <li className="inline-block">
                  <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-green-600 flex items-center"
                  >
                    <FaWhatsapp className="mr-1" />
                    {whatsapp}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop Top Center Message */}
          <div className="hidden lg:flex flex-1 text-center">
            <div className="header-top-message text-gray-800 font-medium">
              {topMessage}
            </div>
          </div>

          {/* Desktop Top Right Section */}
          <div className="flex-1 hidden lg:block">
            <div className="flex justify-end items-center space-x-4">
              <Link
                className="gi-help text-gray-700 hover:text-blue-600"
                href="/faq"
              >
                Help?
              </Link>
              <Link
                className="gi-help text-gray-700 hover:text-blue-600"
                href="/track-order"
              >
                Track Order?
              </Link>
              <div
                className="relative border border-gray-300 rounded px-2 py-1 cursor-pointer"
                onMouseEnter={() => {
                  setIsLangOpen(true);
                  setIsCurrOpen(false);
                }}
                onMouseLeave={() => setIsLangOpen(false)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={isLangOpen}
                  className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  {selectedLang.name}
                  {isLangOpen ? (
                    <FiChevronUp className="ml-1" />
                  ) : (
                    <FiChevronDown className="ml-1" />
                  )}
                </button>
                <ul
                  className={`absolute right-0 mt-1.5 w-28 bg-white shadow-md rounded py-1 z-50 ${
                    isLangOpen ? "block" : "hidden"
                  }`}
                >
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      className={
                        selectedLang.code === lang.code
                          ? "active bg-gray-100"
                          : ""
                      }
                    >
                      <a
                        className="block px-4 py-1 text-gray-700 hover:bg-gray-100"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLangSelect(lang);
                        }}
                      >
                        {lang.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="relative border border-gray-300 rounded px-2 py-1 cursor-pointer"
                onMouseEnter={() => {
                  setIsCurrOpen(true);
                  setIsLangOpen(false);
                }}
                onMouseLeave={() => setIsCurrOpen(false)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={isCurrOpen}
                  className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  {selectedCurr.name}
                  {isCurrOpen ? (
                    <FiChevronUp className="ml-1" />
                  ) : (
                    <FiChevronDown className="ml-1" />
                  )}
                </button>
                <ul
                  className={`absolute right-0 mt-1.5 w-28 bg-white shadow-md rounded py-1 z-50 ${
                    isCurrOpen ? "block" : "hidden"
                  }`}
                >
                  {currencies.map((curr) => (
                    <li
                      key={curr.code}
                      className={
                        selectedCurr.code === curr.code
                          ? "active bg-gray-100"
                          : ""
                      }
                    >
                      <a
                        className="block px-4 py-1 text-gray-700 hover:bg-gray-100"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCurrSelect(curr);
                        }}
                      >
                        {curr.name} {curr.symbol}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Header Buttons - Moved to the right */}
          <div className="lg:hidden">
            <div className="gi-header-buttons">
              <div className="flex justify-end items-center space-x-4">
                <Link
                  href="/login"
                  className="gi-header-btn gi-header-user relative text-gray-700 hover:text-blue-600"
                  title="Account"
                >
                  <div className="header-icon text-2xl">
                    <FiUser />
                  </div>
                </Link>

                {/* Wishlist button - Added back for mobile */}
                <Link
                  href="/wishlist"
                  className="gi-header-btn gi-wish-toggle relative text-gray-700 hover:text-red-600"
                  title="Wishlist"
                >
                  <div className="header-icon text-2xl relative">
                    <FiHeart />
                    {mounted &&
                      wishlistItemCount > 0 && ( // Conditionally render count badge
                        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                          {wishlistItemCount} {/* Display dynamic count */}
                        </span>
                      )}
                  </div>
                </Link>

                <button
                  onClick={onCartToggle}
                  className="gi-header-btn gi-cart-toggle relative text-gray-700 hover:text-green-600"
                  title="Cart"
                >
                  <div className="header-icon text-2xl relative">
                    <FiShoppingBag />
                    {mounted && cartItemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (always rendered for smooth transition) */}
      <div className="lg:hidden fixed min-w-full inset-0 z-50 pointer-events-none">
        {/* Overlay */}
        <div
          className={
            "fixed inset-0 bg-black bg-opacity-80 transition-opacity duration-300 " +
            (isMobileMenuOpen
              ? "opacity-80 pointer-events-auto"
              : "opacity-0 pointer-events-none")
          }
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
          }}
          aria-hidden={!isMobileMenuOpen}
        ></div>
        {/* Drawer */}
        <div
          className={
            "fixed left-0 top-0 bg-white h-full w-[300px] max-w-[85%] overflow-y-auto p-0 shadow-xl z-50 " +
            "transform transition-transform duration-300 ease-in-out " +
            (isMobileMenuOpen ? "translate-x-0" : "-translate-x-full") +
            " pointer-events-auto"
          }
          onClick={(e) => e.stopPropagation()}
          aria-hidden={!isMobileMenuOpen}
        >
          {/* Menu Header */}
          <div className="flex justify-between items-center mb-0 pb-3 pt-4 px-4 border-b border-gray-200">
            <div className="font-semibold text-lg text-gray-800">My Menu</div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-500 hover:text-red-600"
              aria-label="Close menu"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          {/* Desktop Top Right Section for mobile */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex flex-col gap-2">
              <Link
                className="gi-help text-gray-700 hover:text-blue-600"
                href="/faq"
              >
                Help?
              </Link>
              <Link
                className="gi-help text-gray-700 hover:text-blue-600"
                href="/track-order"
              >
                Track Order?
              </Link>
              <div className="flex gap-2">
                {/* Language Dropdown */}
                <div className="relative flex-1">
                  <button
                    aria-haspopup="true"
                    aria-expanded={isLangOpen}
                    className="w-full flex items-center justify-between border border-gray-300 rounded px-2 py-1 text-gray-700 hover:text-blue-600 focus:outline-none"
                    onClick={() => {
                      setIsLangOpen((v) => !v);
                      setIsCurrOpen(false);
                    }}
                  >
                    {selectedLang.name}
                    {isLangOpen ? (
                      <FiChevronUp className="ml-1" />
                    ) : (
                      <FiChevronDown className="ml-1" />
                    )}
                  </button>
                  {isLangOpen && (
                    <ul className="absolute left-0 mt-1.5 w-full bg-white shadow-md rounded py-1 z-50">
                      {languages.map((lang) => (
                        <li
                          key={lang.code}
                          className={
                            selectedLang.code === lang.code
                              ? "active bg-gray-100"
                              : ""
                          }
                        >
                          <a
                            className="block px-4 py-1 text-gray-700 hover:bg-gray-100"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLangSelect(lang);
                              setIsLangOpen(false);
                            }}
                          >
                            {lang.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Currency Dropdown */}
                <div className="relative flex-1">
                  <button
                    aria-haspopup="true"
                    aria-expanded={isCurrOpen}
                    className="w-full flex items-center justify-between border border-gray-300 rounded px-2 py-1 text-gray-700 hover:text-blue-600 focus:outline-none"
                    onClick={() => {
                      setIsCurrOpen((v) => !v);
                      setIsLangOpen(false);
                    }}
                  >
                    {selectedCurr.name}
                    {isCurrOpen ? (
                      <FiChevronUp className="ml-1" />
                    ) : (
                      <FiChevronDown className="ml-1" />
                    )}
                  </button>
                  {isCurrOpen && (
                    <ul className="absolute left-0 mt-1.5 w-full bg-white shadow-md rounded py-1 z-50">
                      {currencies.map((curr) => (
                        <li
                          key={curr.code}
                          className={
                            selectedCurr.code === curr.code
                              ? "active bg-gray-100"
                              : ""
                          }
                        >
                          <a
                            className="block px-4 py-1 text-gray-700 hover:bg-gray-100"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleCurrSelect(curr);
                              setIsCurrOpen(false);
                            }}
                          >
                            {curr.name} {curr.symbol}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Integrate HeaderNav for mobile */}
          <HeaderNav
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
