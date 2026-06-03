
// // src/pages/Product/ProductDetailsPage.jsx

// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { ChevronRight } from "lucide-react";
// import InquiryModal from "../../components/common/InquiryModal";
// import {
//   getSingleProduct,
//   getProductsBySubCategory,
// } from "../../api/productApi";

// export default function ProductDetailsPage() {
//   const { categorySlug, subcategorySlug, productSlug } = useParams();

//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [openInquiry, setOpenInquiry] = useState(false);

//   // FETCH MAIN PRODUCT
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const data = await getSingleProduct(productSlug);
//         if (data.success) {
//           setProduct(data.product);
//         } else {
//           setError(data.message || "Product not found");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Product not found");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productSlug]);

//   // FETCH RELATED PRODUCTS
//   useEffect(() => {
//     if (!subcategorySlug) return;
//     const fetchRelated = async () => {
//       try {
//         const data = await getProductsBySubCategory(subcategorySlug);
//         if (data.success) {
//           // Current product exclude karo
//           const filtered = data.products
//             .filter((p) => p.slug !== productSlug)
//             .slice(0, 6);
//           setRelatedProducts(filtered);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchRelated();
//   }, [subcategorySlug, productSlug]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
//           <p className="text-gray-500 text-sm">Loading product...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-700">
//             Product Not Found
//           </h1>
//           <p className="text-gray-500 mt-2">
//             The product you are looking for does not exist.
//           </p>
//           <Link
//             to="/"
//             className="mt-5 inline-block bg-blue-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-900 transition"
//           >
//             Go Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-[#f8f8f8]">
//         {/* BREADCRUMB */}
//         <div className="bg-white border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4 py-5">
//             <div className="flex items-center gap-2 text-sm flex-wrap">
//               <Link
//                 to="/"
//                 className="text-gray-500 hover:text-blue-800 transition"
//               >
//                 Home
//               </Link>
//               <ChevronRight className="w-4 h-4 text-gray-400" />
//               <Link
//                 to={`/category/${categorySlug}`}
//                 className="text-gray-500 hover:text-blue-800 capitalize transition"
//               >
//                 {categorySlug?.replace(/-/g, " ")}
//               </Link>
//               <ChevronRight className="w-4 h-4 text-gray-400" />
//               <Link
//                 to={`/category/${categorySlug}/subcategory/${subcategorySlug}`}
//                 className="text-gray-500 hover:text-blue-800 capitalize transition"
//               >
//                 {subcategorySlug?.replace(/-/g, " ")}
//               </Link>
//               <ChevronRight className="w-4 h-4 text-gray-400" />
//               <span className="text-gray-900 font-medium line-clamp-1">
//                 {product.title}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* PRODUCT DETAILS */}
//         <div className="max-w-7xl mx-auto px-4 py-10">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {/* IMAGES */}
//             <div>
//               <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
//                 <img
//                   src={
//                     product.images?.[selectedImage]?.url || "/placeholder.png"
//                   }
//                   alt={product.title}
//                   className="w-full h-[420px] object-cover rounded-xl"
//                 />
//               </div>
//               {product.images?.length > 1 && (
//                 <div className="flex gap-3 flex-wrap">
//                   {product.images.map((img, i) => (
//                     <img
//                       key={i}
//                       src={img.url}
//                       alt={`thumb-${i}`}
//                       onClick={() => setSelectedImage(i)}
//                       className={`h-20 w-20 object-cover rounded-xl border-2 cursor-pointer transition
//                         ${selectedImage === i ? "border-blue-800" : "border-gray-200 hover:border-blue-400"}`}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* CONTENT */}
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 {product.title}
//               </h1>

//               {/* SELLER */}
//               <div className="mt-3 bg-white border border-gray-200 rounded-2xl p-4">
//                 <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
//                   Supplier
//                 </p>
//                 <p className="font-semibold text-blue-800 text-lg">
//                   {product.seller?.companyWebsite ? (
//                     <a
//                       href={product.seller.companyWebsite}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:underline"
//                     >
//                       {product.seller?.companyName ||
//                         product.seller?.name ||
//                         "—"}
//                     </a>
//                   ) : (
//                     product.seller?.companyName || product.seller?.name || "—"
//                   )}
//                 </p>
//                 {(product.seller?.city || product.seller?.state) && (
//                   <p className="text-sm text-gray-500 mt-1">
//                     📍{" "}
//                     {[product.seller?.city, product.seller?.state]
//                       .filter(Boolean)
//                       .join(", ")}
//                   </p>
//                 )}
//               </div>

