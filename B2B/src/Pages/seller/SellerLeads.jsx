// // import React, { useState } from "react";
// // import { FaEye, FaReply, FaPhoneAlt } from "react-icons/fa";

// // const SellerLeads = () => {
// //   const [leads, setLeads] = useState([
// //     {
// //       id: 1,
// //       name: "Rahul Traders",
// //       product: "Steel Pipes",
// //       quantity: "50 Tons",
// //       phone: "+91 9876543210",
// //       status: "New",
// //       date: "2026-05-10",
// //     },
// //     {
// //       id: 2,
// //       name: "Apex Industries",
// //       product: "Copper Wire",
// //       quantity: "200 Kg",
// //       phone: "+91 9123456780",
// //       status: "Contacted",
// //       date: "2026-05-11",
// //     },
// //     {
// //       id: 3,
// //       name: "Global Chemicals",
// //       product: "Chemical Powder",
// //       quantity: "100 Bags",
// //       phone: "+91 9988776655",
// //       status: "Converted",
// //       date: "2026-05-12",
// //     },
// //      {
// //       id: 1,
// //       name: "Rahul Traders",
// //       product: "Steel Pipes",
// //       quantity: "50 Tons",
// //       phone: "+91 9876543210",
// //       status: "New",
// //       date: "2026-05-10",
// //     },
// //     {
// //       id: 2,
// //       name: "Apex Industries",
// //       product: "Copper Wire",
// //       quantity: "200 Kg",
// //       phone: "+91 9123456780",
// //       status: "Contacted",
// //       date: "2026-05-11",
// //     },
// //     {
// //       id: 3,
// //       name: "Global Chemicals",
// //       product: "Chemical Powder",
// //       quantity: "100 Bags",
// //       phone: "+91 9988776655",
// //       status: "Converted",
// //       date: "2026-05-12",
// //     },
// //   ]);

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "New":
// //         return "bg-blue-100 text-blue-700";
// //       case "Contacted":
// //         return "bg-yellow-100 text-yellow-700";
// //       case "Converted":
// //         return "bg-green-100 text-green-700";
// //       default:
// //         return "bg-gray-100 text-gray-700";
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       {/* TABLE CARD */}
// //       <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

// //         {/* TABLE HEADER */}
// //         <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4">
// //           <h2 className="text-xl font-semibold">Incoming Leads</h2>
// //         </div>

// //         {/* TABLE */}
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm text-left">

// //             <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
// //               <tr>
// //                 <th className="p-4">Buyer</th>
// //                 <th className="p-4">Product</th>
// //                 <th className="p-4">Quantity</th>
// //                 <th className="p-4">Phone</th>
// //                 <th className="p-4">Status</th>
// //                 <th className="p-4">Date</th>
// //                 <th className="p-4 text-center">Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {leads.map((lead) => (
// //                 <tr
// //                   key={lead.id}
// //                   className="border-b hover:bg-gray-50 transition"
// //                 >

// //                   <td className="p-4 font-medium text-gray-800">
// //                     {lead.name}
// //                   </td>

// //                   <td className="p-4 text-gray-600">
// //                     {lead.product}
// //                   </td>

// //                   <td className="p-4 text-gray-600">
// //                     {lead.quantity}
// //                   </td>

// //                   <td className="p-4 text-gray-600 flex items-center gap-2">
// //                     <FaPhoneAlt className="text-green-600" />
// //                     {lead.phone}
// //                   </td>

// //                   <td className="p-4">
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
// //                         lead.status
// //                       )}`}
// //                     >
// //                       {lead.status}
// //                     </span>
// //                   </td>

// //                   <td className="p-4 text-gray-600">
// //                     {lead.date}
// //                   </td>

// //                   {/* ACTIONS */}
// //                   <td className="p-4">
// //                     <div className="flex justify-center gap-3">

// //                       <button className="text-blue-600 hover:text-blue-800">
// //                         <FaEye />
// //                       </button>

// //                       <button className="text-green-600 hover:text-green-800">
// //                         <FaReply />
// //                       </button>

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
// // };

// // export default SellerLeads;


// // src/Pages/seller/SellerLeads.jsx

