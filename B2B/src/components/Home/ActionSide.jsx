// // src/Components/ActionSide.jsx

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   LogIn,
//   UserPlus,
//   Shield,
//   ShoppingCart,
//   X,
// } from "lucide-react";

// //  STATIC CATEGORIES (NO API)
// const categoriesList = [
//   "Plastics & Polymers",
//   "Industrial Machinery",
//   "Chemicals",
//   "Food & Agriculture",
//   "Electronics",
//   "Automobile Parts",
//   "Textiles",
//   "General Supplies",
// ];

// const ActionSidebar = ({
//   onWantToBuyClick,
//   isFullScreen = false,
//   onClose,
// }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     productName: "",
//     category: "",
//     subcategory: "",
//     quantity: "",
//     description: "",
//     buyerName: "",
//     buyerEmail: "",
//     buyerPhone: "",
//   });

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // 👉 FAKE SUBMIT (NO API)
//     setTimeout(() => {
//       alert("✅ Requirement submitted successfully!");

//       setIsSubmitting(false);

//       if (isFullScreen && onClose) {
//         onClose();
//       } else {
//         setFormData({
//           productName: "",
//           category: "",
//           subcategory: "",
//           quantity: "",
//           description: "",
//           buyerName: "",
//           buyerEmail: "",
//           buyerPhone: "",
//         });
//       }
//     }, 1000);
//   };

//   // ================= FULL SCREEN =================
//   if (isFullScreen) {
//     return (
//       <div className="fixed inset-0 bg-white z-[10000] overflow-y-auto">

//         {/* HEADER */}
//         <div className="sticky top-0 bg-white border-b px-6 py-5 flex justify-between items-center shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center">
//               <ShoppingCart className="text-white w-6 h-6" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold">Post Buy Requirement</h2>
//               <p className="text-sm text-gray-500">
//                 Get quotes from verified suppliers
//               </p>
//             </div>
//           </div>

//           <button onClick={onClose}>
//             <X className="w-7 h-7 text-gray-600" />
//           </button>
//         </div>

//         {/* FORM */}
//         <div className="max-w-2xl mx-auto px-6 py-10">
//           <form onSubmit={handleSubmit} className="space-y-6">

//             <input
//               name="productName"
//               value={formData.productName}
//               onChange={handleInputChange}
//               placeholder="What do you want to buy?"
//               className="w-full p-4 border rounded-2xl"
//               required
//             />

//             {/* CATEGORY */}
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//               className="w-full p-4 border rounded-2xl"
//               required
//             >
//               <option value="">Select Category</option>
//               {categoriesList.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>

//             <input
//               name="subcategory"
//               value={formData.subcategory}
//               onChange={handleInputChange}
//               placeholder="Subcategory"
//               className="w-full p-4 border rounded-2xl"
//             />

//             <input
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleInputChange}
//               placeholder="Quantity"
//               className="w-full p-4 border rounded-2xl"
//             />

//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               placeholder="Requirement details"
//               rows={4}
//               className="w-full p-4 border rounded-2xl"
//             />

//             {/* CONTACT */}
//             <input
//               name="buyerName"
//               value={formData.buyerName}
//               onChange={handleInputChange}
//               placeholder="Name"
//               className="w-full p-4 border rounded-2xl"
//               required
//             />

//             <input
//               name="buyerEmail"
//               value={formData.buyerEmail}
//               onChange={handleInputChange}
//               placeholder="Email"
//               className="w-full p-4 border rounded-2xl"
//               required
//             />

//             <input
//               name="buyerPhone"
//               value={formData.buyerPhone}
//               onChange={handleInputChange}
//               placeholder="Phone"
//               className="w-full p-4 border rounded-2xl"
//               required
//             />

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-orange-600 text-white py-5 rounded-2xl font-semibold"
//             >
//               {isSubmitting ? "Submitting..." : "Submit Requirement"}
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // ================= SIDEBAR MODE =================
//   return (
//     <div className="p-6 space-y-6">

//       {/* CARD */}
//       <div className="bg-white border rounded-3xl p-6 shadow-sm">

//         {/* HEADER */}
//         <div className="text-center mb-6">
//           <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <Shield />
//           </div>

//           <h3 className="text-xl font-bold">B2B Marketplace</h3>
//           <p className="text-gray-500 text-sm mt-2">
//             Connect buyers & suppliers
//           </p>
//         </div>

//         {/* BUTTONS */}
//         <div className="space-y-3">

//           <Link
//             to="/login"
//             className="w-full bg-blue-600 text-white py-3 rounded-2xl flex justify-center gap-2"
//           >
//             <LogIn size={18} />
//             Login
//           </Link>

