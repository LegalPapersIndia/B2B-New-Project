// components/admin/AdminDirectLeadsTable.jsx

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

const itemsPerPage = 10;

export default function AdminDirectLeadsTable({
  leads,
  leadsLoading,
  handleDeleteLead,
  handleDeleteMultipleLeads,
  selectedLeadIds,
  setSelectedLeadIds,
}) {
  const [filter, setFilter]               = useState("all");
  const [leadsPage, setLeadsPage]         = useState(1);
  const [leadsSearch, setLeadsSearch]     = useState("");
  const [showLeadsDownload, setShowLeadsDownload] = useState(false);
  const [selectedLead, setSelectedLead]   = useState(null);

  // FILTER + SEARCH
  const filteredLeads = (
    filter === "all" ? leads : leads.filter((l) => l.status === filter)
  ).filter((l) => {
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

  const leadsTotal    = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (leadsPage - 1) * itemsPerPage,
    leadsPage * itemsPerPage
  );

  // CHECKBOX
  const toggleLeadCheckbox = (id) =>
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const toggleAllLeads = () => {
    const pageIds = paginatedLeads.map((l) => l._id);
    const allSelected = pageIds.every((id) => selectedLeadIds.includes(id));
    if (allSelected) setSelectedLeadIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    else setSelectedLeadIds((prev) => [...new Set([...prev, ...pageIds])]);
  };

  // EXCEL
  const handleLeadsExcel = () => {
    const toDownload = selectedLeadIds.length > 0
      ? filteredLeads.filter((l) => selectedLeadIds.includes(l._id))
      : filteredLeads;
    const data = toDownload.map((l) => ({
      "Buyer Name":   l.buyerName || "",
      "Buyer Phone":  l.buyerPhone || "",
      "Buyer Email":  l.buyerEmail || "",
      "Product":      l.productName || l.productId?.title || "",
      "Quantity":     l.quantity || "",
      "Seller Name":  l.sellerId?.name || "",
      "Seller Email": l.sellerId?.email || "",
      "Message":      l.message || "",
      "Status":       l.status || "",
      "Date":         l.createdAt ? new Date(l.createdAt).toLocaleDateString("en-IN") : "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "leads.xlsx");
    setShowLeadsDownload(false);
  };

  // PDF
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
        l.buyerName || "", l.buyerPhone || "", l.buyerEmail || "",
        l.productName || l.productId?.title || "", l.quantity || "",
        l.sellerId?.name || "", l.status || "",
        l.createdAt ? new Date(l.createdAt).toLocaleDateString("en-IN") : "",
      ]),
      styles: { fontSize: 7 },
      headStyles: { fillColor: [30, 64, 175] },
    });
    doc.save("leads.pdf");
    setShowLeadsDownload(false);
  };

  return (
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
          {/* SEARCH */}
          <input
            type="text"
            value={leadsSearch}
            onChange={(e) => { setLeadsSearch(e.target.value); setLeadsPage(1); }}
            placeholder="Search buyer, product, seller..."
            className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 w-48"
          />

          {/* DOWNLOAD */}
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

      {/* TABLE */}
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
                  <td colSpan={11} className="p-10 text-center text-white/40">No leads found</td>
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
                    <a href={`tel:${lead.buyerPhone}`} className="hover:text-green-400 transition">{lead.buyerPhone}</a>
                  </td>
                  <td className="p-4 text-white/60">
                    <a href={`mailto:${lead.buyerEmail}`} className="hover:text-blue-400 transition text-xs">{lead.buyerEmail || "—"}</a>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {lead.productId?.images?.[0]?.url && (
                        <img src={lead.productId.images[0].url} alt="" className="h-8 w-8 object-cover rounded-lg border border-white/10" />
                      )}
                      <p className="text-white/70 line-clamp-1">{lead.productName || lead.productId?.title || "—"}</p>
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

                  {/* DATE + TIME AGO */}
                  <td className="p-4 text-white/40 whitespace-nowrap">
                    <p>{new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    <p className="text-white/30 text-[11px] mt-0.5">{timeAgo(lead.createdAt)}</p>
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

        {/* PAGINATION */}
        {!leadsLoading && leadsTotal > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-white/40 text-sm">
              Showing {((leadsPage - 1) * itemsPerPage) + 1}–{Math.min(leadsPage * itemsPerPage, filteredLeads.length)} of {filteredLeads.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLeadsPage((p) => Math.max(p - 1, 1))}
                disabled={leadsPage === 1}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                ← Prev
              </button>
              {Array.from({ length: leadsTotal }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setLeadsPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition
                    ${leadsPage === page ? "bg-blue-600 text-white" : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setLeadsPage((p) => Math.min(p + 1, leadsTotal))}
                disabled={leadsPage === leadsTotal}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* LEAD VIEW MODAL */}
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
                <div><p className="text-white/40 text-xs mb-1">Buyer</p><p className="font-medium">{selectedLead.buyerName}</p></div>
                <div><p className="text-white/40 text-xs mb-1">Phone</p><a href={`tel:${selectedLead.buyerPhone}`} className="font-medium text-green-400">{selectedLead.buyerPhone}</a></div>
                <div><p className="text-white/40 text-xs mb-1">Email</p><a href={`mailto:${selectedLead.buyerEmail}`} className="font-medium text-blue-400 text-xs">{selectedLead.buyerEmail || "—"}</a></div>
                <div><p className="text-white/40 text-xs mb-1">Quantity</p><p className="font-medium">{selectedLead.quantity || "—"}</p></div>
                <div><p className="text-white/40 text-xs mb-1">Seller</p><p className="font-medium">{selectedLead.sellerId?.name || "—"}</p></div>
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
    </>
  );
}