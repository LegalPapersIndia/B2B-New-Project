// // src/components/Sidebar.jsx

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaBox,
//   FaIndustry,
//   FaLeaf,
//   FaTools,
//   FaBolt,
//   FaCar,
//   FaApple,
//   FaCubes,
//   FaSearch,
// } from "react-icons/fa";

// // 👉 DUMMY CATEGORIES
// const dummyCategories = [
//   {
//     slug: "plastics",
//     name: "Plastics & Polymers",
//     desc: "HDPE, PVC, plastic granules & raw materials",
//     icon: <FaCubes className="text-orange-600" size={24} />,
//     popular: true,
//   },
//   {
//     slug: "machinery",
//     name: "Industrial Machinery",
//     desc: "Heavy machines, tools & equipment",
//     icon: <FaTools className="text-blue-600" size={24} />,
//     popular: true,
//   },
//   {
//     slug: "chemicals",
//     name: "Chemicals",
//     desc: "Industrial & agricultural chemicals",
//     icon: <FaIndustry className="text-green-600" size={24} />,
//   },
//   {
//     slug: "food",
//     name: "Food & Agriculture",
//     desc: "Spices, grains, fruits & agro products",
//     icon: <FaApple className="text-red-500" size={24} />,
//     popular: true,
//   },
//   {
//     slug: "electronics",
//     name: "Electronics",
//     desc: "Components, devices & industrial electronics",
//     icon: <FaBolt className="text-yellow-500" size={24} />,
//   },
//   {
//     slug: "automobile",
//     name: "Automobile Parts",
//     desc: "Spare parts, engines & accessories",
//     icon: <FaCar className="text-gray-700" size={24} />,
//   },
//   {
//     slug: "agriculture",
//     name: "Agriculture Products",
//     desc: "Seeds, fertilizers & farming tools",
//     icon: <FaLeaf className="text-green-500" size={24} />,
//   },
//   {
//     slug: "general",
//     name: "General Supplies",
//     desc: "Everyday business & wholesale goods",
//     icon: <FaBox className="text-purple-500" size={24} />,
//   },
// ];

// export default function Sidebar() {
//   const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState(null);

//   const filteredCategories = dummyCategories.filter(
//     (cat) =>
//       cat.name.toLowerCase().includes(search.toLowerCase()) ||
//       cat.desc.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleCategoryClick = (slug) => {
//     setActiveCategory(slug);

//     const el = document.getElementById(`category-${slug}`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   return (
//     <aside className="w-full h-[72vh] flex flex-col bg-white border-r border-gray-200 shadow-sm rounded-2xl">

//       {/* HEADER */}
//       <div className="p-5 border-b border-gray-100">
//         <h2 className="text-xl font-bold text-black mb-3 flex items-center gap-2">
//           <FaIndustry className="text-[#F54900]" />
//           Categories
//         </h2>

//         {/* SEARCH */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search categories..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#F54900]"
//           />
//           <FaSearch className="absolute left-3 top-3 text-gray-400" />
//         </div>
//       </div>

//       {/* LIST */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-3">

//         {filteredCategories.map((cat) => (
//           <motion.div
//             key={cat.slug}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => handleCategoryClick(cat.slug)}
//             className={`cursor-pointer rounded-2xl p-4 border transition-all ${
//               activeCategory === cat.slug
//                 ? "border-[#F54900] bg-orange-50"
//                 : "border-gray-100 hover:border-orange-200 hover:bg-gray-50"
//             }`}
//           >
//             <div className="flex gap-4 items-start">

//               {/* ICON */}
//               <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border">
//                 {cat.icon}
//               </div>

//               {/* CONTENT */}
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <h3 className="font-semibold text-gray-900 text-sm">
//                     {cat.name}
//                   </h3>

//                   {cat.popular && (
//                     <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
//                       HOT
//                     </span>
//                   )}
//                 </div>

//                 <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                   {cat.desc}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         ))}

