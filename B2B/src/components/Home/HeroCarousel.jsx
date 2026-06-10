
// src/Components/HeroCarousel.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// LOCAL IMAGES (assets)
import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.jpg";

const slides = [
  {
    id: 1,
    bgImage: hero1,
    title: "Connect With Verified Suppliers",
    subtitle:
      "Find trusted manufacturers, wholesalers & exporters across India and global markets",
    accent: "text-[#F54900]",
  },
  {
    id: 2,
    bgImage: hero2,
    title: "Grow Your B2B Business Fast",
    subtitle:
      "Get direct buyer leads, increase visibility & expand your wholesale network",
    accent: "text-[#1447E6]",
  },
  {
    id: 3,
    bgImage: hero3,
    title: "Safe & Trusted Marketplace",
    subtitle:
      "Verified companies • Secure enquiries • Reliable business connections",
    accent: "text-[#F54900]",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[70vh] rounded-3xl overflow-hidden shadow-xl bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* IMAGES */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={false}
          animate={{
            opacity: index === current ? 1 : 0,
            scale: index === current ? 1 : 1.08,
          }}
          transition={{
            opacity: { duration: 1.2 },
            scale: { duration: 6 },
          }}
          className="absolute inset-0"
        >
          {/* BACKGROUND */}
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
          </div>
        </motion.div>
      ))}

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-14 text-white">
        
        {/* Badge */}
        <div className="mb-5">
          <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm tracking-widest">
            B2B MARKETPLACE PLATFORM
          </span>
        </div>

        {/* TITLE */}
        <motion.h1
          key={slides[current].title}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-4xl"
        >
          {slides[current].title}
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          key={slides[current].subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-5 text-gray-200 text-sm sm:text-lg max-w-2xl"
        >
          {slides[current].subtitle}
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/"
            className="bg-[#F54900] hover:bg-orange-700 transition px-8 py-4 rounded-2xl font-semibold text-center shadow-lg"
          >
            Explore Products
          </Link>

          <Link
            to="/register"
            className="bg-white/10 hover:bg-white/20 border border-white/30 transition px-8 py-4 rounded-2xl font-semibold text-center"
          >
            Become a Seller
          </Link>
        </motion.div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === current ? "bg-[#F54900] scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;

