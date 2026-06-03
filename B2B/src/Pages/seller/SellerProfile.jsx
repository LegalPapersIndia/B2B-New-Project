// import React, { useState } from "react";
// import { FaUserCircle, FaEdit, FaSave, FaBuilding, FaPhone, FaEnvelope } from "react-icons/fa";

// const SellerProfile = () => {
//   const [isEdit, setIsEdit] = useState(false);

//   const [profile, setProfile] = useState({
//     companyName: "Dhruv Enterprises",
//     ownerName: "Abhishek",
//     email: "dhruv210004@gmail.com",
//     phone: "7428180434",
//     gst: "27ABCDE1234F1Z5",
//     address: "Ballabhgarh, Faridabad, Haryana",
//   });

//   const handleChange = (e) => {
//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = () => {
//     console.log("Profile Saved:", profile);
//     setIsEdit(false);
//     alert("Profile Updated Successfully 🚀");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">


//       {/* PROFILE CARD */}
//       <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

//         {/* TOP HEADER */}
//         <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-6 flex justify-between items-center">

//           <div className="flex items-center gap-3">
//             <FaUserCircle className="text-3xl" />
//             <div>
//               <h2 className="text-xl font-semibold">
//                 {profile.companyName}
//               </h2>
//               <p className="text-sm text-blue-100">
//                 Seller Account
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
//             className="bg-white text-blue-900 px-5 py-2 rounded-xl font-semibold flex items-center gap-2"
//           >
//             {isEdit ? <FaSave /> : <FaEdit />}
//             {isEdit ? "Save" : "Edit"}
//           </button>

//         </div>

//         {/* FORM */}
//         <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* COMPANY NAME */}
//           <div>
//             <label className="font-semibold text-gray-700">Company Name</label>
//             <div className="relative mt-2">
//               <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 name="companyName"
//                 value={profile.companyName}
//                 onChange={handleChange}
//                 
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
//               />
//             </div>
//           </div>

//           {/* OWNER NAME */}
//           <div>
//             <label className="font-semibold text-gray-700">Owner Name</label>
//             <div className="relative mt-2">
//               <FaUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 name="ownerName"
//                 value={profile.ownerName}
//                 onChange={handleChange}
//                 
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
//               />
//             </div>
//           </div>

//           {/* EMAIL */}
//           <div>
//             <label className="font-semibold text-gray-700">Email</label>
//             <div className="relative mt-2">
//               <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 name="email"
//                 value={profile.email}
//                 onChange={handleChange}
//                 
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
//               />
//             </div>
//           </div>

//           {/* PHONE */}
//           <div>
//             <label className="font-semibold text-gray-700">Phone</label>
//             <div className="relative mt-2">
//               <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 name="phone"
//                 value={profile.phone}
//                 onChange={handleChange}
//                 
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
//               />
//             </div>
//           </div>

//           {/* GST */}
//           <div>
//             <label className="font-semibold text-gray-700">GST Number</label>
//             <input
//               name="gst"
//               value={profile.gst}
//               onChange={handleChange}
//               
//               className="w-full h-12 mt-2 px-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
//             />
//           </div>

//           {/* ADDRESS */}
//           <div className="md:col-span-2">
//             <label className="font-semibold text-gray-700">Address</label>
//             <textarea
//               name="address"
//               value={profile.address}
//               onChange={handleChange}
//               
//               rows="3"
//               className="w-full mt-2 p-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
//             />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerProfile;




// // src/Pages/seller/SellerProfile.jsx

// import React, { useState, useEffect, useRef } from "react";
// import {
//   FaUserCircle, FaEdit, FaSave, FaBuilding,
//   FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt,
//   FaCamera, FaCrown, FaFileAlt, FaUsers,
//   FaChartLine, FaCalendarAlt,
// } from "react-icons/fa";
// import { getMyProfile, updateProfile } from "../../api/sellerProfileApi";
// import { useLocation } from "react-router-dom";
// import AlertPopup from "../../components/common/AlertPopup";

