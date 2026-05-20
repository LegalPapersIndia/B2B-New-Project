// src/components/TopCategories.jsx

import React from "react";
import {
  Factory,
  Wheat,
  Shirt,
  Cpu,
  Truck,
  FlaskConical,
  Package,
  Hammer,
} from "lucide-react";

const categories = [
  {
    title: "Industrial Machinery",
    icon: Factory,
    products: "12k+ Products",
  },
  {
    title: "Agriculture",
    icon: Wheat,
    products: "8k+ Products",
  },
  {
    title: "Textiles & Garments",
    icon: Shirt,
    products: "15k+ Products",
  },
  {
    title: "Electronics",
    icon: Cpu,
    products: "10k+ Products",
  },
  {
    title: "Transportation",
    icon: Truck,
    products: "5k+ Products",
  },
  {
    title: "Chemicals",
    icon: FlaskConical,
    products: "7k+ Products",
  },
  {
    title: "Packaging",
    icon: Package,
    products: "4k+ Products",
  },
  {
    title: "Construction",
    icon: Hammer,
    products: "9k+ Products",
  },
];

const TopCategories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <hr className="w-16 border-[#C89A31]" />
            <span className="text-[#C89A31] font-semibold tracking-widest uppercase text-sm">
              Top Categories
            </span>
            <hr className="w-16 border-[#C89A31]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Explore Popular <span className="text-[#C89A31]">Industries</span>
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg">
            Discover trusted suppliers, manufacturers, and wholesalers across
            multiple industrial categories worldwide.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <div
                key={index}
                className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center mb-6 group-hover:bg-[#C89A31] transition-all duration-300">
                  <Icon
                    size={32}
                    className="text-[#C89A31] group-hover:text-white transition-all duration-300"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>

                <p className="text-gray-500 mb-5">
                  {category.products}
                </p>

                {/* Button */}
                <button className="bg-blue-800 hover:bg-blue-900 text-white px-5 py-2.5 rounded-xl transition-all duration-300">
                  Explore
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;