// Admin/src/pages/admin/HeroSlides.jsx
import { useEffect, useState } from "react";
import {
  getHeroSlidesAdmin,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from "../../api/heroSlideApi";
import ConfirmModal from "../../components/common/ConfirmModal";

const ACCENT_OPTIONS = [
  { label: "Orange", value: "#F54900" },
  { label: "Blue",   value: "#1447E6" },
  { label: "White",  value: "#FFFFFF" },
  { label: "Yellow", value: "#FACC15" },
];

const emptyForm = {
  title:       "",
  subtitle:    "",
  accentColor: "#F54900",
  order:       0,
  isActive:    true,
  image:       null,
  imagePreview: null,
};

export default function HeroSlides() {
  const [slides, setSlides]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId]   = useState(null); // null = add mode
  const [form, setForm]             = useState(emptyForm);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false, title: "", message: "",
    confirmText: "OK", showCancel: false, onConfirm: null,
  });

  // ─────────────────────────────────────────
  // FETCH
  // ─────────────────────────────────────────
  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await getHeroSlidesAdmin();
      setSlides(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────
  // IMAGE CHANGE
  // ─────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({
      ...form,
      image:        file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  // ─────────────────────────────────────────
  // SUBMIT — ADD / UPDATE
  // ─────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.title || !form.subtitle) {
      setConfirmModal({
        isOpen: true, title: "❌ Error",
        message: "Title aur Subtitle required hain!",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
      return;
    }

    if (!editingId && !form.image) {
      setConfirmModal({
        isOpen: true, title: "❌ Error",
        message: "Image required hai!",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
      return;
    }

    try {
      setSubmitting(true);

      const fd = new FormData();
      fd.append("title",       form.title);
      fd.append("subtitle",    form.subtitle);
      fd.append("accentColor", form.accentColor);
      fd.append("order",       form.order);
      fd.append("isActive",    form.isActive);
      if (form.image) fd.append("image", form.image);

      let res;
      if (editingId) {
        res = await updateHeroSlide(editingId, fd);
      } else {
        res = await createHeroSlide(fd);
      }

      // List refresh
      await fetchSlides();
      resetForm();

      setConfirmModal({
        isOpen: true, title: "✅ Done!",
        message: editingId ? "Slide updated successfully." : "Slide added successfully.",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
    } catch (err) {
      console.error(err);
      setConfirmModal({
        isOpen: true, title: "❌ Error",
        message: "Failed. Please try again.",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────
  const handleDelete = (id) => {
    setConfirmModal({
      isOpen: true, title: "🗑️ Delete Slide?",
      message: "Yeh slide permanently delete ho jayegi!",
      confirmText: "Delete", showCancel: true,
      onConfirm: async () => {
        try {
          await deleteHeroSlide(id);
          await fetchSlides();
          setConfirmModal({ isOpen: false });
        } catch (err) {
          console.error(err);
          setConfirmModal({
            isOpen: true, title: "❌ Error",
            message: "Delete failed. Try again.",
            confirmText: "OK", showCancel: false,
            onConfirm: () => setConfirmModal({ isOpen: false }),
          });
        }
      },
    });
  };

  // ─────────────────────────────────────────
  // EDIT FILL
  // ─────────────────────────────────────────
  const handleEdit = (slide) => {
    setEditingId(slide._id);
    setForm({
      title:        slide.title,
      subtitle:     slide.subtitle,
      accentColor:  slide.accentColor || "#F54900",
      order:        slide.order || 0,
      isActive:     slide.isActive,
      image:        null,
      imagePreview: slide.bgImage, // existing Cloudinary URL
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  // ─────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="p-6 bg-[#0A0A0F] min-h-screen text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0A0A0F] min-h-screen text-white">

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
          <h1 className="text-2xl font-bold">Hero Slides</h1>
          <p className="text-white/40 text-sm mt-1">Homepage hero carousel manage karo</p>
        </div>
      </div>

      {/* ── SLIDES LIST ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {slides.length === 0 ? (
          <p className="text-white/30 text-sm col-span-3">Koi slide nahi hai. Neeche se add karo.</p>
        ) : (
          slides.map((slide) => (
            <div
              key={slide._id}
              className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative h-40 w-full">
                <img
                  src={slide.bgImage}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* ACTIVE BADGE */}
                <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-medium ${
                  slide.isActive
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}>
                  {slide.isActive ? "Active" : "Inactive"}
                </span>
                {/* ORDER BADGE */}
                <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-black/50 text-white/70">
                  #{slide.order}
                </span>
              </div>

              {/* INFO */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: slide.accentColor }}
                  />
                  <p className="text-sm font-semibold text-white truncate">{slide.title}</p>
                </div>
                <p className="text-xs text-white/40 line-clamp-2">{slide.subtitle}</p>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="flex-1 text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slide._id)}
                    className="flex-1 text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── ADD / EDIT FORM ── */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-5">
          {editingId ? "✏️ Edit Slide" : "➕ Add New Slide"}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* TITLE */}
          <div>
            <label className="text-white/50 text-xs mb-1 block">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Grow Your B2B Business Fast"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* ORDER */}
          <div>
            <label className="text-white/50 text-xs mb-1 block">Order (display sequence)</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* SUBTITLE */}
          <div className="lg:col-span-2">
            <label className="text-white/50 text-xs mb-1 block">Subtitle</label>
            <textarea
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              rows={2}
              placeholder="e.g. Get direct buyer leads, increase visibility..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
         

          {/* ACTIVE */}
          <div className="flex items-center gap-3 self-end">
            <input
              type="checkbox" id="isActive"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4 accent-blue-500"
            />
            <label htmlFor="isActive" className="text-sm text-white/70">Active (visible on frontend)</label>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="lg:col-span-2">
            <label className="text-white/50 text-xs mb-1 block">
              Slide Image {editingId ? "(naya upload karo ya purana rahega)" : "(required)"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 focus:outline-none focus:border-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-blue-600 file:text-white"
            />
            {/* PREVIEW */}
            {form.imagePreview && (
              <div className="mt-3 rounded-xl overflow-hidden h-40 w-full">
                <img
                  src={form.imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-2.5 rounded-xl text-sm font-medium transition"
          >
            {submitting ? "Saving..." : editingId ? "Update Slide" : "Add Slide"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-xl text-sm font-medium transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

    </div>
  );
}