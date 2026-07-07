


// // src/pages/Product/ProductDetailsPage.jsx

// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom"; // ✅ UPDATED - added useNavigate
// import { ChevronRight, MapPin, Star, ShoppingBag, Shield, CheckCircle2 } from "lucide-react";
// import { createPortal } from "react-dom";
// import InquiryModal from "../../components/common/InquiryModal";
// import { getSingleProduct, getProductsBySubCategory } from "../../api/productApi";

// export default function ProductDetailsPage() {
//   const { categorySlug, subcategorySlug, productSlug } = useParams();
//   const navigate = useNavigate(); // ✅ NEW

//   const [product, setProduct]                 = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading]                 = useState(true);
//   const [error, setError]                     = useState("");
//   const [selectedImage, setSelectedImage]     = useState(0);
//   const [openInquiry, setOpenInquiry]         = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const data = await getSingleProduct(productSlug);
//         if (data.success) setProduct(data.product);
//         else setError(data.message || "Product not found");
//       } catch (err) {
//         setError("Product not found");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productSlug]);

//   useEffect(() => {
//     if (!subcategorySlug) return;
//     const fetchRelated = async () => {
//       try {
//         const data = await getProductsBySubCategory(subcategorySlug);
//         if (data.success) {
//           setRelatedProducts(data.products.filter(p => p.slug !== productSlug).slice(0, 6));
//         }
//       } catch (err) { console.error(err); }
//     };
//     fetchRelated();
//   }, [subcategorySlug, productSlug]);

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
//       <div className="text-center">
//         <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
//         <p className="text-gray-500 text-sm">Loading product...</p>
//       </div>
//     </div>
//   );

//   if (error || !product) return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-700">Product Not Found</h1>
//         <p className="text-gray-500 mt-2">The product you are looking for does not exist.</p>
//         <Link to="/" className="mt-5 inline-block bg-blue-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-900 transition">Go Home</Link>
//       </div>
//     </div>
//   );

//   const sellerInitial = (product.seller?.companyName || product.seller?.name || "S").charAt(0).toUpperCase();

//   const getWhatsAppLink = (phone, title) => {
//     const cleaned = phone?.toString().replace(/\D/g, "") || "";
//     const number = cleaned.startsWith("91") ? cleaned : `91${cleaned}`;
//     return `https://wa.me/${number}?text=Hi, I am interested in ${encodeURIComponent(title)}`;
//   };

//   // Split key features by new line into a clean list
//   const keyFeaturesList = product.keyFeatures
//     ? product.keyFeatures.split("\n").map((line) => line.trim()).filter(Boolean)
//     : [];

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50">

//         {/* BREADCRUMB */}
//         <div className="bg-gradient-to-r from-blue-950 to-blue-900 border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4 py-4">
//             <div className="flex items-center gap-2 text-sm flex-wrap">
//               <Link to="/" className="text-blue-300/70 hover:text-white transition">Home</Link>
//               <ChevronRight className="w-4 h-4 text-blue-300/50" />
//               <Link to={`/category/${categorySlug}`} className="text-blue-300/70 hover:text-white capitalize transition">{categorySlug?.replace(/-/g, " ")}</Link>
//               <ChevronRight className="w-4 h-4 text-blue-300/50" />
//               <Link to={`/category/${categorySlug}/subcategory/${subcategorySlug}`} className="text-blue-300/70 hover:text-white capitalize transition">{subcategorySlug?.replace(/-/g, " ")}</Link>
//               <ChevronRight className="w-4 h-4 text-blue-300/50" />
//               <span className="text-white font-medium line-clamp-1">{product.title}</span>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//             {/* ── LEFT — IMAGES ── */}
//             <div>
//               <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 mb-4">
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={product.images?.[selectedImage]?.url || "/placeholder.png"}
//                     alt={product.title}
//                     className="w-full h-[280px] sm:h-[420px] object-contain bg-gray-50" // ✅ UPDATED - responsive height for mobile
//                   />
//                   {product.seller?.subscriptionPlan && (
//                     <div className="absolute top-4 left-4 bg-blue-800 text-white text-xs px-3 py-1 rounded-full font-semibold">
//                       {product.seller.subscriptionPlan === "gold" ? "⭐ Gold" :
//                        product.seller.subscriptionPlan === "premium" ? "💎 Premium" : "Featured"}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* THUMBNAILS */}
//               {product.images?.length > 1 && (
//                 <div className="flex gap-3 flex-wrap">
//                   {product.images.map((img, i) => (
//                     <img
//                       key={i}
//                       src={img.url}
//                       alt={`thumb-${i}`}
//                       onClick={() => setSelectedImage(i)}
//                       className={`h-20 w-20 object-contain bg-gray-50 rounded-xl border-2 cursor-pointer transition
//                         ${selectedImage === i ? "border-blue-800" : "border-gray-200 hover:border-blue-400"}`}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* ── RIGHT — CONTENT ── */}
//             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">

