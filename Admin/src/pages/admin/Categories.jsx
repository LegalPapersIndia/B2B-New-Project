// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import ConfirmModal from "../../components/common/ConfirmModal";
// // // import * as LucideIcons from "lucide-react";

// // // // ✅ NEW - all valid Lucide icon names (PascalCase components)
// // // const ALL_ICON_NAMES = Object.keys(LucideIcons).filter(
// // //   (key) => /^[A-Z]/.test(key) && typeof LucideIcons[key] === "object"
// // // );

// // // // ✅ NEW - Icon Picker component (searchable dropdown with preview grid)
// // // function IconPicker({ value, onChange }) {
// // //   const [open, setOpen] = useState(false);
// // //   const [search, setSearch] = useState("");

// // //   const filtered = search
// // //     ? ALL_ICON_NAMES.filter((name) =>
// // //         name.toLowerCase().includes(search.toLowerCase())
// // //       ).slice(0, 60)
// // //     : ALL_ICON_NAMES.slice(0, 60);

// // //   const SelectedIcon = LucideIcons[value];

// // //   return (
// // //     <div className="relative">
// // //       {/* TRIGGER */}
// // //       <button
// // //         type="button"
// // //         onClick={() => setOpen((o) => !o)}
// // //         className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// // //       >
// // //         {SelectedIcon && <SelectedIcon size={18} />}
// // //         <span>{value || "Select Icon"}</span>
// // //       </button>

// // //       {/* DROPDOWN */}
// // //       {open && (
// // //         <div className="absolute z-50 mt-2 w-full max-h-72 overflow-hidden bg-[#0D0D14] border border-white/10 rounded-xl shadow-xl p-3">
// // //           {/* SEARCH */}
// // //           <input
// // //             type="text"
// // //             autoFocus
// // //             placeholder="Search icon..."
// // //             value={search}
// // //             onChange={(e) => setSearch(e.target.value)}
// // //             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-700 mb-2"
// // //           />

// // //           {/* GRID */}
// // //           <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
// // //             {filtered.map((name) => {
// // //               const Icon = LucideIcons[name];
// // //               return (
// // //                 <button
// // //                   key={name}
// // //                   type="button"
// // //                   title={name}
// // //                   onClick={() => {
// // //                     onChange(name);
// // //                     setOpen(false);
// // //                     setSearch("");
// // //                   }}
// // //                   className={`flex items-center justify-center p-2 rounded-lg border transition ${
// // //                     value === name
// // //                       ? "border-blue-600 bg-blue-600/20"
// // //                       : "border-white/10 hover:bg-white/10"
// // //                   }`}
// // //                 >
// // //                   <Icon size={18} />
// // //                 </button>
// // //               );
// // //             })}

// // //             {filtered.length === 0 && (
// // //               <p className="col-span-6 text-center text-white/40 text-xs py-4">
// // //                 No icons found
// // //               </p>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default function Categories() {
// // //   const API = import.meta.env.VITE_API_URL;

// // //   const [categories, setCategories] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const itemsPerPage = 10;
// // //   const [editingId, setEditingId] = useState(null);
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     slug: "",
// // //     desc: "",
// // //     icon: "Box",
// // //     showOnHome: false,
// // //     order: 0, // ✅ ADD
// // //   });
// // //   const [image, setImage] = useState(null);

// // //   // ================= CONFIRM MODAL =================
// // //   const [confirmModal, setConfirmModal] = useState({
// // //     isOpen: false,
// // //     title: "",
// // //     message: "",
// // //     confirmText: "OK",
// // //     showCancel: false,
// // //     onConfirm: null,
// // //   });

// // //   // ================= FETCH =================
// // //   useEffect(() => {
// // //     fetchCategories();
// // //   }, []);

// // //   const fetchCategories = async () => {
// // //     try {
// // //       const res = await axios.get(`${API}/categories`);
// // //       setCategories(res.data.categories || []);
// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //   };

// // //   const totalPages = Math.ceil(categories.length / itemsPerPage);
// // //   const paginatedCategories = categories.slice(
// // //     (currentPage - 1) * itemsPerPage,
// // //     currentPage * itemsPerPage
// // //   );

// // //   // ================= HANDLE CHANGE =================
// // //   const handleChange = (e) => {
// // //     const { name, value, type, checked } = e.target;
// // //     setFormData({
// // //       ...formData,
// // //       [name]: type === "checkbox" ? checked : value,
// // //     });
// // //   };

// // //   // ================= SUBMIT =================
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       setLoading(true);

// // //       const data = new FormData();
// // //       data.append("name", formData.name);
// // //       data.append("slug", formData.slug);
// // //       data.append("desc", formData.desc);
// // //       data.append("icon", formData.icon);
// // //       data.append("showOnHome", formData.showOnHome);
// // //       data.append("order", formData.order); // ✅ ADD
// // //       if (image) {
// // //         data.append("image", image);
// // //       }

// // //       // ================= UPDATE =================
// // //       if (editingId) {
// // //         const res = await axios.put(
// // //           `${API}/categories/${editingId}`,
// // //           data,
// // //           {
// // //             headers: {
// // //               "Content-Type": "multipart/form-data",
// // //             },
// // //           }
// // //         );

// // //         setConfirmModal({
// // //           isOpen: true,
// // //           title: "✅ Updated!",
// // //           message: res.data.message || "Category successfully updated.",
// // //           confirmText: "OK",
// // //           showCancel: false,
// // //           onConfirm: () => setConfirmModal({ isOpen: false }),
// // //         });
// // //       }

// // //       // ================= CREATE =================
// // //       else {
// // //         const res = await axios.post(
// // //           `${API}/categories/create`,
// // //           data,
// // //           {
// // //             headers: {
// // //               "Content-Type": "multipart/form-data",
// // //             },
// // //           }
// // //         );

// // //         setConfirmModal({
// // //           isOpen: true,
// // //           title: "✅ Category Added!",
// // //           message: res.data.message || "Category successfully created.",
// // //           confirmText: "OK",
// // //           showCancel: false,
// // //           onConfirm: () => setConfirmModal({ isOpen: false }),
// // //         });
// // //       }

// // //       // RESET
// // //       setFormData({ name: "", slug: "", desc: "", icon: "Box", showOnHome: false, order: 0 }); // ✅ ADD
// // //       setImage(null);
// // //       setEditingId(null);
// // //       fetchCategories();
// // //     } catch (error) {
// // //       console.log(error);

// // //       setConfirmModal({
// // //         isOpen: true,
// // //         title: "❌ Error",
// // //         message: error.response?.data?.message || "Something went wrong.",
// // //         confirmText: "OK",
// // //         showCancel: false,
// // //         onConfirm: () => setConfirmModal({ isOpen: false }),
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ================= DELETE =================
// // //   const handleDelete = (id) => {
// // //     setConfirmModal({
// // //       isOpen: true,
// // //       title: "Delete Category",
// // //       message: "Are you sure? This category will be permanently deleted.",
// // //       confirmText: "Delete",
// // //       showCancel: true,
// // //       onConfirm: async () => {
// // //         try {
// // //           await axios.delete(`${API}/categories/${id}`);
// // //           setConfirmModal({ isOpen: false });
// // //           fetchCategories();
// // //         } catch (error) {
// // //           console.log(error);
// // //           setConfirmModal({
// // //             isOpen: true,
// // //             title: "❌ Error",
// // //             message: "Delete failed. Please try again.",
// // //             confirmText: "OK",
// // //             showCancel: false,
// // //             onConfirm: () => setConfirmModal({ isOpen: false }),
// // //           });
// // //         }
// // //       },
// // //     });
// // //   };

