import { ClerkProvider as BaseClerkProvider } from '@clerk/clerk-react';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_default";

export function ClerkProvider({ children }) {
  return (
    <BaseClerkProvider publishableKey={clerkPubKey}>
      {children}
    </BaseClerkProvider>
  );
}
