

// // B2B/src/Pages/ContactPage.jsx
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { createContact } from "../api/contactApi";
// import { getContactPage } from "../api/contactPageApi";
// import {
//   FaMapMarkerAlt,
//   FaDirections,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaClock,
//   FaPlus,
//   FaMinus,
//   FaPaperPlane,
//   FaHeadset,
//   FaWhatsapp,
// } from "react-icons/fa";

// export default function ContactPage() {
//   const [activeId, setActiveId]   = useState(null);
//   const [pageData, setPageData]   = useState(null);
//   const [pageLoading, setPageLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     name: "", email: "", mobile: "", subject: "", message: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // ─────────────────────────────────────────
//   // FETCH PAGE DATA
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchPage = async () => {
//       try {
//         const res = await getContactPage();
//         if (res.data) setPageData(res.data);
//       } catch (err) {
//         console.error("ContactPage fetch error:", err);
//       } finally {
//         setPageLoading(false);
//       }
//     };
//     fetchPage();
//   }, []);

//   const toggleFAQ = (id) => setActiveId(activeId === id ? null : id);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const data = await createContact(formData);
//       if (data.success) {
//         alert("Message sent successfully!");
//         setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
//       } else {
//         alert(data.message || "Failed to send message");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────
//   // LOADING
//   // ─────────────────────────────────────────
//   if (pageLoading) {
//     return (
//       <div className="bg-[#f8fafc] min-h-screen flex items-center justify-center">
//         <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!pageData || !pageData.isActive) return null;

//   // DYNAMIC VALUES
//   const whatsappLink = `https://wa.me/${pageData.whatsappNumber}?text=${encodeURIComponent(pageData.whatsappMessage)}`;
//   const sortedFaqs   = [...(pageData.faqs || [])].sort((a, b) => a.order - b.order);

//   // HEADING split — highlight part orange mein
//   const heading          = pageData.heroHeading || "";
//   const highlight        = pageData.heroHeadingHighlight || "";
//   const headingBefore    = heading.replace(highlight, "");

//   return (
//     <div className="bg-[#f8fafc] overflow-hidden">

//       {/* ================= HERO ================= */}
//       <section className="relative py-24 lg:py-32 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />

//         <motion.div
//           animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
//           transition={{ duration: 8, repeat: Infinity }}
//           className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
//           transition={{ duration: 10, repeat: Infinity }}
//           className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
//         />

//         <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">

//           <motion.div
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             className="inline-flex items-center gap-3 bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-semibold mb-8 shadow-sm"
//           >
//             <FaHeadset />
//             Contact Our Team
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 35 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//             className="text-2xl md:text-4xl lg:text-6xl font-black text-slate-900 leading-tight"
//           >
//             {headingBefore}
//             <span className="text-orange-500"> {highlight}</span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 35 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//             className="text-slate-600 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mt-8"
//           >
//             {pageData.heroSubtext}
//           </motion.p>
//         </div>
//       </section>

//       {/* ================= CONTACT INFO + FORM ================= */}
//       <section className="pb-24">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-10 items-stretch">

//             {/* LEFT INFO */}
//             <motion.div
//               initial={{ opacity: 0, x: -70 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7 }}
//               className="space-y-5 h-full flex flex-col"
//             >
//               {/* PHONE */}
//               <motion.div
//                 whileHover={{ y: -6 }}
//                 className="group bg-white rounded-3xl p-6 shadow-md border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:bg-blue-50/40 hover:border-blue-200"
//               >
//                 <div className="w-14 h-14 rounded-2xl bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center text-blue-500 group-hover:text-white text-xl transition-all duration-500">
//                   <FaPhoneAlt />
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-900 mt-5">Call Us</h3>
//                 <p className="text-slate-600 mt-2 leading-relaxed text-base">{pageData.phone}</p>
//               </motion.div>

//               {/* EMAIL */}
//               <motion.div
//                 whileHover={{ y: -6 }}
//                 className="group bg-white rounded-3xl p-6 shadow-md border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:bg-blue-50/40 hover:border-blue-200"
//               >
//                 <div className="w-14 h-14 rounded-2xl bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center text-blue-500 group-hover:text-white text-xl transition-all duration-500">
//                   <FaEnvelope />
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-900 mt-5">Email Address</h3>
//                 <p className="text-slate-600 mt-2 leading-relaxed text-base break-all">{pageData.email}</p>
//               </motion.div>

//               {/* WORKING HOURS */}
//               <motion.div
//                 whileHover={{ y: -6 }}
//                 className="group bg-white rounded-3xl p-6 shadow-md border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:bg-blue-50/40 hover:border-blue-200"
//               >
//                 <div className="w-14 h-14 rounded-2xl bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center text-blue-500 group-hover:text-white text-xl transition-all duration-500">
//                   <FaClock />
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-900 mt-5">Working Hours</h3>
//                 <p className="text-slate-600 mt-2 leading-relaxed text-base">{pageData.workingHours}</p>
//               </motion.div>

//               {/* WHATSAPP */}
//               <motion.a
//                 href={whatsappLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.01, y: -4 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="group flex items-center gap-4 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-3xl p-5 shadow-xl transition-all duration-500"
//               >
//                 <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
//                   <FaWhatsapp />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold">Chat On WhatsApp</h3>
//                   <p className="text-white/90 text-sm mt-1">Quick support & instant replies</p>
//                 </div>
//               </motion.a>
//             </motion.div>

//             {/* FORM — unchanged */}
//             <motion.div
//               initial={{ opacity: 0, x: 70 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7 }}
//               className="bg-white rounded-[32px] shadow-2xl p-6 sm:p-8 lg:p-10 border border-slate-100 h-full flex flex-col justify-center"
//             >
//               <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Send Us A Message</h2>
//               <p className="text-slate-500 mb-8">Our team will get back to you within 24 hours.</p>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-3 gap-6">
//                   <input type="text" name="name" value={formData.name} onChange={handleChange}
//                     placeholder="Your Name" required
//                     className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
//                   <input type="email" name="email" value={formData.email} onChange={handleChange}
//                     placeholder="Your Email" required
//                     className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
//                   <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange}
//                     placeholder="Mobile Number" required
//                     className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
//                 </div>
//                 <input type="text" name="subject" value={formData.subject} onChange={handleChange}
//                   placeholder="Subject" required
//                   className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
//                 <textarea rows="6" name="message" value={formData.message} onChange={handleChange}
//                   placeholder="Write your message..." required
//                   className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none" />
//                 <motion.button type="submit" disabled={loading}
//                   whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
//                   className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-xl w-full sm:w-auto"
//                 >
//                   {loading ? "Sending..." : "Send Message"}
//                   <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
//                     <FaPaperPlane />
//                   </motion.div>
//                 </motion.button>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ================= FAQ ================= */}
//       {sortedFaqs.length > 0 && (
//         <section className="py-24 bg-white">
//           <div className="max-w-5xl mx-auto px-6 lg:px-8">
//             <div className="text-center max-w-3xl mx-auto mb-14">
//               <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-semibold mb-5">
//                 FAQ
//               </div>
//               <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
//                 Frequently Asked <span className="text-orange-500">Questions</span>
//               </h2>
//               <p className="text-slate-600 text-lg leading-relaxed">
//                 Quick answers to common questions about our B2B marketplace platform.
//               </p>
//             </div>

//             <div className="space-y-5">
//               {sortedFaqs.map((faq, index) => (
//                 <motion.div
//                   key={faq._id}
//                   initial={{ opacity: 0, y: 25 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.08 }}
//                   whileHover={{ y: -3 }}
//                   className="group relative bg-[#f8fafc] rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden hover:bg-blue-50/40 hover:border-blue-200"
//                 >
//                   <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

//                   <button
//                     onClick={() => toggleFAQ(faq._id)}
//                     className="w-full flex items-center justify-between text-left px-6 py-6"
//                   >
//                     <h3 className="text-base md:text-lg font-bold text-slate-900 pr-4 leading-snug">
//                       {faq.question}
//                     </h3>
//                     <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-all duration-500">
//                       {activeId === faq._id ? (
//                         <FaMinus className="text-blue-500 group-hover:text-white transition duration-500" />
//                       ) : (
//                         <FaPlus className="text-blue-500 group-hover:text-white transition duration-500" />
//                       )}
//                     </div>
//                   </button>

//                   <AnimatePresence>
//                     {activeId === faq._id && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.35 }}
//                       >
//                         <div className="px-6 pb-6">
//                           <div className="border-t border-slate-200 pt-5">
//                             <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ================= MAP ================= */}
//       <section className="py-16 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 md:px-12">
//           <div className="text-center max-w-3xl mx-auto mb-14">
//             <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
//               Find Our <span className="text-orange-500">Location</span>
//             </h2>
//             <p className="text-slate-600 text-base md:text-lg leading-relaxed">
//               Visit our office and witness the impact we're creating together in global B2B trade and business networking.
//             </p>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
//           >
//             <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-slate-900 to-orange-500" />

//             <div className="h-[500px] w-full">
//               <iframe
//                 title="B2B Location"
//                 src={pageData.mapEmbedUrl}
//                 width="100%"
//                 height="100%"
//                 allowFullScreen=""
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 className="border-0"
//               />
//             </div>

//             <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md">
//               <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-slate-100">
//                 <div className="flex items-start gap-4">
//                   <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
//                     <FaMapMarkerAlt className="text-2xl text-orange-500" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-xl font-bold text-slate-900 mb-2">{pageData.officeName}</h3>
//                     <p className="text-slate-600 leading-relaxed mb-4">{pageData.officeAddress}</p>
//                     <a
//                       href={pageData.directionsLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all duration-300"
//                     >
//                       Get Directions
//                       <FaDirections />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
//           </motion.div>
//         </div>
//       </section>

//     </div>
//   );
// }



// B2B/src/Pages/ContactPage.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createContact } from "../api/contactApi";
import { getContactPage } from "../api/contactPageApi";
import {
  FaMapMarkerAlt,
  FaDirections,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPlus,
  FaMinus,
  FaPaperPlane,
  FaHeadset,
  FaWhatsapp,
  FaUser,
  FaTag,
  FaCommentDots,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";

export default function ContactPage() {
  const [activeId, setActiveId]   = useState(null);
  const [pageData, setPageData]   = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "", subject: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  // ─────────────────────────────────────────
  // FETCH PAGE DATA
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await getContactPage();
        if (res.data) setPageData(res.data);
      } catch (err) {
        console.error("ContactPage fetch error:", err);
      } finally {
        setPageLoading(false);
      }
    };
    fetchPage();
  }, []);

  const toggleFAQ = (id) => setActiveId(activeId === id ? null : id);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await createContact(formData);
      if (data.success) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────
  if (pageLoading) {
    return (
      <div className="bg-[#f8fafc] min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pageData || !pageData.isActive) return null;

  // DYNAMIC VALUES
  const whatsappLink = `https://wa.me/${pageData.whatsappNumber}?text=${encodeURIComponent(pageData.whatsappMessage)}`;
  const sortedFaqs   = [...(pageData.faqs || [])].sort((a, b) => a.order - b.order);

  // HEADING split — highlight part orange mein
  const heading          = pageData.heroHeading || "";
  const highlight        = pageData.heroHeadingHighlight || "";
  const headingBefore    = heading.replace(highlight, "");

  return (
    <div className="bg-[#f8fafc] overflow-hidden">

     
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="max-w-3xl">

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-5"
            >
              <FaHeadset className="w-4 h-4" />
              Contact Our Team
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            >
              {headingBefore}
              <span className="block text-orange-400">{highlight}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-blue-100 text-base leading-relaxed"
            >
              {pageData.heroSubtext}
            </motion.p>

          </div>
        </div>
      </section>

      {/* ================= CONTACT INFO + FORM ================= */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/*  UPDATED - items-stretch → items-start, form card ab apni content ke hisab se size hoga, extra khaali height nahi rahegi */}
          <div className="grid lg:grid-cols-2 gap-10 items-start mt-12">

            {/* LEFT INFO ( UPDATED - compact combined card instead of 3 bulky separate cards, + trust badges strip) */}
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5"
            >
              {/* COMBINED CONTACT INFO CARD */}
              <div className="bg-white rounded-3xl shadow-md border border-slate-100 divide-y divide-slate-100 overflow-hidden">

                {/* PHONE */}
                <div className="group flex items-center gap-4 p-5 hover:bg-blue-50/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center text-blue-500 group-hover:text-white text-lg transition-all duration-300 shrink-0">
                    <FaPhoneAlt />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Call Us</p>
                    <p className="text-slate-900 font-semibold mt-0.5 truncate">{pageData.phone}</p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="group flex items-center gap-4 p-5 hover:bg-blue-50/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center text-blue-500 group-hover:text-white text-lg transition-all duration-300 shrink-0">
                    <FaEnvelope />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Email Address</p>
                    <p className="text-slate-900 font-semibold mt-0.5 truncate">{pageData.email}</p>
                  </div>
                </div>

                {/* WORKING HOURS */}
                <div className="group flex items-center gap-4 p-5 hover:bg-blue-50/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center text-blue-500 group-hover:text-white text-lg transition-all duration-300 shrink-0">
                    <FaClock />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Working Hours</p>
                    <p className="text-slate-900 font-semibold mt-0.5">{pageData.workingHours}</p>
                  </div>
                </div>

              </div>

              {/* WHATSAPP */}
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-4 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-3xl p-4 shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0">
                  <FaWhatsapp />
                </div>
                <div>
                  <h3 className="text-base font-bold">Chat On WhatsApp</h3>
                  <p className="text-white/90 text-xs mt-0.5">Quick support & instant replies</p>
                </div>
              </motion.a>

              {/*  NEW - trust badges strip, quick reassurance for the visitor */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <FaBolt />,      label: "Quick Response" },
                  { icon: <FaShieldAlt />, label: "Verified Business" },
                  { icon: <FaHeadset />,   label: "Dedicated Support" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3.5 text-center"
                  >
                    <div className="text-orange-500 text-lg flex justify-center mb-1.5">{item.icon}</div>
                    <p className="text-[11px] font-semibold text-slate-600 leading-tight">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FORM ( UPDATED - compact premium look: icon-prefixed inputs, tighter spacing, smaller header) — logic unchanged */}
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-[28px] shadow-2xl p-6 sm:p-8 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                  <FaPaperPlane className="text-sm" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Send Us A Message</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6">Our team will get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder="Your Name" required
                      className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
                  </div>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder="Your Email" required
                      className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange}
                      placeholder="Mobile Number" required
                      className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
                  </div>
                  <div className="relative">
                    <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                      placeholder="Subject" required
                      className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
                  </div>
                </div>

                <div className="relative">
                  <FaCommentDots className="absolute left-4 top-4 text-slate-400 text-sm" />
                  <textarea rows="4" name="message" value={formData.message} onChange={handleChange}
                    placeholder="Write your message..." required
                    className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none" />
                </div>

                <motion.button type="submit" disabled={loading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="group bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg w-full sm:w-auto text-sm"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <FaPaperPlane className="text-xs" />
                  </motion.div>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      {sortedFaqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-semibold mb-5">
                FAQ
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
                Frequently Asked <span className="text-orange-500">Questions</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Quick answers to common questions about our B2B marketplace platform.
              </p>
            </div>

            <div className="space-y-5">
              {sortedFaqs.map((faq, index) => (
                <motion.div
                  key={faq._id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="group relative bg-[#f8fafc] rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden hover:bg-blue-50/40 hover:border-blue-200"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <button
                    onClick={() => toggleFAQ(faq._id)}
                    className="w-full flex items-center justify-between text-left px-6 py-6"
                  >
                    <h3 className="text-base md:text-lg font-bold text-slate-900 pr-4 leading-snug">
                      {faq.question}
                    </h3>
                    <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-all duration-500">
                      {activeId === faq._id ? (
                        <FaMinus className="text-blue-500 group-hover:text-white transition duration-500" />
                      ) : (
                        <FaPlus className="text-blue-500 group-hover:text-white transition duration-500" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeId === faq._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="px-6 pb-6">
                          <div className="border-t border-slate-200 pt-5">
                            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= MAP ================= */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
              Find Our <span className="text-orange-500">Location</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Visit our office and witness the impact we're creating together in global B2B trade and business networking.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
          >
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-slate-900 to-orange-500" />

            <div className="h-[500px] w-full">
              <iframe
                title="B2B Location"
                src={pageData.mapEmbedUrl}
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>

            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-2xl text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{pageData.officeName}</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">{pageData.officeAddress}</p>
                    <a
                      href={pageData.directionsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all duration-300"
                    >
                      Get Directions
                      <FaDirections />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

    </div>
  );
}