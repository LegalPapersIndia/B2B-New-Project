

// // ================= IMPORTS =================
// import { motion } from "framer-motion";
// import {
//   FaGlobe,
//   FaUsers,
//   FaAward,
//   FaChartLine,
//   FaArrowRight,
//   FaCheckCircle,
//   FaBullseye,
//   FaEye,
//   FaRocket,
//   FaHandshake,
//   FaShieldAlt,
//   FaStar,
// } from "react-icons/fa";

// import { useNavigate } from "react-router-dom";


// // ================= COMPONENT =================
// export default function AboutUs() {

//   const navigate = useNavigate();

//   const storyCards = [
//     {
//       icon: <FaRocket />,
//       title: "Our Story",
//       desc: "Started with a vision to simplify global B2B trade and empower businesses worldwide.",
//     },
//     {
//       icon: <FaBullseye />,
//       title: "Our Mission",
//       desc: "Connecting buyers and suppliers through secure, modern, and trusted trade solutions.",
//     },
//     {
//       icon: <FaEye />,
//       title: "Our Vision",
//       desc: "To become the world's most trusted digital B2B marketplace ecosystem.",
//     },
//   ];

//   const timeline = [
//     {
//       year: "2023",
//       text: "Founded with a mission to modernize B2B sourcing.",
//     },
//     {
//       year: "2024",
//       text: "Expanded into international wholesale markets.",
//     },
//     {
//       year: "2025",
//       text: "Reached thousands of verified suppliers globally.",
//     },
//     {
//       year: "2026",
//       text: "Launched advanced AI-powered supplier matching.",
//     },
    
//   ];

//   const testimonials = [
//     {
//       name: "Amit Sharma",
//       role: "Export Manager",
//       text: "Amazing platform for international trade and supplier connections.",
//     },
//     {
//       name: "Sarah Johnson",
//       role: "Global Buyer",
//       text: "Professional experience with trusted suppliers and smooth communication.",
//     },
//     {
//       name: "Rahul Mehta",
//       role: "Manufacturer",
//       text: "Our business expanded globally after joining this platform.",
//     },
//   ];

//   return (
//     <div className="bg-[#f8fafc] overflow-hidden">

//       {/* HERO SECTION */}
//       <section className="relative min-h-screen flex items-center">

//         {/* BG IMAGE */}
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop')",
//           }}
//         />

//         {/* OVERLAY */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

//         {/* FLOATING BLUR */}
//         <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

//         {/* CONTENT */}
//         <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">

//           {/* LEFT */}
//           <motion.div
//             initial={{ opacity: 0, y: 70 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >

//             <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white mb-6">
//               <FaCheckCircle className="text-orange-400" />
//               Trusted By Global Businesses
//             </div>

//             <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
//               Building The Future Of
//               <span className="text-orange-500"> Global B2B Trade</span>
//             </h1>

//             <p className="mt-7 text-lg text-gray-300 max-w-2xl leading-relaxed">
//               We connect verified suppliers and buyers across the world with
//               modern technology, secure trade systems, and seamless sourcing
//               experiences.
//             </p>

//             {/* BUTTONS */}
//             <div className="flex flex-wrap gap-5 mt-10">

//               {/* HOME PAGE NAVIGATION */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.96 }}
//                 onClick={() => navigate("/")}
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 shadow-2xl"
//               >
//                 Explore Marketplace
//                 <FaArrowRight />
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.96 }}
//                 className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold"
//               >
//                 Learn More
//               </motion.button>

//             </div>
//           </motion.div>

//           {/* RIGHT IMAGE CARD */}
//           <motion.div
//             initial={{ opacity: 0, x: 80 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1 }}
//             className="relative hidden lg:block"
//           >

//             <motion.div
//               animate={{ y: [0, -15, 0] }}
//               transition={{
//                 duration: 5,
//                 repeat: Infinity,
//               }}
//               className="relative"
//             >

//               <img
//                 src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop"
//                 alt=""
//                 className="rounded-[32px] shadow-2xl border border-white/10"
//               />

//               {/* GLASS CARD */}
//               <div className="absolute -bottom-10 -left-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl w-72 shadow-2xl">

//                 <h3 className="text-white text-xl font-bold mb-2">
//                   10,000+ Verified Suppliers
//                 </h3>

//                 <p className="text-gray-300 text-sm">
//                   Trusted manufacturers and exporters from multiple industries.
//                 </p>

