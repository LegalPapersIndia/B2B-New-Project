

// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { ChevronRight, Grid3X3 } from "lucide-react"; // ✅ UPDATED - keep existing imports
// import InquiryModal from "../../components/common/InquiryModal";
// import { getProductsBySubCategory } from "../../api/productApi";
// import FilterSidebar from "../Category/FilterSidebar";

// export default function SubCategoryPage() {
//   const { categorySlug, subcategorySlug } = useParams();

//   // ─────────────────────────────────────────
//   // STATES
//   // ─────────────────────────────────────────
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [openInquiry, setOpenInquiry] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // FILTER STATES
//   const [selectedState, setSelectedState] = useState("");
//   const [verifiedOnly, setVerifiedOnly] = useState(false);
//   const [price, setPrice] = useState(10000000);

//   // FORMAT NAMES
//   const categoryName = categorySlug.replace(/-/g, " ");
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
//           setFilteredProducts(data.products);
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
//   // APPLY FILTERS
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     let result = [...products];

//     // PRICE FILTER
//     result = result.filter((p) => Number(p.price || 0) <= price);

//     setFilteredProducts(result);
//   }, [price, selectedState, verifiedOnly, products]);

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#f8f8f8]">
//       {/* ✅ UPDATED - HERO (same style as CategoryDetails / AllCategories) */}
//       <div className="relative h-[240px] overflow-hidden bg-gradient-to-r from-blue-950 to-blue-900">

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

//         <div className="absolute inset-0 flex items-center">
//           <div className="max-w-7xl mx-auto px-6 w-full text-white relative z-10">

//             {/* BREADCRUMB */}
//             <div className="flex items-center gap-2 text-sm mb-4 text-blue-300/70">
//               <Link to="/" className="hover:text-white transition-colors">
//                 Home
//               </Link>
//               <ChevronRight className="w-4 h-4" />
//               <Link
//                 to={`/category/${categorySlug}`}
//                 className="capitalize hover:text-white transition-colors"
//               >
//                 {categoryName}
//               </Link>
//               <ChevronRight className="w-4 h-4" />
//               <span className="capitalize text-white font-medium">
//                 {subcategoryName}
//               </span>
//             </div>

//             {/* TITLE */}
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
//                 <Grid3X3 className="w-6 h-6 text-orange-400" />
//               </div>
//               <h1 className="text-3xl lg:text-4xl font-bold capitalize">
//                 {subcategoryName}
//               </h1>
//             </div>

//             {/* STATS BADGES */}
//             <div className="flex flex-wrap gap-4">
//               <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-2xl font-semibold">
//                 {filteredProducts.length} Products
//               </span>
//               <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-2xl font-semibold capitalize">
//                 {categoryName}
//               </span>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">
//           {/* ── SIDEBAR ── */}
//           <div className="lg:col-span-1">
//             <FilterSidebar
//               selectedState={selectedState}
//               setSelectedState={setSelectedState}
//               verifiedOnly={verifiedOnly}
//               setVerifiedOnly={setVerifiedOnly}
//               price={price}
//               setPrice={setPrice}
//               categorySlug={categorySlug}
//             />
//           </div>

//           {/* ── PRODUCTS ── */}
//           <div className="lg:col-span-3">
//             {/* LOADING */}
//             {loading && (
//               <div className="flex items-center justify-center py-20">
//                 <div className="text-center">
//                   <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
//                   <p className="text-gray-500 text-sm">Loading products...</p>
//                 </div>
//               </div>
//             )}

//             {/* ERROR */}
//             {!loading && error && (
//               <div className="text-center py-20">
//                 <p className="text-red-500">{error}</p>
//               </div>
//             )}

//             {/* PRODUCTS GRID */}
//             {!loading && !error && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map((product) => (
//                     <div
//                       key={product._id}
//                       className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
//                     >
//                       {/* IMAGE */}
//                       <div className="h-52 bg-white overflow-hidden">
//                         {product.images?.[0]?.url ? (
//                           <img
//                             src={product.images[0].url}
//                             alt={product.title}
//                             className="w-full h-full object-contain hover:scale-105 transition duration-300"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
//                             No Image
//                           </div>
//                         )}
//                       </div>

//                       {/* CONTENT */}
//                       {/* CONTENT */}
//                       <div className="p-4">
//                         <h2 className="font-semibold text-gray-900 line-clamp-1">
//                           {product.title}
//                         </h2>

//                         <p className="text-sm text-blue-700 font-medium mt-1">
//                           {product.seller?.companyWebsite ? (
//                             <a
//                               href={product.seller.companyWebsite}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="hover:underline"
//                             >
//                               {product.seller?.companyName ||
//                                 product.seller?.name ||
//                                 "—"}
//                             </a>
//                           ) : (
//                             <span>
//                               {product.seller?.companyName ||
//                                 product.seller?.name ||
//                                 "—"}
//                             </span>
//                           )}
//                         </p>

//                         {(product.seller?.city || product.seller?.state) && (
//                           <p className="text-xs text-gray-400 mt-0.5">
//                             📍{" "}
//                             {[product.seller?.city, product.seller?.state]
//                               .filter(Boolean)
//                               .join(", ")}
//                           </p>
//                         )}

