import React from "react";
import { MapPin, ShieldCheck } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">

      {/* IMAGE */}
      <div className="overflow-hidden h-56 bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* TITLE */}
        <h3 className="text-xl font-bold text-slate-900 line-clamp-1">
          {product.title}
        </h3>

        {/* DESC */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.desc}
        </p>

        {/* PRICE */}
        <div className="mt-4">
          <span className="text-2xl font-bold text-orange-600">
            ₹{product.price}
          </span>

          <span className="text-sm text-gray-500 ml-1">
            / Piece
          </span>
        </div>

        {/* MOQ */}
        <div className="mt-2 text-sm text-gray-600">
          MOQ: {product.moq}
        </div>

        {/* SUPPLIER */}
        <div className="flex items-center justify-between mt-5">

          <div>
            <h4 className="font-semibold text-slate-800">
              {product.supplier}
            </h4>

            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <MapPin size={14} />
              {product.location}
            </div>
          </div>

          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <ShieldCheck size={16} />
            Verified
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">

          <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition">
            Get Best Price
          </button>

          <button className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold transition">
            Contact
          </button>

        </div>

      </div>
    </div>
  );
}