//               </div>

//             </motion.div>

//           </motion.div>

//         </div>
//       </section>

//       {/* ================= STORY / MISSION / VISION ================= */}
//       <section className="py-24">
//         <div className="max-w-7xl mx-auto px-6">

//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-black text-slate-900">
//               About Our Company
//             </h2>

//             <p className="text-slate-500 mt-5 text-lg max-w-3xl mx-auto">
//               We are creating a trusted ecosystem where businesses grow faster,
//               connect globally, and trade securely.
//             </p>
//           </div>

//           {/* CARDS */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//             {storyCards.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 70 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{
//                   duration: 0.6,
//                   delay: index * 0.1,
//                 }}
//                 whileHover={{
//                   y: -12,
//                   scale: 1.02,
//                 }}
//                 className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500"
//               >

//                 <div className="w-16 h-16 rounded-2xl bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center text-orange-500 group-hover:text-white text-3xl transition-all duration-500">
//                   {item.icon}
//                 </div>

//                 <h3 className="mt-6 text-2xl font-bold text-slate-900">
//                   {item.title}
//                 </h3>

//                 <p className="mt-4 text-slate-600 leading-relaxed">
//                   {item.desc}
//                 </p>

//               </motion.div>
//             ))}

//           </div>
//         </div>
//       </section>

//       {/* ================= OUR JOURNEY ================= */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-6">

//           <div className="text-center mb-20">
//             <h2 className="text-5xl font-black text-slate-900">
//               Our Journey
//             </h2>

//             <p className="text-slate-500 mt-4 text-lg">
//               A journey of innovation, trust, and global expansion.
//             </p>
//           </div>

//           <div className="relative">

//             {/* CENTER LINE */}
//             <div className="absolute left-1/2 top-0 h-full w-1 bg-orange-100 -translate-x-1/2 hidden md:block" />

//             <div className="space-y-12">

//               {timeline.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 70 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.7 }}
//                   className={`flex flex-col md:flex-row items-center gap-8 ${
//                     index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//                   }`}
//                 >

//                   {/* CARD */}
//                   <div className="w-full md:w-1/2">
//                     <div className="bg-[#f8fafc] border border-slate-100 rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all">

//                       <div className="text-orange-500 text-3xl font-black mb-3">
//                         {item.year}
//                       </div>

//                       <p className="text-slate-600 text-lg leading-relaxed">
//                         {item.text}
//                       </p>

//                     </div>
//                   </div>

//                   {/* DOT */}
//                   <div className="hidden md:flex w-6 h-6 bg-orange-500 rounded-full border-4 border-white shadow-lg z-10" />

//                   <div className="hidden md:block w-1/2" />

//                 </motion.div>
//               ))}

//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= CEO MESSAGE ================= */}
//       <section className="py-24">
//         <div className="max-w-7xl mx-auto px-6">

//           <div className="grid lg:grid-cols-2 gap-16 items-center">

//             {/* IMAGE */}
//             <motion.div
//               initial={{ opacity: 0, x: -70 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <img
//                 src="https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=H-lxhs3UVLNjIViPs7KnW44YLiVvSuOi3aLqDPLBnSg="
//                 alt=""
//                 className="rounded-[32px] shadow-2xl"
//               />
//             </motion.div>

//             {/* CONTENT */}
//             <motion.div
//               initial={{ opacity: 0, x: 70 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >

//               <div className="flex gap-1 text-orange-500 text-xl mb-5">
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//               </div>

//               <h2 className="text-5xl font-black text-slate-900 leading-tight">
//                 Message From Our CEO
//               </h2>

//               <p className="mt-8 text-slate-600 text-lg leading-relaxed">
//                 “We believe global trade should be simple, transparent,
//                 and accessible to every business. Our mission is to empower
//                 companies with technology-driven B2B solutions.”
//               </p>

//               <div className="mt-8">
//                 <h3 className="text-2xl font-bold text-slate-900">
//                   Anurag Gupta
//                 </h3>

//                 <p className="text-orange-500 font-medium">
//                   Founder & CEO
//                 </p>
//               </div>

//             </motion.div>

//           </div>
//         </div>
//       </section>

//       {/* ================= TESTIMONIALS ================= */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-6">

//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-black text-slate-900">
//               What Our Partners Say
//             </h2>