//                         <p className="text-blue-800 font-semibold mt-2">
//                           ₹{product.price?.toLocaleString()}
//                           <span className="text-gray-400 text-xs font-normal ml-1">
//                             / {product.unit}
//                           </span>
//                         </p>
//                         <p className="text-xs text-gray-400 mt-1">
//                           MOQ: {product.moq} {product.unit}
//                         </p>

//                         <div className="flex gap-3 mt-4">
//                           <Link
//                             to={`/category/${categorySlug}/subcategory/${subcategorySlug}/product/${product.slug}`}
//                             className="flex-1"
//                           >
//                             <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium transition">
//                               View Details
//                             </button>
//                           </Link>
//                           <button
//                             onClick={() => {
//                               setOpenInquiry(true);
//                               setSelectedProduct(product);
//                             }}
//                             className="flex-1 border border-blue-800 text-blue-800 hover:bg-blue-50 py-2.5 rounded-xl text-sm font-medium transition"
//                           >
//                             Send Inquiry
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="col-span-full text-center py-20">
//                     <h2 className="text-2xl font-semibold text-gray-700">
//                       No Products Found
//                     </h2>
//                     <p className="text-gray-500 mt-2">
//                       Try adjusting your filters.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* INQUIRY MODAL */}
//       <InquiryModal
//         isOpen={openInquiry}
//         onClose={() => setOpenInquiry(false)}
//         productName={selectedProduct?.title}
//         productId={selectedProduct?._id}
//       />
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Grid3X3, MapPin } from "lucide-react"; 
import InquiryModal from "../../components/common/InquiryModal";
import { getProductsBySubCategory } from "../../api/productApi";
import FilterSidebar from "../Category/FilterSidebar";

export default function SubCategoryPage() {
  const { categorySlug, subcategorySlug } = useParams();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openInquiry, setOpenInquiry] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedState, setSelectedState] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [price, setPrice] = useState(10000000);

  const categoryName = categorySlug.replace(/-/g, " ");
  const subcategoryName = subcategorySlug.replace(/-/g, " ");

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

  useEffect(() => {
    let result = [...products];
    result = result.filter((p) => Number(p.price || 0) <= price);
    setFilteredProducts(result);
  }, [price, selectedState, verifiedOnly, products]);

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* HERO */}
      <div className="relative h-[240px] overflow-hidden bg-gradient-to-r from-blue-950 to-blue-900">
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

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full text-white relative z-10">
            <div className="flex items-center gap-2 text-sm mb-4 text-blue-300/70">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to={`/category/${categorySlug}`} className="capitalize hover:text-white transition-colors">
                {categoryName}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="capitalize text-white font-medium">{subcategoryName}</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Grid3X3 className="w-6 h-6 text-orange-400" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold capitalize">{subcategoryName}</h1>
            </div>

            <div className="flex flex-wrap gap-4">
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-2xl font-semibold">
                {filteredProducts.length} Products
              </span>
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-2xl font-semibold capitalize">
                {categoryName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ✅ UPDATED - align-items start so sidebar doesn't stretch, sidebar sticky */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-7 items-start">

          {/* ── SIDEBAR ── */}
          {/* ✅ UPDATED - sticky top-4 so sidebar stays fixed while products scroll */}
          <div className="lg:col-span-1 sticky top-4">
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
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Loading products...</p>
                </div>
              </div>
            )}

            {!loading && error && (
              <div className="text-center py-20">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
                    >
                      {/* IMAGE */}
                      <div className="h-52 bg-white overflow-hidden">
                        {product.images?.[0]?.url ? (
                          <img
                            src={product.images[0].url}
                            alt={product.title}
                            className="w-full h-full object-contain hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="p-4">
                        <h2 className="font-semibold text-gray-900 line-clamp-1">{product.title}</h2>

                        <p className="mt-1 text-sm font-medium text-slate-600">
  {product.seller?.companyName || product.seller?.name || "—"}
</p>

                        {(product.seller?.city || product.seller?.state) && (
                          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-orange-500 flex-shrink-0" /> {/* ✅ UPDATED - emoji replaced with MapPin icon */}
                            {[product.seller?.city, product.seller?.state].filter(Boolean).join(", ")}
                          </p>
                        )}

                        <p className="text-blue-800 font-semibold mt-2">
                          ₹{product.price?.toLocaleString()}
                          <span className="text-gray-400 text-xs font-normal ml-1">/ {product.unit}</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">MOQ: {product.moq} {product.unit}</p>

                        <div className="flex gap-3 mt-4">
                          <Link to={`/category/${categorySlug}/subcategory/${subcategorySlug}/product/${product.slug}`} className="flex-1">
                            <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium transition">
                              View Details
                            </button>
                          </Link>
                          <button
                            onClick={() => { setOpenInquiry(true); setSelectedProduct(product); }}
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
                    <h2 className="text-2xl font-semibold text-gray-700">No Products Found</h2>
                    <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
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