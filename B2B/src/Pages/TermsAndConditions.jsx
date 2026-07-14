// // src/Pages/TermsAndConditions.jsx
// import React from "react";
// import { motion } from "framer-motion";

// const TermsAndConditions = () => {
//   return (
//     <div className="bg-slate-50 min-h-screen">

//       {/* HERO */}
//       <section className="relative py-24 bg-gradient-to-br from-blue-950 via-slate-900 to-orange-600 text-white text-center overflow-hidden">

//         <div className="max-w-5xl mx-auto px-6">

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl md:text-6xl font-black"
//           >
//             Terms & <span className="text-orange-500">Conditions</span>
//           </motion.h1>

//           <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
//             Please read these terms carefully before using our platform.
//           </p>

//         </div>
//       </section>

//       {/* CONTENT */}
//       <section className="py-16 md:py-20">
//         <div className="max-w-5xl mx-auto px-6">

//           <div className="p-6 md:p-10 lg:p-14 text-gray-700 leading-relaxed">

//             <p className="mb-10 text-base md:text-lg">
//               These Terms and Conditions ("Terms") govern your use of B2B Portal ("we", "us", "our"). By accessing or using our platform, you agree to be bound by these Terms.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               1. Use of Platform
//             </h2>

//             <p>
//               You agree to use our platform only for lawful business purposes. Any misuse, fraud, or unauthorized activity may result in account suspension or termination.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               2. User Accounts
//             </h2>

//             <p>
//               You are responsible for maintaining the confidentiality of your account credentials. All activities under your account are your responsibility.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               3. Business Listings
//             </h2>

//             <ul className="list-disc pl-6 space-y-3">
//               <li>All product listings must be accurate and legal</li>
//               <li>Fake or misleading information is strictly prohibited</li>
//               <li>We reserve the right to remove any listing without notice</li>
//             </ul>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               4. Buyer & Seller Interaction
//             </h2>

//             <p>
//               B2B Portal acts as a facilitator between buyers and sellers. We are not responsible for disputes, payments, or product quality between users.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               5. Payments
//             </h2>

//             <p>
//               All payments between buyers and sellers are subject to mutual agreement. We do not hold responsibility for external payment transactions unless stated.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               6. Prohibited Activities
//             </h2>

//             <ul className="list-disc pl-6 space-y-3">
//               <li>Fraudulent or illegal activities</li>
//               <li>Spam or unauthorized promotions</li>
//               <li>Misuse of platform data</li>
//               <li>Impersonation of any individual or business</li>
//             </ul>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               7. Limitation of Liability
//             </h2>

//             <p>
//               We are not liable for any direct or indirect damages resulting from the use of our platform, including loss of business, data, or profits.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               8. Account Termination
//             </h2>

//             <p>
//               We reserve the right to suspend or terminate any account that violates our policies without prior notice.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               9. Changes to Terms
//             </h2>

//             <p>
//               We may update these Terms at any time. Continued use of the platform means you accept the updated Terms.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               10. Contact Us
//             </h2>

//             <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mt-6">

//               <p>
//                 If you have any questions regarding these Terms, please contact us:
//               </p>

//               <div className="mt-4 space-y-2">

//                 <p>
//                   <strong>Email:</strong>{" "}
//                   <a href="mailto:support@b2b.in" className="text-orange-600 hover:underline">
//                     support@b2b.in
//                   </a>
//                 </p>

//                 <p>
//                   <strong>Phone:</strong> +91 75052 66931
//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>
//       </section>

//     </div>
//   );
// };

// export default TermsAndConditions;




// src/Pages/TermsAndConditions.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaGavel,
  FaUserCircle,
  FaBoxOpen,
  FaHandshake,
  FaMoneyBillWave,
  FaBan,
  FaExclamationTriangle,
  FaUserSlash,
  FaSyncAlt,
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

