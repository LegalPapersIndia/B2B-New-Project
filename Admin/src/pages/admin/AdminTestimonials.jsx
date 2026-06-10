

// pages/admin/AdminTestimonials.jsx

import { useEffect, useState } from "react";
import {
  adminGetTestimonials,
  adminCreateTestimonial,
  adminUpdateTestimonial,
  adminDeleteTestimonial,
} from "../../api/testimonialApi";
import { Star } from "lucide-react";
import ConfirmModal from "../../components/common/ConfirmModal";

const EMPTY_FORM = {
  name: "", company: "", review: "", rating: 5, isActive: true,
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [showForm,     setShowForm]     = useState(false);
  const [editItem,     setEditItem]     = useState(null);
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [imageFile,    setImageFile]    = useState(null);
  const [preview,      setPreview]      = useState("");
  const [submitting,   setSubmitting]   = useState(false);
  const [deletingId,   setDeletingId]   = useState(null);

  // ================= CONFIRM MODAL =================
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "OK",
    showCancel: false,
    onConfirm: null,
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await adminGetTestimonials();
      setTestimonials(data.testimonials || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const openCreate = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setPreview("");
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      name:     item.name,
      company:  item.company,
      review:   item.review,
      rating:   item.rating,
      isActive: item.isActive,
    });
    setPreview(item.image?.url || "");
    setImageFile(null);
    setShowForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.company || !form.review) {
      setConfirmModal({
        isOpen: true,
        title: "❌ Error",
        message: "Please fill all required fields!",
        confirmText: "OK",
        showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name",     form.name);
      fd.append("company",  form.company);
      fd.append("review",   form.review);
      fd.append("rating",   form.rating);
      fd.append("isActive", form.isActive);
      if (imageFile) fd.append("image", imageFile);

      if (editItem) {
        await adminUpdateTestimonial(editItem._id, fd);
        setConfirmModal({
          isOpen: true,
          title: "✅ Updated!",
          message: "Testimonial successfully updated.",
          confirmText: "OK",
          showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      } else {
        await adminCreateTestimonial(fd);
        setConfirmModal({
          isOpen: true,
          title: "✅ Added!",
          message: "Testimonial successfully created.",
          confirmText: "OK",
          showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      }
      setShowForm(false);
      fetchTestimonials();
    } catch {
      setConfirmModal({
        isOpen: true,
        title: "❌ Error",
        message: "Failed to save. Please try again.",
        confirmText: "OK",
        showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (item) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Testimonial",
      message: `Are you sure? "${item.name}" testimonial will be permanently deleted.`,
      confirmText: "Delete",
      showCancel: true,
      onConfirm: async () => {
        setDeletingId(item._id);
        try {
          await adminDeleteTestimonial(item._id);
          setTestimonials(prev => prev.filter(t => t._id !== item._id));
          setConfirmModal({ isOpen: false });
        } catch {
          setConfirmModal({
            isOpen: true,
            title: "❌ Error",
            message: "Delete failed. Please try again.",
            confirmText: "OK",
            showCancel: false,
            onConfirm: () => setConfirmModal({ isOpen: false }),
          });
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  return (
    <div className="p-6 bg-[#0A0A0F] min-h-screen text-white">

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-white/40 text-sm mt-1">{testimonials.length} total reviews</p>
        </div>
        <button onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium transition">
          + Add Testimonial
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Person</th>
                <th className="p-4">Company</th>
                <th className="p-4">Review</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-white/40">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && testimonials.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-white/40">No testimonials found</td>
                </tr>
              )}
              {!loading && testimonials.map(item => (
                <tr key={item._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">

                  {/* PERSON */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {item.image?.url ? (
                        <img src={item.image.url} alt={item.name}
                          className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <p className="font-medium">{item.name}</p>
                    </div>
                  </td>

                  {/* COMPANY */}
                  <td className="p-4">
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                      {item.company}
                    </span>
                  </td>

                  {/* REVIEW */}
                  <td className="p-4 text-white/50 max-w-xs">
                    <p className="line-clamp-2 text-xs">{item.review}</p>
                  </td>

                  {/* RATING */}
                  <td className="p-4">
                    <div className="flex gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(item)}
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item)}
                        disabled={deletingId === item._id}
                        className="bg-red-700 hover:bg-red-800 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs transition">
                        {deletingId === item._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">

            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
              <h2 className="text-lg font-semibold">{editItem ? "Edit Testimonial" : "Add Testimonial"}</h2>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white text-xl">✕</button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">

              {/* IMAGE */}
              <div>
                <label className="text-white/50 text-xs mb-2 block">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 flex items-center justify-center flex-shrink-0">
                    {preview ? (
                      <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white/20 text-xs">No Photo</span>
                    )}
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange}
                    className="text-sm text-white/50 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:text-xs file:cursor-pointer" />
                </div>
              </div>

              {/* NAME */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Name *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500" />
              </div>

              {/* COMPANY */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Company *</label>
                <input value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                  placeholder="e.g. RS Packaging Pvt Ltd"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500" />
              </div>

              {/* REVIEW */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Review *</label>
                <textarea value={form.review} onChange={e => setForm({...form, review: e.target.value})}
                  rows={3} placeholder="Write review..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none" />
              </div>

              {/* RATING */}
              <div>
                <label className="text-white/50 text-xs mb-2 block">Rating *</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(star => (
                    <button key={star} type="button" onClick={() => setForm({...form, rating: star})}>
                      <Star className={`w-6 h-6 transition ${
                        star <= form.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/20"
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTIVE */}
              <div className="flex items-center gap-3">
                <input type="checkbox" id="isActive" checked={form.isActive}
                  onChange={e => setForm({...form, isActive: e.target.checked})}
                  className="w-4 h-4 accent-blue-500" />
                <label htmlFor="isActive" className="text-sm text-white/70">Active (visible on website)</label>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 flex-shrink-0">
              <button onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={submitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl text-sm font-medium transition">
                {submitting ? "Saving..." : editItem ? "Update" : "Add Testimonial"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}