// Admin/src/pages/admin/WhyChooseUs.jsx
import { useEffect, useState } from "react";
import {
  getAllFeaturesAdmin,
  createFeature,
  updateFeature,
  deleteFeature,
} from "../../api/whyChooseUsApi";
import ConfirmModal from "../../components/common/ConfirmModal";

const ICON_OPTIONS = [
  "ShieldCheck",
  "Globe2",
  "BadgeDollarSign",
  "Headphones",
  "Search",
  "Star",
  "Truck",
  "Package",
  "Users",
  "CheckCircle2",
];

export default function WhyChooseUs() {
  const [features, setFeatures]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showForm, setShowForm]     = useState(false);
  const [editFeature, setEditFeature] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    iconName:  "ShieldCheck",
    title:     "",
    desc:      "",
    badgeText: "Trusted B2B Solution",
    order:     0,
    isActive:  true,
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false, title: "", message: "",
    confirmText: "OK", showCancel: false, onConfirm: null,
  });

  // ─────────────────────────────────────────
  // FETCH
  // ─────────────────────────────────────────
  useEffect(() => { fetchFeatures(); }, []);

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const res = await getAllFeaturesAdmin();
      setFeatures(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────
  const handleDelete = (feature) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Feature",
      message: `Are you sure? "${feature.title}" will be permanently deleted.`,
      confirmText: "Delete",
      showCancel: true,
      onConfirm: async () => {
        try {
          setDeletingId(feature._id);
          await deleteFeature(feature._id);
          setFeatures((prev) => prev.filter((f) => f._id !== feature._id));
          setConfirmModal({ isOpen: false });
        } catch (err) {
          console.error(err);
          setConfirmModal({
            isOpen: true, title: "❌ Error",
            message: "Delete failed. Please try again.",
            confirmText: "OK", showCancel: false,
            onConfirm: () => setConfirmModal({ isOpen: false }),
          });
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  // ─────────────────────────────────────────
  // OPEN FORM
  // ─────────────────────────────────────────
  const openCreate = () => {
    setEditFeature(null);
    setForm({
      iconName: "ShieldCheck", title: "", desc: "",
      badgeText: "Trusted B2B Solution",
      order: features.length, isActive: true,
    });
    setShowForm(true);
  };

  const openEdit = (feature) => {
    setEditFeature(feature);
    setForm({
      iconName:  feature.iconName,
      title:     feature.title,
      desc:      feature.desc,
      badgeText: feature.badgeText || "Trusted B2B Solution",
      order:     feature.order,
      isActive:  feature.isActive,
    });
    setShowForm(true);
  };

  // ─────────────────────────────────────────
  // SUBMIT
  // ─────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.title || !form.desc) {
      setConfirmModal({
        isOpen: true, title: "❌ Error",
        message: "Please fill all required fields!",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
      return;
    }
    try {
      setSubmitting(true);
      if (editFeature) {
        const res = await updateFeature(editFeature._id, form);
        setFeatures((prev) =>
          prev.map((f) => (f._id === editFeature._id ? res : f))
        );
        setConfirmModal({
          isOpen: true, title: "✅ Updated!",
          message: "Feature successfully updated.",
          confirmText: "OK", showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      } else {
        const res = await createFeature(form);
        setFeatures((prev) => [...prev, res]);
        setConfirmModal({
          isOpen: true, title: "✅ Created!",
          message: "Feature successfully created.",
          confirmText: "OK", showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      }
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setConfirmModal({
        isOpen: true, title: "❌ Error",
        message: "Failed to save. Please try again.",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
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
          <h1 className="text-2xl font-bold">Why Choose Us</h1>
          <p className="text-white/40 text-sm mt-1">{features.length} total features</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          + Add Feature
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Icon</th>
                <th className="p-4">Title</th>
                <th className="p-4">Description</th>
                <th className="p-4">Badge Text</th>
                <th className="p-4">Order</th>
                <th className="p-4">Status</th>
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
              {!loading && features.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-white/40">
                    No features found
                  </td>
                </tr>
              )}
              {!loading && features.map((feature) => (
                <tr key={feature._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">

                  {/* ICON */}
                  <td className="p-4">
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs font-medium">
                      {feature.iconName}
                    </span>
                  </td>

                  {/* TITLE */}
                  <td className="p-4 font-medium">{feature.title}</td>

                  {/* DESC */}
                  <td className="p-4 text-white/50 max-w-[250px]">
                    <p className="line-clamp-2">{feature.desc}</p>
                  </td>

                  {/* BADGE TEXT */}
                  <td className="p-4 text-white/50 text-xs">{feature.badgeText}</td>

                  {/* ORDER */}
                  <td className="p-4 text-white/50">{feature.order}</td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${feature.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                      }`}>
                      {feature.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(feature)}
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(feature)}
                        disabled={deletingId === feature._id}
                        className="bg-red-700 hover:bg-red-800 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        {deletingId === feature._id ? "..." : "Delete"}
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

            {/* MODAL HEADER */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
              <h2 className="text-lg font-semibold">
                {editFeature ? "Edit Feature" : "Add Feature"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white text-xl">✕</button>
            </div>

            {/* FORM BODY */}
            <div className="p-6 overflow-y-auto space-y-4">

              {/* ICON + ORDER */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Icon</label>
                  <select
                    value={form.iconName}
                    onChange={(e) => setForm({ ...form, iconName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon} className="bg-[#0D0D14]">{icon}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* TITLE */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Feature title..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* DESC */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Description *</label>
                <textarea
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Feature description..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* BADGE TEXT */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Badge Text</label>
                <input
                  value={form.badgeText}
                  onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
                  placeholder="e.g. Trusted B2B Solution"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* ACTIVE */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 accent-blue-500"
                />
                <label htmlFor="isActive" className="text-sm text-white/70">
                  Active (visible on frontend)
                </label>
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
                {submitting ? "Saving..." : editFeature ? "Update Feature" : "Create Feature"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}