// import React from "react";

// export default function FilterSidebar() {
//   return (
//     <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-24">

//       {/* HEADING */}
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">
//         Filters
//       </h2>

//       {/* VERIFIED */}
//       <div className="border-b border-gray-100 pb-6 mb-6">

//         <h3 className="font-semibold text-slate-800 mb-4">
//           Supplier Type
//         </h3>

//         <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
//           <input type="checkbox" className="w-4 h-4" />
//           Verified Suppliers
//         </label>

//       </div>

//       {/* LOCATION */}
//       <div className="border-b border-gray-100 pb-6 mb-6">

//         <h3 className="font-semibold text-slate-800 mb-4">
//           Location
//         </h3>

//         <div className="space-y-3">

//           <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
//             <input type="checkbox" className="w-4 h-4" />
//             Delhi
//           </label>

//           <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
//             <input type="checkbox" className="w-4 h-4" />
//             Mumbai
//           </label>

//           <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
//             <input type="checkbox" className="w-4 h-4" />
//             Ahmedabad
//           </label>

//         </div>

//       </div>

//       {/* PRICE */}
//       <div className="border-b border-gray-100 pb-6 mb-6">

//         <h3 className="font-semibold text-slate-800 mb-4">
//           Price Range
//         </h3>

//         <div className="space-y-3">

//           <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
//             <input type="radio" name="price" />
//             Under ₹500
//           </label>

//           <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
//             <input type="radio" name="price" />
//             ₹500 - ₹5000
//           </label>

//           <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
//             <input type="radio" name="price" />
//             Above ₹5000
//           </label>

//         </div>

//       </div>

//       {/* MOQ */}
//       <div>

//         <h3 className="font-semibold text-slate-800 mb-4">
//           Minimum Order
//         </h3>

//         <input
//           type="text"
//           placeholder="Enter MOQ"
//           className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
//         />

//       </div>

//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import {
//   ShieldCheck,
//   Filter,
//   ChevronRight,
//   IndianRupee,
// } from "lucide-react";

// export default function FilterSidebar() {

//   // 👉 PRICE RANGE
//   const [price, setPrice] = useState(5000);

//   return (
//     <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm sticky top-24 space-y-5">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 border-b border-gray-100 pb-4">

//         <div className="bg-orange-100 p-2 rounded-xl">
//           <Filter className="w-4 h-4 text-orange-600" />
//         </div>

//         <div>
//           <h2 className="text-lg font-bold text-slate-900">
//             Filters
//           </h2>

//           <p className="text-[11px] text-gray-500">
//             Refine your search
//           </p>
//         </div>

//       </div>

//       {/* RELATED CATEGORIES */}
//       <div className="border-b border-gray-100 pb-4">

//         <h3 className="font-semibold text-slate-900 mb-3 text-sm">
//           Related Categories
//         </h3>

//         <div className="space-y-1">

//           <Link
//             to="/subcategory/tablets"
//             className="flex items-center justify-between hover:bg-orange-50 px-3 py-2 rounded-xl transition group"
//           >
//             <span className="text-sm text-gray-700 group-hover:text-orange-600">
//               Tablets
//             </span>

//             <ChevronRight className="w-4 h-4 text-gray-400" />
//           </Link>

//           <Link
//             to="/subcategory/capsules"
//             className="flex items-center justify-between hover:bg-orange-50 px-3 py-2 rounded-xl transition group"
//           >
//             <span className="text-sm text-gray-700 group-hover:text-orange-600">
//               Capsules
//             </span>

//             <ChevronRight className="w-4 h-4 text-gray-400" />
//           </Link>

//           <Link
//             to="/subcategory/syrups"
//             className="flex items-center justify-between hover:bg-orange-50 px-3 py-2 rounded-xl transition group"
//           >
//             <span className="text-sm text-gray-700 group-hover:text-orange-600">
//               Syrups
//             </span>

//             <ChevronRight className="w-4 h-4 text-gray-400" />
//           </Link>

