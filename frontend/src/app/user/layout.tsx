import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";

export default function UserLayout({ children }) {
  return <ProtectedRoutes>{children}</ProtectedRoutes>;
}
