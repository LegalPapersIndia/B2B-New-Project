

// // src/pages/Seller/SellerProfilePage.jsx

// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   MapPin, Shield, ShoppingBag, Phone, Mail, Globe,
//   ChevronRight, ChevronLeft
// } from "lucide-react";
// import { getSellerPublicProfile } from "../../api/sellerProfileApi";
// import { getProductsBySeller } from "../../api/productApi";

// const PRODUCTS_PER_PAGE = 3;

// export default function SellerProfilePage() {
//   const { sellerId } = useParams();

//   const [seller, setSeller]     = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         setLoading(true);
//         const sellerRes = await getSellerPublicProfile(sellerId);
//         if (sellerRes.success) {
//           setSeller(sellerRes.seller);
//         } else {
//           setError(sellerRes.message || "Seller not found");
//         }
//         const prodRes = await getProductsBySeller(sellerId);
//         if (prodRes.success) setProducts(prodRes.products);
//       } catch (err) {
//         setError("Seller not found");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, [sellerId]);

//   // PAGINATION LOGIC
//   const totalPages    = Math.ceil(products.length / PRODUCTS_PER_PAGE);
//   const startIndex    = (currentPage - 1) * PRODUCTS_PER_PAGE;
//   const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
//         <p className="text-gray-500 text-sm">Loading supplier...</p>
//       </div>
//     </div>
//   );

//   if (error || !seller) return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-700">Supplier Not Found</h1>
//         <p className="text-gray-500 mt-2">This supplier profile does not exist.</p>
//         <Link to="/" className="mt-5 inline-block bg-blue-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-900 transition">
//           Go Home
//         </Link>
//       </div>
//     </div>
//   );

//   const initial = (seller.companyName || seller.name || "S").charAt(0).toUpperCase();

//   const getWhatsAppLink = (phone) => {
//     const cleaned = phone?.toString().replace(/\D/g, "") || "";
//     const number  = cleaned.startsWith("91") ? cleaned : `91${cleaned}`;
//     return `https://wa.me/${number}?text=Hi, I found your profile on our marketplace and would like to connect.`;
//   };

//   const planBadge = {
//     gold:    { label: "⭐ Gold Supplier",    bg: "bg-yellow-100 text-yellow-700" },
//     premium: { label: "💎 Premium Supplier", bg: "bg-purple-100 text-purple-700" },
//   }[seller.subscriptionPlan] || { label: "Verified Supplier", bg: "bg-blue-100 text-blue-700" };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* BREADCRUMB */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-4 py-3">
//           <div className="flex items-center gap-2 text-sm flex-wrap">
//             <Link to="/" className="text-gray-500 hover:text-blue-800 transition">Home</Link>
//             <ChevronRight className="w-4 h-4 text-gray-400" />
//             <span className="text-gray-900 font-medium">Supplier Profile</span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">

//         {/* ── TOP CARD ── */}
//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

//             {/* AVATAR */}
//             <div className="w-16 h-16 rounded-xl bg-blue-800 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 overflow-hidden">
//               {seller.profileImage?.url
//                 ? <img src={seller.profileImage.url} alt={seller.name} className="w-full h-full object-cover" />
//                 : initial
//               }
//             </div>

//             {/* INFO */}
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <h1 className="text-xl font-bold text-slate-900">
//                   {seller.companyName || seller.name}
//                 </h1>
//                 <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
//               </div>
//               <p className="text-gray-400 text-xs mt-0.5">{seller.name}</p>
//               {(seller.city || seller.state) && (
//                 <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
//                   <MapPin className="w-3 h-3 text-orange-500 flex-shrink-0" />
//                   {[seller.city, seller.state].filter(Boolean).join(", ")}
//                 </div>
//               )}
//               <span className={`mt-1.5 inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${planBadge.bg}`}>
//                 {planBadge.label}
//               </span>
//             </div>

//             {/* BUTTONS */}
//             <div className="flex gap-2 flex-shrink-0 flex-wrap">
//               {seller.phone && (
//                 <a
//                   href={getWhatsAppLink(seller.phone)}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex items-center gap-1.5 border-2 border-green-600 text-green-600 hover:bg-green-50 px-3 py-2 rounded-xl font-semibold text-xs transition"
//                 >
//                   WhatsApp
//                 </a>
//               )}
//               {seller.email && (
//                 <a
//                   href={`mailto:${seller.email}`}
//                   className="flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 rounded-xl font-semibold text-xs transition"
//                 >
//                   <Mail className="w-3.5 h-3.5" />
//                   Email
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

