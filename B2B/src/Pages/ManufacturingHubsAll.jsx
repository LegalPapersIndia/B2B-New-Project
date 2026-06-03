// import React from "react";
// import {
//   MapPin,
//   Star,
//   ArrowRight,
//   Factory,
//   Building2,
//   BadgeCheck,
// } from "lucide-react";

// // IMAGES
// import delhi from "../assets/delhi.jpg";
// import mumbai from "../assets/mumbai.jpg";
// import surat from "../assets/Surat.jpg";
// import ahmedabad from "../assets/ahmedabad.jpg";
// import bengaluru from "../assets/Bengaluru.jpg";

// const hubs = [
//   {
//     city: "Delhi NCR",
//     image: delhi,
//     suppliers: "2.4K+",
//     rating: 4.8,
//     description:
//       "India’s leading industrial and electronics manufacturing region with thousands of verified suppliers.",
//     industries: ["Electronics", "Auto", "Apparel", "Machinery"],
//   },
//   {
//     city: "Mumbai",
//     image: mumbai,
//     suppliers: "3.8K+",
//     rating: 4.9,
//     description:
//       "Major hub for pharma, export businesses, textiles and large-scale packaging industries.",
//     industries: ["Pharma", "Textiles", "Packaging", "Chemicals"],
//   },
//   {
//     city: "Ahmedabad",
//     image: ahmedabad,
//     suppliers: "5.1K+",
//     rating: 4.7,
//     description:
//       "Known for textile industries, chemical production and industrial machinery manufacturers.",
//     industries: ["Textiles", "Chemicals", "Machinery", "Plastic"],
//   },
//   {
//     city: "Bengaluru",
//     image: bengaluru,
//     suppliers: "2.9K+",
//     rating: 4.8,
//     description:
//       "Fast-growing manufacturing ecosystem focused on electronics, aerospace and IT hardware.",
//     industries: ["Electronics", "Aerospace", "IT", "Automation"],
//   },
//   {
//     city: "Surat",
//     image: surat,
//     suppliers: "6.7K+",
//     rating: 4.9,
//     description:
//       "One of India’s biggest textile and diamond manufacturing cities with global exports.",
//     industries: ["Textiles", "Diamonds", "Apparel", "Export"],
//   },
//     {
//     city: "Surat",
//     image: surat,
//     suppliers: "6.7K+",
//     rating: 4.9,
//     description:
//       "One of India’s biggest textile and diamond manufacturing cities with global exports.",
//     industries: ["Textiles", "Diamonds", "Apparel", "Export"],
//   },
// ];

// export default function ManufacturingHubsAll() {
//   return (
//     <div className="bg-slate-50 min-h-screen">
//       {/* HERO SECTION */}
//       <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
//         <div className="max-w-[1400px] mx-auto px-4">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
//               <Factory className="w-4 h-4" />
//               India Industrial Network
//             </div>

//             <h1 className="text-5xl font-bold leading-tight mb-6">
//               Explore India’s Top
//               <span className="block text-orange-400">Manufacturing Hubs</span>
//             </h1>

//             <p className="text-blue-100 text-lg leading-relaxed">
//               Connect with verified suppliers, manufacturers, exporters and
//               industrial businesses across India’s leading production cities.
//             </p>

//             {/* STATS */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
//               <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
//                 <h3 className="text-3xl font-bold">20K+</h3>
//                 <p className="text-sm text-blue-100 mt-1">Suppliers</p>
//               </div>

//               <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
//                 <h3 className="text-3xl font-bold">120+</h3>
//                 <p className="text-sm text-blue-100 mt-1">Industries</p>
//               </div>

//               <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
//                 <h3 className="text-3xl font-bold">50+</h3>
//                 <p className="text-sm text-blue-100 mt-1">Cities</p>
//               </div>

//               <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
//                 <h3 className="text-3xl font-bold">99%</h3>
//                 <p className="text-sm text-blue-100 mt-1">Verified</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* HUBS SECTION */}
//       <section className="py-16">
//         <div className="max-w-[1400px] mx-auto px-4">
//           {/* TITLE */}
//           <div className="mb-12 text-center">
//             <h2 className="text-4xl font-bold text-slate-900 mb-4">
//               Popular Industrial Cities
//             </h2>

//             <p className="text-slate-600 max-w-2xl mx-auto">
//               Browse verified manufacturing cities and discover trusted
//               suppliers across multiple industries.
//             </p>
//           </div>

//           {/* GRID */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//             {hubs.map((hub, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 group"
//               >
//                 {/* IMAGE */}
//                 <div className="relative h-72 overflow-hidden">
//                   <img
//                     src={hub.image}
//                     alt={hub.city}
//                     className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//                   />

//                   {/* OVERLAY */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