// const SellerProfile = () => {

//   const [isEdit, setIsEdit]             = useState(false);
//   const [loading, setLoading]           = useState(true);
//   const [saving, setSaving]             = useState(false);
//   const [alert, setAlert] = useState(null);
//   const [imageFile, setImageFile]       = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const imageRef                        = useRef(null);

//   const [profile, setProfile] = useState({
//     name:               "",
//     email:              "",
//     phone:              "",
//     companyName:        "",
//     companyType:        "",
//     yearEstablished:    "",
//     employees:          "",
//     annualTurnover:     "",
//     companyWebsite:     "",
//     companyDescription: "",
//     gstNumber:          "",
//     panNumber:          "",
//     regNumber:          "",
//     city:               "",
//     state:              "",
//     pincode:            "",
//     address:            "",
//     profileImage:       { url: "" },
//     subscriptionActive: false,
//     subscriptionPlan:   null,
//     subscriptionExpire: null,
//   });

//   const location = useLocation();

// useEffect(() => {
//   if (location.state?.message) {
//     setAlert({ type: "warning", message: location.state.message });  // ← YAHAN LAGAO
//   }
// }, []);

//   // ─────────────────────────────────────────
//   // FETCH PROFILE
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const data = await getMyProfile();
//         if (data.success) setProfile(data.seller);
//       } catch (err) {
//   console.error(err);
//   setAlert({ type: "error", message: "Failed to load profile" });
// }finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // ─────────────────────────────────────────
//   // HANDLE CHANGE
//   // ─────────────────────────────────────────
//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   // ─────────────────────────────────────────
//   // IMAGE CHANGE
//   // ─────────────────────────────────────────
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   // Yeh function SellerProfile ke andar add karo (handleSave ke upar)
// const isProfileComplete = (p) => {
//   return (
//     p.companyName &&
//     p.companyType &&
//     p.phone &&
//     p.city &&
//     p.state &&
//     p.gstNumber &&
//     p.panNumber
//   );
// };

//   // ─────────────────────────────────────────
//   // SAVE PROFILE
//   // ─────────────────────────────────────────
//   const handleSave = async () => {
//     try {
//       setSaving(true);
//       setAlert(null);
//       const formData = new FormData();
//       formData.append("name",               profile.name);
//       formData.append("phone",              profile.phone);
//       formData.append("companyName",        profile.companyName);
//       formData.append("companyType",        profile.companyType);
//       formData.append("yearEstablished",    profile.yearEstablished);
//       formData.append("employees",          profile.employees);
//       formData.append("annualTurnover",     profile.annualTurnover);
//       formData.append("companyWebsite",     profile.companyWebsite);
//       formData.append("companyDescription", profile.companyDescription);
//       formData.append("gstNumber",          profile.gstNumber);
//       formData.append("panNumber",          profile.panNumber);
//       formData.append("regNumber",          profile.regNumber);
//       formData.append("city",               profile.city);
//       formData.append("state",              profile.state);
//       formData.append("pincode",            profile.pincode);
//       formData.append("address",            profile.address);

//       if (imageFile) formData.append("profileImage", imageFile);

//       const data = await updateProfile(formData);

//       if (data.success) {
//         setProfile(data.seller);
//        setAlert({ type: "success", message: "Profile updated successfully!" });
//         setIsEdit(false);
//         setImageFile(null);

//         // LOCALSTORAGE UPDATE
//         // LOCALSTORAGE UPDATE
// const userData = JSON.parse(localStorage.getItem("user") || "{}");
// localStorage.setItem("user", JSON.stringify({
//   ...userData,
//   name:            data.seller.name,
//   companyName:     data.seller.companyName,
//   profileImage:    data.seller.profileImage,
//   phone:           data.seller.phone,
//   city:            data.seller.city,
//   state:           data.seller.state,
// }));