//               {/* BRAND */}
//               {product.brand && (
//                 <p className="text-gray-500 text-sm mt-3">
//                   Brand:{" "}
//                   <span className="font-medium text-gray-700">
//                     {product.brand}
//                   </span>
//                 </p>
//               )}

//               {/* PRICE */}
//               <div className="mt-5">
//                 <p className="text-3xl font-bold text-blue-800">
//                   ₹{product.price?.toLocaleString()}
//                   <span className="text-gray-400 text-base font-normal ml-2">
//                     / {product.unit}
//                   </span>
//                 </p>
//               </div>

//               {/* SHORT DESC */}
//               {product.shortDesc && (
//                 <p className="text-gray-600 mt-4 text-sm leading-relaxed">
//                   {product.shortDesc}
//                 </p>
//               )}

//               {/* BUTTONS */}
//               <div className="flex flex-wrap gap-4 mt-8">
//                 <button
//                   onClick={() => setOpenInquiry(true)}
//                   className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-medium transition"
//                 >
//                   Send Inquiry
//                 </button>

//                 <a
//                   href={`https://wa.me/919876543210?text=Hi, I am interested in ${product.title}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-xl font-medium transition"
//                 >
//                   WhatsApp Inquiry
//                 </a>
//               </div>

//               {/* PRODUCT DETAILS BOX */}
//               <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-5">
//                   Product Details
//                 </h3>
//                 <div className="grid grid-cols-2 gap-5 text-sm">
//                   <div>
//                     <p className="text-gray-500">MOQ</p>
//                     <p className="font-semibold text-gray-900 mt-1">
//                       {product.moq} {product.unit}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500">Category</p>
//                     <p className="font-semibold text-gray-900 mt-1 capitalize">
//                       {product.category?.name || "—"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500">Sub Category</p>
//                     <p className="font-semibold text-gray-900 mt-1 capitalize">
//                       {product.subcategory?.name || "—"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500">Stock</p>
//                     <p
//                       className={`font-semibold mt-1 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
//                     >
//                       {product.stock > 0
//                         ? `${product.stock} Available`
//                         : "Out of Stock"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* DESCRIPTION */}
//               {product.description && (
//                 <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                     Description
//                   </h3>
//                   <p className="text-gray-600 text-sm leading-relaxed">
//                     {product.description}
//                   </p>
//                 </div>
//               )}

//               {/* SPECIFICATIONS */}
//               {product.specifications?.length > 0 && (
//                 <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     Specifications
//                   </h3>
//                   <div className="space-y-2">
//                     {product.specifications.map((spec, i) => (
//                       <div
//                         key={i}
//                         className="flex justify-between text-sm border-b pb-2"
//                       >
//                         <span className="text-gray-500">{spec.key}</span>
//                         <span className="font-medium text-gray-800">
//                           {spec.value}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ─────────── RELATED PRODUCTS ─────────── */}
//           {relatedProducts.length > 0 && (
//             <div className="mt-16">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   Related Products
//                 </h2>
//                 <Link
//                   to={`/category/${categorySlug}/subcategory/${subcategorySlug}`}
//                   className="text-blue-800 hover:underline text-sm font-medium"
//                 >
//                   View All →
//                 </Link>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {relatedProducts.map((p) => (
//                   <div
//                     key={p._id}
//                     className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
//                   >
//                     {/* IMAGE */}
//                     <div className="h-52 bg-gray-100 overflow-hidden">
//                       {p.images?.[0]?.url ? (
//                         <img
//                           src={p.images[0].url}
//                           alt={p.title}
//                           className="w-full h-full object-cover hover:scale-105 transition duration-300"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
//                           No Image
//                         </div>
//                       )}
//                     </div>

//                     {/* CONTENT */}
//                     <div className="p-4">
//                       <h3 className="font-semibold text-gray-900 line-clamp-1">
//                         {p.title}
//                       </h3>

//                       <p className="text-sm text-blue-700 font-medium mt-1">
//                         {p.seller?.companyName || p.seller?.name || "—"}
//                       </p>

//                       {(p.seller?.city || p.seller?.state) && (
//                         <p className="text-xs text-gray-400 mt-0.5">
//                           📍{" "}
//                           {[p.seller?.city, p.seller?.state]
//                             .filter(Boolean)
//                             .join(", ")}
//                         </p>
//                       )}

