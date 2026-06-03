import { useEffect, useState } from "react";
import {
  getAllContacts,
  deleteContact,
} from "../../api/contactApi";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // ─────────────────────────────────────────
  // FETCH CONTACTS
  // ─────────────────────────────────────────
  const fetchContacts = async () => {
    try {
      setLoading(true);

      const data = await getAllContacts();

      if (data.success) {
        setContacts(data.contacts || []);
      }
    } catch (err) {
      console.error("Fetch Contacts Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ─────────────────────────────────────────
  // DELETE CONTACT
  // ─────────────────────────────────────────
  const handleDelete = async (contact) => {
    const confirmDelete = window.confirm(
      `Delete contact from ${contact.name}?`
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(contact._id);

      const data = await deleteContact(contact._id);

      if (data.success) {
        setContacts((prev) =>
          prev.filter((item) => item._id !== contact._id)
        );
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  // ─────────────────────────────────────────
  // STATUS STYLE
  // ─────────────────────────────────────────
  const statusStyle = (status) => {
    switch (status) {
      case "replied":
        return "bg-green-500/20 text-green-400";

      case "new":
      default:
        return "bg-yellow-500/20 text-yellow-400";
    }
  };

  return (
    <div className="p-6 bg-[#0A0A0F] min-h-screen text-white">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Contact Messages
        </h1>

        <p className="text-white/40 text-sm mt-1">
          {contacts.length} total messages
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* LOADING */}
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-10 text-center text-white/40"
                  >
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              )}

              {/* EMPTY */}
              {!loading && contacts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-10 text-center text-white/40"
                  >
                    No contact messages found
                  </td>
                </tr>
              )}

              {/* ROWS */}
              {!loading &&
                contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="border-t border-white/10 hover:bg-white/[0.03] transition"
                  >
                    {/* NAME */}
                    <td className="p-4 font-medium">
                      {contact.name}
                    </td>

                    {/* EMAIL */}
                    <td className="p-4 text-white/60 text-xs">
                      {contact.email}
                    </td>
<td className="p-4 text-white/60">
  {contact.mobile}
</td>
                    {/* SUBJECT */}
                    <td className="p-4 text-white/70">
                      {contact.subject}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyle(
                          contact.status
                        )}`}
                      >
                        {contact.status}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="p-4 text-white/50 text-xs">
                      {new Date(
                        contact.createdAt
                      ).toLocaleDateString("en-IN")}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setSelectedContact(contact)
                          }
                          className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(contact)
                          }
                          disabled={
                            deletingId === contact._id
                          }
                          className="bg-red-700 hover:bg-red-800 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs transition"
                        >
                          {deletingId === contact._id
                            ? "..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden">

            {/* HEADER */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Contact Details
              </h2>

              <button
                onClick={() =>
                  setSelectedContact(null)
                }
                className="text-white/40 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5">
              <div>
                <p className="text-white/40 text-xs mb-1">
                  Name
                </p>
                <p>{selectedContact.name}</p>
              </div>

              <div>
                <p className="text-white/40 text-xs mb-1">
                  Email
                </p>
                <p>{selectedContact.email}</p>
              </div>
<div>
  <p className="text-white/40 text-xs mb-1">Mobile</p>
  <p className="font-medium">{selectedContact.mobile}</p>
</div>
              <div>
                <p className="text-white/40 text-xs mb-1">
                  Subject
                </p>
                <p>{selectedContact.subject}</p>
              </div>

              <div>
                <p className="text-white/40 text-xs mb-1">
                  Message
                </p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white/80 leading-relaxed">
                  {selectedContact.message}
                </div>
              </div>

              <div>
                <p className="text-white/40 text-xs mb-1">
                  Status
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyle(
                    selectedContact.status
                  )}`}
                >
                  {selectedContact.status}
                </span>
              </div>

              <div>
                <p className="text-white/40 text-xs mb-1">
                  Submitted On
                </p>

                <p>
                  {new Date(
                    selectedContact.createdAt
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() =>
                  setSelectedContact(null)
                }
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