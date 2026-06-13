

// // B2B-Abhishek/Admin/src/Pages/Admin/AdminDashboard.jsx


// import { useState, useEffect, useRef } from "react";
// import {
//   Users,
//   Package,
//   MessageSquare,
//   TrendingUp,
//   TrendingDown,
//   MapPin,
//   Zap,
//   Search,
//   BarChart3,
//   RefreshCw,
//   Send,
//   Bot,
//   User,
//   FileText,
//   Activity,
//   ChevronRight,
// } from "lucide-react";

// import { getAllSellers } from "../../api/sellerAuthApi";
// import { getAdminProducts } from "../../api/productApi";
// import { getAllRequirements } from "../../api/requirementApi";
// import { getAllLeads } from "../../api/leadApi";
// import { useNavigate } from "react-router-dom";

// // ─── Utilities ───────────────────────────────────────────────
// const fmtNum = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n));

// const timeAgo = (date) => {
//   const diff = Date.now() - new Date(date).getTime();
//   const m = Math.floor(diff / 60000);
//   if (m < 1) return "just now";
//   if (m < 60) return `${m}m ago`;
//   const h = Math.floor(m / 60);
//   if (h < 24) return `${h}h ago`;
//   return `${Math.floor(h / 24)}d ago`;
// };

// const initials = (name = "") =>
//   name
//     .split(" ")
//     .slice(0, 2)
//     .map((w) => w[0])
//     .join("")
//     .toUpperCase() || "?";

// // ─── Badge ───────────────────────────────────────────────────
// function Badge({ status }) {
//   const map = {
//     approved: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
//     pending: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
//     rejected: "bg-red-500/15 text-red-400 border border-red-500/20",
//     active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
//     inactive: "bg-slate-500/15 text-slate-400 border border-slate-500/20",
//     new: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
//     viewed: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
//     contacted: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
//     converted:
//       "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
//   };
//   const cls = map[status?.toLowerCase()] || map.pending;
//   return (
//     <span
//       className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${cls}`}
//     >
//       {status || "pending"}
//     </span>
//   );
// }

// // ─── Stat Card ───────────────────────────────────────────────
// function StatCard({
//   icon: Icon,
//   label,
//   value,
//   change,
//   positive,
//   iconCls,
//   glowCls,
//   loading,
// }) {
//   return (
//     <div className="relative overflow-hidden bg-[#0D0D18] border border-white/[0.06] rounded-2xl p-5 transition-all duration-300 hover:border-white/[0.12]">
//       <div
//         className={`absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none ${glowCls}`}
//       />
//       <div className="flex items-center justify-between mb-4">
//         <div
//           className={`w-10 h-10 rounded-xl flex items-center justify-center border ${iconCls}`}
//         >
//           <Icon size={18} />
//         </div>
//         {change && (
//           <span
//             className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
//               positive
//                 ? "bg-emerald-500/10 text-emerald-400"
//                 : "bg-red-500/10 text-red-400"
//             }`}
//           >
//             {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
//             {change}
//           </span>
//         )}
//       </div>
//       {loading ? (
//         <div className="h-8 w-3/5 bg-white/[0.06] rounded-lg animate-pulse mb-1.5" />
//       ) : (
//         <p className="text-3xl font-bold text-white tracking-tight leading-none">
//           {value}
//         </p>
//       )}
//       <p className="text-[13px] text-white/40 mt-1.5 font-medium">{label}</p>
//     </div>
//   );
// }

// // ─── Chat Widget ─────────────────────────────────────────────
// const SUGGESTIONS = [
//   "Kitne sellers hain?",
//   "Total products?",
//   "Total leads?",
//   "Requirements count?",
  
// ];

// function ChatWidget({ stats }) {
//   const [messages, setMessages] = useState([
//     {
//       role: "bot",
//       text: "Namaste! Main aapka B2B Admin Assistant hoon. Dashboard ke baare mein kuch poochein.",
//       time: new Date(),
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, typing]);

