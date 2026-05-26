// import { useState } from "react";

// export default function Categories() {
//   const [categories, setCategories] = useState([
//     {
//       id: 1,
//       name: "Steel",
//       slug: "steel",
//       products: 128,
//       sellers: 34,
//       status: "active",
//     },

//     {
//       id: 2,
//       name: "Plastics",
//       slug: "plastics",
//       products: 84,
//       sellers: 21,
//       status: "active",
//     },

//     {
//       id: 3,
//       name: "Chemicals",
//       slug: "chemicals",
//       products: 52,
//       sellers: 17,
//       status: "inactive",
//     },

//     {
//       id: 4,
//       name: "Electrical",
//       slug: "electrical",
//       products: 96,
//       sellers: 28,
//       status: "active",
//     },
//   ]);

//   const [newCategory, setNewCategory] = useState("");

//   // ─── ADD CATEGORY ───
//   const handleAddCategory = () => {
//     if (!newCategory.trim()) return;

//     const slug = newCategory
//       .toLowerCase()
//       .replace(/\s+/g, "-");

//     const newData = {
//       id: Date.now(),
//       name: newCategory,
//       slug,
//       products: 0,
//       sellers: 0,
//       status: "active",
//     };

//     setCategories([newData, ...categories]);
//     setNewCategory("");
//   };

//   // ─── DELETE ───
//   const handleDelete = (id) => {
//     setCategories(categories.filter((c) => c.id !== id));
//   };

//   // ─── STATUS TOGGLE ───
//   const toggleStatus = (id) => {
//     setCategories(
//       categories.map((c) =>
//         c.id === id
//           ? {
//               ...c,
//               status:
//                 c.status === "active"
//                   ? "inactive"
//                   : "active",
//             }
//           : c
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

//       {/* ───────────────── HEADER ───────────────── */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

//         <div>
//           <h1 className="text-2xl font-bold">
//             Categories Management
//           </h1>

//           <p className="text-sm text-white/40 mt-1">
//             Manage marketplace product categories
//           </p>
//         </div>

//         {/* ADD CATEGORY */}
//         <div className="flex gap-2">

//           <input
//             type="text"
//             placeholder="Add category..."
//             value={newCategory}
//             onChange={(e) =>
//               setNewCategory(e.target.value)
//             }
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-700 w-[220px]"
//           />

//           <button
//             onClick={handleAddCategory}
//             className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-xl text-sm font-medium transition"
//           >
//             Add Category
//           </button>

//         </div>

//       </div>

//       {/* ───────────────── STATS ───────────────── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

//         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
//           <p className="text-white/40 text-sm">
//             Total Categories
//           </p>

//           <h2 className="text-3xl font-bold mt-2">
//             {categories.length}
//           </h2>
//         </div>

//         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
//           <p className="text-white/40 text-sm">
//             Active Categories
//           </p>

//           <h2 className="text-3xl font-bold mt-2 text-green-400">
//             {
//               categories.filter(
//                 (c) => c.status === "active"
//               ).length
//             }
//           </h2>
//         </div>

//         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
//           <p className="text-white/40 text-sm">
//             Total Products
//           </p>

//           <h2 className="text-3xl font-bold mt-2 text-blue-400">
//             {categories.reduce(
//               (acc, c) => acc + c.products,
//               0
//             )}
//           </h2>
//         </div>

//         <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
//           <p className="text-white/40 text-sm">
//             Total Sellers
//           </p>

//           <h2 className="text-3xl font-bold mt-2 text-violet-400">
//             {categories.reduce(
//               (acc, c) => acc + c.sellers,
//               0
//             )}
//           </h2>
//         </div>

//       </div>

//       {/* ───────────────── TABLE ───────────────── */}
//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">

//         <div className="overflow-x-auto">

//           <table className="min-w-full text-sm text-left">

//             {/* HEAD */}
//             <thead className="bg-white/5 text-white/50 border-b border-white/10">

//               <tr>
//                 <th className="p-4">Category</th>
//                 <th className="p-4">Slug</th>
//                 <th className="p-4">Products</th>
//                 <th className="p-4">Sellers</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Actions</th>
//               </tr>

//             </thead>

//             {/* BODY */}
//             <tbody>

//               {categories.map((cat) => (
//                 <tr
//                   key={cat.id}
//                   className="border-t border-white/10 hover:bg-white/[0.03] transition"
//                 >

//                   {/* CATEGORY */}
//                   <td className="p-4 font-medium">
//                     {cat.name}
//                   </td>

//                   {/* SLUG */}
//                   <td className="p-4 text-white/50">
//                     /{cat.slug}
//                   </td>

//                   {/* PRODUCTS */}
//                   <td className="p-4 text-white/60">
//                     {cat.products}
//                   </td>

//                   {/* SELLERS */}
//                   <td className="p-4 text-white/60">
//                     {cat.sellers}
//                   </td>

//                   {/* STATUS */}
//                   <td className="p-4">

//                     <span
//                       className={`px-3 py-1 rounded-full text-[11px] font-medium
//                       ${
//                         cat.status === "active"
//                           ? "bg-green-500/20 text-green-400"
//                           : "bg-red-500/20 text-red-400"
//                       }`}
//                     >
//                       {cat.status}
//                     </span>

//                   </td>

//                   {/* ACTIONS */}
//                   <td className="p-4">

//                     <div className="flex gap-2 flex-wrap">

//                       <button
//                         onClick={() =>
//                           toggleStatus(cat.id)
//                         }
//                         className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
//                       >
//                         Toggle Status
//                       </button>

