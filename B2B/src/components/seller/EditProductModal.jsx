// // src/components/seller/EditProductModal.jsx

// import React, { useState } from "react";
// import { FaTimes, FaTrash } from "react-icons/fa";
// import { updateProduct } from "../../api/productApi";
// import toast from "react-hot-toast";

// const EditProductModal = ({ product, onClose, onUpdated }) => {
//   const [formData, setFormData] = useState({
//     title:       product.title       || "",
//     shortDesc:   product.shortDesc   || "",
//     description: product.description || "",
//     price:       product.price       || "",
//     moq:         product.moq         || "",
//     unit:        product.unit        || "",
//     brand:       product.brand       || "",
//     stock:       product.stock       || "",
//   });

//   // Existing images (from DB)
//   const [existingImages, setExistingImages] = useState(product.images || []);
//   // public_ids to remove
//   const [removeImages, setRemoveImages]     = useState([]);
//   // New files selected
//   const [newFiles, setNewFiles]             = useState([]);
//   const [newPreviews, setNewPreviews]       = useState([]);
//   const [loading, setLoading]               = useState(false);

//   // ── HANDLE INPUT ──
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // ── MARK EXISTING IMAGE FOR REMOVAL ──
//   const handleRemoveExisting = (public_id) => {
//     setRemoveImages((prev) => [...prev, public_id]);
//     setExistingImages((prev) => prev.filter((img) => img.public_id !== public_id));
//   };

//   // ── NEW IMAGE SELECT ──
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewFiles((prev) => [...prev, ...files]);
//     const previews = files.map((f) => URL.createObjectURL(f));
//     setNewPreviews((prev) => [...prev, ...previews]);
//   };