// // //   // ================= EDIT =================
// // //   const handleEdit = (cat) => {
// // //     setEditingId(cat._id);
// // //     setFormData({
// // //       name: cat.name,
// // //       slug: cat.slug,
// // //       desc: cat.desc,
// // //       icon: cat.icon || "Box",
// // //       showOnHome: cat.showOnHome || false,
// // //       order: cat.order || 0, // ✅ ADD
// // //     });
// // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // //   };

// // //   // ================= CANCEL EDIT =================
// // //   const cancelEdit = () => {
// // //     setEditingId(null);
// // //     setFormData({ name: "", slug: "", desc: "", icon: "Box", showOnHome: false, order: 0 }); // ✅ ADD
// // //     setImage(null);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

// // //       {/* ================= CONFIRM MODAL ================= */}
// // //       <ConfirmModal
// // //         isOpen={confirmModal.isOpen}
// // //         title={confirmModal.title}
// // //         message={confirmModal.message}
// // //         confirmText={confirmModal.confirmText}
// // //         showCancel={confirmModal.showCancel}
// // //         onConfirm={confirmModal.onConfirm}
// // //         onCancel={() => setConfirmModal({ isOpen: false })}
// // //       />

// // //       {/* ================= HEADER ================= */}
// // //       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
// // //         <div>
// // //           <h1 className="text-2xl font-bold">Categories Management</h1>
// // //           <p className="text-sm text-white/40 mt-1">
// // //             Manage marketplace product categories
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* ================= FORM ================= */}
// // //       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">
// // //         <form
// // //           onSubmit={handleSubmit}
// // //           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
// // //         >
// // //           {/* NAME */}
// // //           <input
// // //             type="text"
// // //             name="name"
// // //             placeholder="Category Name"
// // //             value={formData.name}
// // //             onChange={handleChange}
// // //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// // //             required
// // //           />

// // //           {/* SLUG */}
// // //           <input
// // //             type="text"
// // //             name="slug"
// // //             placeholder="Category Slug"
// // //             value={formData.slug}
// // //             onChange={handleChange}
// // //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// // //             required
// // //           />

// // //           {/* DESC */}
// // //           <input
// // //             type="text"
// // //             name="desc"
// // //             placeholder="Description"
// // //             value={formData.desc}
// // //             onChange={handleChange}
// // //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// // //             required
// // //           />

// // //           {/* IMAGE */}
// // //           <input
// // //             type="file"
// // //             onChange={(e) => setImage(e.target.files[0])}
// // //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
// // //           />

// // //           {/* ✅ UPDATED - ICON PICKER (searchable, 1500+ icons) */}
// // //           <IconPicker
// // //             value={formData.icon}
// // //             onChange={(iconName) =>
// // //               setFormData((prev) => ({ ...prev, icon: iconName }))
// // //             }
// // //           />

// // //           {/* ✅ NEW - SHOW ON HOME CHECKBOX */}
// // //           <label className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm cursor-pointer">
// // //             <input
// // //               type="checkbox"
// // //               name="showOnHome"
// // //               checked={formData.showOnHome}
// // //               onChange={handleChange}
// // //               className="w-4 h-4"
// // //             />
// // //             Show on Home
// // //           </label>

// // //           {/* ✅ ADD - ORDER */}
// // //           <input
// // //             type="number"
// // //             name="order"
// // //             placeholder="Display Order (1, 2, 3...)"
// // //             value={formData.order}
// // //             onChange={handleChange}
// // //             min="0"
// // //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// // //           />

// // //           {/* BUTTON */}
// // //           <div className="flex gap-2">
// // //             <button
// // //               type="submit"
// // //               disabled={loading}
// // //               className="bg-blue-800 hover:bg-blue-900 px-4 py-3 rounded-xl text-sm font-medium transition w-full"
// // //             >
// // //               {loading
// // //                 ? editingId
// // //                   ? "Updating..."
// // //                   : "Creating..."
// // //                 : editingId
// // //                 ? "Update"
// // //                 : "Add Category"}
// // //             </button>

// // //             {editingId && (
// // //               <button
// // //                 type="button"
// // //                 onClick={cancelEdit}
// // //                 className="bg-gray-700 hover:bg-gray-800 px-4 py-3 rounded-xl text-sm"
// // //               >
// // //                 Cancel
// // //               </button>
// // //             )}
// // //           </div>
// // //         </form>
// // //       </div>

// // //       {/* ================= STATS ================= */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// // //         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
// // //           <p className="text-white/40 text-sm">Total Categories</p>
// // //           <h2 className="text-3xl font-bold mt-2">{categories?.length || 0}</h2>
// // //         </div>

// // //         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
// // //           <p className="text-white/40 text-sm">Active Categories</p>
// // //           <h2 className="text-3xl font-bold mt-2 text-green-400">
// // //             {categories?.length || 0}
// // //           </h2>
// // //         </div>

// // //         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
// // //           <p className="text-white/40 text-sm">Total Products</p>
// // //           <h2 className="text-3xl font-bold mt-2 text-blue-400">
// // //             {categories?.reduce((acc, c) => acc + (c?.productCount || 0), 0) || 0}
// // //           </h2>
// // //         </div>

// // //         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
// // //           <p className="text-white/40 text-sm">Total Slugs</p>
// // //           <h2 className="text-3xl font-bold mt-2 text-violet-400">
// // //             {categories?.length || 0}
// // //           </h2>
// // //         </div>
// // //       </div>

// // //       {/* ================= TABLE ================= */}
// // //       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
// // //         <div className="overflow-x-auto">
// // //           <table className="min-w-full text-sm text-left">
// // //             {/* HEAD */}
// // //             <thead className="bg-white/5 text-white/50 border-b border-white/10">
// // //               <tr>
// // //                 <th className="p-4">Image</th>
// // //                 <th className="p-4">Category</th>
// // //                 <th className="p-4">Slug</th>
// // //                 <th className="p-4">Icon</th>
// // //                 <th className="p-4">Products</th>
// // //                 <th className="p-4">Home</th>
// // //                 <th className="p-4">Order</th>
// // //                 <th className="p-4">Status</th>
// // //                 <th className="p-4">Actions</th>
// // //               </tr>
// // //             </thead>

// // //             {/* BODY */}
// // //             <tbody>
// // //               {paginatedCategories.map((cat) => (
// // //                 <tr
// // //                   key={cat._id}
// // //                   className="border-t border-white/10 hover:bg-white/[0.03] transition"
// // //                 >
// // //                   {/* IMAGE */}
// // //                   <td className="p-4">
// // //                     <img
// // //                       src={cat.image}
// // //                       alt={cat.name}
// // //                       className="w-14 h-14 rounded-lg object-cover"
// // //                     />
// // //                   </td>

