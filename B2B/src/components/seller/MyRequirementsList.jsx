// src/components/seller/MyRequirementsList.jsx

import React from "react";
import { Package, Users, Eye, MessageCircle, Calendar, MapPin, IndianRupee } from "lucide-react";

export default function MyRequirementsList({ requirements, loading }) {

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!requirements || requirements.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-10 text-center">
        <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">You haven't posted any requirement yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requirements.map((r) => (
        <div
          key={r._id}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-4 sm:p-5"
        >
          {/* TOP ROW — Title + Date */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">{r.productName}</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {r.category?.name}
                {r.subCategory?.name ? ` • ${r.subCategory.name}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 flex-shrink-0">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(r.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
              })}
            </div>
          </div>

          {/* DESCRIPTION */}
          {r.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{r.description}</p>
          )}

          {/* DETAILS ROW */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500 mb-4">
            {r.quantity && (
              <span className="flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-orange-500" /> Qty: {r.quantity}
              </span>
            )}
            {r.budget && (
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-orange-500" /> Budget: {r.budget}
              </span>
            )}
            {r.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-500" /> {r.location}
              </span>
            )}
          </div>

          {/* STATS ROW */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-medium">
              <Users className="w-3.5 h-3.5" />
              {r.totalSellersNotified || 0} Notified
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl text-xs font-medium">
              <Eye className="w-3.5 h-3.5" />
              {r.viewedCount || 0} Viewed
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl text-xs font-medium">
              <MessageCircle className="w-3.5 h-3.5" />
              {r.contactedCount || 0} Contacted
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}