//   const getReply = (q) => {
//     const lq = q.toLowerCase();
//     if (lq.includes("seller"))
//       return `Platform pe total ${fmtNum(stats.totalSellers)} verified sellers hain.`;
//     if (lq.includes("product"))
//       return `Total ${fmtNum(stats.totalProducts)} products listed hain.`;
//     if (lq.includes("lead"))
//       return `Total ${fmtNum(stats.totalLeads)} leads generate hue hain platform pe.`;
//     if (lq.includes("enquir") || lq.includes("requirement"))
//       return `${fmtNum(stats.totalEnquiries)} buy requirements submit hui hain buyers ki taraf se.`;
//     return `Dashboard Summary:\n• Sellers: ${fmtNum(stats.totalSellers)}\n• Products: ${fmtNum(stats.totalProducts)}\n• Leads: ${fmtNum(stats.totalLeads)}\n• Requirements: ${fmtNum(stats.totalEnquiries)}`;
//   };

//   const send = (text) => {
//     const q = (text || input).trim();
//     if (!q) return;
//     setMessages((m) => [...m, { role: "user", text: q, time: new Date() }]);
//     setInput("");
//     setTyping(true);
//     setTimeout(
//       () => {
//         setTyping(false);
//         setMessages((m) => [
//           ...m,
//           { role: "bot", text: getReply(q), time: new Date() },
//         ]);
//       },
//       800 + Math.random() * 500,
//     );
//   };

//   return (
//     <div className="bg-[#0D0D18] border border-white/[0.06] rounded-2xl flex flex-col h-[520px]">
//       {/* Header */}
//       <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
//           <Bot size={17} className="text-white" />
//         </div>
//         <div>
//           <p className="text-white text-sm font-semibold">Admin Assistant</p>
//           <div className="flex items-center gap-1.5">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//             <span className="text-[11px] text-emerald-400 font-medium">
//               Online
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//           >
//             {msg.role === "bot" && (
//               <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
//                 <Bot size={13} className="text-white" />
//               </div>
//             )}
//             <div
//               className={`max-w-[78%] px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
//                 msg.role === "user"
//                   ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
//                   : "bg-white/[0.06] text-white/80 rounded-2xl rounded-bl-sm"
//               }`}
//             >
//               {msg.text}
//               <p
//                 className={`text-[10px] mt-1 ${msg.role === "user" ? "text-blue-200/60 text-right" : "text-white/25"}`}
//               >
//                 {msg.time.toLocaleTimeString("en-IN", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </p>
//             </div>
//             {msg.role === "user" && (
//               <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
//                 <User size={13} className="text-white/50" />
//               </div>
//             )}
//           </div>
//         ))}

//         {typing && (
//           <div className="flex items-end gap-2">
//             <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
//               <Bot size={13} className="text-white" />
//             </div>
//             <div className="bg-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
//               {[0, 1, 2].map((j) => (
//                 <span
//                   key={j}
//                   className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
//                   style={{ animationDelay: `${j * 0.15}s` }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         <div ref={bottomRef} />
//       </div>

//       {/* Suggestions */}
//       <div className="px-4 pb-2 flex flex-wrap gap-1.5">
//         {SUGGESTIONS.map((s) => (
//           <button
//             key={s}
//             onClick={() => send(s)}
//             className="text-[11px] font-medium px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors"
//           >
//             {s}
//           </button>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="flex items-center gap-2 px-4 pb-4">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && send()}
//           placeholder="Kuch poochein..."
//           className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder-white/25 outline-none focus:border-blue-500/40 transition-colors"
//         />
//         <button
//           onClick={() => send()}
//           className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
//         >
//           <Send size={15} className="text-white" />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Main Dashboard ──────────────────────────────────────────
// export default function AdminDashboard() {
//   const [sellers, setSellers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [requirements, setRequirements] = useState([]);
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeTab, setActiveTab] = useState("sellers");
//   const [search, setSearch] = useState("");

//   const navigate = useNavigate();
//   const viewAllRoutes = {
//     sellers: "/admin/sellers",
//     products: "/admin/products",
//     leads: "/admin/enquiries",
//     requirements: "/admin/enquiries",
//   };

