

import React, { useState } from "react";
import { FaEye, FaPhoneAlt, FaEnvelope, FaInbox, FaClipboardList } from "react-icons/fa";

const timeAgo = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

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

const AllLeadsView = ({ leads, requirements, leadsLoading, requirementsLoading, setActiveTab }) => {

  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedReq,  setSelectedReq]  = useState(null);

  return (
    <div className="space-y-4">

      {/* VERIFY LEADS PREVIEW */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaClipboardList />
            <span className="font-semibold">Verify Leads</span>
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{requirements.length}</span>
          </div>
          <button onClick={() => setActiveTab("verify")} className="text-white/70 hover:text-white text-xs underline transition">
            View All →
          </button>
        </div>
        {requirementsLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : requirements.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">No verify leads yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="p-4">Product Required</th>
                  <th className="p-4">Buyer</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requirements.slice(0, 5).map((req) => (
                  <tr key={req._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 font-semibold text-gray-800">{req.productName}</td>
                    <td className="p-4">
                      <p className="text-xs font-medium text-gray-800">{req.buyerName}</p>
                      <a href={`tel:${req.buyerPhone}`} className="flex items-center gap-1 text-green-600 text-xs">
                        <FaPhoneAlt className="text-xs" /> {req.buyerPhone}
                      </a>
                    </td>
                    <td className="p-4 text-gray-600 text-xs">{req.category?.name || "—"}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    {/* DATE + TIME AGO */}
                    <td className="p-4">
                      <p className="text-gray-500 text-xs">
                        {new Date(req.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                      <p className="text-gray-400 text-[11px] mt-0.5">{timeAgo(req.createdAt)}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <button onClick={() => setSelectedReq(req)}
                          className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition">
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

      {/* DIRECT LEADS PREVIEW */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaInbox />
            <span className="font-semibold">Direct Leads</span>
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{leads.length}</span>
          </div>
          <button onClick={() => setActiveTab("leads")} className="text-white/70 hover:text-white text-xs underline transition">
            View All →
          </button>
        </div>
        {leadsLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">No direct leads yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="p-4">Buyer</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4">
                      <p className="font-medium text-gray-800">{lead.buyerName}</p>
                      <p className="text-xs text-gray-400">{lead.buyerEmail}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {lead.productId?.images?.[0]?.url && (
                          <img src={lead.productId.images[0].url} alt="" className="h-7 w-7 object-cover rounded-lg border" />
                        )}
                        <span className="text-gray-700 line-clamp-1">{lead.productName || "—"}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <a href={`tel:${lead.buyerPhone}`} className="flex items-center gap-1 text-green-600 text-xs">
                        <FaPhoneAlt className="text-xs" /> {lead.buyerPhone}
                      </a>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    {/* DATE + TIME AGO */}
                    <td className="p-4">
                      <p className="text-gray-500 text-xs">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                      <p className="text-gray-400 text-[11px] mt-0.5">{timeAgo(lead.createdAt)}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <button onClick={() => setSelectedLead(lead)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
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

      {/* ── LEAD VIEW MODAL ── */}
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
                <div><p className="text-gray-400 text-xs mb-1">Buyer</p><p className="font-medium">{selectedLead.buyerName}</p></div>
                <div><p className="text-gray-400 text-xs mb-1">Phone</p><a href={`tel:${selectedLead.buyerPhone}`} className="font-medium text-green-600">{selectedLead.buyerPhone}</a></div>
                <div><p className="text-gray-400 text-xs mb-1">Email</p><a href={`mailto:${selectedLead.buyerEmail}`} className="font-medium text-blue-600 text-xs">{selectedLead.buyerEmail || "—"}</a></div>
                <div><p className="text-gray-400 text-xs mb-1">Quantity</p><p className="font-medium">{selectedLead.quantity || "—"}</p></div>
                <div><p className="text-gray-400 text-xs mb-1">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(selectedLead.status)}`}>
                    {selectedLead.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Date</p>
                  <p className="font-medium text-xs">{new Date(selectedLead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                  <p className="text-gray-400 text-[11px]">{timeAgo(selectedLead.createdAt)}</p>
                </div>
              </div>
              {selectedLead.message && (
                <div>
                  <p className="text-gray-400 text-xs mb-1">Message</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{selectedLead.message}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t flex justify-end">
              <button onClick={() => setSelectedLead(null)} className="px-5 py-2 border rounded-xl text-sm hover:border-blue-800 hover:text-blue-800 transition">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── VERIFY LEAD VIEW MODAL ── */}
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

export default AllLeadsView;