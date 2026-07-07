// pages/admin/AdminPlans.jsx

import { useEffect, useState } from "react";
import { adminGetPlans, adminUpdatePlan } from "../../api/planApi";
import { FaCrown, FaRocket, FaStar, FaEdit } from "react-icons/fa";

const PLAN_CONFIG = {
  silver:  { icon: <FaRocket />,  color: "text-blue-400",   bg: "bg-blue-500/20"   },
  gold:    { icon: <FaStar />,    color: "text-purple-400", bg: "bg-purple-500/20" },
  diamond: { icon: <FaCrown />,   color: "text-yellow-400", bg: "bg-yellow-500/20" },
};

export default function AdminPlans() {
  const [plans,    setPlans]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [editPlan, setEditPlan] = useState(null); // { _id, key, amount, duration }
  const [form,     setForm]     = useState({ amount: "", duration: "" });
  const [saving,   setSaving]   = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await adminGetPlans();
      setPlans(data.plans || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlans(); }, []);

  const openEdit = (plan) => {
    setEditPlan(plan);
    setForm({ amount: plan.amount, duration: plan.duration });
  };

  const handleSave = async () => {
    if (!form.amount || !form.duration) {
      alert("Please fill all fields!");
      return;
    }
    setSaving(true);
    try {
      await adminUpdatePlan(editPlan._id, {
        amount:   Number(form.amount),
        duration: Number(form.duration),
      });
      setEditPlan(null);
      fetchPlans();
    } catch {
      alert("Update failed!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-[#0A0A0F] min-h-screen text-white">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <p className="text-white/40 text-sm mt-1">Manage plan pricing and duration</p>
      </div>

      {/* PLANS */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => {
            const config = PLAN_CONFIG[plan.key] || PLAN_CONFIG.silver;
            return (
              <div key={plan._id}
                className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">

                {/* PLAN ICON + NAME */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 ${config.bg} rounded-xl flex items-center justify-center ${config.color} text-xl`}>
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg capitalize">{plan.key}</h3>
                    <p className="text-white/40 text-xs">Plan</p>
                  </div>
                </div>

                {/* PRICE + DURATION */}
                <div className="space-y-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/40 text-xs mb-1">Price</p>
                    <p className="text-2xl font-bold">₹{plan.amount}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/40 text-xs mb-1">Duration</p>
                    <p className="text-2xl font-bold">{plan.duration} <span className="text-sm font-normal text-white/50">days</span></p>
                  </div>
                </div>

                {/* EDIT BUTTON */}
                <button onClick={() => openEdit(plan)}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2">
                  <FaEdit /> Edit Plan
                </button>

              </div>
            );
          })}
        </div>
      )}

      {/* EDIT MODAL */}
      {editPlan && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden">

            {/* MODAL HEADER */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-semibold capitalize">{editPlan.key} Plan Edit</h2>
              <button onClick={() => setEditPlan(null)} className="text-white/40 hover:text-white text-xl">✕</button>
            </div>

            {/* FORM */}
            <div className="p-6 space-y-4">
              <div>
                <label className="text-white/50 text-xs mb-1 block">Price (₹) *</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                  placeholder="e.g. 999"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Duration (days) *</label>
                <input
                  type="number"
                  value={form.duration}
                  onChange={e => setForm({ ...form, duration: e.target.value })}
                  placeholder="e.g. 30"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
              <button onClick={() => setEditPlan(null)}
                className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl text-sm font-medium transition">
                {saving ? "Saving..." : "Update Plan"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}