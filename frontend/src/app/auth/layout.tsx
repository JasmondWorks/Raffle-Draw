"use client";

import SpinnerFull from "@/components/SpinnerFull";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { user, isAuthenticating } = useAuth();
  const router = useRouter();
  const wasAuthenticating = useRef(true); // Tracks the previous value of isAuthenticating

  useEffect(() => {
    if (!isAuthenticating && wasAuthenticating.current) {
      // Run logic only when isAuthenticating changes from true to false
      wasAuthenticating.current = false;

      if (user) {
        // Check if the user is authenticated and currently not on the /user route
        if (!window.location.pathname.startsWith("/user")) {
          router.push("/user"); // Redirect to /user after authentication
        }
      }
    }
  }, [isAuthenticating, router, user]);

  if (isAuthenticating) return <SpinnerFull />;

  return <div>{children}</div>;
}
