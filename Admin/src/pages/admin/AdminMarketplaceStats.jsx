import { useEffect, useState } from "react";
import {
  adminGetMarketplaceStats,
  adminCreateMarketplaceStat,
  adminUpdateMarketplaceStat,
  adminDeleteMarketplaceStat,
} from "../../api/marketplaceStatApi";

const ICON_OPTIONS = [
  { label: "Users", value: "Users" },
  { label: "Package Check", value: "PackageCheck" },
  { label: "Map Pinned", value: "MapPinned" },
  { label: "Shopping Bag", value: "ShoppingBag" },
  { label: "Bar Chart", value: "BarChart" },
  { label: "Star", value: "Star" },
  { label: "Globe", value: "Globe" },
  { label: "Truck", value: "Truck" },
];

const EMPTY_FORM = {
  icon: "Users",
  number: "",
  label: "",
  order: 0,
};

export default function AdminMarketplaceStats() {
  const [stats, setStats]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await adminGetMarketplaceStats();
      setStats(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const openCreate = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      icon:   item.icon,
      number: item.number,
      label:  item.label,
      order:  item.order,
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.number || !form.label) {
      alert("Number aur Label required hain!");
      return;
    }
    setSubmitting(true);
    try {
      if (editItem) {
        await adminUpdateMarketplaceStat(editItem._id, form);
      } else {
        await adminCreateMarketplaceStat(form);
      }
      setShowForm(false);
      fetchStats();
    } catch {
      alert("Save failed!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`"${item.label}" stat delete karna chahte ho?`)) return;
    setDeletingId(item._id);
    try {
      await adminDeleteMarketplaceStat(item._id);
      setStats((prev) => prev.filter((s) => s._id !== item._id));
    } catch {
      alert("Delete failed!");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 bg-[#0A0A0F] min-h-screen text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Marketplace Stats</h1>
          <p className="text-white/40 text-sm mt-1">{stats.length} total stats</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          + Add Stat
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Icon</th>
                <th className="p-4">Number</th>
                <th className="p-4">Label</th>
                <th className="p-4">Order</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>

              {loading && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-white/40">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && stats.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-white/40">
                    Koi stat nahi mila
                  </td>
                </tr>
              )}

              {!loading && stats.map((item) => (
                <tr key={item._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">

                  {/* ICON NAME */}
                  <td className="p-4">
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs font-medium">
                      {item.icon}
                    </span>
                  </td>

                  {/* NUMBER */}
                  <td className="p-4">
                    <span className="text-white font-bold text-base">{item.number}</span>
                  </td>

                  {/* LABEL */}
                  <td className="p-4 text-white/70">{item.label}</td>

                  {/* ORDER */}
                  <td className="p-4">
                    <span className="bg-white/10 text-white/60 px-2 py-1 rounded-lg text-xs">
                      {item.order}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        disabled={deletingId === item._id}
                        className="bg-red-700 hover:bg-red-800 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs transition"
                      >
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
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-lg flex flex-col overflow-hidden">

            {/* MODAL HEADER */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {editItem ? "Edit Stat" : "Add Stat"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-white/40 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 space-y-4">

              {/* ICON */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Icon *</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0D0D14]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* NUMBER */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Number *</label>
                <input
                  value={form.number}
                  onChange={(e) => setForm({ ...form, number: e.target.value })}
                  placeholder="e.g. 10K+"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* LABEL */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Label *</label>
                <input
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="e.g. Verified Suppliers"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* ORDER */}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Display Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  placeholder="e.g. 1"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

            </div>

            {/* MODAL FOOTER */}
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
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
                {submitting ? "Saving..." : editItem ? "Update" : "Add Stat"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}