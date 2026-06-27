
// import React, { useRef, useEffect, useState } from "react";
// import { MapPin, BadgeCheck, Star, Factory, ArrowRight, Crown } from "lucide-react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { getFeaturedSellers } from "../../api/sellerProfileApi";

// export default function TrustedSuppliers() {
//   const scrollRef   = useRef(null);
//   const intervalRef = useRef(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [sellers, setSellers]     = useState([]);
//   const [loading, setLoading]     = useState(true);

//   // ─────────────────────────────────────────
//   // FETCH FEATURED SELLERS
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchSellers = async () => {
//       try {
//         setLoading(true);
//         const data = await getFeaturedSellers();
//         if (data.success) setSellers(data.sellers);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSellers();
//   }, []);

//   // ─────────────────────────────────────────
//   // AUTO SCROLL
//   // ─────────────────────────────────────────
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
//   }, [isHovered, sellers]);

//   // ─────────────────────────────────────────
//   // BUTTON SCROLL
//   // ─────────────────────────────────────────
//   const scroll = (dir) => {
//     const el = scrollRef.current;
//     if (!el) return;
//     el.scrollBy({
//       left: dir === "next" ? 320 : -320,
//       behavior: "smooth",
//     });
//   };

//   // ─────────────────────────────────────────
//   // PLAN BADGE
//   // ─────────────────────────────────────────
//   const planBadge = (plan) => {
//     switch (plan) {
//       case "gold":    return "bg-yellow-500 text-white";
//       case "premium": return "bg-purple-600 text-white";
//       default:        return "bg-blue-800 text-white";
//     }
//   };

//   // ─────────────────────────────────────────
//   // LOADING
//   // ─────────────────────────────────────────
//   if (loading) {
//     return (
//       <section className="bg-white py-12">
//         <div className="max-w-[1400px] mx-auto px-4">
//           <div className="flex gap-6 overflow-hidden">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="w-[320px] h-[420px] bg-gray-100 rounded-2xl animate-pulse flex-shrink-0" />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // HIDE IF NO SELLERS
//   if (!loading && sellers.length === 0) return null;

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
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
//             Trusted <span className="text-blue-800">Suppliers</span>
//           </h2>
//           <p className="mt-2 text-slate-600 max-w-2xl">
//             Connect with verified manufacturers, exporters, and wholesale suppliers worldwide.
//           </p>
//         </div>

//         {/* CAROUSEL */}
//         <div
//           className="relative w-full group"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >

//           {/* LEFT BUTTON */}
//           <button
//             onClick={() => scroll("prev")}
//             className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
//           >
//             <FaChevronLeft />
//           </button>

//           {/* RIGHT BUTTON */}
//           <button
//             onClick={() => scroll("next")}
//             className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
//           >
//             <FaChevronRight />
//           </button>

//           {/* SCROLL AREA */}
//           <div
//             ref={scrollRef}
//             className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
//             style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
//             onTouchStart={() => setIsHovered(true)}
//             onTouchEnd={() => setIsHovered(false)}
//           >
//             {[...sellers, ...sellers].map((seller, index) => (
//               <div
//                 key={`${seller._id}-${index}`}
//                 className="w-[320px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition flex flex-col flex-shrink-0"
//               >

//                 {/* IMAGE / AVATAR */}
//                 <div className="relative h-60 bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center overflow-hidden">
//                   {seller.profileImage?.url ? (
//                     <img
//                       src={seller.profileImage.url}
//                       alt={seller.companyName}
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-white font-black text-7xl opacity-20">
//                       {seller.companyName?.charAt(0) || seller.name?.charAt(0)}
//                     </span>
//                   )}

//                   {/* PLAN BADGE */}
//                   <div className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold ${planBadge(seller.subscriptionPlan)}`}>
//                     <Crown className="w-3 h-3" />
//                     {seller.subscriptionPlan === "gold" ? "Gold" : "Premium"}
//                   </div>

//                   {/* VERIFIED BADGE */}
//                   <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                     <BadgeCheck className="w-3 h-3" />
//                     Verified
//                   </div>
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-5 flex flex-col flex-1">

//                   {/* NAME */}
//                   <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">
//                     {seller.companyName || seller.name}
//                   </h3>

//                   {/* TYPE */}
//                   {seller.companyType && (
//                     <p className="text-xs text-gray-500 mb-2">{seller.companyType}</p>
//                   )}

//                   {/* LOCATION */}
//                   <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
//                     <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
//                     {[seller.city, seller.state].filter(Boolean).join(", ") || "India"}
//                   </div>

//                   {/* YEAR */}
//                   {seller.yearEstablished && (
//                     <div className="text-sm text-slate-600 mb-1">
//                       Experience:{" "}
//                       <span className="font-semibold text-slate-800">
//                         {new Date().getFullYear() - Number(seller.yearEstablished)} Years
//                       </span>
//                     </div>
//                   )}

//                   {/* PRODUCTS COUNT */}
//                   <div className="text-sm text-slate-600 mb-5">
//                     Products:{" "}
//                     <span className="font-semibold text-slate-800">
//                       {seller.productCount || 0}+ Products
//                     </span>
//                   </div>

//                   {/* VIEW PROFILE BUTTON */}
//                   <Link
//                     to={`/seller-profile/${seller._id}`}
//                     className="mt-auto bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
//                   >
//                     View Profile
//                     <ArrowRight className="w-4 h-4" />
//                   </Link>

//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//       `}</style>
//     </section>
//   );
// }




// src/components/Home/TrustedSuppliers.jsx

import React, { useRef, useEffect, useState } from "react";
import { MapPin, BadgeCheck, Star, Factory, ArrowRight, Crown } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getFeaturedSellers } from "../../api/sellerProfileApi";

