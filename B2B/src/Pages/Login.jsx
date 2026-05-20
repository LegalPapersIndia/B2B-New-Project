
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginSeller } from "../api/auth";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginSeller(formData);

    console.log("Login Response:", res.data);

    // 🔥 Save token + user
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    alert("✅ Login Successful");

    // Redirect to seller dashboard
    navigate("/seller/dashboard");

  } catch (error) {
    console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
        "Login failed"
    );
  }
};

  const handleGoogleLogin = () => {
    alert("Google Login Clicked");

    // 🔥 GOOGLE LOGIN (FAKE FOR NOW)
    localStorage.setItem("token", "google_demo_token");
    localStorage.setItem("role", "seller");

    navigate("/seller/dashboard");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white flex items-center justify-center px-4 py-6 overflow-hidden">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-[36px] overflow-hidden shadow-2xl border border-gray-100">

        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex flex-col justify-center bg-blue-900 text-white px-14 py-10 overflow-hidden">

          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>

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
              Welcome Back To
              <span className="text-orange-400"> B2B Trade</span>
            </h1>

            <p className="text-blue-100 leading-relaxed max-w-md">
              Login to manage your business profile, connect with buyers,
              receive inquiries, and grow your business faster.
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
                Welcome Back
              </div>

              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                Login To Your
                <span className="text-blue-800"> Account</span>
              </h2>

              <p className="mt-2 text-slate-600">
                Continue your B2B journey with trusted businesses.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full h-13 pl-14 pr-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
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

              {/* FORGOT PASSWORD */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-orange-600 hover:text-blue-800 font-medium transition"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-orange-600 hover:bg-blue-800 transition-all duration-300 text-white h-13 rounded-2xl font-semibold shadow-md hover:shadow-xl flex items-center justify-center gap-2"
              >
                Login Account
                <ArrowRight className="w-5 h-5" />
              </motion.button>

            </form>

            {/* DIVIDER */}
            <div className="relative my-6">
              <div className="border-t border-gray-200"></div>
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-sm text-gray-400">
                OR
              </span>
            </div>

            {/* GOOGLE LOGIN */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              className="w-full border border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50 transition-all duration-300 py-3 rounded-2xl flex items-center justify-center gap-3 font-medium shadow-sm hover:shadow-md"
            >
              Continue with Google
            </motion.button>

            {/* REGISTER */}
            <p className="text-center text-gray-500 mt-6">
              Don’t have an account?{" "}
              <Link to="/register" className="text-orange-600 font-semibold">
                Register
              </Link>
            </p>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Login;