import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ClerkProvider } from "./lib/clerk-provider";
import { useAuthSync } from "./lib/auth";
import Auth from "./pages/Auth";
import Dashboard from "./pages/dashboard";
import Upload from "./pages/upload";
import QuizPage from "./pages/quiz";
import Results from "./pages/results";
import NotFound from "./pages/not-found";

// ✅ Removed TypeScript type annotation
function ProtectedRoute({ children }) {
  const { isSignedIn } = useAuthSync();

  if (!isSignedIn) {
    return <Redirect to="/auth" />;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/upload">
        <ProtectedRoute>
          <Upload />
        </ProtectedRoute>
      </Route>
      <Route path="/quiz/:id">
        <ProtectedRoute>
          <QuizPage />
        </ProtectedRoute>
      </Route>
      <Route path="/results">
        <ProtectedRoute>
          <Results />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
