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




// import React, { useState } from "react";

// import {
//   Link,
//   useParams,
// } from "react-router-dom";

// import { ChevronRight } from "lucide-react";

// import { products } from "../../data/products";

// import InquiryModal from "../../components/common/InquiryModal";

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
//   // MODAL STATE
//   // =========================
//   const [openInquiry, setOpenInquiry] = useState(false);

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

//     <>
//       <div className="min-h-screen bg-[#f8f8f8]">

//         {/* TOP */}
//         <div className="bg-white border-b border-gray-200">

//           <div className="max-w-7xl mx-auto px-4 py-5">

//             {/* BREADCRUMB */}
//             <div className="flex items-center gap-2 text-sm flex-wrap">

//               {/* HOME */}
//               <Link
//                 to="/"
//                 className="text-gray-500 hover:text-blue-800 transition"
//               >
//                 Home
//               </Link>

//               <ChevronRight className="w-4 h-4 text-gray-400" />

//               {/* CATEGORY */}
//               <Link
//                 to={`/category/${categorySlug}`}
//                 className="text-gray-500 hover:text-blue-800 capitalize transition"
//               >
//                 {categorySlug.replace(/-/g, " ")}
//               </Link>

//               <ChevronRight className="w-4 h-4 text-gray-400" />

//               {/* SUBCATEGORY */}
//               <Link
//                 to={`/category/${categorySlug}/subcategory/${subcategorySlug}`}
//                 className="text-gray-500 hover:text-blue-800 capitalize transition"
//               >
//                 {subcategorySlug.replace(/-/g, " ")}
//               </Link>

//               <ChevronRight className="w-4 h-4 text-gray-400" />

//               {/* CURRENT PRODUCT */}
//               <span className="text-gray-900 font-medium capitalize">

//                 {product.name}

//               </span>

//             </div>

//           </div>

//         </div>

//         {/* PRODUCT DETAILS */}
//         <div className="max-w-7xl mx-auto px-4 py-10">

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//             {/* IMAGE */}
//             <div className="bg-white rounded-2xl border border-gray-200 p-6">

//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-[500px] object-cover rounded-xl"
//               />

//             </div>

//             {/* CONTENT */}
//             <div>

//               {/* PRODUCT NAME */}
//               <h1 className="text-4xl font-bold text-gray-900">

//                 {product.name}

//               </h1>

//               {/* SUPPLIER */}
//               <p className="text-lg text-gray-500 mt-3">

//                 Supplier: {product.supplier}

//               </p>

//               {/* PRICE */}
//               <p className="text-3xl font-bold text-blue-800 mt-5">

//                 {product.price}

//               </p>

//               {/* DESCRIPTION */}
//               <p className="text-gray-600 leading-7 mt-6">

//                 High quality product available
//                 at wholesale price with bulk quantity options.
//                 Suitable for distributors, wholesalers,
//                 retailers and bulk buyers.

//               </p>

//               {/* BUTTONS */}
//               <div className="flex flex-wrap gap-4 mt-8">

//                 {/* SEND INQUIRY */}
//                 <button
//                   onClick={() => setOpenInquiry(true)}
//                   className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-medium transition"
//                 >

//                   Send Inquiry

//                 </button>

//                 {/* WHATSAPP */}
//                 <button className="border border-blue-800 text-blue-800 hover:bg-blue-50 px-8 py-3 rounded-xl font-medium transition">

//                   WhatsApp chat 91-9876543210

//                 </button>

//               </div>

//               {/* EXTRA INFO */}
//               <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6">

//                 <h3 className="text-xl font-semibold text-gray-900 mb-5">

//                   Product Details

//                 </h3>

//                 <div className="grid grid-cols-2 gap-5">

//                   <div>
//                     <p className="text-sm text-gray-500">

//                       MOQ

//                     </p>

//                     <p className="font-semibold text-gray-900 mt-1">

//                       100 Pieces

//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500">

//                       Delivery Time

//                     </p>

//                     <p className="font-semibold text-gray-900 mt-1">

//                       5 - 7 Days

//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500">

//                       Stock Available

//                     </p>

//                     <p className="font-semibold text-green-600 mt-1">

//                       In Stock

//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500">

//                       Packaging

//                     </p>

//                     <p className="font-semibold text-gray-900 mt-1">

//                       Standard Export Packaging

//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* INQUIRY MODAL */}
//       <InquiryModal
//         isOpen={openInquiry}
//         onClose={() => setOpenInquiry(false)}
//         productName={product.name}
//       />
//     </>
//   );
// }




// src/pages/Product/ProductDetailsPage.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import InquiryModal from "../../components/common/InquiryModal";
import { getSingleProduct } from "../../api/productApi";

