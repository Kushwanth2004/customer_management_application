import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicGuard({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // const useUrl = user?.role === "admin" ? "admin/dashboard" : "user/dashboard";
    let useUrl = "";

    if (user?.role === "admin") {
      useUrl = "admin/dashboard";
    } else if (user?.role === "organization") {
      useUrl = "organization/dashboard";  // Use your correct path here
    } else {
      useUrl = "user/dashboard";
    }


    return <Navigate to={useUrl} />;
  }

  return <>{children}</>;
}
