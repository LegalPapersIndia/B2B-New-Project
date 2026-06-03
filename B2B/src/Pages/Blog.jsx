// // // src/Pages/Blog.jsx
// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { FaClock, FaUser, FaTag, FaArrowRight } from "react-icons/fa";

// // const blogPosts = [
// //   {
// //     id: 1,
// //     title: "How to Choose Reliable Suppliers in 2025: A Complete Guide",
// //     excerpt:
// //       "Learn the essential steps to verify suppliers, check certifications, evaluate MOQs, and avoid common pitfalls in global sourcing.",
// //     category: "Sourcing Tips",
// //     author: "Rahul Gupta",
// //     date: "Feb 15, 2025",
// //     readTime: "8 min",
// //     image:
// //       "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
// //     featured: true,
// //   },
// //   {
// //     id: 2,
// //     title: "Top 10 Export Trends Shaping Indian B2B Market in 2025",
// //     excerpt:
// //       "From sustainable packaging to digital traceability — discover the trends Indian exporters must adopt to stay competitive globally.",
// //     category: "Market Trends",
// //     author: "Priya Sharma",
// //     date: "Feb 10, 2025",
// //     readTime: "6 min",
// //     image:
// //       "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
// //   },
// //   {
// //     id: 3,
// //     title: "Understanding MOQ Negotiation: Strategies That Actually Work",
// //     excerpt:
// //       "Practical tips on how buyers and suppliers can negotiate minimum order quantities without damaging the relationship.",
// //     category: "Negotiation",
// //     author: "Amit Verma",
// //     date: "Feb 5, 2025",
// //     readTime: "7 min",
// //     image:
// //       "https://images.unsplash.com/photo-1556740714-a8395b3a74dd?auto=format&fit=crop&q=80&w=800",
// //   },
// //   {
// //     id: 4,
// //     title: "How to Use B2B Portal Analytics to Boost Your Sales",
// //     excerpt:
// //       "A step-by-step guide to understanding your dashboard metrics and turning data into more inquiries and closed deals.",
// //     category: "Platform Guide",
// //     author: "Neha Kapoor",
// //     date: "Jan 28, 2025",
// //     readTime: "5 min",
// //     image:
// //       "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
// //   },
// //   {
// //     id: 5,
// //     title: "Pharmaceutical Export Compliance: What Indian Suppliers Must Know",
// //     excerpt:
// //       "Key regulations, certifications (WHO-GMP, USFDA), documentation, and common compliance mistakes to avoid.",
// //     category: "Compliance",
// //     author: "Dr. Sanjay Mehta",
// //     date: "Jan 20, 2025",
// //     readTime: "10 min",
// //     image:
// //       "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=800",
// //   },
// //   {
// //     id: 6,
// //     title: "Sustainable Packaging Trends for Food & Beverage Exporters",
// //     excerpt:
// //       "Eco-friendly materials, biodegradable options, and how to meet international buyer demands for green packaging.",
// //     category: "Sustainability",
// //     author: "Anjali Singh",
// //     date: "Jan 12, 2025",
// //     readTime: "7 min",
// //     image:
// //       "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=800",
// //   },
// // ];

// // const categories = [
// //   "All",
// //   "Sourcing Tips",
// //   "Market Trends",
// //   "Platform Guide",
// //   "Negotiation",
// //   "Compliance",
// //   "Sustainability",
// //   "Success Stories",
// // ];

// // const Blog = () => {
// //   const [activeCategory, setActiveCategory] = useState("All");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const postsPerPage = 6;

// //   const filteredPosts =
// //     activeCategory === "All"
// //       ? blogPosts
// //       : blogPosts.filter((post) => post.category === activeCategory);

// //   const indexOfLastPost = currentPage * postsPerPage;
// //   const indexOfFirstPost = indexOfLastPost - postsPerPage;
// //   const currentPosts = filteredPosts.slice(
// //     indexOfFirstPost,
// //     indexOfLastPost
// //   );
// //   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

// //   const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

