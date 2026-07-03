// import React, { useState } from "react";
// import {
//   FaEye,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaClipboardList,
//   FaTrash,
// } from "react-icons/fa";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const ITEMS_PER_PAGE = 10;

// const timeAgo = (date) => {
//   const diff = Math.floor((new Date() - new Date(date)) / 1000);
//   if (diff < 60) return `${diff}s ago`;
//   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//   return `${Math.floor(diff / 86400)}d ago`;
// };

// const getStatusStyle = (status) => {
//   switch (status) {
//     case "new":
//       return "bg-blue-100 text-blue-700";
//     case "viewed":
//       return "bg-yellow-100 text-yellow-700";
//     case "contacted":
//       return "bg-purple-100 text-purple-700";
//     case "converted":
//       return "bg-green-100 text-green-700";
//     case "rejected":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-gray-100 text-gray-700";
//   }
// };

// const VerifyLeadsTable = ({
//   requirements,
//   requirementsLoading,
//   requirementsError,
//   selectedReqIds,
//   setSelectedReqIds,
//   handleDeleteReq,
//   handleDeleteMultipleReqs,
//   handleReqStatusChange,
//   updatingReqId,
// }) => {
//   const [reqPage, setReqPage] = useState(1);
//   const [reqSearch, setReqSearch] = useState("");
//   const [showDownload, setShowDownload] = useState(false);
//   const [selectedReq, setSelectedReq] = useState(null);

//   // SEARCH FILTER
//   const filteredReqs = requirements.filter((r) => {
//     if (!reqSearch.trim()) return true;
//     const q = reqSearch.toLowerCase();
//     return (
//       r.buyerName?.toLowerCase().includes(q) ||
//       r.buyerEmail?.toLowerCase().includes(q) ||
//       r.buyerPhone?.toLowerCase().includes(q) ||
//       r.productName?.toLowerCase().includes(q) ||
//       r.category?.name?.toLowerCase().includes(q)
//     );
//   });

//   const reqTotalPages = Math.ceil(filteredReqs.length / ITEMS_PER_PAGE);
//   const currentReqs = filteredReqs.slice(
//     (reqPage - 1) * ITEMS_PER_PAGE,
//     reqPage * ITEMS_PER_PAGE,
//   );

//   // CHECKBOX
//   const toggleReqCheckbox = (id) =>
//     setSelectedReqIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
//     );

//   const toggleAllReqs = () => {
//     const pageIds = currentReqs.map((r) => r._id);
//     const allSelected = pageIds.every((id) => selectedReqIds.includes(id));
//     if (allSelected)
//       setSelectedReqIds((prev) => prev.filter((id) => !pageIds.includes(id)));
//     else setSelectedReqIds((prev) => [...new Set([...prev, ...pageIds])]);
//   };

//   // EXCEL
//   const handleExcel = () => {
//     const toDownload =
//       selectedReqIds.length > 0
//         ? filteredReqs.filter((r) => selectedReqIds.includes(r._id))
//         : filteredReqs;
//     const data = toDownload.map((r) => ({
//       "Buyer Name": r.buyerName || "",
//       Phone: r.buyerPhone || "",
//       Email: r.buyerEmail || "",
//       Product: r.productName || "",
//       Category: r.category?.name || "",
//       Quantity: r.quantity || "",
//       Budget: r.budget || "",
//       Location: r.location || "",
//       Status: r.status || "",
//       Date: r.createdAt
//         ? new Date(r.createdAt).toLocaleDateString("en-IN")
//         : "",
//     }));
//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "VerifyLeads");
//     XLSX.writeFile(wb, "verify-leads.xlsx");
//     setShowDownload(false);
//   };

