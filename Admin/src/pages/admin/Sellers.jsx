import { useEffect, useState } from "react";

export default function Sellers() {
  const [filter, setFilter] = useState("all");
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    // dummy data (backend ke baad replace hoga)
    setSellers([
      {
        id: 1,
        name: "Rahul Traders",
        email: "rahul@gmail.com",
        company: "Rahul Pvt Ltd",
        status: "pending",
      },
      {
        id: 2,
        name: "Tech Supplies",
        email: "tech@gmail.com",
        company: "Tech Ltd",
        status: "approved",
      },
      {
        id: 3,
        name: "Global Exporters",
        email: "global@gmail.com",
        company: "Global Inc",
        status: "pending",
      },
    ]);
  }, []);

  const filteredSellers =
    filter === "all"
      ? sellers
      : sellers.filter((s) => s.status === filter);

  return (
    <div className="p-6 bg-[#0A0A0F] min-h-screen text-white">

      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">
        Sellers Management
      </h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "pending", "approved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm border transition
              ${filter === f
                ? "bg-blue-800 border-blue-600"
                : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-white/10 rounded-xl overflow-hidden">

          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Company</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredSellers.map((seller) => (
              <tr key={seller.id} className="border-t border-white/10">

                <td className="p-3">{seller.name}</td>
                <td className="p-3 text-white/60">{seller.email}</td>
                <td className="p-3 text-white/60">{seller.company}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs
                      ${seller.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                      }`}
                  >
                    {seller.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">

                  <button className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded text-xs">
                    Approve
                  </button>

                  <button className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-xs">
                    Reject
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}