// //   return (
// //     <div className="min-h-screen bg-[#f8fafc]">

// //       {/* ================= HERO ================= */}
// //       <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-orange-700 text-white py-20 lg:py-32 overflow-hidden">

// //         {/* glow */}
// //         <motion.div
// //           animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
// //           transition={{ duration: 10, repeat: Infinity }}
// //           className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"
// //         />

// //         <motion.div
// //           animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
// //           transition={{ duration: 12, repeat: Infinity }}
// //           className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full"
// //         />

// //         <div className="relative max-w-7xl mx-auto px-6">

// //           <div className="grid lg:grid-cols-2 gap-12 items-center">

// //             <motion.div
// //               initial={{ opacity: 0, y: 40 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.8 }}
// //             >
// //               <span className="inline-block px-5 py-2 bg-orange-500/30 rounded-full text-orange-100 font-semibold mb-6">
// //                 FEATURED ARTICLE
// //               </span>

// //               <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
// //                 {featuredPost.title}
// //               </h1>

// //               <p className="text-blue-100 text-lg mb-8 max-w-xl">
// //                 {featuredPost.excerpt}
// //               </p>

// //               <div className="flex flex-wrap gap-5 text-sm text-blue-100">
// //                 <span className="flex items-center gap-2">
// //                   <FaUser /> {featuredPost.author}
// //                 </span>
// //                 <span className="flex items-center gap-2">
// //                   <FaClock /> {featuredPost.readTime}
// //                 </span>
// //                 <span className="flex items-center gap-2">
// //                   <FaTag /> {featuredPost.category}
// //                 </span>
// //               </div>

// //               <button className="mt-10 bg-white text-blue-700 hover:text-blue-800 hover:bg-blue-50 px-10 py-4 rounded-2xl font-bold transition-all hover:scale-[1.03] active:scale-95">
// //                 Read Full Article →
// //               </button>
// //             </motion.div>

// //             <motion.img
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ duration: 0.9 }}
// //               src={featuredPost.image}
// //               className="hidden lg:block w-full h-[480px] object-cover rounded-3xl shadow-2xl"
// //             />
// //           </div>
// //         </div>
// //       </section>

// //       {/* ================= CONTENT ================= */}
// //       <div className="max-w-7xl mx-auto px-6 py-20">

// //         <div className="grid lg:grid-cols-3 gap-12">

// //           {/* LEFT */}
// //           <div className="lg:col-span-2">

// //             {/* FILTER */}
// //             <div className="flex flex-wrap gap-3 mb-10">
// //               {categories.map((cat) => (
// //                 <button
// //                   key={cat}
// //                   onClick={() => {
// //                     setActiveCategory(cat);
// //                     setCurrentPage(1);
// //                   }}
// //                   className={`px-5 py-3 rounded-2xl text-sm font-medium transition-all ${
// //                     activeCategory === cat
// //                       ? "bg-blue-600 text-white shadow-md"
// //                       : "bg-white border border-gray-200 hover:bg-gray-100"
// //                   }`}
// //                 >
// //                   {cat}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* POSTS */}
// //             <div className="grid md:grid-cols-2 gap-8">

// //               {currentPosts.map((post) => (
// //                 <motion.article
// //                   key={post.id}
// //                   initial={{ opacity: 0, y: 30 }}
// //                   whileInView={{ opacity: 1, y: 0 }}
// //                   viewport={{ once: true }}
// //                   whileHover={{ y: -8 }}
// //                   className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-gray-100 group"
// //                 >
// //                   <img
// //                     src={post.image}
// //                     className="h-52 w-full object-cover group-hover:scale-105 transition"
// //                   />

// //                   <div className="p-6">

// //                     <div className="flex gap-4 text-xs text-gray-500 mb-3">
// //                       <span className="flex items-center gap-1">
// //                         <FaUser /> {post.author}
// //                       </span>
// //                       <span className="flex items-center gap-1">
// //                         <FaClock /> {post.readTime}
// //                       </span>
// //                     </div>