//               {/* TITLE */}
//               <h1 className="text-2xl font-bold text-slate-900 mb-3">{product.title}</h1>

//               {/* COMPANY - ✅ UPDATED - ab clickable, seller profile pe le jaayega */}
//               <Link
//                 to={`/seller/${product.seller?._id}`}
//                 className="text-slate-600 text-sm mb-1 font-medium hover:text-blue-800 hover:underline transition w-fit"
//               >
//                 {product.seller?.companyName || product.seller?.name || "—"}
//               </Link>

//               {/* LOCATION */}
//               {(product.seller?.city || product.seller?.state) && (
//                 <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4 mt-1">
//                   <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
//                   {[product.seller?.city, product.seller?.state].filter(Boolean).join(", ")}
//                 </div>
//               )}

//               {/* BRAND */}
//               {product.brand && (
//                 <p className="text-gray-500 text-sm mb-3">
//                   Brand: <span className="font-medium text-gray-700">{product.brand}</span>
//                 </p>
//               )}

//               {/* PRICE */}
//               <div className="mb-4">
//                 <span className="text-3xl font-bold text-blue-800">
//                   ₹{product.price?.toLocaleString()}
//                 </span>
//                 <span className="text-gray-400 text-sm ml-2">/ {product.unit}</span>
//               </div>

//               {/* MOQ */}
//               <p className="text-xs text-gray-400 mb-5">MOQ: {product.moq} {product.unit}</p>

//               {/* SHORT DESC */}
//               {product.shortDesc && (
//                 <p className="text-gray-600 text-sm leading-relaxed mb-5">{product.shortDesc}</p>
//               )}

//               {/* PRODUCT DETAILS */}
//               <div className="bg-gray-50 rounded-xl p-4 mb-5">
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <p className="text-gray-400">Category</p>
//                     <p className="font-semibold text-gray-800 capitalize">{product.category?.name || "—"}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400">Sub Category</p>
//                     <p className="font-semibold text-gray-800 capitalize">{product.subcategory?.name || "—"}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400">Stock</p>
//                     <p className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
//                       {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400">MOQ</p>
//                     <p className="font-semibold text-gray-800">{product.moq} {product.unit}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* BUTTONS */}
//               <div className="flex flex-col sm:flex-row gap-3 mt-auto"> {/* ✅ UPDATED - stack on mobile */}
//                 <button
//                   onClick={() => setOpenInquiry(true)}
//                   className="flex-1 bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
//                 >
//                   <ShoppingBag className="w-5 h-5" />
//                   Send Inquiry
//                 </button>
//                 <a
//                   href={getWhatsAppLink(product.seller?.phone, product.title)}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
//                 >
//                   WhatsApp
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* ── DESCRIPTION ── */}
//           {product.description && (
//             <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
//               <h3 className="text-lg font-bold text-slate-900 mb-3">Description</h3>
//               <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
//             </div>
//           )}

