
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Sellers from "./pages/admin/Sellers";
import Products from "./pages/admin/Products";
import ProductDetail from "./pages/admin/ProductDetail";
import Enquiries from "./pages/admin/Enquiries";
import Categories from "./pages/admin/Categories";
import Subcategories from "./pages/admin/Subcategories";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layout/AdminLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Layout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="products" element={<Products />} />
          <Route path="/admin/products/:id" element={<ProductDetail />} />
         <Route path="enquiries" element={<Enquiries />} />
         <Route path="categories" element={<Categories />} />
         <Route path="subcategories" element={<Subcategories />} />
         <Route path="analytics" element={<Analytics />} />
           <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}