// //                     <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition">
// //                       {post.title}
// //                     </h3>

// //                     <p className="text-gray-600 text-sm mb-5">
// //                       {post.excerpt}
// //                     </p>

// //                     <div className="flex justify-between items-center text-sm">
// //                       <span className="text-blue-600 flex items-center gap-1">
// //                         <FaTag /> {post.category}
// //                       </span>

// //                       <button className="text-blue-600 flex items-center gap-2 hover:gap-3 transition-all">
// //                         Read <FaArrowRight />
// //                       </button>
// //                     </div>

// //                   </div>
// //                 </motion.article>
// //               ))}

// //             </div>

// //             {/* PAGINATION */}
// //             <div className="flex justify-center mt-14 gap-3">
// //               <button
// //                 onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
// //                 className="px-6 py-3 bg-white border rounded-2xl"
// //               >
// //                 Prev
// //               </button>

// //               <span className="px-6 py-3 bg-blue-600 text-white rounded-2xl">
// //                 {currentPage} / {totalPages}
// //               </span>

// //               <button
// //                 onClick={() =>
// //                   setCurrentPage((p) => Math.min(totalPages, p + 1))
// //                 }
// //                 className="px-6 py-3 bg-white border rounded-2xl"
// //               >
// //                 Next
// //               </button>
// //             </div>

// //           </div>

// //           {/* SIDEBAR */}
// //           <aside className="space-y-8 lg:sticky lg:top-10">

// //             <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 rounded-3xl shadow-lg">
// //               <h3 className="text-2xl font-bold mb-4 text-blue-600">
// //                 Stay Updated
// //               </h3>

// //               <p className="text-gray-600 mb-6">
// //                 Get latest B2B insights directly in your inbox.
// //               </p>

// //               <input
// //                 placeholder="Enter email"
// //                 className="w-full p-4 rounded-2xl border mb-4"
// //               />

// //               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold">
// //                 Subscribe
// //               </button>
// //             </div>

// //           </aside>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Blog;



// // src/Pages/Blog.jsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaClock, FaUser, FaTag, FaArrowRight } from "react-icons/fa";

// const blogPosts = [
//   {
//     id: 1,
//     title: "How to Choose Reliable Suppliers in 2025: A Complete Guide",
//     excerpt:
//       "Learn the essential steps to verify suppliers, check certifications, evaluate MOQs, and avoid common pitfalls in global sourcing.",
//     category: "Sourcing Tips",
//     author: "Rahul Gupta",
//     date: "Feb 15, 2025",
//     readTime: "8 min",
//     image:
//       "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
//     featured: true,
//   },
//   {
//     id: 2,
//     title: "Top 10 Export Trends Shaping Indian B2B Market in 2025",
//     excerpt:
//       "From sustainable packaging to digital traceability — discover the trends Indian exporters must adopt to stay competitive globally.",
//     category: "Market Trends",
//     author: "Priya Sharma",
//     date: "Feb 10, 2025",
//     readTime: "6 min",
//     image:
//       "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 3,
//     title: "Understanding MOQ Negotiation: Strategies That Actually Work",
//     excerpt:
//       "Practical tips on how buyers and suppliers can negotiate minimum order quantities without damaging the relationship.",
//     category: "Negotiation",
//     author: "Amit Verma",
//     date: "Feb 5, 2025",
//     readTime: "7 min",
//     image:
//       "https://images.unsplash.com/photo-1556740714-a8395b3a74dd?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 4,
//     title: "How to Choose Reliable Suppliers in 2025: A Complete Guide",
//     excerpt:
//       "Learn the essential steps to verify suppliers, check certifications, evaluate MOQs, and avoid common pitfalls in global sourcing.",
//     category: "Sourcing Tips",
//     author: "Rahul Gupta",
//     date: "Feb 15, 2025",
//     readTime: "8 min",
//     image:
//       "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
//     featured: true,
//   },
//   {
//     id: 5,
//     title: "Top 10 Export Trends Shaping Indian B2B Market in 2025",
//     excerpt:
//       "From sustainable packaging to digital traceability — discover the trends Indian exporters must adopt to stay competitive globally.",
//     category: "Market Trends",
//     author: "Priya Sharma",
//     date: "Feb 10, 2025",
//     readTime: "6 min",
//     image:
//       "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
//   },
//    {
//     id: 6,
//     title: "Top 10 Export Trends Shaping Indian B2B Market in 2025",
//     excerpt:
//       "From sustainable packaging to digital traceability — discover the trends Indian exporters must adopt to stay competitive globally.",
//     category: "Market Trends",
//     author: "Priya Sharma",
//     date: "Feb 10, 2025",
//     readTime: "6 min",
//     image:
//       "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
//   },
  
  
// ];

