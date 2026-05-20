
import React from "react";
import {
  Search,
  MessageSquareMore,
  BadgeDollarSign,
  Handshake,
} from "lucide-react";

const steps = [
  {
    id: "01",
    icon: Search,
    title: "Search Products",
    desc: "Browse thousands of industrial and wholesale products from verified suppliers.",
  },
  {
    id: "02",
    icon: MessageSquareMore,
    title: "Send Inquiry",
    desc: "Submit your requirements and connect directly with trusted manufacturers.",
  },
  {
    id: "03",
    icon: BadgeDollarSign,
    title: "Receive Quotes",
    desc: "Get multiple competitive quotations from suppliers within minutes.",
  },
  {
    id: "04",
    icon: Handshake,
    title: "Close Deals",
    desc: "Compare offers, negotiate pricing, and finalize your business deals easily.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            How Marketplace Works
          </div>

          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            How It{" "}
            <span className="text-blue-800">Works</span>
          </h2>

          <p className="mt-2 text-slate-600 max-w-2xl">
            Connect buyers and suppliers in a few simple steps and grow your
            business faster with our B2B marketplace platform.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="group relative bg-white rounded-3xl p-7 border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden flex flex-col"
              >

                {/* TOP LINE */}
                <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* STEP NUMBER */}
                <div className="absolute top-5 right-5 text-5xl font-bold text-gray-100 group-hover:text-orange-100 transition duration-500">
                  {step.id}
                </div>

                {/* ICON */}
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-all duration-500 relative z-10">
                  <Icon className="w-8 h-8 text-orange-600 group-hover:text-white transition duration-500" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10">
                  {step.title}
                </h3>

                {/* DESC */}
                <p className="text-gray-600 leading-relaxed text-sm flex-grow relative z-10">
                  {step.desc}
                </p>

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