// // //                   {/* NAME */}
// // //                   <td className="p-4 font-medium">{cat.name}</td>

// // //                   {/* SLUG */}
// // //                   <td className="p-4 text-white/50">/{cat.slug}</td>

// // //                   {/* ICON */}
// // //                   <td className="p-4">
// // //                     {LucideIcons[cat.icon] &&
// // //                       React.createElement(LucideIcons[cat.icon], { size: 18 })}
// // //                     <span className="text-white/40 text-xs ml-1">{cat.icon}</span>
// // //                   </td>

// // //                   {/* PRODUCTS */}
// // //                   <td className="p-4 text-white/60">{cat?.productCount || 0}</td>

// // //                   {/* SHOW ON HOME */}
// // //                   <td className="p-4">
// // //                     <span
// // //                       className={`px-3 py-1 rounded-full text-[11px] font-medium ${
// // //                         cat.showOnHome
// // //                           ? "bg-blue-500/20 text-blue-400"
// // //                           : "bg-white/5 text-white/40"
// // //                       }`}
// // //                     >
// // //                       {cat.showOnHome ? "Yes" : "No"}
// // //                     </span>
// // //                   </td>

// // //                   {/* ✅ ADD - ORDER */}
// // //                   <td className="p-4 text-white/60 font-mono">{cat.order ?? 0}</td>

// // //                   {/* STATUS */}
// // //                   <td className="p-4">
// // //                     <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-green-500/20 text-green-400">
// // //                       active
// // //                     </span>
// // //                   </td>

// // //                   {/* ACTIONS */}
// // //                   <td className="p-4">
// // //                     <div className="flex gap-2 flex-wrap">
// // //                       {/* EDIT */}
// // //                       <button
// // //                         onClick={() => handleEdit(cat)}
// // //                         className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
// // //                       >
// // //                         Edit
// // //                       </button>

// // //                       {/* DELETE */}
// // //                       <button
// // //                         onClick={() => handleDelete(cat._id)}
// // //                         className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
// // //                       >
// // //                         Delete
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ))}

// // //               {/* EMPTY */}
// // //               {categories?.length === 0 && (
// // //                 <tr>
// // //                   <td colSpan="9" className="text-center py-10 text-white/40">
// // //                     No Categories Found
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* ================= PAGINATION ================= */}
// // //         {totalPages > 1 && (
// // //           <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
// // //             <p className="text-white/40 text-sm">
// // //               Showing {(currentPage - 1) * itemsPerPage + 1}–
// // //               {Math.min(currentPage * itemsPerPage, categories.length)} of{" "}
// // //               {categories.length}
// // //             </p>
// // //             <div className="flex items-center gap-2">
// // //               <button
// // //                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
// // //                 disabled={currentPage === 1}
// // //                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
// // //               >
// // //                 ← Prev
// // //               </button>

// // //               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
// // //                 <button
// // //                   key={page}
// // //                   onClick={() => setCurrentPage(page)}
// // //                   className={`w-8 h-8 rounded-lg text-xs font-medium transition ${
// // //                     currentPage === page
// // //                       ? "bg-blue-600 text-white"
// // //                       : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
// // //                   }`}
// // //                 >
// // //                   {page}
// // //                 </button>
// // //               ))}

// // //               <button
// // //                 onClick={() =>
// // //                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
// // //                 }
// // //                 disabled={currentPage === totalPages}
// // //                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
// // //               >
// // //                 Next →
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import ConfirmModal from "../../components/common/ConfirmModal";
// // import * as LucideIcons from "lucide-react";

// // // ✅ NEW - all valid Lucide icon names (PascalCase components)
// // const ALL_ICON_NAMES = Object.keys(LucideIcons).filter(
// //   (key) => /^[A-Z]/.test(key) && typeof LucideIcons[key] === "object"
// // );

// // // ✅ NEW - Icon Picker component (searchable dropdown with preview grid)
// // function IconPicker({ value, onChange }) {
// //   const [open, setOpen] = useState(false);
// //   const [search, setSearch] = useState("");

// //   const filtered = search
// //     ? ALL_ICON_NAMES.filter((name) =>
// //         name.toLowerCase().includes(search.toLowerCase())
// //       ).slice(0, 60)
// //     : ALL_ICON_NAMES.slice(0, 60);

// //   const SelectedIcon = LucideIcons[value];

// //   return (
// //     <div className="relative">
// //       {/* TRIGGER */}
// //       <button
// //         type="button"
// //         onClick={() => setOpen((o) => !o)}
// //         className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// //       >
// //         {SelectedIcon && <SelectedIcon size={18} />}
// //         <span>{value || "Select Icon"}</span>
// //       </button>

// //       {/* DROPDOWN */}
// //       {open && (
// //         <div className="absolute z-50 mt-2 w-full max-h-72 overflow-hidden bg-[#0D0D14] border border-white/10 rounded-xl shadow-xl p-3">
// //           {/* SEARCH */}
// //           <input
// //             type="text"
// //             autoFocus
// //             placeholder="Search icon..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-700 mb-2"
// //           />

// //           {/* GRID */}
// //           <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
// //             {filtered.map((name) => {
// //               const Icon = LucideIcons[name];
// //               return (
// //                 <button
// //                   key={name}
// //                   type="button"
// //                   title={name}
// //                   onClick={() => {
// //                     onChange(name);
// //                     setOpen(false);
// //                     setSearch("");
// //                   }}
// //                   className={`flex items-center justify-center p-2 rounded-lg border transition ${
// //                     value === name
// //                       ? "border-blue-600 bg-blue-600/20"
// //                       : "border-white/10 hover:bg-white/10"
// //                   }`}
// //                 >
// //                   <Icon size={18} />
// //                 </button>
// //               );
// //             })}

// //             {filtered.length === 0 && (
// //               <p className="col-span-6 text-center text-white/40 text-xs py-4">
// //                 No icons found
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default function Categories() {
// //   const API = import.meta.env.VITE_API_URL;

// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 10;
// //   const [editingId, setEditingId] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     slug: "",
// //     desc: "",
// //     icon: "Box",
// //     showOnHome: false,
// //     order: 0, // ✅ ADD
// //   });
// //   const [image, setImage] = useState(null);

// //   // ================= CONFIRM MODAL =================
// //   const [confirmModal, setConfirmModal] = useState({
// //     isOpen: false,
// //     title: "",
// //     message: "",
// //     confirmText: "OK",
// //     showCancel: false,
// //     onConfirm: null,
// //   });

// //   // ================= FETCH =================
// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   const fetchCategories = async () => {
// //     try {
// //       const res = await axios.get(`${API}/categories`);
// //       setCategories(res.data.categories || []);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const totalPages = Math.ceil(categories.length / itemsPerPage);
// //   const paginatedCategories = categories.slice(
// //     (currentPage - 1) * itemsPerPage,
// //     currentPage * itemsPerPage
// //   );

// //   // ✅ NEW - Smart pagination (sirf limited pages + ellipsis dikhega jab pages zyada ho)
// //   const getPageNumbers = () => {
// //     const pages = [];
// //     const delta = 1;

// //     for (let i = 1; i <= totalPages; i++) {
// //       if (
// //         i === 1 ||
// //         i === totalPages ||
// //         (i >= currentPage - delta && i <= currentPage + delta)
// //       ) {
// //         pages.push(i);
// //       } else if (pages[pages.length - 1] !== "...") {
// //         pages.push("...");
// //       }
// //     }
// //     return pages;
// //   };

// //   // ================= HANDLE CHANGE =================
// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === "checkbox" ? checked : value,
// //     });
// //   };

// //   // ================= SUBMIT =================
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       setLoading(true);

// //       const data = new FormData();
// //       data.append("name", formData.name);
// //       data.append("slug", formData.slug);
// //       data.append("desc", formData.desc);
// //       data.append("icon", formData.icon);
// //       data.append("showOnHome", formData.showOnHome);
// //       data.append("order", formData.order); // ✅ ADD
// //       if (image) {
// //         data.append("image", image);
// //       }

// //       // ================= UPDATE =================
// //       if (editingId) {
// //         const res = await axios.put(
// //           `${API}/categories/${editingId}`,
// //           data,
// //           {
// //             headers: {
// //               "Content-Type": "multipart/form-data",
// //             },
// //           }
// //         );

// //         setConfirmModal({
// //           isOpen: true,
// //           title: "✅ Updated!",
// //           message: res.data.message || "Category successfully updated.",
// //           confirmText: "OK",
// //           showCancel: false,
// //           onConfirm: () => setConfirmModal({ isOpen: false }),
// //         });
// //       }

// //       // ================= CREATE =================
// //       else {
// //         const res = await axios.post(
// //           `${API}/categories/create`,
// //           data,
// //           {
// //             headers: {
// //               "Content-Type": "multipart/form-data",
// //             },
// //           }
// //         );

// //         setConfirmModal({
// //           isOpen: true,
// //           title: "✅ Category Added!",
// //           message: res.data.message || "Category successfully created.",
// //           confirmText: "OK",
// //           showCancel: false,
// //           onConfirm: () => setConfirmModal({ isOpen: false }),
// //         });
// //       }

// //       // RESET
// //       setFormData({ name: "", slug: "", desc: "", icon: "Box", showOnHome: false, order: 0 }); // ✅ ADD
// //       setImage(null);
// //       setEditingId(null);
// //       fetchCategories();
// //     } catch (error) {
// //       console.log(error);

// //       setConfirmModal({
// //         isOpen: true,
// //         title: "❌ Error",
// //         message: error.response?.data?.message || "Something went wrong.",
// //         confirmText: "OK",
// //         showCancel: false,
// //         onConfirm: () => setConfirmModal({ isOpen: false }),
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ================= DELETE =================
// //   const handleDelete = (id) => {
// //     setConfirmModal({
// //       isOpen: true,
// //       title: "Delete Category",
// //       message: "Are you sure? This category will be permanently deleted.",
// //       confirmText: "Delete",
// //       showCancel: true,
// //       onConfirm: async () => {
// //         try {
// //           await axios.delete(`${API}/categories/${id}`);
// //           setConfirmModal({ isOpen: false });
// //           fetchCategories();
// //         } catch (error) {
// //           console.log(error);
// //           setConfirmModal({
// //             isOpen: true,
// //             title: "❌ Error",
// //             message: "Delete failed. Please try again.",
// //             confirmText: "OK",
// //             showCancel: false,
// //             onConfirm: () => setConfirmModal({ isOpen: false }),
// //           });
// //         }
// //       },
// //     });
// //   };

// //   // ================= EDIT =================
// //   const handleEdit = (cat) => {
// //     setEditingId(cat._id);
// //     setFormData({
// //       name: cat.name,
// //       slug: cat.slug,
// //       desc: cat.desc,
// //       icon: cat.icon || "Box",
// //       showOnHome: cat.showOnHome || false,
// //       order: cat.order || 0, // ✅ ADD
// //     });
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   // ================= CANCEL EDIT =================
// //   const cancelEdit = () => {
// //     setEditingId(null);
// //     setFormData({ name: "", slug: "", desc: "", icon: "Box", showOnHome: false, order: 0 }); // ✅ ADD
// //     setImage(null);
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

// //       {/* ================= CONFIRM MODAL ================= */}
// //       <ConfirmModal
// //         isOpen={confirmModal.isOpen}
// //         title={confirmModal.title}
// //         message={confirmModal.message}
// //         confirmText={confirmModal.confirmText}
// //         showCancel={confirmModal.showCancel}
// //         onConfirm={confirmModal.onConfirm}
// //         onCancel={() => setConfirmModal({ isOpen: false })}
// //       />

// //       {/* ================= HEADER ================= */}
// //       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
// //         <div>
// //           <h1 className="text-2xl font-bold">Categories Management</h1>
// //           <p className="text-sm text-white/40 mt-1">
// //             Manage marketplace product categories
// //           </p>
// //         </div>
// //       </div>

// //       {/* ================= FORM ================= */}
// //       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">
// //         <form
// //           onSubmit={handleSubmit}
// //           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
// //         >
// //           {/* NAME */}
// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Category Name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// //             required
// //           />

// //           {/* SLUG */}
// //           <input
// //             type="text"
// //             name="slug"
// //             placeholder="Category Slug"
// //             value={formData.slug}
// //             onChange={handleChange}
// //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// //             required
// //           />

// //           {/* DESC */}
// //           <input
// //             type="text"
// //             name="desc"
// //             placeholder="Description"
// //             value={formData.desc}
// //             onChange={handleChange}
// //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// //             required
// //           />

// //           {/* IMAGE */}
// //           <input
// //             type="file"
// //             onChange={(e) => setImage(e.target.files[0])}
// //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
// //           />

// //           {/* ✅ UPDATED - ICON PICKER (searchable, 1500+ icons) */}
// //           <IconPicker
// //             value={formData.icon}
// //             onChange={(iconName) =>
// //               setFormData((prev) => ({ ...prev, icon: iconName }))
// //             }
// //           />

// //           {/* ✅ NEW - SHOW ON HOME CHECKBOX */}
// //           <label className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm cursor-pointer">
// //             <input
// //               type="checkbox"
// //               name="showOnHome"
// //               checked={formData.showOnHome}
// //               onChange={handleChange}
// //               className="w-4 h-4"
// //             />
// //             Show on Home
// //           </label>

// //           {/* ✅ ADD - ORDER */}
// //           <input
// //             type="number"
// //             name="order"
// //             placeholder="Display Order (1, 2, 3...)"
// //             value={formData.order}
// //             onChange={handleChange}
// //             min="0"
// //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// //           />

// //           {/* BUTTON */}
// //           <div className="flex gap-2">
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="bg-blue-800 hover:bg-blue-900 px-4 py-3 rounded-xl text-sm font-medium transition w-full"
// //             >
// //               {loading
// //                 ? editingId
// //                   ? "Updating..."
// //                   : "Creating..."
// //                 : editingId
// //                 ? "Update"
// //                 : "Add Category"}
// //             </button>

// //             {editingId && (
// //               <button
// //                 type="button"
// //                 onClick={cancelEdit}
// //                 className="bg-gray-700 hover:bg-gray-800 px-4 py-3 rounded-xl text-sm"
// //               >
// //                 Cancel
// //               </button>
// //             )}
// //           </div>
// //         </form>
// //       </div>

// //       {/* ================= STATS ================= */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
// //           <p className="text-white/40 text-sm">Total Categories</p>
// //           <h2 className="text-3xl font-bold mt-2">{categories?.length || 0}</h2>
// //         </div>

// //         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
// //           <p className="text-white/40 text-sm">Active Categories</p>
// //           <h2 className="text-3xl font-bold mt-2 text-green-400">
// //             {categories?.length || 0}
// //           </h2>
// //         </div>

// //         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
// //           <p className="text-white/40 text-sm">Total Products</p>
// //           <h2 className="text-3xl font-bold mt-2 text-blue-400">
// //             {categories?.reduce((acc, c) => acc + (c?.productCount || 0), 0) || 0}
// //           </h2>
// //         </div>

// //         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
// //           <p className="text-white/40 text-sm">Total Slugs</p>
// //           <h2 className="text-3xl font-bold mt-2 text-violet-400">
// //             {categories?.length || 0}
// //           </h2>
// //         </div>
// //       </div>

// //       {/* ================= TABLE ================= */}
// //       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full text-sm text-left">
// //             {/* HEAD */}
// //             <thead className="bg-white/5 text-white/50 border-b border-white/10">
// //               <tr>
// //                 <th className="p-4">Image</th>
// //                 <th className="p-4">Category</th>
// //                 <th className="p-4">Slug</th>
// //                 <th className="p-4">Icon</th>
// //                 <th className="p-4">Products</th>
// //                 <th className="p-4">Home</th>
// //                 <th className="p-4">Order</th>
// //                 <th className="p-4">Status</th>
// //                 <th className="p-4">Actions</th>
// //               </tr>
// //             </thead>

// //             {/* BODY */}
// //             <tbody>
// //               {paginatedCategories.map((cat) => (
// //                 <tr
// //                   key={cat._id}
// //                   className="border-t border-white/10 hover:bg-white/[0.03] transition"
// //                 >
// //                   {/* IMAGE */}
// //                   <td className="p-4">
// //                     <img
// //                       src={cat.image}
// //                       alt={cat.name}
// //                       className="w-14 h-14 rounded-lg object-cover"
// //                     />
// //                   </td>

// //                   {/* NAME */}
// //                   <td className="p-4 font-medium">{cat.name}</td>

// //                   {/* SLUG */}
// //                   <td className="p-4 text-white/50">/{cat.slug}</td>

// //                   {/* ICON */}
// //                   <td className="p-4">
// //                     {LucideIcons[cat.icon] &&
// //                       React.createElement(LucideIcons[cat.icon], { size: 18 })}
// //                     <span className="text-white/40 text-xs ml-1">{cat.icon}</span>
// //                   </td>

// //                   {/* PRODUCTS */}
// //                   <td className="p-4 text-white/60">{cat?.productCount || 0}</td>

// //                   {/* SHOW ON HOME */}
// //                   <td className="p-4">
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-[11px] font-medium ${
// //                         cat.showOnHome
// //                           ? "bg-blue-500/20 text-blue-400"
// //                           : "bg-white/5 text-white/40"
// //                       }`}
// //                     >
// //                       {cat.showOnHome ? "Yes" : "No"}
// //                     </span>
// //                   </td>

// //                   {/* ✅ ADD - ORDER */}
// //                   <td className="p-4 text-white/60 font-mono">{cat.order ?? 0}</td>

// //                   {/* STATUS */}
// //                   <td className="p-4">
// //                     <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-green-500/20 text-green-400">
// //                       active
// //                     </span>
// //                   </td>

// //                   {/* ACTIONS */}
// //                   <td className="p-4">
// //                     <div className="flex gap-2 flex-wrap">
// //                       {/* EDIT */}
// //                       <button
// //                         onClick={() => handleEdit(cat)}
// //                         className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
// //                       >
// //                         Edit
// //                       </button>

// //                       {/* DELETE */}
// //                       <button
// //                         onClick={() => handleDelete(cat._id)}
// //                         className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
// //                       >
// //                         Delete
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}

// //               {/* EMPTY */}
// //               {categories?.length === 0 && (
// //                 <tr>
// //                   <td colSpan="9" className="text-center py-10 text-white/40">
// //                     No Categories Found
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* ================= PAGINATION ================= */}
// //         {totalPages > 1 && (
// //           <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
// //             <p className="text-white/40 text-sm">
// //               Showing {(currentPage - 1) * itemsPerPage + 1}–
// //               {Math.min(currentPage * itemsPerPage, categories.length)} of{" "}
// //               {categories.length}
// //             </p>
// //             <div className="flex items-center gap-2">
// //               <button
// //                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
// //                 disabled={currentPage === 1}
// //                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
// //               >
// //                 ← Prev
// //               </button>

