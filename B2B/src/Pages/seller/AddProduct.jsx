

// import React, { useState, useEffect } from "react";

// import {
//   FaCloudUploadAlt,
//   FaBoxOpen,
//   FaMoneyBillWave,
//   FaLayerGroup,
// } from "react-icons/fa";

// const AddProduct = () => {
//   const [images, setImages] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     price: "",
//     moq: "",
//     description: "",
//   });

//   // CLEANUP OBJECT URLS (memory leak fix)
//   useEffect(() => {
//     return () => {
//       images.forEach((img) => URL.revokeObjectURL(img));
//     };
//   }, [images]);

//   // IMAGE HANDLER (max 5 images)
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files).slice(0, 5);

//     const urls = files.map((file) => URL.createObjectURL(file));
//     setImages(urls);
//   };

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("Product Data:", form);
//     console.log("Images:", images);

//     alert("Product Submitted Successfully 🚀");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* CONTENT */}
//       <main className="flex-1 p-6 overflow-y-auto">

//         {/* FORM CARD */}
//         <div className="bg-white rounded-[30px] shadow-md border border-gray-100 overflow-hidden">

//           {/* TOP HEADER */}
//           <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-6">
//             <h2 className="text-2xl font-bold">Add New Product</h2>

//             <p className="text-blue-100 text-sm">
//               Add accurate details for better buyer reach
//             </p>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="p-8 space-y-8">

//             {/* INPUT GRID */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               {/* NAME */}
//               <div>
//                 <label className="font-semibold block mb-2">
//                   Product Name
//                 </label>

//                 <div className="relative">
//                   <FaBoxOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

//                   <input
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Enter product name"
//                     className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none"
//                   />
//                 </div>
//               </div>

//               {/* CATEGORY */}
//               <div>
//                 <label className="font-semibold block mb-2">
//                   Category
//                 </label>

//                 <div className="relative">
//                   <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

//                   <select
//                     name="category"
//                     value={form.category}
//                     onChange={handleChange}
//                     className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none appearance-none"
//                   >
//                     <option value="">Select Category</option>
//                     <option>Industrial</option>
//                     <option>Electronics</option>
//                     <option>Chemicals</option>
//                     <option>Machinery</option>
//                   </select>
//                 </div>
//               </div>

//               {/* PRICE */}
//               <div>
//                 <label className="font-semibold block mb-2">
//                   Price
//                 </label>

//                 <div className="relative">
//                   <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

//                   <input
//                     name="price"
//                     value={form.price}
//                     onChange={handleChange}
//                     type="number"
//                     placeholder="Enter price"
//                     className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none"
//                   />
//                 </div>
//               </div>

//               {/* MOQ */}
//               <div>
//                 <label className="font-semibold block mb-2">
//                   Minimum Order Quantity
//                 </label>

//                 <input
//                   name="moq"
//                   value={form.moq}
//                   onChange={handleChange}
//                   type="number"
//                   placeholder="MOQ"
//                   className="w-full h-14 px-4 border rounded-2xl focus:border-orange-500 outline-none"
//                 />
//               </div>
//             </div>

//             {/* DESCRIPTION */}
//             <div>
//               <label className="font-semibold block mb-2">
//                 Description
//               </label>

//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 placeholder="Write product details..."
//                 className="w-full h-28 p-4 border rounded-3xl focus:border-orange-500 outline-none resize-none"
//               />
//             </div>

//             {/* IMAGE UPLOAD */}
//             <div>
//               <label className="block font-semibold mb-3">
//                 Upload Product Images
//               </label>

//               <label className="border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-orange-50 transition">
//                 <FaCloudUploadAlt className="text-4xl text-orange-500 mb-3" />

//                 <p className="font-semibold">Click to Upload Images</p>

//                 <p className="text-sm text-gray-500">
//                   JPG, PNG (Max 5 images) — Selected: {images.length}/5
//                 </p>

//                 <input
//                   type="file"
//                   multiple
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               </label>

