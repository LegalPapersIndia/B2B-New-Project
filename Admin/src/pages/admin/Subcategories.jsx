// import React, { useEffect, useState } from "react";

// import axios from "axios";

// export default function SubCategories() {
//   const API = import.meta.env.VITE_API_URL;

//   // ================= STATES =================
//   const [categories, setCategories] = useState([]);

//   const [subCategories, setSubCategories] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [editingId, setEditingId] = useState(null);

//   const [image, setImage] = useState(null);

//     const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const [formData, setFormData] = useState({
//     name: "",
//     slug: "",
//     desc: "",
//     category: "",
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

//   const totalPages = Math.ceil(subCategories.length / itemsPerPage);
//   const paginatedSubCategories = subCategories.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
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

//       if (image) {
//         data.append("image", image);
//       }

//       // UPDATE
//       if (editingId) {
//         const res = await axios.put(`${API}/subcategories/${editingId}`, data, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         alert(res.data.message);
//       }

//       // CREATE
//       else {
//         const res = await axios.post(`${API}/subcategories/create`, data, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         alert(res.data.message);
//       }

//       // RESET
//       setFormData({
//         name: "",
//         slug: "",
//         desc: "",
//         category: "",
//       });

//       setImage(null);

//       setEditingId(null);

//       fetchSubCategories();
//     } catch (error) {
//       console.log(error);

//       alert(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     try {
//       const confirmDelete = window.confirm("Delete this subcategory?");

//       if (!confirmDelete) return;

//       await axios.delete(`${API}/subcategories/${id}`);

//       fetchSubCategories();
//     } catch (error) {
//       console.log(error);

//       alert("Delete failed");
//     }
//   };

//   // ================= EDIT =================
//   const handleEdit = (sub) => {
//     setEditingId(sub._id);

//     setFormData({
//       name: sub.name,
//       slug: sub.slug,
//       desc: sub.desc,
//       category: sub.category?._id,
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // ================= CANCEL =================
//   const cancelEdit = () => {
//     setEditingId(null);

//     setFormData({
//       name: "",
//       slug: "",
//       desc: "",
//       category: "",
//     });

//     setImage(null);
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">
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
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
//         >
//           {/* NAME */}
//           <input
//             type="text"
//             name="name"
//             placeholder="Subcategory Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
//             required
//           />

//           {/* SLUG */}
//           <input
//             type="text"
//             name="slug"
//             placeholder="Slug"
//             value={formData.slug}
//             onChange={handleChange}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
//             required
//           />

//           {/* DESC */}
//           <input
//             type="text"
//             name="desc"
//             placeholder="Description"
//             value={formData.desc}
//             onChange={handleChange}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
//             required
//           />

//           {/* CATEGORY */}
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

//           {/* IMAGE */}
//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
//           />

//           {/* BUTTON */}
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
//                   : "Add"}
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

//       {/* ================= TABLE ================= */}
//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left">
//             {/* HEAD */}
//             <thead className="bg-white/5 text-white/50 border-b border-white/10">
//               <tr>
//                 <th className="p-4">Image</th>

//                 <th className="p-4">Name</th>

//                 <th className="p-4">Slug</th>

//                 <th className="p-4">Category</th>

//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>

//             {/* BODY */}
//             <tbody>
//               {paginatedSubCategories.map((sub) => (
//                 <tr
//                   key={sub._id}
//                   className="border-t border-white/10 hover:bg-white/[0.03]"
//                 >
//                   {/* IMAGE */}
//                   <td className="p-4">
//                     <img
//                       src={sub.image}
//                       alt={sub.name}
//                       className="w-14 h-14 rounded-lg object-cover"
//                     />
//                   </td>

//                   {/* NAME */}
//                   <td className="p-4">{sub.name}</td>

//                   {/* SLUG */}
//                   <td className="p-4 text-white/50">/{sub.slug}</td>

//                   {/* CATEGORY */}
//                   <td className="p-4 text-blue-400">{sub.category?.name}</td>

//                   {/* ACTIONS */}
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

//               {/* EMPTY */}
//               {subCategories.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center py-10 text-white/40">
//                     No Subcategories Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         {/* PAGINATION */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
//             <p className="text-white/40 text-sm">
//               Showing {(currentPage - 1) * itemsPerPage + 1}–
//               {Math.min(currentPage * itemsPerPage, subCategories.length)} of{" "}
//               {subCategories.length}
//             </p>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
//               >
//                 ← Prev
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                 (page) => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`w-8 h-8 rounded-lg text-xs font-medium transition
//             ${
//               currentPage === page
//                 ? "bg-blue-600 text-white"
//                 : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
//             }`}
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

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    desc: "",
    category: "",
  });

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

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/categories`);
      setCategories(res.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH SUBCATEGORIES =================
  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(`${API}/subcategories`);
      setSubCategories(res.data.subCategories || []);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPages = Math.ceil(subCategories.length / itemsPerPage);
  const paginatedSubCategories = subCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append("desc", formData.desc);
      data.append("category", formData.category);
      if (image) {
        data.append("image", image);
      }

      // UPDATE
      if (editingId) {
        const res = await axios.put(`${API}/subcategories/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setConfirmModal({
          isOpen: true,
          title: "✅ Updated!",
          message: res.data.message || "Subcategory successfully updated.",
          confirmText: "OK",
          showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      }

      // CREATE
      else {
        const res = await axios.post(`${API}/subcategories/create`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setConfirmModal({
          isOpen: true,
          title: "✅ Subcategory Added!",
          message: res.data.message || "Subcategory successfully created.",
          confirmText: "OK",
          showCancel: false,
          onConfirm: () => setConfirmModal({ isOpen: false }),
        });
      }

      // RESET
      setFormData({ name: "", slug: "", desc: "", category: "" });
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

  // ================= DELETE =================
  const handleDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Subcategory",
      message: "Are you sure? This subcategory will be permanently deleted.",
      confirmText: "Delete",
      showCancel: true,
      onConfirm: async () => {
        try {
          await axios.delete(`${API}/subcategories/${id}`);
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
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= CANCEL =================
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", slug: "", desc: "", category: "" });
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Subcategory Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          {/* SLUG */}
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          {/* DESC */}
          <input
            type="text"
            name="desc"
            placeholder="Description"
            value={formData.desc}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          {/* CATEGORY */}
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

          {/* IMAGE */}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
          />

          {/* BUTTON */}
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
                : "Add"}
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

      {/* ================= TABLE ================= */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            {/* HEAD */}
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Category</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {paginatedSubCategories.map((sub) => (
                <tr
                  key={sub._id}
                  className="border-t border-white/10 hover:bg-white/[0.03]"
                >
                  {/* IMAGE */}
                  <td className="p-4">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  {/* NAME */}
                  <td className="p-4">{sub.name}</td>

                  {/* SLUG */}
                  <td className="p-4 text-white/50">/{sub.slug}</td>

                  {/* CATEGORY */}
                  <td className="p-4 text-blue-400">{sub.category?.name}</td>

                  {/* ACTIONS */}
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

              {/* EMPTY */}
              {subCategories.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-white/40">
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
              {Math.min(currentPage * itemsPerPage, subCategories.length)} of{" "}
              {subCategories.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              ))}

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