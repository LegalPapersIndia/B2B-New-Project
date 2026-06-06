// src/pages/ForgotPasswordPage.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { forgotPasswordApi } from "../api/sellerAuthApi";

const ForgotPasswordPage = () => {
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await forgotPasswordApi(email);
      toast.success(data.message || "OTP sent to your email");
      // EMAIL AUR NAVIGATE RESET PAGE PE
      navigate("/reset-password", { state: { email } });
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
              Reset Your
              <span className="text-orange-400"> Password</span>
            </h1>

            <p className="text-blue-100 leading-relaxed max-w-md">
              Enter your registered email address and we'll send you a 6-digit OTP to reset your password securely.
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
                Forgot Password
              </div>

              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                Find Your
                <span className="text-blue-800"> Account</span>
              </h2>

              <p className="mt-2 text-slate-600">
                We'll send a 6-digit OTP to your registered email.
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

              {/* SUBMIT */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-blue-800 transition-all duration-300 text-white h-13 rounded-2xl font-semibold shadow-md hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
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

export default ForgotPasswordPage;

