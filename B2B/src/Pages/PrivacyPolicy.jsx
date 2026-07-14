// // src/Pages/PrivacyPolicy.jsx
// import React from "react";
// import { motion } from "framer-motion";

// const PrivacyPolicy = () => {
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
//             Privacy <span className="text-orange-500">Policy</span>
//           </motion.h1>

//           <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
//             Your privacy matters to us. Read how we collect and protect your data.
//           </p>

//         </div>
//       </section>

//       {/* CONTENT */}
//       <section className="py-16 md:py-20">
//         <div className="max-w-5xl mx-auto px-6">

//           <div className="p-6 md:p-10 lg:p-14 text-gray-700 leading-relaxed">

//             <p className="mb-10 text-base md:text-lg">
//               At B2B Portal ("we", "us", or "our"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               1. Information We Collect
//             </h2>

//             <ul className="list-disc pl-6 space-y-4">
//               <li><strong>Personal & Business Information:</strong> Name, email, phone number, company name, business address, GST number, and bank details (for verified payments).</li>
//               <li><strong>Business Documents:</strong> Product listings, trade licenses, certifications, and company registration details.</li>
//               <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage analytics.</li>
//               <li><strong>Transaction Data:</strong> Inquiries, quotes, and order-related information.</li>
//             </ul>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               2. How We Use Your Information
//             </h2>

//             <p className="mb-4">We use your information to:</p>

//             <ul className="list-disc pl-6 space-y-3">
//               <li>Provide, maintain, and improve our B2B marketplace services</li>
//               <li>Verify business identities and prevent fraud</li>
//               <li>Facilitate communication between buyers and suppliers</li>
//               <li>Send important updates, inquiries, and quotes</li>
//               <li>Comply with legal obligations</li>
//               <li>Analyze platform usage and enhance user experience</li>
//             </ul>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               3. Information Sharing
//             </h2>

//             <p className="mb-4">We may share your information only in the following cases:</p>

//             <ul className="list-disc pl-6 space-y-3">
//               <li>With the relevant party in a transaction (buyer ↔ supplier) — only necessary contact details</li>
//               <li>With trusted service providers (payment gateways, logistics, hosting) under strict confidentiality agreements</li>
//               <li>When required by law or government authority</li>
//               <li>In the event of a merger or acquisition</li>
//             </ul>

//             <p className="mt-4 font-semibold text-gray-900">
//               We never sell your personal data to third parties for marketing purposes.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               4. Data Security
//             </h2>

//             <p>
//               We use industry-standard security measures including SSL encryption, secure servers, access controls, and regular security audits. While we strive to protect your data, no method of transmission over the internet is 100% secure.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               5. Your Rights
//             </h2>

//             <p className="mb-4">You have the right to:</p>

//             <ul className="list-disc pl-6 space-y-3">
//               <li>Access, update, or delete your personal information</li>
//               <li>Withdraw consent for certain processing activities</li>
//               <li>Request data portability</li>
//               <li>Object to or restrict processing</li>
//             </ul>

//             <p className="mt-6">
//               To exercise these rights, please contact us at{" "}
//               <a href="mailto:privacy@b2b.in" className="text-orange-600 font-medium hover:underline">
//                 privacy@b2b.in
//               </a>.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               6. Cookies & Tracking
//             </h2>

//             <p>
//               We use cookies to enhance your experience, analyze traffic, and provide personalized content. You can manage your cookie preferences through your browser settings.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               7. Changes to This Policy
//             </h2>

//             <p>
//               We may update this Privacy Policy periodically. Material changes will be notified by updating the "Last updated" date and posting the revised policy on this page.
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
//               8. Contact Us
//             </h2>

//             <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mt-6">

//               <p className="text-gray-700">
//                 If you have any questions about this Privacy Policy, please reach out to us:
//               </p>

//               <div className="mt-4 space-y-2 text-gray-800">

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

// export default PrivacyPolicy;


