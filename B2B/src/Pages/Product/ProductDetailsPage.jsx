// import React from "react";

// import {
//   Link,
//   useParams,
// } from "react-router-dom";

// import { ChevronRight } from "lucide-react";

// import { products } from "../../data/products";

// export default function ProductDetailsPage() {

//   // =========================
//   // URL PARAMS
//   // =========================
//   const {
//     categorySlug,
//     subcategorySlug,
//     productSlug,
//   } = useParams();

//   // =========================
//   // FIND PRODUCT
//   // =========================
//   const product = products.find((item) => {

//     const generatedSlug = item.name
//       .toLowerCase()
//       .replace(/\s+/g, "-");

//     return generatedSlug === productSlug;

//   });

//   // =========================
//   // PRODUCT NOT FOUND
//   // =========================
//   if (!product) {

//     return (

//       <div className="min-h-screen flex items-center justify-center">

//         <h1 className="text-3xl font-bold">

//           Product Not Found

//         </h1>

//       </div>

//     );

//   }

//   return (

//     <div className="min-h-screen bg-[#f8f8f8]">

//       {/* TOP */}
//       <div className="bg-white border-b border-gray-200">

//         <div className="max-w-7xl mx-auto px-4 py-5">

//           {/* BREADCRUMB */}
//           <div className="flex items-center gap-2 text-sm flex-wrap">

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
//               {categorySlug.replace(/-/g, " ")}
//             </Link>

//             <ChevronRight className="w-4 h-4 text-gray-400" />

//             {/* SUBCATEGORY */}
//             <Link
//               to={`/category/${categorySlug}/subcategory/${subcategorySlug}`}
//               className="text-gray-500 hover:text-blue-800 capitalize transition"
//             >
//               {subcategorySlug.replace(/-/g, " ")}
//             </Link>

//             <ChevronRight className="w-4 h-4 text-gray-400" />

//             {/* CURRENT PRODUCT */}
//             <span className="text-gray-900 font-medium capitalize">

//               {product.name}

//             </span>

//           </div>

//         </div>

//       </div>

//       {/* PRODUCT DETAILS */}
//       <div className="max-w-7xl mx-auto px-4 py-10">

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//           {/* IMAGE */}
//           <div className="bg-white rounded-2xl border border-gray-200 p-6">

//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-[500px] object-cover rounded-xl"
//             />

//           </div>

//           {/* CONTENT */}
//           <div>

//             {/* PRODUCT NAME */}
//             <h1 className="text-4xl font-bold text-gray-900">

//               {product.name}

//             </h1>

//             {/* SUPPLIER */}
//             <p className="text-lg text-gray-500 mt-3">

//               Supplier: {product.supplier}

//             </p>

//             {/* PRICE */}
//             <p className="text-3xl font-bold text-blue-800 mt-5">

//               {product.price}

//             </p>

//             {/* DESCRIPTION */}
//             <p className="text-gray-600 leading-7 mt-6">

//               High quality product available
//               at wholesale price with bulk quantity options.
//               Suitable for distributors, wholesalers,
//               retailers and bulk buyers.

//             </p>

//             {/* BUTTONS */}
//             <div className="flex flex-wrap gap-4 mt-8">

//               {/* SEND INQUIRY */}
//               <button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-medium transition">

//                 Send Inquiry

//               </button>

//               {/* WHATSAPP */}
//               <button className="border border-blue-800 text-blue-800 hover:bg-blue-50 px-8 py-3 rounded-xl font-medium transition">

//                 WhatsApp Supplier

//               </button>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );
// }




import React, { useState } from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { ChevronRight } from "lucide-react";

import { products } from "../../data/products";

import InquiryModal from "../../components/common/InquiryModal";

export default function ProductDetailsPage() {

  // =========================
  // URL PARAMS
  // =========================
  const {
    categorySlug,
    subcategorySlug,
    productSlug,
  } = useParams();

  // =========================
  // MODAL STATE
  // =========================
  const [openInquiry, setOpenInquiry] = useState(false);

  // =========================
  // FIND PRODUCT
  // =========================
  const product = products.find((item) => {

    const generatedSlug = item.name
      .toLowerCase()
      .replace(/\s+/g, "-");

    return generatedSlug === productSlug;

  });

  // =========================
  // PRODUCT NOT FOUND
  // =========================
  if (!product) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">

          Product Not Found

        </h1>

      </div>

    );

  }

  return (

    <>
      <div className="min-h-screen bg-[#f8f8f8]">

        {/* TOP */}
        <div className="bg-white border-b border-gray-200">

          <div className="max-w-7xl mx-auto px-4 py-5">

            {/* BREADCRUMB */}
            <div className="flex items-center gap-2 text-sm flex-wrap">

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
                {categorySlug.replace(/-/g, " ")}
              </Link>

              <ChevronRight className="w-4 h-4 text-gray-400" />

              {/* SUBCATEGORY */}
              <Link
                to={`/category/${categorySlug}/subcategory/${subcategorySlug}`}
                className="text-gray-500 hover:text-blue-800 capitalize transition"
              >
                {subcategorySlug.replace(/-/g, " ")}
              </Link>

              <ChevronRight className="w-4 h-4 text-gray-400" />

              {/* CURRENT PRODUCT */}
              <span className="text-gray-900 font-medium capitalize">

                {product.name}

              </span>

            </div>

          </div>

        </div>

        {/* PRODUCT DETAILS */}
        <div className="max-w-7xl mx-auto px-4 py-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* IMAGE */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-xl"
              />

            </div>

            {/* CONTENT */}
            <div>

              {/* PRODUCT NAME */}
              <h1 className="text-4xl font-bold text-gray-900">

                {product.name}

              </h1>

              {/* SUPPLIER */}
              <p className="text-lg text-gray-500 mt-3">

                Supplier: {product.supplier}

              </p>

              {/* PRICE */}
              <p className="text-3xl font-bold text-blue-800 mt-5">

                {product.price}

              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-600 leading-7 mt-6">

                High quality product available
                at wholesale price with bulk quantity options.
                Suitable for distributors, wholesalers,
                retailers and bulk buyers.

              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 mt-8">

                {/* SEND INQUIRY */}
                <button
                  onClick={() => setOpenInquiry(true)}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-medium transition"
                >

                  Send Inquiry

                </button>

                {/* WHATSAPP */}
                <button className="border border-blue-800 text-blue-800 hover:bg-blue-50 px-8 py-3 rounded-xl font-medium transition">

                  WhatsApp chat 91-9876543210

                </button>

              </div>

              {/* EXTRA INFO */}
              <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6">

                <h3 className="text-xl font-semibold text-gray-900 mb-5">

                  Product Details

                </h3>

                <div className="grid grid-cols-2 gap-5">

                  <div>
                    <p className="text-sm text-gray-500">

                      MOQ

                    </p>

                    <p className="font-semibold text-gray-900 mt-1">

                      100 Pieces

                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">

                      Delivery Time

                    </p>

                    <p className="font-semibold text-gray-900 mt-1">

                      5 - 7 Days

                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">

                      Stock Available

                    </p>

                    <p className="font-semibold text-green-600 mt-1">

                      In Stock

                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">

                      Packaging

                    </p>

                    <p className="font-semibold text-gray-900 mt-1">

                      Standard Export Packaging

                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* INQUIRY MODAL */}
      <InquiryModal
        isOpen={openInquiry}
        onClose={() => setOpenInquiry(false)}
        productName={product.name}
      />
    </>
  );
}