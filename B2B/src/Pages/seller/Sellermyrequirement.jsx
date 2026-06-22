// src/Pages/seller/SellerMyRequirement.jsx

import React, { useState, useEffect } from "react";
import { ClipboardList } from "lucide-react";
import PostRequirementForm from "../../components/seller/PostRequirementForm";
import MyRequirementsList from "../../components/seller/MyRequirementsList";
import { getMyPostedRequirements } from "../../api/requirementApi";

export default function SellerMyRequirement() {

  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading]           = useState(true);

  // ── FETCH MY POSTED REQUIREMENTS ──
  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const data = await getMyPostedRequirements();
      if (data.success) {
        setRequirements(data.requirements);
      }
    } catch (err) {
      console.error("fetchRequirements error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            <ClipboardList className="w-4 h-4" />
            Buyer Tools
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Requirement
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            Need something for your own business? Post your requirement and get quotes from other suppliers.
          </p>
        </div>

        {/* FORM */}
        <div className="mb-8">
          {/* ✅ jab form se successfully post ho jaye, list refresh karo */}
          <PostRequirementForm onPosted={fetchRequirements} />
        </div>

        {/* LIST */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            Your Posted Requirements
          </h2>
          <MyRequirementsList requirements={requirements} loading={loading} />
        </div>

      </div>
    </div>
  );
}