// const categories = [
//   "All",
//   "Sourcing Tips",
//   "Market Trends",
//   "Negotiation",
//   "Platform Guide",
// ];

// export default function Blog() {
//   const [activeCategory, setActiveCategory] = useState("All");

//   const featuredPost =
//     blogPosts.find((p) => p.featured) || blogPosts[0];

//   const filtered =
//     activeCategory === "All"
//       ? blogPosts
//       : blogPosts.filter((p) => p.category === activeCategory);

//   return (
//     <div className="bg-[#f8fafc] overflow-hidden">

//       {/* ================= HERO (ABOUT STYLE) ================= */}
//     {/* HERO SECTION */}
// <section className="relative min-h-[85vh] flex items-center">

//   {/* BACKGROUND */}
//   <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-orange-700" />

//   {/* BLUR EFFECTS */}
//   <motion.div
//     animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
//     transition={{ duration: 8, repeat: Infinity }}
//     className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"
//   />

//   <motion.div
//     animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
//     transition={{ duration: 10, repeat: Infinity }}
//     className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full"
//   />

//   <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

//     {/* LEFT */}
//     <motion.div
//       initial={{ opacity: 0, y: 60 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.9 }}
//     >

//       <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm text-white mb-6">
//         BLOG INSIGHTS
//       </div>

//       <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight">
//         Latest Insights on
//         <span className="text-orange-500"> Global B2B Trade</span>
//       </h1>

//       <p className="mt-6 text-gray-300 text-lg max-w-xl">
//         Explore expert guides, industry trends, sourcing tips, and
//         strategies to grow your business globally.
//       </p>

//       {/* BUTTONS */}
//       <div className="flex flex-wrap gap-5 mt-10">

//         <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl transition-all hover:scale-[1.05] active:scale-95">
//           Explore Articles
//         </button>

//         <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all">
//           Subscribe
//         </button>

//       </div>
//     </motion.div>

//     {/* RIGHT CARD (HEIGHT REDUCED) */}
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 1 }}
//       className="hidden lg:block"
//     >

//       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 shadow-2xl">

//         <img
//           src={featuredPost.image}
//           className="rounded-3xl mb-4 h-[280px] w-full object-cover"
//         />

//         <h3 className="text-white text-xl font-bold">
//           {featuredPost.title}
//         </h3>

//         <p className="text-gray-300 mt-2 text-sm">
//           {featuredPost.excerpt}
//         </p>

//         <button className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold">
//           Read More →
//         </button>

//       </div>

//     </motion.div>

//   </div>
// </section>

//       {/* ================= CONTENT ================= */}
//       <div className="max-w-7xl mx-auto px-6 py-20">

//         {/* CATEGORY FILTER */}
//         <div className="flex flex-wrap gap-3 mb-12 justify-center">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-5 py-3 rounded-2xl text-sm font-medium transition-all ${
//                 activeCategory === cat
//                   ? "bg-orange-500 text-white"
//                   : "bg-white border hover:bg-gray-100"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* POSTS */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//           {filtered.map((post) => (
//             <motion.div
//               key={post.id}
//               whileHover={{ y: -8 }}
//               className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all"
//             >

//               <img
//                 src={post.image}
//                 className="h-52 w-full object-cover"
//               />

//               <div className="p-6">

