// // import React, { useState } from "react";
// // import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

// // const MyProducts = () => {
// //   const [products, setProducts] = useState([
// //     {
// //       id: 1,
// //       name: "Steel Pipes",
// //       category: "Industrial",
// //       price: 1200,
// //       moq: 10,
// //       status: "Pending",
// //     },
// //     {
// //       id: 2,
// //       name: "Copper Wire",
// //       category: "Electronics",
// //       price: 800,
// //       moq: 5,
// //       status: "Approved",
// //     },
// //     {
// //       id: 3,
// //       name: "Chemical Powder",
// //       category: "Chemicals",
// //       price: 500,
// //       moq: 20,
// //       status: "Rejected",
// //     },
// //   ]);

// //   // DELETE PRODUCT
// //   const handleDelete = (id) => {
// //     const updated = products.filter((item) => item.id !== id);
// //     setProducts(updated);
// //   };

// //   // STATUS COLOR
// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "Approved":
// //         return "bg-green-100 text-green-700";
// //       case "Pending":
// //         return "bg-yellow-100 text-yellow-700";
// //       case "Rejected":
// //         return "bg-red-100 text-red-700";
// //       default:
// //         return "bg-gray-100 text-gray-700";
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">

// //       {/* TABLE CARD */}
// //       <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">

// //         {/* TABLE HEADER */}
// //         <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4">
// //           <h2 className="text-xl font-semibold">
// //             My Products
// //           </h2>
// //         </div>

// //         {/* TABLE */}
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm text-left">

// //             <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
// //               <tr>
// //                 <th className="p-4">Product</th>
// //                 <th className="p-4">Category</th>
// //                 <th className="p-4">Price</th>
// //                 <th className="p-4">MOQ</th>
// //                 <th className="p-4">Status</th>
// //                 <th className="p-4 text-center">Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {products.map((item) => (
// //                 <tr
// //                   key={item.id}
// //                   className="border-b hover:bg-gray-50 transition"
// //                 >

// //                   {/* PRODUCT NAME */}
// //                   <td className="p-4 font-medium text-gray-800">
// //                     {item.name}
// //                   </td>

// //                   {/* CATEGORY */}
// //                   <td className="p-4 text-gray-600">
// //                     {item.category}
// //                   </td>

// //                   {/* PRICE */}
// //                   <td className="p-4 text-gray-600">
// //                     ₹{item.price}
// //                   </td>

// //                   {/* MOQ */}
// //                   <td className="p-4 text-gray-600">
// //                     {item.moq}
// //                   </td>

// //                   {/* STATUS */}
// //                   <td className="p-4">
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
// //                         item.status
// //                       )}`}
// //                     >
// //                       {item.status}
// //                     </span>
// //                   </td>

// //                   {/* ACTIONS */}
// //                   <td className="p-4">
// //                     <div className="flex justify-center gap-3">

// //                       <button className="text-blue-600 hover:text-blue-800">
// //                         <FaEye />
// //                       </button>

// //                       <button className="text-green-600 hover:text-green-800">
// //                         <FaEdit />
// //                       </button>

// //                       <button
// //                         onClick={() => handleDelete(item.id)}
// //                         className="text-red-600 hover:text-red-800"
// //                       >
// //                         <FaTrash />
// //                       </button>

// //                     </div>
// //                   </td>

// //                 </tr>
// //               ))}
// //             </tbody>

// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyProducts;



// // src/pages/seller/MyProducts.jsx

// import React, { useState, useEffect } from "react";
// import { FaTrash, FaEye, FaBoxOpen } from "react-icons/fa";
// import { getMyProducts, deleteProduct } from "../../api/productApi";

// const MyProducts = () => {