// import React, { useState, useEffect } from "react";
// import { FaEye, FaPhoneAlt, FaBoxOpen, FaEnvelope } from "react-icons/fa";
// import { getMyLeads, updateLeadStatus } from "../../api/leadApi";

// const SellerLeads = () => {

//   // ─────────────────────────────────────────
//   // STATES
//   // ─────────────────────────────────────────
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [updatingId, setUpdatingId] = useState(null);

//   // ─────────────────────────────────────────
//   // FETCH LEADS
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchLeads = async () => {
//       try {
//         setLoading(true);

//         const data = await getMyLeads();

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
//   // UPDATE STATUS
//   // ─────────────────────────────────────────
//   const handleStatusChange = async (id, status) => {
//     try {
//       setUpdatingId(id);

//       const data = await updateLeadStatus(id, status);

//       if (data.success) {
//         setLeads((prev) =>
//           prev.map((l) =>
//             l._id === id ? { ...l, status } : l
//           )
//         );

//         if (selectedLead?._id === id) {
//           setSelectedLead((prev) => ({
//             ...prev,
//             status,
//           }));
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   // ─────────────────────────────────────────
//   // STATUS STYLE
//   // ─────────────────────────────────────────
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "new":
//         return "bg-blue-100 text-blue-700";

//       case "viewed":
//         return "bg-yellow-100 text-yellow-700";

//       case "contacted":
//         return "bg-purple-100 text-purple-700";

//       case "converted":
//         return "bg-green-100 text-green-700";

//       case "rejected":
//         return "bg-red-100 text-red-700";

//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   // ─────────────────────────────────────────
//   // LOADING
//   // ─────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />

//           <p className="text-gray-500 text-sm">
//             Loading leads...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* ERROR */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-2xl text-sm mb-4">
//           {error}
//         </div>
//       )}

//       {/* TABLE CARD */}
//       <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

//         {/* HEADER */}
//         <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex items-center justify-between">

//           <h2 className="text-xl font-semibold">
//             Incoming Leads
//           </h2>

//           <span className="text-blue-200 text-sm">
//             {leads.length} leads
//           </span>

//         </div>

//         {/* EMPTY STATE */}
//         {leads.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-gray-400">

//             <FaBoxOpen className="text-6xl mb-4 text-gray-300" />

//             <p className="text-lg font-medium">
//               No leads yet
//             </p>

//             <p className="text-sm mt-1">
//               Leads will appear when buyers send inquiries
//             </p>

//           </div>
//         ) : (

//           /* TABLE */
//           <div className="overflow-x-auto">

//             <table className="w-full text-sm text-left">

//               <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
//                 <tr>
//                   <th className="p-4">Buyer</th>
//                   <th className="p-4">Product</th>
//                   <th className="p-4">Quantity</th>
//                   <th className="p-4">Contact</th>
//                   <th className="p-4">Status</th>
//                   <th className="p-4">Date</th>
//                   <th className="p-4 text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {leads.map((lead) => (
//                   <tr
//                     key={lead._id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >

//                     {/* BUYER */}
//                     <td className="p-4">

//                       <p className="font-medium text-gray-800">
//                         {lead.buyerName}
//                       </p>

//                       <p className="text-xs text-gray-400">
//                         {lead.buyerEmail}
//                       </p>

//                     </td>

//                     {/* PRODUCT */}
//                     <td className="p-4">

//                       <div className="flex items-center gap-2">

//                         {lead.productId?.images?.[0]?.url && (
//                           <img
//                             src={lead.productId.images[0].url}
//                             alt={lead.productName}
//                             className="h-8 w-8 object-cover rounded-lg border"
//                           />
//                         )}

//                         <p className="text-gray-700 font-medium line-clamp-1">
//                           {lead.productName || lead.productId?.title || "—"}
//                         </p>

//                       </div>

//                     </td>

//                     {/* QUANTITY */}
//                     <td className="p-4 text-gray-600">
//                       {lead.quantity || "—"}
//                     </td>

//                     {/* CONTACT */}
//                     <td className="p-4">

//                       <div className="flex flex-col gap-1">

//                         {/* PHONE */}
//                         <a
//                           href={`tel:${lead.buyerPhone}`}
//                           className="flex items-center gap-1.5 text-green-600 hover:text-green-700 text-xs font-medium"
//                         >
//                           <FaPhoneAlt className="text-xs" />
//                           {lead.buyerPhone}
//                         </a>

//                         {/* EMAIL */}
//                         {lead.buyerEmail && (
//                           <a
//                             href={`mailto:${lead.buyerEmail}`}
//                             className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-xs"
//                           >
//                             <FaEnvelope className="text-xs" />
//                             {lead.buyerEmail}
//                           </a>
//                         )}

//                       </div>

//                     </td>

//                     {/* STATUS */}
//                     <td className="p-4">

//                       <select
//                         value={lead.status}
//                         onChange={(e) =>
//                           handleStatusChange(
//                             lead._id,
//                             e.target.value
//                           )
//                         }
//                         disabled={updatingId === lead._id}
//                         className={`px-3 py-1 rounded-full text-xs font-semibold border-0 outline-none cursor-pointer capitalize ${getStatusStyle(lead.status)}`}
//                       >
//                         <option value="new">New</option>
//                         <option value="viewed">Viewed</option>
//                         <option value="contacted">Contacted</option>
//                         <option value="converted">Converted</option>
//                         <option value="rejected">Rejected</option>
//                       </select>

//                     </td>

//                     {/* DATE */}
//                     <td className="p-4 text-gray-500 text-xs">

//                       {new Date(lead.createdAt).toLocaleDateString(
//                         "en-IN",
//                         {
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         }
//                       )}

//                     </td>

//                     {/* ACTIONS */}
//                     <td className="p-4">

//                       <div className="flex justify-center">

//                         <button
//                           onClick={() => setSelectedLead(lead)}
//                           className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
//                           title="View Details"
//                         >
//                           <FaEye />
//                         </button>

//                       </div>

//                     </td>

//                   </tr>
//                 ))}

//               </tbody>

//             </table>

//           </div>
//         )}

//       </div>

//       {/* ─────────────────────────────────────────
//           VIEW MODAL
//       ───────────────────────────────────────── */}
//       {selectedLead && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

//           <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

//             {/* MODAL HEADER */}
//             <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex justify-between items-center">

//               <h2 className="text-lg font-semibold">
//                 Lead Details
//               </h2>

//               <button
//                 onClick={() => setSelectedLead(null)}
//                 className="text-white hover:text-blue-200 text-xl font-bold"
//               >
//                 ✕
//               </button>

//             </div>

//             <div className="p-6 space-y-4">

//               {/* PRODUCT */}
//               <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">

//                 {selectedLead.productId?.images?.[0]?.url && (
//                   <img
//                     src={selectedLead.productId.images[0].url}
//                     alt={selectedLead.productName}
//                     className="h-14 w-14 object-cover rounded-xl border"
//                   />
//                 )}

//                 <div>
//                   <p className="text-xs text-gray-400">
//                     Product
//                   </p>

//                   <p className="font-semibold text-gray-800">
//                     {selectedLead.productName ||
//                       selectedLead.productId?.title ||
//                       "—"}
//                   </p>
//                 </div>

//               </div>

//               {/* BUYER INFO */}
//               <div className="grid grid-cols-2 gap-3 text-sm">

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">
//                     Buyer Name
//                   </p>

//                   <p className="font-medium">
//                     {selectedLead.buyerName}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">
//                     Phone
//                   </p>

//                   <a
//                     href={`tel:${selectedLead.buyerPhone}`}
//                     className="font-medium text-green-600"
//                   >
//                     {selectedLead.buyerPhone}
//                   </a>
//                 </div>

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">
//                     Email
//                   </p>

//                   <a
//                     href={`mailto:${selectedLead.buyerEmail}`}
//                     className="font-medium text-blue-600 text-xs"
//                   >
//                     {selectedLead.buyerEmail || "—"}
//                   </a>
//                 </div>

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">
//                     Quantity
//                   </p>

//                   <p className="font-medium">
//                     {selectedLead.quantity || "—"}
//                   </p>
//                 </div>

//               </div>

//               {/* MESSAGE */}
//               {selectedLead.message && (
//                 <div>

//                   <p className="text-gray-400 text-xs mb-1">
//                     Message
//                   </p>

//                   <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 leading-relaxed">
//                     {selectedLead.message}
//                   </p>