//               {/* PREVIEW */}
//               {images.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">
//                   {images.map((img, i) => (
//                     <img
//                       key={i}
//                       src={img}
//                       alt="preview"
//                       className="h-28 w-full object-cover rounded-2xl border"
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* BUTTONS */}
//             <div className="flex gap-4 flex-wrap">

//               <button
//                 type="submit"
//                 className="bg-[#F54900] hover:bg-[#d63f00] text-white px-8 py-4 rounded-2xl font-semibold shadow-md"
//               >
//                 Submit Product
//               </button>

//               <button
//                 type="button"
//                 className="border px-8 py-4 rounded-2xl font-semibold hover:border-blue-800 hover:text-blue-800"
//               >
//                 Save Draft
//               </button>

//             </div>

//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AddProduct;






// src/pages/seller/AddProduct.jsx

// import React, { useState, useEffect } from "react";
// import {
//   FaCloudUploadAlt,
//   FaBoxOpen,
//   FaMoneyBillWave,
//   FaLayerGroup,
//   FaTag,
//   FaRuler,
// } from "react-icons/fa";
// import { getCategories } from "../../api/categoryApi";
// import { getSubCategoriesByCategory } from "../../api/subCategoryApi";
// import { addProduct } from "../../api/productApi";

// const AddProduct = () => {

//   // ─────────────────────────────────────────
//   // STATES
//   // ─────────────────────────────────────────
//   const [categories, setCategories]       = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [imageFiles, setImageFiles]       = useState([]); // actual files (upload ke liye)
//   const [imagePreviews, setImagePreviews] = useState([]); // preview URLs
//   const [loading, setLoading]             = useState(false);
//   const [error, setError]                 = useState("");
//   const [success, setSuccess]             = useState("");

//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     subcategory: "",
//     price: "",
//     moq: "",
//     unit: "",
//     brand: "",
//     stock: "",
//     shortDesc: "",
//     description: "",
    
//   });

