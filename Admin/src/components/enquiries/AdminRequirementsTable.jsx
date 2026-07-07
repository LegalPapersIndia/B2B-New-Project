// // components/admin/AdminRequirementsTable.jsx

// import { useState } from "react";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const timeAgo = (date) => {
//   const diff = Math.floor((new Date() - new Date(date)) / 1000);
//   if (diff < 60)    return `${diff}s ago`;
//   if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//   return `${Math.floor(diff / 86400)}d ago`;
// };

// const planStyle = (plan) => {
//   switch (plan) {
//     case "gold":    return "bg-yellow-500/20 text-yellow-400";
//     case "premium": return "bg-purple-500/20 text-purple-400";
//     case "basic":   return "bg-blue-500/20 text-blue-400";
//     default:        return "bg-gray-500/20 text-gray-400";
//   }
// };

// const itemsPerPage = 10;

// export default function AdminRequirementsTable({
//   requirements,
//   requirementsLoading,
//   handleDeleteReq,
//   handleDeleteMultipleReqs,
//   selectedReqIds,
//   setSelectedReqIds,
// }) {
//   const [requirementsPage, setRequirementsPage] = useState(1);
//   const [reqSearch, setReqSearch]               = useState("");
//   const [showReqsDownload, setShowReqsDownload] = useState(false);
//   const [selectedReq, setSelectedReq]           = useState(null);

//   // SEARCH
//   const filteredRequirements = requirements.filter((r) => {
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

//   const reqTotal = Math.ceil(filteredRequirements.length / itemsPerPage);
//   const paginatedRequirements = filteredRequirements.slice(
//     (requirementsPage - 1) * itemsPerPage,
//     requirementsPage * itemsPerPage
//   );

//   // CHECKBOX
//   const toggleReqCheckbox = (id) =>
//     setSelectedReqIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );

//   const toggleAllReqs = () => {
//     const pageIds = paginatedRequirements.map((r) => r._id);
//     const allSelected = pageIds.every((id) => selectedReqIds.includes(id));
//     if (allSelected) setSelectedReqIds((prev) => prev.filter((id) => !pageIds.includes(id)));
//     else setSelectedReqIds((prev) => [...new Set([...prev, ...pageIds])]);
//   };

//   // EXCEL
//   const handleReqsExcel = () => {
//     const toDownload = selectedReqIds.length > 0
//       ? filteredRequirements.filter((r) => selectedReqIds.includes(r._id))
//       : filteredRequirements;
//     const data = toDownload.map((r) => ({
//       "Buyer Name":       r.buyerName || "",
//       "Buyer Phone":      r.buyerPhone || "",
//       "Buyer Email":      r.buyerEmail || "",
//       "Product":          r.productName || "",
//       "Category":         r.category?.name || "",
//       "Subcategory":      r.subCategory?.name || "",
//       "Quantity":         r.quantity || "",
//       "Budget":           r.budget || "",
//       "Location":         r.location || "",
//       "Description":      r.description || "",
//       "Status":           r.status || "",
//       "Sellers Notified": r.matchedSellers?.length || 0,
//       "Date":             r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "",
//     }));
//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Requirements");
//     XLSX.writeFile(wb, "requirements.xlsx");
//     setShowReqsDownload(false);
//   };

//   // PDF
//   const handleReqsPDF = () => {
//     const toDownload = selectedReqIds.length > 0
//       ? filteredRequirements.filter((r) => selectedReqIds.includes(r._id))
//       : filteredRequirements;
//     const doc = new jsPDF({ orientation: "landscape" });
//     doc.setFontSize(14);
//     doc.text("Buy Requirements Report", 14, 15);
//     autoTable(doc, {
//       startY: 22,
//       head: [["Buyer", "Phone", "Email", "Product", "Category", "Quantity", "Budget", "Location", "Status", "Date"]],
//       body: toDownload.map((r) => [
//         r.buyerName || "", r.buyerPhone || "", r.buyerEmail || "",
//         r.productName || "", r.category?.name || "", r.quantity || "",
//         r.budget || "", r.location || "", r.status || "",
//         r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "",
//       ]),
//       styles: { fontSize: 7 },
//       headStyles: { fillColor: [234, 88, 12] },
//     });
//     doc.save("requirements.pdf");
//     setShowReqsDownload(false);
//   };