//                       <p className="text-blue-800 font-semibold mt-2">
//                         ₹{p.price?.toLocaleString()}
//                         <span className="text-gray-400 text-xs font-normal ml-1">
//                           / {p.unit}
//                         </span>
//                       </p>
//                       <p className="text-xs text-gray-400 mt-1">
//                         MOQ: {p.moq} {p.unit}
//                       </p>

//                       <Link
//                         to={`/category/${categorySlug}/subcategory/${subcategorySlug}/product/${p.slug}`}
//                         className="block mt-4"
//                       >
//                         <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium transition">
//                           View Details
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* INQUIRY MODAL */}
//       <InquiryModal
//         isOpen={openInquiry}
//         onClose={() => setOpenInquiry(false)}
//         productName={product.title}
//         productId={product._id}
//       />
//     </>
//   );
// }




// src/pages/Product/ProductDetailsPage.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, MapPin, Star, ShoppingBag, Shield } from "lucide-react";
import { createPortal } from "react-dom";
import InquiryModal from "../../components/common/InquiryModal";
import { getSingleProduct, getProductsBySubCategory } from "../../api/productApi";
import { getSellerPublicProfile } from "../../api/sellerProfileApi";

export default function ProductDetailsPage() {
  const { categorySlug, subcategorySlug, productSlug } = useParams();

  const [product, setProduct]               = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState("");
  const [selectedImage, setSelectedImage]   = useState(0);
  const [openInquiry, setOpenInquiry]       = useState(false);
const [selectedSeller, setSelectedSeller] = useState(null);
const [sellerLoading, setSellerLoading]   = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getSingleProduct(productSlug);
        if (data.success) setProduct(data.product);
        else setError(data.message || "Product not found");
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productSlug]);

  useEffect(() => {
    if (!subcategorySlug) return;
    const fetchRelated = async () => {
      try {
        const data = await getProductsBySubCategory(subcategorySlug);
        if (data.success) {
          setRelatedProducts(data.products.filter(p => p.slug !== productSlug).slice(0, 6));
        }
      } catch (err) { console.error(err); }
    };
    fetchRelated();
  }, [subcategorySlug, productSlug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading product...</p>
      </div>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-700">Product Not Found</h1>
        <p className="text-gray-500 mt-2">The product you are looking for does not exist.</p>
        <Link to="/" className="mt-5 inline-block bg-blue-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-900 transition">Go Home</Link>
      </div>
    </div>
  );

  const sellerInitial = (product.seller?.companyName || product.seller?.name || "S").charAt(0).toUpperCase();

  const handleViewSeller = async () => {
  try {
    setSellerLoading(true);
    const data = await getSellerPublicProfile(product.seller._id);
    if (data.success) setSelectedSeller(data.seller);
  } catch (err) {
    console.error(err);
  } finally {
    setSellerLoading(false);
  }
};

  return (
    <>
      <div className="min-h-screen bg-gray-50">

        {/* BREADCRUMB */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Link to="/" className="text-gray-500 hover:text-blue-800 transition">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to={`/category/${categorySlug}`} className="text-gray-500 hover:text-blue-800 capitalize transition">{categorySlug?.replace(/-/g, " ")}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to={`/category/${categorySlug}/subcategory/${subcategorySlug}`} className="text-gray-500 hover:text-blue-800 capitalize transition">{subcategorySlug?.replace(/-/g, " ")}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium line-clamp-1">{product.title}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── LEFT — IMAGES ── */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 mb-4">
                <div className="relative overflow-hidden">
                  <img
                    src={product.images?.[selectedImage]?.url || "/placeholder.png"}
                    alt={product.title}
                    className="w-full h-[420px] object-cover"
                  />
                  {/* PLAN BADGE */}
                  {product.seller?.subscriptionPlan && (
                    <div className="absolute top-4 left-4 bg-blue-800 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {product.seller.subscriptionPlan === "gold" ? "⭐ Gold" :
                       product.seller.subscriptionPlan === "premium" ? "💎 Premium" : "Featured"}
                    </div>
                  )}
                </div>
              </div>

              {/* THUMBNAILS */}
              {product.images?.length > 1 && (
                <div className="flex gap-3 flex-wrap">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={`thumb-${i}`}
                      onClick={() => setSelectedImage(i)}
                      className={`h-20 w-20 object-cover rounded-xl border-2 cursor-pointer transition
                        ${selectedImage === i ? "border-blue-800" : "border-gray-200 hover:border-blue-400"}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT — CONTENT ── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">

              {/* TITLE */}
              <h1 className="text-2xl font-bold text-slate-900 mb-3">{product.title}</h1>

              {/* COMPANY */}
              <p className="text-slate-600 text-sm mb-1 font-medium">
                {product.seller?.companyWebsite ? (
                  <a href={product.seller.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                    {product.seller?.companyName || product.seller?.name || "—"}
                  </a>
                ) : (
                  <span className="text-slate-600">{product.seller?.companyName || product.seller?.name || "—"}</span>
                )}
              </p>

              {/* LOCATION */}
              {(product.seller?.city || product.seller?.state) && (
                <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  {[product.seller?.city, product.seller?.state].filter(Boolean).join(", ")}
                </div>
              )}

              {/* BRAND */}
              {product.brand && (
                <p className="text-gray-500 text-sm mb-3">
                  Brand: <span className="font-medium text-gray-700">{product.brand}</span>
                </p>
              )}

              {/* PRICE */}
              <div className="mb-4">
                <span className="text-3xl font-bold text-blue-800">
                  ₹{product.price?.toLocaleString()}
                </span>
                <span className="text-gray-400 text-sm ml-2">/ {product.unit}</span>
              </div>

              {/* MOQ */}
              <p className="text-xs text-gray-400 mb-5">MOQ: {product.moq} {product.unit}</p>

              {/* SHORT DESC */}
              {product.shortDesc && (
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{product.shortDesc}</p>
              )}

              {/* PRODUCT DETAILS */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Category</p>
                    <p className="font-semibold text-gray-800 capitalize">{product.category?.name || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Sub Category</p>
                    <p className="font-semibold text-gray-800 capitalize">{product.subcategory?.name || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Stock</p>
                    <p className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                      {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">MOQ</p>
                    <p className="font-semibold text-gray-800">{product.moq} {product.unit}</p>
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => setOpenInquiry(true)}
                  className="flex-1 bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Send Inquiry
                </button>
                <a
                  href={`https://wa.me/919876543210?text=Hi, I am interested in ${product.title}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* ── DESCRIPTION ── */}
          {product.description && (
            <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* ── SPECIFICATIONS ── */}
          {product.specifications?.length > 0 && (
            <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Specifications</h3>
              <div className="space-y-2">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="flex justify-between text-sm border-b pb-2">
                    <span className="text-gray-500">{spec.key}</span>
                    <span className="font-medium text-gray-800">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* ── SUPPLIER INFO ── */}
<div
  onClick={handleViewSeller}
  className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 cursor-pointer hover:shadow-md transition"
>
  <h3 className="text-lg font-bold text-slate-900 mb-4">Supplier Information</h3>
  <div className="flex items-center gap-4">
    <div className="w-14 h-14 rounded-2xl bg-blue-800 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
      {sellerLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        sellerInitial
      )}
    </div>
    <div>
      <div className="flex items-center gap-2">
        <p className="font-bold text-gray-900 text-lg">
          {product.seller?.companyName || product.seller?.name || "—"}
        </p>
        <Shield className="w-4 h-4 text-green-500" />
      </div>
      {(product.seller?.city || product.seller?.state) && (
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 text-gray-400" />
          <span className="text-sm text-gray-500">
            {[product.seller?.city, product.seller?.state].filter(Boolean).join(", ")}
          </span>
        </div>
      )}
      {product.seller?.companyType && (
        <p className="text-sm text-gray-500 mt-1">{product.seller.companyType}</p>
      )}
    </div>
  </div>
</div>

          {/* ── RELATED PRODUCTS ── */}
          {relatedProducts.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-slate-900">
                  Similar <span className="text-blue-800">Products</span>
                </h2>
                <Link to={`/category/${categorySlug}/subcategory/${subcategorySlug}`} className="text-blue-800 hover:underline text-sm font-medium">
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <div key={p._id} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">

                    {/* IMAGE */}
                    <div className="relative overflow-hidden">
                      {p.images?.[0]?.url ? (
                        <img
                          src={p.images[0].url}
                          alt={p.title}
                          className="h-52 w-full object-cover group-hover:scale-105 transition duration-700"
                        />
                      ) : (
                        <div className="h-52 w-full bg-gray-100 flex items-center justify-center text-gray-300">No Image</div>
                      )}
                      <div className="absolute top-3 left-3 bg-blue-800 text-white text-xs px-2 py-1 rounded-full">Featured</div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-800 line-clamp-2 transition">
                        {p.title}
                      </h3>

                      <p className="text-slate-600 text-sm mb-1">
                        {p.seller?.companyName || p.seller?.name || "—"}
                      </p>

                      {(p.seller?.city || p.seller?.state) && (
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                          <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                          {[p.seller?.city, p.seller?.state].filter(Boolean).join(", ")}
                        </div>
                      )}

                      <div className="mt-auto">
                        <div className="mb-4">
                          <span className="text-2xl font-bold text-blue-800">
                            ₹{p.price?.toLocaleString()}
                          </span>
                          <span className="text-gray-400 text-sm ml-1">/ {p.unit}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">MOQ: {p.moq} {p.unit}</p>

                        <Link
                          to={`/category/${categorySlug}/subcategory/${subcategorySlug}/product/${p.slug}`}
                          className="w-full bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SELLER MODAL */}
{selectedSeller && createPortal(
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
  <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">

  {/* HEADER */}
  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
    <h2 className="text-lg font-semibold text-gray-900">Supplier Details</h2>
    <button onClick={() => setSelectedSeller(null)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
  </div>

  <div className="p-6 space-y-4 overflow-y-auto">

    {/* AVATAR + NAME */}
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-blue-800/20 flex items-center justify-center flex-shrink-0">
        {selectedSeller.profileImage?.url ? (
          <img src={selectedSeller.profileImage.url} alt={selectedSeller.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-blue-800 font-bold text-2xl">
            {(selectedSeller.companyName || selectedSeller.name || "S").charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div>
        <h3 className="font-bold text-lg text-gray-900">{selectedSeller.name}</h3>
        <p className="text-gray-400 text-sm">{selectedSeller.email}</p>
        <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize
          ${selectedSeller.subscriptionPlan === "gold" ? "bg-yellow-500/20 text-yellow-600" :
            selectedSeller.subscriptionPlan === "premium" ? "bg-purple-500/20 text-purple-600" :
            "bg-blue-500/20 text-blue-600"}`}>
          {selectedSeller.subscriptionPlan || "No Plan"}
        </span>
      </div>
    </div>

    {/* DETAILS GRID */}
    <div className="grid grid-cols-2 gap-3 text-sm">
      {[
        { label: "Phone",          value: selectedSeller.phone },
        { label: "Company",        value: selectedSeller.companyName },
        { label: "Company Type",   value: selectedSeller.companyType },
        { label: "Year Est.",      value: selectedSeller.yearEstablished },
        { label: "Employees",      value: selectedSeller.employees },
        { label: "Annual Turnover",value: selectedSeller.annualTurnover },
        { label: "GST Number",     value: selectedSeller.gstNumber },
        { label: "City",           value: selectedSeller.city },
        { label: "State",          value: selectedSeller.state },
        { label: "Pincode",        value: selectedSeller.pincode },
      ].map(({ label, value }) => (
        <div key={label}>
          <p className="text-gray-400 text-xs mb-1">{label}</p>
          <p className="font-medium text-gray-800">{value || "—"}</p>
        </div>
      ))}
    </div>

    {/* WEBSITE */}
    {selectedSeller.companyWebsite && (
      <div>
        <p className="text-gray-400 text-xs mb-1">Website</p>
        <a href={selectedSeller.companyWebsite} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">
          {selectedSeller.companyWebsite}
        </a>
      </div>
    )}

    {/* ADDRESS */}
    {selectedSeller.address && (
      <div>
        <p className="text-gray-400 text-xs mb-1">Address</p>
        <p className="text-sm text-gray-600">{selectedSeller.address}</p>
      </div>
    )}

    {/* DESCRIPTION */}
    {selectedSeller.companyDescription && (
      <div>
        <p className="text-gray-400 text-xs mb-1">Company Description</p>
        <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 leading-relaxed">
          {selectedSeller.companyDescription}
        </p>
      </div>
    )}

  </div>

  <div className="px-6 py-4 border-t border-gray-200 flex justify-end flex-shrink-0">
    <button onClick={() => setSelectedSeller(null)} className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition">
      Close
    </button>
  </div>

</div>
  </div>,
  document.body
)}

      {/* INQUIRY MODAL */}
      {openInquiry && createPortal(
        <InquiryModal
          isOpen={openInquiry}
          onClose={() => setOpenInquiry(false)}
          productName={product.title}
          productId={product._id}
        />,
        document.body
      )}
    </>
  );
}