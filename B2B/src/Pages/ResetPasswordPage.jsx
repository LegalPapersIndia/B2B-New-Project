// src/pages/ResetPasswordPage.jsx

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { resetPasswordApi } from "../api/sellerAuthApi";

const ResetPasswordPage = () => {
  const navigate              = useNavigate();
  const location              = useLocation();

  // FORGOT PAGE SE EMAIL AAYA
  const emailFromState        = location.state?.email || "";

  const [email, setEmail]                 = useState(emailFromState);
  const [otp, setOtp]                     = useState("");
  const [newPassword, setNewPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [loading, setLoading]             = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      const { data } = await resetPasswordApi({
        email:       email.trim(),
        otp:         otp.trim(),
        newPassword,
      });

      toast.success(data.message || "Password reset successfully");
      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white flex items-center justify-center px-4 py-6 overflow-hidden">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-[36px] overflow-hidden shadow-2xl border border-gray-100">

        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex flex-col justify-center bg-blue-900 text-white px-14 py-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="w-16 h-16 rounded-3xl bg-orange-600 flex items-center justify-center mb-6 shadow-2xl">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl font-bold leading-tight mb-5">
              Create New
              <span className="text-orange-400"> Password</span>
            </h1>

            <p className="text-blue-100 leading-relaxed max-w-md">
              Enter the OTP sent to your email and set a new strong password for your account.
            </p>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* HEADER */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-3">
                Reset Password
              </div>

              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                Set New
                <span className="text-blue-800"> Password</span>
              </h2>

              <p className="mt-2 text-slate-600">
                Enter your email, OTP and new password below.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Registered Email Address"
                  required
                  className="w-full h-13 pl-14 pr-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
                />
              </div>

              {/* OTP */}
              <div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  required
                  maxLength={6}
                  className="w-full h-13 px-5 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all text-center text-2xl font-bold tracking-[0.5em] text-slate-800"
                />
              </div>

              {/* NEW PASSWORD */}
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  required
                  className="w-full h-13 pl-14 pr-14 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  required
                  className="w-full h-13 pl-14 pr-14 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {/* PASSWORD MATCH INDICATOR */}
              {confirmPassword && (
                <p className={`text-sm font-medium ${newPassword === confirmPassword ? "text-green-600" : "text-red-500"}`}>
                  {newPassword === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}

              {/* SUBMIT */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-blue-800 transition-all duration-300 text-white h-13 rounded-2xl font-semibold shadow-md hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? "Resetting..." : "Reset Password"}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </motion.button>

            </form>

            {/* BACK TO LOGIN */}
            <p className="text-center text-gray-500 mt-6">
              Remember your password?{" "}
              <Link to="/login" className="text-orange-600 font-semibold">
                Login
              </Link>
            </p>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;