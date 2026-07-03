

// // pages/admin/Products.jsx

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAdminProducts, deleteProductAdmin } from "../../api/productApi";
// import ConfirmModal from "../../components/common/ConfirmModal";
// // ── DOWNLOAD IMPORTS ADDED ──
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export default function Products() {
//   const [filter, setFilter]         = useState("all");
//   const [products, setProducts]     = useState([]);
//   const [loading, setLoading]       = useState(true);
//   const [error, setError]           = useState("");
//   const navigate                    = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   // ── SEARCH STATE ADDED ──
//   const [search, setSearch] = useState("");
//   // ── CONFIRM MODAL STATE ADDED ──
//   const [confirmProduct, setConfirmProduct] = useState(null);
//   // ── CHECKBOX SELECTION STATE ADDED ──
//   const [selectedIds, setSelectedIds] = useState([]);
//   // ── DOWNLOAD DROPDOWN STATE ADDED ──
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);

//   const handleFilterChange = (f) => {
//     setFilter(f);
//     setCurrentPage(1);
//   };

//   // ── SEARCH CHANGE WITH PAGE RESET ADDED ──
//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//   };

//   // ── CONFIRM DELETE HANDLER ADDED ──
//   const handleDelete = async () => {
//     if (!confirmProduct) return;
//     const data = await deleteProductAdmin(confirmProduct._id);
//     if (data.success) {
//       setProducts((prev) => prev.filter((item) => item._id !== confirmProduct._id));
//     }
//     setConfirmProduct(null);
//   };

//   // ── EXCEL DOWNLOAD — ALL FIELDS FROM ProductDetail ──
//   const handleDownloadExcel = () => {
//     const toDownload =
//       selectedIds.length > 0
//         ? filteredProducts.filter((p) => selectedIds.includes(p._id))
//         : filteredProducts;

//     const data = toDownload.map((p) => ({
//       // Product Info
//       "Title":              p.title || "",
//       "Brand":              p.brand || "",
//       "Description":        p.description || "",
//       "Price (₹)":          p.price || "",
//       "Unit":               p.unit || "",
//       "MOQ":                p.moq || "",
//       "Stock":              p.stock ?? "",
//       "Status":             p.status || "",
//       // Category
//       "Category":           p.category?.name || "",
//       "Subcategory":        p.subcategory?.name || "",
//       // Seller Info
//       "Seller Name":        p.seller?.name || "",
//       "Seller Email":       p.seller?.email || "",
//       "Seller Subscription": p.seller?.subscriptionActive ? "Active" : "Pending",
//       "Seller Account Status": p.seller?.accountStatus || "",
//       // Images
//       "Image 1":            p.images?.[0]?.url || "",
//       "Image 2":            p.images?.[1]?.url || "",
//       "Image 3":            p.images?.[2]?.url || "",
//     }));

//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Products");
//     XLSX.writeFile(wb, "products.xlsx");
//     setShowDownloadMenu(false);
//   };

//   // ── PDF DOWNLOAD — ALL FIELDS FROM ProductDetail ──
//   const handleDownloadPDF = () => {
//     const toDownload =
//       selectedIds.length > 0
//         ? filteredProducts.filter((p) => selectedIds.includes(p._id))
//         : filteredProducts;

//     const doc = new jsPDF({ orientation: "landscape" });
//     doc.setFontSize(14);
//     doc.text("Products Report", 14, 15);

//     autoTable(doc, {
//       startY: 22,
//       head: [[
//         "Title", "Brand", "Price", "Unit", "MOQ", "Stock",
//         "Category", "Subcategory", "Status",
//         "Seller", "Seller Email", "Subscription", "Account Status"
//       ]],
//       body: toDownload.map((p) => [
//         p.title || "",
//         p.brand || "",
//         p.price ? `₹${p.price.toLocaleString()}` : "",
//         p.unit || "",
//         p.moq || "",
//         p.stock ?? "",
//         p.category?.name || "",
//         p.subcategory?.name || "",
//         p.status || "",
//         p.seller?.name || "",
//         p.seller?.email || "",
//         p.seller?.subscriptionActive ? "Active" : "Pending",
//         p.seller?.accountStatus || "",
//       ]),
//       styles: { fontSize: 7 },
//       headStyles: { fillColor: [30, 64, 175] },
//     });