//   const fetchAll = async (isRefresh = false) => {
//     isRefresh ? setRefreshing(true) : setLoading(true);
//     try {
//       const [s, p, r, l] = await Promise.all([
//         getAllSellers(),
//         getAdminProducts("all"),
//         getAllRequirements(),
//         getAllLeads(),
//       ]);
//       setSellers(s?.data?.sellers || []);
//       setProducts(p?.products || []);
//       setRequirements(r?.requirements || []);
//       setLeads(l?.leads || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const stats = {
//     totalSellers: sellers.length,
//     totalProducts: products.length,
//     totalEnquiries: requirements.length,
//     totalLeads: leads.length,
//   };

//   const statCards = [
//     {
//       icon: Users,
//       label: "Total Sellers",
//       value: fmtNum(stats.totalSellers),
//       change: "+12%",
//       positive: true,
//       iconCls: "bg-blue-500/10 border-blue-500/20 text-blue-400",
//       glowCls: "bg-blue-500",
//     },
//     {
//       icon: Package,
//       label: "Total Products",
//       value: fmtNum(stats.totalProducts),
//       change: "+8%",
//       positive: true,
//       iconCls: "bg-violet-500/10 border-violet-500/20 text-violet-400",
//       glowCls: "bg-violet-500",
//     },
//     {
//       icon: Zap,
//       label: "Total Leads",
//       value: fmtNum(stats.totalLeads),
//       change: "+18%",
//       positive: true,
//       iconCls: "bg-amber-500/10 border-amber-500/20 text-amber-400",
//       glowCls: "bg-amber-500",
//     },
//     {
//       icon: MessageSquare,
//       label: "Buy Requirements",
//       value: fmtNum(stats.totalEnquiries),
//       change: "+23%",
//       positive: true,
//       iconCls: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
//       glowCls: "bg-emerald-500",
//     },
//   ];

//   const tabs = [
//     { key: "sellers", label: "Sellers", icon: Users, count: sellers.length },
//     {
//       key: "products",
//       label: "Products",
//       icon: Package,
//       count: products.length,
//     },
//     { key: "leads", label: "Leads", icon: Zap, count: leads.length },
//     {
//       key: "requirements",
//       label: "Requirements",
//       icon: MessageSquare,
//       count: requirements.length,
//     },
//   ];

//   // ─── Search filter ───────────────────────────────────────
//   const filterData = (arr, keys) => {
//     if (!Array.isArray(arr)) return [];
//     return arr
//       .filter(
//         (item) =>
//           !search ||
//           keys.some((k) =>
//             String(item[k] || "")
//               .toLowerCase()
//               .includes(search.toLowerCase()),
//           ),
//       )
//       .slice(0, 8);
//   };

//   const tableData = {
//     sellers: filterData(sellers, ["name", "companyName", "email"]),
//     products: filterData(products, ["title"]),
//     leads: filterData(leads, ["buyerName", "buyerEmail"]),
//     requirements: filterData(requirements, ["productName", "buyerName"]),
//   };

//   const columns = {
//     sellers: ["Seller", "Company", "Email", "Location", "Plan", "Subscription"],
//     products: ["Product", "Seller", "Category", "Price", "Status"],
//     leads: ["Buyer", "Phone", "Product", "Quantity", "Seller", "Status"],
//     requirements: [
//       "Product",
//       "Buyer",
//       "Phone",
//       "Category",
//       "Quantity",
//       "Budget",
//       "Date",
//     ],
//   };

