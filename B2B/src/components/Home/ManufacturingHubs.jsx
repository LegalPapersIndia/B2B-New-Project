


// // // import React from "react";
// // // import { Swiper, SwiperSlide } from "swiper/react";
// // // import { Autoplay, Pagination } from "swiper/modules";

// // // import {
// // //   MapPin,
// // //   Star,
// // //   ArrowRight,
// // //   Factory,
// // // } from "lucide-react";

// // // // SWIPER CSS
// // // import "swiper/css";
// // // import "swiper/css/pagination";

// // // // IMAGES
// // // import delhi from "../../assets/delhi.jpg";
// // // import mumbai from "../../assets/mumbai.jpg";
// // // import surat from "../../assets/Surat.jpg";
// // // import ahmedabad from "../../assets/ahmedabad.jpg";
// // // import bengaluru from "../../assets/Bengaluru.jpg";

// // // const hubs = [
// // //   {
// // //     city: "Delhi NCR",
// // //     image: delhi,
// // //     suppliers: "2.4K+",
// // //     rating: 4.8,
// // //     industries: ["Electronics", "Auto", "Apparel"],
// // //   },
// // //   {
// // //     city: "Mumbai",
// // //     image: mumbai,
// // //     suppliers: "3.8K+",
// // //     rating: 4.9,
// // //     industries: ["Pharma", "Textiles", "Packaging"],
// // //   },
// // //   {
// // //     city: "Ahmedabad",
// // //     image: ahmedabad,
// // //     suppliers: "5.1K+",
// // //     rating: 4.7,
// // //     industries: ["Textiles", "Chemicals", "Machinery"],
// // //   },
// // //   {
// // //     city: "Bengaluru",
// // //     image: bengaluru,
// // //     suppliers: "2.9K+",
// // //     rating: 4.8,
// // //     industries: ["Electronics", "Aerospace", "IT"],
// // //   },
// // //   {
// // //     city: "Surat",
// // //     image: surat,
// // //     suppliers: "6.7K+",
// // //     rating: 4.9,
// // //     industries: ["Textiles", "Diamonds", "Apparel"],
// // //   },
// // // ];

// // // export default function ManufacturingHubs() {
// // //   return (
// // //     <section className="py-12 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
// // //       <div className="max-w-[1400px] mx-auto px-4">

// // //         {/* HEADER */}
// // //         <div className="mb-12">
// // //           <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
// // //             <Factory className="w-4 h-4" />
// // //             Industrial Cities
// // //           </div>

// // //           <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
// // //             Manufacturing{" "}
// // //             <span className="text-blue-800">Hubs</span>
// // //           </h2>

// // //           <p className="mt-2 text-slate-600 max-w-2xl">
// // //             Explore top industrial cities with verified suppliers across India.
// // //           </p>
// // //         </div>

// // //         {/* SWIPER */}
// // //         <Swiper
// // //           modules={[Autoplay, Pagination]}
// // //           spaceBetween={20}
// // //           loop={true}
// // //           speed={1200}
// // //           autoplay={{
// // //             delay: 2500,
// // //             disableOnInteraction: false,
// // //             pauseOnMouseEnter: true,
// // //           }}
// // //           pagination={{ clickable: true }}
// // //          breakpoints={{
// // //   0: {
// // //     slidesPerView: 1.1,
// // //   },
// // //   640: {
// // //     slidesPerView: 1.5,
// // //   },
// // //   768: {
// // //     slidesPerView: 2,
// // //   },
// // //   1024: {
// // //     slidesPerView: 4,
// // //   },
// // // }}
// // //           className="pb-14"
// // //         >
// // //           {hubs.map((hub, index) => (
// // //             <SwiperSlide key={index}>
// // //               <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 group">

// // //                 {/* IMAGE */}
// // //                 <div className="h-52 overflow-hidden relative">
// // //                   <img
// // //                     src={hub.image}
// // //                     alt={hub.city}
// // //                     className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
// // //                   />

// // //                   {/* RATING */}
// // //                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
// // //                     <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
// // //                     {hub.rating}
// // //                   </div>
// // //                 </div>

// // //                 {/* CONTENT */}
// // //                 <div className="p-6">

// // //                   {/* CITY */}
// // //                   <div className="flex items-center gap-2 mb-3">
// // //                     <MapPin className="w-5 h-5 text-orange-600" />

// // //                     <h3 className="font-bold text-xl text-gray-900">
// // //                       {hub.city}
// // //                     </h3>
// // //                   </div>

