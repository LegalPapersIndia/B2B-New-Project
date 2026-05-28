// import React from "react";

// import { useParams, Link } from "react-router-dom";

// import { ChevronRight, Grid3X3 } from "lucide-react";

// import { products } from "../../data/products";

// export default function SubCategoryPage() {
//   // =========================
//   // URL PARAMS
//   // =========================
//   const { categorySlug, subcategorySlug } = useParams();

//   // =========================
//   // FORMAT NAMES
//   // =========================
//   const categoryName = categorySlug.replace(/-/g, " ");

//   const subcategoryName = subcategorySlug.replace(/-/g, " ");

//   // =========================
//   // FILTER PRODUCTS
//   // =========================
//   const filteredProducts = products.filter(
//     (item) =>
//       item.category === categorySlug && item.subcategory === subcategorySlug,
//   );

//   return (
//     <div className="min-h-screen bg-[#f8f8f8]">
//       {/* TOP HEADER */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           {/* BREADCRUMB */}
//           <div className="flex items-center gap-2 text-sm mb-5">
//             {/* HOME */}
//             <Link
//               to="/"
//               className="text-gray-500 hover:text-blue-800 transition"
//             >
//               Home
//             </Link>

//             <ChevronRight className="w-4 h-4 text-gray-400" />

//             {/* CATEGORY */}
//             <Link
//               to={`/category/${categorySlug}`}
//               className="text-gray-500 hover:text-blue-800 capitalize transition"
//             >
//               {categoryName}
//             </Link>

//             <ChevronRight className="w-4 h-4 text-gray-400" />

//             {/* CURRENT PAGE */}
//             <span className="text-gray-900 font-medium capitalize">
//               {subcategoryName}
//             </span>
//           </div>

//           {/* TITLE */}
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
//               <Grid3X3 className="w-6 h-6 text-blue-800" />
//             </div>

//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 capitalize">
//                 {subcategoryName}
//               </h1>

//               <p className="text-sm text-gray-500 mt-1">
//                 Explore top suppliers, manufacturers and wholesalers.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PRODUCT SECTION */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//             <div
//   key={product.id}
//   className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
// >

//   {/* IMAGE */}
//   <div className="h-52 bg-gray-100 overflow-hidden">

//     <img
//       src={product.image}
//       alt={product.name}
//       className="w-full h-full object-cover hover:scale-105 transition duration-300"
//     />

//   </div>

//   {/* CONTENT */}
//   <div className="p-4">

//     <h2 className="font-semibold text-gray-900 line-clamp-1">

//       {product.name}

//     </h2>

//     <p className="text-sm text-gray-500 mt-1">

//       {product.supplier}

//     </p>

//     <p className="text-blue-800 font-semibold mt-2">

//       {product.price}

//     </p>

//     <div className="flex gap-3 mt-4">

//     <Link
//   to={`/category/${product.category}/subcategory/${product.subcategory}/product/${product.slug}`}
//   className="flex-1"
// >

//   <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium transition">

//     View Details

//   </button>

// </Link>

//       <button className="flex-1 border border-blue-800 text-blue-800 hover:bg-blue-50 py-2.5 rounded-xl text-sm font-medium transition">

//         Send Inquiry

//       </button>

//     </div>

//   </div>

// </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-20">
//               <h2 className="text-2xl font-semibold text-gray-700">
//                 No Products Found
//               </h2>

//               <p className="text-gray-500 mt-2">
//                 Products will appear here soon.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";

// import { useParams, Link } from "react-router-dom";

// import {
//   ChevronRight,
//   Grid3X3,
// } from "lucide-react";

// import { products } from "../../data/products";

// import InquiryModal from "../../components/common/InquiryModal";

// export default function SubCategoryPage() {

//   // =========================
//   // URL PARAMS
//   // =========================
//   const {
//     categorySlug,
//     subcategorySlug,
//   } = useParams();

//   // =========================
//   // MODAL STATES
//   // =========================
//   const [openInquiry, setOpenInquiry] =
//     useState(false);

//   const [selectedProduct, setSelectedProduct] =
//     useState("");

//   // =========================
//   // FORMAT NAMES
//   // =========================
//   const categoryName =
//     categorySlug.replace(/-/g, " ");

//   const subcategoryName =
//     subcategorySlug.replace(/-/g, " ");