//   // ─── Row renderers (matching exact fields from your pages) ──
//   const renderRow = {
//     sellers: (s, i) => (
//       <tr
//         key={i}
//         className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
//       >
//         <td className="px-4 py-3.5">
//           <div className="flex items-center gap-2.5">
//             <div className="w-8 h-8 rounded-xl overflow-hidden bg-blue-800/30 flex items-center justify-center flex-shrink-0">
//               {s.profileImage?.url ? (
//                 <img
//                   src={s.profileImage.url}
//                   alt={s.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-blue-400 font-bold text-xs">
//                   {s.name?.charAt(0).toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <span className="text-white/80 font-semibold text-[13px]">
//               {s.name || "—"}
//             </span>
//           </div>
//         </td>
//         <td className="px-4 py-3.5">
//           <p className="text-white/70 text-[13px]">{s.companyName || "—"}</p>
//           {s.companyType && (
//             <p className="text-white/30 text-xs">{s.companyType}</p>
//           )}
//         </td>
//         <td className="px-4 py-3.5 text-white/40 text-xs">{s.email || "—"}</td>
//         <td className="px-4 py-3.5 text-white/40 text-xs">
//           {[s.city, s.state].filter(Boolean).join(", ") || "—"}
//         </td>
//         <td className="px-4 py-3.5">
//           <span
//             className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
//               s.subscriptionPlan === "gold"
//                 ? "bg-yellow-500/20 text-yellow-400"
//                 : s.subscriptionPlan === "premium"
//                   ? "bg-purple-500/20 text-purple-400"
//                   : s.subscriptionPlan === "basic"
//                     ? "bg-blue-500/20 text-blue-400"
//                     : "bg-gray-500/20 text-gray-400"
//             }`}
//           >
//             {s.subscriptionPlan || "No Plan"}
//           </span>
//         </td>
//         <td className="px-4 py-3.5">
//           <span
//             className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
//               s.subscriptionActive
//                 ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
//                 : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
//             }`}
//           >
//             {s.subscriptionActive ? "Active" : "Pending"}
//           </span>
//         </td>
//       </tr>
//     ),

//     products: (p, i) => (
//       <tr
//         key={i}
//         className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
//       >
//         <td className="px-4 py-3.5">
//           <div className="flex items-center gap-2.5">
//             {p.images?.[0]?.url ? (
//               <img
//                 src={p.images[0].url}
//                 alt={p.title}
//                 className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-white/10"
//               />
//             ) : (
//               <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
//                 <Package size={14} className="text-violet-400" />
//               </div>
//             )}
//             <div>
//               <p className="text-white/80 font-semibold text-[13px] truncate max-w-[140px]">
//                 {p.title || "—"}
//               </p>
//               {p.brand && <p className="text-white/30 text-xs">{p.brand}</p>}
//             </div>
//           </div>
//         </td>
//         <td className="px-4 py-3.5">
//           <p className="text-white/60 text-[13px]">{p.seller?.name || "—"}</p>
//           <p className="text-white/30 text-xs">{p.seller?.email}</p>
//         </td>
//         <td className="px-4 py-3.5">
//           <p className="text-white/60 text-[13px]">{p.category?.name || "—"}</p>
//           {p.subcategory?.name && (
//             <p className="text-white/30 text-xs">{p.subcategory.name}</p>
//           )}
//         </td>
//         <td className="px-4 py-3.5 text-emerald-400 font-semibold text-[13px]">
//           {p.price ? `₹${p.price.toLocaleString()}` : "—"}
//         </td>
//         <td className="px-4 py-3.5">
//           <Badge status={p.status || "pending"} />
//         </td>
//       </tr>
//     ),

//     leads: (l, i) => (
//       <tr
//         key={i}
//         className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
//       >
//         <td className="px-4 py-3.5">
//           <div className="flex items-center gap-2.5">
//             <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold flex-shrink-0">
//               {initials(l.buyerName)}
//             </div>
//             <span className="text-white/80 font-semibold text-[13px]">
//               {l.buyerName || "—"}
//             </span>
//           </div>
//         </td>
//         <td className="px-4 py-3.5 text-white/50 text-[13px]">
//           {l.buyerPhone || "—"}
//         </td>
//         <td className="px-4 py-3.5">
//           <div className="flex items-center gap-2">
//             {l.productId?.images?.[0]?.url && (
//               <img
//                 src={l.productId.images[0].url}
//                 alt=""
//                 className="h-7 w-7 object-cover rounded-lg border border-white/10 flex-shrink-0"
//               />
//             )}
//             <span className="text-white/60 text-[13px] truncate max-w-[130px]">
//               {l.productName || l.productId?.title || "—"}
//             </span>
//           </div>
//         </td>
//         <td className="px-4 py-3.5 text-white/50 text-[13px]">
//           {l.quantity || "—"}
//         </td>
//         <td className="px-4 py-3.5">
//           <p className="text-white/60 text-[13px]">{l.sellerId?.name || "—"}</p>
//           <p className="text-white/30 text-xs">{l.sellerId?.email}</p>
//         </td>
//         <td className="px-4 py-3.5">
//           <Badge status={l.status || "new"} />
//         </td>
//       </tr>
//     ),

