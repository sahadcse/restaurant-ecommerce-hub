import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => {
  return (
    <nav
      className={`w-full border-b border-l border-r border-gray-200 p-2 bg-transparent flex items-center ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 text-sm font-medium">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item.href && idx !== items.length - 1 ? (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-green-600"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`${
                  idx === items.length - 1 ? "text-green-500" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            )}
            {idx < items.length - 1 && (
              <FiChevronRight className="mx-2 text-gray-300" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

// Usage example:
// import Breadcrumb from './Breadcrumb';
// const items = [
//   { label: 'Home', href: '/' },
//   { label: 'Products', href: '/products' },
//   { label: 'Electronics', href: '/products/electronics' },
//   { label: 'Laptops' }
// ];
// <Breadcrumb items={items} className="my-4" />
// This will create a breadcrumb navigation with the last item as the current page.
// The last item will not be a link, while the others will be clickable links.
// The breadcrumb will be styled with a transparent background and a subtle border at the bottom.
// The items will be spaced out with a small gap between them, and the icons will be gray.
// The last item will be highlighted with a green color to indicate the current page.
// The breadcrumb will be responsive and adapt to different screen sizes.