//   // =========================
//   // FILTER PRODUCTS
//   // =========================
//   const filteredProducts = products.filter(
//     (item) =>
//       item.category === categorySlug &&
//       item.subcategory ===
//         subcategorySlug
//   );

//   return (

//     <div className="min-h-screen bg-[#f8f8f8]">

//       {/* TOP HEADER */}
//       <div className="bg-white border-b border-gray-200">

//         <div className="max-w-7xl mx-auto px-4 py-6">

//           {/* BREADCRUMB */}
//           <div className="flex items-center gap-2 text-sm mb-5">

//             {/* HOME */}
//             <Link
//               to="/"
//               className="text-gray-500 hover:text-blue-800 transition"
//             >
//               Home
//             </Link>

//             <ChevronRight className="w-4 h-4 text-gray-400" />

//             {/* CATEGORY */}
//             <Link
//               to={`/category/${categorySlug}`}
//               className="text-gray-500 hover:text-blue-800 capitalize transition"
//             >
//               {categoryName}
//             </Link>

//             <ChevronRight className="w-4 h-4 text-gray-400" />

//             {/* CURRENT PAGE */}
//             <span className="text-gray-900 font-medium capitalize">

//               {subcategoryName}

//             </span>

//           </div>

//           {/* TITLE */}
//           <div className="flex items-center gap-3">

//             <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

//               <Grid3X3 className="w-6 h-6 text-blue-800" />

//             </div>

//             <div>

//               <h1 className="text-3xl font-bold text-gray-900 capitalize">

//                 {subcategoryName}

//               </h1>

//               <p className="text-sm text-gray-500 mt-1">

//                 Explore top suppliers,
//                 manufacturers and wholesalers.

//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* PRODUCT SECTION */}
//       <div className="max-w-7xl mx-auto px-4 py-8">

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//           {filteredProducts.length > 0 ? (

//             filteredProducts.map((product) => (

//               <div
//                 key={product.id}
//                 className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
//               >

//                 {/* IMAGE */}
//                 <div className="h-52 bg-gray-100 overflow-hidden">

//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover hover:scale-105 transition duration-300"
//                   />

//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-4">

//                   <h2 className="font-semibold text-gray-900 line-clamp-1">

//                     {product.name}

//                   </h2>

//                   <p className="text-sm text-gray-500 mt-1">

//                     {product.supplier}

//                   </p>

//                   <p className="text-blue-800 font-semibold mt-2">

//                     {product.price}

//                   </p>

//                   {/* BUTTONS */}
//                   <div className="flex gap-3 mt-4">

//                     {/* VIEW DETAILS */}
//                     <Link
//                       to={`/category/${product.category}/subcategory/${product.subcategory}/product/${product.slug}`}
//                       className="flex-1"
//                     >

//                       <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium transition">

//                         View Details

//                       </button>

//                     </Link>

//                     {/* SEND INQUIRY */}
//                     <button
//                       onClick={() => {
//                         setOpenInquiry(true);
//                         setSelectedProduct(
//                           product.name
//                         );
//                       }}
//                       className="flex-1 border border-blue-800 text-blue-800 hover:bg-blue-50 py-2.5 rounded-xl text-sm font-medium transition"
//                     >

//                       Send Inquiry

//                     </button>

//                   </div>

//                 </div>

//               </div>

//             ))

//           ) : (

//             <div className="col-span-full text-center py-20">

//               <h2 className="text-2xl font-semibold text-gray-700">

//                 No Products Found

//               </h2>

//               <p className="text-gray-500 mt-2">

//                 Products will appear here soon.

//               </p>

//             </div>

//           )}

//         </div>

//       </div>

//       {/* INQUIRY MODAL */}
//       <InquiryModal
//         isOpen={openInquiry}
//         onClose={() =>
//           setOpenInquiry(false)
//         }
//         productName={selectedProduct}
//       />

//     </div>

//   );

// }

// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { ChevronRight, Grid3X3 } from "lucide-react";
// import InquiryModal from "../../components/common/InquiryModal";
// import { getProductsBySubCategory } from "../../api/productApi";

// export default function SubCategoryPage() {

//   const { categorySlug, subcategorySlug } = useParams();

//   // ─────────────────────────────────────────
//   // STATES
//   // ─────────────────────────────────────────
//   const [products, setProducts]   = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [error, setError]         = useState("");
//   const [openInquiry, setOpenInquiry]       = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState("");