//           <Link
//             to="/subcategory/medical-kits"
//             className="flex items-center justify-between hover:bg-orange-50 px-3 py-2 rounded-xl transition group"
//           >
//             <span className="text-sm text-gray-700 group-hover:text-orange-600">
//               Medical Kits
//             </span>

//             <ChevronRight className="w-4 h-4 text-gray-400" />
//           </Link>

//         </div>

//       </div>

//       {/* VERIFIED SUPPLIERS */}
//       <div className="border-b border-gray-100 pb-4">

//         <h3 className="font-semibold text-slate-900 mb-3 text-sm">
//           Supplier Type
//         </h3>

//         <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">

//           <input
//             type="checkbox"
//             className="w-4 h-4 accent-orange-600"
//           />

//           <div className="flex items-center gap-2">
//             <ShieldCheck className="w-4 h-4 text-green-600" />
//             Verified Suppliers
//           </div>

//         </label>

//       </div>

//       {/* PRICE RANGE */}
//       <div className="border-b border-gray-100 pb-4">

//         <div className="flex items-center justify-between mb-3">

//           <h3 className="font-semibold text-slate-900 text-sm">
//             Price Range
//           </h3>

//           <div className="flex items-center gap-1 text-orange-600 font-semibold text-sm">

//             <IndianRupee className="w-4 h-4" />

//             {price}

//           </div>

//         </div>

//         {/* RANGE SLIDER */}
//         <input
//           type="range"
//           min="100"
//           max="10000"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="w-full accent-orange-600 cursor-pointer"
//         />

//         {/* RANGE LABEL */}
//         <div className="flex justify-between text-[11px] text-gray-500 mt-1">
//           <span>₹100</span>
//           <span>₹10000</span>
//         </div>

//       </div>

//       {/* MOQ */}
//       <div>

//         <h3 className="font-semibold text-slate-900 mb-3 text-sm">
//           MOQ
//         </h3>

//         <input
//           type="text"
//           placeholder="Enter MOQ"
//           className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//         />

//       </div>

//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import {
//   ShieldCheck,
//   MapPin,
//   Filter,
//   ChevronRight,
//   IndianRupee,
//   Loader,
// } from "lucide-react";

// export default function FilterSidebar() {

//   // =========================
//   // STATES
//   // =========================
//   const [states, setStates] = useState([]);
//   const [selectedState, setSelectedState] = useState("");

//   const [loadingStates, setLoadingStates] =
//     useState(true);

//   const [price, setPrice] = useState(5000);

//   // =========================
//   // FETCH INDIA STATES
//   // =========================
//   useEffect(() => {
//     setLoadingStates(true);

//     fetch(
//       "https://countriesnow.space/api/v0.1/countries/states",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           country: "India",
//         }),
//       }
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         const stateList = (
//           data.data?.states || []
//         )
//           .map((item) => item.name)
//           .sort();

//         setStates(stateList);
//       })
//       .catch(() => setStates([]))
//       .finally(() => setLoadingStates(false));
//   }, []);

//   return (
//     <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm sticky top-24 overflow-hidden">

//       {/* HEADER */}
//       <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">

//         <div className="flex items-center gap-3">

//           <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center">

//             <Filter className="w-5 h-5 text-orange-600" />

//           </div>

//           <div>

//             <h2 className="text-xl font-bold text-slate-900">
//               Filters
//             </h2>

//             <p className="text-xs text-gray-500 mt-0.5">
//               Find products quickly
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* CONTENT */}
//       <div className="p-5 space-y-6">

//         {/* RELATED CATEGORIES */}
//         <div>

//           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
//             Related Categories
//           </h3>

//           <div className="space-y-2">

//             <Link
//               to="/subcategory/tablets"
//               className="flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group"
//             >

//               <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
//                 Tablets
//               </span>

//               <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />

//             </Link>

//             <Link
//               to="/subcategory/capsules"
//               className="flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group"
//             >

//               <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
//                 Capsules
//               </span>

