// import { useState } from "react";
// import Sidebar from "../../components/admin/Sidebar";
// import Navbar from "../../components/admin/Navbar";

// // ─── Stats Data ───
// const stats = [
//   {
//     label: "Total Sellers",
//     value: "1,284",
//     change: "+12%",
//     positive: true,
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//         <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//         <circle cx="9" cy="7" r="4" />
//         <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//         <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//       </svg>
//     ),
//     color: "text-blue-400",
//     bg: "bg-blue-500/10",
//     border: "border-blue-500/20",
//   },
//   {
//     label: "Total Products",
//     value: "8,472",
//     change: "+8%",
//     positive: true,
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//         <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//         <line x1="3" y1="6" x2="21" y2="6" />
//         <path d="M16 10a4 4 0 0 1-8 0" />
//       </svg>
//     ),
//     color: "text-violet-400",
//     bg: "bg-violet-500/10",
//     border: "border-violet-500/20",
//   },
//   {
//     label: "Total Enquiries",
//     value: "3,891",
//     change: "+23%",
//     positive: true,
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//         <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//       </svg>
//     ),
//     color: "text-emerald-400",
//     bg: "bg-emerald-500/10",
//     border: "border-emerald-500/20",
//   },
//   {
//     label: "Pending Approvals",
//     value: "38",
//     change: "-5%",
//     positive: false,
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//         <circle cx="12" cy="12" r="10" />
//         <polyline points="12 6 12 12 16 14" />
//       </svg>
//     ),
//     color: "text-amber-400",
//     bg: "bg-amber-500/10",
//     border: "border-amber-500/20",
//   },
// ];

// // ─── Recent Sellers ───
// const recentSellers = [
//   { name: "Ramesh Steel Co.", email: "ramesh@steel.com", category: "Steel", status: "pending", date: "18 May 2025" },
//   { name: "Gupta Plastics", email: "gupta@plastics.com", category: "Plastics", status: "approved", date: "17 May 2025" },
//   { name: "Singh Exports", email: "singh@exports.com", category: "Textiles", status: "approved", date: "16 May 2025" },
//   { name: "Kumar Chemicals", email: "kumar@chem.com", category: "Chemicals", status: "pending", date: "15 May 2025" },
//   { name: "Patel Foods Ltd.", email: "patel@foods.com", category: "Food", status: "rejected", date: "14 May 2025" },
// ];

// // ─── Recent Products ───
// const recentProducts = [
//   { name: "MS Steel Pipe 2 inch", seller: "Ramesh Steel Co.", category: "Steel", status: "pending", price: "₹120/kg" },
//   { name: "HDPE Granules", seller: "Gupta Plastics", category: "Plastics", status: "approved", price: "₹85/kg" },
//   { name: "Cotton Fabric Roll", seller: "Singh Exports", category: "Textiles", status: "approved", price: "₹250/m" },
//   { name: "HCL Industrial", seller: "Kumar Chemicals", category: "Chemicals", status: "pending", price: "₹45/L" },
//   { name: "Basmati Rice 25kg", seller: "Patel Foods Ltd.", category: "Food", status: "rejected", price: "₹1800/bag" },
// ];

// // ─── Recent Activity ───
// const activities = [
//   { text: "New seller Ramesh Steel Co. registered", time: "2 mins ago", type: "seller" },
//   { text: "Product MS Steel Pipe approved", time: "15 mins ago", type: "product" },
//   { text: "Enquiry received for HDPE Granules", time: "1 hour ago", type: "enquiry" },
//   { text: "Seller Kumar Chemicals pending review", time: "2 hours ago", type: "seller" },
//   { text: "Product Basmati Rice rejected", time: "3 hours ago", type: "reject" },
//   { text: "New category Electronics added", time: "5 hours ago", type: "category" },
// ];

// // ─── Chart Bars (simple CSS bar chart) ───
// const chartData = [
//   { month: "Jan", sellers: 40, products: 65 },
//   { month: "Feb", sellers: 55, products: 80 },
//   { month: "Mar", sellers: 45, products: 70 },
//   { month: "Apr", sellers: 70, products: 90 },
//   { month: "May", sellers: 85, products: 110 },
//   { month: "Jun", sellers: 60, products: 95 },
//   { month: "Jul", sellers: 90, products: 120 },
// ];

// const maxVal = 130;

// // ─── Status Badge ───
// function StatusBadge({ status }) {
//   const map = {
//     approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
//     pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
//     rejected: "bg-red-500/15 text-red-400 border-red-500/20",
//   };
//   return (
//     <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${map[status]}`}>
//       {status.charAt(0).toUpperCase() + status.slice(1)}
//     </span>
//   );
// }

// // ─── Activity Icon ───
// function ActivityDot({ type }) {
//   const map = {
//     seller: "bg-blue-500",
//     product: "bg-violet-500",
//     enquiry: "bg-emerald-500",
//     reject: "bg-red-500",
//     category: "bg-amber-500",
//   };
//   return <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${map[type] || "bg-white/20"}`} />;
// }

// // ─── Main Dashboard ───
// export default function AdminDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#080810] flex">
//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
//         {/* Navbar */}
//         <Navbar setIsOpen={setSidebarOpen} />

//         {/* Page Content */}
//         <main className="flex-1 p-4 sm:p-6 flex flex-col gap-6">

//           {/* ── Stats Cards ── */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//             {stats.map((stat) => (
//               <div
//                 key={stat.label}
//                 className="bg-[#0D0D14] border border-white/[0.06] rounded-2xl p-5 flex flex-col gap-4 hover:border-white/10 transition-colors"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center ${stat.color}`}>
//                     {stat.icon}
//                   </div>
//                   <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stat.positive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
//                     {stat.change}
//                   </span>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
//                   <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ── Chart + Activity Row ── */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

//             {/* Bar Chart */}
//             <div className="lg:col-span-2 bg-[#0D0D14] border border-white/[0.06] rounded-2xl p-5">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h2 className="text-sm font-semibold text-slate-100">Growth Overview</h2>
//                   <p className="text-xs text-white/30 mt-0.5">Sellers vs Products — 2025</p>
//                 </div>
//                 <div className="flex items-center gap-3 text-xs text-white/40">
//                   <span className="flex items-center gap-1.5">
//                     <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" /> Sellers
//                   </span>
//                   <span className="flex items-center gap-1.5">
//                     <span className="w-2.5 h-2.5 rounded-sm bg-violet-500 inline-block" /> Products
//                   </span>
//                 </div>
//               </div>
//               {/* Bars */}
//               <div className="flex items-end gap-3 h-40">
//                 {chartData.map((d) => (
//                   <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
//                     <div className="w-full flex items-end gap-0.5 h-32">
//                       <div
//                         className="flex-1 bg-blue-500/70 rounded-t-md hover:bg-blue-500 transition-colors"
//                         style={{ height: `${(d.sellers / maxVal) * 100}%` }}
//                       />
//                       <div
//                         className="flex-1 bg-violet-500/70 rounded-t-md hover:bg-violet-500 transition-colors"
//                         style={{ height: `${(d.products / maxVal) * 100}%` }}
//                       />
//                     </div>
//                     <span className="text-[10px] text-white/30">{d.month}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-[#0D0D14] border border-white/[0.06] rounded-2xl p-5">
//               <h2 className="text-sm font-semibold text-slate-100 mb-4">Recent Activity</h2>
//               <div className="flex flex-col gap-4">
//                 {activities.map((a, i) => (
//                   <div key={i} className="flex gap-3">
//                     <ActivityDot type={a.type} />
//                     <div>
//                       <p className="text-xs text-white/70 leading-relaxed">{a.text}</p>
//                       <p className="text-[10px] text-white/25 mt-0.5">{a.time}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ── Tables Row ── */}
//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

//             {/* Recent Sellers Table */}
//             <div className="bg-[#0D0D14] border border-white/[0.06] rounded-2xl p-5">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-sm font-semibold text-slate-100">Recent Sellers</h2>
//                 <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
//                   View all →
//                 </button>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-xs">
//                   <thead>
//                     <tr className="border-b border-white/[0.05]">
//                       <th className="text-left text-white/30 font-medium pb-3 pr-3">Seller</th>
//                       <th className="text-left text-white/30 font-medium pb-3 pr-3">Category</th>
//                       <th className="text-left text-white/30 font-medium pb-3">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-white/[0.03]">
//                     {recentSellers.map((s, i) => (
//                       <tr key={i} className="hover:bg-white/[0.02] transition-colors">
//                         <td className="py-3 pr-3">
//                           <div className="flex items-center gap-2">
//                             <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500/30 to-violet-500/30 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
//                               {s.name[0]}
//                             </div>
//                             <div>
//                               <div className="text-white/80 font-medium



import { useState } from "react";

// ─── Stats Data ───
const stats = [
  {
    label: "Total Sellers",
    value: "1,284",
    change: "+12%",
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },

  {
    label: "Total Products",
    value: "8,472",
    change: "+8%",
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },

  {
    label: "Total Enquiries",
    value: "3,891",
    change: "+23%",
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },

  {
    label: "Pending Approvals",
    value: "38",
    change: "-5%",
    positive: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

// ─── Recent Sellers ───
const recentSellers = [
  {
    name: "Ramesh Steel Co.",
    email: "ramesh@steel.com",
    category: "Steel",
    status: "pending",
  },

  {
    name: "Gupta Plastics",
    email: "gupta@plastics.com",
    category: "Plastics",
    status: "approved",
  },

  {
    name: "Singh Exports",
    email: "singh@exports.com",
    category: "Textiles",
    status: "approved",
  },

  {
    name: "Kumar Chemicals",
    email: "kumar@chem.com",
    category: "Chemicals",
    status: "pending",
  },
];

// ─── Status Badge ───
function StatusBadge({ status }) {
  const styles = {
    approved: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    pending: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    rejected: "bg-red-500/15 text-red-400 border border-red-500/20",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-[11px] font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

// ─── Main Dashboard ───
export default function AdminDashboard() {

  return (
    <div className="min-h-screen bg-[#080810] p-4 sm:p-6 flex flex-col gap-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0D0D14] border border-white/[0.06] rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center ${stat.color}`}
              >
                {stat.icon}
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  stat.positive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {stat.change}
              </span>
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-bold text-white">
                {stat.value}
              </h2>

              <p className="text-sm text-white/40 mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Sellers */}
      <div className="bg-[#0D0D14] border border-white/[0.06] rounded-2xl p-5">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">
            Recent Sellers
          </h2>

          <button className="text-sm text-blue-400 hover:text-blue-300">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 text-white/40 font-medium">Seller</th>
                <th className="text-left py-3 text-white/40 font-medium">Category</th>
                <th className="text-left py-3 text-white/40 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentSellers.map((s, i) => (
                <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">

                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-white font-semibold">
                        {s.name[0]}
                      </div>

                      <div>
                        <div className="text-white/80 font-medium">{s.name}</div>
                        <div className="text-[11px] text-white/35 mt-0.5">
                          {s.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-white/60">{s.category}</td>

                  <td className="py-4">
                    <StatusBadge status={s.status} />
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