//                 </div>
//               )}

//               {/* STATUS UPDATE */}
//               <div>

//                 <p className="text-gray-400 text-xs mb-2">
//                   Update Status
//                 </p>

//                 <div className="flex gap-2 flex-wrap">

//                   {[
//                     "new",
//                     "viewed",
//                     "contacted",
//                     "converted",
//                     "rejected",
//                   ].map((s) => (
//                     <button
//                       key={s}
//                       onClick={() =>
//                         handleStatusChange(selectedLead._id, s)
//                       }
//                       disabled={updatingId === selectedLead._id}
//                       className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition
//                         ${
//                           selectedLead.status === s
//                             ? getStatusStyle(s)
//                             : "bg-gray-100 text-gray-500 hover:bg-gray-200"
//                         }`}
//                     >
//                       {s}
//                     </button>
//                   ))}

//                 </div>

//               </div>

//             </div>

//             {/* FOOTER */}
//             <div className="px-6 py-4 border-t flex justify-between items-center">

//               <p className="text-xs text-gray-400">

//                 {new Date(selectedLead.createdAt).toLocaleDateString(
//                   "en-IN",
//                   {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   }
//                 )}

//               </p>

//               <button
//                 onClick={() => setSelectedLead(null)}
//                 className="px-5 py-2 border rounded-xl text-sm hover:border-blue-800 hover:text-blue-800 transition"
//               >
//                 Close
//               </button>

//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// };

// export default SellerLeads;




// src/Pages/seller/SellerLeads.jsx

import React, { useState, useEffect } from "react";
import { FaEye, FaPhoneAlt, FaBoxOpen, FaEnvelope, FaClipboardList, FaInbox } from "react-icons/fa";
import { getMyLeads, updateLeadStatus } from "../../api/leadApi";
import { getMyRequirements } from "../../api/requirementApi";

