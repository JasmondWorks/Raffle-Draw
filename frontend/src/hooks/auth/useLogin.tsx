"use client";

import { signIn } from "@/actions";
import { useAuthContext } from "@/hooks/auth/useAuthContext";
import { useState } from "react";
import Cookies from "js-cookie";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await signIn({ email, password });

      if (!response) throw new Error();

      console.log(response);

      if (response) {
        const { user, token } = response;
        dispatch({ type: "LOGIN", payload: user });
        localStorage.setItem("user", JSON.stringify(user));
        Cookies.set("token", token);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return { login, error, isLoading };
};
