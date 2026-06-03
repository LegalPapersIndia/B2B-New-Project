// // // src/Pages/HubPage.jsx

// // import React, { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import { MapPin, Building, Crown } from "lucide-react";
// // import { getSellersByCity } from "../api/sellerProfileApi";

// // export default function HubPage() {
// //   const { city } = useParams();
// //   const [sellers, setSellers]   = useState([]);
// //   const [loading, setLoading]   = useState(true);

// //   useEffect(() => {
// //     const fetch = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await getSellersByCity(city);
// //         if (data.success) setSellers(data.sellers);
// //       } catch (err) {
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetch();
// //   }, [city]);

// //   // PLAN STYLE
// //   const planStyle = (plan) => {
// //     switch (plan) {
// //       case "gold":    return "bg-yellow-100 text-yellow-700";
// //       case "premium": return "bg-purple-100 text-purple-700";
// //       case "basic":   return "bg-blue-100 text-blue-700";
// //       default:        return "bg-gray-100 text-gray-500";
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">

// //       {/* HERO */}
// //       <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12 px-4">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
// //             <Link to="/" className="hover:text-white">Home</Link>
// //             <span>/</span>
// //             <Link to="/manufacturing-hubs" className="hover:text-white">Manufacturing Hubs</Link>
// //             <span>/</span>
// //             <span className="text-white capitalize">{city}</span>
// //           </div>
// //           <div className="flex items-center gap-3 mt-4">
// //             <MapPin className="w-8 h-8 text-orange-400" />
// //             <div>
// //               <h1 className="text-3xl font-bold capitalize">{city}</h1>
// //               <p className="text-blue-200 mt-1">
// //                 {sellers.length} verified suppliers found
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* SELLERS GRID */}
// //       <div className="max-w-7xl mx-auto px-4 py-10">

// //         {/* LOADING */}
// //         {loading && (
// //           <div className="flex items-center justify-center py-20">
// //             <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
// //           </div>
// //         )}

// //         {/* EMPTY */}
// //         {!loading && sellers.length === 0 && (
// //           <div className="text-center py-20">
// //             <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
// //             <h2 className="text-xl font-semibold text-gray-600">
// //               No sellers found in {city}
// //             </h2>
// //             <p className="text-gray-400 mt-2">
// //               Check back soon for suppliers in this region.
// //             </p>
// //           </div>
// //         )}

// //         {/* GRID */}
// //         {!loading && sellers.length > 0 && (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //             {sellers.map((seller) => (
// //               <div
// //                 key={seller._id}
// //                 className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
// //               >
// //                 {/* TOP */}
// //                 <div className="bg-gradient-to-r from-blue-900 to-blue-800 h-20 relative">
// //                   {/* PLAN BADGE */}
// //                   {seller.subscriptionPlan && (
// //                     <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${planStyle(seller.subscriptionPlan)}`}>
// //                       <Crown className="w-3 h-3" />
// //                       {seller.subscriptionPlan}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* AVATAR */}
// //                 <div className="px-5 -mt-8 mb-3">
// //                   <div className="w-16 h-16 rounded-2xl border-4 border-white overflow-hidden bg-blue-100 flex items-center justify-center shadow-md">
// //                     {seller.profileImage?.url ? (
// //                       <img
// //                         src={seller.profileImage.url}
// //                         alt={seller.name}
// //                         className="w-full h-full object-cover"
// //                       />
// //                     ) : (
// //                       <span className="text-blue-800 font-bold text-xl">
// //                         {seller.companyName?.charAt(0) || seller.name?.charAt(0)}
// //                       </span>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* CONTENT */}
// //                 <div className="px-5 pb-5">
// //                   <h3 className="font-bold text-gray-800 line-clamp-1">
// //                     {seller.companyName || seller.name}
// //                   </h3>

// //                   {seller.companyType && (
// //                     <p className="text-xs text-gray-500 mt-0.5">
// //                       {seller.companyType}
// //                     </p>
// //                   )}

// //                   <div className="flex items-center gap-1 text-gray-400 text-xs mt-2">
// //                     <MapPin className="w-3 h-3" />
// //                     {[seller.city, seller.state].filter(Boolean).join(", ")}
// //                   </div>

// //                   {/* VIEW PRODUCTS BUTTON */}
// //                   <Link
// //                     to={`/sellers/${seller._id}/products`}
// //                     className="mt-4 w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center"
// //                   >
// //                     View Products
// //                   </Link>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }




// // src/Pages/HubPage.jsx
// // Later API se connect karna: getCityBySlug(slug) aur getProductsByCity(slug, filters)

// import React, { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { MapPin, Factory, ChevronRight, Package, Users, Star, ArrowRight, SlidersHorizontal } from "lucide-react";

// // ─── DUMMY DATA ────────────────────────────────────────────────────────────────
// const DUMMY_CITY = {
//   name: "Surat",
//   state: "Gujarat",
//   tagline: "Textile Capital of India",
//   supplierCount: 2400,
//   productCount: 18000,
//   industryCount: 5,
//   industries: ["All", "Textile", "Diamond & Gems", "Chemicals", "Plastic", "Machinery"],
// };

// const DUMMY_PRODUCTS = [
//   { id: 1, name: "Pure Cotton Saree", supplier: "Ravi Textiles Pvt Ltd", price: "₹450", unit: "/ piece", moq: "MOQ: 50 pcs", industry: "Textile", isNew: false, icon: "🧵" },
//   { id: 2, name: "Synthetic Fabric Roll", supplier: "Modi Fabrics", price: "₹120", unit: "/ meter", moq: "MOQ: 100 mtr", industry: "Textile", isNew: false, icon: "🪡" },
//   { id: 3, name: "Polished Diamond 1ct", supplier: "Gems Palace Surat", price: "₹45,000", unit: "/ carat", moq: "MOQ: 1 pc", industry: "Diamond & Gems", isNew: true, icon: "💎" },
//   { id: 4, name: "Industrial Solvent", supplier: "Surat Chem Co", price: "₹280", unit: "/ litre", moq: "MOQ: 50 ltr", industry: "Chemicals", isNew: false, icon: "🧪" },
//   { id: 5, name: "PP Granules", supplier: "Plastic World India", price: "₹95", unit: "/ kg", moq: "MOQ: 500 kg", industry: "Plastic", isNew: false, icon: "🔵" },
//   { id: 6, name: "Embroidery Machine", supplier: "TechMach Ltd", price: "₹1,20,000", unit: "/ unit", moq: "MOQ: 1 pc", industry: "Machinery", isNew: true, icon: "⚙️" },
//   { id: 7, name: "Silk Dupatta", supplier: "Silk House Surat", price: "₹650", unit: "/ piece", moq: "MOQ: 24 pcs", industry: "Textile", isNew: false, icon: "🧣" },
//   { id: 8, name: "Lab Grown Diamond", supplier: "Diamond Arc", price: "₹12,000", unit: "/ carat", moq: "MOQ: 5 pc", industry: "Diamond & Gems", isNew: false, icon: "💎" },
//   { id: 9, name: "Textile Dye", supplier: "ColorChem Industries", price: "₹340", unit: "/ kg", moq: "MOQ: 25 kg", industry: "Chemicals", isNew: false, icon: "🎨" },
//   { id: 10, name: "HDPE Sheet", supplier: "PlastiCo Surat", price: "₹180", unit: "/ kg", moq: "MOQ: 200 kg", industry: "Plastic", isNew: false, icon: "📦" },
//   { id: 11, name: "Power Loom Machine", supplier: "WeaveKing Industries", price: "₹85,000", unit: "/ unit", moq: "MOQ: 1 pc", industry: "Machinery", isNew: false, icon: "🏭" },
//   { id: 12, name: "Georgette Fabric", supplier: "Raj Fabrics", price: "₹210", unit: "/ meter", moq: "MOQ: 50 mtr", industry: "Textile", isNew: true, icon: "🧶" },
// ];

// const ITEMS_PER_PAGE = 8;
// // ────────────────────────────────────────────────────────────────────────────────

// export default function HubPage() {
//   const { slug } = useParams();

//   const [activeIndustry, setActiveIndustry] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState("latest");

//   const city = DUMMY_CITY; // Later: fetch by slug

//   // Filter products
//   const filtered =
//     activeIndustry === "All"
//       ? DUMMY_PRODUCTS
//       : DUMMY_PRODUCTS.filter((p) => p.industry === activeIndustry);

//   // Sort
//   const sorted = [...filtered].sort((a, b) => {
//     if (sortBy === "price-asc") return parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""));
//     if (sortBy === "price-desc") return parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, ""));
//     return 0;
//   });

//   // Paginate
//   const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
//   const paginated = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

//   const handleFilterChange = (industry) => {
//     setActiveIndustry(industry);
//     setCurrentPage(1);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* ── HERO SECTION ───────────────────────────────────────── */}
//       <section className="relative overflow-hidden bg-blue-950 pb-10 pt-8">

//         {/* Animated background blobs */}
//         <div className="pointer-events-none absolute inset-0 overflow-hidden">
//           <div className="absolute -top-20 -right-20 h-72 w-72 animate-pulse rounded-full bg-blue-800/30 blur-3xl" />
//           <div className="absolute bottom-0 left-1/4 h-48 w-48 animate-pulse rounded-full bg-blue-700/20 blur-2xl [animation-delay:1s]" />
//           <div className="absolute top-1/2 left-10 h-32 w-32 animate-pulse rounded-full bg-orange-500/10 blur-2xl [animation-delay:2s]" />
//           {/* Subtle grid overlay */}
//           <div
//             className="absolute inset-0 opacity-[0.04]"
//             style={{
//               backgroundImage:
//                 "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
//               backgroundSize: "40px 40px",
//             }}
//           />
//         </div>

//         <div className="relative z-10 mx-auto max-w-[1400px] px-4">

//           {/* Breadcrumb */}
//           <nav className="mb-6 flex items-center gap-1.5 text-xs text-blue-300/70">
//             <Link to="/" className="hover:text-white transition-colors">Home</Link>
//             <ChevronRight className="h-3 w-3" />
//             <Link to="/manufacturing-hubs" className="hover:text-white transition-colors">Manufacturing Hubs</Link>
//             <ChevronRight className="h-3 w-3" />
//             <span className="text-white">{city.name}</span>
//           </nav>

//           <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

//             {/* Left: City Info */}
//             <div>
//               {/* Location tag */}
//               <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">
//                 <MapPin className="h-3 w-3" />
//                 {city.state}, India
//               </div>

//               <h1 className="mb-1 text-4xl font-bold tracking-tight text-white md:text-5xl">
//                 {city.name}{" "}
//                 <span className="text-orange-400">Hub</span>
//               </h1>

//               <p className="mb-6 text-sm text-blue-200/60">{city.tagline}</p>

//               {/* Stats */}
//               <div className="flex flex-wrap items-center gap-6">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-white">{city.supplierCount.toLocaleString()}+</p>
//                   <p className="text-[11px] text-blue-300/60">Suppliers</p>
//                 </div>
//                 <div className="h-8 w-px bg-white/10" />
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-white">{city.productCount.toLocaleString()}+</p>
//                   <p className="text-[11px] text-blue-300/60">Products</p>
//                 </div>
//                 <div className="h-8 w-px bg-white/10" />
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-white">{city.industryCount}</p>
//                   <p className="text-[11px] text-blue-300/60">Industries</p>
//                 </div>
//               </div>
//             </div>

//             {/* Right: CTA Buttons */}
//             <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
//               <button className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 active:scale-95">
//                 <Factory className="h-4 w-4" />
//                 Post Requirement
//               </button>
//               <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 active:scale-95">
//                 <Users className="h-4 w-4" />
//                 Browse Suppliers
//               </button>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ── MAIN CONTENT ───────────────────────────────────────── */}
//       <div className="mx-auto max-w-[1400px] px-4 py-8">

//         {/* Industry Filter Chips */}
//         <div className="mb-6">
//           <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
//             <SlidersHorizontal className="h-3 w-3" />
//             Filter by Industry
//           </p>
//           <div className="flex flex-wrap gap-2">
//             {city.industries.map((ind) => (
//               <button
//                 key={ind}
//                 onClick={() => handleFilterChange(ind)}
//                 className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 ${
//                   activeIndustry === ind
//                     ? "border-blue-900 bg-blue-900 text-white shadow-sm"
//                     : "border-slate-200 bg-white text-slate-600 hover:border-blue-900 hover:text-blue-900"
//                 }`}
//               >
//                 {ind}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Toolbar */}
//         <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//           <p className="text-sm text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">{filtered.length}</span>{" "}
//             products in{" "}
//             <span className="font-semibold text-slate-800">{activeIndustry === "All" ? "All Industries" : activeIndustry}</span>
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

//         {/* Products Grid */}
//         {paginated.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-slate-400">
//             <Package className="mb-3 h-12 w-12 opacity-30" />
//             <p className="font-medium">No products found</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
//             {paginated.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-10 flex items-center justify-center gap-2">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//               className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-blue-900 hover:text-blue-900 disabled:opacity-30"
//             >
//               <ChevronRight className="h-4 w-4 rotate-180" />
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-medium transition ${
//                   currentPage === page
//                     ? "border-blue-900 bg-blue-900 text-white"
//                     : "border-slate-200 bg-white text-slate-600 hover:border-blue-900 hover:text-blue-900"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//               className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-blue-900 hover:text-blue-900 disabled:opacity-30"
//             >
//               <ChevronRight className="h-4 w-4" />
//             </button>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// // ─── PRODUCT CARD COMPONENT ────────────────────────────────────────────────────
// function ProductCard({ product }) {
//   return (
//     <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

//       {/* Image / Icon area */}
//       <div className="relative flex h-40 items-center justify-center bg-slate-50">
//         <span className="text-5xl opacity-40">{product.icon}</span>
//         <span
//           className={`absolute left-3 top-3 rounded-md px-2 py-0.5 text-[10px] font-bold ${
//             product.isNew
//               ? "bg-blue-100 text-blue-700"
//               : "bg-green-100 text-green-700"
//           }`}
//         >
//           {product.isNew ? "New" : "Verified"}
//         </span>
//       </div>

//       {/* Body */}
//       <div className="p-4">
//         <h3 className="mb-1 line-clamp-2 text-sm font-bold leading-tight text-gray-900">
//           {product.name}
//         </h3>
//         <p className="mb-3 flex items-center gap-1 text-[11px] text-slate-500">
//           <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
//           {product.supplier}
//         </p>

//         <p className="mb-3 text-base font-bold text-blue-900">
//           {product.price}{" "}
//           <span className="text-[11px] font-normal text-slate-400">{product.unit}</span>
//         </p>

//         <div className="mb-3 flex items-center justify-between">
//           <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
//             {product.moq}
//           </span>
//         </div>

//         <button className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-orange-500 py-2.5 text-xs font-semibold text-orange-500 transition-all duration-200 hover:bg-orange-500 hover:text-white active:scale-95">
//           Send Inquiry <ArrowRight className="h-3 w-3" />
//         </button>
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

const ITEMS_PER_PAGE = 12;

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
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
// PRODUCT CARD — SubCategoryPage se same pattern
// ─────────────────────────────────────────
function ProductCard({ product, onInquiry }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:shadow-lg">

      {/* Image */}
      <div className="h-52 overflow-hidden bg-gray-100">
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-300">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="line-clamp-1 font-semibold text-gray-900">{product.title}</h2>

        <p className="mt-1 text-sm font-medium text-blue-700">
          {product.seller?.companyWebsite ? (
            <a
              href={product.seller.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {product.seller?.companyName || product.seller?.name || "—"}
            </a>
          ) : (
            <span>{product.seller?.companyName || product.seller?.name || "—"}</span>
          )}
        </p>

        {(product.seller?.city || product.seller?.state) && (
          <p className="mt-0.5 text-xs text-gray-400">
            📍 {[product.seller?.city, product.seller?.state].filter(Boolean).join(", ")}
          </p>
        )}

        <p className="mt-2 font-semibold text-blue-800">
          ₹{product.price?.toLocaleString()}
          <span className="ml-1 text-xs font-normal text-gray-400">/ {product.unit}</span>
        </p>
        <p className="mt-1 text-xs text-gray-400">
          MOQ: {product.moq} {product.unit}
        </p>

        <div className="mt-4 flex gap-3">
          <Link
            to={`/category/${product.category?.slug}/subcategory/${product.subcategory?.slug}/product/${product.slug}`}
            className="flex-1"
          >
            <button className="w-full rounded-xl bg-blue-800 py-2.5 text-sm font-medium text-white transition hover:bg-blue-900">
              View Details
            </button>
          </Link>
          <button
            onClick={onInquiry}
            className="flex-1 rounded-xl border border-blue-800 py-2.5 text-sm font-medium text-blue-800 transition hover:bg-blue-50"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