// //               {/* ✅ UPDATED - ab getPageNumbers() se limited pages + ellipsis render honge */}
// //               {getPageNumbers().map((page, idx) =>
// //                 page === "..." ? (
// //                   <span key={`dots-${idx}`} className="px-2 text-white/30 text-xs">
// //                     …
// //                   </span>
// //                 ) : (
// //                   <button
// //                     key={page}
// //                     onClick={() => setCurrentPage(page)}
// //                     className={`w-8 h-8 rounded-lg text-xs font-medium transition ${
// //                       currentPage === page
// //                         ? "bg-blue-600 text-white"
// //                         : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
// //                     }`}
// //                   >
// //                     {page}
// //                   </button>
// //                 )
// //               )}

// //               <button
// //                 onClick={() =>
// //                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
// //                 }
// //                 disabled={currentPage === totalPages}
// //                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
// //               >
// //                 Next →
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ConfirmModal from "../../components/common/ConfirmModal";
// import * as LucideIcons from "lucide-react";

// //  NEW - all valid Lucide icon names (PascalCase components)
// const ALL_ICON_NAMES = Object.keys(LucideIcons).filter(
//   (key) => /^[A-Z]/.test(key) && typeof LucideIcons[key] === "object",
// );

// //  NEW - Icon Picker component (searchable dropdown with preview grid)
// function IconPicker({ value, onChange }) {
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   const filtered = search
//     ? ALL_ICON_NAMES.filter((name) =>
//         name.toLowerCase().includes(search.toLowerCase()),
//       ).slice(0, 60)
//     : ALL_ICON_NAMES.slice(0, 60);

//   const SelectedIcon = LucideIcons[value];

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={() => setOpen((o) => !o)}
//         className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
//       >
//         {SelectedIcon && <SelectedIcon size={18} />}
//         <span>{value || "Select Icon"}</span>
//       </button>

//       {open && (
//         <div className="absolute z-50 mt-2 w-full max-h-72 overflow-hidden bg-[#0D0D14] border border-white/10 rounded-xl shadow-xl p-3">
//           <input
//             type="text"
//             autoFocus
//             placeholder="Search icon..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-700 mb-2"
//           />