//       } else {
//         setAlert({ type: "error", message: data.message || "Update failed" });
//       }

//     } catch (err) {
//       console.error(err);
//       setAlert({ type: "error", message: "Server error. Please try again." });
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ─────────────────────────────────────────
//   // PLAN STYLE
//   // ─────────────────────────────────────────
//   const planStyle = (plan) => {
//     switch (plan) {
//       case "gold":    return "bg-yellow-100 text-yellow-700 border-yellow-200";
//       case "premium": return "bg-purple-100 text-purple-700 border-purple-200";
//       case "basic":   return "bg-blue-100 text-blue-700 border-blue-200";
//       default:        return "bg-gray-100 text-gray-500 border-gray-200";
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
//           <p className="text-gray-500 text-sm">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────
//   // SECTION HEADER COMPONENT
//   // ─────────────────────────────────────────
//   const SectionHeader = ({ title }) => (
//     <div className="md:col-span-2 border-b border-gray-100 pb-2 mt-2">
//       <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">
//         {title}
//       </h3>
//     </div>
//   );

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//         {alert && (
//   <AlertPopup
//     type={alert.type}
//     message={alert.message}
//     onClose={() => setAlert(null)}
//   />
// )}
//       <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

//         {/* ── TOP HEADER ── */}
//         <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-6">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

//             <div className="flex items-center gap-4">

//               {/* AVATAR */}
//               <div className="relative">
//                 <div className="w-20 h-20 rounded-2xl border-4 border-white/30 overflow-hidden bg-blue-700 flex items-center justify-center">
//                   {imagePreview || profile.profileImage?.url ? (
//                     <img
//                       src={imagePreview || profile.profileImage.url}
//                       alt="profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <FaUserCircle className="text-5xl text-white/70" />
//                   )}
//                 </div>

//                 {isEdit && (
//                   <button
//                     onClick={() => imageRef.current?.click()}
//                     className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-lg transition"
//                   >
//                     <FaCamera className="text-white text-xs" />
//                   </button>
//                 )}

//                 <input
//                   ref={imageRef}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               </div>

//               {/* NAME + BADGE */}
//               <div>
//                 <h2 className="text-xl font-bold">
//                   {profile.companyName || profile.name || "Your Company"}
//                 </h2>
//                 <p className="text-blue-200 text-sm">{profile.email}</p>
//                 <div className="flex items-center gap-2 mt-2 flex-wrap">
//                   {profile.subscriptionActive ? (
//                     <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border capitalize ${planStyle(profile.subscriptionPlan)}`}>
//                       <FaCrown className="text-xs" />
//                       {profile.subscriptionPlan} Plan
//                     </span>
//                   ) : (
//                     <span className="bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-xs font-semibold">
//                       ⚠ No Subscription
//                     </span>
//                   )}
//                   {profile.subscriptionExpire && (
//                     <span className="text-blue-200 text-xs">
//                       Expires: {new Date(profile.subscriptionExpire).toLocaleDateString("en-IN")}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* EDIT/SAVE */}
//             <button
//               onClick={() => isEdit ? handleSave() : setIsEdit(true)}
//               disabled={saving}
//               className="bg-white text-blue-900 px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-50 transition disabled:opacity-60"
//             >
//               {saving ? (
//                 <div className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
//               ) : isEdit ? <FaSave /> : <FaEdit />}
//               {saving ? "Saving..." : isEdit ? "Save Profile" : "Edit Profile"}
//             </button>

//           </div>
//         </div>

//         {/* ── FORM ── */}
//         <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* ════ BASIC INFO ════ */}
//           <SectionHeader title="Basic Information" />

//           {/* OWNER NAME */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">Owner Name</label>
//             <div className="relative mt-2">
//               <FaUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input name="name" value={profile.name} onChange={handleChange} 
//                 placeholder="Your name"
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none" />
//             </div>
//           </div>

