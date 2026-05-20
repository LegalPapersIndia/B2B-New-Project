// import { LogOut, UserCircle } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";

// const SellerNavbar = () => {
//   const navigate = useNavigate();

//   // fake seller name for frontend
//   const sellerName = "Abhishek";

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");

//     navigate("/login");
//   };

//   return (
//     <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">

//       {/* LEFT SIDE */}
//       <div className="flex items-center gap-3">

//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-2">

//           <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold">
//             B2B
//           </div>

//           <h2 className="font-bold text-xl text-gray-800">
//             Seller Panel
//           </h2>

//         </Link>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex items-center gap-5">

//         {/* HOME */}
//         <Link
//           to="/"
//           className="text-sm font-medium text-gray-600 hover:text-blue-900 transition"
//         >
//           Home
//         </Link>

//         {/* PROFILE */}
//         <div className="flex items-center gap-2">

//           <UserCircle className="w-8 h-8 text-blue-900" />

//           <span className="font-medium text-gray-700">
//             {sellerName}
//           </span>

//         </div>

//         {/* LOGOUT */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
//         >
//           <LogOut className="w-4 h-4" />
//           Logout
//         </button>

//       </div>
//     </div>
//   );
// };

// export default SellerNavbar;




import React from "react";
import {
  FaStore,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

const SellerNavbar = () => {
  const navigate = useNavigate();

  // fake frontend user
  const sellerName = "Abhishek";

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">

      <nav className="max-w-full px-6 py-4">

        <div className="flex items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-10">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">

              <div className="w-10 h-10 bg-[#F54900] rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-2xl">
                  B
                </span>
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight text-black">
                  B2B
                  <span className="text-[#1447E6]">
                    Hub
                  </span>
                </h1>

                <p className="text-[11px] text-gray-500 -mt-1">
                  Seller Dashboard
                </p>
              </div>

            </Link>

            {/* HOME BUTTON */}
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-[#1447E6] font-medium transition"
            >
              <FaHome />
              Home
            </Link>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">

            {/* SELLER INFO */}
            <div className="flex items-center gap-2">

              <FaUserCircle className="text-3xl text-[#1447E6]" />

              <div className="hidden sm:block">
                <p className="text-sm text-gray-500">
                  Welcome
                </p>

                <h4 className="font-semibold text-gray-800">
                  {sellerName}
                </h4>
              </div>

            </div>

            {/* DASHBOARD BUTTON */}
            <Link
              to="/seller/dashboard"
              className="hidden md:flex items-center gap-2 bg-[#1447E6] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
            >
              <FaStore />
              Dashboard
            </Link>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#F54900] hover:bg-[#d63f00] text-white px-5 py-2.5 rounded-xl font-medium transition"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default SellerNavbar;