import React, { useEffect, useState } from "react";
import {
  Users,
  PackageCheck,
  MapPinned,
  ShoppingBag,
  BarChart,
  Star,
  Globe,
  Truck,
} from "lucide-react";
import { getMarketplaceStats } from "../../api/marketplaceStatApi";

// Icon name => component mapping
const ICON_MAP = {
  Users,
  PackageCheck,
  MapPinned,
  ShoppingBag,
  BarChart,
  Star,
  Globe,
  Truck,
};

export default function MarketplaceStats() {
  const [stats, setStats]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMarketplaceStats()
      .then((data) => setStats(data.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            Marketplace Growth
          </div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            Trusted By Thousands Of{" "}
            <span className="text-blue-800">Businesses</span>
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Helping buyers and suppliers connect globally through trusted B2B
            trade and wholesale solutions.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* STATS GRID */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {stats.map((item) => {
              const Icon = ICON_MAP[item.icon] || BarChart;

              return (
                <div
                  key={item._id}
                  className="group relative bg-white rounded-3xl p-7 border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden text-center"
                >
                  {/* TOP LINE */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* ICON */}
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-100 flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-all duration-500">
                    <Icon className="w-8 h-8 text-orange-600 group-hover:text-white transition duration-500" />
                  </div>

                  {/* NUMBER */}
                  <h3 className="text-4xl font-extrabold text-slate-900 mb-3">
                    {item.number}
                  </h3>

                  {/* LABEL */}
                  <p className="text-slate-600 font-medium">{item.label}</p>

                  {/* BLUR EFFECT */}
                  <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-orange-100 rounded-full blur-3xl group-hover:bg-orange-200 transition-all duration-500" />
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}