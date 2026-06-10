

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