//   // PDF
//   const handlePDF = () => {
//     const toDownload =
//       selectedReqIds.length > 0
//         ? filteredReqs.filter((r) => selectedReqIds.includes(r._id))
//         : filteredReqs;
//     const doc = new jsPDF({ orientation: "landscape" });
//     doc.setFontSize(14);
//     doc.text("Verify Leads Report", 14, 15);
//     autoTable(doc, {
//       startY: 22,
//       head: [
//         [
//           "Buyer",
//           "Phone",
//           "Product",
//           "Category",
//           "Quantity",
//           "Budget",
//           "Location",
//           "Status",
//           "Date",
//         ],
//       ],
//       body: toDownload.map((r) => [
//         r.buyerName || "",
//         r.buyerPhone || "",
//         r.productName || "",
//         r.category?.name || "",
//         r.quantity || "",
//         r.budget || "",
//         r.location || "",
//         r.status || "",
//         r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "",
//       ]),
//       styles: { fontSize: 7 },
//       headStyles: { fillColor: [234, 88, 12] },
//     });
//     doc.save("verify-leads.pdf");
//     setShowDownload(false);
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
//       {/* HEADER */}
//       <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 flex items-center justify-between flex-wrap gap-3">
//         <div>
//           <h2 className="text-xl font-semibold">Verify Leads</h2>
//           <p className="text-orange-100 text-xs mt-0.5">
//             Buyers looking for products in your category
//           </p>
//         </div>
//         <div className="flex items-center gap-3 flex-wrap">
//           {/* SEARCH */}
//           <input
//             type="text"
//             value={reqSearch}
//             onChange={(e) => {
//               setReqSearch(e.target.value);
//               setReqPage(1);
//             }}
//             placeholder="Search buyer, product..."
//             className="px-3 py-2 rounded-xl text-xs bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 w-44"
//           />

//           {/* DOWNLOAD */}
//           <div className="relative">
//             <button
//               onClick={() => setShowDownload((v) => !v)}
//               className="px-4 py-2 rounded-xl text-xs border border-white/20 bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1.5"
//             >
//               ↓ Download
//               {selectedReqIds.length > 0 && (
//                 <span className="bg-white text-orange-600 rounded-full px-1.5 py-0.5 text-[10px] font-bold">
//                   {selectedReqIds.length}
//                 </span>
//               )}
//               <span className="text-white/60 text-[10px]">▾</span>
//             </button>
//             {showDownload && (
//               <>
//                 <div
//                   className="fixed inset-0 z-10"
//                   onClick={() => setShowDownload(false)}
//                 />
//                 <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-xl overflow-hidden w-40 shadow-xl">
//                   <p className="text-gray-400 text-[10px] px-3 pt-2 pb-1">
//                     {selectedReqIds.length > 0
//                       ? `${selectedReqIds.length} selected`
//                       : "All filtered"}
//                   </p>
//                   <button
//                     onClick={handleExcel}
//                     className="w-full text-left px-3 py-2 text-xs text-green-600 hover:bg-gray-50 transition flex items-center gap-2"
//                   >
//                     <span>📊</span> Excel (.xlsx)
//                   </button>
//                   <button
//                     onClick={handlePDF}
//                     className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-gray-50 transition flex items-center gap-2"
//                   >
//                     <span>📄</span> PDF
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* DELETE SELECTED */}
//           {/* {selectedReqIds.length > 0 && (
//             <button
//               onClick={handleDeleteMultipleReqs}
//               className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
//             >
//               <FaTrash /> Delete Selected ({selectedReqIds.length})
//             </button>
//           )} */}
//           <span className="text-orange-100 text-sm">
//             {requirements.length} leads
//           </span>
//         </div>
//       </div>

//       {/* LOADING */}
//       {requirementsLoading && (
//         <div className="flex items-center justify-center py-20">
//           <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
//         </div>
//       )}

//       {/* ERROR */}
//       {!requirementsLoading && requirementsError && (
//         <div className="p-6 text-red-500 text-sm">{requirementsError}</div>
//       )}

