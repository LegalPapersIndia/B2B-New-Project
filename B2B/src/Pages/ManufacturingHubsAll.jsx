// // src/Pages/ManufacturingHubsAll.jsx

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   MapPin, Star, ArrowRight, Factory,
//   Building2, BadgeCheck, Users, Package,
// } from "lucide-react";
// import { getCities } from "../api/cityApi";

// export default function ManufacturingHubsAll() {
//   const [cities, setCities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const data = await getCities();
//         if (data.success) setCities(data.cities);
//         else setError("Failed to load cities.");
//       } catch (err) {
//         console.error(err);
//         setError("Server error. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCities();
//   }, []);

//   return (
//     <div className="bg-slate-50 min-h-screen">

//       {/* HERO */}
//       <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
//         <div className="max-w-[1400px] mx-auto px-4">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-5">
//               <Factory className="w-4 h-4" />
//               India Industrial Network
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
//               Explore India's Top
//               <span className="block text-orange-400">Manufacturing Hubs</span>
//             </h1>
//             <p className="text-blue-100 text-base leading-relaxed">
//               Connect with verified suppliers, manufacturers, exporters and
//               industrial businesses across India's leading production cities.
//             </p>

//             {/* STATS */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//               {[
//                 { value: "20K+", label: "Suppliers" },
//                 { value: "120+", label: "Industries" },
//                 { value: "50+",  label: "Cities" },
//                 { value: "99%",  label: "Verified" },
//               ].map((stat) => (
//                 <div key={stat.label} className="bg-white/10 border border-white/10 rounded-2xl p-4">
//                   <h3 className="text-2xl font-bold">{stat.value}</h3>
//                   <p className="text-sm text-blue-100 mt-1">{stat.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* HUBS GRID */}
//       <section className="py-12">
//         <div className="max-w-[1400px] mx-auto px-4">

//           <div className="mb-10 text-center">
//             <h2 className="text-3xl font-bold text-slate-900 mb-3">
//               Popular Industrial Cities
//             </h2>
//             <p className="text-slate-600 max-w-2xl mx-auto text-sm">
//               Browse verified manufacturing cities and discover trusted
//               suppliers across multiple industries.
//             </p>
//           </div>

//           {/* LOADING */}
//           {loading && (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {[1, 2, 3, 4, 5, 6].map((i) => (
//                 <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200">
//                   <div className="h-48 bg-gray-200 animate-pulse" />
//                   <div className="p-5 space-y-3">
//                     <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
//                     <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
//                     <div className="h-3 bg-gray-100 rounded animate-pulse w-4/5" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* ERROR */}
//           {!loading && error && (
//             <div className="py-20 text-center text-red-500">{error}</div>
//           )}

//           {/* GRID */}
//           {!loading && !error && cities.length > 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {cities.map((city, index) => (
//                 <HubCard key={city._id || index} city={city} />
//               ))}
//             </div>
//           )}

//           {/* EMPTY */}
//           {!loading && !error && cities.length === 0 && (
//             <div className="py-24 text-center text-slate-400">
//               <Package className="mx-auto mb-3 h-10 w-10 opacity-30" />
//               <p className="text-slate-600 font-semibold">No hubs found</p>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

// // ─────────────────────────────
// // HUB CARD
// // ─────────────────────────────
// function HubCard({ city }) {
//   return (
//     <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group">

//       {/* IMAGE */}
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={city.image?.url}
//           alt={city.name}
//           className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//           onError={(e) => (e.target.src = "/fallback-city.jpg")}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

//         {/* Rating badge */}
//         <div className="absolute top-4 right-4 bg-white text-slate-900 px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-semibold shadow">
//           <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
//           Verified
//         </div>

//         {/* City name overlay */}
//         <div className="absolute bottom-4 left-4 text-white">
//           <div className="flex items-center gap-1.5 mb-1">
//             <MapPin className="w-4 h-4 text-orange-400" />
//             <h3 className="text-xl font-bold">{city.name}</h3>
//           </div>
//           <p className="text-xs text-slate-200">
//             {city.sellerCount || 0}+ Suppliers
//           </p>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="p-5">

//         {/* Description */}
//         {city.tagline && (
//           <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
//             {city.tagline}
//           </p>
//         )}

//         {/* Industry chips */}
//         <div className="flex flex-wrap gap-1.5 mb-4">
//           {city.industries?.length > 0 ? (
//             city.industries.slice(0, 4).map((ind, i) => (
//               <span key={i} className="bg-blue-50 text-blue-800 px-2.5 py-1 rounded-full text-xs font-medium">
//                 {ind}
//               </span>
//             ))
//           ) : (
//             <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full text-xs">
//               Various Industries
//             </span>
//           )}
//         </div>