//   // FORMAT NAMES
//   const categoryName    = categorySlug.replace(/-/g, " ");
//   const subcategoryName = subcategorySlug.replace(/-/g, " ");

//   // ─────────────────────────────────────────
//   // FETCH PRODUCTS
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const data = await getProductsBySubCategory(subcategorySlug);
//         if (data.success) {
//           setProducts(data.products);
//         } else {
//           setError(data.message || "Failed to fetch products");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Server error. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [subcategorySlug]);

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#f8f8f8]">

//       {/* TOP HEADER */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-6">

//           {/* BREADCRUMB */}
//           <div className="flex items-center gap-2 text-sm mb-5">
//             <Link to="/" className="text-gray-500 hover:text-blue-800 transition">
//               Home
//             </Link>
//             <ChevronRight className="w-4 h-4 text-gray-400" />
//             <Link
//               to={`/category/${categorySlug}`}
//               className="text-gray-500 hover:text-blue-800 capitalize transition"
//             >
//               {categoryName}
//             </Link>
//             <ChevronRight className="w-4 h-4 text-gray-400" />
//             <span className="text-gray-900 font-medium capitalize">
//               {subcategoryName}
//             </span>
//           </div>

//           {/* TITLE */}
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
//               <Grid3X3 className="w-6 h-6 text-blue-800" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 capitalize">
//                 {subcategoryName}
//               </h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Explore top suppliers, manufacturers and wholesalers.
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* PRODUCTS SECTION */}
//       <div className="max-w-7xl mx-auto px-4 py-8">

//         {/* LOADING */}
//         {loading && (
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
//               <p className="text-gray-500 text-sm">Loading products...</p>
//             </div>
//           </div>
//         )}

//         {/* ERROR */}
//         {!loading && error && (
//           <div className="text-center py-20">
//             <p className="text-red-500">{error}</p>
//           </div>
//         )}

//         {/* PRODUCTS GRID */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div
//                   key={product._id}
//                   className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
//                 >

//                   {/* IMAGE */}
//                   <div className="h-52 bg-gray-100 overflow-hidden">
//                     {product.images?.[0]?.url ? (
//                       <img
//                         src={product.images[0].url}
//                         alt={product.title}
//                         className="w-full h-full object-cover hover:scale-105 transition duration-300"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
//                         No Image
//                       </div>
//                     )}
//                   </div>

//                   {/* CONTENT */}
//                   <div className="p-4">

//                     <h2 className="font-semibold text-gray-900 line-clamp-1">
//                       {product.title}
//                     </h2>

//                     <p className="text-sm text-gray-500 mt-1">
//                       {product.seller?.name || "—"}
//                     </p>

//                     <p className="text-blue-800 font-semibold mt-2">
//                       ₹{product.price?.toLocaleString()}
//                       <span className="text-gray-400 text-xs font-normal ml-1">
//                         / {product.unit}
//                       </span>
//                     </p>

//                     {/* MOQ */}
//                     <p className="text-xs text-gray-400 mt-1">
//                       MOQ: {product.moq} {product.unit}
//                     </p>

//                     {/* BUTTONS */}
//                     <div className="flex gap-3 mt-4">

//                       {/* VIEW DETAILS */}
//                       <Link
//                         to={`/category/${categorySlug}/subcategory/${subcategorySlug}/product/${product.slug}`}
//                         className="flex-1"
//                       >
//                         <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium transition">
//                           View Details
//                         </button>
//                       </Link>

//                       {/* SEND INQUIRY */}
//                       <button
//                         onClick={() => {
//                           setOpenInquiry(true);
//                           setSelectedProduct(product.title);
//                         }}
//                         className="flex-1 border border-blue-800 text-blue-800 hover:bg-blue-50 py-2.5 rounded-xl text-sm font-medium transition"
//                       >
//                         Send Inquiry
//                       </button>

//                     </div>

//                   </div>

//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-20">
//                 <h2 className="text-2xl font-semibold text-gray-700">
//                   No Products Found
//                 </h2>
//                 <p className="text-gray-500 mt-2">
//                   Products will appear here soon.
//                 </p>
//               </div>
//             )}

//           </div>
//         )}

//       </div>

//       {/* INQUIRY MODAL */}
//       <InquiryModal
//         isOpen={openInquiry}
//         onClose={() => setOpenInquiry(false)}
//         productName={selectedProduct}
//       />

//     </div>
//   );
// }

