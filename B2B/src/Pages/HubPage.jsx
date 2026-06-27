

// // src/Pages/HubPage.jsx

// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   ChevronRight,
//   MapPin,
//   Factory,
//   Users,
//   Package,
//   Star,
//   ArrowRight,
//   SlidersHorizontal,
// } from "lucide-react";
// import InquiryModal from "../components/common/InquiryModal";
// import { getProductsByCity } from "../api/productApi";
// import { getCities } from "../api/cityApi";

// const ITEMS_PER_PAGE = 12;

// export default function HubPage() {
// const { city: slug } = useParams(); // /hub/:slug → slug = "surat"


//   // ─────────────────────────────────────────
//   // STATES
//   // ─────────────────────────────────────────
//   const [city, setCity]               = useState(null);
//   const [products, setProducts]       = useState([]);
//   const [filtered, setFiltered]       = useState([]);
//   const [loading, setLoading]         = useState(true);
//   const [error, setError]             = useState("");
//   const [activeIndustry, setActiveIndustry] = useState("All");
//   const [sortBy, setSortBy]           = useState("latest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [openInquiry, setOpenInquiry] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // ─────────────────────────────────────────
//   // FETCH CITY INFO
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchCity = async () => {
//       try {
//         const data = await getCities();
//         if (data.success) {
//           const found = data.cities.find((c) => c.slug === slug);
//           setCity(found || null);
//         }
//       } catch (err) {
//         console.error("City fetch error:", err);
//       }
//     };
//     fetchCity();
//   }, [slug]);

//   // ─────────────────────────────────────────
//   // FETCH PRODUCTS BY CITY
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const data = await getProductsByCity(slug);
//         if (data.success) {
//           setProducts(data.products);
//           setFiltered(data.products);
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
//   }, [slug]);

//   // ─────────────────────────────────────────
//   // FILTER + SORT
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     let result = [...products];

//     // Industry filter (city.industries ke saath match)
//     if (activeIndustry !== "All") {
//       result = result.filter(
//         (p) =>
//           p.category?.name?.toLowerCase() === activeIndustry.toLowerCase() ||
//           p.subcategory?.name?.toLowerCase() === activeIndustry.toLowerCase()
//       );
//     }

//     // Sort
//     if (sortBy === "price-asc")  result.sort((a, b) => (a.price || 0) - (b.price || 0));
//     if (sortBy === "price-desc") result.sort((a, b) => (b.price || 0) - (a.price || 0));
//     if (sortBy === "latest")     result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     setFiltered(result);
//     setCurrentPage(1);
//   }, [activeIndustry, sortBy, products]);

//   // ─────────────────────────────────────────
//   // PAGINATION
//   // ─────────────────────────────────────────
//   const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//   const paginated  = filtered.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   // Industry chips — city.industries ya products se derive karein
//   const industries = city?.industries?.length
//     ? ["All", ...city.industries]
//     : ["All"];

//   // City display name
//   const cityName = city?.name || slug.replace(/-/g, " ");

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* ── HERO ─────────────────────────────────────────────── */}
//       <section className="relative overflow-hidden bg-blue-950 pb-10 pt-8">

//         {/* Animated background blobs */}
//         <div className="pointer-events-none absolute inset-0 overflow-hidden">
//           <div className="absolute -top-20 -right-20 h-72 w-72 animate-pulse rounded-full bg-blue-800/30 blur-3xl" />
//           <div className="absolute bottom-0 left-1/4 h-48 w-48 animate-pulse rounded-full bg-blue-700/20 blur-2xl [animation-delay:1s]" />
//           <div className="absolute top-1/2 left-10 h-32 w-32 animate-pulse rounded-full bg-orange-500/10 blur-2xl [animation-delay:2s]" />
//           <div
//             className="absolute inset-0 opacity-[0.04]"
//             style={{
//               backgroundImage:
//                 "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
//               backgroundSize: "40px 40px",
//             }}
//           />
//         </div>

//         <div className="relative z-10 mx-auto max-w-[1400px] px-4">

//           {/* Breadcrumb */}
//           <nav className="mb-6 flex items-center gap-1.5 text-xs text-blue-300/70">
//             <Link to="/" className="hover:text-white transition-colors">Home</Link>
//             <ChevronRight className="h-3 w-3" />
//             <Link to="/manufacturing-hubs" className="hover:text-white transition-colors">
//               Manufacturing Hubs
//             </Link>
//             <ChevronRight className="h-3 w-3" />
//             <span className="capitalize text-white">{cityName}</span>
//           </nav>

//           <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

//             {/* Left */}
//             <div>
//               <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">
//                 <MapPin className="h-3 w-3" />
//                 {city?.state || "India"}
//               </div>