//           {/* ── LEFT COLUMN ── */}
//           <div className="space-y-5">

//             {/* CONTACT INFO */}
//             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
//               <h2 className="text-sm font-bold text-slate-900 mb-3">Contact Information</h2>
//               <div className="space-y-2.5">
//                 {seller.phone && (
//                   <div className="flex items-center gap-2.5">
//                     <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
//                     <span className="text-xs text-gray-700">{seller.phone}</span>
//                   </div>
//                 )}
//                 {seller.email && (
//                   <div className="flex items-center gap-2.5">
//                     <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
//                     <span className="text-xs text-gray-700 break-all">{seller.email}</span>
//                   </div>
//                 )}
//                 {seller.companyWebsite && (
//                   <div className="flex items-center gap-2.5">
//                     <Globe className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
//                     <a href={seller.companyWebsite} target="_blank" rel="noreferrer"
//                       className="text-xs text-blue-700 hover:underline break-all">
//                       {seller.companyWebsite}
//                     </a>
//                   </div>
//                 )}
//                 {(seller.address || seller.city) && (
//                   <div className="flex items-start gap-2.5">
//                     <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
//                     <span className="text-xs text-gray-700">
//                       {[seller.address, seller.city, seller.state, seller.pincode].filter(Boolean).join(", ")}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* BUSINESS DETAILS */}
//             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
//               <h2 className="text-sm font-bold text-slate-900 mb-3">Business Details</h2>
//               <div className="space-y-2 text-xs">
//                 {[
//                   { label: "Company Type",     value: seller.companyType },
//                   { label: "Year Established", value: seller.yearEstablished },
//                   { label: "Employees",        value: seller.employees },
//                   { label: "Annual Turnover",  value: seller.annualTurnover },
//                   { label: "GST Number",       value: seller.gstNumber },
//                 ].map(({ label, value }) => value && (
//                   <div key={label} className="flex justify-between gap-2 py-1 border-b border-gray-50 last:border-0">
//                     <span className="text-gray-400">{label}</span>
//                     <span className="font-medium text-gray-800 text-right">{value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>

//           {/* ── RIGHT COLUMN ── */}
//           <div className="lg:col-span-2 space-y-5">

//             {/* ABOUT */}
//             {seller.companyDescription && (
//               <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
//                 <h2 className="text-sm font-bold text-slate-900 mb-2">About the Company</h2>
//                 <p className="text-gray-600 text-xs leading-relaxed">{seller.companyDescription}</p>
//               </div>
//             )}

//             {/* PRODUCTS */}
//             {products.length > 0 && (
//               <div>
//                 {/* HEADER */}
//                 <div className="flex items-center justify-between mb-3">
//                   <h2 className="text-base font-bold text-slate-900">
//                     Products <span className="text-blue-800">({products.length})</span>
//                   </h2>
//                   {totalPages > 1 && (
//                     <span className="text-xs text-gray-400">
//                       Page {currentPage} of {totalPages}
//                     </span>
//                   )}
//                 </div>

//                 {/* PRODUCT GRID */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                   {currentProducts.map((p) => (
//                     <div
//                       key={p._id}
//                       className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
//                     >
//                       {/* IMAGE */}
//                       <div className="relative overflow-hidden">
//                         {p.images?.[0]?.url ? (
//                           <img
//                             src={p.images[0].url}
//                             alt={p.title}
//                             className="h-32 w-full object-contain bg-gray-50 group-hover:scale-105 transition duration-500"
//                           />
//                         ) : (
//                           <div className="h-32 w-full bg-gray-100 flex items-center justify-center text-gray-300 text-xs">No Image</div>
//                         )}
//                       </div>

//                       {/* CONTENT */}
//                       <div className="p-3 flex flex-col flex-1">
//                         <h3 className="text-xs font-bold text-slate-900 mb-1.5 group-hover:text-blue-800 line-clamp-2 transition leading-snug">
//                           {p.title}
//                         </h3>
//                         <div className="mt-auto">
//                           <p className="text-sm font-bold text-blue-800">₹{p.price?.toLocaleString()}</p>
//                           <p className="text-xs text-gray-400 mb-2">/ {p.unit} &nbsp;·&nbsp; MOQ: {p.moq}</p>
//                           <Link
//                             to={`/category/${p.category?.slug}/subcategory/${p.subcategory?.slug}/product/${p.slug}`}
//                             className="w-full bg-orange-600 hover:bg-blue-800 text-white py-1.5 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-1"
//                           >
//                             <ShoppingBag className="w-3 h-3" />
//                             View
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* PAGINATION */}
//                 {totalPages > 1 && (
//                   <div className="flex items-center justify-center gap-1.5 mt-5">
//                     {/* PREV */}
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-blue-800 hover:text-blue-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
//                     >
//                       <ChevronLeft className="w-4 h-4" />
//                     </button>