//           {/* EMAIL */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">Email</label>
//             <div className="relative mt-2">
//               <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input value={profile.email} disabled
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-100 text-gray-500 outline-none cursor-not-allowed" />
//             </div>
//           </div>

//           {/* PHONE */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">Phone</label>
//             <div className="relative mt-2">
//               <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input name="phone" value={profile.phone} onChange={handleChange} 
//                 placeholder="Phone number"
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none" />
//             </div>
//           </div>

//           {/* ════ COMPANY INFO ════ */}
//           <SectionHeader title="Company Information" />

//           {/* COMPANY NAME */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">Company Name</label>
//             <div className="relative mt-2">
//               <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input name="companyName" value={profile.companyName} onChange={handleChange} 
//                 placeholder="Your company name"
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none" />
//             </div>
//           </div>

//           {/* COMPANY TYPE */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">Company Type</label>
//             <select name="companyType" value={profile.companyType} onChange={handleChange} 
//               className="w-full h-12 mt-2 px-4 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none appearance-none">
//               <option value="">Select Type</option>
//               <option value="Manufacturer">Manufacturer</option>
//               <option value="Trader">Trader</option>
//               <option value="Exporter">Exporter</option>
//               <option value="Wholesaler">Wholesaler</option>
//               <option value="Retailer">Retailer</option>
//             </select>
//           </div>

//           {/* YEAR ESTABLISHED */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">Year Established</label>
//             <div className="relative mt-2">
//               <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input name="yearEstablished" value={profile.yearEstablished} onChange={handleChange} 
//                 placeholder="e.g. 2010"
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none" />
//             </div>
//           </div>

//           {/* EMPLOYEES */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">No. of Employees</label>
//             <div className="relative mt-2">
//               <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <select name="employees" value={profile.employees} onChange={handleChange} 
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none appearance-none">
//                 <option value="">Select Range</option>
//                 <option value="1-10">1-10</option>
//                 <option value="11-50">11-50</option>
//                 <option value="51-100">51-100</option>
//                 <option value="101-500">101-500</option>
//                 <option value="500+">500+</option>
//               </select>
//             </div>
//           </div>

//           {/* ANNUAL TURNOVER */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">Annual Turnover</label>
//             <div className="relative mt-2">
//               <FaChartLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <select name="annualTurnover" value={profile.annualTurnover} onChange={handleChange} 
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none appearance-none">
//                 <option value="">Select Range</option>
//                 <option value="Below 1 Crore">Below 1 Crore</option>
//                 <option value="1-5 Crore">1-5 Crore</option>
//                 <option value="5-10 Crore">5-10 Crore</option>
//                 <option value="10-50 Crore">10-50 Crore</option>
//                 <option value="50+ Crore">50+ Crore</option>
//               </select>
//             </div>
//           </div>

//           {/* WEBSITE */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">
//               Website <span className="text-gray-400 font-normal">(optional)</span>
//             </label>
//             <div className="relative mt-2">
//               <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input name="companyWebsite" value={profile.companyWebsite} onChange={handleChange} 
//                 placeholder="https://yourwebsite.com"
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none" />
//             </div>
//           </div>

//           {/* COMPANY DESCRIPTION */}
//           <div className="md:col-span-2">
//             <label className="font-semibold text-gray-700 text-sm">
//               Company Description <span className="text-gray-400 font-normal">(optional)</span>
//             </label>
//             <textarea name="companyDescription" value={profile.companyDescription} onChange={handleChange} 
//               rows={3} placeholder="Tell buyers about your company..."
//               className="w-full mt-2 p-4 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none resize-none" />
//           </div>

//           {/* ════ LEGAL INFO ════ */}
//           <SectionHeader title="Legal Information" />

//           {/* GST */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">GST Number</label>
//             <div className="relative mt-2">
//               <FaFileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input name="gstNumber" value={profile.gstNumber} onChange={handleChange} 
//                 placeholder="e.g. 27ABCDE1234F1Z5"
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none" />
//             </div>
//           </div>

