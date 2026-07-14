// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaStore,
//   FaGlobe,
//   FaRocket,
//   FaShieldAlt,
//   FaUsers,
//   FaChartLine,
//   FaPaperPlane,
//   FaCheckCircle,
//   FaLaptop,
// } from "react-icons/fa";

// const BecomeSeller = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     business: "",
//     message: "",
//   });

//   const [openFaq, setOpenFaq] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Seller application submitted successfully!");
//   };

//   const toggleFaq = (i) => {
//     setOpenFaq(openFaq === i ? null : i);
//   };

//   return (
//     <div className="bg-slate-50 min-h-screen">

//       {/* ================= HERO ================= */}
//       <section className="relative py-28 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-orange-600" />

//         <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
//           <h1 className="text-5xl md:text-6xl font-black">
//             Become a <span className="text-orange-500">Trusted Seller</span>
//           </h1>

//           <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
//             Join our global B2B marketplace and start selling worldwide.
//           </p>

//           {/* <button className="mt-10 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-semibold">
//             Start Selling Now
//           </button> */}
//         </div>
//       </section>

//       {/* ================= WHY SELL ================= */}
//       <section className="py-24">
//         <div className="max-w-7xl mx-auto px-6 text-center mb-16">
//           <h2 className="text-5xl font-black">Why Sell With Us</h2>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">

//           {[
//             { icon: <FaGlobe />, title: "Global Reach", desc: "Sell worldwide" },
//             { icon: <FaUsers />, title: "Verified Buyers", desc: "Trusted leads" },
//             { icon: <FaChartLine />, title: "Grow Faster", desc: "Boost sales" },
//             { icon: <FaShieldAlt />, title: "Secure", desc: "Safe payments" },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ y: -10, scale: 1.02 }}
//               className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition"
//             >
//               <div className="text-4xl text-orange-600 mb-4">
//                 {item.icon}
//               </div>
//               <h3 className="font-bold text-lg">{item.title}</h3>
//               <p className="text-gray-500 mt-2">{item.desc}</p>
//             </motion.div>
//           ))}

//         </div>
//       </section>

//       {/* ================= HOW IT WORKS (4 CARDS UPDATED) ================= */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-6 text-center mb-16">
//           <h2 className="text-4xl font-black">How It Works</h2>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">

//           {[
//             {
//               icon: <FaStore />,
//               title: "Create Account",
//               desc: "Sign up as seller in few minutes",
//             },
//             {
//               icon: <FaLaptop />,
//               title: "Upload Products",
//               desc: "Add your product listings easily",
//             },
//             {
//               icon: <FaGlobe />,
//               title: "Get Visibility",
//               desc: "Reach global buyers instantly",
//             },
//             {
//               icon: <FaRocket />,
//               title: "Start Selling",
//               desc: "Receive orders & grow business",
//             },
//           ].map((step, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ y: -10, scale: 1.03 }}
//               className="bg-slate-50 rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition"
//             >
//               <div className="text-4xl text-orange-600 mb-4">
//                 {step.icon}
//               </div>
//               <h3 className="font-bold text-lg">{step.title}</h3>
//               <p className="text-gray-500 mt-2 text-sm">{step.desc}</p>
//             </motion.div>
//           ))}

//         </div>
//       </section>

//       {/* ================= REQUIREMENTS (BIG CARD UPDATED) ================= */}
//       <section className="py-24">
//         <div className="max-w-4xl mx-auto px-6">

//           <h2 className="text-4xl font-black text-center mb-12">
//             Requirements
//           </h2>

//           <div className="bg-white rounded-3xl p-10 shadow-xl">

//             <div className="grid md:grid-cols-2 gap-6">

//               {[
//                 { icon: <FaCheckCircle />, text: "Business Registration Certificate" },
//                 { icon: <FaCheckCircle />, text: "Valid Bank Account Details" },
//                 { icon: <FaCheckCircle />, text: "Product Information & Images" },
//                 { icon: <FaCheckCircle />, text: "GST / Tax Details (if applicable)" },
//               ].map((r, i) => (
//                 <div key={i} className="flex items-center gap-3 bg-slate-50 p-5 rounded-2xl">
//                   <span className="text-orange-600">{r.icon}</span>
//                   <span className="font-medium text-gray-700">{r.text}</span>
//                 </div>
//               ))}

//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ================= BENEFITS ================= */}
//       <section className="py-24">
//         <div className="max-w-6xl mx-auto px-6 text-center mb-16">
//           <h2 className="text-4xl font-black">Seller Benefits</h2>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6">