// // //                   {/* SUPPLIERS */}
// // //                   <p className="text-gray-600 text-sm mb-4">
// // //                     <span className="font-semibold text-gray-800">
// // //                       {hub.suppliers}
// // //                     </span>{" "}
// // //                     Suppliers Available
// // //                   </p>

// // //                   {/* TAGS */}
// // //                   <div className="flex flex-wrap gap-2 mb-6">
// // //                     {hub.industries.map((industry, i) => (
// // //                       <span
// // //                         key={i}
// // //                         className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
// // //                       >
// // //                         {industry}
// // //                       </span>
// // //                     ))}
// // //                   </div>

// // //                   {/* BUTTON */}
// // //                   <button
// // //                     className="w-full bg-orange-600 hover:bg-blue-800
// // //                                text-white py-3.5 rounded-2xl text-sm font-semibold
// // //                                flex items-center justify-center gap-2
// // //                                transition-all duration-300"
// // //                   >
// // //                     Explore Hub
// // //                     <ArrowRight className="w-4 h-4" />
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </SwiperSlide>
// // //           ))}
// // //         </Swiper>

// // //       </div>
// // //     </section>
// // //   );
// // // }




// // import React from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Autoplay, Pagination } from "swiper/modules";
// // import { Link } from "react-router-dom";

// // import {
// //   MapPin,
// //   Star,
// //   ArrowRight,
// //   Factory,
// // } from "lucide-react";

// // // SWIPER CSS
// // import "swiper/css";
// // import "swiper/css/pagination";

// // // IMAGES
// // import delhi from "../../assets/delhi.jpg";
// // import mumbai from "../../assets/mumbai.jpg";
// // import surat from "../../assets/Surat.jpg";
// // import ahmedabad from "../../assets/ahmedabad.jpg";
// // import bengaluru from "../../assets/Bengaluru.jpg";

// // const hubs = [
// //   {
// //     city: "Delhi NCR",
// //     image: delhi,
// //     suppliers: "2.4K+",
// //     rating: 4.8,
// //     industries: ["Electronics", "Auto", "Apparel"],
// //   },
// //   {
// //     city: "Mumbai",
// //     image: mumbai,
// //     suppliers: "3.8K+",
// //     rating: 4.9,
// //     industries: ["Pharma", "Textiles", "Packaging"],
// //   },
// //   {
// //     city: "Ahmedabad",
// //     image: ahmedabad,
// //     suppliers: "5.1K+",
// //     rating: 4.7,
// //     industries: ["Textiles", "Chemicals", "Machinery"],
// //   },
// //   {
// //     city: "Bengaluru",
// //     image: bengaluru,
// //     suppliers: "2.9K+",
// //     rating: 4.8,
// //     industries: ["Electronics", "Aerospace", "IT"],
// //   },
// //   {
// //     city: "Surat",
// //     image: surat,
// //     suppliers: "6.7K+",
// //     rating: 4.9,
// //     industries: ["Textiles", "Diamonds", "Apparel"],
// //   },
// // ];

// // export default function ManufacturingHubs() {
// //   return (
// //     <section className="py-12 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
// //       <div className="max-w-[1400px] mx-auto px-4">

// //         {/* HEADER */}
// //         <div className="mb-12 flex items-center justify-between flex-wrap gap-4">
          
// //           <div>
// //             <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
// //               <Factory className="w-4 h-4" />
// //               Industrial Cities
// //             </div>

// //             <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
// //               Manufacturing{" "}
// //               <span className="text-blue-800">Hubs</span>
// //             </h2>

// //             <p className="mt-2 text-slate-600 max-w-2xl">
// //               Explore top industrial cities with verified suppliers across India.
// //             </p>
// //           </div>

// //           {/* VIEW ALL BUTTON */}
// //          {/* VIEW ALL BUTTON */}
// // <Link
// //   to="/manufacturing-hubs"
// //   className="bg-blue-800 hover:bg-blue-900 text-white
// //              px-6 py-3 rounded-2xl font-semibold
// //              flex items-center gap-2 transition-all duration-300"
// // >
// //   View All
// //   <ArrowRight className="w-4 h-4" />
// // </Link>
// //         </div>

