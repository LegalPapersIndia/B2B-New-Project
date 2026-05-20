// // TrustedSuppliers.jsx

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   BadgeCheck,
//   Star,
//   Factory,
//   ArrowRight,
// } from "lucide-react";

// // IMAGES
// import supplier1 from "../assets/hero1.jpg";
// import supplier2 from "../assets/hero1.jpg";
// import supplier3 from "../assets/hero1.jpg";
// import supplier4 from "../assets/hero1.jpg";

// const suppliers = [
//   {
//     id: 1,
//     name: "SafeTech Industries",
//     image: supplier1,
//     location: "Mumbai, India",
//     experience: "12 Years",
//     rating: 4.8,
//     products: "250+ Products",
//   },
//   {
//     id: 2,
//     name: "PackPro Solutions",
//     image: supplier2,
//     location: "Ahmedabad, India",
//     experience: "9 Years",
//     rating: 4.7,
//     products: "180+ Products",
//   },
//   {
//     id: 3,
//     name: "Green Harvest Ltd.",
//     image: supplier3,
//     location: "Punjab, India",
//     experience: "15 Years",
//     rating: 4.9,
//     products: "320+ Products",
//   },
//   {
//     id: 4,
//     name: "PowerMax Engineering",
//     image: supplier4,
//     location: "Surat, India",
//     experience: "11 Years",
//     rating: 4.6,
//     products: "210+ Products",
//   },
// ];

// export default function TrustedSuppliers() {
//   return (
//     <section className="bg-white">
//       <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-16">
        
//         {/* HEADER */}
//         <div className="mb-12">
//           <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
//             <Factory className="w-4 h-4" />
//             Verified Manufacturers
//           </div>

//           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//             Trusted{" "}
//             <span className="text-blue-800">
//               Suppliers
//             </span>
//           </h2>

//           <p className="mt-2 text-slate-600 max-w-2xl">
//             Connect with verified manufacturers, exporters, and wholesale
//             suppliers trusted by businesses worldwide.
//           </p>
//         </div>

//         {/* SUPPLIERS GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {suppliers.map((supplier, index) => (
//             <motion.div
//               key={supplier.id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
//             >
              
//               {/* IMAGE */}
//               <div className="relative overflow-hidden">
//                 <img
//                   src={supplier.image}
//                   alt={supplier.name}
//                   className="h-64 w-full object-cover group-hover:scale-105 transition duration-700"
//                 />

//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />

//                 {/* Verified Badge */}
//                 <div className="absolute top-4 left-4 bg-blue-800 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                   <BadgeCheck className="w-3 h-3" />
//                   Verified
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <div className="p-5 flex flex-col flex-1">
                
//                 {/* Rating */}
//                 <div className="flex items-center gap-1 mb-3">
//                   <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                   <span className="text-sm font-medium text-slate-700">
//                     {supplier.rating}
//                   </span>
//                 </div>

//                 {/* Name */}
//                 <h3 className="text-xl font-bold text-slate-900 mb-3 min-h-[56px] group-hover:text-blue-800 transition duration-300">
//                   {supplier.name}
//                 </h3>

//                 {/* Location */}
//                 <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
//                   <MapPin className="w-4 h-4 text-orange-600" />
//                   {supplier.location}
//                 </div>

//                 {/* Experience */}
//                 <div className="flex items-center justify-between text-sm mb-2">
//                   <span className="text-slate-500">
//                     Experience
//                   </span>

//                   <span className="font-semibold text-slate-800">
//                     {supplier.experience}
//                   </span>
//                 </div>

//                 {/* Products */}
//                 <div className="flex items-center justify-between text-sm mb-6">
//                   <span className="text-slate-500">
//                     Products
//                   </span>

//                   <span className="font-semibold text-slate-800">
//                     {supplier.products}
//                   </span>
//                 </div>

//                 {/* Spacer */}
//                 <div className="mt-auto">
                  
//                   {/* Button */}
//                   <button className="w-full bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2">
//                     View Profile
//                     <ArrowRight className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// import React from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   BadgeCheck,
//   Star,
//   Factory,
//   ArrowRight,
// } from "lucide-react";

// import supplier1 from "../assets/SafeTech.webp";
// import supplier2 from "../assets/PackPro.webp";
// import supplier3 from "../assets/Green.webp";
// import supplier4 from "../assets/PackPro.webp";

// const suppliers = [
//   {
//     id: 1,
//     name: "SafeTech Industries",
//     image: supplier1,
//     location: "Mumbai, India",
//     experience: "12 Years",
//     rating: 4.8,
//     products: "250+ Products",
//   },
//   {
//     id: 2,
//     name: "PackPro Solutions",
//     image: supplier2,
//     location: "Ahmedabad, India",
//     experience: "9 Years",
//     rating: 4.7,
//     products: "180+ Products",
//   },
//   {
//     id: 3,
//     name: "Green Harvest Ltd.",
//     image: supplier3,
//     location: "Punjab, India",
//     experience: "15 Years",
//     rating: 4.9,
//     products: "320+ Products",
//   },
//   {
//     id: 4,
//     name: "PowerMax Engineering",
//     image: supplier4,
//     location: "Surat, India",
//     experience: "11 Years",
//     rating: 4.6,
//     products: "210+ Products",
//   },
// ];

// export default function TrustedSuppliers() {
//   return (
//     <section className="bg-white overflow-hidden">
//       <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-12">

//         {/* HEADER */}
//         <div className="mb-10">
//           <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
//             <Factory className="w-4 h-4" />
//             Verified Manufacturers
//           </div>