//       {/* EMPTY */}
//       {!requirementsLoading &&
//         !requirementsError &&
//         requirements.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//             <FaClipboardList className="text-6xl mb-4 text-gray-300" />
//             <p className="text-lg font-medium">No verify leads yet</p>
//             <p className="text-sm mt-1">
//               Requirements will appear when buyers post in your category
//             </p>
//           </div>
//         )}

//       {/* TABLE */}
//       {!requirementsLoading &&
//         !requirementsError &&
//         requirements.length > 0 && (
//           <>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left">
//                 <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
//                   <tr>
//                     <th className="p-4 w-10">
//                       <input
//                         type="checkbox"
//                         className="w-4 h-4 accent-orange-600 cursor-pointer"
//                         checked={
//                           currentReqs.length > 0 &&
//                           currentReqs.every((r) =>
//                             selectedReqIds.includes(r._id),
//                           )
//                         }
//                         onChange={toggleAllReqs}
//                       />
//                     </th>
//                     <th className="p-4">Product Required</th>
//                     <th className="p-4">Category</th>
//                     <th className="p-4">Qty / Budget</th>
//                     <th className="p-4">Location</th>
//                     <th className="p-4">Buyer</th>
//                     <th className="p-4">Status</th>
//                     <th className="p-4">Date</th>
//                     <th className="p-4 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentReqs.map((req) => (
//                     <tr
//                       key={req._id}
//                       className={`border-b hover:bg-gray-50 transition ${selectedReqIds.includes(req._id) ? "bg-orange-50" : ""}`}
//                     >
//                       <td className="p-4">
//                         <input
//                           type="checkbox"
//                           className="w-4 h-4 accent-orange-600 cursor-pointer"
//                           checked={selectedReqIds.includes(req._id)}
//                           onChange={() => toggleReqCheckbox(req._id)}
//                         />
//                       </td>
//                       <td className="p-4">
//                         <p className="font-semibold text-gray-800">
//                           {req.productName}
//                         </p>
//                       </td>
//                       <td className="p-4 text-gray-600">
//                         <p>{req.category?.name || "—"}</p>
//                         {req.subCategory?.name && (
//                           <p className="text-xs text-gray-400">
//                             {req.subCategory.name}
//                           </p>
//                         )}
//                       </td>
//                       <td className="p-4 text-gray-600">
//                         {req.quantity && (
//                           <p className="text-xs">
//                             <span className="text-gray-400">Qty: </span>
//                             {req.quantity}
//                           </p>
//                         )}
//                         {req.budget && (
//                           <p className="text-xs">
//                             <span className="text-gray-400">Budget: </span>
//                             {req.budget}
//                           </p>
//                         )}
//                         {!req.quantity && !req.budget && "—"}
//                       </td>
//                       <td className="p-4 text-gray-600 text-xs">
//                         {req.location || "—"}
//                       </td>
//                       <td className="p-4">
//                         <p className="font-medium text-gray-800 text-xs">
//                           {req.buyerName}
//                         </p>
//                         <a
//                           href={`tel:${req.buyerPhone}`}
//                           className="flex items-center gap-1 text-green-600 text-xs mt-0.5"
//                         >
//                           <FaPhoneAlt className="text-xs" /> {req.buyerPhone}
//                         </a>
//                       </td>

//                       {/* STATUS SELECT */}
//                       <td className="p-4">
//                         <select
//                           value={req.status || "new"}
//                           onChange={(e) =>
//                             handleReqStatusChange(req._id, e.target.value)
//                           }
//                           disabled={updatingReqId === req._id}
//                           className={`px-3 py-1 rounded-full text-xs font-semibold border-0 outline-none cursor-pointer capitalize ${getStatusStyle(req.status)}`}
//                         >
//                           <option value="new">New</option>
//                           <option value="viewed">Viewed</option>
//                           <option value="contacted">Contacted</option>
//                           <option value="converted">Converted</option>
//                           <option value="rejected">Rejected</option>
//                         </select>
//                       </td>