// //         {/* SWIPER */}
// //         <Swiper
// //           modules={[Autoplay, Pagination]}
// //           spaceBetween={20}
// //           loop={true}
// //           speed={1200}
// //           autoplay={{
// //             delay: 2500,
// //             disableOnInteraction: false,
// //             pauseOnMouseEnter: true,
// //           }}
// //           pagination={{ clickable: true }}
// //           breakpoints={{
// //             0: {
// //               slidesPerView: 1.1,
// //             },
// //             640: {
// //               slidesPerView: 1.5,
// //             },
// //             768: {
// //               slidesPerView: 2,
// //             },
// //             1024: {
// //               slidesPerView: 4,
// //             },
// //           }}
// //           className="pb-14"
// //         >
// //           {hubs.map((hub, index) => (
// //             <SwiperSlide key={index}>
// //               <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 group">

// //                 {/* IMAGE */}
// //                 <div className="h-52 overflow-hidden relative">
// //                   <img
// //                     src={hub.image}
// //                     alt={hub.city}
// //                     className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
// //                   />

// //                   {/* RATING */}
// //                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
// //                     <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
// //                     {hub.rating}
// //                   </div>
// //                 </div>

// //                 {/* CONTENT */}
// //                 <div className="p-6">

// //                   {/* CITY */}
// //                   <div className="flex items-center gap-2 mb-3">
// //                     <MapPin className="w-5 h-5 text-orange-600" />

// //                     <h3 className="font-bold text-xl text-gray-900">
// //                       {hub.city}
// //                     </h3>
// //                   </div>

// //                   {/* SUPPLIERS */}
// //                   <p className="text-gray-600 text-sm mb-4">
// //                     <span className="font-semibold text-gray-800">
// //                       {hub.suppliers}
// //                     </span>{" "}
// //                     Suppliers Available
// //                   </p>

// //                   {/* TAGS */}
// //                   <div className="flex flex-wrap gap-2 mb-6">
// //                     {hub.industries.map((industry, i) => (
// //                       <span
// //                         key={i}
// //                         className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
// //                       >
// //                         {industry}
// //                       </span>
// //                     ))}
// //                   </div>

// //                   {/* BUTTON */}
// //                   <button
// //                     className="w-full bg-orange-600 hover:bg-blue-800
// //                                text-white py-3.5 rounded-2xl text-sm font-semibold
// //                                flex items-center justify-center gap-2
// //                                transition-all duration-300"
// //                   >
// //                     Explore Hub
// //                     <ArrowRight className="w-4 h-4" />
// //                   </button>
// //                 </div>
// //               </div>
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>

// //       </div>
// //     </section>
// //   );
// // }





// // src/components/Home/ManufacturingHubs.jsx

// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import { Link } from "react-router-dom";
// import { MapPin, Star, ArrowRight, Factory } from "lucide-react";
// import { getHubStats } from "../../api/sellerProfileApi";

// // SWIPER CSS
// import "swiper/css";
// import "swiper/css/pagination";

// // IMAGES
// import delhi from "../../assets/delhi.jpg";
// import mumbai from "../../assets/mumbai.jpg";
// import surat from "../../assets/Surat.jpg";
// import ahmedabad from "../../assets/ahmedabad.jpg";
// import bengaluru from "../../assets/Bengaluru.jpg";

// const hubs = [
//   {
//     city:       "Noida",
//     image:      delhi,
//     suppliers:  "2.4K+",
//     rating:     4.8,
//     industries: ["Electronics", "Auto", "Apparel"],
//   },
//   {
//     city:       "Mumbai",
//     image:      mumbai,
//     suppliers:  "3.8K+",
//     rating:     4.9,
//     industries: ["Pharma", "Textiles", "Packaging"],
//   },
//   {
//     city:       "Ahmedabad",
//     image:      ahmedabad,
//     suppliers:  "5.1K+",
//     rating:     4.7,
//     industries: ["Textiles", "Chemicals", "Machinery"],
//   },
//   {
//     city:       "Bengaluru",
//     image:      bengaluru,
//     suppliers:  "2.9K+",
//     rating:     4.8,
//     industries: ["Electronics", "Aerospace", "IT"],
//   },
//   {
//     city:       "Surat",
//     image:      surat,
//     suppliers:  "6.7K+",
//     rating:     4.9,
//     industries: ["Textiles", "Diamonds", "Apparel"],
//   },
// ];

// export default function ManufacturingHubs() {

//   const [hubStats, setHubStats] = useState({});

//   // ─────────────────────────────────────────
//   // FETCH REAL SUPPLIER COUNT
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const data = await getHubStats();
//         if (data.success) {
//           const statsMap = {};
//           data.stats.forEach((s) => {
//             statsMap[s.city] = s.count;
//           });
//           setHubStats(statsMap);
//         }
//       } catch (err) {
//         console.error("HubStats error:", err);
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <section className="py-12 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
//       <div className="max-w-[1400px] mx-auto px-4">

