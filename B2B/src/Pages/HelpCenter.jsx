


// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   FaSearch,
//   FaHeadset,
//   FaWhatsapp,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaPaperPlane,
//   FaSpinner,
//   FaShieldAlt,
//   FaShippingFast,
//   FaHandshake,
//   FaFileInvoiceDollar,
// } from 'react-icons/fa';
// import { createContact } from '../api/contactApi';
// const HelpCenter = () => {

//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: '',
//   });

//   const whatsappNumber = "+917505266931";
//   const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%20need%20help%20with%20B2B%20Portal`;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     await createContact(formData);  // 👈 API call
//     setSubmitted(true);

//     setTimeout(() => {
//       setSubmitted(false);
//       setFormData({
//         name: '',
//         email: '',
//         mobile: '',
//         subject: '',
//         message: '',
//       });
//     }, 4000);

//   } catch (error) {
//     console.error("Contact form error:", error);
//     alert("Something went wrong. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };

//   const faqCategories = [
//     {
//       icon: <FaShieldAlt />,
//       title: "Account & Verification",
//       color: "text-blue-600",
//     },
//     {
//       icon: <FaHandshake />,
//       title: "Buying & Selling",
//       color: "text-orange-600",
//     },
//     {
//       icon: <FaShippingFast />,
//       title: "Shipping & Logistics",
//       color: "text-blue-600",
//     },
//     {
//       icon: <FaFileInvoiceDollar />,
//       title: "Payments & Refunds",
//       color: "text-orange-600",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* ================= HERO ================= */}
//       <section className="relative py-24 overflow-hidden">

//         <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-orange-600" />

//         <motion.div
//           animate={{ y: [0, -20, 0] }}
//           transition={{ duration: 6, repeat: Infinity }}
//           className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"
//         />

//         <motion.div
//           animate={{ y: [0, 20, 0] }}
//           transition={{ duration: 7, repeat: Infinity }}
//           className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full"
//         />

//         <div className="relative max-w-6xl mx-auto px-6 text-center">

//           <motion.div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full mb-6">
//             <FaHeadset /> Help Center
//           </motion.div>

//           <h1 className="text-4xl md:text-6xl font-black text-white">
//             How Can We <span className="text-orange-500">Help You?</span>
//           </h1>

//           <p className="text-gray-300 mt-5 max-w-2xl mx-auto">
//             Search answers or contact our support team instantly.
//           </p>

//           <div className="mt-10 max-w-xl mx-auto relative">
//             <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search help topics..."
//               className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
//             />
//           </div>

//         </div>
//       </section>

//       {/* ================= CATEGORY CARDS (BIGGER + HOVER IMPROVED) ================= */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

//           {faqCategories.map((item, i) => (
//             <motion.div
//               key={i}
//               whileHover={{
//                 y: -10,
//                 scale: 1.02
//               }}
//               className="bg-white rounded-3xl p-9 shadow-md border border-gray-100 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 cursor-pointer hover:bg-orange-50"
//             >
//               <div className={`text-5xl mb-5 transition-colors duration-300 ${item.color}`}>
//                 {item.icon}
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600">
//                 {item.title}
//               </h3>
//               <p className="text-gray-500 mt-3 text-sm">
//                 Browse related help articles
//               </p>
//             </motion.div>
//           ))}

//         </div>
//       </section>

//       {/* ================= FAQ SECTION (ADDED BACK) ================= */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-6 text-center mb-12">
//           <h2 className="text-4xl font-black text-gray-900">
//             Frequently Asked <span className="text-orange-600">Questions</span>
//           </h2>
//         </div>

//         <div className="max-w-5xl mx-auto space-y-5 px-6">

//           {faqCategories.map((item, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.01 }}
//               className="bg-slate-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-3xl p-8 transition-all shadow-sm hover:shadow-xl"
//             >
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
//                 <span className="text-orange-500">{item.icon}</span>
//                 {item.title}
//               </h3>
//               <p className="text-gray-600 mt-3">
//                 Explore detailed answers and step-by-step guides in this category.
//               </p>
//             </motion.div>
//           ))}

//         </div>
//       </section>

//       {/* ================= CONTACT + FORM ================= */}
//       <section className="pb-24">
//         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">