//     requirements: (r, i) => (
//       <tr
//         key={i}
//         className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
//       >
//         <td className="px-4 py-3.5">
//           <div className="flex items-center gap-2.5">
//             <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
//               <FileText size={14} className="text-emerald-400" />
//             </div>
//             <span className="text-white/80 font-semibold text-[13px] truncate max-w-[130px]">
//               {r.productName || "—"}
//             </span>
//           </div>
//         </td>
//         <td className="px-4 py-3.5">
//           <p className="text-white/70 text-[13px]">{r.buyerName || "—"}</p>
//           <p className="text-white/30 text-xs">{r.buyerEmail}</p>
//         </td>
//         <td className="px-4 py-3.5 text-white/50 text-[13px]">
//           {r.buyerPhone || "—"}
//         </td>
//         <td className="px-4 py-3.5">
//           <p className="text-white/60 text-[13px]">{r.category?.name || "—"}</p>
//           {r.subCategory?.name && (
//             <p className="text-white/30 text-xs">{r.subCategory.name}</p>
//           )}
//         </td>
//         <td className="px-4 py-3.5 text-blue-400 font-semibold text-[13px]">
//           {r.quantity || "—"}
//         </td>
//         <td className="px-4 py-3.5 text-white/50 text-[13px]">
//           {r.budget || "—"}
//         </td>
//         <td className="px-4 py-3.5 text-white/30 text-xs whitespace-nowrap">
//           {r.createdAt
//             ? new Date(r.createdAt).toLocaleDateString("en-IN", {
//                 day: "numeric",
//                 month: "short",
//                 year: "numeric",
//               })
//             : "—"}
//         </td>
//       </tr>
//     ),
//   };

//   const activeData = tableData[activeTab];
//   const activeCols = columns[activeTab];
//   const activeRender = renderRow[activeTab];

//   return (
//     <div className="min-h-screen bg-[#080810] p-5 sm:p-7">
//       {/* ── TOP BAR ── */}
//       <div className="flex items-center justify-between flex-wrap gap-4 mb-7">
//         <div>
//           <div className="flex items-center gap-2.5 mb-1">
//             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
//               <BarChart3 size={15} className="text-white" />
//             </div>
//             <h1 className="text-white text-xl font-bold tracking-tight">
//               Admin Dashboard
//             </h1>
//           </div>
//           <p className="text-white/35 text-[13px] pl-10">
//             B2B Platform Overview
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => fetchAll(true)}
//             disabled={refreshing}
//             className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/60 text-sm hover:bg-white/[0.08] transition-colors disabled:opacity-50"
//           >
//             <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
//             Refresh
//           </button>
//           <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
//             <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
//               AD
//             </div>
//             <span className="text-white/60 text-sm font-medium">Admin</span>
//           </div>
//         </div>
//       </div>

//       {/* ── STAT CARDS (4 only) ── */}
//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
//         {statCards.map((s) => (
//           <StatCard key={s.label} {...s} loading={loading} />
//         ))}
//       </div>