//           {/* ── KEY FEATURES ── */}
//           {keyFeaturesList.length > 0 && (
//             <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
//               <h3 className="text-lg font-bold text-slate-900 mb-4">Key Features</h3>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {keyFeaturesList.map((feature, i) => (
//                   <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
//                     <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* ── SPECIFICATIONS ── */}
//           {product.specifications?.length > 0 && (
//             <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
//               <h3 className="text-lg font-bold text-slate-900 mb-4">Specifications</h3>
//               <div className="space-y-2">
//                 {product.specifications.map((spec, i) => (
//                   <div key={i} className="flex justify-between text-sm border-b pb-2">
//                     <span className="text-gray-500">{spec.key}</span>
//                     <span className="font-medium text-gray-800">{spec.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

         
//           <Link
//             to={`/seller/${product.seller?._id}`}
//             className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition group "
//           >
//             <h3 className="sr-only">Supplier Information</h3>
//             <div className="w-14 h-14 rounded-2xl bg-blue-800 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
//               {sellerInitial}
//             </div>
//             <div className="flex-1">
//               <p className="text-xs text-gray-400 mb-1">Supplier Information</p>
//               <div className="flex items-center gap-2">
//                 <p className="font-bold text-gray-900 text-lg group-hover:text-blue-800 transition">
//                   {product.seller?.companyName || product.seller?.name || "—"}
//                 </p>
//                 <Shield className="w-4 h-4 text-green-500" />
//               </div>
//               {(product.seller?.city || product.seller?.state) && (
//                 <div className="flex items-center gap-1 mt-1">
//                   <MapPin className="w-3 h-3 text-gray-400" />
//                   <span className="text-sm text-gray-500">
//                     {[product.seller?.city, product.seller?.state].filter(Boolean).join(", ")}
//                   </span>
//                 </div>
//               )}
//               {product.seller?.companyType && (
//                 <p className="text-sm text-gray-500 mt-1">{product.seller.companyType}</p>
//               )}
//             </div>
//             <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-800 transition flex-shrink-0" />
//           </Link>

