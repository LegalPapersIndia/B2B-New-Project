
// // src/components/Navbar.jsx

// import React, { useEffect, useState } from "react";
// import {
//   FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
//   FaPhoneAlt, FaEnvelope, FaSearch, FaSpinner,
//   FaBars, FaStore, FaTimes, FaUserCircle, FaMapMarkerAlt,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const [states, setStates]       = useState([]);
//   const [districts, setDistricts] = useState([]);

//   const [selectedState,    setSelectedState]    = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [productType,      setProductType]      = useState("");
//   const [pincode,          setPincode]          = useState("");

//   const [loadingStates,    setLoadingStates]    = useState(false);
//   const [loadingDistricts, setLoadingDistricts] = useState(false);
//   const [loadingPincode,   setLoadingPincode]   = useState(false);
//   const [detectingLocation, setDetectingLocation] = useState(true);
//   const [isMenuOpen,       setIsMenuOpen]       = useState(false);

//   const [detected, setDetected] = useState({ region: "", city: "" });

//   const isSignedIn = false;
//   const user = null;

//   // ── AUTO DETECT LOCATION ──
//   useEffect(() => {
//     const detectLocation = async () => {
//       setDetectingLocation(true);
//       try {
//       const res = await fetch("http://ip-api.com/json/?fields=regionName,city,status");
// const data = await res.json();
// if (data.status === "success") {
//   setDetected({ region: data.regionName || "", city: data.city || "" });
// }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setDetectingLocation(false);
//       }
//     };
//     detectLocation();
//   }, []);

//   // ── LOAD INDIA STATES ──
// // ── LOAD INDIA STATES ──
// useEffect(() => {
//   if (detectingLocation) return; // ⬅️ location detect hone ka wait karo

//   setLoadingStates(true);
//   fetch("https://countriesnow.space/api/v0.1/countries/states", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ country: "India" }),
//   })
//     .then(res => res.json())
//     .then(data => {
//       const stateList = (data.data?.states || []).map(s => s.name).sort();
//       setStates(stateList);

//       if (detected.region) {
//         const match = stateList.find(n =>
//           n.toLowerCase().includes(detected.region.toLowerCase()) ||
//           detected.region.toLowerCase().includes(n.toLowerCase())
//         );
//         if (match) setSelectedState(match);
//       }
//     })
//     .catch(() => setStates([]))
//     .finally(() => setLoadingStates(false));

// }, [detectingLocation, detected.region]); // ⬅️ detectingLocation add karo

//   // ── LOAD CITIES ──
// // ── LOAD CITIES ──
// useEffect(() => {
//   if (!selectedState) return;
//   setLoadingDistricts(true);

//   fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ country: "India", state: selectedState }),
//   })
//     .then(res => res.json())
//     .then(data => {
//       const cityList = (data.data || []).sort();
//       setDistricts(cityList);

//       // ✅ detected.city se match karo
//       if (detected.city && cityList.length > 0) {
//         const match = cityList.find(n =>
//           n.toLowerCase().includes(detected.city.toLowerCase()) ||
//           detected.city.toLowerCase().includes(n.toLowerCase())
//         );
//         if (match) setSelectedDistrict(match);
//       }
//     })
//     .catch(() => setDistricts([]))
//     .finally(() => setLoadingDistricts(false));

// }, [selectedState]); // ⬅️ detected.city dependency hatao

//   // ── PINCODE AUTO FILL ──
// // ── PINCODE AUTO FILL ──
// useEffect(() => {
//   if (pincode.length !== 6) return;

//   const fetchPincode = async () => {
//     setLoadingPincode(true);
//     try {
//       // ✅ India Post API — sabhi Indian pincodes support karta hai
//       const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//       const data = await res.json();

//       if (data[0]?.Status === "Success") {
//         const place     = data[0].PostOffice[0];
//         const stateName = place.State;
//         const cityName  = place.District;

//         // State match
//         setStates(prev => {
//           const matchedState = prev.find(s =>
//             s.toLowerCase().includes(stateName.toLowerCase()) ||
//             stateName.toLowerCase().includes(s.toLowerCase())
//           );
//           if (matchedState) setSelectedState(matchedState);
//           else setSelectedState(stateName);
//           return prev;
//         });

//         // City match
//         setTimeout(() => {
//           setDistricts(prev => {
//             const matchedCity = prev.find(c =>
//               c.toLowerCase().includes(cityName.toLowerCase()) ||
//               cityName.toLowerCase().includes(c.toLowerCase())
//             );
//             if (matchedCity) setSelectedDistrict(matchedCity);
//             else setSelectedDistrict(cityName);
//             return prev;
//           });
//         }, 2500);

//       } else {
//         console.log("Invalid pincode");
//       }