//   // ─────────────────────────────────────────
//   // FETCH CATEGORIES ON MOUNT
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data.categories || []);
//       } catch (err) {
//         console.error("Category fetch error:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // ─────────────────────────────────────────
//   // FETCH SUBCATEGORIES WHEN CATEGORY CHANGES
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     if (!form.category) {
//       setSubCategories([]);
//       return;
//     }

//     const fetchSubCategories = async () => {
//       try {
//         const data = await getSubCategoriesByCategory(form.category);
//         setSubCategories(data.subCategories || []);
//       } catch (err) {
//         console.error("SubCategory fetch error:", err);
//       }
//     };

//     fetchSubCategories();
//   }, [form.category]);

//   // ─────────────────────────────────────────
//   // CLEANUP PREVIEW URLS (memory leak fix)
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     return () => {
//       imagePreviews.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [imagePreviews]);

//   // ─────────────────────────────────────────
//   // FORM CHANGE HANDLER
//   // ─────────────────────────────────────────
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//       // Category change hone pe subcategory reset
//       ...(name === "category" && { subcategory: "" }),
//     }));
//   };

//   // ─────────────────────────────────────────
//   // IMAGE HANDLER (max 5)
//   // ─────────────────────────────────────────
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files).slice(0, 5);
//     setImageFiles(files);
//     setImagePreviews(files.map((file) => URL.createObjectURL(file)));
//   };

//   // ─────────────────────────────────────────
//   // SUBMIT HANDLER
//   // ─────────────────────────────────────────
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     // Validation
//     if (!form.title || !form.category || !form.subcategory || !form.price || !form.description) {
//       setError("Please fill all required fields.");
//       return;
//     }

//     if (imageFiles.length === 0) {
//       setError("Please upload at least 1 image.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // FormData banao — images + fields
//       const formData = new FormData();
//       formData.append("title",       form.title);
//       formData.append("category",    form.category);
//       formData.append("subcategory", form.subcategory);
//       formData.append("price",       form.price);
//       formData.append("moq",         form.moq);
//       formData.append("unit",        form.unit);
//       formData.append("brand",       form.brand);
//       formData.append("stock",       form.stock);
//       formData.append("shortDesc",   form.shortDesc);
//       formData.append("description", form.description);

//       // Images append (multiple)
//       imageFiles.forEach((file) => {
//         formData.append("images", file);
//       });

//       const res = await addProduct(formData);

//       if (res.success) {
//         setSuccess("Product submitted successfully! Waiting for admin approval.");

//         // Form reset
//         setForm({
//           title: "",
//           category: "",
//           subcategory: "",
//           price: "",
//           moq: "",
//           unit: "",
//           brand: "",
//           stock: "",
//           shortDesc: "",
//           description: "",
//         });
//         setImageFiles([]);
//         setImagePreviews([]);
//         setSubCategories([]);

//       } else {
//         setError(res.message || "Something went wrong.");
//       }

//     } catch (err) {
//       console.error("Submit error:", err);
//       setError("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <main className="flex-1 p-6 overflow-y-auto">
//         <div className="bg-white rounded-[30px] shadow-md border border-gray-100 overflow-hidden">

//           {/* HEADER */}
//           <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-6">
//             <h2 className="text-2xl font-bold">Add New Product</h2>
//             <p className="text-blue-100 text-sm">
//               Add accurate details for better buyer reach
//             </p>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="p-8 space-y-8">

//             {/* ERROR / SUCCESS */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-2xl text-sm">
//                 {error}
//               </div>
//             )}
//             {success && (
//               <div className="bg-green-50 border border-green-200 text-green-600 px-5 py-3 rounded-2xl text-sm">
//                 {success}
//               </div>
//             )}

//             {/* ROW 1 — Title + Category */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               {/* TITLE */}
//               <div>
//                 <label className="font-semibold block mb-2">
//                   Product Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <FaBoxOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     name="title"
//                     value={form.title}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Enter product name"
//                     className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none"
//                   />
//                 </div>
//               </div>

//               {/* CATEGORY */}
//               <div>
//                 <label className="font-semibold block mb-2">
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <select
//                     name="category"
//                     value={form.category}
//                     onChange={handleChange}
//                     className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none appearance-none"
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* SUBCATEGORY */}
//               <div>
//                 <label className="font-semibold block mb-2">
//                   Sub Category <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <select
//                     name="subcategory"
//                     value={form.subcategory}
//                     onChange={handleChange}
//                     disabled={!form.category}
//                     className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <option value="">
//                       {form.category ? "Select Sub Category" : "Select category first"}
//                     </option>
//                     {subCategories.map((sub) => (
//                       <option key={sub._id} value={sub._id}>
//                         {sub.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* PRICE */}
//               <div>
//                 <label className="font-semibold block mb-2">
//                   Price (₹) <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     name="price"
//                     value={form.price}
//                     onChange={handleChange}
//                     type="number"
//                     placeholder="Enter price"
//                     className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none"
//                   />
//                 </div>
//               </div>

//               {/* MOQ */}
//               <div>
//                 <label className="font-semibold block mb-2">
//                   Minimum Order Quantity
//                 </label>
//                 <input
//                   name="moq"
//                   value={form.moq}
//                   onChange={handleChange}
//                   type="number"
//                   placeholder="e.g. 50"
//                   className="w-full h-14 px-4 border rounded-2xl focus:border-orange-500 outline-none"
//                 />
//               </div>

//               {/* UNIT */}
//               <div>
//                 <label className="font-semibold block mb-2">Unit</label>
//                 <div className="relative">
//                   <FaRuler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <select
//                     name="unit"
//                     value={form.unit}
//                     onChange={handleChange}
//                     className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none appearance-none"
//                   >
//                     <option value="">Select Unit</option>
//                     <option value="Piece">Piece</option>
//                     <option value="Kg">Kg</option>
//                     <option value="Liter">Liter</option>
//                     <option value="Meter">Meter</option>
//                     <option value="Box">Box</option>
//                     <option value="Set">Set</option>
//                     <option value="Ton">Ton</option>
//                   </select>
//                 </div>
//               </div>

