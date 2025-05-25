'use client'
import { useState } from "react";
import Link from "next/link";
import navData from "../data/navData";
import {
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiMapPin,
  FiPlus,
  FiMinus,
  FiPercent,
  FiCheck,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

// Helper function to render category icon
const getCategoryIcon = (icon: string) => {
  switch (icon) {
    case "cupcake":
      return <span className="text-gray-600 mr-2">🧁</span>;
    case "apple-whole":
      return <span className="text-gray-600 mr-2">🍎</span>;
    case "popcorn":
      return <span className="text-gray-600 mr-2">🍿</span>;
    case "drink-alt":
      return <span className="text-gray-600 mr-2">🥤</span>;
    default:
      return <span className="text-gray-600 mr-2">📦</span>;
  }
};

interface HeaderNavProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ setIsMobileMenuOpen }) => {
  // --- Desktop State ---
  const [activeCategory, setActiveCategory] = useState(
    navData.categories[0].id
  );
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>(
    navData.locations.current
  );

  // --- Mobile State ---
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  // Find the active category object for desktop
  const activeCategoryObj = navData.categories.find(
    (cat) => cat.id === activeCategory
  );

  const handleLocationSelect = (locationName: string) => {
    setSelectedLocation(locationName);
  };

  // Toggle mobile submenu
  const toggleMobileMenu = (title: string) => {
    setOpenMobileMenu(openMobileMenu === title ? null : title);
  };

  // Function to close mobile menu drawer
  const closeMobileDrawer = () => {
    setIsMobileMenuOpen?.(false);
    setOpenMobileMenu(null);
  };