//         {/* EMPTY STATE */}
//         {filteredCategories.length === 0 && (
//           <div className="text-center text-gray-400 py-10 text-sm">
//             No categories found
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// }

// src/components/Sidebar.jsx

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaBox,
//   FaIndustry,
//   FaLeaf,
//   FaTools,
//   FaBolt,
//   FaCar,
//   FaApple,
//   FaCubes,
//   FaSearch,
// } from "react-icons/fa";

// // 👉 DUMMY CATEGORIES
// const dummyCategories = [
//   {
//     slug: "plastics",
//     name: "Plastics & Polymers",
//     desc: "HDPE, PVC, plastic granules & raw materials",
//     icon: <FaCubes className="text-orange-600" size={24} />,
//     popular: true,
//   },
//   {
//     slug: "machinery",
//     name: "Industrial Machinery",
//     desc: "Heavy machines, tools & equipment",
//     icon: <FaTools className="text-blue-600" size={24} />,
//     popular: true,
//   },
//   {
//     slug: "chemicals",
//     name: "Chemicals",
//     desc: "Industrial & agricultural chemicals",
//     icon: <FaIndustry className="text-green-600" size={24} />,
//   },
//   {
//     slug: "food",
//     name: "Food & Agriculture",
//     desc: "Spices, grains, fruits & agro products",
//     icon: <FaApple className="text-red-500" size={24} />,
//     popular: true,
//   },
//   {
//     slug: "electronics",
//     name: "Electronics",
//     desc: "Components, devices & industrial electronics",
//     icon: <FaBolt className="text-yellow-500" size={24} />,
//   },
//   {
//     slug: "automobile",
//     name: "Automobile Parts",
//     desc: "Spare parts, engines & accessories",
//     icon: <FaCar className="text-gray-700" size={24} />,
//   },
//   {
//     slug: "agriculture",
//     name: "Agriculture Products",
//     desc: "Seeds, fertilizers & farming tools",
//     icon: <FaLeaf className="text-green-500" size={24} />,
//   },
//   {
//     slug: "general",
//     name: "General Supplies",
//     desc: "Everyday business & wholesale goods",
//     icon: <FaBox className="text-purple-500" size={24} />,
//   },
// ];

// export default function Sidebar() {
//   const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState(null);

//   const filteredCategories = dummyCategories.filter(
//     (cat) =>
//       cat.name.toLowerCase().includes(search.toLowerCase()) ||
//       cat.desc.toLowerCase().includes(search.toLowerCase()),
//   );

// const handleCategoryClick = (slug) => {
//   setActiveCategory(slug);

//   const el = document.getElementById(`category-${slug}`);

//   if (el) {
//     const yOffset = -100; // navbar spacing
//     const y =
//       el.getBoundingClientRect().top + window.pageYOffset + yOffset;

//     window.scrollTo({
//       top: y,
//       behavior: "smooth",
//     });
//   }
// };

//   return (
//     <aside className="w-full h-[72vh] flex flex-col bg-white border-r border-gray-200 shadow-sm rounded-2xl">
//       {/* HEADER */}
//       <div className="p-5 border-b border-gray-100">
//         <h2 className="text-xl font-bold text-black mb-3 flex items-center gap-2">
//           <FaIndustry className="text-[#F54900]" />
//           Categories
//         </h2>

//         {/* SEARCH */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search categories..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#F54900]"
//           />
//           <FaSearch className="absolute left-3 top-3 text-gray-400" />
//         </div>
//       </div>

//       {/* LIST */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-3">
//         {filteredCategories.map((cat, index) => (
//           <motion.div
//             key={cat.slug}
//             initial={{ opacity: 0, y: 25 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: index * 0.05 }}
//             viewport={{ once: true }}
//             whileHover={{ y: -5 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => handleCategoryClick(cat.slug)}
//             className={`group relative cursor-pointer rounded-2xl p-4 border overflow-hidden transition-all duration-500 ${
//               activeCategory === cat.slug
//                 ? "border-[#F54900] bg-orange-50 shadow-lg"
//                 : "border-gray-100 hover:border-orange-200 hover:bg-gray-50 hover:shadow-xl"
//             }`}
//           >
//             {/* TOP LINE */}
//             <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

