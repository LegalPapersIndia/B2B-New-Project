// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import HeroCarousel from "../components/Home/HeroCarousel";
import Sidebar from "../components/Home/SideBar";
import ActionSidebar from "../components/Home/ActionSide";
import CategoryShowcase from "../components/Home/CategoryShowcase";
import TrendingCategories from "../components/Home/TrendingCategories";
import TrustedSuppliers from "../components/Home/TrustedSuppliers";
import ManufacturingHubs from "../components/Home/ManufacturingHubs";
import HowItWorks from "../components/Home/HowItWorks";
import WhyChooseUs from "../components/Home/WhyChooseUs";
// import LatestBuyRequirements from "../components/Home/LatestBuyRequirements";
import MarketplaceStats from "../components/Home/MarketplaceStats";
import Testimonials from "../components/Home/Testimonials";
import CTASection from "../components/Home/CTASection";
import PostRequirementModal from "../components/common/PostRequirementModal";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function Home() {
  const [showRequirement, setShowRequirement] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRequirement(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION LAYOUT */}
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative flex flex-col lg:flex-row gap-6 xl:gap-8">
          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:block lg:w-72 xl:w-80 shrink-0">
            <div className="sticky top-6">
              <Sidebar />
            </div>
          </aside>

          {/* HERO */}
          <div className="flex-1 min-w-0">
            <HeroCarousel />
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden xl:block xl:w-80 shrink-0">
            <div className="sticky top-6">
              <ActionSidebar />
            </div>
          </aside>
        </div>
      </div>

      {/* BELOW HERO SECTIONS */}
      <div className="space-y-20 mt-12">
        <TrendingCategories />
        <TrustedSuppliers />
        <CategoryShowcase />
        <ManufacturingHubs />
        <HowItWorks />
        <WhyChooseUs />
        {/* <LatestBuyRequirements /> */}
        <MarketplaceStats />
        <Testimonials />
        <CTASection />
      </div>
      <PostRequirementModal
        isOpen={showRequirement}
        onClose={() => setShowRequirement(false)}
      />

      {/* SCROLL BUTTONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-blue-800 hover:bg-blue-900 text-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <button
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
          className="bg-orange-600 hover:bg-orange-700 text-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
