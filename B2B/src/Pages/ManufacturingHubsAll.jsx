import React from "react";
import {
  MapPin,
  Star,
  ArrowRight,
  Factory,
  Building2,
  BadgeCheck,
} from "lucide-react";

// IMAGES
import delhi from "../assets/delhi.jpg";
import mumbai from "../assets/mumbai.jpg";
import surat from "../assets/Surat.jpg";
import ahmedabad from "../assets/ahmedabad.jpg";
import bengaluru from "../assets/Bengaluru.jpg";

const hubs = [
  {
    city: "Delhi NCR",
    image: delhi,
    suppliers: "2.4K+",
    rating: 4.8,
    description:
      "India’s leading industrial and electronics manufacturing region with thousands of verified suppliers.",
    industries: ["Electronics", "Auto", "Apparel", "Machinery"],
  },
  {
    city: "Mumbai",
    image: mumbai,
    suppliers: "3.8K+",
    rating: 4.9,
    description:
      "Major hub for pharma, export businesses, textiles and large-scale packaging industries.",
    industries: ["Pharma", "Textiles", "Packaging", "Chemicals"],
  },
  {
    city: "Ahmedabad",
    image: ahmedabad,
    suppliers: "5.1K+",
    rating: 4.7,
    description:
      "Known for textile industries, chemical production and industrial machinery manufacturers.",
    industries: ["Textiles", "Chemicals", "Machinery", "Plastic"],
  },
  {
    city: "Bengaluru",
    image: bengaluru,
    suppliers: "2.9K+",
    rating: 4.8,
    description:
      "Fast-growing manufacturing ecosystem focused on electronics, aerospace and IT hardware.",
    industries: ["Electronics", "Aerospace", "IT", "Automation"],
  },
  {
    city: "Surat",
    image: surat,
    suppliers: "6.7K+",
    rating: 4.9,
    description:
      "One of India’s biggest textile and diamond manufacturing cities with global exports.",
    industries: ["Textiles", "Diamonds", "Apparel", "Export"],
  },
    {
    city: "Surat",
    image: surat,
    suppliers: "6.7K+",
    rating: 4.9,
    description:
      "One of India’s biggest textile and diamond manufacturing cities with global exports.",
    industries: ["Textiles", "Diamonds", "Apparel", "Export"],
  },
];

export default function ManufacturingHubsAll() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Factory className="w-4 h-4" />
              India Industrial Network
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Explore India’s Top
              <span className="block text-orange-400">Manufacturing Hubs</span>
            </h1>

            <p className="text-blue-100 text-lg leading-relaxed">
              Connect with verified suppliers, manufacturers, exporters and
              industrial businesses across India’s leading production cities.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <h3 className="text-3xl font-bold">20K+</h3>
                <p className="text-sm text-blue-100 mt-1">Suppliers</p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <h3 className="text-3xl font-bold">120+</h3>
                <p className="text-sm text-blue-100 mt-1">Industries</p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="text-sm text-blue-100 mt-1">Cities</p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <h3 className="text-3xl font-bold">99%</h3>
                <p className="text-sm text-blue-100 mt-1">Verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HUBS SECTION */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          {/* TITLE */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Popular Industrial Cities
            </h2>

            <p className="text-slate-600 max-w-2xl mx-auto">
              Browse verified manufacturing cities and discover trusted
              suppliers across multiple industries.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {hubs.map((hub, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                {/* IMAGE */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={hub.image}
                    alt={hub.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* RATING */}
                  <div className="absolute top-5 right-5 bg-white text-slate-900 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold shadow">
                    <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                    {hub.rating}
                  </div>

                  {/* CITY */}
                  <div className="absolute bottom-5 left-5 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-orange-400" />

                      <h3 className="text-2xl font-bold">{hub.city}</h3>
                    </div>

                    <p className="text-sm text-slate-200">
                      {hub.suppliers} Suppliers Available
                    </p>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-7">
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {hub.description}
                  </p>

                  {/* INDUSTRIES */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {hub.industries.map((industry, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>

                  {/* FEATURES */}
                  <div className="space-y-3 mb-7">
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <BadgeCheck className="w-4 h-4 text-green-600" />
                      Verified Manufacturers
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Building2 className="w-4 h-4 text-blue-700" />
                      Multiple Industry Categories
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Factory className="w-4 h-4 text-orange-600" />
                      Export & Wholesale Suppliers
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button
                    className="w-full bg-blue-800 hover:bg-blue-900
                               text-white py-4 rounded-2xl font-semibold
                               flex items-center justify-center gap-2
                               transition-all duration-300"
                  >
                    Explore Suppliers
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