//           <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
//             {filtered.map((name) => {
//               const Icon = LucideIcons[name];
//               return (
//                 <button
//                   key={name}
//                   type="button"
//                   title={name}
//                   onClick={() => {
//                     onChange(name);
//                     setOpen(false);
//                     setSearch("");
//                   }}
//                   className={`flex items-center justify-center p-2 rounded-lg border transition ${
//                     value === name
//                       ? "border-blue-600 bg-blue-600/20"
//                       : "border-white/10 hover:bg-white/10"
//                   }`}
//                 >
//                   <Icon size={18} />
//                 </button>
//               );
//             })}

//             {filtered.length === 0 && (
//               <p className="col-span-6 text-center text-white/40 text-xs py-4">
//                 No icons found
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function Categories() {
//   const API = import.meta.env.VITE_API_URL;

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     slug: "",
//     desc: "",
//     icon: "Box",
//     showOnHome: false,
//     order: 0,
//   });
//   const [image, setImage] = useState(null);

//   //  NEW - tracks which row's order input is being saved (small disabled state)
//   const [savingOrderId, setSavingOrderId] = useState(null);

//   //  UPDATED - temporary order values while typing (list resort nahi hogi jab tak Enter na dabe)
//   const [editingOrders, setEditingOrders] = useState({});

//   const [confirmModal, setConfirmModal] = useState({
//     isOpen: false,
//     title: "",
//     message: "",
//     confirmText: "OK",
//     showCancel: false,
//     onConfirm: null,
//   });

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${API}/categories`);
//       setCategories(res.data.categories || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //  NEW - sort by order ascending before pagination (order 1 shows on top)
//   const sortedCategories = [...categories].sort(
//     (a, b) => (a.order ?? 0) - (b.order ?? 0),
//   );

//   const totalPages = Math.ceil(sortedCategories.length / itemsPerPage); 
//   const paginatedCategories = sortedCategories.slice(
    
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   const getPageNumbers = () => {
//     const pages = [];
//     const delta = 1;

//     for (let i = 1; i <= totalPages; i++) {
//       if (
//         i === 1 ||
//         i === totalPages ||
//         (i >= currentPage - delta && i <= currentPage + delta)
//       ) {
//         pages.push(i);
//       } else if (pages[pages.length - 1] !== "...") {
//         pages.push("...");
//       }
//     }
//     return pages;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   //  UPDATED - sirf temporary state update, asli list order change nahi hoga
//   const handleOrderInputChange = (id, value) => {
//     setEditingOrders((prev) => ({ ...prev, [id]: value }));
//   };

//   //  NEW - fires on blur, sends ONLY order field to backend (name/slug/desc untouched)
//   const handleOrderSave = async (id, value) => {
//     try {
//       setSavingOrderId(id);

//       const data = new FormData();
//       data.append("order", value === "" ? 0 : Number(value));

//       await axios.put(`${API}/categories/${id}`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       fetchCategories();
//     } catch (error) {
//       console.log(error);
//       setConfirmModal({
//         isOpen: true,
//         title: "❌ Error",
//         message: "Order update failed. Please try again.",
//         confirmText: "OK",
//         showCancel: false,
//         onConfirm: () => setConfirmModal({ isOpen: false }),
//       });
//     } finally {
//       setSavingOrderId(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("slug", formData.slug);
//       data.append("desc", formData.desc);
//       data.append("icon", formData.icon);
//       data.append("showOnHome", formData.showOnHome);
//       data.append("order", formData.order);
//       if (image) {
//         data.append("image", image);
//       }

//       if (editingId) {
//         const res = await axios.put(`${API}/categories/${editingId}`, data, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         setConfirmModal({
//           isOpen: true,
//           title: "✅ Updated!",
//           message: res.data.message || "Category successfully updated.",
//           confirmText: "OK",
//           showCancel: false,
//           onConfirm: () => setConfirmModal({ isOpen: false }),
//         });
//       } else {
//         const res = await axios.post(`${API}/categories/create`, data, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         setConfirmModal({
//           isOpen: true,
//           title: "✅ Category Added!",
//           message: res.data.message || "Category successfully created.",
//           confirmText: "OK",
//           showCancel: false,
//           onConfirm: () => setConfirmModal({ isOpen: false }),
//         });
//       }

//       setFormData({
//         name: "",
//         slug: "",
//         desc: "",
//         icon: "Box",
//         showOnHome: false,
//         order: 0,
//       });
//       setImage(null);
//       setEditingId(null);
//       fetchCategories();
//     } catch (error) {
//       console.log(error);

//       setConfirmModal({
//         isOpen: true,
//         title: "❌ Error",
//         message: error.response?.data?.message || "Something went wrong.",
//         confirmText: "OK",
//         showCancel: false,
//         onConfirm: () => setConfirmModal({ isOpen: false }),
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = (id) => {
//     setConfirmModal({
//       isOpen: true,
//       title: "Delete Category",
//       message: "Are you sure? This category will be permanently deleted.",
//       confirmText: "Delete",
//       showCancel: true,
//       onConfirm: async () => {
//         try {
//           await axios.delete(`${API}/categories/${id}`);
//           setConfirmModal({ isOpen: false });
//           fetchCategories();
//         } catch (error) {
//           console.log(error);
//           setConfirmModal({
//             isOpen: true,
//             title: "❌ Error",
//             message: "Delete failed. Please try again.",
//             confirmText: "OK",
//             showCancel: false,
//             onConfirm: () => setConfirmModal({ isOpen: false }),
//           });
//         }
//       },
//     });
//   };

//   const handleEdit = (cat) => {
//     setEditingId(cat._id);
//     setFormData({
//       name: cat.name,
//       slug: cat.slug,
//       desc: cat.desc,
//       icon: cat.icon || "Box",
//       showOnHome: cat.showOnHome || false,
//       order: cat.order || 0,
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setFormData({
//       name: "",
//       slug: "",
//       desc: "",
//       icon: "Box",
//       showOnHome: false,
//       order: 0,
//     });
//     setImage(null);
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">
//       <ConfirmModal
//         isOpen={confirmModal.isOpen}
//         title={confirmModal.title}
//         message={confirmModal.message}
//         confirmText={confirmModal.confirmText}
//         showCancel={confirmModal.showCancel}
//         onConfirm={confirmModal.onConfirm}
//         onCancel={() => setConfirmModal({ isOpen: false })}
//       />

//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Categories Management</h1>
//           <p className="text-sm text-white/40 mt-1">
//             Manage marketplace product categories
//           </p>
//         </div>
//       </div>

//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
//         >
//           <input
//             type="text"
//             name="name"
//             placeholder="Category Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
//             required
//           />

//           <input
//             type="text"
//             name="slug"
//             placeholder="Category Slug"
//             value={formData.slug}
//             onChange={handleChange}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
//             required
//           />

//           <input
//             type="text"
//             name="desc"
//             placeholder="Description"
//             value={formData.desc}
//             onChange={handleChange}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
//             required
//           />

//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
//           />

//           <IconPicker
//             value={formData.icon}
//             onChange={(iconName) =>
//               setFormData((prev) => ({ ...prev, icon: iconName }))
//             }
//           />

//           <label className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm cursor-pointer">
//             <input
//               type="checkbox"
//               name="showOnHome"
//               checked={formData.showOnHome}
//               onChange={handleChange}
//               className="w-4 h-4"
//             />
//             Show on Home
//           </label>

//           <input
//             type="number"
//             name="order"
//             placeholder="Display Order (1, 2, 3...)"
//             value={formData.order}
//             onChange={handleChange}
//             min="0"
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
//           />

//           <div className="flex gap-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-800 hover:bg-blue-900 px-4 py-3 rounded-xl text-sm font-medium transition w-full"
//             >
//               {loading
//                 ? editingId
//                   ? "Updating..."
//                   : "Creating..."
//                 : editingId
//                   ? "Update"
//                   : "Add Category"}
//             </button>

//             {editingId && (
//               <button
//                 type="button"
//                 onClick={cancelEdit}
//                 className="bg-gray-700 hover:bg-gray-800 px-4 py-3 rounded-xl text-sm"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
//           <p className="text-white/40 text-sm">Total Categories</p>
//           <h2 className="text-3xl font-bold mt-2">{categories?.length || 0}</h2>
//         </div>

//         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
//           <p className="text-white/40 text-sm">Active Categories</p>
//           <h2 className="text-3xl font-bold mt-2 text-green-400">
//             {categories?.length || 0}
//           </h2>
//         </div>

//         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
//           <p className="text-white/40 text-sm">Total Products</p>
//           <h2 className="text-3xl font-bold mt-2 text-blue-400">
//             {categories?.reduce((acc, c) => acc + (c?.productCount || 0), 0) ||
//               0}
//           </h2>
//         </div>

//         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
//           <p className="text-white/40 text-sm">Total Slugs</p>
//           <h2 className="text-3xl font-bold mt-2 text-violet-400">
//             {categories?.length || 0}
//           </h2>
//         </div>
//       </div>

//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-white/5 text-white/50 border-b border-white/10">
//               <tr>
//                 <th className="p-4">Image</th>
//                 <th className="p-4">Category</th>
//                 <th className="p-4">Slug</th>
//                 <th className="p-4">Icon</th>
//                 <th className="p-4">Products</th>
//                 <th className="p-4">Home</th>
//                 <th className="p-4">Order</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {paginatedCategories.map((cat) => (
//                 <tr
//                   key={cat._id}
//                   className="border-t border-white/10 hover:bg-white/[0.03] transition"
//                 >
//                   <td className="p-4">
//                     <img
//                       src={cat.image}
//                       alt={cat.name}
//                       className="w-14 h-14 rounded-lg object-cover"
//                     />
//                   </td>

//                   <td className="p-4 font-medium">{cat.name}</td>

//                   <td className="p-4 text-white/50">/{cat.slug}</td>

//                   <td className="p-4">
//                     {LucideIcons[cat.icon] &&
//                       React.createElement(LucideIcons[cat.icon], { size: 18 })}
//                     <span className="text-white/40 text-xs ml-1">
//                       {cat.icon}
//                     </span>
//                   </td>

//                   <td className="p-4 text-white/60">
//                     {cat?.productCount || 0}
//                   </td>

//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-[11px] font-medium ${
//                         cat.showOnHome
//                           ? "bg-blue-500/20 text-blue-400"
//                           : "bg-white/5 text-white/40"
//                       }`}
//                     >
//                       {cat.showOnHome ? "Yes" : "No"}
//                     </span>
//                   </td>

               
//                   <td className="p-4">
//                     <input
//                       type="number"
//                       min="0"
//                       value={
//                         editingOrders[cat._id] !== undefined
//                           ? editingOrders[cat._id]
//                           : (cat.order ?? 0)
//                       }
//                       onChange={(e) =>
//                         handleOrderInputChange(cat._id, e.target.value)
//                       }
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           handleOrderSave(cat._id, e.target.value);
//                           setEditingOrders((prev) => {
//                             const updated = { ...prev };
//                             delete updated[cat._id];
//                             return updated;
//                           });
//                           e.target.blur();
//                         }
//                       }}
//                       disabled={savingOrderId === cat._id}
//                       className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-mono outline-none focus:border-blue-700 disabled:opacity-50"
//                     />
//                   </td>

