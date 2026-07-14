// // src/Pages/RefundPolicy.jsx
// import React from "react";

// const RefundPolicy = () => {
//   return (
//     <div className="min-h-screen bg-white">

//       {/* ================= HERO ================= */}
//       <section className="relative py-24 overflow-hidden">

//         <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-orange-600" />

//         <div className="relative max-w-5xl mx-auto px-6 text-center">

//           <h1 className="text-4xl md:text-6xl font-black text-white">
//             Refund & <span className="text-orange-500">Cancellation Policy</span>
//           </h1>

//           <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
//             Transparent and fair refund process designed to protect both buyers and sellers on our platform.
//           </p>

//         </div>
//       </section>

//       {/* ================= CONTENT ================= */}
//       <div className="py-16 px-6 md:px-12 lg:px-20">

//         <div className="max-w-5xl mx-auto text-gray-700 leading-relaxed">

//           <p className="mb-10">
//             At B2B Portal ("we", "us", or "our"), we aim to provide a secure and transparent marketplace.
//             This Refund Policy explains the conditions under which refunds and cancellations are processed.
//           </p>

//           {/* SECTION 1 */}
//           <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
//             1. Order Cancellation
//           </h2>

//           <ul className="list-disc pl-6 space-y-3">
//             <li>Orders can be cancelled before they are processed or shipped.</li>
//             <li>Once an order is confirmed with the supplier, cancellation may not be possible.</li>
//             <li>Custom or made-to-order products cannot be cancelled after production starts.</li>
//           </ul>

//           {/* SECTION 2 */}
//           <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
//             2. Refund Eligibility
//           </h2>

//           <ul className="list-disc pl-6 space-y-3">
//             <li>Refunds are applicable only for damaged, defective, or incorrect products.</li>
//             <li>Request must be raised within 3–7 business days of delivery.</li>
//             <li>Refund approval depends on supplier verification and product inspection.</li>
//           </ul>

//           {/* SECTION 3 */}
//           <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
//             3. Non-Refundable Cases
//           </h2>

//           <ul className="list-disc pl-6 space-y-3">
//             <li>Change of mind after order confirmation.</li>
//             <li>Delay caused by logistics or customs.</li>
//             <li>Used or altered products after delivery.</li>
//             <li>Digital or non-returnable items.</li>
//           </ul>

//           {/* SECTION 4 */}
//           <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
//             4. Refund Processing Time
//           </h2>

//           <p>
//             Approved refunds are processed within <strong>5–10 business days</strong> and credited to the original payment method.
//             Processing time may vary depending on the bank or payment provider.
//           </p>

//           {/* SECTION 5 */}
//           <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
//             5. Dispute Resolution
//           </h2>

//           <p>
//             In case of disputes between buyer and supplier, our support team will review the case and provide a fair resolution
//             based on evidence and platform policies.
//           </p>

//           {/* CONTACT */}
//           <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
//             6. Contact Support
//           </h2>

//           <div className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl p-6">

//             <p>
//               If you have any questions regarding refunds or cancellations, please contact us:
//             </p>

//             <div className="mt-4 space-y-2 text-gray-800">

//               <p>
//                 <strong>Email:</strong>{" "}
//                 <a href="mailto:support@b2b.in" className="text-orange-600 hover:underline">
//                   support@b2b.in
//                 </a>
//               </p>

//               <p>
//                 <strong>Phone:</strong> +91 75052 66931
//               </p>

//             </div>

//           </div>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default RefundPolicy;




// src/Pages/RefundPolicy.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaUndoAlt,
  FaTimesCircle,
  FaCheckDouble,
  FaBan,
  FaHourglassHalf,
  FaBalanceScale,
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

const RefundPolicy = () => {
  const sections = [
    { id: "cancellation", icon: <FaTimesCircle />,     title: "Order Cancellation" },
    { id: "eligibility",  icon: <FaCheckDouble />,      title: "Refund Eligibility" },
    { id: "nonrefund",    icon: <FaBan />,               title: "Non-Refundable Cases" },
    { id: "processing",   icon: <FaHourglassHalf />,    title: "Refund Processing Time" },
    { id: "dispute",      icon: <FaBalanceScale />,     title: "Dispute Resolution" },
    { id: "contact",      icon: <FaHeadset />,          title: "Contact Support" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO (consistent with rest of site: blue-900→blue-800, py-16, left-aligned) ================= */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="max-w-3xl">

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-5"
            >
              <FaUndoAlt className="w-4 h-4" />
              Legal
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            >
              Refund &
              <span className="block text-orange-400">Cancellation Policy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-blue-100 text-base leading-relaxed mb-6"
            >
              Transparent and fair refund process designed to protect both buyers and sellers on our platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs text-blue-100"
            >
              <FaClock className="w-3.5 h-3.5" />
              Last Updated: July 2026
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10">

            {/* TABLE OF CONTENTS - sticky sidebar, desktop only */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="sticky top-8 bg-white rounded-3xl border border-slate-100 shadow-md p-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">
                  On This Page
                </h3>
                <ul className="space-y-1">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                      >
                        <span className="text-orange-500 group-hover:scale-110 transition-transform duration-300 shrink-0">
                          {s.icon}
                        </span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* MAIN CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-md p-7 sm:p-10 text-slate-700 leading-relaxed"
            >

              <p className="mb-10 text-base md:text-lg">
                At B2B Portal ("we", "us", or "our"), we aim to provide a secure and transparent marketplace.
                This Refund Policy explains the conditions under which refunds and cancellations are processed.
              </p>

              {/* ── SECTION 1 ── */}
              <div id="cancellation" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaTimesCircle />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    1. Order Cancellation
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-3">
                  <li>Orders can be cancelled before they are processed or shipped.</li>
                  <li>Once an order is confirmed with the supplier, cancellation may not be possible.</li>
                  <li>Custom or made-to-order products cannot be cancelled after production starts.</li>
                </ul>
              </div>

              {/* ── SECTION 2 ── */}
              <div id="eligibility" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaCheckDouble />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    2. Refund Eligibility
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-3">
                  <li>Refunds are applicable only for damaged, defective, or incorrect products.</li>
                  <li>Request must be raised within 3–7 business days of delivery.</li>
                  <li>Refund approval depends on supplier verification and product inspection.</li>
                </ul>
              </div>

              {/* ── SECTION 3 ── */}
              <div id="nonrefund" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaBan />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    3. Non-Refundable Cases
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-3">
                  <li>Change of mind after order confirmation.</li>
                  <li>Delay caused by logistics or customs.</li>
                  <li>Used or altered products after delivery.</li>
                  <li>Digital or non-returnable items.</li>
                </ul>
              </div>

              {/* ── SECTION 4 ── */}
              <div id="processing" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaHourglassHalf />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    4. Refund Processing Time
                  </h2>
                </div>
                <p>
                  Approved refunds are processed within <strong>5–10 business days</strong> and credited to the original payment method.
                  Processing time may vary depending on the bank or payment provider.
                </p>
              </div>

              {/* ── SECTION 5 ── */}
              <div id="dispute" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaBalanceScale />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    5. Dispute Resolution
                  </h2>
                </div>
                <p>
                  In case of disputes between buyer and supplier, our support team will review the case and provide a fair resolution
                  based on evidence and platform policies.
                </p>
              </div>

              {/* ── SECTION 6 - CONTACT ── */}
              <div id="contact" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaHeadset />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    6. Contact Support
                  </h2>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mt-2">

                  <p className="text-slate-700">
                    If you have any questions regarding refunds or cancellations, please contact us:
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                        <FaEnvelope className="text-sm" />
                      </div>
                      <a href="mailto:support@b2b.in" className="text-slate-800 hover:text-orange-600 transition-colors">
                        support@b2b.in
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <FaPhoneAlt className="text-sm" />
                      </div>
                      <span className="text-slate-800">+91 75052 66931</span>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default RefundPolicy;