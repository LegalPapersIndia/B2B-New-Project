
// // src/Pages/seller/SellerLeads.jsx

// import React, { useState, useEffect } from "react";
// import {
//   FaEye, FaPhoneAlt, FaBoxOpen, FaEnvelope,
//   FaClipboardList, FaInbox, FaTrash, FaCheckSquare,
// } from "react-icons/fa";
// import { getMyLeads, updateLeadStatus, deleteLead, deleteMultipleLeads } from "../../api/leadApi";
// import { getMyRequirements, deleteRequirement, deleteMultipleRequirements } from "../../api/requirementApi";
// import AlertPopup from "../../components/common/AlertPopup";

// const ITEMS_PER_PAGE = 10;

// const SellerLeads = () => {

//   // ─────────────────────────────────────────
//   // TAB STATE
//   // ─────────────────────────────────────────
//   const [activeTab, setActiveTab] = useState("leads");

//   // ─────────────────────────────────────────
//   // LEADS STATES
//   // ─────────────────────────────────────────
//   const [leads, setLeads]               = useState([]);
//   const [leadsLoading, setLeadsLoading] = useState(true);
//   const [leadsError, setLeadsError]     = useState("");
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [updatingId, setUpdatingId]     = useState(null);
//   const [leadPage, setLeadPage]         = useState(1);
//   const [selectedLeadIds, setSelectedLeadIds] = useState([]);

//   // ─────────────────────────────────────────
//   // REQUIREMENTS STATES
//   // ─────────────────────────────────────────
//   const [requirements, setRequirements]               = useState([]);
//   const [requirementsLoading, setRequirementsLoading] = useState(true);
//   const [requirementsError, setRequirementsError]     = useState("");
//   const [selectedReq, setSelectedReq]                 = useState(null);
//   const [reqPage, setReqPage]                         = useState(1);
//   const [selectedReqIds, setSelectedReqIds]           = useState([]);

//   // ─────────────────────────────────────────
//   // ALERT POPUP
//   // ─────────────────────────────────────────
//   const [alert, setAlert] = useState({
//     show: false, type: "error", message: "", mode: "info",
//     confirmAction: null,
//   });

//   const showConfirm = (message, onConfirm) => {
//     setAlert({ show: true, type: "warning", message, mode: "confirm", confirmAction: onConfirm });
//   };

//   const showInfo = (type, message) => {
//     setAlert({ show: true, type, message, mode: "info", confirmAction: null });
//   };

//   const closeAlert = () =>
//     setAlert({ show: false, type: "error", message: "", mode: "info", confirmAction: null });

//   const handleAlertConfirm = () => {
//     const action = alert.confirmAction;
//     closeAlert();
//     if (action) action();
//   };

