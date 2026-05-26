import React from "react";
import { FaClock } from "react-icons/fa";

const SellerWaiting = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

      <div className="bg-white p-10 rounded-2xl shadow text-center max-w-md">

        <FaClock className="text-5xl text-blue-800 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800">
          Profile Under Review
        </h2>

        <p className="text-gray-500 mt-3">
          Your seller profile has been submitted successfully.  
          Admin will review and approve your account soon.
        </p>

        <div className="mt-6 text-sm text-gray-400">
          Please wait 24-48 hours for approval
        </div>

      </div>

    </div>
  );
};

export default SellerWaiting;