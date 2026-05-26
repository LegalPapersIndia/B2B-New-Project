// import React from "react";

// import {
//   X,
//   MessageSquareMore,
// } from "lucide-react";

// export default function InquiryModal({

//   isOpen,
//   onClose,
//   productName,

// }) {

//   // =========================
//   // CLOSE IF NOT OPEN
//   // =========================
//   if (!isOpen) return null;

//   return (

//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

//       {/* MODAL BOX */}
//       <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

//         {/* HEADER */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">

//           <div className="flex items-center gap-2">

//             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

//               <MessageSquareMore className="w-5 h-5 text-blue-800" />

//             </div>

//             <div>

//               <h2 className="text-lg font-semibold text-gray-900">
//                 Send Inquiry
//               </h2>

//               <p className="text-xs text-gray-500">
//                 Get best quotation from supplier
//               </p>

//             </div>

//           </div>

//           {/* CLOSE */}
//           <button
//             onClick={onClose}
//             className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
//           >

//             <X className="w-5 h-5 text-gray-500" />

//           </button>

//         </div>

//         {/* BODY */}
//         <div className="p-6 space-y-5">

//           {/* PRODUCT */}
//           <div>

//             <label className="text-sm font-medium text-gray-700 block mb-2">
//               Product
//             </label>

//             <input
//               type="text"
//               value={productName}
//               readOnly
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 outline-none"
//             />

//           </div>

//           {/* NAME */}
//           <div>

//             <label className="text-sm font-medium text-gray-700 block mb-2">
//               Your Name
//             </label>

//             <input
//               type="text"
//               placeholder="Enter your name"
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-800"
//             />

//           </div>

//           {/* PHONE */}
//           <div>

//             <label className="text-sm font-medium text-gray-700 block mb-2">
//               Mobile Number
//             </label>

//             <input
//               type="text"
//               placeholder="Enter mobile number"
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-800"
//             />

//           </div>

//           {/* QUANTITY */}
//           <div>

//             <label className="text-sm font-medium text-gray-700 block mb-2">
//               Quantity
//             </label>

//             <input
//               type="text"
//               placeholder="Ex: 100 Pieces"
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-800"
//             />

//           </div>

//           {/* MESSAGE */}
//           <div>

//             <label className="text-sm font-medium text-gray-700 block mb-2">
//               Message
//             </label>

//             <textarea
//               rows="4"
//               placeholder="Write your requirement..."
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-800 resize-none"
//             />

//           </div>

//           {/* BUTTONS */}
//           <div className="flex gap-3 pt-2">

//             <button
//               onClick={onClose}
//               className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-medium transition"
//             >
//               Cancel
//             </button>

//             <button
//               className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-xl font-medium transition"
//             >
//               Submit Inquiry
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }




// import React from "react";

// import {
//   X,
//   MessageSquareMore,
// } from "lucide-react";

// export default function InquiryModal({

//   isOpen,
//   onClose,
//   productName,

// }) {

//   // =========================
//   // CLOSE IF NOT OPEN
//   // =========================
//   if (!isOpen) return null;

//   return (

//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-4">

//       {/* MODAL BOX */}
//       <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-fadeIn">

//         {/* HEADER */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">

//           <div className="flex items-center gap-2">

//             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

//               <MessageSquareMore className="w-5 h-5 text-blue-800" />

//             </div>

//             <div>

//               <h2 className="text-lg font-semibold text-gray-900">
//                 Send Inquiry
//               </h2>

//               <p className="text-xs text-gray-500">
//                 Get best quotation from supplier
//               </p>

//             </div>

//           </div>

//           {/* CLOSE */}
//           <button
//             onClick={onClose}
//             className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
//           >

//             <X className="w-5 h-5 text-gray-500" />

//           </button>

//         </div>

//         {/* BODY */}
//         <div className="p-5 space-y-4">

//           {/* PRODUCT */}
//           <div>

//             <label className="text-sm font-medium text-gray-700 block mb-2">
//               Product
//             </label>

//             <input
//               type="text"
//               value={productName}
//               readOnly
//               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 outline-none"
//             />

//           </div>

//           {/* NAME */}
//           <div>

//             <label className="text-sm font-medium text-gray-700 block mb-2">
//               Your Name
//             </label>

//             <input
//               type="text"
//               placeholder="Enter your name"
//               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-800"
//             />

//           </div>

//           {/* PHONE */}
//           <div>

//             <label className="text-sm font-medium text-gray-700 block mb-2">
//               Mobile Number
//             </label>

//             <input
//               type="text"
//               placeholder="Enter mobile number"
//               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-800"
//             />

//           </div>

//           {/* QUANTITY */}
//           <div>

//             <label className="text-sm font-medium text-gray-700 block mb-2">
//               Quantity
//             </label>

//             <input
//               type="text"
//               placeholder="Ex: 100 Pieces"
//               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-800"
//             />

//           </div>

//           {/* MESSAGE */}
//           <div>

//             <label className="text-sm font-medium text-gray-700 block mb-2">
//               Message
//             </label>

//             <textarea
//               rows="3"
//               placeholder="Write your requirement..."
//               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-800 resize-none"
//             />

//           </div>

//           {/* BUTTONS */}
//           <div className="flex gap-3 pt-2">

//             <button
//               onClick={onClose}
//               className="flex-1 border border-gray-300 hover:bg-gray-100 py-2.5 rounded-xl font-medium transition"
//             >
//               Cancel
//             </button>

//             <button
//               className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl font-medium transition"
//             >
//               Submit Inquiry
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }

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