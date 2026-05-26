// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

// import ProductGrid from "./ProductGrid";
// import FilterSidebar from "./FilterSidebar";

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
//       {
//         title: "Paracetamol Tablets",
//         desc: "High quality pharmaceutical tablets for hospitals and distributors.",
//         image: img1,
//         price: "120",
//         moq: "100 Boxes",
//         supplier: "Dhruv Pharma",
//         location: "Delhi, India",
//       },

//       {
//         title: "Vitamin Capsules",
//         desc: "Premium health supplement capsules for wholesale supply.",
//         image: img1,
//         price: "240",
//         moq: "50 Boxes",
//         supplier: "HealthCare Ltd.",
//         location: "Mumbai, India",
//       },

//       {
//         title: "Medical Syrup",
//         desc: "Reliable pharmaceutical syrup products with fast delivery.",
//         image: img1,
//         price: "180",
//         moq: "80 Bottles",
//         supplier: "Medi Supply",
//         location: "Ahmedabad, India",
//       },
//     ],
//   },

//   {
//     slug: "plastics",
//     name: "Plastics & Polymers",
//     desc: "HDPE, PVC, plastic granules & raw materials",
//     image: img2,

//     products: [
//       {
//         title: "PVC Pipes",
//         desc: "Industrial grade PVC pipes for construction use.",
//         image: img2,
//         price: "450",
//         moq: "200 Pieces",
//         supplier: "Polymer Industries",
//         location: "Surat, India",
//       },

//       {
//         title: "Plastic Granules",
//         desc: "Premium quality granules for manufacturing industries.",
//         image: img2,
//         price: "850",
//         moq: "500 KG",
//         supplier: "Plastic Hub",
//         location: "Delhi, India",
//       },

//       {
//         title: "Industrial Containers",
//         desc: "Heavy-duty plastic containers for bulk storage.",
//         image: img2,
//         price: "600",
//         moq: "100 Units",
//         supplier: "PackWorld",
//         location: "Pune, India",
//       },
//     ],
//   },

//   {
//     slug: "machinery",
//     name: "Industrial Machinery",
//     desc: "Heavy machines, tools & equipment",
//     image: img3,

//     products: [
//       {
//         title: "Hydraulic Machine",
//         desc: "Industrial hydraulic systems for factories.",
//         image: img3,
//         price: "15000",
//         moq: "1 Unit",
//         supplier: "Machine Tech",
//         location: "Faridabad, India",
//       },

//       {
//         title: "CNC Machine",
//         desc: "Advanced CNC cutting machines for precision work.",
//         image: img3,
//         price: "55000",
//         moq: "1 Unit",
//         supplier: "Industrial Works",
//         location: "Noida, India",
//       },

//       {
//         title: "Packaging Machine",
//         desc: "Automated packaging solutions for businesses.",
//         image: img3,
//         price: "35000",
//         moq: "1 Unit",
//         supplier: "PackMach",
//         location: "Gujarat, India",
//       },
//     ],
//   },

//   {
//     slug: "chemicals",
//     name: "Chemicals",
//     desc: "Industrial & agricultural chemicals",
//     image: img4,

//     products: [
//       {
//         title: "Industrial Solvents",
//         desc: "High-grade industrial solvent chemicals.",
//         image: img4,
//         price: "900",
//         moq: "200 Liters",
//         supplier: "Chem Industries",
//         location: "Vadodara, India",
//       },

//       {
//         title: "Cleaning Chemicals",
//         desc: "Professional cleaning solutions for industries.",
//         image: img4,
//         price: "700",
//         moq: "100 Liters",
//         supplier: "CleanChem",
//         location: "Mumbai, India",
//       },

//       {
//         title: "Chemical Powder",
//         desc: "Industrial-use chemical powder for processing.",
//         image: img4,
//         price: "1200",
//         moq: "100 KG",
//         supplier: "Agro Chem",
//         location: "Indore, India",
//       },
//     ],
//   },

//   {
//     slug: "food",
//     name: "Food & Agriculture",
//     desc: "Spices, grains, fruits & agro products",
//     image: img5,

//     products: [
//       {
//         title: "Organic Wheat",
//         desc: "Premium export quality wheat grains.",
//         image: img5,
//         price: "60",
//         moq: "500 KG",
//         supplier: "Farm Fresh",
//         location: "Punjab, India",
//       },

//       {
//         title: "Fresh Spices",
//         desc: "Natural spices sourced directly from farms.",
//         image: img5,
//         price: "180",
//         moq: "100 KG",
//         supplier: "Spice World",
//         location: "Kerala, India",
//       },