//           {/* PAN */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">PAN Number</label>
//             <div className="relative mt-2">
//               <FaFileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input name="panNumber" value={profile.panNumber} onChange={handleChange} 
//                 placeholder="e.g. ABCDE1234F"
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none" />
//             </div>
//           </div>

//           {/* REG NUMBER */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">
//               Business Registration No. <span className="text-gray-400 font-normal">(optional)</span>
//             </label>
//             <div className="relative mt-2">
//               <FaFileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input name="regNumber" value={profile.regNumber} onChange={handleChange} 
//                 placeholder="Registration number"
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none" />
//             </div>
//           </div>

//           {/* ════ LOCATION ════ */}
//           <SectionHeader title="Location" />

//           {/* CITY */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">City</label>
//             <div className="relative mt-2">
//               <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input name="city" value={profile.city} onChange={handleChange} 
//                 placeholder="Your city"
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none" />
//             </div>
//           </div>

//           {/* STATE */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">State</label>
//             <div className="relative mt-2">
//               <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input name="state" value={profile.state} onChange={handleChange} 
//                 placeholder="Your state"
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none" />
//             </div>
//           </div>

//           {/* PINCODE */}
//           <div>
//             <label className="font-semibold text-gray-700 text-sm">Pincode</label>
//             <div className="relative mt-2">
//               <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input name="pincode" value={profile.pincode} onChange={handleChange} 
//                 placeholder="e.g. 110001"
//                 className="w-full h-12 pl-12 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none" />
//             </div>
//           </div>

//           {/* ADDRESS */}
//           <div className="md:col-span-2">
//             <label className="font-semibold text-gray-700 text-sm">Full Address</label>
//             <textarea name="address" value={profile.address} onChange={handleChange} 
//               rows={3} placeholder="Full address..."
//               className="w-full mt-2 p-4 border rounded-xl bg-gray-50 disabled:bg-gray-50 focus:border-blue-800 outline-none resize-none" />
//           </div>

//           {/* CANCEL BUTTON */}
//           {isEdit && (
//             <div className="md:col-span-2 flex gap-3">
//               <button
//                 onClick={handleSave}
//                 disabled={saving}
//                 className="bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white px-8 py-3 rounded-2xl font-semibold transition"
//               >
//                 {saving ? "Saving..." : "Save Changes"}
//               </button>
//               <button
//                 onClick={() => {
//                   setIsEdit(false);
//                   setImageFile(null);
//                   setImagePreview(null);
//                  setAlert(null);  
//                 }}
//                 className="border border-gray-200 hover:border-red-300 hover:text-red-500 px-8 py-3 rounded-2xl font-semibold transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerProfile;





// src/Pages/seller/SellerProfile.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  FaUserCircle, FaBuilding,
  FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt,
  FaCamera, FaCrown, FaFileAlt, FaUsers,
  FaChartLine, FaCalendarAlt, FaSpinner,
} from "react-icons/fa";
import { getMyProfile, updateProfile } from "../../api/sellerProfileApi";
import { useLocation } from "react-router-dom";
import AlertPopup from "../../components/common/AlertPopup";

