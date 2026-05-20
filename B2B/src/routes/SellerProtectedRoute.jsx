import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // only check login + role
  if (!token || role !== "seller") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default SellerProtectedRoute;