//   return (
//     <>
//       {/* SEARCH + DOWNLOAD + DELETE SELECTED */}
//      <div className="flex items-center justify-end gap-2 flex-wrap mb-4">
//   <div className="flex gap-2 items-center flex-wrap">
//     {/* SEARCH */}
//     <input
//       type="text"
//       value={reqSearch}
//       onChange={(e) => { setReqSearch(e.target.value); setRequirementsPage(1); }}
//       placeholder="Search buyer, product, category..."
//       className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 w-48"
//     />

//     {/* DOWNLOAD */}
//     <div className="relative">
//       <button
//         onClick={() => setShowReqsDownload((v) => !v)}
//         className="px-4 py-2 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-1.5"
//       >
//         ↓ Download
//         {selectedReqIds.length > 0 && (
//           <span className="bg-orange-600 text-white rounded-full px-1.5 py-0.5 text-[10px]">
//             {selectedReqIds.length}
//           </span>
//         )}
//         <span className="text-white/40 text-[10px]">▾</span>
//       </button>
//       {showReqsDownload && (
//         <>
//           <div className="fixed inset-0 z-10" onClick={() => setShowReqsDownload(false)} />
//           <div className="absolute right-0 top-full mt-1 z-20 bg-[#111827] border border-white/10 rounded-xl overflow-hidden w-40 shadow-xl">
//             <p className="text-white/30 text-[10px] px-3 pt-2 pb-1">
//               {selectedReqIds.length > 0 ? `${selectedReqIds.length} selected` : "All filtered"}
//             </p>
//             <button onClick={handleReqsExcel} className="w-full text-left px-3 py-2 text-xs text-green-400 hover:bg-white/5 transition flex items-center gap-2">
//               <span>📊</span> Excel (.xlsx)
//             </button>
//             <button onClick={handleReqsPDF} className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-white/5 transition flex items-center gap-2">
//               <span>📄</span> PDF
//             </button>
//           </div>
//         </>
//       )}
//     </div>

//     {/* DELETE SELECTED */}
//     {selectedReqIds.length > 0 && (
//       <button
//         onClick={handleDeleteMultipleReqs}
//         className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-xs font-semibold transition"
//       >
//         🗑 Delete Selected ({selectedReqIds.length})
//       </button>
//     )}
//   </div>
// </div>

//       {/* TABLE */}
//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-[1000px] w-full text-sm text-left">
//             <thead className="bg-white/5 text-white/50 border-b border-white/10">
//               <tr>
//                 <th className="p-4 w-10">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 accent-orange-600 cursor-pointer"
//                     checked={paginatedRequirements.length > 0 && paginatedRequirements.every((r) => selectedReqIds.includes(r._id))}
//                     onChange={toggleAllReqs}
//                   />
//                 </th>
//                 <th className="p-4">Buyer</th>
//                 <th className="p-4">Phone</th>
//                 <th className="p-4">Product</th>
//                 <th className="p-4">Category</th>
//                 <th className="p-4">Quantity</th>
//                 <th className="p-4">Budget</th>
//                 <th className="p-4">Sellers Notified</th>
//                 <th className="p-4">Date</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requirementsLoading && (
//                 <tr>
//                   <td colSpan={10} className="p-10 text-center text-white/40">
//                     <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
//                     Loading...
//                   </td>
//                 </tr>
//               )}

//               {!requirementsLoading && filteredRequirements.length === 0 && (
//                 <tr>
//                   <td colSpan={10} className="p-10 text-center text-white/40">No requirements found</td>
//                 </tr>
//               )}

