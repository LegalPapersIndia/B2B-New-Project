// // src/Pages/CookiesPolicy.jsx
// import React from "react";
// import { motion } from "framer-motion";

// const CookiesPolicy = () => {
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
//             Cookies <span className="text-orange-500">Policy</span>
//           </motion.h1>

//           <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
//             Learn how we use cookies to improve your experience on our platform.
//           </p>

//         </div>
//       </section>

//       {/* CONTENT */}
//       <section className="py-16 md:py-20">
//         <div className="max-w-5xl mx-auto px-6">

//           <div className="p-6 md:p-10 lg:p-14 text-gray-700 leading-relaxed">

//             <p className="mb-10 text-base md:text-lg">
//               This Cookies Policy explains how B2B Portal ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our platform.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               1. What Are Cookies?
//             </h2>

//             <p>
//               Cookies are small text files stored on your device when you visit a website. They help us improve functionality, performance, and user experience.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               2. How We Use Cookies
//             </h2>

//             <ul className="list-disc pl-6 space-y-3">
//               <li>To remember user preferences and settings</li>
//               <li>To improve website performance and speed</li>
//               <li>To analyze user behavior and traffic</li>
//               <li>To enhance security and prevent fraud</li>
//               <li>To provide personalized content and recommendations</li>
//             </ul>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               3. Types of Cookies We Use
//             </h2>

//             <ul className="list-disc pl-6 space-y-3">
//               <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
//               <li><strong>Performance Cookies:</strong> Help us analyze usage and improve performance</li>
//               <li><strong>Functional Cookies:</strong> Remember user preferences</li>
//               <li><strong>Marketing Cookies:</strong> Used for personalized ads and promotions</li>
//             </ul>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               4. Third-Party Cookies
//             </h2>

//             <p>
//               We may use trusted third-party services like analytics and payment providers that may also place cookies on your device.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               5. Cookie Control
//             </h2>

//             <p>
//               You can control or delete cookies anytime through your browser settings. Disabling cookies may affect platform functionality.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               6. Updates to This Policy
//             </h2>

//             <p>
//               We may update this Cookies Policy from time to time. Changes will be posted on this page with an updated date.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               7. Contact Us
//             </h2>

//             <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mt-6">

//               <p>
//                 If you have any questions about our Cookies Policy, please contact us:
//               </p>

//               <div className="mt-4 space-y-2">

//                 <p>
//                   <strong>Email:</strong>{" "}
//                   <a href="mailto:privacy@b2b.in" className="text-orange-600 hover:underline">
//                     privacy@b2b.in
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

// export default CookiesPolicy;




// src/Pages/CookiesPolicy.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaCookieBite,
  FaCogs,
  FaLayerGroup,
  FaExternalLinkAlt,
  FaSlidersH,
  FaSyncAlt,
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

const CookiesPolicy = () => {
  const sections = [
    { id: "what",      icon: <FaCookieBite />,      title: "What Are Cookies?" },
    { id: "how",       icon: <FaCogs />,             title: "How We Use Cookies" },
    { id: "types",     icon: <FaLayerGroup />,       title: "Types of Cookies We Use" },
    { id: "third",     icon: <FaExternalLinkAlt />,  title: "Third-Party Cookies" },
    { id: "control",   icon: <FaSlidersH />,         title: "Cookie Control" },
    { id: "updates",   icon: <FaSyncAlt />,          title: "Updates to This Policy" },
    { id: "contact",   icon: <FaHeadset />,          title: "Contact Us" },
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
              <FaCookieBite className="w-4 h-4" />
              Legal
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            >
              Cookies
              <span className="block text-orange-400">Policy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-blue-100 text-base leading-relaxed mb-6"
            >
              Learn how we use cookies to improve your experience on our platform.
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
                This Cookies Policy explains how B2B Portal ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our platform.
              </p>

              {/* ── SECTION 1 ── */}
              <div id="what" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaCookieBite />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    1. What Are Cookies?
                  </h2>
                </div>
                <p>
                  Cookies are small text files stored on your device when you visit a website. They help us improve functionality, performance, and user experience.
                </p>
              </div>

              {/* ── SECTION 2 ── */}
              <div id="how" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaCogs />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    2. How We Use Cookies
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-3">
                  <li>To remember user preferences and settings</li>
                  <li>To improve website performance and speed</li>
                  <li>To analyze user behavior and traffic</li>
                  <li>To enhance security and prevent fraud</li>
                  <li>To provide personalized content and recommendations</li>
                </ul>
              </div>

              {/* ── SECTION 3 ── */}
              <div id="types" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaLayerGroup />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    3. Types of Cookies We Use
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
                  <li><strong>Performance Cookies:</strong> Help us analyze usage and improve performance</li>
                  <li><strong>Functional Cookies:</strong> Remember user preferences</li>
                  <li><strong>Marketing Cookies:</strong> Used for personalized ads and promotions</li>
                </ul>
              </div>

              {/* ── SECTION 4 ── */}
              <div id="third" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaExternalLinkAlt />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    4. Third-Party Cookies
                  </h2>
                </div>
                <p>
                  We may use trusted third-party services like analytics and payment providers that may also place cookies on your device.
                </p>
              </div>

              {/* ── SECTION 5 ── */}
              <div id="control" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaSlidersH />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    5. Cookie Control
                  </h2>
                </div>
                <p>
                  You can control or delete cookies anytime through your browser settings. Disabling cookies may affect platform functionality.
                </p>
              </div>

              {/* ── SECTION 6 ── */}
              <div id="updates" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaSyncAlt />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    6. Updates to This Policy
                  </h2>
                </div>
                <p>
                  We may update this Cookies Policy from time to time. Changes will be posted on this page with an updated date.
                </p>
              </div>

              {/* ── SECTION 7 - CONTACT ── */}
              <div id="contact" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaHeadset />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    7. Contact Us
                  </h2>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mt-2">

                  <p className="text-slate-700">
                    If you have any questions about our Cookies Policy, please contact us:
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                        <FaEnvelope className="text-sm" />
                      </div>
                      <a href="mailto:privacy@b2b.in" className="text-slate-800 hover:text-orange-600 transition-colors">
                        privacy@b2b.in
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

export default CookiesPolicy;