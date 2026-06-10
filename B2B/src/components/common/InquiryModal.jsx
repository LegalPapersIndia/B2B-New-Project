
// src/components/common/InquiryModal.jsx

import React, { useState } from "react";
import { X, Send, User, Mail, Phone, MessageSquare, Package } from "lucide-react";
import { createLead } from "../../api/leadApi";

export default function InquiryModal({ isOpen, onClose, productName, productId }) {

  const [form, setForm] = useState({
    buyerName:  "",
    buyerEmail: "",
    buyerPhone: "",
    quantity:   "",
    message:    "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");

  // ─────────────────────────────────────────
  // HANDLE CHANGE
  // ─────────────────────────────────────────
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ─────────────────────────────────────────
  // HANDLE SUBMIT
  // ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.buyerName || !form.buyerEmail || !form.buyerPhone || !form.message) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const data = await createLead({
        ...form,
        productId,
      });

      if (data.success) {
        setSuccess(true);
        setForm({
          buyerName:  "",
          buyerEmail: "",
          buyerPhone: "",
          quantity:   "",
          message:    "",
        });
      } else {
        setError(data.message || "Something went wrong");
      }

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────
  // CLOSE HANDLER
  // ─────────────────────────────────────────
  const handleClose = () => {
    setSuccess(false);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">Send Inquiry</h2>
            <p className="text-blue-200 text-sm mt-0.5 line-clamp-1">
              {productName}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SUCCESS STATE */}
        {success ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Inquiry Sent! 🎉
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              The supplier will contact you shortly.
            </p>
            <button
              onClick={handleClose}
              className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-2xl font-semibold transition"
            >
              Close
            </button>
          </div>
        ) : (

          /* FORM */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
                {error}
              </div>
            )}

            {/* NAME + PHONE */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="buyerName"
                  value={form.buyerName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name *"
                  className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="buyerPhone"
                  value={form.buyerPhone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone Number *"
                  className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="buyerEmail"
                value={form.buyerEmail}
                onChange={handleChange}
                type="email"
                placeholder="Email Address *"
                className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
              />
            </div>

            {/* QUANTITY */}
            <div className="relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                type="text"
                placeholder="Quantity Required (e.g. 100 Pieces)"
                className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
              />
            </div>

            {/* MESSAGE */}
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your requirements... *"
                rows={4}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm resize-none"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 border border-gray-200 hover:border-gray-300 text-gray-600 py-3 rounded-2xl font-semibold text-sm transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white py-3 rounded-2xl font-semibold text-sm transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Inquiry
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}