//             <div className="flex gap-4 items-start">
//               {/* ICON */}

//               <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200 group-hover:border-orange-200 transition-all duration-500">
//                 <div className="group-hover:scale-110 transition duration-500">
//                   {cat.icon}
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-800 transition duration-300">
//                     {cat.name}
//                   </h3>

//                   {cat.popular && (
//                     <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
//                       HOT
//                     </span>
//                   )}
//                 </div>

//                 <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                   {cat.desc}
//                 </p>
//               </div>
//             </div>

//             {/* BLUR EFFECT */}
//             <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
//           </motion.div>
//         ))}

//         {/* EMPTY STATE */}
//         {filteredCategories.length === 0 && (
//           <div className="text-center text-gray-400 py-10 text-sm">
//             No categories found
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// }



import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  FaBox,
  FaIndustry,
  FaLeaf,
  FaTools,
  FaBolt,
  FaCar,
  FaApple,
  FaCubes,
  FaSearch,
} from "react-icons/fa";

import { getCategories } from "../../api/categoryApi";

// ================= ICON MAP =================
const iconMap = {
  plastics: <FaCubes className="text-orange-600" size={24} />,
  machinery: <FaTools className="text-blue-600" size={24} />,
  chemicals: <FaIndustry className="text-green-600" size={24} />,
  food: <FaApple className="text-red-500" size={24} />,
  electronics: <FaBolt className="text-yellow-500" size={24} />,
  automobile: <FaCar className="text-gray-700" size={24} />,
  agriculture: <FaLeaf className="text-green-500" size={24} />,
  general: <FaBox className="text-purple-500" size={24} />,
};

export default function Sidebar() {
  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] = useState(null);

  const [categories, setCategories] = useState([]);

  // ================= FETCH =================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();

      setCategories(res.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FILTER =================
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.desc.toLowerCase().includes(search.toLowerCase())
  );

  // ================= SCROLL =================
  const handleCategoryClick = (slug) => {
    setActiveCategory(slug);

    const el = document.getElementById(`category-${slug}`);

    if (el) {
      const yOffset = -100;

      const y =
        el.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="w-full h-[72vh] flex flex-col bg-white border-r border-gray-200 shadow-sm rounded-2xl">
      {/* HEADER */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-black mb-3 flex items-center gap-2">
          <FaIndustry className="text-[#F54900]" />
          Categories
        </h2>

        {/* SEARCH */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#F54900]"
          />

          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filteredCategories.map((cat, index) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
            }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategoryClick(cat.slug)}
            className={`group relative cursor-pointer rounded-2xl p-4 border overflow-hidden transition-all duration-500 ${
              activeCategory === cat.slug
                ? "border-[#F54900] bg-orange-50 shadow-lg"
                : "border-gray-100 hover:border-orange-200 hover:bg-gray-50 hover:shadow-xl"
            }`}
          >
            {/* TOP LINE */}
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

            <div className="flex gap-4 items-start">
              {/* ICON */}
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200 group-hover:border-orange-200 transition-all duration-500">
                <div className="group-hover:scale-110 transition duration-500">
                  {iconMap[cat.slug] || (
                    <FaIndustry
                      className="text-orange-600"
                      size={24}
                    />
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-800 transition duration-300">
                    {cat.name}
                  </h3>

                  <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                    LIVE
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {cat.desc}
                </p>
              </div>
            </div>

            {/* BLUR EFFECT */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
          </motion.div>
        ))}

        {/* EMPTY */}
        {filteredCategories.length === 0 && (
          <div className="text-center text-gray-400 py-10 text-sm">
            No categories found
          </div>
        )}
      </div>
    </aside>
  );
}