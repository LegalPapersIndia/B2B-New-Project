

// import React, {
//   useRef,
//   useEffect,
//   useState,
// } from "react";

// import {
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// import { Link } from "react-router-dom";

// import { getSubCategories } from "../../api/subCategoryApi";

// // =========================
// // PRODUCT CARD
// // =========================
// function ProductCard({
//   img,
//   title,
//   categorySlug,
//   subcategory,
// }) {
//   return (
//     <Link
//       to={`/category/${categorySlug}/subcategory/${subcategory}`}
//       className="relative w-[270px] h-[190px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group block"
//     >
//       <img
//         src={img}
//         alt={title}
//         className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//       />

//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

//       <div className="absolute bottom-3 left-3 text-white">
//         <h4 className="text-base font-semibold">
//           {title}
//         </h4>

//         <p className="text-xs text-gray-200">
//           Verified Supplier
//         </p>
//       </div>
//     </Link>
//   );
// }

// // =========================
// // MAIN COMPONENT
// // =========================
// export default function ProductStrip({
//   categorySlug,
// }) {
//   const scrollRef = useRef(null);

//   const intervalRef = useRef(null);

//   const [isHovered, setIsHovered] =
//     useState(false);

//   const [subCategories, setSubCategories] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(false);

//   // =========================
//   // FETCH SUBCATEGORIES
//   // =========================
//   useEffect(() => {
//     fetchSubCategories();
//   }, []);

//   const fetchSubCategories = async () => {
//     try {
//       setLoading(true);

//       const data =
//         await getSubCategories();

//       setSubCategories(
//         data.subCategories || []
//       );
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // LIMIT + DUPLICATE
//   // =========================
  
//   const filteredSubCategories =
//   subCategories.filter(
//     (item) =>
//       item.category?.slug ===
//       categorySlug
//   );

// const limited =
//   filteredSubCategories.slice(0, 10);

//   const duplicatedItems = limited;

//   // =========================
//   // AUTO SCROLL
//   // =========================
//   useEffect(() => {
//     const el = scrollRef.current;

//     if (!el) return;

//     intervalRef.current = setInterval(
//       () => {
//         if (isHovered) return;

//         el.scrollLeft += 1;

//         // RESET FOR INFINITE LOOP
//       if (
//   el.scrollLeft + el.clientWidth >=
//   el.scrollWidth
// ) {
//   el.scrollLeft = 0;
// }
//       },
//       16
//     );

//     return () =>
//       clearInterval(intervalRef.current);
//   }, [isHovered]);

//   // =========================
//   // BUTTON SCROLL
//   // =========================
//   const scroll = (dir) => {
//     const el = scrollRef.current;

//     if (!el) return;

//     const amount = 320;

//     el.scrollBy({
//       left:
//         dir === "next"
//           ? amount
//           : -amount,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div
//       className="relative w-full mt-10 group"
//       onMouseEnter={() =>
//         setIsHovered(true)
//       }
//       onMouseLeave={() =>
//         setIsHovered(false)
//       }
//     >
//       {/* LEFT BUTTON */}
//       <button
//         onClick={() => scroll("prev")}
//         className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
//       >
//         <FaChevronLeft />
//       </button>

//       {/* RIGHT BUTTON */}
//       <button
//         onClick={() => scroll("next")}
//         className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
//       >
//         <FaChevronRight />
//       </button>

//       {/* SCROLL AREA */}
//      <div
//   ref={scrollRef}
//   className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
//   style={{
//     WebkitOverflowScrolling: "touch",
//     scrollbarWidth: "none",
//   }}
//   onTouchStart={() => setIsHovered(true)}
//   onTouchEnd={() => setIsHovered(false)}
// >
//         {loading ? (
//           <p className="text-white p-4">
//             Loading...
//           </p>
//         ) : limited.length > 0 ? (
//           duplicatedItems.map(
//             (item, i) => (
//               <ProductCard
//                 key={`${item._id}-${i}`}
//                 img={item.image}
//                 title={item.name}
//                 categorySlug={
//                   item.category?.slug ||
//                   "category"
//                 }
//                 subcategory={item.slug}
//               />
//             )
//           )
//         ) : (
//           <p className="text-gray-400 p-4">
//             No subcategories found
//           </p>
//         )}
//       </div>

//       {/* HIDE SCROLLBAR */}
//       <style>
//         {`
//           .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//           }
//         `}
//       </style>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getSubCategories } from "../../api/subCategoryApi";

// // =========================
// // SUBCATEGORY CARD
// // =========================
// function SubCategoryCard({ img, title, categorySlug, subcategory }) {
//   return (
//     <Link
//       to={`/category/${categorySlug}/subcategory/${subcategory}`}
//       className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-md transition-all duration-200"
//     >
//       {/* IMAGE */}
//       <div className="w-full h-[100px] sm:h-[110px] overflow-hidden bg-gray-100">
//         <img
//           src={img}
//           alt={title}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//       </div>

