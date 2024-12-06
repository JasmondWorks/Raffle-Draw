"use client";

import SpinnerFull from "@/components/SpinnerFull";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

function ProtectedRoutes({ children }) {
  const { user, isAuthenticating } = useAuth();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!isAuthenticating) {
      // If authentication is not happening and it hasn't been checked before

      if (!user) {
        console.log("here");
        // Only redirect to sign-in if the user is not authenticated and hasn't been redirected before
        router.push("/auth/signin");
      }
    }
  }, [isAuthenticating, user, router]);

  // While checking authentication, show spinner
  if (isAuthenticating) return <SpinnerFull />;

  // If user is not authenticated, render nothing (or a fallback UI)
  if (!user) return null;

  // Render the protected content if the user is logged in
  return <>{children}</>;
}

export default ProtectedRoutes;
