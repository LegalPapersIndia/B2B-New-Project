


import { Navigate, useLocation } from "react-router-dom";

// SIRF YE ROUTES HR ACCESS KAR SAKTA HAI
const HR_ALLOWED_ROUTES = ["/admin/careers"];

export default function ProtectedRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken");
  const adminRole  = localStorage.getItem("adminRole");
  const location   = useLocation();

  // TOKEN NAHI HAI — LOGIN PE BHEJO
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  // HR HAI AUR ALLOWED ROUTE NAHI HAI — CAREERS PE BHEJO
  if (adminRole === "hr" && !HR_ALLOWED_ROUTES.includes(location.pathname)) {
    return <Navigate to="/admin/careers" replace />;
  }

  return children;
}