export default function TrustedSuppliers() {
  const scrollRef   = useRef(null);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [sellers, setSellers]     = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedSellers();
        if (data.success) setSellers(data.sellers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    intervalRef.current = setInterval(() => {
      if (!el || isHovered) return;
      el.scrollLeft += 1;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
    }, 16);
    return () => clearInterval(intervalRef.current);
  }, [isHovered, sellers]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "next" ? 240 : -240, behavior: "smooth" });
  };

  const planBadge = (plan) => {
    switch (plan) {
      case "gold":    return "bg-yellow-500 text-white";
      case "premium": return "bg-purple-600 text-white";
      default:        return "bg-blue-800 text-white";
    }
  };

  if (loading) {
    return (
      
      <section className="bg-white py-8">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              
              <div key={i} className="w-[180px] h-[280px] bg-gray-100 rounded-xl animate-pulse flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!loading && sellers.length === 0) return null;

  return (
    <section className="bg-white overflow-hidden">
     
      <div className="max-w-[1400px] mx-auto px-4 py-8 space-y-6">

        {/* HEADER */}
        
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-orange-600 font-bold text-xs uppercase tracking-widest mb-1.5">
            <Factory className="w-3.5 h-3.5" />
            Verified Manufacturers
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Trusted <span className="text-blue-800">Suppliers</span>
          </h2>
          <p className="mt-1.5 text-slate-500 max-w-xl text-xs md:text-sm">
            Connect with verified manufacturers, exporters, and wholesale suppliers worldwide.
          </p>
        </div>

        {/* CAROUSEL */}
        <div
          className="relative w-full group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* LEFT BUTTON */}
          <button
            onClick={() => scroll("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-2 rounded-full
              hidden sm:flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition -translate-x-1/2"
          >
            <FaChevronLeft className="text-gray-600 text-xs" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => scroll("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-2 rounded-full
              hidden sm:flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition translate-x-1/2"
          >
            <FaChevronRight className="text-gray-600 text-xs" />
          </button>

          {/* SCROLL AREA */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            {[...sellers, ...sellers].map((seller, index) => (
              <div
                key={`${seller._id}-${index}`}
                //  UPDATED — card width chhota: 160px mobile, 190px sm, 210px md
                className="w-[160px] sm:w-[190px] md:w-[210px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col flex-shrink-0"
              >

                {/* IMAGE / AVATAR */}
         
                <div className="relative h-32 sm:h-36 bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center overflow-hidden">
                  {seller.profileImage?.url ? (
                    <img
                      src={seller.profileImage.url}
                      alt={seller.companyName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-black text-5xl opacity-20">
                      {seller.companyName?.charAt(0) || seller.name?.charAt(0)}
                    </span>
                  )}

                  {/* PLAN BADGE */}
                  {/*  UPDATED — badge chhota */}
                  <div className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold ${planBadge(seller.subscriptionPlan)}`}>
                    <Crown className="w-2.5 h-2.5" />
                    {seller.subscriptionPlan === "gold" ? "Gold" : "Premium"}
                  </div>

                  {/* VERIFIED BADGE */}
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <BadgeCheck className="w-2.5 h-2.5" />
                    Verified
                  </div>
                </div>

                {/* CONTENT */}
                {/* UPDATED — padding compact */}
                <div className="p-3 flex flex-col flex-1">

                  {/* NAME */}
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5 line-clamp-1">
                    {seller.companyName || seller.name}
                  </h3>

                  {/* TYPE */}
                  {seller.companyType && (
                    <p className="text-xs text-gray-500 mb-1.5 line-clamp-1">{seller.companyType}</p>
                  )}

                  {/* LOCATION */}
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-1.5">
                    <MapPin className="w-3 h-3 text-orange-600 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {[seller.city, seller.state].filter(Boolean).join(", ") || "India"}
                    </span>
                  </div>

                  {/* YEAR */}
                  {seller.yearEstablished && (
                    <div className="text-xs text-slate-600 mb-1">
                      Exp:{" "}
                      <span className="font-semibold text-slate-800">
                        {new Date().getFullYear() - Number(seller.yearEstablished)} Yrs
                      </span>
                    </div>
                  )}

                  {/* PRODUCTS COUNT */}
                  <div className="text-xs text-slate-600 mb-3">
                    Products:{" "}
                    <span className="font-semibold text-slate-800">
                      {seller.productCount || 0}+
                    </span>
                  </div>

                  {/* VIEW PROFILE BUTTON */}
                  <Link
                    to={`/seller-profile/${seller._id}`}
                    // UPDATED — button compact
                    className="mt-auto bg-orange-600 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition flex items-center justify-center gap-1.5 text-xs"
                  >
                    View Profile
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
