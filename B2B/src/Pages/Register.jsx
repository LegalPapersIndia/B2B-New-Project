


// // import React, { useState,  useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import toast from "react-hot-toast";


// // import { registerSeller } from "../api/sellerAuthApi";

// // import {
// //   User,
// //   Mail,
// //   Phone,
// //   Lock,
// //   Eye,
// //   EyeOff,
// //   ArrowRight,
// //   ShieldCheck,
// // } from "lucide-react";

// // const Register = () => {
// //   const navigate = useNavigate();

// //   useEffect(() => {

// //   const token = localStorage.getItem("token");

// //   if (token) {
// //     navigate("/seller/dashboard");
// //   }

// // }, []);

// //   const [showPassword, setShowPassword] = useState(false);

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //   });

// //   // HANDLE INPUT CHANGE
// //   const handleChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   // HANDLE REGISTER
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const { data } = await registerSeller(formData);

// //       toast.success(
// //         data.message || "Account Created Successfully"
// //       );

// //       // REDIRECT TO LOGIN
// //       navigate("/login");

// //     } catch (error) {
// //       console.log(error);

// //       toast.error(
// //         error.response?.data?.message ||
// //           "Registration Failed"
// //       );
// //     }
// //   };

// //   // GOOGLE SIGNUP
// //   const handleGoogleSignup = () => {
// //     toast("Google Signup Coming Soon");
// //   };

// //   return (
// //     <section className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white flex items-center justify-center px-4 py-6 overflow-hidden">

// //       <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-[36px] overflow-hidden shadow-2xl border border-gray-100">

// //         {/* LEFT SIDE */}
// //         <div className="relative hidden lg:flex flex-col justify-center bg-blue-900 text-white px-14 py-10 overflow-hidden">

// //           {/* BLUR */}
// //           <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>

// //           <motion.div
// //             initial={{ opacity: 0, x: -40 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="relative z-10"
// //           >

// //             <div className="w-16 h-16 rounded-3xl bg-orange-600 flex items-center justify-center mb-6 shadow-2xl">
// //               <ShieldCheck className="w-8 h-8 text-white" />
// //             </div>

// //             <h1 className="text-4xl font-bold leading-tight mb-5">
// //               Join The Future Of
// //               <span className="text-orange-400">
// //                 {" "}B2B Trade
// //               </span>
// //             </h1>

// //             <p className="text-blue-100 leading-relaxed max-w-md">
// //               Connect with verified suppliers, manufacturers,
// //               exporters, wholesalers, and buyers across India
// //               through our trusted marketplace platform.
// //             </p>

// //             {/* FEATURES */}
// //             <div className="mt-8 space-y-4">

// //               {[
// //                 "Verified Buyers & Suppliers",
// //                 "Secure Marketplace Platform",
// //                 "Get Multiple Quotations",
// //                 "Grow Your Business Faster",
// //               ].map((item, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex items-center gap-3"
// //                 >
// //                   <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-sm">
// //                     ✓
// //                   </div>

// //                   <p className="text-blue-50 text-sm">
// //                     {item}
// //                   </p>
// //                 </div>
// //               ))}

// //             </div>
// //           </motion.div>
// //         </div>

// //         {/* RIGHT SIDE */}
// //         <div className="p-8 md:p-10 lg:p-12">

// //           <motion.div
// //             initial={{ opacity: 0, y: 35 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //           >

// //             {/* TOP */}
// //             <div className="mb-8">

// //               <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-3">
// //                 Create Account
// //               </div>

// //               <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
// //                 Register Your
// //                 <span className="text-blue-800">
// //                   {" "}Account
// //                 </span>
// //               </h2>

// //               <p className="mt-2 text-slate-600">
// //                 Start buying and selling with trusted businesses.
// //               </p>
// //             </div>

// //             {/* FORM */}
// //             <form
// //               onSubmit={handleSubmit}
// //               className="space-y-4"
// //             >

// //               {/* NAME */}
// //               <div className="relative">

// //                 <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

// //                 <input
// //                   type="text"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                   placeholder="Full Name"
// //                   required
// //                   className="w-full h-13 pl-14 pr-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
// //                 />
// //               </div>

// //               {/* EMAIL */}
// //               <div className="relative">

// //                 <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   placeholder="Email Address"
// //                   required
// //                   className="w-full h-13 pl-14 pr-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
// //                 />
// //               </div>