//               <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />

//             </Link>

//             <Link
//               to="/subcategory/syrups"
//               className="flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group"
//             >

//               <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
//                 Syrups
//               </span>

//               <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />

//             </Link>

//           </div>

//         </div>

//         {/* VERIFIED */}
//         <div>

//           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
//             Supplier Type
//           </h3>

//           <label className="flex items-center gap-3 cursor-pointer bg-gray-50 hover:bg-orange-50 border border-gray-100 rounded-2xl px-4 py-3 transition">

//             <input
//               type="checkbox"
//               className="accent-orange-600 w-4 h-4"
//             />

//             <div className="flex items-center gap-2 text-sm font-medium text-gray-700">

//               <ShieldCheck className="w-4 h-4 text-green-600" />

//               Verified Suppliers

//             </div>

//           </label>

//         </div>

//         {/* LOCATION */}
//         <div>

//           <div className="flex items-center justify-between mb-4">

//             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
//               Location
//             </h3>

//             {loadingStates && (
//               <Loader className="animate-spin text-orange-600 w-4 h-4" />
//             )}

//           </div>

//           <select
//             value={selectedState}
//             onChange={(e) =>
//               setSelectedState(e.target.value)
//             }
//             className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition bg-white"
//           >

//             <option value="">
//               Select State
//             </option>

//             {states.map((state) => (
//               <option
//                 key={state}
//                 value={state}
//               >
//                 {state}
//               </option>
//             ))}

//           </select>

//         </div>

//         {/* PRICE RANGE */}
//         <div>

//           <div className="flex items-center justify-between mb-4">

//             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
//               Price Range
//             </h3>

//             <div className="flex items-center gap-1 text-orange-600 font-bold text-sm">

//               <IndianRupee className="w-4 h-4" />

//               {price}

//             </div>

//           </div>

//           {/* RANGE */}
//           <input
//             type="range"
//             min="100"
//             max="100000"
//             step="100"
//             value={price}
//             onChange={(e) =>
//               setPrice(e.target.value)
//             }
//             className="w-full accent-orange-600 cursor-pointer"
//           />

//           {/* LABELS */}
//           <div className="flex justify-between text-xs text-gray-500 mt-2">

//             <span>₹100</span>

//             <span>₹1L+</span>

//           </div>

//         </div>

//         {/* MOQ */}
//         <div>

//           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
//             Minimum Order
//           </h3>

//           <input
//             type="text"
//             placeholder="Ex: 100 Pieces"
//             className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition"
//           />

//         </div>

//       </div>

//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import {
//   ShieldCheck,
//   Filter,
//   ChevronRight,
//   IndianRupee,
//   Loader,
// } from "lucide-react";

// export default function FilterSidebar({

//   selectedState,
//   setSelectedState,

//   verifiedOnly,
//   setVerifiedOnly,

//   price,
//   setPrice,

// }) {

//   // =========================
//   // STATES
//   // =========================
//   const [states, setStates] = useState([]);

//   const [loadingStates, setLoadingStates] =
//     useState(true);

//   // =========================
//   // FETCH INDIA STATES
//   // =========================
//   useEffect(() => {

//     setLoadingStates(true);

//     fetch(
//       "https://countriesnow.space/api/v0.1/countries/states",
//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           country: "India",
//         }),
//       }
//     )
//       .then((res) => res.json())

//       .then((data) => {

//         const stateList = (
//           data.data?.states || []
//         )
//           .map((item) => item.name)
//           .sort();

//         setStates(stateList);

//       })

//       .catch(() => setStates([]))

//       .finally(() =>
//         setLoadingStates(false)
//       );

//   }, []);

//   return (
//     <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm sticky top-24 overflow-hidden">

//       {/* HEADER */}
//       <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">

//         <div className="flex items-center gap-3">

//           <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center">

//             <Filter className="w-5 h-5 text-orange-600" />

//           </div>

//           <div>

//             <h2 className="text-xl font-bold text-slate-900">
//               Filters
//             </h2>

//             <p className="text-xs text-gray-500 mt-0.5">
//               Find products quickly
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* CONTENT */}
//       <div className="p-5 space-y-5">

//         {/* RELATED CATEGORIES */}
//         <div>

//           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
//             Related Categories
//           </h3>

//           <div className="space-y-2">

//             <Link
//               to="/subcategory/tablets"
//               className="flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group"
//             >

//               <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
//                 Tablets
//               </span>

//               <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />

//             </Link>

//             <Link
//               to="/subcategory/capsules"
//               className="flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group"
//             >

//               <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
//                 Capsules
//               </span>

//               <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />

//             </Link>

//             <Link
//               to="/subcategory/syrups"
//               className="flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group"
//             >

//               <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
//                 Syrups
//               </span>

//               <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />

//             </Link>

//           </div>

//         </div>

//         {/* VERIFIED */}
//         <div>

//           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
//             Supplier Type
//           </h3>

//           <label className="flex items-center gap-3 cursor-pointer bg-gray-50 hover:bg-orange-50 border border-gray-100 rounded-2xl px-4 py-3 transition">

//             <input
//               type="checkbox"
//               checked={verifiedOnly}
//               onChange={(e) =>
//                 setVerifiedOnly(
//                   e.target.checked
//                 )
//               }
//               className="accent-orange-600 w-4 h-4"
//             />

//             <div className="flex items-center gap-2 text-sm font-medium text-gray-700">

//               <ShieldCheck className="w-4 h-4 text-green-600" />

//               Verified Suppliers

//             </div>

//           </label>

//         </div>

//         {/* LOCATION */}
//         <div>

//           <div className="flex items-center justify-between mb-4">

//             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
//               Location
//             </h3>

//             {loadingStates && (
//               <Loader className="animate-spin text-orange-600 w-4 h-4" />
//             )}

//           </div>

//           <select
//             value={selectedState}
//             onChange={(e) =>
//               setSelectedState(
//                 e.target.value
//               )
//             }
//             className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition bg-white"
//           >

//             <option value="">
//               Select State
//             </option>

//             {states.map((state) => (
//               <option
//                 key={state}
//                 value={state}
//               >
//                 {state}
//               </option>
//             ))}

//           </select>

//         </div>

//         {/* PRICE RANGE */}
//         <div>

//           <div className="flex items-center justify-between mb-4">

//             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
//               Price Range
//             </h3>

//             <div className="flex items-center gap-1 text-orange-600 font-bold text-sm">

//               <IndianRupee className="w-4 h-4" />

//               {price}

//             </div>

//           </div>

//           {/* RANGE */}
//           <input
//             type="range"
//             min="100"
//             max="100000"
//             step="100"
//             value={price}
//             onChange={(e) =>
//               setPrice(
//                 Number(e.target.value)
//               )
//             }
//             className="w-full accent-orange-600 cursor-pointer"
//           />

//           {/* LABELS */}
//           <div className="flex justify-between text-xs text-gray-500 mt-2">

//             <span>₹100</span>

//             <span>₹1L+</span>

//           </div>

//         </div>

//         {/* MOQ */}
//         <div>

//           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
//             Minimum Order
//           </h3>

//           <input
//             type="text"
//             placeholder="Ex: 100 Pieces"
//             className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition"
//           />

//         </div>

//       </div>

//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";

// import {
//   Link,
//   useParams,
// } from "react-router-dom";

// import {
//   ShieldCheck,
//   Filter,
//   ChevronRight,
//   IndianRupee,
//   Loader,
// } from "lucide-react";

// import { sidebarCategories } from "../../data/sidebarCategories";

// export default function FilterSidebar({

//   selectedState,
//   setSelectedState,

//   verifiedOnly,
//   setVerifiedOnly,

//   price,
//   setPrice,

// }) {

//   // =========================
//   // CURRENT CATEGORY
//   // =========================
// const { slug } = useParams();

