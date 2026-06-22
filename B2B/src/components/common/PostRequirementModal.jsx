// // src/components/common/PostRequirementModal.jsx

// import React, { useState, useEffect } from "react";
// import { X, Send, User, Mail, Phone, Package, MapPin, IndianRupee } from "lucide-react";
// import { postRequirement } from "../../api/requirementApi";
// import { getCategories } from "../../api/categoryApi";
// import { getSubCategoriesByCategory } from "../../api/subCategoryApi";

// export default function PostRequirementModal({ isOpen, onClose }) {

//   const [form, setForm] = useState({
//     buyerName:   "",
//     buyerEmail:  "",
//     buyerPhone:  "",
//     productName: "",
//     description: "",
//     quantity:    "",
//     budget:      "",
//     location:    "",
//     category:    "",
//     subCategory: "",
//   });

//   const [categories, setCategories]       = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading]             = useState(false);
//   const [success, setSuccess]             = useState(false);
//   const [error, setError]                 = useState("");
//   const [sellersNotified, setSellersNotified] = useState(0);

//   // ─────────────────────────────────────────
//   // FETCH CATEGORIES
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data.categories || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // ─────────────────────────────────────────
//   // FETCH SUBCATEGORIES
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     if (!form.category) {
//       setSubCategories([]);
//       return;
//     }
//     const fetchSubs = async () => {
//       try {
//         const data = await getSubCategoriesByCategory(form.category);
//         setSubCategories(data.subCategories || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchSubs();
//   }, [form.category]);

//   // ─────────────────────────────────────────
//   // HANDLE CHANGE
//   // ─────────────────────────────────────────
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "category" && { subCategory: "" }),
//     }));
//   };

