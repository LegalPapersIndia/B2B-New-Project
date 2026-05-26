// import React, {
//   useRef,
//   useEffect,
//   useState,
// } from "react";

// import {
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// import { Link } from "react-router-dom";

// // =========================
// // PRODUCT CARD
// // =========================
// function ProductCard({
//   img,
//   title,
//   categorySlug,
//   subcategory,
// }) {

//   return (

//     <Link
//       to={`/category/${categorySlug}/subcategory/${subcategory}`}
//       className="relative w-[270px] h-[190px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group block"
//     >

//       <img
//         src={img}
//         alt={title}
//         className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//       />

//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

//       <div className="absolute bottom-3 left-3 text-white">

//         <h4 className="text-base font-semibold">

//           {title}

//         </h4>

//         <p className="text-xs text-gray-200">

//           Verified Supplier

//         </p>

//       </div>

//     </Link>

//   );

// }

// // =========================
// // MAIN COMPONENT
// // =========================
// export default function ProductStrip({

//   items = [],

//   categorySlug,

// }) {

//   const scrollRef = useRef(null);

//   const intervalRef = useRef(null);

//   const [isHovered, setIsHovered] =
//     useState(false);

//   const limited = items.slice(0, 10);

//   // =========================
//   // AUTO SCROLL
//   // =========================
//   useEffect(() => {

//     const el = scrollRef.current;

//     if (!el) return;

//     const startAutoScroll = () => {

//       intervalRef.current = setInterval(() => {

//         if (!el || isHovered) return;

//         el.scrollLeft += 1;

//         // LOOP RESET
//         if (
//           el.scrollLeft >=
//           el.scrollWidth / 2
//         ) {

//           el.scrollLeft = 0;

//         }

//       }, 16);

//     };

//     startAutoScroll();

//     return () =>
//       clearInterval(intervalRef.current);

//   }, [isHovered]);

//   // =========================
//   // BUTTON SCROLL
//   // =========================
//   const scroll = (dir) => {

//     const el = scrollRef.current;

//     if (!el) return;

//     const amount = 320;

//     el.scrollBy({

//       left:
//         dir === "next"
//           ? amount
//           : -amount,

//       behavior: "smooth",

//     });

//   };

//   return (

//     <div
//       className="relative w-full mt-10 group"
//       onMouseEnter={() =>
//         setIsHovered(true)
//       }
//       onMouseLeave={() =>
//         setIsHovered(false)
//       }
//     >

//       {/* LEFT BUTTON */}
//       <button
//         onClick={() => scroll("prev")}
//         className="absolute left-2 top-1/2 -translate-y-1/2 z-20
//                    bg-white/90 hover:bg-white shadow-md p-3 rounded-full
//                    opacity-0 group-hover:opacity-100 transition"
//       >

//         <FaChevronLeft />

//       </button>

//       {/* RIGHT BUTTON */}
//       <button
//         onClick={() => scroll("next")}
//         className="absolute right-2 top-1/2 -translate-y-1/2 z-20
//                    bg-white/90 hover:bg-white shadow-md p-3 rounded-full
//                    opacity-0 group-hover:opacity-100 transition"
//       >

//         <FaChevronRight />

//       </button>

//       {/* SCROLL AREA */}
//       <div
//         ref={scrollRef}
//         className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
//       >

//         {[...limited, ...limited].map(
//           (item, i) => (

//             <ProductCard
//               key={i}
//               img={item.img}
//               title={item.title}
//               categorySlug={categorySlug}
//               subcategory={
//                 item.subcategory
//               }
//             />

//           )
//         )}

//       </div>

//       {/* HIDE SCROLLBAR */}
//       <style>
//         {`
//           .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//           }
//         `}
//       </style>

//     </div>

//   );

// }


import React, {
  useRef,
  useEffect,
  useState,
} from "react";

import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { getSubCategories } from "../../api/subCategoryApi";

// =========================
// PRODUCT CARD
// =========================
function ProductCard({
  img,
  title,
  categorySlug,
  subcategory,
}) {
  return (
    <Link
      to={`/category/${categorySlug}/subcategory/${subcategory}`}
      className="relative w-[270px] h-[190px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group block"
    >
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-3 left-3 text-white">
        <h4 className="text-base font-semibold">
          {title}
        </h4>

        <p className="text-xs text-gray-200">
          Verified Supplier
        </p>
      </div>
    </Link>
  );
}

// =========================
// MAIN COMPONENT
// =========================
export default function ProductStrip({
  categorySlug,
}) {
  const scrollRef = useRef(null);

  const intervalRef = useRef(null);

  const [isHovered, setIsHovered] =
    useState(false);

  const [subCategories, setSubCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // FETCH SUBCATEGORIES
  // =========================
  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      setLoading(true);

      const data =
        await getSubCategories();

      setSubCategories(
        data.subCategories || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LIMIT + DUPLICATE
  // =========================
  
  const filteredSubCategories =
  subCategories.filter(
    (item) =>
      item.category?.slug ===
      categorySlug
  );

const limited =
  filteredSubCategories.slice(0, 10);

  const duplicatedItems = limited;

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    intervalRef.current = setInterval(
      () => {
        if (isHovered) return;

        el.scrollLeft += 1;

        // RESET FOR INFINITE LOOP
      if (
  el.scrollLeft + el.clientWidth >=
  el.scrollWidth
) {
  el.scrollLeft = 0;
}
      },
      16
    );

    return () =>
      clearInterval(intervalRef.current);
  }, [isHovered]);

  // =========================
  // BUTTON SCROLL
  // =========================
  const scroll = (dir) => {
    const el = scrollRef.current;

    if (!el) return;

    const amount = 320;

    el.scrollBy({
      left:
        dir === "next"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="relative w-full mt-10 group"
      onMouseEnter={() =>
        setIsHovered(true)
      }
      onMouseLeave={() =>
        setIsHovered(false)
      }
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
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {loading ? (
          <p className="text-white p-4">
            Loading...
          </p>
        ) : limited.length > 0 ? (
          duplicatedItems.map(
            (item, i) => (
              <ProductCard
                key={`${item._id}-${i}`}
                img={item.image}
                title={item.name}
                categorySlug={
                  item.category?.slug ||
                  "category"
                }
                subcategory={item.slug}
              />
            )
          )
        ) : (
          <p className="text-gray-400 p-4">
            No subcategories found
          </p>
        )}
      </div>

      {/* HIDE SCROLLBAR */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}