//   // ─────────────────────────────────────────
//   // FETCH LEADS
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchLeads = async () => {
//       try {
//         setLeadsLoading(true);
//         const data = await getMyLeads();
//         if (data.success) setLeads(data.leads);
//         else setLeadsError(data.message || "Failed to fetch leads");
//       } catch (err) {
//         console.error(err);
//         setLeadsError("Server error.");
//       } finally {
//         setLeadsLoading(false);
//       }
//     };
//     fetchLeads();
//   }, []);

//   // ─────────────────────────────────────────
//   // FETCH REQUIREMENTS
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchRequirements = async () => {
//       try {
//         setRequirementsLoading(true);
//         const data = await getMyRequirements();
//         if (data.success) setRequirements(data.requirements);
//         else setRequirementsError(data.message || "Failed to fetch requirements");
//       } catch (err) {
//         console.error(err);
//         setRequirementsError("Server error.");
//       } finally {
//         setRequirementsLoading(false);
//       }
//     };
//     fetchRequirements();
//   }, []);

//   // ─────────────────────────────────────────
//   // UPDATE LEAD STATUS
//   // ─────────────────────────────────────────
//   const handleStatusChange = async (id, status) => {
//     try {
//       setUpdatingId(id);
//       const data = await updateLeadStatus(id, status);
//       if (data.success) {
//         setLeads((prev) => prev.map((l) => l._id === id ? { ...l, status } : l));
//         if (selectedLead?._id === id) setSelectedLead((prev) => ({ ...prev, status }));
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   // ─────────────────────────────────────────
//   // DELETE SINGLE LEAD
//   // ─────────────────────────────────────────
//   const handleDeleteLead = (id) => {
//     showConfirm("Are you sure you want to delete this lead? This action cannot be undone.", async () => {
//       try {
//         const data = await deleteLead(id);
//         if (data.success) {
//           setLeads((prev) => prev.filter((l) => l._id !== id));
//           setSelectedLeadIds((prev) => prev.filter((i) => i !== id));
//           const newTotal = leads.length - 1;
//           const newPages = Math.ceil(newTotal / ITEMS_PER_PAGE);
//           if (leadPage > newPages && newPages > 0) setLeadPage(newPages);
//         } else {
//           showInfo("error", data.message || "Delete failed");
//         }
//       } catch {
//         showInfo("error", "Server error. Please try again.");
//       }
//     });
//   };

//   // ─────────────────────────────────────────
//   // DELETE MULTIPLE LEADS
//   // ─────────────────────────────────────────
//   const handleDeleteMultipleLeads = () => {
//     if (!selectedLeadIds.length) return;
//     showConfirm(`Delete ${selectedLeadIds.length} selected lead(s)? This cannot be undone.`, async () => {
//       try {
//         const data = await deleteMultipleLeads(selectedLeadIds);
//         if (data.success) {
//           setLeads((prev) => prev.filter((l) => !selectedLeadIds.includes(l._id)));
//           setSelectedLeadIds([]);
//           setLeadPage(1);
//         } else {
//           showInfo("error", data.message || "Delete failed");
//         }
//       } catch {
//         showInfo("error", "Server error. Please try again.");
//       }
//     });
//   };

//   // ─────────────────────────────────────────
//   // DELETE SINGLE REQUIREMENT
//   // ─────────────────────────────────────────
//   const handleDeleteReq = (id) => {
//     showConfirm("Remove this requirement from your list? This cannot be undone.", async () => {
//       try {
//         const data = await deleteRequirement(id);
//         if (data.success) {
//           setRequirements((prev) => prev.filter((r) => r._id !== id));
//           setSelectedReqIds((prev) => prev.filter((i) => i !== id));
//           const newTotal = requirements.length - 1;
//           const newPages = Math.ceil(newTotal / ITEMS_PER_PAGE);
//           if (reqPage > newPages && newPages > 0) setReqPage(newPages);
//         } else {
//           showInfo("error", data.message || "Delete failed");
//         }
//       } catch {
//         showInfo("error", "Server error. Please try again.");
//       }
//     });
//   };

//   // ─────────────────────────────────────────
//   // DELETE MULTIPLE REQUIREMENTS
//   // ─────────────────────────────────────────
//   const handleDeleteMultipleReqs = () => {
//     if (!selectedReqIds.length) return;
//     showConfirm(`Remove ${selectedReqIds.length} selected requirement(s)?`, async () => {
//       try {
//         const data = await deleteMultipleRequirements(selectedReqIds);
//         if (data.success) {
//           setRequirements((prev) => prev.filter((r) => !selectedReqIds.includes(r._id)));
//           setSelectedReqIds([]);
//           setReqPage(1);
//         } else {
//           showInfo("error", data.message || "Delete failed");
//         }
//       } catch {
//         showInfo("error", "Server error. Please try again.");
//       }
//     });
//   };

//   // ─────────────────────────────────────────
//   // CHECKBOX HELPERS — LEADS
//   // ─────────────────────────────────────────
//   const toggleLeadCheckbox = (id) => {
//     setSelectedLeadIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   const toggleAllLeads = () => {
//     const pageIds = currentLeads.map((l) => l._id);
//     const allSelected = pageIds.every((id) => selectedLeadIds.includes(id));
//     if (allSelected) {
//       setSelectedLeadIds((prev) => prev.filter((id) => !pageIds.includes(id)));
//     } else {
//       setSelectedLeadIds((prev) => [...new Set([...prev, ...pageIds])]);
//     }
//   };

//   // ─────────────────────────────────────────
//   // CHECKBOX HELPERS — REQUIREMENTS
//   // ─────────────────────────────────────────
//   const toggleReqCheckbox = (id) => {
//     setSelectedReqIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   const toggleAllReqs = () => {
//     const pageIds = currentReqs.map((r) => r._id);
//     const allSelected = pageIds.every((id) => selectedReqIds.includes(id));
//     if (allSelected) {
//       setSelectedReqIds((prev) => prev.filter((id) => !pageIds.includes(id)));
//     } else {
//       setSelectedReqIds((prev) => [...new Set([...prev, ...pageIds])]);
//     }
//   };

//   // ─────────────────────────────────────────
//   // PAGINATION
//   // ─────────────────────────────────────────
//   const leadTotalPages = Math.ceil(leads.length / ITEMS_PER_PAGE);
//   const currentLeads   = leads.slice((leadPage - 1) * ITEMS_PER_PAGE, leadPage * ITEMS_PER_PAGE);

//   const reqTotalPages = Math.ceil(requirements.length / ITEMS_PER_PAGE);
//   const currentReqs   = requirements.slice((reqPage - 1) * ITEMS_PER_PAGE, reqPage * ITEMS_PER_PAGE);

//   const Pagination = ({ page, totalPages, setPage, total, label }) => {
//     if (totalPages <= 1) return null;
//     const start = (page - 1) * ITEMS_PER_PAGE + 1;
//     const end   = Math.min(page * ITEMS_PER_PAGE, total);
//     return (
//       <div className="px-6 py-4 border-t flex items-center justify-between text-sm">
//         <p className="text-gray-500">
//           Showing {start}–{end} of {total} {label}
//         </p>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setPage((p) => p - 1)}
//             disabled={page === 1}
//             className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-800 hover:text-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             ← Prev
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//             <button
//               key={p}
//               onClick={() => setPage(p)}
//               className={`w-9 h-9 rounded-xl border text-sm font-medium transition
//                 ${page === p
//                   ? "bg-blue-800 text-white border-blue-800"
//                   : "border-gray-200 text-gray-600 hover:border-blue-800 hover:text-blue-800"
//                 }`}
//             >
//               {p}
//             </button>
//           ))}
//           <button
//             onClick={() => setPage((p) => p + 1)}
//             disabled={page === totalPages}
//             className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-800 hover:text-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Next →
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // ─────────────────────────────────────────
//   // STATUS STYLE
//   // ─────────────────────────────────────────
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "new":       return "bg-blue-100 text-blue-700";
//       case "viewed":    return "bg-yellow-100 text-yellow-700";
//       case "contacted": return "bg-purple-100 text-purple-700";
//       case "converted": return "bg-green-100 text-green-700";
//       case "rejected":  return "bg-red-100 text-red-700";
//       default:          return "bg-gray-100 text-gray-700";
//     }
//   };

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* TABS */}
//       <div className="flex gap-3 mb-6">
//         <button
//           onClick={() => setActiveTab("leads")}
//           className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition
//             ${activeTab === "leads"
//               ? "bg-blue-800 text-white shadow-md"
//               : "bg-white text-gray-600 border border-gray-200 hover:border-blue-800 hover:text-blue-800"
//             }`}
//         >
//           <FaInbox />
//           Direct Leads
//           {leads.length > 0 && (
//             <span className={`px-2 py-0.5 rounded-full text-xs font-bold
//               ${activeTab === "leads" ? "bg-white text-blue-800" : "bg-blue-100 text-blue-700"}`}>
//               {leads.length}
//             </span>
//           )}
//         </button>

//         <button
//           onClick={() => setActiveTab("requirements")}
//           className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition
//             ${activeTab === "requirements"
//               ? "bg-orange-600 text-white shadow-md"
//               : "bg-white text-gray-600 border border-gray-200 hover:border-orange-600 hover:text-orange-600"
//             }`}
//         >
//           <FaClipboardList />
//           Buy Requirements
//           {requirements.length > 0 && (
//             <span className={`px-2 py-0.5 rounded-full text-xs font-bold
//               ${activeTab === "requirements" ? "bg-white text-orange-600" : "bg-orange-100 text-orange-700"}`}>
//               {requirements.length}
//             </span>
//           )}
//         </button>
//       </div>

//       {/* ═══════════════════════════════════════
//           TAB 1 — DIRECT LEADS
//       ═══════════════════════════════════════ */}
//       {activeTab === "leads" && (
//         <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

//           {/* HEADER */}
//           <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex items-center justify-between">
//             <h2 className="text-xl font-semibold">Direct Leads</h2>
//             <div className="flex items-center gap-3">
//               {selectedLeadIds.length > 0 && (
//                 <button
//                   onClick={handleDeleteMultipleLeads}
//                   className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
//                 >
//                   <FaTrash />
//                   Delete Selected ({selectedLeadIds.length})
//                 </button>
//               )}
//               <span className="text-blue-200 text-sm">{leads.length} leads</span>
//             </div>
//           </div>

//           {/* LOADING */}
//           {leadsLoading && (
//             <div className="flex items-center justify-center py-20">
//               <div className="w-10 h-10 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
//             </div>
//           )}

//           {/* ERROR */}
//           {!leadsLoading && leadsError && (
//             <div className="p-6 text-red-500 text-sm">{leadsError}</div>
//           )}

//           {/* EMPTY */}
//           {!leadsLoading && !leadsError && leads.length === 0 && (
//             <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//               <FaBoxOpen className="text-6xl mb-4 text-gray-300" />
//               <p className="text-lg font-medium">No direct leads yet</p>
//               <p className="text-sm mt-1">Leads will appear when buyers send inquiries on your products</p>
//             </div>
//           )}

//           {/* TABLE */}
//           {!leadsLoading && !leadsError && leads.length > 0 && (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left">
//                   <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
//                     <tr>
//                       {/* SELECT ALL */}
//                       <th className="p-4 w-10">
//                         <input
//                           type="checkbox"
//                           className="w-4 h-4 accent-blue-800 cursor-pointer"
//                           checked={currentLeads.length > 0 && currentLeads.every((l) => selectedLeadIds.includes(l._id))}
//                           onChange={toggleAllLeads}
//                         />
//                       </th>
//                       <th className="p-4">Buyer</th>
//                       <th className="p-4">Product</th>
//                       <th className="p-4">Quantity</th>
//                       <th className="p-4">Contact</th>
//                       <th className="p-4">Status</th>
//                       <th className="p-4">Date</th>
//                       <th className="p-4 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentLeads.map((lead) => (
//                       <tr
//                         key={lead._id}
//                         className={`border-b hover:bg-gray-50 transition ${selectedLeadIds.includes(lead._id) ? "bg-blue-50" : ""}`}
//                       >
//                         {/* CHECKBOX */}
//                         <td className="p-4">
//                           <input
//                             type="checkbox"
//                             className="w-4 h-4 accent-blue-800 cursor-pointer"
//                             checked={selectedLeadIds.includes(lead._id)}
//                             onChange={() => toggleLeadCheckbox(lead._id)}
//                           />
//                         </td>

//                         <td className="p-4">
//                           <p className="font-medium text-gray-800">{lead.buyerName}</p>
//                           <p className="text-xs text-gray-400">{lead.buyerEmail}</p>
//                         </td>

//                         <td className="p-4">
//                           <div className="flex items-center gap-2">
//                             {lead.productId?.images?.[0]?.url && (
//                               <img
//                                 src={lead.productId.images[0].url}
//                                 alt={lead.productName}
//                                 className="h-8 w-8 object-cover rounded-lg border"
//                               />
//                             )}
//                             <p className="text-gray-700 font-medium line-clamp-1">
//                               {lead.productName || lead.productId?.title || "—"}
//                             </p>
//                           </div>
//                         </td>

//                         <td className="p-4 text-gray-600">{lead.quantity || "—"}</td>

//                         <td className="p-4">
//                           <div className="flex flex-col gap-1">
//                             <a href={`tel:${lead.buyerPhone}`} className="flex items-center gap-1.5 text-green-600 hover:text-green-700 text-xs font-medium">
//                               <FaPhoneAlt className="text-xs" />
//                               {lead.buyerPhone}
//                             </a>
//                             {lead.buyerEmail && (
//                               <a href={`mailto:${lead.buyerEmail}`} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-xs">
//                                 <FaEnvelope className="text-xs" />
//                                 {lead.buyerEmail}
//                               </a>
//                             )}
//                           </div>
//                         </td>

//                         <td className="p-4">
//                           <select
//                             value={lead.status}
//                             onChange={(e) => handleStatusChange(lead._id, e.target.value)}
//                             disabled={updatingId === lead._id}
//                             className={`px-3 py-1 rounded-full text-xs font-semibold border-0 outline-none cursor-pointer capitalize ${getStatusStyle(lead.status)}`}
//                           >
//                             <option value="new">New</option>
//                             <option value="viewed">Viewed</option>
//                             <option value="contacted">Contacted</option>
//                             <option value="converted">Converted</option>
//                             <option value="rejected">Rejected</option>
//                           </select>
//                         </td>

//                         <td className="p-4 text-gray-500 text-xs">
//                           {new Date(lead.createdAt).toLocaleDateString("en-IN", {
//                             day: "numeric", month: "short", year: "numeric",
//                           })}
//                         </td>

//                         {/* ACTIONS */}
//                         <td className="p-4">
//                           <div className="flex justify-center gap-2">
//                             <button
//                               onClick={() => setSelectedLead(lead)}
//                               className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
//                               title="View"
//                             >
//                               <FaEye />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteLead(lead._id)}
//                               className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
//                               title="Delete"
//                             >
//                               <FaTrash />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* PAGINATION */}
//               <Pagination
//                 page={leadPage}
//                 totalPages={leadTotalPages}
//                 setPage={setLeadPage}
//                 total={leads.length}
//                 label="leads"
//               />
//             </>
//           )}
//         </div>
//       )}

//       {/* ═══════════════════════════════════════
//           TAB 2 — BUY REQUIREMENTS
//       ═══════════════════════════════════════ */}
//       {activeTab === "requirements" && (
//         <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

//           {/* HEADER */}
//           <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 flex items-center justify-between">
//             <div>
//               <h2 className="text-xl font-semibold">Buy Requirements</h2>
//               <p className="text-orange-100 text-xs mt-0.5">
//                 Buyers looking for products in your category
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               {selectedReqIds.length > 0 && (
//                 <button
//                   onClick={handleDeleteMultipleReqs}
//                   className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
//                 >
//                   <FaTrash />
//                   Delete Selected ({selectedReqIds.length})
//                 </button>
//               )}
//               <span className="text-orange-100 text-sm">{requirements.length} requirements</span>
//             </div>
//           </div>

//           {/* LOADING */}
//           {requirementsLoading && (
//             <div className="flex items-center justify-center py-20">
//               <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
//             </div>
//           )}

//           {/* ERROR */}
//           {!requirementsLoading && requirementsError && (
//             <div className="p-6 text-red-500 text-sm">{requirementsError}</div>
//           )}

//           {/* EMPTY */}
//           {!requirementsLoading && !requirementsError && requirements.length === 0 && (
//             <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//               <FaClipboardList className="text-6xl mb-4 text-gray-300" />
//               <p className="text-lg font-medium">No requirements yet</p>
//               <p className="text-sm mt-1">Requirements will appear when buyers post in your category</p>
//             </div>
//           )}

//           {/* TABLE */}
//           {!requirementsLoading && !requirementsError && requirements.length > 0 && (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left">
//                   <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
//                     <tr>
//                       <th className="p-4 w-10">
//                         <input
//                           type="checkbox"
//                           className="w-4 h-4 accent-orange-600 cursor-pointer"
//                           checked={currentReqs.length > 0 && currentReqs.every((r) => selectedReqIds.includes(r._id))}
//                           onChange={toggleAllReqs}
//                         />
//                       </th>
//                       <th className="p-4">Product Required</th>
//                       <th className="p-4">Category</th>
//                       <th className="p-4">Qty / Budget</th>
//                       <th className="p-4">Location</th>
//                       <th className="p-4">Buyer</th>
//                       <th className="p-4">Status</th>
//                       <th className="p-4">Date</th>
//                       <th className="p-4 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentReqs.map((req) => (
//                       <tr
//                         key={req._id}
//                         className={`border-b hover:bg-gray-50 transition ${selectedReqIds.includes(req._id) ? "bg-orange-50" : ""}`}
//                       >
//                         {/* CHECKBOX */}
//                         <td className="p-4">
//                           <input
//                             type="checkbox"
//                             className="w-4 h-4 accent-orange-600 cursor-pointer"
//                             checked={selectedReqIds.includes(req._id)}
//                             onChange={() => toggleReqCheckbox(req._id)}
//                           />
//                         </td>

//                         {/* PRODUCT NAME */}
//                         <td className="p-4">
//                           <p className="font-semibold text-gray-800">{req.productName}</p>
//                         </td>

//                         {/* CATEGORY */}
//                         <td className="p-4 text-gray-600">
//                           <p>{req.category?.name || "—"}</p>
//                           {req.subCategory?.name && (
//                             <p className="text-xs text-gray-400">{req.subCategory.name}</p>
//                           )}
//                         </td>

//                         {/* QTY / BUDGET */}
//                         <td className="p-4 text-gray-600">
//                           {req.quantity && <p className="text-xs"><span className="text-gray-400">Qty: </span>{req.quantity}</p>}
//                           {req.budget   && <p className="text-xs"><span className="text-gray-400">Budget: </span>{req.budget}</p>}
//                           {!req.quantity && !req.budget && "—"}
//                         </td>

//                         {/* LOCATION */}
//                         <td className="p-4 text-gray-600 text-xs">{req.location || "—"}</td>

//                         {/* BUYER */}
//                         <td className="p-4">
//                           <p className="font-medium text-gray-800 text-xs">{req.buyerName}</p>
//                           <a href={`tel:${req.buyerPhone}`} className="flex items-center gap-1 text-green-600 text-xs mt-0.5">
//                             <FaPhoneAlt className="text-xs" />
//                             {req.buyerPhone}
//                           </a>
//                         </td>

//                         {/* STATUS */}
//                         <td className="p-4">
//                           <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium capitalize">
//                             {req.status}
//                           </span>
//                         </td>

//                         {/* DATE */}
//                         <td className="p-4 text-gray-500 text-xs">
//                           {new Date(req.createdAt).toLocaleDateString("en-IN", {
//                             day: "numeric", month: "short", year: "numeric",
//                           })}
//                         </td>

//                         {/* ACTIONS */}
//                         <td className="p-4">
//                           <div className="flex justify-center gap-2">
//                             <button
//                               onClick={() => setSelectedReq(req)}
//                               className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
//                               title="View"
//                             >
//                               <FaEye />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteReq(req._id)}
//                               className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
//                               title="Delete"
//                             >
//                               <FaTrash />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* PAGINATION */}
//               <Pagination
//                 page={reqPage}
//                 totalPages={reqTotalPages}
//                 setPage={setReqPage}
//                 total={requirements.length}
//                 label="requirements"
//               />
//             </>
//           )}
//         </div>
//       )}

//       {/* ─────────────────────────────────────────
//           LEAD VIEW MODAL
//       ───────────────────────────────────────── */}
//       {selectedLead && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

//             <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Lead Details</h2>
//               <button onClick={() => setSelectedLead(null)} className="text-white hover:text-blue-200 text-xl font-bold">✕</button>
//             </div>

//             <div className="p-6 space-y-4">
//               {selectedLead.productId?.images?.[0]?.url && (
//                 <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
//                   <img src={selectedLead.productId.images[0].url} alt="" className="h-14 w-14 object-cover rounded-xl border" />
//                   <div>
//                     <p className="text-xs text-gray-400">Product</p>
//                     <p className="font-semibold">{selectedLead.productName || "—"}</p>
//                   </div>
//                 </div>
//               )}

//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Buyer</p>
//                   <p className="font-medium">{selectedLead.buyerName}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Phone</p>
//                   <a href={`tel:${selectedLead.buyerPhone}`} className="font-medium text-green-600">{selectedLead.buyerPhone}</a>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Email</p>
//                   <a href={`mailto:${selectedLead.buyerEmail}`} className="font-medium text-blue-600 text-xs">{selectedLead.buyerEmail || "—"}</a>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Quantity</p>
//                   <p className="font-medium">{selectedLead.quantity || "—"}</p>
//                 </div>
//               </div>

//               {selectedLead.message && (
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Message</p>
//                   <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{selectedLead.message}</p>
//                 </div>
//               )}

//               <div>
//                 <p className="text-gray-400 text-xs mb-2">Update Status</p>
//                 <div className="flex gap-2 flex-wrap">
//                   {["new", "viewed", "contacted", "converted", "rejected"].map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => handleStatusChange(selectedLead._id, s)}
//                       disabled={updatingId === selectedLead._id}
//                       className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition
//                         ${selectedLead.status === s ? getStatusStyle(s) : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t flex justify-end">
//               <button onClick={() => setSelectedLead(null)} className="px-5 py-2 border rounded-xl text-sm hover:border-blue-800 hover:text-blue-800 transition">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ─────────────────────────────────────────
//           REQUIREMENT VIEW MODAL
//       ───────────────────────────────────────── */}
//       {selectedReq && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

//             <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Requirement Details</h2>
//               <button onClick={() => setSelectedReq(null)} className="text-white hover:text-orange-200 text-xl font-bold">✕</button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div>
//                 <p className="text-gray-400 text-xs mb-1">Product Required</p>
//                 <p className="font-bold text-gray-800 text-lg">{selectedReq.productName}</p>
//               </div>

//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Category</p>
//                   <p className="font-medium">{selectedReq.category?.name || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Sub Category</p>
//                   <p className="font-medium">{selectedReq.subCategory?.name || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Quantity</p>
//                   <p className="font-medium">{selectedReq.quantity || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Budget</p>
//                   <p className="font-medium">{selectedReq.budget || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Location</p>
//                   <p className="font-medium">{selectedReq.location || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Date</p>
//                   <p className="font-medium text-xs">
//                     {new Date(selectedReq.createdAt).toLocaleDateString("en-IN", {
//                       day: "numeric", month: "long", year: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </div>

//               {selectedReq.description && (
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Description</p>
//                   <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 leading-relaxed">
//                     {selectedReq.description}
//                   </p>
//                 </div>
//               )}

//               <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
//                 <p className="text-xs text-orange-600 font-semibold mb-2">Buyer Contact</p>
//                 <p className="font-bold text-gray-800">{selectedReq.buyerName}</p>
//                 <a href={`tel:${selectedReq.buyerPhone}`} className="flex items-center gap-2 text-green-600 font-medium text-sm mt-1">
//                   <FaPhoneAlt className="text-xs" />
//                   {selectedReq.buyerPhone}
//                 </a>
//                 {selectedReq.buyerEmail && (
//                   <a href={`mailto:${selectedReq.buyerEmail}`} className="flex items-center gap-2 text-blue-600 text-xs mt-1">
//                     <FaEnvelope className="text-xs" />
//                     {selectedReq.buyerEmail}
//                   </a>
//                 )}
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t flex justify-end">
//               <button onClick={() => setSelectedReq(null)} className="px-5 py-2 border rounded-xl text-sm hover:border-orange-600 hover:text-orange-600 transition">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ─────────────────────────────────────────
//           ALERT POPUP
//       ───────────────────────────────────────── */}
//       {alert.show && (
//         <AlertPopup
//           type={alert.type}
//           message={alert.message}
//           onClose={alert.mode === "confirm" ? undefined : closeAlert}
//           autoClose={alert.mode !== "confirm"}
//         >
//           {alert.mode === "confirm" && (
//             <div className="px-7 pb-6 flex gap-3">
//               <button
//                 onClick={closeAlert}
//                 className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAlertConfirm}
//                 className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-red-500 hover:bg-red-600 text-white transition-all"
//               >
//                 Yes, Delete
//               </button>
//             </div>
//           )}
//         </AlertPopup>
//       )}

//     </div>
//   );
// };

// export default SellerLeads;




// src/Pages/seller/SellerLeads.jsx

import React, { useState, useEffect } from "react";
import { FaInbox, FaClipboardList, FaLayerGroup } from "react-icons/fa";
import { getMyLeads, updateLeadStatus, deleteLead, deleteMultipleLeads } from "../../api/leadApi";
import { getMyRequirements, deleteRequirement, deleteMultipleRequirements, updateRequirementStatus } from "../../api/requirementApi";
import AlertPopup from "../../components/common/AlertPopup";
import VerifyLeadsTable from "../../components/seller/VerifyLeadsTable";
import DirectLeadsTable from "../../components/seller/DirectLeadsTable";
import AllLeadsView from "../../components/seller/AllLeadsView";

const SellerLeads = () => {
  const [activeTab, setActiveTab] = useState("verify");

  // LEADS
  const [leads, setLeads]               = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsError, setLeadsError]     = useState("");
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [updatingId, setUpdatingId]     = useState(null);

  // REQUIREMENTS
  const [requirements, setRequirements]               = useState([]);
  const [requirementsLoading, setRequirementsLoading] = useState(true);
  const [requirementsError, setRequirementsError]     = useState("");
  const [selectedReqIds, setSelectedReqIds]           = useState([]);
  const [updatingReqId, setUpdatingReqId]             = useState(null);

  // ALERT
  const [alert, setAlert] = useState({ show: false, type: "error", message: "", mode: "info", confirmAction: null });

  const showConfirm = (message, onConfirm) =>
    setAlert({ show: true, type: "warning", message, mode: "confirm", confirmAction: onConfirm });

  const showInfo = (type, message) =>
    setAlert({ show: true, type, message, mode: "info", confirmAction: null });

  const closeAlert = () =>
    setAlert({ show: false, type: "error", message: "", mode: "info", confirmAction: null });

  const handleAlertConfirm = () => {
    const action = alert.confirmAction;
    closeAlert();
    if (action) action();
  };

  // FETCH LEADS
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLeadsLoading(true);
        const data = await getMyLeads();
        if (data.success) setLeads(data.leads);
        else setLeadsError(data.message || "Failed to fetch leads");
      } catch { setLeadsError("Server error."); }
      finally { setLeadsLoading(false); }
    };
    fetchLeads();
  }, []);

  // FETCH REQUIREMENTS
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        setRequirementsLoading(true);
        const data = await getMyRequirements();
        if (data.success) setRequirements(data.requirements);
        else setRequirementsError(data.message || "Failed to fetch requirements");
      } catch { setRequirementsError("Server error."); }
      finally { setRequirementsLoading(false); }
    };
    fetchRequirements();
  }, []);

  // STATUS — LEADS
  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      const data = await updateLeadStatus(id, status);
      if (data.success) setLeads((prev) => prev.map((l) => l._id === id ? { ...l, status } : l));
    } catch (err) { console.error(err); }
    finally { setUpdatingId(null); }
  };

  // STATUS — REQUIREMENTS
  const handleReqStatusChange = async (id, status) => {
    try {
      setUpdatingReqId(id);
      const data = await updateRequirementStatus(id, status);
      if (data.success) setRequirements((prev) => prev.map((r) => r._id === id ? { ...r, status } : r));
    } catch (err) { console.error(err); }
    finally { setUpdatingReqId(null); }
  };

  // DELETE SINGLE LEAD
  const handleDeleteLead = (id) => {
    showConfirm("Delete this lead? This cannot be undone.", async () => {
      try {
        const data = await deleteLead(id);
        if (data.success) {
          setLeads((prev) => prev.filter((l) => l._id !== id));
          setSelectedLeadIds((prev) => prev.filter((i) => i !== id));
        } else showInfo("error", data.message || "Delete failed");
      } catch { showInfo("error", "Server error."); }
    });
  };

  // DELETE MULTIPLE LEADS
  const handleDeleteMultipleLeads = () => {
    if (!selectedLeadIds.length) return;
    showConfirm(`Delete ${selectedLeadIds.length} lead(s)? This cannot be undone.`, async () => {
      try {
        const data = await deleteMultipleLeads(selectedLeadIds);
        if (data.success) { setLeads((prev) => prev.filter((l) => !selectedLeadIds.includes(l._id))); setSelectedLeadIds([]); }
        else showInfo("error", data.message || "Delete failed");
      } catch { showInfo("error", "Server error."); }
    });
  };

  // DELETE SINGLE REQ
  const handleDeleteReq = (id) => {
    showConfirm("Remove this verify lead? This cannot be undone.", async () => {
      try {
        const data = await deleteRequirement(id);
        if (data.success) {
          setRequirements((prev) => prev.filter((r) => r._id !== id));
          setSelectedReqIds((prev) => prev.filter((i) => i !== id));
        } else showInfo("error", data.message || "Delete failed");
      } catch { showInfo("error", "Server error."); }
    });
  };

  // DELETE MULTIPLE REQS
  const handleDeleteMultipleReqs = () => {
    if (!selectedReqIds.length) return;
    showConfirm(`Remove ${selectedReqIds.length} verify lead(s)?`, async () => {
      try {
        const data = await deleteMultipleRequirements(selectedReqIds);
        if (data.success) { setRequirements((prev) => prev.filter((r) => !selectedReqIds.includes(r._id))); setSelectedReqIds([]); }
        else showInfo("error", data.message || "Delete failed");
      } catch { showInfo("error", "Server error."); }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TABS */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button onClick={() => setActiveTab("verify")}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition
            ${activeTab === "verify" ? "bg-orange-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-orange-600 hover:text-orange-600"}`}>
          <FaClipboardList />
          Verify Leads
          {requirements.length > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === "verify" ? "bg-white text-orange-600" : "bg-orange-100 text-orange-700"}`}>
              {requirements.length}
            </span>
          )}
        </button>

        <button onClick={() => setActiveTab("leads")}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition
            ${activeTab === "leads" ? "bg-blue-800 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-800 hover:text-blue-800"}`}>
          <FaInbox />
          Direct Leads
          {leads.length > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === "leads" ? "bg-white text-blue-800" : "bg-blue-100 text-blue-700"}`}>
              {leads.length}
            </span>
          )}
        </button>

        <button onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition
            ${activeTab === "all" ? "bg-gray-800 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-800 hover:text-gray-800"}`}>
          <FaLayerGroup />
          All Leads
          {(leads.length + requirements.length) > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === "all" ? "bg-white text-gray-800" : "bg-gray-100 text-gray-700"}`}>
              {leads.length + requirements.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "verify" && (
        <VerifyLeadsTable
          requirements={requirements}
          requirementsLoading={requirementsLoading}
          requirementsError={requirementsError}
          selectedReqIds={selectedReqIds}
          setSelectedReqIds={setSelectedReqIds}
          handleDeleteReq={handleDeleteReq}
          handleDeleteMultipleReqs={handleDeleteMultipleReqs}
          handleReqStatusChange={handleReqStatusChange}
          updatingReqId={updatingReqId}
        />
      )}

      {activeTab === "leads" && (
        <DirectLeadsTable
          leads={leads}
          leadsLoading={leadsLoading}
          leadsError={leadsError}
          selectedLeadIds={selectedLeadIds}
          setSelectedLeadIds={setSelectedLeadIds}
          handleDeleteLead={handleDeleteLead}
          handleDeleteMultipleLeads={handleDeleteMultipleLeads}
          handleStatusChange={handleStatusChange}
          updatingId={updatingId}
        />
      )}

      {activeTab === "all" && (
        <AllLeadsView
          leads={leads}
          requirements={requirements}
          leadsLoading={leadsLoading}
          requirementsLoading={requirementsLoading}
          setActiveTab={setActiveTab}
          setSelectedLead={() => {}}
          setSelectedReq={() => {}}
        />
      )}

      {/* ALERT POPUP */}
      {alert.show && (
        <AlertPopup type={alert.type} message={alert.message}
          onClose={alert.mode === "confirm" ? undefined : closeAlert}
          autoClose={alert.mode !== "confirm"}>
          {alert.mode === "confirm" && (
            <div className="px-7 pb-6 flex gap-3">
              <button onClick={closeAlert}
                className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all">
                Cancel
              </button>
              <button onClick={handleAlertConfirm}
                className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-red-500 hover:bg-red-600 text-white transition-all">
                Yes, Delete
              </button>
            </div>
          )}
        </AlertPopup>
      )}
    </div>
  );
};

export default SellerLeads;