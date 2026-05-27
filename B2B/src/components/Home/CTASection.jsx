// // CTASection.jsx

// import React from "react";
// import { ArrowRight, BadgeCheck, Users, Globe } from "lucide-react";

// export default function CTASection() {
//   return (
//     <section className="bg-white">
//       <div className="max-w-[1400px] mx-auto px-4 py-12">

//         <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 px-6 md:px-14 py-14 md:py-16">

//           {/* BACKGROUND GLOW */}
//           <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

//           {/* CONTENT */}
//           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

//             {/* LEFT */}
//             <div className="max-w-2xl">

//               <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-widest mb-4">
//                 <BadgeCheck className="w-4 h-4" />
//                 Trusted B2B Marketplace
//               </div>

//               <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
//                 Grow Your Business With{" "}
//                 <span className="text-orange-400">
//                   Verified Buyers & Suppliers
//                 </span>
//               </h2>

//               <p className="mt-5 text-gray-300 text-lg leading-relaxed">
//                 Join thousands of manufacturers, exporters, wholesalers, and
//                 buyers connecting daily for genuine B2B business opportunities.
//               </p>

//               {/* STATS */}
//               <div className="flex flex-wrap gap-6 mt-8">

//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
//                     <Users className="w-6 h-6 text-orange-400" />
//                   </div>

//                   <div>
//                     <h4 className="text-white font-bold text-lg">
//                       50K+
//                     </h4>
//                     <p className="text-gray-300 text-sm">
//                       Active Buyers
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
//                     <Globe className="w-6 h-6 text-orange-400" />
//                   </div>

//                   <div>
//                     <h4 className="text-white font-bold text-lg">
//                       120+
//                     </h4>
//                     <p className="text-gray-300 text-sm">
//                       Countries Connected
//                     </p>
//                   </div>
//                 </div>

//               </div>
//             </div>

//             {/* RIGHT */}
//             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

//               <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300 flex items-center justify-center gap-2 shadow-lg">
//                 Start Selling
//                 <ArrowRight className="w-5 h-5" />
//               </button>

//               <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300 backdrop-blur-sm">
//                 Post Buy Requirement
//               </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




// CTASection.jsx

import React, { useState } from "react";
import { ArrowRight, BadgeCheck, Users, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import PostRequirementModal from "../common/PostRequirementModal";

export default function CTASection() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="bg-white">

      {showModal && createPortal(
        <PostRequirementModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />,
        document.body
      )}

      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 px-6 md:px-14 py-14 md:py-16">

          <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* LEFT */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-widest mb-4">
                <BadgeCheck className="w-4 h-4" />
                Trusted B2B Marketplace
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Grow Your Business With{" "}
                <span className="text-orange-400">
                  Verified Buyers & Suppliers
                </span>
              </h2>

              <p className="mt-5 text-gray-300 text-lg leading-relaxed">
                Join thousands of manufacturers, exporters, wholesalers, and
                buyers connecting daily for genuine B2B business opportunities.
              </p>

              {/* STATS */}
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">50K+</h4>
                    <p className="text-gray-300 text-sm">Active Buyers</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">120+</h4>
                    <p className="text-gray-300 text-sm">Countries Connected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

              {/* SELLER REGISTRATION */}
              <button
                onClick={() => navigate("/register")}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                Start Selling
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* POST REQUIREMENT MODAL */}
              <button
                onClick={() => setShowModal(true)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300 backdrop-blur-sm"
              >
                Post Buy Requirement
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}