//             <p className="text-slate-500 mt-4 text-lg">
//               Trusted by businesses across the globe.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//             {testimonials.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 70 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{
//                   duration: 0.6,
//                   delay: index * 0.1,
//                 }}
//                 whileHover={{
//                   y: -10,
//                   scale: 1.02,
//                 }}
//                 className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl transition-all"
//               >

//                 <div className="flex gap-1 text-orange-500 mb-5">
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                 </div>

//                 <p className="text-slate-600 leading-relaxed italic">
//                   "{item.text}"
//                 </p>

//                 <div className="mt-8">
//                   <h3 className="text-xl font-bold text-slate-900">
//                     {item.name}
//                   </h3>

//                   <p className="text-orange-500 text-sm font-medium">
//                     {item.role}
//                   </p>
//                 </div>

//               </motion.div>
//             ))}

//           </div>
//         </div>
//       </section>

//        <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-600 text-white text-center">
//         <div className="max-w-4xl mx-auto px-6">
//           <h2 className="text-4xl lg:text-5xl font-bold mb-6">Join the B2B Revolution</h2>
//           <p className="text-xl mb-10">Become part of our growing community and take your business to the global stage.</p>
          
//           <motion.button 
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.98 }}
//             className="bg-white text-orange-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
//           >
//             Get Started Now — It's Free
//           </motion.button>
//         </div>
//       </section>

//     </div>
//   );
// }




// ================= IMPORTS =================
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaUsers,
  FaAward,
  FaChartLine,
  FaArrowRight,
  FaCheckCircle,
  FaBullseye,
  FaEye,
  FaRocket,
  FaHandshake,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";


