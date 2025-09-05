import { UserButton } from '@clerk/clerk-react';
import { useAuthSync } from '../lib/auth';
import { Link, useLocation } from 'wouter';
import { Brain } from 'lucide-react';

export function Navigation() {
  const { user, isSignedIn } = useAuthSync();
  const [location] = useLocation();

  if (!isSignedIn) return null;

  return (
    <nav className="bg-card border-b border-border shadow-sm" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Home link */}
          <Link href="/dashboard" className="flex items-center space-x-3" data-testid="logo-link">
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
              <Brain className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-foreground">MCQ Genius</h1>
          </Link>
          
          {/* Right-side user info + auth */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-3" data-testid="user-info">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">
                    {user.firstName?.[0] || user.emailAddresses?.[0]?.emailAddress?.[0] || 'U'}
                  </span>
                </div>
                <span className="text-foreground font-medium">{user.fullName || 'User'}</span>
              </div>
            )}
            <UserButton afterSignOutUrl="/auth" />
          </div>
        </div>
      </div>
    </nav>
  );
}
