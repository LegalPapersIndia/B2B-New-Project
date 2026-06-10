

// src/components/Home/Testimonials.jsx
import React, { useRef, useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getTestimonials } from "../../api/testimonialApi";

export default function Testimonials() {
  const scrollRef   = useRef(null);
  const intervalRef = useRef(null);
  const [isHovered,     setIsHovered]     = useState(false);
  const [testimonials,  setTestimonials]  = useState([]);
  const [loading,       setLoading]       = useState(true);

  useEffect(() => {
    getTestimonials()
      .then(data => setTestimonials(data.testimonials || []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  // AUTO SCROLL
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || testimonials.length === 0) return;
    intervalRef.current = setInterval(() => {
      if (!el || isHovered) return;
      el.scrollLeft += 1;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
    }, 16);
    return () => clearInterval(intervalRef.current);
  }, [isHovered, testimonials]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "next" ? 300 : -300, behavior: "smooth" });
  };

  if (loading) return (
    <section className="bg-white py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex gap-6 overflow-hidden">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-[300px] h-[280px] bg-gray-100 rounded-3xl animate-pulse flex-shrink-0" />
          ))}
        </div>
      </div>
    </section>
  );

  if (!loading && testimonials.length === 0) return null;

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            Client Success Stories
          </div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            What Our{" "}
            <span className="text-blue-800">Clients Say</span>
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Thousands of buyers and suppliers trust our marketplace for secure
            business connections and quality trade opportunities.
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
            className="flex gap-6 overflow-x-auto pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={`${item._id}-${index}`}
                className="group/card relative bg-white rounded-3xl p-7 border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden flex flex-col flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]"
              >
                {/* TOP LINE */}
                <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left" />

                {/* QUOTE ICON */}
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 group-hover/card:bg-orange-600 transition-all duration-500">
                  <Quote className="w-7 h-7 text-orange-600 group-hover/card:text-white transition duration-500" />
                </div>

                {/* REVIEW */}
                <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-grow line-clamp-4">
                  "{item.review}"
                </p>

                {/* STARS */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* USER */}
                <div className="flex items-center gap-4">
                  {item.image?.url ? (
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-orange-100 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl flex-shrink-0">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                    <p className="text-sm text-slate-500">{item.company}</p>
                  </div>
                </div>

                {/* BLUR EFFECT */}
                <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-orange-100 rounded-full blur-3xl group-hover/card:bg-orange-200 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}