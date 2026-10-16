'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleLogout = async () => {
    // TODO: Call logout API
    router.push('/');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Hotel Booking</h1>
        
        <nav className="space-y-4">
          {user?.role === 'CUSTOMER' && (
            <>
              <Link href="/dashboard/customer" className="block hover:text-accent">
                Dashboard
              </Link>
              <Link href="/dashboard/customer/bookings" className="block hover:text-accent">
                My Bookings
              </Link>
              <Link href="/dashboard/customer/profile" className="block hover:text-accent">
                Profile
              </Link>
            </>
          )}

          {user?.role === 'MANAGER' && (
            <>
              <Link href="/dashboard/manager" className="block hover:text-accent">
                Dashboard
              </Link>
              <Link href="/dashboard/manager/hotels" className="block hover:text-accent">
                Hotels
              </Link>
              <Link href="/dashboard/manager/bookings" className="block hover:text-accent">
                Bookings
              </Link>
              <Link href="/dashboard/manager/analytics" className="block hover:text-accent">
                Analytics
              </Link>
            </>
          )}

          {user?.role === 'ADMIN' && (
            <>
              <Link href="/dashboard/admin" className="block hover:text-accent">
                Dashboard
              </Link>
              <Link href="/dashboard/admin/users" className="block hover:text-accent">
                Users
              </Link>
              <Link href="/dashboard/admin/offers" className="block hover:text-accent">
                Offers
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 w-full btn-danger"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Welcome, {user?.firstName}</h2>
            <span className="text-sm text-gray-600">{user?.role}</span>
          </div>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