//               {!requirementsLoading && paginatedRequirements.map((req) => (
//                 <tr
//                   key={req._id}
//                   className={`border-t border-white/10 hover:bg-white/[0.03] transition ${selectedReqIds.includes(req._id) ? "bg-orange-900/10" : ""}`}
//                 >
//                   <td className="p-4">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 accent-orange-600 cursor-pointer"
//                       checked={selectedReqIds.includes(req._id)}
//                       onChange={() => toggleReqCheckbox(req._id)}
//                     />
//                   </td>
//                   <td className="p-4">
//                     <p className="font-medium">{req.buyerName}</p>
//                     <p className="text-xs text-white/30">{req.buyerEmail}</p>
//                   </td>
//                   <td className="p-4 text-white/60">
//                     <a href={`tel:${req.buyerPhone}`} className="hover:text-green-400 transition">{req.buyerPhone}</a>
//                   </td>
//                   <td className="p-4 text-white/70 font-medium">{req.productName}</td>
//                   <td className="p-4 text-white/60">
//                     <p>{req.category?.name || "—"}</p>
//                     {req.subCategory?.name && (
//                       <p className="text-xs text-white/30">{req.subCategory.name}</p>
//                     )}
//                   </td>
//                   <td className="p-4 text-white/60">{req.quantity || "—"}</td>
//                   <td className="p-4 text-white/60">{req.budget || "—"}</td>
//                   <td className="p-4">
//                     <div className="flex flex-col gap-1">
//                       {["gold", "premium", "basic"].map((plan) => {
//                         const count = req.matchedSellers?.filter((s) => s.plan === plan).length;
//                         if (!count) return null;
//                         return (
//                           <span key={plan} className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize w-fit ${planStyle(plan)}`}>
//                             {plan}: {count}
//                           </span>
//                         );
//                       })}
//                       {req.matchedSellers?.length === 0 && (
//                         <span className="text-white/30 text-xs">No sellers</span>
//                       )}
//                     </div>
//                   </td>

//                   {/* DATE + TIME AGO */}
//                   <td className="p-4 text-white/40 whitespace-nowrap">
//                     <p>{new Date(req.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
//                     <p className="text-white/30 text-[11px] mt-0.5">{timeAgo(req.createdAt)}</p>
//                   </td>

//                   <td className="p-4">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => setSelectedReq(req)}
//                         className="bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg text-xs transition"
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => handleDeleteReq(req._id)}
//                         className="bg-red-700 hover:bg-red-800 px-3 py-1.5 rounded-lg text-xs transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         {!requirementsLoading && reqTotal > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
//             <p className="text-white/40 text-sm">
//               Showing {((requirementsPage - 1) * itemsPerPage) + 1}–{Math.min(requirementsPage * itemsPerPage, filteredRequirements.length)} of {filteredRequirements.length}
//             </p>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setRequirementsPage((p) => Math.max(p - 1, 1))}
//                 disabled={requirementsPage === 1}
//                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
//               >
//                 ← Prev
//               </button>
//               {Array.from({ length: reqTotal }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => setRequirementsPage(page)}
//                   className={`w-8 h-8 rounded-lg text-xs font-medium transition
//                     ${requirementsPage === page ? "bg-orange-600 text-white" : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"}`}
//                 >
//                   {page}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setRequirementsPage((p) => Math.min(p + 1, reqTotal))}
//                 disabled={requirementsPage === reqTotal}
//                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* REQUIREMENT VIEW MODAL */}
//       {selectedReq && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
//             <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
//               <h2 className="text-lg font-semibold">Requirement Details</h2>
//               <button onClick={() => setSelectedReq(null)} className="text-white/40 hover:text-white text-xl">✕</button>
//             </div>
//             <div className="p-6 space-y-4 overflow-y-auto">
//               <div>
//                 <p className="text-white/40 text-xs mb-1">Product Required</p>
//                 <p className="font-bold text-lg">{selectedReq.productName}</p>
//               </div>
//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div><p className="text-white/40 text-xs mb-1">Buyer</p><p className="font-medium">{selectedReq.buyerName}</p></div>
//                 <div><p className="text-white/40 text-xs mb-1">Phone</p><a href={`tel:${selectedReq.buyerPhone}`} className="font-medium text-green-400">{selectedReq.buyerPhone}</a></div>
//                 <div><p className="text-white/40 text-xs mb-1">Email</p><a href={`mailto:${selectedReq.buyerEmail}`} className="font-medium text-blue-400 text-xs">{selectedReq.buyerEmail || "—"}</a></div>
//                 <div><p className="text-white/40 text-xs mb-1">Category</p><p className="font-medium">{selectedReq.category?.name || "—"}</p></div>
//                 <div><p className="text-white/40 text-xs mb-1">Quantity</p><p className="font-medium">{selectedReq.quantity || "—"}</p></div>
//                 <div><p className="text-white/40 text-xs mb-1">Budget</p><p className="font-medium">{selectedReq.budget || "—"}</p></div>
//                 <div><p className="text-white/40 text-xs mb-1">Location</p><p className="font-medium">{selectedReq.location || "—"}</p></div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Status</p>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${selectedReq.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
//                     {selectedReq.status}
//                   </span>
//                 </div>
//               </div>
//               {selectedReq.description && (
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Description</p>
//                   <p className="text-sm text-white/70 bg-white/5 rounded-xl p-3 leading-relaxed">{selectedReq.description}</p>
//                 </div>
//               )}
//               {selectedReq.matchedSellers?.length > 0 && (
//                 <div>
//                   <p className="text-white/40 text-xs mb-2">Matched Sellers ({selectedReq.matchedSellers.length})</p>
//                   <div className="space-y-2 max-h-40 overflow-y-auto">
//                     {selectedReq.matchedSellers.map((ms, i) => (
//                       <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 text-xs">
//                         <div>
//                           <p className="font-medium">{ms.seller?.name || "—"}</p>
//                           <p className="text-white/30">{ms.seller?.email}</p>
//                         </div>
//                         <span className={`px-2 py-0.5 rounded-full capitalize font-medium ${planStyle(ms.plan)}`}>
//                           {ms.plan}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="px-6 py-4 border-t border-white/10 flex justify-end flex-shrink-0">
//               <button onClick={() => setSelectedReq(null)} className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition">Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