//                   <td className="p-4">
//                     <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-green-500/20 text-green-400">
//                       active
//                     </span>
//                   </td>

//                   <td className="p-4">
//                     <div className="flex gap-2 flex-wrap">
//                       <button
//                         onClick={() => handleEdit(cat)}
//                         className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(cat._id)}
//                         className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {categories?.length === 0 && (
//                 <tr>
//                   <td colSpan="9" className="text-center py-10 text-white/40">
//                     No Categories Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
//             <p className="text-white/40 text-sm">
//               Showing {(currentPage - 1) * itemsPerPage + 1}–
//               {Math.min(currentPage * itemsPerPage, sortedCategories.length)} of{" "}
//               {sortedCategories.length}
//             </p>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
//               >
//                 ← Prev
//               </button>

//               {getPageNumbers().map((page, idx) =>
//                 page === "..." ? (
//                   <span
//                     key={`dots-${idx}`}
//                     className="px-2 text-white/30 text-xs"
//                   >
//                     …
//                   </span>
//                 ) : (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`w-8 h-8 rounded-lg text-xs font-medium transition ${
//                       currentPage === page
//                         ? "bg-blue-600 text-white"
//                         : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ),
//               )}

//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "../../components/common/ConfirmModal";
import * as LucideIcons from "lucide-react";

//  NEW - all valid Lucide icon names (PascalCase components)
const ALL_ICON_NAMES = Object.keys(LucideIcons).filter(
  (key) => /^[A-Z]/.test(key) && typeof LucideIcons[key] === "object",
);

//  NEW - Icon Picker component (searchable dropdown with preview grid)
function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = search
    ? ALL_ICON_NAMES.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase()),
      ).slice(0, 60)
    : ALL_ICON_NAMES.slice(0, 60);

  const SelectedIcon = LucideIcons[value];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
      >
        {SelectedIcon && <SelectedIcon size={18} />}
        <span>{value || "Select Icon"}</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full max-h-72 overflow-hidden bg-[#0D0D14] border border-white/10 rounded-xl shadow-xl p-3">
          <input
            type="text"
            autoFocus
            placeholder="Search icon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-700 mb-2"
          />

          <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
            {filtered.map((name) => {
              const Icon = LucideIcons[name];
              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`flex items-center justify-center p-2 rounded-lg border transition ${
                    value === name
                      ? "border-blue-600 bg-blue-600/20"
                      : "border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Icon size={18} />
                </button>
              );
            })}

            {filtered.length === 0 && (
              <p className="col-span-6 text-center text-white/40 text-xs py-4">
                No icons found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Categories() {
  const API = import.meta.env.VITE_API_URL;

  // ✅ NEW - admin token header (jaise subCategoryApi.js mein hai)
  const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    desc: "",
    icon: "Box",
    showOnHome: false,
    order: 0,
  });
  const [image, setImage] = useState(null);

  //  NEW - tracks which row's order input is being saved (small disabled state)
  const [savingOrderId, setSavingOrderId] = useState(null);

  //  UPDATED - temporary order values while typing (list resort nahi hogi jab tak Enter na dabe)
  const [editingOrders, setEditingOrders] = useState({});

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "OK",
    showCancel: false,
    onConfirm: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/categories`);
      setCategories(res.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  //  NEW - sort by order ascending before pagination (order 1 shows on top)
  const sortedCategories = [...categories].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage); 
  const paginatedCategories = sortedCategories.slice(
    
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getPageNumbers = () => {
    const pages = [];
    const delta = 1;

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //  UPDATED - sirf temporary state update, asli list order change nahi hoga
  const handleOrderInputChange = (id, value) => {
    setEditingOrders((prev) => ({ ...prev, [id]: value }));
  };

  //  NEW - fires on blur, sends ONLY order field to backend (name/slug/desc untouched)
  const handleOrderSave = async (id, value) => {
    try {
      setSavingOrderId(id);

      const data = new FormData();
      data.append("order", value === "" ? 0 : Number(value));

      await axios.put(`${API}/categories/${id}`, data, {
        headers: {
          ...authHeader(), // ✅ NEW
          "Content-Type": "multipart/form-data",
        },
      });

      fetchCategories();
    } catch (error) {
      console.log(error);
      setConfirmModal({
        isOpen: true,
        title: "❌ Error",
        message: "Order update failed. Please try again.",
        confirmText: "OK",
        showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
    } finally {
      setSavingOrderId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append("desc", formData.desc);
      data.append("icon", formData.icon);
      data.append("showOnHome", formData.showOnHome);
      data.append("order", formData.order);
      if (image) {
        data.append("image", image);
      }

      if (editingId) {
        const res = await axios.put(`${API}/categories/${editingId}`, data, {
          headers: {
            ...authHeader(), // ✅ NEW
            "Content-Type": "multipart/form-data",
          },
        });

        setConfirmModal({
          isOpen: true,
          title: "✅ Updated!",
          message: res.data.message || "Category successfully updated.",
          confirmText: "OK",
          showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      } else {
        const res = await axios.post(`${API}/categories/create`, data, {
          headers: {
            ...authHeader(), // ✅ NEW
            "Content-Type": "multipart/form-data",
          },
        });

        setConfirmModal({
          isOpen: true,
          title: "✅ Category Added!",
          message: res.data.message || "Category successfully created.",
          confirmText: "OK",
          showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      }

      setFormData({
        name: "",
        slug: "",
        desc: "",
        icon: "Box",
        showOnHome: false,
        order: 0,
      });
      setImage(null);
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.log(error);

      setConfirmModal({
        isOpen: true,
        title: "❌ Error",
        message: error.response?.data?.message || "Something went wrong.",
        confirmText: "OK",
        showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Category",
      message: "Are you sure? This category will be permanently deleted.",
      confirmText: "Delete",
      showCancel: true,
      onConfirm: async () => {
        try {
          await axios.delete(`${API}/categories/${id}`, {
            headers: authHeader(), // ✅ NEW
          });
          setConfirmModal({ isOpen: false });
          fetchCategories();
        } catch (error) {
          console.log(error);
          setConfirmModal({
            isOpen: true,
            title: "❌ Error",
            message: "Delete failed. Please try again.",
            confirmText: "OK",
            showCancel: false,
            onConfirm: () => setConfirmModal({ isOpen: false }),
          });
        }
      },
    });
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      desc: cat.desc,
      icon: cat.icon || "Box",
      showOnHome: cat.showOnHome || false,
      order: cat.order || 0,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      slug: "",
      desc: "",
      icon: "Box",
      showOnHome: false,
      order: 0,
    });
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        showCancel={confirmModal.showCancel}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ isOpen: false })}
      />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories Management</h1>
          <p className="text-sm text-white/40 mt-1">
            Manage marketplace product categories
          </p>
        </div>
      </div>

      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          <input
            type="text"
            name="slug"
            placeholder="Category Slug"
            value={formData.slug}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          <input
            type="text"
            name="desc"
            placeholder="Description"
            value={formData.desc}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
          />

          <IconPicker
            value={formData.icon}
            onChange={(iconName) =>
              setFormData((prev) => ({ ...prev, icon: iconName }))
            }
          />

          <label className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="showOnHome"
              checked={formData.showOnHome}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Show on Home
          </label>

          <input
            type="number"
            name="order"
            placeholder="Display Order (1, 2, 3...)"
            value={formData.order}
            onChange={handleChange}
            min="0"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-800 hover:bg-blue-900 px-4 py-3 rounded-xl text-sm font-medium transition w-full"
            >
              {loading
                ? editingId
                  ? "Updating..."
                  : "Creating..."
                : editingId
                  ? "Update"
                  : "Add Category"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-700 hover:bg-gray-800 px-4 py-3 rounded-xl text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">Total Categories</p>
          <h2 className="text-3xl font-bold mt-2">{categories?.length || 0}</h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">Active Categories</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {categories?.length || 0}
          </h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">Total Products</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-400">
            {categories?.reduce((acc, c) => acc + (c?.productCount || 0), 0) ||
              0}
          </h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">Total Slugs</p>
          <h2 className="text-3xl font-bold mt-2 text-violet-400">
            {categories?.length || 0}
          </h2>
        </div>
      </div>

      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Category</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Icon</th>
                <th className="p-4">Products</th>
                <th className="p-4">Home</th>
                <th className="p-4">Order</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedCategories.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-t border-white/10 hover:bg-white/[0.03] transition"
                >
                  <td className="p-4">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  <td className="p-4 font-medium">{cat.name}</td>

                  <td className="p-4 text-white/50">/{cat.slug}</td>

                  <td className="p-4">
                    {LucideIcons[cat.icon] &&
                      React.createElement(LucideIcons[cat.icon], { size: 18 })}
                    <span className="text-white/40 text-xs ml-1">
                      {cat.icon}
                    </span>
                  </td>

                  <td className="p-4 text-white/60">
                    {cat?.productCount || 0}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                        cat.showOnHome
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {cat.showOnHome ? "Yes" : "No"}
                    </span>
                  </td>

               
                  <td className="p-4">
                    <input
                      type="number"
                      min="0"
                      value={
                        editingOrders[cat._id] !== undefined
                          ? editingOrders[cat._id]
                          : (cat.order ?? 0)
                      }
                      onChange={(e) =>
                        handleOrderInputChange(cat._id, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleOrderSave(cat._id, e.target.value);
                          setEditingOrders((prev) => {
                            const updated = { ...prev };
                            delete updated[cat._id];
                            return updated;
                          });
                          e.target.blur();
                        }
                      }}
                      disabled={savingOrderId === cat._id}
                      className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-mono outline-none focus:border-blue-700 disabled:opacity-50"
                    />
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-green-500/20 text-green-400">
                      active
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {categories?.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-10 text-white/40">
                    No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-white/40 text-sm">
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, sortedCategories.length)} of{" "}
              {sortedCategories.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                ← Prev
              </button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`dots-${idx}`}
                    className="px-2 text-white/30 text-xs"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}