//       {/* INFO */}
//       <div className="px-2 py-2">
//         <p className="text-[12px] sm:text-[13px] font-medium text-gray-800 leading-tight line-clamp-2">
//           {title}
//         </p>
//         <p className="text-[10px] text-gray-400 mt-1">Verified Supplier</p>
//       </div>
//     </Link>
//   );
// }

// // =========================
// // MAIN COMPONENT
// // =========================
// export default function SubCategoryGrid({ categorySlug }) {
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // =========================
//   // FETCH SUBCATEGORIES
//   // =========================
//   useEffect(() => {
//     fetchSubCategories();
//   }, []);

//   const fetchSubCategories = async () => {
//     try {
//       setLoading(true);
//       const data = await getSubCategories();
//       setSubCategories(data.subCategories || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // FILTER + LIMIT TO 8
//   // =========================
//   const filteredSubCategories = subCategories.filter(
//     (item) => item.category?.slug === categorySlug
//   );

//   const limited = filteredSubCategories.slice(0, 8);
//   const hasMore = filteredSubCategories.length > 8;

//   return (
//     <div className="flex-1 min-w-0">
//       {loading ? (
//         // SKELETON LOADER
//         <div className="grid grid-cols-4 gap-3">
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={i}
//               className="rounded-xl bg-gray-100 animate-pulse h-[140px]"
//             />
//           ))}
//         </div>
//       ) : limited.length > 0 ? (
//         <>
//           {/* GRID */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
//             {limited.map((item, i) => (
//               <SubCategoryCard
//                 key={`${item._id}-${i}`}
//                 img={item.image}
//                 title={item.name}
//                 categorySlug={item.category?.slug || "category"}
//                 subcategory={item.slug}
//               />
//             ))}
//           </div>

//           {/* VIEW ALL LINK */}
//           {hasMore && (
//             <div className="mt-3 text-right">
//               <Link
//                 to={`/category/${categorySlug}`}
//                 className="text-[12px] text-blue-600 hover:text-orange-600 font-medium transition-colors duration-200"
//               >
//                 View all {filteredSubCategories.length} subcategories →
//               </Link>
//             </div>
//           )}
//         </>
//       ) : (
//         <p className="text-gray-400 text-sm p-4">No subcategories found</p>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../api/subCategoryApi";

// =========================
// SUBCATEGORY CARD
// =========================
function SubCategoryCard({ img, title, categorySlug, subcategory }) {
  return (
    <Link
      to={`/category/${categorySlug}/subcategory/${subcategory}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-md transition-all duration-200"
    >
      {/* IMAGE */}
      <div className="w-full h-[100px] sm:h-[110px] overflow-hidden bg-gray-100">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* INFO */}
      <div className="px-2 py-2">
        <p className="text-[12px] sm:text-[13px] font-medium text-gray-800 leading-tight line-clamp-2">
          {title}
        </p>
        <p className="text-[10px] text-gray-400 mt-1">Verified Supplier</p>
      </div>
    </Link>
  );
}

// =========================
// MAIN COMPONENT
// =========================
export default function SubCategoryGrid({ categorySlug }) {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH SUBCATEGORIES
  // =========================
  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const data = await getSubCategories();
      setSubCategories(data.subCategories || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FILTER + SORT BY ORDER + LIMIT TO 8 ✅ UPDATED
  // =========================
  const filteredSubCategories = subCategories
    .filter((item) => item.category?.slug === categorySlug)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)); // ✅ NEW

  const limited = filteredSubCategories.slice(0, 8);
  const hasMore = filteredSubCategories.length > 8;

  return (
    <div className="flex-1 min-w-0">
      {loading ? (
        // SKELETON LOADER
        <div className="grid grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-gray-100 animate-pulse h-[140px]"
            />
          ))}
        </div>
      ) : limited.length > 0 ? (
        <>
          {/* GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {limited.map((item, i) => (
              <SubCategoryCard
                key={`${item._id}-${i}`}
                img={item.image}
                title={item.name}
                categorySlug={item.category?.slug || "category"}
                subcategory={item.slug}
              />
            ))}
          </div>

          {/* VIEW ALL LINK */}
          {hasMore && (
            <div className="mt-3 text-right">
              <Link
                to={`/category/${categorySlug}`}
                className="text-[12px] text-blue-600 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                View all {filteredSubCategories.length} subcategories →
              </Link>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-400 text-sm p-4">No subcategories found</p>
      )}
    </div>
  );
}