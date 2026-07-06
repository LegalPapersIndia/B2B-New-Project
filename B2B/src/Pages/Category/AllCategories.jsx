// // src/Pages/Category/AllCategories.jsx

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import * as LucideIcons from "lucide-react";
// import { ChevronRight, LayoutGrid } from "lucide-react"; // ✅ NEW
// import { getCategories } from "../../api/categoryApi";
// import { getSubCategoriesByCategory } from "../../api/subCategoryApi";

// export default function AllCategories() {
//   const [categories, setCategories] = useState([]);
//   const [subCategoriesMap, setSubCategoriesMap] = useState({});
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH =================
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const catRes = await getCategories();
//       const cats = catRes.categories || [];
//       setCategories(cats);

//       // FETCH SUBCATEGORIES FOR EACH CATEGORY
//       const map = {};
//       await Promise.all(
//         cats.map(async (cat) => {
//           const subRes = await getSubCategoriesByCategory(cat._id);
//           map[cat._id] = subRes.subCategories || [];
//         })
//       );
//       setSubCategoriesMap(map);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* ✅ NEW - HERO (same style as HubPage) */}
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
//             <span className="capitalize text-white">All Categories</span>
//           </nav>

//           <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

//             {/* Left */}
//             <div>
//               <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">
//                 <LayoutGrid className="h-3 w-3" />
//                 Wholesale Marketplace
//               </div>

//               <h1 className="mb-1 text-4xl font-bold tracking-tight text-white md:text-5xl">
//                 All <span className="text-orange-400">Categories</span>
//               </h1>

//               <p className="mb-6 text-sm text-blue-200/60">
//                 Browse all categories and their subcategories
//               </p>

//               {/* Stats */}
//               <div className="flex flex-wrap items-center gap-6">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-white">
//                     {categories.length}
//                   </p>
//                   <p className="text-[11px] text-blue-300/60">Categories</p>
//                 </div>
//                 <div className="h-8 w-px bg-white/10" />
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-white">
//                     {Object.values(subCategoriesMap).reduce((acc, arr) => acc + arr.length, 0)}
//                   </p>
//                   <p className="text-[11px] text-blue-300/60">Subcategories</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= LOADING ================= */}
//       {loading && (
//         <div className="flex items-center justify-center py-24">
//           <div className="text-center">
//             <div className="mx-auto mb-3 h-12 w-12 animate-spin rounded-full border-4 border-blue-800 border-t-transparent" />
//             <p className="text-sm text-slate-500">Loading categories...</p>
//           </div>
//         </div>
//       )}

//       {/* ================= CATEGORY SECTIONS ================= */}
//       {!loading && (
//         <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 space-y-12">
//           {categories.map((cat) => {
//             const IconComponent = LucideIcons[cat.icon] || LucideIcons.Factory;
//             const subCats = subCategoriesMap[cat._id] || [];

//             return (
//               <section key={cat._id} className="bg-white rounded-2xl border border-gray-200 p-6">
//                 {/* CATEGORY HEADER */}
//                 <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 flex items-center justify-center bg-orange-50 rounded-xl border border-orange-100">
//                       <IconComponent className="text-orange-600" size={24} />
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-800">{cat.name}</h2>
//                       <p className="text-xs text-gray-400">{subCats.length} subcategories</p>
//                     </div>
//                   </div>

//                   <Link
//                     to={`/category/${cat.slug}`}
//                     className="text-sm text-blue-800 font-medium hover:underline"
//                   >
//                     View Category →
//                   </Link>
//                 </div>

//                 {/* SUBCATEGORY GRID */}
//                 {subCats.length > 0 ? (
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                     {subCats.map((sub) => (
//                       <Link
//                         key={sub._id}
//                         to={`/category/${cat.slug}/subcategory/${sub.slug}`}
//                         className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-blue-200 transition duration-300"
//                       >
//                         <div className="h-24 overflow-hidden bg-gray-100">
//                           {sub.image ? (
//                             <img
//                               src={sub.image}
//                               alt={sub.name}
//                               className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
//                               No Image
//                             </div>
//                           )}
//                         </div>
//                         <div className="p-2">
//                           <h3 className="font-medium text-gray-800 text-xs line-clamp-1 group-hover:text-blue-800 transition">
//                             {sub.name}
//                           </h3>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-400 text-sm">No subcategories found</p>
//                 )}
//               </section>
//             );
//           })}

//           {/* EMPTY */}
//           {categories.length === 0 && (
//             <div className="text-center py-20">
//               <h2 className="text-xl font-semibold text-gray-600">No categories found</h2>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



// src/Pages/Category/AllCategories.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { getCategories } from "../../api/categoryApi";
import { getSubCategoriesByCategory } from "../../api/subCategoryApi";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const catRes = await getCategories();
      // ✅ UPDATED - order-wise sort (jaise Sidebar.jsx mein kiya tha)
      const cats = (catRes.categories || []).sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );
      setCategories(cats);

      // FETCH SUBCATEGORIES FOR EACH CATEGORY
      const map = {};
      await Promise.all(
        cats.map(async (cat) => {
          const subRes = await getSubCategoriesByCategory(cat._id);
          map[cat._id] = subRes.subCategories || [];
        })
      );
      setSubCategoriesMap(map);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO (same style as HubPage) */}
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
            <span className="capitalize text-white">All Categories</span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            {/* Left */}
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">
                <LayoutGrid className="h-3 w-3" />
                Wholesale Marketplace
              </div>

              <h1 className="mb-1 text-4xl font-bold tracking-tight text-white md:text-5xl">
                All <span className="text-orange-400">Categories</span>
              </h1>

              <p className="mb-6 text-sm text-blue-200/60">
                Browse all categories and their subcategories
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {categories.length}
                  </p>
                  <p className="text-[11px] text-blue-300/60">Categories</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {Object.values(subCategoriesMap).reduce((acc, arr) => acc + arr.length, 0)}
                  </p>
                  <p className="text-[11px] text-blue-300/60">Subcategories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="mx-auto mb-3 h-12 w-12 animate-spin rounded-full border-4 border-blue-800 border-t-transparent" />
            <p className="text-sm text-slate-500">Loading categories...</p>
          </div>
        </div>
      )}

      {/* ================= CATEGORY SECTIONS ================= */}
      {!loading && (
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 space-y-12">
          {categories.map((cat) => {
            const IconComponent = LucideIcons[cat.icon] || LucideIcons.Factory;
            const subCats = subCategoriesMap[cat._id] || [];

            return (
              <section key={cat._id} className="bg-white rounded-2xl border border-gray-200 p-6">
                {/* CATEGORY HEADER */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-orange-50 rounded-xl border border-orange-100">
                      <IconComponent className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{cat.name}</h2>
                      <p className="text-xs text-gray-400">{subCats.length} subcategories</p>
                    </div>
                  </div>

                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-sm text-blue-800 font-medium hover:underline"
                  >
                    View Category →
                  </Link>
                </div>

                {/* SUBCATEGORY GRID */}
                {subCats.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {subCats.map((sub) => (
                      <Link
                        key={sub._id}
                        to={`/category/${cat.slug}/subcategory/${sub.slug}`}
                        className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-blue-200 transition duration-300"
                      >
                        <div className="h-24 overflow-hidden bg-gray-100">
                          {sub.image ? (
                            <img
                              src={sub.image}
                              alt={sub.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <h3 className="font-medium text-gray-800 text-xs line-clamp-1 group-hover:text-blue-800 transition">
                            {sub.name}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No subcategories found</p>
                )}
              </section>
            );
          })}

          {/* EMPTY */}
          {categories.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold text-gray-600">No categories found</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}