// ================= COMPONENT =================
export default function AboutUs() {

  const navigate = useNavigate();

  const storyCards = [
    {
      icon: <FaRocket />,
      title: "Our Story",
      desc: "Started with a vision to simplify global B2B trade and empower businesses worldwide.",
    },
    {
      icon: <FaBullseye />,
      title: "Our Mission",
      desc: "Connecting buyers and suppliers through secure, modern, and trusted trade solutions.",
    },
    {
      icon: <FaEye />,
      title: "Our Vision",
      desc: "To become the world's most trusted digital B2B marketplace ecosystem.",
    },
  ];

  // ================= IMPACT STATS =================
  const impactStats = [
    {
      icon: <FaGlobe />,
      number: "50+",
      title: "Countries Served",
    },
    {
      icon: <FaUsers />,
      number: "10,000+",
      title: "Verified Suppliers",
    },
    {
      icon: <FaChartLine />,
      number: "50,000+",
      title: "Active Buyers",
    },
    {
      icon: <FaAward />,
      number: "5+",
      title: "Industry Awards",
    },
  ];

  const timeline = [
    {
      year: "2023",
      text: "Founded with a mission to modernize B2B sourcing.",
    },
    {
      year: "2024",
      text: "Expanded into international wholesale markets.",
    },
    {
      year: "2025",
      text: "Reached thousands of verified suppliers globally.",
    },
    {
      year: "2026",
      text: "Launched advanced AI-powered supplier matching.",
    },
  ];

  const testimonials = [
    {
      name: "Amit Sharma",
      role: "Export Manager",
      text: "Amazing platform for international trade and supplier connections.",
    },
    {
      name: "Sarah Johnson",
      role: "Global Buyer",
      text: "Professional experience with trusted suppliers and smooth communication.",
    },
    {
      name: "Rahul Mehta",
      role: "Manufacturer",
      text: "Our business expanded globally after joining this platform.",
    },
  ];

  return (
    <div className="bg-[#f8fafc] overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center">

        {/* BG IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

        {/* FLOATING BLUR */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white mb-6">
              <FaCheckCircle className="text-orange-400" />
              Trusted By Global Businesses
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
              Building The Future Of
              <span className="text-orange-500"> Global B2B Trade</span>
            </h1>

            <p className="mt-7 text-lg text-gray-300 max-w-2xl leading-relaxed">
              We connect verified suppliers and buyers across the world with
              modern technology, secure trade systems, and seamless sourcing
              experiences.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mt-10">

              {/* HOME PAGE NAVIGATION */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 shadow-2xl"
              >
                Explore Marketplace
                <FaArrowRight />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold"
              >
                Learn More
              </motion.button>

            </div>
          </motion.div>

          {/* RIGHT IMAGE CARD */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="relative"
            >

              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop"
                alt=""
                className="rounded-[32px] shadow-2xl border border-white/10"
              />

              {/* GLASS CARD */}
              <div className="absolute -bottom-10 -left-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl w-72 shadow-2xl">

                <h3 className="text-white text-xl font-bold mb-2">
                  10,000+ Verified Suppliers
                </h3>

                <p className="text-gray-300 text-sm">
                  Trusted manufacturers and exporters from multiple industries.
                </p>

              </div>

            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* ================= STORY / MISSION / VISION ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-900">
              About Our Company
            </h2>

            <p className="text-slate-500 mt-5 text-lg max-w-3xl mx-auto">
              We are creating a trusted ecosystem where businesses grow faster,
              connect globally, and trade securely.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {storyCards.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:border-orange-200 hover:bg-orange-50/40"
              >

                <div className="w-16 h-16 rounded-2xl bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center text-orange-500 group-hover:text-white text-3xl transition-all duration-500">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= IMPACT STATS ================= */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="text-center mb-16">

            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-semibold mb-5">
              <FaAward />
              Our Global Impact
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
              Trusted By Businesses Worldwide
            </h2>

            <p className="text-slate-500 text-lg mt-5 max-w-3xl mx-auto">
              Our growing network of suppliers and buyers continues to expand
              across multiple countries and industries.
            </p>

          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {impactStats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 text-center hover:bg-orange-50/40 hover:border-orange-200"
              >

                <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center text-orange-500 group-hover:text-white text-3xl transition-all duration-500 mb-6">
                  {item.icon}
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-slate-900">
                  {item.number}
                </h3>

                <p className="mt-3 text-slate-600 font-medium">
                  {item.title}
                </p>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= OUR JOURNEY ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900">
              Our Journey
            </h2>

            <p className="text-slate-500 mt-4 text-lg">
              A journey of innovation, trust, and global expansion.
            </p>
          </div>

          <div className="relative">

            {/* CENTER LINE */}
            <div className="absolute left-1/2 top-0 h-full w-1 bg-orange-100 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >

                  {/* CARD */}
                  <div className="w-full md:w-1/2">
                    <div className="bg-[#f8fafc] border border-slate-100 rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:bg-orange-50/40 hover:border-orange-200">

                      <div className="text-orange-500 text-3xl font-black mb-3">
                        {item.year}
                      </div>

                      <p className="text-slate-600 text-lg leading-relaxed">
                        {item.text}
                      </p>

                    </div>
                  </div>

                  {/* DOT */}
                  <div className="hidden md:flex w-6 h-6 bg-orange-500 rounded-full border-4 border-white shadow-lg z-10" />

                  <div className="hidden md:block w-1/2" />

                </motion.div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* ================= CEO MESSAGE ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=H-lxhs3UVLNjIViPs7KnW44YLiVvSuOi3aLqDPLBnSg="
                alt=""
                className="rounded-[32px] shadow-2xl"
              />
            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >

              <div className="flex gap-1 text-orange-500 text-xl mb-5">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <h2 className="text-5xl font-black text-slate-900 leading-tight">
                Message From Our CEO
              </h2>

              <p className="mt-8 text-slate-600 text-lg leading-relaxed">
                “We believe global trade should be simple, transparent,
                and accessible to every business. Our mission is to empower
                companies with technology-driven B2B solutions.”
              </p>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-slate-900">
                  Anurag Gupta
                </h3>

                <p className="text-orange-500 font-medium">
                  Founder & CEO
                </p>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-900">
              What Our Partners Say
            </h2>

            <p className="text-slate-500 mt-4 text-lg">
              Trusted by businesses across the globe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:bg-orange-50/40 hover:border-orange-200"
              >

                <div className="flex gap-1 text-orange-500 mb-5">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <p className="text-slate-600 leading-relaxed italic">
                  "{item.text}"
                </p>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="text-orange-500 text-sm font-medium">
                    {item.role}
                  </p>
                </div>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-600 text-white text-center relative overflow-hidden">

        {/* BLUR EFFECT */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            Join the B2B Revolution
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="text-xl mb-10 text-white/90"
          >
            Become part of our growing community and take your business to the global stage.
          </motion.p>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="bg-white text-orange-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
          >
            Get Started Now — It's Free
          </motion.button>

        </div>
      </section>

    </div>
  );
}
