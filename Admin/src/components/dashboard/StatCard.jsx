// // bina animation ka code 

// import { TrendingUp, TrendingDown } from "lucide-react";

// // ─── Stat Card ───────────────────────────────────────────────
// export default function StatCard({
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


import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  change,
  positive,
  iconCls,
  glowCls,
  loading,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl p-[1.5px] group"
      style={{ background: "transparent" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Spinning border layer */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div
          className={hovered ? "absolute spin-border-active pointer-events-none" : "absolute pointer-events-none"}
          style={{
            top: "50%",
            left: "50%",
            width: "200%",
            height: "200%",
            background:
              "conic-gradient(from 0deg, transparent 0deg, #3b82f6 60deg, #06b6d4 120deg, #8b5cf6 180deg, #ec4899 240deg, transparent 300deg)",
          }}
        />
      </div>

      {/* Mask layer */}
      <div className="absolute inset-[1.5px] rounded-2xl bg-[#0D0D18] z-[1] pointer-events-none" />

      {/* Original card — bilkul same */}
      <div className="relative z-[2] overflow-hidden bg-transparent border border-white/[0.06] rounded-[14px] p-5 transition-all duration-300 group-hover:border-transparent">
        <div className={`absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none ${glowCls}`} />
        <div className="flex items-center justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${iconCls}`}>
            <Icon size={18} />
          </div>
          {change && (
            <span
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                positive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {change}
            </span>
          )}
        </div>
        {loading ? (
          <div className="h-8 w-3/5 bg-white/[0.06] rounded-lg animate-pulse mb-1.5" />
        ) : (
          <p className="text-3xl font-bold text-white tracking-tight leading-none">
            {value}
          </p>
        )}
        <p className="text-[13px] text-white/40 mt-1.5 font-medium">{label}</p>
      </div>
    </div>
  );
}