//                   {/* RATING */}
//                   <div className="absolute top-5 right-5 bg-white text-slate-900 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold shadow">
//                     <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
//                     {hub.rating}
//                   </div>

//                   {/* CITY */}
//                   <div className="absolute bottom-5 left-5 text-white">
//                     <div className="flex items-center gap-2 mb-2">
//                       <MapPin className="w-5 h-5 text-orange-400" />

//                       <h3 className="text-2xl font-bold">{hub.city}</h3>
//                     </div>

//                     <p className="text-sm text-slate-200">
//                       {hub.suppliers} Suppliers Available
//                     </p>
//                   </div>
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-7">
//                   <p className="text-slate-600 leading-relaxed mb-6">
//                     {hub.description}
//                   </p>

//                   {/* INDUSTRIES */}
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {hub.industries.map((industry, i) => (
//                       <span
//                         key={i}
//                         className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold"
//                       >
//                         {industry}
//                       </span>
//                     ))}
//                   </div>

//                   {/* FEATURES */}
//                   <div className="space-y-3 mb-7">
//                     <div className="flex items-center gap-3 text-sm text-slate-700">
//                       <BadgeCheck className="w-4 h-4 text-green-600" />
//                       Verified Manufacturers
//                     </div>

//                     <div className="flex items-center gap-3 text-sm text-slate-700">
//                       <Building2 className="w-4 h-4 text-blue-700" />
//                       Multiple Industry Categories
//                     </div>

//                     <div className="flex items-center gap-3 text-sm text-slate-700">
//                       <Factory className="w-4 h-4 text-orange-600" />
//                       Export & Wholesale Suppliers
//                     </div>
//                   </div>

//                   {/* BUTTON */}
//                   <button
//                     className="w-full bg-blue-800 hover:bg-blue-900
//                                text-white py-4 rounded-2xl font-semibold
//                                flex items-center justify-center gap-2
//                                transition-all duration-300"
//                   >
//                     Explore Suppliers
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }





// src/Pages/ManufacturingHubsAll.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, Star, ArrowRight, Factory,
  Building2, BadgeCheck, Users, Package,
} from "lucide-react";
import { getCities } from "../api/cityApi";

export default function ManufacturingHubsAll() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        if (data.success) setCities(data.cities);
        else setError("Failed to load cities.");
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-5">
              <Factory className="w-4 h-4" />
              India Industrial Network
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Explore India's Top
              <span className="block text-orange-400">Manufacturing Hubs</span>
            </h1>
            <p className="text-blue-100 text-base leading-relaxed">
              Connect with verified suppliers, manufacturers, exporters and
              industrial businesses across India's leading production cities.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { value: "20K+", label: "Suppliers" },
                { value: "120+", label: "Industries" },
                { value: "50+",  label: "Cities" },
                { value: "99%",  label: "Verified" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 border border-white/10 rounded-2xl p-4">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-blue-100 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HUBS GRID */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4">

          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Popular Industrial Cities
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm">
              Browse verified manufacturing cities and discover trusted
              suppliers across multiple industries.
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200">
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="py-20 text-center text-red-500">{error}</div>
          )}

          {/* GRID */}
          {!loading && !error && cities.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cities.map((city, index) => (
                <HubCard key={city._id || index} city={city} />
              ))}
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && cities.length === 0 && (
            <div className="py-24 text-center text-slate-400">
              <Package className="mx-auto mb-3 h-10 w-10 opacity-30" />
              <p className="text-slate-600 font-semibold">No hubs found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────
// HUB CARD
// ─────────────────────────────
function HubCard({ city }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group">

      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={city.image?.url}
          alt={city.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          onError={(e) => (e.target.src = "/fallback-city.jpg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-4 right-4 bg-white text-slate-900 px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-semibold shadow">
          <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
          Verified
        </div>

        {/* City name overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin className="w-4 h-4 text-orange-400" />
            <h3 className="text-xl font-bold">{city.name}</h3>
          </div>
          <p className="text-xs text-slate-200">
            {city.sellerCount || 0}+ Suppliers
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* Description */}
        {city.tagline && (
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {city.tagline}
          </p>
        )}

        {/* Industry chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {city.industries?.length > 0 ? (
            city.industries.slice(0, 4).map((ind, i) => (
              <span key={i} className="bg-blue-50 text-blue-800 px-2.5 py-1 rounded-full text-xs font-medium">
                {ind}
              </span>
            ))
          ) : (
            <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full text-xs">
              Various Industries
            </span>
          )}
        </div>

        {/* Feature list */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <BadgeCheck className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
            Verified Manufacturers
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
            Multiple Industry Categories
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Factory className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
            Export & Wholesale Suppliers
          </div>
        </div>

        {/* CTA */}
        <Link
          to={city.slug ? `/hub/${city.slug}` : "#"}
          className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-sm"
        >
          Explore Suppliers
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}