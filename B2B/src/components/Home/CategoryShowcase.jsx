

// // // // Api Fetch currect code 

// // // import React, { useEffect, useState } from "react";

// // // import {
// // //   ArrowRight,
// // //   TrendingUp,
// // //   MessageSquareMore,
// // // } from "lucide-react";

// // // import { Link } from "react-router-dom";

// // // import ProductStrip from "./ProductStrip";

// // // import { getCategories } from "../../api/categoryApi";

// // // import PostRequirementModal from "../../components/common/PostRequirementModal"; // ← changed


// // // // =========================
// // // // MAIN UI
// // // // =========================
// // // export default function CategoryShowcase() {
// // //   const [categories, setCategories] = useState([]);

// // //   const [openInquiry, setOpenInquiry] = useState(false);

// // //   const [selectedProduct, setSelectedProduct] = useState("");

// // //   // ==========================
// // //   // FETCH CATEGORIES
// // //   // ==========================
// // //   useEffect(() => {
// // //     fetchCategories();
// // //   }, []);

// // //   const fetchCategories = async () => {
// // //     try {
// // //       const res = await getCategories();

// // //       setCategories(res.categories);
// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-16 bg-gray-50">
// // //       {/* HEADER */}
// // //       <div className="mb-12">
// // //         <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
// // //           <TrendingUp className="w-4 h-4" />
// // //           Global Wholesale Marketplace
// // //         </div>

// // //         <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
// // //           Industrial Categories
// // //         </h2>

// // //         <p className="mt-2 text-slate-600">
// // //           Source directly from verified manufacturers and suppliers.
// // //         </p>
// // //       </div>

// // //       {/* CATEGORY LOOP */}
// // //       {categories.map((cat) => (
// // //         <section
// // //           key={cat._id}
// // //           id={`category-${cat.slug}`}
// // //           className="space-y-6"
// // //         >
// // //           {/* HERO */}
// // //           <div className="relative h-[340px] rounded-2xl overflow-hidden group shadow-xl">
// // //             {/* IMAGE */}
// // //             <img
// // //               src={cat.image}
// // //               alt={cat.name}
// // //               loading="lazy"
// // //               className="absolute w-full h-full object-cover group-hover:scale-105 transition duration-700"
// // //             />

// // //             {/* OVERLAY */}
// // //             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

// // //             {/* CONTENT */}
// // //             <div className="absolute bottom-0 p-8 text-white max-w-xl">
// // //               <span className="px-3 py-1 bg-orange-600 text-xs rounded-full">
// // //                 Featured Category
// // //               </span>

// // //               <h2 className="text-3xl font-bold mt-3">
// // //                 {cat.name}
// // //               </h2>

// // //               <p className="text-sm text-gray-200 mt-2">
// // //                 {cat.desc}
// // //               </p>

// // //               {/* BUTTONS */}
// // //               <div className="flex flex-wrap items-center gap-4 mt-6">
// // //                 {/* EXPLORE */}
// // //                 <Link
// // //                   to={`/category/${cat.slug}`}
// // //                   className="bg-white text-black px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold hover:bg-orange-600 hover:text-white transition duration-300"
// // //                 >
// // //                   Explore
// // //                   <ArrowRight size={16} />
// // //                 </Link>

// // //                 {/* INQUIRY */}
// // //                 <button
// // //                   onClick={() => {
// // //                     setSelectedProduct(cat.name);
// // //                     setOpenInquiry(true);
// // //                   }}
// // //                   className="bg-orange-600/90 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold hover:bg-orange-700 transition duration-300"
// // //                 >
// // //                   <MessageSquareMore size={18} />
// // //                   Get Quotes
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* PRODUCT STRIP */}
// // //           <ProductStrip
// // //             items={cat.products || []}
// // //             categorySlug={cat.slug}
// // //           />
// // //         </section>
// // //       ))}

// // //       {/* INQUIRY MODAL */}
// // //        <PostRequirementModal
// // //         isOpen={openInquiry}
// // //         onClose={() => setOpenInquiry(false)}
// // //       />
// // //     </div>
// // //   );
// // // }





// // Api Fetch currect code 

// import React, { useEffect, useState } from "react";

// import {
//   ArrowRight,
//   TrendingUp,
//   MessageSquareMore,
//   LayoutGrid, // ✅ NEW
// } from "lucide-react";

// import { Link } from "react-router-dom";

// import ProductStrip from "./ProductStrip";

// import { getCategories } from "../../api/categoryApi";

// import PostRequirementModal from "../../components/common/PostRequirementModal"; // ← changed


// // =========================
// // MAIN UI
// // =========================
// export default function CategoryShowcase() {
//   const [categories, setCategories] = useState([]);

//   const [openInquiry, setOpenInquiry] = useState(false);

//   const [selectedProduct, setSelectedProduct] = useState("");

//   // ==========================
//   // FETCH CATEGORIES
//   // ==========================
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await getCategories();

//       setCategories(res.categories);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ NEW - only categories marked showOnHome
//   const homeCategories = categories
//   .filter((cat) => cat.showOnHome)
//   .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

//   return (
//     <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-16 bg-gray-50">
//       {/* HEADER */}
//       <div className="mb-12 flex items-end justify-between flex-wrap gap-4"> {/* ✅ UPDATED */}
//         <div>
//           <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
//             <TrendingUp className="w-4 h-4" />
//             Global Wholesale Marketplace
//           </div>

//           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//            Top Industrial Categories
//           </h2>

