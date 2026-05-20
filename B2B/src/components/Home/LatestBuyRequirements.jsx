import React from "react";
import {
  MapPin,
  Clock3,
  BadgeCheck,
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";

const requirements = [
  {
    id: 1,
    title: "Looking for Industrial Packaging Machines",
    company: "RK Packaging Pvt Ltd",
    quantity: "Required Quantity: 10 Units",
    location: "Delhi, India",
    time: "2 Hours Ago",
  },
  {
    id: 2,
    title: "Need Pharmaceutical Raw Materials",
    company: "MediCare Industries",
    quantity: "Required Quantity: 500 Kg",
    location: "Mumbai, India",
    time: "5 Hours Ago",
  },
  {
    id: 3,
    title: "Bulk Requirement for Cotton Fabric",
    company: "Textile Hub Ltd",
    quantity: "Required Quantity: 20 Tons",
    location: "Surat, India",
    time: "1 Day Ago",
  },
  {
    id: 4,
    title: "Searching for Electric Motors Supplier",
    company: "PowerTech Engineering",
    quantity: "Required Quantity: 50 Pieces",
    location: "Ahmedabad, India",
    time: "3 Hours Ago",
  },
];

export default function LatestBuyRequirements() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-14">

          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            Latest Buyer Requirements
          </div>

          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            Recent{" "}
            <span className="text-blue-800">
              Buy Leads
            </span>
          </h2>

          <p className="mt-2 text-slate-600 max-w-2xl">
            Explore the latest business inquiries posted by buyers looking for
            trusted suppliers and manufacturers.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {requirements.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-3xl p-7 border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden flex flex-col"
            >

              {/* TOP LINE */}
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* ICON */}
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-all duration-500">
                <BriefcaseBusiness className="w-8 h-8 text-orange-600 group-hover:text-white transition duration-500" />
              </div>

              {/* VERIFIED */}
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-4">
                <BadgeCheck className="w-4 h-4" />
                Verified Buyer
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug min-h-[84px]">
                {item.title}
              </h3>

              {/* COMPANY */}
              <p className="text-gray-700 font-medium mb-3">
                {item.company}
              </p>

              {/* QUANTITY */}
              <p className="text-sm text-gray-600 mb-4">
                {item.quantity}
              </p>

              {/* LOCATION */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <MapPin className="w-4 h-4 text-orange-600" />
                {item.location}
              </div>

              {/* TIME */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Clock3 className="w-4 h-4 text-orange-600" />
                {item.time}
              </div>

              {/* BUTTON */}
              <button className="mt-auto w-full bg-orange-600 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                Send Quote
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* BLUR EFFECT */}
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-orange-100 rounded-full blur-3xl group-hover:bg-orange-200 transition-all duration-500"></div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}