import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { HOTEL_ROLES } from '@/lib/constants';

export const useRoleGuard = (requiredRoles = []) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) {
      router.push('/dashboard/customer');
      return;
    }
  }, [loading, isAuthenticated, user, requiredRoles, router]);

  return {
    canAccess: isAuthenticated && (requiredRoles.length === 0 || requiredRoles.includes(user?.role)),
    isLoading: loading,
    user,
  };
};