// //               {/* PHONE */}
// //               <div className="relative">

// //                 <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

// //                 <input
// //                   type="text"
// //                   name="phone"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   placeholder="Phone Number"
// //                   required
// //                   className="w-full h-13 pl-14 pr-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
// //                 />
// //               </div>

// //               {/* PASSWORD */}
// //               <div className="relative">

// //                 <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   name="password"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   placeholder="Password"
// //                   required
// //                   className="w-full h-13 pl-14 pr-14 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
// //                 />

// //                 <button
// //                   type="button"
// //                   onClick={() =>
// //                     setShowPassword(!showPassword)
// //                   }
// //                   className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
// //                 >
// //                   {showPassword ? (
// //                     <EyeOff className="w-5 h-5" />
// //                   ) : (
// //                     <Eye className="w-5 h-5" />
// //                   )}
// //                 </button>
// //               </div>

// //               {/* BUTTON */}
// //               <motion.button
// //                 whileHover={{ y: -2 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 type="submit"
// //                 className="w-full bg-orange-600 hover:bg-blue-800 transition-all duration-300 text-white h-13 rounded-2xl font-semibold shadow-md hover:shadow-xl flex items-center justify-center gap-2"
// //               >
// //                 Create Account

// //                 <ArrowRight className="w-5 h-5" />
// //               </motion.button>

// //             </form>

// //             {/* DIVIDER */}
// //             <div className="relative my-6">

// //               <div className="border-t border-gray-200"></div>

// //               <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-sm text-gray-400">
// //                 OR
// //               </span>
// //             </div>

// //             {/* GOOGLE BUTTON */}
// //             {/* <motion.button
// //               whileHover={{ y: -2 }}
// //               whileTap={{ scale: 0.98 }}
// //               onClick={handleGoogleSignup}
// //               className="w-full border border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50 transition-all duration-300 py-3 rounded-2xl flex items-center justify-center gap-3 font-medium shadow-sm hover:shadow-md"
// //             >

// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 viewBox="0 0 48 48"
// //                 className="w-5 h-5"
// //               >
// //                 <path
// //                   fill="#FFC107"
// //                   d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.239 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
// //                 />
// //               </svg>

// //               Continue with Google
// //             </motion.button> */}

// //             {/* LOGIN */}
// //             <p className="text-center text-gray-500 mt-6">
// //               Already have an account?{" "}

// //               <Link
// //                 to="/login"
// //                 className="text-orange-600 hover:text-blue-800 font-semibold transition"
// //               >
// //                 Login
// //               </Link>
// //             </p>

// //           </motion.div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Register;




// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";

// import { sendRegistrationOtp, verifyAndRegister } from "../api/sellerAuthApi";

// import {
//   User, Mail, Phone, Lock,
//   Eye, EyeOff, ArrowRight,
//   ShieldCheck, KeyRound, RefreshCw,
// } from "lucide-react";

// // ─────────────────────────────────────────
// // CAPTCHA GENERATOR
// // ─────────────────────────────────────────
// const generateCaptcha = () => {
//   const a = Math.floor(Math.random() * 9) + 1;
//   const b = Math.floor(Math.random() * 9) + 1;
//   return { a, b, answer: a + b };
// };

// const Register = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) navigate("/seller/dashboard");
//   }, []);

//   const [showPassword, setShowPassword] = useState(false);
//   const [step, setStep]                 = useState(1); // 1=form, 2=otp
//   const [loading, setLoading]           = useState(false);

//   // OTP STEP
//   const [otp, setOtp]         = useState("");
//   const [phone, setPhone]     = useState(""); // verify ke liye store

//   // CAPTCHA
//   const [captcha, setCaptcha]           = useState(generateCaptcha());
//   const [captchaInput, setCaptchaInput] = useState("");

//   const refreshCaptcha = () => {
//     setCaptcha(generateCaptcha());
//     setCaptchaInput("");
//   };

//   const [formData, setFormData] = useState({
//     name: "", email: "", phone: "", password: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // ─────────────────────────────────────────
//   // STEP 1 — SEND OTP
//   // ─────────────────────────────────────────
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // CAPTCHA CHECK
//     if (parseInt(captchaInput) !== captcha.answer) {
//       toast.error("Incorrect captcha answer!");
//       refreshCaptcha();
//       return;
//     }

