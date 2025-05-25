import React from "react";
import Link from "next/link";
import Image from "next/image";
import footerData from "../data/footerData";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGooglePlay,
  FaApple,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
  FaCcAmex,
  FaCreditCard,
} from "react-icons/fa";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";

// Theme constants
const theme = footerData.theme;

// Icon mapping for social icons
const getSocialIcon = (icon: string) => {
  switch (icon) {
    case "facebook":
      return <FaFacebookF />;
    case "twitter":
      return <FaTwitter />;
    case "linkedin":
      return <FaLinkedinIn />;
    case "instagram":
      return <FaInstagram />;
    default:
      return null;
  }
};

// Icon mapping for contact icons
const getContactIcon = (icon: string) => {
  switch (icon) {
    case "address":
      return <FaLocationDot className={`text-[${theme.primary}] text-xl`} />;
    case "phone":
      return <FaPhone className={`text-[${theme.primary}] text-xl`} />;
    case "email":
      return <FaEnvelope className={`text-[${theme.primary}] text-xl`} />;
    default:
      return null;
  }
};

// Icon mapping for app store icons
const getAppStoreIcon = (icon: string) => {
  switch (icon) {
    case "google-play":
      return <FaGooglePlay className="text-white text-xl" />;
    case "app-store":
      return <FaApple className="text-white text-xl" />;
    default:
      return null;
  }
};

// Add payment icon mapping function
const getPaymentIcon = (icon: string) => {
  switch (icon) {
    case "visa":
      return <FaCcVisa className="text-blue-600 text-2xl" />;
    case "mastercard":
      return <FaCcMastercard className="text-[#eb001b] text-2xl" />;
    case "paypal":
      return <FaCcPaypal className="text-[#0070ba] text-2xl" />;
    case "stripe":
      return <FaCcStripe className="text-purple-500 text-2xl" />;
    case "amex":
      return <FaCcAmex className="text-blue-500 text-2xl" />;
    case "electron":
      return <FaCreditCard className="text-gray-600 text-2xl" />;
    default:
      return <FaCreditCard className="text-gray-600 text-2xl" />;
  }
};