const SellerProfile = () => {

  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [alert, setAlert]               = useState(null);
  const [imageFile, setImageFile]       = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageRef                        = useRef(null);

  // ── LOCATION STATES ──
  const [states,           setStates]           = useState([]);
  const [districts,        setDistricts]        = useState([]);
  const [loadingStates,    setLoadingStates]    = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingPincode,   setLoadingPincode]   = useState(false);

  const [profile, setProfile] = useState({
    name:               "",
    email:              "",
    phone:              "",
    companyName:        "",
    companyType:        "",
    yearEstablished:    "",
    employees:          "",
    annualTurnover:     "",
    companyWebsite:     "",
    companyDescription: "",
    gstNumber:          "",
    panNumber:          "",
    regNumber:          "",
    city:               "",
    state:              "",
    pincode:            "",
    address:            "",
    profileImage:       { url: "" },
    subscriptionActive: false,
    subscriptionPlan:   null,
    subscriptionExpire: null,
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setAlert({ type: "warning", message: location.state.message });
    }
  }, []);

  // ── FETCH PROFILE ──
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getMyProfile();
        if (data.success) setProfile(data.seller);
      } catch (err) {
        console.error(err);
        setAlert({ type: "error", message: "Failed to load profile" });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ── LOAD INDIA STATES ──
  useEffect(() => {
    setLoadingStates(true);
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    })
      .then(res => res.json())
      .then(data => {
        const stateList = (data.data?.states || []).map(s => s.name).sort();
        setStates(stateList);
      })
      .catch(() => setStates([]))
      .finally(() => setLoadingStates(false));
  }, []);

  // ── LOAD CITIES ──
  useEffect(() => {
    if (!profile.state) return;
    setLoadingDistricts(true);
    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India", state: profile.state }),
    })
      .then(res => res.json())
      .then(data => setDistricts((data.data || []).sort()))
      .catch(() => setDistricts([]))
      .finally(() => setLoadingDistricts(false));
  }, [profile.state]);

  // ── PINCODE AUTO FILL ──
  useEffect(() => {
    if (profile.pincode?.length !== 6) return;
    const fetchPincode = async () => {
      setLoadingPincode(true);
      try {
        const res  = await fetch(`https://api.postalpincode.in/pincode/${profile.pincode}`);
        const data = await res.json();
        if (data[0]?.Status === "Success") {
          const place = data[0].PostOffice[0];
          setProfile(prev => ({
            ...prev,
            state: place.State,
            city:  place.District,
          }));
        }
      } catch (err) {
        console.log("Pincode error:", err);
      } finally {
        setLoadingPincode(false);
      }
    };
    fetchPincode();
  }, [profile.pincode]);

  // ── HANDLE CHANGE ──
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ── IMAGE CHANGE ──
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const isProfileComplete = (p) => {
    return (
      p.companyName &&
      p.companyType &&
      p.phone &&
      p.city &&
      p.state &&
      p.gstNumber &&
      p.panNumber
    );
  };

  // ── SAVE PROFILE ──
  const handleSave = async () => {
    try {
      setSaving(true);
      setAlert(null);
      const formData = new FormData();
      formData.append("name",               profile.name);
      formData.append("phone",              profile.phone);
      formData.append("companyName",        profile.companyName);
      formData.append("companyType",        profile.companyType);
      formData.append("yearEstablished",    profile.yearEstablished);
      formData.append("employees",          profile.employees);
      formData.append("annualTurnover",     profile.annualTurnover);
      formData.append("companyWebsite",     profile.companyWebsite);
      formData.append("companyDescription", profile.companyDescription);
      formData.append("gstNumber",          profile.gstNumber);
      formData.append("panNumber",          profile.panNumber);
      formData.append("regNumber",          profile.regNumber);
      formData.append("city",               profile.city);
      formData.append("state",              profile.state);
      formData.append("pincode",            profile.pincode);
      formData.append("address",            profile.address);

      if (imageFile) formData.append("profileImage", imageFile);

      const data = await updateProfile(formData);

      if (data.success) {
        setProfile(data.seller);
        setAlert({ type: "success", message: "Profile updated successfully!" });
        setImageFile(null);

        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({
          ...userData,
          name:         data.seller.name,
          companyName:  data.seller.companyName,
          profileImage: data.seller.profileImage,
          phone:        data.seller.phone,
          city:         data.seller.city,
          state:        data.seller.state,
        }));
      } else {
        setAlert({ type: "error", message: data.message || "Update failed" });
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Server error. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  // ── PLAN STYLE ──
  const planStyle = (plan) => {
    switch (plan) {
      case "gold":    return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "premium": return "bg-purple-100 text-purple-700 border-purple-200";
      case "basic":   return "bg-blue-100 text-blue-700 border-blue-200";
      default:        return "bg-gray-100 text-gray-500 border-gray-200";
    }
  };

  // ── LOADING ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ── SECTION HEADER ──
  const SectionHeader = ({ title }) => (
    <div className="md:col-span-2 border-b border-gray-100 pb-2 mt-2">
      <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {alert && (
        <AlertPopup
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

        {/* ── TOP HEADER ── */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">

              {/* AVATAR */}
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl border-4 border-white/30 overflow-hidden bg-blue-700 flex items-center justify-center">
                  {imagePreview || profile.profileImage?.url ? (
                    <img
                      src={imagePreview || profile.profileImage.url}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-5xl text-white/70" />
                  )}
                </div>
                <button
                  onClick={() => imageRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-lg transition"
                >
                  <FaCamera className="text-white text-xs" />
                </button>
                <input
                  ref={imageRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* NAME + BADGE */}
              <div>
                <h2 className="text-xl font-bold">
                  {profile.companyName || profile.name || "Your Company"}
                </h2>
                <p className="text-blue-200 text-sm">{profile.email}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {profile.subscriptionActive ? (
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border capitalize ${planStyle(profile.subscriptionPlan)}`}>
                      <FaCrown className="text-xs" />
                      {profile.subscriptionPlan} Plan
                    </span>
                  ) : (
                    <span className="bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-xs font-semibold">
                      ⚠ No Subscription
                    </span>
                  )}
                  {profile.subscriptionExpire && (
                    <span className="text-blue-200 text-xs">
                      Expires: {new Date(profile.subscriptionExpire).toLocaleDateString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FORM ── */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ════ BASIC INFO ════ */}
          <SectionHeader title="Basic Information" />

          {/* OWNER NAME */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">Owner Name</label>
            <div className="relative mt-2">
              <FaUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="name" value={profile.name} onChange={handleChange}
                placeholder="Your name"
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">Email</label>
            <div className="relative mt-2">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={profile.email} disabled
                className="w-full h-12 pl-12 border rounded-xl bg-gray-100 text-gray-500 outline-none cursor-not-allowed" />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">Phone</label>
            <div className="relative mt-2">
              <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="phone" value={profile.phone} onChange={handleChange}
                placeholder="Phone number"
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
            </div>
          </div>

          {/* ════ COMPANY INFO ════ */}
          <SectionHeader title="Company Information" />

          {/* COMPANY NAME */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">Company Name</label>
            <div className="relative mt-2">
              <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="companyName" value={profile.companyName} onChange={handleChange}
                placeholder="Your company name"
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
            </div>
          </div>

          {/* COMPANY TYPE */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">Company Type</label>
            <select name="companyType" value={profile.companyType} onChange={handleChange}
              className="w-full h-12 mt-2 px-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none appearance-none">
              <option value="">Select Type</option>
              <option value="Manufacturer">Manufacturer</option>
              <option value="Trader">Trader</option>
              <option value="Exporter">Exporter</option>
              <option value="Wholesaler">Wholesaler</option>
              <option value="Retailer">Retailer</option>
            </select>
          </div>

          {/* YEAR ESTABLISHED */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">Year Established</label>
            <div className="relative mt-2">
              <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="yearEstablished" value={profile.yearEstablished} onChange={handleChange}
                placeholder="e.g. 2010"
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
            </div>
          </div>

          {/* EMPLOYEES */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">No. of Employees</label>
            <div className="relative mt-2">
              <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select name="employees" value={profile.employees} onChange={handleChange}
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none appearance-none">
                <option value="">Select Range</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-100">51-100</option>
                <option value="101-500">101-500</option>
                <option value="500+">500+</option>
              </select>
            </div>
          </div>

          {/* ANNUAL TURNOVER */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">Annual Turnover</label>
            <div className="relative mt-2">
              <FaChartLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select name="annualTurnover" value={profile.annualTurnover} onChange={handleChange}
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none appearance-none">
                <option value="">Select Range</option>
                <option value="Below 1 Crore">Below 1 Crore</option>
                <option value="1-5 Crore">1-5 Crore</option>
                <option value="5-10 Crore">5-10 Crore</option>
                <option value="10-50 Crore">10-50 Crore</option>
                <option value="50+ Crore">50+ Crore</option>
              </select>
            </div>
          </div>

          {/* WEBSITE */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">
              Website <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="relative mt-2">
              <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="companyWebsite" value={profile.companyWebsite} onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
            </div>
          </div>

          {/* COMPANY DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="font-semibold text-gray-700 text-sm">
              Company Description <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea name="companyDescription" value={profile.companyDescription} onChange={handleChange}
              rows={3} placeholder="Tell buyers about your company..."
              className="w-full mt-2 p-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none resize-none" />
          </div>

          {/* ════ LEGAL INFO ════ */}
          <SectionHeader title="Legal Information" />

          {/* GST */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">GST Number</label>
            <div className="relative mt-2">
              <FaFileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="gstNumber" value={profile.gstNumber} onChange={handleChange}
                placeholder="e.g. 27ABCDE1234F1Z5"
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
            </div>
          </div>

          {/* PAN */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">PAN Number</label>
            <div className="relative mt-2">
              <FaFileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="panNumber" value={profile.panNumber} onChange={handleChange}
                placeholder="e.g. ABCDE1234F"
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
            </div>
          </div>

          {/* REG NUMBER */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">
              Business Registration No. <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="relative mt-2">
              <FaFileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="regNumber" value={profile.regNumber} onChange={handleChange}
                placeholder="Registration number"
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
            </div>
          </div>

          {/* ════ LOCATION ════ */}
          <SectionHeader title="Location" />

          {/* PINCODE */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">Pincode</label>
            <div className="relative mt-2">
              {loadingPincode ? (
                <FaSpinner className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 animate-spin" />
              ) : (
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              )}
              <input
                name="pincode"
                value={profile.pincode}
                onChange={handleChange}
                maxLength={6}
                placeholder="Enter pincode (auto-fills state & city)"
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none"
              />
            </div>
          </div>

          {/* STATE DROPDOWN */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">State</label>
            <div className="relative mt-2">
              {loadingStates ? (
                <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 animate-spin" />
              ) : (
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              )}
              <select
                name="state"
                value={profile.state}
                onChange={(e) => {
                  setProfile({ ...profile, state: e.target.value, city: "" });
                }}
                disabled={loadingStates}
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none appearance-none"
              >
                <option value="">Select State</option>
                {states.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* CITY DROPDOWN */}
          <div>
            <label className="font-semibold text-gray-700 text-sm">City</label>
            <div className="relative mt-2">
              {loadingDistricts ? (
                <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 animate-spin" />
              ) : (
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              )}
              <select
                name="city"
                value={profile.city}
                onChange={handleChange}
                disabled={!profile.state || loadingDistricts}
                className="w-full h-12 pl-12 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select City</option>
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="font-semibold text-gray-700 text-sm">Full Address</label>
            <textarea name="address" value={profile.address} onChange={handleChange}
              rows={3} placeholder="Full address..."
              className="w-full mt-2 p-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none resize-none" />
          </div>

          {/* SAVE / CANCEL */}
          <div className="md:col-span-2 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white px-8 py-3 rounded-2xl font-semibold transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => {
                setImageFile(null);
                setImagePreview(null);
                setAlert(null);
              }}
              className="border border-gray-200 hover:border-red-300 hover:text-red-500 px-8 py-3 rounded-2xl font-semibold transition"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellerProfile;