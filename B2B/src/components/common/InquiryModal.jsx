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




import React from "react";

import {
  X,
  MessageSquareMore,
} from "lucide-react";

export default function InquiryModal({

  isOpen,
  onClose,
  productName,

}) {

  // =========================
  // CLOSE IF NOT OPEN
  // =========================
  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-4">

      {/* MODAL BOX */}
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-fadeIn">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">

          <div className="flex items-center gap-2">

            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

              <MessageSquareMore className="w-5 h-5 text-blue-800" />

            </div>

            <div>

              <h2 className="text-lg font-semibold text-gray-900">
                Send Inquiry
              </h2>

              <p className="text-xs text-gray-500">
                Get best quotation from supplier
              </p>

            </div>

          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
          >

            <X className="w-5 h-5 text-gray-500" />

          </button>

        </div>

        {/* BODY */}
        <div className="p-5 space-y-4">

          {/* PRODUCT */}
          <div>

            <label className="text-sm font-medium text-gray-700 block mb-2">
              Product
            </label>

            <input
              type="text"
              value={productName}
              readOnly
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 outline-none"
            />

          </div>

          {/* NAME */}
          <div>

            <label className="text-sm font-medium text-gray-700 block mb-2">
              Your Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-800"
            />

          </div>

          {/* PHONE */}
          <div>

            <label className="text-sm font-medium text-gray-700 block mb-2">
              Mobile Number
            </label>

            <input
              type="text"
              placeholder="Enter mobile number"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-800"
            />

          </div>

          {/* QUANTITY */}
          <div>

            <label className="text-sm font-medium text-gray-700 block mb-2">
              Quantity
            </label>

            <input
              type="text"
              placeholder="Ex: 100 Pieces"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-800"
            />

          </div>

          {/* MESSAGE */}
          <div>

            <label className="text-sm font-medium text-gray-700 block mb-2">
              Message
            </label>

            <textarea
              rows="3"
              placeholder="Write your requirement..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-800 resize-none"
            />

          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">

            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 hover:bg-gray-100 py-2.5 rounded-xl font-medium transition"
            >
              Cancel
            </button>

            <button
              className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl font-medium transition"
            >
              Submit Inquiry
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}