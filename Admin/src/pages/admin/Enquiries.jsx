


// // pages/admin/Enquiries.jsx

// import { useEffect, useState } from "react";
// import { getAllLeads, deleteLeadAdmin, deleteMultipleLeadsAdmin } from "../../api/leadApi";
// import { getAllRequirements, deleteRequirementAdmin, deleteMultipleRequirementsAdmin } from "../../api/requirementApi";

// export default function Enquiries() {

//   // ─────────────────────────────────────────
//   // TAB STATE
//   // ─────────────────────────────────────────
//   const [activeTab, setActiveTab] = useState("leads");

//   // ─────────────────────────────────────────
//   // LEADS STATES
//   // ─────────────────────────────────────────
//   const [filter, setFilter]             = useState("all");
//   const [leads, setLeads]               = useState([]);
//   const [leadsLoading, setLeadsLoading] = useState(true);
//   const [leadsError, setLeadsError]     = useState("");
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [selectedLeadIds, setSelectedLeadIds] = useState([]);

//   // LEADS pagination
//   const [leadsPage, setLeadsPage]             = useState(1);
//   // REQUIREMENTS pagination  
//   const [requirementsPage, setRequirementsPage] = useState(1);
//   const itemsPerPage = 10;

//   // ─────────────────────────────────────────
//   // REQUIREMENTS STATES
//   // ─────────────────────────────────────────
//   const [requirements, setRequirements]               = useState([]);
//   const [requirementsLoading, setRequirementsLoading] = useState(true);
//   const [requirementsError, setRequirementsError]     = useState("");
//   const [selectedReq, setSelectedReq]                 = useState(null);
//   const [selectedReqIds, setSelectedReqIds]           = useState([]);

//   // ─────────────────────────────────────────
//   // CONFIRM DIALOG (simple window.confirm — AlertPopup baad mein)
//   // ─────────────────────────────────────────
//   const confirmDelete = (message, onConfirm) => {
//     if (window.confirm(message)) onConfirm();
//   };

//   // ─────────────────────────────────────────
//   // FETCH LEADS
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchLeads = async () => {
//       try {
//         setLeadsLoading(true);
//         const data = await getAllLeads();
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
//         const data = await getAllRequirements();
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
//   // DELETE SINGLE LEAD
//   // ─────────────────────────────────────────
//   const handleDeleteLead = (id) => {
//     confirmDelete("Delete this lead? This cannot be undone.", async () => {
//       try {
//         const data = await deleteLeadAdmin(id);
//         if (data.success) {
//           setLeads((prev) => prev.filter((l) => l._id !== id));
//           setSelectedLeadIds((prev) => prev.filter((i) => i !== id));
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     });
//   };

//   // ─────────────────────────────────────────
//   // DELETE MULTIPLE LEADS
//   // ─────────────────────────────────────────
//   const handleDeleteMultipleLeads = () => {
//     if (!selectedLeadIds.length) return;
//     confirmDelete(`Delete ${selectedLeadIds.length} selected lead(s)? This cannot be undone.`, async () => {
//       try {
//         const data = await deleteMultipleLeadsAdmin(selectedLeadIds);
//         if (data.success) {
//           setLeads((prev) => prev.filter((l) => !selectedLeadIds.includes(l._id)));
//           setSelectedLeadIds([]);
//           setLeadsPage(1);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     });
//   };

//   // ─────────────────────────────────────────
//   // DELETE SINGLE REQUIREMENT
//   // ─────────────────────────────────────────
//   const handleDeleteReq = (id) => {
//     confirmDelete("Delete this requirement? This cannot be undone.", async () => {
//       try {
//         const data = await deleteRequirementAdmin(id);
//         if (data.success) {
//           setRequirements((prev) => prev.filter((r) => r._id !== id));
//           setSelectedReqIds((prev) => prev.filter((i) => i !== id));
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     });
//   };

//   // ─────────────────────────────────────────
//   // DELETE MULTIPLE REQUIREMENTS
//   // ─────────────────────────────────────────
//   const handleDeleteMultipleReqs = () => {
//     if (!selectedReqIds.length) return;
//     confirmDelete(`Delete ${selectedReqIds.length} selected requirement(s)? This cannot be undone.`, async () => {
//       try {
//         const data = await deleteMultipleRequirementsAdmin(selectedReqIds);
//         if (data.success) {
//           setRequirements((prev) => prev.filter((r) => !selectedReqIds.includes(r._id)));
//           setSelectedReqIds([]);
//           setRequirementsPage(1);
//         }
//       } catch (err) {
//         console.error(err);
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
//     const pageIds = paginatedLeads.map((l) => l._id);
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
//     const pageIds = paginatedRequirements.map((r) => r._id);
//     const allSelected = pageIds.every((id) => selectedReqIds.includes(id));
//     if (allSelected) {
//       setSelectedReqIds((prev) => prev.filter((id) => !pageIds.includes(id)));
//     } else {
//       setSelectedReqIds((prev) => [...new Set([...prev, ...pageIds])]);
//     }
//   };

//   // ─────────────────────────────────────────
//   // FILTER LEADS
//   // ─────────────────────────────────────────
//   const filteredLeads = filter === "all"
//     ? leads
//     : leads.filter((l) => l.status === filter);

//   // LEADS
//   const leadsTotal = Math.ceil(filteredLeads.length / itemsPerPage);
//   const paginatedLeads = filteredLeads.slice(
//     (leadsPage - 1) * itemsPerPage,
//     leadsPage * itemsPerPage
//   );

//   // REQUIREMENTS
//   const reqTotal = Math.ceil(requirements.length / itemsPerPage);
//   const paginatedRequirements = requirements.slice(
//     (requirementsPage - 1) * itemsPerPage,
//     requirementsPage * itemsPerPage
//   );