//       {/* ── MAIN GRID ── */}
//       <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
//         {/* TABLE */}
//         <div className="bg-[#0D0D18] border border-white/[0.06] rounded-2xl overflow-hidden">
//           {/* Tabs */}
//           <div className="flex border-b border-white/[0.06] px-5 overflow-x-auto">
//             {tabs.map((t) => (
//               <button
//                 key={t.key}
//                 onClick={() => {
//                   setActiveTab(t.key);
//                   setSearch("");
//                 }}
//                 className={`flex items-center gap-2 px-4 py-3.5 text-[13px] font-semibold border-b-2 whitespace-nowrap transition-colors ${
//                   activeTab === t.key
//                     ? "border-blue-500 text-blue-400"
//                     : "border-transparent text-white/35 hover:text-white/60"
//                 }`}
//               >
//                 <t.icon size={14} />
//                 {t.label}
//                 <span
//                   className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
//                     activeTab === t.key
//                       ? "bg-blue-500/20 text-blue-400"
//                       : "bg-white/[0.06] text-white/25"
//                   }`}
//                 >
//                   {loading ? "—" : t.count}
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* Search */}
//           <div className="px-5 pt-4">
//             <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-2.5">
//               <Search size={14} className="text-white/25 flex-shrink-0" />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder={`Search ${activeTab}...`}
//                 className="flex-1 bg-transparent border-none outline-none text-white/70 text-[13px] placeholder-white/25"
//               />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto mt-3">
//             {loading ? (
//               <div className="flex flex-col items-center justify-center py-14 gap-2 text-white/20">
//                 <Activity size={22} className="opacity-40" />
//                 <p className="text-sm">Loading data...</p>
//               </div>
//             ) : activeData.length === 0 ? (
//               <div className="py-14 text-center text-white/20 text-sm">
//                 No records found
//               </div>
//             ) : (
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-white/[0.06]">
//                     {activeCols.map((col) => (
//                       <th
//                         key={col}
//                         className="px-4 py-2.5 text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider"
//                       >
//                         {col}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {activeData.map((row, i) => activeRender(row, i))}
//                 </tbody>
//               </table>
//             )}
//           </div>

//           <div className="px-5 py-3 border-t border-white/[0.04] flex justify-end">
//             {/* <button className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold hover:text-blue-300 transition-colors">
//               View All <ChevronRight size={13} />
//             </button> */}
//             <button
//               className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold hover:text-blue-300 transition-colors"
//               onClick={() => navigate(viewAllRoutes[activeTab])}
//             >
//               View All <ChevronRight size={13} />
//             </button>
//           </div>
//         </div>

//         {/* CHAT */}
//         <ChatWidget stats={stats} />
//       </div>
//     </div>
//   );
// }




// B2B-Abhishek/Admin/src/Pages/Admin/AdminDashboard.jsx

import { useState, useEffect } from "react";
import {
  Users,
  Package,
  MessageSquare,
  Zap,
  Search,
  BarChart3,
  RefreshCw,
  Activity,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAllSellers } from "../../api/sellerAuthApi";
import { getAdminProducts } from "../../api/productApi";
import { getAllRequirements } from "../../api/requirementApi";
import { getAllLeads } from "../../api/leadApi";

import StatCard from "../../components/dashboard/StatCard";
import ChatWidget from "../../components/dashboard/ChatWidget";
import { fmtNum } from "../../components/dashboard/utils";
import {
  filterData,
  columns,
  renderRow,
} from "../../components/dashboard/tableConfig";

// ─── Main Dashboard ──────────────────────────────────────────
export default function AdminDashboard() {
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("sellers");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const viewAllRoutes = {
    sellers: "/admin/sellers",
    products: "/admin/products",
    leads: "/admin/enquiries",
    requirements: "/admin/enquiries",
  };

  const fetchAll = async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    try {
      const [s, p, r, l] = await Promise.all([
        getAllSellers(),
        getAdminProducts("all"),
        getAllRequirements(),
        getAllLeads(),
      ]);
      setSellers(s?.data?.sellers || []);
      setProducts(p?.products || []);
      setRequirements(r?.requirements || []);
      setLeads(l?.leads || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const stats = {
    totalSellers: sellers.length,
    totalProducts: products.length,
    totalEnquiries: requirements.length,
    totalLeads: leads.length,
 pendingSubscriptions: sellers.filter(
  (s) => !s.subscriptionActive
).length,
  };

  const statCards = [
    {
      icon: Users,
      label: "Total Sellers",
      value: fmtNum(stats.totalSellers),
      change: "+12%",
      positive: true,
      iconCls: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      glowCls: "bg-blue-500",
    },
    {
      icon: Package,
      label: "Total Products",
      value: fmtNum(stats.totalProducts),
      change: "+8%",
      positive: true,
      iconCls: "bg-violet-500/10 border-violet-500/20 text-violet-400",
      glowCls: "bg-violet-500",
    },
    {
      icon: Zap,
      label: "Total Leads",
      value: fmtNum(stats.totalLeads),
      change: "+18%",
      positive: true,
      iconCls: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      glowCls: "bg-amber-500",
    },
    {
      icon: MessageSquare,
      label: "Buy Requirements",
      value: fmtNum(stats.totalEnquiries),
      change: "+23%",
      positive: true,
      iconCls: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      glowCls: "bg-emerald-500",
    },
    {
      icon: Users,
      label: "Pending Subscriptions",
      value: fmtNum(stats.pendingSubscriptions),
      change: null,
      positive: true,
      iconCls: "bg-orange-500/10 border-orange-500/20 text-orange-400",
      glowCls: "bg-orange-500",
    },
  ];

  const tabs = [
    { key: "sellers", label: "Sellers", icon: Users, count: sellers.length },
    {
      key: "products",
      label: "Products",
      icon: Package,
      count: products.length,
    },
    { key: "leads", label: "Leads", icon: Zap, count: leads.length },
    {
      key: "requirements",
      label: "Requirements",
      icon: MessageSquare,
      count: requirements.length,
    },
  ];

  const tableData = {
    sellers: filterData(sellers, ["name", "companyName", "email"], search),
    products: filterData(products, ["title"], search),
    leads: filterData(leads, ["buyerName", "buyerEmail"], search),
    requirements: filterData(requirements, ["productName", "buyerName"], search),
  };

  const activeData = tableData[activeTab];
  const activeCols = columns[activeTab];
  const activeRender = renderRow[activeTab];

  return (
    <div className="min-h-screen bg-[#080810] p-5 sm:p-7">
      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-7">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <BarChart3 size={15} className="text-white" />
            </div>
            <h1 className="text-white text-xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-white/35 text-[13px] pl-10">
            B2B Platform Overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchAll(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/60 text-sm hover:bg-white/[0.08] transition-colors disabled:opacity-50"
          >
            <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
            <span className="text-white/60 text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3 mb-6">
        {statCards.map((s) => (
          <StatCard key={s.label} {...s} loading={loading} />
        ))}
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
        {/* TABLE */}
        <div className="bg-[#0D0D18] border border-white/[0.06] rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/[0.06] px-5 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setActiveTab(t.key);
                  setSearch("");
                }}
                className={`flex items-center gap-2 px-4 py-3.5 text-[13px] font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === t.key
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-white/35 hover:text-white/60"
                }`}
              >
                <t.icon size={14} />
                {t.label}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeTab === t.key
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-white/[0.06] text-white/25"
                  }`}
                >
                  {loading ? "—" : t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="px-5 pt-4">
            <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-2.5">
              <Search size={14} className="text-white/25 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="flex-1 bg-transparent border-none outline-none text-white/70 text-[13px] placeholder-white/25"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-14 gap-2 text-white/20">
                <Activity size={22} className="opacity-40" />
                <p className="text-sm">Loading data...</p>
              </div>
            ) : activeData.length === 0 ? (
              <div className="py-14 text-center text-white/20 text-sm">
                No records found
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {activeCols.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-2.5 text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeData.map((row, i) => activeRender(row, i))}
                </tbody>
              </table>
            )}
          </div>

          <div className="px-5 py-3 border-t border-white/[0.04] flex justify-end">
            <button
              className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold hover:text-blue-300 transition-colors"
              onClick={() => navigate(viewAllRoutes[activeTab])}
            >
              View All <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* CHAT */}
        <ChatWidget stats={stats} />
      </div>
    </div>
  );
}