//     } catch (err) {
//       console.log("Pincode fetch error:", err);
//     } finally {
//       setLoadingPincode(false);
//     }
//   };

//   fetchPincode();
// }, [pincode]);

//   // ── SEARCH ──
//   const handleSearch = () => {
//     const params = new URLSearchParams();
//     if (productType)      params.set("q",     productType);
//     if (selectedState)    params.set("state",  selectedState);
//     if (selectedDistrict) params.set("city",   selectedDistrict);
//     navigate(`/search?${params.toString()}`);
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">

//       {/* TOP BAR */}
//       <div className="bg-black text-gray-300 text-[10px] sm:text-xs">
//         <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex justify-between items-center">
//           <div className="hidden md:flex items-center gap-4">
//             <FaFacebookF className="hover:text-[#1447E6] cursor-pointer transition" />
//             <FaTwitter className="hover:text-[#1447E6] cursor-pointer transition" />
//             <FaInstagram className="hover:text-[#F54900] cursor-pointer transition" />
//             <FaLinkedinIn className="hover:text-[#1447E6] cursor-pointer transition" />
//           </div>
//           <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8">
//             <span className="flex items-center gap-2">
//               <FaPhoneAlt className="text-[#F54900]" />
//               +91 75052 66931
//             </span>
//             <span className="flex items-center gap-2">
//               <FaEnvelope className="text-[#F54900]" />
//               support@b2bhub.com
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* MAIN NAV */}
//       <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
//         <div className="flex flex-col gap-4">

//           {/* TOP ROW */}
//           <div className="flex items-center justify-between gap-4">

//             {/* LOGO */}
//             <Link to="/" className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-[#F54900] rounded-2xl flex items-center justify-center shadow-md">
//                 <span className="text-white font-black text-2xl">B</span>
//               </div>
//               <div>
//                 <h1 className="text-3xl font-black tracking-tight text-black">
//                   LPI-<span className="text-[#1447E6]">B2B</span>
//                 </h1>
//                 <p className="text-[11px] text-gray-500 -mt-1">Wholesale Marketplace</p>
//               </div>
//             </Link>

//             {/* DESKTOP SEARCH */}
//             <div className="hidden lg:flex relative flex-1 max-w-xl mx-6">
//               <input
//                 type="text"
//                 placeholder="Search products (Steel, Rice, Chemicals...)"
//                 value={productType}
//                 onChange={e => setProductType(e.target.value)}
//                 onKeyDown={e => e.key === "Enter" && handleSearch()}
//                 className="w-full pl-12 pr-5 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:bg-white focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all text-sm outline-none"
//               />
//               <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
//             </div>

//             {/* ACTIONS */}
//             <div className="flex items-center gap-3">
//               {!isSignedIn && (
//                 <>
//                   <Link to="/login" className="hidden sm:flex items-center gap-2 bg-[#1447E6] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm">
//                     <FaUserCircle className="text-lg" /> Login
//                   </Link>
//                   <Link to="/register" className="hidden md:flex items-center gap-2 bg-[#F54900] hover:bg-[#d63f00] text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm shadow-md">
//                     <FaStore /> Start Selling
//                   </Link>
//                 </>
//               )}
//               {isSignedIn && (
//                 <div className="flex items-center gap-4">
//                   <Link to="/seller/dashboard" className="hidden md:flex items-center gap-2 bg-[#F54900] hover:bg-[#d63f00] text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm">
//                     <FaStore /> Dashboard
//                   </Link>
//                   <span className="hidden sm:block text-sm font-medium text-black">
//                     Hi, {user?.firstName || "User"}
//                   </span>
//                 </div>
//               )}
//               <button
//                 className="lg:hidden p-3 text-black hover:bg-gray-100 rounded-xl transition"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* FILTER BAR */}
//           <div className={`${isMenuOpen ? "flex flex-col gap-4" : "hidden"} lg:flex lg:flex-row lg:items-center lg:gap-3 bg-white lg:bg-transparent p-5 lg:p-0 border-t lg:border-none rounded-2xl`}>

//             {/* MOBILE SEARCH */}
//             <div className="relative lg:hidden mb-2">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={productType}
//                 onChange={e => setProductType(e.target.value)}
//                 onKeyDown={e => e.key === "Enter" && handleSearch()}
//                 className="w-full pl-12 pr-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-[#F54900] outline-none"
//               />
//               <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
//             </div>

//             {/* LOCATION SELECTS */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1">

//               {/* PINCODE */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   maxLength={6}
//                   placeholder="Enter Pincode"
//                   value={pincode}
//                   onChange={e => setPincode(e.target.value.replace(/\D/g, ""))}
//                   className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all outline-none"
//                 />
//                 {loadingPincode ? (
//                   <FaSpinner className="absolute left-3 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
//                 ) : (
//                   <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 )}
//               </div>