//           {/* FORM */}
//           <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">

//             <h2 className="text-3xl font-black mb-6 text-gray-900">
//               Contact Support
//             </h2>

//             {submitted ? (
//               <div className="text-center py-16">
//                 <div className="text-5xl mb-4">🎉</div>
//                 <h3 className="text-xl font-bold text-green-600">
//                   Request Sent Successfully
//                 </h3>
//               </div>
//             ) : (

//               <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

//                 <input name="name" onChange={handleChange} placeholder="Name" className="p-4 border rounded-2xl" />
//                 <input name="email" onChange={handleChange} placeholder="Email" className="p-4 border rounded-2xl" />
//                 <input name="mobile" onChange={handleChange} placeholder="Mobile" className="p-4 border rounded-2xl" />
//                 <input name="subject" onChange={handleChange} placeholder="Subject" className="p-4 border rounded-2xl" />

//                 <textarea
//                   name="message"
//                   onChange={handleChange}
//                   placeholder="Message"
//                   className="md:col-span-2 p-4 border rounded-2xl h-44"
//                 />

//                 <button
//                   disabled={loading}
//                   className="md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-3 transition-all"
//                 >
//                   {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
//                   Send Message
//                 </button>

//               </form>

//             )}

//           </div>

//           {/* SIDEBAR */}
//           <div className="space-y-6 sticky top-8">

//             {/* WHATSAPP */}
//             <a href={whatsappLink} target="_blank"
//               className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white p-7 rounded-3xl shadow-lg hover:scale-[1.02] transition-all">

//               <FaWhatsapp className="text-3xl" />
//               <div>
//                 <h3 className="font-bold">WhatsApp Support</h3>
//                 <p className="text-sm opacity-90">Instant reply</p>
//               </div>

//             </a>

//             {/* CONTACT */}
//             <div className="bg-white p-7 rounded-3xl shadow border hover:shadow-xl transition">
//               <h3 className="font-bold mb-5">Contact Info</h3>

//               <div className="space-y-5 text-sm">

//                 <div className="flex gap-3">
//                   <FaPhoneAlt className="text-orange-500 mt-1" />
//                   +91 75052 66931
//                 </div>

//                 <div className="flex gap-3">
//                   <FaEnvelope className="text-blue-600 mt-1" />
//                   support@b2b.in
//                 </div>

//               </div>
//             </div>

//             {/* QUICK LINKS (RESTORED) */}
//             <div className="bg-white p-7 rounded-3xl shadow border hover:shadow-xl transition">
//               <h3 className="font-bold mb-5">Quick Links</h3>

//               <ul className="space-y-3 text-gray-700">
//                 <li className="hover:text-orange-600 cursor-pointer">About Us</li>
//                 <li className="hover:text-orange-600 cursor-pointer">Privacy Policy</li>
//                 <li className="hover:text-orange-600 cursor-pointer">Refund Policy</li>
//                 <li className="hover:text-orange-600 cursor-pointer">Terms & Conditions</li>
//               </ul>
//             </div>

//           </div>

//         </div>
//       </section>

//     </div>
//   );
// };

// export default HelpCenter;




