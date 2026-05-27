// // import { useEffect, useState } from "react";

// // export default function Enquiries() {
// //   const [filter, setFilter] = useState("all");
// //   const [enquiries, setEnquiries] = useState([]);

// //   // ─── DUMMY DATA ───
// //   useEffect(() => {
// //     setEnquiries([
// //       {
// //         id: 1,
// //         buyer: "Amit Industries",
// //         company: "Amit Steel Pvt Ltd",
// //         phone: "+91 9876543210",
// //         email: "amit@gmail.com",
// //         product: "Industrial Steel Rod",
// //         quantity: "500 Units",
// //         message: "Need urgent delivery for Delhi location.",
// //         date: "18 May 2026",
// //         status: "pending",
// //       },

// //       {
// //         id: 2,
// //         buyer: "Global Traders",
// //         company: "Global Trade Corp",
// //         phone: "+91 9123456780",
// //         email: "global@gmail.com",
// //         product: "PVC Pipes",
// //         quantity: "200 Units",
// //         message: "Please send latest quotation.",
// //         date: "17 May 2026",
// //         status: "replied",
// //       },

// //       {
// //         id: 3,
// //         buyer: "Sharma Export",
// //         company: "Sharma Chemicals",
// //         phone: "+91 9988776655",
// //         email: "sharma@gmail.com",
// //         product: "Chemical Powder",
// //         quantity: "1000 KG",
// //         message: "Looking for long-term supplier.",
// //         date: "16 May 2026",
// //         status: "pending",
// //       },

// //       {
// //         id: 4,
// //         buyer: "Royal Enterprises",
// //         company: "Royal Industries",
// //         phone: "+91 9090909090",
// //         email: "royal@gmail.com",
// //         product: "Copper Wire",
// //         quantity: "300 Units",
// //         message: "Requirement completed successfully.",
// //         date: "15 May 2026",
// //         status: "closed",
// //       },
// //     ]);
// //   }, []);

// //   // ─── FILTER ───
// //   const filteredEnquiries =
// //     filter === "all"
// //       ? enquiries
// //       : enquiries.filter((e) => e.status === filter);

// //   // ─── ACTIONS ───

// //   // Reply = Admin/Seller contacted buyer
// //   const handleReply = (id) => {
// //     setEnquiries((prev) =>
// //       prev.map((e) =>
// //         e.id === id
// //           ? { ...e, status: "replied" }
// //           : e
// //       )
// //     );
// //   };

// //   // Close = Deal completed / enquiry finished
// //   const handleClose = (id) => {
// //     setEnquiries((prev) =>
// //       prev.map((e) =>
// //         e.id === id
// //           ? { ...e, status: "closed" }
// //           : e
// //       )
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

// //       {/* ───────────────── HEADER ───────────────── */}
// //       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

// //         <div>
// //           <h1 className="text-2xl font-bold">
// //             Enquiries Management
// //           </h1>

// //           <p className="text-sm text-white/40 mt-1">
// //             Manage buyer enquiries and responses
// //           </p>
// //         </div>

// //         {/* FILTERS */}
// //         <div className="flex gap-2 flex-wrap">

// //           {["all", "pending", "replied", "closed"].map((f) => (
// //             <button
// //               key={f}
// //               onClick={() => setFilter(f)}
// //               className={`px-4 py-2 rounded-lg text-xs border transition-all
// //               ${
// //                 filter === f
// //                   ? "bg-blue-800 border-blue-700 text-white"
// //                   : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
// //               }`}
// //             >
// //               {f.toUpperCase()}
// //             </button>
// //           ))}

// //         </div>

// //       </div>

// //       {/* ───────────────── TABLE CARD ───────────────── */}
// //       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">

// //         <div className="overflow-x-auto">

// //           <table className="min-w-[1300px] w-full text-sm text-left">

// //             {/* TABLE HEAD */}
// //             <thead className="bg-white/5 text-white/50 border-b border-white/10">
// //               <tr>
// //                 <th className="p-4">Buyer</th>
// //                 <th className="p-4">Company</th>
// //                 <th className="p-4">Phone</th>
// //                 <th className="p-4">Email</th>
// //                 <th className="p-4">Product</th>
// //                 <th className="p-4">Quantity</th>
// //                 <th className="p-4">Message</th>
// //                 <th className="p-4">Date</th>
// //                 <th className="p-4">Status</th>
// //                 <th className="p-4">Actions</th>
// //               </tr>
// //             </thead>