//   // ─────────────────────────────────────────
//   // STATES
//   // ─────────────────────────────────────────
//   const [products, setProducts]     = useState([]);
//   const [loading, setLoading]       = useState(true);
//   const [error, setError]           = useState("");
//   const [deletingId, setDeletingId] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // ─────────────────────────────────────────
//   // FETCH MY PRODUCTS
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const data = await getMyProducts();
//         if (data.success) {
//           setProducts(data.products);
//         } else {
//           setError(data.message || "Failed to fetch products");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Server error. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // ─────────────────────────────────────────
//   // DELETE PRODUCT
//   // ─────────────────────────────────────────
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       setDeletingId(id);
//       const data = await deleteProduct(id);
//       if (data.success) {
//         setProducts((prev) => prev.filter((p) => p._id !== id));
//       } else {
//         alert(data.message || "Delete failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error. Please try again.");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // ─────────────────────────────────────────
//   // STATUS COLOR
//   // ─────────────────────────────────────────
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "approved": return "bg-green-100 text-green-700";
//       case "pending":  return "bg-yellow-100 text-yellow-700";
//       case "rejected": return "bg-red-100 text-red-700";
//       default:         return "bg-gray-100 text-gray-700";
//     }
//   };

//   // ─────────────────────────────────────────
//   // LOADING
//   // ─────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
//           <p className="text-gray-500 text-sm">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* ERROR */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-2xl text-sm mb-4">
//           {error}
//         </div>
//       )}

//       {/* TABLE CARD */}
//       <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">

//         {/* HEADER */}
//         <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex items-center justify-between">
//           <h2 className="text-xl font-semibold">My Products</h2>
//           <span className="text-blue-200 text-sm">
//             {products.length} products
//           </span>
//         </div>

//         {/* EMPTY STATE */}
//         {products.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//             <FaBoxOpen className="text-6xl mb-4 text-gray-300" />
//             <p className="text-lg font-medium">No products yet</p>
//             <p className="text-sm mt-1">Add your first product to get started</p>
//           </div>
//         ) : (

//           /* TABLE */
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left">

//               <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
//                 <tr>
//                   <th className="p-4">Image</th>
//                   <th className="p-4">Product</th>
//                   <th className="p-4">Category</th>
//                   <th className="p-4">Price</th>
//                   <th className="p-4">MOQ</th>
//                   <th className="p-4">Status</th>
//                   <th className="p-4 text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {products.map((item) => (
//                   <tr
//                     key={item._id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >

//                     {/* IMAGE */}
//                     <td className="p-4">
//                       {item.images?.[0]?.url ? (
//                         <img
//                           src={item.images[0].url}
//                           alt={item.title}
//                           className="h-12 w-12 object-cover rounded-xl border"
//                         />
//                       ) : (
//                         <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center">
//                           <FaBoxOpen className="text-gray-400" />
//                         </div>
//                       )}
//                     </td>

//                     {/* TITLE */}
//                     <td className="p-4">
//                       <p className="font-medium text-gray-800">{item.title}</p>
//                       {item.brand && (
//                         <p className="text-xs text-gray-400">{item.brand}</p>
//                       )}
//                     </td>

//                     {/* CATEGORY */}
//                     <td className="p-4 text-gray-600">
//                       <p>{item.category?.name || "—"}</p>
//                       {item.subcategory?.name && (
//                         <p className="text-xs text-gray-400">
//                           {item.subcategory.name}
//                         </p>
//                       )}
//                     </td>

//                     {/* PRICE */}
//                     <td className="p-4 font-medium text-gray-800">
//                       ₹{item.price?.toLocaleString()}
//                     </td>

//                     {/* MOQ */}
//                     <td className="p-4 text-gray-600">
//                       {item.moq} {item.unit || ""}
//                     </td>

//                     {/* STATUS */}
//                     <td className="p-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(item.status)}`}>
//                         {item.status}
//                       </span>
//                       {/* REJECTION REASON */}
//                       {item.status === "rejected" && item.rejectionReason && (
//                         <p className="text-xs text-red-400 mt-1 max-w-[150px]">
//                           {item.rejectionReason}
//                         </p>
//                       )}
//                     </td>

