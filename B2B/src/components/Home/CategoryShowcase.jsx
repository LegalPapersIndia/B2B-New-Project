

// import React from "react";
// import { ArrowRight, TrendingUp } from "lucide-react";
// import ProductStrip from "./ProductStrip";

// // 👉 IMAGES
// import img1 from "../../assets/Medicine.jpg";
// import img2 from "../../assets/Plastics.jpg";
// import img3 from "../../assets/Industrial.jpg";
// import img4 from "../../assets/Chemicals.jpg";
// import img5 from "../../assets/Food.jpg";
// import img6 from "../../assets/Electronics.jpg";
// import img7 from "../../assets/Automobile.jpg";
// import img8 from "../../assets/Agriculture.jpg";
// import img9 from "../../assets/General.jpg";

// import Medical from "../../assets/Categories/medical.jpg";
// // =========================
// // CATEGORY DATA
// // =========================
// const categories = [
//   {
//     slug: "medicine",
//     name: "Medicine & Pharmaceuticals",
//     desc: "APIs, formulations, medical devices",
//     image: img1,
//     products: [
//       { img: img1, title: "Paracetamol Tablets" },
//       { img: img1, title: "Vitamin Capsules" },
//       { img: img1, title: "Syrup Bottles" },
//       { img: Medical, title: "Medical Kits" },
//       { img: img1, title: "Injection Supplies" },
//     ],
//   },

//   {
//     slug: "plastics",
//     name: "Plastics & Polymers",
//     desc: "HDPE, PVC, plastic granules & raw materials",
//     image: img2,
//     products: [
//       { img: img2, title: "PVC Pipes" },
//       { img: img2, title: "Plastic Granules" },
//       { img: img2, title: "Industrial Containers" },
//       { img: img2, title: "Polymer Sheets" },
//       { img: img2, title: "Plastic Drums" },
//     ],
//   },

//   {
//     slug: "machinery",
//     name: "Industrial Machinery",
//     desc: "Heavy machines, tools & equipment",
//     image: img3,
//     products: [
//       { img: img3, title: "Cutting Machine" },
//       { img: img3, title: "Hydraulic Press" },
//       { img: img3, title: "CNC Machine" },
//       { img: img3, title: "Industrial Motors" },
//       { img: img3, title: "Packaging Machines" },
//     ],
//   },

//   {
//     slug: "chemicals",
//     name: "Chemicals",
//     desc: "Industrial & agricultural chemicals",
//     image: img4,
//     products: [
//       { img: img4, title: "Industrial Solvents" },
//       { img: img4, title: "Cleaning Chemicals" },
//       { img: img4, title: "Chemical Powders" },
//       { img: img4, title: "Liquid Solutions" },
//       { img: img4, title: "Agro Chemicals" },
//     ],
//   },

//   {
//     slug: "food",
//     name: "Food & Agriculture",
//     desc: "Spices, grains, fruits & agro products",
//     image: img5,
//     products: [
//       { img: img5, title: "Organic Wheat" },
//       { img: img5, title: "Fresh Spices" },
//       { img: img5, title: "Rice Bags" },
//       { img: img5, title: "Dry Fruits" },
//       { img: img5, title: "Farm Products" },
//     ],
//   },

//   {
//     slug: "electronics",
//     name: "Electronics",
//     desc: "Components, devices & industrial electronics",
//     image: img6,
//     products: [
//       { img: img6, title: "Circuit Boards" },
//       { img: img6, title: "LED Components" },
//       { img: img6, title: "Power Supplies" },
//       { img: img6, title: "Electronic Sensors" },
//       { img: img6, title: "Industrial Panels" },
//     ],
//   },

//   {
//     slug: "automobile",
//     name: "Automobile Parts",
//     desc: "Spare parts, engines & accessories",
//     image: img7,
//     products: [
//       { img: img7, title: "Car Engines" },
//       { img: img7, title: "Brake Pads" },
//       { img: img7, title: "Tyres" },
//       { img: img7, title: "Auto Accessories" },
//       { img: img7, title: "Oil Filters" },
//     ],
//   },

//   {
//     slug: "agriculture",
//     name: "Agriculture Products",
//     desc: "Seeds, fertilizers & farming tools",
//     image: img8,
//     products: [
//       { img: img8, title: "Hybrid Seeds" },
//       { img: img8, title: "Organic Fertilizers" },
//       { img: img8, title: "Farming Tools" },
//       { img: img8, title: "Pesticides" },
//       { img: img8, title: "Water Pumps" },
//     ],
//   },