// //             {/* TABLE BODY */}
// //             <tbody>

// //               {filteredEnquiries.map((e) => (
// //                 <tr
// //                   key={e.id}
// //                   className="border-t border-white/10 hover:bg-white/[0.03] transition"
// //                 >

// //                   {/* BUYER */}
// //                   <td className="p-4 font-medium text-white">
// //                     {e.buyer}
// //                   </td>

// //                   {/* COMPANY */}
// //                   <td className="p-4 text-white/60">
// //                     {e.company}
// //                   </td>

// //                   {/* PHONE */}
// //                   <td className="p-4 text-white/60">
// //                     {e.phone}
// //                   </td>

// //                   {/* EMAIL */}
// //                   <td className="p-4 text-white/60">
// //                     {e.email}
// //                   </td>

// //                   {/* PRODUCT */}
// //                   <td className="p-4 text-white/70">
// //                     {e.product}
// //                   </td>

// //                   {/* QUANTITY */}
// //                   <td className="p-4 text-white/60">
// //                     {e.quantity}
// //                   </td>

// //                   {/* MESSAGE */}
// //                   <td className="p-4 text-white/50 max-w-[250px]">
// //                     {e.message}
// //                   </td>

// //                   {/* DATE */}
// //                   <td className="p-4 text-white/40 whitespace-nowrap">
// //                     {e.date}
// //                   </td>

// //                   {/* STATUS */}
// //                   <td className="p-4">

// //                     <span
// //                       className={`px-3 py-1 rounded-full text-[11px] font-medium
// //                       ${
// //                         e.status === "pending"
// //                           ? "bg-yellow-500/20 text-yellow-400"
// //                           : e.status === "replied"
// //                           ? "bg-green-500/20 text-green-400"
// //                           : "bg-red-500/20 text-red-400"
// //                       }`}
// //                     >
// //                       {e.status}
// //                     </span>

// //                   </td>

// //                   {/* ACTIONS */}
// //                   <td className="p-4">

// //                     <div className="flex gap-2 flex-wrap">

// //                       {/* PENDING */}
// //                       {e.status === "pending" && (
// //                         <>
// //                           <button
// //                             onClick={() => handleReply(e.id)}
// //                             className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
// //                           >
// //                             Reply
// //                           </button>

// //                           <button
// //                             onClick={() => handleClose(e.id)}
// //                             className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
// //                           >
// //                             Close
// //                           </button>
// //                         </>
// //                       )}

// //                       {/* REPLIED */}
// //                       {e.status === "replied" && (
// //                         <button
// //                           onClick={() => handleClose(e.id)}
// //                           className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
// //                         >
// //                           Close
// //                         </button>
// //                       )}

// //                       {/* CLOSED */}
// //                       {e.status === "closed" && (
// //                         <span className="text-white/30 text-xs">
// //                           No actions available
// //                         </span>
// //                       )}

// //                     </div>

// //                   </td>

// //                 </tr>
// //               ))}

// //             </tbody>

// //           </table>

// //         </div>

// //       </div>

// //     </div>
// //   );
// // }




// // pages/admin/Enquiries.jsx

// import { useEffect, useState } from "react";
// import { getAllLeads } from "../../api/leadApi";

// export default function Enquiries() {
//   const [filter, setFilter]       = useState("all");
//   const [leads, setLeads]         = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [error, setError]         = useState("");
//   const [selectedLead, setSelectedLead] = useState(null);

//   // ─────────────────────────────────────────
//   // FETCH LEADS
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchLeads = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllLeads();
//         if (data.success) {
//           setLeads(data.leads);
//         } else {
//           setError(data.message || "Failed to fetch leads");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Server error. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeads();
//   }, []);

//   // ─────────────────────────────────────────
//   // FILTER
//   // ─────────────────────────────────────────
//   const filteredLeads = filter === "all"
//     ? leads
//     : leads.filter((l) => l.status === filter);

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
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

//       {/* HEADER */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Enquiries Management</h1>
//           <p className="text-sm text-white/40 mt-1">
//             {leads.length} total enquiries
//           </p>
//         </div>