  return (
    <div className="bg-white">
      {/* --- Desktop Navigation (Hidden on Mobile) --- */}
      <div className="hidden lg:block border-b border-gray-200">
        <div className="container relative">
          <div className="md:flex items-center justify-between">
            {/* Category Toggle */}
            <div className="relative group">
              <button
                onClick={() => setCategoryOpen(!isCategoryOpen)}
                className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium"
              >
                <FiMenu className="w-5 h-5" />
                <span>All Categories</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              <div
                className={`absolute left-0 top-full w-full md:w-[700px] bg-white shadow-lg z-50 border border-gray-200 ${
                  isCategoryOpen ? "block" : "hidden"
                }`}
              >
                <div className="flex">
                  <div className="w-1/3 bg-gray-50 border-r border-gray-200 hidden md:block">
                    <div className="flex flex-col">
                      {navData.categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={`flex items-center px-4 py-3 text-left hover:bg-gray-100 ${
                            activeCategory === category.id
                              ? "bg-white border-l-4 border-teal-500"
                              : ""
                          }`}
                        >
                          {getCategoryIcon(category.icon)}
                          <span>{category.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 p-4">
                    {activeCategoryObj && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {activeCategoryObj.subcategories.map(
                          (subcategory, index) => (
                            <div key={index}>
                              <h6 className="font-medium text-gray-900 mb-2 pb-1 border-b border-gray-200">
                                {subcategory.title}
                              </h6>
                              <ul className="space-y-1">
                                {subcategory.items.map((item, idx) => (
                                  <li key={idx}>
                                    <Link
                                      href={item.href}
                                      className="text-gray-600 hover:text-teal-600 hover:underline"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Menu */}
            <div className="flex-grow">
              <ul className="flex flex-col md:flex-row">
                {navData.mainMenu.map((item, index) => {
                  if (item.type === "link") {
                    return (
                      <li key={index} className="relative">
                        <Link
                          href={item.href || "#"}
                          className="flex items-center px-4 py-3 text-gray-700 hover:text-teal-600"
                        >
                          {item.icon === "badge-percent" && (
                            <FiPercent className="mr-1" />
                          )}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  }
                  if (item.type === "dropdown") {
                    return (
                      <li key={index} className="group relative">
                        <button className="flex items-center px-4 py-3 text-gray-700 hover:text-teal-600 group-hover:text-teal-600">
                          <span>{item.title}</span>
                          <FiChevronDown className="ml-1 w-4 h-4" />
                        </button>
                        <ul className="absolute left-0 top-full bg-white shadow-lg border border-gray-200 w-64 py-2 hidden group-hover:block z-50">
                          {item.items?.map((subitem, subIdx) => (
                            <li key={subIdx} className="relative">
                              {subitem.type === "submenu" ? (
                                <div className="group/sub relative">
                                  <button className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-50">
                                    <span>{subitem.name}</span>
                                    <FiChevronRight className="ml-1 w-4 h-4" />
                                  </button>
                                  <ul className="absolute left-full top-0 bg-white shadow-lg border border-gray-200 w-64 py-2 hidden group-hover/sub:block">
                                    {subitem.items?.map(
                                      (subsubitem, subsubIdx) => (
                                        <li key={subsubIdx}>
                                          <Link
                                            href={subsubitem.href || "#"}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                                          >
                                            {subsubitem.name}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              ) : (
                                <Link
                                  href={subitem.href || "#"}
                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                                >
                                  {subitem.name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }
                  if (item.type === "megamenu") {
                    return (
                      <li key={index} className="group static">
                        <button className="flex items-center px-4 py-3 text-gray-700 hover:text-teal-600 group-hover:text-teal-600">
                          <span>{item.title}</span>
                          <FiChevronDown className="ml-1 w-4 h-4" />
                        </button>
                        <div className="absolute left-0 right-0 bg-white shadow-lg border border-gray-200 hidden group-hover:block z-50">
                          <div className="container mx-auto p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                              {item.columns?.map((column, colIdx) => (
                                <div key={colIdx} className="space-y-4">
                                  <h3 className="font-medium text-gray-900 border-b pb-1">
                                    {column.title}
                                  </h3>
                                  <ul className="space-y-2">
                                    {column.items?.map((link, linkIdx) => (
                                      <li key={linkIdx}>
                                        <Link
                                          href={link.href || "#"}
                                          className="text-gray-600 hover:text-teal-600 hover:underline"
                                        >
                                          {link.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>

            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setLocationOpen(!isLocationOpen)}
                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-teal-600"
              >
                <FiMapPin className="text-teal-600" />
                <span>{selectedLocation}</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              <div
                className={`absolute right-0 top-full bg-white shadow-lg z-50 border border-gray-200 w-60 ${
                  isLocationOpen ? "block" : "hidden"
                }`}
              >
                <ul className="py-2">
                  <li className="flex items-center px-4 py-2 bg-gray-50 text-teal-600">
                    <FiMapPin className="mr-2" />
                    <span className="font-medium">Select Location</span>
                  </li>
                  {navData.locations.options.map((location, index) => (
                    <li key={index}>
                      <button
                        className={`flex w-full items-center px-4 py-2 hover:bg-gray-50 text-gray-700 ${
                          selectedLocation === location.name
                            ? "font-semibold text-teal-600"
                            : ""
                        }`}
                        onClick={() => {
                          handleLocationSelect(location.name);
                          setLocationOpen(false);
                          setIsMobileMenuOpen?.(false);
                        }}
                      >
                        <FiPlus className="mr-2" />
                        <span>{location.name}</span>
                        {selectedLocation === location.name && (
                          <FiCheck className="ml-auto text-teal-600" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Navigation (Visible only in Drawer) --- */}
      <div className="lg:hidden p-4">
        {/* Mobile Location Selector */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <FiMapPin className="mr-2 text-teal-600" />
            <span className="font-semibold">Location:</span>
            <span className="ml-2">{selectedLocation}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {navData.locations.options.map((loc) => (
              <button
                key={loc.name}
                className={`px-3 py-1 rounded border text-sm ${
                  selectedLocation === loc.name
                    ? "bg-teal-500 text-white border-teal-500"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => handleLocationSelect(loc.name)}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>
        <nav>
          <ul>
            {navData.mainMenu.map((item, index) => (
              <li key={index} className="mb-2 border border-gray-200 rounded">
                {item.type === "link" ? (
                  <Link
                    href={item.href || "#"}
                    onClick={closeMobileDrawer}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded"
                  >
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMobileMenu(item.title);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded focus:outline-none"
                      aria-expanded={openMobileMenu === item.title}
                    >
                      <span>{item.title}</span>
                      {openMobileMenu === item.title ? (
                        <FiMinus className="w-4 h-4 text-gray-500" />
                      ) : (
                        <FiPlus className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {/* Always render submenu wrapper for smooth transition */}
                    <div
                      className={
                        "overflow-hidden transition-all duration-300 ease-in-out " +
                        (openMobileMenu === item.title
                          ? "max-h-[1000px]"
                          : "max-h-0")
                      }
                      style={{
                        transitionProperty: "max-height",
                      }}
                    >
                      <div className="pl-4 pr-2 py-2 border-t border-gray-200 bg-gray-50">
                        <ul className="space-y-1">
                          {(
                            item.items ||
                            item.columns?.flatMap((col) => col.items) ||
                            []
                          ).map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <Link
                                href={subItem.href || "#"}
                                onClick={closeMobileDrawer}
                                className="block px-3 py-1.5 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded"
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="#"
            aria-label="Facebook"
            className="p-2 bg-gray-700 text-white rounded hover:bg-blue-600"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="p-2 bg-gray-700 text-white rounded hover:bg-sky-500"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="p-2 bg-gray-700 text-white rounded hover:bg-pink-600"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="p-2 bg-gray-700 text-white rounded hover:bg-blue-700"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