//               {/* STATE */}
//               <div className="relative">
//                 {(loadingStates || detectingLocation) && (
//                   <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
//                 )}
//                 <select
//                   value={selectedState}
//                   onChange={e => { setSelectedState(e.target.value); setSelectedDistrict(""); }}
//                   disabled={loadingStates || detectingLocation}
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all appearance-none outline-none"
//                 >
//                   <option value="">Select State</option>
//                   {states.map(state => (
//                     <option key={state} value={state}>{state}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* CITY */}
//               <div className="relative">
//                 {loadingDistricts && (
//                   <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
//                 )}
//                 <select
//                   value={selectedDistrict}
//                   onChange={e => setSelectedDistrict(e.target.value)}
//                   disabled={!selectedState || loadingDistricts}
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all appearance-none outline-none"
//                 >
//                   <option value="">Select City</option>
//                   {districts.map(d => (
//                     <option key={d} value={d}>{d}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* INDIA FIXED */}
//               <div className="relative">
//                 <input
//                   value="India"
//                   disabled
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-500 outline-none cursor-not-allowed"
//                 />
//               </div>

//             </div>

//             {/* SEARCH BUTTON */}
//             <button
//               onClick={handleSearch}
//               className="bg-[#F54900] hover:bg-[#d63f00] text-white px-8 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
//             >
//               <FaSearch className="hidden lg:inline" />
//               <span>Search</span>
//             </button>

//             {/* MOBILE LOGIN */}
//             {!isSignedIn && (
//               <Link to="/login" className="sm:hidden mt-2 border-2 border-[#F54900] text-[#F54900] py-3 rounded-2xl font-bold w-full text-center">
//                 Login / Register
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;



