// import React, { useState } from "react";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

// const MyProducts = () => {
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: "Steel Pipes",
//       category: "Industrial",
//       price: 1200,
//       moq: 10,
//       status: "Pending",
//     },
//     {
//       id: 2,
//       name: "Copper Wire",
//       category: "Electronics",
//       price: 800,
//       moq: 5,
//       status: "Approved",
//     },
//     {
//       id: 3,
//       name: "Chemical Powder",
//       category: "Chemicals",
//       price: 500,
//       moq: 20,
//       status: "Rejected",
//     },
//   ]);

//   // DELETE PRODUCT
//   const handleDelete = (id) => {
//     const updated = products.filter((item) => item.id !== id);
//     setProducts(updated);
//   };

//   // STATUS COLOR
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Approved":
//         return "bg-green-100 text-green-700";
//       case "Pending":
//         return "bg-yellow-100 text-yellow-700";
//       case "Rejected":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* TABLE CARD */}
//       <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">

//         {/* TABLE HEADER */}
//         <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4">
//           <h2 className="text-xl font-semibold">
//             My Products
//           </h2>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">

//             <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//               <tr>
//                 <th className="p-4">Product</th>
//                 <th className="p-4">Category</th>
//                 <th className="p-4">Price</th>
//                 <th className="p-4">MOQ</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.map((item) => (
//                 <tr
//                   key={item.id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >

//                   {/* PRODUCT NAME */}
//                   <td className="p-4 font-medium text-gray-800">
//                     {item.name}
//                   </td>

//                   {/* CATEGORY */}
//                   <td className="p-4 text-gray-600">
//                     {item.category}
//                   </td>

//                   {/* PRICE */}
//                   <td className="p-4 text-gray-600">
//                     ₹{item.price}
//                   </td>

//                   {/* MOQ */}
//                   <td className="p-4 text-gray-600">
//                     {item.moq}
//                   </td>

//                   {/* STATUS */}
//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
//                         item.status
//                       )}`}
//                     >
//                       {item.status}
//                     </span>
//                   </td>

//                   {/* ACTIONS */}
//                   <td className="p-4">
//                     <div className="flex justify-center gap-3">

//                       <button className="text-blue-600 hover:text-blue-800">
//                         <FaEye />
//                       </button>

//                       <button className="text-green-600 hover:text-green-800">
//                         <FaEdit />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(item.id)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <FaTrash />
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
// };

// export default MyProducts;



import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const MyProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Steel Pipes",
      category: "Industrial",
      price: 1200,
      moq: 10,
      status: "Pending",
    },
    {
      id: 2,
      name: "Copper Wire",
      category: "Electronics",
      price: 800,
      moq: 5,
      status: "Approved",
    },
     {
      id: 1,
      name: "Steel Pipes",
      category: "Industrial",
      price: 1200,
      moq: 10,
      status: "Pending",
    },
    {
      id: 2,
      name: "Copper Wire",
      category: "Electronics",
      price: 800,
      moq: 5,
      status: "Approved",
    },
     {
      id: 1,
      name: "Steel Pipes",
      category: "Industrial",
      price: 1200,
      moq: 10,
      status: "Pending",
    },
    {
      id: 2,
      name: "Copper Wire",
      category: "Electronics",
      price: 800,
      moq: 5,
      status: "Approved",
    },
  ]);

  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // OPEN EDIT MODAL
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE UPDATED PRODUCT
  const handleSave = () => {
    const updated = products.map((item) =>
      item.id === selectedProduct.id ? selectedProduct : item
    );

    setProducts(updated);
    setIsModalOpen(false);
  };

  // DELETE
  const handleDelete = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  // STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">

        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4">
          <h2 className="text-xl font-semibold">My Products</h2>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">MOQ</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">

                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">₹{item.price}</td>
                <td className="p-4">{item.moq}</td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">

                    <button className="text-blue-600">
                      <FaEye />
                    </button>

                    <button
                      onClick={() => handleEdit(item)}
                      className="text-green-600"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600"
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

      {/* ================= MODAL ================= */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[500px] rounded-2xl shadow-xl p-6">

            <h2 className="text-xl font-bold mb-4">
              Edit Product
            </h2>

            <div className="space-y-3">

              <input
                name="name"
                value={selectedProduct.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                placeholder="Product Name"
              />

              <input
                name="category"
                value={selectedProduct.category}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                placeholder="Category"
              />

              <input
                name="price"
                value={selectedProduct.price}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                placeholder="Price"
              />

              <input
                name="moq"
                value={selectedProduct.moq}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                placeholder="MOQ"
              />

            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-800 text-white rounded-xl"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default MyProducts;