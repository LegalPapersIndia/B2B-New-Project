
// src/Pages/seller/SellerLeads.jsx

import React, { useState, useEffect } from "react";
import { FaInbox, FaClipboardList, FaLayerGroup } from "react-icons/fa";
import { getMyLeads, updateLeadStatus, deleteLead, deleteMultipleLeads } from "../../api/leadApi";
import { getMyRequirements, deleteRequirement, deleteMultipleRequirements, updateRequirementStatus } from "../../api/requirementApi";
import AlertPopup from "../../components/common/AlertPopup";
import VerifyLeadsTable from "../../components/seller/VerifyLeadsTable";
import DirectLeadsTable from "../../components/seller/DirectLeadsTable";
import AllLeadsView from "../../components/seller/AllLeadsView";

const SellerLeads = () => {
  const [activeTab, setActiveTab] = useState("verify");

  // LEADS
  const [leads, setLeads]               = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsError, setLeadsError]     = useState("");
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [updatingId, setUpdatingId]     = useState(null);

  // REQUIREMENTS
  const [requirements, setRequirements]               = useState([]);
  const [requirementsLoading, setRequirementsLoading] = useState(true);
  const [requirementsError, setRequirementsError]     = useState("");
  const [selectedReqIds, setSelectedReqIds]           = useState([]);
  const [updatingReqId, setUpdatingReqId]             = useState(null);

  // ALERT
  const [alert, setAlert] = useState({ show: false, type: "error", message: "", mode: "info", confirmAction: null });

  const showConfirm = (message, onConfirm) =>
    setAlert({ show: true, type: "warning", message, mode: "confirm", confirmAction: onConfirm });

  const showInfo = (type, message) =>
    setAlert({ show: true, type, message, mode: "info", confirmAction: null });

  const closeAlert = () =>
    setAlert({ show: false, type: "error", message: "", mode: "info", confirmAction: null });

  const handleAlertConfirm = () => {
    const action = alert.confirmAction;
    closeAlert();
    if (action) action();
  };

  // FETCH LEADS
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLeadsLoading(true);
        const data = await getMyLeads();
        if (data.success) setLeads(data.leads);
        else setLeadsError(data.message || "Failed to fetch leads");
      } catch { setLeadsError("Server error."); }
      finally { setLeadsLoading(false); }
    };
    fetchLeads();
  }, []);

  // FETCH REQUIREMENTS
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        setRequirementsLoading(true);
        const data = await getMyRequirements();
        if (data.success) setRequirements(data.requirements);
        else setRequirementsError(data.message || "Failed to fetch requirements");
      } catch { setRequirementsError("Server error."); }
      finally { setRequirementsLoading(false); }
    };
    fetchRequirements();
  }, []);

  // STATUS — LEADS
  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      const data = await updateLeadStatus(id, status);
      if (data.success) setLeads((prev) => prev.map((l) => l._id === id ? { ...l, status } : l));
    } catch (err) { console.error(err); }
    finally { setUpdatingId(null); }
  };

  // STATUS — REQUIREMENTS
  const handleReqStatusChange = async (id, status) => {
    try {
      setUpdatingReqId(id);
      const data = await updateRequirementStatus(id, status);
      if (data.success) setRequirements((prev) => prev.map((r) => r._id === id ? { ...r, status } : r));
    } catch (err) { console.error(err); }
    finally { setUpdatingReqId(null); }
  };

  // DELETE SINGLE LEAD
  const handleDeleteLead = (id) => {
    showConfirm("Delete this lead? This cannot be undone.", async () => {
      try {
        const data = await deleteLead(id);
        if (data.success) {
          setLeads((prev) => prev.filter((l) => l._id !== id));
          setSelectedLeadIds((prev) => prev.filter((i) => i !== id));
        } else showInfo("error", data.message || "Delete failed");
      } catch { showInfo("error", "Server error."); }
    });
  };

  // DELETE MULTIPLE LEADS
  const handleDeleteMultipleLeads = () => {
    if (!selectedLeadIds.length) return;
    showConfirm(`Delete ${selectedLeadIds.length} lead(s)? This cannot be undone.`, async () => {
      try {
        const data = await deleteMultipleLeads(selectedLeadIds);
        if (data.success) { setLeads((prev) => prev.filter((l) => !selectedLeadIds.includes(l._id))); setSelectedLeadIds([]); }
        else showInfo("error", data.message || "Delete failed");
      } catch { showInfo("error", "Server error."); }
    });
  };

  // DELETE SINGLE REQ
  const handleDeleteReq = (id) => {
    showConfirm("Remove this verify lead? This cannot be undone.", async () => {
      try {
        const data = await deleteRequirement(id);
        if (data.success) {
          setRequirements((prev) => prev.filter((r) => r._id !== id));
          setSelectedReqIds((prev) => prev.filter((i) => i !== id));
        } else showInfo("error", data.message || "Delete failed");
      } catch { showInfo("error", "Server error."); }
    });
  };

  // DELETE MULTIPLE REQS
  const handleDeleteMultipleReqs = () => {
    if (!selectedReqIds.length) return;
    showConfirm(`Remove ${selectedReqIds.length} verify lead(s)?`, async () => {
      try {
        const data = await deleteMultipleRequirements(selectedReqIds);
        if (data.success) { setRequirements((prev) => prev.filter((r) => !selectedReqIds.includes(r._id))); setSelectedReqIds([]); }
        else showInfo("error", data.message || "Delete failed");
      } catch { showInfo("error", "Server error."); }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TABS */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button onClick={() => setActiveTab("verify")}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition
            ${activeTab === "verify" ? "bg-orange-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-orange-600 hover:text-orange-600"}`}>
          <FaClipboardList />
          Verify Leads
          {requirements.length > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === "verify" ? "bg-white text-orange-600" : "bg-orange-100 text-orange-700"}`}>
              {requirements.length}
            </span>
          )}
        </button>

        <button onClick={() => setActiveTab("leads")}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition
            ${activeTab === "leads" ? "bg-blue-800 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-800 hover:text-blue-800"}`}>
          <FaInbox />
          Direct Leads
          {leads.length > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === "leads" ? "bg-white text-blue-800" : "bg-blue-100 text-blue-700"}`}>
              {leads.length}
            </span>
          )}
        </button>

        <button onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition
            ${activeTab === "all" ? "bg-gray-800 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-800 hover:text-gray-800"}`}>
          <FaLayerGroup />
          All Leads
          {(leads.length + requirements.length) > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === "all" ? "bg-white text-gray-800" : "bg-gray-100 text-gray-700"}`}>
              {leads.length + requirements.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "verify" && (
        <VerifyLeadsTable
          requirements={requirements}
          requirementsLoading={requirementsLoading}
          requirementsError={requirementsError}
          selectedReqIds={selectedReqIds}
          setSelectedReqIds={setSelectedReqIds}
          handleDeleteReq={handleDeleteReq}
          handleDeleteMultipleReqs={handleDeleteMultipleReqs}
          handleReqStatusChange={handleReqStatusChange}
          updatingReqId={updatingReqId}
        />
      )}

      {activeTab === "leads" && (
        <DirectLeadsTable
          leads={leads}
          leadsLoading={leadsLoading}
          leadsError={leadsError}
          selectedLeadIds={selectedLeadIds}
          setSelectedLeadIds={setSelectedLeadIds}
          handleDeleteLead={handleDeleteLead}
          handleDeleteMultipleLeads={handleDeleteMultipleLeads}
          handleStatusChange={handleStatusChange}
          updatingId={updatingId}
        />
      )}

      {activeTab === "all" && (
        <AllLeadsView
          leads={leads}
          requirements={requirements}
          leadsLoading={leadsLoading}
          requirementsLoading={requirementsLoading}
          setActiveTab={setActiveTab}
          setSelectedLead={() => {}}
          setSelectedReq={() => {}}
        />
      )}

      {/* ALERT POPUP */}
      {alert.show && (
        <AlertPopup type={alert.type} message={alert.message}
          onClose={alert.mode === "confirm" ? undefined : closeAlert}
          autoClose={alert.mode !== "confirm"}>
          {alert.mode === "confirm" && (
            <div className="px-7 pb-6 flex gap-3">
              <button onClick={closeAlert}
                className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all">
                Cancel
              </button>
              <button onClick={handleAlertConfirm}
                className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-red-500 hover:bg-red-600 text-white transition-all">
                Yes, Delete
              </button>
            </div>
          )}
        </AlertPopup>
      )}
    </div>
  );
};

export default SellerLeads;