// // src/components/Navbar.jsx

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import {
//   FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
//   FaPhoneAlt, FaEnvelope, FaSearch, FaSpinner,
//   FaBars, FaStore, FaTimes, FaUserCircle, FaMapMarkerAlt,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { getSearchSuggestions } from "../api/productApi";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const [states, setStates]       = useState([]);
//   const [districts, setDistricts] = useState([]);

//   const [selectedState,    setSelectedState]    = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [productType,      setProductType]      = useState("");
//   const [pincode,          setPincode]          = useState("");

//   const [loadingStates,    setLoadingStates]    = useState(false);
//   const [loadingDistricts, setLoadingDistricts] = useState(false);
//   const [loadingPincode,   setLoadingPincode]   = useState(false);
//   const [detectingLocation, setDetectingLocation] = useState(true);
//   const [isMenuOpen,       setIsMenuOpen]       = useState(false);

//   const [detected, setDetected] = useState({ region: "", city: "" });

//   // ── SUGGESTIONS STATE ADDED ──
//   const [suggestions,     setSuggestions]     = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [suggestLoading,  setSuggestLoading]  = useState(false);
//   const searchRef    = useRef(null);
//   const debounceRef  = useRef(null);

//   const isSignedIn = false;
//   const user = null;

//   // ── AUTO DETECT LOCATION ──
//   useEffect(() => {
//     const detectLocation = async () => {
//       setDetectingLocation(true);
//       try {
//         const res = await fetch("http://ip-api.com/json/?fields=regionName,city,status");
//         const data = await res.json();
//         if (data.status === "success") {
//           setDetected({ region: data.regionName || "", city: data.city || "" });
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setDetectingLocation(false);
//       }
//     };
//     detectLocation();
//   }, []);

//   // ── LOAD INDIA STATES ──
//   useEffect(() => {
//     if (detectingLocation) return;

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

//         if (detected.region) {
//           const match = stateList.find(n =>
//             n.toLowerCase().includes(detected.region.toLowerCase()) ||
//             detected.region.toLowerCase().includes(n.toLowerCase())
//           );
//           if (match) setSelectedState(match);
//         }
//       })
//       .catch(() => setStates([]))
//       .finally(() => setLoadingStates(false));

//   }, [detectingLocation, detected.region]);

//   // ── LOAD CITIES ──
//   useEffect(() => {
//     if (!selectedState) return;
//     setLoadingDistricts(true);

//     fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ country: "India", state: selectedState }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         const cityList = (data.data || []).sort();
//         setDistricts(cityList);

//         if (detected.city && cityList.length > 0) {
//           const match = cityList.find(n =>
//             n.toLowerCase().includes(detected.city.toLowerCase()) ||
//             detected.city.toLowerCase().includes(n.toLowerCase())
//           );
//           if (match) setSelectedDistrict(match);
//         }
//       })
//       .catch(() => setDistricts([]))
//       .finally(() => setLoadingDistricts(false));

//   }, [selectedState]);

//   // ── PINCODE AUTO FILL ──
//   useEffect(() => {
//     if (pincode.length !== 6) return;

//     const fetchPincode = async () => {
//       setLoadingPincode(true);
//       try {
//         const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//         const data = await res.json();

//         if (data[0]?.Status === "Success") {
//           const place     = data[0].PostOffice[0];
//           const stateName = place.State;
//           const cityName  = place.District;

//           setStates(prev => {
//             const matchedState = prev.find(s =>
//               s.toLowerCase().includes(stateName.toLowerCase()) ||
//               stateName.toLowerCase().includes(s.toLowerCase())
//             );
//             if (matchedState) setSelectedState(matchedState);
//             else setSelectedState(stateName);
//             return prev;
//           });

//           setTimeout(() => {
//             setDistricts(prev => {
//               const matchedCity = prev.find(c =>
//                 c.toLowerCase().includes(cityName.toLowerCase()) ||
//                 cityName.toLowerCase().includes(c.toLowerCase())
//               );
//               if (matchedCity) setSelectedDistrict(matchedCity);
//               else setSelectedDistrict(cityName);
//               return prev;
//             });
//           }, 2500);

//         } else {
//           console.log("Invalid pincode");
//         }

//       } catch (err) {
//         console.log("Pincode fetch error:", err);
//       } finally {
//         setLoadingPincode(false);
//       }
//     };

//     fetchPincode();
//   }, [pincode]);

//   // ── CLICK OUTSIDE SE SUGGESTIONS BAND ──
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ── SUGGESTIONS FETCH — DEBOUNCED ──
//   const handleProductTypeChange = (e) => {
//     const val = e.target.value;
//     setProductType(val);

//     // Clear previous debounce
//     if (debounceRef.current) clearTimeout(debounceRef.current);

//     if (val.trim().length < 2) {
//       setSuggestions([]);
//       setShowSuggestions(false);
//       return;
//     }

//     // 300ms debounce
//     debounceRef.current = setTimeout(async () => {
//       try {
//         setSuggestLoading(true);
//         const data = await getSearchSuggestions(val.trim());
//         if (data.success) {
//           setSuggestions(data.suggestions);
//           setShowSuggestions(data.suggestions.length > 0);
//         }
//       } catch (err) {
//         console.error("Suggestions error:", err);
//       } finally {
//         setSuggestLoading(false);
//       }
//     }, 300);
//   };

//   // ── SUGGESTION CLICK ──
//   const handleSuggestionClick = (suggestion) => {
//     setProductType(suggestion);
//     setShowSuggestions(false);
//     setSuggestions([]);
//     const params = new URLSearchParams();
//     params.set("q", suggestion);
//     if (selectedState)    params.set("state", selectedState);
//     if (selectedDistrict) params.set("city",  selectedDistrict);
//     navigate(`/search?${params.toString()}`);
//   };

//   // ── SEARCH ──
//   const handleSearch = () => {
//     setShowSuggestions(false);
//     const params = new URLSearchParams();
//     if (productType)      params.set("q",     productType);
//     if (selectedState)    params.set("state",  selectedState);
//     if (selectedDistrict) params.set("city",   selectedDistrict);
//     navigate(`/search?${params.toString()}`);
//   };

//   // ── SUGGESTIONS DROPDOWN — reusable ──
//   const SuggestionsDropdown = () => (
//     showSuggestions && suggestions.length > 0 ? (
//       <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
//         {suggestLoading ? (
//           <div className="px-4 py-3 text-sm text-gray-400 flex items-center gap-2">
//             <FaSpinner className="animate-spin text-[#F54900]" /> Searching...
//           </div>
//         ) : (
//           suggestions.map((s, i) => (
//             <button
//               key={i}
//               onMouseDown={() => handleSuggestionClick(s)}
//               className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#F54900] flex items-center gap-3 transition border-b border-gray-50 last:border-none"
//             >
//               <FaSearch className="text-gray-300 text-xs flex-shrink-0" />
//               {s}
//             </button>
//           ))
//         )}
//       </div>
//     ) : null
//   );

//   return (
//     <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">

//       {/* TOP BAR */}
//       <div className="bg-black text-gray-300 text-[10px] sm:text-xs">
//         <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex justify-between items-center">
//           <div className="hidden md:flex items-center gap-4">
//             <FaFacebookF className="hover:text-[#1447E6] cursor-pointer transition" />
//             <FaTwitter className="hover:text-[#1447E6] cursor-pointer transition" />
//             <FaInstagram className="hover:text-[#F54900] cursor-pointer transition" />
//             <FaLinkedinIn className="hover:text-[#1447E6] cursor-pointer transition" />
//           </div>
//           <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8">
//             <span className="flex items-center gap-2">
//               <FaPhoneAlt className="text-[#F54900]" />
//               +91 75052 66931
//             </span>
//             <span className="flex items-center gap-2">
//               <FaEnvelope className="text-[#F54900]" />
//               support@b2bhub.com
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* MAIN NAV */}
//       <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
//         <div className="flex flex-col gap-4">

