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
          console.error('Failed to sync user:', error);
        }
      };

      syncUser();
    }
  }, [isSignedIn, user]);

  return { user, isSignedIn, getToken };
}
