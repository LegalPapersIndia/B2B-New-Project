
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const API = import.meta.env.VITE_API_URL;

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    desc: "",
  });

  const [image, setImage] = useState(null);

  // ================= FETCH =================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${API}/categories`
      );

      setCategories(res.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
const paginatedCategories = categories.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);

      data.append("slug", formData.slug);

      data.append("desc", formData.desc);

      if (image) {
        data.append("image", image);
      }

      // ================= UPDATE =================
      if (editingId) {
        const res = await axios.put(
          `${API}/categories/${editingId}`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(res.data.message);
      }

      // ================= CREATE =================
      else {
        const res = await axios.post(
          `${API}/categories/create`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(res.data.message);
      }

      // RESET
      setFormData({
        name: "",
        slug: "",
        desc: "",
      });

      setImage(null);

      setEditingId(null);

      fetchCategories();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Delete this category?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `${API}/categories/${id}`
      );

      fetchCategories();
    } catch (error) {
      console.log(error);

      alert("Delete failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (cat) => {
    setEditingId(cat._id);

    setFormData({
      name: cat.name,
      slug: cat.slug,
      desc: cat.desc,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= CANCEL EDIT =================
  const cancelEdit = () => {
    setEditingId(null);

    setFormData({
      name: "",
      slug: "",
      desc: "",
    });

    setImage(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Categories Management
          </h1>

          <p className="text-sm text-white/40 mt-1">
            Manage marketplace product
            categories
          </p>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          {/* SLUG */}
          <input
            type="text"
            name="slug"
            placeholder="Category Slug"
            value={formData.slug}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          {/* DESC */}
          <input
            type="text"
            name="desc"
            placeholder="Description"
            value={formData.desc}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          {/* IMAGE */}
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
          />

          {/* BUTTON */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-800 hover:bg-blue-900 px-4 py-3 rounded-xl text-sm font-medium transition w-full"
            >
              {loading
                ? editingId
                  ? "Updating..."
                  : "Creating..."
                : editingId
                ? "Update"
                : "Add Category"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-700 hover:bg-gray-800 px-4 py-3 rounded-xl text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Total Categories
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {categories?.length || 0}
          </h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Active Categories
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {categories?.length || 0}
          </h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Total Products
          </p>

        {/* NAYA */}
<h2 className="text-3xl font-bold mt-2 text-blue-400">
  {categories?.reduce(
    (acc, c) => acc + (c?.productCount || 0), 0
  ) || 0}
</h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Total Slugs
          </p>

          <h2 className="text-3xl font-bold mt-2 text-violet-400">
            {categories?.length || 0}
          </h2>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            {/* HEAD */}
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Image</th>

                <th className="p-4">
                  Category
                </th>

                <th className="p-4">
                  Slug
                </th>

                <th className="p-4">
                  Products
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Actions
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {paginatedCategories.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-t border-white/10 hover:bg-white/[0.03] transition"
                >
                  {/* IMAGE */}
                  <td className="p-4">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  {/* NAME */}
                  <td className="p-4 font-medium">
                    {cat.name}
                  </td>

                  {/* SLUG */}
                  <td className="p-4 text-white/50">
                    /{cat.slug}
                  </td>

                  {/* PRODUCTS */}
                 <td className="p-4 text-white/60">
  {cat?.productCount || 0}  {/* ← NAYA */}
</td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-green-500/20 text-green-400">
                      active
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      {/* EDIT */}
                      <button
                        onClick={() =>
                          handleEdit(cat)
                        }
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(
                            cat._id
                          )
                        }
                        className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* EMPTY */}
              {categories?.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-white/40"
                  >
                    No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* PAGINATION */}
{totalPages > 1 && (
  <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
    <p className="text-white/40 text-sm">
      Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, categories.length)} of {categories.length}
    </p>
    <div className="flex items-center gap-2">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        ← Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-8 h-8 rounded-lg text-xs font-medium transition
            ${currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
            }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        Next →
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}