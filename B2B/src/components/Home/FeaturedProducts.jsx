

// import React, { useRef, useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { MapPin, Star, ShoppingBag, TrendingUp } from "lucide-react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { Link } from "react-router-dom";

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
//   const scrollRef = useRef(null);
//   const intervalRef = useRef(null);
//   const [isHovered, setIsHovered] = useState(false);

//   // AUTO SCROLL
//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;

//     intervalRef.current = setInterval(() => {
//       if (!el || isHovered) return;

//       el.scrollLeft += 1;

//       if (el.scrollLeft >= el.scrollWidth / 2) {
//         el.scrollLeft = 0;
//       }
//     }, 16);

//     return () => clearInterval(intervalRef.current);
//   }, [isHovered]);

//   // BUTTON SCROLL
//   const scroll = (dir) => {
//     const el = scrollRef.current;
//     if (!el) return;

//     const amount = 320;

//     el.scrollBy({
//       left: dir === "next" ? amount : -amount,
//       behavior: "smooth",
//     });
//   };

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
//             <span className="text-blue-800">Products</span>
//           </h2>

//           <p className="mt-2 text-slate-600 max-w-2xl">
//             Discover premium quality wholesale and industrial products from
//             verified manufacturers and suppliers worldwide.
//           </p>
//         </div>

//         {/* CAROUSEL */}
//         <div
//           className="relative group"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >

//           {/* LEFT BUTTON */}
//           <button
//             onClick={() => scroll("prev")}
//             className="absolute left-2 top-1/2 -translate-y-1/2 z-20
//                        bg-white/90 hover:bg-white shadow-md p-3 rounded-full
//                        opacity-0 group-hover:opacity-100 transition"
//           >
//             <FaChevronLeft />
//           </button>

//           {/* RIGHT BUTTON */}
//           <button
//             onClick={() => scroll("next")}
//             className="absolute right-2 top-1/2 -translate-y-1/2 z-20
//                        bg-white/90 hover:bg-white shadow-md p-3 rounded-full
//                        opacity-0 group-hover:opacity-100 transition"
//           >
//             <FaChevronRight />
//           </button>

//           {/* SCROLL AREA */}
//           <div
//             ref={scrollRef}
//             className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide"
//           >
//             {[...products, ...products].map((product, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full flex-shrink-0 w-[300px]"
//               >

//                 {/* IMAGE */}
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="h-60 w-full object-cover group-hover:scale-105 transition duration-700"
//                   />

//                   <div className="absolute top-4 left-4 bg-blue-800 text-white text-xs px-3 py-1 rounded-full">
//                     Featured
//                   </div>
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-5 flex flex-col flex-1">

//                   {/* Rating */}
//                   <div className="flex items-center gap-1 mb-3">
//                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-sm font-medium text-slate-700">
//                       {product.rating}
//                     </span>
//                   </div>

//                   {/* Name */}
//                   <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-800 min-h-[56px]">
//                     {product.name}
//                   </h3>

//                   {/* Company */}
//                   <p className="text-slate-600 text-sm mb-3">
//                     {product.company}
//                   </p>

//                   {/* Location */}
//                   <div className="flex items-center gap-2 text-slate-500 text-sm mb-5">
//                     <MapPin className="w-4 h-4 text-orange-600" />
//                     {product.location}
//                   </div>

//                   <div className="mt-auto">
//                     {/* Price */}
//                     <div className="mb-5">
//                       <span className="text-2xl font-bold text-blue-800">
//                         {product.price}
//                       </span>
//                     </div>

//                     {/* Button */}
//                     <Link
//                       to={`/product/${product.id}`}
//                       className="w-full bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
//                     >
//                       <ShoppingBag className="w-5 h-5" />
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//       </div>

//       {/* hide scrollbar */}
//       <style>
//         {`
//           .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//           }
//         `}
//       </style>
//     </section>
//   );
// };

// export default FeaturedProducts;


//api fetch

// // src/components/Home/FeaturedProducts.jsx

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ShoppingBag, TrendingUp, Crown } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../api/productApi";

const FeaturedProducts = () => {
  const scrollRef    = useRef(null);
  const intervalRef  = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);

  // ─────────────────────────────────────────
  // FETCH FEATURED PRODUCTS
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedProducts();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("FeaturedProducts error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ─────────────────────────────────────────
  // AUTO SCROLL
  // ─────────────────────────────────────────
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
  }, [isHovered, products]);

  // ─────────────────────────────────────────
  // BUTTON SCROLL
  // ─────────────────────────────────────────
  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "next" ? 320 : -320,
      behavior: "smooth",
    });
  };

  // ─────────────────────────────────────────
  // PLAN BADGE
  // ─────────────────────────────────────────
  const planBadge = (plan) => {
    switch (plan) {
      case "gold":    return "bg-yellow-500 text-white";
      case "premium": return "bg-purple-600 text-white";
      default:        return "bg-blue-800 text-white";
    }
  };

  // ─────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────
  if (loading) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-[300px] h-[420px] bg-gray-200 rounded-2xl animate-pulse flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─────────────────────────────────────────
  // NO PRODUCTS
  // ─────────────────────────────────────────
  if (!loading && products.length === 0) {
    return null; // Section hide karo agar koi featured product nahi
  }

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
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
            Featured <span className="text-blue-800">Products</span>
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
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <FaChevronLeft />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => scroll("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <FaChevronRight />
          </button>

          {/* SCROLL AREA */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {/* DUPLICATE FOR INFINITE SCROLL */}
            {[...products, ...products].map((product, index) => (
              <motion.div
                key={`${product._id}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full flex-shrink-0 w-[300px]"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="h-60 w-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  ) : (
                    <div className="h-60 w-full bg-gray-100 flex items-center justify-center text-gray-300">
                      No Image
                    </div>
                  )}

                  {/* PLAN BADGE */}
                  <div className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 ${planBadge(product.seller?.subscriptionPlan)}`}>
                    <Crown className="w-3 h-3" />
                    {product.seller?.subscriptionPlan === "gold" ? "Gold" : "Premium"}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">

                  {/* PRODUCT NAME */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-800 line-clamp-2 min-h-[56px] transition">
                    {product.title}
                  </h3>

                  {/* COMPANY */}
                  <p className="text-sm font-medium mb-1">
                    {product.seller?.companyWebsite ? (
                      <a
                        href={product.seller.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        {product.seller?.companyName || product.seller?.name || "—"}
                      </a>
                    ) : (
                      <span className="text-slate-600">
                        {product.seller?.companyName || product.seller?.name || "—"}
                      </span>
                    )}
                  </p>

                  {/* LOCATION */}
                  {(product.seller?.city || product.seller?.state) && (
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                      <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      {[product.seller?.city, product.seller?.state]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  )}

                  <div className="mt-auto">
                    {/* PRICE */}
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-blue-800">
                        ₹{product.price?.toLocaleString()}
                      </span>
                      <span className="text-gray-400 text-sm ml-1">
                        / {product.unit}
                      </span>
                    </div>

                    {/* MOQ */}
                    <p className="text-xs text-gray-400 mb-4">
                      MOQ: {product.moq} {product.unit}
                    </p>

                    {/* BUTTON */}
                    <Link
                      to={`/category/${product.category?.slug}/subcategory/${product.subcategory?.slug}/product/${product.slug}`}
                      className="w-full bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      View Details
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;