//       {
//         title: "Rice Bags",
//         desc: "Wholesale rice bags for distributors.",
//         image: img5,
//         price: "2200",
//         moq: "50 Bags",
//         supplier: "Rice Exporters",
//         location: "Haryana, India",
//       },
//     ],
//   },

//   {
//     slug: "electronics",
//     name: "Electronics",
//     desc: "Components, devices & industrial electronics",
//     image: img6,

//     products: [
//       {
//         title: "Circuit Boards",
//         desc: "Electronic PCB boards for industrial projects.",
//         image: img6,
//         price: "350",
//         moq: "200 Pieces",
//         supplier: "Electro Tech",
//         location: "Bangalore, India",
//       },

//       {
//         title: "LED Components",
//         desc: "High-performance LED parts and accessories.",
//         image: img6,
//         price: "90",
//         moq: "1000 Pieces",
//         supplier: "Light House",
//         location: "Delhi, India",
//       },

//       {
//         title: "Power Supply Unit",
//         desc: "Industrial power supplies for electronics.",
//         image: img6,
//         price: "1200",
//         moq: "20 Units",
//         supplier: "Volt Industries",
//         location: "Hyderabad, India",
//       },
//     ],
//   },

//   {
//     slug: "automobile",
//     name: "Automobile Parts",
//     desc: "Spare parts, engines & accessories",
//     image: img7,

//     products: [
//       {
//         title: "Brake Pads",
//         desc: "Durable brake pads for commercial vehicles.",
//         image: img7,
//         price: "650",
//         moq: "100 Sets",
//         supplier: "AutoTech",
//         location: "Chennai, India",
//       },

//       {
//         title: "Car Engine Parts",
//         desc: "Premium engine components for automobiles.",
//         image: img7,
//         price: "4500",
//         moq: "20 Units",
//         supplier: "Engine Hub",
//         location: "Pune, India",
//       },

//       {
//         title: "Tyres",
//         desc: "Heavy-duty tyres for industrial transport.",
//         image: img7,
//         price: "3500",
//         moq: "10 Pieces",
//         supplier: "Wheel World",
//         location: "Jaipur, India",
//       },
//     ],
//   },

//   {
//     slug: "agriculture",
//     name: "Agriculture Products",
//     desc: "Seeds, fertilizers & farming tools",
//     image: img8,

//     products: [
//       {
//         title: "Hybrid Seeds",
//         desc: "High-yield hybrid farming seeds.",
//         image: img8,
//         price: "500",
//         moq: "50 Packets",
//         supplier: "Agro Seeds",
//         location: "Lucknow, India",
//       },

//       {
//         title: "Organic Fertilizers",
//         desc: "Eco-friendly fertilizers for farms.",
//         image: img8,
//         price: "850",
//         moq: "100 KG",
//         supplier: "Green Agro",
//         location: "Bhopal, India",
//       },

//       {
//         title: "Water Pumps",
//         desc: "Agricultural water pumps for irrigation.",
//         image: img8,
//         price: "6500",
//         moq: "5 Units",
//         supplier: "Farm Equip",
//         location: "Punjab, India",
//       },
//     ],
//   },

//   {
//     slug: "general",
//     name: "General Supplies",
//     desc: "Everyday business & wholesale goods",
//     image: img9,

//     products: [
//       {
//         title: "Office Supplies",
//         desc: "Bulk office products for businesses.",
//         image: img9,
//         price: "120",
//         moq: "200 Units",
//         supplier: "Office Mart",
//         location: "Delhi, India",
//       },

//       {
//         title: "Packaging Items",
//         desc: "Industrial packaging products for wholesale.",
//         image: img9,
//         price: "300",
//         moq: "500 Pieces",
//         supplier: "Pack Zone",
//         location: "Mumbai, India",
//       },

//       {
//         title: "Storage Boxes",
//         desc: "Durable storage solutions for warehouses.",
//         image: img9,
//         price: "450",
//         moq: "100 Pieces",
//         supplier: "Storage India",
//         location: "Noida, India",
//       },
//     ],
//   },
// ];

// export default function CategoryDetails() {
//   const { slug } = useParams();

//   // =========================
//   // FILTER STATES
//   // =========================
//   const [selectedState, setSelectedState] = useState("");

//   const [verifiedOnly, setVerifiedOnly] = useState(false);

//   const [price, setPrice] = useState(100000);

//   // =========================
//   // FIND CATEGORY
//   // =========================
//   const category = categories.find((item) => item.slug === slug);

