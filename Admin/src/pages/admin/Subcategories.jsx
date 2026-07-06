

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import ConfirmModal from "../../components/common/ConfirmModal";

// // export default function SubCategories() {
// //   const API = import.meta.env.VITE_API_URL;

// //   // ================= STATES =================
// //   const [categories, setCategories] = useState([]);
// //   const [subCategories, setSubCategories] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [editingId, setEditingId] = useState(null);
// //   const [image, setImage] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 10;

// //   // ✅ FILTER
// //   const [filterCategory, setFilterCategory] = useState("");

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     slug: "",
// //     desc: "",
// //     category: "",
// //   });

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
// //     fetchSubCategories();
// //   }, []);

// //   // ================= FETCH CATEGORIES =================
// //   const fetchCategories = async () => {
// //     try {
// //       const res = await axios.get(`${API}/categories`);
// //       setCategories(res.data.categories || []);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   // ================= FETCH SUBCATEGORIES =================
// //   const fetchSubCategories = async () => {
// //     try {
// //       const res = await axios.get(`${API}/subcategories`);
// //       setSubCategories(res.data.subCategories || []);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   // ✅ FILTERED LIST
// //   const filteredSubCategories = filterCategory
// //     ? subCategories.filter((sub) => sub.category?._id === filterCategory)
// //     : subCategories;

// //   const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage);
// //   const paginatedSubCategories = filteredSubCategories.slice(
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
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
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
// //       data.append("category", formData.category);
// //       if (image) {
// //         data.append("image", image);
// //       }

// //       // UPDATE
// //       if (editingId) {
// //         const res = await axios.put(`${API}/subcategories/${editingId}`, data, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });

// //         setConfirmModal({
// //           isOpen: true,
// //           title: "✅ Updated!",
// //           message: res.data.message || "Subcategory successfully updated.",
// //           confirmText: "OK",
// //           showCancel: false,
// //           onConfirm: () => setConfirmModal({ isOpen: false }),
// //         });
// //       }

// //       // CREATE
// //       else {
// //         const res = await axios.post(`${API}/subcategories/create`, data, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });

// //         setConfirmModal({
// //           isOpen: true,
// //           title: "✅ Subcategory Added!",
// //           message: res.data.message || "Subcategory successfully created.",
// //           confirmText: "OK",
// //           showCancel: false,
// //           onConfirm: () => setConfirmModal({ isOpen: false }),
// //         });
// //       }

// //       // RESET
// //       setFormData({ name: "", slug: "", desc: "", category: "" });
// //       setImage(null);
// //       setEditingId(null);
// //       fetchSubCategories();
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
// //       title: "Delete Subcategory",
// //       message: "Are you sure? This subcategory will be permanently deleted.",
// //       confirmText: "Delete",
// //       showCancel: true,
// //       onConfirm: async () => {
// //         try {
// //           await axios.delete(`${API}/subcategories/${id}`);
// //           setConfirmModal({ isOpen: false });
// //           fetchSubCategories();
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
// //   const handleEdit = (sub) => {
// //     setEditingId(sub._id);
// //     setFormData({
// //       name: sub.name,
// //       slug: sub.slug,
// //       desc: sub.desc,
// //       category: sub.category?._id,
// //     });
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   // ================= CANCEL =================
// //   const cancelEdit = () => {
// //     setEditingId(null);
// //     setFormData({ name: "", slug: "", desc: "", category: "" });
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
// //       <div className="mb-6">
// //         <h1 className="text-2xl font-bold">Subcategories Management</h1>
// //         <p className="text-sm text-white/40 mt-1">
// //           Manage marketplace subcategories
// //         </p>
// //       </div>

// //       {/* ================= FORM ================= */}
// //       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">
// //         <form
// //           onSubmit={handleSubmit}
// //           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
// //         >
// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Subcategory Name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// //             required
// //           />
// //           <input
// //             type="text"
// //             name="slug"
// //             placeholder="Slug"
// //             value={formData.slug}
// //             onChange={handleChange}
// //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// //             required
// //           />
// //           <input
// //             type="text"
// //             name="desc"
// //             placeholder="Description"
// //             value={formData.desc}
// //             onChange={handleChange}
// //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// //             required
// //           />
// //           <select
// //             name="category"
// //             value={formData.category}
// //             onChange={handleChange}
// //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
// //             required
// //           >
// //             <option value="">Select Category</option>
// //             {categories.map((cat) => (
// //               <option key={cat._id} value={cat._id} className="bg-black">
// //                 {cat.name}
// //               </option>
// //             ))}
// //           </select>
// //           <input
// //             type="file"
// //             onChange={(e) => setImage(e.target.files[0])}
// //             className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
// //           />
// //           <div className="flex gap-2">
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="bg-blue-800 hover:bg-blue-900 px-4 py-3 rounded-xl text-sm font-medium transition w-full"
// //             >
// //               {loading
// //                 ? editingId ? "Updating..." : "Creating..."
// //                 : editingId ? "Update" : "Add"}
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

