

// components/seller/SellerNavbar.jsx

import React, { useEffect, useState } from "react";
import {
  FaStore,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaCrown,
  FaBell,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getMyProfile } from "../../api/sellerProfileApi";

const SellerNavbar = () => {
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);

 useEffect(() => {
  // Pehle localStorage se show karo (fast)
  const userData = localStorage.getItem("user");
  if (userData) setSeller(JSON.parse(userData));

  // Phir API se fresh data fetch karo
  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();
      if (data.success) {
        setSeller(data.seller);
        // localStorage update karo
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({
          ...userData,
          ...data.seller,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchProfile();
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isSubscribed = seller?.subscriptionActive;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-full px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* ── LEFT — LOGO ── */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F54900] rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-2xl">B</span>
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-black">
                  LPI-<span className="text-[#1447E6]">B2B</span>
                </h1>
                <p className="text-[10px] text-gray-400 -mt-0.5">
                  Seller Dashboard
                </p>
              </div>
            </Link>

            {/* <Link
              to="/"
              className="hidden md:flex items-center gap-2 text-gray-500 hover:text-[#1447E6] text-sm font-medium transition"
            >
              <FaHome />
              Home
            </Link> */}
          </div>

          {/* ── MIDDLE — SUBSCRIPTION BANNER ── */}
          <div className="hidden md:flex items-center">
            {isSubscribed ? (
              /* ACTIVE */
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 px-5 py-2 rounded-2xl text-sm font-semibold shadow-sm">
                <div className="relative">
                  <FaCrown className="text-green-500 text-base" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
                </div>
                Subscription Active
              </div>
            ) : (
              /* PENDING */
              <Link
                to="/seller/subscription"
                className="group relative flex items-center gap-2 overflow-hidden bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-6 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-orange-200 hover:shadow-lg"
              >
                {/* SHINE EFFECT */}
                <span className="absolute inset-0 w-full h-full bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                <FaCrown className="text-yellow-300 animate-bounce" />
                Subscribe Now
                <span className="bg-yellow-400 text-yellow-900 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  HOT
                </span>
              </Link>
            )}
          </div>

          {/* ── RIGHT — PROFILE + LOGOUT ── */}
          <div className="flex items-center gap-4">
            {/* NOTIFICATION BELL */}
            {/* <button className="relative hidden sm:flex w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 items-center justify-center text-gray-500 hover:text-blue-800 hover:border-blue-200 transition">
              <FaBell className="text-sm" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
            </button> */}

            {/* PROFILE AVATAR */}
            <Link
              to={isSubscribed ? "/seller/profile" : "/seller/subscription"}
              className="flex items-center gap-3 group"
            >
              {/* AVATAR WITH STATUS RING */}
              {/* AVATAR WITH STATUS RING */}
              <div className="relative">
  <div
    className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-bold text-sm bg-blue-100 text-blue-800 border-[3px] transition-all duration-300
    ${isSubscribed ? "border-green-500" : "border-yellow-400"}`}
  >
    {seller?.profileImage ? (
      <img
       src={seller.profileImage.url}
        alt={seller.name}
        className="w-full h-full object-cover"
      />
    ) : seller?.name ? (
      seller.name.charAt(0).toUpperCase()
    ) : (
      <FaUserCircle />
    )}
  </div>

  {/* STATUS DOT */}
  {isSubscribed ? (
    <span className="absolute -bottom-0.5 -right-0.5 flex">
      <span className="animate-ping absolute w-3 h-3 rounded-full bg-green-400 opacity-75" />
      <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
    </span>
  ) : (
    <span className="absolute -bottom-0.5 -right-0.5 flex">
      <span className="animate-ping absolute w-3 h-3 rounded-full bg-yellow-400 opacity-75" />
      <span className="w-3 h-3 rounded-full bg-yellow-500 border-2 border-white" />
    </span>
  )}
</div>

              {/* NAME */}
              <div className="hidden sm:block">
                <p className="text-xs text-gray-400 leading-none mb-0.5">
                  Welcome back
                </p>
                <h4 className="font-bold text-gray-800 text-sm leading-none group-hover:text-blue-800 transition">
                  {seller?.name || "Seller"}
                </h4>
              </div>
            </Link>

            {/* DASHBOARD BUTTON */}
            <Link
              to="/seller/dashboard"
              className="hidden md:flex items-center gap-2 bg-[#1447E6] hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm"
            >
              <FaStore />
              Dashboard
            </Link>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-600 hover:text-red-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              <FaSignOutAlt />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SellerNavbar;