//   // =========================
//   // DYNAMIC RELATED CATEGORIES
//   // =========================
//  const relatedCategories =
//   sidebarCategories[slug] || [];

//   // =========================
//   // STATES
//   // =========================
//   const [states, setStates] = useState([]);

//   const [loadingStates, setLoadingStates] =
//     useState(true);

//   // =========================
//   // FETCH INDIA STATES
//   // =========================
//   useEffect(() => {

//     setLoadingStates(true);

//     fetch(
//       "https://countriesnow.space/api/v0.1/countries/states",
//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           country: "India",
//         }),
//       }
//     )
//       .then((res) => res.json())

//       .then((data) => {

//         const stateList = (
//           data.data?.states || []
//         )
//           .map((item) => item.name)
//           .sort();

//         setStates(stateList);

//       })

//       .catch(() => setStates([]))

//       .finally(() =>
//         setLoadingStates(false)
//       );

//   }, []);

//   return (
//     <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm sticky top-24 overflow-hidden">

//       {/* HEADER */}
//       <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">

//         <div className="flex items-center gap-3">

//           <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center">

//             <Filter className="w-5 h-5 text-orange-600" />

//           </div>

//           <div>

//             <h2 className="text-xl font-bold text-slate-900">
//               Filters
//             </h2>

//             <p className="text-xs text-gray-500 mt-0.5">
//               Find products quickly
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* CONTENT */}
//       <div className="p-5 space-y-5">

//         {/* RELATED CATEGORIES */}
//         <div>

//           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
//             Related Categories
//           </h3>

//           <div className="space-y-2">

//             {relatedCategories.length > 0 ? (

//               relatedCategories.map((item, index) => (

//                 <Link
//                   key={index}
//                   to={`/subcategory/${item.toLowerCase().replace(/\s+/g, "-")}`}
//                   className="flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group"
//                 >

//                   <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
//                     {item}
//                   </span>

//                   <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />

//                 </Link>

//               ))

//             ) : (

//               <div className="text-sm text-gray-500 px-2">
//                 No related categories found
//               </div>

//             )}

//           </div>

//         </div>

//         {/* VERIFIED */}
//         <div>

//           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
//             Supplier Type
//           </h3>

//           <label className="flex items-center gap-3 cursor-pointer bg-gray-50 hover:bg-orange-50 border border-gray-100 rounded-2xl px-4 py-3 transition">

//             <input
//               type="checkbox"
//               checked={verifiedOnly}
//               onChange={(e) =>
//                 setVerifiedOnly(
//                   e.target.checked
//                 )
//               }
//               className="accent-orange-600 w-4 h-4"
//             />

//             <div className="flex items-center gap-2 text-sm font-medium text-gray-700">

//               <ShieldCheck className="w-4 h-4 text-green-600" />

//               Verified Suppliers

//             </div>

//           </label>

//         </div>

//         {/* LOCATION */}
//         <div>

//           <div className="flex items-center justify-between mb-4">

//             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
//               Location
//             </h3>

//             {loadingStates && (
//               <Loader className="animate-spin text-orange-600 w-4 h-4" />
//             )}

//           </div>

//           <select
//             value={selectedState}
//             onChange={(e) =>
//               setSelectedState(
//                 e.target.value
//               )
//             }
//             className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition bg-white"
//           >

//             <option value="">
//               Select State
//             </option>

//             {states.map((state) => (
//               <option
//                 key={state}
//                 value={state}
//               >
//                 {state}
//               </option>
//             ))}

//           </select>

//         </div>

//         {/* PRICE RANGE */}
//         <div>

//           <div className="flex items-center justify-between mb-4">

//             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
//               Price Range
//             </h3>

//             <div className="flex items-center gap-1 text-orange-600 font-bold text-sm">

//               <IndianRupee className="w-4 h-4" />

//               {price}

//             </div>

//           </div>