//   // ─────────────────────────────────────────
//   // STATUS STYLE
//   // ─────────────────────────────────────────
//   const statusStyle = (status) => {
//     switch (status) {
//       case "new":       return "bg-blue-500/20 text-blue-400";
//       case "viewed":    return "bg-yellow-500/20 text-yellow-400";
//       case "contacted": return "bg-purple-500/20 text-purple-400";
//       case "converted": return "bg-green-500/20 text-green-400";
//       case "rejected":  return "bg-red-500/20 text-red-400";
//       default:          return "bg-gray-500/20 text-gray-400";
//     }
//   };

//   // ─────────────────────────────────────────
//   // PLAN STYLE
//   // ─────────────────────────────────────────
//   const planStyle = (plan) => {
//     switch (plan) {
//       case "gold":    return "bg-yellow-500/20 text-yellow-400";
//       case "premium": return "bg-purple-500/20 text-purple-400";
//       case "basic":   return "bg-blue-500/20 text-blue-400";
//       default:        return "bg-gray-500/20 text-gray-400";
//     }
//   };

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">Enquiries Management</h1>
//         <p className="text-sm text-white/40 mt-1">
//           Manage all leads and buyer requirements
//         </p>
//       </div>

//       {/* TABS */}
//       <div className="flex gap-3 mb-6">
//         <button
//           onClick={() => setActiveTab("leads")}
//           className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition
//             ${activeTab === "leads"
//               ? "bg-blue-800 text-white"
//               : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
//             }`}
//         >
//           Direct Leads
//           {leads.length > 0 && (
//             <span className={`px-2 py-0.5 rounded-full text-xs font-bold
//               ${activeTab === "leads" ? "bg-white text-blue-800" : "bg-white/10 text-white/60"}`}>
//               {leads.length}
//             </span>
//           )}
//         </button>

//         <button
//           onClick={() => setActiveTab("requirements")}
//           className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition
//             ${activeTab === "requirements"
//               ? "bg-orange-600 text-white"
//               : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
//             }`}
//         >
//           Buy Requirements
//           {requirements.length > 0 && (
//             <span className={`px-2 py-0.5 rounded-full text-xs font-bold
//               ${activeTab === "requirements" ? "bg-white text-orange-600" : "bg-white/10 text-white/60"}`}>
//               {requirements.length}
//             </span>
//           )}
//         </button>
//       </div>

//       {/* ═══════════════════════════════════════
//           TAB 1 — DIRECT LEADS
//       ═══════════════════════════════════════ */}
//       {activeTab === "leads" && (
//         <>
//           {/* FILTERS + DELETE SELECTED */}
//           <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
//             <div className="flex gap-2 flex-wrap">
//               {["all", "new", "viewed", "contacted", "converted", "rejected"].map((f) => (
//                 <button
//                   key={f}
//                   onClick={() => { setFilter(f); setLeadsPage(1); }}
//                   className={`px-4 py-2 rounded-lg text-xs border transition capitalize
//                     ${filter === f
//                       ? "bg-blue-800 border-blue-700 text-white"
//                       : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
//                     }`}
//                 >
//                   {f}
//                 </button>
//               ))}
//             </div>
//             {selectedLeadIds.length > 0 && (
//               <button
//                 onClick={handleDeleteMultipleLeads}
//                 className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-xs font-semibold transition"
//               >
//                 🗑 Delete Selected ({selectedLeadIds.length})
//               </button>
//             )}
//           </div>

//           <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-[1100px] w-full text-sm text-left">

//                 <thead className="bg-white/5 text-white/50 border-b border-white/10">
//                   <tr>
//                     <th className="p-4 w-10">
//                       <input
//                         type="checkbox"
//                         className="w-4 h-4 accent-blue-600 cursor-pointer"
//                         checked={paginatedLeads.length > 0 && paginatedLeads.every((l) => selectedLeadIds.includes(l._id))}
//                         onChange={toggleAllLeads}
//                       />
//                     </th>
//                     <th className="p-4">Buyer</th>
//                     <th className="p-4">Phone</th>
//                     <th className="p-4">Email</th>
//                     <th className="p-4">Product</th>
//                     <th className="p-4">Quantity</th>
//                     <th className="p-4">Seller</th>
//                     <th className="p-4">Message</th>
//                     <th className="p-4">Date</th>
//                     <th className="p-4">Status</th>
//                     <th className="p-4">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {leadsLoading && (
//                     <tr>
//                       <td colSpan={11} className="p-10 text-center text-white/40">
//                         <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
//                         Loading...
//                       </td>
//                     </tr>
//                   )}

//                   {!leadsLoading && filteredLeads.length === 0 && (
//                     <tr>
//                       <td colSpan={11} className="p-10 text-center text-white/40">
//                         No leads found
//                       </td>
//                     </tr>
//                   )}

//                   {!leadsLoading && paginatedLeads.map((lead) => (
//                     <tr
//                       key={lead._id}
//                       className={`border-t border-white/10 hover:bg-white/[0.03] transition ${selectedLeadIds.includes(lead._id) ? "bg-blue-900/10" : ""}`}
//                     >
//                       <td className="p-4">
//                         <input
//                           type="checkbox"
//                           className="w-4 h-4 accent-blue-600 cursor-pointer"
//                           checked={selectedLeadIds.includes(lead._id)}
//                           onChange={() => toggleLeadCheckbox(lead._id)}
//                         />
//                       </td>

//                       <td className="p-4 font-medium">{lead.buyerName}</td>

//                       <td className="p-4 text-white/60">
//                         <a href={`tel:${lead.buyerPhone}`} className="hover:text-green-400 transition">
//                           {lead.buyerPhone}
//                         </a>
//                       </td>

//                       <td className="p-4 text-white/60">
//                         <a href={`mailto:${lead.buyerEmail}`} className="hover:text-blue-400 transition text-xs">
//                           {lead.buyerEmail || "—"}
//                         </a>
//                       </td>