//                     {/* ACTIONS */}
//                     <td className="p-4">
//                       <div className="flex justify-center gap-3">

//                         {/* VIEW */}
//                         <button
//                           onClick={() => setSelectedProduct(item)}
//                           className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
//                           title="View"
//                         >
//                           <FaEye />
//                         </button>

//                         {/* DELETE */}
//                         <button
//                           onClick={() => handleDelete(item._id)}
//                           disabled={deletingId === item._id}
//                           className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50"
//                           title="Delete"
//                         >
//                           <FaTrash />
//                         </button>

//                       </div>
//                     </td>

//                   </tr>
//                 ))}
//               </tbody>

//             </table>
//           </div>
//         )}
//       </div>

//       {/* ─────────────────────────────────────────
//           VIEW MODAL
//       ───────────────────────────────────────── */}
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

//             {/* MODAL HEADER */}
//             <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Product Details</h2>
//               <button
//                 onClick={() => setSelectedProduct(null)}
//                 className="text-white hover:text-blue-200 text-xl font-bold"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

//               {/* IMAGES */}
//               {selectedProduct.images?.length > 0 && (
//                 <div className="flex gap-3 flex-wrap">
//                   {selectedProduct.images.map((img, i) => (
//                     <img
//                       key={i}
//                       src={img.url}
//                       alt={`img-${i}`}
//                       className="h-20 w-20 object-cover rounded-xl border"
//                     />
//                   ))}
//                 </div>
//               )}