//         {/* FILTERS */}
//         <div className="flex gap-2 flex-wrap">
//           {["all", "new", "viewed", "contacted", "converted", "rejected"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               className={`px-4 py-2 rounded-lg text-xs border transition capitalize
//                 ${filter === f
//                   ? "bg-blue-800 border-blue-700 text-white"
//                   : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
//                 }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ERROR */}
//       {error && (
//         <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
//           {error}
//         </div>
//       )}

//       {/* TABLE */}
//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-[1100px] w-full text-sm text-left">

//             <thead className="bg-white/5 text-white/50 border-b border-white/10">
//               <tr>
//                 <th className="p-4">Buyer</th>
//                 <th className="p-4">Phone</th>
//                 <th className="p-4">Email</th>
//                 <th className="p-4">Product</th>
//                 <th className="p-4">Quantity</th>
//                 <th className="p-4">Seller</th>
//                 <th className="p-4">Message</th>
//                 <th className="p-4">Date</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>

//             <tbody>

//               {/* LOADING */}
//               {loading && (
//                 <tr>
//                   <td colSpan={10} className="p-10 text-center text-white/40">
//                     <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
//                     Loading...
//                   </td>
//                 </tr>
//               )}

//               {/* EMPTY */}
//               {!loading && filteredLeads.length === 0 && (
//                 <tr>
//                   <td colSpan={10} className="p-10 text-center text-white/40">
//                     No enquiries found
//                   </td>
//                 </tr>
//               )}

//               {/* ROWS */}
//               {!loading && filteredLeads.map((lead) => (
//                 <tr
//                   key={lead._id}
//                   className="border-t border-white/10 hover:bg-white/[0.03] transition"
//                 >

//                   {/* BUYER */}
//                   <td className="p-4 font-medium text-white">
//                     {lead.buyerName}
//                   </td>

//                   {/* PHONE */}
//                   <td className="p-4 text-white/60">
//                     <a href={`tel:${lead.buyerPhone}`} className="hover:text-green-400 transition">
//                       {lead.buyerPhone}
//                     </a>
//                   </td>

//                   {/* EMAIL */}
//                   <td className="p-4 text-white/60">
//                     <a href={`mailto:${lead.buyerEmail}`} className="hover:text-blue-400 transition text-xs">
//                       {lead.buyerEmail || "—"}
//                     </a>
//                   </td>

//                   {/* PRODUCT */}
//                   <td className="p-4">
//                     <div className="flex items-center gap-2">
//                       {lead.productId?.images?.[0]?.url && (
//                         <img
//                           src={lead.productId.images[0].url}
//                           alt={lead.productName}
//                           className="h-8 w-8 object-cover rounded-lg border border-white/10"
//                         />
//                       )}
//                       <p className="text-white/70 line-clamp-1">
//                         {lead.productName || lead.productId?.title || "—"}
//                       </p>
//                     </div>
//                   </td>

//                   {/* QUANTITY */}
//                   <td className="p-4 text-white/60">
//                     {lead.quantity || "—"}
//                   </td>

//                   {/* SELLER */}
//                   <td className="p-4 text-white/60">
//                     <p>{lead.sellerId?.name || "—"}</p>
//                     <p className="text-xs text-white/30">{lead.sellerId?.email}</p>
//                   </td>

//                   {/* MESSAGE */}
//                   <td className="p-4 text-white/50 max-w-[200px]">
//                     <p className="line-clamp-2">{lead.message || "—"}</p>
//                   </td>

//                   {/* DATE */}
//                   <td className="p-4 text-white/40 whitespace-nowrap">
//                     {new Date(lead.createdAt).toLocaleDateString("en-IN", {
//                       day: "numeric", month: "short", year: "numeric"
//                     })}
//                   </td>

//                   {/* STATUS */}
//                   <td className="p-4">
//                     <span className={`px-3 py-1 rounded-full text-[11px] font-medium capitalize ${statusStyle(lead.status)}`}>
//                       {lead.status}
//                     </span>
//                   </td>

//                   {/* ACTIONS */}
//                   <td className="p-4">
//                     <button
//                       onClick={() => setSelectedLead(lead)}
//                       className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
//                     >
//                       View
//                     </button>
//                   </td>

//                 </tr>
//               ))}

//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ─────────────────────────────────────────
//           VIEW MODAL
//       ───────────────────────────────────────── */}
//       {selectedLead && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden">