// //       {/* ✅ FILTER */}
// //       <div className="mb-4 flex items-center gap-3">
// //         <select
// //           value={filterCategory}
// //           onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
// //           className="bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-700 text-white"
// //         >
// //           <option value="">All Categories</option>
// //           {categories.map((cat) => (
// //             <option key={cat._id} value={cat._id} className="bg-black">
// //               {cat.name}
// //             </option>
// //           ))}
// //         </select>
// //         {filterCategory && (
// //           <button
// //             onClick={() => { setFilterCategory(""); setCurrentPage(1); }}
// //             className="text-xs text-white/40 hover:text-white transition"
// //           >
// //             ✕ Clear
// //           </button>
// //         )}
// //         <span className="text-white/40 text-xs ml-auto">
// //           {filteredSubCategories.length} subcategories
// //         </span>
// //       </div>

// //       {/* ================= TABLE ================= */}
// //       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full text-sm text-left">
// //             <thead className="bg-white/5 text-white/50 border-b border-white/10">
// //               <tr>
// //                 <th className="p-4">Image</th>
// //                 <th className="p-4">Name</th>
// //                 <th className="p-4">Slug</th>
// //                 <th className="p-4">Category</th>
// //                 <th className="p-4">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {paginatedSubCategories.map((sub) => (
// //                 <tr
// //                   key={sub._id}
// //                   className="border-t border-white/10 hover:bg-white/[0.03]"
// //                 >
// //                   <td className="p-4">
// //                     <img
// //                       src={sub.image}
// //                       alt={sub.name}
// //                       className="w-14 h-14 rounded-lg object-cover"
// //                     />
// //                   </td>
// //                   <td className="p-4">{sub.name}</td>
// //                   <td className="p-4 text-white/50">/{sub.slug}</td>
// //                   <td className="p-4 text-blue-400">{sub.category?.name}</td>
// //                   <td className="p-4">
// //                     <div className="flex gap-2">
// //                       <button
// //                         onClick={() => handleEdit(sub)}
// //                         className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs"
// //                       >
// //                         Edit
// //                       </button>
// //                       <button
// //                         onClick={() => handleDelete(sub._id)}
// //                         className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs"
// //                       >
// //                         Delete
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //               {filteredSubCategories.length === 0 && (
// //                 <tr>
// //                   <td colSpan="5" className="text-center py-10 text-white/40">
// //                     No Subcategories Found
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
// //               {Math.min(currentPage * itemsPerPage, filteredSubCategories.length)} of{" "}
// //               {filteredSubCategories.length}
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
// //                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

// export default function SubCategories() {
//   const API = import.meta.env.VITE_API_URL;

//   // ================= STATES =================
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [image, setImage] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

  
//   const [filterCategory, setFilterCategory] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     slug: "",
//     desc: "",
//     category: "",
//     order: 0, 
//   });

//   //  NEW - temporary order values while typing (list resort nahi hogi jab tak Enter na dabe)
//   const [editingOrders, setEditingOrders] = useState({});
//   //  NEW - tracks which row's order input is being saved
//   const [savingOrderId, setSavingOrderId] = useState(null);

//   // ================= CONFIRM MODAL =================
//   const [confirmModal, setConfirmModal] = useState({
//     isOpen: false,
//     title: "",
//     message: "",
//     confirmText: "OK",
//     showCancel: false,
//     onConfirm: null,
//   });

//   // ================= FETCH =================
//   useEffect(() => {
//     fetchCategories();
//     fetchSubCategories();
//   }, []);

