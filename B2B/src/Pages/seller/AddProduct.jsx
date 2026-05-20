
// import React, { useState } from "react";

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

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
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
//         {/* HEADER */}
     
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
//                 <label className="font-semibold block mb-2">Product Name</label>

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
//                 <label className="font-semibold block mb-2">Category</label>

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
//                 <label className="font-semibold block mb-2">Price</label>

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
//               <label className="font-semibold block mb-2">Description</label>

//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 placeholder="Write product details..."
//                 className="w-full h-28 p-4 border rounded-3xl focus:border-orange-500 outline-none resize-none"
//               />
//             </div>

//             {/* IMAGE UPLOAD (MOVED TO BOTTOM) */}
//             <div>
//               <label className="block font-semibold mb-3">
//                 Upload Product Images
//               </label>

//               <label className="border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-orange-50 transition">
//                 <FaCloudUploadAlt className="text-4xl text-orange-500 mb-3" />

//                 <p className="font-semibold">Click to Upload Images</p>
//                 <p className="text-sm text-gray-500">JPG, PNG (Max 5 images)</p>

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



import React, { useState, useEffect } from "react";

import {
  FaCloudUploadAlt,
  FaBoxOpen,
  FaMoneyBillWave,
  FaLayerGroup,
} from "react-icons/fa";

const AddProduct = () => {
  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    moq: "",
    description: "",
  });

  // CLEANUP OBJECT URLS (memory leak fix)
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [images]);

  // IMAGE HANDLER (max 5 images)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);

    const urls = files.map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Product Data:", form);
    console.log("Images:", images);

    alert("Product Submitted Successfully 🚀");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">

        {/* FORM CARD */}
        <div className="bg-white rounded-[30px] shadow-md border border-gray-100 overflow-hidden">

          {/* TOP HEADER */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-6">
            <h2 className="text-2xl font-bold">Add New Product</h2>

            <p className="text-blue-100 text-sm">
              Add accurate details for better buyer reach
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* INPUT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* NAME */}
              <div>
                <label className="font-semibold block mb-2">
                  Product Name
                </label>

                <div className="relative">
                  <FaBoxOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    name="name"
                    value={form.name}
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
                  Category
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
                    <option>Industrial</option>
                    <option>Electronics</option>
                    <option>Chemicals</option>
                    <option>Machinery</option>
                  </select>
                </div>
              </div>

              {/* PRICE */}
              <div>
                <label className="font-semibold block mb-2">
                  Price
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
                  placeholder="MOQ"
                  className="w-full h-14 px-4 border rounded-2xl focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="font-semibold block mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write product details..."
                className="w-full h-28 p-4 border rounded-3xl focus:border-orange-500 outline-none resize-none"
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block font-semibold mb-3">
                Upload Product Images
              </label>

              <label className="border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-orange-50 transition">
                <FaCloudUploadAlt className="text-4xl text-orange-500 mb-3" />

                <p className="font-semibold">Click to Upload Images</p>

                <p className="text-sm text-gray-500">
                  JPG, PNG (Max 5 images) — Selected: {images.length}/5
                </p>

                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* PREVIEW */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="preview"
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
                className="bg-[#F54900] hover:bg-[#d63f00] text-white px-8 py-4 rounded-2xl font-semibold shadow-md"
              >
                Submit Product
              </button>

              <button
                type="button"
                className="border px-8 py-4 rounded-2xl font-semibold hover:border-blue-800 hover:text-blue-800"
              >
                Save Draft
              </button>

            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;