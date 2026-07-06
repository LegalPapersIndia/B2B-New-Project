// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   MapPin, BadgeCheck, Factory, ChevronRight,
//   Crown, Package, Users, SlidersHorizontal
// } from "lucide-react";
// import InquiryModal from "../components/common/InquiryModal";
// import { getSellerPublicProfile } from "../api/sellerProfileApi";

// // ─────────────────────────────────────────
// // PLAN BADGE
// // ─────────────────────────────────────────
// const planBadge = (plan) => {
//   switch (plan) {
//     case "gold":    return "bg-yellow-500 text-white";
//     case "premium": return "bg-purple-600 text-white";
//     default:        return "bg-blue-800 text-white";
//   }
// };

// // ─────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────
// export default function SellerPublicProfile() {
//   const { id } = useParams();

//   const [seller, setSeller]               = useState(null);
//   const [products, setProducts]           = useState([]);
//   const [filtered, setFiltered]           = useState([]);
//   const [loading, setLoading]             = useState(true);
//   const [error, setError]                 = useState(null);
//   const [sortBy, setSortBy]               = useState("latest");
//   const [openInquiry, setOpenInquiry]     = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // ── FETCH ──
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const data = await getSellerPublicProfile(id);
//         if (data.success) {
//           setSeller(data.seller);
//           setProducts(data.products);
//           setFiltered(data.products);
//         } else {
//           setError("Seller not found.");
//         }
//       } catch {
//         setError("Failed to load seller profile.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [id]);

//   // ── SORT ──
//   useEffect(() => {
//     let result = [...products];
//     if (sortBy === "price-asc")  result.sort((a, b) => (a.price || 0) - (b.price || 0));
//     if (sortBy === "price-desc") result.sort((a, b) => (b.price || 0) - (a.price || 0));
//     if (sortBy === "latest")     result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     setFiltered(result);
//   }, [sortBy, products]);

//   const experience = seller?.yearEstablished
//     ? new Date().getFullYear() - Number(seller.yearEstablished)
//     : null;

//   // ── LOADING ──
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50">
//         <div className="bg-blue-950 pb-10 pt-8">
//           <div className="max-w-[1400px] mx-auto px-4">
//             <div className="h-4 w-40 bg-blue-800/40 rounded-full animate-pulse mb-6" />
//             <div className="h-10 w-72 bg-blue-800/40 rounded-xl animate-pulse mb-3" />
//             <div className="h-3 w-52 bg-blue-800/30 rounded animate-pulse" />
//           </div>
//         </div>
//         <div className="max-w-[1400px] mx-auto px-4 py-8">
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
//             {[1,2,3,4,5,6,7,8].map(i => (
//               <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── ERROR ──
//   if (error || !seller) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
//         <Package className="w-14 h-14 text-gray-300" />
//         <p className="text-slate-600 text-lg font-semibold">{error || "Seller not found."}</p>
//         <Link to="/" className="text-blue-800 text-sm hover:underline">← Back to Home</Link>
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* ══ HERO ══ */}
//       <section className="relative overflow-hidden bg-blue-950 pb-10 pt-8">

//         {/* Animated blobs */}
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
//             <span className="text-white">{seller.companyName || seller.name}</span>
//           </nav>

//           <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

//             {/* LEFT */}
//             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

//               {/* Avatar */}
//               <div className="w-20 h-20 rounded-2xl bg-blue-800/60 border border-blue-600/40 flex items-center justify-center text-4xl font-black text-white/30 overflow-hidden flex-shrink-0">
//                 {seller.profileImage?.url ? (
//                   <img
//                     src={seller.profileImage.url}
//                     alt={seller.companyName}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span>{(seller.companyName || seller.name)?.charAt(0)}</span>
//                 )}
//               </div>