//               {/* BRAND */}
//               <div>
//                 <label className="font-semibold block mb-2">Brand</label>
//                 <input
//                   name="brand"
//                   value={form.brand}
//                   onChange={handleChange}
//                   type="text"
//                   placeholder="Enter brand name"
//                   className="w-full h-14 px-4 border rounded-2xl focus:border-orange-500 outline-none"
//                 />
//               </div>

//               {/* STOCK */}
//               <div>
//                 <label className="font-semibold block mb-2">Stock</label>
//                 <input
//                   name="stock"
//                   value={form.stock}
//                   onChange={handleChange}
//                   type="number"
//                   placeholder="Available stock"
//                   className="w-full h-14 px-4 border rounded-2xl focus:border-orange-500 outline-none"
//                 />
//               </div>

//             </div>

//             {/* SHORT DESCRIPTION */}
//             <div>
//               <label className="font-semibold block mb-2">
//                 Short Description
//               </label>
//               <input
//                 name="shortDesc"
//                 value={form.shortDesc}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="One line about product..."
//                 className="w-full h-14 px-4 border rounded-2xl focus:border-orange-500 outline-none"
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div>
//               <label className="font-semibold block mb-2">
//                 Full Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 placeholder="Write detailed product description..."
//                 className="w-full h-36 p-4 border rounded-3xl focus:border-orange-500 outline-none resize-none"
//               />
//             </div>

//             {/* IMAGE UPLOAD */}
//             <div>
//               <label className="block font-semibold mb-3">
//                 Upload Product Images <span className="text-red-500">*</span>
//               </label>

//               <label className="border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-orange-50 transition">
//                 <FaCloudUploadAlt className="text-4xl text-orange-500 mb-3" />
//                 <p className="font-semibold">Click to Upload Images</p>
//                 <p className="text-sm text-gray-500">
//                   JPG, PNG, WebP (Max 5 images) — Selected: {imageFiles.length}/5
//                 </p>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/jpeg,image/png,image/webp"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               </label>

//               {/* PREVIEW */}
//               {imagePreviews.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">
//                   {imagePreviews.map((url, i) => (
//                     <img
//                       key={i}
//                       src={url}
//                       alt={`preview-${i}`}
//                       className="h-28 w-full object-cover rounded-2xl border"
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* BUTTONS */}
//             <div className="flex gap-4 flex-wrap">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-[#F54900] hover:bg-[#d63f00] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-semibold shadow-md transition"
//               >
//                 {loading ? "Submitting..." : "Submit Product"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => window.history.back()}
//                 className="border px-8 py-4 rounded-2xl font-semibold hover:border-blue-800 hover:text-blue-800 transition"
//               >
//                 Cancel
//               </button>
//             </div>

//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AddProduct;




// src/pages/seller/AddProduct.jsx

import React, { useState, useEffect } from "react";
import {
  FaCloudUploadAlt,
  FaBoxOpen,
  FaMoneyBillWave,
  FaLayerGroup,
  FaTag,
  FaRuler,
  FaCrown,
} from "react-icons/fa";

import { getCategories } from "../../api/categoryApi";
import { getSubCategoriesByCategory } from "../../api/subCategoryApi";
import { addProduct } from "../../api/productApi";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