//             {/* MODAL HEADER */}
//             <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Enquiry Details</h2>
//               <button
//                 onClick={() => setSelectedLead(null)}
//                 className="text-white/40 hover:text-white text-xl"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="p-6 space-y-4">

//               {/* PRODUCT */}
//               <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
//                 {selectedLead.productId?.images?.[0]?.url && (
//                   <img
//                     src={selectedLead.productId.images[0].url}
//                     alt={selectedLead.productName}
//                     className="h-14 w-14 object-cover rounded-xl border border-white/10"
//                   />
//                 )}
//                 <div>
//                   <p className="text-xs text-white/40">Product</p>
//                   <p className="font-semibold">
//                     {selectedLead.productName || selectedLead.productId?.title || "—"}
//                   </p>
//                 </div>
//               </div>

//               {/* DETAILS GRID */}
//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Buyer Name</p>
//                   <p className="font-medium">{selectedLead.buyerName}</p>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Phone</p>
//                   <a href={`tel:${selectedLead.buyerPhone}`} className="font-medium text-green-400">
//                     {selectedLead.buyerPhone}
//                   </a>
//                 </div>
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Email</p>
//                   <a href={`mailto:${selectedLead.buyerEmail}`} className="font-medium text-blue-400 text-xs">
//                     {selectedLead.buyerEmail || "—"}
//                   </a>
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

//               {/* MESSAGE */}
//               {selectedLead.message && (
//                 <div>
//                   <p className="text-white/40 text-xs mb-1">Message</p>
//                   <p className="text-sm text-white/70 bg-white/5 rounded-xl p-3 leading-relaxed">
//                     {selectedLead.message}
//                   </p>
//                 </div>
//               )}

//             </div>

//             {/* FOOTER */}
//             <div className="px-6 py-4 border-t border-white/10 flex justify-between items-center">
//               <p className="text-xs text-white/30">
//                 {new Date(selectedLead.createdAt).toLocaleDateString("en-IN", {
//                   day: "numeric", month: "long", year: "numeric"
//                 })}
//               </p>
//               <button
//                 onClick={() => setSelectedLead(null)}
//                 className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition"
//               >
//                 Close
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }





// pages/admin/Enquiries.jsx

import { useEffect, useState } from "react";
import { getAllLeads } from "../../api/leadApi";
import { getAllRequirements } from "../../api/requirementApi";

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

  // ─────────────────────────────────────────
  // REQUIREMENTS STATES
  // ─────────────────────────────────────────
  const [requirements, setRequirements]               = useState([]);
  const [requirementsLoading, setRequirementsLoading] = useState(true);
  const [requirementsError, setRequirementsError]     = useState("");
  const [selectedReq, setSelectedReq]                 = useState(null);

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
  // FILTER LEADS
  // ─────────────────────────────────────────
  const filteredLeads = filter === "all"
    ? leads
    : leads.filter((l) => l.status === filter);

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
          {/* FILTERS */}
          <div className="flex gap-2 flex-wrap mb-4">
            {["all", "new", "viewed", "contacted", "converted", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
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

          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[1100px] w-full text-sm text-left">

                <thead className="bg-white/5 text-white/50 border-b border-white/10">
                  <tr>
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
                      <td colSpan={10} className="p-10 text-center text-white/40">
                        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        Loading...
                      </td>
                    </tr>
                  )}

                  {!leadsLoading && filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={10} className="p-10 text-center text-white/40">
                        No leads found
                      </td>
                    </tr>
                  )}

                  {!leadsLoading && filteredLeads.map((lead) => (
                    <tr key={lead._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">

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
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════
          TAB 2 — BUY REQUIREMENTS
      ═══════════════════════════════════════ */}
      {activeTab === "requirements" && (
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[1000px] w-full text-sm text-left">

              <thead className="bg-white/5 text-white/50 border-b border-white/10">
                <tr>
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
                    <td colSpan={9} className="p-10 text-center text-white/40">
                      <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      Loading...
                    </td>
                  </tr>
                )}

                {!requirementsLoading && requirements.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-10 text-center text-white/40">
                      No requirements found
                    </td>
                  </tr>
                )}

                {!requirementsLoading && requirements.map((req) => (
                  <tr key={req._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">

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
                      <button
                        onClick={() => setSelectedReq(req)}
                        className="bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        View
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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