// components/admin/AdminRequirementsTable.jsx

import { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const timeAgo = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const planStyle = (plan) => {
  switch (plan) {
    case "diamond": return "bg-cyan-500/20 text-cyan-400";    
    case "gold":    return "bg-yellow-500/20 text-yellow-400"; 
    case "silver":  return "bg-gray-400/20 text-gray-300";     
    default:        return "bg-gray-500/20 text-gray-400";
  }
};

const itemsPerPage = 10;

export default function AdminRequirementsTable({
  requirements,
  requirementsLoading,
  handleDeleteReq,
  handleDeleteMultipleReqs,
  selectedReqIds,
  setSelectedReqIds,
}) {
  const [requirementsPage, setRequirementsPage] = useState(1);
  const [reqSearch, setReqSearch]               = useState("");
  const [showReqsDownload, setShowReqsDownload] = useState(false);
  const [selectedReq, setSelectedReq]           = useState(null);

  // SEARCH
  const filteredRequirements = requirements.filter((r) => {
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

  const reqTotal = Math.ceil(filteredRequirements.length / itemsPerPage);
  const paginatedRequirements = filteredRequirements.slice(
    (requirementsPage - 1) * itemsPerPage,
    requirementsPage * itemsPerPage
  );

  // ✅ NEW - Smart pagination (sirf limited pages + ellipsis dikhega jab pages zyada ho)
  const getReqPageNumbers = () => {
    const pages = [];
    const delta = 1;

    for (let i = 1; i <= reqTotal; i++) {
      if (
        i === 1 ||
        i === reqTotal ||
        (i >= requirementsPage - delta && i <= requirementsPage + delta)
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
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const toggleAllReqs = () => {
    const pageIds = paginatedRequirements.map((r) => r._id);
    const allSelected = pageIds.every((id) => selectedReqIds.includes(id));
    if (allSelected) setSelectedReqIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    else setSelectedReqIds((prev) => [...new Set([...prev, ...pageIds])]);
  };

  // EXCEL
  const handleReqsExcel = () => {
    const toDownload = selectedReqIds.length > 0
      ? filteredRequirements.filter((r) => selectedReqIds.includes(r._id))
      : filteredRequirements;
    const data = toDownload.map((r) => ({
      "Buyer Name":       r.buyerName || "",
      "Buyer Phone":      r.buyerPhone || "",
      "Buyer Email":      r.buyerEmail || "",
      "Product":          r.productName || "",
      "Category":         r.category?.name || "",
      "Subcategory":      r.subCategory?.name || "",
      "Quantity":         r.quantity || "",
      "Budget":           r.budget || "",
      "Location":         r.location || "",
      "Description":      r.description || "",
      "Status":           r.status || "",
      "Sellers Notified": r.matchedSellers?.length || 0,
      "Date":             r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Requirements");
    XLSX.writeFile(wb, "requirements.xlsx");
    setShowReqsDownload(false);
  };

  // PDF
  const handleReqsPDF = () => {
    const toDownload = selectedReqIds.length > 0
      ? filteredRequirements.filter((r) => selectedReqIds.includes(r._id))
      : filteredRequirements;
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(14);
    doc.text("Buy Requirements Report", 14, 15);
    autoTable(doc, {
      startY: 22,
      head: [["Buyer", "Phone", "Email", "Product", "Category", "Quantity", "Budget", "Location", "Status", "Date"]],
      body: toDownload.map((r) => [
        r.buyerName || "", r.buyerPhone || "", r.buyerEmail || "",
        r.productName || "", r.category?.name || "", r.quantity || "",
        r.budget || "", r.location || "", r.status || "",
        r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "",
      ]),
      styles: { fontSize: 7 },
      headStyles: { fillColor: [234, 88, 12] },
    });
    doc.save("requirements.pdf");
    setShowReqsDownload(false);
  };

  return (
    <>
      {/* SEARCH + DOWNLOAD + DELETE SELECTED */}
     <div className="flex items-center justify-end gap-2 flex-wrap mb-4">
  <div className="flex gap-2 items-center flex-wrap">
    {/* SEARCH */}
    <input
      type="text"
      value={reqSearch}
      onChange={(e) => { setReqSearch(e.target.value); setRequirementsPage(1); }}
      placeholder="Search buyer, product, category..."
      className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 w-48"
    />

    {/* DOWNLOAD */}
    <div className="relative">
      <button
        onClick={() => setShowReqsDownload((v) => !v)}
        className="px-4 py-2 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-1.5"
      >
        ↓ Download
        {selectedReqIds.length > 0 && (
          <span className="bg-orange-600 text-white rounded-full px-1.5 py-0.5 text-[10px]">
            {selectedReqIds.length}
          </span>
        )}
        <span className="text-white/40 text-[10px]">▾</span>
      </button>
      {showReqsDownload && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowReqsDownload(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 bg-[#111827] border border-white/10 rounded-xl overflow-hidden w-40 shadow-xl">
            <p className="text-white/30 text-[10px] px-3 pt-2 pb-1">
              {selectedReqIds.length > 0 ? `${selectedReqIds.length} selected` : "All filtered"}
            </p>
            <button onClick={handleReqsExcel} className="w-full text-left px-3 py-2 text-xs text-green-400 hover:bg-white/5 transition flex items-center gap-2">
              <span>📊</span> Excel (.xlsx)
            </button>
            <button onClick={handleReqsPDF} className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-white/5 transition flex items-center gap-2">
              <span>📄</span> PDF
            </button>
          </div>
        </>
      )}
    </div>

    {/* DELETE SELECTED */}
    {selectedReqIds.length > 0 && (
      <button
        onClick={handleDeleteMultipleReqs}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-xs font-semibold transition"
      >
        🗑 Delete Selected ({selectedReqIds.length})
      </button>
    )}
  </div>
</div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-orange-600 cursor-pointer"
                    checked={paginatedRequirements.length > 0 && paginatedRequirements.every((r) => selectedReqIds.includes(r._id))}
                    onChange={toggleAllReqs}
                  />
                </th>
                <th className="p-4">Buyer</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Sellers Notified</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requirementsLoading && (
                <tr>
                  <td colSpan={10} className="p-10 text-center text-white/40">
                    <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              )}

              {!requirementsLoading && filteredRequirements.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-10 text-center text-white/40">No requirements found</td>
                </tr>
              )}

              {!requirementsLoading && paginatedRequirements.map((req) => (
                <tr
                  key={req._id}
                  className={`border-t border-white/10 hover:bg-white/[0.03] transition ${selectedReqIds.includes(req._id) ? "bg-orange-900/10" : ""}`}
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
                    <p className="font-medium">{req.buyerName}</p>
                    <p className="text-xs text-white/30">{req.buyerEmail}</p>
                  </td>
                  <td className="p-4 text-white/60">
                    <a href={`tel:${req.buyerPhone}`} className="hover:text-green-400 transition">{req.buyerPhone}</a>
                  </td>
                  <td className="p-4 text-white/70 font-medium">{req.productName}</td>
                  <td className="p-4 text-white/60">
                    <p>{req.category?.name || "—"}</p>
                    {req.subCategory?.name && (
                      <p className="text-xs text-white/30">{req.subCategory.name}</p>
                    )}
                  </td>
                  <td className="p-4 text-white/60">{req.quantity || "—"}</td>
                  <td className="p-4 text-white/60">{req.budget || "—"}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                     {["diamond", "gold", "silver"].map((plan) => {
                        const count = req.matchedSellers?.filter((s) => s.plan === plan).length;
                        if (!count) return null;
                        return (
                          <span key={plan} className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize w-fit ${planStyle(plan)}`}>
                            {plan}: {count}
                          </span>
                        );
                      })}
                      {req.matchedSellers?.length === 0 && (
                        <span className="text-white/30 text-xs">No sellers</span>
                      )}
                    </div>
                  </td>

                  {/* DATE + TIME AGO */}
                  <td className="p-4 text-white/40 whitespace-nowrap">
                    <p>{new Date(req.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    <p className="text-white/30 text-[11px] mt-0.5">{timeAgo(req.createdAt)}</p>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedReq(req)}
                        className="bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteReq(req._id)}
                        className="bg-red-700 hover:bg-red-800 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {!requirementsLoading && reqTotal > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-white/40 text-sm">
              Showing {((requirementsPage - 1) * itemsPerPage) + 1}–{Math.min(requirementsPage * itemsPerPage, filteredRequirements.length)} of {filteredRequirements.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRequirementsPage((p) => Math.max(p - 1, 1))}
                disabled={requirementsPage === 1}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                ← Prev
              </button>
              {/* ✅ UPDATED - ab getReqPageNumbers() se limited pages + ellipsis render honge */}
              {getReqPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`dots-${idx}`} className="px-2 text-white/30 text-xs">
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setRequirementsPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition
                      ${requirementsPage === page ? "bg-orange-600 text-white" : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"}`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setRequirementsPage((p) => Math.min(p + 1, reqTotal))}
                disabled={requirementsPage === reqTotal}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* REQUIREMENT VIEW MODAL*/}
      {selectedReq && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
              <h2 className="text-lg font-semibold">Requirement Details</h2>
              <button onClick={() => setSelectedReq(null)} className="text-white/40 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <p className="text-white/40 text-xs mb-1">Product Required</p>
                <p className="font-bold text-lg">{selectedReq.productName}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-white/40 text-xs mb-1">Buyer</p><p className="font-medium">{selectedReq.buyerName}</p></div>
                <div><p className="text-white/40 text-xs mb-1">Phone</p><a href={`tel:${selectedReq.buyerPhone}`} className="font-medium text-green-400">{selectedReq.buyerPhone}</a></div>
                <div><p className="text-white/40 text-xs mb-1">Email</p><a href={`mailto:${selectedReq.buyerEmail}`} className="font-medium text-blue-400 text-xs">{selectedReq.buyerEmail || "—"}</a></div>
                <div><p className="text-white/40 text-xs mb-1">Category</p><p className="font-medium">{selectedReq.category?.name || "—"}</p></div>
                <div><p className="text-white/40 text-xs mb-1">Quantity</p><p className="font-medium">{selectedReq.quantity || "—"}</p></div>
                <div><p className="text-white/40 text-xs mb-1">Budget</p><p className="font-medium">{selectedReq.budget || "—"}</p></div>
                <div><p className="text-white/40 text-xs mb-1">Location</p><p className="font-medium">{selectedReq.location || "—"}</p></div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${selectedReq.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {selectedReq.status}
                  </span>
                </div>
              </div>
              {selectedReq.description && (
                <div>
                  <p className="text-white/40 text-xs mb-1">Description</p>
                  <p className="text-sm text-white/70 bg-white/5 rounded-xl p-3 leading-relaxed">{selectedReq.description}</p>
                </div>
              )}
              {selectedReq.matchedSellers?.length > 0 && (
                <div>
                  <p className="text-white/40 text-xs mb-2">Matched Sellers ({selectedReq.matchedSellers.length})</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedReq.matchedSellers.map((ms, i) => (
                      <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 text-xs">
                        <div>
                          <p className="font-medium">{ms.seller?.name || "—"}</p>
                          <p className="text-white/30">{ms.seller?.email}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full capitalize font-medium ${planStyle(ms.plan)}`}>
                          {ms.plan}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex justify-end flex-shrink-0">
              <button onClick={() => setSelectedReq(null)} className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}