//           <Link
//             to="/register"
//             className="w-full border py-3 rounded-2xl flex justify-center gap-2"
//           >
//             <UserPlus size={18} />
//             Register
//           </Link>

//           <button
//             onClick={onWantToBuyClick}
//             className="w-full bg-orange-600 text-white py-3 rounded-2xl flex justify-center gap-2"
//           >
//             <ShoppingCart size={18} />
//             I Want to Buy
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActionSidebar;




// src/Components/ActionSide.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogIn,
  UserPlus,
  Shield,
  ShoppingCart,
  X,
} from "lucide-react";

//  STATIC CATEGORIES (NO API)
const categoriesList = [
  "Plastics & Polymers",
  "Industrial Machinery",
  "Chemicals",
  "Food & Agriculture",
  "Electronics",
  "Automobile Parts",
  "Textiles",
  "General Supplies",
];

const ActionSidebar = ({
  onWantToBuyClick,
  isFullScreen = false,
  onClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    subcategory: "",
    quantity: "",
    description: "",
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 👉 FAKE SUBMIT (NO API)
    setTimeout(() => {
      alert("✅ Requirement submitted successfully!");

      setIsSubmitting(false);

      if (isFullScreen && onClose) {
        onClose();
      } else {
        setFormData({
          productName: "",
          category: "",
          subcategory: "",
          quantity: "",
          description: "",
          buyerName: "",
          buyerEmail: "",
          buyerPhone: "",
        });
      }
    }, 1000);
  };

  // ================= FULL SCREEN =================
  if (isFullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-white z-[10000] overflow-y-auto"
      >

        {/* HEADER */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="sticky top-0 bg-white border-b px-6 py-5 flex justify-between items-center shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Post Buy Requirement</h2>
              <p className="text-sm text-gray-500">
                Get quotes from verified suppliers
              </p>
            </div>
          </div>

          <button onClick={onClose}>
            <X className="w-7 h-7 text-gray-600" />
          </button>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto px-6 py-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="What do you want to buy?"
              className="w-full p-4 border rounded-2xl focus:outline-none focus:border-orange-600 transition"
              required
            />

            {/* CATEGORY */}
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-2xl focus:outline-none focus:border-orange-600 transition"
              required
            >
              <option value="">Select Category</option>
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
              placeholder="Subcategory"
              className="w-full p-4 border rounded-2xl focus:outline-none focus:border-orange-600 transition"
            />

            <input
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              className="w-full p-4 border rounded-2xl focus:outline-none focus:border-orange-600 transition"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Requirement details"
              rows={4}
              className="w-full p-4 border rounded-2xl focus:outline-none focus:border-orange-600 transition"
            />

            {/* CONTACT */}
            <input
              name="buyerName"
              value={formData.buyerName}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-4 border rounded-2xl focus:outline-none focus:border-orange-600 transition"
              required
            />

            <input
              name="buyerEmail"
              value={formData.buyerEmail}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-4 border rounded-2xl focus:outline-none focus:border-orange-600 transition"
              required
            />

            <input
              name="buyerPhone"
              value={formData.buyerPhone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="w-full p-4 border rounded-2xl focus:outline-none focus:border-orange-600 transition"
              required
            />

            {/* SUBMIT */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-blue-800 transition text-white py-5 rounded-2xl font-semibold shadow-md hover:shadow-xl"
            >
              {isSubmitting ? "Submitting..." : "Submit Requirement"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    );
  }

  // ================= SIDEBAR MODE =================
 return (
  <div className="p-6 space-y-6 h-[72vh]">

    {/* CARD */}
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="group relative bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col justify-center"
    >

      {/* TOP LINE */}
      <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

      {/* HEADER */}
      <div className="text-center mb-10">

        <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-500">
          <Shield />
        </div>

        <h3 className="text-xl font-bold">B2B Marketplace</h3>

        <p className="text-gray-500 text-sm mt-2">
          Connect directly with verified manufacturers and buyers across India
        </p>
      </div>

      {/* BUTTONS */}
      <div className="space-y-3">

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/login"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-2xl flex justify-center gap-2 shadow-sm hover:shadow-lg"
          >
            <LogIn size={18} />
            Login 
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/register"
            className="w-full border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition py-3 rounded-2xl flex justify-center gap-2"
          >
            <UserPlus size={18} />
            Register
          </Link>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onWantToBuyClick}
          className="w-full bg-orange-600 hover:bg-blue-800 transition text-white py-3 rounded-2xl flex justify-center gap-2 shadow-sm hover:shadow-lg"
        >
          <ShoppingCart size={18} />
          I Want to Buy
        </motion.button>

      </div>

      {/* BLUR EFFECT */}
      <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-500"></div>

    </motion.div>
  </div>
);
};

export default ActionSidebar;