const TermsAndConditions = () => {
  const sections = [
    { id: "use",        icon: <FaGavel />,             title: "Use of Platform" },
    { id: "accounts",   icon: <FaUserCircle />,         title: "User Accounts" },
    { id: "listings",   icon: <FaBoxOpen />,             title: "Business Listings" },
    { id: "interaction",icon: <FaHandshake />,           title: "Buyer & Seller Interaction" },
    { id: "payments",   icon: <FaMoneyBillWave />,       title: "Payments" },
    { id: "prohibited", icon: <FaBan />,                 title: "Prohibited Activities" },
    { id: "liability",  icon: <FaExclamationTriangle />, title: "Limitation of Liability" },
    { id: "termination",icon: <FaUserSlash />,           title: "Account Termination" },
    { id: "changes",    icon: <FaSyncAlt />,             title: "Changes to Terms" },
    { id: "contact",    icon: <FaHeadset />,             title: "Contact Us" },
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
              <FaGavel className="w-4 h-4" />
              Legal
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            >
              Terms &
              <span className="block text-orange-400">Conditions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-blue-100 text-base leading-relaxed mb-6"
            >
              Please read these terms carefully before using our platform.
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
                These Terms and Conditions ("Terms") govern your use of B2B Portal ("we", "us", "our"). By accessing or using our platform, you agree to be bound by these Terms.
              </p>

              {/* ── SECTION 1 ── */}
              <div id="use" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaGavel />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    1. Use of Platform
                  </h2>
                </div>
                <p>
                  You agree to use our platform only for lawful business purposes. Any misuse, fraud, or unauthorized activity may result in account suspension or termination.
                </p>
              </div>

              {/* ── SECTION 2 ── */}
              <div id="accounts" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaUserCircle />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    2. User Accounts
                  </h2>
                </div>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials. All activities under your account are your responsibility.
                </p>
              </div>

              {/* ── SECTION 3 ── */}
              <div id="listings" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaBoxOpen />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    3. Business Listings
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-3">
                  <li>All product listings must be accurate and legal</li>
                  <li>Fake or misleading information is strictly prohibited</li>
                  <li>We reserve the right to remove any listing without notice</li>
                </ul>
              </div>

              {/* ── SECTION 4 ── */}
              <div id="interaction" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaHandshake />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    4. Buyer & Seller Interaction
                  </h2>
                </div>
                <p>
                  B2B Portal acts as a facilitator between buyers and sellers. We are not responsible for disputes, payments, or product quality between users.
                </p>
              </div>

              {/* ── SECTION 5 ── */}
              <div id="payments" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaMoneyBillWave />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    5. Payments
                  </h2>
                </div>
                <p>
                  All payments between buyers and sellers are subject to mutual agreement. We do not hold responsibility for external payment transactions unless stated.
                </p>
              </div>

              {/* ── SECTION 6 ── */}
              <div id="prohibited" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaBan />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    6. Prohibited Activities
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-3">
                  <li>Fraudulent or illegal activities</li>
                  <li>Spam or unauthorized promotions</li>
                  <li>Misuse of platform data</li>
                  <li>Impersonation of any individual or business</li>
                </ul>
              </div>

              {/* ── SECTION 7 ── */}
              <div id="liability" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaExclamationTriangle />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    7. Limitation of Liability
                  </h2>
                </div>
                <p>
                  We are not liable for any direct or indirect damages resulting from the use of our platform, including loss of business, data, or profits.
                </p>
              </div>

              {/* ── SECTION 8 ── */}
              <div id="termination" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaUserSlash />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    8. Account Termination
                  </h2>
                </div>
                <p>
                  We reserve the right to suspend or terminate any account that violates our policies without prior notice.
                </p>
              </div>

              {/* ── SECTION 9 ── */}
              <div id="changes" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaSyncAlt />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    9. Changes to Terms
                  </h2>
                </div>
                <p>
                  We may update these Terms at any time. Continued use of the platform means you accept the updated Terms.
                </p>
              </div>

              {/* ── SECTION 10 - CONTACT ── */}
              <div id="contact" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaHeadset />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    10. Contact Us
                  </h2>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mt-2">

                  <p className="text-slate-700">
                    If you have any questions regarding these Terms, please contact us:
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

export default TermsAndConditions;