
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

import Cities from "./pages/admin/Cities"; 
import Contacts from "./pages/admin/Contacts";
import Blogs from "./pages/admin/Blogs";
import AdminCareers from "./pages/admin/AdminCareers";
import AdminPlans from "./pages/admin/AdminPlans";
import AdminTestimonials from "./pages/admin/AdminTestimonials";

import BulkUpload from "./pages/admin/Bulkupload";
import AdminMarketplaceStats from "./pages/admin/AdminMarketplaceStats";
import AdminHRUsers from "./pages/admin/AdminHRUsers"; // ← NEW
import AdminHowItWorks from "./pages/admin/HowItWorks";
import AdminWhyChooseUs from "./pages/admin/WhyChooseUs";

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
           <Route path="cities" element={<Cities />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="/admin/blogs" element={<Blogs />} />
            <Route path="/admin/careers" element={<AdminCareers />} />
            <Route path="/admin/plans" element={<AdminPlans />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
             <Route path="/admin/bulk-upload" element={<BulkUpload />} />
             <Route path="/admin/marketplace-stats" element={<AdminMarketplaceStats />} />
              <Route path="/admin/hr-users"     element={<AdminHRUsers />} /> {/* ← NEW */}
              <Route path="/admin/how-it-works" element={<AdminHowItWorks />} />
              <Route path="/admin/why-choose-us" element={<AdminWhyChooseUs />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}


