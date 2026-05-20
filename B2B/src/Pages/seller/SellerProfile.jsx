import React, { useState } from "react";
import { FaUserCircle, FaEdit, FaSave, FaBuilding, FaPhone, FaEnvelope } from "react-icons/fa";

const SellerProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [profile, setProfile] = useState({
    companyName: "Dhruv Enterprises",
    ownerName: "Abhishek",
    email: "dhruv210004@gmail.com",
    phone: "7428180434",
    gst: "27ABCDE1234F1Z5",
    address: "Ballabhgarh, Faridabad, Haryana",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Profile Saved:", profile);
    setIsEdit(false);
    alert("Profile Updated Successfully 🚀");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">


      {/* PROFILE CARD */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-6 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <FaUserCircle className="text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">
                {profile.companyName}
              </h2>
              <p className="text-sm text-blue-100">
                Seller Account
              </p>
            </div>
          </div>

          <button
            onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
            className="bg-white text-blue-900 px-5 py-2 rounded-xl font-semibold flex items-center gap-2"
          >
            {isEdit ? <FaSave /> : <FaEdit />}
            {isEdit ? "Save" : "Edit"}
          </button>

        </div>

        {/* FORM */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* COMPANY NAME */}
          <div>
            <label className="font-semibold text-gray-700">Company Name</label>
            <div className="relative mt-2">
              <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="companyName"
                value={profile.companyName}
                onChange={handleChange}
                disabled={!isEdit}
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
              />
            </div>
          </div>

          {/* OWNER NAME */}
          <div>
            <label className="font-semibold text-gray-700">Owner Name</label>
            <div className="relative mt-2">
              <FaUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="ownerName"
                value={profile.ownerName}
                onChange={handleChange}
                disabled={!isEdit}
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <div className="relative mt-2">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEdit}
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
              />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="font-semibold text-gray-700">Phone</label>
            <div className="relative mt-2">
              <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEdit}
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
              />
            </div>
          </div>

          {/* GST */}
          <div>
            <label className="font-semibold text-gray-700">GST Number</label>
            <input
              name="gst"
              value={profile.gst}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-full h-12 mt-2 px-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
            />
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="font-semibold text-gray-700">Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEdit}
              rows="3"
              className="w-full mt-2 p-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellerProfile;