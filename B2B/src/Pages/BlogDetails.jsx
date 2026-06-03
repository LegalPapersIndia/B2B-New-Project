// src/Pages/BlogDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClock, FaUser, FaTag, FaArrowLeft, FaCalendar } from "react-icons/fa";
import { getSingleBlog, getAllBlogs } from "../api/blogApi";

export default function BlogDetails() {
  const { slug } = useParams();

  const [blog, setBlog]             = useState(null);
  const [related, setRelated]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getSingleBlog(slug);
        if (data.success) {
          setBlog(data.blog);
          // related blogs fetch
          const all = await getAllBlogs();
          if (all.success) {
            setRelated(all.blogs.filter(b => b.slug !== slug && b.category === data.blog.category).slice(0, 3));
          }
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Loading blog...</p>
      </div>
    </div>
  );

  if (error || !blog) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-700">Blog Not Found</h1>
        <p className="text-gray-400 mt-2">The blog you are looking for does not exist.</p>
        <Link to="/blog" className="mt-5 inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition">
          Back to Blog
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── HERO IMAGE ── */}
      <div className="relative h-[55vh] overflow-hidden">
        <img
          src={blog.image?.url || "/placeholder.png"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* BACK BUTTON */}
        <div className="absolute top-6 left-6">
          <Link
            to="/blog"
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/20 transition"
          >
            <FaArrowLeft /> Back to Blogs
          </Link>
        </div>

        {/* CATEGORY BADGE */}
        <div className="absolute top-6 right-6">
          <span className="bg-orange-500 text-white text-xs px-4 py-2 rounded-full font-semibold">
            {blog.category}
          </span>
        </div>

        {/* TITLE OVERLAY */}
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-5xl font-black text-white leading-tight"
          >
            {blog.title}
          </motion.h1>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* META */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-5 mb-8 pb-8 border-b border-gray-200"
        >
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white text-xs font-bold">
              {blog.author?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-gray-400">Author</p>
              <p className="text-sm font-semibold text-gray-800">{blog.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 shadow-sm">
            <FaCalendar className="text-orange-400" />
            <div>
              <p className="text-xs text-gray-400">Published</p>
              <p className="text-sm font-semibold text-gray-800">
                {new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          {blog.readTime && (
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 shadow-sm">
              <FaClock className="text-orange-400" />
              <div>
                <p className="text-xs text-gray-400">Read Time</p>
                <p className="text-sm font-semibold text-gray-800">{blog.readTime}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 shadow-sm">
            <FaTag className="text-orange-400" />
            <div>
              <p className="text-xs text-gray-400">Category</p>
              <p className="text-sm font-semibold text-gray-800">{blog.category}</p>
            </div>
          </div>
        </motion.div>

        {/* EXCERPT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-orange-500 pl-5 bg-orange-50 py-4 rounded-r-2xl"
        >
          {blog.excerpt}
        </motion.p>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-10"
        >
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>
        </motion.div>

        {/* TAGS */}
        <div className="mt-8 flex items-center gap-3 flex-wrap">
          <span className="text-gray-400 text-sm">Tags:</span>
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-medium">
            {blog.category}
          </span>
          <span className="bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-full text-xs font-medium">
            B2B Trade
          </span>
          <span className="bg-gray-100 text-gray-600 border border-gray-200 px-3 py-1 rounded-full text-xs font-medium">
            Business
          </span>
        </div>

        {/* AUTHOR CARD */}
        <div className="mt-10 bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
            {blog.author?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white/60 text-xs mb-1">Written by</p>
            <p className="text-white font-bold text-lg">{blog.author}</p>
            <p className="text-white/50 text-sm mt-1">B2B Trade Expert & Industry Analyst</p>
          </div>
        </div>

      </div>

      {/* ── RELATED BLOGS ── */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Related <span className="text-blue-800">Articles</span>
            </h2>
            <Link to="/blog" className="text-orange-500 hover:underline text-sm font-medium">
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((post) => (
              <motion.div
                key={post._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image?.url || "/placeholder.png"}
                    alt={post.title}
                    className="h-44 w-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-blue-800 text-white text-xs px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1"><FaUser className="text-orange-400" /> {post.author}</span>
                    <span className="flex items-center gap-1"><FaClock className="text-orange-400" /> {post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-800 transition">
                    {post.title}
                  </h3>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-auto flex items-center gap-2 text-orange-500 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Read More <FaArrowLeft className="rotate-180" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}