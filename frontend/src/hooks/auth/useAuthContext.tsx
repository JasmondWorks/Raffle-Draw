import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("You tried to use AuthContext outside AuthProvider");
  }

  return context;
}

export { useAuthContext };
