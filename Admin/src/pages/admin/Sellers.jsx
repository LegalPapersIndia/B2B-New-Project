// pages/admin/Sellers.jsx

import { useEffect, useState } from "react";
import { getAllSellers, deleteSeller } from "../../api/sellerAuthApi";

export default function Sellers() {
  const [filter, setFilter] = useState("all");
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  // ── PAGINATION STATE ADDED ──
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ── FILTER CHANGE WITH PAGE RESET ADDED ──
  const handleFilterChange = (f) => {
    setFilter(f);
    setCurrentPage(1);
  };

  const handleDelete = async (seller) => {
    if (!window.confirm(`Delete ${seller.name}?`)) return;
    try {
      setDeletingId(seller._id);
      await deleteSeller(seller._id);
      setSellers((prev) => prev.filter((s) => s._id !== seller._id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed!");
    } finally {
      setDeletingId(null);
    }
  };

  // ─────────────────────────────────────────
  // FETCH SELLERS
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        const res = await getAllSellers();
        setSellers(res.data.sellers || []);
      } catch (err) {
        console.error("Error fetching sellers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
  }, []);

  // ─────────────────────────────────────────
  // FILTER
  // ─────────────────────────────────────────
  const filteredSellers = Array.isArray(sellers)
    ? filter === "all"
      ? sellers
      : sellers.filter((s) =>
          filter === "active"
            ? s.subscriptionActive === true
            : s.subscriptionActive === false,
        )
    : [];

  // ── PAGINATION LOGIC ADDED ──
  const totalPages = Math.ceil(filteredSellers.length / itemsPerPage);
  const paginatedSellers = filteredSellers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ─────────────────────────────────────────
  // PLAN STYLE
  // ─────────────────────────────────────────
  const planStyle = (plan) => {
    switch (plan) {
      case "gold":
        return "bg-yellow-500/20 text-yellow-400";
      case "premium":
        return "bg-purple-500/20 text-purple-400";
      case "basic":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="p-6 bg-[#0A0A0F] min-h-screen text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Sellers Management</h1>
          <p className="text-white/40 text-sm mt-1">
            {sellers.length} total sellers
          </p>
        </div>

        {/* FILTERS — onClick CHANGED TO handleFilterChange */}
        <div className="flex gap-2 flex-wrap">
          {["all", "active", "pending"].map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-4 py-2 rounded-lg text-xs border transition capitalize
                ${
                  filter === f
                    ? "bg-blue-800 border-blue-600"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Seller</th>
                <th className="p-4">Company</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Location</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Subscription</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* LOADING */}
              {loading && (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-white/40">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              )}

              {/* EMPTY */}
              {!loading && filteredSellers.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-white/40">
                    No sellers found
                  </td>
                </tr>
              )}

              {/* ROWS — filteredSellers.map CHANGED TO paginatedSellers.map */}
              {!loading &&
                paginatedSellers.map((seller) => (
                  <tr
                    key={seller._id}
                    className="border-t border-white/10 hover:bg-white/[0.03] transition"
                  >
                    {/* SELLER */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-blue-800/30 flex items-center justify-center flex-shrink-0">
                          {seller.profileImage?.url ? (
                            <img
                              src={seller.profileImage.url}
                              alt={seller.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-blue-400 font-bold text-sm">
                              {seller.name?.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <p className="font-medium">{seller.name}</p>
                      </div>
                    </td>

                    {/* COMPANY */}
                    <td className="p-4 text-white/70">
                      <p>{seller.companyName || "—"}</p>
                      {seller.companyType && (
                        <p className="text-xs text-white/30">
                          {seller.companyType}
                        </p>
                      )}
                    </td>

                    {/* EMAIL */}
                    <td className="p-4 text-white/60 text-xs">
                      {seller.email}
                    </td>

                    {/* PHONE */}
                    <td className="p-4 text-white/60">{seller.phone}</td>

                    {/* LOCATION */}
                    <td className="p-4 text-white/60 text-xs">
                      {[seller.city, seller.state].filter(Boolean).join(", ") ||
                        "—"}
                    </td>

                    {/* PLAN */}
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${planStyle(seller.subscriptionPlan)}`}
                      >
                        {seller.subscriptionPlan || "No Plan"}
                      </span>
                    </td>

                    {/* SUBSCRIPTION */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        seller.subscriptionActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                      >
                        {seller.subscriptionActive ? "Active" : "Pending"}
                      </span>
                      {seller.subscriptionExpire &&
                        seller.subscriptionActive && (
                          <p className="text-xs text-white/30 mt-1">
                            Exp:{" "}
                            {new Date(
                              seller.subscriptionExpire,
                            ).toLocaleDateString("en-IN")}
                          </p>
                        )}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedSeller(seller)}
                          className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(seller)}
                          disabled={deletingId === seller._id}
                          className="bg-red-700 hover:bg-red-800 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs transition"
                        >
                          {deletingId === seller._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* ── PAGINATION ADDED — INSIDE TABLE DIV ── */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-white/40 text-sm">
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, filteredSellers.length)} of{" "}
              {filteredSellers.length}
            </p>

            <div className="flex items-center gap-2">
              {/* PREV */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                ← Prev
              </button>

              {/* PAGE NUMBERS */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition
                    ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              {/* NEXT */}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
      {/* TABLE DIV CLOSE */}

      {/* ─────────────────────────────────────────
          VIEW MODAL
      ───────────────────────────────────────── */}
      {selectedSeller && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
              <h2 className="text-lg font-semibold">Seller Details</h2>
              <button
                onClick={() => setSelectedSeller(null)}
                className="text-white/40 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-blue-800/30 flex items-center justify-center flex-shrink-0">
                  {selectedSeller.profileImage?.url ? (
                    <img
                      src={selectedSeller.profileImage.url}
                      alt={selectedSeller.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-blue-400 font-bold text-2xl">
                      {selectedSeller.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedSeller.name}</h3>
                  <p className="text-white/40 text-sm">
                    {selectedSeller.email}
                  </p>
                  <span
                    className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${planStyle(selectedSeller.subscriptionPlan)}`}
                  >
                    {selectedSeller.subscriptionPlan || "No Plan"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-white/40 text-xs mb-1">Phone</p>
                  <p className="font-medium">{selectedSeller.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Company</p>
                  <p className="font-medium">
                    {selectedSeller.companyName || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Company Type</p>
                  <p className="font-medium">
                    {selectedSeller.companyType || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Year Est.</p>
                  <p className="font-medium">
                    {selectedSeller.yearEstablished || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Employees</p>
                  <p className="font-medium">
                    {selectedSeller.employees || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Annual Turnover</p>
                  <p className="font-medium">
                    {selectedSeller.annualTurnover || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">GST Number</p>
                  <p className="font-medium">
                    {selectedSeller.gstNumber || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">PAN Number</p>
                  <p className="font-medium">
                    {selectedSeller.panNumber || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">City</p>
                  <p className="font-medium">{selectedSeller.city || "—"}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">State</p>
                  <p className="font-medium">{selectedSeller.state || "—"}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Pincode</p>
                  <p className="font-medium">{selectedSeller.pincode || "—"}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Subscription</p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${selectedSeller.subscriptionActive ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                  >
                    {selectedSeller.subscriptionActive ? "Active" : "Pending"}
                  </span>
                </div>
              </div>

              {selectedSeller.companyWebsite && (
                <div>
                  <p className="text-white/40 text-xs mb-1">Website</p>
                  <a
                    href={selectedSeller.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    {selectedSeller.companyWebsite}
                  </a>
                </div>
              )}

              {selectedSeller.address && (
                <div>
                  <p className="text-white/40 text-xs mb-1">Address</p>
                  <p className="text-sm text-white/70">
                    {selectedSeller.address}
                  </p>
                </div>
              )}

              {selectedSeller.companyDescription && (
                <div>
                  <p className="text-white/40 text-xs mb-1">
                    Company Description
                  </p>
                  <p className="text-sm text-white/70 bg-white/5 rounded-xl p-3 leading-relaxed">
                    {selectedSeller.companyDescription}
                  </p>
                </div>
              )}

              {selectedSeller.subscriptionExpire && (
                <div>
                  <p className="text-white/40 text-xs mb-1">
                    Subscription Expires
                  </p>
                  <p className="text-sm font-medium text-orange-400">
                    {new Date(
                      selectedSeller.subscriptionExpire,
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-white/10 flex justify-end flex-shrink-0">
              <button
                onClick={() => setSelectedSeller(null)}
                className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