const Footer = () => (
  <>
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100 box-border">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 gap-8">
        {/* Logo, Description, App Stores - wider column (4/12) */}
        <div className="col-span-11 lg:col-span-3 space-y-6 ">
          <div className="flex items-center">
            <Image
              src={footerData.logo.image}
              alt={footerData.logo.alt}
              width={footerData.logo.width}
              height={footerData.logo.height}
              priority
            />
            <span className="text-3xl font-bold text-gray-700 ml-2">
              {footerData.logo.text}
            </span>
          </div>
          <p className={`text-${theme.textLight} text-base leading-relaxed`}>
            {footerData.description}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {footerData.appStores.map((store) => (
              <a
                key={store.name}
                href={store.href}
                className={`flex items-center bg-[#495057] hover:bg-[#4db6ac] transition duration-200 ease-in-out rounded-md px-3 py-2 group`}
                style={{ minWidth: 120 }} // Adjusted minWidth if needed
                aria-label={`Download on ${store.bottomText}`}
              >
                <span className="mr-2 text-white text-2xl flex-shrink-0">
                  {/* Adjusted icon size and margin */}
                  {getAppStoreIcon(store.icon)}
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-300 group-hover:text-white transition duration-200 ease-in-out leading-tight">
                    {/* Lighter text, hover effect, adjusted leading */}
                    {store.topText}
                  </span>
                  <span className="text-sm font-medium text-white leading-tight">
                    {/* Adjusted font size/weight, adjusted leading */}
                    {store.bottomText}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Category - narrower column (2/12) */}
        <div className="col-span-4 lg:col-span-2 hidden md:block">
          <h3
            className={`text-base font-semibold text-${theme.textPrimary} mb-4 border-b border-${theme.border} pb-2`}
          >
            {footerData.columnTitles.categories}
          </h3>
          <ul className="space-y-1.5">
            {footerData.categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className={`text-base text-${theme.textSecondary} hover:text-[${theme.primary}] transition`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company - narrower column (2/12) */}
        <div className="col-span-4 lg:col-span-2 hidden md:block">
          <h3
            className={`text-base font-semibold text-${theme.textPrimary} mb-4 border-b border-${theme.border} pb-2`}
          >
            {footerData.columnTitles.company}
          </h3>
          <ul className="space-y-1.5">
            {footerData.companyLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-base text-${theme.textSecondary} hover:text-[${theme.primary}] transition`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account - narrower column (2/12) */}
        <div className="col-span-4 lg:col-span-2 hidden md:block">
          <h3
            className={`text-base font-semibold text-${theme.textPrimary} mb-4 border-b border-${theme.border} pb-2`}
          >
            {footerData.columnTitles.account}
          </h3>
          <ul className="space-y-1.5">
            {footerData.accountLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-base text-${theme.textSecondary} hover:text-[${theme.primary}] transition`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact - wider column (3/12) */}
        <div className="col-span-11 lg:col-span-3 ">
          <h3
            className={`text-lg font-semibold text-${theme.textPrimary} mb-4 border-b border-${theme.border} pb-1`}
          >
            {footerData.columnTitles.contact}
          </h3>
          <address
            className={`text-${theme.textSecondary} not-italic space-y-3 text-base`}
          >
            <p className="flex items-start">
              <span className="mr-2 min-w-[1.5rem] mt-1">
                {getContactIcon(footerData.contact.addressIcon)}
              </span>
              <span>{footerData.contact.address}</span>
            </p>
            <p className="flex items-center">
              <span className="mr-2 min-w-[1.5rem]">
                {getContactIcon(footerData.contact.phoneIcon)}
              </span>
              <span>{footerData.contact.phone}</span>
            </p>
            <p className="flex items-center">
              <span className="mr-2 min-w-[1.5rem]">
                {getContactIcon(footerData.contact.emailIcon)}
              </span>
              <span>{footerData.contact.email}</span>
            </p>
          </address>

          {/* Contact Logo */}
          <div className="flex space-x-3 mt-5">
            {footerData.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`w-9 h-9 rounded bg-[#495057] flex items-center justify-center text-white hover:bg-[#4db6ac] transition`}
                aria-label={link.name}
              >
                {getSocialIcon(link.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>

    {/* Mobile Accordions (only visible on mobile) */}
    <div className="md:hidden bg-gray-50 py-4 px-4">
      <details className="group mb-3">
        <summary className="flex justify-between items-center font-medium cursor-pointer list-none px-4 py-2 bg-white rounded-lg shadow-sm">
          <span className={`text-${theme.textPrimary}`}>
            {footerData.mobileAccordions.categories}
          </span>
          <span className="transition group-open:rotate-180">
            <svg
              fill="none"
              height="24"
              width="24"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </summary>
        <ul className="p-4 space-y-1">
          {footerData.categories.map((category) => (
            <li key={category.name}>
              <Link
                href={category.href}
                className={`text-${theme.textSecondary} hover:text-[${theme.primary}]`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </details>
      <details className="group mb-3">
        <summary className="flex justify-between items-center font-medium cursor-pointer list-none px-4 py-2 bg-white rounded-lg shadow-sm">
          <span className={`text-${theme.textPrimary}`}>
            {footerData.mobileAccordions.company}
          </span>
          <span className="transition group-open:rotate-180">
            <svg
              fill="none"
              height="24"
              width="24"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </summary>
        <ul className="p-4 space-y-1">
          {footerData.companyLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`text-${theme.textSecondary} hover:text-[${theme.primary}]`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </details>
      <details className="group">
        <summary className="flex justify-between items-center font-medium cursor-pointer list-none px-4 py-2 bg-white rounded-lg shadow-sm">
          <span className={`text-${theme.textPrimary}`}>
            {footerData.mobileAccordions.account}
          </span>
          <span className="transition group-open:rotate-180">
            <svg
              fill="none"
              height="24"
              width="24"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </summary>
        <ul className="p-4 space-y-1">
          {footerData.accountLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`text-${theme.textSecondary} hover:text-[${theme.primary}]`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </div>

    {/* Copyright Section */}
    <div
      className={`bg-[${theme.lightBg}] border-t border-${theme.lightBorder}`}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between py-4">
        <p
          className={`text-${theme.textLight} text-sm text-center md:text-left`}
        >
          {footerData.copyright.prefix}
          <span className={`text-[${theme.primary}] font-semibold`}>
            {footerData.copyright.brand}
          </span>
          {footerData.copyright.text}
          <span className={`text-[${theme.primary}] font-semibold`}>
            {footerData.copyright.brand}
          </span>
          .
        </p>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          {/* Admin and Restaurant Links */}
          {footerData.adminLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              {index > 0 && (
                <span className={`text-${theme.textLight}`}>|</span>
              )}
              <Link
                href={link.href}
                className={`text-[${theme.primary}] underline hover:text-[${theme.primaryHover}] transition text-sm`}
              >
                {link.name}
              </Link>
              {index === footerData.adminLinks.length - 1 && (
                <span className={`text-${theme.textLight}`}>|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Payment Methods Bar */}
      <div
        className={`max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-3 border-t border-${theme.lightBorder}`}
      >
        {footerData.paymentMethods.map((method) => (
          <span
            key={method.name}
            className={`inline-flex items-center justify-center bg-white border border-${theme.border} rounded px-3 py-1.5 shadow-sm`}
            title={method.name}
          >
            {getPaymentIcon(method.icon)}
          </span>
        ))}
      </div>
    </div>
  </>
);

export default Footer;