//   // =========================
//   // CATEGORY NOT FOUND
//   // =========================
//   if (!category) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
//         Category Not Found
//       </div>
//     );
//   }

//   // =========================
//   // FILTER PRODUCTS
//   // =========================
//   const filteredProducts = category.products.filter((product) => {
//     const matchPrice = Number(product.price) <= price;

//     const matchLocation =
//       selectedState === "" ||
//       product.location.toLowerCase().includes(selectedState.toLowerCase());

//     const matchVerified = !verifiedOnly || true;

//     return matchPrice && matchLocation && matchVerified;
//   });

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* HERO SECTION */}
//       <div className="relative h-[340px] overflow-hidden">
//         {/* IMAGE */}
//         <img
//           src={category.image}
//           alt={category.name}
//           className="w-full h-full object-cover"
//         />

//         {/* OVERLAY */}
//         <div className="absolute inset-0 bg-black/60" />

//         {/* CONTENT */}
//         <div className="absolute inset-0 flex items-center">
//           <div className="max-w-7xl mx-auto px-6 w-full text-white">
//             {/* BREADCRUMB */}
//             <div className="flex items-center gap-2 text-sm mb-4">
//               {/* HOME */}
//               <Link
//                 to="/"
//                 className="text-gray-300 hover:text-white transition"
//               >
//                 Home
//               </Link>

//               <span className="text-gray-400">/</span>

//               {/* CURRENT CATEGORY */}
//               <span className="text-white font-medium">{category.name}</span>
//             </div>

//             {/* TITLE */}
//             <h1 className="text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">
//               {category.name}
//             </h1>

//             {/* DESC */}
//             <p className="mt-4 text-base lg:text-lg text-gray-200 max-w-2xl">
//               {category.desc}
//             </p>

//             {/* BUTTONS */}
//             <div className="flex flex-wrap gap-4 mt-7">
//               <button className="bg-orange-600 hover:bg-orange-700 transition px-6 py-3 rounded-2xl font-semibold">
//                 Get Best Price
//               </button>

//               <button className="bg-white text-black hover:bg-gray-200 transition px-6 py-3 rounded-2xl font-semibold">
//                 Contact Suppliers
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PRODUCT SECTION */}
//       <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">
//           {/* SIDEBAR */}
//           <div>
//             <FilterSidebar
//               selectedState={selectedState}
//               setSelectedState={setSelectedState}
//               verifiedOnly={verifiedOnly}
//               setVerifiedOnly={setVerifiedOnly}
//               price={price}
//               setPrice={setPrice}
//             />
//           </div>

//           {/* PRODUCTS */}
//           <div className="lg:col-span-3">
//             <ProductGrid products={filteredProducts} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";

// import { useParams, Link } from "react-router-dom";

// import ProductGrid from "./ProductGrid";
// import FilterSidebar from "./FilterSidebar";

// import { getCategories } from "../../api/categoryApi";

// export default function CategoryDetails() {
//   const { slug } = useParams();

//   // =========================
//   // STATES
//   // =========================
//   const [categories, setCategories] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [selectedState, setSelectedState] =
//     useState("");

//   const [verifiedOnly, setVerifiedOnly] =
//     useState(false);

//   const [price, setPrice] = useState(100000);

//   // =========================
//   // FETCH CATEGORIES
//   // =========================
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await getCategories();

//       setCategories(res.categories || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // FIND CATEGORY
//   // =========================
//   const category = categories.find(
//     (item) => item.slug === slug
//   );

//   // =========================
//   // LOADING
//   // =========================
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
//         Loading...
//       </div>
//     );
//   }

//   // =========================
//   // CATEGORY NOT FOUND
//   // =========================
//   if (!category) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
//         Category Not Found
//       </div>
//     );
//   }

//   // =========================
//   // PRODUCTS
//   // =========================
//   const products = category.products || [];

//   // =========================
//   // FILTER PRODUCTS
//   // =========================
//   const filteredProducts = products.filter(
//     (product) => {
//       const matchPrice =
//         Number(product.price || 0) <= price;

//       const matchLocation =
//         selectedState === "" ||
//         (product.location || "")
//           .toLowerCase()
//           .includes(
//             selectedState.toLowerCase()
//           );

//       const matchVerified =
//         !verifiedOnly || true;

//       return (
//         matchPrice &&
//         matchLocation &&
//         matchVerified
//       );
//     }
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* HERO SECTION */}
//       <div className="relative h-[340px] overflow-hidden">
//         {/* IMAGE */}
//         <img
//           src={category.image}
//           alt={category.name}
//           className="w-full h-full object-cover"
//         />