//               <h1 className="mb-1 text-4xl font-bold tracking-tight text-white md:text-5xl capitalize">
//                 {cityName} <span className="text-orange-400">Hub</span>
//               </h1>

//               <p className="mb-6 text-sm text-blue-200/60">
//                 {city?.tagline || "Verified Suppliers & Products"}
//               </p>

//               {/* Stats */}
//               <div className="flex flex-wrap items-center gap-6">
//                 <div className="text-center">
//   <p className="text-2xl font-bold text-white">
//     {products.length}+
//   </p>
//   <p className="text-[11px] text-blue-300/60">Products</p>
// </div>
//                 <div className="h-8 w-px bg-white/10" />
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-white">
//                     {city?.industries?.length || industries.length - 1}
//                   </p>
//                   <p className="text-[11px] text-blue-300/60">Industries</p>
//                 </div>
//                 {city?.sellerCount && (
//                   <>
//                     <div className="h-8 w-px bg-white/10" />
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-white">{city.sellerCount}+</p>
//                       <p className="text-[11px] text-blue-300/60">Suppliers</p>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Right: CTAs */}
//             {/* <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
//               <button className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 active:scale-95">
//                 <Factory className="h-4 w-4" />
//                 Post Requirement
//               </button>
//               <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 active:scale-95">
//                 <Users className="h-4 w-4" />
//                 Browse Suppliers
//               </button>
//             </div> */}
//           </div>
//         </div>
//       </section>

//       {/* ── MAIN CONTENT ─────────────────────────────────────── */}
//       <div className="mx-auto max-w-[1400px] px-4 py-8">

//         {/* Industry Filter Chips */}
//         {industries.length > 1 && (
//           <div className="mb-6">
//             <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
//               <SlidersHorizontal className="h-3 w-3" />
//               Filter by Industry
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {industries.map((ind) => (
//                 <button
//                   key={ind}
//                   onClick={() => setActiveIndustry(ind)}
//                   className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 ${
//                     activeIndustry === ind
//                       ? "border-blue-900 bg-blue-900 text-white shadow-sm"
//                       : "border-slate-200 bg-white text-slate-600 hover:border-blue-900 hover:text-blue-900"
//                   }`}
//                 >
//                   {ind}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Toolbar */}
//         <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//           <p className="text-sm text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">{filtered.length}</span>{" "}
//             products in{" "}
//             <span className="font-semibold text-slate-800 capitalize">
//               {activeIndustry === "All" ? "All Industries" : activeIndustry}
//             </span>
//           </p>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-blue-400"
//           >
//             <option value="latest">Sort: Latest</option>
//             <option value="price-asc">Price: Low to High</option>
//             <option value="price-desc">Price: High to Low</option>
//           </select>
//         </div>

//         {/* ── LOADING ── */}
//         {loading && (
//           <div className="flex items-center justify-center py-24">
//             <div className="text-center">
//               <div className="mx-auto mb-3 h-12 w-12 animate-spin rounded-full border-4 border-blue-800 border-t-transparent" />
//               <p className="text-sm text-slate-500">Loading products...</p>
//             </div>
//           </div>
//         )}

//         {/* ── ERROR ── */}
//         {!loading && error && (
//           <div className="py-20 text-center">
//             <p className="text-red-500">{error}</p>
//           </div>
//         )}

//         {/* ── PRODUCTS GRID ── */}
//         {!loading && !error && (
//           <>
//             {paginated.length > 0 ? (
//               <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
//                 {paginated.map((product) => (
//                   <ProductCard
//                     key={product._id}
//                     product={product}
//                     onInquiry={() => {
//                       setSelectedProduct(product);
//                       setOpenInquiry(true);
//                     }}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-24 text-slate-400">
//                 <Package className="mb-3 h-12 w-12 opacity-30" />
//                 <h2 className="text-lg font-semibold text-slate-600">No Products Found</h2>
//                 <p className="mt-1 text-sm">Try selecting a different industry.</p>
//               </div>
//             )}

//             {/* ── PAGINATION ── */}
//             {totalPages > 1 && (
//               <div className="mt-10 flex items-center justify-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-blue-900 hover:text-blue-900 disabled:opacity-30"
//                 >
//                   <ChevronRight className="h-4 w-4 rotate-180" />
//                 </button>

//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-medium transition ${
//                       currentPage === page
//                         ? "border-blue-900 bg-blue-900 text-white"
//                         : "border-slate-200 bg-white text-slate-600 hover:border-blue-900 hover:text-blue-900"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ))}

//                 <button
//                   onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={currentPage === totalPages}
//                   className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-blue-900 hover:text-blue-900 disabled:opacity-30"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* ── INQUIRY MODAL ── */}
//       <InquiryModal
//         isOpen={openInquiry}
//         onClose={() => setOpenInquiry(false)}
//         productName={selectedProduct?.title}
//         productId={selectedProduct?._id}
//       />
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // PRODUCT CARD — SubCategoryPage se same pattern
// // ─────────────────────────────────────────
// function ProductCard({ product, onInquiry }) {
//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:shadow-lg">

//       {/* Image */}
//       <div className="h-52 overflow-hidden bg-gray-100">
//         {product.images?.[0]?.url ? (
//           <img
//             src={product.images[0].url}
//             alt={product.title}
//             className="h-full w-full object-cover transition duration-300 hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center text-sm text-gray-300">
//             No Image
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h2 className="line-clamp-1 font-semibold text-gray-900">{product.title}</h2>

//        <p className="mt-1 text-sm font-medium text-slate-600">
//   {product.seller?.companyName || product.seller?.name || "—"}
// </p>

//         {(product.seller?.city || product.seller?.state) && (
//           <p className="mt-0.5 text-xs text-gray-400">
//             📍 {[product.seller?.city, product.seller?.state].filter(Boolean).join(", ")}
//           </p>
//         )}

//         <p className="mt-2 font-semibold text-blue-800">
//           ₹{product.price?.toLocaleString()}
//           <span className="ml-1 text-xs font-normal text-gray-400">/ {product.unit}</span>
//         </p>
//         <p className="mt-1 text-xs text-gray-400">
//           MOQ: {product.moq} {product.unit}
//         </p>

//         <div className="mt-4 flex gap-3">
//           <Link
//             to={`/category/${product.category?.slug}/subcategory/${product.subcategory?.slug}/product/${product.slug}`}
//             className="flex-1"
//           >
//             <button className="w-full rounded-xl bg-blue-800 py-2.5 text-sm font-medium text-white transition hover:bg-blue-900">
//               View Details
//             </button>
//           </Link>
//           <button
//             onClick={onInquiry}
//             className="flex-1 rounded-xl border border-blue-800 py-2.5 text-sm font-medium text-blue-800 transition hover:bg-blue-50"
//           >
//             Send Inquiry
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







// src/Pages/HubPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  MapPin,
  Factory,
  Users,
  Package,
  Star,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";
import InquiryModal from "../components/common/InquiryModal";
import { getProductsByCity } from "../api/productApi";
import { getCities } from "../api/cityApi";

const ITEMS_PER_PAGE = 15;

export default function HubPage() {
const { city: slug } = useParams(); // /hub/:slug → slug = "surat"


  // ─────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────
  const [city, setCity]               = useState(null);
  const [products, setProducts]       = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [sortBy, setSortBy]           = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [openInquiry, setOpenInquiry] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ─────────────────────────────────────────
  // FETCH CITY INFO
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const data = await getCities();
        if (data.success) {
          const found = data.cities.find((c) => c.slug === slug);
          setCity(found || null);
        }
      } catch (err) {
        console.error("City fetch error:", err);
      }
    };
    fetchCity();
  }, [slug]);

  // ─────────────────────────────────────────
  // FETCH PRODUCTS BY CITY
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProductsByCity(slug);
        if (data.success) {
          setProducts(data.products);
          setFiltered(data.products);
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
  }, [slug]);

  // ─────────────────────────────────────────
  // FILTER + SORT
  // ─────────────────────────────────────────
  useEffect(() => {
    let result = [...products];

    // Industry filter (city.industries ke saath match)
    if (activeIndustry !== "All") {
      result = result.filter(
        (p) =>
          p.category?.name?.toLowerCase() === activeIndustry.toLowerCase() ||
          p.subcategory?.name?.toLowerCase() === activeIndustry.toLowerCase()
      );
    }

    // Sort
    if (sortBy === "price-asc")  result.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sortBy === "price-desc") result.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sortBy === "latest")     result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFiltered(result);
    setCurrentPage(1);
  }, [activeIndustry, sortBy, products]);

  // ─────────────────────────────────────────
  // PAGINATION
  // ─────────────────────────────────────────
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Industry chips — city.industries ya products se derive karein
  const industries = city?.industries?.length
    ? ["All", ...city.industries]
    : ["All"];

  // City display name
  const cityName = city?.name || slug.replace(/-/g, " ");

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-blue-950 pb-10 pt-8">

        {/* Animated background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 animate-pulse rounded-full bg-blue-800/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-48 w-48 animate-pulse rounded-full bg-blue-700/20 blur-2xl [animation-delay:1s]" />
          <div className="absolute top-1/2 left-10 h-32 w-32 animate-pulse rounded-full bg-orange-500/10 blur-2xl [animation-delay:2s]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4">

          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-blue-300/70">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/manufacturing-hubs" className="hover:text-white transition-colors">
              Manufacturing Hubs
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="capitalize text-white">{cityName}</span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            {/* Left */}
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">
                <MapPin className="h-3 w-3" />
                {city?.state || "India"}
              </div>

              <h1 className="mb-1 text-4xl font-bold tracking-tight text-white md:text-5xl capitalize">
                {cityName} <span className="text-orange-400">Hub</span>
              </h1>

              <p className="mb-6 text-sm text-blue-200/60">
                {city?.tagline || "Verified Suppliers & Products"}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {products.length}+
                  </p>
                  <p className="text-[11px] text-blue-300/60">Products</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {city?.industries?.length || industries.length - 1}
                  </p>
                  <p className="text-[11px] text-blue-300/60">Industries</p>
                </div>
                {city?.sellerCount && (
                  <>
                    <div className="h-8 w-px bg-white/10" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{city.sellerCount}+</p>
                      <p className="text-[11px] text-blue-300/60">Suppliers</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: CTAs */}
            {/* <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <button className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 active:scale-95">
                <Factory className="h-4 w-4" />
                Post Requirement
              </button>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 active:scale-95">
                <Users className="h-4 w-4" />
                Browse Suppliers
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-4 py-8">

        {/* Industry Filter Chips */}
        {industries.length > 1 && (
          <div className="mb-6">
            <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <SlidersHorizontal className="h-3 w-3" />
              Filter by Industry
            </p>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                    activeIndustry === ind
                      ? "border-blue-900 bg-blue-900 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-900 hover:text-blue-900"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">{filtered.length}</span>{" "}
            products in{" "}
            <span className="font-semibold text-slate-800 capitalize">
              {activeIndustry === "All" ? "All Industries" : activeIndustry}
            </span>
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-blue-400"
          >
            <option value="latest">Sort: Latest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* ── LOADING ── */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 animate-spin rounded-full border-4 border-blue-800 border-t-transparent" />
              <p className="text-sm text-slate-500">Loading products...</p>
            </div>
          </div>
        )}

        {/* ── ERROR ── */}
        {!loading && error && (
          <div className="py-20 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* ── PRODUCTS GRID ── */}
        {!loading && !error && (
          <>
            {paginated.length > 0 ? (
              //  UPDATED: 2 cols mobile → 3 tablet → 4 desktop → 5 xl
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {paginated.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onInquiry={() => {
                      setSelectedProduct(product);
                      setOpenInquiry(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <Package className="mb-3 h-12 w-12 opacity-30" />
                <h2 className="text-lg font-semibold text-slate-600">No Products Found</h2>
                <p className="mt-1 text-sm">Try selecting a different industry.</p>
              </div>
            )}

            {/* ── PAGINATION ── */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-blue-900 hover:text-blue-900 disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-medium transition ${
                      currentPage === page
                        ? "border-blue-900 bg-blue-900 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-900 hover:text-blue-900"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-blue-900 hover:text-blue-900 disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── INQUIRY MODAL ── */}
      <InquiryModal
        isOpen={openInquiry}
        onClose={() => setOpenInquiry(false)}
        productName={selectedProduct?.title}
        productId={selectedProduct?._id}
      />
    </div>
  );
}

// ─────────────────────────────────────────
// PRODUCT CARD —  UPDATED: compact UI
// ─────────────────────────────────────────
function ProductCard({ product, onInquiry }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:shadow-md">

      {/* Image */}
      <div className="h-36 overflow-hidden bg-gray-100">
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.title}
           className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-300">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h2 className="line-clamp-1 text-sm font-semibold text-gray-900">{product.title}</h2>

        <p className="mt-0.5 text-xs font-medium text-slate-600">
          {product.seller?.companyName || product.seller?.name || "—"}
        </p>

        {(product.seller?.city || product.seller?.state) && (
          <p className="mt-0.5 text-[11px] text-gray-400">
            📍 {[product.seller?.city, product.seller?.state].filter(Boolean).join(", ")}
          </p>
        )}

        <p className="mt-1.5 text-sm font-semibold text-blue-800">
          ₹{product.price?.toLocaleString()}
          <span className="ml-1 text-[11px] font-normal text-gray-400">/ {product.unit}</span>
        </p>
        <p className="text-[11px] text-gray-400">
          MOQ: {product.moq} {product.unit}
        </p>

        <div className="mt-3 flex gap-2">
          <Link
            to={`/category/${product.category?.slug}/subcategory/${product.subcategory?.slug}/product/${product.slug}`}
            className="flex-1"
          >
            <button className="w-full rounded-lg bg-blue-800 py-1.5 text-xs font-medium text-white transition hover:bg-blue-900">
              View Details
            </button>
          </Link>
          <button
            onClick={onInquiry}
            className="flex-1 rounded-lg border border-blue-800 py-1.5 text-xs font-medium text-blue-800 transition hover:bg-blue-50"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}