//               <div>
//                 {/* Badges */}
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {seller.subscriptionPlan && (
//                     <span className={`text-[11px] px-3 py-1 rounded-full flex items-center gap-1 font-bold ${planBadge(seller.subscriptionPlan)}`}>
//                       <Crown className="w-3 h-3" />
//                       {seller.subscriptionPlan === "gold" ? "Gold" : "Premium"}
//                     </span>
//                   )}
//                   <span className="bg-green-500 text-white text-[11px] px-3 py-1 rounded-full flex items-center gap-1 font-bold">
//                     <BadgeCheck className="w-3 h-3" /> Verified
//                   </span>
//                   {seller.companyType && (
//                     <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">
//                       <Factory className="h-3 w-3" />
//                       {seller.companyType}
//                     </div>
//                   )}
//                 </div>

//                 <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
//                   {seller.companyName || seller.name}
//                   <span className="text-orange-400"> Profile</span>
//                 </h1>

//                 {(seller.city || seller.state) && (
//                   <div className="flex items-center gap-1.5 text-blue-200/70 text-sm mb-4">
//                     <MapPin className="w-3.5 h-3.5 text-orange-400" />
//                     {[seller.city, seller.state].filter(Boolean).join(", ")}
//                   </div>
//                 )}

//                 {/* Stats */}
//                 <div className="flex flex-wrap items-center gap-6">
//                   <div className="text-center">
//                     <p className="text-2xl font-bold text-white">{products.length}+</p>
//                     <p className="text-[11px] text-blue-300/60">Products</p>
//                   </div>
//                   {experience && (
//                     <>
//                       <div className="h-8 w-px bg-white/10" />
//                       <div className="text-center">
//                         <p className="text-2xl font-bold text-white">{experience}</p>
//                         <p className="text-[11px] text-blue-300/60">Yrs Experience</p>
//                       </div>
//                     </>
//                   )}
//                   {seller.createdAt && (
//                     <>
//                       <div className="h-8 w-px bg-white/10" />
//                       <div className="text-center">
//                         <p className="text-2xl font-bold text-white">
//                           {new Date(seller.createdAt).getFullYear()}
//                         </p>
//                         <p className="text-[11px] text-blue-300/60">Member Since</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT — CTAs */}
//             {/* <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
//               <button className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 active:scale-95">
//                 <Factory className="h-4 w-4" />
//                 Post Requirement
//               </button>
//               <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 active:scale-95">
//                 <Users className="h-4 w-4" />
//                 Send Inquiry
//               </button>
//             </div> */}
//           </div>
//         </div>
//       </section>

//       {/* ══ DESCRIPTION ══ */}
//       {seller.description && (
//         <div className="bg-white border-b border-gray-100">
//           <div className="max-w-[1400px] mx-auto px-4 py-4">
//             <p className="text-slate-500 text-sm max-w-3xl leading-relaxed">
//               {seller.description}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ══ PRODUCTS ══ */}
//       <div className="mx-auto max-w-[1400px] px-4 py-8">

//         {/* Section label */}
//         <div className="mb-5">
//           <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
//             <Package className="h-3 w-3" /> Product Catalogue
//           </p>
//           <h2 className="text-2xl font-bold text-slate-900">
//             Products by{" "}
//             <span className="text-blue-800">{seller.companyName || seller.name}</span>
//           </h2>
//         </div>

//         {/* Toolbar */}
//         <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//           <p className="text-sm text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">{filtered.length}</span>{" "}
//             products
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

//         {/* Grid */}
//         {filtered.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-24 text-slate-400">
//             <Package className="mb-3 h-12 w-12 opacity-30" />
//             <h2 className="text-lg font-semibold text-slate-600">No Products Listed</h2>
//             <p className="mt-1 text-sm">This seller hasn't added any products yet.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
//             {filtered.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//                 onInquiry={() => {
//                   setSelectedProduct(product);
//                   setOpenInquiry(true);
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ══ INQUIRY MODAL ══ */}
//       <InquiryModal
//         isOpen={openInquiry}
//         onClose={() => setOpenInquiry(false)}
//         productName={selectedProduct?.name || selectedProduct?.title}
//         productId={selectedProduct?._id}
//       />
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // PRODUCT CARD — HubPage se exact same pattern
// // ─────────────────────────────────────────
// function ProductCard({ product, onInquiry }) {
//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:shadow-lg">

//       {/* Image */}
//       <div className="h-52 overflow-hidden bg-gray-100">
//         {product.images?.[0]?.url || product.images?.[0] ? (
//           <img
//             src={product.images[0]?.url || product.images[0]}
//             alt={product.name || product.title}
//             className="h-full w-full object-cover transition duration-300 hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center">
//             <Package className="w-10 h-10 text-gray-200" />
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h2 className="line-clamp-1 font-semibold text-gray-900">
//           {product.name || product.title}
//         </h2>

//         {product.category?.name && (
//           <p className="mt-0.5 text-xs text-gray-400">
//             {product.category.name}
//             {product.subcategory?.name ? ` › ${product.subcategory.name}` : ""}
//           </p>
//         )}

//         <p className="mt-2 font-semibold text-blue-800">
//           ₹{product.price?.toLocaleString("en-IN")}
//           {product.unit && (
//             <span className="ml-1 text-xs font-normal text-gray-400">/ {product.unit}</span>
//           )}
//         </p>

//         {product.moq && (
//           <p className="mt-1 text-xs text-gray-400">
//             MOQ: {product.moq} {product.unit}
//           </p>
//         )}

//         {product.stock <= 5 && product.stock > 0 && (
//           <p className="mt-1 text-xs font-semibold text-orange-500">
//             Only {product.stock} left
//           </p>
//         )}

//         {/* Buttons — HubPage se exact same */}
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



// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   MapPin,
//   BadgeCheck,
//   Factory,
//   ChevronRight,
//   Crown,
//   Package,
//   Users,
//   SlidersHorizontal,
// } from "lucide-react";
// import InquiryModal from "../components/common/InquiryModal";
// import { getSellerPublicProfile } from "../api/sellerProfileApi";

// // ─────────────────────────────────────────
// // PLAN BADGE
// // ─────────────────────────────────────────
// const planBadge = (plan) => {
//   switch (plan) {
//     case "gold":
//       return "bg-yellow-500 text-white";
//     case "premium":
//       return "bg-purple-600 text-white";
//     default:
//       return "bg-blue-800 text-white";
//   }
// };

// // ─────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────
// export default function SellerPublicProfile() {
//   const { id } = useParams();

//   const [seller, setSeller] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortBy, setSortBy] = useState("latest");
//   const [openInquiry, setOpenInquiry] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // ── FETCH ──
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const data = await getSellerPublicProfile(id);
//         if (data.success) {
//           setSeller(data.seller);
//           setProducts(data.products);
//           setFiltered(data.products);
//         } else {
//           setError("Seller not found.");
//         }
//       } catch {
//         setError("Failed to load seller profile.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [id]);

//   // ── SORT ──
//   useEffect(() => {
//     let result = [...products];
//     if (sortBy === "price-asc")
//       result.sort((a, b) => (a.price || 0) - (b.price || 0));
//     if (sortBy === "price-desc")
//       result.sort((a, b) => (b.price || 0) - (a.price || 0));
//     if (sortBy === "latest")
//       result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     setFiltered(result);
//   }, [sortBy, products]);

//   const experience = seller?.yearEstablished
//     ? new Date().getFullYear() - Number(seller.yearEstablished)
//     : null;

//   // ── LOADING ──
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50">
//         <div className="bg-blue-950 pb-10 pt-8">
//           <div className="max-w-[1400px] mx-auto px-4">
//             <div className="h-4 w-40 bg-blue-800/40 rounded-full animate-pulse mb-6" />
//             <div className="h-10 w-72 bg-blue-800/40 rounded-xl animate-pulse mb-3" />
//             <div className="h-3 w-52 bg-blue-800/30 rounded animate-pulse" />
//           </div>
//         </div>
//         <div className="max-w-[1400px] mx-auto px-4 py-8">
//           <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//               <div
//                 key={i}
//                 className="h-56 bg-gray-200 rounded-xl animate-pulse"
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── ERROR ──
//   if (error || !seller) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
//         <Package className="w-14 h-14 text-gray-300" />
//         <p className="text-slate-600 text-lg font-semibold">
//           {error || "Seller not found."}
//         </p>
//         <Link to="/" className="text-blue-800 text-sm hover:underline">
//           ← Back to Home
//         </Link>
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* ══ HERO ══ */}
//       <section className="relative overflow-hidden bg-blue-950 pb-10 pt-8">
//         {/* Animated blobs */}
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
//             <Link to="/" className="hover:text-white transition-colors">
//               Home
//             </Link>
//             <ChevronRight className="h-3 w-3" />
//             <span className="text-white">
//               {seller.companyName || seller.name}
//             </span>
//           </nav>