//     // PHONE VALIDATION
//     const phoneRegex = /^[6-9]\d{9}$/;
//     if (!phoneRegex.test(formData.phone)) {
//       toast.error("Invalid phone number. Must be 10 digits starting with 6-9");
//       return;
//     }

//     // EMAIL VALIDATION
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast.error("Invalid email format");
//       return;
//     }

//     try {
//       setLoading(true);
//       const { data } = await sendRegistrationOtp(formData);
//       setPhone(formData.phone);
//       toast.success(data.message || "OTP sent to your mobile number!");
//       setStep(2);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration Failed");
//       refreshCaptcha();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────
//   // STEP 2 — VERIFY OTP
//   // ─────────────────────────────────────────
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();

//     if (otp.length !== 6) {
//       toast.error("Please enter 6 digit OTP");
//       return;
//     }

//     try {
//       setLoading(true);
//       const { data } = await verifyAndRegister({ phone, otp });
//       toast.success(data.message || "Registration successful!");
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────
//   return (
//     <section className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white flex items-center justify-center px-4 py-6 overflow-hidden">

//       <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-[36px] overflow-hidden shadow-2xl border border-gray-100">

//         {/* LEFT SIDE */}
//         <div className="relative hidden lg:flex flex-col justify-center bg-blue-900 text-white px-14 py-10 overflow-hidden">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />

//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="relative z-10"
//           >
//             <div className="w-16 h-16 rounded-3xl bg-orange-600 flex items-center justify-center mb-6 shadow-2xl">
//               <ShieldCheck className="w-8 h-8 text-white" />
//             </div>

//             <h1 className="text-4xl font-bold leading-tight mb-5">
//               Join The Future Of
//               <span className="text-orange-400"> B2B Trade</span>
//             </h1>

//             <p className="text-blue-100 leading-relaxed max-w-md">
//               Connect with verified suppliers, manufacturers,
//               exporters, wholesalers, and buyers across India
//               through our trusted marketplace platform.
//             </p>

//             <div className="mt-8 space-y-4">
//               {[
//                 "Verified Buyers & Suppliers",
//                 "Secure Marketplace Platform",
//                 "Get Multiple Quotations",
//                 "Grow Your Business Faster",
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center gap-3">
//                   <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-sm">✓</div>
//                   <p className="text-blue-50 text-sm">{item}</p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="p-8 md:p-10 lg:p-12">
//           <motion.div
//             initial={{ opacity: 0, y: 35 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >

//             {/* ─────────────────────────────────
//                 STEP 1 — REGISTRATION FORM
//             ───────────────────────────────── */}
//             {step === 1 && (
//               <>
//                 <div className="mb-8">
//                   <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-3">
//                     Create Account
//                   </div>
//                   <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//                     Register Your
//                     <span className="text-blue-800"> Account</span>
//                   </h2>
//                   <p className="mt-2 text-slate-600">
//                     Start buying and selling with trusted businesses.
//                   </p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-4">

//                   {/* NAME */}
//                   <div className="relative">
//                     <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text" name="name"
//                       value={formData.name} onChange={handleChange}
//                       placeholder="Full Name" required
//                       className="w-full h-13 pl-14 pr-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
//                     />
//                   </div>

//                   {/* EMAIL */}
//                   <div className="relative">
//                     <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="email" name="email"
//                       value={formData.email} onChange={handleChange}
//                       placeholder="Email Address" required
//                       className="w-full h-13 pl-14 pr-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
//                     />
//                   </div>

//                   {/* PHONE */}
//                   <div className="relative">
//                     <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text" name="phone"
//                       value={formData.phone} onChange={handleChange}
//                       placeholder="Phone Number (10 digits)"
//                       maxLength={10} required
//                       className="w-full h-13 pl-14 pr-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
//                     />
//                   </div>

//                   {/* PASSWORD */}
//                   <div className="relative">
//                     <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password} onChange={handleChange}
//                       placeholder="Password" required
//                       className="w-full h-13 pl-14 pr-14 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
//                     >
//                       {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                   </div>

