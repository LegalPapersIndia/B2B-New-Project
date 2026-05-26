// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Star,
//   MapPin,
//   ShieldCheck,
//   Phone,
//   MessageCircle,
//   ShoppingBag,
//   Truck,
//   BadgeCheck,
//   ChevronRight,
// } from "lucide-react";

// const product = {
//   id: 1,
//   name: "Industrial Safety Gloves",
//   image:
//     "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop",
//   gallery: [
//     "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
//   ],
//   company: "SafeTech Industries",
//   location: "Mumbai, India",
//   price: "₹250 / Pair",
//   rating: 4.8,
//   reviews: 124,
//   moq: "100 Pairs",
//   stock: "Ready Stock Available",
//   description:
//     "Premium quality industrial safety gloves designed for heavy-duty protection in manufacturing, construction, warehouse, and industrial environments.",
//   features: [
//     "High durability material",
//     "Chemical resistant",
//     "Comfortable inner grip",
//     "Heat resistant protection",
//     "Industrial grade quality",
//   ],
//   specifications: {
//     Material: "Rubber + Cotton",
//     Usage: "Industrial Safety",
//     Brand: "SafeTech",
//     Color: "Orange",
//     Packaging: "Box Packed",
//   },
// };

// export default function ProductDetails() {
//   const [selectedImage, setSelectedImage] = useState(product.image);

//   return (
//     <div className="bg-gray-50 min-h-screen py-10">
//       <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">

//         {/* BREADCRUMB */}
//         <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
//           <span>Home</span>
//           <ChevronRight className="w-4 h-4" />
//           <span>Products</span>
//           <ChevronRight className="w-4 h-4" />
//           <span className="text-blue-800 font-medium">
//             {product.name}
//           </span>
//         </div>

//         {/* MAIN SECTION */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//           {/* LEFT IMAGE SECTION */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-5"
//           >

//             {/* MAIN IMAGE */}
//             <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
//               <img
//                 src={selectedImage}
//                 alt={product.name}
//                 className="w-full h-[520px] object-cover"
//               />
//             </div>

//             {/* GALLERY */}
//             <div className="flex gap-4">
//               {product.gallery.map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(img)}
//                   className={`rounded-2xl overflow-hidden border-2 transition ${
//                     selectedImage === img
//                       ? "border-blue-800"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt=""
//                     className="w-24 h-24 object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </motion.div>

//           {/* RIGHT CONTENT */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-6"
//           >

//             {/* BADGES */}
//             <div className="flex flex-wrap gap-3">
//               <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
//                 Featured Product
//               </div>

//               <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
//                 Verified Supplier
//               </div>
//             </div>

//             {/* TITLE */}
//             <div>
//               <h1 className="text-4xl font-bold text-slate-900 leading-tight">
//                 {product.name}
//               </h1>

//               <div className="flex items-center gap-4 mt-4 flex-wrap">

//                 {/* RATING */}
//                 <div className="flex items-center gap-2">
//                   <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                   <span className="font-semibold text-slate-800">
//                     {product.rating}
//                   </span>

//                   <span className="text-slate-500">
//                     ({product.reviews} Reviews)
//                   </span>
//                 </div>

//                 {/* VERIFIED */}
//                 <div className="flex items-center gap-2 text-green-600 font-medium">
//                   <BadgeCheck className="w-5 h-5" />
//                   Verified
//                 </div>
//               </div>
//             </div>

//             {/* PRICE */}
//             <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
//               <div className="text-sm text-slate-500 mb-2">
//                 Starting Price
//               </div>

//               <div className="text-5xl font-bold text-blue-800">
//                 {product.price}
//               </div>

//               <div className="mt-4 flex flex-wrap gap-4 text-sm">

//                 <div className="flex items-center gap-2 text-slate-600">
//                   <ShoppingBag className="w-4 h-4 text-orange-600" />
//                   MOQ: {product.moq}
//                 </div>

//                 <div className="flex items-center gap-2 text-slate-600">
//                   <Truck className="w-4 h-4 text-orange-600" />
//                   {product.stock}
//                 </div>
//               </div>
//             </div>

//             {/* SUPPLIER */}
//             <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
//               <div className="flex items-start justify-between gap-4">

//                 <div>
//                   <h3 className="text-2xl font-bold text-slate-900">
//                     {product.company}
//                   </h3>

//                   <div className="flex items-center gap-2 mt-3 text-slate-600">
//                     <MapPin className="w-5 h-5 text-orange-600" />
//                     {product.location}
//                   </div>

//                   <div className="flex items-center gap-2 mt-3 text-green-600 font-medium">
//                     <ShieldCheck className="w-5 h-5" />
//                     Trusted Manufacturer
//                   </div>
//                 </div>

//                 <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
//                   5+ Years
//                 </div>
//               </div>
//             </div>

