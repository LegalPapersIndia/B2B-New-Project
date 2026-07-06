


// // src/Pages/Category/CategoryDetails.jsx

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getCategories } from "../../api/categoryApi";
// import { getSubCategoriesByCategory } from "../../api/subCategoryApi";

// export default function CategoryDetails() {
//   const { slug } = useParams();

//   // ─────────────────────────────────────────
//   // STATES
//   // ─────────────────────────────────────────
//   const [category, setCategory]         = useState(null);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading]           = useState(true);

//   // ─────────────────────────────────────────
//   // FETCH CATEGORY + SUBCATEGORIES
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // CATEGORY FIND
//         const catRes = await getCategories();
//         const found = (catRes.categories || []).find(
//           (item) => item.slug === slug
//         );
//         setCategory(found || null);

//         if (found) {
//           // SUBCATEGORIES FETCH
//           const subRes = await getSubCategoriesByCategory(found._id);
//           setSubCategories(subRes.subCategories || []);
//         }

//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [slug]);

//   // ─────────────────────────────────────────
//   // LOADING
//   // ─────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
//           <p className="text-gray-500 text-sm">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────
//   // NOT FOUND
//   // ─────────────────────────────────────────
//   if (!category) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-700">Category Not Found</h1>
//           <Link to="/" className="mt-4 inline-block text-blue-800 hover:underline">
//             Go Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="bg-gray-50 min-h-screen">

//       {/* ── HERO ── */}
//       <div className="relative h-[340px] overflow-hidden">
//         <img
//           src={category.image}
//           alt={category.name}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/60" />

//         <div className="absolute inset-0 flex items-center">
//           <div className="max-w-7xl mx-auto px-6 w-full text-white">

//             {/* BREADCRUMB */}
//             <div className="flex items-center gap-2 text-sm mb-4">
//               <Link to="/" className="text-gray-300 hover:text-white transition">
//                 Home
//               </Link>
//               <span className="text-gray-400">/</span>
//               <span className="text-white font-medium">{category.name}</span>
//             </div>

//             {/* TITLE */}
//             <h1 className="text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">
//               {category.name}
//             </h1>

//             <p className="mt-4 text-base lg:text-lg text-gray-200 max-w-2xl">
//               {category.desc}
//             </p>

//           <div className="flex flex-wrap gap-4 mt-7"> {/*  UPDATED - buttons removed, stats shown */}
//               <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-2xl font-semibold">
//                 {subCategories.length} Subcategories
//               </span>
//               <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-2xl font-semibold">
//                 {category.productCount || 0}+ Products
//               </span>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* ── SUBCATEGORIES ── */}
//       <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">

//         {/* HEADING */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Browse {category.name} Categories
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             {subCategories.length} categories found
//           </p>
//         </div>

//         {/* GRID */}
//         {subCategories.length > 0 ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
//             {subCategories.map((sub) => (
//               <Link
//                 key={sub._id}
//                 to={`/category/${category.slug}/subcategory/${sub.slug}`}
//                 className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition duration-300"
//               >
//                 {/* IMAGE */}
//                 <div className="h-36 overflow-hidden bg-gray-100">
//                   {sub.image ? (
//                     <img
//                       src={sub.image}
//                       alt={sub.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
//                       No Image
//                     </div>
//                   )}
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-3">
//                   <h3 className="font-semibold text-gray-800 text-sm line-clamp-1 group-hover:text-blue-800 transition">
//                     {sub.name}
//                   </h3>
//                   {sub.desc && (
//                     <p className="text-xs text-gray-400 mt-1 line-clamp-2">
//                       {sub.desc}
//                     </p>
//                   )}
//                   <p className="text-xs text-blue-800 font-medium mt-2 group-hover:underline">
//                     Explore →
//                   </p>
//                 </div>

//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <h2 className="text-xl font-semibold text-gray-600">
//               No subcategories found
//             </h2>
//             <p className="text-gray-400 mt-2 text-sm">
//               Check back soon for updates.
//             </p>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }




// src/Pages/Category/CategoryDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategories } from "../../api/categoryApi";
import { getSubCategoriesByCategory } from "../../api/subCategoryApi";

export default function CategoryDetails() {
  const { slug } = useParams();

  // ─────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────
  const [category, setCategory]         = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading]           = useState(true);

  // ─────────────────────────────────────────
  // FETCH CATEGORY + SUBCATEGORIES
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // CATEGORY FIND
        const catRes = await getCategories();
        const found = (catRes.categories || []).find(
          (item) => item.slug === slug
        );
        setCategory(found || null);

        if (found) {
          // SUBCATEGORIES FETCH
          const subRes = await getSubCategoriesByCategory(found._id);
          // ✅ UPDATED - order-wise sort (jaise SubCategoryGrid.jsx mein kiya tha)
          const sortedSubs = (subRes.subCategories || []).sort(
            (a, b) => (a.order ?? 0) - (b.order ?? 0)
          );
          setSubCategories(sortedSubs);
        }

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // ─────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // NOT FOUND
  // ─────────────────────────────────────────
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700">Category Not Found</h1>
          <Link to="/" className="mt-4 inline-block text-blue-800 hover:underline">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── HERO ── */}
      <div className="relative h-[340px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full text-white">

            {/* BREADCRUMB */}
            <div className="flex items-center gap-2 text-sm mb-4">
              <Link to="/" className="text-gray-300 hover:text-white transition">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-white font-medium">{category.name}</span>
            </div>

            {/* TITLE */}
            <h1 className="text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">
              {category.name}
            </h1>

            <p className="mt-4 text-base lg:text-lg text-gray-200 max-w-2xl">
              {category.desc}
            </p>

          <div className="flex flex-wrap gap-4 mt-7">
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-2xl font-semibold">
                {subCategories.length} Subcategories
              </span>
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-2xl font-semibold">
                {category.productCount || 0}+ Products
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ── SUBCATEGORIES ── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">

        {/* HEADING */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Browse {category.name} Categories
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {subCategories.length} categories found
          </p>
        </div>

        {/* GRID */}
        {subCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {subCategories.map((sub) => (
              <Link
                key={sub._id}
                to={`/category/${category.slug}/subcategory/${sub.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition duration-300"
              >
                {/* IMAGE */}
                <div className="h-36 overflow-hidden bg-gray-100">
                  {sub.image ? (
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                      No Image
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-1 group-hover:text-blue-800 transition">
                    {sub.name}
                  </h3>
                  {sub.desc && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {sub.desc}
                    </p>
                  )}
                  <p className="text-xs text-blue-800 font-medium mt-2 group-hover:underline">
                    Explore →
                  </p>
                </div>

              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-600">
              No subcategories found
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              Check back soon for updates.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}