//           {/* TOP ROW */}
//           <div className="flex items-center justify-between gap-4">

//             {/* LOGO */}
//             <Link to="/" className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-[#F54900] rounded-2xl flex items-center justify-center shadow-md">
//                 <span className="text-white font-black text-2xl">B</span>
//               </div>
//               <div>
//                 <h1 className="text-3xl font-black tracking-tight text-black">
//                   LPI-<span className="text-[#1447E6]">B2B</span>
//                 </h1>
//                 <p className="text-[11px] text-gray-500 -mt-1">Wholesale Marketplace</p>
//               </div>
//             </Link>

//             {/* DESKTOP SEARCH — suggestions wrapper */}
//             <div className="hidden lg:flex relative flex-1 max-w-xl mx-6" ref={searchRef}>
//               <input
//                 type="text"
//                 placeholder="Search products (Steel, Rice, Chemicals...)"
//                 value={productType}
//                 onChange={handleProductTypeChange}
//                 onKeyDown={e => {
//                   if (e.key === "Enter") handleSearch();
//                   if (e.key === "Escape") setShowSuggestions(false);
//                 }}
//                 onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
//                 className="w-full pl-12 pr-5 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:bg-white focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all text-sm outline-none"
//               />
//               <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
//               {/* ✅ SUGGESTIONS DROPDOWN */}
//               <SuggestionsDropdown />
//             </div>

//             {/* ACTIONS */}
//             <div className="flex items-center gap-3">
//               {!isSignedIn && (
//                 <>
//                   <Link to="/login" className="hidden sm:flex items-center gap-2 bg-[#1447E6] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm">
//                     <FaUserCircle className="text-lg" /> Login
//                   </Link>
//                   <Link to="/register" className="hidden md:flex items-center gap-2 bg-[#F54900] hover:bg-[#d63f00] text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm shadow-md">
//                     <FaStore /> Start Selling
//                   </Link>
//                 </>
//               )}
//               {isSignedIn && (
//                 <div className="flex items-center gap-4">
//                   <Link to="/seller/dashboard" className="hidden md:flex items-center gap-2 bg-[#F54900] hover:bg-[#d63f00] text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm">
//                     <FaStore /> Dashboard
//                   </Link>
//                   <span className="hidden sm:block text-sm font-medium text-black">
//                     Hi, {user?.firstName || "User"}
//                   </span>
//                 </div>
//               )}
//               <button
//                 className="lg:hidden p-3 text-black hover:bg-gray-100 rounded-xl transition"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* FILTER BAR */}
//           <div className={`${isMenuOpen ? "flex flex-col gap-4" : "hidden"} lg:flex lg:flex-row lg:items-center lg:gap-3 bg-white lg:bg-transparent p-5 lg:p-0 border-t lg:border-none rounded-2xl`}>

//             {/* MOBILE SEARCH — suggestions wrapper */}
//             <div className="relative lg:hidden mb-2" ref={searchRef}>
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={productType}
//                 onChange={handleProductTypeChange}
//                 onKeyDown={e => {
//                   if (e.key === "Enter") handleSearch();
//                   if (e.key === "Escape") setShowSuggestions(false);
//                 }}
//                 onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
//                 className="w-full pl-12 pr-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-[#F54900] outline-none"
//               />
//               <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
//               {/* ✅ SUGGESTIONS DROPDOWN */}
//               <SuggestionsDropdown />
//             </div>

//             {/* LOCATION SELECTS */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1">

//               {/* PINCODE */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   maxLength={6}
//                   placeholder="Enter Pincode"
//                   value={pincode}
//                   onChange={e => setPincode(e.target.value.replace(/\D/g, ""))}
//                   className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all outline-none"
//                 />
//                 {loadingPincode ? (
//                   <FaSpinner className="absolute left-3 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
//                 ) : (
//                   <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 )}
//               </div>

//               {/* STATE */}
//               <div className="relative">
//                 {(loadingStates || detectingLocation) && (
//                   <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
//                 )}
//                 <select
//                   value={selectedState}
//                   onChange={e => { setSelectedState(e.target.value); setSelectedDistrict(""); }}
//                   disabled={loadingStates || detectingLocation}
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all appearance-none outline-none"
//                 >
//                   <option value="">Select State</option>
//                   {states.map(state => (
//                     <option key={state} value={state}>{state}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* CITY */}
//               <div className="relative">
//                 {loadingDistricts && (
//                   <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
//                 )}
//                 <select
//                   value={selectedDistrict}
//                   onChange={e => setSelectedDistrict(e.target.value)}
//                   disabled={!selectedState || loadingDistricts}
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all appearance-none outline-none"
//                 >
//                   <option value="">Select City</option>
//                   {districts.map(d => (
//                     <option key={d} value={d}>{d}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* INDIA FIXED */}
//               <div className="relative">
//                 <input
//                   value="India"
//                   disabled
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-500 outline-none cursor-not-allowed"
//                 />
//               </div>