//           <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
//             {/* LEFT */}
//             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
//               {/* Avatar */}
//               <div className="w-20 h-20 rounded-2xl bg-blue-800/60 border border-blue-600/40 flex items-center justify-center text-4xl font-black text-white/30 overflow-hidden flex-shrink-0">
//                 {seller.profileImage?.url ? (
//                   <img
//                     src={seller.profileImage.url}
//                     alt={seller.companyName}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span>{(seller.companyName || seller.name)?.charAt(0)}</span>
//                 )}
//               </div>

//               <div>
//                 {/* Badges */}
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {seller.subscriptionPlan && (
//                     <span
//                       className={`text-[11px] px-3 py-1 rounded-full flex items-center gap-1 font-bold ${planBadge(seller.subscriptionPlan)}`}
//                     >
//                       <Crown className="w-3 h-3" />
//                       {seller.subscriptionPlan === "gold" ? "Gold" : "Premium"}
//                     </span>
//                   )}
//                   <span className="bg-green-500 text-white text-[11px] px-3 py-1 rounded-full flex items-center gap-1 font-bold">
//                     <BadgeCheck className="w-3 h-3" /> Verified
//                   </span>
//                   {seller.companyType && (
//                     <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">
//                       <Factory className="h-3 w-3" />
//                       {seller.companyType}
//                     </div>
//                   )}
//                 </div>

//                 <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
//                   {seller.companyName || seller.name}
//                   <span className="text-orange-400"> Profile</span>
//                 </h1>

//                 {(seller.city || seller.state) && (
//                   <div className="flex items-center gap-1.5 text-blue-200/70 text-sm mb-4">
//                     <MapPin className="w-3.5 h-3.5 text-orange-400" />
//                     {[seller.city, seller.state].filter(Boolean).join(", ")}
//                   </div>
//                 )}

//                 {/* Stats */}
//                 <div className="flex flex-wrap items-center gap-6">
//                   <div className="text-center">
//                     <p className="text-2xl font-bold text-white">
//                       {products.length}+
//                     </p>
//                     <p className="text-[11px] text-blue-300/60">Products</p>
//                   </div>
//                   {experience && (
//                     <>
//                       <div className="h-8 w-px bg-white/10" />
//                       <div className="text-center">
//                         <p className="text-2xl font-bold text-white">
//                           {experience}
//                         </p>
//                         <p className="text-[11px] text-blue-300/60">
//                           Yrs Experience
//                         </p>
//                       </div>
//                     </>
//                   )}
//                   {seller.createdAt && (
//                     <>
//                       <div className="h-8 w-px bg-white/10" />
//                       <div className="text-center">
//                         <p className="text-2xl font-bold text-white">
//                           {new Date(seller.createdAt).getFullYear()}
//                         </p>
//                         <p className="text-[11px] text-blue-300/60">
//                           Member Since
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══ DESCRIPTION ══ */}
//       {seller.description && (
//         <div className="bg-white border-b border-gray-100">
//           <div className="max-w-[1400px] mx-auto px-4 py-4">
//             <p className="text-slate-500 text-sm max-w-3xl leading-relaxed">
//               {seller.description}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ══ PRODUCTS ══ */}
//       <div className="mx-auto max-w-[1400px] px-4 py-8">
//         {/* Section label */}
//         <div className="mb-5">
//           <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
//             <Package className="h-3 w-3" /> Product Catalogue
//           </p>
//           <h2 className="text-2xl font-bold text-slate-900">
//             Products by{" "}
//             <span className="text-blue-800">
//               {seller.companyName || seller.name}
//             </span>
//           </h2>
//         </div>

//         {/* Toolbar */}
//         <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//           <p className="text-sm text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">
//               {filtered.length}
//             </span>{" "}
//             products
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

//         {/* Grid */}
//         {filtered.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-24 text-slate-400">
//             <Package className="mb-3 h-12 w-12 opacity-30" />
//             <h2 className="text-lg font-semibold text-slate-600">
//               No Products Listed
//             </h2>
//             <p className="mt-1 text-sm">
//               This seller hasn't added any products yet.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//             {filtered.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//                 onInquiry={() => {
//                   setSelectedProduct(product);
//                   setOpenInquiry(true);
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ══ INQUIRY MODAL ══ */}
//       <InquiryModal
//         isOpen={openInquiry}
//         onClose={() => setOpenInquiry(false)}
//         productName={selectedProduct?.name || selectedProduct?.title}
//         productId={selectedProduct?._id}
//       />
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // PRODUCT CARD — ✅ UPDATED: compact UI
// // ─────────────────────────────────────────
// function ProductCard({ product, onInquiry }) {
//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:shadow-md">
//       {/* Image */}
//       <div className="h-36 overflow-hidden bg-gray-100">
//         {product.images?.[0]?.url || product.images?.[0] ? (
//           <img
//             src={product.images[0]?.url || product.images[0]}
//             alt={product.name || product.title}
//            className="h-full w-full object-contain"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center">
//             <Package className="w-8 h-8 text-gray-200" />
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-3">
//         <h2 className="line-clamp-1 text-sm font-semibold text-gray-900">
//           {product.name || product.title}
//         </h2>