//           {[
//             "Zero setup cost",
//             "Easy dashboard access",
//             "Direct buyer connection",
//             "Marketing support",
//           ].map((b, i) => (
//             <div key={i} className="flex items-center gap-3 bg-white p-6 rounded-2xl shadow">
//               <FaCheckCircle className="text-orange-600 text-xl" />
//               <span className="font-medium">{b}</span>
//             </div>
//           ))}

//         </div>
//       </section>

    
//       {/* ================= FAQ (OPEN/CLOSE ADDED) ================= */}
//       <section className="pb-24">
//         <div className="max-w-4xl mx-auto px-6">

//           <h2 className="text-4xl font-black text-center mb-10">
//             Seller FAQs
//           </h2>

//           <div className="space-y-5">

//             {[
//               {
//                 q: "Is it free to become a seller?",
//                 a: "Yes, registration is completely free.",
//               },
//               {
//                 q: "How do I get buyers?",
//                 a: "We promote your products globally.",
//               },
//               {
//                 q: "When do I get payments?",
//                 a: "Payments are released after order confirmation.",
//               },
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 className="bg-white rounded-2xl shadow-md overflow-hidden"
//               >

//                 <button
//                   onClick={() => toggleFaq(i)}
//                   className="w-full p-6 text-left font-semibold flex justify-between"
//                 >
//                   {item.q}
//                   <span>{openFaq === i ? "−" : "+"}</span>
//                 </button>

//                 <AnimatePresence>
//                   {openFaq === i && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       className="px-6 pb-6 text-gray-600"
//                     >
//                       {item.a}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//               </motion.div>
//             ))}

//           </div>

//         </div>
//       </section>

//     </div>
//   );
// };

// export default BecomeSeller;



// src/Pages/BecomeSeller.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaStore,
  FaGlobe,
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaCheckCircle,
  FaLaptop,
  FaArrowRight,
  FaMedal,
  FaCrown,
  FaGem,
  FaMapMarkerAlt,
  FaFileContract,
  FaUniversity,
  FaImages,
  FaFileInvoiceDollar,
  FaWallet,
  FaTachometerAlt,
  FaHandshake,
  FaBullhorn,
} from "react-icons/fa";

