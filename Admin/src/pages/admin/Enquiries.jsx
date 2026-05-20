import { useEffect, useState } from "react";

export default function Enquiries() {
  const [filter, setFilter] = useState("all");
  const [enquiries, setEnquiries] = useState([]);

  // ─── DUMMY DATA ───
  useEffect(() => {
    setEnquiries([
      {
        id: 1,
        buyer: "Amit Industries",
        company: "Amit Steel Pvt Ltd",
        phone: "+91 9876543210",
        email: "amit@gmail.com",
        product: "Industrial Steel Rod",
        quantity: "500 Units",
        message: "Need urgent delivery for Delhi location.",
        date: "18 May 2026",
        status: "pending",
      },

      {
        id: 2,
        buyer: "Global Traders",
        company: "Global Trade Corp",
        phone: "+91 9123456780",
        email: "global@gmail.com",
        product: "PVC Pipes",
        quantity: "200 Units",
        message: "Please send latest quotation.",
        date: "17 May 2026",
        status: "replied",
      },

      {
        id: 3,
        buyer: "Sharma Export",
        company: "Sharma Chemicals",
        phone: "+91 9988776655",
        email: "sharma@gmail.com",
        product: "Chemical Powder",
        quantity: "1000 KG",
        message: "Looking for long-term supplier.",
        date: "16 May 2026",
        status: "pending",
      },

      {
        id: 4,
        buyer: "Royal Enterprises",
        company: "Royal Industries",
        phone: "+91 9090909090",
        email: "royal@gmail.com",
        product: "Copper Wire",
        quantity: "300 Units",
        message: "Requirement completed successfully.",
        date: "15 May 2026",
        status: "closed",
      },
    ]);
  }, []);

  // ─── FILTER ───
  const filteredEnquiries =
    filter === "all"
      ? enquiries
      : enquiries.filter((e) => e.status === filter);

  // ─── ACTIONS ───

  // Reply = Admin/Seller contacted buyer
  const handleReply = (id) => {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: "replied" }
          : e
      )
    );
  };

  // Close = Deal completed / enquiry finished
  const handleClose = (id) => {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: "closed" }
          : e
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

      {/* ───────────────── HEADER ───────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-bold">
            Enquiries Management
          </h1>

          <p className="text-sm text-white/40 mt-1">
            Manage buyer enquiries and responses
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 flex-wrap">

          {["all", "pending", "replied", "closed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs border transition-all
              ${
                filter === f
                  ? "bg-blue-800 border-blue-700 text-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}

        </div>

      </div>

      {/* ───────────────── TABLE CARD ───────────────── */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-[1300px] w-full text-sm text-left">

            {/* TABLE HEAD */}
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Buyer</th>
                <th className="p-4">Company</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Email</th>
                <th className="p-4">Product</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Message</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>

              {filteredEnquiries.map((e) => (
                <tr
                  key={e.id}
                  className="border-t border-white/10 hover:bg-white/[0.03] transition"
                >

                  {/* BUYER */}
                  <td className="p-4 font-medium text-white">
                    {e.buyer}
                  </td>

                  {/* COMPANY */}
                  <td className="p-4 text-white/60">
                    {e.company}
                  </td>

                  {/* PHONE */}
                  <td className="p-4 text-white/60">
                    {e.phone}
                  </td>

                  {/* EMAIL */}
                  <td className="p-4 text-white/60">
                    {e.email}
                  </td>

                  {/* PRODUCT */}
                  <td className="p-4 text-white/70">
                    {e.product}
                  </td>

                  {/* QUANTITY */}
                  <td className="p-4 text-white/60">
                    {e.quantity}
                  </td>

                  {/* MESSAGE */}
                  <td className="p-4 text-white/50 max-w-[250px]">
                    {e.message}
                  </td>

                  {/* DATE */}
                  <td className="p-4 text-white/40 whitespace-nowrap">
                    {e.date}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-medium
                      ${
                        e.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : e.status === "replied"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {e.status}
                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">

                    <div className="flex gap-2 flex-wrap">

                      {/* PENDING */}
                      {e.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleReply(e.id)}
                            className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                          >
                            Reply
                          </button>

                          <button
                            onClick={() => handleClose(e.id)}
                            className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
                          >
                            Close
                          </button>
                        </>
                      )}

                      {/* REPLIED */}
                      {e.status === "replied" && (
                        <button
                          onClick={() => handleClose(e.id)}
                          className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
                        >
                          Close
                        </button>
                      )}

                      {/* CLOSED */}
                      {e.status === "closed" && (
                        <span className="text-white/30 text-xs">
                          No actions available
                        </span>
                      )}

                    </div>

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