//                       {/* DATE + TIME AGO */}
//                       <td className="p-4">
//                         <p className="text-gray-500 text-xs">
//                           {new Date(req.createdAt).toLocaleDateString("en-IN", {
//                             day: "numeric",
//                             month: "short",
//                             year: "numeric",
//                           })}
//                         </p>
//                         <p className="text-gray-400 text-[11px] mt-0.5">
//                           {timeAgo(req.createdAt)}
//                         </p>
//                       </td>

//                       <td className="p-4">
//                         <div className="flex justify-center gap-2">
//                           <button
//                             onClick={() => setSelectedReq(req)}
//                             className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
//                             title="View"
//                           >
//                             <FaEye />
//                           </button>
//                           {/* <button
//                             onClick={() => handleDeleteReq(req._id)}
//                             className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
//                             title="Delete"
//                           >
//                             <FaTrash />
//                           </button> */}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* PAGINATION */}
//             {reqTotalPages > 1 && (
//               <div className="px-6 py-4 border-t flex items-center justify-between text-sm">
//                 <p className="text-gray-500">
//                   Showing {(reqPage - 1) * ITEMS_PER_PAGE + 1}–
//                   {Math.min(reqPage * ITEMS_PER_PAGE, filteredReqs.length)} of{" "}
//                   {filteredReqs.length}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setReqPage((p) => p - 1)}
//                     disabled={reqPage === 1}
//                     className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-orange-600 hover:text-orange-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
//                   >
//                     ← Prev
//                   </button>
//                   {Array.from({ length: reqTotalPages }, (_, i) => i + 1).map(
//                     (p) => (
//                       <button
//                         key={p}
//                         onClick={() => setReqPage(p)}
//                         className={`w-9 h-9 rounded-xl border text-sm font-medium transition
//                       ${reqPage === p ? "bg-orange-600 text-white border-orange-600" : "border-gray-200 text-gray-600 hover:border-orange-600 hover:text-orange-600"}`}
//                       >
//                         {p}
//                       </button>
//                     ),
//                   )}
//                   <button
//                     onClick={() => setReqPage((p) => p + 1)}
//                     disabled={reqPage === reqTotalPages}
//                     className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-orange-600 hover:text-orange-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
//                   >
//                     Next →
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//       {/* VIEW MODAL */}
//       {selectedReq && (
//              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//                <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
//                  <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 flex justify-between items-center">
//                    <h2 className="text-lg font-semibold">Verify Lead Details</h2>
//                    <button onClick={() => setSelectedReq(null)} className="text-white hover:text-orange-200 text-xl font-bold">✕</button>
//                  </div>
//                  <div className="p-6 space-y-4">
//                    <div>
//                      <p className="text-gray-400 text-xs mb-1">Product Required</p>
//                      <p className="font-bold text-gray-800 text-lg">{selectedReq.productName}</p>
//                    </div>
//                    <div className="grid grid-cols-2 gap-3 text-sm">
//                      <div><p className="text-gray-400 text-xs mb-1">Category</p><p className="font-medium">{selectedReq.category?.name || "—"}</p></div>
//                      <div><p className="text-gray-400 text-xs mb-1">Sub Category</p><p className="font-medium">{selectedReq.subCategory?.name || "—"}</p></div>
//                      <div><p className="text-gray-400 text-xs mb-1">Quantity</p><p className="font-medium">{selectedReq.quantity || "—"}</p></div>
//                      <div><p className="text-gray-400 text-xs mb-1">Budget</p><p className="font-medium">{selectedReq.budget || "—"}</p></div>
//                      <div><p className="text-gray-400 text-xs mb-1">Location</p><p className="font-medium">{selectedReq.location || "—"}</p></div>
//                      <div>
//                        <p className="text-gray-400 text-xs mb-1">Status</p>
//                        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(selectedReq.status)}`}>
//                          {selectedReq.status}
//                        </span>
//                      </div>
//                      <div className="col-span-2">
//                        <p className="text-gray-400 text-xs mb-1">Date</p>
//                        <p className="font-medium text-xs">{new Date(selectedReq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
//                        <p className="text-gray-400 text-[11px]">{timeAgo(selectedReq.createdAt)}</p>
//                      </div>
//                    </div>
//                    {selectedReq.description && (
//                      <div>
//                        <p className="text-gray-400 text-xs mb-1">Description</p>
//                        <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 leading-relaxed">{selectedReq.description}</p>
//                      </div>
//                    )}
//                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
//                      <p className="text-xs text-orange-600 font-semibold mb-2">Buyer Contact</p>
//                      <p className="font-bold text-gray-800">{selectedReq.buyerName}</p>
//                      <a href={`tel:${selectedReq.buyerPhone}`} className="flex items-center gap-2 text-green-600 font-medium text-sm mt-1">
//                        <FaPhoneAlt className="text-xs" /> {selectedReq.buyerPhone}
//                      </a>
//                      {selectedReq.buyerEmail && (
//                        <a href={`mailto:${selectedReq.buyerEmail}`} className="flex items-center gap-2 text-blue-600 text-xs mt-1">
//                          <FaEnvelope className="text-xs" /> {selectedReq.buyerEmail}
//                        </a>
//                      )}
//                    </div>
//                  </div>
//                  <div className="px-6 py-4 border-t flex justify-end">
//                    <button onClick={() => setSelectedReq(null)} className="px-5 py-2 border rounded-xl text-sm hover:border-orange-600 hover:text-orange-600 transition">Close</button>
//                  </div>
//                </div>
//              </div>
//            )}
//     </div>
//   );
// };