//                       <td className="p-4">
//                         <div className="flex items-center gap-2">
//                           {lead.productId?.images?.[0]?.url && (
//                             <img src={lead.productId.images[0].url} alt="" className="h-8 w-8 object-cover rounded-lg border border-white/10" />
//                           )}
//                           <p className="text-white/70 line-clamp-1">
//                             {lead.productName || lead.productId?.title || "—"}
//                           </p>
//                         </div>
//                       </td>

//                       <td className="p-4 text-white/60">{lead.quantity || "—"}</td>

//                       <td className="p-4 text-white/60">
//                         <p>{lead.sellerId?.name || "—"}</p>
//                         <p className="text-xs text-white/30">{lead.sellerId?.email}</p>
//                       </td>

//                       <td className="p-4 text-white/50 max-w-[200px]">
//                         <p className="line-clamp-2">{lead.message || "—"}</p>
//                       </td>

//                       <td className="p-4 text-white/40 whitespace-nowrap">
//                         {new Date(lead.createdAt).toLocaleDateString("en-IN", {
//                           day: "numeric", month: "short", year: "numeric"
//                         })}
//                       </td>

//                       <td className="p-4">
//                         <span className={`px-3 py-1 rounded-full text-[11px] font-medium capitalize ${statusStyle(lead.status)}`}>
//                           {lead.status}
//                         </span>
//                       </td>

//                       <td className="p-4">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => setSelectedLead(lead)}
//                             className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
//                           >
//                             View
//                           </button>
//                           <button
//                             onClick={() => handleDeleteLead(lead._id)}
//                             className="bg-red-700 hover:bg-red-800 px-3 py-1.5 rounded-lg text-xs transition"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* LEADS PAGINATION */}
//             {!leadsLoading && leadsTotal > 1 && (
//               <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
//                 <p className="text-white/40 text-sm">
//                   Showing {((leadsPage - 1) * itemsPerPage) + 1}–{Math.min(leadsPage * itemsPerPage, filteredLeads.length)} of {filteredLeads.length}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setLeadsPage(prev => Math.max(prev - 1, 1))}
//                     disabled={leadsPage === 1}
//                     className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
//                   >
//                     ← Prev
//                   </button>
//                   {Array.from({ length: leadsTotal }, (_, i) => i + 1).map(page => (
//                     <button
//                       key={page}
//                       onClick={() => setLeadsPage(page)}
//                       className={`w-8 h-8 rounded-lg text-xs font-medium transition
//                         ${leadsPage === page
//                           ? "bg-blue-600 text-white"
//                           : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
//                         }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => setLeadsPage(prev => Math.min(prev + 1, leadsTotal))}
//                     disabled={leadsPage === leadsTotal}
//                     className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
//                   >
//                     Next →
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* ═══════════════════════════════════════
//           TAB 2 — BUY REQUIREMENTS
//       ═══════════════════════════════════════ */}
//       {activeTab === "requirements" && (
//         <>
//           {/* DELETE SELECTED */}
//           {selectedReqIds.length > 0 && (
//             <div className="flex justify-end mb-4">
//               <button
//                 onClick={handleDeleteMultipleReqs}
//                 className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-xs font-semibold transition"
//               >
//                 🗑 Delete Selected ({selectedReqIds.length})
//               </button>
//             </div>
//           )}

//           <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-[1000px] w-full text-sm text-left">

//                 <thead className="bg-white/5 text-white/50 border-b border-white/10">
//                   <tr>
//                     <th className="p-4 w-10">
//                       <input
//                         type="checkbox"
//                         className="w-4 h-4 accent-orange-600 cursor-pointer"
//                         checked={paginatedRequirements.length > 0 && paginatedRequirements.every((r) => selectedReqIds.includes(r._id))}
//                         onChange={toggleAllReqs}
//                       />
//                     </th>
//                     <th className="p-4">Buyer</th>
//                     <th className="p-4">Phone</th>
//                     <th className="p-4">Product</th>
//                     <th className="p-4">Category</th>
//                     <th className="p-4">Quantity</th>
//                     <th className="p-4">Budget</th>
//                     <th className="p-4">Sellers Notified</th>
//                     <th className="p-4">Date</th>
//                     <th className="p-4">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {requirementsLoading && (
//                     <tr>
//                       <td colSpan={10} className="p-10 text-center text-white/40">
//                         <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
//                         Loading...
//                       </td>
//                     </tr>
//                   )}

//                   {!requirementsLoading && requirements.length === 0 && (
//                     <tr>
//                       <td colSpan={10} className="p-10 text-center text-white/40">
//                         No requirements found
//                       </td>
//                     </tr>
//                   )}

//                   {!requirementsLoading && paginatedRequirements.map((req) => (
//                     <tr
//                       key={req._id}
//                       className={`border-t border-white/10 hover:bg-white/[0.03] transition ${selectedReqIds.includes(req._id) ? "bg-orange-900/10" : ""}`}
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
//                         <p className="font-medium">{req.buyerName}</p>
//                         <p className="text-xs text-white/30">{req.buyerEmail}</p>
//                       </td>

//                       <td className="p-4 text-white/60">
//                         <a href={`tel:${req.buyerPhone}`} className="hover:text-green-400 transition">
//                           {req.buyerPhone}
//                         </a>
//                       </td>

//                       <td className="p-4 text-white/70 font-medium">
//                         {req.productName}
//                       </td>

//                       <td className="p-4 text-white/60">
//                         <p>{req.category?.name || "—"}</p>
//                         {req.subCategory?.name && (
//                           <p className="text-xs text-white/30">{req.subCategory.name}</p>
//                         )}
//                       </td>

//                       <td className="p-4 text-white/60">{req.quantity || "—"}</td>

//                       <td className="p-4 text-white/60">{req.budget || "—"}</td>

