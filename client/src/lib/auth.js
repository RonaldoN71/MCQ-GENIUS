import { useUser, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { apiRequest } from './queryClient';

export function useAuthSync() {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (isSignedIn && user) {
      const syncUser = async () => {
        try {
          await apiRequest('POST', '/api/users', {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress || '',
            name: user.fullName || user.firstName || 'User',
          });
        } catch (error) {
          // Silently fail - user sync is not critical for basic functionality
          console.warn('User sync failed (this is normal if backend is not running):', error.message);
        }
      };

      syncUser();
    }
  }, [isSignedIn, user]);

  return { user, isSignedIn, getToken };
}
