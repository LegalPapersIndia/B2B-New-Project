// Admin/src/pages/admin/ContactPage.jsx
import { useEffect, useState } from "react";
import {
  getContactPage,
  updateContactPage,
  addFaq,
  updateFaq,
  deleteFaq,
} from "../../api/contactPageApi";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function ContactPageAdmin() {
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    heroHeading:          "",
    heroHeadingHighlight: "",
    heroSubtext:          "",
    phone:                "",
    email:                "",
    workingHours:         "",
    whatsappNumber:       "",
    whatsappMessage:      "",
    officeName:           "",
    officeAddress:        "",
    mapEmbedUrl:          "",
    directionsLink:       "",
    isActive:             true,
  });

  const [faqs, setFaqs]             = useState([]);
  const [faqForm, setFaqForm]       = useState({ question: "", answer: "", order: 0 });
  const [editingFaq, setEditingFaq] = useState(null); // null = add mode, id = edit mode
  const [faqSubmitting, setFaqSubmitting] = useState(false);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false, title: "", message: "",
    confirmText: "OK", showCancel: false, onConfirm: null,
  });

  // ─────────────────────────────────────────
  // FETCH
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getContactPage();
        if (res.data) {
          const { faqs: f, ...rest } = res.data;
          setForm(rest);
          setFaqs(f || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // ─────────────────────────────────────────
  // MAIN FORM SUBMIT
  // ─────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.heroHeading || !form.phone || !form.email) {
      setConfirmModal({
        isOpen: true, title: "❌ Error",
        message: "Hero Heading, Phone aur Email required hain!",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
      return;
    }

    try {
      setSubmitting(true);
      await updateContactPage(form);
      setConfirmModal({
        isOpen: true, title: "✅ Saved!",
        message: "Contact Page updated successfully.",
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
  // FAQ — ADD / UPDATE
  // ─────────────────────────────────────────
  const handleFaqSubmit = async () => {
    if (!faqForm.question || !faqForm.answer) {
      setConfirmModal({
        isOpen: true, title: "❌ Error",
        message: "Question aur Answer dono required hain!",
        confirmText: "OK", showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
      return;
    }

    try {
      setFaqSubmitting(true);
      let res;

      if (editingFaq) {
        res = await updateFaq(editingFaq, faqForm);
      } else {
        res = await addFaq(faqForm);
      }

      setFaqs(res.data.faqs || []);
      setFaqForm({ question: "", answer: "", order: 0 });
      setEditingFaq(null);

      setConfirmModal({
        isOpen: true, title: "✅ Done!",
        message: editingFaq ? "FAQ updated successfully." : "FAQ added successfully.",
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
      setFaqSubmitting(false);
    }
  };

  // ─────────────────────────────────────────
  // FAQ — DELETE
  // ─────────────────────────────────────────
  const handleFaqDelete = (faqId) => {
    setConfirmModal({
      isOpen: true, title: "🗑️ Delete FAQ?",
      message: "Yeh FAQ permanently delete ho jayega!",
      confirmText: "Delete", showCancel: true,
      onConfirm: async () => {
        try {
          const res = await deleteFaq(faqId);
          setFaqs(res.data.faqs || []);
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
  // FAQ — EDIT FILL
  // ─────────────────────────────────────────
  const handleFaqEdit = (faq) => {
    setEditingFaq(faq._id);
    setFaqForm({ question: faq.question, answer: faq.answer, order: faq.order || 0 });
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
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
          <h1 className="text-2xl font-bold">Contact Page</h1>
          <p className="text-white/40 text-sm mt-1">Contact page ka content manage karo</p>
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

        {/* ── HERO SECTION ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Hero Section</h2>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Main Heading</label>
            <input
              value={form.heroHeading}
              onChange={(e) => setForm({ ...form, heroHeading: e.target.value })}
              placeholder="e.g. Let's Start A Conversation"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Highlighted Word (orange mein dikhega)</label>
            <input
              value={form.heroHeadingHighlight}
              onChange={(e) => setForm({ ...form, heroHeadingHighlight: e.target.value })}
              placeholder="e.g. Conversation"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Subtext</label>
            <textarea
              value={form.heroSubtext}
              onChange={(e) => setForm({ ...form, heroSubtext: e.target.value })}
              rows={3}
              placeholder="Hero description..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

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

        {/* ── CONTACT INFO ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Contact Info</h2>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Phone Number</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 9876543210"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Email Address</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="support@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">Working Hours</label>
            <input
              value={form.workingHours}
              onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
              placeholder="Monday - Saturday : 9 AM - 7 PM"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">WhatsApp Number (country code ke saath, no +)</label>
            <input
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              placeholder="919876543210"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs mb-1 block">WhatsApp Pre-filled Message</label>
            <input
              value={form.whatsappMessage}
              onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })}
              placeholder="Hello I want to know more..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* ── MAP / OFFICE ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4 lg:col-span-2">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Map & Office</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs mb-1 block">Office Name</label>
              <input
                value={form.officeName}
                onChange={(e) => setForm({ ...form, officeName: e.target.value })}
                placeholder="B2B Global Office"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-white/50 text-xs mb-1 block">Office Address</label>
              <input
                value={form.officeAddress}
                onChange={(e) => setForm({ ...form, officeAddress: e.target.value })}
                placeholder="Noida-8, Uttar Pradesh, India"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-white/50 text-xs mb-1 block">Google Maps Directions Link</label>
              <input
                value={form.directionsLink}
                onChange={(e) => setForm({ ...form, directionsLink: e.target.value })}
                placeholder="https://maps.google.com/..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-white/50 text-xs mb-1 block">Google Maps Embed URL</label>
              <input
                value={form.mapEmbedUrl}
                onChange={(e) => setForm({ ...form, mapEmbedUrl: e.target.value })}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* ── FAQ LIST ── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">FAQs</h2>

          {faqs.length === 0 ? (
            <p className="text-white/30 text-sm">Koi FAQ nahi hai. Neeche se add karo.</p>
          ) : (
            <div className="space-y-3 mb-4">
              {[...faqs].sort((a, b) => a.order - b.order).map((faq) => (
                <div
                  key={faq._id}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{faq.question}</p>
                    <p className="text-xs text-white/40 mt-1 line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleFaqEdit(faq)}
                      className="text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-3 py-1.5 rounded-lg transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleFaqDelete(faq._id)}
                      className="text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1.5 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FAQ FORM */}
          <div className="border-t border-white/10 pt-4 mt-4 space-y-3">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
              {editingFaq ? "✏️ Edit FAQ" : "➕ Add New FAQ"}
            </h3>

            <div>
              <label className="text-white/50 text-xs mb-1 block">Question</label>
              <input
                value={faqForm.question}
                onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                placeholder="FAQ question..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-white/50 text-xs mb-1 block">Answer</label>
              <textarea
                value={faqForm.answer}
                onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                rows={3}
                placeholder="FAQ answer..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="text-white/50 text-xs mb-1 block">Order (display sequence)</label>
              <input
                type="number"
                value={faqForm.order}
                onChange={(e) => setFaqForm({ ...faqForm, order: Number(e.target.value) })}
                placeholder="0"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleFaqSubmit}
                disabled={faqSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-2 rounded-xl text-sm font-medium transition"
              >
                {faqSubmitting ? "Saving..." : editingFaq ? "Update FAQ" : "Add FAQ"}
              </button>

              {editingFaq && (
                <button
                  onClick={() => { setEditingFaq(null); setFaqForm({ question: "", answer: "", order: 0 }); }}
                  className="bg-white/10 hover:bg-white/20 px-5 py-2 rounded-xl text-sm font-medium transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}