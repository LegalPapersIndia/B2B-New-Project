

import { useEffect, useState } from "react";
import { getHRUsers, createHRUser, deleteHRUser } from "../../api/hrApi";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function AdminHRUsers() {
  const [hrUsers,    setHrUsers]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [saving,     setSaving]     = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error,      setError]      = useState("");
  const [form,       setForm]       = useState({ name: "", email: "", password: "" });
  const [showPass,   setShowPass]   = useState(false);

  // ================= CONFIRM MODAL =================
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "OK",
    showCancel: false,
    onConfirm: null,
  });

  // ─────────────────────────────────────────
  // FETCH HR USERS
  // ─────────────────────────────────────────
  const fetchHRUsers = async () => {
    setLoading(true);
    try {
      const data = await getHRUsers();
      setHrUsers(data.hrUsers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHRUsers(); }, []);

  // ─────────────────────────────────────────
  // CREATE HR USER
  // ─────────────────────────────────────────
  const handleCreate = async () => {
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setSaving(true);
    try {
      await createHRUser(form);
      setShowForm(false);
      setForm({ name: "", email: "", password: "" });
      fetchHRUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────
  // DELETE HR USER
  // ─────────────────────────────────────────
  const handleDelete = (user) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete HR User",
     message: `Are you sure? "${user.name}"'s account will be permanently deleted.`,
      confirmText: "Delete",
      showCancel: true,
      onConfirm: async () => {
        setDeletingId(user._id);
        try {
          await deleteHRUser(user._id);
          setHrUsers(prev => prev.filter(u => u._id !== user._id));
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
          <h1 className="text-2xl font-bold">HR Users</h1>
          <p className="text-white/40 text-sm mt-1">
            {hrUsers.length} HR account{hrUsers.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setError(""); }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          + Create HR User
        </button>
      </div>

      {/* INFO CARD */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6 flex gap-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" className="flex-shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-blue-300 text-sm leading-relaxed">
          HR users can only access the <strong className="text-blue-200">Careers page</strong> — they can post, edit, delete jobs and manage applications. No other admin pages will be visible to them.
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Created</th>
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
              {!loading && hrUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-white/40">
                    No HR users yet — create the first account!
                  </td>
                </tr>
              )}
              {!loading && hrUsers.map(user => (
                <tr key={user._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-white/60">{user.email}</td>
                  <td className="p-4">
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                      HR
                    </span>
                  </td>
                  <td className="p-4 text-white/40 text-xs">
                    {new Date(user.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(user)}
                      disabled={deletingId === user._id}
                      className="bg-red-700 hover:bg-red-800 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs transition"
                    >
                      {deletingId === user._id ? "..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-md">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Create HR User</h2>
              <button
                onClick={() => { setShowForm(false); setError(""); }}
                className="text-white/40 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">

              <div>
                <label className="text-white/50 text-xs mb-1 block">Full Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs mb-1 block">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. hr@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs mb-1 block">Password *</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="Min 6 characters"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => { setShowForm(false); setError(""); }}
                className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl text-sm font-medium transition"
              >
                {saving ? "Creating..." : "Create HR User"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}