// B2B/src/Pages/HelpCenter.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaSearch, FaHeadset, FaWhatsapp, FaEnvelope, FaPhoneAlt,
  FaPaperPlane, FaSpinner, FaShieldAlt, FaShippingFast,
  FaHandshake, FaFileInvoiceDollar,
} from 'react-icons/fa';
import { createContact } from '../api/contactApi';
import { getContactPage } from '../api/contactPageApi';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery]   = useState('');
  const [loading, setLoading]           = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [contactInfo, setContactInfo]   = useState(null);

  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', subject: '', message: '',
  });

  // ─────────────────────────────────────────
  // FETCH — sirf phone, email, whatsapp
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getContactPage();
        if (res.data) setContactInfo(res.data);
      } catch (err) {
        console.error("HelpCenter contact fetch error:", err);
      }
    };
    fetchInfo();
  }, []);

  const whatsappNumber = contactInfo?.whatsappNumber || "917505266931";
  const whatsappMessage = contactInfo?.whatsappMessage || "Hello I need help with B2B Portal";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const phone = contactInfo?.phone || "+91 75052 66931";
  const email = contactInfo?.email || "support@b2b.in";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createContact(formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
      }, 4000);
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const faqCategories = [
    { icon: <FaShieldAlt />,          title: "Account & Verification",  color: "text-blue-600" },
    { icon: <FaHandshake />,          title: "Buying & Selling",         color: "text-orange-600" },
    { icon: <FaShippingFast />,       title: "Shipping & Logistics",     color: "text-blue-600" },
    { icon: <FaFileInvoiceDollar />,  title: "Payments & Refunds",       color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HERO ================= */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-orange-600" />
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full" />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full mb-6">
            <FaHeadset /> Help Center
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white">
            How Can We <span className="text-orange-500">Help You?</span>
          </h1>
          <p className="text-gray-300 mt-5 max-w-2xl mx-auto">
            Search answers or contact our support team instantly.
          </p>
          {/* <div className="mt-10 max-w-xl mx-auto relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics..."
              className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div> */}
        </div>
      </section>

      {/* ================= CATEGORY CARDS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faqCategories.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl p-9 shadow-md border border-gray-100 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 cursor-pointer hover:bg-orange-50">
              <div className={`text-5xl mb-5 transition-colors duration-300 ${item.color}`}>{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-500 mt-3 text-sm">Browse related help articles</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900">
            Frequently Asked <span className="text-orange-600">Questions</span>
          </h2>
        </div>
        <div className="max-w-5xl mx-auto space-y-5 px-6">
          {faqCategories.map((item, i) => (
            <motion.div key={i} whileHover={{ scale: 1.01 }}
              className="bg-slate-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-3xl p-8 transition-all shadow-sm hover:shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                <span className="text-orange-500">{item.icon}</span>
                {item.title}
              </h3>
              <p className="text-gray-600 mt-3">Explore detailed answers and step-by-step guides in this category.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT + FORM ================= */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">

          {/* FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
            <h2 className="text-3xl font-black mb-6 text-gray-900">Contact Support</h2>
            {submitted ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-600">Request Sent Successfully</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                <input name="name" onChange={handleChange} value={formData.name} placeholder="Name" className="p-4 border rounded-2xl" />
                <input name="email" onChange={handleChange} value={formData.email} placeholder="Email" className="p-4 border rounded-2xl" />
                <input name="mobile" onChange={handleChange} value={formData.mobile} placeholder="Mobile" className="p-4 border rounded-2xl" />
                <input name="subject" onChange={handleChange} value={formData.subject} placeholder="Subject" className="p-4 border rounded-2xl" />
                <textarea name="message" onChange={handleChange} value={formData.message}
                  placeholder="Message" className="md:col-span-2 p-4 border rounded-2xl h-44" />
                <button disabled={loading}
                  className="md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-3 transition-all">
                  {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6 sticky top-8">

            {/* WHATSAPP — dynamic */}
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white p-7 rounded-3xl shadow-lg hover:scale-[1.02] transition-all">
              <FaWhatsapp className="text-3xl" />
              <div>
                <h3 className="font-bold">WhatsApp Support</h3>
                <p className="text-sm opacity-90">Instant reply</p>
              </div>
            </a>

            {/* CONTACT INFO — dynamic */}
            <div className="bg-white p-7 rounded-3xl shadow border hover:shadow-xl transition">
              <h3 className="font-bold mb-5">Contact Info</h3>
              <div className="space-y-5 text-sm">
                <div className="flex gap-3">
                  <FaPhoneAlt className="text-orange-500 mt-1" />
                  {phone}
                </div>
                <div className="flex gap-3">
                  <FaEnvelope className="text-blue-600 mt-1" />
                  {email}
                </div>
              </div>
            </div>

            {/* QUICK LINKS — hardcoded */}
            <div className="bg-white p-7 rounded-3xl shadow border hover:shadow-xl transition">
              <h3 className="font-bold mb-5">Quick Links</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="hover:text-orange-600 cursor-pointer">About Us</li>
                <li className="hover:text-orange-600 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-orange-600 cursor-pointer">Refund Policy</li>
                <li className="hover:text-orange-600 cursor-pointer">Terms & Conditions</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default HelpCenter;