"use client";

import SpinnerFull from "@/components/SpinnerFull";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

function ProtectedRoutes({ children }) {
  const { user, isAuthenticating, authenticated } = useAuth();
  const router = useRouter();
  const hasCheckedAuthentication = useRef(false); // Track if authentication has been checked

  useEffect(() => {
    if (!isAuthenticating && !hasCheckedAuthentication.current) {
      // If authentication is not happening and it hasn't been checked before
      hasCheckedAuthentication.current = true;

      if (!authenticated) {
        // Only redirect to sign-in if the user is not authenticated and hasn't been redirected before
        router.push("/auth/signin");
      }
    }
  }, [isAuthenticating, authenticated, router]);

  // While checking authentication, show spinner
  if (isAuthenticating) return <SpinnerFull />;

  // If user is not authenticated, render nothing (or a fallback UI)
  if (!user) return null;

  // Render the protected content if the user is logged in
  return <>{children}</>;
}

export default ProtectedRoutes;
