import React, { useState } from "react";
import { FaEye, FaReply, FaPhoneAlt } from "react-icons/fa";

const SellerLeads = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Rahul Traders",
      product: "Steel Pipes",
      quantity: "50 Tons",
      phone: "+91 9876543210",
      status: "New",
      date: "2026-05-10",
    },
    {
      id: 2,
      name: "Apex Industries",
      product: "Copper Wire",
      quantity: "200 Kg",
      phone: "+91 9123456780",
      status: "Contacted",
      date: "2026-05-11",
    },
    {
      id: 3,
      name: "Global Chemicals",
      product: "Chemical Powder",
      quantity: "100 Bags",
      phone: "+91 9988776655",
      status: "Converted",
      date: "2026-05-12",
    },
     {
      id: 1,
      name: "Rahul Traders",
      product: "Steel Pipes",
      quantity: "50 Tons",
      phone: "+91 9876543210",
      status: "New",
      date: "2026-05-10",
    },
    {
      id: 2,
      name: "Apex Industries",
      product: "Copper Wire",
      quantity: "200 Kg",
      phone: "+91 9123456780",
      status: "Contacted",
      date: "2026-05-11",
    },
    {
      id: 3,
      name: "Global Chemicals",
      product: "Chemical Powder",
      quantity: "100 Bags",
      phone: "+91 9988776655",
      status: "Converted",
      date: "2026-05-12",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";
      case "Contacted":
        return "bg-yellow-100 text-yellow-700";
      case "Converted":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TABLE CARD */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

        {/* TABLE HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4">
          <h2 className="text-xl font-semibold">Incoming Leads</h2>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">

            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4">Buyer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4 font-medium text-gray-800">
                    {lead.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {lead.product}
                  </td>

                  <td className="p-4 text-gray-600">
                    {lead.quantity}
                  </td>

                  <td className="p-4 text-gray-600 flex items-center gap-2">
                    <FaPhoneAlt className="text-green-600" />
                    {lead.phone}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">
                    {lead.date}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex justify-center gap-3">

                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye />
                      </button>

                      <button className="text-green-600 hover:text-green-800">
                        <FaReply />
                      </button>

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
};

export default SellerLeads;