//               {/* DETAILS GRID */}
//               <div className="grid grid-cols-2 gap-3 text-sm">

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Product Name</p>
//                   <p className="font-medium">{selectedProduct.title}</p>
//                 </div>

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Status</p>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(selectedProduct.status)}`}>
//                     {selectedProduct.status}
//                   </span>
//                 </div>

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Category</p>
//                   <p className="font-medium">{selectedProduct.category?.name || "—"}</p>
//                 </div>

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Sub Category</p>
//                   <p className="font-medium">{selectedProduct.subcategory?.name || "—"}</p>
//                 </div>

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Price</p>
//                   <p className="font-medium">₹{selectedProduct.price?.toLocaleString()}</p>
//                 </div>

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">MOQ</p>
//                   <p className="font-medium">{selectedProduct.moq} {selectedProduct.unit}</p>
//                 </div>

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Brand</p>
//                   <p className="font-medium">{selectedProduct.brand || "—"}</p>
//                 </div>

//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Stock</p>
//                   <p className="font-medium">{selectedProduct.stock ?? "—"}</p>
//                 </div>

//               </div>

//               {/* DESCRIPTION */}
//               {selectedProduct.description && (
//                 <div>
//                   <p className="text-gray-400 text-xs mb-1">Description</p>
//                   <p className="text-sm text-gray-700 leading-relaxed">
//                     {selectedProduct.description}
//                   </p>
//                 </div>
//               )}

//               {/* REJECTION REASON */}
//               {selectedProduct.status === "rejected" && selectedProduct.rejectionReason && (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-3">
//                   <p className="text-xs text-red-400 mb-1">Rejection Reason</p>
//                   <p className="text-sm text-red-600">{selectedProduct.rejectionReason}</p>
//                 </div>
//               )}

//             </div>

//             {/* MODAL FOOTER */}
//             <div className="px-6 py-4 border-t flex justify-end">
//               <button
//                 onClick={() => setSelectedProduct(null)}
//                 className="px-5 py-2 border rounded-xl text-sm hover:border-blue-800 hover:text-blue-800 transition"
//               >
//                 Close
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default MyProducts;




// src/pages/seller/MyProducts.jsx

import React, { useState, useEffect } from "react";
import { FaTrash, FaEye, FaBoxOpen, FaEdit } from "react-icons/fa";
import { getMyProducts, deleteProduct } from "../../api/productApi";
import AlertPopup from "../../components/common/AlertPopup";
import EditProductModal from "../../components/seller/EditProductModal";

const ITEMS_PER_PAGE = 10;

const MyProducts = () => {

  // ─────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────
  const [products, setProducts]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState("");
  const [deletingId, setDeletingId]       = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct]     = useState(null);

  // PAGINATION
  const [currentPage, setCurrentPage]     = useState(1);

  // ALERT POPUP
  const [alert, setAlert] = useState({
    show:    false,
    type:    "error",
    message: "",
    mode:    "info",      // "info" | "confirm"
    confirmId: null,      // delete ke liye id store
  });

  // ─────────────────────────────────────────
  // FETCH MY PRODUCTS
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getMyProducts();
        if (data.success) {
          setProducts(data.products);
        } else {
          setError(data.message || "Failed to fetch products");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ─────────────────────────────────────────
  // PAGINATION LOGIC
  // ─────────────────────────────────────────
  const totalPages   = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex   = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ─────────────────────────────────────────
  // DELETE — Step 1: show warning confirm
  // ─────────────────────────────────────────
  const handleDeleteClick = (id) => {
    setAlert({
      show:      true,
      type:      "warning",
      message:   "Are you sure you want to delete this product? This action cannot be undone.",
      mode:      "confirm",
      confirmId: id,
    });
  };

  // DELETE — Step 2: confirmed
  const handleDeleteConfirm = async () => {
    const id = alert.confirmId;
    setAlert({ show: false, type: "error", message: "", mode: "info", confirmId: null });

    try {
      setDeletingId(id);
      const data = await deleteProduct(id);
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        // Page fix karo agar last page empty ho jaaye
        const newTotal = products.length - 1;
        const newPages = Math.ceil(newTotal / ITEMS_PER_PAGE);
        if (currentPage > newPages && newPages > 0) setCurrentPage(newPages);
      } else {
        setAlert({ show: true, type: "error", message: data.message || "Delete failed", mode: "info", confirmId: null });
      }
    } catch (err) {
      console.error(err);
      setAlert({ show: true, type: "error", message: "Server error. Please try again.", mode: "info", confirmId: null });
    } finally {
      setDeletingId(null);
    }
  };

  const closeAlert = () =>
    setAlert({ show: false, type: "error", message: "", mode: "info", confirmId: null });

  // ─────────────────────────────────────────
  // EDIT — product updated callback
  // ─────────────────────────────────────────
  const handleProductUpdated = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  // ─────────────────────────────────────────
  // STATUS COLOR
  // ─────────────────────────────────────────
  const getStatusStyle = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-700";
      case "pending":  return "bg-yellow-100 text-yellow-700";
      case "rejected": return "bg-red-100 text-red-700";
      default:         return "bg-gray-100 text-gray-700";
    }
  };

  // ─────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading products...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-2xl text-sm mb-4">
          {error}
        </div>
      )}

      {/* TABLE CARD */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">My Products</h2>
          <span className="text-blue-200 text-sm">{products.length} products</span>
        </div>

        {/* EMPTY STATE */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FaBoxOpen className="text-6xl mb-4 text-gray-300" />
            <p className="text-lg font-medium">No products yet</p>
            <p className="text-sm mt-1">Add your first product to get started</p>
          </div>
        ) : (

          <>
            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">

                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="p-4">Image</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">MOQ</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50 transition">

                      {/* IMAGE */}
                      <td className="p-4">
                        {item.images?.[0]?.url ? (
                          <img
                            src={item.images[0].url}
                            alt={item.title}
                            className="h-12 w-12 object-cover rounded-xl border"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <FaBoxOpen className="text-gray-400" />
                          </div>
                        )}
                      </td>

                      {/* TITLE */}
                      <td className="p-4">
                        <p className="font-medium text-gray-800">{item.title}</p>
                        {item.brand && <p className="text-xs text-gray-400">{item.brand}</p>}
                      </td>

                      {/* CATEGORY */}
                      <td className="p-4 text-gray-600">
                        <p>{item.category?.name || "—"}</p>
                        {item.subcategory?.name && (
                          <p className="text-xs text-gray-400">{item.subcategory.name}</p>
                        )}
                      </td>

                      {/* PRICE */}
                      <td className="p-4 font-medium text-gray-800">
                        ₹{item.price?.toLocaleString()}
                      </td>

                      {/* MOQ */}
                      <td className="p-4 text-gray-600">
                        {item.moq} {item.unit || ""}
                      </td>

                      {/* STATUS */}
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                        {item.status === "rejected" && item.rejectionReason && (
                          <p className="text-xs text-red-400 mt-1 max-w-[150px]">
                            {item.rejectionReason}
                          </p>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">
                        <div className="flex justify-center gap-3">

                          {/* VIEW */}
                          <button
                            onClick={() => setSelectedProduct(item)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            title="View"
                          >
                            <FaEye />
                          </button>

                          {/* EDIT — NEW */}
                          <button
                            onClick={() => setEditProduct(item)}
                            className="p-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDeleteClick(item._id)}
                            disabled={deletingId === item._id}
                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* ── PAGINATION ── */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t flex items-center justify-between text-sm">
                <p className="text-gray-500">
                  Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of {products.length} products
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-800 hover:text-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-xl border text-sm font-medium transition
                        ${currentPage === page
                          ? "bg-blue-800 text-white border-blue-800"
                          : "border-gray-200 text-gray-600 hover:border-blue-800 hover:text-blue-800"
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-800 hover:text-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── VIEW MODAL ── */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Product Details</h2>
              <button onClick={() => setSelectedProduct(null)} className="text-white hover:text-blue-200 text-xl font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

              {selectedProduct.images?.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {selectedProduct.images.map((img, i) => (
                    <img key={i} src={img.url} alt={`img-${i}`} className="h-20 w-20 object-cover rounded-xl border" />
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Product Name</p>
                  <p className="font-medium">{selectedProduct.title}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(selectedProduct.status)}`}>
                    {selectedProduct.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Category</p>
                  <p className="font-medium">{selectedProduct.category?.name || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Sub Category</p>
                  <p className="font-medium">{selectedProduct.subcategory?.name || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Price</p>
                  <p className="font-medium">₹{selectedProduct.price?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">MOQ</p>
                  <p className="font-medium">{selectedProduct.moq} {selectedProduct.unit}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Brand</p>
                  <p className="font-medium">{selectedProduct.brand || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Stock</p>
                  <p className="font-medium">{selectedProduct.stock ?? "—"}</p>
                </div>
              </div>

              {selectedProduct.description && (
                <div>
                  <p className="text-gray-400 text-xs mb-1">Description</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedProduct.description}</p>
                </div>
              )}

              {selectedProduct.status === "rejected" && selectedProduct.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-xs text-red-400 mb-1">Rejection Reason</p>
                  <p className="text-sm text-red-600">{selectedProduct.rejectionReason}</p>
                </div>
              )}

            </div>

            <div className="px-6 py-4 border-t flex justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-2 border rounded-xl text-sm hover:border-blue-800 hover:text-blue-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL — NEW ── */}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdated={handleProductUpdated}
        />
      )}

      {/* ── ALERT POPUP ── */}
      {alert.show && (
        <AlertPopup
          type={alert.type}
          message={alert.message}
          onClose={alert.mode === "confirm" ? undefined : closeAlert}
          autoClose={alert.mode !== "confirm"}
        >
          {/* CONFIRM MODE — extra buttons */}
          {alert.mode === "confirm" && (
            <div className="px-7 pb-6 flex gap-3">
              <button
                onClick={closeAlert}
                className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-red-500 hover:bg-red-600 text-white transition-all"
              >
                Yes, Delete
              </button>
            </div>
          )}
        </AlertPopup>
      )}

    </div>
  );
};

export default MyProducts;