const navigate = useNavigate();
  // ─────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────
  const [categories, setCategories]       = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [imageFiles, setImageFiles]       = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");
  const [success, setSuccess]             = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    subcategory: "",
    price: "",
    moq: "",
    unit: "",
    brand: "",
    stock: "",
    shortDesc: "",
    description: "",
  });

  // ─────────────────────────────────────────
  // FETCH CATEGORIES
  // ─────────────────────────────────────────
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

  // ─────────────────────────────────────────
  // FETCH SUBCATEGORIES
  // ─────────────────────────────────────────
  useEffect(() => {
    if (!form.category) {
      setSubCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const data = await getSubCategoriesByCategory(form.category);
        setSubCategories(data.subCategories || []);
      } catch (err) {
        console.error("SubCategory fetch error:", err);
      }
    };

    fetchSubCategories();
  }, [form.category]);

  // ─────────────────────────────────────────
  // CLEANUP PREVIEW URLS
  // ─────────────────────────────────────────
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  // ─────────────────────────────────────────
  // FORM CHANGE
  // ─────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && { subcategory: "" }),
    }));
  };

  // ─────────────────────────────────────────
  // IMAGE CHANGE
  // ─────────────────────────────────────────
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);

    setImageFiles(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // ─────────────────────────────────────────
  // SUBMIT
  // ─────────────────────────────────────────
 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!form.title || !form.category || !form.subcategory || !form.price || !form.description) {
    setError("Please fill all required fields.");
    return;
  }

  if (imageFiles.length === 0) {
    setError("Please upload at least 1 image.");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("title",       form.title);
    formData.append("category",    form.category);
    formData.append("subcategory", form.subcategory);
    formData.append("price",       form.price);
    formData.append("moq",         form.moq);
    formData.append("unit",        form.unit);
    formData.append("brand",       form.brand);
    formData.append("stock",       form.stock);
    formData.append("shortDesc",   form.shortDesc);
    formData.append("description", form.description);

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    // ✅ SAHI — res directly data hai
    const res = await addProduct(formData);

    if (res.success) {
      setSuccess(res.message);

      // FORM RESET
      setForm({
        title: "", category: "", subcategory: "",
        price: "", moq: "", unit: "", brand: "",
        stock: "", shortDesc: "", description: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
      setSubCategories([]);

    } else {
      setError(res.message || "Something went wrong.");
    }

  } catch (err) {
    console.error("Submit error:", err);
    setError(err.response?.data?.message || "Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};
  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <main className="flex-1 p-6 overflow-y-auto">

        <div className="bg-white rounded-[30px] shadow-md border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-6">
            <h2 className="text-2xl font-bold">
              Add New Product
            </h2>

            <p className="text-blue-100 text-sm">
              Add accurate details for better buyer reach
            </p>
          </div>

          {/* SUBSCRIPTION CARD */}
       {/* SUBSCRIPTION CARD */}
<div className="mx-8 mt-8 relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-lg">

  {/* BG DECORATION */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
  <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-orange-500/10 rounded-full translate-y-1/2 pointer-events-none" />

  {/* LEFT */}
  <div className="flex items-center gap-5 relative z-10">

    {/* ICON */}
    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg flex-shrink-0">
      <FaCrown className="text-2xl text-white" />
    </div>

    {/* TEXT */}
    <div>
      <div className="flex items-center gap-3 mb-1">
        <h3 className="text-lg font-bold text-white">
          Pending Subscription
        </h3>
        <span className="bg-orange-500/20 text-orange-400 text-xs px-3 py-1 rounded-full border border-orange-500/30 font-medium">
          Free Plan
        </span>
      </div>

      <p className="text-white/60 text-sm leading-relaxed max-w-xl">
        Your products will stay <span className="text-orange-400 font-medium">pending</span> until subscription is active.
        Upgrade to publish products instantly.
      </p>

      {/* PLAN PILLS */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {["Basic", "Premium", "Gold"].map((plan) => (
          <span
            key={plan}
            className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/50 border border-white/10"
          >
            {plan}
          </span>
        ))}
      </div>
    </div>

  </div>

  {/* BUTTON */}
  <button
  type="button"
  onClick={() => navigate("/seller/subscription")}
  className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-200 flex items-center gap-2"
>
  <FaCrown className="text-sm" />
  Subscribe Now
  <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
    HOT
  </span>
</button>

</div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-2xl text-sm">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-5 py-3 rounded-2xl text-sm">
                {success}
              </div>
            )}

            {/* ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* TITLE */}
              <div>
                <label className="font-semibold block mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FaBoxOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter product name"
                    className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="font-semibold block mb-2">
                  Category <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none appearance-none"
                  >
                    <option value="">Select Category</option>

                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SUBCATEGORY */}
              <div>
                <label className="font-semibold block mb-2">
                  Sub Category <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <select
                    name="subcategory"
                    value={form.subcategory}
                    onChange={handleChange}
                    disabled={!form.category}
                    className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none appearance-none disabled:opacity-50"
                  >
                    <option value="">
                      {form.category
                        ? "Select Sub Category"
                        : "Select category first"}
                    </option>

                    {subCategories.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PRICE */}
              <div>
                <label className="font-semibold block mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    type="number"
                    placeholder="Enter price"
                    className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              {/* MOQ */}
              <div>
                <label className="font-semibold block mb-2">
                  Minimum Order Quantity
                </label>

                <input
                  name="moq"
                  value={form.moq}
                  onChange={handleChange}
                  type="number"
                  placeholder="e.g. 50"
                  className="w-full h-14 px-4 border rounded-2xl focus:border-orange-500 outline-none"
                />
              </div>

              {/* UNIT */}
              <div>
                <label className="font-semibold block mb-2">
                  Unit
                </label>

                <div className="relative">
                  <FaRuler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <select
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    className="w-full h-14 pl-12 pr-4 border rounded-2xl focus:border-orange-500 outline-none appearance-none"
                  >
                    <option value="">Select Unit</option>
                    <option value="Piece">Piece</option>
                    <option value="Kg">Kg</option>
                    <option value="Liter">Liter</option>
                    <option value="Meter">Meter</option>
                    <option value="Box">Box</option>
                    <option value="Set">Set</option>
                    <option value="Ton">Ton</option>
                  </select>
                </div>
              </div>

              {/* BRAND */}
              <div>
                <label className="font-semibold block mb-2">
                  Brand
                </label>

                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter brand name"
                  className="w-full h-14 px-4 border rounded-2xl focus:border-orange-500 outline-none"
                />
              </div>

              {/* STOCK */}
              <div>
                <label className="font-semibold block mb-2">
                  Stock
                </label>

                <input
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  type="number"
                  placeholder="Available stock"
                  className="w-full h-14 px-4 border rounded-2xl focus:border-orange-500 outline-none"
                />
              </div>

            </div>

            {/* SHORT DESCRIPTION */}
            <div>
              <label className="font-semibold block mb-2">
                Short Description
              </label>

              <input
                name="shortDesc"
                value={form.shortDesc}
                onChange={handleChange}
                type="text"
                placeholder="One line about product..."
                className="w-full h-14 px-4 border rounded-2xl focus:border-orange-500 outline-none"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="font-semibold block mb-2">
                Full Description <span className="text-red-500">*</span>
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write detailed product description..."
                className="w-full h-36 p-4 border rounded-3xl focus:border-orange-500 outline-none resize-none"
              />
            </div>

            {/* IMAGE */}
            <div>

              <label className="block font-semibold mb-3">
                Upload Product Images <span className="text-red-500">*</span>
              </label>

              <label className="border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-orange-50 transition">

                <FaCloudUploadAlt className="text-4xl text-orange-500 mb-3" />

                <p className="font-semibold">
                  Click to Upload Images
                </p>

                <p className="text-sm text-gray-500">
                  JPG, PNG, WebP (Max 5 images) — Selected: {imageFiles.length}/5
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />

              </label>

              {/* PREVIEW */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">

                  {imagePreviews.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`preview-${i}`}
                      className="h-28 w-full object-cover rounded-2xl border"
                    />
                  ))}

                </div>
              )}

            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 flex-wrap">

              <button
                type="submit"
                disabled={loading}
                className="bg-[#F54900] hover:bg-[#d63f00] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-semibold shadow-md transition"
              >
                {loading ? "Submitting..." : "Submit Product"}
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="border px-8 py-4 rounded-2xl font-semibold hover:border-blue-800 hover:text-blue-800 transition"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;