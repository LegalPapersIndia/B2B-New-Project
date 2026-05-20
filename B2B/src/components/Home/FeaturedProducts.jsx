// // FeaturedProducts.jsx

// import React from "react";
// import { motion } from "framer-motion";
// import { MapPin, Star, ShoppingBag, TrendingUp } from "lucide-react";

// const products = [
//   {
//     id: 1,
//     name: "Industrial Safety Gloves",
//     image:
//       "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop",
//     company: "SafeTech Industries",
//     location: "Mumbai, India",
//     price: "₹250 / Pair",
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     name: "Automatic Packaging Machine",
//     image:
//       "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1200&auto=format&fit=crop",
//     company: "PackPro Solutions",
//     location: "Ahmedabad, India",
//     price: "₹1.2 Lakh",
//     rating: 4.7,
//   },
//   {
//     id: 3,
//     name: "Premium Organic Wheat",
//     image:
//       "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1200&auto=format&fit=crop",
//     company: "Green Harvest Ltd.",
//     location: "Punjab, India",
//     price: "₹45 / Kg",
//     rating: 4.9,
//   },
//   {
//     id: 4,
//     name: "Industrial Electric Motor",
//     image:
//       "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
//     company: "PowerMax Engineering",
//     location: "Surat, India",
//     price: "₹18,000",
//     rating: 4.6,
//   },
// ];

// const FeaturedProducts = () => {
//   return (
//     <section className="bg-gray-50">
//       <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-1">
        
//         {/* HEADER */}
//         <div className="mb-12">
//           <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
//             <TrendingUp className="w-4 h-4" />
//             Trending Industrial Products
//           </div>

//           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//             Featured{" "}
//             <span className="text-blue-800">
//               Products
//             </span>
//           </h2>

//           <p className="mt-2 text-slate-600 max-w-2xl">
//             Discover premium quality wholesale and industrial products from
//             verified manufacturers and suppliers worldwide.
//           </p>
//         </div>

//         {/* PRODUCTS GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {products.map((product, index) => (
//             <motion.div
//               key={product.id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
//             >
              
//               {/* IMAGE */}
//               <div className="relative overflow-hidden">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-60 w-full object-cover group-hover:scale-105 transition duration-700"
//                 />

//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />

//                 {/* Badge */}
//                 <div className="absolute top-4 left-4 bg-blue-800 text-white text-xs px-3 py-1 rounded-full">
//                   Featured
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <div className="p-5 flex flex-col flex-1">
                
//                 {/* Rating */}
//                 <div className="flex items-center gap-1 mb-3">
//                   <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                   <span className="text-sm font-medium text-slate-700">
//                     {product.rating}
//                   </span>
//                 </div>

//                 {/* Product Name */}
//                 <h3 className="text-xl font-bold text-slate-900 mb-2 transition duration-300 group-hover:text-blue-800 min-h-[56px]">
//                   {product.name}
//                 </h3>

//                 {/* Company */}
//                 <p className="text-slate-600 text-sm mb-3">
//                   {product.company}
//                 </p>

//                 {/* Location */}
//                 <div className="flex items-center gap-2 text-slate-500 text-sm mb-5">
//                   <MapPin className="w-4 h-4 text-orange-600" />
//                   {product.location}
//                 </div>

//                 {/* Spacer */}
//                 <div className="mt-auto">
                  
//                   {/* Price */}
//                   <div className="mb-5">
//                     <span className="text-2xl font-bold text-blue-800">
//                       {product.price}
//                     </span>
//                   </div>

//                   {/* Button */}
//                   <button className="w-full bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2">
//                     <ShoppingBag className="w-5 h-5" />
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;




import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, ShoppingBag, TrendingUp } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Industrial Safety Gloves",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop",
    company: "SafeTech Industries",
    location: "Mumbai, India",
    price: "₹250 / Pair",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Automatic Packaging Machine",
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1200&auto=format&fit=crop",
    company: "PackPro Solutions",
    location: "Ahmedabad, India",
    price: "₹1.2 Lakh",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Premium Organic Wheat",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1200&auto=format&fit=crop",
    company: "Green Harvest Ltd.",
    location: "Punjab, India",
    price: "₹45 / Kg",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Industrial Electric Motor",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    company: "PowerMax Engineering",
    location: "Surat, India",
    price: "₹18,000",
    rating: 4.6,
  },
];

const FeaturedProducts = () => {
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
    <section className="bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-1">

        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            <TrendingUp className="w-4 h-4" />
            Trending Industrial Products
          </div>

          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            Featured{" "}
            <span className="text-blue-800">Products</span>
          </h2>

          <p className="mt-2 text-slate-600 max-w-2xl">
            Discover premium quality wholesale and industrial products from
            verified manufacturers and suppliers worldwide.
          </p>
        </div>

        {/* CAROUSEL */}
        <div
          className="relative group"
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
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {[...products, ...products].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full flex-shrink-0 w-[300px]"
              >
                
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-60 w-full object-cover group-hover:scale-105 transition duration-700"
                  />

                  <div className="absolute top-4 left-4 bg-blue-800 text-white text-xs px-3 py-1 rounded-full">
                    Featured
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-slate-700">
                      {product.rating}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-800 min-h-[56px]">
                    {product.name}
                  </h3>

                  {/* Company */}
                  <p className="text-slate-600 text-sm mb-3">
                    {product.company}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-5">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    {product.location}
                  </div>

                  <div className="mt-auto">
                    {/* Price */}
                    <div className="mb-5">
                      <span className="text-2xl font-bold text-blue-800">
                        {product.price}
                      </span>
                    </div>

                    {/* Button */}
                    <button className="w-full bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* hide scrollbar */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
};

export default FeaturedProducts;