//         {/* OVERLAY */}
//         <div className="absolute inset-0 bg-black/60" />

//         {/* CONTENT */}
//         <div className="absolute inset-0 flex items-center">
//           <div className="max-w-7xl mx-auto px-6 w-full text-white">
//             {/* BREADCRUMB */}
//             <div className="flex items-center gap-2 text-sm mb-4">
//               <Link
//                 to="/"
//                 className="text-gray-300 hover:text-white transition"
//               >
//                 Home
//               </Link>

//               <span className="text-gray-400">
//                 /
//               </span>

//               <span className="text-white font-medium">
//                 {category.name}
//               </span>
//             </div>

//             {/* TITLE */}
//             <h1 className="text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">
//               {category.name}
//             </h1>

//             {/* DESC */}
//             <p className="mt-4 text-base lg:text-lg text-gray-200 max-w-2xl">
//               {category.desc}
//             </p>

//             {/* BUTTONS */}
//             <div className="flex flex-wrap gap-4 mt-7">
//               <button className="bg-orange-600 hover:bg-orange-700 transition px-6 py-3 rounded-2xl font-semibold">
//                 Get Best Price
//               </button>

//               <button className="bg-white text-black hover:bg-gray-200 transition px-6 py-3 rounded-2xl font-semibold">
//                 Contact Suppliers
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PRODUCT SECTION */}
//       <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">
//           {/* SIDEBAR */}
//           <div>
//             <FilterSidebar
//               selectedState={selectedState}
//               setSelectedState={
//                 setSelectedState
//               }
//               verifiedOnly={verifiedOnly}
//               setVerifiedOnly={
//                 setVerifiedOnly
//               }
//               price={price}
//               setPrice={setPrice}
//             />
//           </div>

//           {/* PRODUCTS */}
//           <div className="lg:col-span-3">
//             <ProductGrid
//               products={filteredProducts}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// src/Pages/Category/CategoryDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategories } from "../../api/categoryApi";
import { getSubCategoriesByCategory } from "../../api/subCategoryApi";

export default function CategoryDetails() {
  const { slug } = useParams();

  // ─────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────
  const [category, setCategory]         = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading]           = useState(true);

  // ─────────────────────────────────────────
  // FETCH CATEGORY + SUBCATEGORIES
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // CATEGORY FIND
        const catRes = await getCategories();
        const found = (catRes.categories || []).find(
          (item) => item.slug === slug
        );
        setCategory(found || null);

        if (found) {
          // SUBCATEGORIES FETCH
          const subRes = await getSubCategoriesByCategory(found._id);
          setSubCategories(subRes.subCategories || []);
        }

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // ─────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // NOT FOUND
  // ─────────────────────────────────────────
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700">Category Not Found</h1>
          <Link to="/" className="mt-4 inline-block text-blue-800 hover:underline">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── HERO ── */}
      <div className="relative h-[340px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full text-white">

            {/* BREADCRUMB */}
            <div className="flex items-center gap-2 text-sm mb-4">
              <Link to="/" className="text-gray-300 hover:text-white transition">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-white font-medium">{category.name}</span>
            </div>

            {/* TITLE */}
            <h1 className="text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">
              {category.name}
            </h1>

            <p className="mt-4 text-base lg:text-lg text-gray-200 max-w-2xl">
              {category.desc}
            </p>

            <div className="flex flex-wrap gap-4 mt-7">
              <button className="bg-orange-600 hover:bg-orange-700 transition px-6 py-3 rounded-2xl font-semibold">
                Get Best Price
              </button>
              <button className="bg-white text-black hover:bg-gray-200 transition px-6 py-3 rounded-2xl font-semibold">
                Contact Suppliers
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── SUBCATEGORIES ── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">

        {/* HEADING */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Browse {category.name} Categories
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {subCategories.length} categories found
          </p>
        </div>

        {/* GRID */}
        {subCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {subCategories.map((sub) => (
              <Link
                key={sub._id}
                to={`/category/${category.slug}/subcategory/${sub.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition duration-300"
              >
                {/* IMAGE */}
                <div className="h-36 overflow-hidden bg-gray-100">
                  {sub.image ? (
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                      No Image
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-1 group-hover:text-blue-800 transition">
                    {sub.name}
                  </h3>
                  {sub.desc && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {sub.desc}
                    </p>
                  )}
                  <p className="text-xs text-blue-800 font-medium mt-2 group-hover:underline">
                    Explore →
                  </p>
                </div>

              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-600">
              No subcategories found
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              Check back soon for updates.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}