//             </div>

//             {/* SEARCH BUTTON */}
//             <button
//               onClick={handleSearch}
//               className="bg-[#F54900] hover:bg-[#d63f00] text-white px-8 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
//             >
//               <FaSearch className="hidden lg:inline" />
//               <span>Search</span>
//             </button>

//             {/* MOBILE LOGIN */}
//             {!isSignedIn && (
//               <Link to="/login" className="sm:hidden mt-2 border-2 border-[#F54900] text-[#F54900] py-3 rounded-2xl font-bold w-full text-center">
//                 Login / Register
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;


//bina loction ke 

// src/components/Navbar.jsx

import React, { useEffect, useState, useRef } from "react";
import {
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
  FaPhoneAlt, FaEnvelope, FaSearch, FaSpinner,
  FaBars, FaStore, FaTimes, FaUserCircle, FaMapMarkerAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getSearchSuggestions } from "../api/productApi";

const Navbar = () => {
  const navigate = useNavigate();

  const [states, setStates]       = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedState,    setSelectedState]    = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [productType,      setProductType]      = useState("");
  const [pincode,          setPincode]          = useState("");

  const [loadingStates,    setLoadingStates]    = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingPincode,   setLoadingPincode]   = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(true);
  const [isMenuOpen,       setIsMenuOpen]       = useState(false);

  const [detected, setDetected] = useState({ region: "", city: "" });

  // ── SUGGESTIONS STATE ──
  const [suggestions,       setSuggestions]       = useState([]);
  const [showSuggestions,   setShowSuggestions]   = useState(false);
  const [suggestLoading,    setSuggestLoading]    = useState(false);

  // ── LOCATION FILTER VISIBILITY ──
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  const searchRef   = useRef(null);
  const debounceRef = useRef(null);

  const isSignedIn = false;
  const user = null;

  // ── AUTO DETECT LOCATION ──
  useEffect(() => {
    const detectLocation = async () => {
      setDetectingLocation(true);
      try {
        const res  = await fetch("http://ip-api.com/json/?fields=regionName,city,status");
        const data = await res.json();
        if (data.status === "success") {
          setDetected({ region: data.regionName || "", city: data.city || "" });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setDetectingLocation(false);
      }
    };
    detectLocation();
  }, []);

  // ── LOAD INDIA STATES ──
  useEffect(() => {
    if (detectingLocation) return;

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
        if (detected.region) {
          const match = stateList.find(n =>
            n.toLowerCase().includes(detected.region.toLowerCase()) ||
            detected.region.toLowerCase().includes(n.toLowerCase())
          );
          if (match) setSelectedState(match);
        }
      })
      .catch(() => setStates([]))
      .finally(() => setLoadingStates(false));
  }, [detectingLocation, detected.region]);

  // ── LOAD CITIES ──
  useEffect(() => {
    if (!selectedState) return;
    setLoadingDistricts(true);

    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India", state: selectedState }),
    })
      .then(res => res.json())
      .then(data => {
        const cityList = (data.data || []).sort();
        setDistricts(cityList);
        if (detected.city && cityList.length > 0) {
          const match = cityList.find(n =>
            n.toLowerCase().includes(detected.city.toLowerCase()) ||
            detected.city.toLowerCase().includes(n.toLowerCase())
          );
          if (match) setSelectedDistrict(match);
        }
      })
      .catch(() => setDistricts([]))
      .finally(() => setLoadingDistricts(false));
  }, [selectedState]);

  // ── PINCODE AUTO FILL ──
  useEffect(() => {
    if (pincode.length !== 6) return;

    const fetchPincode = async () => {
      setLoadingPincode(true);
      try {
        const res  = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await res.json();

        if (data[0]?.Status === "Success") {
          const place     = data[0].PostOffice[0];
          const stateName = place.State;
          const cityName  = place.District;

          setStates(prev => {
            const matchedState = prev.find(s =>
              s.toLowerCase().includes(stateName.toLowerCase()) ||
              stateName.toLowerCase().includes(s.toLowerCase())
            );
            if (matchedState) setSelectedState(matchedState);
            else setSelectedState(stateName);
            return prev;
          });

          setTimeout(() => {
            setDistricts(prev => {
              const matchedCity = prev.find(c =>
                c.toLowerCase().includes(cityName.toLowerCase()) ||
                cityName.toLowerCase().includes(c.toLowerCase())
              );
              if (matchedCity) setSelectedDistrict(matchedCity);
              else setSelectedDistrict(cityName);
              return prev;
            });
          }, 2500);
        } else {
          console.log("Invalid pincode");
        }
      } catch (err) {
        console.log("Pincode fetch error:", err);
      } finally {
        setLoadingPincode(false);
      }
    };

    fetchPincode();
  }, [pincode]);

  // ── CLICK OUTSIDE SE SUGGESTIONS BAND ──
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── SUGGESTIONS FETCH — DEBOUNCED ──
  const handleProductTypeChange = (e) => {
    const val = e.target.value;
    setProductType(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setSuggestLoading(true);
        const data = await getSearchSuggestions(val.trim());
        if (data.success) {
          setSuggestions(data.suggestions);
          setShowSuggestions(data.suggestions.length > 0);
        }
      } catch (err) {
        console.error("Suggestions error:", err);
      } finally {
        setSuggestLoading(false);
      }
    }, 300);
  };

  // ── SUGGESTION CLICK ──
  const handleSuggestionClick = (suggestion) => {
    setProductType(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    // ✅ Location filter show karo
    setShowLocationFilter(true);
    const params = new URLSearchParams();
    params.set("q", suggestion);
    if (selectedState)    params.set("state", selectedState);
    if (selectedDistrict) params.set("city",  selectedDistrict);
    navigate(`/search?${params.toString()}`);
  };

  // ── SEARCH ──
  const handleSearch = () => {
    setShowSuggestions(false);
    // ✅ Location filter show karo
    setShowLocationFilter(true);
    const params = new URLSearchParams();
    if (productType)      params.set("q",    productType);
    if (selectedState)    params.set("state", selectedState);
    if (selectedDistrict) params.set("city",  selectedDistrict);
    navigate(`/search?${params.toString()}`);
  };

  // ── SUGGESTIONS DROPDOWN ──
  const SuggestionsDropdown = () => (
    showSuggestions && suggestions.length > 0 ? (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
        {suggestLoading ? (
          <div className="px-4 py-3 text-sm text-gray-400 flex items-center gap-2">
            <FaSpinner className="animate-spin text-[#F54900]" /> Searching...
          </div>
        ) : (
          suggestions.map((s, i) => (
            <button
              key={i}
              onMouseDown={() => handleSuggestionClick(s)}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#F54900] flex items-center gap-3 transition border-b border-gray-50 last:border-none"
            >
              <FaSearch className="text-gray-300 text-xs flex-shrink-0" />
              {s}
            </button>
          ))
        )}
      </div>
    ) : null
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">

      {/* TOP BAR */}
      <div className="bg-black text-gray-300 text-[10px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-4">
            <FaFacebookF className="hover:text-[#1447E6] cursor-pointer transition" />
            <FaTwitter className="hover:text-[#1447E6] cursor-pointer transition" />
            <FaInstagram className="hover:text-[#F54900] cursor-pointer transition" />
            <FaLinkedinIn className="hover:text-[#1447E6] cursor-pointer transition" />
          </div>
          <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8">
            <span className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#F54900]" />
              +91 75052 66931
            </span>
            <span className="flex items-center gap-2">
              <FaEnvelope className="text-[#F54900]" />
              support@b2bhub.com
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <div className="flex flex-col gap-4">

          {/* TOP ROW — Logo + Search + Search Button + Login/Register */}
          <div className="flex items-center justify-between gap-4">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F54900] rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-2xl">B</span>
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-black">
                  LPI-<span className="text-[#1447E6]">B2B</span>
                </h1>
                <p className="text-[11px] text-gray-500 -mt-1">Wholesale Marketplace</p>
              </div>
            </Link>

            {/* DESKTOP SEARCH + BUTTON — ek saath top row mein */}
            <div className="hidden lg:flex items-center gap-3 flex-1 max-w-2xl mx-6">
              {/* SEARCH INPUT */}
              <div className="relative flex-1" ref={searchRef}>
                <input
                  type="text"
                  placeholder="Search products (Steel, Rice, Chemicals...)"
                  value={productType}
                  onChange={handleProductTypeChange}
                  onKeyDown={e => {
                    if (e.key === "Enter") handleSearch();
                    if (e.key === "Escape") setShowSuggestions(false);
                  }}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  className="w-full pl-12 pr-5 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:bg-white focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all text-sm outline-none"
                />
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                {/* SUGGESTIONS */}
                <SuggestionsDropdown />
              </div>

              {/* ✅ SEARCH BUTTON — top row mein move kiya */}
              <button
                onClick={handleSearch}
                className="bg-[#F54900] hover:bg-[#d63f00] text-white px-8 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <FaSearch />
                <span>Search</span>
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              {!isSignedIn && (
                <>
                  <Link to="/login" className="hidden sm:flex items-center gap-2 bg-[#1447E6] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm">
                    <FaUserCircle className="text-lg" /> Login
                  </Link>
                  <Link to="/register" className="hidden md:flex items-center gap-2 bg-[#F54900] hover:bg-[#d63f00] text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm shadow-md">
                    <FaStore /> Start Selling
                  </Link>
                </>
              )}
              {isSignedIn && (
                <div className="flex items-center gap-4">
                  <Link to="/seller/dashboard" className="hidden md:flex items-center gap-2 bg-[#F54900] hover:bg-[#d63f00] text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm">
                    <FaStore /> Dashboard
                  </Link>
                  <span className="hidden sm:block text-sm font-medium text-black">
                    Hi, {user?.firstName || "User"}
                  </span>
                </div>
              )}
              <button
                className="lg:hidden p-3 text-black hover:bg-gray-100 rounded-xl transition"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* ✅ LOCATION FILTER BAR — desktop pe sirf search ke baad dikhega */}
          {/* Mobile pe — isMenuOpen se control hoga (same as before) */}

          {/* MOBILE FILTER BAR */}
          <div className={`${isMenuOpen ? "flex flex-col gap-4" : "hidden"} lg:hidden bg-white p-5 border-t rounded-2xl`}>

            {/* MOBILE SEARCH */}
            <div className="relative mb-2" ref={searchRef}>
              <input
                type="text"
                placeholder="Search products..."
                value={productType}
                onChange={handleProductTypeChange}
                onKeyDown={e => {
                  if (e.key === "Enter") handleSearch();
                  if (e.key === "Escape") setShowSuggestions(false);
                }}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                className="w-full pl-12 pr-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-[#F54900] outline-none"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <SuggestionsDropdown />
            </div>

            {/* MOBILE LOCATION SELECTS */}
            <div className="grid grid-cols-1 gap-3">
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] outline-none"
                />
                {loadingPincode ? (
                  <FaSpinner className="absolute left-3 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
                ) : (
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                )}
              </div>

              <div className="relative">
                {(loadingStates || detectingLocation) && (
                  <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
                )}
                <select
                  value={selectedState}
                  onChange={e => { setSelectedState(e.target.value); setSelectedDistrict(""); }}
                  disabled={loadingStates || detectingLocation}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] appearance-none outline-none"
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                {loadingDistricts && (
                  <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
                )}
                <select
                  value={selectedDistrict}
                  onChange={e => setSelectedDistrict(e.target.value)}
                  disabled={!selectedState || loadingDistricts}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] appearance-none outline-none"
                >
                  <option value="">Select City</option>
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* MOBILE SEARCH BUTTON */}
            <button
              onClick={handleSearch}
              className="bg-[#F54900] hover:bg-[#d63f00] text-white px-8 py-3 rounded-2xl font-semibold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <FaSearch />
              <span>Search</span>
            </button>

            {/* MOBILE LOGIN */}
            {!isSignedIn && (
              <Link to="/login" className="sm:hidden mt-2 border-2 border-[#F54900] text-[#F54900] py-3 rounded-2xl font-bold w-full text-center">
                Login / Register
              </Link>
            )}
          </div>

          {/* ✅ DESKTOP LOCATION FILTER — sirf showLocationFilter true hone par */}
          {showLocationFilter && (
            <div className="hidden lg:flex items-center gap-3 animate-fadeIn">

              {/* PINCODE */}
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all outline-none"
                />
                {loadingPincode ? (
                  <FaSpinner className="absolute left-3 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
                ) : (
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                )}
              </div>

              {/* STATE */}
              <div className="relative flex-1">
                {(loadingStates || detectingLocation) && (
                  <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
                )}
                <select
                  value={selectedState}
                  onChange={e => { setSelectedState(e.target.value); setSelectedDistrict(""); }}
                  disabled={loadingStates || detectingLocation}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all appearance-none outline-none"
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* CITY */}
              <div className="relative flex-1">
                {loadingDistricts && (
                  <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
                )}
                <select
                  value={selectedDistrict}
                  onChange={e => setSelectedDistrict(e.target.value)}
                  disabled={!selectedState || loadingDistricts}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all appearance-none outline-none"
                >
                  <option value="">Select City</option>
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* INDIA FIXED */}
              <div className="relative">
                <input
                  value="India"
                  disabled
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-500 outline-none cursor-not-allowed"
                />
              </div>

              {/* CLOSE FILTER */}
              <button
                onClick={() => setShowLocationFilter(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition flex-shrink-0"
                title="Hide filters"
              >
                <FaTimes />
              </button>

            </div>
          )}

        </div>
      </nav>
    </header>
  );
};

export default Navbar;