//                       <button
//                         onClick={() =>
//                           handleDelete(cat.id)
//                         }
//                         className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
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

//       </div>

//     </div>
//   );
// }



// import React, { useState } from "react";
// import axios from "axios";

// const Categories = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     slug: "",
//     desc: "",
//   });

//   const [image, setImage] = useState(null);

//   const [loading, setLoading] = useState(false);

//   // ==========================
//   // HANDLE CHANGE
//   // ==========================
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ==========================
//   // SUBMIT
//   // ==========================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const data = new FormData();

//       data.append("name", formData.name);
//       data.append("slug", formData.slug);
//       data.append("desc", formData.desc);

//       data.append("image", image);

//       // EMPTY PRODUCTS ARRAY
//       data.append("products", JSON.stringify([]));

//       const res = await axios.post(
//         "http://localhost:5000/api/categories/create",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert(res.data.message);

//       // RESET
//       setFormData({
//         name: "",
//         slug: "",
//         desc: "",
//       });

//       setImage(null);
//     } catch (error) {
//       console.log(error);

//       alert(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* TITLE */}
//       <h1 className="text-3xl font-bold mb-6">
//         Add Category
//       </h1>

//       {/* FORM */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow-md max-w-2xl space-y-5"
//       >
//         {/* NAME */}
//         <div>
//           <label className="block mb-2 font-semibold">
//             Category Name
//           </label>

//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Electronics"
//             className="w-full border rounded-lg px-4 py-3 outline-none"
//             required
//           />
//         </div>

//         {/* SLUG */}
//         <div>
//           <label className="block mb-2 font-semibold">
//             Category Slug
//           </label>

//           <input
//             type="text"
//             name="slug"
//             value={formData.slug}
//             onChange={handleChange}
//             placeholder="electronics"
//             className="w-full border rounded-lg px-4 py-3 outline-none"
//             required
//           />
//         </div>

//         {/* DESCRIPTION */}
//         <div>
//           <label className="block mb-2 font-semibold">
//             Description
//           </label>

//           <textarea
//             name="desc"
//             value={formData.desc}
//             onChange={handleChange}
//             placeholder="Category description..."
//             rows="4"
//             className="w-full border rounded-lg px-4 py-3 outline-none"
//             required
//           />
//         </div>

//         {/* IMAGE */}
//         <div>
//           <label className="block mb-2 font-semibold">
//             Category Image
//           </label>

//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//             className="w-full"
//             required
//           />
//         </div>

//         {/* BUTTON */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition"
//         >
//           {loading ? "Creating..." : "Create Category"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Categories;



import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const API = import.meta.env.VITE_API_URL;

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    desc: "",
  });

  const [image, setImage] = useState(null);

  // ================= FETCH =================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${API}/categories`
      );

      setCategories(res.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

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

      if (image) {
        data.append("image", image);
      }

      // ================= UPDATE =================
      if (editingId) {
        const res = await axios.put(
          `${API}/categories/${editingId}`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(res.data.message);
      }

      // ================= CREATE =================
      else {
        const res = await axios.post(
          `${API}/categories/create`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(res.data.message);
      }

      // RESET
      setFormData({
        name: "",
        slug: "",
        desc: "",
      });

      setImage(null);

      setEditingId(null);

      fetchCategories();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Delete this category?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `${API}/categories/${id}`
      );

      fetchCategories();
    } catch (error) {
      console.log(error);

      alert("Delete failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (cat) => {
    setEditingId(cat._id);

    setFormData({
      name: cat.name,
      slug: cat.slug,
      desc: cat.desc,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= CANCEL EDIT =================
  const cancelEdit = () => {
    setEditingId(null);

    setFormData({
      name: "",
      slug: "",
      desc: "",
    });

    setImage(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Categories Management
          </h1>

          <p className="text-sm text-white/40 mt-1">
            Manage marketplace product
            categories
          </p>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700"
            required
          />

          {/* SLUG */}
          <input
            type="text"
            name="slug"
            placeholder="Category Slug"
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

          {/* IMAGE */}
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
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

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Total Categories
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {categories?.length || 0}
          </h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Active Categories
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {categories?.length || 0}
          </h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Total Products
          </p>

          <h2 className="text-3xl font-bold mt-2 text-blue-400">
            {categories?.reduce(
              (acc, c) =>
                acc +
                (c?.products?.length || 0),
              0
            ) || 0}
          </h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Total Slugs
          </p>

          <h2 className="text-3xl font-bold mt-2 text-violet-400">
            {categories?.length || 0}
          </h2>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            {/* HEAD */}
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Image</th>

                <th className="p-4">
                  Category
                </th>

                <th className="p-4">
                  Slug
                </th>

                <th className="p-4">
                  Products
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Actions
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {categories?.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-t border-white/10 hover:bg-white/[0.03] transition"
                >
                  {/* IMAGE */}
                  <td className="p-4">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  {/* NAME */}
                  <td className="p-4 font-medium">
                    {cat.name}
                  </td>

                  {/* SLUG */}
                  <td className="p-4 text-white/50">
                    /{cat.slug}
                  </td>

                  {/* PRODUCTS */}
                  <td className="p-4 text-white/60">
                    {cat?.products?.length ||
                      0}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-green-500/20 text-green-400">
                      active
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      {/* EDIT */}
                      <button
                        onClick={() =>
                          handleEdit(cat)
                        }
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(
                            cat._id
                          )
                        }
                        className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* EMPTY */}
              {categories?.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-white/40"
                  >
                    No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}