const SellerLeads = () => {

  // ─────────────────────────────────────────
  // TAB STATE
  // ─────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("leads");

  // ─────────────────────────────────────────
  // LEADS STATES
  // ─────────────────────────────────────────
  const [leads, setLeads]               = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsError, setLeadsError]     = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [updatingId, setUpdatingId]     = useState(null);

  // ─────────────────────────────────────────
  // REQUIREMENTS STATES
  // ─────────────────────────────────────────
  const [requirements, setRequirements]           = useState([]);
  const [requirementsLoading, setRequirementsLoading] = useState(true);
  const [requirementsError, setRequirementsError]     = useState("");
  const [selectedReq, setSelectedReq]             = useState(null);

  // ─────────────────────────────────────────
  // FETCH LEADS
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLeadsLoading(true);
        const data = await getMyLeads();
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
        const data = await getMyRequirements();
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
  // UPDATE LEAD STATUS
  // ─────────────────────────────────────────
  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      const data = await updateLeadStatus(id, status);
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => l._id === id ? { ...l, status } : l)
        );
        if (selectedLead?._id === id) {
          setSelectedLead((prev) => ({ ...prev, status }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // ─────────────────────────────────────────
  // STATUS STYLE
  // ─────────────────────────────────────────
  const getStatusStyle = (status) => {
    switch (status) {
      case "new":       return "bg-blue-100 text-blue-700";
      case "viewed":    return "bg-yellow-100 text-yellow-700";
      case "contacted": return "bg-purple-100 text-purple-700";
      case "converted": return "bg-green-100 text-green-700";
      case "rejected":  return "bg-red-100 text-red-700";
      default:          return "bg-gray-100 text-gray-700";
    }
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TABS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("leads")}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition
            ${activeTab === "leads"
              ? "bg-blue-800 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:border-blue-800 hover:text-blue-800"
            }`}
        >
          <FaInbox />
          Direct Leads
          {leads.length > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold
              ${activeTab === "leads" ? "bg-white text-blue-800" : "bg-blue-100 text-blue-700"}`}>
              {leads.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("requirements")}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition
            ${activeTab === "requirements"
              ? "bg-orange-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:border-orange-600 hover:text-orange-600"
            }`}
        >
          <FaClipboardList />
          Buy Requirements
          {requirements.length > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold
              ${activeTab === "requirements" ? "bg-white text-orange-600" : "bg-orange-100 text-orange-700"}`}>
              {requirements.length}
            </span>
          )}
        </button>
      </div>

      {/* ═══════════════════════════════════════
          TAB 1 — DIRECT LEADS
      ═══════════════════════════════════════ */}
      {activeTab === "leads" && (
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Direct Leads</h2>
            <span className="text-blue-200 text-sm">{leads.length} leads</span>
          </div>

          {/* LOADING */}
          {leadsLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* ERROR */}
          {!leadsLoading && leadsError && (
            <div className="p-6 text-red-500 text-sm">{leadsError}</div>
          )}

          {/* EMPTY */}
          {!leadsLoading && !leadsError && leads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <FaBoxOpen className="text-6xl mb-4 text-gray-300" />
              <p className="text-lg font-medium">No direct leads yet</p>
              <p className="text-sm mt-1">Leads will appear when buyers send inquiries on your products</p>
            </div>
          )}

          {/* TABLE */}
          {!leadsLoading && !leadsError && leads.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="p-4">Buyer</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id} className="border-b hover:bg-gray-50 transition">

                      <td className="p-4">
                        <p className="font-medium text-gray-800">{lead.buyerName}</p>
                        <p className="text-xs text-gray-400">{lead.buyerEmail}</p>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {lead.productId?.images?.[0]?.url && (
                            <img
                              src={lead.productId.images[0].url}
                              alt={lead.productName}
                              className="h-8 w-8 object-cover rounded-lg border"
                            />
                          )}
                          <p className="text-gray-700 font-medium line-clamp-1">
                            {lead.productName || lead.productId?.title || "—"}
                          </p>
                        </div>
                      </td>

                      <td className="p-4 text-gray-600">{lead.quantity || "—"}</td>

                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <a href={`tel:${lead.buyerPhone}`} className="flex items-center gap-1.5 text-green-600 hover:text-green-700 text-xs font-medium">
                            <FaPhoneAlt className="text-xs" />
                            {lead.buyerPhone}
                          </a>
                          {lead.buyerEmail && (
                            <a href={`mailto:${lead.buyerEmail}`} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-xs">
                              <FaEnvelope className="text-xs" />
                              {lead.buyerEmail}
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          disabled={updatingId === lead._id}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 outline-none cursor-pointer capitalize ${getStatusStyle(lead.status)}`}
                        >
                          <option value="new">New</option>
                          <option value="viewed">Viewed</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>

                      <td className="p-4 text-gray-500 text-xs">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          >
                            <FaEye />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════
          TAB 2 — BUY REQUIREMENTS
      ═══════════════════════════════════════ */}
      {activeTab === "requirements" && (
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Buy Requirements</h2>
              <p className="text-orange-100 text-xs mt-0.5">
                Buyers looking for products in your category
              </p>
            </div>
            <span className="text-orange-100 text-sm">{requirements.length} requirements</span>
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
          {!requirementsLoading && !requirementsError && requirements.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <FaClipboardList className="text-6xl mb-4 text-gray-300" />
              <p className="text-lg font-medium">No requirements yet</p>
              <p className="text-sm mt-1">Requirements will appear when buyers post in your category</p>
            </div>
          )}

          {/* CARDS */}
          {!requirementsLoading && !requirementsError && requirements.length > 0 && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {requirements.map((req) => (
                <div
                  key={req._id}
                  className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
                >
                  {/* TOP */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800">{req.productName}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {req.category?.name} {req.subCategory?.name ? `→ ${req.subCategory.name}` : ""}
                      </p>
                    </div>
                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium capitalize">
                      {req.status}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                    {req.quantity && (
                      <div>
                        <span className="text-gray-400">Quantity: </span>
                        <span className="font-medium">{req.quantity}</span>
                      </div>
                    )}
                    {req.budget && (
                      <div>
                        <span className="text-gray-400">Budget: </span>
                        <span className="font-medium">{req.budget}</span>
                      </div>
                    )}
                    {req.location && (
                      <div>
                        <span className="text-gray-400">Location: </span>
                        <span className="font-medium">{req.location}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Date: </span>
                      <span className="font-medium">
                        {new Date(req.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* BUYER CONTACT */}
                  <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{req.buyerName}</p>
                       <a
                        href={`tel:${req.buyerPhone}`}
                        className="flex items-center gap-1 text-green-600 text-xs font-medium mt-0.5"
                      >
                        <FaPhoneAlt className="text-xs" />
                        {req.buyerPhone}
                      </a>
                    </div>
                    <button
                      onClick={() => setSelectedReq(req)}
                      className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                    >
                      <FaEye />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────
          LEAD VIEW MODAL
      ───────────────────────────────────────── */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Lead Details</h2>
              <button onClick={() => setSelectedLead(null)} className="text-white hover:text-blue-200 text-xl font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4">
              {selectedLead.productId?.images?.[0]?.url && (
                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
                  <img src={selectedLead.productId.images[0].url} alt="" className="h-14 w-14 object-cover rounded-xl border" />
                  <div>
                    <p className="text-xs text-gray-400">Product</p>
                    <p className="font-semibold">{selectedLead.productName || "—"}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Buyer</p>
                  <p className="font-medium">{selectedLead.buyerName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Phone</p>
                  <a href={`tel:${selectedLead.buyerPhone}`} className="font-medium text-green-600">{selectedLead.buyerPhone}</a>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Email</p>
                  <a href={`mailto:${selectedLead.buyerEmail}`} className="font-medium text-blue-600 text-xs">{selectedLead.buyerEmail || "—"}</a>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Quantity</p>
                  <p className="font-medium">{selectedLead.quantity || "—"}</p>
                </div>
              </div>

              {selectedLead.message && (
                <div>
                  <p className="text-gray-400 text-xs mb-1">Message</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{selectedLead.message}</p>
                </div>
              )}

              <div>
                <p className="text-gray-400 text-xs mb-2">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {["new", "viewed", "contacted", "converted", "rejected"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedLead._id, s)}
                      disabled={updatingId === selectedLead._id}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition
                        ${selectedLead.status === s ? getStatusStyle(s) : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t flex justify-end">
              <button onClick={() => setSelectedLead(null)} className="px-5 py-2 border rounded-xl text-sm hover:border-blue-800 hover:text-blue-800 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────
          REQUIREMENT VIEW MODAL
      ───────────────────────────────────────── */}
      {selectedReq && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

            <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Requirement Details</h2>
              <button onClick={() => setSelectedReq(null)} className="text-white hover:text-orange-200 text-xl font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4">

              <div>
                <p className="text-gray-400 text-xs mb-1">Product Required</p>
                <p className="font-bold text-gray-800 text-lg">{selectedReq.productName}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Category</p>
                  <p className="font-medium">{selectedReq.category?.name || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Sub Category</p>
                  <p className="font-medium">{selectedReq.subCategory?.name || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Quantity</p>
                  <p className="font-medium">{selectedReq.quantity || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Budget</p>
                  <p className="font-medium">{selectedReq.budget || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Location</p>
                  <p className="font-medium">{selectedReq.location || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Date</p>
                  <p className="font-medium text-xs">
                    {new Date(selectedReq.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {selectedReq.description && (
                <div>
                  <p className="text-gray-400 text-xs mb-1">Description</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 leading-relaxed">
                    {selectedReq.description}
                  </p>
                </div>
              )}

              {/* BUYER CONTACT */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <p className="text-xs text-orange-600 font-semibold mb-2">Buyer Contact</p>
                <p className="font-bold text-gray-800">{selectedReq.buyerName}</p>
                <a href={`tel:${selectedReq.buyerPhone}`} className="flex items-center gap-2 text-green-600 font-medium text-sm mt-1">
                  <FaPhoneAlt className="text-xs" />
                  {selectedReq.buyerPhone}
                </a>
                {selectedReq.buyerEmail && (
                  <a href={`mailto:${selectedReq.buyerEmail}`} className="flex items-center gap-2 text-blue-600 text-xs mt-1">
                    <FaEnvelope className="text-xs" />
                    {selectedReq.buyerEmail}
                  </a>
                )}
              </div>

            </div>

            <div className="px-6 py-4 border-t flex justify-end">
              <button onClick={() => setSelectedReq(null)} className="px-5 py-2 border rounded-xl text-sm hover:border-orange-600 hover:text-orange-600 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SellerLeads;