//     // Description alag section mein (long text hai)
//     const finalY = doc.lastAutoTable.finalY + 10;
//     if (finalY < 180) {
//       doc.setFontSize(11);
//       doc.text("Product Descriptions", 14, finalY);
//       autoTable(doc, {
//         startY: finalY + 4,
//         head: [["Title", "Description"]],
//         body: toDownload
//           .filter((p) => p.description)
//           .map((p) => [p.title || "", p.description || ""]),
//         styles: { fontSize: 7 },
//         headStyles: { fillColor: [55, 65, 81] },
//         columnStyles: { 1: { cellWidth: 180 } },
//       });
//     }

//     doc.save("products.pdf");
//     setShowDownloadMenu(false);
//   };

//   // ─────────────────────────────────────────
//   // FETCH PRODUCTS
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     fetchProducts();
//   }, [filter]);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const data = await getAdminProducts(filter);
//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         setError(data.message || "Failed to fetch");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────
//   // FILTER
//   // ─────────────────────────────────────────
//   const filteredProducts = (
//     filter === "all"
//       ? products
//       : products.filter((p) => p.status === filter)
//   )
//   // ── SEARCH FILTER ADDED ──
//   .filter((p) => {
//     if (!search.trim()) return true;
//     const q = search.toLowerCase();
//     return (
//       p.title?.toLowerCase().includes(q) ||
//       p.seller?.name?.toLowerCase().includes(q) ||
//       p.category?.name?.toLowerCase().includes(q)
//     );
//   });

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // ─────────────────────────────────────────
//   // STATUS STYLE
//   // ─────────────────────────────────────────
//   const statusStyle = (status) => {
//     switch (status) {
//       case "approved": return "bg-green-500/20 text-green-400";
//       case "rejected": return "bg-red-500/20 text-red-400";
//       default:         return "bg-yellow-500/20 text-yellow-400";
//     }
//   };

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen w-full bg-[#0A0A0F] text-white p-4 sm:p-6">

//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Products Management</h1>
//           <p className="text-white/40 text-sm mt-1">
//             {products.length} products found
//           </p>
//         </div>

//         {/* ── SEARCH + FILTER BUTTONS + DOWNLOAD ── */}
//         <div className="flex gap-2 flex-wrap items-center">

//           {/* SEARCH INPUT */}
//           <input
//             type="text"
//             value={search}
//             onChange={handleSearchChange}
//             placeholder="Search title, seller, category..."
//             className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 w-52"
//           />

//           {/* FILTER BUTTONS */}
//           {["all", "pending", "approved"].map((f) => (
//             <button
//               key={f}
//               onClick={() => handleFilterChange(f)}
//               className={`px-3 py-2 rounded-lg text-xs border transition capitalize
//                 ${filter === f
//                   ? "bg-blue-800 border-blue-600"
//                   : "bg-white/5 border-white/10 hover:bg-white/10"
//                 }`}
//             >
//               {f}
//             </button>
//           ))}

//           {/* ── DOWNLOAD DROPDOWN ── */}
//           <div className="relative">
//             <button
//               onClick={() => setShowDownloadMenu((v) => !v)}
//               className="px-4 py-2 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-1.5"
//             >
//               ↓ Download
//               {selectedIds.length > 0 && (
//                 <span className="bg-blue-600 text-white rounded-full px-1.5 py-0.5 text-[10px]">
//                   {selectedIds.length}
//                 </span>
//               )}
//               <span className="text-white/40 text-[10px]">▾</span>
//             </button>

//             {showDownloadMenu && (
//               <>
//                 <div
//                   className="fixed inset-0 z-10"
//                   onClick={() => setShowDownloadMenu(false)}
//                 />
//                 <div className="absolute right-0 top-full mt-1 z-20 bg-[#111827] border border-white/10 rounded-xl overflow-hidden w-40 shadow-xl">
//                   <p className="text-white/30 text-[10px] px-3 pt-2 pb-1">
//                     {selectedIds.length > 0
//                       ? `${selectedIds.length} selected`
//                       : "All filtered"}
//                   </p>
//                   <button
//                     onClick={handleDownloadExcel}
//                     className="w-full text-left px-3 py-2 text-xs text-green-400 hover:bg-white/5 transition flex items-center gap-2"
//                   >
//                     <span>📊</span> Excel (.xlsx)
//                   </button>
//                   <button
//                     onClick={handleDownloadPDF}
//                     className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-white/5 transition flex items-center gap-2"
//                   >
//                     <span>📄</span> PDF
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>

//         </div>
//       </div>

//       {/* ERROR */}
//       {error && (
//         <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
//           {error}
//         </div>
//       )}

//       {/* TABLE */}
//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">

//             <thead className="bg-white/5 text-white/60">
//               <tr>
//                 {/* ── SELECT ALL CHECKBOX ── */}
//                 <th className="p-4 w-10">
//                   <input
//                     type="checkbox"
//                     checked={
//                       filteredProducts.length > 0 &&
//                       filteredProducts.every((p) => selectedIds.includes(p._id))
//                     }
//                     onChange={(e) =>
//                       setSelectedIds(
//                         e.target.checked
//                           ? filteredProducts.map((p) => p._id)
//                           : []
//                       )
//                     }
//                     className="accent-blue-500 w-3.5 h-3.5 cursor-pointer"
//                   />
//                 </th>
//                 <th className="p-4">Image</th>
//                 <th className="p-4">Product</th>
//                 <th className="p-4">Seller</th>
//                 <th className="p-4">Category</th>
//                 <th className="p-4">Stats</th>
//                 <th className="p-4">Price</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>

//             <tbody>

//               {/* LOADING */}
//               {loading && (
//                 <tr>
//                   <td colSpan={9} className="p-10 text-center text-white/40">
//                     <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
//                     Loading...
//                   </td>
//                 </tr>
//               )}

//               {/* EMPTY */}
//               {!loading && filteredProducts.length === 0 && (
//                 <tr>
//                   <td colSpan={9} className="p-10 text-center text-white/40">
//                     No products found
//                   </td>
//                 </tr>
//               )}

//               {/* ROWS */}
//               {!loading && paginatedProducts.map((p) => (
//                 <tr
//                   key={p._id}
//                   className="border-t border-white/10 hover:bg-white/5 transition"
//                 >

//                   {/* ── ROW CHECKBOX ── */}
//                   <td className="p-4 w-10">
//                     <input
//                       type="checkbox"
//                       checked={selectedIds.includes(p._id)}
//                       onChange={(e) =>
//                         setSelectedIds((prev) =>
//                           e.target.checked
//                             ? [...prev, p._id]
//                             : prev.filter((id) => id !== p._id)
//                         )
//                       }
//                       className="accent-blue-500 w-3.5 h-3.5 cursor-pointer"
//                     />
//                   </td>

//                   {/* IMAGE */}
//                   <td className="p-4">
//                     {p.images?.[0]?.url ? (
//                       <img
//                         src={p.images[0].url}
//                         alt={p.title}
//                         className="h-12 w-12 object-cover rounded-lg border border-white/10"
//                       />
//                     ) : (
//                       <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center text-white/20 text-xs">
//                         N/A
//                       </div>
//                     )}
//                   </td>

//                   {/* PRODUCT */}
//                   <td className="p-4">
//                     <p className="font-medium">{p.title}</p>
//                     {p.brand && (
//                       <p className="text-white/40 text-xs">{p.brand}</p>
//                     )}
//                   </td>

//                   {/* SELLER */}
//                   <td className="p-4 text-white/60">
//                     <p>{p.seller?.name || "—"}</p>
//                     <p className="text-xs text-white/30">{p.seller?.email}</p>
//                   </td>

//                   {/* CATEGORY */}
//                   <td className="p-4 text-white/60">
//                     <p>{p.category?.name || "—"}</p>
//                     {p.subcategory?.name && (
//                       <p className="text-xs text-white/30">
//                         {p.subcategory.name}
//                       </p>
//                     )}
//                   </td>

//                   {/* ✅ NEW — STATS (Views + Enquiries) */}
//                   <td className="p-4 text-white/60">
//                     <p className="text-xs">👁 {p.views || 0} views</p>
//                     <p className="text-xs text-orange-400">📩 {p.enquiryCount || 0} enquiries</p>
//                   </td>

//                   {/* PRICE */}
//                   <td className="p-4 text-white/60">
//                     ₹{p.price?.toLocaleString()}
//                   </td>

//                   {/* STATUS */}
//                   <td className="p-4">
//                     <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${statusStyle(p.status)}`}>
//                       {p.status}
//                     </span>
//                     <p className={`text-xs mt-1 ${p.seller?.subscriptionActive ? "text-green-400" : "text-yellow-400"}`}>
//                       {p.seller?.subscriptionActive ? "✓ Subscribed" : "⚠ No Sub"}
//                     </p>
//                   </td>

//                   {/* ACTIONS */}
//                   <td className="p-4">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => navigate(`/admin/products/${p._id}`)}
//                         className="bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded text-xs transition"
//                       >
//                         View
//                       </button>
//                       {/* ── DELETE — ConfirmModal ── */}
//                       <button
//                         onClick={() => setConfirmProduct(p)}
//                         className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-xs transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>

//                 </tr>
//               ))}

//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         {!loading && totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
//             <p className="text-white/40 text-sm">
//               Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
//             </p>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
//               >
//                 ← Prev
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                 <button
//                   key={page}
//                   onClick={() => setCurrentPage(page)}
//                   className={`w-8 h-8 rounded-lg text-xs font-medium transition
//                     ${currentPage === page
//                       ? "bg-blue-600 text-white"
//                       : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
//                     }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── CONFIRM MODAL ── */}
//       <ConfirmModal
//         isOpen={!!confirmProduct}
//         title="Delete Product"
//         message={`Are you sure you want to delete "${confirmProduct?.title}"? This action cannot be undone.`}
//         onConfirm={handleDelete}
//         onCancel={() => setConfirmProduct(null)}
//       />

//     </div>
//   );
// }



// pages/admin/Products.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminProducts, deleteProductAdmin } from "../../api/productApi";
import ConfirmModal from "../../components/common/ConfirmModal";
// ── DOWNLOAD IMPORTS ADDED ──
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Products() {
  const [filter, setFilter]         = useState("all");
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const navigate                    = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // ── SEARCH STATE ADDED ──
  const [search, setSearch] = useState("");
  // ── CONFIRM MODAL STATE ADDED ──
  const [confirmProduct, setConfirmProduct] = useState(null);
  // ── CHECKBOX SELECTION STATE ADDED ──
  const [selectedIds, setSelectedIds] = useState([]);
  // ── DOWNLOAD DROPDOWN STATE ADDED ──
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const handleFilterChange = (f) => {
    setFilter(f);
    setCurrentPage(1);
  };

  // ── SEARCH CHANGE WITH PAGE RESET ADDED ──
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // ── CONFIRM DELETE HANDLER ADDED ──
  const handleDelete = async () => {
    if (!confirmProduct) return;
    const data = await deleteProductAdmin(confirmProduct._id);
    if (data.success) {
      setProducts((prev) => prev.filter((item) => item._id !== confirmProduct._id));
    }
    setConfirmProduct(null);
  };

  // ── EXCEL DOWNLOAD — ALL FIELDS FROM ProductDetail ──
  const handleDownloadExcel = () => {
    const toDownload =
      selectedIds.length > 0
        ? filteredProducts.filter((p) => selectedIds.includes(p._id))
        : filteredProducts;

    const data = toDownload.map((p) => ({
      // Product Info
      "Title":              p.title || "",
      "Brand":              p.brand || "",
      "Description":        p.description || "",
      "Price (₹)":          p.price || "",
      "Unit":               p.unit || "",
      "MOQ":                p.moq || "",
      "Stock":              p.stock ?? "",
      "Status":             p.status || "",
      // Category
      "Category":           p.category?.name || "",
      "Subcategory":        p.subcategory?.name || "",
      // Seller Info
      "Seller Name":        p.seller?.name || "",
      "Seller Email":       p.seller?.email || "",
      "Seller Subscription": p.seller?.subscriptionActive ? "Active" : "Pending",
      "Seller Account Status": p.seller?.accountStatus || "",
      // Images
      "Image 1":            p.images?.[0]?.url || "",
      "Image 2":            p.images?.[1]?.url || "",
      "Image 3":            p.images?.[2]?.url || "",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    XLSX.writeFile(wb, "products.xlsx");
    setShowDownloadMenu(false);
  };

  // ── PDF DOWNLOAD — ALL FIELDS FROM ProductDetail ──
  const handleDownloadPDF = () => {
    const toDownload =
      selectedIds.length > 0
        ? filteredProducts.filter((p) => selectedIds.includes(p._id))
        : filteredProducts;

    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(14);
    doc.text("Products Report", 14, 15);

    autoTable(doc, {
      startY: 22,
      head: [[
        "Title", "Brand", "Price", "Unit", "MOQ", "Stock",
        "Category", "Subcategory", "Status",
        "Seller", "Seller Email", "Subscription", "Account Status"
      ]],
      body: toDownload.map((p) => [
        p.title || "",
        p.brand || "",
        p.price ? `₹${p.price.toLocaleString()}` : "",
        p.unit || "",
        p.moq || "",
        p.stock ?? "",
        p.category?.name || "",
        p.subcategory?.name || "",
        p.status || "",
        p.seller?.name || "",
        p.seller?.email || "",
        p.seller?.subscriptionActive ? "Active" : "Pending",
        p.seller?.accountStatus || "",
      ]),
      styles: { fontSize: 7 },
      headStyles: { fillColor: [30, 64, 175] },
    });

    // Description alag section mein (long text hai)
    const finalY = doc.lastAutoTable.finalY + 10;
    if (finalY < 180) {
      doc.setFontSize(11);
      doc.text("Product Descriptions", 14, finalY);
      autoTable(doc, {
        startY: finalY + 4,
        head: [["Title", "Description"]],
        body: toDownload
          .filter((p) => p.description)
          .map((p) => [p.title || "", p.description || ""]),
        styles: { fontSize: 7 },
        headStyles: { fillColor: [55, 65, 81] },
        columnStyles: { 1: { cellWidth: 180 } },
      });
    }

    doc.save("products.pdf");
    setShowDownloadMenu(false);
  };

  // ─────────────────────────────────────────
  // FETCH PRODUCTS
  // ─────────────────────────────────────────
  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminProducts(filter);
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.message || "Failed to fetch");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────
  // FILTER
  // ─────────────────────────────────────────
  const filteredProducts = (
    filter === "all"
      ? products
      : products.filter((p) => p.status === filter)
  )
  // ── SEARCH FILTER ADDED ──
  .filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.seller?.name?.toLowerCase().includes(q) ||
      p.category?.name?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  //  NEW - Smart pagination (sirf limited pages + ellipsis dikhega jab pages zyada ho)
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1; // current page ke left-right kitne number dikhne hai

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  // ─────────────────────────────────────────
  // STATUS STYLE
  // ─────────────────────────────────────────
  const statusStyle = (status) => {
    switch (status) {
      case "approved": return "bg-green-500/20 text-green-400";
      case "rejected": return "bg-red-500/20 text-red-400";
      default:         return "bg-yellow-500/20 text-yellow-400";
    }
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen w-full bg-[#0A0A0F] text-white p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          <p className="text-white/40 text-sm mt-1">
            {products.length} products found
          </p>
        </div>

        {/* ── SEARCH + FILTER BUTTONS + DOWNLOAD ── */}
        <div className="flex gap-2 flex-wrap items-center">

          {/* SEARCH INPUT */}
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search title, seller, category..."
            className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 w-52"
          />

          {/* FILTER BUTTONS */}
          {["all", "pending", "approved"].map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-3 py-2 rounded-lg text-xs border transition capitalize
                ${filter === f
                  ? "bg-blue-800 border-blue-600"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
            >
              {f}
            </button>
          ))}

          {/* ── DOWNLOAD DROPDOWN ── */}
          <div className="relative">
            <button
              onClick={() => setShowDownloadMenu((v) => !v)}
              className="px-4 py-2 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-1.5"
            >
              ↓ Download
              {selectedIds.length > 0 && (
                <span className="bg-blue-600 text-white rounded-full px-1.5 py-0.5 text-[10px]">
                  {selectedIds.length}
                </span>
              )}
              <span className="text-white/40 text-[10px]">▾</span>
            </button>

            {showDownloadMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDownloadMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 z-20 bg-[#111827] border border-white/10 rounded-xl overflow-hidden w-40 shadow-xl">
                  <p className="text-white/30 text-[10px] px-3 pt-2 pb-1">
                    {selectedIds.length > 0
                      ? `${selectedIds.length} selected`
                      : "All filtered"}
                  </p>
                  <button
                    onClick={handleDownloadExcel}
                    className="w-full text-left px-3 py-2 text-xs text-green-400 hover:bg-white/5 transition flex items-center gap-2"
                  >
                    <span>📊</span> Excel (.xlsx)
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-white/5 transition flex items-center gap-2"
                  >
                    <span>📄</span> PDF
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">

            <thead className="bg-white/5 text-white/60">
              <tr>
                {/* ── SELECT ALL CHECKBOX ── */}
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredProducts.length > 0 &&
                      filteredProducts.every((p) => selectedIds.includes(p._id))
                    }
                    onChange={(e) =>
                      setSelectedIds(
                        e.target.checked
                          ? filteredProducts.map((p) => p._id)
                          : []
                      )
                    }
                    className="accent-blue-500 w-3.5 h-3.5 cursor-pointer"
                  />
                </th>
                <th className="p-4">Image</th>
                <th className="p-4">Product</th>
                <th className="p-4">Seller</th>
                <th className="p-4">Category</th>
                <th className="p-4">Stats</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>

              {/* LOADING */}
              {loading && (
                <tr>
                  <td colSpan={9} className="p-10 text-center text-white/40">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              )}

              {/* EMPTY */}
              {!loading && filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-10 text-center text-white/40">
                    No products found
                  </td>
                </tr>
              )}

              {/* ROWS */}
              {!loading && paginatedProducts.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >

                  {/* ── ROW CHECKBOX ── */}
                  <td className="p-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(p._id)}
                      onChange={(e) =>
                        setSelectedIds((prev) =>
                          e.target.checked
                            ? [...prev, p._id]
                            : prev.filter((id) => id !== p._id)
                        )
                      }
                      className="accent-blue-500 w-3.5 h-3.5 cursor-pointer"
                    />
                  </td>

                  {/* IMAGE */}
                  <td className="p-4">
                    {p.images?.[0]?.url ? (
                      <img
                        src={p.images[0].url}
                        alt={p.title}
                        className="h-12 w-12 object-cover rounded-lg border border-white/10"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center text-white/20 text-xs">
                        N/A
                      </div>
                    )}
                  </td>

                  {/* PRODUCT */}
                  <td className="p-4">
                    <p className="font-medium">{p.title}</p>
                    {p.brand && (
                      <p className="text-white/40 text-xs">{p.brand}</p>
                    )}
                  </td>

                  {/* SELLER */}
                  <td className="p-4 text-white/60">
                    <p>{p.seller?.name || "—"}</p>
                    <p className="text-xs text-white/30">{p.seller?.email}</p>
                  </td>

                  {/* CATEGORY */}
                  <td className="p-4 text-white/60">
                    <p>{p.category?.name || "—"}</p>
                    {p.subcategory?.name && (
                      <p className="text-xs text-white/30">
                        {p.subcategory.name}
                      </p>
                    )}
                  </td>

                  {/*  NEW — STATS (Views + Enquiries) */}
                  <td className="p-4 text-white/60">
                    <p className="text-xs">👁 {p.views || 0} views</p>
                    <p className="text-xs text-orange-400">📩 {p.enquiryCount || 0} enquiries</p>
                  </td>

                  {/* PRICE */}
                  <td className="p-4 text-white/60">
                    ₹{p.price?.toLocaleString()}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${statusStyle(p.status)}`}>
                      {p.status}
                    </span>
                    <p className={`text-xs mt-1 ${p.seller?.subscriptionActive ? "text-green-400" : "text-yellow-400"}`}>
                      {p.seller?.subscriptionActive ? "✓ Subscribed" : "⚠ No Sub"}
                    </p>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/products/${p._id}`)}
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded text-xs transition"
                      >
                        View
                      </button>
                      {/* ── DELETE — ConfirmModal ── */}
                      <button
                        onClick={() => setConfirmProduct(p)}
                        className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-xs transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-white/40 text-sm">
              Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                ← Prev
              </button>
              {/*  UPDATED - ab getPageNumbers() se limited pages + ellipsis render honge */}
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`dots-${idx}`} className="px-2 text-white/30 text-xs">
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition
                      ${currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
                      }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── CONFIRM MODAL ── */}
      <ConfirmModal
        isOpen={!!confirmProduct}
        title="Delete Product"
        message={`Are you sure you want to delete "${confirmProduct?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmProduct(null)}
      />

    </div>
  );
}