//           {/* ── RELATED PRODUCTS ── */}
//          {relatedProducts.length > 0 && (
//             <div className="mt-8">
//               <div className="flex items-center justify-between mb-5">
//                 <h2 className="text-2xl font-bold text-slate-900">
//                   Similar <span className="text-blue-800">Products</span>
//                 </h2>
//                 <Link to={`/category/${categorySlug}/subcategory/${subcategorySlug}`} className="text-blue-800 hover:underline text-sm font-medium">
//                   View All →
//                 </Link>
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {relatedProducts.map((p) => {
//                   const relatedUrl = `/category/${categorySlug}/subcategory/${subcategorySlug}/product/${p.slug}`; // ✅ NEW

//                   return (
//                     <div
//                       key={p._id}
//                       onClick={() => navigate(relatedUrl)} // ✅ NEW - poora card clickable
//                       className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer" // ✅ UPDATED - added cursor-pointer
//                     >

//                       <div className="relative overflow-hidden">
//                         {p.images?.[0]?.url ? (
//                           <img
//                             src={p.images[0].url}
//                             alt={p.title}
//                             className="h-36 w-full object-contain bg-gray-50 group-hover:scale-105 transition duration-700"
//                           />
//                         ) : (
//                           <div className="h-36 w-full bg-gray-100 flex items-center justify-center text-gray-300 text-xs">No Image</div>
//                         )}
//                         <div className="absolute top-2 left-2 bg-blue-800 text-white text-[10px] px-2 py-0.5 rounded-full">Featured</div>
//                       </div>

//                       <div className="p-3 flex flex-col flex-1">
//                         <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-blue-800 line-clamp-2 transition">
//                           {p.title}
//                         </h3>
//                         <p className="text-slate-500 text-xs mb-1 line-clamp-1">
//                           {p.seller?.companyName || p.seller?.name || "—"}
//                         </p>
//                         {(p.seller?.city || p.seller?.state) && (
//                           <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
//                             <MapPin className="w-3 h-3 text-orange-600 flex-shrink-0" />
//                             <span className="line-clamp-1">{[p.seller?.city, p.seller?.state].filter(Boolean).join(", ")}</span>
//                           </div>
//                         )}
//                         <div className="mt-auto">
//                           <div className="mb-2">
//                             <span className="text-lg font-bold text-blue-800">
//                               ₹{p.price?.toLocaleString()}
//                             </span>
//                             <span className="text-gray-400 text-xs ml-1">/ {p.unit}</span>
//                           </div>
//                           <p className="text-[11px] text-gray-400 mb-2">MOQ: {p.moq} {p.unit}</p>
//                           <Link
//                             to={relatedUrl}
//                             onClick={(e) => e.stopPropagation()} // ✅ NEW - card ke onClick ke saath double-navigate na ho
//                             className="w-full bg-orange-600 hover:bg-blue-800 text-white py-2 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5"
//                           >
//                             <ShoppingBag className="w-3.5 h-3.5" />
//                             View Details
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* INQUIRY MODAL */}
//       {openInquiry && createPortal(
//         <InquiryModal
//           isOpen={openInquiry}
//           onClose={() => setOpenInquiry(false)}
//           productName={product.title}
//           productId={product._id}
//         />,
//         document.body
//       )}
//     </>
//   );
// }



// src/pages/Product/ProductDetailsPage.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; 
import { ChevronRight, MapPin, Star, ShoppingBag, Shield, CheckCircle2, Grid3X3 } from "lucide-react"; 
import { createPortal } from "react-dom";
import InquiryModal from "../../components/common/InquiryModal";
import { getSingleProduct, getProductsBySubCategory } from "../../api/productApi";
import { getSubCategoriesByCategory } from "../../api/subCategoryApi"; 

export default function ProductDetailsPage() {
  const { categorySlug, subcategorySlug, productSlug } = useParams();
  const navigate = useNavigate(); 

  const [product, setProduct]                 = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedCategories, setRelatedCategories] = useState([]); 
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState("");
  const [selectedImage, setSelectedImage]     = useState(0);
  const [openInquiry, setOpenInquiry]         = useState(false);

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
          setRelatedProducts(data.products.filter(p => p.slug !== productSlug).slice(0, 8));
        }
      } catch (err) { console.error(err); }
    };
    fetchRelated();
  }, [subcategorySlug, productSlug]);

  
  useEffect(() => {
    if (!product?.category?._id) return;
    const fetchRelatedCategories = async () => {
      try {
        const res = await getSubCategoriesByCategory(product.category._id);
        const subs = (res.subCategories || [])
          .filter((sub) => sub.slug !== subcategorySlug) // current subcategory exclude
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .slice(0, 8);
        setRelatedCategories(subs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRelatedCategories();
  }, [product, subcategorySlug]);

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

  const getWhatsAppLink = (phone, title) => {
    const cleaned = phone?.toString().replace(/\D/g, "") || "";
    const number = cleaned.startsWith("91") ? cleaned : `91${cleaned}`;
    return `https://wa.me/${number}?text=Hi, I am interested in ${encodeURIComponent(title)}`;
  };

  // Split key features by new line into a clean list
  const keyFeaturesList = product.keyFeatures
    ? product.keyFeatures.split("\n").map((line) => line.trim()).filter(Boolean)
    : [];

  return (
    <>
      <div className="min-h-screen bg-gray-50">

        {/* BREADCRUMB */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Link to="/" className="text-blue-300/70 hover:text-white transition">Home</Link>
              <ChevronRight className="w-4 h-4 text-blue-300/50" />
              <Link to={`/category/${categorySlug}`} className="text-blue-300/70 hover:text-white capitalize transition">{categorySlug?.replace(/-/g, " ")}</Link>
              <ChevronRight className="w-4 h-4 text-blue-300/50" />
              <Link to={`/category/${categorySlug}/subcategory/${subcategorySlug}`} className="text-blue-300/70 hover:text-white capitalize transition">{subcategorySlug?.replace(/-/g, " ")}</Link>
              <ChevronRight className="w-4 h-4 text-blue-300/50" />
              <span className="text-white font-medium line-clamp-1">{product.title}</span>
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
                    className="w-full h-[280px] sm:h-[420px] object-contain bg-gray-50"
                  />
                 {product.seller?.subscriptionPlan && (
  <div className="absolute top-4 left-4 bg-blue-800 text-white text-xs px-3 py-1 rounded-full font-semibold">
    {product.seller.subscriptionPlan === "diamond" ? "💎 Diamond" :
     product.seller.subscriptionPlan === "gold" ? "⭐ Gold" : "Featured"}
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
                      className={`h-20 w-20 object-contain bg-gray-50 rounded-xl border-2 cursor-pointer transition
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
              <Link
                to={`/seller/${product.seller?._id}`}
                className="text-slate-600 text-sm mb-1 font-medium hover:text-blue-800 hover:underline transition w-fit"
              >
                {product.seller?.companyName || product.seller?.name || "—"}
              </Link>

              {/* LOCATION */}
              {(product.seller?.city || product.seller?.state) && (
                <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4 mt-1">
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
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button
                  onClick={() => setOpenInquiry(true)}
                  className="flex-1 bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Send Inquiry
                </button>
                <a
                  href={getWhatsAppLink(product.seller?.phone, product.title)}
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

          {/* ── KEY FEATURES ── */}
          {keyFeaturesList.length > 0 && (
            <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {keyFeaturesList.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
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

         
          <Link
            to={`/seller/${product.seller?._id}`}
            className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition group "
          >
            <h3 className="sr-only">Supplier Information</h3>
            <div className="w-14 h-14 rounded-2xl bg-blue-800 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {sellerInitial}
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1">Supplier Information</p>
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900 text-lg group-hover:text-blue-800 transition">
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
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-800 transition flex-shrink-0" />
          </Link>

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

              {/* UPDATED - grid-cols-3 sm:4 lg:5 (5 cards ek row mein), gap-4→gap-3 */}
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {relatedProducts.map((p) => {
                  const relatedUrl = `/category/${categorySlug}/subcategory/${subcategorySlug}/product/${p.slug}`; 

                  return (
                    <div
                      key={p._id}
                      onClick={() => navigate(relatedUrl)} 
                      className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col cursor-pointer" // ✅ UPDATED - rounded-2xl→xl, shadow-xl→lg
                    >

                      <div className="relative overflow-hidden">
                        {p.images?.[0]?.url ? (
                          <img
                            src={p.images[0].url}
                            alt={p.title}
                            className="h-24 w-full object-contain bg-gray-50 group-hover:scale-105 transition duration-700" 
                          />
                        ) : (
                          <div className="h-24 w-full bg-gray-100 flex items-center justify-center text-gray-300 text-xs">No Image</div> 
                        )}
                        <div className="absolute top-1.5 left-1.5 bg-blue-800 text-white text-[9px] px-1.5 py-0.5 rounded-full">Featured</div> 
                      </div>

                      <div className="p-2 flex flex-col flex-1"> 
                        <h3 className="text-xs font-bold text-slate-900 mb-0.5 group-hover:text-blue-800 line-clamp-2 transition"> 
                          {p.title}
                        </h3>
                        <p className="text-slate-500 text-[10px] mb-1 line-clamp-1"> 
                          {p.seller?.companyName || p.seller?.name || "—"}
                        </p>
                        {(p.seller?.city || p.seller?.state) && (
                          <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-1.5"> 
                            <MapPin className="w-2.5 h-2.5 text-orange-600 flex-shrink-0" /> 
                            <span className="line-clamp-1">{[p.seller?.city, p.seller?.state].filter(Boolean).join(", ")}</span>
                          </div>
                        )}
                        <div className="mt-auto">
                          <div className="mb-1.5"> 
                            <span className="text-sm font-bold text-blue-800">
                              ₹{p.price?.toLocaleString()}
                            </span>
                            <span className="text-gray-400 text-[10px] ml-1">/ {p.unit}</span> 
                          </div>
                          <p className="text-[9px] text-gray-400 mb-1.5">MOQ: {p.moq} {p.unit}</p> 
                          <Link
                            to={relatedUrl}
                            onClick={(e) => e.stopPropagation()} 
                            className="w-full bg-orange-600 hover:bg-blue-800 text-white py-1.5 rounded-lg text-[11px] font-semibold transition flex items-center justify-center gap-1" // ✅ UPDATED - py-2→1.5, text-sm→[11px], rounded-xl→lg
                          >
                            <ShoppingBag className="w-3 h-3" /> 
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          
         {relatedCategories.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-slate-900">
                  Related <span className="text-blue-800">Categories</span>
                </h2>
                <Link to={`/category/${categorySlug}`} className="text-blue-800 hover:underline text-sm font-medium">
                  View All →
                </Link>
              </div>

              
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {relatedCategories.map((sub) => (
                  <Link
                    key={sub._id}
                    to={`/category/${categorySlug}/subcategory/${sub.slug}`}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col" // ✅ UPDATED - rounded-2xl→xl, shadow-xl→lg
                  >
                    {/*  UPDATED - h-36 → h-24 (chota image) */}
                    <div className="relative overflow-hidden h-24 bg-gray-50">
                      {sub.image ? (
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-700"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-300">
                          <Grid3X3 className="w-6 h-6" /> 
                        </div>
                      )}
                    </div>
                   
                    <div className="p-2 flex-1 flex flex-col">
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-blue-800 transition"> 
                        {sub.name}
                      </h3>
                      
                      <p className="text-[10px] text-blue-800 font-medium mt-auto pt-1.5 group-hover:underline">
                        Explore →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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

