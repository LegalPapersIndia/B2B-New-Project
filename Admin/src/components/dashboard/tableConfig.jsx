import { Package, FileText } from "lucide-react";
import Badge from "./Badge";
import { initials } from "./utils";

// ─── Search filter ───────────────────────────────────────
export const filterData = (arr, keys, search) => {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter(
      (item) =>
        !search ||
        keys.some((k) =>
          String(item[k] || "")
            .toLowerCase()
            .includes(search.toLowerCase()),
        ),
    )
    .slice(0, 5);
};

export const columns = {
  sellers: ["Seller", "Company", "Email", "Location", "Plan", "Subscription"],
  products: ["Product", "Seller", "Category", "Price", "Status"],
  leads: ["Buyer", "Phone", "Product", "Quantity", "Seller", "Status"],
  requirements: [
    "Product",
    "Buyer",
    "Phone",
    "Category",
    "Quantity",
    "Budget",
    "Date",
  ],
};

// ─── Row renderers (matching exact fields from your pages) ──
export const renderRow = {
  sellers: (s, i) => (
    <tr
      key={i}
      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
    >
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-blue-800/30 flex items-center justify-center flex-shrink-0">
            {s.profileImage?.url ? (
              <img
                src={s.profileImage.url}
                alt={s.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-blue-400 font-bold text-xs">
                {s.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-white/80 font-semibold text-[13px]">
            {s.name || "—"}
          </span>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <p className="text-white/70 text-[13px]">{s.companyName || "—"}</p>
        {s.companyType && (
          <p className="text-white/30 text-xs">{s.companyType}</p>
        )}
      </td>
      <td className="px-4 py-3.5 text-white/40 text-xs">{s.email || "—"}</td>
      <td className="px-4 py-3.5 text-white/40 text-xs">
        {[s.city, s.state].filter(Boolean).join(", ") || "—"}
      </td>
      <td className="px-4 py-3.5">
        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
            s.subscriptionPlan === "gold"
              ? "bg-yellow-500/20 text-yellow-400"
              : s.subscriptionPlan === "premium"
                ? "bg-purple-500/20 text-purple-400"
                : s.subscriptionPlan === "basic"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {s.subscriptionPlan || "No Plan"}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            s.subscriptionActive
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
              : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
          }`}
        >
          {s.subscriptionActive ? "Active" : "Pending"}
        </span>
      </td>
    </tr>
  ),

  products: (p, i) => (
    <tr
      key={i}
      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
    >
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          {p.images?.[0]?.url ? (
            <img
              src={p.images[0].url}
              alt={p.title}
              className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-white/10"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
              <Package size={14} className="text-violet-400" />
            </div>
          )}
          <div>
            <p className="text-white/80 font-semibold text-[13px] truncate max-w-[140px]">
              {p.title || "—"}
            </p>
            {p.brand && <p className="text-white/30 text-xs">{p.brand}</p>}
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <p className="text-white/60 text-[13px]">{p.seller?.name || "—"}</p>
        <p className="text-white/30 text-xs">{p.seller?.email}</p>
      </td>
      <td className="px-4 py-3.5">
        <p className="text-white/60 text-[13px]">{p.category?.name || "—"}</p>
        {p.subcategory?.name && (
          <p className="text-white/30 text-xs">{p.subcategory.name}</p>
        )}
      </td>
      <td className="px-4 py-3.5 text-emerald-400 font-semibold text-[13px]">
        {p.price ? `₹${p.price.toLocaleString()}` : "—"}
      </td>
      <td className="px-4 py-3.5">
        <Badge status={p.status || "pending"} />
      </td>
    </tr>
  ),

  leads: (l, i) => (
    <tr
      key={i}
      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
    >
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold flex-shrink-0">
            {initials(l.buyerName)}
          </div>
          <span className="text-white/80 font-semibold text-[13px]">
            {l.buyerName || "—"}
          </span>
        </div>
      </td>
      <td className="px-4 py-3.5 text-white/50 text-[13px]">
        {l.buyerPhone || "—"}
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          {l.productId?.images?.[0]?.url && (
            <img
              src={l.productId.images[0].url}
              alt=""
              className="h-7 w-7 object-cover rounded-lg border border-white/10 flex-shrink-0"
            />
          )}
          <span className="text-white/60 text-[13px] truncate max-w-[130px]">
            {l.productName || l.productId?.title || "—"}
          </span>
        </div>
      </td>
      <td className="px-4 py-3.5 text-white/50 text-[13px]">
        {l.quantity || "—"}
      </td>
      <td className="px-4 py-3.5">
        <p className="text-white/60 text-[13px]">{l.sellerId?.name || "—"}</p>
        <p className="text-white/30 text-xs">{l.sellerId?.email}</p>
      </td>
      <td className="px-4 py-3.5">
        <Badge status={l.status || "new"} />
      </td>
    </tr>
  ),

  requirements: (r, i) => (
    <tr
      key={i}
      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
    >
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
            <FileText size={14} className="text-emerald-400" />
          </div>
          <span className="text-white/80 font-semibold text-[13px] truncate max-w-[130px]">
            {r.productName || "—"}
          </span>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <p className="text-white/70 text-[13px]">{r.buyerName || "—"}</p>
        <p className="text-white/30 text-xs">{r.buyerEmail}</p>
      </td>
      <td className="px-4 py-3.5 text-white/50 text-[13px]">
        {r.buyerPhone || "—"}
      </td>
      <td className="px-4 py-3.5">
        <p className="text-white/60 text-[13px]">{r.category?.name || "—"}</p>
        {r.subCategory?.name && (
          <p className="text-white/30 text-xs">{r.subCategory.name}</p>
        )}
      </td>
      <td className="px-4 py-3.5 text-blue-400 font-semibold text-[13px]">
        {r.quantity || "—"}
      </td>
      <td className="px-4 py-3.5 text-white/50 text-[13px]">
        {r.budget || "—"}
      </td>
      <td className="px-4 py-3.5 text-white/30 text-xs whitespace-nowrap">
        {r.createdAt
          ? new Date(r.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "—"}
      </td>
    </tr>
  ),
};