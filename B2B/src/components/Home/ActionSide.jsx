

// src/components/Home/ActionSide.jsx

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, UserPlus, Shield, ShoppingCart } from "lucide-react";
import PostRequirementModal from "../common/PostRequirementModal";

const ActionSidebar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* PORTAL — motion.div ke bahar body mein render hoga */}
      {showModal && createPortal(
        <PostRequirementModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />,
        document.body
      )}

      <div className="p-6 space-y-6 h-[72vh]">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          className="group relative bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col justify-center"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-500">
              <Shield />
            </div>
            <h3 className="text-xl font-bold">B2B Marketplace</h3>
            <p className="text-gray-500 text-sm mt-2">
              Connect directly with verified manufacturers and buyers across India
            </p>
          </div>

          <div className="space-y-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/login"
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-2xl flex justify-center gap-2 shadow-sm hover:shadow-lg"
              >
                <LogIn size={18} />
                  Start Selling
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
              onClick={() => setShowModal(true)}
              className="w-full bg-orange-600 hover:bg-blue-800 transition text-white py-3 rounded-2xl flex justify-center gap-2 shadow-sm hover:shadow-lg"
            >
              <ShoppingCart size={18} />
              I Want to Buy
            </motion.button>
          </div>

          <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
        </motion.div>
      </div>
    </>
  );
};

export default ActionSidebar;