//   {
//     slug: "general",
//     name: "General Supplies",
//     desc: "Everyday business & wholesale goods",
//     image: img9,
//     products: [
//       { img: img9, title: "Office Supplies" },
//       { img: img9, title: "Packaging Items" },
//       { img: img9, title: "Storage Boxes" },
//       { img: img9, title: "Cleaning Tools" },
//       { img: img9, title: "Wholesale Goods" },
//     ],
//   },
// ];

// // =========================
// // MAIN UI
// // =========================
// export default function CategoryShowcase() {
//   return (
//     <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-16 bg-gray-50">
//       {/* HEADER */}
//       <div className="mb-12">
//         <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
//           <TrendingUp className="w-4 h-4" />
//           Global Wholesale Marketplace
//         </div>

//         <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//           Industrial Categories
//         </h2>

//         <p className="mt-2 text-slate-600">
//           Source directly from verified manufacturers and suppliers.
//         </p>
//       </div>

//       {categories.map((cat) => (
//         <section
//           key={cat.slug}
//           id={`category-${cat.slug}`}
//           className="space-y-6"
//         >
//           {/* ================= HERO ================= */}
//           <div className="relative h-[340px] rounded-2xl overflow-hidden group shadow-xl">
//             <img
//               src={cat.image}
//               className="absolute w-full h-full object-cover group-hover:scale-105 transition duration-700"
//             />

//             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

//             <div className="absolute bottom-0 p-8 text-white max-w-xl">
//               <span className="px-3 py-1 bg-orange-600 text-xs rounded-full">
//                 Featured Category
//               </span>

//               <h2 className="text-3xl font-bold mt-3">{cat.name}</h2>

//               <p className="text-sm text-gray-200 mt-2">{cat.desc}</p>

//               <button className="mt-4 bg-white text-black px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-orange-600 hover:text-white transition">
//                 Explore <ArrowRight size={16} />
//               </button>
//             </div>
//           </div>

//           {/* ================= PRODUCT STRIP ================= */}
//           <ProductStrip items={cat.products} />
//         </section>
//       ))}
//     </div>
//   );
// }

// import React from "react";
// import { ArrowRight, TrendingUp, MessageSquareMore } from "lucide-react";
// import { Link } from "react-router-dom";
// import ProductStrip from "./ProductStrip";

// // 👉 IMAGES
// import img1 from "../../assets/Medicine.jpg";
// import img2 from "../../assets/Plastics.jpg";
// import img3 from "../../assets/Industrial.jpg";
// import img4 from "../../assets/Chemicals.jpg";
// import img5 from "../../assets/Food.jpg";
// import img6 from "../../assets/Electronics.jpg";
// import img7 from "../../assets/Automobile.jpg";
// import img8 from "../../assets/Agriculture.jpg";
// import img9 from "../../assets/General.jpg";

// import Medical from "../../assets/Categories/medical.jpg";

// // =========================
// // CATEGORY DATA
// // =========================
// const categories = [
//   {
//     slug: "medicine",
//     name: "Medicine & Pharmaceuticals",
//     desc: "APIs, formulations, medical devices",
//     image: img1,
//     products: [
//       { img: img1, title: "Paracetamol Tablets" },
//       { img: img1, title: "Vitamin Capsules" },
//       { img: img1, title: "Syrup Bottles" },
//       { img: Medical, title: "Medical Kits" },
//       { img: img1, title: "Injection Supplies" },
//     ],
//   },

//   {
//     slug: "plastics",
//     name: "Plastics & Polymers",
//     desc: "HDPE, PVC, plastic granules & raw materials",
//     image: img2,
//     products: [
//       { img: img2, title: "PVC Pipes" },
//       { img: img2, title: "Plastic Granules" },
//       { img: img2, title: "Industrial Containers" },
//       { img: img2, title: "Polymer Sheets" },
//       { img: img2, title: "Plastic Drums" },
//     ],
//   },

//   {
//     slug: "machinery",
//     name: "Industrial Machinery",
//     desc: "Heavy machines, tools & equipment",
//     image: img3,
//     products: [
//       { img: img3, title: "Cutting Machine" },
//       { img: img3, title: "Hydraulic Press" },
//       { img: img3, title: "CNC Machine" },
//       { img: img3, title: "Industrial Motors" },
//       { img: img3, title: "Packaging Machines" },
//     ],
//   },

//   {
//     slug: "chemicals",
//     name: "Chemicals",
//     desc: "Industrial & agricultural chemicals",
//     image: img4,
//     products: [
//       { img: img4, title: "Industrial Solvents" },
//       { img: img4, title: "Cleaning Chemicals" },
//       { img: img4, title: "Chemical Powders" },
//       { img: img4, title: "Liquid Solutions" },
//       { img: img4, title: "Agro Chemicals" },
//     ],
//   },

//   {
//     slug: "food",
//     name: "Food & Agriculture",
//     desc: "Spices, grains, fruits & agro products",
//     image: img5,
//     products: [
//       { img: img5, title: "Organic Wheat" },
//       { img: img5, title: "Fresh Spices" },
//       { img: img5, title: "Rice Bags" },
//       { img: img5, title: "Dry Fruits" },
//       { img: img5, title: "Farm Products" },
//     ],
//   },

//   {
//     slug: "electronics",
//     name: "Electronics",
//     desc: "Components, devices & industrial electronics",
//     image: img6,
//     products: [
//       { img: img6, title: "Circuit Boards" },
//       { img: img6, title: "LED Components" },
//       { img: img6, title: "Power Supplies" },
//       { img: img6, title: "Electronic Sensors" },
//       { img: img6, title: "Industrial Panels" },
//     ],
//   },

//   {
//     slug: "automobile",
//     name: "Automobile Parts",
//     desc: "Spare parts, engines & accessories",
//     image: img7,
//     products: [
//       { img: img7, title: "Car Engines" },
//       { img: img7, title: "Brake Pads" },
//       { img: img7, title: "Tyres" },
//       { img: img7, title: "Auto Accessories" },
//       { img: img7, title: "Oil Filters" },
//     ],
//   },

//   {
//     slug: "agriculture",
//     name: "Agriculture Products",
//     desc: "Seeds, fertilizers & farming tools",
//     image: img8,
//     products: [
//       { img: img8, title: "Hybrid Seeds" },
//       { img: img8, title: "Organic Fertilizers" },
//       { img: img8, title: "Farming Tools" },
//       { img: img8, title: "Pesticides" },
//       { img: img8, title: "Water Pumps" },
//     ],
//   },

//   {
//     slug: "general",
//     name: "General Supplies",
//     desc: "Everyday business & wholesale goods",
//     image: img9,
//     products: [
//       { img: img9, title: "Office Supplies" },
//       { img: img9, title: "Packaging Items" },
//       { img: img9, title: "Storage Boxes" },
//       { img: img9, title: "Cleaning Tools" },
//       { img: img9, title: "Wholesale Goods" },
//     ],
//   },
// ];

// // =========================
// // MAIN UI
// // =========================
// export default function CategoryShowcase() {
//   return (
//     <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-16 bg-gray-50">
//       {/* HEADER */}
//       <div className="mb-12">
//         <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
//           <TrendingUp className="w-4 h-4" />
//           Global Wholesale Marketplace
//         </div>

//         <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//           Industrial Categories
//         </h2>

//         <p className="mt-2 text-slate-600">
//           Source directly from verified manufacturers and suppliers.
//         </p>
//       </div>

//       {categories.map((cat) => (
//         <section
//           key={cat.slug}
//           id={`category-${cat.slug}`}
//           className="space-y-6"
//         >
//           {/* ================= HERO ================= */}
//           <div className="relative h-[340px] rounded-2xl overflow-hidden group shadow-xl">
//             {/* IMAGE */}
//             <img
//               src={cat.image}
//               alt={cat.name}
//               loading="lazy"
//               className="absolute w-full h-full object-cover group-hover:scale-105 transition duration-700"
//             />

//             {/* OVERLAY */}
//             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

//             {/* CONTENT */}
//             <div className="absolute bottom-0 p-8 text-white max-w-xl">
//               <span className="px-3 py-1 bg-orange-600 text-xs rounded-full">
//                 Featured Category
//               </span>

//               <h2 className="text-3xl font-bold mt-3">
//                 {cat.name}
//               </h2>

//               <p className="text-sm text-gray-200 mt-2">
//                 {cat.desc}
//               </p>

//               {/* BUTTONS */}
//               <div className="flex flex-wrap items-center gap-4 mt-6">

//                 {/* EXPLORE BUTTON */}
//                 <Link
//                   to={`/category/${cat.slug}`}
//                   className="bg-white text-black px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold hover:bg-orange-600 hover:text-white transition duration-300"
//                 >
//                   Explore
//                   <ArrowRight size={16} />
//                 </Link>

//                 {/* INQUIRY BUTTON */}
//                 <button className="bg-orange-600/90 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold hover:bg-orange-700 transition duration-300">
//                   <MessageSquareMore size={18} />
//                   Send Inquiry
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* ================= PRODUCT STRIP ================= */}
//           <ProductStrip items={cat.products} />
//         </section>
//       ))}
//     </div>
//   );
// }

import React, { useState } from "react";

import { ArrowRight, TrendingUp, MessageSquareMore } from "lucide-react";

import { Link } from "react-router-dom";

import ProductStrip from "./ProductStrip";

//  IMAGES
import img1 from "../../assets/Medicine.jpg";
import img2 from "../../assets/Plastics.jpg";
import img3 from "../../assets/Industrial.jpg";
import img4 from "../../assets/Chemicals.jpg";
import img5 from "../../assets/Food.jpg";
import img6 from "../../assets/Electronics.jpg";
import img7 from "../../assets/Automobile.jpg";
import img8 from "../../assets/Agriculture.jpg";
import img9 from "../../assets/General.jpg";

import Medical from "../../assets/Categories/Medical.jpg";

import InquiryModal from "../../components/common/InquiryModal";

// =========================
// CATEGORY DATA
// =========================
const categories = [
  // ================= ELECTRONICS =================
  {
    slug: "electronics",

    name: "Electronics",

    desc: "Components, devices & industrial electronics",

    image: img6,

    products: [
      {
        img: img6,
        title: "Mobile Phones",
        subcategory: "mobile-phones",
      },

      {
        img: img6,
        title: "Laptops",
        subcategory: "laptops",
      },

      {
        img: img6,
        title: "LED Lights",
        subcategory: "led-lights",
      },

      {
        img: img6,
        title: "CCTV Cameras",
        subcategory: "cctv-cameras",
      },

      {
        img: img6,
        title: "Electronic Components",
        subcategory: "electronic-components",
      },
    ],
  },

  // ================= PLASTICS =================
  {
    slug: "plastics",

    name: "Plastics & Polymers",

    desc: "HDPE, PVC, plastic granules & raw materials",

    image: img2,

    products: [
      {
        img: img2,
        title: "HDPE Granules",
        subcategory: "hdpe-granules",
      },

      {
        img: img2,
        title: "PVC Resin",
        subcategory: "pvc-resin",
      },

      {
        img: img2,
        title: "Plastic Sheets",
        subcategory: "plastic-sheets",
      },

      {
        img: img2,
        title: "Polycarbonate Sheets",
        subcategory: "polycarbonate-sheets",
      },

      {
        img: img2,
        title: "Plastic Drums",
        subcategory: "plastic-drums",
      },
    ],
  },

  // ================= MACHINERY =================
  {
    slug: "machinery",

    name: "Industrial Machinery",

    desc: "Heavy machines, tools & equipment",

    image: img3,

    products: [
      {
        img: img3,
        title: "Industrial Machines",
        subcategory: "industrial-machines",
      },

      {
        img: img3,
        title: "Packaging Machines",
        subcategory: "packaging-machines",
      },

      {
        img: img3,
        title: "CNC Machines",
        subcategory: "cnc-machines",
      },

      {
        img: img3,
        title: "Hydraulic Press",
        subcategory: "hydraulic-press",
      },

      {
        img: img3,
        title: "Power Tools",
        subcategory: "power-tools",
      },
    ],
  },

  // ================= CHEMICALS =================
  {
    slug: "chemicals",

    name: "Chemicals",

    desc: "Industrial & agricultural chemicals",

    image: img4,

    products: [
      {
        img: img4,
        title: "Industrial Chemicals",
        subcategory: "industrial-chemicals",
      },

      {
        img: img4,
        title: "Cleaning Chemicals",
        subcategory: "cleaning-chemicals",
      },

      {
        img: img4,
        title: "Paint Chemicals",
        subcategory: "paint-chemicals",
      },

      {
        img: img4,
        title: "Water Treatment Chemicals",
        subcategory: "water-treatment-chemicals",
      },

      {
        img: img4,
        title: "Adhesives",
        subcategory: "adhesives",
      },
    ],
  },

  // ================= FOOD =================
  {
    slug: "food",

    name: "Food & Agriculture",

    desc: "Spices, grains, fruits & agro products",

    image: img5,

    products: [
      {
        img: img5,
        title: "Spices",
        subcategory: "spices",
      },

      {
        img: img5,
        title: "Rice",
        subcategory: "rice",
      },

      {
        img: img5,
        title: "Wheat",
        subcategory: "wheat",
      },

      {
        img: img5,
        title: "Fresh Fruits",
        subcategory: "fresh-fruits",
      },

      {
        img: img5,
        title: "Dry Fruits",
        subcategory: "dry-fruits",
      },
    ],
  },

  {
    slug: "medicine",

    name: "Medicine & Pharmaceuticals",

    desc: "APIs, formulations, medical devices",

    image: img1,

    products: [
      {
        img: img1,
        title: "Paracetamol Tablets",
        subcategory: "paracetamol-tablets",
      },

      {
        img: img1,
        title: "Vitamin Capsules",
        subcategory: "vitamin-capsules",
      },

      {
        img: img1,
        title: "Syrup Bottles",
        subcategory: "syrup-bottles",
      },

      {
        img: Medical,
        title: "Medical Kits",
        subcategory: "medical-kits",
      },

      {
        img: img1,
        title: "Injection Supplies",
        subcategory: "injection-supplies",
      },
    ],
  },

  // ================= AUTOMOBILE =================
  {
    slug: "automobile",

    name: "Automobile Parts",

    desc: "Spare parts, engines & accessories",

    image: img7,

    products: [
      {
        img: img7,
        title: "Car Spare Parts",
        subcategory: "car-spare-parts",
      },

      {
        img: img7,
        title: "Bike Parts",
        subcategory: "bike-parts",
      },

      {
        img: img7,
        title: "Tyres",
        subcategory: "tyres",
      },

      {
        img: img7,
        title: "Engines",
        subcategory: "engines",
      },

      {
        img: img7,
        title: "Lubricants",
        subcategory: "lubricants",
      },
    ],
  },

  // ================= AGRICULTURE =================
  {
    slug: "agriculture",

    name: "Agriculture Products",

    desc: "Seeds, fertilizers & farming tools",

    image: img8,

    products: [
      {
        img: img8,
        title: "Seeds",
        subcategory: "seeds",
      },

      {
        img: img8,
        title: "Fertilizers",
        subcategory: "fertilizers",
      },

      {
        img: img8,
        title: "Pesticides",
        subcategory: "pesticides",
      },

      {
        img: img8,
        title: "Farming Tools",
        subcategory: "farming-tools",
      },

      {
        img: img8,
        title: "Tractors",
        subcategory: "tractors",
      },
    ],
  },

  // ================= GENERAL =================
  {
    slug: "general",

    name: "General Supplies",

    desc: "Everyday business & wholesale goods",

    image: img9,

    products: [
      {
        img: img9,
        title: "Office Supplies",
        subcategory: "office-supplies",
      },

      {
        img: img9,
        title: "Packaging Materials",
        subcategory: "packaging-materials",
      },

      {
        img: img9,
        title: "Cleaning Products",
        subcategory: "cleaning-products",
      },

      {
        img: img9,
        title: "Safety Equipment",
        subcategory: "safety-equipment",
      },

      {
        img: img9,
        title: "Wholesale Products",
        subcategory: "wholesale-products",
      },
    ],
  },
];