//           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//             Trusted{" "}
//             <span className="text-blue-800">Suppliers</span>
//           </h2>

//           <p className="mt-2 text-slate-600 max-w-2xl">
//             Connect with verified manufacturers, exporters, and wholesale
//             suppliers worldwide.
//           </p>
//         </div>

//         {/* MARQUEE WRAPPER */}
//         <div className="relative w-full overflow-hidden group">

//           <div className="flex w-max animate-scroll gap-8 group-hover:[animation-play-state:paused]">
            
//             {[...suppliers, ...suppliers].map((supplier, index) => (
//               <div
//                 key={index}
//                 className="w-[320px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition flex flex-col"
//               >
                
//                 {/* IMAGE */}
//                 <div className="relative">
//                   <img
//                     src={supplier.image}
//                     className="h-60 w-full object-cover"
//                   />

//                   <div className="absolute top-4 left-4 bg-blue-800 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                     <BadgeCheck className="w-3 h-3" />
//                     Verified
//                   </div>
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-5 flex flex-col flex-1">

//                   <div className="flex items-center gap-1 mb-2">
//                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-sm">{supplier.rating}</span>
//                   </div>

//                   <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-800">
//                     {supplier.name}
//                   </h3>

//                   <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
//                     <MapPin className="w-4 h-4 text-orange-600" />
//                     {supplier.location}
//                   </div>

//                   <div className="text-sm text-slate-600 mb-1">
//                     Experience:{" "}
//                     <span className="font-semibold text-slate-800">
//                       {supplier.experience}
//                     </span>
//                   </div>

//                   <div className="text-sm text-slate-600 mb-5">
//                     Products:{" "}
//                     <span className="font-semibold text-slate-800">
//                       {supplier.products}
//                     </span>
//                   </div>

//                   <button className="mt-auto bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
//                     View Profile
//                     <ArrowRight className="w-4 h-4" />
//                   </button>

//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>

//       {/* SCROLL ANIMATION */}
//       <style>
//         {`
//           @keyframes scroll {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(-50%); }
//           }

//           .animate-scroll {
//             animation: scroll 25s linear infinite;
//           }
//         `}
//       </style>
//     </section>
//   );
// }




import React, { useRef, useEffect, useState } from "react";
import {
  MapPin,
  BadgeCheck,
  Star,
  Factory,
  ArrowRight,
} from "lucide-react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import supplier1 from "../../assets/SafeTech.webp";
import supplier2 from "../../assets/PackPro.webp";
import supplier3 from "../../assets/Green.webp";
import supplier4 from "../../assets/PackPro.webp";

const suppliers = [
  {
    id: 1,
    name: "SafeTech Industries",
    image: supplier1,
    location: "Mumbai, India",
    experience: "12 Years",
    rating: 4.8,
    products: "250+ Products",
  },
  {
    id: 2,
    name: "PackPro Solutions",
    image: supplier2,
    location: "Ahmedabad, India",
    experience: "9 Years",
    rating: 4.7,
    products: "180+ Products",
  },
  {
    id: 3,
    name: "Green Harvest Ltd.",
    image: supplier3,
    location: "Punjab, India",
    experience: "15 Years",
    rating: 4.9,
    products: "320+ Products",
  },
  {
    id: 4,
    name: "PowerMax Engineering",
    image: supplier4,
    location: "Surat, India",
    experience: "11 Years",
    rating: 4.6,
    products: "210+ Products",
  },
];

export default function TrustedSuppliers() {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // AUTO SCROLL
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    intervalRef.current = setInterval(() => {
      if (!el || isHovered) return;

      el.scrollLeft += 1;

      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
    }, 16);

    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  // BUTTON SCROLL
  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = 320;

    el.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-12">

        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            <Factory className="w-4 h-4" />
            Verified Manufacturers
          </div>

          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            Trusted{" "}
            <span className="text-blue-800">Suppliers</span>
          </h2>

          <p className="mt-2 text-slate-600 max-w-2xl">
            Connect with verified manufacturers, exporters, and wholesale
            suppliers worldwide.
          </p>
        </div>

        {/* CAROUSEL WRAPPER */}
        <div
          className="relative w-full group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* LEFT BUTTON */}
          <button
            onClick={() => scroll("prev")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                       bg-white/90 hover:bg-white shadow-md p-3 rounded-full
                       opacity-0 group-hover:opacity-100 transition"
          >
            <FaChevronLeft />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => scroll("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                       bg-white/90 hover:bg-white shadow-md p-3 rounded-full
                       opacity-0 group-hover:opacity-100 transition"
          >
            <FaChevronRight />
          </button>

          {/* SCROLL AREA */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {[...suppliers, ...suppliers].map((supplier, index) => (
              <div
                key={index}
                className="w-[320px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition flex flex-col flex-shrink-0"
              >

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={supplier.image}
                    className="h-60 w-full object-cover"
                  />

                  <div className="absolute top-4 left-4 bg-blue-800 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" />
                    Verified
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">

                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{supplier.rating}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-800">
                    {supplier.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    {supplier.location}
                  </div>

                  <div className="text-sm text-slate-600 mb-1">
                    Experience:{" "}
                    <span className="font-semibold text-slate-800">
                      {supplier.experience}
                    </span>
                  </div>

                  <div className="text-sm text-slate-600 mb-5">
                    Products:{" "}
                    <span className="font-semibold text-slate-800">
                      {supplier.products}
                    </span>
                  </div>

                  <button className="mt-auto bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
                    View Profile
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* HIDE SCROLLBAR */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
}