// export default VerifyLeadsTable;





import React, { useState } from "react";
import {
  FaEye,
  FaPhoneAlt,
  FaEnvelope,
  FaClipboardList,
  FaTrash,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ITEMS_PER_PAGE = 10;

const timeAgo = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const getStatusStyle = (status) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-700";
    case "viewed":
      return "bg-yellow-100 text-yellow-700";
    case "contacted":
      return "bg-purple-100 text-purple-700";
    case "converted":
      return "bg-green-100 text-green-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const VerifyLeadsTable = ({
  requirements,
  requirementsLoading,
  requirementsError,
  selectedReqIds,
  setSelectedReqIds,
  handleDeleteReq,
  handleDeleteMultipleReqs,
  handleReqStatusChange,
  updatingReqId,
}) => {
  const [reqPage, setReqPage] = useState(1);
  const [reqSearch, setReqSearch] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);

  // SEARCH FILTER
  const filteredReqs = requirements.filter((r) => {
    if (!reqSearch.trim()) return true;
    const q = reqSearch.toLowerCase();
    return (
      r.buyerName?.toLowerCase().includes(q) ||
      r.buyerEmail?.toLowerCase().includes(q) ||
      r.buyerPhone?.toLowerCase().includes(q) ||
      r.productName?.toLowerCase().includes(q) ||
      r.category?.name?.toLowerCase().includes(q)
    );
  });

  const reqTotalPages = Math.ceil(filteredReqs.length / ITEMS_PER_PAGE);
  const currentReqs = filteredReqs.slice(
    (reqPage - 1) * ITEMS_PER_PAGE,
    reqPage * ITEMS_PER_PAGE,
  );

  // ✅ NEW - Smart pagination (sirf limited pages + ellipsis dikhega jab pages zyada ho)
  const getReqPageNumbers = () => {
    const pages = [];
    const delta = 1;

    for (let i = 1; i <= reqTotalPages; i++) {
      if (
        i === 1 ||
        i === reqTotalPages ||
        (i >= reqPage - delta && i <= reqPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  // CHECKBOX
  const toggleReqCheckbox = (id) =>
    setSelectedReqIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const toggleAllReqs = () => {
    const pageIds = currentReqs.map((r) => r._id);
    const allSelected = pageIds.every((id) => selectedReqIds.includes(id));
    if (allSelected)
      setSelectedReqIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    else setSelectedReqIds((prev) => [...new Set([...prev, ...pageIds])]);
  };

  // EXCEL
  const handleExcel = () => {
    const toDownload =
      selectedReqIds.length > 0
        ? filteredReqs.filter((r) => selectedReqIds.includes(r._id))
        : filteredReqs;
    const data = toDownload.map((r) => ({
      "Buyer Name": r.buyerName || "",
      Phone: r.buyerPhone || "",
      Email: r.buyerEmail || "",
      Product: r.productName || "",
      Category: r.category?.name || "",
      Quantity: r.quantity || "",
      Budget: r.budget || "",
      Location: r.location || "",
      Status: r.status || "",
      Date: r.createdAt
        ? new Date(r.createdAt).toLocaleDateString("en-IN")
        : "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "VerifyLeads");
    XLSX.writeFile(wb, "verify-leads.xlsx");
    setShowDownload(false);
  };

  // PDF
  const handlePDF = () => {
    const toDownload =
      selectedReqIds.length > 0
        ? filteredReqs.filter((r) => selectedReqIds.includes(r._id))
        : filteredReqs;
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(14);
    doc.text("Verify Leads Report", 14, 15);
    autoTable(doc, {
      startY: 22,
      head: [
        [
          "Buyer",
          "Phone",
          "Product",
          "Category",
          "Quantity",
          "Budget",
          "Location",
          "Status",
          "Date",
        ],
      ],
      body: toDownload.map((r) => [
        r.buyerName || "",
        r.buyerPhone || "",
        r.productName || "",
        r.category?.name || "",
        r.quantity || "",
        r.budget || "",
        r.location || "",
        r.status || "",
        r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "",
      ]),
      styles: { fontSize: 7 },
      headStyles: { fillColor: [234, 88, 12] },
    });
    doc.save("verify-leads.pdf");
    setShowDownload(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold">Verify Leads</h2>
          <p className="text-orange-100 text-xs mt-0.5">
            Buyers looking for products in your category
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* SEARCH */}
          <input
            type="text"
            value={reqSearch}
            onChange={(e) => {
              setReqSearch(e.target.value);
              setReqPage(1);
            }}
            placeholder="Search buyer, product..."
            className="px-3 py-2 rounded-xl text-xs bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 w-44"
          />

          {/* DOWNLOAD */}
          <div className="relative">
            <button
              onClick={() => setShowDownload((v) => !v)}
              className="px-4 py-2 rounded-xl text-xs border border-white/20 bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1.5"
            >
              ↓ Download
              {selectedReqIds.length > 0 && (
                <span className="bg-white text-orange-600 rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                  {selectedReqIds.length}
                </span>
              )}
              <span className="text-white/60 text-[10px]">▾</span>
            </button>
            {showDownload && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDownload(false)}
                />
                <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-xl overflow-hidden w-40 shadow-xl">
                  <p className="text-gray-400 text-[10px] px-3 pt-2 pb-1">
                    {selectedReqIds.length > 0
                      ? `${selectedReqIds.length} selected`
                      : "All filtered"}
                  </p>
                  <button
                    onClick={handleExcel}
                    className="w-full text-left px-3 py-2 text-xs text-green-600 hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    <span>📊</span> Excel (.xlsx)
                  </button>
                  <button
                    onClick={handlePDF}
                    className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    <span>📄</span> PDF
                  </button>
                </div>
              </>
            )}
          </div>

          {/* DELETE SELECTED */}
          {/* {selectedReqIds.length > 0 && (
            <button
              onClick={handleDeleteMultipleReqs}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
            >
              <FaTrash /> Delete Selected ({selectedReqIds.length})
            </button>
          )} */}
          <span className="text-orange-100 text-sm">
            {requirements.length} leads
          </span>
        </div>
      </div>

      {/* LOADING */}
      {requirementsLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* ERROR */}
      {!requirementsLoading && requirementsError && (
        <div className="p-6 text-red-500 text-sm">{requirementsError}</div>
      )}

      {/* EMPTY */}
      {!requirementsLoading &&
        !requirementsError &&
        requirements.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FaClipboardList className="text-6xl mb-4 text-gray-300" />
            <p className="text-lg font-medium">No verify leads yet</p>
            <p className="text-sm mt-1">
              Requirements will appear when buyers post in your category
            </p>
          </div>
        )}

      {/* TABLE */}
      {!requirementsLoading &&
        !requirementsError &&
        requirements.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-orange-600 cursor-pointer"
                        checked={
                          currentReqs.length > 0 &&
                          currentReqs.every((r) =>
                            selectedReqIds.includes(r._id),
                          )
                        }
                        onChange={toggleAllReqs}
                      />
                    </th>
                    <th className="p-4">Product Required</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Qty / Budget</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Buyer</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReqs.map((req) => (
                    <tr
                      key={req._id}
                      className={`border-b hover:bg-gray-50 transition ${selectedReqIds.includes(req._id) ? "bg-orange-50" : ""}`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-orange-600 cursor-pointer"
                          checked={selectedReqIds.includes(req._id)}
                          onChange={() => toggleReqCheckbox(req._id)}
                        />
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-gray-800">
                          {req.productName}
                        </p>
                      </td>
                      <td className="p-4 text-gray-600">
                        <p>{req.category?.name || "—"}</p>
                        {req.subCategory?.name && (
                          <p className="text-xs text-gray-400">
                            {req.subCategory.name}
                          </p>
                        )}
                      </td>
                      <td className="p-4 text-gray-600">
                        {req.quantity && (
                          <p className="text-xs">
                            <span className="text-gray-400">Qty: </span>
                            {req.quantity}
                          </p>
                        )}
                        {req.budget && (
                          <p className="text-xs">
                            <span className="text-gray-400">Budget: </span>
                            {req.budget}
                          </p>
                        )}
                        {!req.quantity && !req.budget && "—"}
                      </td>
                      <td className="p-4 text-gray-600 text-xs">
                        {req.location || "—"}
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-gray-800 text-xs">
                          {req.buyerName}
                        </p>
                        <a
                          href={`tel:${req.buyerPhone}`}
                          className="flex items-center gap-1 text-green-600 text-xs mt-0.5"
                        >
                          <FaPhoneAlt className="text-xs" /> {req.buyerPhone}
                        </a>
                      </td>

                      {/* STATUS SELECT */}
                      <td className="p-4">
                        <select
                          value={req.status || "new"}
                          onChange={(e) =>
                            handleReqStatusChange(req._id, e.target.value)
                          }
                          disabled={updatingReqId === req._id}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 outline-none cursor-pointer capitalize ${getStatusStyle(req.status)}`}
                        >
                          <option value="new">New</option>
                          <option value="viewed">Viewed</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>

                      {/* DATE + TIME AGO */}
                      <td className="p-4">
                        <p className="text-gray-500 text-xs">
                          {new Date(req.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-gray-400 text-[11px] mt-0.5">
                          {timeAgo(req.createdAt)}
                        </p>
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setSelectedReq(req)}
                            className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                            title="View"
                          >
                            <FaEye />
                          </button>
                          {/* <button
                            onClick={() => handleDeleteReq(req._id)}
                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                            title="Delete"
                          >
                            <FaTrash />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {reqTotalPages > 1 && (
              <div className="px-6 py-4 border-t flex items-center justify-between text-sm">
                <p className="text-gray-500">
                  Showing {(reqPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(reqPage * ITEMS_PER_PAGE, filteredReqs.length)} of{" "}
                  {filteredReqs.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReqPage((p) => Math.max(p - 1, 1))}
                    disabled={reqPage === 1}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-orange-600 hover:text-orange-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Prev
                  </button>
                  {/* ✅ UPDATED - ab getReqPageNumbers() se limited pages + ellipsis render honge */}
                  {getReqPageNumbers().map((p, idx) =>
                    p === "..." ? (
                      <span key={`dots-${idx}`} className="px-2 text-gray-400 text-sm">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setReqPage(p)}
                        className={`w-9 h-9 rounded-xl border text-sm font-medium transition
                      ${reqPage === p ? "bg-orange-600 text-white border-orange-600" : "border-gray-200 text-gray-600 hover:border-orange-600 hover:text-orange-600"}`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() => setReqPage((p) => Math.min(p + 1, reqTotalPages))}
                    disabled={reqPage === reqTotalPages}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-orange-600 hover:text-orange-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      {/* VIEW MODAL */}
      {selectedReq && (
             <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
               <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                 <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 flex justify-between items-center">
                   <h2 className="text-lg font-semibold">Verify Lead Details</h2>
                   <button onClick={() => setSelectedReq(null)} className="text-white hover:text-orange-200 text-xl font-bold">✕</button>
                 </div>
                 <div className="p-6 space-y-4">
                   <div>
                     <p className="text-gray-400 text-xs mb-1">Product Required</p>
                     <p className="font-bold text-gray-800 text-lg">{selectedReq.productName}</p>
                   </div>
                   <div className="grid grid-cols-2 gap-3 text-sm">
                     <div><p className="text-gray-400 text-xs mb-1">Category</p><p className="font-medium">{selectedReq.category?.name || "—"}</p></div>
                     <div><p className="text-gray-400 text-xs mb-1">Sub Category</p><p className="font-medium">{selectedReq.subCategory?.name || "—"}</p></div>
                     <div><p className="text-gray-400 text-xs mb-1">Quantity</p><p className="font-medium">{selectedReq.quantity || "—"}</p></div>
                     <div><p className="text-gray-400 text-xs mb-1">Budget</p><p className="font-medium">{selectedReq.budget || "—"}</p></div>
                     <div><p className="text-gray-400 text-xs mb-1">Location</p><p className="font-medium">{selectedReq.location || "—"}</p></div>
                     <div>
                       <p className="text-gray-400 text-xs mb-1">Status</p>
                       <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(selectedReq.status)}`}>
                         {selectedReq.status}
                       </span>
                     </div>
                     <div className="col-span-2">
                       <p className="text-gray-400 text-xs mb-1">Date</p>
                       <p className="font-medium text-xs">{new Date(selectedReq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                       <p className="text-gray-400 text-[11px]">{timeAgo(selectedReq.createdAt)}</p>
                     </div>
                   </div>
                   {selectedReq.description && (
                     <div>
                       <p className="text-gray-400 text-xs mb-1">Description</p>
                       <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 leading-relaxed">{selectedReq.description}</p>
                     </div>
                   )}
                   <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                     <p className="text-xs text-orange-600 font-semibold mb-2">Buyer Contact</p>
                     <p className="font-bold text-gray-800">{selectedReq.buyerName}</p>
                     <a href={`tel:${selectedReq.buyerPhone}`} className="flex items-center gap-2 text-green-600 font-medium text-sm mt-1">
                       <FaPhoneAlt className="text-xs" /> {selectedReq.buyerPhone}
                     </a>
                     {selectedReq.buyerEmail && (
                       <a href={`mailto:${selectedReq.buyerEmail}`} className="flex items-center gap-2 text-blue-600 text-xs mt-1">
                         <FaEnvelope className="text-xs" /> {selectedReq.buyerEmail}
                       </a>
                     )}
                   </div>
                 </div>
                 <div className="px-6 py-4 border-t flex justify-end">
                   <button onClick={() => setSelectedReq(null)} className="px-5 py-2 border rounded-xl text-sm hover:border-orange-600 hover:text-orange-600 transition">Close</button>
                 </div>
               </div>
             </div>
           )}
    </div>
  );
};

export default VerifyLeadsTable;