import React from "react";
import {
  ShieldCheck,
  Globe2,
  BadgeDollarSign,
  Headphones,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Suppliers",
    desc: "Connect only with trusted and verified manufacturers, exporters, and wholesalers.",
  },
  {
    icon: Globe2,
    title: "Global Marketplace",
    desc: "Expand your business reach with suppliers and buyers from multiple industries worldwide.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Price Deals",
    desc: "Receive competitive quotations from multiple suppliers and compare pricing easily.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Dedicated customer support team to help buyers and sellers anytime they need assistance.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-14">

          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            Why Businesses Trust Us
          </div>

          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            Why Choose{" "}
            <span className="text-blue-800">
              Our Marketplace
            </span>
          </h2>

          <p className="mt-2 text-slate-600 max-w-2xl">
            We help businesses connect with trusted suppliers, discover quality
            products, and grow faster through secure B2B trade solutions.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-7 border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
              >

                {/* TOP LINE */}
                <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* ICON */}
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-all duration-500">
                  <Icon className="w-8 h-8 text-orange-600 group-hover:text-white transition duration-500" />
                </div>

                {/* TITLE */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">
                    {feature.title}
                  </h3>

                  <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-orange-600 transition duration-500" />
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {feature.desc}
                </p>

                {/* FOOTER */}
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  Trusted B2B Solution
                </div>

                {/* BLUR EFFECT */}
                <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-orange-100 rounded-full blur-3xl group-hover:bg-orange-200 transition-all duration-500"></div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}