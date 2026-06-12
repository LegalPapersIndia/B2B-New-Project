import React, { useState } from "react";
import { FaEye, FaPhoneAlt, FaEnvelope, FaBoxOpen, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ITEMS_PER_PAGE = 10;

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

const DirectLeadsTable = ({
  leads,
  leadsLoading,
  leadsError,
  selectedLeadIds,
  setSelectedLeadIds,
  handleDeleteLead,
  handleDeleteMultipleLeads,
  handleStatusChange,
  updatingId,
}) => {
  const [leadPage, setLeadPage]           = useState(1);
  const [leadsSearch, setLeadsSearch]     = useState("");
  const [showDownload, setShowDownload]   = useState(false);
  const [selectedLead, setSelectedLead]   = useState(null);

  // SEARCH
  const filteredLeads = leads.filter((l) => {
    if (!leadsSearch.trim()) return true;
    const q = leadsSearch.toLowerCase();
    return (
      l.buyerName?.toLowerCase().includes(q) ||
      l.buyerEmail?.toLowerCase().includes(q) ||
      l.buyerPhone?.toLowerCase().includes(q) ||
      l.productName?.toLowerCase().includes(q)
    );
  });

  const leadTotalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const currentLeads   = filteredLeads.slice((leadPage - 1) * ITEMS_PER_PAGE, leadPage * ITEMS_PER_PAGE);

  // CHECKBOX
  const toggleLeadCheckbox = (id) =>
    setSelectedLeadIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  const toggleAllLeads = () => {
    const pageIds = currentLeads.map((l) => l._id);
    const allSelected = pageIds.every((id) => selectedLeadIds.includes(id));
    if (allSelected) setSelectedLeadIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    else setSelectedLeadIds((prev) => [...new Set([...prev, ...pageIds])]);
  };

  // EXCEL
  const handleExcel = () => {
    const toDownload = selectedLeadIds.length > 0
      ? filteredLeads.filter((l) => selectedLeadIds.includes(l._id))
      : filteredLeads;
    const data = toDownload.map((l) => ({
      "Buyer Name": l.buyerName || "",
      "Phone":      l.buyerPhone || "",
      "Email":      l.buyerEmail || "",
      "Product":    l.productName || "",
      "Quantity":   l.quantity || "",
      "Message":    l.message || "",
      "Status":     l.status || "",
      "Date":       l.createdAt ? new Date(l.createdAt).toLocaleDateString("en-IN") : "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DirectLeads");
    XLSX.writeFile(wb, "direct-leads.xlsx");
    setShowDownload(false);
  };

  // PDF
  const handlePDF = () => {
    const toDownload = selectedLeadIds.length > 0
      ? filteredLeads.filter((l) => selectedLeadIds.includes(l._id))
      : filteredLeads;
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(14);
    doc.text("Direct Leads Report", 14, 15);
    autoTable(doc, {
      startY: 22,
      head: [["Buyer", "Phone", "Email", "Product", "Quantity", "Status", "Date"]],
      body: toDownload.map((l) => [
        l.buyerName || "", l.buyerPhone || "", l.buyerEmail || "",
        l.productName || "", l.quantity || "", l.status || "",
        l.createdAt ? new Date(l.createdAt).toLocaleDateString("en-IN") : "",
      ]),
      styles: { fontSize: 7 },
      headStyles: { fillColor: [30, 64, 175] },
    });
    doc.save("direct-leads.pdf");
    setShowDownload(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-semibold">Direct Leads</h2>
        <div className="flex items-center gap-3 flex-wrap">

          {/* SEARCH */}
          <input
            type="text"
            value={leadsSearch}
            onChange={(e) => { setLeadsSearch(e.target.value); setLeadPage(1); }}
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
              {selectedLeadIds.length > 0 && (
                <span className="bg-white text-blue-800 rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                  {selectedLeadIds.length}
                </span>
              )}
              <span className="text-white/60 text-[10px]">▾</span>
            </button>
            {showDownload && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDownload(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-xl overflow-hidden w-40 shadow-xl">
                  <p className="text-gray-400 text-[10px] px-3 pt-2 pb-1">
                    {selectedLeadIds.length > 0 ? `${selectedLeadIds.length} selected` : "All filtered"}
                  </p>
                  <button onClick={handleExcel} className="w-full text-left px-3 py-2 text-xs text-green-600 hover:bg-gray-50 transition flex items-center gap-2">
                    <span>📊</span> Excel (.xlsx)
                  </button>
                  <button onClick={handlePDF} className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-gray-50 transition flex items-center gap-2">
                    <span>📄</span> PDF
                  </button>
                </div>
              </>
            )}
          </div>

          {/* DELETE SELECTED */}
          {selectedLeadIds.length > 0 && (
            <button onClick={handleDeleteMultipleLeads}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold transition">
              <FaTrash /> Delete Selected ({selectedLeadIds.length})
            </button>
          )}
          <span className="text-blue-200 text-sm">{leads.length} leads</span>
        </div>
      </div>

      {/* LOADING */}
      {leadsLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* ERROR */}
      {!leadsLoading && leadsError && <div className="p-6 text-red-500 text-sm">{leadsError}</div>}

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
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="p-4 w-10">
                    <input type="checkbox" className="w-4 h-4 accent-blue-800 cursor-pointer"
                      checked={currentLeads.length > 0 && currentLeads.every((l) => selectedLeadIds.includes(l._id))}
                      onChange={toggleAllLeads} />
                  </th>
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
                {currentLeads.map((lead) => (
                  <tr key={lead._id}
                    className={`border-b hover:bg-gray-50 transition ${selectedLeadIds.includes(lead._id) ? "bg-blue-50" : ""}`}>
                    <td className="p-4">
                      <input type="checkbox" className="w-4 h-4 accent-blue-800 cursor-pointer"
                        checked={selectedLeadIds.includes(lead._id)}
                        onChange={() => toggleLeadCheckbox(lead._id)} />
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-800">{lead.buyerName}</p>
                      <p className="text-xs text-gray-400">{lead.buyerEmail}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {lead.productId?.images?.[0]?.url && (
                          <img src={lead.productId.images[0].url} alt={lead.productName}
                            className="h-8 w-8 object-cover rounded-lg border" />
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
                          <FaPhoneAlt className="text-xs" /> {lead.buyerPhone}
                        </a>
                        {lead.buyerEmail && (
                          <a href={`mailto:${lead.buyerEmail}`} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-xs">
                            <FaEnvelope className="text-xs" /> {lead.buyerEmail}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <select value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        disabled={updatingId === lead._id}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-0 outline-none cursor-pointer capitalize ${getStatusStyle(lead.status)}`}>
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
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                      <p className="text-gray-400 text-[11px] mt-0.5">{timeAgo(lead.createdAt)}</p>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => setSelectedLead(lead)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition" title="View">
                          <FaEye />
                        </button>
                        <button onClick={() => handleDeleteLead(lead._id)}
                          className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition" title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {leadTotalPages > 1 && (
            <div className="px-6 py-4 border-t flex items-center justify-between text-sm">
              <p className="text-gray-500">
                Showing {(leadPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(leadPage * ITEMS_PER_PAGE, filteredLeads.length)} of {filteredLeads.length}
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setLeadPage((p) => p - 1)} disabled={leadPage === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-800 hover:text-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed">
                  ← Prev
                </button>
                {Array.from({ length: leadTotalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setLeadPage(p)}
                    className={`w-9 h-9 rounded-xl border text-sm font-medium transition
                      ${leadPage === p ? "bg-blue-800 text-white border-blue-800" : "border-gray-200 text-gray-600 hover:border-blue-800 hover:text-blue-800"}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setLeadPage((p) => p + 1)} disabled={leadPage === leadTotalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-800 hover:text-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed">
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* VIEW MODAL */}
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
    </div>
  );
};

export default DirectLeadsTable;