//                       {/* SELLERS NOTIFIED */}
//                       <td className="p-4">
//                         <div className="flex flex-col gap-1">
//                           {["gold", "premium", "basic"].map((plan) => {
//                             const count = req.matchedSellers?.filter(
//                               (s) => s.plan === plan
//                             ).length;
//                             if (!count) return null;
//                             return (
//                               <span
//                                 key={plan}
//                                 className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize w-fit ${planStyle(plan)}`}
//                               >
//                                 {plan}: {count}
//                               </span>
//                             );
//                           })}
//                           {req.matchedSellers?.length === 0 && (
//                             <span className="text-white/30 text-xs">No sellers</span>
//                           )}
//                         </div>
//                       </td>

//                       <td className="p-4 text-white/40 whitespace-nowrap">
//                         {new Date(req.createdAt).toLocaleDateString("en-IN", {
//                           day: "numeric", month: "short", year: "numeric"
//                         })}
//                       </td>

//                       <td className="p-4">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => setSelectedReq(req)}
//                             className="bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg text-xs transition"
//                           >
//                             View
//                           </button>
//                           <button
//                             onClick={() => handleDeleteReq(req._id)}
//                             className="bg-red-700 hover:bg-red-800 px-3 py-1.5 rounded-lg text-xs transition"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* REQUIREMENTS PAGINATION */}
//             {!requirementsLoading && reqTotal > 1 && (
//               <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
//                 <p className="text-white/40 text-sm">
//                   Showing {((requirementsPage - 1) * itemsPerPage) + 1}–{Math.min(requirementsPage * itemsPerPage, requirements.length)} of {requirements.length}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setRequirementsPage(prev => Math.max(prev - 1, 1))}
//                     disabled={requirementsPage === 1}
//                     className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
//                   >
//                     ← Prev
//                   </button>
//                   {Array.from({ length: reqTotal }, (_, i) => i + 1).map(page => (
//                     <button
//                       key={page}
//                       onClick={() => setRequirementsPage(page)}
//                       className={`w-8 h-8 rounded-lg text-xs font-medium transition
//                         ${requirementsPage === page
//                           ? "bg-orange-600 text-white"
//                           : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
//                         }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => setRequirementsPage(prev => Math.min(prev + 1, reqTotal))}
//                     disabled={requirementsPage === reqTotal}
//                     className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
//                   >
//                     Next →
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* ─────────────────────────────────────────
//           LEAD VIEW MODAL
//       ───────────────────────────────────────── */}
//       {selectedLead && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden">

//             <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Lead Details</h2>
//               <button onClick={() => setSelectedLead(null)} className="text-white/40 hover:text-white text-xl">✕</button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
//                 {selectedLead.productId?.images?.[0]?.url && (
//                   <img src={selectedLead.productId.images[0].url} alt="" className="h-14 w-14 object-cover rounded-xl border border-white/10" />
//                 )}
//                 <div>
//                   <p className="text-xs text-white/40">Product</p>
//                   <p className="font-semibold">{selectedLead.productName || "—"}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Buyer</p>
//                   <p className="font-medium">{selectedLead.buyerName}</p>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Phone</p>
//                   <a href={`tel:${selectedLead.buyerPhone}`} className="font-medium text-green-400">{selectedLead.buyerPhone}</a>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Email</p>
//                   <a href={`mailto:${selectedLead.buyerEmail}`} className="font-medium text-blue-400 text-xs">{selectedLead.buyerEmail || "—"}</a>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Quantity</p>
//                   <p className="font-medium">{selectedLead.quantity || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Seller</p>
//                   <p className="font-medium">{selectedLead.sellerId?.name || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Status</p>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusStyle(selectedLead.status)}`}>
//                     {selectedLead.status}
//                   </span>
//                 </div>
//               </div>

//               {selectedLead.message && (
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Message</p>
//                   <p className="text-sm text-white/70 bg-white/5 rounded-xl p-3">{selectedLead.message}</p>
//                 </div>
//               )}
//             </div>

//             <div className="px-6 py-4 border-t border-white/10 flex justify-between items-center">
//               <p className="text-xs text-white/30">
//                 {new Date(selectedLead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
//               </p>
//               <button onClick={() => setSelectedLead(null)} className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition">Close</button>
//             </div>

//           </div>
//         </div>
//       )}

//       {/* ─────────────────────────────────────────
//           REQUIREMENT VIEW MODAL
//       ───────────────────────────────────────── */}
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
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Buyer</p>
//                   <p className="font-medium">{selectedReq.buyerName}</p>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Phone</p>
//                   <a href={`tel:${selectedReq.buyerPhone}`} className="font-medium text-green-400">{selectedReq.buyerPhone}</a>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Email</p>
//                   <a href={`mailto:${selectedReq.buyerEmail}`} className="font-medium text-blue-400 text-xs">{selectedReq.buyerEmail || "—"}</a>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Category</p>
//                   <p className="font-medium">{selectedReq.category?.name || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Quantity</p>
//                   <p className="font-medium">{selectedReq.quantity || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Budget</p>
//                   <p className="font-medium">{selectedReq.budget || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Location</p>
//                   <p className="font-medium">{selectedReq.location || "—"}</p>
//                 </div>
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

//               {/* MATCHED SELLERS */}
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

//     </div>
//   );
// }






// pages/admin/Enquiries.jsx