//                   {/* CAPTCHA */}
//                   <div className="rounded-2xl border border-gray-200 px-5 py-4 flex items-center gap-4">
//                     <div className="flex-1">
//                       <p className="text-xs text-gray-400 mb-1">Solve to verify</p>
//                       <div className="flex items-center gap-3">
//                         <span className="text-xl font-bold text-slate-800 bg-gray-100 px-4 py-2 rounded-xl tracking-widest select-none">
//                           {captcha.a} + {captcha.b} = ?
//                         </span>
//                         <button
//                           type="button"
//                           onClick={refreshCaptcha}
//                           className="text-gray-400 hover:text-orange-500 transition"
//                         >
//                           <RefreshCw className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                     <input
//                       type="number"
//                       value={captchaInput}
//                       onChange={(e) => setCaptchaInput(e.target.value)}
//                       placeholder="Answer"
//                       required
//                       className="w-24 h-11 text-center rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none text-lg font-bold transition-all"
//                     />
//                   </div>

//                   {/* SUBMIT */}
//                   <motion.button
//                     whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
//                     type="submit" disabled={loading}
//                     className="w-full bg-orange-600 hover:bg-blue-800 transition-all duration-300 text-white h-13 rounded-2xl font-semibold shadow-md hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
//                   >
//                     {loading ? "Sending OTP..." : "Send OTP"}
//                     <ArrowRight className="w-5 h-5" />
//                   </motion.button>

//                 </form>

//                 <div className="relative my-6">
//                   <div className="border-t border-gray-200" />
//                   <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-sm text-gray-400">OR</span>
//                 </div>

//                 <p className="text-center text-gray-500">
//                   Already have an account?{" "}
//                   <Link to="/login" className="text-orange-600 hover:text-blue-800 font-semibold transition">
//                     Login
//                   </Link>
//                 </p>
//               </>
//             )}

//             {/* ─────────────────────────────────
//                 STEP 2 — OTP VERIFY
//             ───────────────────────────────── */}
//             {step === 2 && (
//               <>
//                 <div className="mb-8">
//                   <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-3">
//                     Verify Phone
//                   </div>
//                   <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
//                     Enter <span className="text-blue-800">OTP</span>
//                   </h2>
//                   <p className="mt-2 text-slate-600">
//                     6-digit OTP sent to <strong>{phone}</strong>
//                   </p>
//                 </div>

//                 <form onSubmit={handleVerifyOtp} className="space-y-4">

//                   {/* OTP INPUT */}
//                   <div className="relative">
//                     <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//                       placeholder="Enter 6-digit OTP"
//                       maxLength={6} required
//                       className="w-full h-13 pl-14 pr-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all text-center text-2xl tracking-widest font-bold"
//                     />
//                   </div>

//                   {/* VERIFY BUTTON */}
//                   <motion.button
//                     whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
//                     type="submit" disabled={loading}
//                     className="w-full bg-orange-600 hover:bg-blue-800 transition-all duration-300 text-white h-13 rounded-2xl font-semibold shadow-md hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
//                   >
//                     {loading ? "Verifying..." : "Verify & Register"}
//                     <ArrowRight className="w-5 h-5" />
//                   </motion.button>

//                   {/* BACK */}
//                   <button
//                     type="button"
//                     onClick={() => { setStep(1); refreshCaptcha(); }}
//                     className="w-full text-center text-gray-400 hover:text-gray-600 text-sm transition"
//                   >
//                     ← Back to Registration
//                   </button>

//                 </form>
//               </>
//             )}

//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Register;





import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { sendOtp, verifyRegister } from "../api/sellerAuthApi";