//   // ── REMOVE NEW FILE (before upload) ──
//   const handleRemoveNew = (index) => {
//     setNewFiles((prev)    => prev.filter((_, i) => i !== index));
//     setNewPreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   // ── SUBMIT ──
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (existingImages.length + newFiles.length === 0) {
//       toast.error("At least 1 image is required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const fd = new FormData();
//       Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

//       if (removeImages.length > 0) {
//         fd.append("removeImages", JSON.stringify(removeImages));
//       }

//       newFiles.forEach((file) => fd.append("images", file));

//       const data = await updateProduct(product._id, fd);

//       if (data.success) {
//         toast.success(data.message || "Product updated!");
//         onUpdated(data.product);
//         onClose();
//       } else {
//         toast.error(data.message || "Update failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">

//         {/* HEADER */}
//         <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Edit Product</h2>
//           <button onClick={onClose} className="text-white hover:text-blue-200 text-xl">
//             <FaTimes />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

//             {/* TITLE */}
//             <div>
//               <label className="text-xs text-gray-400 mb-1 block">Product Title *</label>
//               <input
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
//               />
//             </div>

//             {/* SHORT DESC */}
//             <div>
//               <label className="text-xs text-gray-400 mb-1 block">Short Description</label>
//               <input
//                 name="shortDesc"
//                 value={formData.shortDesc}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div>
//               <label className="text-xs text-gray-400 mb-1 block">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
//               />
//             </div>

//             {/* PRICE + MOQ */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-xs text-gray-400 mb-1 block">Price (₹) *</label>
//                 <input
//                   name="price"
//                   type="number"
//                   value={formData.price}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 mb-1 block">MOQ</label>
//                 <input
//                   name="moq"
//                   type="number"
//                   value={formData.moq}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
//                 />
//               </div>
//             </div>

//             {/* UNIT + BRAND + STOCK */}
//             <div className="grid grid-cols-3 gap-4">
//               <div>
//                 <label className="text-xs text-gray-400 mb-1 block">Unit</label>
//                 <input
//                   name="unit"
//                   value={formData.unit}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 mb-1 block">Brand</label>
//                 <input
//                   name="brand"
//                   value={formData.brand}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 mb-1 block">Stock</label>
//                 <input
//                   name="stock"
//                   type="number"
//                   value={formData.stock}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
//                 />
//               </div>
//             </div>

//             {/* EXISTING IMAGES */}
//             {existingImages.length > 0 && (
//               <div>
//                 <label className="text-xs text-gray-400 mb-2 block">Current Images</label>
//                 <div className="flex gap-3 flex-wrap">
//                   {existingImages.map((img) => (
//                     <div key={img.public_id} className="relative">
//                       <img
//                         src={img.url}
//                         alt="product"
//                         className="h-20 w-20 object-cover rounded-xl border"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveExisting(img.public_id)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
//                       >
//                         <FaTrash className="w-2.5 h-2.5" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* NEW IMAGES */}
//             <div>
//               <label className="text-xs text-gray-400 mb-2 block">Add New Images</label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="w-full border border-dashed border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-pointer"
//               />
//               {newPreviews.length > 0 && (
//                 <div className="flex gap-3 flex-wrap mt-3">
//                   {newPreviews.map((src, i) => (
//                     <div key={i} className="relative">
//                       <img
//                         src={src}
//                         alt={`new-${i}`}
//                         className="h-20 w-20 object-cover rounded-xl border"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveNew(i)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
//                       >
//                         <FaTrash className="w-2.5 h-2.5" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//           </div>

//           {/* FOOTER */}
//           <div className="px-6 py-4 border-t flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-5 py-2 border rounded-xl text-sm hover:border-gray-400 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-sm font-semibold transition disabled:opacity-60"
//             >
//               {loading ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </form>

//       </div>
//     </div>
//   );
// };

// export default EditProductModal;




// src/components/seller/EditProductModal.jsx

import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { updateProduct } from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";
import { getSubCategoriesByCategory } from "../../api/subCategoryApi";
import toast from "react-hot-toast";

const EditProductModal = ({ product, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    title:       product.title       || "",
    shortDesc:   product.shortDesc   || "",
    description: product.description || "",
    keyFeatures: product.keyFeatures || "",
    category:    product.category?._id    || "",
    subcategory: product.subcategory?._id || "",
    price:       product.price       || "",
    moq:         product.moq         || "",
    unit:        product.unit        || "",
    brand:       product.brand       || "",
    stock:       product.stock       || "",
  });

  // CATEGORY / SUBCATEGORY OPTIONS
  const [categories, setCategories]       = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Existing images (from DB)
  const [existingImages, setExistingImages] = useState(product.images || []);
  // public_ids to remove
  const [removeImages, setRemoveImages]     = useState([]);
  // New files selected
  const [newFiles, setNewFiles]             = useState([]);
  const [newPreviews, setNewPreviews]       = useState([]);
  const [loading, setLoading]               = useState(false);

  // ── FETCH CATEGORIES ──
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Category fetch error:", err);
      }
    };
    fetchCategories();
  }, []);

  // ── FETCH SUBCATEGORIES (on category change / initial load) ──
  useEffect(() => {
    if (!formData.category) {
      setSubCategories([]);
      return;
    }
    const fetchSubCategories = async () => {
      try {
        const data = await getSubCategoriesByCategory(formData.category);
        setSubCategories(data.subCategories || []);
      } catch (err) {
        console.error("SubCategory fetch error:", err);
      }
    };
    fetchSubCategories();
  }, [formData.category]);

  // ── HANDLE INPUT ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && { subcategory: "" }),
    }));
  };

  // ── MARK EXISTING IMAGE FOR REMOVAL ──
  const handleRemoveExisting = (public_id) => {
    setRemoveImages((prev) => [...prev, public_id]);
    setExistingImages((prev) => prev.filter((img) => img.public_id !== public_id));
  };

  // ── NEW IMAGE SELECT ──
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...files]);
    const previews = files.map((f) => URL.createObjectURL(f));
    setNewPreviews((prev) => [...prev, ...previews]);
  };

  // ── REMOVE NEW FILE (before upload) ──
  const handleRemoveNew = (index) => {
    setNewFiles((prev)    => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ── SUBMIT ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existingImages.length + newFiles.length === 0) {
      toast.error("At least 1 image is required");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

      if (removeImages.length > 0) {
        fd.append("removeImages", JSON.stringify(removeImages));
      }

      newFiles.forEach((file) => fd.append("images", file));

      const data = await updateProduct(product._id, fd);

      if (data.success) {
        toast.success(data.message || "Product updated!");
        onUpdated(data.product);
        onClose();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Product</h2>
          <button onClick={onClose} className="text-white hover:text-blue-200 text-xl">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

            {/* TITLE */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Product Title *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* CATEGORY + SUBCATEGORY */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Sub Category *</label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  required
                  disabled={!formData.category}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50"
                >
                  <option value="">
                    {formData.category ? "Select Sub Category" : "Select category first"}
                  </option>
                  {subCategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SHORT DESC */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Short Description</label>
              <input
                name="shortDesc"
                value={formData.shortDesc}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* KEY FEATURES */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Key Features</label>
              <textarea
                name="keyFeatures"
                value={formData.keyFeatures}
                onChange={handleChange}
                rows={3}
                placeholder={"One feature per line..."}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* PRICE + MOQ */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Price (₹) *</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">MOQ</label>
                <input
                  name="moq"
                  type="number"
                  value={formData.moq}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* UNIT + BRAND + STOCK */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Unit</label>
                <input
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Brand</label>
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Stock</label>
                <input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* EXISTING IMAGES */}
            {existingImages.length > 0 && (
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Current Images</label>
                <div className="flex gap-3 flex-wrap">
                  {existingImages.map((img) => (
                    <div key={img.public_id} className="relative">
                      <img
                        src={img.url}
                        alt="product"
                        className="h-20 w-20 object-cover rounded-xl border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExisting(img.public_id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        <FaTrash className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NEW IMAGES */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Add New Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-dashed border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-pointer"
              />
              {newPreviews.length > 0 && (
                <div className="flex gap-3 flex-wrap mt-3">
                  {newPreviews.map((src, i) => (
                    <div key={i} className="relative">
                      <img
                        src={src}
                        alt={`new-${i}`}
                        className="h-20 w-20 object-cover rounded-xl border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveNew(i)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        <FaTrash className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-xl text-sm hover:border-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-sm font-semibold transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditProductModal;