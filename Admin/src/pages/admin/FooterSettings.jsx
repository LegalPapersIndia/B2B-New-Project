// Admin/src/pages/admin/FooterSettings.jsx
import { useEffect, useState } from "react";
import { getFooterSettings, updateFooterSettings } from "../../api/footerSettingsApi";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function FooterSettingsPage() {
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    description:     "",
    phone:           "",
    email:           "",
    facebook:        "",
    twitter:         "",
    instagram:       "",
    linkedin:        "",
    templateBtnText: "",
    templateBtnLink: "",
    copyrightText:   "",
    developerName:   "",
    developerLink:   "",
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false, title: "", message: "",
    confirmText: "OK", showCancel: false, onConfirm: null,
  });

  // ─────────────────────────────────────────
  // FETCH
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await getFooterSettings();
        if (res.data) setForm(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  // ─────────────────────────────────────────
  // SUBMIT
  // ─────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.phone || !form.email) {
      setConfirmModal({
        isOpen: true, title: "❌ Error",
        message: "Phone aur Email required hain!",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
      return;
    }

    try {
      setSubmitting(true);
      await updateFooterSettings(form);
      setConfirmModal({
        isOpen: true, title: "✅ Saved!",
        message: "Footer settings updated successfully.",
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
          <h1 className="text-2xl font-bold">Footer Settings</h1>
          <p className="text-white/40 text-sm mt-1">Footer content manage karo</p>
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

        {/* ── COMPANY INFO ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Company Info</h2>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              placeholder="Company description..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Phone *</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91XXXXXXXXXX"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Email *</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="support@yourb2b.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* ── SOCIAL LINKS ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Social Links</h2>

          {[
            { key: "facebook",  label: "Facebook URL" },
            { key: "twitter",   label: "Twitter URL" },
            { key: "instagram", label: "Instagram URL" },
            { key: "linkedin",  label: "LinkedIn URL" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="text-white/50 text-xs mb-1 block">{label}</label>
              <input
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={`https://${key}.com/yourpage`}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        {/* ── TEMPLATE BUTTON ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Template Button</h2>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Button Text</label>
            <input
              value={form.templateBtnText}
              onChange={(e) => setForm({ ...form, templateBtnText: e.target.value })}
              placeholder="e.g. View LPI-Website Template"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Button Link</label>
            <input
              value={form.templateBtnLink}
              onChange={(e) => setForm({ ...form, templateBtnLink: e.target.value })}
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* ── COPYRIGHT ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Copyright</h2>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Copyright Text</label>
            <input
              value={form.copyrightText}
              onChange={(e) => setForm({ ...form, copyrightText: e.target.value })}
              placeholder="e.g. LPI-B2B Marketplace. All rights reserved."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Developer Name</label>
            <input
              value={form.developerName}
              onChange={(e) => setForm({ ...form, developerName: e.target.value })}
              placeholder="e.g. Legal Papers India"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Developer Link</label>
            <input
              value={form.developerLink}
              onChange={(e) => setForm({ ...form, developerLink: e.target.value })}
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

      </div>
    </div>
  );
}