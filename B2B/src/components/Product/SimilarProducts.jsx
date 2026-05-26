import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";

const similarProducts = [
  {
    id: 2,
    name: "Heavy Duty Work Gloves",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
    company: "WorkSafe Co.",
    location: "Delhi, India",
    price: "₹180 / Pair",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Chemical Resistant Gloves",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=600&auto=format&fit=crop",
    company: "ProShield Ltd.",
    location: "Pune, India",
    price: "₹320 / Pair",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Cut Resistant Gloves",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop",
    company: "SafeHands Inc.",
    location: "Chennai, India",
    price: "₹290 / Pair",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Welding Safety Gloves",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
    company: "WeldPro Supplies",
    location: "Surat, India",
    price: "₹420 / Pair",
    rating: 4.8,
  },
];

export default function SimilarProducts() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-900">Similar Products</h2>
        <Link
          to="/products"
          className="text-sm text-blue-800 hover:underline font-medium"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {similarProducts.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-16 h-16 rounded-lg object-cover shrink-0"
            />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-800 truncate transition-colors">
                {p.name}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-slate-500">{p.rating}</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-orange-600" />
                <span className="text-xs text-slate-500 truncate">{p.location}</span>
              </div>
              <p className="text-sm font-bold text-blue-800 mt-1">{p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}