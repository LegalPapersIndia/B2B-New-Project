import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  FaCloudUploadAlt,
  FaDownload,
  FaTable,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaSpinner,
  FaCrown,
  FaInfoCircle,
} from "react-icons/fa";
import { getCategories } from "../../api/categoryApi";
import { getSubCategoriesByCategory } from "../../api/subCategoryApi";
import { addProduct } from "../../api/productApi";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../api/sellerProfileApi";
import AlertPopup from "../../components/common/AlertPopup";

// ─── Required columns (lowercase, must match Excel header after normalization) ───
const REQUIRED_COLS = ["title", "category", "subcategory", "price", "description"];
const ALL_COLS = [...REQUIRED_COLS, "moq", "unit", "brand", "stock", "shortdesc"];
const VALID_UNITS = ["Piece", "Kg", "Liter", "Meter", "Box", "Set", "Ton"];

const normalize = (str) => str?.toString().trim().toLowerCase().replace(/\*/g, "");

const BulkUploadProduct = () => {
  const navigate = useNavigate();
  const seller = JSON.parse(localStorage.getItem("user") || "{}");
  const isSubscribed = seller?.subscriptionActive;

  // ── State ──
  const [categories, setCategories] = useState([]);
  const [subCatCache, setSubCatCache] = useState({}); // { categoryId: [subs] }
  const [rows, setRows] = useState([]); // parsed + validated rows
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]); // per-row submit results
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // ── Profile check ──
  useEffect(() => {
    const checkProfile = async () => {
      try {
        const data = await getMyProfile();
        const s = data.seller;
        if (!s.companyName || !s.phone || !s.city || !s.state) {
          navigate("/seller/profile", {
            state: { message: "⚠️ Please complete your profile before adding products." },
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkProfile();
  }, []);

  // ── Fetch categories once ──
  useEffect(() => {
    getCategories()
      .then((d) => setCategories(d.categories || []))
      .catch(console.error);
  }, []);

  // ─────────────────────────────────────────────────────
  // DOWNLOAD TEMPLATE
  // ─────────────────────────────────────────────────────
  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();

    // ── Products sheet ──
    const headers = [
      "TITLE*", "CATEGORY*", "SUBCATEGORY*", "PRICE*", "DESCRIPTION*",
      "MOQ", "UNIT", "BRAND", "STOCK", "SHORTDESC",
    ];
    const hints = [
      "Product name (required)",
      "Category name exactly as on site (required)",
      "Sub-category name exactly as on site (required)",
      "Price in ₹, numbers only (required)",
      "Full product description (required)",
      "Minimum order quantity",
      "Piece / Kg / Liter / Meter / Box / Set / Ton",
      "Brand name",
      "Available stock quantity",
      "One-line short description",
    ];
    const sample1 = [
      "Premium Cotton T-Shirt", "Clothing", "Men's Wear", 499,
      "High quality 100% cotton t-shirt available in all sizes.", 50, "Piece", "FashionBrand", 1000, "Premium cotton tshirt",
    ];
    const sample2 = [
      "Industrial Steel Pipe", "Hardware", "Pipes & Fittings", 2500,
      "Grade A steel pipe for industrial and construction use.", 10, "Meter", "SteelCo", 500, "Heavy duty steel pipe",
    ];

    const ws = XLSX.utils.aoa_to_sheet([headers, hints, sample1, sample2]);

    // Column widths
    ws["!cols"] = [30, 22, 24, 12, 55, 10, 14, 18, 10, 35].map((w) => ({ wch: w }));

    XLSX.utils.book_append_sheet(wb, ws, "Products");

    // ── Instructions sheet ──
    const infoData = [
      ["📋 Bulk Product Upload — Instructions"],
      [""],
      ["🔴 Required Fields:", "TITLE, CATEGORY, SUBCATEGORY, PRICE, DESCRIPTION"],
      ["🔵 Optional Fields:", "MOQ, UNIT, BRAND, STOCK, SHORTDESC"],
      [""],
      ["⚠️ Rules:"],
      ["", "• Do NOT delete or rename column headers"],
      ["", "• Category & Subcategory must match exactly with website values"],
      ["", "• Price must be a number only (no ₹ symbol)"],
      ["", "• UNIT must be: Piece, Kg, Liter, Meter, Box, Set, Ton"],
      ["", "• Max 500 products per upload"],
      ["", "• Delete sample rows before uploading"],
      ["", "• Images can be added later from Manage Products"],
    ];
    const wsInfo = XLSX.utils.aoa_to_sheet(infoData);
    wsInfo["!cols"] = [{ wch: 30 }, { wch: 65 }];
    XLSX.utils.book_append_sheet(wb, wsInfo, "Instructions");

    XLSX.writeFile(wb, "bulk_product_template.xlsx");
  };

  // ─────────────────────────────────────────────────────
  // PARSE & VALIDATE EXCEL
  // ─────────────────────────────────────────────────────
  const resolveCategory = (name) =>
    categories.find((c) => normalize(c.name) === normalize(name));

  const resolveSubCategory = async (catId, subName) => {
    if (subCatCache[catId]) {
      return subCatCache[catId].find((s) => normalize(s.name) === normalize(subName));
    }
    try {
      const data = await getSubCategoriesByCategory(catId);
      const subs = data.subCategories || [];
      setSubCatCache((prev) => ({ ...prev, [catId]: subs }));
      return subs.find((s) => normalize(s.name) === normalize(subName));
    } catch {
      return null;
    }
  };

  const parseFile = async (file) => {
    setFileName(file.name);
    setRows([]);
    setResults([]);
    setSubmitted(false);

    const data = await file.arrayBuffer();
    const wb = XLSX.read(data);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

    if (raw.length < 3) {
      setAlert({ type: "error", message: "File is empty or has no data rows." });
      return;
    }

    // Find header row (first row with "title" in normalized form)
    const headerRow = raw[0].map(normalize);
    const colIdx = {};
    ALL_COLS.forEach((col) => {
      const idx = headerRow.indexOf(col);
      if (idx !== -1) colIdx[col] = idx;
    });

    const missing = REQUIRED_COLS.filter((c) => colIdx[c] === undefined);
    if (missing.length) {
      setAlert({ type: "error", message: `Missing required columns: ${missing.join(", ")}` });
      return;
    }

    // Skip hint row (row index 1) — data starts at row index 2
    const dataRows = raw.slice(2).filter((r) => r.some((v) => v !== ""));

    if (dataRows.length === 0) {
      setAlert({ type: "error", message: "No data rows found (sample rows deleted?). Please add product data." });
      return;
    }
    if (dataRows.length > 500) {
      setAlert({ type: "error", message: "Maximum 500 products per upload." });
      return;
    }

    // Validate + resolve each row
    const parsed = await Promise.all(
      dataRows.map(async (row, i) => {
        const get = (col) => row[colIdx[col] ?? -1]?.toString().trim() ?? "";

        const titleVal = get("title");
        const categoryName = get("category");
        const subcategoryName = get("subcategory");
        const priceVal = get("price");
        const descVal = get("description");
        const unitVal = get("unit");

        const errors = [];

        if (!titleVal) errors.push("Title is required");
        if (!priceVal || isNaN(Number(priceVal))) errors.push("Price must be a valid number");
        if (!descVal) errors.push("Description is required");
        if (unitVal && !VALID_UNITS.includes(unitVal))
          errors.push(`Unit must be: ${VALID_UNITS.join(", ")}`);

        // Category resolve
        let categoryId = null;
        let subcategoryId = null;

        const cat = resolveCategory(categoryName);
        if (!categoryName) {
          errors.push("Category is required");
        } else if (!cat) {
          errors.push(`Category "${categoryName}" not found on site`);
        } else {
          categoryId = cat._id;
          if (!subcategoryName) {
            errors.push("Subcategory is required");
          } else {
            const sub = await resolveSubCategory(cat._id, subcategoryName);
            if (!sub) {
              errors.push(`Subcategory "${subcategoryName}" not found under "${categoryName}"`);
            } else {
              subcategoryId = sub._id;
            }
          }
        }

        return {
          rowNum: i + 3, // Excel row number (1-indexed + 2 header rows)
          title: titleVal,
          category: categoryName,
          subcategory: subcategoryName,
          price: priceVal,
          description: descVal,
          moq: get("moq"),
          unit: unitVal,
          brand: get("brand"),
          stock: get("stock"),
          shortDesc: get("shortdesc"),
          categoryId,
          subcategoryId,
          errors,
          status: "pending", // pending | success | error
        };
      })
    );

    setRows(parsed);

    const errorCount = parsed.filter((r) => r.errors.length > 0).length;
    if (errorCount > 0) {
      setAlert({
        type: "warning",
        message: `${parsed.length} rows loaded. ⚠️ ${errorCount} row(s) have errors — fix them in Excel and re-upload, or they will be skipped during submission.`,
      });
    } else {
      setAlert({
        type: "success",
        message: `✅ ${parsed.length} products ready to submit!`,
      });
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) parseFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) parseFile(file);
  };

  // ─────────────────────────────────────────────────────
  // SUBMIT ALL VALID ROWS
  // ─────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const validRows = rows.filter((r) => r.errors.length === 0);
    if (validRows.length === 0) {
      setAlert({ type: "error", message: "No valid rows to submit." });
      return;
    }

    setLoading(true);
    setSubmitted(false);
    setAlert(null);

    const updatedRows = [...rows];

    for (let i = 0; i < updatedRows.length; i++) {
      const row = updatedRows[i];
      if (row.errors.length > 0) {
        updatedRows[i] = { ...row, status: "skipped" };
        continue;
      }

      try {
        const formData = new FormData();
        formData.append("title", row.title);
        formData.append("category", row.categoryId);
        formData.append("subcategory", row.subcategoryId);
        formData.append("price", row.price);
        formData.append("description", row.description);
        formData.append("bulkUpload", "true"); 
        if (row.moq) formData.append("moq", row.moq);
        if (row.unit) formData.append("unit", row.unit);
        if (row.brand) formData.append("brand", row.brand);
        if (row.stock) formData.append("stock", row.stock);
        if (row.shortDesc) formData.append("shortDesc", row.shortDesc);

        const res = await addProduct(formData);
        updatedRows[i] = { ...row, status: res.success ? "success" : "error", errorMsg: res.message };
      } catch (err) {
        updatedRows[i] = {
          ...row,
          status: "error",
          errorMsg: err.response?.data?.message || "Server error",
        };
      }

      setRows([...updatedRows]); // live update
    }

    setLoading(false);
    setSubmitted(true);

    const successCount = updatedRows.filter((r) => r.status === "success").length;
    const failCount = updatedRows.filter((r) => r.status === "error").length;
    const skippedCount = updatedRows.filter((r) => r.status === "skipped").length;

    setAlert({
      type: successCount > 0 ? "success" : "error",
      message: `Done! ✅ ${successCount} submitted${failCount ? `, ❌ ${failCount} failed` : ""}${skippedCount ? `, ⏭️ ${skippedCount} skipped` : ""}.`,
    });
  };

  // ─────────────────────────────────────────────────────
  // STATUS BADGE
  // ─────────────────────────────────────────────────────
  const StatusBadge = ({ row }) => {
    if (row.status === "success")
      return <span className="flex items-center gap-1 text-green-600 font-semibold text-xs"><FaCheckCircle /> Live</span>;
    if (row.status === "error")
      return <span className="flex items-center gap-1 text-red-500 font-semibold text-xs"><FaTimesCircle /> Failed</span>;
    if (row.status === "skipped")
      return <span className="text-gray-400 text-xs font-semibold">Skipped</span>;
    if (row.errors.length > 0)
      return <span className="flex items-center gap-1 text-orange-500 font-semibold text-xs"><FaTimesCircle /> {row.errors.length} error(s)</span>;
    return <span className="text-blue-600 text-xs font-semibold">Ready</span>;
  };

  const validCount = rows.filter((r) => r.errors.length === 0).length;
  const invalidCount = rows.filter((r) => r.errors.length > 0).length;

  // ─────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {alert && (
        <AlertPopup type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
      )}

      <main className="flex-1 p-3 sm:p-6 overflow-y-auto">
        <div className="bg-white rounded-[20px] sm:rounded-[30px] shadow-md border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 sm:px-8 py-5 sm:py-6">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
              <FaTable /> Bulk Upload Products
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Upload multiple products at once using an Excel sheet
            </p>
          </div>

          <div className="p-4 sm:p-8 space-y-8">

            {/* SUBSCRIPTION BANNER */}
            {!isSubscribed && (
              <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-3xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <FaCrown className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-white font-bold">No Active Subscription</p>
                    <p className="text-white/60 text-sm">
                      Products will stay <span className="text-orange-400 font-medium">pending</span> until you activate a plan.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/seller/subscription")}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-bold shadow transition w-full md:w-auto"
                >
                  <FaCrown className="inline mr-2" />Subscribe Now
                </button>
              </div>
            )}

            {/* STEP 1: DOWNLOAD TEMPLATE */}
            <div className="border border-dashed border-blue-200 rounded-3xl p-4 sm:p-6 bg-blue-50">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-700 font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">Download Template</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Download the Excel template, fill in your product details, then upload it below.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={downloadTemplate}
                      className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl font-semibold shadow transition w-full sm:w-auto"
                    >
                      <FaDownload /> Download Template (.xlsx)
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Fill product data", "Don't rename headers", "Match category names exactly", "Max 500 rows"].map((tip) => (
                      <span key={tip} className="flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                        <FaInfoCircle className="text-[10px]" /> {tip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: UPLOAD */}
            <div className="border border-dashed border-gray-200 rounded-3xl p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gray-700 font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">Upload Filled Excel</h3>

                  <label
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`mt-4 border-2 border-dashed rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center cursor-pointer transition text-center ${
                      dragOver
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300 hover:border-orange-500 bg-gray-50 hover:bg-orange-50"
                    }`}
                  >
                    <FaCloudUploadAlt className="text-5xl text-orange-500 mb-3" />
                    <p className="font-semibold text-gray-700 break-all">
                      {fileName ? `📄 ${fileName}` : "Click or drag & drop your Excel file here"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">.xlsx or .xls — Max 500 products</p>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* STEP 3: PREVIEW TABLE */}
            {rows.length > 0 && (
              <div>
                {/* Summary bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                      <FaTable className="text-blue-600" /> Preview ({rows.length} rows)
                    </h3>
                    {validCount > 0 && (
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        ✅ {validCount} valid
                      </span>
                    )}
                    {invalidCount > 0 && (
                      <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
                        ⚠️ {invalidCount} errors
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => { setRows([]); setFileName(""); setSubmitted(false); setResults([]); }}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-semibold transition"
                  >
                    <FaTrash /> Clear
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-3xl border border-gray-200">
                  <table className="w-full text-sm min-w-[900px]">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-xs uppercase">
                        <th className="px-4 py-3 text-left font-semibold">#</th>
                        <th className="px-4 py-3 text-left font-semibold">Status</th>
                        <th className="px-4 py-3 text-left font-semibold">Title</th>
                        <th className="px-4 py-3 text-left font-semibold">Category</th>
                        <th className="px-4 py-3 text-left font-semibold">Subcategory</th>
                        <th className="px-4 py-3 text-left font-semibold">Price</th>
                        <th className="px-4 py-3 text-left font-semibold">MOQ</th>
                        <th className="px-4 py-3 text-left font-semibold">Unit</th>
                        <th className="px-4 py-3 text-left font-semibold">Brand</th>
                        <th className="px-4 py-3 text-left font-semibold">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr
                          key={i}
                          className={`border-t border-gray-100 ${
                            row.status === "success"
                              ? "bg-green-50"
                              : row.status === "error"
                              ? "bg-red-50"
                              : row.errors.length > 0
                              ? "bg-orange-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-3 text-gray-400">{row.rowNum}</td>
                          <td className="px-4 py-3">
                            <StatusBadge row={row} />
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-800 max-w-[180px] truncate">
                            {row.title || <span className="text-red-400 italic">missing</span>}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{row.category}</td>
                          <td className="px-4 py-3 text-gray-600">{row.subcategory}</td>
                          <td className="px-4 py-3 text-gray-700">
                            {row.price ? `₹${row.price}` : <span className="text-red-400 italic">missing</span>}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{row.moq || "—"}</td>
                          <td className="px-4 py-3 text-gray-600">{row.unit || "—"}</td>
                          <td className="px-4 py-3 text-gray-600">{row.brand || "—"}</td>
                          <td className="px-4 py-3 max-w-[200px]">
                            {row.errors.length > 0 ? (
                              <ul className="text-xs text-orange-600 space-y-0.5">
                                {row.errors.map((e, ei) => <li key={ei}>• {e}</li>)}
                              </ul>
                            ) : row.errorMsg ? (
                              <span className="text-xs text-red-500">{row.errorMsg}</span>
                            ) : (
                              <span className="text-xs text-green-600">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Note about images */}
                <p className="text-xs text-gray-400 mt-3 flex items-center gap-2">
                  <FaInfoCircle /> Images cannot be added via bulk upload. Go to <strong>Manage Products</strong> after submission to add images per product.
                </p>

                {/* Submit button */}
                {!submitted && (
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={loading || validCount === 0}
                      className="flex items-center justify-center gap-2 bg-[#F54900] hover:bg-[#d63f00] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-bold shadow transition w-full sm:w-auto"
                    >
                      {loading ? (
                        <><FaSpinner className="animate-spin" /> Submitting...</>
                      ) : (
                        <><FaCheckCircle /> Submit {validCount} Product{validCount !== 1 ? "s" : ""}</>
                      )}
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className="border px-8 py-4 rounded-2xl font-semibold hover:border-blue-800 hover:text-blue-800 transition w-full sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Post submit actions */}
                {submitted && (
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                      onClick={() => navigate("/seller/products")}
                      className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold shadow transition w-full sm:w-auto"
                    >
                      View My Products
                    </button>
                    <button
                      onClick={() => { setRows([]); setFileName(""); setSubmitted(false); }}
                      className="border px-8 py-4 rounded-2xl font-semibold hover:border-blue-800 hover:text-blue-800 transition w-full sm:w-auto"
                    >
                      Upload Another File
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default BulkUploadProduct;