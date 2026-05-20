import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div>

      {/* HEADING */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-2">
            Explore top products from verified suppliers
          </p>
        </div>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}