//                     {/* PAGE NUMBERS */}
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`w-8 h-8 rounded-lg text-xs font-semibold transition border
//                           ${currentPage === page
//                             ? "bg-blue-800 text-white border-blue-800"
//                             : "border-gray-200 text-gray-600 hover:border-blue-800 hover:text-blue-800"
//                           }`}
//                       >
//                         {page}
//                       </button>
//                     ))}

//                     {/* NEXT */}
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-blue-800 hover:text-blue-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
//                     >
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* EMPTY STATE */}
//             {products.length === 0 && !loading && (
//               <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
//                 <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//                 <p className="text-gray-500 text-sm">No products listed yet.</p>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// src/pages/Seller/SellerProfilePage.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Shield,
  ShoppingBag,
  Phone,
  Mail,
  Globe,
  ChevronRight,
} from "lucide-react"; // ✅ UPDATED - removed unused ChevronLeft
import { getSellerPublicProfile } from "../../api/sellerProfileApi";
import { getProductsBySeller } from "../../api/productApi";

const PRODUCTS_LIMIT = 6; // ✅ UPDATED - renamed + value changed from 3 to 8

export default function SellerProfilePage() {
  const { sellerId } = useParams();

  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const sellerRes = await getSellerPublicProfile(sellerId);
        if (sellerRes.success) {
          setSeller(sellerRes.seller);
        } else {
          setError(sellerRes.message || "Seller not found");
        }
        const prodRes = await getProductsBySeller(sellerId);
        if (prodRes.success) setProducts(prodRes.products);
      } catch (err) {
        setError("Seller not found");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [sellerId]);

  // ✅ UPDATED - simple slice instead of pagination logic
  const displayedProducts = products.slice(0, PRODUCTS_LIMIT);
  const hasMore = products.length > PRODUCTS_LIMIT;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading supplier...</p>
        </div>
      </div>
    );

  if (error || !seller)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700">
            Supplier Not Found
          </h1>
          <p className="text-gray-500 mt-2">
            This supplier profile does not exist.
          </p>
          <Link
            to="/"
            className="mt-5 inline-block bg-blue-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-900 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    );

  const initial = (seller.companyName || seller.name || "S")
    .charAt(0)
    .toUpperCase();

  const getWhatsAppLink = (phone) => {
    const cleaned = phone?.toString().replace(/\D/g, "") || "";
    const number = cleaned.startsWith("91") ? cleaned : `91${cleaned}`;
    return `https://wa.me/${number}?text=Hi, I found your profile on our marketplace and would like to connect.`;
  };

  const planBadge = {
  diamond: { label: "💎 Diamond Supplier", bg: "bg-cyan-100 text-cyan-700" },
  gold: {
    label: "⭐ Gold Supplier",
    bg: "bg-yellow-100 text-yellow-700",
  },
}[seller.subscriptionPlan] || {
  label: "Verified Supplier",
  bg: "bg-blue-100 text-blue-700",
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Link
              to="/"
              className="text-gray-500 hover:text-blue-800 transition"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Supplier Profile</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">
        {/* ── TOP CARD ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* AVATAR */}
            <div className="w-16 h-16 rounded-xl bg-blue-800 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 overflow-hidden">
              {seller.profileImage?.url ? (
                <img
                  src={seller.profileImage.url}
                  alt={seller.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                initial
              )}
            </div>

            {/* INFO */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-900">
                  {seller.companyName || seller.name}
                </h1>
                <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
              </div>
              <p className="text-gray-400 text-xs mt-0.5">{seller.name}</p>
              {(seller.city || seller.state) && (
                <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                  <MapPin className="w-3 h-3 text-orange-500 flex-shrink-0" />
                  {[seller.city, seller.state].filter(Boolean).join(", ")}
                </div>
              )}
              <span
                className={`mt-1.5 inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${planBadge.bg}`}
              >
                {planBadge.label}
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-2 flex-shrink-0 flex-wrap">
              {seller.phone && (
                <a
                  href={getWhatsAppLink(seller.phone)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 border-2 border-green-600 text-green-600 hover:bg-green-50 px-3 py-2 rounded-xl font-semibold text-xs transition"
                >
                  WhatsApp
                </a>
              )}
              {seller.email && (
                <a
                  href={`mailto:${seller.email}`}
                  className="flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 rounded-xl font-semibold text-xs transition"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ── LEFT COLUMN ── */}
          <div className="space-y-5">
            {/* CONTACT INFO */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
              <h2 className="text-sm font-bold text-slate-900 mb-3">
                Contact Information
              </h2>
              <div className="space-y-2.5">
                {seller.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      {seller.phone}
                    </span>
                  </div>
                )}
                {seller.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700 break-all">
                      {seller.email}
                    </span>
                  </div>
                )}
                {seller.companyWebsite && (
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <a
                      href={seller.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-700 hover:underline break-all"
                    >
                      {seller.companyWebsite}
                    </a>
                  </div>
                )}
                {(seller.address || seller.city) && (
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-700">
                      {[
                        seller.address,
                        seller.city,
                        seller.state,
                        seller.pincode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* BUSINESS DETAILS */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
              <h2 className="text-sm font-bold text-slate-900 mb-3">
                Business Details
              </h2>
              <div className="space-y-2 text-xs">
                {[
                  { label: "Company Type", value: seller.companyType },
                  { label: "Year Established", value: seller.yearEstablished },
                  { label: "Employees", value: seller.employees },
                  { label: "Annual Turnover", value: seller.annualTurnover },
                  { label: "GST Number", value: seller.gstNumber },
                ].map(
                  ({ label, value }) =>
                    value && (
                      <div
                        key={label}
                        className="flex justify-between gap-2 py-1 border-b border-gray-50 last:border-0"
                      >
                        <span className="text-gray-400">{label}</span>
                        <span className="font-medium text-gray-800 text-right">
                          {value}
                        </span>
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* ABOUT */}
            {seller.companyDescription && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <h2 className="text-sm font-bold text-slate-900 mb-2">
                  About the Company
                </h2>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {seller.companyDescription}
                </p>
              </div>
            )}

            {/* PRODUCTS */}
            {products.length > 0 && (
              <div>
                {/* HEADER */}
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-slate-900">
                    Products{" "}
                    <span className="text-blue-800">({products.length})</span>
                  </h2>
                  {/* ✅ NEW - View All text link moved to top header */}
                  {hasMore && (
                    <Link
                      to={`/seller-profile/${sellerId}`}
                      className="text-xs font-semibold text-blue-800 hover:underline"
                    >
                      View All
                    </Link>
                  )}
                </div>

                {/* ✅ NEW - SCROLLABLE PRODUCT GRID WRAPPER */}
                {/* ✅ NEW - SCROLLABLE PRODUCT GRID WRAPPER */}
                <div className="max-h-[480px] overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {products.map((p) => (
                      // ✅ UPDATED - whole card is now a Link (was a div with inner Link button)
                      <Link
                        key={p._id}
                        to={`/category/${p.category?.slug}/subcategory/${p.subcategory?.slug}/product/${p.slug}`}
                        className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
                      >
                        {/* IMAGE */}
                        <div className="relative overflow-hidden">
                          {p.images?.[0]?.url ? (
                            <img
                              src={p.images[0].url}
                              alt={p.title}
                              className="h-32 w-full object-contain bg-gray-50 group-hover:scale-105 transition duration-500"
                            />
                          ) : (
                            <div className="h-32 w-full bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                              No Image
                            </div>
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className="p-3 flex flex-col flex-1">
                          <h3 className="text-xs font-bold text-slate-900 mb-1.5 group-hover:text-blue-800 line-clamp-2 transition leading-snug">
                            {p.title}
                          </h3>
                          <div className="mt-auto">
                            <p className="text-sm font-bold text-blue-800">
                              ₹{p.price?.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400 mb-2">
                              / {p.unit} &nbsp;·&nbsp; MOQ: {p.moq}
                            </p>
                            <div className="w-full bg-orange-600 group-hover:bg-blue-800 text-white py-1.5 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-1">
                              <ShoppingBag className="w-3 h-3" />
                              View
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* EMPTY STATE */}
            {products.length === 0 && !loading && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
                <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No products listed yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