//         {product.category?.name && (
//           <p className="mt-0.5 text-[11px] text-gray-400">
//             {product.category.name}
//             {product.subcategory?.name ? ` › ${product.subcategory.name}` : ""}
//           </p>
//         )}

//         <p className="mt-1.5 text-sm font-semibold text-blue-800">
//           ₹{product.price?.toLocaleString("en-IN")}
//           {product.unit && (
//             <span className="ml-1 text-[11px] font-normal text-gray-400">
//               / {product.unit}
//             </span>
//           )}
//         </p>

//         {product.moq && (
//           <p className="text-[11px] text-gray-400">
//             MOQ: {product.moq} {product.unit}
//           </p>
//         )}

//         {product.stock <= 5 && product.stock > 0 && (
//           <p className="mt-0.5 text-[11px] font-semibold text-orange-500">
//             Only {product.stock} left
//           </p>
//         )}

//         {/* Buttons */}
//         <div className="mt-3 flex gap-2">
//           <Link
//             to={`/category/${product.category?.slug}/subcategory/${product.subcategory?.slug}/product/${product.slug}`}
//             className="flex-1"
//           >
//             <button className="w-full rounded-lg bg-blue-800 py-1.5 text-xs font-medium text-white transition hover:bg-blue-900">
//               View Details
//             </button>
//           </Link>
//           <button
//             onClick={onInquiry}
//             className="flex-1 rounded-lg border border-blue-800 py-1.5 text-xs font-medium text-blue-800 transition hover:bg-blue-50"
//           >
//             Send Inquiry
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // ✅ UPDATED - added useNavigate
import {
  MapPin,
  BadgeCheck,
  Factory,
  ChevronRight,
  Crown,
  Package,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import InquiryModal from "../components/common/InquiryModal";
import { getSellerPublicProfile } from "../api/sellerProfileApi";

// ─────────────────────────────────────────
// PLAN BADGE
// ─────────────────────────────────────────
const planBadge = (plan) => {
  switch (plan) {
    case "gold":
      return "bg-yellow-500 text-white";
    case "premium":
      return "bg-purple-600 text-white";
    default:
      return "bg-blue-800 text-white";
  }
};

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────
export default function SellerPublicProfile() {
  const { id } = useParams();

  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
  const [openInquiry, setOpenInquiry] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ── FETCH ──
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getSellerPublicProfile(id);
        if (data.success) {
          setSeller(data.seller);
          setProducts(data.products);
          setFiltered(data.products);
        } else {
          setError("Seller not found.");
        }
      } catch {
        setError("Failed to load seller profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  // ── SORT ──
  useEffect(() => {
    let result = [...products];
    if (sortBy === "price-asc")
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sortBy === "price-desc")
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sortBy === "latest")
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFiltered(result);
  }, [sortBy, products]);

  const experience = seller?.yearEstablished
    ? new Date().getFullYear() - Number(seller.yearEstablished)
    : null;

  // ── LOADING ──
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-blue-950 pb-10 pt-8">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="h-4 w-40 bg-blue-800/40 rounded-full animate-pulse mb-6" />
            <div className="h-10 w-72 bg-blue-800/40 rounded-xl animate-pulse mb-3" />
            <div className="h-3 w-52 bg-blue-800/30 rounded animate-pulse" />
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-56 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── ERROR ──
  if (error || !seller) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <Package className="w-14 h-14 text-gray-300" />
        <p className="text-slate-600 text-lg font-semibold">
          {error || "Seller not found."}
        </p>
        <Link to="/" className="text-blue-800 text-sm hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-blue-950 pb-10 pt-8">
        {/* Animated blobs */}
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
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">
              {seller.companyName || seller.name}
            </span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* LEFT */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-blue-800/60 border border-blue-600/40 flex items-center justify-center text-4xl font-black text-white/30 overflow-hidden flex-shrink-0">
                {seller.profileImage?.url ? (
                  <img
                    src={seller.profileImage.url}
                    alt={seller.companyName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{(seller.companyName || seller.name)?.charAt(0)}</span>
                )}
              </div>

              <div>
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {seller.subscriptionPlan && (
                    <span
                      className={`text-[11px] px-3 py-1 rounded-full flex items-center gap-1 font-bold ${planBadge(seller.subscriptionPlan)}`}
                    >
                      <Crown className="w-3 h-3" />
                      {seller.subscriptionPlan === "gold" ? "Gold" : "Premium"}
                    </span>
                  )}
                  <span className="bg-green-500 text-white text-[11px] px-3 py-1 rounded-full flex items-center gap-1 font-bold">
                    <BadgeCheck className="w-3 h-3" /> Verified
                  </span>
                  {seller.companyType && (
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">
                      <Factory className="h-3 w-3" />
                      {seller.companyType}
                    </div>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
                  {seller.companyName || seller.name}
                  <span className="text-orange-400"> Profile</span>
                </h1>

                {(seller.city || seller.state) && (
                  <div className="flex items-center gap-1.5 text-blue-200/70 text-sm mb-4">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    {[seller.city, seller.state].filter(Boolean).join(", ")}
                  </div>
                )}

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {products.length}+
                    </p>
                    <p className="text-[11px] text-blue-300/60">Products</p>
                  </div>
                  {experience && (
                    <>
                      <div className="h-8 w-px bg-white/10" />
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {experience}
                        </p>
                        <p className="text-[11px] text-blue-300/60">
                          Yrs Experience
                        </p>
                      </div>
                    </>
                  )}
                  {seller.createdAt && (
                    <>
                      <div className="h-8 w-px bg-white/10" />
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {new Date(seller.createdAt).getFullYear()}
                        </p>
                        <p className="text-[11px] text-blue-300/60">
                          Member Since
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DESCRIPTION ══ */}
      {seller.description && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-4 py-4">
            <p className="text-slate-500 text-sm max-w-3xl leading-relaxed">
              {seller.description}
            </p>
          </div>
        </div>
      )}

      {/* ══ PRODUCTS ══ */}
      <div className="mx-auto max-w-[1400px] px-4 py-8">
        {/* Section label */}
        <div className="mb-5">
          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Package className="h-3 w-3" /> Product Catalogue
          </p>
          <h2 className="text-2xl font-bold text-slate-900">
            Products by{" "}
            <span className="text-blue-800">
              {seller.companyName || seller.name}
            </span>
          </h2>
        </div>

        {/* Toolbar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filtered.length}
            </span>{" "}
            products
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

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Package className="mb-3 h-12 w-12 opacity-30" />
            <h2 className="text-lg font-semibold text-slate-600">
              No Products Listed
            </h2>
            <p className="mt-1 text-sm">
              This seller hasn't added any products yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((product) => (
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
        )}
      </div>

      {/* ══ INQUIRY MODAL ══ */}
      <InquiryModal
        isOpen={openInquiry}
        onClose={() => setOpenInquiry(false)}
        productName={selectedProduct?.name || selectedProduct?.title}
        productId={selectedProduct?._id}
      />
    </div>
  );
}

// ─────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────
function ProductCard({ product, onInquiry }) {
  const navigate = useNavigate(); // ✅ NEW

  const detailsUrl = `/category/${product.category?.slug}/subcategory/${product.subcategory?.slug}/product/${product.slug}`; // ✅ NEW - reused for card click + button

  return (
    <div
      onClick={() => navigate(detailsUrl)} // ✅ NEW - poora card clickable
      className="overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:shadow-md cursor-pointer" // ✅ UPDATED - added cursor-pointer
    >
      {/* Image */}
      <div className="h-36 overflow-hidden bg-gray-100">
        {product.images?.[0]?.url || product.images?.[0] ? (
          <img
            src={product.images[0]?.url || product.images[0]}
            alt={product.name || product.title}
           className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="w-8 h-8 text-gray-200" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h2 className="line-clamp-1 text-sm font-semibold text-gray-900">
          {product.name || product.title}
        </h2>

        {product.category?.name && (
          <p className="mt-0.5 text-[11px] text-gray-400">
            {product.category.name}
            {product.subcategory?.name ? ` › ${product.subcategory.name}` : ""}
          </p>
        )}

        <p className="mt-1.5 text-sm font-semibold text-blue-800">
          ₹{product.price?.toLocaleString("en-IN")}
          {product.unit && (
            <span className="ml-1 text-[11px] font-normal text-gray-400">
              / {product.unit}
            </span>
          )}
        </p>

        {product.moq && (
          <p className="text-[11px] text-gray-400">
            MOQ: {product.moq} {product.unit}
          </p>
        )}

        {product.stock <= 5 && product.stock > 0 && (
          <p className="mt-0.5 text-[11px] font-semibold text-orange-500">
            Only {product.stock} left
          </p>
        )}

        {/* Buttons */}
        <div className="mt-3 flex gap-2">
          <Link
            to={detailsUrl}
            className="flex-1"
            onClick={(e) => e.stopPropagation()} // ✅ NEW - card ke onClick ke saath double-navigate na ho
          >
            <button className="w-full rounded-lg bg-blue-800 py-1.5 text-xs font-medium text-white transition hover:bg-blue-900">
              View Details
            </button>
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ NEW - card ke onClick ko trigger hone se roke
              onInquiry();
            }}
            className="flex-1 rounded-lg border border-blue-800 py-1.5 text-xs font-medium text-blue-800 transition hover:bg-blue-50"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}