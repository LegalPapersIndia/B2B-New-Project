// ─── Badge ───────────────────────────────────────────────────
export default function Badge({ status }) {
  const map = {
    approved: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    pending: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    rejected: "bg-red-500/15 text-red-400 border border-red-500/20",
    active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    inactive: "bg-slate-500/15 text-slate-400 border border-slate-500/20",
    new: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    viewed: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
    contacted: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
    converted:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  };
  const cls = map[status?.toLowerCase()] || map.pending;
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${cls}`}
    >
      {status || "pending"}
    </span>
  );
}