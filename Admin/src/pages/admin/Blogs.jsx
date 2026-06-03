// pages/admin/Blogs.jsx

import { useEffect, useState } from "react";
import { getAllBlogsAdmin, deleteBlog, createBlog, updateBlog } from "../../api/blogApi";

export default function Blogs() {
  const [blogs, setBlogs]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showForm, setShowForm]     = useState(false);
  const [editBlog, setEditBlog]     = useState(null);

  // FORM STATE
  const [form, setForm] = useState({
    title: "", excerpt: "", content: "",
    category: "", author: "", readTime: "", isPublished: false,
  });
  const [imageFile, setImageFile]   = useState(null);
  const [preview, setPreview]       = useState("");
  const [submitting, setSubmitting] = useState(false);

  const categories = ["Sourcing Tips", "Market Trends", "Negotiation", "Platform Guide"];

  // ─────────────────────────────────────────
  // FETCH
  // ─────────────────────────────────────────
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAllBlogsAdmin();
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────
  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"?`)) return;
    try {
      setDeletingId(blog._id);
      await deleteBlog(blog._id);
      setBlogs(prev => prev.filter(b => b._id !== blog._id));
    } catch (err) {
      console.error(err);
      alert("Delete failed!");
    } finally {
      setDeletingId(null);
    }
  };

  // ─────────────────────────────────────────
  // OPEN FORM
  // ─────────────────────────────────────────
  const openCreate = () => {
    setEditBlog(null);
    setForm({ title: "", excerpt: "", content: "", category: "", author: "", readTime: "", isPublished: false });
    setImageFile(null);
    setPreview("");
    setShowForm(true);
  };

  const openEdit = (blog) => {
    setEditBlog(blog);
    setForm({
      title:       blog.title,
      excerpt:     blog.excerpt,
      content:     blog.content,
      category:    blog.category,
      author:      blog.author,
      readTime:    blog.readTime || "",
      isPublished: blog.isPublished,
    });
    setPreview(blog.image?.url || "");
    setImageFile(null);
    setShowForm(true);
  };

  // ─────────────────────────────────────────
  // IMAGE CHANGE
  // ─────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ─────────────────────────────────────────
  // SUBMIT
  // ─────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.title || !form.excerpt || !form.content || !form.category || !form.author) {
      alert("Please fill all required fields!");
      return;
    }
    try {
      setSubmitting(true);
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (imageFile) formData.append("image", imageFile);

      if (editBlog) {
        const res = await updateBlog(editBlog._id, formData);
        setBlogs(prev => prev.map(b => b._id === editBlog._id ? res.data.blog : b));
      } else {
        const res = await createBlog(formData);
        setBlogs(prev => [res.data.blog, ...prev]);
      }
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save blog!");
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="p-6 bg-[#0A0A0F] min-h-screen text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <p className="text-white/40 text-sm mt-1">{blogs.length} total blogs</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          + Add Blog
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">

            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Blog</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Read Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-white/40">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && blogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-white/40">No blogs found</td>
                </tr>
              )}

              {!loading && blogs.map((blog) => (
                <tr key={blog._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">

                  {/* BLOG */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                        {blog.image?.url ? (
                          <img src={blog.image.url} alt={blog.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No Img</div>
                        )}
                      </div>
                      <p className="font-medium line-clamp-2 max-w-[200px]">{blog.title}</p>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="p-4">
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                      {blog.category}
                    </span>
                  </td>

                  {/* AUTHOR */}
                  <td className="p-4 text-white/60">{blog.author}</td>

                  {/* READ TIME */}
                  <td className="p-4 text-white/60">{blog.readTime || "—"}</td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${blog.isPublished
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="p-4 text-white/40 text-xs">
                    {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(blog)}
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog)}
                        disabled={deletingId === blog._id}
                        className="bg-red-700 hover:bg-red-800 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        {deletingId === blog._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          FORM MODAL
      ───────────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

            {/* MODAL HEADER */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
              <h2 className="text-lg font-semibold">{editBlog ? "Edit Blog" : "Add Blog"}</h2>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white text-xl">✕</button>
            </div>

            {/* FORM BODY */}
            <div className="p-6 overflow-y-auto space-y-4">

              {/* IMAGE UPLOAD */}
              <div>
                <label className="text-white/50 text-xs mb-2 block">Cover Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center flex-shrink-0">
                    {preview ? (
                      <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white/20 text-xs">No Image</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm text-white/50 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:text-xs file:cursor-pointer"
                  />
                </div>
              </div>

              {/* TITLE */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Blog title..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* EXCERPT */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Excerpt *</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Short description..."
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* CONTENT */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Content *</label>
                <textarea
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="Full blog content..."
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* CATEGORY + AUTHOR */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Category *</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="" className="bg-[#0D0D14]">Select category</option>
                    {categories.map(c => (
                      <option key={c} value={c} className="bg-[#0D0D14]">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Author *</label>
                  <input
                    value={form.author}
                    onChange={e => setForm({ ...form, author: e.target.value })}
                    placeholder="Author name..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* READ TIME + PUBLISHED */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Read Time</label>
                  <input
                    value={form.readTime}
                    onChange={e => setForm({ ...form, readTime: e.target.value })}
                    placeholder="e.g. 5 min"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={form.isPublished}
                    onChange={e => setForm({ ...form, isPublished: e.target.checked })}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <label htmlFor="isPublished" className="text-sm text-white/70">Publish immediately</label>
                </div>
              </div>

            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 flex-shrink-0">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl text-sm font-medium transition"
              >
                {submitting ? "Saving..." : editBlog ? "Update Blog" : "Create Blog"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}