
// src/pages/seller/DashboardContent.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaUsers,
  FaPlus,
  FaArrowUp,
  FaCrown,
  FaEye,
  FaChevronRight,
  FaEnvelope,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { getMyProducts } from "../../api/productApi";
import { getMyRequirements } from "../../api/requirementApi";
import { getMyProfile } from "../../api/sellerProfileApi";
import { getMyLeads } from "../../api/leadApi";

const planStyle = (plan) => {
  switch (plan) {
    case "gold":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: "⭐",
      };
    case "premium":
      return {
        bg: "bg-purple-100",
        text: "text-purple-700",
        border: "border-purple-200",
        icon: "💎",
      };
    case "basic":
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: "🔵",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-500",
        border: "border-gray-200",
        icon: "—",
      };
  }
};

const COLORS = ["#1447E6", "#F54900", "#10b981", "#f59e0b"];

const DashboardContent = () => {
  const [products, setProducts] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [leads, setLeads] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("leads"); // leads | requirements

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [prodData, reqData, profData, leadsData] = await Promise.all([
          getMyProducts(),
          getMyRequirements(),
          getMyProfile(),
          getMyLeads(),
        ]);
        if (prodData.success) setProducts(prodData.products || []);
        if (reqData.success) setRequirements(reqData.requirements || []);
        if (profData.success) setProfile(profData.seller);
        if (leadsData.success) setLeads(leadsData.leads || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ── STATS ──
  const totalProducts = products.length;
  const approvedProducts = products.filter(
    (p) => p.status === "approved",
  ).length;
  const pendingProducts = products.filter((p) => p.status === "pending").length;
  const totalLeads = leads.length;
  const totalRequirements = requirements.length;

  const thisMonthLeads = leads.filter((l) => {
    const d = new Date(l.createdAt);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;

  // ── CHARTS ──
  const categoryMap = {};
  products.forEach((p) => {
    const name = p.category?.name || "Other";
    categoryMap[name] = (categoryMap[name] || 0) + 1;
  });
  const categoryChartData = Object.entries(categoryMap).map(
    ([name, count]) => ({ name, count }),
  );

  const pieData = [
    { name: "Approved", value: approvedProducts },
    { name: "Pending", value: pendingProducts },
  ].filter((d) => d.value > 0);

  const filteredProducts =
    filter === "all"
      ? products.slice(0, 8)
      : products.filter((p) => p.status === filter).slice(0, 8);

  const plan = planStyle(profile?.subscriptionPlan);

  if (loading)
    return (
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#F54900] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading dashboard...</p>
        </div>
      </main>
    );
  // ── SUBSCRIPTION EXPIRY CHECK ──
  const expireDate = profile?.subscriptionExpire
    ? new Date(profile.subscriptionExpire)
    : null;
  const daysLeft = expireDate
    ? Math.ceil((expireDate - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
   
   {/* ── SUBSCRIPTION WARNING BANNER ── */}
{daysLeft !== null && daysLeft <= 7 && daysLeft > 0 && (
  <div className="bg-orange-50 border border-orange-200 text-orange-700 px-5 py-3 rounded-2xl mb-6 flex items-center justify-between">
    <span>⚠️ Your subscription is expiring in <strong>{daysLeft} day{daysLeft > 1 ? "s" : ""}</strong>! Renew now to keep your products live.</span>
    <Link to="/seller/subscription" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-xl text-sm font-semibold transition ml-4 whitespace-nowrap">
      Renew Now
    </Link>
  </div>
)}

{daysLeft !== null && daysLeft <= 0 && (
  <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-2xl mb-6 flex items-center justify-between">
    <span>❌ Your subscription has expired! Your products are no longer visible to buyers.</span>
    <Link to="/seller/subscription" className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-xl text-sm font-semibold transition ml-4 whitespace-nowrap">
      Subscribe Now
    </Link>
  </div>
)}
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {profile?.name || "Seller"}
          </h1>
          <p className="text-gray-500 mt-1">
            {profile?.companyName || "Manage your products and leads"}
          </p>
        </div>
        <Link
          to="/seller/add-product"
          className="bg-[#F54900] hover:bg-[#d63f00] text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition shadow-md hover:shadow-lg w-fit"
        >
          <FaPlus /> Add Product
        </Link>
      </div>

      {/* ── STATS CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {totalProducts}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:scale-110 transition">
              <FaBoxOpen className="text-[#F54900] text-2xl" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-5 text-green-600 text-sm font-medium">
            <FaArrowUp /> {approvedProducts} approved
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Product Inquiries</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {totalLeads}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition">
              <FaUsers className="text-[#1447E6] text-2xl" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-5 text-green-600 text-sm font-medium">
            <FaArrowUp /> {thisMonthLeads} this month
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Buy Requirements</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {totalRequirements}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition">
              <FaEnvelope className="text-green-600 text-2xl" />
            </div>
          </div>
          <div className="mt-5 text-sm text-gray-500 font-medium">
            Buyer requirements
          </div>
        </div>

        <div
          className={`rounded-3xl p-6 shadow-sm border hover:shadow-xl transition group ${plan.bg} ${plan.border}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${plan.text}`}>Subscription</p>
              <h2 className={`text-2xl font-bold mt-2 capitalize ${plan.text}`}>
                {plan.icon} {profile?.subscriptionPlan || "No Plan"}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/50 flex items-center justify-center group-hover:scale-110 transition">
              <FaCrown className={`text-2xl ${plan.text}`} />
            </div>
          </div>
          <div className={`mt-5 text-xs font-medium ${plan.text}`}>
            {profile?.subscriptionActive ? (
              profile?.subscriptionExpire ? (
                `Expires: ${new Date(profile.subscriptionExpire).toLocaleDateString("en-IN")}`
              ) : (
                "Active"
              )
            ) : (
              <Link to="/seller/subscription" className="underline">
                Upgrade Now →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── CHARTS ── */}
      {categoryChartData.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              Products by Category
            </h2>
            <p className="text-sm text-gray-400 mb-5">
              Distribution across categories
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryChartData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="count" fill="#1447E6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              Product Status
            </h2>
            <p className="text-sm text-gray-400 mb-5">Approved vs Pending</p>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[220px] text-gray-400 text-sm">
                No data yet
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── LOWER SECTION ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* RECENT PRODUCTS */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Recent Products
              </h2>
              <p className="text-sm text-gray-500">
                Your latest added products
              </p>
            </div>
            <Link
              to="/seller/products"
              className="text-[#1447E6] font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <FaChevronRight className="text-xs" />
            </Link>
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            {["all", "approved", "pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition capitalize
                  ${filter === f ? "bg-[#1447E6] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                {f}
              </button>
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-3 text-gray-500 font-medium">Product</th>
                    <th className="pb-3 text-gray-500 font-medium">Category</th>
                    <th className="pb-3 text-gray-500 font-medium">Status</th>
                    <th className="pb-3 text-gray-500 font-medium">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredProducts.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition">
                      <td className="py-3 font-medium text-gray-800">
                        <div className="flex items-center gap-3">
                          {p.images?.[0]?.url && (
                            <img
                              src={p.images[0].url}
                              alt={p.title}
                              className="w-10 h-10 rounded-xl object-cover"
                            />
                          )}
                          <span className="line-clamp-1">{p.title}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500">
                        {p.category?.name || "—"}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                          ${
                            p.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : p.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-gray-800">
                        ₹{p.price?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <FaBoxOpen className="text-4xl mx-auto mb-3 opacity-30" />
              <p>No products found</p>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-5">
          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/seller/add-product"
                className="w-full bg-[#1447E6] hover:bg-blue-700 text-white py-3 rounded-2xl font-medium transition flex items-center justify-center gap-2"
              >
                <FaPlus /> Add New Product
              </Link>
              <Link
                to="/seller/leads"
                className="w-full bg-[#F54900] hover:bg-[#d63f00] text-white py-3 rounded-2xl font-medium transition flex items-center justify-center gap-2"
              >
                <FaUsers /> View Leads
              </Link>
              <Link
                to="/seller/profile"
                className="w-full border border-gray-300 hover:border-[#1447E6] hover:text-[#1447E6] py-3 rounded-2xl font-medium transition flex items-center justify-center gap-2"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          {/* LEADS + REQUIREMENTS TABS */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            {/* TABS */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab("leads")}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition
                  ${activeTab === "leads" ? "bg-[#1447E6] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                Inquiries ({totalLeads})
              </button>
              <button
                onClick={() => setActiveTab("requirements")}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition
                  ${activeTab === "requirements" ? "bg-[#1447E6] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                Requirements ({totalRequirements})
              </button>
            </div>

            {/* LEADS TAB */}
            {activeTab === "leads" && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-gray-800">
                    Recent Inquiries
                  </h2>
                  <Link
                    to="/seller/leads"
                    className="text-[#1447E6] text-xs font-medium"
                  >
                    View All
                  </Link>
                </div>
                {leads.length > 0 ? (
                  <div className="space-y-3">
                    {leads.slice(0, 4).map((l, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-blue-50 transition"
                      >
                        <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-800 font-bold text-sm">
                          {l.buyerName?.charAt(0).toUpperCase() || "B"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-sm line-clamp-1">
                            {l.product?.title || l.productName || "—"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {l.buyerName} • {l.buyerPhone || "—"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400 text-sm">
                    <FaUsers className="text-3xl mx-auto mb-2 opacity-30" />
                    No inquiries yet
                  </div>
                )}
              </>
            )}

            {/* REQUIREMENTS TAB */}
            {activeTab === "requirements" && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-gray-800">
                    Buy Requirements
                  </h2>
                  <Link
                    to="/seller/requirements"
                    className="text-[#1447E6] text-xs font-medium"
                  >
                    View All
                  </Link>
                </div>
                {requirements.length > 0 ? (
                  <div className="space-y-3">
                    {requirements.slice(0, 4).map((r, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-green-50 transition"
                      >
                        <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 text-green-800 font-bold text-sm">
                          {r.buyerName?.charAt(0).toUpperCase() || "B"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-sm line-clamp-1">
                            {r.productName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {r.buyerName} • {r.location || "—"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400 text-sm">
                    <FaEnvelope className="text-3xl mx-auto mb-2 opacity-30" />
                    No requirements yet
                  </div>
                )}
              </>
            )}
          </div>

          {/* TIP BOX */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white">
            <h3 className="font-bold text-lg mb-2">Improve Your Sales 🚀</h3>
            <p className="text-sm text-orange-100 leading-relaxed">
              Complete your profile and add more products to receive better
              buyer enquiries.
            </p>
            <Link
              to="/seller/profile"
              className="mt-4 inline-block bg-white text-orange-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-50 transition"
            >
              Complete Profile →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