//           <p className="mt-2 text-slate-600">
//             Source directly from verified manufacturers and suppliers.
//           </p>
//         </div>

//         {/* ✅ NEW - VIEW ALL BUTTON */}
//         <Link
//           to="/categories"
//           className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold hover:bg-orange-600 transition duration-300"
//         >
//           <LayoutGrid size={18} />
//           View All Categories
//         </Link>
//       </div>

//       {/* CATEGORY LOOP - ✅ UPDATED: categories -> homeCategories (showOnHome filter) */}
//       {homeCategories.map((cat) => (
//         <section
//           key={cat._id}
//           id={`category-${cat.slug}`}
//           className="space-y-6"
//         >
//           {/* HERO */}
//           <div className="relative h-[340px] rounded-2xl overflow-hidden group shadow-xl">
//             {/* IMAGE */}
//             <img
//               src={cat.image}
//               alt={cat.name}
//               loading="lazy"
//               className="absolute w-full h-full object-cover group-hover:scale-105 transition duration-700"
//             />

//             {/* OVERLAY */}
//             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

//             {/* CONTENT */}
//             <div className="absolute bottom-0 p-8 text-white max-w-xl">
//               <span className="px-3 py-1 bg-orange-600 text-xs rounded-full">
//                 Featured Category
//               </span>

//               <h2 className="text-3xl font-bold mt-3">
//                 {cat.name}
//               </h2>

//               <p className="text-sm text-gray-200 mt-2">
//                 {cat.desc}
//               </p>

//               {/* BUTTONS */}
//               <div className="flex flex-wrap items-center gap-4 mt-6">
//                 {/* EXPLORE */}
//                 <Link
//                   to={`/category/${cat.slug}`}
//                   className="bg-white text-black px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold hover:bg-orange-600 hover:text-white transition duration-300"
//                 >
//                   Explore
//                   <ArrowRight size={16} />
//                 </Link>

//                 {/* INQUIRY */}
//                 <button
//                   onClick={() => {
//                     setSelectedProduct(cat.name);
//                     setOpenInquiry(true);
//                   }}
//                   className="bg-orange-600/90 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold hover:bg-orange-700 transition duration-300"
//                 >
//                   <MessageSquareMore size={18} />
//                   Get Quotes
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* PRODUCT STRIP */}
//           <ProductStrip
//             items={cat.products || []}
//             categorySlug={cat.slug}
//           />
//         </section>
//       ))}

//       {/* INQUIRY MODAL */}
//        <PostRequirementModal
//         isOpen={openInquiry}
//         onClose={() => setOpenInquiry(false)}
//       />
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  TrendingUp,
  MessageSquareMore,
  LayoutGrid, 
} from "lucide-react";
import { Link } from "react-router-dom";
import SubCategoryGrid from "./SubCategoryGrid";
import { getCategories } from "../../api/categoryApi";
import PostRequirementModal from "../../components/common/PostRequirementModal";

// =========================
// MAIN UI
// =========================
export default function CategoryShowcase() {
  const [categories, setCategories] = useState([]);
  const [openInquiry, setOpenInquiry] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  // ==========================
  // FETCH CATEGORIES
  // ==========================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const homeCategories = categories
    .filter((cat) => cat.showOnHome)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12 bg-gray-50">
      {/* HEADER */}
      <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            <TrendingUp className="w-4 h-4" />
            Global Wholesale Marketplace
          </div>

          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            Top Industrial Categories
          </h2>

          <p className="mt-2 text-slate-600">
            Source directly from verified manufacturers and suppliers.
          </p>
        </div>

        <Link
          to="/categories"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold hover:bg-orange-600 transition duration-300"
        >
          <LayoutGrid size={18} />
          View All Categories
        </Link>
      </div>

      {/* CATEGORY LOOP */}
      <div className="space-y-6">
        {homeCategories.map((cat) => (
          <section
            key={cat._id}
            id={`category-${cat.slug}`}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col lg:flex-row">

              {/* LEFT: HERO CARD */}
              <div className="relative lg:w-[400px] xl:w-[420px] shrink-0 min-h-[260px] lg:min-h-[300px]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                  <span className="inline-block self-start px-2.5 py-0.5 bg-orange-600 text-[10px] font-semibold rounded-full mb-2 uppercase tracking-wide">
                    Featured Category
                  </span>
                  <h3 className="text-xl font-bold leading-tight mb-1">
                    {cat.name}
                  </h3>
                  {cat.desc && (
                    <p className="text-[12px] text-gray-300 leading-relaxed mb-4 line-clamp-2">
                      {cat.desc}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/category/${cat.slug}`}
                      className="bg-white text-gray-900 text-[12px] font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-orange-600 hover:text-white transition duration-200"
                    >
                      Explore
                      <ArrowRight size={13} />
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedProduct(cat.name);
                        setOpenInquiry(true);
                      }}
                      className="bg-orange-600/90 text-white text-[12px] font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-orange-700 transition duration-200 border border-white/20"
                    >
                      <MessageSquareMore size={13} />
                      Get Quotes
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT: SUBCATEGORY GRID */}
              <div className="flex-1 min-w-0 p-4 lg:p-5 flex flex-col">
                <SubCategoryGrid categorySlug={cat.slug} />
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* INQUIRY MODAL */}
      <PostRequirementModal
        isOpen={openInquiry}
        onClose={() => setOpenInquiry(false)}
      />
    </div>
  );
}