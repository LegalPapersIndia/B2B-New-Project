

// src/components/Home/FeaturedProducts.jsx

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ShoppingBag, TrendingUp } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../api/productApi";

const FeaturedProducts = () => {
  const scrollRef   = useRef(null);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedProducts();
        if (data.success) setProducts(data.products);
      } catch (err) {
        console.error("FeaturedProducts error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
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
  }, [isHovered, products]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "next" ? 300 : -300, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-[260px] h-[360px] bg-gray-200 rounded-2xl animate-pulse flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!loading && products.length === 0) return null;

  return (
    <section className="bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            <TrendingUp className="w-4 h-4" />
            Trending Industrial Products
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Featured <span className="text-blue-800">Products</span>
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl text-sm md:text-base">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-2.5 rounded-full
              hidden sm:flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition -translate-x-1/2"
          >
            <FaChevronLeft className="text-gray-700" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => scroll("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-2.5 rounded-full
              hidden sm:flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition translate-x-1/2"
          >
            <FaChevronRight className="text-gray-700" />
          </button>

          {/* SCROLL AREA */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {[...products, ...products].map((product, index) => (
              <motion.div
                key={`${product._id}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col flex-shrink-0 w-[240px] sm:w-[270px] md:w-[290px]"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="h-44 md:h-48 w-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  ) : (
                    <div className="h-44 md:h-48 w-full bg-gray-100 flex items-center justify-center text-gray-300 text-sm">
                      No Image
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col flex-1">

                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-800 line-clamp-2 min-h-[48px] transition">
                    {product.title}
                  </h3>

                 <p className="text-sm font-medium text-slate-600 mb-1">
  {product.seller?.companyName || product.seller?.name || "—"}
</p>

                  {(product.seller?.city || product.seller?.state) && (
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
                      <MapPin className="w-3 h-3 text-orange-600 flex-shrink-0" />
                      {[product.seller?.city, product.seller?.state].filter(Boolean).join(", ")}
                    </div>
                  )}

                  <div className="mt-auto">
                    <div className="mb-1">
                      <span className="text-xl font-bold text-blue-800">
                        ₹{product.price?.toLocaleString()}
                      </span>
                      <span className="text-gray-400 text-xs ml-1">/ {product.unit}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">MOQ: {product.moq} {product.unit}</p>

                    <Link
                      to={`/category/${product.category?.slug}/subcategory/${product.subcategory?.slug}/product/${product.slug}`}
                      className="w-full bg-orange-600 hover:bg-blue-800 text-white py-2.5 rounded-xl font-semibold transition flex items-center justify-center gap-2 text-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;