
// pages/admin/Products.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminProducts, deleteProductAdmin } from "../../api/productApi";

export default function Products() {
  const [filter, setFilter]         = useState("all");
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const navigate                    = useNavigate();
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const handleFilterChange = (f) => {
  setFilter(f);
  setCurrentPage(1); // filter change hone pe page reset
};

  // ─────────────────────────────────────────
  // FETCH PRODUCTS
  // ─────────────────────────────────────────
  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminProducts(filter);
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.message || "Failed to fetch");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────
  // FILTER
  // ─────────────────────────────────────────
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.status === filter);

      const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
const paginatedProducts = filteredProducts.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

  // ─────────────────────────────────────────
  // STATUS STYLE
  // ─────────────────────────────────────────
  const statusStyle = (status) => {
    switch (status) {
      case "approved": return "bg-green-500/20 text-green-400";
      case "rejected": return "bg-red-500/20 text-red-400";
      default:         return "bg-yellow-500/20 text-yellow-400";
    }
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen w-full bg-[#0A0A0F] text-white p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          <p className="text-white/40 text-sm mt-1">
            {products.length} products found
          </p>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
             onClick={() => handleFilterChange(f)}
              className={`px-3 py-2 rounded-lg text-xs border transition capitalize
                ${filter === f
                  ? "bg-blue-800 border-blue-600"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">

            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Product</th>
                <th className="p-4">Seller</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>

              {/* LOADING */}
              {loading && (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-white/40">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              )}

              {/* EMPTY */}
              {!loading && filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-white/40">
                    No products found
                  </td>
                </tr>
              )}

              {/* ROWS */}
              {!loading && paginatedProducts.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >

                  {/* IMAGE */}
                  <td className="p-4">
                    {p.images?.[0]?.url ? (
                      <img
                        src={p.images[0].url}
                        alt={p.title}
                        className="h-12 w-12 object-cover rounded-lg border border-white/10"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center text-white/20 text-xs">
                        N/A
                      </div>
                    )}
                  </td>

                  {/* PRODUCT */}
                  <td className="p-4">
                    <p className="font-medium">{p.title}</p>
                    {p.brand && (
                      <p className="text-white/40 text-xs">{p.brand}</p>
                    )}
                  </td>

                  {/* SELLER */}
                  <td className="p-4 text-white/60">
                    <p>{p.seller?.name || "—"}</p>
                    <p className="text-xs text-white/30">{p.seller?.email}</p>
                  </td>

                  {/* CATEGORY */}
                  <td className="p-4 text-white/60">
                    <p>{p.category?.name || "—"}</p>
                    {p.subcategory?.name && (
                      <p className="text-xs text-white/30">
                        {p.subcategory.name}
                      </p>
                    )}
                  </td>

                  {/* PRICE */}
                  <td className="p-4 text-white/60">
                    ₹{p.price?.toLocaleString()}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${statusStyle(p.status)}`}>
                      {p.status}
                    </span>
                    {/* SUBSCRIPTION BADGE */}
                    <p className={`text-xs mt-1 ${p.seller?.subscriptionActive ? "text-green-400" : "text-yellow-400"}`}>
                      {p.seller?.subscriptionActive ? "✓ Subscribed" : "⚠ No Sub"}
                    </p>
                  </td>

                  {/* ACTIONS */}
                 {/* ACTIONS */}
<td className="p-4">
  <div className="flex gap-2">
    <button
      onClick={() => navigate(`/admin/products/${p._id}`)}
      className="bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded text-xs transition"
    >
      View
    </button>

    <button
      onClick={async () => {
        if (!window.confirm("Delete this product?")) return;
        const data = await deleteProductAdmin(p._id);
        if (data.success) {
          setProducts((prev) => prev.filter((item) => item._id !== p._id));
        }
      }}
      className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-xs transition"
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
{!loading && totalPages > 1 && (
  <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
    <p className="text-white/40 text-sm">
      Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
    </p>
    <div className="flex items-center gap-2">
      <button
       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        ← Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-8 h-8 rounded-lg text-xs font-medium transition
            ${currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
            }`}
        >
          {page}
        </button>
      ))}
      <button
       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        Next →
      </button>
    </div>
  </div>
)}
      </div>

    </div>
  );
}