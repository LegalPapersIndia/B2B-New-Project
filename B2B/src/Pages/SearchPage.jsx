// // src/pages/SearchPage.jsx

// import React, { useState, useEffect } from "react";
// import { Link, useSearchParams } from "react-router-dom";
// import { MapPin, Search, SlidersHorizontal } from "lucide-react";
// import { searchProducts } from "../api/productApi";

// export default function SearchPage() {
//   const [searchParams] = useSearchParams();

//   const q     = searchParams.get("q")     || "";
//   const state = searchParams.get("state") || "";
//   const city  = searchParams.get("city")  || "";

//   const [products, setProducts] = useState([]);
//   const [loading,  setLoading]  = useState(true);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         setLoading(true);
//         const data = await searchProducts({
//           search: q,
//           state,
//           city,
//         });
//         if (data.success) setProducts(data.products);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, [q, state, city]);

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* HEADER */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-5">
//           <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//             <Link to="/" className="hover:text-blue-800">Home</Link>
//             <span>/</span>
//             <span className="text-gray-900 font-medium">Search Results</span>
//           </div>
//           <div className="flex items-center gap-3 flex-wrap">
//             <Search className="w-5 h-5 text-orange-600" />
//             <h1 className="text-2xl font-bold text-gray-900">
//               {q ? `Results for "${q}"` : "All Products"}
//             </h1>
//             {(state || city) && (
//               <span className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                 <MapPin className="w-3 h-3 text-orange-600" />
//                 {[city, state].filter(Boolean).join(", ")}
//               </span>
//             )}
//             <span className="text-sm text-gray-400">
//               {loading ? "Searching..." : `${products.length} products found`}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-7xl mx-auto px-4 py-8">

//         {/* LOADING */}
//         {loading && (
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
//               <p className="text-gray-500 text-sm">Searching products...</p>
//             </div>
//           </div>
//         )}

//         {/* EMPTY */}
//         {!loading && products.length === 0 && (
//           <div className="text-center py-20">
//             <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h2 className="text-xl font-semibold text-gray-600">
//               No products found
//             </h2>
//             <p className="text-gray-400 mt-2">
//               Try different keywords or location
//             </p>
//             <Link to="/" className="mt-5 inline-block bg-blue-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-900 transition">
//               Go Home
//             </Link>
//           </div>
//         )}

//         {/* PRODUCTS GRID */}
//         {!loading && products.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map(p => (
//               <div key={p._id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300 group">

//                 {/* IMAGE */}
//                 <div className="h-48 bg-gray-100 overflow-hidden">
//                   {p.images?.[0]?.url ? (
//                     <img
//                       src={p.images[0].url}
//                       alt={p.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
//                       No Image
//                     </div>
//                   )}
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-800 transition">
//                     {p.title}
//                   </h3>

//                   <p className="text-sm text-blue-700 font-medium mt-1">
//                     {p.seller?.companyName || p.seller?.name || "—"}
//                   </p>

//                   {(p.seller?.city || p.seller?.state) && (
//                     <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
//                       <MapPin className="w-3 h-3 text-orange-600" />
//                       {[p.seller?.city, p.seller?.state].filter(Boolean).join(", ")}
//                     </div>
//                   )}

//                   <p className="text-blue-800 font-bold mt-2">
//                     ₹{p.price?.toLocaleString()}
//                     <span className="text-gray-400 text-xs font-normal ml-1">/ {p.unit}</span>
//                   </p>
//                   <p className="text-xs text-gray-400 mt-0.5">MOQ: {p.moq} {p.unit}</p>

//                   <Link
//                     to={`/category/${p.category?.slug}/subcategory/${p.subcategory?.slug}/product/${p.slug}`}
//                     className="mt-4 w-full bg-orange-600 hover:bg-blue-800 text-white py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/pages/SearchPage.jsx

import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { searchProducts } from "../api/productApi";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // ✅ NEW - poora card clickable karne ke liye

  const q     = searchParams.get("q")     || "";
  const state = searchParams.get("state") || "";
  const city  = searchParams.get("city")  || "";

  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await searchProducts({
          search: q,
          state,
          city,
        });
        if (data.success) setProducts(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [q, state, city]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link to="/" className="hover:text-blue-800">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Search Results</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Search className="w-5 h-5 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              {q ? `Results for "${q}"` : "All Products"}
            </h1>
            {(state || city) && (
              <span className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                <MapPin className="w-3 h-3 text-orange-600" />
                {[city, state].filter(Boolean).join(", ")}
              </span>
            )}
            <span className="text-sm text-gray-400">
              {loading ? "Searching..." : `${products.length} products found`}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Searching products...</p>
            </div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600">
              No products found
            </h2>
            <p className="text-gray-400 mt-2">
              Try different keywords or location
            </p>
            <Link to="/" className="mt-5 inline-block bg-blue-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-900 transition">
              Go Home
            </Link>
          </div>
        )}

        {/* PRODUCTS GRID */}
        {/* ✅ UPDATED - ek extra column added (2xl:grid-cols-5) taaki chhote card ke saath grid dense dikhe, gap thoda kam kiya */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map(p => {
              const detailsUrl = `/category/${p.category?.slug}/subcategory/${p.subcategory?.slug}/product/${p.slug}`; // ✅ NEW

              return (
                <div
                  key={p._id}
                  onClick={() => navigate(detailsUrl)} // ✅ NEW - poora card clickable
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300 group cursor-pointer" // ✅ UPDATED - cursor-pointer added
                >

                  {/* IMAGE */}
                  {/* ✅ UPDATED - image height chhota kiya (h-48 -> h-36) */}
                  <div className="h-36 bg-gray-100 overflow-hidden">
                    {p.images?.[0]?.url ? (
                      <img
                        src={p.images[0].url}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  {/* ✅ UPDATED - padding chhota kiya (p-4 -> p-3) */}
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-blue-800 transition">
                      {p.title}
                    </h3>

                    <p className="text-xs text-blue-700 font-medium mt-1">
                      {p.seller?.companyName || p.seller?.name || "—"}
                    </p>

                    {(p.seller?.city || p.seller?.state) && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-orange-600 flex-shrink-0" />
                        {[p.seller?.city, p.seller?.state].filter(Boolean).join(", ")}
                      </div>
                    )}

                    <p className="text-blue-800 font-bold mt-2 text-sm">
                      ₹{p.price?.toLocaleString()}
                      <span className="text-gray-400 text-xs font-normal ml-1">/ {p.unit}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">MOQ: {p.moq} {p.unit}</p>

                    <Link
                      to={detailsUrl}
                      onClick={(e) => e.stopPropagation()} // ✅ NEW - card ke onClick ke saath double-navigate na ho
                      className="mt-3 w-full bg-orange-600 hover:bg-blue-800 text-white py-2 rounded-xl text-xs font-medium transition flex items-center justify-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}