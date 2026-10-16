'use client';

import { useRoleGuard } from '@/hooks/useRoleGuard';
import { HOTEL_ROLES } from '@/lib/constants';

export default function CustomerDashboard() {
  const { canAccess, user } = useRoleGuard([HOTEL_ROLES.CUSTOMER]);

  if (!canAccess) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">{user?.metadata?.totalBookings || 0}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-2">Total Spent</h3>
          <p className="text-3xl font-bold text-green-600">${user?.metadata?.totalSpent || 0}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-2">Member Since</h3>
          <p className="text-sm text-gray-600">
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