//         {/* HEADER */}
//         <div className="mb-12 flex items-center justify-between flex-wrap gap-4">
//           <div>
//             <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
//               <Factory className="w-4 h-4" />
//               Industrial Cities
//             </div>
//             <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//               Manufacturing{" "}
//               <span className="text-blue-800">Hubs</span>
//             </h2>
//             <p className="mt-2 text-slate-600 max-w-2xl">
//               Explore top industrial cities with verified suppliers across India.
//             </p>
//           </div>

//           {/* VIEW ALL */}
//           <Link
//             to="/manufacturing-hubs"
//             className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all duration-300"
//           >
//             View All
//             <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>

//         {/* SWIPER */}
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           spaceBetween={20}
//           loop={true}
//           speed={1200}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true,
//           }}
//           pagination={{ clickable: true }}
//           breakpoints={{
//             0:    { slidesPerView: 1.1 },
//             640:  { slidesPerView: 1.5 },
//             768:  { slidesPerView: 2 },
//             1024: { slidesPerView: 4 },
//           }}
//           className="pb-14"
//         >
//           {hubs.map((hub, index) => (
//             <SwiperSlide key={index}>
//               <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 group">

//                 {/* IMAGE */}
//                 <div className="h-52 overflow-hidden relative">
//                   <img
//                     src={hub.image}
//                     alt={hub.city}
//                     className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//                   />

//                   {/* RATING */}
//                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
//                     <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
//                     {hub.rating}
//                   </div>
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-6">

//                   {/* CITY */}
//                   <div className="flex items-center gap-2 mb-3">
//                     <MapPin className="w-5 h-5 text-orange-600" />
//                     <h3 className="font-bold text-xl text-gray-900">{hub.city}</h3>
//                   </div>

//                   {/* ✅ REAL SUPPLIER COUNT */}
//                   <p className="text-gray-600 text-sm mb-4">
//                     <span className="font-semibold text-gray-800">
//                       {hubStats[hub.city] !== undefined
//                         ? `${hubStats[hub.city]}+`
//                         : hub.suppliers}
//                     </span>{" "}
//                     Suppliers Available
//                   </p>

//                   {/* TAGS */}
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {hub.industries.map((industry, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
//                       >
//                         {industry}
//                       </span>
//                     ))}
//                   </div>

//                   {/* ✅ EXPLORE HUB — Link */}
//                   <Link
//                     to={`/hub/${hub.city}`}
//                     className="w-full bg-orange-600 hover:bg-blue-800 text-white py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
//                   >
//                     Explore Hub
//                     <ArrowRight className="w-4 h-4" />
//                   </Link>

//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//       </div>
//     </section>
//   );
// }





// src/components/Home/ManufacturingHubs.jsx

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { MapPin, Star, ArrowRight, Factory } from "lucide-react";
import { getCities } from "../../api/cityApi";

import "swiper/css";
import "swiper/css/pagination";

export default function ManufacturingHubs() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        if (data.success) setCities(data.cities);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  if (loading) return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex gap-5 overflow-hidden">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-[280px] h-[360px] bg-gray-200 rounded-3xl animate-pulse flex-shrink-0" />
          ))}
        </div>
      </div>
    </section>
  );

  if (!loading && cities.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* HEADER */}
        <div className="mb-12 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
              <Factory className="w-4 h-4" />
              Industrial Cities
            </div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              Manufacturing <span className="text-blue-800">Hubs</span>
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl">
              Explore top industrial cities with verified suppliers across India.
            </p>
          </div>
          <Link
            to="/manufacturing-hubs"
            className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all duration-300"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          loop={cities.length > 2}
          speed={1200}
          autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            0:    { slidesPerView: 1.1 },
            640:  { slidesPerView: 1.5 },
            768:  { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-14"
        >
          {cities.map((city, index) => (
            <SwiperSlide key={city._id || index}>
              <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 group">

                {/* IMAGE */}
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={city.image?.url}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
                    <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                    Verified
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-xl text-gray-900">{city.name}</h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    <span className="font-semibold text-gray-800">
                      {city.sellerCount || 0}+
                    </span>{" "}
                    Suppliers Available
                  </p>

                  {/* INDUSTRIES */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {city.industries?.length > 0 ? (
                      city.industries.map((ind, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {ind}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                        Various Industries
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/hub/${city.slug}`}
                    className="w-full bg-orange-600 hover:bg-blue-800 text-white py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    Explore Hub <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}