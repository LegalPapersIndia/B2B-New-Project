// Admin/src/pages/admin/CTASection.jsx
import { useEffect, useState } from "react";
import { getCTA, updateCTA } from "../../api/ctaSectionApi";
import ConfirmModal from "../../components/common/ConfirmModal";

const ICON_OPTIONS = ["Users", "Globe", "Star", "Shield", "Package", "Truck", "BadgeCheck", "Handshake"];

export default function CTASectionPage() {
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    badgeText:        "",
    heading:          "",
    headingHighlight: "",
    description:      "",
    stat1Icon:        "Users",
    stat1Value:       "",
    stat1Label:       "",
    stat2Icon:        "Globe",
    stat2Value:       "",
    stat2Label:       "",
    btn1Text:         "",
    btn1Link:         "",
    btn2Text:         "",
    isActive:         true,
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false, title: "", message: "",
    confirmText: "OK", showCancel: false, onConfirm: null,
  });

  // ─────────────────────────────────────────
  // FETCH
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchCTA = async () => {
      try {
        const res = await getCTA();
        if (res.data) setForm(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCTA();
  }, []);

  // ─────────────────────────────────────────
  // SUBMIT
  // ─────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.heading || !form.description) {
      setConfirmModal({
        isOpen: true, title: "❌ Error",
        message: "Heading and Description required!",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
      return;
    }

    try {
      setSubmitting(true);
      await updateCTA(form);
      setConfirmModal({
        isOpen: true, title: "✅ Saved!",
        message: "CTA Section updated successfully.",
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

  // ─────────────────────────────────────────
  // RENDER
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
          <h1 className="text-2xl font-bold">CTA Section</h1>
          <p className="text-white/40 text-sm mt-1">Homepage CTA section manage karo</p>
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

        {/* ── HEADER SECTION ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Header</h2>

          {/* BADGE TEXT */}
          <div>
            <label className="text-white/50 text-xs mb-1 block">Badge Text</label>
            <input
              value={form.badgeText}
              onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
              placeholder="e.g. Trusted B2B Marketplace"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* HEADING */}
          <div>
            <label className="text-white/50 text-xs mb-1 block">Main Heading</label>
            <textarea
              value={form.heading}
              onChange={(e) => setForm({ ...form, heading: e.target.value })}
              placeholder="Main heading..."
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* HEADING HIGHLIGHT */}
          <div>
            <label className="text-white/50 text-xs mb-1 block">Highlighted Text (orange mein dikhega)</label>
            <input
              value={form.headingHighlight}
              onChange={(e) => setForm({ ...form, headingHighlight: e.target.value })}
              placeholder="e.g. Verified Buyers & Suppliers"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-white/50 text-xs mb-1 block">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* ACTIVE */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox" id="isActive"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4 accent-blue-500"
            />
            <label htmlFor="isActive" className="text-sm text-white/70">Active (visible on frontend)</label>
          </div>
        </div>

        {/* ── BUTTONS SECTION ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Buttons</h2>

          {/* BUTTON 1 */}
          <div>
            <label className="text-white/50 text-xs mb-1 block">Button 1 Text</label>
            <input
              value={form.btn1Text}
              onChange={(e) => setForm({ ...form, btn1Text: e.target.value })}
              placeholder="e.g. Start Selling"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Button 1 Link</label>
            <input
              value={form.btn1Link}
              onChange={(e) => setForm({ ...form, btn1Link: e.target.value })}
              placeholder="e.g. /register"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* BUTTON 2 */}
          <div>
            <label className="text-white/50 text-xs mb-1 block">Button 2 Text</label>
            <input
              value={form.btn2Text}
              onChange={(e) => setForm({ ...form, btn2Text: e.target.value })}
              placeholder="e.g. Post Buy Requirement"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* ── STATS SECTION ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4 lg:col-span-2">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Stats</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* STAT 1 */}
            <div className="space-y-3">
              <p className="text-white/40 text-xs">Stat 1</p>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Icon</label>
                <select
                  value={form.stat1Icon}
                  onChange={(e) => setForm({ ...form, stat1Icon: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon} className="bg-[#0D0D14]">{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Value</label>
                <input
                  value={form.stat1Value}
                  onChange={(e) => setForm({ ...form, stat1Value: e.target.value })}
                  placeholder="e.g. 50K+"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Label</label>
                <input
                  value={form.stat1Label}
                  onChange={(e) => setForm({ ...form, stat1Label: e.target.value })}
                  placeholder="e.g. Active Buyers"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* STAT 2 */}
            <div className="space-y-3">
              <p className="text-white/40 text-xs">Stat 2</p>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Icon</label>
                <select
                  value={form.stat2Icon}
                  onChange={(e) => setForm({ ...form, stat2Icon: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon} className="bg-[#0D0D14]">{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Value</label>
                <input
                  value={form.stat2Value}
                  onChange={(e) => setForm({ ...form, stat2Value: e.target.value })}
                  placeholder="e.g. 120+"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Label</label>
                <input
                  value={form.stat2Label}
                  onChange={(e) => setForm({ ...form, stat2Label: e.target.value })}
                  placeholder="e.g. Countries Connected"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}