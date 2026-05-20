import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [filter, setFilter] = useState("pending");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Industrial Steel Rod",
        seller: "Rahul Traders",
        category: "Steel",
        price: "₹1200",
        status: "pending",
      },
      {
        id: 2,
        name: "PVC Pipes",
        seller: "Tech Supplies",
        category: "Plastics",
        price: "₹450",
        status: "approved",
      },
      {
        id: 3,
        name: "Chemical Powder",
        seller: "Global Exporters",
        category: "Chemicals",
        price: "₹2500",
        status: "pending",
      },
      {
        id: 4,
        name: "Copper Wire",
        seller: "Rahul Traders",
        category: "Electrical",
        price: "₹1800",
        status: "rejected",
      },
    ]);
  }, []);

  // FILTER
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.status === filter);

  // ACTIONS
  const handleApprove = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "approved" } : p
      )
    );
  };

  const handleReject = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "rejected" } : p
      )
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0F] text-white p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

        <h1 className="text-2xl font-bold">
          Products Management
        </h1>

        <div className="flex gap-2 flex-wrap">

          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs border transition
              ${
                filter === f
                  ? "bg-blue-800 border-blue-600"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left">

            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Seller</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >

                  {/* PRODUCT */}
                  <td className="p-4 font-medium">
                    {p.name}
                  </td>

                  {/* SELLER */}
                  <td className="p-4 text-white/60">
                    {p.seller}
                  </td>

                  {/* CATEGORY */}
                  <td className="p-4 text-white/60">
                    {p.category}
                  </td>

                  {/* PRICE */}
                  <td className="p-4 text-white/60">
                    {p.price}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                        ${
                          p.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : p.status === "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 flex gap-2 flex-wrap">

                    {/* VIEW BUTTON (ONLY NAVIGATION) */}
                    <button
                      onClick={() =>
                        navigate(`/admin/products/${p.id}`)
                      }
                      className="bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded text-xs"
                    >
                      View
                    </button>

                    {p.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(p.id)}
                          className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded text-xs"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleReject(p.id)}
                          className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-xs"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {p.status !== "pending" && (
                      <span className="text-white/30 text-xs">
                        No action
                      </span>
                    )}

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}