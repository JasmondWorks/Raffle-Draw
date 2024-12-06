"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authenticate } from "@/actions";
import toast from "react-hot-toast";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

type AuthType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticating: boolean;
  authenticated: boolean;
  login: (user: User | null, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    Cookies.remove("token");
    setAuthenticated(false);
  }
  function login(user: User | null, token: string) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    Cookies.set("token", token);
    setAuthenticated(true);
  }

  // Fetch stored token on mount
  useEffect(() => {
    async function authenticationInit() {
      try {
        await authenticate();
        setAuthenticated(true);
        console.log("authenticated");
      } catch (error: unknown) {
        // Use unknown here
        if (error instanceof Error) {
          // Narrowing the error type
          toast.error("Login to access your events");
          setAuthenticated(false);
          console.log("not authenticated: ", error.message);
        } else {
          // Handle case where error is not an instance of Error
          console.log("Unknown error: ", error);
        }
        setUser(null);
        logout();
      } finally {
        setIsAuthenticating(false);
      }
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const token = Cookies.get("token");
      console.log(token);

      authenticationInit();
      setUser(user);
      setIsAuthenticating(false);
    } else {
      setIsAuthenticating(false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticating,
        authenticated,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "You tried to use UserAuthContext outside of the UserAuthProvider"
    );
  }

  return context;
}
