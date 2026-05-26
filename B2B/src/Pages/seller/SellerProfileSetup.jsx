import React, { useState } from "react";
import { FaUserCircle, FaBuilding, FaPhone, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { saveSellerProfile } from "../../api/seller";
const SellerProfileSetup = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    phone: "",
    gst: "",
    address: "",
  });

const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const res = await saveSellerProfile(profile, token);

    console.log("API Response:", res.data);

    const updatedUser = res.data.user;

    // 🔥 update localStorage with backend data
    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile Submitted for Approval 🚀");

    // 👉 redirect to waiting page
    navigate("/seller/waiting-approval");

  } catch (error) {
    console.log("Profile Submit Error:", error.response?.data || error.message);

    alert(
      error.response?.data?.message ||
      "Profile submission failed"
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6 text-blue-900">
          Complete Seller Profile
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input name="companyName" placeholder="Company Name" onChange={handleChange} className="input" required />
          <input name="ownerName" placeholder="Owner Name" onChange={handleChange} className="input" required />

          <input name="email" placeholder="Email" onChange={handleChange} className="input" required />
          <input name="phone" placeholder="Phone" onChange={handleChange} className="input" required />

          <input name="gst" placeholder="GST Number" onChange={handleChange} className="input" />

          <textarea name="address" placeholder="Address" onChange={handleChange} className="input md:col-span-2" />

          <button
            type="submit"
            className="md:col-span-2 bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-xl font-semibold"
          >
            Submit for Approval
          </button>

        </form>
      </div>
    </div>
  );
};

export default SellerProfileSetup;