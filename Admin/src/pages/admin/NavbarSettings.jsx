// Admin/src/pages/admin/NavbarSettings.jsx
import { useEffect, useState } from "react";
import { getNavbarSettings, updateNavbarSettings } from "../../api/navbarSettingsApi";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function NavbarSettingsPage() {
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    logoText:           "LPI-B2B",
    logoTagline:        "Wholesale Marketplace",
    phone:              "",
    email:              "",
    festivalActive:     false,
    festivalName:       "",
    festivalEmoji:      "🎉",
    festivalAnimation:  "confetti",
    festivalTextColor:  "#FF6B6B",
    festivalStartDate:  "",
    festivalEndDate:    "",
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false, title: "", message: "",
    confirmText: "OK", showCancel: false, onConfirm: null,
  });

  // ─────────────────────────────────────────
  // FETCH
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const res = await getNavbarSettings();
        if (res.data) {
          setForm({
            ...res.data,
            festivalStartDate: res.data.festivalStartDate
              ? new Date(res.data.festivalStartDate).toISOString().split("T")[0]
              : "",
            festivalEndDate: res.data.festivalEndDate
              ? new Date(res.data.festivalEndDate).toISOString().split("T")[0]
              : "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNavbar();
  }, []);

  // ─────────────────────────────────────────
  // SUBMIT
  // ─────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.logoText) {
      setConfirmModal({
        isOpen: true, title: "❌ Error",
        message: "Logo text required hai!",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
      return;
    }

    try {
      setSubmitting(true);
      await updateNavbarSettings(form);
      setConfirmModal({
        isOpen: true, title: "✅ Saved!",
        message: "Navbar settings updated successfully.",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
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
          <h1 className="text-2xl font-bold">Navbar Settings</h1>
          <p className="text-white/40 text-sm mt-1">Logo, contact aur festival badge manage karo</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-2 rounded-xl text-sm font-medium transition"
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── LOGO SETTINGS ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Logo Settings</h2>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Logo Text</label>
            <input
              value={form.logoText}
              onChange={(e) => setForm({ ...form, logoText: e.target.value })}
              placeholder="e.g. LPI-B2B"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Logo Tagline</label>
            <input
              value={form.logoTagline}
              onChange={(e) => setForm({ ...form, logoTagline: e.target.value })}
              placeholder="e.g. Wholesale Marketplace"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* PREVIEW */}
          <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/30 text-xs mb-3">Preview:</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-black text-xl">
                  {form.logoText?.charAt(0) || "B"}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-white">
                  {form.logoText || "LPI-B2B"}
                </h1>
                <p className="text-[11px] text-white/40 -mt-1">
                  {form.logoTagline || "Wholesale Marketplace"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTACT INFO ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Top Bar Contact</h2>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 XXXXXXXXXX"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="support@yourb2b.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* ── FESTIVAL BADGE ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Festival Badge</h2>
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-xs">
                {form.festivalActive ? "Active ✅" : "Inactive ❌"}
              </span>
              <button
                onClick={() => setForm({ ...form, festivalActive: !form.festivalActive })}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                  form.festivalActive ? "bg-green-500" : "bg-white/20"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
                  form.festivalActive ? "left-6" : "left-0.5"
                }`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* FESTIVAL NAME */}
            <div>
              <label className="text-white/50 text-xs mb-1 block">Festival Name</label>
              <input
                value={form.festivalName}
                onChange={(e) => setForm({ ...form, festivalName: e.target.value })}
                placeholder="e.g. Happy Diwali, Holi Hai!"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* EMOJI */}
            <div>
              <label className="text-white/50 text-xs mb-1 block">Emoji</label>
              <input
                value={form.festivalEmoji}
                onChange={(e) => setForm({ ...form, festivalEmoji: e.target.value })}
                placeholder="e.g. 🪔 🎨 🌙 🎄"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* TEXT COLOR */}
            <div>
              <label className="text-white/50 text-xs mb-1 block">Text Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form.festivalTextColor}
                  onChange={(e) => setForm({ ...form, festivalTextColor: e.target.value })}
                  className="w-12 h-10 rounded-xl border border-white/10 bg-transparent cursor-pointer"
                />
                <input
                  value={form.festivalTextColor}
                  onChange={(e) => setForm({ ...form, festivalTextColor: e.target.value })}
                  placeholder="#FF6B6B"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* START DATE */}
            <div>
              <label className="text-white/50 text-xs mb-1 block">Start Date</label>
              <input
                type="date"
                value={form.festivalStartDate}
                onChange={(e) => setForm({ ...form, festivalStartDate: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* END DATE */}
            <div>
              <label className="text-white/50 text-xs mb-1 block">End Date</label>
              <input
                type="date"
                value={form.festivalEndDate}
                onChange={(e) => setForm({ ...form, festivalEndDate: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

          </div>

          {/* FESTIVAL PREVIEW */}
          {form.festivalActive && form.festivalName && (
            <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-white/30 text-xs mb-3">Preview:</p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-black text-xl">
                    {form.logoText?.charAt(0) || "B"}
                  </span>
                </div>
                <span className="text-xl font-black text-white">{form.logoText}</span>
                <span
                  className="text-sm font-bold px-3 py-1 rounded-full border animate-pulse"
                  style={{
                    color: form.festivalTextColor,
                    borderColor: form.festivalTextColor + "40",
                    backgroundColor: form.festivalTextColor + "15",
                  }}
                >
                  {form.festivalEmoji} {form.festivalName}
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}