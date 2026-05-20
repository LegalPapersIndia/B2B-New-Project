// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // LAYOUTS
// import MainLayout from "./layouts/MainLayout";

// // PUBLIC PAGES
// import Home from "./Pages/Home";
// import About from "./Pages/About";
// import ContactPage from "./Pages/ContactPage";
// import Blog from "./Pages/Blog";
// import HelpCenter from "./Pages/HelpCenter";
// import Careers from "./Pages/Careers";
// import BecomeSeller from "./Pages/BecomeSeller";
// import PrivacyPolicy from "./Pages/PrivacyPolicy";
// import TermsAndConditions from "./Pages/TermsAndConditions";
// import CookiesPolicy from "./Pages/CookiesPolicy";
// import RefundPolicy from "./Pages/RefundPolicy";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/*  PUBLIC ROUTES */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<ContactPage />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/help" element={<HelpCenter />} />
//           <Route path="/careers" element={<Careers />} />
//           <Route path="/become-seller" element={<BecomeSeller />} />
//           <Route path="/privacy" element={<PrivacyPolicy />} />
//           <Route path="/terms" element={<TermsAndConditions />} />
//           <Route path="/cookies" element={<CookiesPolicy />} />
//           <Route path="/refund" element={<RefundPolicy />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

// LAYOUTS
import MainLayout from "./layouts/MainLayout";
import SellerLayout from "./layouts/SellerLayout";

// PUBLIC PAGES
import Home from "./Pages/Home";
import About from "./Pages/About";
import ContactPage from "./Pages/ContactPage";
import Blog from "./Pages/Blog";
import HelpCenter from "./Pages/HelpCenter";
import Careers from "./Pages/Careers";
import BecomeSeller from "./Pages/BecomeSeller";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";
import CookiesPolicy from "./Pages/CookiesPolicy";
import RefundPolicy from "./Pages/RefundPolicy";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ManufacturingHubsAll from "./pages/ManufacturingHubsAll";

// SELLER PAGES
import SellerDashboard from "./Pages/seller/SellerDashboard";
import AddProduct from "./Pages/seller/AddProduct";
import MyProducts from "./Pages/seller/MyProducts";
import SellerLeads from "./Pages/seller/SellerLeads";
import SellerProfile from "./Pages/seller/SellerProfile";

// PROTECTED ROUTE
import SellerProtectedRoute from "./routes/SellerProtectedRoute";

import ScrollToTop from "./components/ScrollToTop";

import CategoryDetails from "./Pages/Category/CategoryDetails";
import SubCategoryPage from "./Pages/SubCategory/SubCategoryPage";
import ProductDetailsPage from "./Pages/Product/ProductDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category/:slug" element={<CategoryDetails />} />

          <Route
            path="/category/:categorySlug/subcategory/:subcategorySlug"
            element={<SubCategoryPage />}
          />

          <Route
            path="/category/:categorySlug/subcategory/:subcategorySlug/product/:productSlug"
            element={<ProductDetailsPage />}
          />
          <Route
  path="/manufacturing-hubs"
  element={<ManufacturingHubsAll />}
/>
        </Route>

        <Route
          path="/seller"
          element={
            <SellerProtectedRoute>
              <SellerLayout />
            </SellerProtectedRoute>
          }
        >
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<MyProducts />} />
          <Route path="leads" element={<SellerLeads />} />
          <Route path="profile" element={<SellerProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