// src/Pages/SubCategory/SubCategoryPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Grid3X3 } from "lucide-react";
import InquiryModal from "../../components/common/InquiryModal";
import { getProductsBySubCategory } from "../../api/productApi";
import FilterSidebar from "../Category/FilterSidebar";

export default function SubCategoryPage() {
  const { categorySlug, subcategorySlug } = useParams();

  // ─────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openInquiry, setOpenInquiry] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // FILTER STATES
  const [selectedState, setSelectedState] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [price, setPrice] = useState(100000);

  // FORMAT NAMES
  const categoryName = categorySlug.replace(/-/g, " ");
  const subcategoryName = subcategorySlug.replace(/-/g, " ");

  // ─────────────────────────────────────────
  // FETCH PRODUCTS
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsBySubCategory(subcategorySlug);
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          setError(data.message || "Failed to fetch products");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subcategorySlug]);

  // ─────────────────────────────────────────
  // APPLY FILTERS
  // ─────────────────────────────────────────
  useEffect(() => {
    let result = [...products];

    // PRICE FILTER
    result = result.filter((p) => Number(p.price || 0) <= price);

    setFilteredProducts(result);
  }, [price, selectedState, verifiedOnly, products]);

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* TOP HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-sm mb-5">
            <Link
              to="/"
              className="text-gray-500 hover:text-blue-800 transition"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              to={`/category/${categorySlug}`}
              className="text-gray-500 hover:text-blue-800 capitalize transition"
            >
              {categoryName}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium capitalize">
              {subcategoryName}
            </span>
          </div>

          {/* TITLE */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Grid3X3 className="w-6 h-6 text-blue-800" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 capitalize">
                  {subcategoryName}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredProducts.length} products found
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">
          {/* ── SIDEBAR ── */}
          <div className="lg:col-span-1">
            <FilterSidebar
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              price={price}
              setPrice={setPrice}
              categorySlug={categorySlug}
            />
          </div>

          {/* ── PRODUCTS ── */}
          <div className="lg:col-span-3">
            {/* LOADING */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Loading products...</p>
                </div>
              </div>
            )}

            {/* ERROR */}
            {!loading && error && (
              <div className="text-center py-20">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {/* PRODUCTS GRID */}
            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
                    >
                      {/* IMAGE */}
                      <div className="h-52 bg-gray-100 overflow-hidden">
                        {product.images?.[0]?.url ? (
                          <img
                            src={product.images[0].url}
                            alt={product.title}
                            className="w-full h-full object-cover hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}
                      {/* CONTENT */}
                      <div className="p-4">
                        <h2 className="font-semibold text-gray-900 line-clamp-1">
                          {product.title}
                        </h2>

                        <p className="text-sm text-blue-700 font-medium mt-1">
                          {product.seller?.companyWebsite ? (
                            <a
                              href={product.seller.companyWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {product.seller?.companyName ||
                                product.seller?.name ||
                                "—"}
                            </a>
                          ) : (
                            <span>
                              {product.seller?.companyName ||
                                product.seller?.name ||
                                "—"}
                            </span>
                          )}
                        </p>

                        {(product.seller?.city || product.seller?.state) && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            📍{" "}
                            {[product.seller?.city, product.seller?.state]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        )}

                        <p className="text-blue-800 font-semibold mt-2">
                          ₹{product.price?.toLocaleString()}
                          <span className="text-gray-400 text-xs font-normal ml-1">
                            / {product.unit}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          MOQ: {product.moq} {product.unit}
                        </p>

                        <div className="flex gap-3 mt-4">
                          <Link
                            to={`/category/${categorySlug}/subcategory/${subcategorySlug}/product/${product.slug}`}
                            className="flex-1"
                          >
                            <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium transition">
                              View Details
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              setOpenInquiry(true);
                              setSelectedProduct(product);
                            }}
                            className="flex-1 border border-blue-800 text-blue-800 hover:bg-blue-50 py-2.5 rounded-xl text-sm font-medium transition"
                          >
                            Send Inquiry
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <h2 className="text-2xl font-semibold text-gray-700">
                      No Products Found
                    </h2>
                    <p className="text-gray-500 mt-2">
                      Try adjusting your filters.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* INQUIRY MODAL */}
      <InquiryModal
        isOpen={openInquiry}
        onClose={() => setOpenInquiry(false)}
        productName={selectedProduct?.title}
        productId={selectedProduct?._id}
      />
    </div>
  );
}
