

// src/pages/admin/Cities.jsx

import React, { useEffect, useState } from "react";
import { createCity, getCities, updateCity, deleteCity } from "../../api/cityApi";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function Cities() {

  const [cities,    setCities]    = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [image,     setImage]     = useState(null);
  const [formData,  setFormData]  = useState({ name: "", slug: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ================= CONFIRM MODAL =================
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "OK",
    showCancel: false,
    onConfirm: null,
  });

  // ── FETCH ──
  useEffect(() => { fetchCities(); }, []);

  const fetchCities = async () => {
    try {
      const res = await getCities();
      setCities(res.cities || []);
    } catch (err) {
      console.log(err);
    }
  };

  const totalPages = Math.ceil(cities.length / itemsPerPage);
  const paginatedCities = cities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ── HANDLE CHANGE ──
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ── SUBMIT ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("slug", formData.slug);
      if (image) data.append("image", image);

      if (editingId) {
        const res = await updateCity(editingId, data);
        setConfirmModal({
          isOpen: true,
          title: "✅ Updated!",
          message: res.message || "City successfully updated.",
          confirmText: "OK",
          showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      } else {
        const res = await createCity(data);
        setConfirmModal({
          isOpen: true,
          title: "✅ City Added!",
          message: res.message || "City successfully created.",
          confirmText: "OK",
          showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      }

      setFormData({ name: "", slug: "" });
      setImage(null);
      setEditingId(null);
      fetchCities();
    } catch (err) {
      setConfirmModal({
        isOpen: true,
        title: "❌ Error",
        message: err.response?.data?.message || "Something went wrong.",
        confirmText: "OK",
        showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
    } finally {
      setLoading(false);
    }
  };

  // ── DELETE ──
  const handleDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete City",
      message: "Are you sure? This city will be permanently deleted.",
      confirmText: "Delete",
      showCancel: true,
      onConfirm: async () => {
        try {
          await deleteCity(id);
          setConfirmModal({ isOpen: false });
          fetchCities();
        } catch (err) {
          setConfirmModal({
            isOpen: true,
            title: "❌ Error",
            message: "Delete failed. Please try again.",
            confirmText: "OK",
            showCancel: false,
            onConfirm: () => setConfirmModal({ isOpen: false }),
          });
        }
      },
    });
  };

  // ── EDIT ──
  const handleEdit = (city) => {
    setEditingId(city._id);
    setFormData({ name: city.name, slug: city.slug });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", slug: "" });
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

      {/* ================= CONFIRM MODAL ================= */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        showCancel={confirmModal.showCancel}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ isOpen: false })}
      />

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Cities Management</h1>
        <p className="text-sm text-white/40 mt-1">Manage manufacturing hub cities</p>
      </div>

      {/* FORM */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="City Name (e.g. Mumbai)"
            value={formData.name}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          {/* SLUG */}
          <input
            type="text"
            name="slug"
            placeholder="Slug (e.g. mumbai)"
            value={formData.slug}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
          />

          {/* BUTTONS */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-800 hover:bg-blue-900 px-4 py-3 rounded-xl text-sm font-medium transition w-full"
            >
              {loading
                ? editingId ? "Updating..." : "Creating..."
                : editingId ? "Update" : "Add City"}
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

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">Total Cities</p>
          <h2 className="text-3xl font-bold mt-2">{cities.length}</h2>
        </div>
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">Active Cities</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {cities.filter(c => c.isActive).length}
          </h2>
        </div>
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">Total Sellers</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-400">
            {cities.reduce((acc, c) => acc + (c.sellerCount || 0), 0)}
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">City</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Sellers</th>
                <th className="p-4">Industries</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCities.map((city) => (
                <tr key={city._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">

                  {/* IMAGE */}
                  <td className="p-4">
                    <img
                      src={city.image?.url}
                      alt={city.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  {/* NAME */}
                  <td className="p-4 font-medium">{city.name}</td>

                  {/* SLUG */}
                  <td className="p-4 text-white/50">/{city.slug}</td>

                  {/* SELLERS */}
                  <td className="p-4 text-blue-400 font-semibold">
                    {city.sellerCount || 0}
                  </td>

                  {/* INDUSTRIES */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {city.industries?.length > 0 ? (
                        city.industries.map((ind, i) => (
                          <span key={i} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                            {ind}
                          </span>
                        ))
                      ) : (
                        <span className="text-white/30 text-xs">—</span>
                      )}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${city.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {city.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(city)}
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(city._id)}
                        className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}

              {cities.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-white/40">
                    No Cities Found — Add your first city above
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
              Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, cities.length)} of {cities.length}
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