//             {/* ACTION BUTTONS */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//               <button className="bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition">
//                 <MessageCircle className="w-5 h-5" />
//                 Send Inquiry
//               </button>

//               <button className="bg-blue-800 hover:bg-blue-900 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition">
//                 <Phone className="w-5 h-5" />
//                 Contact Supplier
//               </button>
//             </div>

//             {/* DESCRIPTION */}
//             <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
//               <h2 className="text-2xl font-bold text-slate-900 mb-4">
//                 Product Description
//               </h2>

//               <p className="text-slate-600 leading-8">
//                 {product.description}
//               </p>
//             </div>

//             {/* FEATURES */}
//             <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
//               <h2 className="text-2xl font-bold text-slate-900 mb-5">
//                 Key Features
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {product.features.map((feature, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-3"
//                   >
//                     <div className="w-3 h-3 rounded-full bg-orange-600"></div>

//                     <span className="text-slate-700">
//                       {feature}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </motion.div>
//         </div>

//         {/* SPECIFICATIONS */}
//         <div className="mt-12 bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
//           <h2 className="text-3xl font-bold text-slate-900 mb-8">
//             Product Specifications
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {Object.entries(product.specifications).map(
//               ([key, value], index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between border-b border-gray-100 pb-4"
//                 >
//                   <span className="font-semibold text-slate-700">
//                     {key}
//                   </span>

//                   <span className="text-slate-600">
//                     {value}
//                   </span>
//                 </div>
//               )
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }





import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import InquiryModal from "../components/common/InquiryModal";
import SimilarProducts from "../components/Product/SimilarProducts";

import {
  MapPin,
  Star,
  Shield,
  ChevronRight,
  Package,
  Truck,
  RefreshCw,
  Phone,
  MessageSquare,
  Share2,
  Heart,
} from "lucide-react";

// ─── DEMO DATA ───────────────────────────────────────────
const productData = {
  id: 1,
  name: "Industrial Safety Gloves",
  category: "Safety Equipment",
  price: "₹250",
  unit: "Pair",
  minOrder: "100 Pairs",
  rating: 4.8,
  reviews: 124,
  description: `Premium quality industrial safety gloves designed for heavy-duty use. 
Made from high-grade leather and reinforced stitching for maximum durability. 
Suitable for construction, manufacturing, and industrial applications.
These gloves provide excellent grip and protection against cuts, abrasions, 
and minor heat exposure making them ideal for factory workers.`,

  specifications: [
    { label: "Material", value: "Leather + Cotton" },
    { label: "Size", value: "S, M, L, XL" },
    { label: "Color", value: "Brown, Black" },
    { label: "MOQ", value: "100 Pairs" },
    { label: "Supply Ability", value: "10,000 Pair/Month" },
    { label: "Delivery Time", value: "7-10 Days" },
    { label: "Payment Terms", value: "T/T, L/C, D/P" },
    { label: "Certifications", value: "ISO 9001, CE" },
  ],

  seller: {
    name: "SafeTech Industries",
    location: "Mumbai, Maharashtra",
    memberSince: "2018",
    responseRate: "98%",
    responseTime: "Within 1 Hour",
    totalProducts: 48,
    verified: true,
    phone: "+91 98765 43210",
  },

  images: [
    "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1200&auto=format&fit=crop",
  ],
};


// ─── PRODUCT IMAGES COMPONENT ────────────────────────────
function ProductImages({ images, name }) {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-3">
      {/* Main Image */}
      <div className="overflow-hidden rounded-xl bg-gray-50 aspect-square">
        <img
          src={images[active]}
          alt={name}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
              active === i
                ? "border-blue-800 scale-105"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <img
              src={img}
              alt={`thumb-${i}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────
export default function ProductDetail() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("description");
  const [modalOpen, setModalOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-blue-800 transition-colors">
            Home
          </Link>

          <ChevronRight className="w-4 h-4 shrink-0" />

          <Link
            to="/products"
            className="hover:text-blue-800 transition-colors"
          >
            Products
          </Link>

          <ChevronRight className="w-4 h-4 shrink-0" />

          <span className="text-slate-800 font-medium truncate">
            {productData.name}
          </span>
        </nav>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Images */}
              <ProductImages
                images={productData.images}
                name={productData.name}
              />

              {/* Product Info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">

                {/* Top Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-100 px-3 py-1 rounded-full">
                    {productData.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                      <Share2 className="w-4 h-4 text-slate-500" />
                    </button>

                    <button
                      onClick={() => setWishlisted(!wishlisted)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          wishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-slate-500"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Product Name */}
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                  {productData.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(productData.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    {productData.rating}
                  </span>

                  <span className="text-sm text-slate-400">
                    ({productData.reviews} reviews)
                  </span>
                </div>

                {/* Price Box */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-xs text-slate-500 mb-1">Price</p>

                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-blue-800">
                      {productData.price}
                    </span>

                    <span className="text-slate-500 mb-1">
                      / {productData.unit}
                    </span>
                  </div>

                  <p className="text-xs text-orange-600 font-medium mt-1">
                    Min. Order: {productData.minOrder}
                  </p>
                </div>

                {/* Quick Info */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Package className="w-4 h-4 text-blue-800 shrink-0" />
                    Supply: 10,000 Pair / Month
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Truck className="w-4 h-4 text-blue-800 shrink-0" />
                    Delivery in 7-10 Days
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <RefreshCw className="w-4 h-4 text-blue-800 shrink-0" />
                    Return Policy Available
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-green-600 shrink-0" />

                    <span className="text-green-700 font-medium">
                      Verified Supplier
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 mt-auto pt-2">

                  {/* Inquiry */}
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send Inquiry
                  </button>

                  {/* Call Supplier */}
                  <a
                    href={`tel:${productData.seller.phone}`}
                    className="w-full bg-white hover:bg-blue-50 border border-blue-800 text-blue-800 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call Supplier
                  </a>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

              {/* Tab Buttons */}
              <div className="flex border-b border-gray-100">
                {["description", "specifications"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 text-sm font-semibold capitalize transition-colors ${
                      activeTab === tab
                        ? "text-blue-800 border-b-2 border-blue-800 bg-blue-50/50"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "description" && (
                  <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                    {productData.description}
                  </p>
                )}

                {activeTab === "specifications" && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-gray-100">
                        {productData.specifications.map((spec, i) => (
                          <tr
                            key={i}
                            className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                          >
                            <td className="py-3 px-4 font-medium text-slate-700 w-1/3">
                              {spec.label}
                            </td>

                            <td className="py-3 px-4 text-slate-600">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Supplier Info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-base font-bold text-slate-900 mb-4">
                Supplier Information
              </h2>

              <div className="flex flex-col sm:flex-row gap-6">

                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {productData.seller.name[0]}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">
                        {productData.seller.name}
                      </h3>

                      {productData.seller.verified && (
                        <Shield className="w-4 h-4 text-green-600" />
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5">
                      <MapPin className="w-3 h-3 text-orange-600" />
                      {productData.seller.location}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 sm:ml-auto">
                  {[
                    {
                      label: "Member Since",
                      value: productData.seller.memberSince,
                    },
                    {
                      label: "Response Rate",
                      value: productData.seller.responseRate,
                    },
                    {
                      label: "Response Time",
                      value: productData.seller.responseTime,
                    },
                    {
                      label: "Total Products",
                      value: productData.seller.totalProducts,
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="text-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-100"
                    >
                      <div className="text-sm font-bold text-blue-800">
                        {s.value}
                      </div>

                      <div className="text-xs text-slate-500 mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Similar Products */}
            {/* <div className="bg-white rounded-2xl border border-gray-200 p-6">

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900">
                  Similar Products
                </h2>

                <Link
                  to="/products"
                  className="text-sm text-blue-800 hover:underline font-medium"
                >
                  View all →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {similarProducts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-800 truncate transition-colors">
                        {p.name}
                      </h3>

                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />

                        <span className="text-xs text-slate-500">
                          {p.rating}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-orange-600" />

                        <span className="text-xs text-slate-500 truncate">
                          {p.location}
                        </span>
                      </div>

                      <p className="text-sm font-bold text-blue-800 mt-1">
                        {p.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div> */}


            <SimilarProducts />
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 flex flex-col gap-4">

              {/* Contact Card */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

                <div className="bg-blue-800 px-6 py-4">
                  <h2 className="text-white font-bold text-base">
                    Get Best Price
                  </h2>

                  <p className="text-blue-200 text-xs mt-0.5 truncate">
                    For: {productData.name}
                  </p>
                </div>

                <div className="p-5 flex flex-col gap-3">

                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send Inquiry
                  </button>

                  <a
                    href={`tel:${productData.seller.phone}`}
                    className="w-full bg-white hover:bg-blue-50 border border-blue-800 text-blue-800 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call Supplier
                  </a>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
                    <Shield className="w-3.5 h-3.5 text-green-600" />
                    Your information is safe & secure
                  </div>
                </div>
              </div>

              {/* About Supplier */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">

                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  About Supplier
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                    {productData.seller.name[0]}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {productData.seller.name}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3 text-orange-600" />
                      {productData.seller.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-xs text-slate-600">

                  <div className="flex justify-between">
                    <span className="text-slate-400">Response Rate</span>

                    <span className="font-semibold text-green-600">
                      {productData.seller.responseRate}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Response Time</span>

                    <span className="font-semibold text-slate-700">
                      {productData.seller.responseTime}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Member Since</span>

                    <span className="font-semibold text-slate-700">
                      {productData.seller.memberSince}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Products</span>

                    <span className="font-semibold text-slate-700">
                      {productData.seller.totalProducts}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={productData.name}
      />
    </div>
  );
}