// =========================
// MAIN UI
// =========================
export default function CategoryShowcase() {
  const [openInquiry, setOpenInquiry] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState("");
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12 space-y-16 bg-gray-50">
      {/* HEADER */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
          <TrendingUp className="w-4 h-4" />
          Global Wholesale Marketplace
        </div>

        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
          Industrial Categories
        </h2>

        <p className="mt-2 text-slate-600">
          Source directly from verified manufacturers and suppliers.
        </p>
      </div>

      {categories.map((cat) => (
        <section
          key={cat.slug}
          id={`category-${cat.slug}`}
          className="space-y-6"
        >
          {/* HERO */}
          <div className="relative h-[340px] rounded-2xl overflow-hidden group shadow-xl">
            {/* IMAGE */}
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              className="absolute w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* CONTENT */}
            <div className="absolute bottom-0 p-8 text-white max-w-xl">
              <span className="px-3 py-1 bg-orange-600 text-xs rounded-full">
                Featured Category
              </span>

              <h2 className="text-3xl font-bold mt-3">{cat.name}</h2>

              <p className="text-sm text-gray-200 mt-2">{cat.desc}</p>

              {/* BUTTONS */}
              <div className="flex flex-wrap items-center gap-4 mt-6">
                {/* EXPLORE */}
                <Link
                  to={`/category/${cat.slug}`}
                  className="bg-white text-black px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold hover:bg-orange-600 hover:text-white transition duration-300"
                >
                  Explore
                  <ArrowRight size={16} />
                </Link>

                {/* INQUIRY */}
                <button
                  onClick={() => {
                    setSelectedProduct(cat.name);
                    setOpenInquiry(true);
                  }}
                  className="bg-orange-600/90 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold hover:bg-orange-700 transition duration-300"
                >
                  <MessageSquareMore size={18} />
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>

          {/* PRODUCT STRIP */}
          <ProductStrip items={cat.products} categorySlug={cat.slug} />
        </section>
      ))}
      <InquiryModal
        isOpen={openInquiry}
        onClose={() => setOpenInquiry(false)}
        productName={selectedProduct}
      />
    </div>
  );
}
