
// src/pages/admin/BulkUpload.jsx

import { useState, useRef } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

export default function BulkUpload() {
  const [file, setFile]           = useState(null);
  const [dragging, setDragging]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult]       = useState(null);
  const fileRef                   = useRef();

  const handleFile = (f) => {
    if (!f) return;
    const allowed = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!allowed.includes(f.type)) {
      alert("Sirf Excel file (.xlsx / .xls) upload karo!");
      return;
    }
    setFile(f);
    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const downloadTemplate = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${BASE_URL}/api/admin/bulk-upload/template`, {
        headers:      { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const url  = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href  = url;
      link.setAttribute("download", "bulk_sellers_template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Template download failed!");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setUploading(true);
      setResult(null);
      const token    = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${BASE_URL}/api/admin/bulk-upload`, formData, {
        headers: {
          Authorization:  `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(res.data);
      setFile(null);
    } catch (err) {
      console.error(err);
      setResult({
        success: false,
        message: err.response?.data?.message || "Server error. Try again.",
        results: { total: 0, success: 0, failed: 0, errors: [], created: [] },
      });
    } finally {
      setUploading(false);
    }
  };

  // ── Badge color for subscription ──
  const planColor = (plan) => {
    switch (plan) {
      case "basic":   return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "premium": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "gold":    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default:        return "bg-white/5 text-white/30 border-white/10";
    }
  };

  // ── Badge color for product status ──
  const productColor = (status) => {
    if (!status || status === "No product") return "bg-white/5 text-white/30 border-white/10";
    if (status.includes("approved"))        return "bg-green-500/10 text-green-400 border-green-500/20";
    if (status.includes("pending"))         return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    if (status.includes("not found") || status.includes("skip")) return "bg-red-500/10 text-red-400 border-red-500/20";
    return "bg-white/5 text-white/30 border-white/10";
  };

  return (
    <div className="min-h-screen bg-[#0D0D14] p-6 text-white">

      {/* ── HEADER ── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-100">Bulk Upload</h1>
        </div>
        <p className="text-white/30 text-sm ml-12">
         Add seller + products + subscriptions together from Excel
        </p>
      </div>

      {/* ── STEPS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { step: "01", title: "Template Download ", desc: "Take a blank Excel format – fill in the data", icon: "⬇️" },
          { step: "02", title: "Data Fill ",         desc: "Sellers, subscription plan, category, products all included", icon: "✏️" },
          { step: "03", title: "Upload ",            desc: "Upload the file – it will all be created automatically", icon: "🚀" },
        ].map((s) => (
          <div key={s.step} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-bold text-blue-400/60 tracking-widest">STEP {s.step}</span>
              <span className="text-lg">{s.icon}</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-200 mb-1">{s.title}</h3>
            <p className="text-xs text-white/30">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── LEFT: TEMPLATE + UPLOAD ── */}
        <div className="space-y-5">

          {/* TEMPLATE DOWNLOAD */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-slate-300 mb-1">Step 1 — Template Download</h2>
            <p className="text-xs text-white/30 mb-4">
              Download this template first. It will also include the actual category/subcategory names of the dubs.
            </p>
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
             bulk_sellers_template.xlsx download
            </button>
          </div>

          {/* FILE UPLOAD */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-slate-300 mb-1">Step 2 — File Upload </h2>
            <p className="text-xs text-white/30 mb-4">Upload the data filled Excel file here.</p>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all
                ${dragging
                  ? "border-blue-500/60 bg-blue-500/10"
                  : file
                  ? "border-green-500/40 bg-green-500/5"
                  : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                }`}
            >
              {file ? (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <p className="text-green-400 font-semibold text-sm">{file.name}</p>
                  <p className="text-white/30 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB — Ready to upload</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="mt-3 text-xs text-red-400/70 hover:text-red-400 transition"
                  >
                    × Remove
                  </button>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <p className="text-white/50 text-sm font-medium">drop excel file here</p>
                  <p className="text-white/20 text-xs mt-1">click to select file (.xlsx / .xls)</p>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>

            {file && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Uploading... Please wait
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    </svg>
                    Start Bulk Upload
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* ── RIGHT: RESULT / INFO ── */}
        <div>
          {result ? (
            <div className="space-y-4">

              {/* SUMMARY CARDS */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{result.results?.total || 0}</div>
                  <div className="text-xs text-blue-400/60 mt-1">Total</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{result.results?.success || 0}</div>
                  <div className="text-xs text-green-400/60 mt-1">Success</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">{result.results?.failed || 0}</div>
                  <div className="text-xs text-red-400/60 mt-1">Failed</div>
                </div>
              </div>

              {/* SUCCESS LIST — subscription + product status bhi dikhao */}
              {result.results?.created?.length > 0 && (
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 max-h-64 overflow-y-auto">
                  <h3 className="text-xs font-semibold text-green-400 mb-3 uppercase tracking-wider">✅ Successfully Created</h3>
                  <div className="space-y-3">
                    {result.results.created.map((s, i) => (
                      <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3">
                        {/* Company + Email */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white/80 font-medium">{s.companyName}</span>
                          <span className="text-xs text-white/30">{s.email}</span>
                        </div>
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                          {/* Subscription badge */}
                          <span className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium capitalize ${planColor(s.subscription)}`}>
                            {s.subscription !== "none" ? `👑 ${s.subscription}` : "No Plan"}
                          </span>
                          {/* Product badge */}
                          <span className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium ${productColor(s.product)}`}>
                            {s.product === "No product"            ? "📦 No Product"
                             : s.product?.includes("approved")     ? "✅ Product Live"
                             : s.product?.includes("pending")      ? "⏳ Product Pending"
                             : s.product?.includes("not found") || s.product?.includes("skip") ? "⚠️ Product Skipped"
                             : s.product}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ERROR LIST */}
              {result.results?.errors?.length > 0 && (
                <div className="bg-white/[0.03] border border-red-500/20 rounded-2xl p-5 max-h-48 overflow-y-auto">
                  <h3 className="text-xs font-semibold text-red-400 mb-3 uppercase tracking-wider">❌ Errors / Warnings</h3>
                  <div className="space-y-2">
                    {result.results.errors.map((e, i) => (
                      <div key={i} className="bg-red-500/5 border border-red-500/10 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-red-400/60">Row {e.row}</span>
                          <span className="text-xs text-white/40">{e.email}</span>
                        </div>
                        <p className="text-xs text-red-300/80">{e.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setResult(null)}
                className="w-full border border-white/10 hover:border-white/20 text-white/40 hover:text-white/70 py-2.5 rounded-xl text-sm transition-all"
              >
                upload new
              </button>
            </div>
          ) : (

            /* EXCEL COLUMNS INFO */
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 h-full">
              <h2 className="text-sm font-semibold text-slate-300 mb-4">In Excel these will be the columns</h2>
              <div className="space-y-4">
                {[
                  { section: "Required",              color: "red",    fields: ["name", "email", "phone", "password"] },
                  { section: "Subscription",          color: "yellow", fields: ["subscriptionPlan → basic / premium / gold / blank"] },
                  { section: "Company (Optional)",    color: "blue",   fields: ["companyName", "companyType", "yearEstablished", "employees", "annualTurnover", "companyWebsite"] },
                  { section: "Legal (Optional)",      color: "purple", fields: ["gstNumber", "panNumber", "regNumber"] },
                  { section: "Location (Optional)",   color: "indigo", fields: ["city", "state", "pincode", "address"] },
                  { section: "Product (Optional)",    color: "green",  fields: ["productTitle", "categoryName", "subCategoryName", "price", "moq", "unit", "description"] },
                ].map((sec) => (
                  <div key={sec.section}>
                    <p className={`text-[10px] font-bold text-${sec.color}-400/70 uppercase tracking-widest mb-1.5`}>
                      {sec.section}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {sec.fields.map((f) => (
                        <span key={f} className={`text-[11px] bg-${sec.color}-500/10 border border-${sec.color}-500/20 text-${sec.color}-300/70 px-2 py-0.5 rounded-lg`}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-2">
                <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-3">
                  <p className="text-xs text-yellow-300/70">
                    👑 <strong className="text-yellow-300/90">Subscription:</strong> basic (30 din) / premium (90 din) / gold (180 din) / blank (no subscription)
                  </p>
                </div>
                <div className="bg-green-500/5 border border-green-500/15 rounded-xl p-3">
                  <p className="text-xs text-green-300/70">
                    📦 <strong className="text-green-300/90">Product:</strong> The category name reads exactly as shown on the admin category page.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}