//                 <div className="flex gap-4 text-xs text-gray-500 mb-3">
//                   <span className="flex items-center gap-1">
//                     <FaUser /> {post.author}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <FaClock /> {post.readTime}
//                   </span>
//                 </div>

//                 <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition">
//                   {post.title}
//                 </h3>

//                 <p className="text-gray-600 text-sm mb-5">
//                   {post.excerpt}
//                 </p>

//                 <div className="flex justify-between items-center text-sm">
//                   <span className="text-blue-600 flex items-center gap-1">
//                     <FaTag /> {post.category}
//                   </span>

//                   <button className="text-orange-500 flex items-center gap-2 hover:gap-3 transition-all">
//                     Read <FaArrowRight />
//                   </button>
//                 </div>

//               </div>
//             </motion.div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// }




// src/Pages/Blog.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClock, FaUser, FaTag, FaArrowRight } from "react-icons/fa";
import { getAllBlogs } from "../api/blogApi";

const categories = ["All", "Sourcing Tips", "Market Trends", "Negotiation", "Platform Guide"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs]                   = useState([]);
  const [loading, setLoading]               = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllBlogs();
        if (data.success) setBlogs(data.blogs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const featuredPost = blogs.find(p => p.isPublished) || blogs[0];

  const filtered = activeCategory === "All"
    ? blogs
    : blogs.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#f8fafc] overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-orange-700" />

        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full"
        />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm text-white mb-6">
              ✦ BLOG INSIGHTS
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight">
              Latest Insights on
              <span className="text-orange-500"> Global B2B Trade</span>
            </h1>
            <p className="mt-6 text-gray-300 text-lg max-w-xl">
              Explore expert guides, industry trends, sourcing tips, and strategies to grow your business globally.
            </p>
            <div className="flex flex-wrap gap-5 mt-10">
              <a href="#blogs" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl transition-all hover:scale-[1.05] active:scale-95">
                Explore Articles
              </a>
              {/* <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all">
                Subscribe
              </button> */}
            </div>
          </motion.div>

          {/* RIGHT — FEATURED CARD */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="hidden lg:block">
            {featuredPost && (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 shadow-2xl">
                <div className="relative overflow-hidden rounded-3xl mb-4">
                  <img
                    src={featuredPost.image?.url || "/placeholder.png"}
                    className="h-[260px] w-full object-cover"
                    alt={featuredPost.title}
                  />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Featured
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/50 text-xs mb-2">
                  <span className="flex items-center gap-1"><FaUser /> {featuredPost.author}</span>
                  <span className="flex items-center gap-1"><FaClock /> {featuredPost.readTime}</span>
                </div>
                <h3 className="text-white text-xl font-bold line-clamp-2">{featuredPost.title}</h3>
                <p className="text-gray-300 mt-2 text-sm line-clamp-2">{featuredPost.excerpt}</p>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="mt-5 inline-block bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold transition"
                >
                  Read More →
                </Link>
              </div>
            )}
          </motion.div>

        </div>
      </section>

      {/* ── BLOGS SECTION ── */}
      <div id="blogs" className="max-w-7xl mx-auto px-6 py-20">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Articles Published", value: blogs.length + "+" },
            { label: "Categories", value: "4+" },
            { label: "Expert Authors", value: "10+" },
            { label: "Monthly Readers", value: "5K+" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
              <p className="text-2xl font-black text-blue-800">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all
                ${activeCategory === cat
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No blogs found in this category.</p>
          </div>
        )}

        {/* POSTS GRID */}
        {!loading && filtered.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col group"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={post.image?.url || "/placeholder.png"}
                    alt={post.title}
                    className="h-52 w-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-blue-800 text-white text-xs px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1.5"><FaUser className="text-orange-400" /> {post.author}</span>
                    <span className="flex items-center gap-1.5"><FaClock className="text-orange-400" /> {post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex items-center gap-2 text-orange-500 font-semibold text-sm hover:gap-3 transition-all"
                    >
                      Read More <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}