//         {/* Feature list */}
//         <div className="space-y-2 mb-5">
//           <div className="flex items-center gap-2 text-xs text-slate-600">
//             <BadgeCheck className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
//             Verified Manufacturers
//           </div>
//           <div className="flex items-center gap-2 text-xs text-slate-600">
//             <Building2 className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
//             Multiple Industry Categories
//           </div>
//           <div className="flex items-center gap-2 text-xs text-slate-600">
//             <Factory className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
//             Export & Wholesale Suppliers
//           </div>
//         </div>

//         {/* CTA */}
//         <Link
//           to={city.slug ? `/hub/${city.slug}` : "#"}
//           className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-sm"
//         >
//           Explore Suppliers
//           <ArrowRight className="w-4 h-4" />
//         </Link>
//       </div>
//     </div>
//   );
// }



// // src/Pages/ManufacturingHubsAll.jsx

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   MapPin,
//   Star,
//   ArrowRight,
//   Factory,
//   Building2,
//   BadgeCheck,
//   Users,
//   Package,
// } from "lucide-react";
// import { getCities } from "../api/cityApi";

// export default function ManufacturingHubsAll() {
//   const [cities, setCities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const data = await getCities();
//         if (data.success) setCities(data.cities);
//         else setError("Failed to load cities.");
//       } catch (err) {
//         console.error(err);
//         setError("Server error. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCities();
//   }, []);

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       {/* HERO */}
//       <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
//         <div className="max-w-[1400px] mx-auto px-4">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-5">
//               <Factory className="w-4 h-4" />
//               India Industrial Network
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
//               Explore India's Top
//               <span className="block text-orange-400">Manufacturing Hubs</span>
//             </h1>
//             <p className="text-blue-100 text-base leading-relaxed">
//               Connect with verified suppliers, manufacturers, exporters and
//               industrial businesses across India's leading production cities.
//             </p>

//             {/* STATS */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//               {[
//                 { value: "20K+", label: "Suppliers" },
//                 { value: "120+", label: "Industries" },
//                 { value: "50+", label: "Cities" },
//                 { value: "99%", label: "Verified" },
//               ].map((stat) => (
//                 <div
//                   key={stat.label}
//                   className="bg-white/10 border border-white/10 rounded-2xl p-4"
//                 >
//                   <h3 className="text-2xl font-bold">{stat.value}</h3>
//                   <p className="text-sm text-blue-100 mt-1">{stat.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* HUBS GRID */}
//       <section className="py-12">
//         <div className="max-w-[1400px] mx-auto px-4">
//           <div className="mb-10 text-center">
//             <h2 className="text-3xl font-bold text-slate-900 mb-3">
//               Popular Industrial Cities
//             </h2>
//             <p className="text-slate-600 max-w-2xl mx-auto text-sm">
//               Browse verified manufacturing cities and discover trusted
//               suppliers across multiple industries.
//             </p>
//           </div>

//           {/* LOADING */}
//           {loading && (
//             <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//               {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-xl overflow-hidden border border-slate-200"
//                 >
//                   <div className="h-36 bg-gray-200 animate-pulse" />
//                   <div className="p-3 space-y-2">
//                     <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
//                     <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* ERROR */}
//           {!loading && error && (
//             <div className="py-20 text-center text-red-500">{error}</div>
//           )}

//           {/* GRID */}
//           {!loading && !error && cities.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//               {cities.map((city, index) => (
//                 <HubCard key={city._id || index} city={city} />
//               ))}
//             </div>
//           )}

//           {/* EMPTY */}
//           {!loading && !error && cities.length === 0 && (
//             <div className="py-24 text-center text-slate-400">
//               <Package className="mx-auto mb-3 h-10 w-10 opacity-30" />
//               <p className="text-slate-600 font-semibold">No hubs found</p>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

// // ─────────────────────────────
// // HUB CARD —  UPDATED: compact UI
// // ─────────────────────────────
// function HubCard({ city }) {
//   return (
//     <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
//       {/* IMAGE */}
//       <div className="relative h-36 overflow-hidden">
//         <img
//           src={city.image?.url}
//           alt={city.name}
//           className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//           onError={(e) => (e.target.src = "/fallback-city.jpg")}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

//         {/* Verified badge */}
//         <div className="absolute top-2 right-2 bg-white text-slate-900 px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] font-semibold shadow">
//           <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
//           Verified
//         </div>

//         {/* City name overlay */}
//         <div className="absolute bottom-3 left-3 text-white">
//           <div className="flex items-center gap-1 mb-0.5">
//             <MapPin className="w-3 h-3 text-orange-400" />
//             <h3 className="text-base font-bold">{city.name}</h3>
//           </div>
//           <p className="text-[11px] text-slate-200">
//             {city.sellerCount || 0}+ Suppliers
//           </p>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="p-3">
//         {/* Description */}
//         {city.tagline && (
//           <p className="text-slate-600 text-xs leading-relaxed mb-3 line-clamp-2">
//             {city.tagline}
//           </p>
//         )}

//         {/* Industry chips */}
//         <div className="flex flex-wrap gap-1 mb-3">
//           {city.industries?.length > 0 ? (
//             city.industries.slice(0, 3).map((ind, i) => (
//               <span
//                 key={i}
//                 className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-medium"
//               >
//                 {ind}
//               </span>
//             ))
//           ) : (
//             <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px]">
//               Various Industries
//             </span>
//           )}
//         </div>

//         {/* Feature list */}
//         <div className="space-y-1.5 mb-3">
//           <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
//             <BadgeCheck className="w-3 h-3 text-green-600 flex-shrink-0" />
//             Verified Manufacturers
//           </div>
//           <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
//             <Building2 className="w-3 h-3 text-blue-700 flex-shrink-0" />
//             Multiple Industry Categories
//           </div>
//           <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
//             <Factory className="w-3 h-3 text-orange-600 flex-shrink-0" />
//             Export & Wholesale Suppliers
//           </div>
//         </div>

//         {/* CTA */}
//         <Link
//           to={city.slug ? `/hub/${city.slug}` : "#"}
//           className="w-full bg-blue-800 hover:bg-blue-900 text-white py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 text-xs"
//         >
//           Explore Suppliers
//           <ArrowRight className="w-3.5 h-3.5" />
//         </Link>
//       </div>
//     </div>
//   );
// }




// src/Pages/ManufacturingHubsAll.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  ArrowRight,
  Factory,
  Building2,
  BadgeCheck,
  Users,
  Package,
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
                { value: "50+", label: "Cities" },
                { value: "99%", label: "Verified" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 border border-white/10 rounded-2xl p-4"
                >
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
          {/* ✅ UPDATED - xl:grid-cols-4 → xl:grid-cols-5 */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200"
                >
                  <div className="h-36 bg-gray-200 animate-pulse" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
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
          {/* ✅ UPDATED - xl:grid-cols-4 → xl:grid-cols-5 */}
          {!loading && !error && cities.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
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
// HUB CARD —  UPDATED: compact UI + clickable card
// ─────────────────────────────
function HubCard({ city }) {
  return (
    // ✅ UPDATED - poora card ab Link hai, poora clickable
    <Link
      to={city.slug ? `/hub/${city.slug}` : "#"}
      className="block bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      {/* IMAGE */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={city.image?.url}
          alt={city.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          onError={(e) => (e.target.src = "/fallback-city.jpg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Verified badge */}
        <div className="absolute top-2 right-2 bg-white text-slate-900 px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] font-semibold shadow">
          <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
          Verified
        </div>

        {/* City name overlay */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-center gap-1 mb-0.5">
            <MapPin className="w-3 h-3 text-orange-400" />
            <h3 className="text-base font-bold">{city.name}</h3>
          </div>
          <p className="text-[11px] text-slate-200">
            {city.sellerCount || 0}+ Suppliers
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-3">
        {/* Description */}
        {city.tagline && (
          <p className="text-slate-600 text-xs leading-relaxed mb-3 line-clamp-2">
            {city.tagline}
          </p>
        )}

        {/* Industry chips */}
        <div className="flex flex-wrap gap-1 mb-3">
          {city.industries?.length > 0 ? (
            city.industries.slice(0, 3).map((ind, i) => (
              <span
                key={i}
                className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-medium"
              >
                {ind}
              </span>
            ))
          ) : (
            <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px]">
              Various Industries
            </span>
          )}
        </div>

        {/* Feature list */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
            <BadgeCheck className="w-3 h-3 text-green-600 flex-shrink-0" />
            Verified Manufacturers
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
            <Building2 className="w-3 h-3 text-blue-700 flex-shrink-0" />
            Multiple Industry Categories
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
            <Factory className="w-3 h-3 text-orange-600 flex-shrink-0" />
            Export & Wholesale Suppliers
          </div>
        </div>

        {/* CTA */}
        {/* ✅ UPDATED - Link → div (parent card hi Link hai, nested <a> avoid karne ke liye) */}
        <div className="w-full bg-blue-800 group-hover:bg-blue-900 text-white py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 text-xs">
          Explore Suppliers
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}