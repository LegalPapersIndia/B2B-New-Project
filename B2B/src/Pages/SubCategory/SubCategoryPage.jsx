

// import React from "react";

// import { useParams, Link } from "react-router-dom";

// import { ChevronRight, Grid3X3 } from "lucide-react";

// import { products } from "../../data/products";

// export default function SubCategoryPage() {
//   // =========================
//   // URL PARAMS
//   // =========================
//   const { categorySlug, subcategorySlug } = useParams();

//   // =========================
//   // FORMAT NAMES
//   // =========================
//   const categoryName = categorySlug.replace(/-/g, " ");

//   const subcategoryName = subcategorySlug.replace(/-/g, " ");

//   // =========================
//   // FILTER PRODUCTS
//   // =========================
//   const filteredProducts = products.filter(
//     (item) =>
//       item.category === categorySlug && item.subcategory === subcategorySlug,
//   );

//   return (
//     <div className="min-h-screen bg-[#f8f8f8]">
//       {/* TOP HEADER */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           {/* BREADCRUMB */}
//           <div className="flex items-center gap-2 text-sm mb-5">
//             {/* HOME */}
//             <Link
//               to="/"
//               className="text-gray-500 hover:text-blue-800 transition"
//             >
//               Home
//             </Link>

//             <ChevronRight className="w-4 h-4 text-gray-400" />

//             {/* CATEGORY */}
//             <Link
//               to={`/category/${categorySlug}`}
//               className="text-gray-500 hover:text-blue-800 capitalize transition"
//             >
//               {categoryName}
//             </Link>

//             <ChevronRight className="w-4 h-4 text-gray-400" />

//             {/* CURRENT PAGE */}
//             <span className="text-gray-900 font-medium capitalize">
//               {subcategoryName}
//             </span>
//           </div>

//           {/* TITLE */}
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
//               <Grid3X3 className="w-6 h-6 text-blue-800" />
//             </div>

//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 capitalize">
//                 {subcategoryName}
//               </h1>

//               <p className="text-sm text-gray-500 mt-1">
//                 Explore top suppliers, manufacturers and wholesalers.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PRODUCT SECTION */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//             <div
//   key={product.id}
//   className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
// >

//   {/* IMAGE */}
//   <div className="h-52 bg-gray-100 overflow-hidden">

//     <img
//       src={product.image}
//       alt={product.name}
//       className="w-full h-full object-cover hover:scale-105 transition duration-300"
//     />

//   </div>

//   {/* CONTENT */}
//   <div className="p-4">

//     <h2 className="font-semibold text-gray-900 line-clamp-1">

//       {product.name}

//     </h2>

//     <p className="text-sm text-gray-500 mt-1">

//       {product.supplier}

//     </p>

//     <p className="text-blue-800 font-semibold mt-2">

//       {product.price}

//     </p>

//     <div className="flex gap-3 mt-4">

//     <Link
//   to={`/category/${product.category}/subcategory/${product.subcategory}/product/${product.slug}`}
//   className="flex-1"
// >

//   <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium transition">

//     View Details

//   </button>

// </Link>

//       <button className="flex-1 border border-blue-800 text-blue-800 hover:bg-blue-50 py-2.5 rounded-xl text-sm font-medium transition">

//         Send Inquiry

//       </button>

//     </div>

//   </div>

// </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-20">
//               <h2 className="text-2xl font-semibold text-gray-700">
//                 No Products Found
//               </h2>

//               <p className="text-gray-500 mt-2">
//                 Products will appear here soon.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState } from "react";

import { useParams, Link } from "react-router-dom";

import {
  ChevronRight,
  Grid3X3,
} from "lucide-react";

import { products } from "../../data/products";

import InquiryModal from "../../components/common/InquiryModal";

export default function SubCategoryPage() {

  // =========================
  // URL PARAMS
  // =========================
  const {
    categorySlug,
    subcategorySlug,
  } = useParams();

  // =========================
  // MODAL STATES
  // =========================
  const [openInquiry, setOpenInquiry] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState("");

  // =========================
  // FORMAT NAMES
  // =========================
  const categoryName =
    categorySlug.replace(/-/g, " ");

  const subcategoryName =
    subcategorySlug.replace(/-/g, " ");

  // =========================
  // FILTER PRODUCTS
  // =========================
  const filteredProducts = products.filter(
    (item) =>
      item.category === categorySlug &&
      item.subcategory ===
        subcategorySlug
  );

  return (

    <div className="min-h-screen bg-[#f8f8f8]">

      {/* TOP HEADER */}
      <div className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 py-6">

          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-sm mb-5">

            {/* HOME */}
            <Link
              to="/"
              className="text-gray-500 hover:text-blue-800 transition"
            >
              Home
            </Link>

            <ChevronRight className="w-4 h-4 text-gray-400" />

            {/* CATEGORY */}
            <Link
              to={`/category/${categorySlug}`}
              className="text-gray-500 hover:text-blue-800 capitalize transition"
            >
              {categoryName}
            </Link>

            <ChevronRight className="w-4 h-4 text-gray-400" />

            {/* CURRENT PAGE */}
            <span className="text-gray-900 font-medium capitalize">

              {subcategoryName}

            </span>

          </div>

          {/* TITLE */}
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

              <Grid3X3 className="w-6 h-6 text-blue-800" />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-gray-900 capitalize">

                {subcategoryName}

              </h1>

              <p className="text-sm text-gray-500 mt-1">

                Explore top suppliers,
                manufacturers and wholesalers.

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* PRODUCT SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
              >

                {/* IMAGE */}
                <div className="h-52 bg-gray-100 overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />

                </div>

                {/* CONTENT */}
                <div className="p-4">

                  <h2 className="font-semibold text-gray-900 line-clamp-1">

                    {product.name}

                  </h2>

                  <p className="text-sm text-gray-500 mt-1">

                    {product.supplier}

                  </p>

                  <p className="text-blue-800 font-semibold mt-2">

                    {product.price}

                  </p>

                  {/* BUTTONS */}
                  <div className="flex gap-3 mt-4">

                    {/* VIEW DETAILS */}
                    <Link
                      to={`/category/${product.category}/subcategory/${product.subcategory}/product/${product.slug}`}
                      className="flex-1"
                    >

                      <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium transition">

                        View Details

                      </button>

                    </Link>

                    {/* SEND INQUIRY */}
                    <button
                      onClick={() => {
                        setOpenInquiry(true);
                        setSelectedProduct(
                          product.name
                        );
                      }}
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

              <h2 className="text-2xl font-semibold text-gray-700">

                No Products Found

              </h2>

              <p className="text-gray-500 mt-2">

                Products will appear here soon.

              </p>

            </div>

          )}

        </div>

      </div>

      {/* INQUIRY MODAL */}
      <InquiryModal
        isOpen={openInquiry}
        onClose={() =>
          setOpenInquiry(false)
        }
        productName={selectedProduct}
      />

    </div>

  );

}