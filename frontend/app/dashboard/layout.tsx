'use client';

import Link from 'next/link';
import { useAuth } from '../../lib/authContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Restaurant Dashboard</h1>
        <nav className="space-y-4">
          <Link href="/dashboard/menu" className="block text-primary hover:underline">
            Menu Management
          </Link>
          {/* Add more links later (e.g., Orders) */}
          <button
            onClick={logout}
            className="w-full text-left text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}