//           {/* RANGE */}
//           <input
//             type="range"
//             min="100"
//             max="100000"
//             step="100"
//             value={price}
//             onChange={(e) =>
//               setPrice(
//                 Number(e.target.value)
//               )
//             }
//             className="w-full accent-orange-600 cursor-pointer"
//           />

//           {/* LABELS */}
//           <div className="flex justify-between text-xs text-gray-500 mt-2">

//             <span>₹100</span>

//             <span>₹1L+</span>

//           </div>

//         </div>

//         {/* MOQ */}
//         <div>

//           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
//             Minimum Order
//           </h3>

//           <input
//             type="text"
//             placeholder="Ex: 100 Pieces"
//             className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition"
//           />

//         </div>

//       </div>

//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import {
  ShieldCheck,
  Filter,
  ChevronRight,
  IndianRupee,
  Loader,
} from "lucide-react";

import { sidebarCategories } from "../../data/sidebarCategories";

export default function FilterSidebar({
  selectedState,
  setSelectedState,

  verifiedOnly,
  setVerifiedOnly,

  price,
  setPrice,
}) {
  // =========================
  // CURRENT CATEGORY
  // =========================
  const { slug } = useParams();

  // =========================
  // DYNAMIC RELATED CATEGORIES
  // =========================
  const relatedCategories = sidebarCategories[slug] || [];

  // =========================
  // STATES
  // =========================
  const [states, setStates] = useState([]);

  const [loadingStates, setLoadingStates] = useState(true);

  // =========================
  // FETCH INDIA STATES
  // =========================
  useEffect(() => {
    setLoadingStates(true);

    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        country: "India",
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        const stateList = (data.data?.states || [])
          .map((item) => item.name)
          .sort();

        setStates(stateList);
      })

      .catch(() => setStates([]))

      .finally(() => setLoadingStates(false));
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-24 overflow-hidden">
      {/* HEADER */}
      <div className="px-4 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#F54900]" />

          <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">
            Filters
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-5">
        {/* RELATED CATEGORIES */}
        <div>
          <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
            Related Categories
          </h3>

          <div className="space-y-1.5">
            {relatedCategories.length > 0 ? (
              relatedCategories.map((item, index) => (
                <Link
                  key={index}
                  to={`/category/${slug}/subcategory/${item
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="flex items-center justify-between py-2 text-[13px] text-gray-700 hover:text-[#F54900] transition group border-b border-gray-100 last:border-none"
                >
                  <span className="font-normal">{item}</span>

                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#F54900]" />
                </Link>
              ))
            ) : (
              <div className="text-[13px] text-gray-400">
                No related categories found
              </div>
            )}
          </div>
        </div>

        {/* VERIFIED */}
        <div>
          <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
            Supplier Type
          </h3>

          <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-700">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="accent-[#F54900] w-4 h-4"
            />

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Verified Suppliers
            </div>
          </label>
        </div>

        {/* LOCATION */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-gray-900">
              Location
            </h3>

            {loadingStates && (
              <Loader className="animate-spin text-[#F54900] w-3.5 h-3.5" />
            )}
          </div>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-[#F54900] transition bg-white text-gray-700"
          >
            <option value="">Select State</option>

            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE RANGE */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-gray-900">
              Price Range
            </h3>

            <div className="flex items-center gap-1 text-[#F54900] font-semibold text-[13px]">
              <IndianRupee className="w-3.5 h-3.5" />

              {price}
            </div>
          </div>

          {/* RANGE */}
          <input
            type="range"
            min="100"
            max="100000"
            step="100"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-[#F54900] cursor-pointer"
          />

          {/* LABELS */}
          <div className="flex justify-between text-[11px] text-gray-500 mt-1">
            <span>₹100</span>

            <span>₹1L+</span>
          </div>
        </div>

        {/* MOQ */}
        <div>
          <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
            Minimum Order
          </h3>

          <input
            type="text"
            placeholder="Ex: 100 Pieces"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-[#F54900] transition"
          />
        </div>
      </div>
    </div>
  );
}