//   // ================= FETCH CATEGORIES =================
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${API}/categories`);
//       setCategories(res.data.categories || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ================= FETCH SUBCATEGORIES =================
//   const fetchSubCategories = async () => {
//     try {
//       const res = await axios.get(`${API}/subcategories`);
//       setSubCategories(res.data.subCategories || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //  FILTERED LIST
//   const filteredSubCategories = filterCategory
//     ? subCategories.filter((sub) => sub.category?._id === filterCategory)
//     : subCategories;

//   //  NEW - sort by order ascending (order 1 shows on top)
//   const sortedSubCategories = [...filteredSubCategories].sort(
//     (a, b) => (a.order ?? 0) - (b.order ?? 0)
//   );

//   const totalPages = Math.ceil(sortedSubCategories.length / itemsPerPage); 
//   const paginatedSubCategories = sortedSubCategories.slice( 
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
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

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

  
//   const handleOrderInputChange = (id, value) => {
//     setEditingOrders((prev) => ({ ...prev, [id]: value }));
//   };


//   const handleOrderSave = async (id, value) => {
//     try {
//       setSavingOrderId(id);

//       const data = new FormData();
//       data.append("order", value === "" ? 0 : Number(value));

//       await axios.put(`${API}/subcategories/${id}`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       fetchSubCategories();
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

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("slug", formData.slug);
//       data.append("desc", formData.desc);
//       data.append("category", formData.category);
//       data.append("order", formData.order); 
//       if (image) {
//         data.append("image", image);
//       }

//       // UPDATE
//       if (editingId) {
//         const res = await axios.put(`${API}/subcategories/${editingId}`, data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         setConfirmModal({
//           isOpen: true,
//           title: "✅ Updated!",
//           message: res.data.message || "Subcategory successfully updated.",
//           confirmText: "OK",
//           showCancel: false,
//           onConfirm: () => setConfirmModal({ isOpen: false }),
//         });
//       }

//       // CREATE
//       else {
//         const res = await axios.post(`${API}/subcategories/create`, data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         setConfirmModal({
//           isOpen: true,
//           title: "✅ Subcategory Added!",
//           message: res.data.message || "Subcategory successfully created.",
//           confirmText: "OK",
//           showCancel: false,
//           onConfirm: () => setConfirmModal({ isOpen: false }),
//         });
//       }

//       // RESET
//       setFormData({ name: "", slug: "", desc: "", category: "", order: 0 }); // ✅ UPDATED
//       setImage(null);
//       setEditingId(null);
//       fetchSubCategories();
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

//   // ================= DELETE =================
//   const handleDelete = (id) => {
//     setConfirmModal({
//       isOpen: true,
//       title: "Delete Subcategory",
//       message: "Are you sure? This subcategory will be permanently deleted.",
//       confirmText: "Delete",
//       showCancel: true,
//       onConfirm: async () => {
//         try {
//           await axios.delete(`${API}/subcategories/${id}`);
//           setConfirmModal({ isOpen: false });
//           fetchSubCategories();
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

//   // ================= EDIT =================
//   const handleEdit = (sub) => {
//     setEditingId(sub._id);
//     setFormData({
//       name: sub.name,
//       slug: sub.slug,
//       desc: sub.desc,
//       category: sub.category?._id,
//       order: sub.order || 0, 
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // ================= CANCEL =================
//   const cancelEdit = () => {
//     setEditingId(null);
//     setFormData({ name: "", slug: "", desc: "", category: "", order: 0 }); 
//     setImage(null);
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

//       {/* ================= CONFIRM MODAL ================= */}
//       <ConfirmModal
//         isOpen={confirmModal.isOpen}
//         title={confirmModal.title}
//         message={confirmModal.message}
//         confirmText={confirmModal.confirmText}
//         showCancel={confirmModal.showCancel}
//         onConfirm={confirmModal.onConfirm}
//         onCancel={() => setConfirmModal({ isOpen: false })}
//       />

//       {/* ================= HEADER ================= */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">Subcategories Management</h1>
//         <p className="text-sm text-white/40 mt-1">
//           Manage marketplace subcategories
//         </p>
//       </div>

//       {/* ================= FORM ================= */}
//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4"
//         >
//           <input
//             type="text"
//             name="name"
//             placeholder="Subcategory Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
//             required
//           />
//           <input
//             type="text"
//             name="slug"
//             placeholder="Slug"
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
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id} className="bg-black">
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
//           />

//           {/*  NEW - ORDER (form ke liye, create/full-edit) */}
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
//                 ? editingId ? "Updating..." : "Creating..."
//                 : editingId ? "Update" : "Add"}
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

//       <div className="mb-4 flex items-center gap-3">
//         <select
//           value={filterCategory}
//           onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
//           className="bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-700 text-white"
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat._id} value={cat._id} className="bg-black">
//               {cat.name}
//             </option>
//           ))}
//         </select>
//         {filterCategory && (
//           <button
//             onClick={() => { setFilterCategory(""); setCurrentPage(1); }}
//             className="text-xs text-white/40 hover:text-white transition"
//           >
//             ✕ Clear
//           </button>
//         )}
//         <span className="text-white/40 text-xs ml-auto">
//           {filteredSubCategories.length} subcategories
//         </span>
//       </div>

//       {/* ================= TABLE ================= */}
//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-white/5 text-white/50 border-b border-white/10">
//               <tr>
//                 <th className="p-4">Image</th>
//                 <th className="p-4">Name</th>
//                 <th className="p-4">Slug</th>
//                 <th className="p-4">Category</th>
//                 <th className="p-4">Order</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedSubCategories.map((sub) => (
//                 <tr
//                   key={sub._id}
//                   className="border-t border-white/10 hover:bg-white/[0.03]"
//                 >
//                   <td className="p-4">
//                     <img
//                       src={sub.image}
//                       alt={sub.name}
//                       className="w-14 h-14 rounded-lg object-cover"
//                     />
//                   </td>
//                   <td className="p-4">{sub.name}</td>
//                   <td className="p-4 text-white/50">/{sub.slug}</td>
//                   <td className="p-4 text-blue-400">{sub.category?.name}</td>

//                   {/*  NEW - ORDER editable box, Enter dabane par save */}
//                   <td className="p-4">
//                     <input
//                       type="number"
//                       min="0"
//                       value={
//                         editingOrders[sub._id] !== undefined
//                           ? editingOrders[sub._id]
//                           : sub.order ?? 0
//                       }
//                       onChange={(e) =>
//                         handleOrderInputChange(sub._id, e.target.value)
//                       }
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           handleOrderSave(sub._id, e.target.value);
//                           setEditingOrders((prev) => {
//                             const updated = { ...prev };
//                             delete updated[sub._id];
//                             return updated;
//                           });
//                           e.target.blur();
//                         }
//                       }}
//                       disabled={savingOrderId === sub._id}
//                       className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-mono outline-none focus:border-blue-700 disabled:opacity-50"
//                     />
//                   </td>

//                   <td className="p-4">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(sub)}
//                         className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(sub._id)}
//                         className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {filteredSubCategories.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="text-center py-10 text-white/40">
//                     No Subcategories Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* ================= PAGINATION ================= */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
//             <p className="text-white/40 text-sm">
//               Showing {(currentPage - 1) * itemsPerPage + 1}–
//               {Math.min(currentPage * itemsPerPage, sortedSubCategories.length)} of{" "}
//               {sortedSubCategories.length}
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
//                   <span key={`dots-${idx}`} className="px-2 text-white/30 text-xs">
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
//                 )
//               )}
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
import {
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../../api/subCategoryApi"; 

export default function SubCategories() {
  const API = import.meta.env.VITE_API_URL;

  // ================= STATES =================
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  const [filterCategory, setFilterCategory] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    desc: "",
    category: "",
    order: 0, 
  });

  const [editingOrders, setEditingOrders] = useState({});
  const [savingOrderId, setSavingOrderId] = useState(null);

  // ================= CONFIRM MODAL =================
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "OK",
    showCancel: false,
    onConfirm: null,
  });

  // ================= FETCH =================
  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  // ================= FETCH CATEGORIES ================= (unchanged - categories API abhi bhi yahin hai)
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/categories`);
      setCategories(res.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH SUBCATEGORIES ================= ✅ UPDATED - api file se
  const fetchSubCategories = async () => {
    try {
      const data = await getSubCategories();
      setSubCategories(data.subCategories || []);
    } catch (error) {
      console.log(error);
    }
  };

  //  FILTERED LIST
  const filteredSubCategories = filterCategory
    ? subCategories.filter((sub) => sub.category?._id === filterCategory)
    : subCategories;

  const sortedSubCategories = [...filteredSubCategories].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  const totalPages = Math.ceil(sortedSubCategories.length / itemsPerPage); 
  const paginatedSubCategories = sortedSubCategories.slice( 
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleOrderInputChange = (id, value) => {
    setEditingOrders((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ UPDATED - api file se
  const handleOrderSave = async (id, value) => {
    try {
      setSavingOrderId(id);

      const data = new FormData();
      data.append("order", value === "" ? 0 : Number(value));

      await updateSubCategory(id, data);

      fetchSubCategories();
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

  // ================= SUBMIT ================= ✅ UPDATED - api file se
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append("desc", formData.desc);
      data.append("category", formData.category);
      data.append("order", formData.order); 
      if (image) {
        data.append("image", image);
      }

      // UPDATE
      if (editingId) {
        const res = await updateSubCategory(editingId, data);

        setConfirmModal({
          isOpen: true,
          title: "✅ Updated!",
          message: res.message || "Subcategory successfully updated.",
          confirmText: "OK",
          showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      }

      // CREATE
      else {
        const res = await createSubCategory(data);

        setConfirmModal({
          isOpen: true,
          title: "✅ Subcategory Added!",
          message: res.message || "Subcategory successfully created.",
          confirmText: "OK",
          showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      }

      // RESET
      setFormData({ name: "", slug: "", desc: "", category: "", order: 0 });
      setImage(null);
      setEditingId(null);
      fetchSubCategories();
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

  // ================= DELETE ================= ✅ UPDATED - api file se
  const handleDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Subcategory",
      message: "Are you sure? This subcategory will be permanently deleted.",
      confirmText: "Delete",
      showCancel: true,
      onConfirm: async () => {
        try {
          await deleteSubCategory(id);
          setConfirmModal({ isOpen: false });
          fetchSubCategories();
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

  // ================= EDIT =================
  const handleEdit = (sub) => {
    setEditingId(sub._id);
    setFormData({
      name: sub.name,
      slug: sub.slug,
      desc: sub.desc,
      category: sub.category?._id,
      order: sub.order || 0, 
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= CANCEL =================
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", slug: "", desc: "", category: "", order: 0 }); 
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

      {/* ================= CONFIRM MODAL ================= */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        showCancel={confirmModal.showCancel}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ isOpen: false })}
      />

      {/* ================= HEADER ================= */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Subcategories Management</h1>
        <p className="text-sm text-white/40 mt-1">
          Manage marketplace subcategories
        </p>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Subcategory Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug"
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
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id} className="bg-black">
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
          />

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
                ? editingId ? "Updating..." : "Creating..."
                : editingId ? "Update" : "Add"}
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

      <div className="mb-4 flex items-center gap-3">
        <select
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
          className="bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-700 text-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id} className="bg-black">
              {cat.name}
            </option>
          ))}
        </select>
        {filterCategory && (
          <button
            onClick={() => { setFilterCategory(""); setCurrentPage(1); }}
            className="text-xs text-white/40 hover:text-white transition"
          >
            ✕ Clear
          </button>
        )}
        <span className="text-white/40 text-xs ml-auto">
          {filteredSubCategories.length} subcategories
        </span>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Category</th>
                <th className="p-4">Order</th>
                <th className="p-4">Stats</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSubCategories.map((sub) => (
                <tr
                  key={sub._id}
                  className="border-t border-white/10 hover:bg-white/[0.03]"
                >
                  <td className="p-4">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4">{sub.name}</td>
                  <td className="p-4 text-white/50">/{sub.slug}</td>
                  <td className="p-4 text-blue-400">{sub.category?.name}</td>

                  <td className="p-4">
                    <input
                      type="number"
                      min="0"
                      value={
                        editingOrders[sub._id] !== undefined
                          ? editingOrders[sub._id]
                          : sub.order ?? 0
                      }
                      onChange={(e) =>
                        handleOrderInputChange(sub._id, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleOrderSave(sub._id, e.target.value);
                          setEditingOrders((prev) => {
                            const updated = { ...prev };
                            delete updated[sub._id];
                            return updated;
                          });
                          e.target.blur();
                        }
                      }}
                      disabled={savingOrderId === sub._id}
                      className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-mono outline-none focus:border-blue-700 disabled:opacity-50"
                    />
                  </td>

                  <td className="p-4 text-white/60">
                    <p className="text-xs">👁 {sub.totalViews || 0} views</p>
                    <p className="text-xs text-orange-400">📩 {sub.totalEnquiries || 0} enquiries</p>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(sub)}
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSubCategories.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-white/40">
                    No Subcategories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-white/40 text-sm">
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, sortedSubCategories.length)} of{" "}
              {sortedSubCategories.length}
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
                  <span key={`dots-${idx}`} className="px-2 text-white/30 text-xs">
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
                )
              )}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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