export default function ProductDetailsPage() {

  // ─────────────────────────────────────────
  // URL PARAMS
  // ─────────────────────────────────────────
  const { categorySlug, subcategorySlug, productSlug } = useParams();

  // ─────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [openInquiry, setOpenInquiry] = useState(false);

  // ─────────────────────────────────────────
  // FETCH PRODUCT
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await getSingleProduct(productSlug);

        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.message || "Product not found");
        }
      } catch (err) {
        console.error(err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  // ─────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // NOT FOUND
  // ─────────────────────────────────────────
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-2">
            The product you are looking for does not exist.
          </p>

          <Link
            to="/"
            className="mt-5 inline-block bg-blue-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-900 transition"
          >
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
    <>
      <div className="min-h-screen bg-[#f8f8f8]">

        {/* BREADCRUMB */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-5">

            <div className="flex items-center gap-2 text-sm flex-wrap">

              <Link
                to="/"
                className="text-gray-500 hover:text-blue-800 transition"
              >
                Home
              </Link>

              <ChevronRight className="w-4 h-4 text-gray-400" />

              <Link
                to={`/category/${categorySlug}`}
                className="text-gray-500 hover:text-blue-800 capitalize transition"
              >
                {categorySlug?.replace(/-/g, " ")}
              </Link>

              <ChevronRight className="w-4 h-4 text-gray-400" />

              <Link
                to={`/category/${categorySlug}/subcategory/${subcategorySlug}`}
                className="text-gray-500 hover:text-blue-800 capitalize transition"
              >
                {subcategorySlug?.replace(/-/g, " ")}
              </Link>

              <ChevronRight className="w-4 h-4 text-gray-400" />

              <span className="text-gray-900 font-medium line-clamp-1">
                {product.title}
              </span>

            </div>
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="max-w-7xl mx-auto px-4 py-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* ───────────────── IMAGES ───────────────── */}
            <div>

              {/* MAIN IMAGE */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">

                <img
                  src={
                    product.images?.[selectedImage]?.url ||
                    "/placeholder.png"
                  }
                  alt={product.title}
                  className="w-full h-[420px] object-cover rounded-xl"
                />

              </div>

              {/* THUMBNAILS */}
              {product.images?.length > 1 && (
                <div className="flex gap-3 flex-wrap">

                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={`thumb-${i}`}
                      onClick={() => setSelectedImage(i)}
                      className={`h-20 w-20 object-cover rounded-xl border-2 cursor-pointer transition
                        ${
                          selectedImage === i
                            ? "border-blue-800"
                            : "border-gray-200 hover:border-blue-400"
                        }`}
                    />
                  ))}

                </div>
              )}

            </div>

            {/* ───────────────── CONTENT ───────────────── */}
            <div>

              {/* TITLE */}
              <h1 className="text-3xl font-bold text-gray-900">
                {product.title}
              </h1>

              {/* SELLER */}
              <p className="text-gray-500 mt-2">
                Supplier:{" "}
                <span className="text-blue-800 font-medium">
                  {product.seller?.name || "—"}
                </span>
              </p>

              {/* BRAND */}
              {product.brand && (
                <p className="text-gray-500 text-sm mt-1">
                  Brand:{" "}
                  <span className="font-medium text-gray-700">
                    {product.brand}
                  </span>
                </p>
              )}

              {/* PRICE */}
              <div className="mt-5">
                <p className="text-3xl font-bold text-blue-800">
                  ₹{product.price?.toLocaleString()}

                  <span className="text-gray-400 text-base font-normal ml-2">
                    / {product.unit}
                  </span>
                </p>
              </div>

              {/* SHORT DESC */}
              {product.shortDesc && (
                <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                  {product.shortDesc}
                </p>
              )}

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 mt-8">

                <button
                  onClick={() => setOpenInquiry(true)}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-medium transition"
                >
                  Send Inquiry
                </button>

                {/* ✅ ERROR FIXED HERE */}
                <a
                  href={`https://wa.me/919876543210?text=Hi, I am interested in ${product.title}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-xl font-medium transition"
                >
                  WhatsApp Inquiry
                </a>

              </div>

              {/* PRODUCT DETAILS BOX */}
              <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">

                <h3 className="text-lg font-semibold text-gray-900 mb-5">
                  Product Details
                </h3>

                <div className="grid grid-cols-2 gap-5 text-sm">

                  <div>
                    <p className="text-gray-500">MOQ</p>

                    <p className="font-semibold text-gray-900 mt-1">
                      {product.moq} {product.unit}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Category</p>

                    <p className="font-semibold text-gray-900 mt-1 capitalize">
                      {product.category?.name || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Sub Category</p>

                    <p className="font-semibold text-gray-900 mt-1 capitalize">
                      {product.subcategory?.name || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Stock</p>

                    <p
                      className={`font-semibold mt-1 ${
                        product.stock > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} Available`
                        : "Out of Stock"}
                    </p>
                  </div>

                </div>
              </div>

              {/* DESCRIPTION */}
              {product.description && (
                <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6">

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>

                </div>
              )}

              {/* SPECIFICATIONS */}
              {product.specifications?.length > 0 && (
                <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6">

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Specifications
                  </h3>

                  <div className="space-y-2">

                    {product.specifications.map((spec, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm border-b pb-2"
                      >
                        <span className="text-gray-500">
                          {spec.key}
                        </span>

                        <span className="font-medium text-gray-800">
                          {spec.value}
                        </span>
                      </div>
                    ))}

                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* INQUIRY MODAL */}
      <InquiryModal
        isOpen={openInquiry}
        onClose={() => setOpenInquiry(false)}
        productName={product.title}
          productId={product._id} 
      />
    </>
  );
}