// src/Pages/PrivacyPolicy.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaDatabase,
  FaCogs,
  FaShareAlt,
  FaLock,
  FaUserShield,
  FaCookieBite,
  FaSyncAlt,
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  const sections = [
    { id: "collect",  icon: <FaDatabase />,   title: "Information We Collect" },
    { id: "use",      icon: <FaCogs />,        title: "How We Use Your Information" },
    { id: "sharing",  icon: <FaShareAlt />,    title: "Information Sharing" },
    { id: "security", icon: <FaLock />,        title: "Data Security" },
    { id: "rights",   icon: <FaUserShield />,  title: "Your Rights" },
    { id: "cookies",  icon: <FaCookieBite />,  title: "Cookies & Tracking" },
    { id: "changes",  icon: <FaSyncAlt />,     title: "Changes to This Policy" },
    { id: "contact",  icon: <FaHeadset />,     title: "Contact Us" },
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
              <FaShieldAlt className="w-4 h-4" />
              Legal
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            >
              Privacy
              <span className=" text-orange-400">Policy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-blue-100 text-base leading-relaxed mb-6"
            >
              Your privacy matters to us. Read how we collect, use, and protect
              your data across our platform.
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
                At B2B Portal ("we", "us", or "our"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>

              {/* ── SECTION 1 ── */}
              <div id="collect" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaDatabase />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    1. Information We Collect
                  </h2>
                </div>

                <ul className="list-disc pl-6 space-y-4">
                  <li><strong>Personal & Business Information:</strong> Name, email, phone number, company name, business address, GST number, and bank details (for verified payments).</li>
                  <li><strong>Business Documents:</strong> Product listings, trade licenses, certifications, and company registration details.</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage analytics.</li>
                  <li><strong>Transaction Data:</strong> Inquiries, quotes, and order-related information.</li>
                </ul>
              </div>

              {/* ── SECTION 2 ── */}
              <div id="use" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaCogs />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    2. How We Use Your Information
                  </h2>
                </div>

                <p className="mb-4">We use your information to:</p>

                <ul className="list-disc pl-6 space-y-3">
                  <li>Provide, maintain, and improve our B2B marketplace services</li>
                  <li>Verify business identities and prevent fraud</li>
                  <li>Facilitate communication between buyers and suppliers</li>
                  <li>Send important updates, inquiries, and quotes</li>
                  <li>Comply with legal obligations</li>
                  <li>Analyze platform usage and enhance user experience</li>
                </ul>
              </div>

              {/* ── SECTION 3 ── */}
              <div id="sharing" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaShareAlt />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    3. Information Sharing
                  </h2>
                </div>

                <p className="mb-4">We may share your information only in the following cases:</p>

                <ul className="list-disc pl-6 space-y-3">
                  <li>With the relevant party in a transaction (buyer ↔ supplier) — only necessary contact details</li>
                  <li>With trusted service providers (payment gateways, logistics, hosting) under strict confidentiality agreements</li>
                  <li>When required by law or government authority</li>
                  <li>In the event of a merger or acquisition</li>
                </ul>

                <p className="mt-4 font-semibold text-slate-900">
                  We never sell your personal data to third parties for marketing purposes.
                </p>
              </div>

              {/* ── SECTION 4 ── */}
              <div id="security" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaLock />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    4. Data Security
                  </h2>
                </div>

                <p>
                  We use industry-standard security measures including SSL encryption, secure servers, access controls, and regular security audits. While we strive to protect your data, no method of transmission over the internet is 100% secure.
                </p>
              </div>

              {/* ── SECTION 5 ── */}
              <div id="rights" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaUserShield />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    5. Your Rights
                  </h2>
                </div>

                <p className="mb-4">You have the right to:</p>

                <ul className="list-disc pl-6 space-y-3">
                  <li>Access, update, or delete your personal information</li>
                  <li>Withdraw consent for certain processing activities</li>
                  <li>Request data portability</li>
                  <li>Object to or restrict processing</li>
                </ul>

                <p className="mt-6">
                  To exercise these rights, please contact us at{" "}
                  <a href="mailto:privacy@b2b.in" className="text-orange-600 font-medium hover:underline">
                    privacy@b2b.in
                  </a>.
                </p>
              </div>

              {/* ── SECTION 6 ── */}
              <div id="cookies" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaCookieBite />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    6. Cookies & Tracking
                  </h2>
                </div>

                <p>
                  We use cookies to enhance your experience, analyze traffic, and provide personalized content. You can manage your cookie preferences through your browser settings.
                </p>
              </div>

              {/* ── SECTION 7 ── */}
              <div id="changes" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaSyncAlt />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    7. Changes to This Policy
                  </h2>
                </div>

                <p>
                  We may update this Privacy Policy periodically. Material changes will be notified by updating the "Last updated" date and posting the revised policy on this page.
                </p>
              </div>

              {/* ── SECTION 8 - CONTACT ── */}
              <div id="contact" className="scroll-mt-24">
                <div className="flex items-center gap-3 mt-12 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-lg shrink-0">
                    <FaHeadset />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    8. Contact Us
                  </h2>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mt-2">

                  <p className="text-slate-700">
                    If you have any questions about this Privacy Policy, please reach out to us:
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

export default PrivacyPolicy;