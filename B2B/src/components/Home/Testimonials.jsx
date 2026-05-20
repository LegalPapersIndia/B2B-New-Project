import React from "react";
import { Star, Quote } from "lucide-react";

import user1 from "../../assets/hero1.jpg";
import user2 from "../../assets/hero2.jpg";
import user3 from "../../assets/hero3.jpg";
import user4 from "../../assets/hero1.jpg";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    company: "RS Packaging Pvt Ltd",
    image: user1,
    review:
      "We received genuine supplier inquiries within hours. The platform helped us expand our wholesale business quickly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Aman Verma",
    company: "Verma Textiles",
    image: user2,
    review:
      "Very smooth experience for bulk product sourcing. Verified suppliers and quick quotations saved us a lot of time.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Mehta",
    company: "Mehta Pharma",
    image: user3,
    review:
      "The best B2B marketplace experience we have used so far. Clean interface and quality business leads.",
    rating: 5,
  },
  {
    id: 4,
    name: "Karan Gupta",
    company: "Gupta Engineering Works",
    image: user4,
    review:
      "Our sales inquiries increased significantly after joining the platform. Highly recommended for manufacturers.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-14">

          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            Client Success Stories
          </div>

          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            What Our{" "}
            <span className="text-blue-800">
              Clients Say
            </span>
          </h2>

          <p className="mt-2 text-slate-600 max-w-2xl">
            Thousands of buyers and suppliers trust our marketplace for secure
            business connections and quality trade opportunities.
          </p>
        </div>

        {/* TESTIMONIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-3xl p-7 border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden flex flex-col"
            >

              {/* TOP LINE */}
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* QUOTE ICON */}
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-all duration-500">
                <Quote className="w-7 h-7 text-orange-600 group-hover:text-white transition duration-500" />
              </div>

              {/* REVIEW */}
              <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-grow">
                "{item.review}"
              </p>

              {/* STARS */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* USER */}
              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-orange-100"
                />

                <div>
                  <h4 className="font-bold text-slate-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {item.company}
                  </p>
                </div>
              </div>

              {/* BLUR EFFECT */}
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-orange-100 rounded-full blur-3xl group-hover:bg-orange-200 transition-all duration-500"></div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}