import { useEffect, useState } from "react";
import { getAllLeads, deleteLeadAdmin, deleteMultipleLeadsAdmin } from "../../api/leadApi";
import { getAllRequirements, deleteRequirementAdmin, deleteMultipleRequirementsAdmin } from "../../api/requirementApi";
import ConfirmModal from "../../components/common/ConfirmModal";
// ── DOWNLOAD IMPORTS ADDED ──
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Enquiries() {

  // ─────────────────────────────────────────
  // TAB STATE
  // ─────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("leads");

  // ─────────────────────────────────────────
  // LEADS STATES
  // ─────────────────────────────────────────
  const [filter, setFilter]             = useState("all");
  const [leads, setLeads]               = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsError, setLeadsError]     = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);

  // LEADS pagination
  const [leadsPage, setLeadsPage]             = useState(1);
  // REQUIREMENTS pagination
  const [requirementsPage, setRequirementsPage] = useState(1);
  const itemsPerPage = 10;

  // ── SEARCH STATES ADDED ──
  const [leadsSearch, setLeadsSearch] = useState("");
  const [reqSearch, setReqSearch]     = useState("");

  // ── CONFIRM MODAL STATE ADDED ──
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: "", message: "", onConfirm: null });

  // ── DOWNLOAD DROPDOWN STATES ADDED ──
  const [showLeadsDownload, setShowLeadsDownload]   = useState(false);
  const [showReqsDownload, setShowReqsDownload]     = useState(false);

  // ─────────────────────────────────────────
  // REQUIREMENTS STATES
  // ─────────────────────────────────────────
  const [requirements, setRequirements]               = useState([]);
  const [requirementsLoading, setRequirementsLoading] = useState(true);
  const [requirementsError, setRequirementsError]     = useState("");
  const [selectedReq, setSelectedReq]                 = useState(null);
  const [selectedReqIds, setSelectedReqIds]           = useState([]);

  // ── CONFIRM HELPER ADDED ──
  const openConfirm = (title, message, onConfirm) => {
    setConfirmModal({ isOpen: true, title, message, onConfirm });
  };
  const closeConfirm = () => {
    setConfirmModal({ isOpen: false, title: "", message: "", onConfirm: null });
  };

  // ─────────────────────────────────────────
  // FETCH LEADS
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLeadsLoading(true);
        const data = await getAllLeads();
        if (data.success) setLeads(data.leads);
        else setLeadsError(data.message || "Failed to fetch leads");
      } catch (err) {
        console.error(err);
        setLeadsError("Server error.");
      } finally {
        setLeadsLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // ─────────────────────────────────────────
  // FETCH REQUIREMENTS
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        setRequirementsLoading(true);
        const data = await getAllRequirements();
        if (data.success) setRequirements(data.requirements);
        else setRequirementsError(data.message || "Failed to fetch requirements");
      } catch (err) {
        console.error(err);
        setRequirementsError("Server error.");
      } finally {
        setRequirementsLoading(false);
      }
    };
    fetchRequirements();
  }, []);

  // ─────────────────────────────────────────
  // DELETE SINGLE LEAD
  // ─────────────────────────────────────────
  const handleDeleteLead = (id) => {
    openConfirm("Delete Lead", "Delete this lead? This cannot be undone.", async () => {
      try {
        const data = await deleteLeadAdmin(id);
        if (data.success) {
          setLeads((prev) => prev.filter((l) => l._id !== id));
          setSelectedLeadIds((prev) => prev.filter((i) => i !== id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        closeConfirm();
      }
    });
  };

  // ─────────────────────────────────────────
  // DELETE MULTIPLE LEADS
  // ─────────────────────────────────────────
  const handleDeleteMultipleLeads = () => {
    if (!selectedLeadIds.length) return;
    openConfirm(
      "Delete Selected Leads",
      `Delete ${selectedLeadIds.length} selected lead(s)? This cannot be undone.`,
      async () => {
        try {
          const data = await deleteMultipleLeadsAdmin(selectedLeadIds);
          if (data.success) {
            setLeads((prev) => prev.filter((l) => !selectedLeadIds.includes(l._id)));
            setSelectedLeadIds([]);
            setLeadsPage(1);
          }
        } catch (err) {
          console.error(err);
        } finally {
          closeConfirm();
        }
      }
    );
  };

  // ─────────────────────────────────────────
  // DELETE SINGLE REQUIREMENT
  // ─────────────────────────────────────────
  const handleDeleteReq = (id) => {
    openConfirm("Delete Requirement", "Delete this requirement? This cannot be undone.", async () => {
      try {
        const data = await deleteRequirementAdmin(id);
        if (data.success) {
          setRequirements((prev) => prev.filter((r) => r._id !== id));
          setSelectedReqIds((prev) => prev.filter((i) => i !== id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        closeConfirm();
      }
    });
  };

  // ─────────────────────────────────────────
  // DELETE MULTIPLE REQUIREMENTS
  // ─────────────────────────────────────────
  const handleDeleteMultipleReqs = () => {
    if (!selectedReqIds.length) return;
    openConfirm(
      "Delete Selected Requirements",
      `Delete ${selectedReqIds.length} selected requirement(s)? This cannot be undone.`,
      async () => {
        try {
          const data = await deleteMultipleRequirementsAdmin(selectedReqIds);
          if (data.success) {
            setRequirements((prev) => prev.filter((r) => !selectedReqIds.includes(r._id)));
            setSelectedReqIds([]);
            setRequirementsPage(1);
          }
        } catch (err) {
          console.error(err);
        } finally {
          closeConfirm();
        }
      }
    );
  };

  // ─────────────────────────────────────────
  // CHECKBOX HELPERS — LEADS
  // ─────────────────────────────────────────
  const toggleLeadCheckbox = (id) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAllLeads = () => {
    const pageIds = paginatedLeads.map((l) => l._id);
    const allSelected = pageIds.every((id) => selectedLeadIds.includes(id));
    if (allSelected) {
      setSelectedLeadIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedLeadIds((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  // ─────────────────────────────────────────
  // CHECKBOX HELPERS — REQUIREMENTS
  // ─────────────────────────────────────────
  const toggleReqCheckbox = (id) => {
    setSelectedReqIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAllReqs = () => {
    const pageIds = paginatedRequirements.map((r) => r._id);
    const allSelected = pageIds.every((id) => selectedReqIds.includes(id));
    if (allSelected) {
      setSelectedReqIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedReqIds((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  // ─────────────────────────────────────────
  // FILTER LEADS
  // ─────────────────────────────────────────
  const filteredLeads = (
    filter === "all" ? leads : leads.filter((l) => l.status === filter)
  )
  // ── SEARCH FILTER ADDED ──
  .filter((l) => {
    if (!leadsSearch.trim()) return true;
    const q = leadsSearch.toLowerCase();
    return (
      l.buyerName?.toLowerCase().includes(q) ||
      l.buyerEmail?.toLowerCase().includes(q) ||
      l.buyerPhone?.toLowerCase().includes(q) ||
      l.productName?.toLowerCase().includes(q) ||
      l.sellerId?.name?.toLowerCase().includes(q)
    );
  });

  // ── REQUIREMENTS SEARCH FILTER ADDED ──
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

  // LEADS pagination
  const leadsTotal = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (leadsPage - 1) * itemsPerPage,
    leadsPage * itemsPerPage
  );

  // REQUIREMENTS pagination
  const reqTotal = Math.ceil(filteredRequirements.length / itemsPerPage);
  const paginatedRequirements = filteredRequirements.slice(
    (requirementsPage - 1) * itemsPerPage,
    requirementsPage * itemsPerPage
  );

  // ── LEADS EXCEL DOWNLOAD ADDED ──
  const handleLeadsExcel = () => {
    const toDownload = selectedLeadIds.length > 0
      ? filteredLeads.filter((l) => selectedLeadIds.includes(l._id))
      : filteredLeads;
    const data = toDownload.map((l) => ({
      "Buyer Name":    l.buyerName || "",
      "Buyer Phone":   l.buyerPhone || "",
      "Buyer Email":   l.buyerEmail || "",
      "Product":       l.productName || l.productId?.title || "",
      "Quantity":      l.quantity || "",
      "Seller Name":   l.sellerId?.name || "",
      "Seller Email":  l.sellerId?.email || "",
      "Message":       l.message || "",
      "Status":        l.status || "",
      "Date":          l.createdAt ? new Date(l.createdAt).toLocaleDateString("en-IN") : "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "leads.xlsx");
    setShowLeadsDownload(false);
  };

  // ── LEADS PDF DOWNLOAD ADDED ──
  const handleLeadsPDF = () => {
    const toDownload = selectedLeadIds.length > 0
      ? filteredLeads.filter((l) => selectedLeadIds.includes(l._id))
      : filteredLeads;
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(14);
    doc.text("Leads Report", 14, 15);
    autoTable(doc, {
      startY: 22,
      head: [["Buyer", "Phone", "Email", "Product", "Quantity", "Seller", "Status", "Date"]],
      body: toDownload.map((l) => [
        l.buyerName || "",
        l.buyerPhone || "",
        l.buyerEmail || "",
        l.productName || l.productId?.title || "",
        l.quantity || "",
        l.sellerId?.name || "",
        l.status || "",
        l.createdAt ? new Date(l.createdAt).toLocaleDateString("en-IN") : "",
      ]),
      styles: { fontSize: 7 },
      headStyles: { fillColor: [30, 64, 175] },
    });
    doc.save("leads.pdf");
    setShowLeadsDownload(false);
  };

  // ── REQUIREMENTS EXCEL DOWNLOAD ADDED ──
  const handleReqsExcel = () => {
    const toDownload = selectedReqIds.length > 0
      ? filteredRequirements.filter((r) => selectedReqIds.includes(r._id))
      : filteredRequirements;
    const data = toDownload.map((r) => ({
      "Buyer Name":    r.buyerName || "",
      "Buyer Phone":   r.buyerPhone || "",
      "Buyer Email":   r.buyerEmail || "",
      "Product":       r.productName || "",
      "Category":      r.category?.name || "",
      "Subcategory":   r.subCategory?.name || "",
      "Quantity":      r.quantity || "",
      "Budget":        r.budget || "",
      "Location":      r.location || "",
      "Description":   r.description || "",
      "Status":        r.status || "",
      "Sellers Notified": r.matchedSellers?.length || 0,
      "Date":          r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Requirements");
    XLSX.writeFile(wb, "requirements.xlsx");
    setShowReqsDownload(false);
  };

  // ── REQUIREMENTS PDF DOWNLOAD ADDED ──
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
        r.buyerName || "",
        r.buyerPhone || "",
        r.buyerEmail || "",
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
    doc.save("requirements.pdf");
    setShowReqsDownload(false);
  };

  // ─────────────────────────────────────────
  // STATUS STYLE
  // ─────────────────────────────────────────
  const statusStyle = (status) => {
    switch (status) {
      case "new":       return "bg-blue-500/20 text-blue-400";
      case "viewed":    return "bg-yellow-500/20 text-yellow-400";
      case "contacted": return "bg-purple-500/20 text-purple-400";
      case "converted": return "bg-green-500/20 text-green-400";
      case "rejected":  return "bg-red-500/20 text-red-400";
      default:          return "bg-gray-500/20 text-gray-400";
    }
  };

  // ─────────────────────────────────────────
  // PLAN STYLE
  // ─────────────────────────────────────────
  const planStyle = (plan) => {
    switch (plan) {
      case "gold":    return "bg-yellow-500/20 text-yellow-400";
      case "premium": return "bg-purple-500/20 text-purple-400";
      case "basic":   return "bg-blue-500/20 text-blue-400";
      default:        return "bg-gray-500/20 text-gray-400";
    }
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Enquiries Management</h1>
        <p className="text-sm text-white/40 mt-1">
          Manage all leads and buyer requirements
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("leads")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition
            ${activeTab === "leads"
              ? "bg-blue-800 text-white"
              : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
            }`}
        >
          Direct Leads
          {leads.length > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold
              ${activeTab === "leads" ? "bg-white text-blue-800" : "bg-white/10 text-white/60"}`}>
              {leads.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("requirements")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition
            ${activeTab === "requirements"
              ? "bg-orange-600 text-white"
              : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
            }`}
        >
          Buy Requirements
          {requirements.length > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold
              ${activeTab === "requirements" ? "bg-white text-orange-600" : "bg-white/10 text-white/60"}`}>
              {requirements.length}
            </span>
          )}
        </button>
      </div>

      {/* ═══════════════════════════════════════
          TAB 1 — DIRECT LEADS
      ═══════════════════════════════════════ */}
      {activeTab === "leads" && (
        <>
          {/* FILTERS + SEARCH + DOWNLOAD + DELETE SELECTED */}
          <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
            <div className="flex gap-2 flex-wrap items-center">
              {["all", "new", "viewed", "contacted", "converted", "rejected"].map((f) => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setLeadsPage(1); }}
                  className={`px-4 py-2 rounded-lg text-xs border transition capitalize
                    ${filter === f
                      ? "bg-blue-800 border-blue-700 text-white"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex gap-2 items-center flex-wrap">
              {/* ── SEARCH ADDED ── */}
              <input
                type="text"
                value={leadsSearch}
                onChange={(e) => { setLeadsSearch(e.target.value); setLeadsPage(1); }}
                placeholder="Search buyer, product, seller..."
                className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 w-48"
              />

              {/* ── DOWNLOAD DROPDOWN ADDED ── */}
              <div className="relative">
                <button
                  onClick={() => setShowLeadsDownload((v) => !v)}
                  className="px-4 py-2 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-1.5"
                >
                  ↓ Download
                  {selectedLeadIds.length > 0 && (
                    <span className="bg-blue-600 text-white rounded-full px-1.5 py-0.5 text-[10px]">
                      {selectedLeadIds.length}
                    </span>
                  )}
                  <span className="text-white/40 text-[10px]">▾</span>
                </button>
                {showLeadsDownload && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowLeadsDownload(false)} />
                    <div className="absolute right-0 top-full mt-1 z-20 bg-[#111827] border border-white/10 rounded-xl overflow-hidden w-40 shadow-xl">
                      <p className="text-white/30 text-[10px] px-3 pt-2 pb-1">
                        {selectedLeadIds.length > 0 ? `${selectedLeadIds.length} selected` : "All filtered"}
                      </p>
                      <button onClick={handleLeadsExcel} className="w-full text-left px-3 py-2 text-xs text-green-400 hover:bg-white/5 transition flex items-center gap-2">
                        <span>📊</span> Excel (.xlsx)
                      </button>
                      <button onClick={handleLeadsPDF} className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-white/5 transition flex items-center gap-2">
                        <span>📄</span> PDF
                      </button>
                    </div>
                  </>
                )}
              </div>

              {selectedLeadIds.length > 0 && (
                <button
                  onClick={handleDeleteMultipleLeads}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-xs font-semibold transition"
                >
                  🗑 Delete Selected ({selectedLeadIds.length})
                </button>
              )}
            </div>
          </div>

          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[1100px] w-full text-sm text-left">

                <thead className="bg-white/5 text-white/50 border-b border-white/10">
                  <tr>
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-600 cursor-pointer"
                        checked={paginatedLeads.length > 0 && paginatedLeads.every((l) => selectedLeadIds.includes(l._id))}
                        onChange={toggleAllLeads}
                      />
                    </th>
                    <th className="p-4">Buyer</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Seller</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {leadsLoading && (
                    <tr>
                      <td colSpan={11} className="p-10 text-center text-white/40">
                        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        Loading...
                      </td>
                    </tr>
                  )}

                  {!leadsLoading && filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={11} className="p-10 text-center text-white/40">
                        No leads found
                      </td>
                    </tr>
                  )}

                  {!leadsLoading && paginatedLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className={`border-t border-white/10 hover:bg-white/[0.03] transition ${selectedLeadIds.includes(lead._id) ? "bg-blue-900/10" : ""}`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-blue-600 cursor-pointer"
                          checked={selectedLeadIds.includes(lead._id)}
                          onChange={() => toggleLeadCheckbox(lead._id)}
                        />
                      </td>

                      <td className="p-4 font-medium">{lead.buyerName}</td>

                      <td className="p-4 text-white/60">
                        <a href={`tel:${lead.buyerPhone}`} className="hover:text-green-400 transition">
                          {lead.buyerPhone}
                        </a>
                      </td>

                      <td className="p-4 text-white/60">
                        <a href={`mailto:${lead.buyerEmail}`} className="hover:text-blue-400 transition text-xs">
                          {lead.buyerEmail || "—"}
                        </a>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {lead.productId?.images?.[0]?.url && (
                            <img src={lead.productId.images[0].url} alt="" className="h-8 w-8 object-cover rounded-lg border border-white/10" />
                          )}
                          <p className="text-white/70 line-clamp-1">
                            {lead.productName || lead.productId?.title || "—"}
                          </p>
                        </div>
                      </td>

                      <td className="p-4 text-white/60">{lead.quantity || "—"}</td>

                      <td className="p-4 text-white/60">
                        <p>{lead.sellerId?.name || "—"}</p>
                        <p className="text-xs text-white/30">{lead.sellerId?.email}</p>
                      </td>

                      <td className="p-4 text-white/50 max-w-[200px]">
                        <p className="line-clamp-2">{lead.message || "—"}</p>
                      </td>

                      <td className="p-4 text-white/40 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </td>

                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-medium capitalize ${statusStyle(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                          >
                            View
                          </button>
                          {/* ── DELETE — ConfirmModal ADDED ── */}
                          <button
                            onClick={() => handleDeleteLead(lead._id)}
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

            {/* LEADS PAGINATION */}
            {!leadsLoading && leadsTotal > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                <p className="text-white/40 text-sm">
                  Showing {((leadsPage - 1) * itemsPerPage) + 1}–{Math.min(leadsPage * itemsPerPage, filteredLeads.length)} of {filteredLeads.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLeadsPage(prev => Math.max(prev - 1, 1))}
                    disabled={leadsPage === 1}
                    className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    ← Prev
                  </button>
                  {Array.from({ length: leadsTotal }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setLeadsPage(page)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition
                        ${leadsPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setLeadsPage(prev => Math.min(prev + 1, leadsTotal))}
                    disabled={leadsPage === leadsTotal}
                    className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════
          TAB 2 — BUY REQUIREMENTS
      ═══════════════════════════════════════ */}
      {activeTab === "requirements" && (
        <>
          {/* SEARCH + DOWNLOAD + DELETE SELECTED */}
          <div className="flex justify-between items-center gap-2 flex-wrap mb-4">
            <div className="flex gap-2 items-center flex-wrap">
              {/* ── SEARCH ADDED ── */}
              <input
                type="text"
                value={reqSearch}
                onChange={(e) => { setReqSearch(e.target.value); setRequirementsPage(1); }}
                placeholder="Search buyer, product, category..."
                className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 w-48"
              />

              {/* ── DOWNLOAD DROPDOWN ADDED ── */}
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
            </div>

            {selectedReqIds.length > 0 && (
              <button
                onClick={handleDeleteMultipleReqs}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-xs font-semibold transition"
              >
                🗑 Delete Selected ({selectedReqIds.length})
              </button>
            )}
          </div>

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
                      <td colSpan={10} className="p-10 text-center text-white/40">
                        No requirements found
                      </td>
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
                        <a href={`tel:${req.buyerPhone}`} className="hover:text-green-400 transition">
                          {req.buyerPhone}
                        </a>
                      </td>

                      <td className="p-4 text-white/70 font-medium">
                        {req.productName}
                      </td>

                      <td className="p-4 text-white/60">
                        <p>{req.category?.name || "—"}</p>
                        {req.subCategory?.name && (
                          <p className="text-xs text-white/30">{req.subCategory.name}</p>
                        )}
                      </td>

                      <td className="p-4 text-white/60">{req.quantity || "—"}</td>

                      <td className="p-4 text-white/60">{req.budget || "—"}</td>

                      {/* SELLERS NOTIFIED */}
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          {["gold", "premium", "basic"].map((plan) => {
                            const count = req.matchedSellers?.filter(
                              (s) => s.plan === plan
                            ).length;
                            if (!count) return null;
                            return (
                              <span
                                key={plan}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize w-fit ${planStyle(plan)}`}
                              >
                                {plan}: {count}
                              </span>
                            );
                          })}
                          {req.matchedSellers?.length === 0 && (
                            <span className="text-white/30 text-xs">No sellers</span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-white/40 whitespace-nowrap">
                        {new Date(req.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedReq(req)}
                            className="bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg text-xs transition"
                          >
                            View
                          </button>
                          {/* ── DELETE — ConfirmModal ADDED ── */}
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

            {/* REQUIREMENTS PAGINATION */}
            {!requirementsLoading && reqTotal > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                <p className="text-white/40 text-sm">
                  Showing {((requirementsPage - 1) * itemsPerPage) + 1}–{Math.min(requirementsPage * itemsPerPage, filteredRequirements.length)} of {filteredRequirements.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRequirementsPage(prev => Math.max(prev - 1, 1))}
                    disabled={requirementsPage === 1}
                    className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    ← Prev
                  </button>
                  {Array.from({ length: reqTotal }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setRequirementsPage(page)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition
                        ${requirementsPage === page
                          ? "bg-orange-600 text-white"
                          : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setRequirementsPage(prev => Math.min(prev + 1, reqTotal))}
                    disabled={requirementsPage === reqTotal}
                    className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── CONFIRM MODAL ADDED ── */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={closeConfirm}
      />

      {/* ─────────────────────────────────────────
          LEAD VIEW MODAL
      ───────────────────────────────────────── */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden">

            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Lead Details</h2>
              <button onClick={() => setSelectedLead(null)} className="text-white/40 hover:text-white text-xl">✕</button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                {selectedLead.productId?.images?.[0]?.url && (
                  <img src={selectedLead.productId.images[0].url} alt="" className="h-14 w-14 object-cover rounded-xl border border-white/10" />
                )}
                <div>
                  <p className="text-xs text-white/40">Product</p>
                  <p className="font-semibold">{selectedLead.productName || "—"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-white/40 text-xs mb-1">Buyer</p>
                  <p className="font-medium">{selectedLead.buyerName}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Phone</p>
                  <a href={`tel:${selectedLead.buyerPhone}`} className="font-medium text-green-400">{selectedLead.buyerPhone}</a>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Email</p>
                  <a href={`mailto:${selectedLead.buyerEmail}`} className="font-medium text-blue-400 text-xs">{selectedLead.buyerEmail || "—"}</a>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Quantity</p>
                  <p className="font-medium">{selectedLead.quantity || "—"}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Seller</p>
                  <p className="font-medium">{selectedLead.sellerId?.name || "—"}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusStyle(selectedLead.status)}`}>
                    {selectedLead.status}
                  </span>
                </div>
              </div>

              {selectedLead.message && (
                <div>
                  <p className="text-white/40 text-xs mb-1">Message</p>
                  <p className="text-sm text-white/70 bg-white/5 rounded-xl p-3">{selectedLead.message}</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-white/10 flex justify-between items-center">
              <p className="text-xs text-white/30">
                {new Date(selectedLead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <button onClick={() => setSelectedLead(null)} className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition">Close</button>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────
          REQUIREMENT VIEW MODAL
      ───────────────────────────────────────── */}
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
                <div>
                  <p className="text-white/40 text-xs mb-1">Buyer</p>
                  <p className="font-medium">{selectedReq.buyerName}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Phone</p>
                  <a href={`tel:${selectedReq.buyerPhone}`} className="font-medium text-green-400">{selectedReq.buyerPhone}</a>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Email</p>
                  <a href={`mailto:${selectedReq.buyerEmail}`} className="font-medium text-blue-400 text-xs">{selectedReq.buyerEmail || "—"}</a>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Category</p>
                  <p className="font-medium">{selectedReq.category?.name || "—"}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Quantity</p>
                  <p className="font-medium">{selectedReq.quantity || "—"}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Budget</p>
                  <p className="font-medium">{selectedReq.budget || "—"}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Location</p>
                  <p className="font-medium">{selectedReq.location || "—"}</p>
                </div>
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

              {/* MATCHED SELLERS */}
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

    </div>
  );
}