const BecomeSeller = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (i) => {
    setOpenFaq(openFaq === i ? null : i);
  };

  const whySellItems = [
    { icon: <FaGlobe />, title: "Global Reach", desc: "Showcase your products to buyers across India and beyond, not just your local market." },
    { icon: <FaUsers />, title: "Verified Buyers", desc: "Every lead comes from a genuine, verified business buyer — no spam, no time-wasters." },
    { icon: <FaChartLine />, title: "Trending Visibility", desc: "Get discovered through trending categories and subcategory rankings on the homepage." },
    { icon: <FaMapMarkerAlt />, title: "Manufacturing Hubs", desc: "Your profile is featured under your city's Manufacturing Hub, seen by regional buyers." },
  ];

  const howItWorks = [
    { icon: <FaStore />, title: "Create Account", desc: "Register as a seller with quick email OTP verification — no paperwork delays." },
    { icon: <FaLaptop />, title: "Set Up Your Profile", desc: "Add products, company details, and images from your seller dashboard." },
    { icon: <FaGlobe />, title: "Get Discovered", desc: "Your listings go live across categories, search, and your city's hub page." },
    { icon: <FaRocket />, title: "Receive Leads", desc: "Verified buyer inquiries land directly in your dashboard — respond and grow." },
  ];

  //  UPDATED - har requirement ka apna distinct icon (pehle sabka same FaCheckCircle tha)
  const requirements = [
    { icon: <FaFileContract />, title: "Business Registration", desc: "Certificate proving your business is legally registered." },
    { icon: <FaUniversity />, title: "Bank Account Details", desc: "Valid account details for receiving payments." },
    { icon: <FaImages />, title: "Product Info & Images", desc: "Clear photos and details of what you're selling." },
    { icon: <FaFileInvoiceDollar />, title: "GST / Tax Details", desc: "Applicable tax registration documents, if any." },
  ];

  const plans = [
    { icon: <FaMedal />, name: "Silver", color: "text-slate-500 bg-slate-100", desc: "Get started with essential listing tools and standard lead access — perfect to test the waters." },
    { icon: <FaCrown />, name: "Gold", color: "text-orange-600 bg-orange-100", desc: "Faster lead delivery and better product visibility for sellers ready to scale up." },
    { icon: <FaGem />, name: "Diamond", color: "text-blue-700 bg-blue-100", desc: "Maximum exposure with featured placement, fastest lead delivery, and priority support." },
  ];

  //  UPDATED - har benefit ka apna distinct icon + short desc, ab proper card hai
  const benefits = [
    { icon: <FaWallet />, title: "Zero Setup Cost", desc: "Start selling without any listing or hidden setup fees." },
    { icon: <FaTachometerAlt />, title: "Easy Dashboard Access", desc: "Manage products, leads and orders from one simple place." },
    { icon: <FaHandshake />, title: "Direct Buyer Connection", desc: "Talk to buyers directly — no middlemen involved." },
    { icon: <FaBullhorn />, title: "Marketing Support", desc: "We help promote your products across the platform." },
  ];

  const faqs = [
    { q: "Is it free to become a seller?", a: "Yes, registration is completely free. You can start listing right away, and upgrade to a Silver, Gold, or Diamond plan anytime from your dashboard for extra visibility and faster leads." },
    { q: "What are the Silver, Gold and Diamond plans?", a: "These are our seller subscription tiers. Each one offers a different level of lead delivery speed, product visibility, and support — Diamond being the most premium." },
    { q: "How do I get buyers?", a: "Once your profile is live, your products appear in relevant categories, trending sections, and your city's Manufacturing Hub page — so buyers can find and contact you directly." },
    { q: "How are leads distributed?", a: "Buyer inquiries are distributed to sellers based on category match and plan tier — higher plans get faster, and sometimes earlier, access to new leads." },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-5"
            >
              <FaStore className="w-4 h-4" />
              Start Selling Today
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            >
              Become a
              <span className="block text-orange-400">Trusted Seller</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-blue-100 text-base leading-relaxed mb-8 max-w-2xl"
            >
              Join India's fastest-growing B2B wholesale marketplace and connect
              with thousands of verified buyers across the country.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl transition-all"
            >
              Start Selling Now
              <FaArrowRight />
            </motion.button>
          </div>
        </div>
      </section>

     
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">Why Sell With Us</h2>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
            Everything you need to turn your business into a trusted online supplier.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
          {whySellItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:border-orange-200 overflow-hidden"
            >
              {/*  UPDATED - line ab top-0 pe hai (pehle bottom-0 tha) */}
              <span className="absolute top-0 left-0 h-1 w-0 bg-orange-500 group-hover:w-full transition-all duration-500 rounded-full" />
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 rounded-2xl bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center text-orange-500 group-hover:text-white text-2xl transition-colors duration-500"
              >
                {item.icon}
              </motion.div>
              <h3 className="font-bold text-lg text-slate-900 mt-5">{item.title}</h3>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ( UPDATED - same p-7 padding, top hover line added) ================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">How It Works</h2>
          <p className="text-slate-500 mt-3">From sign-up to your first lead — in four simple steps.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
          {howItWorks.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-slate-50 rounded-3xl p-7 text-center shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <span className="absolute top-0 left-0 h-1 w-0 bg-orange-500 group-hover:w-full transition-all duration-500 rounded-full" />
              <div className="absolute top-4 right-5 text-slate-200 font-black text-3xl select-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-2xl">
                {step.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-900 mt-5">{step.title}</h3>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= REQUIREMENTS ( UPDATED - ab proper icon-cards hain, same p-7 padding, top hover line) ================= */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Requirements</h2>
          <p className="text-slate-500 mt-3">Keep these ready before you start your seller registration.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
          {requirements.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:border-orange-200 overflow-hidden"
            >
              <span className="absolute top-0 left-0 h-1 w-0 bg-orange-500 group-hover:w-full transition-all duration-500 rounded-full" />
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 rounded-2xl bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center text-orange-500 group-hover:text-white text-2xl transition-colors duration-500"
              >
                {r.icon}
              </motion.div>
              <h3 className="font-bold text-lg text-slate-900 mt-5">{r.title}</h3>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SUBSCRIPTION PLANS ================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Choose Your Plan</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Start free, and upgrade whenever you're ready for more visibility and faster leads.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-slate-50 rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500 text-center overflow-hidden"
            >
              <span className="absolute top-0 left-0 h-1 w-0 bg-orange-500 group-hover:w-full transition-all duration-500 rounded-full" />
              <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl ${plan.color}`}>
                {plan.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-900 mt-5">{plan.name}</h3>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">{plan.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Seller Benefits</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:border-orange-200 overflow-hidden"
            >
              <span className="absolute top-0 left-0 h-1 w-0 bg-orange-500 group-hover:w-full transition-all duration-500 rounded-full" />
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 rounded-2xl bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center text-orange-500 group-hover:text-white text-2xl transition-colors duration-500"
              >
                {b.icon}
              </motion.div>
              <h3 className="font-bold text-lg text-slate-900 mt-5">{b.title}</h3>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-black text-center text-slate-900 mb-10">Seller FAQs</h2>

          <div className="space-y-5">
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-6 text-left font-semibold flex justify-between items-center text-slate-900"
                >
                  {item.q}
                  <span className="text-orange-500 text-xl shrink-0 ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-slate-600 text-sm leading-relaxed"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default BecomeSeller;