//   // ─────────────────────────────────────────
//   // HANDLE SUBMIT
//   // ─────────────────────────────────────────
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.buyerName || !form.buyerEmail || !form.buyerPhone || !form.productName || !form.category) {
//       setError("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const data = await postRequirement(form);

//       if (data.success) {
//         setSuccess(true);
//         setSellersNotified(data.sellersNotified || 0);
//         setForm({
//           buyerName: "", buyerEmail: "", buyerPhone: "",
//           productName: "", description: "", quantity: "",
//           budget: "", location: "", category: "", subCategory: "",
//         });
//       } else {
//         setError(data.message || "Something went wrong");
//       }

//     } catch (err) {
//       console.error(err);
//       setError("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────
//   // CLOSE
//   // ─────────────────────────────────────────
//   const handleClose = () => {
//     setSuccess(false);
//     setError("");
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

// <div className="bg-orange-500 px-6 py-2 flex items-center justify-center gap-2">
//   <span className="animate-pulse text-white text-xs font-bold uppercase tracking-widest">
//     🔔 Tell us what you need — Get quotes in 24 hrs!
//   </span>
// </div>
//         {/* HEADER */}
//         <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-5 flex items-center justify-between flex-shrink-0">
//           <div>
//             <h2 className="text-white font-bold text-xl">Post Buy Requirement</h2>
//             <p className="text-blue-200 text-sm mt-0.5">
//               Get quotes from top verified suppliers
//             </p>
//           </div>
//           <button
//             onClick={handleClose}
//             className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* SUCCESS STATE */}
//         {success ? (
//           <div className="p-10 text-center">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Send className="w-8 h-8 text-green-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">
//               Requirement Posted! 🎉
//             </h3>
//             <p className="text-gray-500 mb-2">
//               Your requirement has been sent to
//             </p>
//             <p className="text-3xl font-bold text-blue-800 mb-2">
//               {sellersNotified} Sellers
//             </p>
//             <p className="text-gray-400 text-sm mb-6">
//               Gold & Premium sellers will contact you first.
//             </p>
//             <button
//               onClick={handleClose}
//               className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-2xl font-semibold transition"
//             >
//               Done
//             </button>
//           </div>
//         ) : (

//           /* FORM */
//           <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">

//             {/* ERROR */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
//                 {error}
//               </div>
//             )}

//             {/* SECTION — Buyer Info */}
//             <div>
//               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//                 Your Details
//               </p>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

//                 {/* NAME */}
//                 <div className="relative">
//                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     name="buyerName"
//                     value={form.buyerName}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Your Name *"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
//                   />
//                 </div>

//                 {/* PHONE */}
//                 <div className="relative">
//                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     name="buyerPhone"
//                     value={form.buyerPhone}
//                     onChange={handleChange}
//                     type="tel"
//                     placeholder="Phone Number *"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
//                   />
//                 </div>

//                 {/* EMAIL */}
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     name="buyerEmail"
//                     value={form.buyerEmail}
//                     onChange={handleChange}
//                     type="email"
//                     placeholder="Email Address *"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
//                   />
//                 </div>

//               </div>
//             </div>

//             {/* SECTION — Product Info */}
//             <div>
//               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//                 Product Details
//               </p>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//                 {/* PRODUCT NAME */}
//                 <div className="relative sm:col-span-2">
//                   <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     name="productName"
//                     value={form.productName}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Product Name *"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
//                   />
//                 </div>

//                 {/* CATEGORY */}
//                 <select
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none"
//                 >
//                   <option value="">Select Category *</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>

//                 {/* SUBCATEGORY */}
//                 <select
//                   name="subCategory"
//                   value={form.subCategory}
//                   onChange={handleChange}
//                   disabled={!form.category}
//                   className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none disabled:opacity-50"
//                 >
//                   <option value="">
//                     {form.category ? "Select Sub Category" : "Select category first"}
//                   </option>
//                   {subCategories.map((sub) => (
//                     <option key={sub._id} value={sub._id}>
//                       {sub.name}
//                     </option>
//                   ))}
//                 </select>

//                 {/* QUANTITY */}
//                 <div className="relative">
//                   <input
//                     name="quantity"
//                     value={form.quantity}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Quantity (e.g. 100 Pieces)"
//                     className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
//                   />
//                 </div>

//                 {/* BUDGET */}
//                 <div className="relative">
//                   <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     name="budget"
//                     value={form.budget}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Budget (e.g. ₹50,000)"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
//                   />
//                 </div>

//                 {/* LOCATION */}
//                 <div className="relative sm:col-span-2">
//                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     name="location"
//                     value={form.location}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Delivery Location (e.g. Mumbai, Maharashtra)"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
//                   />
//                 </div>

//               </div>
//             </div>

//             {/* DESCRIPTION */}
//             <div>
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 placeholder="Describe your requirements in detail..."
//                 rows={3}
//                 className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm resize-none"
//               />
//             </div>

//             {/* TRUST BADGE */}
//             <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3">
//               <div className="w-8 h-8 bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
//                 <Send className="w-4 h-4 text-white" />
//               </div>
//               <p className="text-xs text-blue-700">
//                 Your requirement will be sent to <strong>Gold & Premium</strong> sellers first, then Basic plan sellers.
//               </p>
//             </div>

//             {/* BUTTONS */}
//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={handleClose}
//                 className="flex-1 border border-gray-200 hover:border-gray-300 text-gray-600 py-3 rounded-2xl font-semibold text-sm transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white py-3 rounded-2xl font-semibold text-sm transition flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <Send className="w-4 h-4" />
//                     Post Requirement
//                   </>
//                 )}
//               </button>
//             </div>

//           </form>
//         )}

//       </div>
//     </div>
//   );
// }





// // src/components/common/PostRequirementModal.jsx

// import React, { useState, useEffect } from "react";
// import { X, Send, User, Mail, Phone, Package, MapPin, IndianRupee } from "lucide-react";
// import { postRequirement } from "../../api/requirementApi";
// import { getCategories } from "../../api/categoryApi";
// import { getSubCategoriesByCategory } from "../../api/subCategoryApi";

// export default function PostRequirementModal({ isOpen, onClose }) {

//   const [form, setForm] = useState({
//     buyerName:   "",
//     buyerEmail:  "",
//     buyerPhone:  "",
//     productName: "",
//     description: "",
//     quantity:    "",
//     budget:      "",
//     location:    "",  // "City, State" format mein save hoga
//     category:    "",
//     subCategory: "",
//   });

//   // ── LOCATION STATES ──
//   const [states,           setStates]           = useState([]);
//   const [cities,           setCities]           = useState([]);
//   const [selectedState,    setSelectedState]    = useState("");
//   const [selectedCity,     setSelectedCity]     = useState("");
//   const [pincode,          setPincode]          = useState("");
//   const [loadingStates,    setLoadingStates]    = useState(false);
//   const [loadingCities,    setLoadingCities]    = useState(false);
//   const [loadingPincode,   setLoadingPincode]   = useState(false);

//   const [categories,    setCategories]    = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading,       setLoading]       = useState(false);
//   const [success,       setSuccess]       = useState(false);
//   const [error,         setError]         = useState("");
//   const [sellersNotified, setSellersNotified] = useState(0);

//   // ── FETCH CATEGORIES ──
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data.categories || []);
//       } catch (err) { console.error(err); }
//     };
//     fetchCategories();
//   }, []);

//   // ── FETCH SUBCATEGORIES ──
//   useEffect(() => {
//     if (!form.category) { setSubCategories([]); return; }
//     const fetchSubs = async () => {
//       try {
//         const data = await getSubCategoriesByCategory(form.category);
//         setSubCategories(data.subCategories || []);
//       } catch (err) { console.error(err); }
//     };
//     fetchSubs();
//   }, [form.category]);

//   // ── LOAD INDIA STATES ──
//   useEffect(() => {
//     setLoadingStates(true);
//     fetch("https://countriesnow.space/api/v0.1/countries/states", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ country: "India" }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         const stateList = (data.data?.states || []).map(s => s.name).sort();
//         setStates(stateList);
//       })
//       .catch(() => setStates([]))
//       .finally(() => setLoadingStates(false));
//   }, []);

//   // ── LOAD CITIES ──
//   useEffect(() => {
//     if (!selectedState) { setCities([]); return; }
//     setLoadingCities(true);
//     fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ country: "India", state: selectedState }),
//     })
//       .then(res => res.json())
//       .then(data => setCities((data.data || []).sort()))
//       .catch(() => setCities([]))
//       .finally(() => setLoadingCities(false));
//   }, [selectedState]);

//   // ── PINCODE AUTO FILL ──
//   useEffect(() => {
//     if (pincode?.length !== 6) return;
//     const fetchPincode = async () => {
//       setLoadingPincode(true);
//       try {
//         const res  = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//         const data = await res.json();
//         if (data[0]?.Status === "Success") {
//           const place = data[0].PostOffice[0];
//           setSelectedState(place.State);
//           setSelectedCity(place.District);
//           // location update
//           setForm(prev => ({ ...prev, location: `${place.District}, ${place.State}` }));
//         }
//       } catch (err) { console.log("Pincode error:", err); }
//       finally { setLoadingPincode(false); }
//     };
//     fetchPincode();
//   }, [pincode]);

//   // ── STATE CHANGE ──
//   const handleStateChange = (e) => {
//     const state = e.target.value;
//     setSelectedState(state);
//     setSelectedCity("");
//     setForm(prev => ({ ...prev, location: state ? `${state}` : "" }));
//   };

//   // ── CITY CHANGE ──
//   const handleCityChange = (e) => {
//     const city = e.target.value;
//     setSelectedCity(city);
//     // "City, State" format mein location save karo
//     setForm(prev => ({ ...prev, location: city && selectedState ? `${city}, ${selectedState}` : selectedState }));
//   };

//   // ── HANDLE CHANGE ──
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "category" && { subCategory: "" }),
//     }));
//   };

//   // ── HANDLE SUBMIT ──
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.buyerName || !form.buyerEmail || !form.buyerPhone || !form.productName || !form.category) {
//       setError("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const data = await postRequirement(form);
//       if (data.success) {
//         setSuccess(true);
//         setSellersNotified(data.sellersNotified || 0);
//         setForm({ buyerName: "", buyerEmail: "", buyerPhone: "", productName: "", description: "", quantity: "", budget: "", location: "", category: "", subCategory: "" });
//         setSelectedState("");
//         setSelectedCity("");
//         setPincode("");
//       } else {
//         setError(data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── CLOSE ──
//   const handleClose = () => {
//     setSuccess(false);
//     setError("");
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

//         {/* TOP BANNER */}
//         <div className="bg-orange-500 px-6 py-2 flex items-center justify-center gap-2">
//           <span className="animate-pulse text-white text-xs font-bold uppercase tracking-widest">
//             🔔 Tell us what you need — Get quotes in 24 hrs!
//           </span>
//         </div>

//         {/* HEADER */}
//         <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-5 flex items-center justify-between flex-shrink-0">
//           <div>
//             <h2 className="text-white font-bold text-xl">Post Buy Requirement</h2>
//             <p className="text-blue-200 text-sm mt-0.5">Get quotes from top verified suppliers</p>
//           </div>
//           <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* SUCCESS STATE */}
//         {success ? (
//           <div className="p-10 text-center">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Send className="w-8 h-8 text-green-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">Requirement Posted! 🎉</h3>
//             <p className="text-gray-500 mb-2">Your requirement has been sent to</p>
//             <p className="text-3xl font-bold text-blue-800 mb-2">{sellersNotified} Sellers</p>
//             <p className="text-gray-400 text-sm mb-6">Gold & Premium sellers will contact you first.</p>
//             <button onClick={handleClose} className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-2xl font-semibold transition">
//               Done
//             </button>
//           </div>
//         ) : (

//           <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">

//             {/* ERROR */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">{error}</div>
//             )}

//             {/* SECTION — Buyer Info */}
//             <div>
//               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Your Details</p>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="relative">
//                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input name="buyerName" value={form.buyerName} onChange={handleChange} type="text" placeholder="Your Name *"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm" />
//                 </div>
//                 <div className="relative">
//                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input name="buyerPhone" value={form.buyerPhone} onChange={handleChange} type="tel" placeholder="Phone Number *"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm" />
//                 </div>
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input name="buyerEmail" value={form.buyerEmail} onChange={handleChange} type="email" placeholder="Email Address *"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm" />
//                 </div>
//               </div>
//             </div>

//             {/* SECTION — Product Info */}
//             <div>
//               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Product Details</p>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//                 {/* PRODUCT NAME */}
//                 <div className="relative sm:col-span-2">
//                   <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input name="productName" value={form.productName} onChange={handleChange} type="text" placeholder="Product Name *"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm" />
//                 </div>

//                 {/* CATEGORY */}
//                 <select name="category" value={form.category} onChange={handleChange}
//                   className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none">
//                   <option value="">Select Category *</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>{cat.name}</option>
//                   ))}
//                 </select>

//                 {/* SUBCATEGORY */}
//                 <select name="subCategory" value={form.subCategory} onChange={handleChange} disabled={!form.category}
//                   className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none disabled:opacity-50">
//                   <option value="">{form.category ? "Select Sub Category" : "Select category first"}</option>
//                   {subCategories.map((sub) => (
//                     <option key={sub._id} value={sub._id}>{sub.name}</option>
//                   ))}
//                 </select>

//                 {/* QUANTITY */}
//                 <input name="quantity" value={form.quantity} onChange={handleChange} type="text" placeholder="Quantity (e.g. 100 Pieces)"
//                   className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm" />

//                 {/* BUDGET */}
//                 <div className="relative">
//                   <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input name="budget" value={form.budget} onChange={handleChange} type="text" placeholder="Budget (e.g. ₹50,000)"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm" />
//                 </div>

//               </div>
//             </div>

//             {/* SECTION — Location */}
//             <div>
//               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//                 Delivery Location
//               </p>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

//                 {/* PINCODE */}
//                 <div className="relative">
//                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   {loadingPincode && (
//                     <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
//                   )}
//                   <input
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                     type="text"
//                     maxLength={6}
//                     placeholder="Pincode (auto-fill)"
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
//                   />
//                 </div>

//                 {/* STATE */}
//                 <div className="relative">
//                   {loadingStates ? (
//                     <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
//                   ) : (
//                     <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   )}
//                   <select value={selectedState} onChange={handleStateChange} disabled={loadingStates}
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none disabled:opacity-50">
//                     <option value="">Select State</option>
//                     {states.map(s => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                 </div>

//                 {/* CITY */}
//                 <div className="relative">
//                   {loadingCities ? (
//                     <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
//                   ) : (
//                     <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   )}
//                   <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState || loadingCities}
//                     className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none disabled:opacity-50">
//                     <option value="">{selectedState ? "Select City" : "Select state first"}</option>
//                     {cities.map(c => <option key={c} value={c}>{c}</option>)}
//                   </select>
//                 </div>

//               </div>
//             </div>

//             {/* DESCRIPTION */}
//             <div>
//               <textarea name="description" value={form.description} onChange={handleChange}
//                 placeholder="Describe your requirements in detail..." rows={3}
//                 className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm resize-none" />
//             </div>

//             {/* TRUST BADGE */}
//             <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3">
//               <div className="w-8 h-8 bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
//                 <Send className="w-4 h-4 text-white" />
//               </div>
//               <p className="text-xs text-blue-700">
//                 Your requirement will be sent to <strong>Gold & Premium</strong> sellers first, then Basic plan sellers.
//               </p>
//             </div>

//             {/* BUTTONS */}
//             <div className="flex gap-3">
//               <button type="button" onClick={handleClose}
//                 className="flex-1 border border-gray-200 hover:border-gray-300 text-gray-600 py-3 rounded-2xl font-semibold text-sm transition">
//                 Cancel
//               </button>
//               <button type="submit" disabled={loading}
//                 className="flex-1 bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white py-3 rounded-2xl font-semibold text-sm transition flex items-center justify-center gap-2">
//                 {loading ? (
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <><Send className="w-4 h-4" /> Post Requirement</>
//                 )}
//               </button>
//             </div>

//           </form>
//         )}
//       </div>
//     </div>
//   );
// }





// src/components/common/PostRequirementModal.jsx

import React, { useState, useEffect } from "react";
import { X, Send, User, Mail, Phone, Package, MapPin, IndianRupee, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { postRequirement } from "../../api/requirementApi";
import { getCategories } from "../../api/categoryApi";
import { getSubCategoriesByCategory } from "../../api/subCategoryApi";

export default function PostRequirementModal({ isOpen, onClose }) {

  // ── STEP STATE (1 = basic info, 2 = product details) ──
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    buyerName:   "",
    buyerEmail:  "",
    buyerPhone:  "",
    productName: "",
    description: "",
    quantity:    "",
    budget:      "",
    location:    "",
    category:    "",
    subCategory: "",
  });

  // ── LOCATION STATES ──
  const [states,         setStates]         = useState([]);
  const [cities,         setCities]         = useState([]);
  const [selectedState,  setSelectedState]  = useState("");
  const [selectedCity,   setSelectedCity]   = useState("");
  const [pincode,        setPincode]        = useState("");
  const [loadingStates,  setLoadingStates]  = useState(false);
  const [loadingCities,  setLoadingCities]  = useState(false);
  const [loadingPincode, setLoadingPincode] = useState(false);

  const [categories,       setCategories]       = useState([]);
  const [subCategories,    setSubCategories]    = useState([]);
  const [loading,          setLoading]          = useState(false);
  const [success,          setSuccess]          = useState(false);
  const [error,            setError]            = useState("");
  const [step1Error,       setStep1Error]       = useState("");
  const [sellersNotified,  setSellersNotified]  = useState(0);

  // ── FETCH CATEGORIES ──
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch (err) { console.error(err); }
    };
    fetchCategories();
  }, []);

  // ── FETCH SUBCATEGORIES ──
  useEffect(() => {
    if (!form.category) { setSubCategories([]); return; }
    const fetchSubs = async () => {
      try {
        const data = await getSubCategoriesByCategory(form.category);
        setSubCategories(data.subCategories || []);
      } catch (err) { console.error(err); }
    };
    fetchSubs();
  }, [form.category]);

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
    if (!selectedState) { setCities([]); return; }
    setLoadingCities(true);
    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India", state: selectedState }),
    })
      .then(res => res.json())
      .then(data => setCities((data.data || []).sort()))
      .catch(() => setCities([]))
      .finally(() => setLoadingCities(false));
  }, [selectedState]);

  // ── PINCODE AUTO FILL ──
  useEffect(() => {
    if (pincode?.length !== 6) return;
    const fetchPincode = async () => {
      setLoadingPincode(true);
      try {
        const res  = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await res.json();
        if (data[0]?.Status === "Success") {
          const place = data[0].PostOffice[0];
          setSelectedState(place.State);
          setSelectedCity(place.District);
          setForm(prev => ({ ...prev, location: `${place.District}, ${place.State}` }));
        }
      } catch (err) { console.log("Pincode error:", err); }
      finally { setLoadingPincode(false); }
    };
    fetchPincode();
  }, [pincode]);

  // ── STATE CHANGE ──
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setForm(prev => ({ ...prev, location: state ? `${state}` : "" }));
  };

  // ── CITY CHANGE ──
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setForm(prev => ({ ...prev, location: city && selectedState ? `${city}, ${selectedState}` : selectedState }));
  };

  // ── HANDLE CHANGE ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && { subCategory: "" }),
    }));
  };

  // ── STEP 1 NEXT ──
  const handleNext = () => {
    setStep1Error("");
    if (!form.buyerName.trim() || !form.buyerPhone.trim() || !form.buyerEmail.trim()) {
      setStep1Error("Please fill all required fields");
      return;
    }
    setStep(2);
  };

  // ── HANDLE SUBMIT ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.productName || !form.category) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const data = await postRequirement(form);
      if (data.success) {
        setSuccess(true);
        setSellersNotified(data.sellersNotified || 0);
        setForm({ buyerName: "", buyerEmail: "", buyerPhone: "", productName: "", description: "", quantity: "", budget: "", location: "", category: "", subCategory: "" });
        setSelectedState("");
        setSelectedCity("");
        setPincode("");
        setStep(1);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── CLOSE ──
  const handleClose = () => {
    setSuccess(false);
    setError("");
    setStep1Error("");
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col">

        {/* TOP BANNER */}
        <div className="bg-orange-500 px-6 py-2 flex items-center justify-center gap-2">
          <span className="animate-pulse text-white text-xs font-bold uppercase tracking-widest">
            🔔 Tell us what you need — Get quotes in 24 hrs!
          </span>
        </div>

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-white font-bold text-lg">Post Buy Requirement</h2>
            <p className="text-blue-200 text-xs mt-0.5">Get quotes from top verified suppliers</p>
          </div>
          <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP INDICATOR (only when not success) */}
        {!success && (
          <div className="px-6 pt-4 pb-2 flex items-center gap-3">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 1 ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-500"}`}>
                {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
              </div>
              <span className={`text-xs font-medium ${step === 1 ? "text-blue-800" : "text-gray-400"}`}>Your Info</span>
            </div>
            {/* Line */}
            <div className={`flex-1 h-0.5 rounded-full transition-all ${step >= 2 ? "bg-blue-800" : "bg-gray-200"}`} />
            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 2 ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-500"}`}>
                2
              </div>
              <span className={`text-xs font-medium ${step === 2 ? "text-blue-800" : "text-gray-400"}`}>Product Details</span>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {success ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Requirement Posted! 🎉</h3>
            <p className="text-gray-500 mb-2">Your requirement has been sent to</p>
            <p className="text-3xl font-bold text-blue-800 mb-2">{sellersNotified} Sellers</p>
            <p className="text-gray-400 text-sm mb-6">Gold & Premium sellers will contact you first.</p>
            <button onClick={handleClose} className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-2xl font-semibold transition">
              Done
            </button>
          </div>

        ) : step === 1 ? (

          /* ─────────── STEP 1 — Buyer Info ─────────── */
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-500">Enter your contact details to get started</p>

            {step1Error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">{step1Error}</div>
            )}

            {/* NAME */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="buyerName"
                value={form.buyerName}
                onChange={handleChange}
                type="text"
                placeholder="Your Name *"
                className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
              />
            </div>

            {/* PHONE */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="buyerPhone"
                value={form.buyerPhone}
                onChange={handleChange}
                type="tel"
                placeholder="Phone Number *"
                className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
              />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="buyerEmail"
                value={form.buyerEmail}
                onChange={handleChange}
                type="email"
                placeholder="Email Address *"
                className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
              />
            </div>

            {/* NEXT BUTTON */}
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-2xl font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        ) : (

          /* ─────────── STEP 2 — Product Details ─────────── */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">{error}</div>
            )}

            {/* PRODUCT NAME */}
            <div className="relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="productName"
                value={form.productName}
                onChange={handleChange}
                type="text"
                placeholder="Product Name *"
                className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
              />
            </div>

            {/* CATEGORY + SUBCATEGORY */}
            <div className="grid grid-cols-2 gap-3">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none"
              >
                <option value="">Select Category *</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>

              <select
                name="subCategory"
                value={form.subCategory}
                onChange={handleChange}
                disabled={!form.category}
                className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none disabled:opacity-50"
              >
                <option value="">{form.category ? "Sub Category" : "Select category first"}</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>

            {/* QUANTITY + BUDGET */}
            <div className="grid grid-cols-2 gap-3">
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                type="text"
                placeholder="Quantity"
                className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
              />
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  type="text"
                  placeholder="Budget"
                  className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
                />
              </div>
            </div>

            {/* LOCATION — Pincode + State + City */}
            <div className="grid grid-cols-3 gap-3">
              {/* PINCODE */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                {loadingPincode && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
                )}
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  type="text"
                  maxLength={6}
                  placeholder="Pincode"
                  className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
                />
              </div>

              {/* STATE */}
              <div className="relative">
                {loadingStates ? (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                )}
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  disabled={loadingStates}
                  className="w-full h-12 pl-10 pr-2 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none disabled:opacity-50"
                >
                  <option value="">State</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* CITY */}
              <div className="relative">
                {loadingCities ? (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                )}
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={!selectedState || loadingCities}
                  className="w-full h-12 pl-10 pr-2 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none disabled:opacity-50"
                >
                  <option value="">{selectedState ? "City" : "State first"}</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* DESCRIPTION */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your requirements..."
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm resize-none"
            />

            {/* TRUST BADGE */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-7 h-7 bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <Send className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-xs text-blue-700">
                Sent to <strong>Gold & Premium</strong> sellers first, then Basic plan sellers.
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 border border-gray-200 hover:border-gray-300 text-gray-600 px-5 py-3 rounded-2xl font-semibold text-sm transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white py-3 rounded-2xl font-semibold text-sm transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><Send className="w-4 h-4" /> Post Requirement</>
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}