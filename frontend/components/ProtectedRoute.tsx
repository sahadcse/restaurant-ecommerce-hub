"use client";

import { ReactNode } from "react";
import useAuthCheck from "../lib/useAuthCheck";

interface ProtectedRouteProps {
  children: ReactNode;
  allowRoles?: string[]; // Specify allowed roles
}

export default function ProtectedRoute({children, allowRoles}: ProtectedRouteProps) {
    const { isAuthenticated } = useAuthCheck({allowRoles});
    if (!isAuthenticated) {
        return null;
    }
    return <>{children}</>;
}
// This component checks if the user is authenticated and has the required role(s) to access the route.