import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/seller/dashboard");
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep]                 = useState(1);
  const [otp, setOtp]                   = useState("");
  const [loading, setLoading]           = useState(false);

  // ── CAPTCHA STATE ──
  const [captchaNum1,   setCaptchaNum1]   = useState(() => Math.floor(Math.random() * 9) + 1);
  const [captchaNum2,   setCaptchaNum2]   = useState(() => Math.floor(Math.random() * 9) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  // ── RESEND OTP STATE ──
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend,   setCanResend]   = useState(false);

  const [formData, setFormData] = useState({
    name:     "",
    email:    "",
    phone:    "",
    password: "",
  });

  // ── RESEND TIMER ──
  useEffect(() => {
    if (step !== 2) return;
    setResendTimer(60);
    setCanResend(false);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  // ── HANDLE INPUT CHANGE ──
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── STEP 1 — SEND OTP ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number. Must be 10 digits starting with 6-9");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (parseInt(captchaAnswer) !== captchaNum1 + captchaNum2) {
      toast.error("Wrong captcha answer. Please try again.");
      setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
      setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
      setCaptchaAnswer("");
      return;
    }

    try {
      setLoading(true);
      await sendOtp(formData);
      toast.success("OTP sent to your mobile number!");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  // ── STEP 2 — VERIFY OTP ──
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);
      const { data } = await verifyRegister({ phone: formData.phone, otp });
      localStorage.setItem("token",  data.token);
      localStorage.setItem("seller", JSON.stringify(data.seller));
      toast.success("Registration successful! Welcome to LPI-B2B 🎉");
      navigate("/seller/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ── RESEND OTP ──
  const handleResendOtp = async () => {
    if (!canResend) return;
    try {
      setLoading(true);
      await sendOtp(formData);
      toast.success("OTP resent to your mobile number!");
      setResendTimer(60);
      setCanResend(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">

        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex flex-col justify-center bg-blue-900 text-white px-10 py-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center mb-5 shadow-xl">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>

            <h1 className="text-3xl font-bold leading-tight mb-4">
              Join The Future Of
              <span className="text-orange-400"> B2B Trade</span>
            </h1>

            <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
              Connect with verified suppliers, manufacturers,
              exporters, wholesalers, and buyers across India.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Verified Buyers & Suppliers",
                "Secure Marketplace Platform",
                "Get Multiple Quotations",
                "Grow Your Business Faster",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-xs flex-shrink-0">✓</div>
                  <p className="text-blue-50 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* ─────────────────────────────
                STEP 1 — REGISTRATION FORM
            ───────────────────────────── */}
            {step === 1 && (
              <>
                <div className="mb-5">
                  <p className="text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
                    Create Account
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Register Your
                    <span className="text-blue-800"> Account</span>
                  </h2>
                  <p className="mt-1 text-slate-500 text-sm">
                    Start buying and selling with trusted businesses.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">

                  {/* NAME */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                      className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all text-sm"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all text-sm"
                    />
                  </div>

                  {/* PHONE */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number (10 digits)"
                      maxLength={10}
                      required
                      className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all text-sm"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                      className="w-full h-11 pl-11 pr-11 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* CAPTCHA */}
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                    <span className="text-slate-700 font-bold text-base whitespace-nowrap">
                      {captchaNum1} + {captchaNum2} = ?
                    </span>
                    <input
                      type="text"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value.replace(/\D/g, ""))}
                      placeholder="Answer"
                      maxLength={2}
                      required
                      className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-center font-bold text-slate-800 focus:border-orange-500 focus:outline-none transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
                        setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
                        setCaptchaAnswer("");
                      }}
                      className="text-gray-400 hover:text-orange-500 transition text-xs font-medium whitespace-nowrap"
                    >
                      🔄 New
                    </button>
                  </div>

                  {/* SUBMIT */}
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-blue-800 transition-all duration-300 text-white h-11 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 disabled:opacity-60 text-sm"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                </form>

                <p className="text-center text-gray-500 text-sm mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-orange-600 hover:text-blue-800 font-semibold transition">
                    Login
                  </Link>
                </p>
              </>
            )}

            {/* ─────────────────────────────
                STEP 2 — OTP VERIFY
            ───────────────────────────── */}
            {step === 2 && (
              <>
                <div className="mb-5">
                  <p className="text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
                    Verify Phone
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Enter
                    <span className="text-blue-800"> OTP</span>
                  </h2>
                  <p className="mt-1 text-slate-500 text-sm">
                    6-digit OTP sent to <strong>{formData.phone}</strong>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-3">

                  {/* OTP INPUT */}
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      required
                      className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all text-center text-xl tracking-widest font-bold text-sm"
                    />
                  </div>

                  {/* VERIFY BUTTON */}
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-blue-800 transition-all duration-300 text-white h-11 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 disabled:opacity-60 text-sm"
                  >
                    {loading ? "Verifying..." : "Verify & Register"}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  {/* BACK */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-center text-gray-400 hover:text-gray-600 text-sm transition"
                  >
                    ← Back to Registration
                  </button>

                  {/* RESEND OTP */}
                  <div className="text-center">
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="text-orange-600 hover:text-blue-800 font-semibold text-sm transition"
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        Resend OTP in <span className="font-bold text-slate-600">{resendTimer}s</span>
                      </p>
                    )}
                  </div>

                </form>
              </>
            )}

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Register;