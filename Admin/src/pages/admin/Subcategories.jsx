// import { useEffect, useState } from "react";

// export default function Subcategories() {
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [subcategoryName, setSubcategoryName] = useState("");

//   useEffect(() => {
//     // Dummy Categories
//     setCategories([
//       "Electronics",
//       "Steel",
//       "Chemicals",
//       "Plastics",
//       "Industrial Tools",
//     ]);

//     // Dummy Subcategories
//     setSubcategories([
//       {
//         id: 1,
//         category: "Electronics",
//         name: "Mobile Phones",
//         status: "active",
//       },
//       {
//         id: 2,
//         category: "Electronics",
//         name: "Laptops",
//         status: "active",
//       },
//       {
//         id: 3,
//         category: "Steel",
//         name: "Steel Rods",
//         status: "inactive",
//       },
//     ]);
//   }, []);

//   // ADD SUBCATEGORY
//   const handleAdd = () => {
//     if (!selectedCategory || !subcategoryName) return;

//     const newSubcategory = {
//       id: Date.now(),
//       category: selectedCategory,
//       name: subcategoryName,
//       status: "active",
//     };

//     setSubcategories([newSubcategory, ...subcategories]);

//     setSelectedCategory("");
//     setSubcategoryName("");
//   };

//   // TOGGLE STATUS
//   const toggleStatus = (id) => {
//     setSubcategories((prev) =>
//       prev.map((s) =>
//         s.id === id
//           ? {
//               ...s,
//               status:
//                 s.status === "active"
//                   ? "inactive"
//                   : "active",
//             }
//           : s
//       )
//     );
//   };

//   // DELETE
//   const handleDelete = (id) => {
//     setSubcategories((prev) =>
//       prev.filter((s) => s.id !== id)
//     );
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#0A0A0F] text-white p-4 sm:p-6">

//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">
//           Subcategories Management
//         </h1>

//         <p className="text-sm text-white/40 mt-1">
//           Manage marketplace subcategories
//         </p>
//       </div>

//       {/* ADD FORM */}
//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">

//         <h2 className="text-lg font-semibold mb-5">
//           Add New Subcategory
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//           {/* CATEGORY SELECT */}
//           <div>
//             <label className="text-xs text-white/50 mb-2 block">
//               Select Category
//             </label>

//             <select
//               value={selectedCategory}
//               onChange={(e) =>
//                 setSelectedCategory(e.target.value)
//               }
//               className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none"
//             >
//               <option value="">Choose Category</option>

//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* SUBCATEGORY INPUT */}
//           <div>
//             <label className="text-xs text-white/50 mb-2 block">
//               Subcategory Name
//             </label>

//             <input
//               type="text"
//               placeholder="Enter subcategory"
//               value={subcategoryName}
//               onChange={(e) =>
//                 setSubcategoryName(e.target.value)
//               }
//               className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none"
//             />
//           </div>

//           {/* BUTTON */}
//           <div className="flex items-end">
//             <button
//               onClick={handleAdd}
//               className="w-full bg-blue-800 hover:bg-blue-900 transition px-4 py-3 rounded-xl text-sm font-medium"
//             >
//               Add Subcategory
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">

//         <div className="overflow-x-auto">

//           <table className="w-full text-sm text-left">

//             <thead className="bg-white/5 text-white/60">
//               <tr>
//                 <th className="p-4">Category</th>
//                 <th className="p-4">Subcategory</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {subcategories.map((s) => (
//                 <tr
//                   key={s.id}
//                   className="border-t border-white/10 hover:bg-white/5 transition"
//                 >

//                   {/* CATEGORY */}
//                   <td className="p-4 text-white/70">
//                     {s.category}
//                   </td>

//                   {/* SUBCATEGORY */}
//                   <td className="p-4 font-medium">
//                     {s.name}
//                   </td>

//                   {/* STATUS */}
//                   <td className="p-4">
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-medium
//                         ${
//                           s.status === "active"
//                             ? "bg-green-500/20 text-green-400"
//                             : "bg-red-500/20 text-red-400"
//                         }`}
//                     >
//                       {s.status}
//                     </span>
//                   </td>

//                   {/* ACTIONS */}
//                   <td className="p-4 flex gap-2 flex-wrap">

//                     <button
//                       onClick={() => toggleStatus(s.id)}
//                       className={`px-3 py-1 rounded text-xs
//                         ${
//                           s.status === "active"
//                             ? "bg-yellow-600 hover:bg-yellow-700"
//                             : "bg-green-700 hover:bg-green-800"
//                         }`}
//                     >
//                       {s.status === "active"
//                         ? "Disable"
//                         : "Enable"}
//                     </button>

//                     <button
//                       onClick={() => handleDelete(s.id)}
//                       className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-xs"
//                     >
//                       Delete
//                     </button>

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




import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function SubCategories() {
  const API = import.meta.env.VITE_API_URL;

  // ================= STATES =================
  const [categories, setCategories] =
    useState([]);

  const [subCategories, setSubCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [image, setImage] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      slug: "",
      desc: "",
      category: "",
    });

  // ================= FETCH =================
  useEffect(() => {
    fetchCategories();

    fetchSubCategories();
  }, []);

  // ================= FETCH CATEGORIES =================
  const fetchCategories =
    async () => {
      try {
        const res = await axios.get(
          `${API}/categories`
        );

        setCategories(
          res.data.categories || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  // ================= FETCH SUBCATEGORIES =================
  const fetchSubCategories =
    async () => {
      try {
        const res = await axios.get(
          `${API}/subcategories`
        );

        setSubCategories(
          res.data.subCategories || []
        );
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

      data.append(
        "category",
        formData.category
      );

      if (image) {
        data.append("image", image);
      }

      // UPDATE
      if (editingId) {
        const res = await axios.put(
          `${API}/subcategories/${editingId}`,
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

      // CREATE
      else {
        const res = await axios.post(
          `${API}/subcategories/create`,
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
        category: "",
      });

      setImage(null);

      setEditingId(null);

      fetchSubCategories();
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
        "Delete this subcategory?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `${API}/subcategories/${id}`
      );

      fetchSubCategories();
    } catch (error) {
      console.log(error);

      alert("Delete failed");
    }
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= CANCEL =================
  const cancelEdit = () => {
    setEditingId(null);

    setFormData({
      name: "",
      slug: "",
      desc: "",
      category: "",
    });

    setImage(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">
      {/* ================= HEADER ================= */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Subcategories Management
        </h1>

        <p className="text-sm text-white/40 mt-1">
          Manage marketplace
          subcategories
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
            <option value="">
              Select Category
            </option>

            {categories.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
                className="bg-black"
              >
                {cat.name}
              </option>
            ))}
          </select>

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

                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Slug
                </th>

                <th className="p-4">
                  Category
                </th>

                <th className="p-4">
                  Actions
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {subCategories.map((sub) => (
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
                  <td className="p-4">
                    {sub.name}
                  </td>

                  {/* SLUG */}
                  <td className="p-4 text-white/50">
                    /{sub.slug}
                  </td>

                  {/* CATEGORY */}
                  <td className="p-4 text-blue-400">
                    {
                      sub.category
                        ?.name
                    }
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleEdit(sub)
                        }
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            sub._id
                          )
                        }
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
                  <td
                    colSpan="5"
                    className="text-center py-10 text-white/40"
                  >
                    No Subcategories Found
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