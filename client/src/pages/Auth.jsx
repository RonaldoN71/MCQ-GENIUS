import { SignIn, SignUp } from "@clerk/clerk-react";
import { useAuthSync } from "../lib/auth";
import { useLocation } from "wouter";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Brain } from "lucide-react";

export default function Auth() {
  const { isSignedIn } = useAuthSync();
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState("signin"); // ✅ no TS types, just a string

  if (isSignedIn) {
    setLocation("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-primary text-primary-foreground rounded-lg p-3 w-fit mx-auto mb-4">
            <Brain className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            MCQ Generator
          </h1>
          <p className="text-muted-foreground">
            {mode === "signin"
              ? "Welcome back! Sign in to continue."
              : "Create your account to get started."}
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          {mode === "signin" ? (
            <SignIn
              routing="hash"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 p-0 bg-transparent",
                  headerTitle: "text-foreground",
                  headerSubtitle: "text-muted-foreground",
                  socialButtonsBlockButton:
                    "border border-border bg-background text-foreground hover:bg-accent",
                  formButtonPrimary:
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                  formFieldInput:
                    "bg-background border-border text-foreground",
                  footerActionLink:
                    "text-primary hover:text-primary/80",
                },
              }}
            />
          ) : (
            <SignUp
              routing="hash"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 p-0 bg-transparent",
                  headerTitle: "text-foreground",
                  headerSubtitle: "text-muted-foreground",
                  socialButtonsBlockButton:
                    "border border-border bg-background text-foreground hover:bg-accent",
                  formButtonPrimary:
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                  formFieldInput:
                    "bg-background border-border text-foreground",
                  footerActionLink:
                    "text-primary hover:text-primary/80",
                },
              }}
            />
          )}

          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={() =>
                setMode(mode === "signin" ? "signup" : "signin")
              }
              data-testid="toggle-auth-mode"
            >
              {mode === "signin"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
